import {
  require_cjs,
  require_lib,
  require_lodash
} from "./chunk-LAGEYWQV.js";
import {
  axios_default
} from "./chunk-MOBYBDLD.js";
import {
  require_react
} from "./chunk-65KY755N.js";
import {
  __commonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/nprogress/nprogress.js
var require_nprogress = __commonJS({
  "node_modules/nprogress/nprogress.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module.exports = factory();
      } else {
        root.NProgress = factory();
      }
    })(exports, function() {
      var NProgress = {};
      NProgress.version = "0.2.0";
      var Settings = NProgress.settings = {
        minimum: 0.08,
        easing: "ease",
        positionUsing: "",
        speed: 200,
        trickle: true,
        trickleRate: 0.02,
        trickleSpeed: 800,
        showSpinner: true,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: "body",
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
      };
      NProgress.configure = function(options) {
        var key, value;
        for (key in options) {
          value = options[key];
          if (value !== void 0 && options.hasOwnProperty(key)) Settings[key] = value;
        }
        return this;
      };
      NProgress.status = null;
      NProgress.set = function(n) {
        var started = NProgress.isStarted();
        n = clamp(n, Settings.minimum, 1);
        NProgress.status = n === 1 ? null : n;
        var progress = NProgress.render(!started), bar = progress.querySelector(Settings.barSelector), speed = Settings.speed, ease = Settings.easing;
        progress.offsetWidth;
        queue(function(next) {
          if (Settings.positionUsing === "") Settings.positionUsing = NProgress.getPositioningCSS();
          css(bar, barPositionCSS(n, speed, ease));
          if (n === 1) {
            css(progress, {
              transition: "none",
              opacity: 1
            });
            progress.offsetWidth;
            setTimeout(function() {
              css(progress, {
                transition: "all " + speed + "ms linear",
                opacity: 0
              });
              setTimeout(function() {
                NProgress.remove();
                next();
              }, speed);
            }, speed);
          } else {
            setTimeout(next, speed);
          }
        });
        return this;
      };
      NProgress.isStarted = function() {
        return typeof NProgress.status === "number";
      };
      NProgress.start = function() {
        if (!NProgress.status) NProgress.set(0);
        var work = function() {
          setTimeout(function() {
            if (!NProgress.status) return;
            NProgress.trickle();
            work();
          }, Settings.trickleSpeed);
        };
        if (Settings.trickle) work();
        return this;
      };
      NProgress.done = function(force) {
        if (!force && !NProgress.status) return this;
        return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
      };
      NProgress.inc = function(amount) {
        var n = NProgress.status;
        if (!n) {
          return NProgress.start();
        } else {
          if (typeof amount !== "number") {
            amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
          }
          n = clamp(n + amount, 0, 0.994);
          return NProgress.set(n);
        }
      };
      NProgress.trickle = function() {
        return NProgress.inc(Math.random() * Settings.trickleRate);
      };
      (function() {
        var initial = 0, current = 0;
        NProgress.promise = function($promise) {
          if (!$promise || $promise.state() === "resolved") {
            return this;
          }
          if (current === 0) {
            NProgress.start();
          }
          initial++;
          current++;
          $promise.always(function() {
            current--;
            if (current === 0) {
              initial = 0;
              NProgress.done();
            } else {
              NProgress.set((initial - current) / initial);
            }
          });
          return this;
        };
      })();
      NProgress.render = function(fromStart) {
        if (NProgress.isRendered()) return document.getElementById("nprogress");
        addClass(document.documentElement, "nprogress-busy");
        var progress = document.createElement("div");
        progress.id = "nprogress";
        progress.innerHTML = Settings.template;
        var bar = progress.querySelector(Settings.barSelector), perc = fromStart ? "-100" : toBarPerc(NProgress.status || 0), parent = document.querySelector(Settings.parent), spinner;
        css(bar, {
          transition: "all 0 linear",
          transform: "translate3d(" + perc + "%,0,0)"
        });
        if (!Settings.showSpinner) {
          spinner = progress.querySelector(Settings.spinnerSelector);
          spinner && removeElement(spinner);
        }
        if (parent != document.body) {
          addClass(parent, "nprogress-custom-parent");
        }
        parent.appendChild(progress);
        return progress;
      };
      NProgress.remove = function() {
        removeClass(document.documentElement, "nprogress-busy");
        removeClass(document.querySelector(Settings.parent), "nprogress-custom-parent");
        var progress = document.getElementById("nprogress");
        progress && removeElement(progress);
      };
      NProgress.isRendered = function() {
        return !!document.getElementById("nprogress");
      };
      NProgress.getPositioningCSS = function() {
        var bodyStyle = document.body.style;
        var vendorPrefix = "WebkitTransform" in bodyStyle ? "Webkit" : "MozTransform" in bodyStyle ? "Moz" : "msTransform" in bodyStyle ? "ms" : "OTransform" in bodyStyle ? "O" : "";
        if (vendorPrefix + "Perspective" in bodyStyle) {
          return "translate3d";
        } else if (vendorPrefix + "Transform" in bodyStyle) {
          return "translate";
        } else {
          return "margin";
        }
      };
      function clamp(n, min, max) {
        if (n < min) return min;
        if (n > max) return max;
        return n;
      }
      function toBarPerc(n) {
        return (-1 + n) * 100;
      }
      function barPositionCSS(n, speed, ease) {
        var barCSS;
        if (Settings.positionUsing === "translate3d") {
          barCSS = { transform: "translate3d(" + toBarPerc(n) + "%,0,0)" };
        } else if (Settings.positionUsing === "translate") {
          barCSS = { transform: "translate(" + toBarPerc(n) + "%,0)" };
        } else {
          barCSS = { "margin-left": toBarPerc(n) + "%" };
        }
        barCSS.transition = "all " + speed + "ms " + ease;
        return barCSS;
      }
      var queue = /* @__PURE__ */ function() {
        var pending = [];
        function next() {
          var fn = pending.shift();
          if (fn) {
            fn(next);
          }
        }
        return function(fn) {
          pending.push(fn);
          if (pending.length == 1) next();
        };
      }();
      var css = /* @__PURE__ */ function() {
        var cssPrefixes = ["Webkit", "O", "Moz", "ms"], cssProps = {};
        function camelCase(string) {
          return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
            return letter.toUpperCase();
          });
        }
        function getVendorProp(name) {
          var style = document.body.style;
          if (name in style) return name;
          var i = cssPrefixes.length, capName = name.charAt(0).toUpperCase() + name.slice(1), vendorName;
          while (i--) {
            vendorName = cssPrefixes[i] + capName;
            if (vendorName in style) return vendorName;
          }
          return name;
        }
        function getStyleProp(name) {
          name = camelCase(name);
          return cssProps[name] || (cssProps[name] = getVendorProp(name));
        }
        function applyCss(element, prop, value) {
          prop = getStyleProp(prop);
          element.style[prop] = value;
        }
        return function(element, properties) {
          var args = arguments, prop, value;
          if (args.length == 2) {
            for (prop in properties) {
              value = properties[prop];
              if (value !== void 0 && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
            }
          } else {
            applyCss(element, args[1], args[2]);
          }
        };
      }();
      function hasClass(element, name) {
        var list = typeof element == "string" ? element : classList(element);
        return list.indexOf(" " + name + " ") >= 0;
      }
      function addClass(element, name) {
        var oldList = classList(element), newList = oldList + name;
        if (hasClass(oldList, name)) return;
        element.className = newList.substring(1);
      }
      function removeClass(element, name) {
        var oldList = classList(element), newList;
        if (!hasClass(element, name)) return;
        newList = oldList.replace(" " + name + " ", " ");
        element.className = newList.substring(1, newList.length - 1);
      }
      function classList(element) {
        return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
      }
      function removeElement(element) {
        element && element.parentNode && element.parentNode.removeChild(element);
      }
      return NProgress;
    });
  }
});

