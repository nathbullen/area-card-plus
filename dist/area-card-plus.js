const $i = "b1.0", wi = {
  version: $i
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, Dt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mt = Symbol(), It = /* @__PURE__ */ new WeakMap();
let ni = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Dt && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = It.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && It.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ci = (t) => new ni(typeof t == "string" ? t : t + "", void 0, Mt), Me = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, o, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1]), t[0]);
  return new ni(i, t, Mt);
}, xi = (t, e) => {
  if (Dt) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const s = document.createElement("style"), o = ot.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, t.appendChild(s);
  }
}, Nt = Dt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Ci(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ai, defineProperty: Ei, getOwnPropertyDescriptor: Si, getOwnPropertyNames: Oi, getOwnPropertySymbols: Di, getPrototypeOf: Mi } = Object, pe = globalThis, Rt = pe.trustedTypes, ki = Rt ? Rt.emptyScript : "", _t = pe.reactiveElementPolyfillSupport, We = (t, e) => t, lt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ki : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, kt = (t, e) => !Ai(t, e), Ft = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), pe.litPropertyMetadata ?? (pe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ft) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(e, s, i);
      o !== void 0 && Ei(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: o, set: n } = Si(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const r = o == null ? void 0 : o.call(this);
      n == null || n.call(this, a), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(We("elementProperties"))) return;
    const e = Mi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(We("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(We("properties"))) {
      const i = this.properties, s = [...Oi(i), ...Di(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const o of s) i.unshift(Nt(o));
    } else e !== void 0 && i.push(Nt(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise(((i) => this.enableUpdating = i)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(((i) => i(this)));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostConnected) == null ? void 0 : s.call(i);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach(((i) => {
      var s;
      return (s = i.hostDisconnected) == null ? void 0 : s.call(i);
    }));
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    var n;
    const s = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, s);
    if (o !== void 0 && s.reflect === !0) {
      const a = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : lt).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, a;
    const s = this.constructor, o = s._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = s.getPropertyOptions(o), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? r.converter : lt;
      this._$Em = o;
      const d = c.fromAttribute(i, r.type);
      this[o] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, i, s) {
    var o;
    if (e !== void 0) {
      const n = this.constructor, a = this[e];
      if (s ?? (s = n.getPropertyOptions(e)), !((s.hasChanged ?? kt)(a, i) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: o, wrapped: n }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, a] of o) {
        const { wrapped: r } = a, c = this[n];
        r !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, a, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (s = this._$EO) == null || s.forEach(((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      })), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach(((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((i) => this._$ET(i, this[i])))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Se.elementStyles = [], Se.shadowRootOptions = { mode: "open" }, Se[We("elementProperties")] = /* @__PURE__ */ new Map(), Se[We("finalized")] = /* @__PURE__ */ new Map(), _t == null || _t({ ReactiveElement: Se }), (pe.reactiveElementVersions ?? (pe.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = globalThis, dt = Ge.trustedTypes, jt = dt ? dt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ai = "$lit$", _e = `lit$${Math.random().toFixed(9).slice(2)}$`, ri = "?" + _e, zi = `<${ri}>`, Ce = document, Xe = () => Ce.createComment(""), Je = (t) => t === null || typeof t != "object" && typeof t != "function", zt = Array.isArray, Hi = (t) => zt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, Ke = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, Vt = />/g, ge = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kt = /'/g, qt = /"/g, ci = /^(?:script|style|textarea|title)$/i, Li = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), w = Li(1), ne = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Wt = /* @__PURE__ */ new WeakMap(), be = Ce.createTreeWalker(Ce, 129);
function li(t, e) {
  if (!zt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(e) : e;
}
const Pi = (t, e) => {
  const i = t.length - 1, s = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ke;
  for (let r = 0; r < i; r++) {
    const c = t[r];
    let d, l, h = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, l = a.exec(c), l !== null); ) m = a.lastIndex, a === Ke ? l[1] === "!--" ? a = Ut : l[1] !== void 0 ? a = Vt : l[2] !== void 0 ? (ci.test(l[2]) && (o = RegExp("</" + l[2], "g")), a = ge) : l[3] !== void 0 && (a = ge) : a === ge ? l[0] === ">" ? (a = o ?? Ke, h = -1) : l[1] === void 0 ? h = -2 : (h = a.lastIndex - l[2].length, d = l[1], a = l[3] === void 0 ? ge : l[3] === '"' ? qt : Kt) : a === qt || a === Kt ? a = ge : a === Ut || a === Vt ? a = Ke : (a = ge, o = void 0);
    const u = a === ge && t[r + 1].startsWith("/>") ? " " : "";
    n += a === Ke ? c + zi : h >= 0 ? (s.push(d), c.slice(0, h) + ai + c.slice(h) + _e + u) : c + _e + (h === -2 ? r : u);
  }
  return [li(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Ye {
  constructor({ strings: e, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const r = e.length - 1, c = this.parts, [d, l] = Pi(e, i);
    if (this.el = Ye.createElement(d, s), be.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = be.nextNode()) !== null && c.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(ai)) {
          const m = l[a++], u = o.getAttribute(h).split(_e), f = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: n, name: f[2], strings: u, ctor: f[1] === "." ? Bi : f[1] === "?" ? Ii : f[1] === "@" ? Ni : ht }), o.removeAttribute(h);
        } else h.startsWith(_e) && (c.push({ type: 6, index: n }), o.removeAttribute(h));
        if (ci.test(o.tagName)) {
          const h = o.textContent.split(_e), m = h.length - 1;
          if (m > 0) {
            o.textContent = dt ? dt.emptyScript : "";
            for (let u = 0; u < m; u++) o.append(h[u], Xe()), be.nextNode(), c.push({ type: 2, index: ++n });
            o.append(h[m], Xe());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ri) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(_e, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += _e.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = Ce.createElement("template");
    return s.innerHTML = e, s;
  }
}
function De(t, e, i = t, s) {
  var a, r;
  if (e === ne) return e;
  let o = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const n = Je(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = o : i._$Cl = o), o !== void 0 && (e = De(t, o._$AS(t, e.values), o, s)), e;
}
let Ti = class {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? Ce).importNode(i, !0);
    be.currentNode = o;
    let n = be.nextNode(), a = 0, r = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let d;
        c.type === 2 ? d = new ke(n, n.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (d = new Ri(n, this, e)), this._$AV.push(d), c = s[++r];
      }
      a !== (c == null ? void 0 : c.index) && (n = be.nextNode(), a++);
    }
    return be.currentNode = Ce, o;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
};
class ke {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, s, o) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = De(this, e, i), Je(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== ne && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Hi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== x && Je(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ce.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Ye.createElement(li(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const a = new Ti(o, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Wt.get(e.strings);
    return i === void 0 && Wt.set(e.strings, i = new Ye(e)), i;
  }
  k(e) {
    zt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of e) o === i.length ? i.push(s = new ke(this.O(Xe()), this.O(Xe()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, o, n) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = x;
  }
  _$AI(e, i = this, s, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = De(this, e, i, 0), a = !Je(e) || e !== this._$AH && e !== ne, a && (this._$AH = e);
    else {
      const r = e;
      let c, d;
      for (e = n[0], c = 0; c < n.length - 1; c++) d = De(this, r[s + c], i, c), d === ne && (d = this._$AH[c]), a || (a = !Je(d) || d !== this._$AH[c]), d === x ? e = x : e !== x && (e += (d ?? "") + n[c + 1]), this._$AH[c] = d;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Bi extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
class Ii extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== x);
  }
}
class Ni extends ht {
  constructor(e, i, s, o, n) {
    super(e, i, s, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = De(this, e, i, 0) ?? x) === ne) return;
    const s = this._$AH, o = e === x && s !== x || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== x && (s === x || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ri {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    De(this, e);
  }
}
const Fi = { I: ke }, ft = Ge.litHtmlPolyfillSupport;
ft == null || ft(Ye, ke), (Ge.litHtmlVersions ?? (Ge.litHtmlVersions = [])).push("3.3.1");
const ji = (t, e, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = o = new ke(e.insertBefore(Xe(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis;
let oe = class extends Se {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ji(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return ne;
  }
};
var oi;
oe._$litElement$ = !0, oe.finalized = !0, (oi = $e.litElementHydrateSupport) == null || oi.call($e, { LitElement: oe });
const gt = $e.litElementPolyfillSupport;
gt == null || gt({ LitElement: oe });
($e.litElementVersions ?? ($e.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: kt }, Vi = (t = Ui, e, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const c = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(a, c, t);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, t, r), r;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(r) {
      const c = this[a];
      e.call(this, r), this.requestUpdate(a, c, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function B(t) {
  return (e, i) => typeof i == "object" ? Vi(t, e, i) : ((s, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(t) {
  return B({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { ATTRIBUTE: 1, CHILD: 2 }, ut = (t) => (...e) => ({ _$litDirective$: t, values: e });
let mt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = ut(class extends mt {
  constructor(t) {
    var e;
    if (super(t), t.type !== Ht.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter(((e) => t[e])).join(" ") + " ";
  }
  update(t, [e]) {
    var s, o;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(((n) => n !== ""))));
      for (const n in e) e[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const n of this.st) n in e || (i.remove(n), this.st.delete(n));
    for (const n in e) {
      const a = !!e[n];
      a === this.st.has(n) || (o = this.nt) != null && o.has(n) || (a ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return ne;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const di = "important", Ki = " !" + di, tt = ut(class extends mt {
  constructor(t) {
    var e;
    if (super(t), t.type !== Ht.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce(((e, i) => {
      const s = t[i];
      return s == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }), "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? i.removeProperty(s) : i[s] = null);
    for (const s in e) {
      const o = e[s];
      if (o != null) {
        this.ft.add(s);
        const n = typeof o == "string" && o.endsWith(Ki);
        s.includes("-") || n ? i.setProperty(s, n ? o.slice(0, -11) : o, n ? di : "") : i[s] = o;
      }
    }
    return ne;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: qi } = Fi, Gt = () => document.createComment(""), qe = (t, e, i) => {
  var n;
  const s = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = s.insertBefore(Gt(), o), r = s.insertBefore(Gt(), o);
    i = new qi(a, r, t, t.options);
  } else {
    const a = i._$AB.nextSibling, r = i._$AM, c = r !== t;
    if (c) {
      let d;
      (n = i._$AQ) == null || n.call(i, t), i._$AM = t, i._$AP !== void 0 && (d = t._$AU) !== r._$AU && i._$AP(d);
    }
    if (a !== o || c) {
      let d = i._$AA;
      for (; d !== a; ) {
        const l = d.nextSibling;
        s.insertBefore(d, o), d = l;
      }
    }
  }
  return i;
}, ve = (t, e, i = t) => (t._$AI(e, i), t), Wi = {}, Gi = (t, e = Wi) => t._$AH = e, Zi = (t) => t._$AH, vt = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = (t, e, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) s.set(t[o], o);
  return s;
}, de = ut(class extends mt {
  constructor(t) {
    if (super(t), t.type !== Ht.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let s;
    i === void 0 ? i = e : e !== void 0 && (s = e);
    const o = [], n = [];
    let a = 0;
    for (const r of t) o[a] = s ? s(r, a) : a, n[a] = i(r, a), a++;
    return { values: n, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, s]) {
    const o = Zi(t), { values: n, keys: a } = this.dt(e, i, s);
    if (!Array.isArray(o)) return this.ut = a, n;
    const r = this.ut ?? (this.ut = []), c = [];
    let d, l, h = 0, m = o.length - 1, u = 0, f = n.length - 1;
    for (; h <= m && u <= f; ) if (o[h] === null) h++;
    else if (o[m] === null) m--;
    else if (r[h] === a[u]) c[u] = ve(o[h], n[u]), h++, u++;
    else if (r[m] === a[f]) c[f] = ve(o[m], n[f]), m--, f--;
    else if (r[h] === a[f]) c[f] = ve(o[h], n[f]), qe(t, c[f + 1], o[h]), h++, f--;
    else if (r[m] === a[u]) c[u] = ve(o[m], n[u]), qe(t, o[h], o[m]), m--, u++;
    else if (d === void 0 && (d = Zt(a, u, f), l = Zt(r, h, m)), d.has(r[h])) if (d.has(r[m])) {
      const v = l.get(a[u]), g = v !== void 0 ? o[v] : null;
      if (g === null) {
        const z = qe(t, o[h]);
        ve(z, n[u]), c[u] = z;
      } else c[u] = ve(g, n[u]), qe(t, o[h], g), o[v] = null;
      u++;
    } else vt(o[m]), m--;
    else vt(o[h]), h++;
    for (; u <= f; ) {
      const v = qe(t, c[f + 1]);
      ve(v, n[u]), c[u++] = v;
    }
    for (; h <= m; ) {
      const v = o[h++];
      v !== null && vt(v);
    }
    return this.ut = a, Gi(t, c), ne;
  }
});
var Xt = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function Xi(t, e) {
  return !!(t === e || Xt(t) && Xt(e));
}
function Ji(t, e) {
  if (t.length !== e.length)
    return !1;
  for (var i = 0; i < t.length; i++)
    if (!Xi(t[i], e[i]))
      return !1;
  return !0;
}
function E(t, e) {
  e === void 0 && (e = Ji);
  var i = null;
  function s() {
    for (var o = [], n = 0; n < arguments.length; n++)
      o[n] = arguments[n];
    if (i && i.lastThis === this && e(o, i.lastArgs))
      return i.lastResult;
    var a = t.apply(this, o);
    return i = {
      lastResult: a,
      lastArgs: o,
      lastThis: this
    }, a;
  }
  return s.clear = function() {
    i = null;
  }, s;
}
const nt = ["sensor"], at = ["binary_sensor"], rt = ["cover"], wt = ["climate"], Yi = ["camera"], Ze = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "cover",
  "script",
  "scene"
], Ct = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
  cover: ["garage"]
}, Qe = {
  alarm_control_panel: { on: "mdi:alarm-light", off: "mdi:alarm-light-off" },
  siren: { on: "mdi:bell-ring", off: "mdi:bell_off" },
  light: { on: "mdi:lightbulb-multiple", off: "mdi:lightbulb-multiple-off" },
  switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  climate: { on: "mdi:thermostat", off: "mdi:thermostat-cog" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  air_quality: { on: "mdi:air-filter", off: "mdi:air-filter" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  lawn_mower: { on: "robot-mower", off: "mdi:robot-mower" },
  cover: {
    on: "mdi:garage-open",
    off: "mdi:garage",
    garage: { on: "mdi:garage-open", off: "mdi:garage" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    gate: { on: "mdi:gate-open", off: "mdi:gate" },
    blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
    curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
    damper: { on: "mdi:valve-open", off: "mdi:valve-closed" },
    awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" },
    shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
    shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" }
  },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  camera: { on: "mdi:camera", off: "mdi:camera-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  valve: { on: "mdi:valve", off: "mdi:valve-closed" },
  water_heater: { on: "mdi:water-boiler", off: "mdi:water-pump-off" },
  person: { on: "mdi:account", off: "mdi:account-off" },
  calendar: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  remote: { on: "mdi:remote", off: "mdi:remote-off" },
  scene: { on: "mdi:movie", off: "mdi:movie-off" },
  device_tracker: { on: "mdi:account", off: "mdi:account-off" },
  update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
  notifications: { on: "mdi:bell", off: "mdi:bell-off" },
  binary_sensor: {
    on: "mdi:power-off",
    off: "mdi:power-off",
    motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
    moisture: { on: "mdi:water-alert", off: "mdi:water-off" },
    window: { on: "mdi:window-open", off: "mdi:window-closed" },
    door: { on: "mdi:door-open", off: "mdi:door-closed" },
    lock: { on: "mdi:lock-open", off: "mdi:lock" },
    presence: { on: "mdi:home-outline", off: "mdi:home-export-outline" },
    occupancy: { on: "mdi:seat", off: "mdi:seat-outline" },
    vibration: { on: "mdi:vibrate", off: "mdi:vibrate-off" },
    opening: { on: "mdi:shield-lock-open", off: "mdi:shield-lock" },
    garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
    problem: {
      on: "mdi:alert-circle-outline",
      off: "mdi:alert-circle-check-outline"
    },
    smoke: {
      on: "mdi:smoke-detector-outline",
      off: "mdi:smoke-detector-off-outline"
    },
    running: { on: "mdi:play", off: "mdi:pause" },
    plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
    power: { on: "mdi:power", off: "mdi:power-off" },
    battery: { on: "mdi:battery-alert", off: "mdi:battery" },
    battery_charging: { on: "mdi:battery-charging", off: "mdi:battery-check" },
    gas: { on: "mdi:gas-station-outline", off: "mdi:gas-station-off-outline" },
    carbon_monoxide: { on: "mdi:molecule-co", off: "mdi:molecule-co" },
    cold: { on: "mdi:snowflake", off: "mdi:snowflake-off" },
    heat: { on: "mdi:weather-sunny", off: "mdi:weather-sunny-off" },
    connectivity: { on: "mdi:connection", off: "mdi:connection" },
    safety: { on: "mdi:shield-alert-outline", off: "mdi:shield-check-outline" },
    sound: { on: "mdi:volume-high", off: "mdi:volume-off" },
    update: { on: "mdi:autorenew", off: "mdi:autorenew-off" },
    tamper: { on: "mdi:shield-home", off: "mdi:shield-home" },
    light: { on: "mdi:lightbulb-outline", off: "mdi:lightbulb-off-outline" },
    moving: { on: "mdi:car", off: "mdi:car-off" }
  },
  sensor: { on: "mdi:gauge", off: "mdi:gauge" },
  script: { on: "mdi:script-text", off: "mdi:script-text" },
  tags: { on: "mdi:tag-multiple", off: "mdi:tag-multiple" },
  select: { on: "mdi:format-list-bulleted", off: "mdi:format-list-bulleted" },
  automation: { on: "mdi:robot", off: "mdi:robot-off" },
  button: { on: "mdi:gesture-tap-button", off: "mdi:gesture-tap-button" },
  number: { on: "mdi:numeric", off: "mdi:numeric" },
  conversation: { on: "mdi:comment-multiple", off: "mdi:comment-multiple" },
  assist_satellite: {
    on: "mdi:satellite-variant",
    off: "mdi:satellite-variant"
  },
  counter: { on: "mdi:counter", off: "mdi:counter" },
  event: { on: "mdi:calendar-star", off: "mdi:calendar-star" },
  group: {
    on: "mdi:google-circles-communities",
    off: "mdi:google-circles-communities"
  },
  image: { on: "mdi:image", off: "mdi:image-off" },
  image_processing: {
    on: "mdi:image-filter-center-focus",
    off: "mdi:image-filter-center-focus"
  },
  input_boolean: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  input_datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  input_number: { on: "mdi:numeric", off: "mdi:numeric" },
  input_select: {
    on: "mdi:format-list-bulleted",
    off: "mdi:format-list-bulleted"
  },
  input_text: { on: "mdi:text-box", off: "mdi:text-box" },
  stt: { on: "mdi:record-rec", off: "mdi:record" },
  sun: { on: "mdi:weather-sunny", off: "mdi:weather-night" },
  text: { on: "mdi:text-box", off: "mdi:text-box" },
  date: { on: "mdi:calendar", off: "mdi:calendar-remove" },
  datetime: { on: "mdi:calendar-clock", off: "mdi:calendar-clock" },
  time: { on: "mdi:clock-outline", off: "mdi:clock-off" },
  timer: { on: "mdi:timer-outline", off: "mdi:timer-off" },
  todo: {
    on: "mdi:check-circle-outline",
    off: "mdi:checkbox-blank-circle-outline"
  },
  tts: { on: "mdi:volume-high", off: "mdi:volume-off" },
  wake_word: { on: "mdi:microphone", off: "mdi:microphone-off" },
  weather: { on: "mdi:weather-partly-cloudy", off: "mdi:weather-night" },
  zone: { on: "mdi:map-marker", off: "mdi:map-marker-off" },
  geo_location: { on: "mdi:map-marker", off: "mdi:map-marker-off" }
}, Qi = [
  "hs",
  "xy",
  "rgb",
  "rgbw",
  "rgbww"
  /* RGBWW */
], es = (t, e) => {
  var i;
  return ((i = t.attributes.supported_color_modes) == null ? void 0 : i.includes(e)) || !1;
}, ts = (t) => {
  var e;
  return ((e = t.attributes.supported_color_modes) == null ? void 0 : e.some(
    (i) => Qi.includes(i)
  )) || !1;
}, yt = (t) => ts(t) || es(
  t,
  "color_temp"
  /* COLOR_TEMP */
), is = (t) => t.attributes.color_mode === "rgbww" ? t.attributes.rgbww_color : t.attributes.color_mode === "rgbw" ? t.attributes.rgbw_color : t.attributes.rgb_color, ee = [
  "closed",
  "locked",
  "off",
  "docked",
  "idle",
  "standby",
  "paused",
  "auto",
  "not_home",
  "disarmed"
], ss = (t, e, i, s, o) => {
  var h, m, u, f, v;
  const n = i || void 0, a = (e == null ? void 0 : e.darkMode) || !1;
  t.__themes || (t.__themes = { cacheKey: null, keys: /* @__PURE__ */ new Set() });
  let r = n || "", c = {};
  if (n === "default" && ((h = t.__themes) == null ? void 0 : h.cacheKey) === "default")
    return;
  if (n && n !== "default" && ((m = e == null ? void 0 : e.themes) != null && m[n])) {
    const { modes: g, ...z } = e.themes[n] || {};
    c = { ...c, ...z }, g && (a && g.dark ? c = { ...c, ...g.dark } : !a && g.light && (c = { ...c, ...g.light }));
  } else if (!n && (!((u = t.__themes) != null && u.keys) || t.__themes.keys.size === 0))
    return;
  const d = ((f = t.__themes) == null ? void 0 : f.keys) || /* @__PURE__ */ new Set(), l = new Set(Object.keys(c));
  if (n === "default" && l.size === 0) {
    for (const g of d)
      try {
        t.style.removeProperty(`--${g}`);
      } catch {
      }
    t.__themes = { cacheKey: "default", keys: /* @__PURE__ */ new Set() };
    return;
  }
  if (((v = t.__themes) == null ? void 0 : v.cacheKey) === r) {
    let g = !0;
    if (d.size !== l.size)
      g = !1;
    else
      for (const z of d)
        if (!l.has(z)) {
          g = !1;
          break;
        }
    if (g) return;
  }
  for (const g of d)
    if (!l.has(g))
      try {
        t.style.removeProperty(`--${g}`);
      } catch {
      }
  for (const [g, z] of Object.entries(c))
    t.style.setProperty(`--${g}`, String(z));
  t.__themes.cacheKey = r || null, t.__themes.keys = l;
}, j = (t, e, i, s) => {
  s = s || {}, i = i ?? {};
  const o = new Event(e, {
    bubbles: s.bubbles === void 0 ? !0 : s.bubbles,
    cancelable: !!s.cancelable,
    composed: s.composed === void 0 ? !0 : s.composed
  });
  return o.detail = i, t.dispatchEvent(o), o;
}, q = (t) => t.substr(0, t.indexOf("."));
var Oe = /* @__PURE__ */ ((t) => (t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none", t))(Oe || {});
const os = (t, e = 2) => Math.round(t * 10 ** e) / 10 ** e, ns = (t) => as(t.attributes), as = (t) => !!t.unit_of_measurement || !!t.state_class, rs = (t) => {
  switch (t.number_format) {
    case Oe.comma_decimal:
      return ["en-US", "en"];
    // Use United States with fallback to English formatting 1,234,567.89
    case Oe.decimal_comma:
      return ["de", "es", "it"];
    // Use German with fallback to Spanish then Italian formatting 1.234.567,89
    case Oe.space_comma:
      return ["fr", "sv", "cs"];
    // Use French with fallback to Swedish and Czech formatting 1 234 567,89
    case Oe.system:
      return;
    default:
      return t.language;
  }
}, Jt = (t, e, i) => {
  const s = e ? rs(e) : void 0;
  if (Number.isNaN = Number.isNaN || function o(n) {
    return typeof n == "number" && o(n);
  }, (e == null ? void 0 : e.number_format) !== Oe.none && !Number.isNaN(Number(t)) && Intl)
    try {
      return new Intl.NumberFormat(
        s,
        Yt(t, i)
      ).format(Number(t));
    } catch (o) {
      return console.error(o), new Intl.NumberFormat(
        void 0,
        Yt(t, i)
      ).format(Number(t));
    }
  return typeof t == "string" ? t : `${os(t, i == null ? void 0 : i.maximumFractionDigits).toString()}${(i == null ? void 0 : i.style) === "currency" ? ` ${i.currency}` : ""}`;
}, Yt = (t, e) => {
  const i = {
    maximumFractionDigits: 2,
    ...e
  };
  if (typeof t != "string")
    return i;
  if (!e || e.minimumFractionDigits === void 0 && e.maximumFractionDigits === void 0) {
    const s = t.indexOf(".") > -1 ? t.split(".")[1].length : 0;
    i.minimumFractionDigits = s, i.maximumFractionDigits = s;
  }
  return i;
}, cs = E(
  (t) => new Intl.Collator(t)
), ls = E(
  (t) => new Intl.Collator(t, { sensitivity: "accent" })
), hi = (t, e) => t < e ? -1 : t > e ? 1 : 0, ds = (t, e, i = void 0) => Intl != null && Intl.Collator ? cs(i).compare(t, e) : hi(t, e), ui = (t, e, i = void 0) => Intl != null && Intl.Collator ? ls(i).compare(t, e) : hi(t.toLowerCase(), e.toLowerCase()), hs = (t) => {
  switch (t.language) {
    case "cs":
    case "de":
    case "fi":
    case "fr":
    case "sk":
    case "sv":
      return " ";
    default:
      return "";
  }
}, Qt = (t, e) => t === "°" ? "" : e && t === "%" ? hs(e) : " ", us = async (t, e) => new Promise((i) => {
  const s = e(t, (o) => {
    s(), i(o);
  });
}), mi = "unavailable", _i = "unknown", ms = (t) => {
  let e = [];
  function i(o) {
    let n = [];
    for (let a = 0; a < e.length; a++)
      e[a] === o ? o = null : n.push(e[a]);
    e = n;
  }
  function s(o, n) {
    t = n ? o : Object.assign(Object.assign({}, t), o);
    let a = e;
    for (let r = 0; r < a.length; r++)
      a[r](t);
  }
  return {
    get state() {
      return t;
    },
    /**
     * Create a bound copy of the given action function.
     * The bound returned function invokes action() and persists the result back to the store.
     * If the return value of `action` is a Promise, the resolved value will be used as state.
     * @param {Function} action	An action of the form `action(state, ...args) -> stateUpdate`
     * @returns {Function} boundAction()
     */
    action(o) {
      function n(a) {
        s(a, !1);
      }
      return function() {
        let a = [t];
        for (let c = 0; c < arguments.length; c++)
          a.push(arguments[c]);
        let r = o.apply(this, a);
        if (r != null)
          return r instanceof Promise ? r.then(n) : n(r);
      };
    },
    /**
     * Apply a partial state object to the current state, invoking registered listeners.
     * @param {Object} update				An object with properties to be merged into state
     * @param {Boolean} [overwrite=false]	If `true`, update will replace state instead of being merged into it
     */
    setState: s,
    clearState() {
      t = void 0;
    },
    /**
     * Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.
     * @param {Function} listener	A function to call when state changes. Gets passed the new state.
     * @returns {Function} unsubscribe()
     */
    subscribe(o) {
      return e.push(o), () => {
        i(o);
      };
    }
    // /**
    //  * Remove a previously-registered listener function.
    //  * @param {Function} listener	The callback previously passed to `subscribe()` that should be removed.
    //  * @function
    //  */
    // unsubscribe,
  };
}, _s = 5e3, ps = (t, e, i, s, o = { unsubGrace: !0 }) => {
  if (t[e])
    return t[e];
  let n = 0, a, r, c = ms();
  const d = () => {
    if (!i)
      throw new Error("Collection does not support refresh");
    return i(t).then((v) => c.setState(v, !0));
  }, l = () => d().catch((v) => {
    if (t.connected)
      throw v;
  }), h = () => {
    if (r !== void 0) {
      clearTimeout(r), r = void 0;
      return;
    }
    s && (a = s(t, c)), i && (t.addEventListener("ready", l), l()), t.addEventListener("disconnected", f);
  }, m = () => {
    r = void 0, a && a.then((v) => {
      v();
    }), c.clearState(), t.removeEventListener("ready", d), t.removeEventListener("disconnected", f);
  }, u = () => {
    r = setTimeout(m, _s);
  }, f = () => {
    r && (clearTimeout(r), m());
  };
  return t[e] = {
    get state() {
      return c.state;
    },
    refresh: d,
    subscribe(v) {
      n++, n === 1 && h();
      const g = c.subscribe(v);
      return c.state !== void 0 && setTimeout(() => v(c.state), 0), () => {
        g(), n--, n || (o.unsubGrace ? u() : m());
      };
    }
  }, t[e];
}, Lt = (t, e, i, s, o) => ps(s, t, e, i).subscribe(o), Pt = (t, e, i = !1) => {
  let s;
  const o = (...n) => {
    const a = () => {
      s = void 0, i || t(...n);
    }, r = i && !s;
    clearTimeout(s), s = window.setTimeout(a, e), r && t(...n);
  };
  return o.cancel = () => {
    clearTimeout(s);
  }, o;
}, pi = (t) => t.sendMessagePromise({
  type: "config/entity_registry/list"
}), fs = (t, e) => t.subscribeEvents(
  Pt(
    () => pi(t).then(
      (i) => e.setState(i, !0)
    ),
    500,
    !0
  ),
  "entity_registry_updated"
), gs = (t, e) => Lt(
  "_entityRegistry",
  pi,
  fs,
  t,
  e
);
E(
  (t) => {
    const e = {};
    for (const i of t)
      e[i.entity_id] = i;
    return e;
  }
);
E(
  (t) => {
    const e = {};
    for (const i of t)
      e[i.id] = i;
    return e;
  }
);
let it;
const vs = async (t) => it || (it = t.callWS({
  type: "sensor/numeric_device_classes"
}), it), fi = (t) => t.sendMessagePromise({
  type: "config/area_registry/list"
}).then(
  (e) => e.sort((i, s) => ds(i.name, s.name))
), ys = (t, e) => t.subscribeEvents(
  Pt(
    () => fi(t).then(
      (i) => e.setState(i, !0)
    ),
    500,
    !0
  ),
  "area_registry_updated"
), ei = (t, e) => Lt(
  "_areaRegistry",
  fi,
  ys,
  t,
  e
), gi = (t) => t.sendMessagePromise({
  type: "config/device_registry/list"
}), bs = (t, e) => t.subscribeEvents(
  Pt(
    () => gi(t).then(
      (i) => e.setState(i, !0)
    ),
    500,
    !0
  ),
  "device_registry_updated"
), $s = (t, e) => Lt(
  "_dr",
  gi,
  bs,
  t,
  e
);
var ws = Object.defineProperty, Cs = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && ws(e, i, o), o;
};
const xs = (t) => {
  class e extends t {
    connectedCallback() {
      super.connectedCallback(), this._checkSubscribed();
    }
    disconnectedCallback() {
      if (super.disconnectedCallback(), this.__unsubs) {
        for (; this.__unsubs.length; ) {
          const s = this.__unsubs.pop();
          s instanceof Promise ? s.then((o) => o()) : s();
        }
        this.__unsubs = void 0;
      }
    }
    updated(s) {
      if (super.updated(s), s.has("hass")) {
        this._checkSubscribed();
        return;
      }
      if (this.hassSubscribeRequiredHostProps) {
        for (const o of s.keys())
          if (this.hassSubscribeRequiredHostProps.includes(o)) {
            this._checkSubscribed();
            return;
          }
      }
    }
    hassSubscribe() {
      return [];
    }
    _checkSubscribed() {
      var s;
      this.__unsubs !== void 0 || !this.isConnected || this.hass === void 0 || (s = this.hassSubscribeRequiredHostProps) != null && s.some(
        (o) => this[o] === void 0
      ) || (this.__unsubs = this.hassSubscribe());
    }
  }
  return Cs([
    B({ attribute: !1 })
  ], e.prototype, "hass"), e;
}, ct = (t, e) => {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    let i, s;
    if (Array.isArray(t)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (!ct(t[i], e[i]))
          return !1;
      return !0;
    }
    if (t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      for (i of t.entries())
        if (!ct(i[1], e.get(i[0])))
          return !1;
      return !0;
    }
    if (t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (i of t.entries())
        if (!e.has(i[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
      if (s = t.length, s !== e.length)
        return !1;
      for (i = s; i-- !== 0; )
        if (t[i] !== e[i])
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === e.toString();
    const o = Object.keys(t);
    if (s = o.length, s !== Object.keys(e).length)
      return !1;
    for (i = s; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, o[i]))
        return !1;
    for (i = s; i-- !== 0; ) {
      const n = o[i];
      if (!ct(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
class As extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = 500, this.held = !1, this.cancelled = !1;
  }
  connectedCallback() {
    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll"
    ].forEach((e) => {
      document.addEventListener(
        e,
        () => {
          this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
        },
        { passive: !0 }
      );
    });
  }
  bind(e, i = {}) {
    e.actionHandler && ct(i, e.actionHandler.options) || (e.actionHandler && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("mousedown", e.actionHandler.start), e.removeEventListener("click", e.actionHandler.end), e.removeEventListener(
      "keydown",
      e.actionHandler.handleKeyDown
    )), e.actionHandler = { options: i }, !i.disabled && (e.actionHandler.start = (s) => {
      this.cancelled = !1, s.touches ? (s.touches[0].clientX, s.touches[0].clientY) : (s.clientX, s.clientY), i.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, e.actionHandler.end = (s) => {
      if (s.currentTarget !== s.target || s.type === "touchcancel" || s.type === "touchend" && this.cancelled)
        return;
      const o = s.target;
      s.cancelable && s.preventDefault(), i.hasHold && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? j(o, "action", { action: "hold" }) : i.hasDoubleClick ? s.type === "click" && s.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, j(o, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, j(o, "action", { action: "double_tap" })) : j(o, "action", { action: "tap" });
    }, e.actionHandler.handleKeyDown = (s) => {
      ["Enter", " "].includes(s.key) && s.currentTarget.actionHandler.end(s);
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keydown", e.actionHandler.handleKeyDown)));
  }
}
customElements.define("action-handler-area-card", As);
const Es = () => {
  const t = document.body;
  if (t.querySelector("action-handler-area-card"))
    return t.querySelector("action-handler-area-card");
  const e = document.createElement("action-handler-area-card");
  return t.appendChild(e), e;
}, Ss = (t, e) => {
  const i = Es();
  i && i.bind(t, e);
}, le = ut(
  class extends mt {
    update(t, [e]) {
      return Ss(t.element, e), ne;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(t) {
    }
  }
), bt = async (t, e, i, s) => {
  j(t, "hass-action", { config: i, action: s });
};
function V(t) {
  return t !== void 0 && t.action !== "none";
}
var Os = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", Ds = "M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z", Tt = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Ms = "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z", ti = "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z", $t = "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z", ks = "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z", zs = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z", vi = "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", Hs = "M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z";
function ii(t, e, i) {
  return t.localize(
    `component.${i}.entity_component._.state.${e}`
  ) || e;
}
function yi(t, e) {
  switch (e.name) {
    case "theme":
      return `${t.localize(
        "ui.panel.lovelace.editor.card.generic.theme"
      )} (${t.localize("ui.panel.lovelace.editor.card.config.optional")})`;
    case "area":
      return t.localize("ui.panel.lovelace.editor.card.area.name");
    case "navigation_path":
      return t.localize(
        "ui.panel.lovelace.editor.action-editor.navigation_path"
      );
    case "area_name":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.name");
    case "area_icon":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.icon");
    case "area_name_color":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.name") + " " + t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "area_icon_color":
      return t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("ui.panel.lovelace.editor.card.generic.icon") + " " + t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "v2_color":
      return t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "css":
      return "CSS";
    case "domain_css":
      return "Domain CSS";
    case "cover_css":
      return "Cover CSS";
    case "alert_css":
      return "Alert CSS";
    case "icon_css":
      return "Icon CSS";
    case "name_css":
      return "Name CSS";
    case "mirrored":
      return "Mirror Card Layout";
    case "alert_color":
    case "sensor_color":
    case "domain_color":
      return t.localize("ui.panel.lovelace.editor.card.tile.color");
    case "columns":
      return t.localize("ui.components.grid-size-picker.columns");
    case "appearance":
      return t.localize("ui.panel.lovelace.editor.card.tile.appearance") || "Appearance";
    case "toggle_domains":
      return t.localize("ui.panel.lovelace.editor.cardpicker.domain");
    case "popup":
      return "Popup";
    case "popup_domains":
      return "Popup " + t.localize("ui.panel.lovelace.editor.cardpicker.domain");
    case "extra_entities":
      return t.localize("ui.common.add") + " " + t.localize("ui.panel.lovelace.editor.card.generic.entities") + ":";
    case "hidden_entities":
      return t.localize("ui.common.hide") + " " + t.localize("ui.panel.lovelace.editor.card.generic.entities") + ":";
    case "hide_unavailable":
      return t.localize("ui.common.hide") + " " + t.localize("state.default.unavailable");
    case "show_active":
      return t.localize("ui.common.hide") + " " + t.localize("ui.components.entity.entity-state-picker.state") + " " + t.localize("component.binary_sensor.entity_component._.state.off");
    case "edit_filters":
      return t.localize("ui.panel.lovelace.editor.common.edit") + " " + t.localize("ui.components.subpage-data-table.filters");
    case "label_filter":
      return t.localize("ui.components.label-picker.label") + " " + t.localize("ui.components.related-filter-menu.filter");
    case "cover_classes":
      return t.localize("component.cover.entity_component._.name");
    case "label":
      return t.localize("ui.components.label-picker.label");
    case "show_sensor_icons":
      return t.localize("ui.panel.lovelace.editor.card.generic.show_icon");
    case "wrap_sensor_icons":
      return t.localize(
        "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"
      ) + " " + t.localize("ui.panel.lovelace.editor.card.sensor.name");
    case "category_filter":
      return t.localize("ui.components.category-picker.category") + " " + t.localize("ui.components.related-filter-menu.filter");
    case "name":
      return t.localize("ui.common.name");
    case "state":
      return t.localize("ui.components.entity.entity-state-picker.state");
    case "ungroup_areas":
      return t.localize("ui.common.disable") + " " + t.localize("ui.panel.lovelace.editor.card.area.name") + " " + t.localize("component.group.entity_component._.name");
    case "popup_sort":
      return "Popup Sort";
    case "show_icon":
    case "tap_action":
    case "hold_action":
    case "double_tap_action":
    case "camera_view":
      return t.localize(
        `ui.panel.lovelace.editor.card.generic.${e.name}`
      );
    case "show_camera":
      return t.localize("ui.panel.lovelace.editor.card.area.show_camera");
    default:
      return t.localize(
        `ui.panel.lovelace.editor.card.area.${e.name}`
      );
  }
}
var Ls = Object.defineProperty, fe = (t, e, i, s) => {
  for (var o = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = a(e, i, o) || o);
  return o && Ls(e, i, o), o;
};
const bi = [mi, _i], Ps = [bi, ee];
var we;
const ue = (we = class extends oe {
  constructor() {
    super(...arguments), this.open = !1, this.content = "", this.entities = [], this._cardEls = /* @__PURE__ */ new Map(), this._onClosed = (e) => {
      this.open = !1, this._cardEls.clear(), this.dispatchEvent(
        new CustomEvent("dialog-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      ), this.dispatchEvent(
        new CustomEvent("popup-closed", {
          bubbles: !0,
          composed: !0,
          detail: { dialog: this }
        })
      );
    }, this.DOMAIN_FEATURES = {
      alarm_control_panel: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "alarm-modes",
            modes: [
              "armed_home",
              "armed_away",
              "armed_night",
              "armed_vacation",
              "armed_custom_bypass",
              "disarmed"
            ]
          }
        ]
      },
      light: {
        state_content: ["state", "brightness", "last_changed"],
        features: [{ type: "light-brightness" }]
      },
      cover: {
        state_content: ["state", "position", "last_changed"],
        features: [{ type: "cover-open-close" }, { type: "cover-position" }]
      },
      vacuum: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "vacuum-commands",
            commands: [
              "start_pause",
              "stop",
              "clean_spot",
              "locate",
              "return_home"
            ]
          }
        ]
      },
      climate: {
        state_content: ["state", "current_temperature", "last_changed"],
        features: [
          {
            type: "climate-hvac-modes",
            hvac_modes: [
              "auto",
              "heat_cool",
              "heat",
              "cool",
              "dry",
              "fan_only",
              "off"
            ]
          }
        ]
      },
      water_heater: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "water-heater-operation-modes",
            operation_modes: [
              "electric",
              "gas",
              "heat_pump",
              "eco",
              "performance",
              "high_demand",
              "off"
            ]
          }
        ]
      },
      humidifier: {
        state_content: ["state", "current_humidity", "last_changed"],
        features: [{ type: "target-humidity" }]
      },
      media_player: {
        show_entity_picture: !0,
        state_content: ["state", "volume_level", "last_changed"],
        features: [{ type: "media-player-playback" }]
      },
      lock: {
        state_content: ["state", "last_changed"],
        features: [{ type: "lock-commands" }]
      },
      fan: {
        state_content: ["state", "percentage", "last_changed"],
        features: [{ type: "fan-speed" }]
      },
      counter: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "counter-actions",
            actions: ["increment", "decrement", "reset"]
          }
        ]
      },
      lawn_mower: {
        state_content: ["state", "last_changed"],
        features: [
          {
            type: "lawn-mower-commands",
            commands: ["start_pause", "dock"]
          }
        ]
      },
      update: {
        state_content: ["state", "latest_version", "last_changed"],
        features: [{ type: "update-actions", backup: "ask" }]
      },
      switch: {
        state_content: ["state", "last_changed"],
        features: [{ type: "toggle" }]
      },
      scene: {
        state_content: ["state", "last_changed"],
        features: [{ type: "button" }]
      },
      script: {
        state_content: ["state", "last_changed"],
        features: [{ type: "button" }]
      },
      input_boolean: {
        state_content: ["state", "last_changed"],
        features: [{ type: "toggle" }]
      },
      calendar: {
        state_content: "message"
      },
      timer: {
        state_content: ["state", "remaining_time"]
      },
      binary_sensor: {
        state_content: ["state", "last_changed"]
      },
      device_tracker: {
        state_content: ["state", "last_changed"]
      },
      remote: {
        state_content: ["state", "last_changed"]
      },
      valve: {
        state_content: ["state", "last_changed"],
        features: [{ type: "valve-open-close" }]
      }
    }, this.computeLabel = E(
      (e, i, s) => yi(this.hass, e)
    );
  }
  getFriendlyName(e, i) {
    var s, o;
    return ((o = (s = e == null ? void 0 : e[i]) == null ? void 0 : s.attributes) == null ? void 0 : o.friendly_name) || i;
  }
  compareByFriendlyName(e, i) {
    return (s, o) => ui(
      this.getFriendlyName(e, s),
      this.getFriendlyName(e, o),
      i
    );
  }
  showDialog(e) {
    this.title = e.title ?? this.title, this.hass = e.hass, this.entities = e.entities ?? [], e.content !== void 0 && (this.content = e.content), this.selectedDomain = e.selectedDomain, this.selectedDeviceClass = e.selectedDeviceClass, this.selectedGroup = e.selectedGroup, this.card = e.card, this._cardEls.clear(), this.open = !0, this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cardEls.clear();
  }
  _toTileConfig(e) {
    return {
      type: "tile",
      entity: e.entity
    };
  }
  async _createCardElement(e, i, s = !1) {
    var o, n, a;
    try {
      const r = await ((o = window == null ? void 0 : window.loadCardHelpers) == null ? void 0 : o.call(window));
      if (r != null && r.createCardElement) {
        const c = r.createCardElement(i);
        return c.hass = e, (n = c.setAttribute) == null || n.call(c, "data-hui-card", ""), c;
      }
    } catch {
    }
    try {
      const r = i.type || "tile", c = typeof r == "string" && r.startsWith("custom:"), d = c ? r.slice(7) : `hui-${r}-card`;
      c && !customElements.get(d) && await customElements.whenDefined(d).catch(() => {
      });
      const l = document.createElement(d);
      return typeof l.setConfig == "function" && l.setConfig(i), l.hass = e, (a = l.setAttribute) == null || a.call(l, "data-hui-card", ""), l;
    } catch {
      if (!s)
        return this._createCardElement(
          e,
          this._toTileConfig(i),
          !0
        );
      const r = document.createElement("div");
      return r.setAttribute("data-hui-card", ""), r;
    }
  }
  _getPopupCardConfig(e) {
    var u, f, v, g, z, R, C, $, A, I, Z;
    const i = this.card, s = q(e.entity_id), o = this.selectedDomain || s, n = this.selectedDomain ? this.selectedDeviceClass : (g = (v = (f = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : f[e.entity_id]) == null ? void 0 : v.attributes) == null ? void 0 : g.device_class, a = (i == null ? void 0 : i._config) || {};
    let r;
    at.includes(o) ? (r = (z = a.customization_alert) == null ? void 0 : z.find(
      (H) => H.type === n
    ), r || (r = (R = a.customization_domain) == null ? void 0 : R.find(
      (H) => H.type === o
    ))) : nt.includes(o) ? (r = (C = a.customization_sensor) == null ? void 0 : C.find(
      (H) => H.type === n
    ), r || (r = ($ = a.customization_domain) == null ? void 0 : $.find(
      (H) => H.type === o
    ))) : rt.includes(o) ? (r = (A = a.customization_cover) == null ? void 0 : A.find(
      (H) => H.type === n
    ), r || (r = (I = a.customization_domain) == null ? void 0 : I.find(
      (H) => H.type === o
    ))) : r = (Z = a.customization_domain) == null ? void 0 : Z.find(
      (H) => H.type === o
    );
    const c = r == null ? void 0 : r.popup_card, d = c && typeof c.type == "string" && c.type || (r == null ? void 0 : r.popup_card_type) || "tile", l = d === "tile" ? this.DOMAIN_FEATURES[s] ?? {} : {};
    let h = {};
    if (c && typeof c == "object") {
      const { type: H, entity: X, ...Ee } = c;
      h = Ee;
    } else
      h = (r == null ? void 0 : r.popup_card_options) ?? {};
    return {
      type: d,
      entity: e.entity_id,
      ...l,
      ...h
    };
  }
  shouldUpdate(e) {
    return this.open ? !0 : e.has("open");
  }
  _getOrCreateCard(e) {
    const i = e.entity_id, s = this._cardEls.get(i);
    if (s) {
      try {
        s.hass = this.hass;
      } catch {
      }
      return s;
    }
    const o = document.createElement("div");
    o.classList.add("card-placeholder"), o.setAttribute("data-hui-card", ""), this._cardEls.set(i, o);
    const n = this._getPopupCardConfig(e);
    return this._createCardElement(this.hass, n).then((a) => {
      try {
        this._cardEls.get(i) === o && (o.replaceWith(a), this._cardEls.set(i, a)), a.hass = this.hass;
      } catch {
      }
    }), o;
  }
  _isActive(e) {
    return !Ps.flat().includes(e.state);
  }
  sortEntitiesForPopup(e) {
    var n, a;
    const i = ((a = (n = this.card) == null ? void 0 : n._config) == null ? void 0 : a.popup_sort) || "name", s = e.slice();
    if (i === "state") {
      const r = this.compareByFriendlyName(
        this.hass.states,
        this.hass.locale.language
      );
      return s.sort((c, d) => {
        const l = this._isActive(c) ? 0 : 1, h = this._isActive(d) ? 0 : 1;
        if (l !== h) return l - h;
        const m = q(c.entity_id), u = q(d.entity_id), f = this.hass ? ii(this.hass, c.state, m) : c.state, v = this.hass ? ii(this.hass, d.state, u) : d.state, g = (f || "").localeCompare(v || "");
        return g !== 0 ? g : r(c.entity_id, d.entity_id);
      });
    }
    const o = this.compareByFriendlyName(
      this.hass.states,
      this.hass.locale.language
    );
    return s.sort((r, c) => o(r.entity_id, c.entity_id));
  }
  render() {
    var I, Z, H, X, Ee, He, Le, Pe, Te, Be, Ie, Ne, Re;
    if (!this.open || !this.hass || !this.card) return w``;
    const e = this.card, i = (I = e._config) == null ? void 0 : I.area, s = ((Z = e._devicesInArea) == null ? void 0 : Z.call(e, i, e._devices)) ?? /* @__PURE__ */ new Set(), o = e._entities || [], n = this.hass.states, a = ((H = e._config) == null ? void 0 : H.popup_domains) || [], r = ((X = e._config) == null ? void 0 : X.hidden_entities) || [], c = ((Ee = e._config) == null ? void 0 : Ee.extra_entities) || [], d = (He = e._config) == null ? void 0 : He.label, l = (Le = e._config) == null ? void 0 : Le.hide_unavailable, h = (Pe = e._config) == null ? void 0 : Pe.category_filter, m = this.selectedDomain || null, u = this.selectedDeviceClass || null, f = (S) => {
      if (!h) return !0;
      const L = o.find(
        (W) => W.entity_id === S
      ), M = L == null ? void 0 : L.entity_category;
      return M ? h === "config" ? M !== "config" : h === "diagnostic" ? M !== "diagnostic" : h === "config+diagnostic" ? M !== "config" && M !== "diagnostic" : !0 : !0;
    }, v = o.reduce(
      (S, L) => {
        var M;
        if (!L.hidden_by && (L.area_id ? L.area_id === i : L.device_id && s.has(L.device_id)) && (!d || L.labels && L.labels.some(
          (W) => d.includes(W)
        ))) {
          const W = L.entity_id;
          !r.includes(W) && f(W) && (!l || !bi.includes((M = n[W]) == null ? void 0 : M.state)) && S.push(W);
        }
        return S;
      },
      []
    );
    let g = [];
    for (const S of v) {
      const L = q(S);
      if (a.length > 0 && !a.includes(L)) continue;
      const M = n[S];
      M && (m && L !== m || u && M.attributes.device_class !== u || g.push(M));
    }
    for (const S of c) {
      const L = q(S), M = n[S];
      M && (a.length > 0 && !a.includes(L) || m && L !== m || u && M.attributes.device_class !== u || f(S) && !g.some((W) => W.entity_id === S) && g.push(M));
    }
    const z = ((Te = e == null ? void 0 : e._config) == null ? void 0 : Te.ungroup_areas) === !0;
    let R = (Be = e._config) != null && Be.columns ? e._config.columns : 4, C = [], $ = [];
    if (z)
      $ = this.sortEntitiesForPopup(g), R = Math.min(R, Math.max(1, $.length));
    else {
      const S = {};
      for (const J of g) {
        const ie = q(J.entity_id);
        ie in S || (S[ie] = []), S[ie].push(J);
      }
      const L = Object.keys(Qe || {}), M = a.length > 0 ? a : L;
      C = Object.entries(S).filter(([J]) => !m || J === m).sort(([J], [ie]) => {
        const Fe = M.indexOf(J), je = M.indexOf(ie);
        return (Fe === -1 ? M.length : Fe) - (je === -1 ? M.length : je);
      }).map(
        ([J, ie]) => [J, this.sortEntitiesForPopup(ie)]
      );
      const W = C.length ? Math.max(...C.map(([, J]) => J.length)) : 0;
      R = Math.min(R, Math.max(1, W));
    }
    const A = ((Ne = e._area) == null ? void 0 : Ne.call(e, (Ie = e._config) == null ? void 0 : Ie.area, e._areas)) ?? null;
    return w`
      <ha-dialog
        hideActions
        id="more-info-dialog"
        style="--columns: ${R};"
        .open=${this.open}
        @closed=${this._onClosed}
      >
        <style>
          ${we.styles}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${Tt}
            @click=${this._onClosed}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${((Re = e._config) == null ? void 0 : Re.area_name) || A && A.name}</h3>
          </div>
        </div>

        <div class="dialog-content">
          ${z ? w`
                <div class="entity-cards">
                  ${$.map(
      (S) => w`
                      <div class="entity-card">
                        ${this._getOrCreateCard(S)}
                      </div>
                    `
    )}
                </div>
              ` : w`${de(
      C,
      ([S]) => S,
      ([S, L]) => w`
                  <div class="cards-wrapper">
                    <h4>
                      ${S === "binary_sensor" || S === "sensor" || S === "cover" ? this._getDomainName(
        S,
        u || void 0
      ) : this._getDomainName(S)}
                    </h4>
                    <div class="entity-cards">
                      ${de(
        L,
        (M) => M.entity_id,
        (M) => w`
                          <div class="entity-card">
                            ${this._getOrCreateCard(M)}
                          </div>
                        `
      )}
                    </div>
                  </div>
                `
    )}`}
        </div>
      </ha-dialog>
    `;
  }
  _getDomainName(e, i) {
    return this.hass ? e === "scene" ? "Scene" : e === "binary_sensor" || e === "sensor" || e === "cover" ? i ? this.hass.localize(
      `component.${e}.entity_component.${i}.name`
    ) : this.hass.localize(`component.${e}.entity_component._.name`) : this.hass.localize(`component.${e}.entity_component._.name`) : e;
  }
}, we.styles = Me`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }

    ha-dialog {
      --dialog-content-padding: 12px;
      --mdc-dialog-min-width: calc((var(--columns, 4) * 22.5vw) + 3vw);
      --mdc-dialog-max-width: calc((var(--columns, 4) * 22.5vw) + 5vw);
      box-sizing: border-box;
      overflow-x: auto;
    }

    .dialog-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      min-width: 15vw;
    }
    .dialog-header .menu-button {
      margin-left: auto;
    }
    .dialog-content {
      margin-bottom: 16px;
    }
    .dialog-actions {
      text-align: right;
    }

    .cards-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      overflow-x: auto;
    }
    .entity-list {
      list-style: none;
      padding: 0 8px;
      margin: 0;
    }
    .entity-list .entity-item {
      list-style: none;
      margin: 0.2em 0;
    }
    h4 {
      width: calc(var(--columns, 4) * 22.5vw);
      box-sizing: border-box;
      font-size: 1.2em;
      margin: 0.8em 0.2em;
    }
    .entity-cards {
      display: grid;
      grid-template-columns: repeat(var(--columns, 4), 22.5vw);
      gap: 4px;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      justify-content: center;
    }
    .entity-card {
      width: 22.5vw;
      box-sizing: border-box;
    }

    @media (max-width: 1200px) {
      ha-dialog {
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .entity-card {
        width: 45vw;
      }
      .entity-cards {
        grid-template-columns: repeat(var(--columns, 2), 45vw);
      }
      h4 {
        width: calc(var(--columns, 2) * 45vw);
        margin: 0.8em 0.2em;
      }
    }

    @media (max-width: 700px) {
      ha-dialog {
        --dialog-content-padding: 8px;
        --mdc-dialog-min-width: 96vw;
        --mdc-dialog-max-width: 96vw;
      }
      .cards-wrapper {
        align-items: stretch;
        width: 100%;
        overflow-x: hidden;
      }
      .entity-card {
        width: 92vw;
      }
      .entity-cards {
        grid-template-columns: 1fr;
      }
      h4 {
        width: 100%;
        font-size: 1.2em;
        margin: 0.6em 0;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  `, we);
fe([
  B({ type: Boolean })
], ue.prototype, "open");
fe([
  B({ type: String })
], ue.prototype, "selectedDomain");
fe([
  B({ type: String })
], ue.prototype, "selectedDeviceClass");
fe([
  B({ type: String })
], ue.prototype, "content");
fe([
  B({ type: Array })
], ue.prototype, "entities");
fe([
  B({ attribute: !1 })
], ue.prototype, "hass");
fe([
  B({ attribute: !1 })
], ue.prototype, "card");
fe([
  U()
], ue.prototype, "selectedGroup");
let Ts = ue;
customElements.define("area-card-plus-popup", Ts);
const st = (t) => {
  const e = parseFloat(t);
  if (isNaN(e))
    throw new Error(`${t} is not a number`);
  return e;
};
function si(t) {
  if (!t)
    return null;
  try {
    if (t.endsWith("%"))
      return { w: 100, h: st(t.substr(0, t.length - 1)) };
    const e = t.replace(":", "x").split("x");
    return e.length === 0 ? null : e.length === 1 ? { w: st(e[0]), h: 1 } : { w: st(e[0]), h: st(e[1]) };
  } catch {
  }
  return null;
}
var Bs = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, ae = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Is(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Bs(e, i, o), o;
};
const ye = [mi, _i], Ns = "16:5";
let te = class extends xs(oe) {
  constructor() {
    super(...arguments), this.selectedDomain = null, this.selectedDeviceClass = null, this.selectedGroup = null, this.layout = "grid", this._iconCache = /* @__PURE__ */ new Map(), this._styleCache = /* @__PURE__ */ new Map(), this._ratio = null, this._deviceClasses = Ct, this._entitiesByDomain = E(
      (t, e, i, s, o) => {
        var c;
        const n = ((c = this._config) == null ? void 0 : c.hidden_entities) || [], a = i.reduce((d, l) => {
          var h;
          return !l.hidden_by && (l.area_id ? l.area_id === t : l.device_id && e.has(l.device_id)) && (!((h = this._config) != null && h.label) || l.labels && l.labels.some((m) => {
            var u;
            return (u = this._config) == null ? void 0 : u.label.includes(m);
          })) && !n.includes(l.entity_id) && d.push(l.entity_id), d;
        }, []), r = {};
        for (const d of a) {
          const l = q(d);
          if (!Ze.includes(l) && !nt.includes(l) && !at.includes(l) && !rt.includes(l) && !Yi.includes(l) && !wt.includes(l))
            continue;
          const h = o[d];
          h && ((at.includes(l) || nt.includes(l) || rt.includes(l)) && !s[l].includes(
            h.attributes.device_class || ""
          ) || (l in r || (r[l] = []), r[l].push(h)));
        }
        return r;
      }
    ), this._area = E(
      (t, e) => e.find((i) => i.area_id === t) || null
    ), this._devicesInArea = E(
      (t, e) => new Set(
        t ? e.reduce((i, s) => (s.area_id === t && i.push(s.id), i), []) : []
      )
    ), this._computeCovers = E(
      (t, e) => rt.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeIconStyles = E(
      (t, e, i, s) => {
        const o = {
          ...t && e === 1 ? { "--mdc-icon-size": "20px" } : {},
          color: s ? `var(--${s}-color)` : ""
        };
        return i ? i.split(`
`).reduce((n, a) => {
          const r = a.trim();
          if (r && r.includes(":")) {
            const [c, d] = r.split(":");
            n[c.trim()] = d.trim().replace(";", "");
          }
          return n;
        }, o) : o;
      }
    ), this._computeAlerts = E(
      (t, e) => at.flatMap((i) => i in t ? e[i].map((s) => ({
        domain: i,
        deviceClass: s
      })) : [])
    ), this._computeSensors = E(
      (t, e) => nt.flatMap((i) => i in t ? e[i].map(
        (s, o) => ({
          domain: i,
          deviceClass: s,
          index: o
        })
      ) : [])
    ), this._computeButtons = E(
      (t, e) => (t || []).filter(
        (i) => i in e
      )
    ), this._computeCameraEntity = E(
      (t, e) => {
        var i;
        if (t && "camera" in e)
          return (i = e.camera[0]) == null ? void 0 : i.entity_id;
      }
    );
  }
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }
  static async getStubConfig(t) {
    var s;
    const e = t.connection;
    return { type: "custom:area-card-plus", area: ((s = (await us(e, ei))[0]) == null ? void 0 : s.area_id) || "" };
  }
  showPopup(t, e, i) {
    t.dispatchEvent(
      new CustomEvent("show-dialog", {
        detail: {
          dialogTag: e,
          dialogImport: () => customElements.whenDefined(e),
          dialogParams: i
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _openDomainPopup(t) {
    var o, n;
    const e = this._area((o = this._config) == null ? void 0 : o.area, this._areas || []), i = ((n = this._config) == null ? void 0 : n.area_name) || e && e.name || "Details";
    this.showPopup(this, "area-card-plus-popup", {
      title: i,
      hass: this.hass,
      selectedDomain: t,
      selectedDeviceClass: this.selectedDeviceClass || void 0,
      selectedGroup: this.selectedGroup || void 0,
      card: this
    });
  }
  _openGeneralPopup() {
    var n, a;
    const t = this._area((n = this._config) == null ? void 0 : n.area, this._areas || []), e = ((a = this._config) == null ? void 0 : a.area_name) || t && t.name || "Details", i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), s = [];
    Object.values(i || {}).forEach((r) => {
      r.forEach((c) => {
        !ye.includes(c.state) && !ee.includes(c.state) && s.push(c);
      });
    }), this.showPopup(this, "area-card-plus-popup", {
      title: e,
      hass: this.hass,
      entities: s,
      card: this,
      content: s.length ? void 0 : "Keine Entitäten"
    });
  }
  _isOn(t, e) {
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    )[t];
    if (i)
      return (e ? i.filter(
        (s) => s.attributes.device_class === e
      ) : i).find(
        (s) => !ye.includes(s.state) && !ee.includes(s.state)
      );
  }
  _average(t, e) {
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    )[t].filter(
      (a) => e ? a.attributes.device_class === e : !0
    );
    if (!i || i.length === 0)
      return;
    let s;
    const o = i.filter((a) => !ns(a) || isNaN(Number(a.state)) ? !1 : s ? a.attributes.unit_of_measurement === s : (s = a.attributes.unit_of_measurement, !0));
    if (!o.length)
      return;
    const n = o.reduce(
      (a, r) => a + Number(r.state),
      0
    );
    return e === "power" ? `${Jt(n, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? Qt(s, this.hass.locale) : ""}${s || ""}` : `${Jt(n / o.length, this.hass.locale, {
      maximumFractionDigits: 1
    })}${s ? Qt(s, this.hass.locale) : ""}${s || ""}`;
  }
  hassSubscribe() {
    const t = this.hass.connection;
    return [
      ei(t, (e) => {
        this._areas = e;
      }),
      $s(t, (e) => {
        this._devices = e;
      }),
      gs(t, (e) => {
        this._entities = e;
      })
    ];
  }
  getCardSize() {
    return 3;
  }
  willUpdate(t) {
    var e, i;
    (t.has("_config") || this._ratio === null) && (this._ratio = (e = this._config) != null && e.aspect_ratio ? si((i = this._config) == null ? void 0 : i.aspect_ratio) : null, (this._ratio === null || this._ratio.w <= 0 || this._ratio.h <= 0) && (this._ratio = si(Ns)));
  }
  getGridOptions() {
    return {
      columns: 12,
      rows: 3,
      min_columns: 1,
      min_rows: 1
    };
  }
  setConfig(t) {
    if (!t.area)
      throw new Error("Area Required");
    this._config = t, this._deviceClasses = { ...Ct }, t.sensor_classes && (this._deviceClasses.sensor = t.sensor_classes), t.alert_classes && (this._deviceClasses.binary_sensor = t.alert_classes), t.cover_classes && (this._deviceClasses.cover = t.cover_classes), this._iconCache.clear(), this._styleCache.clear();
  }
  _parseCss(t) {
    if (!t) return "";
    const e = t;
    if (this._styleCache.has(e)) return this._styleCache.get(e);
    const i = t.split(`
`).reduce((s, o) => {
      const n = o.trim();
      return n && n.includes(":") && (s += n.endsWith(";") ? n : `${n};`, s += " "), s;
    }, "");
    return this._styleCache.set(e, i), i;
  }
  shouldUpdate(t) {
    if (t.has("_config") || !this._config || t.has("_devicesInArea") || t.has("_areas") || t.has("_entities"))
      return !0;
    if (!t.has("hass"))
      return !1;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale)
      return !0;
    if (!this._devices || !this._devicesInArea(this._config.area, this._devices) || !this._entities)
      return !1;
    const i = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );
    for (const s of Object.values(i))
      for (const o of s)
        if (e.states[o.entity_id] !== o)
          return !0;
    return !1;
  }
  _handleAction(t) {
    var o, n, a, r, c, d;
    const e = t.detail.action === "tap" ? (o = this._config) == null ? void 0 : o.tap_action : t.detail.action === "hold" ? (n = this._config) == null ? void 0 : n.hold_action : t.detail.action === "double_tap" ? (a = this._config) == null ? void 0 : a.double_tap_action : null;
    if (e === "more-info" || (e == null ? void 0 : e.action) === "more-info" || e === void 0) {
      this._openGeneralPopup();
      return;
    }
    const s = {
      tap_action: (r = this._config) == null ? void 0 : r.tap_action,
      hold_action: (c = this._config) == null ? void 0 : c.hold_action,
      double_tap_action: (d = this._config) == null ? void 0 : d.double_tap_action
    };
    bt(this, this.hass, s, t.detail.action);
  }
  _handleDomainAction(t) {
    return this._makeActionHandler("domain", t);
  }
  _handleAlertAction(t, e) {
    return this._makeActionHandler("alert", t, e);
  }
  _handleCoverAction(t, e) {
    return this._makeActionHandler("cover", t, e);
  }
  _handleSensorAction(t, e) {
    return this._makeActionHandler("sensor", t, e);
  }
  // Unified action handler factory for domain/alert/cover/sensor
  _makeActionHandler(t, e, i, s) {
    return (o) => {
      var d, l, h, m, u, f, v, g, z, R;
      o.stopPropagation();
      let n;
      t === "domain" ? n = (l = (d = this._config) == null ? void 0 : d.customization_domain) == null ? void 0 : l.find(
        (C) => C.type === e
      ) : t === "alert" ? n = (m = (h = this._config) == null ? void 0 : h.customization_alert) == null ? void 0 : m.find(
        (C) => C.type === i
      ) : t === "cover" ? n = (f = (u = this._config) == null ? void 0 : u.customization_cover) == null ? void 0 : f.find(
        (C) => C.type === i
      ) : t === "sensor" ? n = (g = (v = this._config) == null ? void 0 : v.customization_sensor) == null ? void 0 : g.find(
        (C) => C.type === i
      ) : t === "custom_button" && (n = s);
      const a = o.detail.action === "tap" ? n == null ? void 0 : n.tap_action : o.detail.action === "hold" ? n == null ? void 0 : n.hold_action : o.detail.action === "double_tap" ? n == null ? void 0 : n.double_tap_action : null;
      if (t === "domain") {
        const C = a === "toggle" || (a == null ? void 0 : a.action) === "toggle", $ = a === "more-info" || (a == null ? void 0 : a.action) === "more-info";
        if (C) {
          e === "media_player" ? this.hass.callService(
            e,
            this._isOn(e) ? "media_pause" : "media_play",
            void 0,
            { area_id: this._config.area }
          ) : e === "lock" ? this.hass.callService(
            e,
            this._isOn(e) ? "lock" : "unlock",
            void 0,
            { area_id: this._config.area }
          ) : e === "vacuum" ? this.hass.callService(
            e,
            this._isOn(e) ? "stop" : "start",
            void 0,
            { area_id: this._config.area }
          ) : Ze.includes(e) && this.hass.callService(
            e,
            this._isOn(e) ? "turn_off" : "turn_on",
            void 0,
            { area_id: this._config.area }
          );
          return;
        } else if ($ || a === void 0) {
          if (e !== "binary_sensor" && e !== "sensor")
            if (e === "climate") {
              const I = (R = (z = this._config) == null ? void 0 : z.customization_domain) == null ? void 0 : R.find(
                (H) => H.type === "climate"
              ), Z = I == null ? void 0 : I.display_mode;
              (Z === "icon" || Z === "text_icon") && this._showPopupForDomain(e);
            } else
              this._showPopupForDomain(e);
          return;
        }
        const A = {
          tap_action: n == null ? void 0 : n.tap_action,
          hold_action: n == null ? void 0 : n.hold_action,
          double_tap_action: n == null ? void 0 : n.double_tap_action
        };
        bt(this, this.hass, A, o.detail.action);
        return;
      }
      const r = a === "more-info" || (a == null ? void 0 : a.action) === "more-info";
      if (t === "alert") {
        if (r || a === void 0) {
          e === "binary_sensor" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "cover") {
        if (r || a === void 0) {
          e === "cover" && this._showPopupForDomain(e, i);
          return;
        }
      } else if (t === "sensor" && r) {
        e === "sensor" && this._showPopupForDomain(e, i);
        return;
      }
      const c = {
        tap_action: n == null ? void 0 : n.tap_action,
        hold_action: n == null ? void 0 : n.hold_action,
        double_tap_action: n == null ? void 0 : n.double_tap_action
      };
      bt(this, this.hass, c, o.detail.action);
    };
  }
  renderCustomButtons() {
    var e, i, s;
    if (!((e = this._config) != null && e.custom_buttons) || this._config.custom_buttons.length === 0)
      return x;
    const t = {
      v2: ((i = this._config) == null ? void 0 : i.design) === "V2",
      row: ((s = this._config) == null ? void 0 : s.layout) === "horizontal"
    };
    return w`
      <div
        class="${se({
      custom_buttons: !0,
      ...t
    })}"
      >
        ${this._config.custom_buttons.map((o) => {
      const n = o.color ? `color: var(--${o.color}-color, ${o.color});` : "";
      return w`
            <div
              class="icon-with-count hover"
              @action=${this._makeActionHandler(
        "custom_button",
        "",
        void 0,
        o
      )}
              .actionHandler=${le({
        hasHold: V(o.hold_action),
        hasDoubleClick: V(o.double_tap_action)
      })}
            >
              <ha-icon .icon=${o.icon} style="${n}"></ha-icon>
              ${o.name ? w`<span class="custom-button-label" style="${n}"
                    >${o.name}</span
                  >` : x}
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    var He, Le, Pe, Te, Be, Ie, Ne, Re, S, L, M, W, J, ie, Fe, je, Bt;
    if (!this._config || !this.hass || !this._areas || !this._devices || !this._entities)
      return x;
    const t = ((He = this._config) == null ? void 0 : He.design) === "V2", e = t && ((Le = this._config) != null && Le.v2_color) ? this._calculateV2Color(this._config.v2_color) : "var(--primary-color)", i = {
      mirrored: this._config.mirrored === !0
    }, s = {
      v2: ((Pe = this._config) == null ? void 0 : Pe.design) === "V2",
      row: ((Te = this._config) == null ? void 0 : Te.layout) === "horizontal"
    };
    let o = 3;
    try {
      const _ = ((Be = this.shadowRoot) == null ? void 0 : Be.host) || document.documentElement, y = getComputedStyle(_).getPropertyValue("--row-size");
      y && (o = Number(y.trim()) || 3);
    } catch {
    }
    const a = this._getLightColorFromArea() || e, r = t ? { background: a } : {}, c = t && o === 1 ? {} : t ? { background: a } : {}, d = this.layout === "grid", l = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    ), h = this._area(this._config.area, this._areas), m = /* @__PURE__ */ new Map();
    (((Ie = this._config) == null ? void 0 : Ie.customization_domain) || []).forEach(
      (_) => m.set(_.type, _)
    );
    const u = /* @__PURE__ */ new Map();
    (((Ne = this._config) == null ? void 0 : Ne.customization_cover) || []).forEach(
      (_) => u.set(_.type, _)
    );
    const f = /* @__PURE__ */ new Map();
    (((Re = this._config) == null ? void 0 : Re.customization_alert) || []).forEach(
      (_) => f.set(_.type, _)
    );
    const v = /* @__PURE__ */ new Map();
    (((S = this._config) == null ? void 0 : S.customization_sensor) || []).forEach(
      (_) => v.set(_.type, _)
    );
    const g = this._computeCovers(l, this._deviceClasses), z = this._computeAlerts(l, this._deviceClasses), R = this._computeButtons(
      this._config.toggle_domains,
      l
    ), C = this._computeSensors(l, this._deviceClasses), $ = ((M = (L = this._config) == null ? void 0 : L.toggle_domains) != null && M.includes("climate") ? wt : []).filter((_) => _ in l).map((_) => ({ domain: _ })), A = (((W = this._config) == null ? void 0 : W.display_type) || "").toString().toLowerCase(), I = A.includes("camera"), Z = A.includes("picture") || A.includes("image"), H = A === "" ? !0 : A.includes("icon"), X = this._computeCameraEntity(
      I,
      l
    );
    if (h === null)
      return w`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    const Ee = this._computeIconStyles(
      t,
      o,
      (J = this._config) == null ? void 0 : J.icon_css,
      (ie = this._config) == null ? void 0 : ie.area_icon_color
    );
    return w`
      <ha-card
        class="${se(i)}"
        style=${tt({
      paddingBottom: d ? "0" : "12em"
    })}
      >
        ${I && X || Z && h.picture ? w`
                <hui-image
                  .config=${this._config}
                  .hass=${this.hass}
                  .image=${I ? void 0 : h.picture}
                  .cameraImage=${I ? X : void 0}
                  .cameraView=${this._config.camera_view}
                  fitMode="cover"
                ></hui-image>
              ` : x}

        <div
          class="${se({
      "icon-container": !0,
      ...s
    })}"
          style=${tt(c)}
        >
          ${H ? w`
                  <ha-icon
                    style=${tt(Ee)}
                    icon=${this._config.area_icon || h.icon}
                  ></ha-icon>
                ` : x}
        </div>

        <div
          class="${se({
      content: !0,
      ...s
    })}"
          @action=${this._handleAction}
          .actionHandler=${le({
      hasHold: V(this._config.hold_action),
      hasDoubleClick: V(this._config.double_tap_action)
    })}
        >
          <div
            class="${se({
      right: !0,
      ...s
    })}"
            style=${tt(r)}
          >
            <!-- Covers -->
            <div
              class="${se({
      covers: !0,
      ...s
    })}"
            >
              ${de(
      g,
      (_) => _.domain + "-" + _.deviceClass,
      ({ domain: _, deviceClass: y }) => {
        var K, F;
        const p = u.get(y), O = (p == null ? void 0 : p.invert) === !0, Q = l[_].filter(
          (D) => {
            const P = D.attributes.device_class || "default", k = !ee.includes(D.state);
            return P === y && (O ? ee.includes(D.state) : k);
          }
        ), N = (p == null ? void 0 : p.color) || ((K = this._config) == null ? void 0 : K.cover_color), b = p == null ? void 0 : p.icon, T = Q.length;
        return T > 0 ? w`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
          (p == null ? void 0 : p.css) || ((F = this._config) == null ? void 0 : F.cover_css)
        )}
                          @action=${this._handleCoverAction(
          _,
          y
        )}
                          .actionHandler=${le({
          hasHold: V(p == null ? void 0 : p.hold_action),
          hasDoubleClick: V(
            p == null ? void 0 : p.double_tap_action
          )
        })}
                        >
                          <ha-state-icon
                            class="cover"
                            style="${(N ? `color: var(--${N}-color);` : "") + " " + (p != null && p.icon_css ? p.icon_css.split(`
`).reduce((D, P) => {
          const k = P.trim();
          return k && k.includes(":") && (D += k.endsWith(";") ? k : `${k};`, D += " "), D;
        }, "") : "")}"
                            .icon=${b || this._cachedIcon(
          _,
          !O,
          y
        )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${T > 0 ? "on" : "off"}"
                            >${T}</span
                          >
                        </div>
                      ` : x;
      }
    )}
            </div>

            <!-- Alerts -->
            <div
              class="${se({
      alerts: !0,
      ...s
    })}"
            >
              ${de(
      z,
      (_) => _.domain + "-" + _.deviceClass,
      ({ domain: _, deviceClass: y }) => {
        var K, F;
        const p = f.get(y), O = (p == null ? void 0 : p.invert) === !0, Q = l[_].filter(
          (D) => {
            const P = D.attributes.device_class || "default", k = D.state === "on";
            return P === y && (O ? ee.includes(D.state) : k);
          }
        ), N = (p == null ? void 0 : p.color) || ((K = this._config) == null ? void 0 : K.alert_color), b = p == null ? void 0 : p.icon, T = Q.length;
        return T > 0 ? w`
                        <div
                          class="icon-with-count"
                          style=${this._parseCss(
          (p == null ? void 0 : p.css) || ((F = this._config) == null ? void 0 : F.alert_css)
        )}
                          @action=${this._handleAlertAction(
          _,
          y
        )}
                          .actionHandler=${le({
          hasHold: V(p == null ? void 0 : p.hold_action),
          hasDoubleClick: V(
            p == null ? void 0 : p.double_tap_action
          )
        })}
                        >
                          <ha-state-icon
                            class="alert"
                            style="${(N ? `color: var(--${N}-color);` : "") + " " + (p != null && p.icon_css ? p.icon_css.split(`
`).reduce((D, P) => {
          const k = P.trim();
          return k && k.includes(":") && (D += k.endsWith(";") ? k : `${k};`, D += " "), D;
        }, "") : "")}"
                            .icon=${b || this._cachedIcon(
          _,
          !O,
          y
        )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${T > 0 ? "on" : "off"}"
                            >${T}</span
                          >
                        </div>
                      ` : x;
      }
    )}
            </div>

            ${this.renderCustomButtons()}

            <!-- Buttons -->
            <div
              class="${se({
      buttons: !0,
      ...s
    })}"
            >
              ${de(
      R,
      (_) => _,
      (_) => {
        var b, T, K, F, D;
        if (_ === "climate") {
          const P = (T = (b = this._config) == null ? void 0 : b.customization_domain) == null ? void 0 : T.find(
            (me) => me.type === "climate"
          ), k = P == null ? void 0 : P.display_mode;
          if (k !== "icon" && k !== "text_icon")
            return x;
        }
        const y = m.get(_), p = (y == null ? void 0 : y.color) || ((K = this._config) == null ? void 0 : K.domain_color), O = y == null ? void 0 : y.icon, N = l[_].filter(
          (P) => !ye.includes(P.state) && !ee.includes(P.state)
        ).length;
        return this._config.show_active && N === 0 ? x : w`
                    <div
                      class="icon-with-count hover"
                      style=${this._parseCss(
          (y == null ? void 0 : y.css) || ((F = this._config) == null ? void 0 : F.domain_css)
        )}
                      @action=${this._handleDomainAction(_)}
                      .actionHandler=${le({
          hasHold: V(y == null ? void 0 : y.hold_action),
          hasDoubleClick: V(
            y == null ? void 0 : y.double_tap_action
          )
        })}
                    >
                      <ha-state-icon
                        style=${p ? `color: var(--${p}-color);` : (D = this._config) != null && D.domain_color ? `color: ${this._config.domain_color};` : ""}
                        class=${N > 0 ? "toggle-on" : "toggle-off"}
                        .domain=${_}
                        .icon=${O || this._cachedIcon(
          _,
          N > 0
        )}
                      ></ha-state-icon>
                      <span
                        class="active-count text-small ${N > 0 ? "on" : "off"}"
                      >
                        ${N}
                      </span>
                    </div>
                  `;
      }
    )}
            </div>
          </div>




          <div class="${se({
      bottom: !0,
      ...s
    })}">
              <div style=${`${(Fe = this._config) != null && Fe.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : ""} ${(je = this._config) != null && je.name_css ? this._config.name_css.split(`
`).reduce((_, y) => {
      const p = y.trim();
      return p && p.includes(":") && (_ += p.endsWith(";") ? p : `${p};`, _ += " "), _;
    }, "") : ""}`}"
              <div class="${se({
      name: !0,
      ...s,
      "text-large": !0,
      on: !0
    })}"
                @action=${this._handleAction}
                .actionHandler=${le({
      hasHold: V(this._config.hold_action),
      hasDoubleClick: V(this._config.double_tap_action)
    })}
              >
                ${this._config.area_name || h.name}
              </div>

              <!-- Sensors -->
              <div class="sensors">
                ${(Bt = this._config) != null && Bt.wrap_sensor_icons ? de(
      C,
      (_) => _.domain + "-" + _.deviceClass,
      ({ domain: _, deviceClass: y, index: p }) => {
        var k, me, Ue, Ve;
        const O = l[_].filter(
          (ce) => ce.attributes.device_class === y
        );
        if (O.length === 0)
          return x;
        const Q = (() => {
          switch (y) {
            case "temperature":
              return h.temperature_entity_id;
            case "humidity":
              return h.humidity_entity_id;
            default:
              return null;
          }
        })(), N = Q ? this.hass.states[Q] : void 0, b = v.get(y), T = (b == null ? void 0 : b.color) || ((k = this._config) == null ? void 0 : k.sensor_color), K = (b == null ? void 0 : b.invert) === !0, F = O.some(
          (ce) => !ye.includes(ce.state) && !ee.includes(ce.state)
        );
        if (K && F)
          return x;
        const D = (me = this._config) != null && me.show_sensor_icons ? w`<ha-domain-icon
                                style=${T ? `color: var(--${T}-color);` : ""}
                                .hass=${this.hass}
                                .domain=${_}
                                .deviceClass=${y}
                              ></ha-domain-icon>` : null, P = w`<span
                            class="sensor-value"
                            @action=${this._handleSensorAction(
          _,
          y
        )}
                            .actionHandler=${le({
          hasHold: V(b == null ? void 0 : b.hold_action),
          hasDoubleClick: V(
            b == null ? void 0 : b.double_tap_action
          )
        })}
                            style=${`${T ? `color: var(--${T}-color);` : ""} ${this._parseCss(b == null ? void 0 : b.css)}`}
                          >
                            ${!((Ue = this._config) != null && Ue.show_sensor_icons) && !((Ve = this._config) != null && Ve.wrap_sensor_icons) && p > 0 ? " - " : ""}
                            ${N ? this.hass.formatEntityState(N) : this._average(_, y)}
                          </span>`;
        return w`<div class="sensor-row off">
                            ${D}${P}
                          </div>`;
      }
    ) : w`<div class="sensor text-medium off">
                        ${de(
      C,
      (_) => _.domain + "-" + _.deviceClass,
      ({ domain: _, deviceClass: y, index: p }) => {
        var k, me, Ue, Ve;
        const O = l[_].filter(
          (ce) => ce.attributes.device_class === y
        );
        if (O.length === 0)
          return x;
        const Q = (() => {
          switch (y) {
            case "temperature":
              return h.temperature_entity_id;
            case "humidity":
              return h.humidity_entity_id;
            default:
              return null;
          }
        })(), N = Q ? this.hass.states[Q] : void 0, b = v.get(y), T = (b == null ? void 0 : b.color) || ((k = this._config) == null ? void 0 : k.sensor_color), K = (b == null ? void 0 : b.invert) === !0, F = O.some(
          (ce) => !ye.includes(ce.state) && !ee.includes(ce.state)
        );
        if (K && F)
          return x;
        const D = (me = this._config) != null && me.show_sensor_icons ? w`<ha-domain-icon
                                  style=${T ? `color: var(--${T}-color);` : ""}
                                  .hass=${this.hass}
                                  .domain=${_}
                                  .deviceClass=${y}
                                ></ha-domain-icon>` : null, P = w`<span
                              class="sensor-value"
                              @action=${this._handleSensorAction(
          _,
          y
        )}
                              .actionHandler=${le({
          hasHold: V(b == null ? void 0 : b.hold_action),
          hasDoubleClick: V(
            b == null ? void 0 : b.double_tap_action
          )
        })}
                              style=${`${T ? `color: var(--${T}-color);` : ""} ${this._parseCss(b == null ? void 0 : b.css)}`}
                            >
                              ${!((Ue = this._config) != null && Ue.show_sensor_icons) && !((Ve = this._config) != null && Ve.wrap_sensor_icons) && p > 0 ? " - " : ""}
                              ${N ? this.hass.formatEntityState(N) : this._average(_, y)}
                            </span>`;
        return w`${D}${P}`;
      }
    )}
                      </div>`}
              </div>

              <!-- Climates -->
              <div class="climate text-small off">
                ${de(
      $,
      (_) => _.domain,
      ({ domain: _ }) => {
        var T;
        const p = l[_].filter((K) => {
          const F = K.attributes.hvac_action, D = K.state, P = !ye.includes(D) && !ee.includes(D);
          return F !== void 0 ? P && (F !== "idle" && F !== "off") && !(D === "heat" && (F === "idle" || F === "off")) : P;
        }).map((K) => {
          var D, P, k;
          return `${K.attributes.temperature || "N/A"} ${((k = (P = (D = this.hass) == null ? void 0 : D.config) == null ? void 0 : P.unit_system) == null ? void 0 : k.temperature) || ""}`;
        });
        if (p.length === 0)
          return x;
        const O = m.get(_);
        if ((O == null ? void 0 : O.display_mode) === "icon")
          return x;
        const N = O == null ? void 0 : O.color, b = `${N ? `color: var(--${N}-color);` : (T = this._config) != null && T.domain_color ? `color: ${this._config.domain_color};` : ""} ${this._parseCss(O == null ? void 0 : O.css)}`;
        return w`<div
                      class="climate"
                      style=${b}
                      @action=${this._handleDomainAction(_)}
                      .actionHandler=${le({
          hasHold: V(O == null ? void 0 : O.hold_action),
          hasDoubleClick: V(
            O == null ? void 0 : O.double_tap_action
          )
        })}
                    >
                      (${p.join(", ")})
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
  _calculateV2Color(t) {
    return `rgba(${t.join(", ")})`;
  }
  updated(t) {
    if (super.updated(t), !this._config || !this.hass)
      return;
    if (t.has("selectedDomain") && this.selectedDomain) {
      const s = this.selectedDomain;
      this._openDomainPopup(s), setTimeout(() => {
        this.selectedDomain = null;
      }, 0);
    }
    const e = t.get("hass"), i = t.get("_config");
    (t.has("hass") && (!e || e.themes !== this.hass.themes) || t.has("_config") && (!i || i.theme !== this._config.theme)) && ss(this, this.hass.themes, this._config.theme);
  }
  _showPopupForDomain(t, e) {
    this.selectedDeviceClass = e || null, this._openDomainPopup(t);
  }
  _getIcon(t, e, i) {
    if (t in Qe) {
      const s = Qe[t];
      if (i && typeof s == "object") {
        const o = s[i];
        if (o) {
          if (typeof o == "string") return o;
          if (typeof o == "object" && "on" in o && "off" in o)
            return e ? o.on : o.off;
        }
      }
      if (typeof s == "object" && "on" in s && "off" in s)
        return e ? s.on : s.off;
      if (typeof s == "string") return s;
    }
    return "";
  }
  _cachedIcon(t, e, i) {
    const s = `${t}|${i || ""}|${e ? "1" : "0"}`;
    if (this._iconCache.has(s)) return this._iconCache.get(s);
    const o = this._getIcon(t, e, i);
    return this._iconCache.set(s, o), o;
  }
  _getLightColorFromArea() {
    var d;
    if (!((d = this._config) != null && d.use_light_color) || !this.hass)
      return null;
    let t = [];
    if (this._config.light_color_entities && this._config.light_color_entities.length > 0)
      t = this._config.light_color_entities.map((l) => this.hass.states[l]).filter((l) => l && l.entity_id.startsWith("light."));
    else {
      if (!this._entities)
        return null;
      t = this._entitiesByDomain(
        this._config.area,
        this._devicesInArea(this._config.area, this._devices),
        this._entities,
        this._deviceClasses,
        this.hass.states
      ).light || [];
    }
    const e = t.filter(
      (l) => !ye.includes(l.state) && !ee.includes(l.state) && (yt(l) || l.state === "on" && !yt(l))
    );
    if (e.length === 0)
      return "#363636";
    let i = 0, s = 0, o = 0, n = 0;
    for (const l of e) {
      const h = this._extractRgbFromLight(l);
      h && h.length >= 3 && (i += h[0], s += h[1], o += h[2], n++);
    }
    if (n === 0)
      return "#363636";
    const a = Math.round(i / n), r = Math.round(s / n), c = Math.round(o / n);
    return `rgb(${a}, ${r}, ${c})`;
  }
  _extractRgbFromLight(t) {
    const e = is(t);
    if (e && e.length >= 3)
      return e;
    const i = t.attributes;
    if (i.rgb_color && i.rgb_color.length >= 3)
      return i.rgb_color;
    if (i.rgbw_color && i.rgbw_color.length >= 3)
      return i.rgbw_color.slice(0, 3);
    if (i.rgbww_color && i.rgbww_color.length >= 3)
      return i.rgbww_color.slice(0, 3);
    if (i.hs_color && i.hs_color.length >= 2)
      return this._hsToRgb(i.hs_color[0], i.hs_color[1]);
    if (i.xy_color && i.xy_color.length >= 2)
      return this._xyToRgb(i.xy_color[0], i.xy_color[1]);
    if (i.color_temp_kelvin)
      return this._colorTempToRgb(i.color_temp_kelvin);
    if (i.color_temp) {
      const s = 1e6 / i.color_temp;
      return this._colorTempToRgb(s);
    }
    return t.state === "on" && !yt(t) ? [255, 248, 240] : null;
  }
  _hsToRgb(t, e) {
    const i = e, s = i * (1 - Math.abs(t / 60 % 2 - 1)), o = 1 - i;
    let n = 0, a = 0, r = 0;
    return t >= 0 && t < 60 ? (n = i, a = s, r = 0) : t >= 60 && t < 120 ? (n = s, a = i, r = 0) : t >= 120 && t < 180 ? (n = 0, a = i, r = s) : t >= 180 && t < 240 ? (n = 0, a = s, r = i) : t >= 240 && t < 300 ? (n = s, a = 0, r = i) : t >= 300 && t < 360 && (n = i, a = 0, r = s), [
      Math.round((n + o) * 255),
      Math.round((a + o) * 255),
      Math.round((r + o) * 255)
    ];
  }
  _xyToRgb(t, e) {
    const i = 1 - t - e, s = 1, o = s / e * t, n = s / e * i;
    let a = o * 1.656492 - s * 0.354851 - n * 0.255038, r = -o * 0.707196 + s * 1.655397 + n * 0.036152, c = o * 0.051713 - s * 0.121364 + n * 1.01153;
    return a = a <= 31308e-7 ? 12.92 * a : (1 + 0.055) * Math.pow(a, 1 / 2.4) - 0.055, r = r <= 31308e-7 ? 12.92 * r : (1 + 0.055) * Math.pow(r, 1 / 2.4) - 0.055, c = c <= 31308e-7 ? 12.92 * c : (1 + 0.055) * Math.pow(c, 1 / 2.4) - 0.055, a = Math.max(0, Math.min(1, a)), r = Math.max(0, Math.min(1, r)), c = Math.max(0, Math.min(1, c)), [
      Math.round(a * 255),
      Math.round(r * 255),
      Math.round(c * 255)
    ];
  }
  _colorTempToRgb(t) {
    const e = Math.max(1e3, Math.min(4e4, t));
    let i, s, o;
    return e <= 6600 ? i = 255 : (i = e - 60, i = 329.698727446 * Math.pow(i, -0.1332047592), i = Math.max(0, Math.min(255, i))), e <= 6600 ? (s = e, s = 99.4708025861 * Math.log(s) - 161.1195681661, s = Math.max(0, Math.min(255, s))) : (s = e - 60, s = 288.1221695283 * Math.pow(s, -0.0755148492), s = Math.max(0, Math.min(255, s))), e >= 6600 ? o = 255 : e <= 1900 ? o = 0 : (o = e - 10, o = 138.5177312231 * Math.log(o) - 305.0447927307, o = Math.max(0, Math.min(255, o))), [Math.round(i), Math.round(s), Math.round(o)];
  }
  static get styles() {
    return Me`
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
};
ae([
  B({ attribute: !1 })
], te.prototype, "hass", 2);
ae([
  U()
], te.prototype, "_config", 2);
ae([
  U()
], te.prototype, "_areas", 2);
ae([
  U()
], te.prototype, "_devices", 2);
ae([
  U()
], te.prototype, "_entities", 2);
ae([
  U()
], te.prototype, "selectedDomain", 2);
ae([
  U()
], te.prototype, "selectedDeviceClass", 2);
ae([
  U()
], te.prototype, "selectedGroup", 2);
ae([
  U()
], te.prototype, "layout", 2);
te = ae([
  he("area-card-plus")
], te);
var Rs = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, G = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Fs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Rs(e, i, o), o;
};
class Ae extends oe {
  constructor() {
    super(...arguments), this.SelectOptions = [], this._entityKeys = /* @__PURE__ */ new WeakMap();
  }
  _getKey(e) {
    return this._entityKeys.has(e) || this._entityKeys.set(e, Math.random().toString()), this._entityKeys.get(e);
  }
  render() {
    return this.hass ? w`
      <div class="customization">
        ${this.customization && de(
      this.customization,
      (e) => this._getKey(e),
      (e, i) => w`
            <div class="customize-item">
              <ha-select
                label=${this.hass.localize(
        "ui.panel.lovelace.editor.features.edit"
      )}
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${e.type}
                @closed=${(s) => s.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${this.SelectOptions.map(
        (s) => w`<mwc-list-item .value=${s.value}
                      >${s.label}</mwc-list-item
                    >`
      )}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${Tt}
                class="remove-icon"
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${vi}
                class="edit-icon"
                .index=${i}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `
    )}

        <div class="add-item row">
          <ha-select
            label=${this.hass.localize(
      "ui.panel.lovelace.editor.common.edit"
    ) + " " + this.hass.localize(
      "ui.panel.lovelace.editor.card.markdown.content"
    )}
            name="Customize"
            class="add-customization"
            naturalMenuWidth
            fixedMenuPosition
            @closed=${(e) => e.stopPropagation()}
            @click=${this._addRow}
          >
            ${this.SelectOptions.map(
      (e) => w`<mwc-list-item .value=${e.value}
                  >${e.label}</mwc-list-item
                >`
    )}
          </ha-select>
        </div>
      </div>
    ` : x;
  }
  _valueChanged(e) {
    if (!this.customization || !this.hass)
      return;
    const i = e.detail.value, s = e.target.index, o = this.customization.concat();
    o[s] = { ...o[s], type: i || "" }, j(this, "config-changed", o);
  }
  _removeRow(e) {
    e.stopPropagation();
    const i = e.currentTarget.index;
    if (i != null) {
      const s = this.customization.concat();
      s.splice(i, 1), j(this, "config-changed", s);
    }
  }
  _editRow(e) {
    e.stopPropagation();
    const i = e.target.index;
    i != null && j(this, "edit-item", i);
  }
  _addRow(e) {
    if (e.stopPropagation(), !this.customization || !this.hass)
      return;
    const i = this.shadowRoot.querySelector(
      ".add-customization"
    );
    if (!i || !i.value)
      return;
    const o = { type: i.value };
    j(this, "config-changed", [...this.customization, o]), i.value = "";
  }
  static get styles() {
    return Me`
      .customization {
        margin-top: 16px;
      }
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .add-customization,
      .select-customization {
        width: 100%;
        margin-top: 8px;
      }
      .remove-icon,
      .edit-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }
    `;
  }
}
G([
  B({ attribute: !1 })
], Ae.prototype, "hass", 2);
G([
  B({ type: Array })
], Ae.prototype, "SelectOptions", 2);
let xt = class extends Ae {
  get customization() {
    return this.customization_domain;
  }
};
G([
  B({ attribute: !1 })
], xt.prototype, "customization_domain", 2);
xt = G([
  he("domain-items-editor")
], xt);
let At = class extends Ae {
  get customization() {
    return this.customization_alert;
  }
};
G([
  B({ attribute: !1 })
], At.prototype, "customization_alert", 2);
At = G([
  he("alert-items-editor")
], At);
let Et = class extends Ae {
  get customization() {
    return this.customization_cover;
  }
};
G([
  B({ attribute: !1 })
], Et.prototype, "customization_cover", 2);
Et = G([
  he("cover-items-editor")
], Et);
let St = class extends Ae {
  get customization() {
    return this.customization_sensor;
  }
};
G([
  B({ attribute: !1 })
], St.prototype, "customization_sensor", 2);
St = G([
  he("sensor-items-editor")
], St);
let Ot = class extends Ae {
  get customization() {
    return this.customization_popup;
  }
};
G([
  B({ attribute: !1 })
], Ot.prototype, "customization_popup", 2);
Ot = G([
  he("popup-items-editor")
], Ot);
let et = class extends oe {
  _editRow(t) {
    t.stopPropagation();
    const e = t.currentTarget.index;
    j(this, "edit-item", e);
  }
  _removeRow(t) {
    if (t.stopPropagation(), !this.custom_buttons) return;
    const e = t.currentTarget.index, i = [...this.custom_buttons];
    i.splice(e, 1), j(this, "config-changed", i);
  }
  _addRow() {
    const t = {
      name: "",
      icon: "",
      tap_action: { action: "none" }
    }, e = [...this.custom_buttons || [], t];
    j(this, "config-changed", e);
  }
  render() {
    var t;
    return this.hass ? w`
      <div class="custom-buttons">
        ${(t = this.custom_buttons) == null ? void 0 : t.map(
      (e, i) => w`
            <div class="row">
              <div class="item">
                <ha-icon
                  .icon=${e.icon || "mdi:gesture-tap-button"}
                ></ha-icon>
                <span class="name"
                  >${e.name || `Button ${i + 1}`}</span
                >
              </div>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.edit")}
                .path=${vi}
                .index=${i}
                @click=${this._editRow}
              ></ha-icon-button>
              <ha-icon-button
                .label=${this.hass.localize("ui.common.remove")}
                .path=${Tt}
                .index=${i}
                @click=${this._removeRow}
              ></ha-icon-button>
            </div>
          `
    )}
        <div class="add-button-container">
          <mwc-button @click=${this._addRow} class="add-btn" outlined>
            Add Custom Button
          </mwc-button>
        </div>
      </div>
    ` : x;
  }
};
et.styles = Me`
    .row {
      display: flex;
      align-items: center;
      padding: 4px 0;
    }
    .item {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 16px;
    }
    .add-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: var(--primary-color);
      color: white;
      font-weight: 500;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: flex-start;
      align-self: flex-start;
    }
    ha-icon {
      color: var(--secondary-text-color);
    }
    .add-button-container {
      padding: 8px 0;
      text-align: right;
    }
  `;
G([
  B({ attribute: !1 })
], et.prototype, "hass", 2);
G([
  B({ attribute: !1 })
], et.prototype, "custom_buttons", 2);
et = G([
  he("custom-buttons-editor")
], et);
var js = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, ze = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Us(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && js(e, i, o), o;
};
let xe = class extends oe {
  constructor() {
    super(...arguments), this.useSensorSchema = !1, this._schemadomain = E(() => {
      var i;
      const t = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ], e = [
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        { name: "icon_css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
      return ((i = this._config) == null ? void 0 : i.type) === "climate" && e.unshift({
        name: "display_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "text", label: "Text" },
              { value: "icon", label: "Icon" },
              { value: "text_icon", label: "Text + Icon" }
            ]
          }
        }
      }), e;
    }), this._schemaalert = E(() => {
      const t = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "invert", selector: { boolean: {} } },
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        { name: "icon_css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemasensor = E(() => {
      const t = [
        "more-info",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "invert", selector: { boolean: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        { name: "css", selector: { template: {} } },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        },
        { name: "popup_card", selector: { object: {} } }
      ];
    }), this._schemacustombutton = E(() => {
      const t = [
        "more-info",
        "toggle",
        "navigate",
        "url",
        "perform-action",
        "none"
      ];
      return [
        { name: "name", selector: { text: {} } },
        { name: "icon", selector: { icon: {} } },
        {
          name: "color",
          selector: { ui_color: { default_color: "state", include_state: !0 } }
        },
        {
          name: "tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "double_tap_action",
          selector: { ui_action: { actions: t } }
        },
        {
          name: "hold_action",
          selector: { ui_action: { actions: t } }
        }
      ];
    }), this._computeLabelCallback = (t) => {
      switch (t.name) {
        case "color":
          return this.hass.localize("ui.panel.lovelace.editor.card.tile.color");
        case "enable_popup_view":
          return this.hass.localize("ui.common.enable") + " " + this.hass.localize(
            "ui.panel.lovelace.editor.action-editor.actions.more-info"
          );
        case "disable_toggle_action":
          return this.hass.localize("ui.common.disable") + " " + this.hass.localize(
            "ui.panel.lovelace.editor.card.generic.tap_action"
          );
        case "css":
          return "CSS";
        case "icon_css":
          return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon") + " CSS";
        case "display_mode":
          return "Display Mode";
        case "popup_card":
          return "Change Popup Card Type";
        case "icon":
        case "tap_action":
        case "hold_action":
        case "double_tap_action":
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.generic.${t.name}`
          );
        case "invert":
        case "invert_state":
          return this.hass.localize(
            "ui.dialogs.entity_registry.editor.invert.label"
          );
        case "name":
          return this.hass.localize("ui.common.name");
        default:
          return this.hass.localize(
            `ui.panel.lovelace.editor.card.area.${t.name}`
          );
      }
    };
  }
  updated(t) {
    t.has("config") && this.config && (this._config = { ...this.config });
  }
  render() {
    if (!this.hass || !this.config)
      return w``;
    this._config || (this._config = { ...this.config, area: this.config.area || "" });
    let t;
    switch (this.getSchema) {
      case "sensor":
        t = this._schemasensor();
        break;
      case "domain":
        t = this._schemadomain();
        break;
      case "alert":
      case "cover":
        t = this._schemaalert();
        break;
      case "custom_button":
        t = this._schemacustombutton();
        break;
    }
    const e = { ...this._config };
    return w`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }
  _valueChangedSchema(t) {
    if (!this.config)
      return;
    const e = {
      ...this.config,
      ...t.detail.value
    };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: e
      })
    );
  }
  static get styles() {
    return Me`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `;
  }
};
ze([
  B({ attribute: !1 })
], xe.prototype, "config", 2);
ze([
  B({ attribute: !1 })
], xe.prototype, "hass", 2);
ze([
  B({ type: Boolean })
], xe.prototype, "useSensorSchema", 2);
ze([
  U()
], xe.prototype, "getSchema", 2);
ze([
  U()
], xe.prototype, "_config", 2);
xe = ze([
  he("item-editor")
], xe);
var Vs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, re = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Ks(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && Vs(e, i, o), o;
};
let Y = class extends oe {
  constructor() {
    super(...arguments), this._subElementEditorDomain = void 0, this._subElementEditorAlert = void 0, this._subElementEditorCover = void 0, this._subElementEditorSensor = void 0, this._subElementEditorCustomButton = void 0, this.computeLabel = E((t) => yi(this.hass, t)), this._schema = E(
      (t, e) => {
        const i = (o) => this.hass.localize(o) || o, s = [
          "more-info",
          "navigate",
          "url",
          "perform-action",
          "none"
        ];
        return i("ui.panel.lovelace.editor.card.generic.icon"), i("ui.components.selectors.image.image"), `${i(
          "ui.panel.lovelace.editor.card.generic.icon"
        )}${i("ui.components.selectors.image.image")}`, [
          { name: "area", selector: { area: {} } },
          {
            name: "appearance",
            flatten: !0,
            type: "expandable",
            icon: "mdi:palette",
            schema: [
              { name: "theme", required: !1, selector: { theme: {} } },
              {
                name: "layout",
                required: !0,
                selector: {
                  select: {
                    mode: "box",
                    options: ["vertical", "horizontal"].map((o) => ({
                      label: i(
                        `ui.panel.lovelace.editor.card.tile.content_layout_options.${o}`
                      ),
                      value: o
                    }))
                  }
                }
              },
              {
                name: "design",
                selector: {
                  select: { mode: "box", options: ["V1", "V2"] }
                }
              },
              ...t === "V2" ? [
                {
                  name: "use_light_color",
                  selector: { boolean: {} }
                },
                {
                  name: "light_color_entities",
                  selector: {
                    entity: {
                      multiple: !0,
                      filter: {
                        domain: ["light"]
                      }
                    }
                  }
                },
                {
                  name: "v2_color",
                  selector: {
                    color_rgb: {
                      default_color: "state",
                      include_state: !0
                    }
                  }
                }
              ] : [],
              { name: "mirrored", selector: { boolean: {} } },
              {
                name: "",
                type: "grid",
                schema: [
                  { name: "name", selector: { text: {} } },
                  { name: "color", selector: { ui_color: {} } },
                  {
                    name: "display_type",
                    required: !0,
                    selector: {
                      select: {
                        options: [
                          "icon",
                          "picture",
                          "icon & picture",
                          "camera",
                          "camera & icon"
                        ].map((o) => {
                          const n = (c) => {
                            const d = c.trim().toLowerCase();
                            return d === "icon" ? "ui.panel.lovelace.editor.card.generic.icon" : d === "picture" || d === "image" ? "ui.components.selectors.image.image" : d === "camera" ? "ui.panel.lovelace.editor.card.area.display_type_options.camera" : `ui.panel.lovelace.editor.card.area.display_type_options.${c}`;
                          }, r = o.split(" & ").map((c) => c.trim()).map((c) => i(n(c)) || c).join(" & ");
                          return { value: o, label: r };
                        }),
                        mode: "dropdown"
                      }
                    }
                  },
                  ...e === "camera" || e === "camera & icon" ? [
                    {
                      name: "camera_view",
                      selector: {
                        select: {
                          options: ["auto", "live"].map((o) => ({
                            value: o,
                            label: i(
                              `ui.panel.lovelace.editor.card.generic.camera_view_options.${o}`
                            )
                          })),
                          mode: "dropdown"
                        }
                      }
                    }
                  ] : []
                ]
              },
              { name: "area_icon", selector: { icon: {} } },
              {
                name: "area_icon_color",
                selector: {
                  ui_color: { default_color: "state", include_state: !0 }
                }
              },
              { name: "area_name", selector: { text: {} } },
              {
                name: "area_name_color",
                selector: {
                  ui_color: { default_color: "state", include_state: !0 }
                }
              },
              {
                name: "css",
                flatten: !0,
                type: "expandable",
                icon: "mdi:palette",
                schema: [
                  { name: "icon_css", selector: { template: {} } },
                  { name: "name_css", selector: { template: {} } }
                ]
              },
              { name: "tap_action", selector: { ui_action: { actions: s } } },
              { name: "double_tap_action", selector: { ui_action: { actions: s } } },
              { name: "hold_action", selector: { ui_action: { actions: s } } }
            ]
          }
        ];
      }
    ), this._binaryschema = E((t) => [
      {
        name: "alert_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "alert_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "alert_css", selector: { template: {} } }
    ]), this._coverschema = E((t) => [
      {
        name: "cover_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "cover_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "cover_css", selector: { template: {} } }
    ]), this._sensorschema = E((t) => [
      {
        name: "",
        type: "grid",
        schema: [
          { name: "show_sensor_icons", selector: { boolean: {} } },
          { name: "wrap_sensor_icons", selector: { boolean: {} } }
        ]
      },
      {
        name: "sensor_classes",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "sensor_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      }
    ]), this._toggleschema = E((t) => [
      {
        name: "toggle_domains",
        selector: {
          select: {
            reorder: !0,
            multiple: !0,
            custom_value: !0,
            options: t
          }
        }
      },
      {
        name: "domain_color",
        selector: { ui_color: { default_color: "state", include_state: !0 } }
      },
      { name: "domain_css", selector: { template: {} } },
      { name: "show_active", selector: { boolean: {} } }
    ]), this._popupschema = E(
      (t, e) => {
        const i = this.computeLabel({ name: "name" }), s = this.computeLabel({ name: "state" });
        return [
          {
            name: "columns",
            selector: { number: { min: 1, max: 4, mode: "box" } }
          },
          {
            name: "",
            type: "grid",
            schema: [
              {
                name: "ungroup_areas",
                selector: { boolean: {} }
              },
              { name: "hide_unavailable", selector: { boolean: {} } }
            ]
          },
          {
            name: "popup_sort",
            selector: {
              select: {
                options: [
                  { value: "name", label: i },
                  { value: "state", label: s }
                ]
              }
            }
          },
          {
            name: "popup_domains",
            selector: {
              select: {
                reorder: !0,
                multiple: !0,
                custom_value: !0,
                options: t
              }
            }
          },
          {
            name: "edit_filters",
            flatten: !0,
            type: "expandable",
            icon: "mdi:eye-plus",
            schema: [{ name: "label", selector: { label: { multiple: !0 } } }]
          },
          {
            name: "extra_entities",
            flatten: !0,
            type: "expandable",
            icon: "mdi:eye-plus",
            schema: [
              {
                name: "extra_entities",
                selector: { entity: { multiple: !0 } }
              }
            ]
          }
        ];
      }
    ), this._binaryClassesForArea = E(
      (t) => this._classesForArea(t, "binary_sensor")
    ), this._coverClassesForArea = E(
      (t) => this._classesForArea(t, "cover")
    ), this._sensorClassesForArea = E(
      (t, e) => this._classesForArea(t, "sensor", e)
    ), this._toggleDomainsForArea = E(
      (t) => this._classesForArea(t, "toggle")
    ), this._allDomainsForArea = E(
      (t) => this._classesForArea(t, "all")
    ), this._buildBinaryOptions = E(
      (t, e) => this._buildOptions("binary_sensor", t, e)
    ), this._buildCoverOptions = E(
      (t, e) => this._buildOptions("cover", t, e)
    ), this._buildSensorOptions = E(
      (t, e) => this._buildOptions("sensor", t, e)
    ), this._buildToggleOptions = E(
      (t, e) => this._buildOptions("toggle", t, e)
    ), this._buildAllOptions = E(
      (t, e) => this._buildOptions("all", t, e)
    ), this._entityOptions = [], this._toggleEntityHidden = (t) => {
      var s;
      const e = new Set(((s = this._config) == null ? void 0 : s.hidden_entities) ?? []);
      e.has(t) ? e.delete(t) : e.add(t);
      const i = Array.from(e);
      this._config = {
        ...this._config || {},
        hidden_entities: i
      }, j(this, "config-changed", { config: this._config });
    };
  }
  _classesForArea(t, e, i) {
    var o;
    let s;
    if (e === "toggle")
      return s = Object.values(this.hass.entities).filter(
        (n) => {
          var a;
          return (Ze.includes(q(n.entity_id)) || wt.includes(q(n.entity_id))) && !n.hidden && (n.area_id === t || n.device_id && ((a = this.hass.devices[n.device_id]) == null ? void 0 : a.area_id) === t);
        }
      ), [
        ...new Set(s.map((n) => q(n.entity_id)))
      ];
    if (e === "all") {
      const n = ((o = this._config) == null ? void 0 : o.extra_entities) || [];
      let a = Object.values(this.hass.entities).filter(
        (c) => {
          var d;
          return !c.hidden && (c.area_id === t || c.device_id && ((d = this.hass.devices[c.device_id]) == null ? void 0 : d.area_id) === t);
        }
      );
      const r = n.map((c) => this.hass.states[c]).filter((c) => c !== void 0);
      return a = [...a, ...r], [...new Set(a.map((c) => q(c.entity_id)))];
    } else {
      s = Object.values(this.hass.entities).filter(
        (a) => {
          var r;
          return q(a.entity_id) === e && !a.entity_category && !a.hidden && (a.area_id === t || a.device_id && ((r = this.hass.devices[a.device_id]) == null ? void 0 : r.area_id) === t);
        }
      );
      const n = s.map(
        (a) => {
          var r;
          return ((r = this.hass.states[a.entity_id]) == null ? void 0 : r.attributes.device_class) || "";
        }
      ).filter(
        (a) => a && (e !== "sensor" || !i || i.includes(a))
      );
      return [...new Set(n)];
    }
  }
  _buildOptions(t, e, i) {
    const o = [.../* @__PURE__ */ new Set([...e, ...i])].map((n) => ({
      value: n,
      label: n === "scene" ? "Scene" : t === "toggle" || t === "all" ? this.hass.localize(
        `component.${n}.entity_component._.name`
      ) || n : this.hass.localize(
        `component.${t}.entity_component.${n}.name`
      ) || n
    }));
    return o.sort(
      (n, a) => ui(n.label, a.label, this.hass.locale.language)
    ), o;
  }
  setConfig(t) {
    this._config = {
      ...t,
      columns: t.columns || 4,
      mirrored: t.mirrored || !1,
      customization_domain: t.customization_domain || [],
      customization_alert: t.customization_alert || [],
      customization_cover: t.customization_cover || [],
      customization_sensor: t.customization_sensor || [],
      custom_buttons: t.custom_buttons || []
    };
  }
  async updated(t) {
    var e;
    if (super.updated(t), !(!this.hass || !this._config)) {
      if (t.has("_config")) {
        const i = t.get("_config"), s = i == null ? void 0 : i.area, o = this._config.area, n = (i == null ? void 0 : i.extra_entities) || [], a = this._config.extra_entities || [], r = (i == null ? void 0 : i.popup_domains) || [], c = ((e = this._config) == null ? void 0 : e.popup_domains) || [], d = n.length !== a.length || !n.every(
          (h) => a.includes(h)
        ), l = r.length !== c.length || !r.every(
          (h) => c.includes(h)
        );
        if (s !== void 0 && s !== o) {
          const h = this._toggleDomainsForArea(o), m = this._binaryClassesForArea(o), u = this._coverClassesForArea(o), f = this._allDomainsForArea(o), v = h.sort(
            (C, $) => Ze.indexOf(C) - Ze.indexOf($)
          ), g = Object.keys(Qe || {}), z = new Map(
            g.map((C, $) => [C, $])
          ), R = f.sort((C, $) => {
            const A = z.has(C) ? z.get(C) : Number.MAX_SAFE_INTEGER, I = z.has($) ? z.get($) : Number.MAX_SAFE_INTEGER;
            return A === I ? C.localeCompare($) : A - I;
          });
          if (this._config.toggle_domains = [
            ...v.filter((C) => C !== "scene" && C !== "script")
          ], this._config.alert_classes = [...m], this._config.cover_classes = [...u], this._config.popup_domains = [...R], this._config.customization_domain = [], this._config.customization_alert = [], this._config.customization_cover = [], this._config.customization_sensor = [], this._updateEntityOptions(), Array.isArray(this._config.hidden_entities)) {
            const C = this._config.hidden_entities, $ = Object.values(this._hiddenEntitiesByDomain()).flat(), A = C.filter((I) => $.includes(I));
            A.length !== C.length && (this._config = {
              ...this._config || {},
              hidden_entities: A
            }, j(this, "config-changed", {
              config: { ...this._config }
            }));
          }
          this.requestUpdate();
        }
        if (d) {
          for (const h of a) {
            const m = q(h);
            this._config.popup_domains.includes(m) || this._config.popup_domains.push(m);
          }
          this.requestUpdate();
        }
        l && this._updateEntityOptions();
      }
      if (!this._numericDeviceClasses) {
        const { numeric_device_classes: i } = await vs(this.hass);
        this._numericDeviceClasses = i;
      }
    }
  }
  _updateEntityOptions() {
    if (!this._config || !this.hass) return;
    const t = this._config.area, e = this._config.popup_domains || [];
    this._entityOptions = Object.values(this.hass.entities).filter(
      (i) => {
        var s;
        return !i.hidden && e.includes(q(i.entity_id)) && (i.area_id === t || i.device_id && ((s = this.hass.devices[i.device_id]) == null ? void 0 : s.area_id) === t);
      }
    ).map((i) => ({
      value: i.entity_id,
      label: i.entity_id
    })).sort((i, s) => i.value.localeCompare(s.value)), this._valueChanged({ detail: { value: this._config } });
  }
  _valueChanged(t) {
    this._config = t.detail.value, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config }
      })
    );
  }
  _isHiddenEntity(t) {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.hidden_entities) ?? [];
    return Array.isArray(e) && e.includes(t);
  }
  _hiddenCategoryChanged(t) {
    var i, s;
    const e = (s = (i = t.detail) == null ? void 0 : i.value) == null ? void 0 : s.category_filter;
    this._config = {
      ...this._config || {},
      category_filter: e
    }, j(this, "config-changed", { config: { ...this._config } });
  }
  _editItem(t, e) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const i = t.detail;
    this[`_subElementEditor${e}`] = { index: i, type: "element" };
  }
  _edit_itemDomain(t) {
    this._editItem(t, "Domain");
  }
  _edit_itemAlert(t) {
    this._editItem(t, "Alert");
  }
  _edit_itemCover(t) {
    this._editItem(t, "Cover");
  }
  _edit_itemSensor(t) {
    this._editItem(t, "Sensor");
  }
  _customizationChanged(t, e) {
    t.stopPropagation(), !(!this._config || !this.hass) && j(this, "config-changed", {
      config: {
        ...this._config,
        [`customization_${e}`]: t.detail
      }
    });
  }
  _customizationChangedDomain(t) {
    this._customizationChanged(t, "domain");
  }
  _customizationChangedAlert(t) {
    this._customizationChanged(t, "alert");
  }
  _customizationChangedCover(t) {
    this._customizationChanged(t, "cover");
  }
  _customizationChangedSensor(t) {
    this._customizationChanged(t, "sensor");
  }
  _renderSubElementEditorCustomButton() {
    var i, s, o;
    const t = ((i = this._subElementEditorCustomButton) == null ? void 0 : i.index) ?? 0, e = ((o = (s = this._config) == null ? void 0 : s.custom_buttons) == null ? void 0 : o[t]) || {};
    return w`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${this._goBackCustomButton}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title"
            >${this.hass.localize(
      "ui.panel.lovelace.editor.card.generic.edit_button"
    )}</span
          >
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${e}
        .getSchema=${"custom_button"}
        @config-changed=${this._itemChangedCustomButton}
      ></item-editor>
    `;
  }
  _edit_itemCustomButton(t) {
    t.stopPropagation(), !(!this._config || !this.hass) && (this._subElementEditorCustomButton = { index: t.detail, type: "element" });
  }
  _goBackCustomButton() {
    this._subElementEditorCustomButton = void 0;
  }
  _itemChangedCustomButton(t) {
    var i;
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = (i = this._subElementEditorCustomButton) == null ? void 0 : i.index;
    if (e !== void 0) {
      const s = [...this._config.custom_buttons || []];
      s[e] = t.detail, j(this, "config-changed", {
        config: { ...this._config, custom_buttons: s }
      });
    }
  }
  _customizationChangedCustomButtons(t) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const e = t.detail;
    j(this, "config-changed", {
      config: { ...this._config, custom_buttons: e }
    });
  }
  _renderSubElementEditor(t, e, i) {
    var l, h, m;
    const s = `customization_${t}`, o = (l = this._config) == null ? void 0 : l[s], n = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`, a = ((h = this[n]) == null ? void 0 : h.index) ?? 0, r = ((m = o == null ? void 0 : o[a]) == null ? void 0 : m.type) ?? "unknown", c = r.match(/^(.+?)\s*-\s*(.+)$/);
    let d;
    if (c) {
      const u = c[1].toLowerCase().replace(" ", "_"), f = c[2].toLowerCase(), v = this.hass.localize(`component.${u}.entity_component._.name`) || c[1];
      let g = this.hass.localize(
        `ui.dialogs.entity_registry.editor.device_classes.${u}.${f}`
      ) || c[2];
      g = g.charAt(0).toUpperCase() + g.slice(1), d = `${v} – ${g}`;
    } else {
      let u = this.hass.localize(`component.${r}.entity_component._.name`) || r;
      u = u.charAt(0).toUpperCase() + u.slice(1), d = u;
    }
    return w`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${e}>
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </mwc-icon-button>
          <span slot="title">${d}</span>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${(o == null ? void 0 : o[a]) || {}}
        .getSchema=${t}
        @config-changed=${i}
      ></item-editor>
    `;
  }
  _renderSubElementEditorByKey(t) {
    return this._renderSubElementEditor(
      t,
      () => this._goBackByKey(t),
      (e) => this._itemChangedByKey(e, t)
    );
  }
  _goBackByKey(t) {
    const e = `_subElementEditor${t.charAt(0).toUpperCase() + t.slice(1)}`;
    this[e] = void 0;
  }
  _itemChangedByKey(t, e) {
    const i = `_subElementEditor${e.charAt(0).toUpperCase() + e.slice(1)}`, s = this[i], o = `customization_${e}`;
    this._itemChanged(t, s, o);
  }
  _itemChanged(t, e, i) {
    if (t.stopPropagation(), !this._config || !this.hass)
      return;
    const s = e == null ? void 0 : e.index;
    if (s != null) {
      const o = [...this._config[i]];
      o[s] = t.detail, j(this, "config-changed", {
        config: { ...this._config, [i]: o }
      });
    }
  }
  get toggleSelectOptions() {
    return this._selectOptions("toggle");
  }
  get AllSelectOptions() {
    return this._selectOptions("all");
  }
  get binarySelectOptions() {
    return this._selectOptions("binary");
  }
  get coverSelectOptions() {
    return this._selectOptions("cover");
  }
  get sensorSelectOptions() {
    return this._selectOptions("sensor");
  }
  _selectOptions(t) {
    var i, s, o, n, a, r;
    const e = ((i = this._config) == null ? void 0 : i.area) || "";
    switch (t) {
      case "toggle":
        return this._buildToggleOptions(
          this._toggleDomainsForArea(e),
          ((s = this._config) == null ? void 0 : s.toggle_domains) || this._toggleDomainsForArea(e)
        );
      case "all":
        return this._buildAllOptions(
          this._allDomainsForArea(e),
          ((o = this._config) == null ? void 0 : o.popup_domains) || this._allDomainsForArea(e)
        );
      case "binary":
        return this._buildBinaryOptions(
          this._binaryClassesForArea(e),
          ((n = this._config) == null ? void 0 : n.alert_classes) || this._binaryClassesForArea(e)
        );
      case "cover":
        return this._buildCoverOptions(
          this._coverClassesForArea(e),
          ((a = this._config) == null ? void 0 : a.cover_classes) || this._coverClassesForArea(e)
        );
      case "sensor":
        return this._buildSensorOptions(
          this._sensorClassesForArea(e),
          ((r = this._config) == null ? void 0 : r.sensor_classes) || this._sensorClassesForArea(e)
        );
    }
  }
  get entityOptions() {
    return this._entityOptions;
  }
  _domainIcon(t, e = "on", i) {
    const s = Qe;
    if (t in s) {
      const o = s[t];
      return typeof o == "string" ? o : i && o[i] ? o[i][e === "off" ? "off" : "on"] || o[i] : o[e === "off" ? "off" : "on"] || Object.values(o)[0];
    }
    return "mdi:help-circle";
  }
  _groupAllEntitiesByDomain() {
    var a;
    const t = {}, e = (this.entityOptions || []).map((r) => r.value);
    for (const r of e) {
      const c = q(r);
      t[c] || (t[c] = []), t[c].push(r);
    }
    const i = this._hiddenEntitiesByDomain(), s = Array.from(
      /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)])
    ), o = ((a = this.hass) == null ? void 0 : a.states) || {}, n = this.compareByFriendlyName ? this.compareByFriendlyName(o, this.hass.locale.language) : (r, c) => r.localeCompare(c);
    return s.sort((r, c) => r.localeCompare(c)).map((r) => {
      const c = /* @__PURE__ */ new Set([
        ...t[r] || [],
        ...i[r] || []
      ]);
      return { domain: r, entities: Array.from(c).sort(n) };
    });
  }
  _domainLabel(t) {
    var e, i;
    return ((i = (e = this.hass) == null ? void 0 : e.localize) == null ? void 0 : i.call(e, `component.${t}.entity_component._.name`)) || t;
  }
  _getDeviceClassLabel(t, e) {
    if (!e || e === "other")
      return this.hass.localize("ui.dialogs.helper_settings.generic.other") ?? "Other";
    const i = `ui.dialogs.entity_registry.editor.device_classes.${t}.${e}`;
    return this.hass.localize(i) || e;
  }
  _groupByDeviceClass(t, e) {
    var a, r, c;
    const i = ((a = this.hass) == null ? void 0 : a.states) || {}, s = {};
    for (const d of e) {
      const l = ((c = (r = i[d]) == null ? void 0 : r.attributes) == null ? void 0 : c.device_class) || "";
      l && (s[l] || (s[l] = []), s[l].push(d));
    }
    const o = this.compareByFriendlyName ? this.compareByFriendlyName(i, this.hass.locale.language) : (d, l) => d.localeCompare(l);
    return Object.keys(s).sort((d, l) => d.localeCompare(l)).map((d) => ({
      deviceClass: d,
      label: this._getDeviceClassLabel(t, d),
      entities: s[d].slice().sort(o)
    }));
  }
  _hiddenEntitiesByDomain() {
    var h, m, u, f, v, g, z;
    const t = {}, e = Array.isArray((h = this._config) == null ? void 0 : h.hidden_entities) ? this._config.hidden_entities : [];
    if (e.length === 0) return t;
    const i = ((m = this.hass) == null ? void 0 : m.entities) || {}, s = ((u = this.hass) == null ? void 0 : u.devices) || {}, o = (f = this.hass) != null && f.areas ? Object.values(this.hass.areas) : [], n = (v = this._config) == null ? void 0 : v.area, a = (g = this._config) == null ? void 0 : g.floor, r = (z = this._config) == null ? void 0 : z.label, c = n ? Array.isArray(n) ? n : [n] : [], d = a ? Array.isArray(a) ? a : [a] : [], l = r ? Array.isArray(r) ? r : [r] : [];
    for (const R of e) {
      const C = q(R), $ = i[R], A = $ != null && $.device_id ? s[$.device_id] : void 0;
      if ((($ == null ? void 0 : $.area_id) != null || (A == null ? void 0 : A.area_id) != null) && !(l.length && !(Array.isArray($ == null ? void 0 : $.labels) && $.labels.some((H) => l.includes(H)) || Array.isArray(A == null ? void 0 : A.labels) && A.labels.some((H) => l.includes(H)))) && !(c.length && !($ != null && $.area_id && c.includes($.area_id) || A != null && A.area_id && c.includes(A.area_id)))) {
        if (d.length) {
          const Z = ($ == null ? void 0 : $.area_id) && o.some(
            (X) => X.area_id === $.area_id && X.floor_id && d.includes(X.floor_id)
          ), H = (A == null ? void 0 : A.area_id) && o.some(
            (X) => X.area_id === A.area_id && X.floor_id && d.includes(X.floor_id)
          );
          if (!Z && !H) continue;
        }
        t[C] || (t[C] = []), t[C].push(R);
      }
    }
    return t;
  }
  render() {
    var h;
    if (!this.hass || !this._config)
      return x;
    const t = this._toggleDomainsForArea(
      this._config.area || ""
    ), e = this._binaryClassesForArea(
      this._config.area || ""
    ), i = this._coverClassesForArea(
      this._config.area || ""
    ), s = this._allDomainsForArea(this._config.area || ""), o = this._schema(
      this._config.design || "V1",
      this._config.display_type
    ), n = this._binaryschema(this.binarySelectOptions), a = this._coverschema(this.coverSelectOptions), r = this._sensorschema(this.sensorSelectOptions), c = this._toggleschema(this.toggleSelectOptions), d = this._popupschema(
      this.AllSelectOptions,
      this.entityOptions
    ), l = {
      alert_classes: e,
      cover_classes: i,
      sensor_classes: Ct.sensor,
      toggle_domains: t,
      popup_domains: s,
      ...this._config
    };
    return this._subElementEditorDomain ? this._renderSubElementEditorByKey("domain") : this._subElementEditorAlert ? this._renderSubElementEditorByKey("alert") : this._subElementEditorCover ? this._renderSubElementEditorByKey("cover") : this._subElementEditorSensor ? this._renderSubElementEditorByKey("sensor") : this._subElementEditorCustomButton ? this._renderSubElementEditorCustomButton() : w`
      <ha-form
        .hass=${this.hass}
        .data=${l}
        .schema=${o}
        .computeLabel=${this.computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Os}></ha-svg-icon>
          ${this.computeLabel({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${n}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <alert-items-editor
            .hass=${this.hass}
            .customization_alert=${this._config.customization_alert}
            .SelectOptions=${this.binarySelectOptions}
            @edit-item=${this._edit_itemAlert}
            @config-changed=${this._customizationChangedAlert}
          >
          </alert-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${ks}></ha-svg-icon>
          ${this.computeLabel({ name: "cover_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${a}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <cover-items-editor
            .hass=${this.hass}
            .customization_cover=${this._config.customization_cover}
            .SelectOptions=${this.coverSelectOptions}
            @edit-item=${this._edit_itemCover}
            @config-changed=${this._customizationChangedCover}
          >
          </cover-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Ds}></ha-svg-icon>
          ${this.computeLabel({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${r}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <sensor-items-editor
            .hass=${this.hass}
            .customization_sensor=${this._config.customization_sensor}
            .SelectOptions=${this.sensorSelectOptions}
            @edit-item=${this._edit_itemSensor}
            @config-changed=${this._customizationChangedSensor}
          >
          </sensor-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="toggle_domains">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Ms}></ha-svg-icon>
          ${this.computeLabel({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${c}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <domain-items-editor
            .hass=${this.hass}
            .customization_domain=${this._config.customization_domain}
            .SelectOptions=${this.toggleSelectOptions}
            @edit-item=${this._edit_itemDomain}
            @config-changed=${this._customizationChangedDomain}
          >
          </domain-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${zs}></ha-svg-icon>
          Custom Buttons
        </div>
        <div class="content">
          <custom-buttons-editor
            .hass=${this.hass}
            .custom_buttons=${this._config.custom_buttons}
            @config-changed=${this._customizationChangedCustomButtons}
            @edit-item=${this._edit_itemCustomButton}
          >
          </custom-buttons-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="popup">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Hs}></ha-svg-icon>
          ${this.computeLabel({ name: "popup" })}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${l}
            .schema=${d}
            .computeLabel=${this.computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>

          <ha-expansion-panel outlined class="main">
            <div slot="header" role="heading" aria-level="3">
              <ha-svg-icon .path=${$t}></ha-svg-icon>
              ${this.computeLabel({ name: "hidden_entities" })}
            </div>
            <div class="content">
              <!-- Category filter selector for hidden entities -->
              <ha-form
                .hass=${this.hass}
                .data=${{ category_filter: (h = this._config) == null ? void 0 : h.category_filter }}
                .schema=${[
      {
        name: "category_filter",
        selector: {
          select: {
            options: ["config", "diagnostic", "config+diagnostic"],
            mode: "dropdown"
          }
        }
      }
    ]}
                .computeLabel=${this.computeLabel}
                @value-changed=${(m) => this._hiddenCategoryChanged(m)}
              ></ha-form>
              ${this._groupAllEntitiesByDomain().map(
      (m) => w`
                  <ha-expansion-panel outlined class="domain-panel">
                    <div slot="header" class="domain-header">
                      <ha-icon
                        .icon=${this._domainIcon(m.domain, "on")}
                      ></ha-icon>
                      <span class="domain-title"
                        >${this._domainLabel(m.domain)}</span
                      >
                    </div>
                    <div class="content">
                      ${["binary_sensor", "cover"].includes(m.domain) ? this._groupByDeviceClass(
        m.domain,
        m.entities
      ).map(
        (u) => w`
                              <ha-expansion-panel outlined class="domain-panel">
                                <div slot="header" class="dc-header">
                                  <ha-icon
                                    .icon=${this._domainIcon(
          m.domain,
          "on",
          u.deviceClass
        )}
                                  ></ha-icon>
                                  <span class="dc-title">${u.label}</span>
                                </div>
                                <div class="content">
                                  ${u.entities.map(
          (f) => {
            var v, g;
            return w`
                                      <div class="entity-row">
                                        <span class="entity-name">
                                          ${((g = (v = this.hass.states[f]) == null ? void 0 : v.attributes) == null ? void 0 : g.friendly_name) || f}
                                        </span>
                                        <ha-icon-button
                                          .path=${this._isHiddenEntity(f) ? ti : $t}
                                          .label=${this._isHiddenEntity(f) ? this.hass.localize(
              "ui.common.show"
            ) ?? "Show" : this.hass.localize(
              "ui.common.hide"
            ) ?? "Hide"}
                                          @click=${() => this._toggleEntityHidden(f)}
                                        ></ha-icon-button>
                                      </div>
                                    `;
          }
        )}
                                </div>
                              </ha-expansion-panel>
                            `
      ) : m.entities.map(
        (u) => {
          var f, v;
          return w`
                              <div class="entity-row">
                                <span class="entity-name">
                                  ${((v = (f = this.hass.states[u]) == null ? void 0 : f.attributes) == null ? void 0 : v.friendly_name) || u}
                                </span>
                                <ha-icon-button
                                  .path=${this._isHiddenEntity(u) ? ti : $t}
                                  .label=${this._isHiddenEntity(u) ? this.hass.localize("ui.common.show") ?? "Show" : this.hass.localize("ui.common.hide") ?? "Hide"}
                                  @click=${() => this._toggleEntityHidden(u)}
                                ></ha-icon-button>
                              </div>
                            `;
        }
      )}
                    </div>
                  </ha-expansion-panel>
                `
    )}
            </div>
          </ha-expansion-panel>
        </div>
      </ha-expansion-panel>
    `;
  }
};
Y.styles = Me`
    :host {
      display: block;
    }
    select {
      padding: 5px;
      font-size: 14px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .main {
      --ha-card-border-radius: 6px;
      border-radius: 6px;
      margin-top: 16px;
    }
    ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .content {
      padding: 12px 4px;
    }
    .back-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      gap: 0.5em;
    }
    ha-icon {
      display: flex;
    }
    .header {
      margin-bottom: 0.5em;
    }
    .entity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 0;
    }
    .entity-name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .domain-panel {
      margin-top: 6px;
    }
    .domain-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .domain-header ha-icon {
      --mdc-icon-size: 20px;
    }
    .dc-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dc-header ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
re([
  B({ attribute: !1 })
], Y.prototype, "hass", 2);
re([
  U()
], Y.prototype, "_config", 2);
re([
  U()
], Y.prototype, "_entities", 2);
re([
  U()
], Y.prototype, "_numericDeviceClasses", 2);
re([
  U()
], Y.prototype, "_subElementEditorDomain", 2);
re([
  U()
], Y.prototype, "_subElementEditorAlert", 2);
re([
  U()
], Y.prototype, "_subElementEditorCover", 2);
re([
  U()
], Y.prototype, "_subElementEditorSensor", 2);
re([
  U()
], Y.prototype, "_subElementEditorCustomButton", 2);
Y = re([
  he("area-card-plus-editor")
], Y);
console.info(
  `%c AREA-CARD %c ${wi.version} `,
  "color: steelblue; background: black; font-weight: bold;",
  "color: white ; background: dimgray; font-weight: bold;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "area-card-plus",
  name: "Area Card Plus",
  preview: !0,
  description: "A custom card to display area information."
});
