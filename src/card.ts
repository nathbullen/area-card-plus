import { LitElement, html, css, PropertyValues, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { repeat } from "lit/directives/repeat.js";
import memoizeOne from "memoize-one";
import type {
  HassEntity,
  UnsubscribeFunc,
  Connection,
} from "home-assistant-js-websocket";
import {
  SENSOR_DOMAINS,
  CLIMATE_DOMAINS,
  TOGGLE_DOMAINS,
  OTHER_DOMAINS,
  COVER_DOMAINS,
  ALERT_DOMAINS,
  DEVICE_CLASSES,
  DOMAIN_ICONS,
} from "./helpers";
import { getLightCurrentModeRgbColor, lightSupportsColorMode, LightColorMode, lightSupportsColor, lightSupportsFavoriteColors } from "./ha/data/light";
import "./popup-dialog";
import parseAspectRatio from "./ha/common/util/parse-aspect-ratio";
import {
  actionHandler,
  applyThemesOnElement,
  LovelaceCardConfig,
  LovelaceCard,
  HomeAssistant,
  hasAction,
  handleAction,
  ActionHandlerEvent,
  computeDomain,
  formatNumber,
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  STATES_OFF,
  UNAVAILABLE,
  UNKNOWN,
  isNumericState,
  blankBeforeUnit,
  subscribeAreaRegistry,
  subscribeDeviceRegistry,
  subscribeEntityRegistry,
  subscribeOne,
  SubscribeMixin,
  LovelaceGridOptions,
} from "./ha";

const UNAVAILABLE_STATES = [UNAVAILABLE, UNKNOWN];
const DEFAULT_ASPECT_RATIO = "16:5";

type DomainType =
  | "light"
  | "switch"
  | "fan"
  | "climate"
  | "media_player"
  | "lock"
  | "vacuum"
  | "cover"
  | "binary_sensor";

@customElement("area-card-plus")
export class AreaCardPlus
  extends SubscribeMixin(LitElement)
  implements LovelaceCard
{
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<LovelaceCardConfig> {
    const conn = hass.connection as unknown as Connection;
    const areas = await subscribeOne(conn, subscribeAreaRegistry);
    return { type: "custom:area-card-plus", area: areas[0]?.area_id || "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() public _config!: LovelaceCardConfig;
  @state() public _areas?: AreaRegistryEntry[];
  @state() public _devices?: DeviceRegistryEntry[];
  @state() public _entities?: EntityRegistryEntry[];
  @state() public selectedDomain: string | null = null;
  @state() public selectedDeviceClass: string | null = null;
  @state() public selectedGroup: string | null = null;
  @state() public layout: string = "grid";

  private _iconCache: Map<string, string> = new Map();
  private _styleCache: Map<string, string> = new Map();

  private _ratio: {
    w: number;
    h: number;
  } | null = null;

  private showPopup(
    element: HTMLElement,
    dialogTag: string,
    dialogParams: any
  ): void {
    element.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag,
          dialogImport: () => customElements.whenDefined(dialogTag),
          dialogParams,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _openDomainPopup(domain: string) {
    const area = this._area(this._config?.area, this._areas || []);
    const title =
      this._config?.area_name || (area && (area as any).name) || "Details";

    const dialogTag = "area-card-plus-popup";
    this.showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      selectedDomain: domain,
      selectedDeviceClass: this.selectedDeviceClass || undefined,
      selectedGroup: this.selectedGroup || undefined,
      card: this,
    });
  }

  private _openGeneralPopup() {
    const area = this._area(this._config?.area, this._areas || []);
    const title =
      this._config?.area_name || (area && (area as any).name) || "Details";

    const entitiesByDomain = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this._deviceClasses,
      this.hass.states
    );

    const entities: HassEntity[] = [];
    Object.values(entitiesByDomain || {}).forEach((list) => {
      list.forEach((entity) => {
        if (
          !UNAVAILABLE_STATES.includes(entity.state) &&
          !STATES_OFF.includes(entity.state)
        ) {
          entities.push(entity);
        }
      });
    });

    const dialogTag = "area-card-plus-popup";
    this.showPopup(this, dialogTag, {
      title,
      hass: this.hass,
      entities,
      card: this,
      content: entities.length ? undefined : `Keine Entitäten`,
    });
  }

  private _deviceClasses: { [key: string]: string[] } = DEVICE_CLASSES;

  private _entitiesByDomain = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      registryEntities: EntityRegistryEntry[],
      deviceClasses: { [key: string]: string[] },
      states: HomeAssistant["states"]
    ) => {
      const hiddenEntities = this._config?.hidden_entities || [];
      const entitiesInArea = registryEntities.reduce<string[]>((acc, entry) => {
        if (
          !entry.hidden_by &&
          (entry.area_id
            ? entry.area_id === areaId
            : entry.device_id && devicesInArea.has(entry.device_id)) &&
          (!this._config?.label ||
            (entry.labels &&
              entry.labels.some((l) => this._config?.label.includes(l)))) &&
          !hiddenEntities.includes(entry.entity_id)
        ) {
          acc.push(entry.entity_id);
        }
        return acc;
      }, []);

      const entitiesByDomain: { [domain: string]: HassEntity[] } = {};

      for (const entity of entitiesInArea) {
        const domain = computeDomain(entity);

        if (
          !TOGGLE_DOMAINS.includes(domain) &&
          !SENSOR_DOMAINS.includes(domain) &&
          !ALERT_DOMAINS.includes(domain) &&
          !COVER_DOMAINS.includes(domain) &&
          !OTHER_DOMAINS.includes(domain) &&
          !CLIMATE_DOMAINS.includes(domain)
        ) {
          continue;
        }

        const stateObj: HassEntity | undefined = states[entity];
        if (!stateObj) {
          continue;
        }

        if (
          (ALERT_DOMAINS.includes(domain) ||
            SENSOR_DOMAINS.includes(domain) ||
            COVER_DOMAINS.includes(domain)) &&
          !deviceClasses[domain].includes(
            stateObj.attributes.device_class || ""
          )
        ) {
          continue;
        }

        if (!(domain in entitiesByDomain)) {
          entitiesByDomain[domain] = [];
        }
        entitiesByDomain[domain].push(stateObj);
      }

      return entitiesByDomain;
    }
  );

  private _isOn(domain: string, deviceClass?: string): HassEntity | undefined {
    const entities = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this._deviceClasses,
      this.hass.states
    )[domain];
    if (!entities) {
      return undefined;
    }
    return (
      deviceClass
        ? entities.filter(
            (entity) => entity.attributes.device_class === deviceClass
          )
        : entities
    ).find(
      (entity) =>
        !UNAVAILABLE_STATES.includes(entity.state) &&
        !STATES_OFF.includes(entity.state)
    );
  }

  private _average(domain: string, deviceClass?: string): string | undefined {
    const entities = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this._deviceClasses,
      this.hass.states
    )[domain].filter((entity) =>
      deviceClass ? entity.attributes.device_class === deviceClass : true
    );
    if (!entities || entities.length === 0) {
      return undefined;
    }

    let uom: any;
    const values = entities.filter((entity) => {
      if (!isNumericState(entity) || isNaN(Number(entity.state))) {
        return false;
      }
      if (!uom) {
        uom = entity.attributes.unit_of_measurement;
        return true;
      }
      return entity.attributes.unit_of_measurement === uom;
    });

    if (!values.length) {
      return undefined;
    }

    const sum = values.reduce(
      (total, entity) => total + Number(entity.state),
      0
    );

    if (deviceClass === "power") {
      return `${formatNumber(sum, this.hass!.locale as any, {
        maximumFractionDigits: 1,
      })}${uom ? blankBeforeUnit(uom, this.hass!.locale as any) : ""}${
        uom || ""
      }`;
    } else {
      return `${formatNumber(sum / values.length, this.hass!.locale as any, {
        maximumFractionDigits: 1,
      })}${uom ? blankBeforeUnit(uom, this.hass!.locale as any) : ""}${
        uom || ""
      }`;
    }
  }

  public _area = memoizeOne(
    (areaId: string | undefined, areas: AreaRegistryEntry[]) =>
      areas.find((area) => area.area_id === areaId) || null
  );

  public _devicesInArea = memoizeOne(
    (areaId: string | undefined, devices: DeviceRegistryEntry[]) =>
      new Set(
        areaId
          ? devices.reduce<string[]>((acc, device) => {
              if (device.area_id === areaId) acc.push(device.id);
              return acc;
            }, [])
          : []
      )
  );

  public hassSubscribe(): UnsubscribeFunc[] {
    const conn = this.hass!.connection as unknown as Connection;

    return [
      subscribeAreaRegistry(conn, (areas) => {
        this._areas = areas;
      }),
      subscribeDeviceRegistry(conn, (devices) => {
        this._devices = devices;
      }),
      subscribeEntityRegistry(conn, (entries) => {
        this._entities = entries;
      }),
    ];
  }
  public getCardSize(): number {
    return 3;
  }

  public willUpdate(changedProps: PropertyValues) {
    if (changedProps.has("_config") || this._ratio === null) {
      this._ratio = this._config?.aspect_ratio
        ? parseAspectRatio(this._config?.aspect_ratio)
        : null;

      if (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) {
        this._ratio = parseAspectRatio(DEFAULT_ASPECT_RATIO);
      }
    }
  }

  getGridOptions(): LovelaceGridOptions {
    return {
      columns: 12,
      rows: 3,
      min_columns: 1,
      min_rows: 1,
    };
  }

  public setConfig(config: LovelaceCardConfig): void {
    if (!config.area) {
      throw new Error("Area Required");
    }

    this._config = config;

    this._deviceClasses = { ...DEVICE_CLASSES };
    if (config.sensor_classes) {
      this._deviceClasses.sensor = config.sensor_classes;
    }
    if (config.alert_classes) {
      this._deviceClasses.binary_sensor = config.alert_classes;
    }
    if (config.cover_classes) {
      this._deviceClasses.cover = config.cover_classes;
    }
    this._iconCache.clear();
    this._styleCache.clear();
  }

  private _parseCss(css?: string): string {
    if (!css) return "";
    const key = css;
    if (this._styleCache.has(key)) return this._styleCache.get(key)!;
    const parsed = css.split("\n").reduce((acc: string, line: string) => {
      const trimmed = line.trim();
      if (trimmed && trimmed.includes(":")) {
        acc += trimmed.endsWith(";") ? trimmed : `${trimmed};`;
        acc += " ";
      }
      return acc;
    }, "");
    this._styleCache.set(key, parsed);
    return parsed;
  }

  private _computeCovers = memoizeOne(
    (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
      COVER_DOMAINS.flatMap((domain) => {
        if (!(domain in entitiesByDomain)) return [] as any[];
        return deviceClasses[domain].map((deviceClass: string) => ({
          domain,
          deviceClass,
        }));
      })
  );

  private _computeIconStyles = memoizeOne(
    (
      isV2Design: boolean,
      rowSize: number,
      icon_css: string | undefined,
      area_icon_color: string | undefined
    ) => {
      const base: Record<string, any> = {
        ...(isV2Design && rowSize === 1 ? { "--mdc-icon-size": "20px" } : {}),
        color: area_icon_color ? `var(--${area_icon_color}-color)` : "",
      };
      if (!icon_css) return base;
      return icon_css
        .split("\n")
        .reduce((acc: Record<string, string>, line: string) => {
          const trimmed = line.trim();
          if (trimmed && trimmed.includes(":")) {
            const [key, value] = trimmed.split(":");
            acc[key.trim()] = value.trim().replace(";", "");
          }
          return acc;
        }, base as Record<string, string>);
    }
  );

  private _computeAlerts = memoizeOne(
    (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
      ALERT_DOMAINS.flatMap((domain) => {
        if (!(domain in entitiesByDomain)) return [] as any[];
        return deviceClasses[domain].map((deviceClass: string) => ({
          domain,
          deviceClass,
        }));
      })
  );

  private _computeSensors = memoizeOne(
    (entitiesByDomain: { [k: string]: HassEntity[] }, deviceClasses: any) =>
      SENSOR_DOMAINS.flatMap((domain) => {
        if (!(domain in entitiesByDomain)) return [] as any[];
        return deviceClasses[domain].map(
          (deviceClass: string, index: number) => ({
            domain,
            deviceClass,
            index,
          })
        );
      })
  );

  private _computeButtons = memoizeOne(
    (
      toggle_domains: string[] | undefined,
      entitiesByDomain: { [k: string]: HassEntity[] }
    ) =>
      (toggle_domains || []).filter(
        (domain: string) => domain in entitiesByDomain
      )
  );

  private _computeCameraEntity = memoizeOne(
    (
      show_camera: boolean | undefined,
      entitiesByDomain: { [k: string]: HassEntity[] }
    ) => {
      if (show_camera && "camera" in entitiesByDomain)
        return entitiesByDomain.camera[0]?.entity_id;
      return undefined;
    }
  );

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config") || !this._config) {
      return true;
    }

    if (
      changedProps.has("_devicesInArea") ||
      changedProps.has("_areas") ||
      changedProps.has("_entities")
    ) {
      return true;
    }

    if (!changedProps.has("hass")) {
      return false;
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (
      !oldHass ||
      oldHass.themes !== this.hass!.themes ||
      oldHass.locale !== this.hass!.locale
    ) {
      return true;
    }

    if (
      !this._devices ||
      !this._devicesInArea(this._config.area, this._devices) ||
      !this._entities
    ) {
      return false;
    }

    const entities = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );

    for (const domainEntities of Object.values(entities)) {
      for (const stateObj of domainEntities) {
        if (oldHass!.states[stateObj.entity_id] !== stateObj) {
          return true;
        }
      }
    }

    return false;
  }

  private _handleAction(ev: ActionHandlerEvent) {
    const actionConfig =
      ev.detail.action === "tap"
        ? this._config?.tap_action
        : ev.detail.action === "hold"
        ? this._config?.hold_action
        : ev.detail.action === "double_tap"
        ? this._config?.double_tap_action
        : null;

    const isMoreInfo =
      actionConfig === "more-info" || actionConfig?.action === "more-info";

    if (isMoreInfo || actionConfig === undefined) {
      this._openGeneralPopup();
      return;
    }

    const config = {
      tap_action: this._config?.tap_action,
      hold_action: this._config?.hold_action,
      double_tap_action: this._config?.double_tap_action,
    };

    handleAction(this, this.hass!, config, ev.detail.action!);
  }

  private _handleDomainAction(domain: string): (ev: CustomEvent) => void {
    return this._makeActionHandler("domain", domain);
  }

  private _handleAlertAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    return this._makeActionHandler("alert", domain, deviceClass);
  }

  private _handleCoverAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    return this._makeActionHandler("cover", domain, deviceClass);
  }

  private _handleSensorAction(
    domain: string,
    deviceClass: string
  ): (ev: CustomEvent) => void {
    return this._makeActionHandler("sensor", domain, deviceClass);
  }

  // Unified action handler factory for domain/alert/cover/sensor
  private _makeActionHandler(
    kind: "domain" | "alert" | "cover" | "sensor" | "custom_button",
    domain: string,
    deviceClass?: string,
    customButton?: any
  ): (ev: CustomEvent) => void {
    return (ev: CustomEvent) => {
      ev.stopPropagation();

      let customization: any;
      if (kind === "domain") {
        customization = this._config?.customization_domain?.find(
          (item: { type: string }) => item.type === domain
        );
      } else if (kind === "alert") {
        customization = this._config?.customization_alert?.find(
          (item: { type: string }) => item.type === deviceClass
        );
      } else if (kind === "cover") {
        customization = this._config?.customization_cover?.find(
          (item: { type: string }) => item.type === deviceClass
        );
      } else if (kind === "sensor") {
        customization = this._config?.customization_sensor?.find(
          (item: { type: string }) => item.type === deviceClass
        );
      } else if (kind === "custom_button") {
        customization = customButton;
      }

      const actionConfig =
        ev.detail.action === "tap"
          ? customization?.tap_action
          : ev.detail.action === "hold"
          ? customization?.hold_action
          : ev.detail.action === "double_tap"
          ? customization?.double_tap_action
          : null;

      // Domain-specific toggle / more-info behaviour
      if (kind === "domain") {
        const isToggle =
          actionConfig === "toggle" || actionConfig?.action === "toggle";
        const isMoreInfo =
          actionConfig === "more-info" || actionConfig?.action === "more-info";

        if (isToggle) {
          if (domain === "media_player") {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "media_pause" : "media_play",
              undefined,
              { area_id: this._config!.area }
            );
          } else if (domain === "lock") {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "lock" : "unlock",
              undefined,
              { area_id: this._config!.area }
            );
          } else if (domain === "vacuum") {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "stop" : "start",
              undefined,
              { area_id: this._config!.area }
            );
          } else if (TOGGLE_DOMAINS.includes(domain)) {
            this.hass.callService(
              domain,
              this._isOn(domain) ? "turn_off" : "turn_on",
              undefined,
              { area_id: this._config!.area }
            );
          }
          return;
        } else if (isMoreInfo || actionConfig === undefined) {
          if (domain !== "binary_sensor" && domain !== "sensor") {
            if (domain === "climate") {
              const climateCustomization =
                this._config?.customization_domain?.find(
                  (item: { type: string }) => item.type === "climate"
                );
              const displayMode = (climateCustomization as any)?.display_mode;
              if (displayMode === "icon" || displayMode === "text_icon") {
                this._showPopupForDomain(domain);
              }
            } else {
              this._showPopupForDomain(domain);
            }
          }
          return;
        }

        const config = {
          tap_action: customization?.tap_action,
          hold_action: customization?.hold_action,
          double_tap_action: customization?.double_tap_action,
        };

        handleAction(this, this.hass!, config, ev.detail.action!);
        return;
      }

      // Alert / Cover / Sensor behaviour
      const isMoreInfo =
        actionConfig === "more-info" || actionConfig?.action === "more-info";

      if (kind === "alert") {
        if (isMoreInfo || actionConfig === undefined) {
          if (domain === "binary_sensor") {
            this._showPopupForDomain(domain, deviceClass);
          }
          return;
        }
      } else if (kind === "cover") {
        if (isMoreInfo || actionConfig === undefined) {
          if (domain === "cover") {
            this._showPopupForDomain(domain, deviceClass);
          }
          return;
        }
      } else if (kind === "sensor") {
        if (isMoreInfo) {
          if (domain === "sensor") {
            this._showPopupForDomain(domain, deviceClass);
          }
          return;
        }
      }

      const config = {
        tap_action: customization?.tap_action,
        hold_action: customization?.hold_action,
        double_tap_action: customization?.double_tap_action,
      };

      handleAction(this, this.hass!, config, ev.detail.action!);
    };
  }

  private renderCustomButtons() {
    if (
      !this._config?.custom_buttons ||
      this._config.custom_buttons.length === 0
    ) {
      return nothing;
    }

    const designClasses = {
      v2: this._config?.design === "V2",
      row: this._config?.layout === "horizontal",
    };

    return html`
      <div
        class="${classMap({
          custom_buttons: true,
          ...designClasses,
        })}"
      >
        ${this._config.custom_buttons.map((btn: any) => {
          const colorStyle = btn.color
            ? `color: var(--${btn.color}-color, ${btn.color});`
            : "";
          return html`
            <div
              class="icon-with-count hover"
              @action=${this._makeActionHandler(
                "custom_button",
                "",
                undefined,
                btn
              )}
              .actionHandler=${actionHandler({
                hasHold: hasAction(btn.hold_action),
                hasDoubleClick: hasAction(btn.double_tap_action),
              })}
            >
              <ha-icon .icon=${btn.icon} style="${colorStyle}"></ha-icon>
              ${btn.name
                ? html`<span class="custom-button-label" style="${colorStyle}"
                    >${btn.name}</span
                  >`
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  protected render() {
    if (
      !this._config ||
      !this.hass ||
      !this._areas ||
      !this._devices ||
      !this._entities
    ) {
      return nothing;
    }

    const isV2Design = this._config?.design === "V2";
    const v2Color =
      isV2Design && this._config?.v2_color
        ? this._calculateV2Color(this._config.v2_color)
        : "var(--primary-color)";

    const classes = {
      mirrored: this._config.mirrored === true,
    };

    const designClasses = {
      v2: this._config?.design === "V2",
      row: this._config?.layout === "horizontal",
    };
    let rowSize = 3;
    try {
      const root = (this.shadowRoot as any)?.host || document.documentElement;
      const val = getComputedStyle(root).getPropertyValue("--row-size");
      if (val) rowSize = Number(val.trim()) || 3;
    } catch (e) {}

    const lightColor = this._getLightColorFromArea();
    const effectiveV2Color = lightColor || v2Color;
    
    const designStyles = isV2Design ? { background: effectiveV2Color } : {};
    const iconContainerStyles =
      isV2Design && rowSize === 1
        ? {}
        : isV2Design
        ? { background: effectiveV2Color }
        : {};

    const ignoreAspectRatio = this.layout === "grid";

    const entitiesByDomain = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );
    const area = this._area(this._config.area, this._areas);

    const customizationDomainMap = new Map<string, any>();
    (this._config?.customization_domain || []).forEach((c: any) =>
      customizationDomainMap.set(c.type, c)
    );
    const customizationCoverMap = new Map<string, any>();
    (this._config?.customization_cover || []).forEach((c: any) =>
      customizationCoverMap.set(c.type, c)
    );
    const customizationAlertMap = new Map<string, any>();
    (this._config?.customization_alert || []).forEach((c: any) =>
      customizationAlertMap.set(c.type, c)
    );
    const customizationSensorMap = new Map<string, any>();
    (this._config?.customization_sensor || []).forEach((c: any) =>
      customizationSensorMap.set(c.type, c)
    );

    const covers = this._computeCovers(entitiesByDomain, this._deviceClasses);

    const alerts = this._computeAlerts(entitiesByDomain, this._deviceClasses);

    const buttons = this._computeButtons(
      this._config.toggle_domains,
      entitiesByDomain
    );

    const sensors = this._computeSensors(entitiesByDomain, this._deviceClasses);

    const climates = (
      this._config?.toggle_domains?.includes("climate") ? CLIMATE_DOMAINS : []
    )
      .filter((domain) => domain in entitiesByDomain)
      .map((domain) => ({ domain }));
    // Normalize display_type and compute flags for what to show.
    const display = (this._config?.display_type || "").toString().toLowerCase();
    const showCamera = display.includes("camera");
    const showPicture =
      display.includes("picture") || display.includes("image");
    const showIcon = display === "" ? true : display.includes("icon");

    const cameraEntityId = this._computeCameraEntity(
      showCamera,
      entitiesByDomain
    );

    if (area === null) {
      return html`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    }

    const iconStyles = this._computeIconStyles(
      isV2Design,
      rowSize,
      this._config?.icon_css,
      this._config?.area_icon_color
    );

    return html`
      <ha-card
        class="${classMap(classes)}"
        style=${styleMap({
          paddingBottom: ignoreAspectRatio ? "0" : "12em",
        })}
      >
        ${
          (showCamera && cameraEntityId) || (showPicture && area.picture)
            ? html`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  .image=${showCamera ? undefined : area.picture}
                  .cameraImage=${showCamera ? cameraEntityId : undefined}
                  .cameraView=${this._config.camera_view}
                  fitMode="cover"
                ></hui-image>
              `
            : nothing
        }

        <div
          class="${classMap({
            "icon-container": true,
            ...designClasses,
          })}"
          style=${styleMap(iconContainerStyles)}
        >
          ${
            showIcon
              ? html`
                  <ha-icon
                    style=${styleMap(iconStyles)}
                    icon=${this._config.area_icon || area.icon}
                  ></ha-icon>
                `
              : nothing
          }
        </div>

        <div
          class="${classMap({
            content: true,
            ...designClasses,
          })}"
          @action=${this._handleAction}
          .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleClick: hasAction(this._config.double_tap_action),
          })}
        >
          <div
            class="${classMap({
              right: true,
              ...designClasses,
            })}"
            style=${styleMap(designStyles)}
          >
            <!-- Covers -->
            <div
              class="${classMap({
                covers: true,
                ...designClasses,
              })}"
            >
              ${repeat(
                covers,
                (item) => item.domain + "-" + item.deviceClass,
                ({ domain, deviceClass }) => {
                  const customization = customizationCoverMap.get(deviceClass);
                  const invert = customization?.invert === true;
                  const activeEntities = entitiesByDomain[domain].filter(
                    (entity) => {
                      const entityDeviceClass =
                        entity.attributes.device_class || "default";
                      const isActive = !STATES_OFF.includes(entity.state);
                      return (
                        entityDeviceClass === deviceClass &&
                        (invert ? STATES_OFF.includes(entity.state) : isActive)
                      );
                    }
                  );
                  const coverColor =
                    customization?.color || this._config?.cover_color;
                  const coverIcon = customization?.icon;
                  const activeCount = activeEntities.length;
                  return activeCount > 0
                    ? html`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
                            customization?.css || this._config?.cover_css
                          )}
                          @action=${this._handleCoverAction(
                            domain,
                            deviceClass
                          )}
                          .actionHandler=${actionHandler({
                            hasHold: hasAction(customization?.hold_action),
                            hasDoubleClick: hasAction(
                              customization?.double_tap_action
                            ),
                          })}
                        >
                          <ha-state-icon
                            class="cover"
                            style="${(coverColor
                              ? `color: var(--${coverColor}-color);`
                              : "") +
                            " " +
                            (customization?.icon_css
                              ? customization.icon_css
                                  .split("\n")
                                  .reduce((acc: string, line: string) => {
                                    const trimmed = line.trim();
                                    if (trimmed && trimmed.includes(":")) {
                                      acc += trimmed.endsWith(";")
                                        ? trimmed
                                        : `${trimmed};`;
                                      acc += " ";
                                    }
                                    return acc;
                                  }, "")
                              : "")}"
                            .icon=${coverIcon
                              ? coverIcon
                              : this._cachedIcon(
                                  domain as DomainType,
                                  invert ? false : true,
                                  deviceClass
                                )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${activeCount > 0
                              ? "on"
                              : "off"}"
                            >${activeCount}</span
                          >
                        </div>
                      `
                    : nothing;
                }
              )}
            </div>

            <!-- Alerts -->
            <div
              class="${classMap({
                alerts: true,
                ...designClasses,
              })}"
            >
              ${repeat(
                alerts,
                (item) => item.domain + "-" + item.deviceClass,
                ({ domain, deviceClass }) => {
                  const customization = customizationAlertMap.get(deviceClass);
                  const invert = customization?.invert === true;
                  const activeEntities = entitiesByDomain[domain].filter(
                    (entity) => {
                      const entityDeviceClass =
                        entity.attributes.device_class || "default";
                      const isOn = entity.state === "on";
                      return (
                        entityDeviceClass === deviceClass &&
                        (invert ? STATES_OFF.includes(entity.state) : isOn)
                      );
                    }
                  );
                  const alertColor =
                    customization?.color || this._config?.alert_color;
                  const alertIcon = customization?.icon;
                  const activeCount = activeEntities.length;
                  return activeCount > 0
                    ? html`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
                            customization?.css || this._config?.alert_css
                          )}
                          @action=${this._handleAlertAction(
                            domain,
                            deviceClass
                          )}
                          .actionHandler=${actionHandler({
                            hasHold: hasAction(customization?.hold_action),
                            hasDoubleClick: hasAction(
                              customization?.double_tap_action
                            ),
                          })}
                        >
                          <ha-state-icon
                            class="alert"
                            style="${(alertColor
                              ? `color: var(--${alertColor}-color);`
                              : "") +
                            " " +
                            (customization?.icon_css
                              ? customization.icon_css
                                  .split("\n")
                                  .reduce((acc: string, line: string) => {
                                    const trimmed = line.trim();
                                    if (trimmed && trimmed.includes(":")) {
                                      acc += trimmed.endsWith(";")
                                        ? trimmed
                                        : `${trimmed};`;
                                      acc += " ";
                                    }
                                    return acc;
                                  }, "")
                              : "")}"
                            .icon=${alertIcon
                              ? alertIcon
                              : this._cachedIcon(
                                  domain as DomainType,
                                  invert ? false : true,
                                  deviceClass
                                )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${activeCount > 0
                              ? "on"
                              : "off"}"
                            >${activeCount}</span
                          >
                        </div>
                      `
                    : nothing;
                }
              )}
            </div>

            ${this.renderCustomButtons()}

            <!-- Buttons -->
            <div
              class="${classMap({
                buttons: true,
                ...designClasses,
              })}"
            >
              ${repeat(
                buttons,
                (domain: string) => domain,
                (domain: string) => {
                  if (domain === "climate") {
                    const climateCustomization =
                      this._config?.customization_domain?.find(
                        (item: { type: string }) => item.type === "climate"
                      );
                    const displayMode = (climateCustomization as any)
                      ?.display_mode;
                    if (displayMode !== "icon" && displayMode !== "text_icon") {
                      return nothing;
                    }
                  }
                  const customization = customizationDomainMap.get(domain);
                  const domainColor =
                    customization?.color || this._config?.domain_color;
                  const domainIcon = customization?.icon;
                  const activeEntities = (
                    entitiesByDomain[domain as string] as HassEntity[]
                  ).filter(
                    (entity: HassEntity) =>
                      !UNAVAILABLE_STATES.includes(entity.state) &&
                      !STATES_OFF.includes(entity.state)
                  );
                  const activeCount = activeEntities.length;
                  if (this._config.show_active && activeCount === 0) {
                    return nothing;
                  }
                  return html`
                    <div
                      class="icon-with-count hover"
                      style=${this._parseCss(
                        customization?.css || this._config?.domain_css
                      )}
                      @action=${this._handleDomainAction(domain as string)}
                      .actionHandler=${actionHandler({
                        hasHold: hasAction(customization?.hold_action),
                        hasDoubleClick: hasAction(
                          customization?.double_tap_action
                        ),
                      })}
                    >
                      <ha-state-icon
                        style=${domainColor
                          ? `color: var(--${domainColor}-color);`
                          : this._config?.domain_color
                          ? `color: ${this._config.domain_color};`
                          : ""}
                        class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                        .domain=${domain}
                        .icon=${domainIcon
                          ? domainIcon
                          : this._cachedIcon(
                              domain as DomainType,
                              activeCount > 0
                            )}
                      ></ha-state-icon>
                      <span
                        class="active-count text-small ${activeCount > 0
                          ? "on"
                          : "off"}"
                      >
                        ${activeCount}
                      </span>
                    </div>
                  `;
                }
              )}
            </div>
          </div>




          <div class="${classMap({
            bottom: true,
            ...designClasses,
          })}">
              <div style=${`${
                this._config?.area_name_color
                  ? `color: var(--${this._config.area_name_color}-color);`
                  : ""
              } ${
                this._config?.name_css
                  ? this._config.name_css
                      .split("\n")
                      .reduce((acc: string, line: string) => {
                        const trimmed = line.trim();
                        if (trimmed && trimmed.includes(":")) {
                          acc += trimmed.endsWith(";")
                            ? trimmed
                            : `${trimmed};`;
                          acc += " ";
                        }
                        return acc;
                      }, "")
                  : ""
              }`}"
              <div class="${classMap({
                name: true,
                ...designClasses,
                "text-large": true,
                on: true,
              })}"
                @action=${this._handleAction}
                .actionHandler=${actionHandler({
                  hasHold: hasAction(this._config.hold_action),
                  hasDoubleClick: hasAction(this._config.double_tap_action),
                })}
              >
                ${this._config.area_name || area.name}
              </div>

              <!-- Sensors -->
              <div class="sensors">
                ${
                  this._config?.wrap_sensor_icons
                    ? repeat(
                        sensors,
                        (item) => item.domain + "-" + item.deviceClass,
                        ({ domain, deviceClass, index }) => {
                          const matchingEntities = entitiesByDomain[
                            domain
                          ].filter(
                            (entity) =>
                              entity.attributes.device_class === deviceClass
                          );
                          if (matchingEntities.length === 0) {
                            return nothing;
                          }

                          const areaSensorEntityId = (() => {
                            switch (deviceClass) {
                              case "temperature":
                                return area.temperature_entity_id;
                              case "humidity":
                                return area.humidity_entity_id;
                              default:
                                return null;
                            }
                          })();
                          const areaEntity = areaSensorEntityId
                            ? this.hass.states[areaSensorEntityId]
                            : undefined;

                          const customization =
                            customizationSensorMap.get(deviceClass);
                          const sensorColor =
                            customization?.color || this._config?.sensor_color;
                          const invert = customization?.invert === true;
                          const hasOnEntity = matchingEntities.some(
                            (e) =>
                              !UNAVAILABLE_STATES.includes(e.state) &&
                              !STATES_OFF.includes(e.state)
                          );
                          if (invert && hasOnEntity) {
                            return nothing;
                          }

                          const icon = this._config?.show_sensor_icons
                            ? html`<ha-domain-icon
                                style=${sensorColor
                                  ? `color: var(--${sensorColor}-color);`
                                  : ""}
                                .hass=${this.hass}
                                .domain=${domain}
                                .deviceClass=${deviceClass}
                              ></ha-domain-icon>`
                            : null;

                          const value = html`<span
                            class="sensor-value"
                            @action=${this._handleSensorAction(
                              domain,
                              deviceClass
                            )}
                            .actionHandler=${actionHandler({
                              hasHold: hasAction(customization?.hold_action),
                              hasDoubleClick: hasAction(
                                customization?.double_tap_action
                              ),
                            })}
                            style=${`${
                              sensorColor
                                ? `color: var(--${sensorColor}-color);`
                                : ""
                            } ${this._parseCss(customization?.css)}`}
                          >
                            ${!this._config?.show_sensor_icons &&
                            !this._config?.wrap_sensor_icons &&
                            index > 0
                              ? " - "
                              : ""}
                            ${areaEntity
                              ? this.hass.formatEntityState(areaEntity)
                              : this._average(domain, deviceClass)}
                          </span>`;

                          return html`<div class="sensor-row off">
                            ${icon}${value}
                          </div>`;
                        }
                      )
                    : html`<div class="sensor text-medium off">
                        ${repeat(
                          sensors,
                          (item) => item.domain + "-" + item.deviceClass,
                          ({ domain, deviceClass, index }) => {
                            const matchingEntities = entitiesByDomain[
                              domain
                            ].filter(
                              (entity) =>
                                entity.attributes.device_class === deviceClass
                            );
                            if (matchingEntities.length === 0) {
                              return nothing;
                            }

                            const areaSensorEntityId = (() => {
                              switch (deviceClass) {
                                case "temperature":
                                  return area.temperature_entity_id;
                                case "humidity":
                                  return area.humidity_entity_id;
                                default:
                                  return null;
                              }
                            })();
                            const areaEntity = areaSensorEntityId
                              ? this.hass.states[areaSensorEntityId]
                              : undefined;

                            const customization =
                              customizationSensorMap.get(deviceClass);
                            const sensorColor =
                              customization?.color ||
                              this._config?.sensor_color;
                            const invert = customization?.invert === true;
                            const hasOnEntity = matchingEntities.some(
                              (e) =>
                                !UNAVAILABLE_STATES.includes(e.state) &&
                                !STATES_OFF.includes(e.state)
                            );
                            if (invert && hasOnEntity) {
                              return nothing;
                            }

                            const icon = this._config?.show_sensor_icons
                              ? html`<ha-domain-icon
                                  style=${sensorColor
                                    ? `color: var(--${sensorColor}-color);`
                                    : ""}
                                  .hass=${this.hass}
                                  .domain=${domain}
                                  .deviceClass=${deviceClass}
                                ></ha-domain-icon>`
                              : null;

                            const value = html`<span
                              class="sensor-value"
                              @action=${this._handleSensorAction(
                                domain,
                                deviceClass
                              )}
                              .actionHandler=${actionHandler({
                                hasHold: hasAction(customization?.hold_action),
                                hasDoubleClick: hasAction(
                                  customization?.double_tap_action
                                ),
                              })}
                              style=${`${
                                sensorColor
                                  ? `color: var(--${sensorColor}-color);`
                                  : ""
                              } ${this._parseCss(customization?.css)}`}
                            >
                              ${!this._config?.show_sensor_icons &&
                              !this._config?.wrap_sensor_icons &&
                              index > 0
                                ? " - "
                                : ""}
                              ${areaEntity
                                ? this.hass.formatEntityState(areaEntity)
                                : this._average(domain, deviceClass)}
                            </span>`;

                            return html`${icon}${value}`;
                          }
                        )}
                      </div>`
                }
              </div>

              <!-- Climates -->
              <div class="climate text-small off">
                ${repeat(
                  climates,
                  (item) => item.domain,
                  ({ domain }) => {
                    const entities = entitiesByDomain[domain];
                    const activeTemperatures = entities
                      .filter((entity) => {
                        const hvacAction = entity.attributes.hvac_action;
                        const state = entity.state;
                        const isActive =
                          !UNAVAILABLE_STATES.includes(state) &&
                          !STATES_OFF.includes(state);
                        if (hvacAction !== undefined) {
                          const isHeatingCooling =
                            hvacAction !== "idle" && hvacAction !== "off";
                          const isHeatButIdle =
                            state === "heat" &&
                            (hvacAction === "idle" || hvacAction === "off");
                          return isActive && isHeatingCooling && !isHeatButIdle;
                        }
                        return isActive;
                      })
                      .map((entity) => {
                        const temperature =
                          entity.attributes.temperature || "N/A";
                        return `${temperature} ${
                          this.hass?.config?.unit_system?.temperature || ""
                        }`;
                      });
                    if (activeTemperatures.length === 0) {
                      return nothing;
                    }
                    const customization = customizationDomainMap.get(domain);
                    const displayMode = (customization as any)?.display_mode;
                    if (displayMode === "icon") {
                      return nothing;
                    }
                    const domainColor = customization?.color;
                    const textStyle = `${
                      domainColor
                        ? `color: var(--${domainColor}-color);`
                        : this._config?.domain_color
                        ? `color: ${this._config.domain_color};`
                        : ""
                    } ${this._parseCss(customization?.css)}`;
                    return html`<div
                      class="climate"
                      style=${textStyle}
                      @action=${this._handleDomainAction(domain)}
                      .actionHandler=${actionHandler({
                        hasHold: hasAction(customization?.hold_action),
                        hasDoubleClick: hasAction(
                          customization?.double_tap_action
                        ),
                      })}
                    >
                      (${activeTemperatures.join(", ")})
                    </div>`;
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _calculateV2Color(colorArray: number[]): string {
    return `rgba(${colorArray.join(", ")})`;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (!this._config || !this.hass) {
      return;
    }

    if (changedProps.has("selectedDomain") && this.selectedDomain) {
      const domain = this.selectedDomain;

      this._openDomainPopup(domain);

      setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as
      | LovelaceCardConfig
      | undefined;

    if (
      (changedProps.has("hass") &&
        (!oldHass || oldHass.themes !== this.hass.themes)) ||
      (changedProps.has("_config") &&
        (!oldConfig || oldConfig.theme !== this._config.theme))
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  private _showPopupForDomain(domain: string, deviceClass?: string): void {
    this.selectedDeviceClass = deviceClass || null;
    this._openDomainPopup(domain);
  }

  private _getIcon(
    domain: DomainType,
    on: boolean,
    deviceClass?: string
  ): string {
    if (domain in DOMAIN_ICONS) {
      const icons = DOMAIN_ICONS[domain] as any;

      if (deviceClass && typeof icons === "object") {
        const dc = (icons as Record<string, any>)[deviceClass];
        if (dc) {
          if (typeof dc === "string") return dc;
          if (typeof dc === "object" && "on" in dc && "off" in dc)
            return on ? dc.on : dc.off;
        }
      }

      if (typeof icons === "object" && "on" in icons && "off" in icons) {
        return on ? icons.on : icons.off;
      }

      if (typeof icons === "string") return icons;
    }

    return "";
  }

  private _cachedIcon(
    domain: DomainType,
    on: boolean,
    deviceClass?: string
  ): string {
    const key = `${domain}|${deviceClass || ""}|${on ? "1" : "0"}`;
    if (this._iconCache.has(key)) return this._iconCache.get(key)!;
    const icon = this._getIcon(domain, on, deviceClass);
    this._iconCache.set(key, icon);
    return icon;
  }

  private _getLightColorFromArea(): string | null {
    if (!this._config?.use_light_color || !this.hass) {
      return null;
    }

    let lightEntities: HassEntity[] = [];

    // If specific entities are configured, use those
    if (this._config.light_color_entities && this._config.light_color_entities.length > 0) {
      lightEntities = this._config.light_color_entities
        .map((entityId: string) => this.hass.states[entityId])
        .filter((entity: HassEntity | undefined) => entity && entity.entity_id.startsWith('light.'));
    } else {
      // Otherwise, use all lights in the area
      if (!this._entities) {
        return null;
      }

      const entitiesByDomain = this._entitiesByDomain(
        this._config.area,
        this._devicesInArea(this._config.area, this._devices!),
        this._entities,
        this._deviceClasses,
        this.hass.states
      );

      lightEntities = entitiesByDomain.light || [];
    }

    // If no lights at all in the room, return fallback color
    if (lightEntities.length === 0) {
      return "#363636";
    }

    const activeLightEntities = lightEntities.filter(
      (entity) =>
        !UNAVAILABLE_STATES.includes(entity.state) &&
        !STATES_OFF.includes(entity.state) &&
        (lightSupportsFavoriteColors(entity as any) || 
         (entity.state === "on" && !lightSupportsFavoriteColors(entity as any)))
    );

    if (activeLightEntities.length === 0) {
      // Return fallback color when no lights are on
      return "#363636";
    }

    // Calculate average RGB color from all active light entities
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let validColors = 0;

    for (const entity of activeLightEntities) {
      const rgbColor = this._extractRgbFromLight(entity as any);
      if (rgbColor && rgbColor.length >= 3) {
        totalR += rgbColor[0];
        totalG += rgbColor[1];
        totalB += rgbColor[2];
        validColors++;
      }
    }

    if (validColors === 0) {
      // Return fallback color when no valid colors found
      return "#363636";
    }

    const avgR = Math.round(totalR / validColors);
    const avgG = Math.round(totalG / validColors);
    const avgB = Math.round(totalB / validColors);

    return `rgb(${avgR}, ${avgG}, ${avgB})`;
  }

  private _extractRgbFromLight(entity: any): number[] | null {
    // Try to get RGB color using the built-in function first
    const rgbColor = getLightCurrentModeRgbColor(entity);
    if (rgbColor && rgbColor.length >= 3) {
      return rgbColor;
    }

    // Fallback: try to extract from different color modes
    const attrs = entity.attributes;
    
    // Try RGB color directly
    if (attrs.rgb_color && attrs.rgb_color.length >= 3) {
      return attrs.rgb_color;
    }

    // Try RGBW color (use first 3 components)
    if (attrs.rgbw_color && attrs.rgbw_color.length >= 3) {
      return attrs.rgbw_color.slice(0, 3);
    }

    // Try RGBWW color (use first 3 components)
    if (attrs.rgbww_color && attrs.rgbww_color.length >= 3) {
      return attrs.rgbww_color.slice(0, 3);
    }

    // Try HS color conversion
    if (attrs.hs_color && attrs.hs_color.length >= 2) {
      return this._hsToRgb(attrs.hs_color[0], attrs.hs_color[1]);
    }

    // Try XY color conversion
    if (attrs.xy_color && attrs.xy_color.length >= 2) {
      return this._xyToRgb(attrs.xy_color[0], attrs.xy_color[1]);
    }

    // Try color temperature
    if (attrs.color_temp_kelvin) {
      // Use Kelvin directly if available
      return this._colorTempToRgb(attrs.color_temp_kelvin);
    } else if (attrs.color_temp) {
      // Convert Mireds to Kelvin (Kelvin = 1000000 / Mireds)
      const kelvin = 1000000 / attrs.color_temp;
      return this._colorTempToRgb(kelvin);
    }

    // For fixed white lights that are on, return a warm orange color
    if (entity.state === "on" && !lightSupportsFavoriteColors(entity)) {
      return [255, 160, 73]; // #FFA049 RGB
    }

    return null;
  }

  private _hsToRgb(h: number, s: number): number[] {
    // Convert HS to RGB
    const c = s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = 1 - c;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }

  private _xyToRgb(x: number, y: number): number[] {
    // Convert XY to RGB using the standard conversion
    const z = 1.0 - x - y;
    const Y = 1.0;
    const X = (Y / y) * x;
    const Z = (Y / y) * z;
    
    // Convert to RGB
    let r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    let b = X * 0.051713 - Y * 0.121364 + Z * 1.011530;
    
    // Apply gamma correction
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;
    
    // Clamp values
    r = Math.max(0, Math.min(1, r));
    g = Math.max(0, Math.min(1, g));
    b = Math.max(0, Math.min(1, b));
    
    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }

  private _colorTempToRgb(colorTemp: number): number[] {
    // Convert color temperature (Kelvin) to RGB using the Planckian locus
    // Clamp temperature to reasonable range (1000K - 40000K)
    const temp = Math.max(1000, Math.min(40000, colorTemp));
    
    let r, g, b;
    
    // Red calculation
    if (temp <= 6600) {
      r = 255;
    } else {
      r = temp - 60;
      r = 329.698727446 * Math.pow(r, -0.1332047592);
      r = Math.max(0, Math.min(255, r));
    }
    
    // Green calculation
    if (temp <= 6600) {
      g = temp;
      g = 99.4708025861 * Math.log(g) - 161.1195681661;
      g = Math.max(0, Math.min(255, g));
    } else {
      g = temp - 60;
      g = 288.1221695283 * Math.pow(g, -0.0755148492);
      g = Math.max(0, Math.min(255, g));
    }
    
    // Blue calculation
    if (temp >= 6600) {
      b = 255;
    } else if (temp <= 1900) {
      b = 0;
    } else {
      b = temp - 10;
      b = 138.5177312231 * Math.log(b) - 305.0447927307;
      b = Math.max(0, Math.min(255, b));
    }
    
    return [Math.round(r), Math.round(g), Math.round(b)];
  }

  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      hui-image {
        position: absolute;
        z-index: 0;
        height: 100%;
        width: 100%;
      }
      .sensors {
        --mdc-icon-size: 20px;
        color: var(--primary-text-color) !important;
      }
      .sensor-value {
        vertical-align: middle;
        color: var(--primary-text-color) !important;
      }
      .sensor-row {
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      .icon-container {
        position: absolute;
        top: 16px;
        left: 16px;
        color: white;
        z-index: 1;
        pointer-events: none;
      }
      .icon-container.row {
        top: 25%;
      }
      .icon-container.v2 {
        top: 8px;
        left: 8px;
        border-radius: 50%;
      }
      .mirrored .icon-container {
        left: unset;
        right: 16px;
      }
      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
      .content.row {
        flex-direction: column;
        justify-content: center;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        position: absolute;
        top: 8px;
        right: 8px;
        gap: 7px;
      }
      .right.row {
        top: unset;
      }
      .mirrored .right {
        right: unset;
        left: 8px;
        flex-direction: row-reverse;
      }
      .alerts,
      .covers,
      .custom_buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: -3px;
        gap: 2px;
      }
      .alerts.row,
      .covers.row,
      .custom_buttons.row {
        flex-direction: row-reverse;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-right: -3px;
      }
      .buttons.row {
        flex-direction: row-reverse;
      }
      .bottom {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 8px;
        left: 16px;
      }
      .bottom.row {
        flex-direction: row;
        left: calc(var(--row-size, 3) * 20px + 25px);
        bottom: unset;
        align-items: baseline;
        gap: 5px;
      }
      .mirrored .bottom.row {
        flex-direction: row-reverse;
        right: calc(var(--row-size, 3) * 20px + 25px) !important;
      }
      .mirrored .bottom {
        left: unset;
        right: 16px;
        text-align: end;
        align-items: end;
      }
      .name {
        font-weight: bold;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }
      .name.row {
        margin-bottom: 0;
      }
      .icon-with-count {
        display: flex;
        align-items: center;
        gap: 5px;
        background: none;
        border: solid 0.025rem rgba(255, 255, 255, 0.3);
        padding: 1px;
        border-radius: 5px;
        --mdc-icon-size: 20px;
      }
      .icon-with-count > ha-state-icon,
      .icon-with-count > span {
        pointer-events: none;
        color: white;
      }

      .toggle-on {
        color: white;
      }
      .toggle-off {
        color: rgba(255, 255, 255, 0.7) !important;
      }
      .off {
        color: var(--secondary-text-color);
      }
      .navigate {
        cursor: pointer;
      }
      .hover:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
      }
      .text-small {
        font-size: 0.9em;
        color: var(--primary-text-color);
      }
      .text-medium {
        font-size: 1em;
        color: var(--primary-text-color) !important;
      }
      .text-large {
        font-size: 1.3em;
        color: var(--primary-text-color);
      }
      .right * {
        pointer-events: auto;
      }
      .v2 .covers {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .covers {
        flex-direction: row;
      }
      .v2 .custom_buttons {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .custom_buttons {
        flex-direction: row;
      }
      .v2 .alerts {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .areas {
        flex-direction: row;
      }
      .v2 .buttons {
        flex-direction: row-reverse;
      }
      .mirrored .v2 .buttons {
        flex-direction: row;
      }
      .mirrored .v2 .bottom {
        right: 105px !important;
        left: unset;
      }
      .v2 .right {
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: calc(var(--row-size, 3) * 3px) 8px;
        top: unset;
        min-height: 24px;
        pointer-events: none;
      }
      .v2 .bottom {
        left: calc(var(--row-size, 3) * 15px + 55px);
        top: calc(var(--row-size, 3) * 5px + 4px);
        bottom: unset;
      }
      .v2 .bottom.row {
        top: calc(var(--row-size, 3) * 8px + 12px);
        left: calc(var(--row-size, 3) * 15px + 55px);
      }

      .v2 .name {
        margin-bottom: calc(var(--row-size, 3) * 1.5px + 1px);
      }
      .v2 .name.row {
        margin-bottom: 0px;
      }

      @supports (--row-size: 1) {
        .icon-container ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 20px);
        }
        .icon-container.v2 ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 15px);
          border-radius: 50%;
          display: flex;
          padding: 16px;
        }
      }

      @media (max-width: 768px) {
        .name {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
    `;
  }
}