// node_modules/@inertiajs/core/dist/index.esm.js
var import_deepmerge = __toESM(require_cjs());
var O = __toESM(require_lib());
var import_nprogress = __toESM(require_nprogress());
function L(t, e) {
  let i;
  return function(...n) {
    clearTimeout(i), i = setTimeout(() => t.apply(this, n), e);
  };
}
function m(t, e) {
  return document.dispatchEvent(new CustomEvent(`inertia:${t}`, e));
}
var M = (t) => m("before", { cancelable: true, detail: { visit: t } });
var H = (t) => m("error", { detail: { errors: t } });
var $ = (t) => m("exception", { cancelable: true, detail: { exception: t } });
var N = (t) => m("finish", { detail: { visit: t } });
var q = (t) => m("invalid", { cancelable: true, detail: { response: t } });
var x = (t) => m("navigate", { detail: { page: t } });
var W = (t) => m("progress", { detail: { progress: t } });
var X = (t) => m("start", { detail: { visit: t } });
var K = (t) => m("success", { detail: { page: t } });
function I(t) {
  return t instanceof File || t instanceof Blob || t instanceof FileList && t.length > 0 || t instanceof FormData && Array.from(t.values()).some((e) => I(e)) || typeof t == "object" && t !== null && Object.values(t).some((e) => I(e));
}
function A(t, e = new FormData(), i = null) {
  t = t || {};
  for (let n in t) Object.prototype.hasOwnProperty.call(t, n) && z(e, J(i, n), t[n]);
  return e;
}
function J(t, e) {
  return t ? t + "[" + e + "]" : e;
}
function z(t, e, i) {
  if (Array.isArray(i)) return Array.from(i.keys()).forEach((n) => z(t, J(e, n.toString()), i[n]));
  if (i instanceof Date) return t.append(e, i.toISOString());
  if (i instanceof File) return t.append(e, i, i.name);
  if (i instanceof Blob) return t.append(e, i);
  if (typeof i == "boolean") return t.append(e, i ? "1" : "0");
  if (typeof i == "string") return t.append(e, i);
  if (typeof i == "number") return t.append(e, `${i}`);
  if (i == null) return t.append(e, "");
  A(i, t, e);
}
var B = { modal: null, listener: null, show(t) {
  typeof t == "object" && (t = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(t)}`);
  let e = document.createElement("html");
  e.innerHTML = t, e.querySelectorAll("a").forEach((n) => n.setAttribute("target", "_top")), this.modal = document.createElement("div"), this.modal.style.position = "fixed", this.modal.style.width = "100vw", this.modal.style.height = "100vh", this.modal.style.padding = "50px", this.modal.style.boxSizing = "border-box", this.modal.style.backgroundColor = "rgba(0, 0, 0, .6)", this.modal.style.zIndex = 2e5, this.modal.addEventListener("click", () => this.hide());
  let i = document.createElement("iframe");
  if (i.style.backgroundColor = "white", i.style.borderRadius = "5px", i.style.width = "100%", i.style.height = "100%", this.modal.appendChild(i), document.body.prepend(this.modal), document.body.style.overflow = "hidden", !i.contentWindow) throw new Error("iframe not yet ready.");
  i.contentWindow.document.open(), i.contentWindow.document.write(e.outerHTML), i.contentWindow.document.close(), this.listener = this.hideOnEscape.bind(this), document.addEventListener("keydown", this.listener);
}, hide() {
  this.modal.outerHTML = "", this.modal = null, document.body.style.overflow = "visible", document.removeEventListener("keydown", this.listener);
}, hideOnEscape(t) {
  t.keyCode === 27 && this.hide();
} };
function b(t) {
  return new URL(t.toString(), window.location.toString());
}
function k(t, e, i, n = "brackets") {
  let s = /^https?:\/\//.test(e.toString()), l = s || e.toString().startsWith("/"), h = !l && !e.toString().startsWith("#") && !e.toString().startsWith("?"), g = e.toString().includes("?") || t === "get" && Object.keys(i).length, f = e.toString().includes("#"), c = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(i).length && (c.search = O.stringify((0, import_deepmerge.default)(O.parse(c.search, { ignoreQueryPrefix: true }), i), { encodeValuesOnly: true, arrayFormat: n }), i = {}), [[s ? `${c.protocol}//${c.host}` : "", l ? c.pathname : "", h ? c.pathname.substring(1) : "", g ? c.search : "", f ? c.hash : ""].join(""), i];
}
function w(t) {
  return t = new URL(t.href), t.hash = "", t;
}
var Q = typeof window > "u";
var C = class {
  constructor() {
    this.visitId = null;
  }
  init({ initialPage: e, resolveComponent: i, swapComponent: n }) {
    this.page = e, this.resolveComponent = i, this.swapComponent = n, this.setNavigationType(), this.clearRememberedStateOnReload(), this.isBackForwardVisit() ? this.handleBackForwardVisit(this.page) : this.isLocationVisit() ? this.handleLocationVisit(this.page) : this.handleInitialPageVisit(this.page), this.setupEventListeners();
  }
  setNavigationType() {
    this.navigationType = window.performance && window.performance.getEntriesByType("navigation").length > 0 ? window.performance.getEntriesByType("navigation")[0].type : "navigate";
  }
  clearRememberedStateOnReload() {
    var _a;
    this.navigationType === "reload" && ((_a = window.history.state) == null ? void 0 : _a.rememberedState) && delete window.history.state.rememberedState;
  }
  handleInitialPageVisit(e) {
    this.page.url += window.location.hash, this.setPage(e, { preserveState: true }).then(() => x(e));
  }
  setupEventListeners() {
    window.addEventListener("popstate", this.handlePopstateEvent.bind(this)), document.addEventListener("scroll", L(this.handleScrollEvent.bind(this), 100), true);
  }
  scrollRegions() {
    return document.querySelectorAll("[scroll-region]");
  }
  handleScrollEvent(e) {
    typeof e.target.hasAttribute == "function" && e.target.hasAttribute("scroll-region") && this.saveScrollPositions();
  }
  saveScrollPositions() {
    this.replaceState({ ...this.page, scrollRegions: Array.from(this.scrollRegions()).map((e) => ({ top: e.scrollTop, left: e.scrollLeft })) });
  }
  resetScrollPositions() {
    window.scrollTo(0, 0), this.scrollRegions().forEach((e) => {
      typeof e.scrollTo == "function" ? e.scrollTo(0, 0) : (e.scrollTop = 0, e.scrollLeft = 0);
    }), this.saveScrollPositions(), window.location.hash && setTimeout(() => {
      var _a;
      return (_a = document.getElementById(window.location.hash.slice(1))) == null ? void 0 : _a.scrollIntoView();
    });
  }
  restoreScrollPositions() {
    this.page.scrollRegions && this.scrollRegions().forEach((e, i) => {
      let n = this.page.scrollRegions[i];
      if (n) typeof e.scrollTo == "function" ? e.scrollTo(n.left, n.top) : (e.scrollTop = n.top, e.scrollLeft = n.left);
      else return;
    });
  }
  isBackForwardVisit() {
    return window.history.state && this.navigationType === "back_forward";
  }
  handleBackForwardVisit(e) {
    window.history.state.version = e.version, this.setPage(window.history.state, { preserveScroll: true, preserveState: true }).then(() => {
      this.restoreScrollPositions(), x(e);
    });
  }
  locationVisit(e, i) {
    try {
      let n = { preserveScroll: i };
      window.sessionStorage.setItem("inertiaLocationVisit", JSON.stringify(n)), window.location.href = e.href, w(window.location).href === w(e).href && window.location.reload();
    } catch {
      return false;
    }
  }
  isLocationVisit() {
    try {
      return window.sessionStorage.getItem("inertiaLocationVisit") !== null;
    } catch {
      return false;
    }
  }
  handleLocationVisit(e) {
    var _a, _b;
    let i = JSON.parse(window.sessionStorage.getItem("inertiaLocationVisit") || "");
    window.sessionStorage.removeItem("inertiaLocationVisit"), e.url += window.location.hash, e.rememberedState = ((_a = window.history.state) == null ? void 0 : _a.rememberedState) ?? {}, e.scrollRegions = ((_b = window.history.state) == null ? void 0 : _b.scrollRegions) ?? [], this.setPage(e, { preserveScroll: i.preserveScroll, preserveState: true }).then(() => {
      i.preserveScroll && this.restoreScrollPositions(), x(e);
    });
  }
  isLocationVisitResponse(e) {
    return !!(e && e.status === 409 && e.headers["x-inertia-location"]);
  }
  isInertiaResponse(e) {
    return !!(e == null ? void 0 : e.headers["x-inertia"]);
  }
  createVisitId() {
    return this.visitId = {}, this.visitId;
  }
  cancelVisit(e, { cancelled: i = false, interrupted: n = false }) {
    e && !e.completed && !e.cancelled && !e.interrupted && (e.cancelToken.abort(), e.onCancel(), e.completed = false, e.cancelled = i, e.interrupted = n, N(e), e.onFinish(e));
  }
  finishVisit(e) {
    !e.cancelled && !e.interrupted && (e.completed = true, e.cancelled = false, e.interrupted = false, N(e), e.onFinish(e));
  }
  resolvePreserveOption(e, i) {
    return typeof e == "function" ? e(i) : e === "errors" ? Object.keys(i.props.errors || {}).length > 0 : e;
  }
  cancel() {
    this.activeVisit && this.cancelVisit(this.activeVisit, { cancelled: true });
  }
  visit(e, { method: i = "get", data: n = {}, replace: s = false, preserveScroll: l = false, preserveState: h = false, only: g = [], except: f = [], headers: c = {}, errorBag: o = "", forceFormData: v = false, onCancelToken: T = () => {
  }, onBefore: d = () => {
  }, onStart: p = () => {
  }, onProgress: P = () => {
  }, onFinish: y = () => {
  }, onCancel: ie = () => {
  }, onSuccess: D2 = () => {
  }, onError: U = () => {
  }, queryStringArrayFormat: F2 = "brackets" } = {}) {
    let S = typeof e == "string" ? b(e) : e;
    if ((I(n) || v) && !(n instanceof FormData) && (n = A(n)), !(n instanceof FormData)) {
      let [r, a] = k(i, S, n, F2);
      S = b(r), n = a;
    }
    let R = { url: S, method: i, data: n, replace: s, preserveScroll: l, preserveState: h, only: g, except: f, headers: c, errorBag: o, forceFormData: v, queryStringArrayFormat: F2, cancelled: false, completed: false, interrupted: false };
    if (d(R) === false || !M(R)) return;
    this.activeVisit && this.cancelVisit(this.activeVisit, { interrupted: true }), this.saveScrollPositions();
    let G2 = this.createVisitId();
    this.activeVisit = { ...R, onCancelToken: T, onBefore: d, onStart: p, onProgress: P, onFinish: y, onCancel: ie, onSuccess: D2, onError: U, queryStringArrayFormat: F2, cancelToken: new AbortController() }, T({ cancel: () => {
      this.activeVisit && this.cancelVisit(this.activeVisit, { cancelled: true });
    } }), X(R), p(R);
    let j2 = !!(g.length || f.length);
    axios_default({ method: i, url: w(S).href, data: i === "get" ? {} : n, params: i === "get" ? n : {}, signal: this.activeVisit.cancelToken.signal, headers: { ...c, Accept: "text/html, application/xhtml+xml", "X-Requested-With": "XMLHttpRequest", "X-Inertia": true, ...j2 ? { "X-Inertia-Partial-Component": this.page.component } : {}, ...g.length ? { "X-Inertia-Partial-Data": g.join(",") } : {}, ...f.length ? { "X-Inertia-Partial-Except": f.join(",") } : {}, ...o && o.length ? { "X-Inertia-Error-Bag": o } : {}, ...this.page.version ? { "X-Inertia-Version": this.page.version } : {} }, onUploadProgress: (r) => {
      n instanceof FormData && (r.percentage = r.progress ? Math.round(r.progress * 100) : 0, W(r), P(r));
    } }).then((r) => {
      var _a;
      if (!this.isInertiaResponse(r)) return Promise.reject({ response: r });
      let a = r.data;
      j2 && a.component === this.page.component && (a.props = { ...this.page.props, ...a.props }), l = this.resolvePreserveOption(l, a), h = this.resolvePreserveOption(h, a), h && ((_a = window.history.state) == null ? void 0 : _a.rememberedState) && a.component === this.page.component && (a.rememberedState = window.history.state.rememberedState);
      let E2 = S, V2 = b(a.url);
      return E2.hash && !V2.hash && w(E2).href === V2.href && (V2.hash = E2.hash, a.url = V2.href), this.setPage(a, { visitId: G2, replace: s, preserveScroll: l, preserveState: h });
    }).then(() => {
      let r = this.page.props.errors || {};
      if (Object.keys(r).length > 0) {
        let a = o ? r[o] ? r[o] : {} : r;
        return H(a), U(a);
      }
      return K(this.page), D2(this.page);
    }).catch((r) => {
      if (this.isInertiaResponse(r.response)) return this.setPage(r.response.data, { visitId: G2 });
      if (this.isLocationVisitResponse(r.response)) {
        let a = b(r.response.headers["x-inertia-location"]), E2 = S;
        E2.hash && !a.hash && w(E2).href === a.href && (a.hash = E2.hash), this.locationVisit(a, l === true);
      } else if (r.response) q(r.response) && B.show(r.response.data);
      else return Promise.reject(r);
    }).then(() => {
      this.activeVisit && this.finishVisit(this.activeVisit);
    }).catch((r) => {
      if (!axios_default.isCancel(r)) {
        let a = $(r);
        if (this.activeVisit && this.finishVisit(this.activeVisit), a) return Promise.reject(r);
      }
    });
  }
  setPage(e, { visitId: i = this.createVisitId(), replace: n = false, preserveScroll: s = false, preserveState: l = false } = {}) {
    return Promise.resolve(this.resolveComponent(e.component)).then((h) => {
      i === this.visitId && (e.scrollRegions = e.scrollRegions || [], e.rememberedState = e.rememberedState || {}, n = n || b(e.url).href === window.location.href, n ? this.replaceState(e) : this.pushState(e), this.swapComponent({ component: h, page: e, preserveState: l }).then(() => {
        s || this.resetScrollPositions(), n || x(e);
      }));
    });
  }
  pushState(e) {
    this.page = e, window.history.pushState(e, "", e.url);
  }
  replaceState(e) {
    this.page = e, window.history.replaceState(e, "", e.url);
  }
  handlePopstateEvent(e) {
    if (e.state !== null) {
      let i = e.state, n = this.createVisitId();
      Promise.resolve(this.resolveComponent(i.component)).then((s) => {
        n === this.visitId && (this.page = i, this.swapComponent({ component: s, page: i, preserveState: false }).then(() => {
          this.restoreScrollPositions(), x(i);
        }));
      });
    } else {
      let i = b(this.page.url);
      i.hash = window.location.hash, this.replaceState({ ...this.page, url: i.href }), this.resetScrollPositions();
    }
  }
  get(e, i = {}, n = {}) {
    return this.visit(e, { ...n, method: "get", data: i });
  }
  reload(e = {}) {
    return this.visit(window.location.href, { ...e, preserveScroll: true, preserveState: true });
  }
  replace(e, i = {}) {
    return console.warn(`Inertia.replace() has been deprecated and will be removed in a future release. Please use Inertia.${i.method ?? "get"}() instead.`), this.visit(e, { preserveState: true, ...i, replace: true });
  }
  post(e, i = {}, n = {}) {
    return this.visit(e, { preserveState: true, ...n, method: "post", data: i });
  }
  put(e, i = {}, n = {}) {
    return this.visit(e, { preserveState: true, ...n, method: "put", data: i });
  }
  patch(e, i = {}, n = {}) {
    return this.visit(e, { preserveState: true, ...n, method: "patch", data: i });
  }
  delete(e, i = {}) {
    return this.visit(e, { preserveState: true, ...i, method: "delete" });
  }
  remember(e, i = "default") {
    var _a;
    Q || this.replaceState({ ...this.page, rememberedState: { ...(_a = this.page) == null ? void 0 : _a.rememberedState, [i]: e } });
  }
  restore(e = "default") {
    var _a, _b;
    if (!Q) return (_b = (_a = window.history.state) == null ? void 0 : _a.rememberedState) == null ? void 0 : _b[e];
  }
  on(e, i) {
    let n = (s) => {
      let l = i(s);
      s.cancelable && !s.defaultPrevented && l === false && s.preventDefault();
    };
    return document.addEventListener(`inertia:${e}`, n), () => document.removeEventListener(`inertia:${e}`, n);
  }
};
var re = { buildDOMElement(t) {
  let e = document.createElement("template");
  e.innerHTML = t;
  let i = e.content.firstChild;
  if (!t.startsWith("<script ")) return i;
  let n = document.createElement("script");
  return n.innerHTML = i.innerHTML, i.getAttributeNames().forEach((s) => {
    n.setAttribute(s, i.getAttribute(s) || "");
  }), n;
}, isInertiaManagedElement(t) {
  return t.nodeType === Node.ELEMENT_NODE && t.getAttribute("inertia") !== null;
}, findMatchingElementIndex(t, e) {
  let i = t.getAttribute("inertia");
  return i !== null ? e.findIndex((n) => n.getAttribute("inertia") === i) : -1;
}, update: L(function(t) {
  let e = t.map((n) => this.buildDOMElement(n));
  Array.from(document.head.childNodes).filter((n) => this.isInertiaManagedElement(n)).forEach((n) => {
    var _a, _b;
    let s = this.findMatchingElementIndex(n, e);
    if (s === -1) {
      (_a = n == null ? void 0 : n.parentNode) == null ? void 0 : _a.removeChild(n);
      return;
    }
    let l = e.splice(s, 1)[0];
    l && !n.isEqualNode(l) && ((_b = n == null ? void 0 : n.parentNode) == null ? void 0 : _b.replaceChild(l, n));
  }), e.forEach((n) => document.head.appendChild(n));
}, 1) };
function Y(t, e, i) {
  let n = {}, s = 0;
  function l() {
    let o = s += 1;
    return n[o] = [], o.toString();
  }
  function h(o) {
    o === null || Object.keys(n).indexOf(o) === -1 || (delete n[o], c());
  }
  function g(o, v = []) {
    o !== null && Object.keys(n).indexOf(o) > -1 && (n[o] = v), c();
  }
  function f() {
    let o = e(""), v = { ...o ? { title: `<title inertia="">${o}</title>` } : {} }, T = Object.values(n).reduce((d, p) => d.concat(p), []).reduce((d, p) => {
      if (p.indexOf("<") === -1) return d;
      if (p.indexOf("<title ") === 0) {
        let y = p.match(/(<title [^>]+>)(.*?)(<\/title>)/);
        return d.title = y ? `${y[1]}${e(y[2])}${y[3]}` : p, d;
      }
      let P = p.match(/ inertia="[^"]+"/);
      return P ? d[P[0]] = p : d[Object.keys(d).length] = p, d;
    }, v);
    return Object.values(T);
  }
  function c() {
    t ? i(f()) : re.update(f());
  }
  return c(), { forceUpdate: c, createProvider: function() {
    let o = l();
    return { update: (v) => g(o, v), disconnect: () => h(o) };
  } };
}
var Z = null;
function oe(t) {
  document.addEventListener("inertia:start", se.bind(null, t)), document.addEventListener("inertia:progress", ae), document.addEventListener("inertia:finish", le);
}
function se(t) {
  Z = setTimeout(() => import_nprogress.default.start(), t);
}
function ae(t) {
  var _a;
  import_nprogress.default.isStarted() && ((_a = t.detail.progress) == null ? void 0 : _a.percentage) && import_nprogress.default.set(Math.max(import_nprogress.default.status, t.detail.progress.percentage / 100 * 0.9));
}
function le(t) {
  if (clearTimeout(Z), import_nprogress.default.isStarted()) t.detail.visit.completed ? import_nprogress.default.done() : t.detail.visit.interrupted ? import_nprogress.default.set(0) : t.detail.visit.cancelled && (import_nprogress.default.done(), import_nprogress.default.remove());
  else return;
}
function ce(t) {
  let e = document.createElement("style");
  e.type = "text/css", e.textContent = `
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${t};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${t}, 0 0 5px ${t};
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }

    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${t};
      border-left-color: ${t};
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, document.head.appendChild(e);
}
function ee({ delay: t = 250, color: e = "#29d", includeCSS: i = true, showSpinner: n = false } = {}) {
  oe(t), import_nprogress.default.configure({ showSpinner: n }), i && ce(e);
}
function te(t) {
  let e = t.currentTarget.tagName.toLowerCase() === "a";
  return !(t.target && (t == null ? void 0 : t.target).isContentEditable || t.defaultPrevented || e && t.which > 1 || e && t.altKey || e && t.ctrlKey || e && t.metaKey || e && t.shiftKey);
}
var Fe = new C();

// node_modules/@inertiajs/react/dist/index.esm.js
var import_react = __toESM(require_react());
var import_react2 = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_react4 = __toESM(require_react());
var import_react5 = __toESM(require_react());
var import_react6 = __toESM(require_react());
var import_lodash = __toESM(require_lodash());
var import_react7 = __toESM(require_react());
var import_react8 = __toESM(require_react());
var import_react9 = __toESM(require_react());
var B2 = (0, import_react2.createContext)(void 0);
B2.displayName = "InertiaHeadContext";
var A2 = B2;
var X2 = function({ children: d, title: c }) {
  let s = (0, import_react.useContext)(A2), p = (0, import_react.useMemo)(() => s.createProvider(), [s]);
  (0, import_react.useEffect)(() => () => {
    p.disconnect();
  }, [p]);
  function a(e) {
    return ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].indexOf(e.type) > -1;
  }
  function S(e) {
    let i = Object.keys(e.props).reduce((o, y) => {
      if (["head-key", "children", "dangerouslySetInnerHTML"].includes(y)) return o;
      let T = e.props[y];
      return T === "" ? o + ` ${y}` : o + ` ${y}="${T}"`;
    }, "");
    return `<${e.type}${i}>`;
  }
  function f(e) {
    return typeof e.props.children == "string" ? e.props.children : e.props.children.reduce((i, o) => i + P(o), "");
  }
  function P(e) {
    let i = S(e);
    return e.props.children && (i += f(e)), e.props.dangerouslySetInnerHTML && (i += e.props.dangerouslySetInnerHTML.__html), a(e) || (i += `</${e.type}>`), i;
  }
  function u2(e) {
    return import_react.default.cloneElement(e, { inertia: e.props["head-key"] !== void 0 ? e.props["head-key"] : "" });
  }
  function g(e) {
    return P(u2(e));
  }
  function l(e) {
    let i = import_react.default.Children.toArray(e).filter((o) => o).map((o) => g(o));
    return c && !i.find((o) => o.startsWith("<title")) && i.push(`<title inertia>${c}</title>`), i;
  }
  return p.update(l(d)), null;
};
var Y2 = X2;
var F = () => {
};
var $2 = (0, import_react3.forwardRef)(({ children: d, as: c = "a", data: s = {}, href: p, method: a = "get", preserveScroll: S = false, preserveState: f = null, replace: P = false, only: u2 = [], except: g = [], headers: l = {}, queryStringArrayFormat: e = "brackets", onClick: i = F, onCancelToken: o = F, onBefore: y = F, onStart: T = F, onProgress: H2 = F, onFinish: h = F, onCancel: M2 = F, onSuccess: x2 = F, onError: w2 = F, ...R }, I2) => {
  let v = (0, import_react3.useCallback)((r) => {
    i(r), te(r) && (r.preventDefault(), Fe.visit(p, { data: s, method: a, preserveScroll: S, preserveState: f ?? a !== "get", replace: P, only: u2, except: g, headers: l, onCancelToken: o, onBefore: y, onStart: T, onProgress: H2, onFinish: h, onCancel: M2, onSuccess: x2, onError: w2 }));
  }, [s, p, a, S, f, P, u2, g, l, i, o, y, T, H2, h, M2, x2, w2]);
  c = c.toLowerCase(), a = a.toLowerCase();
  let [t, n] = k(a, p || "", s, e);
  return p = t, s = n, c === "a" && a !== "get" && console.warn(`Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.

Please specify a more appropriate element using the "as" attribute. For example:

<Link href="${p}" method="${a}" as="button">...</Link>`), (0, import_react3.createElement)(c, { ...R, ...c === "a" ? { href: p } : {}, ref: I2, onClick: v }, d);
});
$2.displayName = "InertiaLink";
var ae2 = $2;
var j = (0, import_react6.createContext)(void 0);
j.displayName = "InertiaPageContext";
var E = j;
function O2({ children: d, initialPage: c, initialComponent: s, resolveComponent: p, titleCallback: a, onHeadUpdate: S }) {
  let [f, P] = (0, import_react5.useState)({ component: s || null, page: c, key: null }), u2 = (0, import_react5.useMemo)(() => Y(typeof window > "u", a || ((l) => l), S || (() => {
  })), []);
  if ((0, import_react5.useEffect)(() => {
    Fe.init({ initialPage: c, resolveComponent: p, swapComponent: async ({ component: l, page: e, preserveState: i }) => {
      P((o) => ({ component: l, page: e, key: i ? o.key : Date.now() }));
    } }), Fe.on("navigate", () => u2.forceUpdate());
  }, []), !f.component) return (0, import_react5.createElement)(A2.Provider, { value: u2 }, (0, import_react5.createElement)(E.Provider, { value: f.page }, null));
  let g = d || (({ Component: l, props: e, key: i }) => {
    let o = (0, import_react5.createElement)(l, { key: i, ...e });
    return typeof l.layout == "function" ? l.layout(o) : Array.isArray(l.layout) ? l.layout.concat(o).reverse().reduce((y, T) => (0, import_react5.createElement)(T, { children: y, ...e })) : o;
  });
  return (0, import_react5.createElement)(A2.Provider, { value: u2 }, (0, import_react5.createElement)(E.Provider, { value: f.page }, g({ Component: f.component, key: f.key, props: f.page.props })));
}
O2.displayName = "Inertia";
async function V({ id: d = "app", resolve: c, setup: s, title: p, progress: a = {}, page: S, render: f }) {
  let P = typeof window > "u", u2 = P ? null : document.getElementById(d), g = S || JSON.parse(u2.dataset.page), l = (o) => Promise.resolve(c(o)).then((y) => y.default || y), e = [], i = await l(g.component).then((o) => s({ el: u2, App: O2, props: { initialPage: g, initialComponent: o, resolveComponent: l, titleCallback: p, onHeadUpdate: P ? (y) => e = y : null } }));
  if (!P && a && ee(a), P) {
    let o = await f((0, import_react4.createElement)("div", { id: d, "data-page": JSON.stringify(g) }, i));
    return { head: e, body: o };
  }
}
function D(d, c) {
  let [s, p] = (0, import_react8.useState)(() => {
    let a = Fe.restore(c);
    return a !== void 0 ? a : d;
  });
  return (0, import_react8.useEffect)(() => {
    Fe.remember(s, c);
  }, [s, c]), [s, p];
}
function W2(d, c) {
  let s = (0, import_react7.useRef)(null), p = typeof d == "string" ? d : null, [a, S] = (0, import_react7.useState)((typeof d == "string" ? c : d) || {}), f = (0, import_react7.useRef)(null), P = (0, import_react7.useRef)(null), [u2, g] = p ? D(a, `${p}:data`) : (0, import_react7.useState)(a), [l, e] = p ? D({}, `${p}:errors`) : (0, import_react7.useState)({}), [i, o] = (0, import_react7.useState)(false), [y, T] = (0, import_react7.useState)(false), [H2, h] = (0, import_react7.useState)(null), [M2, x2] = (0, import_react7.useState)(false), [w2, R] = (0, import_react7.useState)(false), I2 = (t) => t;
  (0, import_react7.useEffect)(() => (s.current = true, () => {
    s.current = false;
  }), []);
  let v = (0, import_react7.useCallback)((t, n, r = {}) => {
    let k2 = { ...r, onCancelToken: (m2) => {
      if (f.current = m2, r.onCancelToken) return r.onCancelToken(m2);
    }, onBefore: (m2) => {
      if (x2(false), R(false), clearTimeout(P.current), r.onBefore) return r.onBefore(m2);
    }, onStart: (m2) => {
      if (T(true), r.onStart) return r.onStart(m2);
    }, onProgress: (m2) => {
      if (h(m2), r.onProgress) return r.onProgress(m2);
    }, onSuccess: (m2) => {
      if (s.current && (T(false), h(null), e({}), o(false), x2(true), R(true), P.current = setTimeout(() => {
        s.current && R(false);
      }, 2e3)), r.onSuccess) return r.onSuccess(m2);
    }, onError: (m2) => {
      if (s.current && (T(false), h(null), e(m2), o(true)), r.onError) return r.onError(m2);
    }, onCancel: () => {
      if (s.current && (T(false), h(null)), r.onCancel) return r.onCancel();
    }, onFinish: () => {
      if (s.current && (T(false), h(null)), f.current = null, r.onFinish) return r.onFinish();
    } };
    t === "delete" ? Fe.delete(n, { ...k2, data: I2(u2) }) : Fe[t](n, I2(u2), k2);
  }, [u2, e]);
  return { data: u2, setData(t, n) {
    g(typeof t == "string" ? { ...u2, [t]: n } : typeof t == "function" ? (r) => t(r) : t);
  }, isDirty: !(0, import_lodash.default)(u2, a), errors: l, hasErrors: i, processing: y, progress: H2, wasSuccessful: M2, recentlySuccessful: w2, transform(t) {
    I2 = t;
  }, setDefaults(t, n) {
    S(typeof t > "u" ? () => u2 : (r) => ({ ...r, ...typeof t == "string" ? { [t]: n } : t }));
  }, reset(...t) {
    t.length === 0 ? g(a) : g(Object.keys(a).filter((n) => t.includes(n)).reduce((n, r) => (n[r] = a[r], n), { ...u2 }));
  }, setError(t, n) {
    e((r) => {
      let k2 = { ...r, ...typeof t == "string" ? { [t]: n } : t };
      return o(Object.keys(k2).length > 0), k2;
    });
  }, clearErrors(...t) {
    e((n) => {
      let r = Object.keys(n).reduce((k2, m2) => ({ ...k2, ...t.length > 0 && !t.includes(m2) ? { [m2]: n[m2] } : {} }), {});
      return o(Object.keys(r).length > 0), r;
    });
  }, submit: v, get(t, n) {
    v("get", t, n);
  }, post(t, n) {
    v("post", t, n);
  }, put(t, n) {
    v("put", t, n);
  }, patch(t, n) {
    v("patch", t, n);
  }, delete(t, n) {
    v("delete", t, n);
  }, cancel() {
    f.current && f.current.cancel();
  } };
}
function q2() {
  let d = (0, import_react9.useContext)(E);
  if (!d) throw new Error("usePage must be used within the Inertia component");
  return d;
}
var yt = Fe;
export {
  Y2 as Head,
  ae2 as Link,
  V as createInertiaApp,
  yt as router,
  W2 as useForm,
  q2 as usePage,
  D as useRemember
};
/*! Bundled license information:

nprogress/nprogress.js:
  (* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
   * @license MIT *)
*/
//# sourceMappingURL=@inertiajs_react.js.map
