/* Minification failed. Returning unminified contents.
(718,145-152): run-time error JS1019: Can't have 'break' outside of loop: break a
(718,97-104): run-time error JS1019: Can't have 'break' outside of loop: break a
 */
/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (T, P, u) {
    'use strict'; function O(a) { return function () { var b = arguments[0], d; d = "[" + (a ? a + ":" : "") + b + "] http://errors.angularjs.org/1.5.3/" + (a ? a + "/" : "") + b; for (b = 1; b < arguments.length; b++) { d = d + (1 == b ? "?" : "&") + "p" + (b - 1) + "="; var c = encodeURIComponent, e; e = arguments[b]; e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e; d += c(e) } return Error(d) } } function za(a) {
        if (null == a || Ya(a)) return !1; if (M(a) || y(a) || H && a instanceof H) return !0;
        var b = "length" in Object(a) && a.length; return R(b) && (0 <= b && (b - 1 in a || a instanceof Array) || "function" == typeof a.item)
    } function q(a, b, d) {
        var c, e; if (a) if (D(a)) for (c in a) "prototype" == c || "length" == c || "name" == c || a.hasOwnProperty && !a.hasOwnProperty(c) || b.call(d, a[c], c, a); else if (M(a) || za(a)) { var f = "object" !== typeof a; c = 0; for (e = a.length; c < e; c++) (f || c in a) && b.call(d, a[c], c, a) } else if (a.forEach && a.forEach !== q) a.forEach(b, d, a); else if (oc(a)) for (c in a) b.call(d, a[c], c, a); else if ("function" === typeof a.hasOwnProperty) for (c in a) a.hasOwnProperty(c) &&
        b.call(d, a[c], c, a); else for (c in a) va.call(a, c) && b.call(d, a[c], c, a); return a
    } function pc(a, b, d) { for (var c = Object.keys(a).sort(), e = 0; e < c.length; e++) b.call(d, a[c[e]], c[e]); return c } function qc(a) { return function (b, d) { a(d, b) } } function Wd() { return ++qb } function Ob(a, b, d) {
        for (var c = a.$$hashKey, e = 0, f = b.length; e < f; ++e) {
            var g = b[e]; if (J(g) || D(g)) for (var h = Object.keys(g), k = 0, l = h.length; k < l; k++) {
                var m = h[k], n = g[m]; d && J(n) ? fa(n) ? a[m] = new Date(n.valueOf()) : Za(n) ? a[m] = new RegExp(n) : n.nodeName ? a[m] = n.cloneNode(!0) :
                Pb(n) ? a[m] = n.clone() : (J(a[m]) || (a[m] = M(n) ? [] : {}), Ob(a[m], [n], !0)) : a[m] = n
            }
        } c ? a.$$hashKey = c : delete a.$$hashKey; return a
    } function S(a) { return Ob(a, Aa.call(arguments, 1), !1) } function Xd(a) { return Ob(a, Aa.call(arguments, 1), !0) } function Y(a) { return parseInt(a, 10) } function Qb(a, b) { return S(Object.create(a), b) } function E() { } function $a(a) { return a } function da(a) { return function () { return a } } function rc(a) { return D(a.toString) && a.toString !== ka } function z(a) { return "undefined" === typeof a } function A(a) {
        return "undefined" !==
        typeof a
    } function J(a) { return null !== a && "object" === typeof a } function oc(a) { return null !== a && "object" === typeof a && !sc(a) } function y(a) { return "string" === typeof a } function R(a) { return "number" === typeof a } function fa(a) { return "[object Date]" === ka.call(a) } function D(a) { return "function" === typeof a } function Za(a) { return "[object RegExp]" === ka.call(a) } function Ya(a) { return a && a.window === a } function ab(a) { return a && a.$evalAsync && a.$watch } function Oa(a) { return "boolean" === typeof a } function Yd(a) {
        return a && R(a.length) &&
        Zd.test(ka.call(a))
    } function Pb(a) { return !(!a || !(a.nodeName || a.prop && a.attr && a.find)) } function $d(a) { var b = {}; a = a.split(","); var d; for (d = 0; d < a.length; d++) b[a[d]] = !0; return b } function oa(a) { return N(a.nodeName || a[0] && a[0].nodeName) } function bb(a, b) { var d = a.indexOf(b); 0 <= d && a.splice(d, 1); return d } function pa(a, b) {
        function d(a, b) {
            var d = b.$$hashKey, e; if (M(a)) { e = 0; for (var f = a.length; e < f; e++) b.push(c(a[e])) } else if (oc(a)) for (e in a) b[e] = c(a[e]); else if (a && "function" === typeof a.hasOwnProperty) for (e in a) a.hasOwnProperty(e) &&
            (b[e] = c(a[e])); else for (e in a) va.call(a, e) && (b[e] = c(a[e])); d ? b.$$hashKey = d : delete b.$$hashKey; return b
        } function c(a) { if (!J(a)) return a; var b = f.indexOf(a); if (-1 !== b) return g[b]; if (Ya(a) || ab(a)) throw Ba("cpws"); var b = !1, c = e(a); c === u && (c = M(a) ? [] : Object.create(sc(a)), b = !0); f.push(a); g.push(c); return b ? d(a, c) : c } function e(a) {
            switch (ka.call(a)) {
                case "[object Int8Array]": case "[object Int16Array]": case "[object Int32Array]": case "[object Float32Array]": case "[object Float64Array]": case "[object Uint8Array]": case "[object Uint8ClampedArray]": case "[object Uint16Array]": case "[object Uint32Array]": return new a.constructor(c(a.buffer));
                case "[object ArrayBuffer]": if (!a.slice) { var b = new ArrayBuffer(a.byteLength); (new Uint8Array(b)).set(new Uint8Array(a)); return b } return a.slice(0); case "[object Boolean]": case "[object Number]": case "[object String]": case "[object Date]": return new a.constructor(a.valueOf()); case "[object RegExp]": return b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex, b; case "[object Blob]": return new a.constructor([a], { type: a.type })
            } if (D(a.cloneNode)) return a.cloneNode(!0)
        } var f = [],
        g = []; if (b) { if (Yd(b) || "[object ArrayBuffer]" === ka.call(b)) throw Ba("cpta"); if (a === b) throw Ba("cpi"); M(b) ? b.length = 0 : q(b, function (a, c) { "$$hashKey" !== c && delete b[c] }); f.push(a); g.push(b); return d(a, b) } return c(a)
    } function ia(a, b) { if (M(a)) { b = b || []; for (var d = 0, c = a.length; d < c; d++) b[d] = a[d] } else if (J(a)) for (d in b = b || {}, a) if ("$" !== d.charAt(0) || "$" !== d.charAt(1)) b[d] = a[d]; return b || a } function na(a, b) {
        if (a === b) return !0; if (null === a || null === b) return !1; if (a !== a && b !== b) return !0; var d = typeof a, c; if (d == typeof b &&
        "object" == d) if (M(a)) { if (!M(b)) return !1; if ((d = a.length) == b.length) { for (c = 0; c < d; c++) if (!na(a[c], b[c])) return !1; return !0 } } else { if (fa(a)) return fa(b) ? na(a.getTime(), b.getTime()) : !1; if (Za(a)) return Za(b) ? a.toString() == b.toString() : !1; if (ab(a) || ab(b) || Ya(a) || Ya(b) || M(b) || fa(b) || Za(b)) return !1; d = V(); for (c in a) if ("$" !== c.charAt(0) && !D(a[c])) { if (!na(a[c], b[c])) return !1; d[c] = !0 } for (c in b) if (!(c in d) && "$" !== c.charAt(0) && A(b[c]) && !D(b[c])) return !1; return !0 } return !1
    } function cb(a, b, d) {
        return a.concat(Aa.call(b,
        d))
    } function tc(a, b) { var d = 2 < arguments.length ? Aa.call(arguments, 2) : []; return !D(b) || b instanceof RegExp ? b : d.length ? function () { return arguments.length ? b.apply(a, cb(d, arguments, 0)) : b.apply(a, d) } : function () { return arguments.length ? b.apply(a, arguments) : b.call(a) } } function ae(a, b) { var d = b; "string" === typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? d = u : Ya(b) ? d = "$WINDOW" : b && P === b ? d = "$DOCUMENT" : ab(b) && (d = "$SCOPE"); return d } function db(a, b) { if (z(a)) return u; R(b) || (b = b ? 2 : null); return JSON.stringify(a, ae, b) } function uc(a) {
        return y(a) ?
        JSON.parse(a) : a
    } function vc(a, b) { a = a.replace(be, ""); var d = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6E4; return isNaN(d) ? b : d } function Rb(a, b, d) { d = d ? -1 : 1; var c = a.getTimezoneOffset(); b = vc(b, c); d *= b - c; a = new Date(a.getTime()); a.setMinutes(a.getMinutes() + d); return a } function wa(a) { a = H(a).clone(); try { a.empty() } catch (b) { } var d = H("<div>").append(a).html(); try { return a[0].nodeType === Pa ? N(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) { return "<" + N(b) }) } catch (c) { return N(d) } } function wc(a) { try { return decodeURIComponent(a) } catch (b) { } }
    function xc(a) { var b = {}; q((a || "").split("&"), function (a) { var c, e, f; a && (e = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (e = a.substring(0, c), f = a.substring(c + 1)), e = wc(e), A(e) && (f = A(f) ? wc(f) : !0, va.call(b, e) ? M(b[e]) ? b[e].push(f) : b[e] = [b[e], f] : b[e] = f)) }); return b } function Sb(a) { var b = []; q(a, function (a, c) { M(a) ? q(a, function (a) { b.push(ja(c, !0) + (!0 === a ? "" : "=" + ja(a, !0))) }) : b.push(ja(c, !0) + (!0 === a ? "" : "=" + ja(a, !0))) }); return b.length ? b.join("&") : "" } function rb(a) {
        return ja(a, !0).replace(/%26/gi, "&").replace(/%3D/gi,
        "=").replace(/%2B/gi, "+")
    } function ja(a, b) { return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+") } function ce(a, b) { var d, c, e = Qa.length; for (c = 0; c < e; ++c) if (d = Qa[c] + b, y(d = a.getAttribute(d))) return d; return null } function de(a, b) {
        var d, c, e = {}; q(Qa, function (b) { b += "app"; !d && a.hasAttribute && a.hasAttribute(b) && (d = a, c = a.getAttribute(b)) }); q(Qa, function (b) {
            b += "app"; var e; !d && (e = a.querySelector("[" + b.replace(":",
            "\\:") + "]")) && (d = e, c = e.getAttribute(b))
        }); d && (e.strictDi = null !== ce(d, "strict-di"), b(d, c ? [c] : [], e))
    } function yc(a, b, d) {
        J(d) || (d = {}); d = S({ strictDi: !1 }, d); var c = function () {
            a = H(a); if (a.injector()) { var c = a[0] === P ? "document" : wa(a); throw Ba("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;")); } b = b || []; b.unshift(["$provide", function (b) { b.value("$rootElement", a) }]); d.debugInfoEnabled && b.push(["$compileProvider", function (a) { a.debugInfoEnabled(!0) }]); b.unshift("ng"); c = eb(b, d.strictDi); c.invoke(["$rootScope",
            "$rootElement", "$compile", "$injector", function (a, b, c, d) { a.$apply(function () { b.data("$injector", d); c(b)(a) }) }]); return c
        }, e = /^NG_ENABLE_DEBUG_INFO!/, f = /^NG_DEFER_BOOTSTRAP!/; T && e.test(T.name) && (d.debugInfoEnabled = !0, T.name = T.name.replace(e, "")); if (T && !f.test(T.name)) return c(); T.name = T.name.replace(f, ""); ea.resumeBootstrap = function (a) { q(a, function (a) { b.push(a) }); return c() }; D(ea.resumeDeferredBootstrap) && ea.resumeDeferredBootstrap()
    } function ee() { T.name = "NG_ENABLE_DEBUG_INFO!" + T.name; T.location.reload() }
    function fe(a) { a = ea.element(a).injector(); if (!a) throw Ba("test"); return a.get("$$testability") } function zc(a, b) { b = b || "_"; return a.replace(ge, function (a, c) { return (c ? b : "") + a.toLowerCase() }) } function he() {
        var a; if (!Ac) {
            var b = sb(); ($ = z(b) ? T.jQuery : b ? T[b] : u) && $.fn.on ? (H = $, S($.fn, { scope: Ra.scope, isolateScope: Ra.isolateScope, controller: Ra.controller, injector: Ra.injector, inheritedData: Ra.inheritedData }), a = $.cleanData, $.cleanData = function (b) {
                for (var c, e = 0, f; null != (f = b[e]) ; e++) (c = $._data(f, "events")) && c.$destroy &&
                $(f).triggerHandler("$destroy"); a(b)
            }) : H = U; ea.element = H; Ac = !0
        }
    } function tb(a, b, d) { if (!a) throw Ba("areq", b || "?", d || "required"); return a } function Sa(a, b, d) { d && M(a) && (a = a[a.length - 1]); tb(D(a), b, "not a function, got " + (a && "object" === typeof a ? a.constructor.name || "Object" : typeof a)); return a } function Ta(a, b) { if ("hasOwnProperty" === a) throw Ba("badname", b); } function Bc(a, b, d) { if (!b) return a; b = b.split("."); for (var c, e = a, f = b.length, g = 0; g < f; g++) c = b[g], a && (a = (e = a)[c]); return !d && D(a) ? tc(e, a) : a } function ub(a) {
        for (var b =
        a[0], d = a[a.length - 1], c, e = 1; b !== d && (b = b.nextSibling) ; e++) if (c || a[e] !== b) c || (c = H(Aa.call(a, 0, e))), c.push(b); return c || a
    } function V() { return Object.create(null) } function ie(a) {
        function b(a, b, c) { return a[b] || (a[b] = c()) } var d = O("$injector"), c = O("ng"); a = b(a, "angular", Object); a.$$minErr = a.$$minErr || O; return b(a, "module", function () {
            var a = {}; return function (f, g, h) {
                if ("hasOwnProperty" === f) throw c("badname", "module"); g && a.hasOwnProperty(f) && (a[f] = null); return b(a, f, function () {
                    function a(b, d, e, f) {
                        f || (f = c); return function () {
                            f[e ||
                            "push"]([b, d, arguments]); return L
                        }
                    } function b(a, d) { return function (b, e) { e && D(e) && (e.$$moduleName = f); c.push([a, d, arguments]); return L } } if (!g) throw d("nomod", f); var c = [], e = [], p = [], F = a("$injector", "invoke", "push", e), L = {
                        _invokeQueue: c, _configBlocks: e, _runBlocks: p, requires: g, name: f, provider: b("$provide", "provider"), factory: b("$provide", "factory"), service: b("$provide", "service"), value: a("$provide", "value"), constant: a("$provide", "constant", "unshift"), decorator: b("$provide", "decorator"), animation: b("$animateProvider",
                        "register"), filter: b("$filterProvider", "register"), controller: b("$controllerProvider", "register"), directive: b("$compileProvider", "directive"), component: b("$compileProvider", "component"), config: F, run: function (a) { p.push(a); return this }
                    }; h && F(h); return L
                })
            }
        })
    } function je(a) {
        S(a, {
            bootstrap: yc, copy: pa, extend: S, merge: Xd, equals: na, element: H, forEach: q, injector: eb, noop: E, bind: tc, toJson: db, fromJson: uc, identity: $a, isUndefined: z, isDefined: A, isString: y, isFunction: D, isObject: J, isNumber: R, isElement: Pb, isArray: M,
            version: ke, isDate: fa, lowercase: N, uppercase: vb, callbacks: { counter: 0 }, getTestability: fe, $$minErr: O, $$csp: Ga, reloadWithDebugInfo: ee
        }); Tb = ie(T); Tb("ng", ["ngLocale"], ["$provide", function (a) {
            a.provider({ $$sanitizeUri: le }); a.provider("$compile", Cc).directive({
                a: me, input: Dc, textarea: Dc, form: ne, script: oe, select: pe, style: qe, option: re, ngBind: se, ngBindHtml: te, ngBindTemplate: ue, ngClass: ve, ngClassEven: we, ngClassOdd: xe, ngCloak: ye, ngController: ze, ngForm: Ae, ngHide: Be, ngIf: Ce, ngInclude: De, ngInit: Ee, ngNonBindable: Fe,
                ngPluralize: Ge, ngRepeat: He, ngShow: Ie, ngStyle: Je, ngSwitch: Ke, ngSwitchWhen: Le, ngSwitchDefault: Me, ngOptions: Ne, ngTransclude: Oe, ngModel: Pe, ngList: Qe, ngChange: Re, pattern: Ec, ngPattern: Ec, required: Fc, ngRequired: Fc, minlength: Gc, ngMinlength: Gc, maxlength: Hc, ngMaxlength: Hc, ngValue: Se, ngModelOptions: Te
            }).directive({ ngInclude: Ue }).directive(wb).directive(Ic); a.provider({
                $anchorScroll: Ve, $animate: We, $animateCss: Xe, $$animateJs: Ye, $$animateQueue: Ze, $$AnimateRunner: $e, $$animateAsyncRun: af, $browser: bf, $cacheFactory: cf,
                $controller: df, $document: ef, $exceptionHandler: ff, $filter: Jc, $$forceReflow: gf, $interpolate: hf, $interval: jf, $http: kf, $httpParamSerializer: lf, $httpParamSerializerJQLike: mf, $httpBackend: nf, $xhrFactory: of, $location: pf, $log: qf, $parse: rf, $rootScope: sf, $q: tf, $$q: uf, $sce: vf, $sceDelegate: wf, $sniffer: xf, $templateCache: yf, $templateRequest: zf, $$testability: Af, $timeout: Bf, $window: Cf, $$rAF: Df, $$jqLite: Ef, $$HashMap: Ff, $$cookieReader: Gf
            })
        }])
    } function fb(a) {
        return a.replace(Hf, function (a, d, c, e) {
            return e ? c.toUpperCase() :
            c
        }).replace(If, "Moz$1")
    } function Kc(a) { a = a.nodeType; return 1 === a || !a || 9 === a } function Lc(a, b) { var d, c, e = b.createDocumentFragment(), f = []; if (Ub.test(a)) { d = d || e.appendChild(b.createElement("div")); c = (Jf.exec(a) || ["", ""])[1].toLowerCase(); c = ha[c] || ha._default; d.innerHTML = c[1] + a.replace(Kf, "<$1></$2>") + c[2]; for (c = c[0]; c--;) d = d.lastChild; f = cb(f, d.childNodes); d = e.firstChild; d.textContent = "" } else f.push(b.createTextNode(a)); e.textContent = ""; e.innerHTML = ""; q(f, function (a) { e.appendChild(a) }); return e } function Mc(a,
    b) { var d = a.parentNode; d && d.replaceChild(b, a); b.appendChild(a) } function U(a) { if (a instanceof U) return a; var b; y(a) && (a = W(a), b = !0); if (!(this instanceof U)) { if (b && "<" != a.charAt(0)) throw Vb("nosel"); return new U(a) } if (b) { b = P; var d; a = (d = Lf.exec(a)) ? [b.createElement(d[1])] : (d = Lc(a, b)) ? d.childNodes : [] } Nc(this, a) } function Wb(a) { return a.cloneNode(!0) } function xb(a, b) { b || gb(a); if (a.querySelectorAll) for (var d = a.querySelectorAll("*"), c = 0, e = d.length; c < e; c++) gb(d[c]) } function Oc(a, b, d, c) {
        if (A(c)) throw Vb("offargs");
        var e = (c = yb(a)) && c.events, f = c && c.handle; if (f) if (b) { var g = function (b) { var c = e[b]; A(d) && bb(c || [], d); A(d) && c && 0 < c.length || (a.removeEventListener(b, f, !1), delete e[b]) }; q(b.split(" "), function (a) { g(a); zb[a] && g(zb[a]) }) } else for (b in e) "$destroy" !== b && a.removeEventListener(b, f, !1), delete e[b]
    } function gb(a, b) { var d = a.ng339, c = d && hb[d]; c && (b ? delete c.data[b] : (c.handle && (c.events.$destroy && c.handle({}, "$destroy"), Oc(a)), delete hb[d], a.ng339 = u)) } function yb(a, b) {
        var d = a.ng339, d = d && hb[d]; b && !d && (a.ng339 = d = ++Mf,
        d = hb[d] = { events: {}, data: {}, handle: u }); return d
    } function Xb(a, b, d) { if (Kc(a)) { var c = A(d), e = !c && b && !J(b), f = !b; a = (a = yb(a, !e)) && a.data; if (c) a[b] = d; else { if (f) return a; if (e) return a && a[b]; S(a, b) } } } function Ab(a, b) { return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1 } function Bb(a, b) { b && a.setAttribute && q(b.split(" "), function (b) { a.setAttribute("class", W((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + W(b) + " ", " "))) }) } function Cb(a,
    b) { if (b && a.setAttribute) { var d = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " "); q(b.split(" "), function (a) { a = W(a); -1 === d.indexOf(" " + a + " ") && (d += a + " ") }); a.setAttribute("class", W(d)) } } function Nc(a, b) { if (b) if (b.nodeType) a[a.length++] = b; else { var d = b.length; if ("number" === typeof d && b.window !== b) { if (d) for (var c = 0; c < d; c++) a[a.length++] = b[c] } else a[a.length++] = b } } function Pc(a, b) { return Db(a, "$" + (b || "ngController") + "Controller") } function Db(a, b, d) {
        9 == a.nodeType && (a = a.documentElement); for (b =
        M(b) ? b : [b]; a;) { for (var c = 0, e = b.length; c < e; c++) if (A(d = H.data(a, b[c]))) return d; a = a.parentNode || 11 === a.nodeType && a.host }
    } function Qc(a) { for (xb(a, !0) ; a.firstChild;) a.removeChild(a.firstChild) } function Yb(a, b) { b || xb(a); var d = a.parentNode; d && d.removeChild(a) } function Nf(a, b) { b = b || T; if ("complete" === b.document.readyState) b.setTimeout(a); else H(b).on("load", a) } function Rc(a, b) { var d = Eb[b.toLowerCase()]; return d && Sc[oa(a)] && d } function Of(a, b) {
        var d = function (c, d) {
            c.isDefaultPrevented = function () { return c.defaultPrevented };
            var f = b[d || c.type], g = f ? f.length : 0; if (g) { if (z(c.immediatePropagationStopped)) { var h = c.stopImmediatePropagation; c.stopImmediatePropagation = function () { c.immediatePropagationStopped = !0; c.stopPropagation && c.stopPropagation(); h && h.call(c) } } c.isImmediatePropagationStopped = function () { return !0 === c.immediatePropagationStopped }; var k = f.specialHandlerWrapper || Pf; 1 < g && (f = ia(f)); for (var l = 0; l < g; l++) c.isImmediatePropagationStopped() || k(a, c, f[l]) }
        }; d.elem = a; return d
    } function Pf(a, b, d) { d.call(a, b) } function Qf(a, b,
    d) { var c = b.relatedTarget; c && (c === a || Rf.call(a, c)) || d.call(a, b) } function Ef() { this.$get = function () { return S(U, { hasClass: function (a, b) { a.attr && (a = a[0]); return Ab(a, b) }, addClass: function (a, b) { a.attr && (a = a[0]); return Cb(a, b) }, removeClass: function (a, b) { a.attr && (a = a[0]); return Bb(a, b) } }) } } function Ha(a, b) { var d = a && a.$$hashKey; if (d) return "function" === typeof d && (d = a.$$hashKey()), d; d = typeof a; return d = "function" == d || "object" == d && null !== a ? a.$$hashKey = d + ":" + (b || Wd)() : d + ":" + a } function Ua(a, b) {
        if (b) {
            var d = 0; this.nextUid =
            function () { return ++d }
        } q(a, this.put, this)
    } function Tc(a) { a = a.toString().replace(Sf, ""); return a.match(Tf) || a.match(Uf) } function Vf(a) { return (a = Tc(a)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn" } function eb(a, b) {
        function d(a) { return function (b, c) { if (J(b)) q(b, qc(a)); else return a(b, c) } } function c(a, b) { Ta(a, "service"); if (D(b) || M(b)) b = p.instantiate(b); if (!b.$get) throw Ia("pget", a); return n[a + "Provider"] = b } function e(a, b) {
            return function () {
                var c = x.invoke(b, this); if (z(c)) throw Ia("undef", a);
                return c
            }
        } function f(a, b, d) { return c(a, { $get: !1 !== d ? e(a, b) : b }) } function g(a) {
            tb(z(a) || M(a), "modulesToLoad", "not an array"); var b = [], c; q(a, function (a) {
                function d(a) { var b, c; b = 0; for (c = a.length; b < c; b++) { var e = a[b], f = p.get(e[0]); f[e[1]].apply(f, e[2]) } } if (!m.get(a)) {
                    m.put(a, !0); try { y(a) ? (c = Tb(a), b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), d(c._configBlocks)) : D(a) ? b.push(p.invoke(a)) : M(a) ? b.push(p.invoke(a)) : Sa(a, "module") } catch (e) {
                        throw M(a) && (a = a[a.length - 1]), e.message && e.stack &&
                        -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), Ia("modulerr", a, e.stack || e.message || e);
                    }
                }
            }); return b
        } function h(a, c) {
            function d(b, e) { if (a.hasOwnProperty(b)) { if (a[b] === k) throw Ia("cdep", b + " <- " + l.join(" <- ")); return a[b] } try { return l.unshift(b), a[b] = k, a[b] = c(b, e) } catch (f) { throw a[b] === k && delete a[b], f; } finally { l.shift() } } function e(a, c, f) {
                var g = []; a = eb.$$annotate(a, b, f); for (var h = 0, k = a.length; h < k; h++) {
                    var l = a[h]; if ("string" !== typeof l) throw Ia("itkn", l); g.push(c && c.hasOwnProperty(l) ? c[l] :
                    d(l, f))
                } return g
            } return {
                invoke: function (a, b, c, d) { "string" === typeof c && (d = c, c = null); c = e(a, c, d); M(a) && (a = a[a.length - 1]); d = 11 >= Da ? !1 : "function" === typeof a && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(a)); return d ? (c.unshift(null), new (Function.prototype.bind.apply(a, c))) : a.apply(b, c) }, instantiate: function (a, b, c) { var d = M(a) ? a[a.length - 1] : a; a = e(a, b, c); a.unshift(null); return new (Function.prototype.bind.apply(d, a)) }, get: d, annotate: eb.$$annotate, has: function (b) {
                    return n.hasOwnProperty(b +
                    "Provider") || a.hasOwnProperty(b)
                }
            }
        } b = !0 === b; var k = {}, l = [], m = new Ua([], !0), n = { $provide: { provider: d(c), factory: d(f), service: d(function (a, b) { return f(a, ["$injector", function (a) { return a.instantiate(b) }]) }), value: d(function (a, b) { return f(a, da(b), !1) }), constant: d(function (a, b) { Ta(a, "constant"); n[a] = b; F[a] = b }), decorator: function (a, b) { var c = p.get(a + "Provider"), d = c.$get; c.$get = function () { var a = x.invoke(d, c); return x.invoke(b, null, { $delegate: a }) } } } }, p = n.$injector = h(n, function (a, b) {
            ea.isString(b) && l.push(b);
            throw Ia("unpr", l.join(" <- "));
        }), F = {}, L = h(F, function (a, b) { var c = p.get(a + "Provider", b); return x.invoke(c.$get, c, u, a) }), x = L; n.$injectorProvider = { $get: da(L) }; var r = g(a), x = L.get("$injector"); x.strictDi = b; q(r, function (a) { a && x.invoke(a) }); return x
    } function Ve() {
        var a = !0; this.disableAutoScrolling = function () { a = !1 }; this.$get = ["$window", "$location", "$rootScope", function (b, d, c) {
            function e(a) { var b = null; Array.prototype.some.call(a, function (a) { if ("a" === oa(a)) return b = a, !0 }); return b } function f(a) {
                if (a) {
                    a.scrollIntoView();
                    var c; c = g.yOffset; D(c) ? c = c() : Pb(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : R(c) || (c = 0); c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c))
                } else b.scrollTo(0, 0)
            } function g(a) { a = y(a) ? a : d.hash(); var b; a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null) } var h = b.document; a && c.$watch(function () { return d.hash() }, function (a, b) { a === b && "" === a || Nf(function () { c.$evalAsync(g) }) }); return g
        }]
    } function ib(a, b) {
        if (!a && !b) return "";
        if (!a) return b; if (!b) return a; M(a) && (a = a.join(" ")); M(b) && (b = b.join(" ")); return a + " " + b
    } function Wf(a) { y(a) && (a = a.split(" ")); var b = V(); q(a, function (a) { a.length && (b[a] = !0) }); return b } function Ja(a) { return J(a) ? a : {} } function Xf(a, b, d, c) {
        function e(a) { try { a.apply(null, Aa.call(arguments, 1)) } finally { if (L--, 0 === L) for (; x.length;) try { x.pop()() } catch (b) { d.error(b) } } } function f() { t = null; g(); h() } function g() { r = G(); r = z(r) ? null : r; na(r, I) && (r = I); I = r } function h() {
            if (v !== k.url() || w !== r) v = k.url(), w = r, q(C, function (a) {
                a(k.url(),
                r)
            })
        } var k = this, l = a.location, m = a.history, n = a.setTimeout, p = a.clearTimeout, F = {}; k.isMock = !1; var L = 0, x = []; k.$$completeOutstandingRequest = e; k.$$incOutstandingRequestCount = function () { L++ }; k.notifyWhenNoOutstandingRequests = function (a) { 0 === L ? a() : x.push(a) }; var r, w, v = l.href, Q = b.find("base"), t = null, G = c.history ? function () { try { return m.state } catch (a) { } } : E; g(); w = r; k.url = function (b, d, e) {
            z(e) && (e = null); l !== a.location && (l = a.location); m !== a.history && (m = a.history); if (b) {
                var f = w === e; if (v === b && (!c.history || f)) return k;
                var h = v && Ka(v) === Ka(b); v = b; w = e; if (!c.history || h && f) { if (!h || t) t = b; d ? l.replace(b) : h ? (d = l, e = b.indexOf("#"), e = -1 === e ? "" : b.substr(e), d.hash = e) : l.href = b; l.href !== b && (t = b) } else m[d ? "replaceState" : "pushState"](e, "", b), g(), w = r; return k
            } return t || l.href.replace(/%27/g, "'")
        }; k.state = function () { return r }; var C = [], K = !1, I = null; k.onUrlChange = function (b) { if (!K) { if (c.history) H(a).on("popstate", f); H(a).on("hashchange", f); K = !0 } C.push(b); return b }; k.$$applicationDestroyed = function () { H(a).off("hashchange popstate", f) };
        k.$$checkUrlChange = h; k.baseHref = function () { var a = Q.attr("href"); return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "" }; k.defer = function (a, b) { var c; L++; c = n(function () { delete F[c]; e(a) }, b || 0); F[c] = !0; return c }; k.defer.cancel = function (a) { return F[a] ? (delete F[a], p(a), e(E), !0) : !1 }
    } function bf() { this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, d, c) { return new Xf(a, c, b, d) }] } function cf() {
        this.$get = function () {
            function a(a, c) {
                function e(a) {
                    a != n && (p ? p == a && (p = a.n) : p = a, f(a.n, a.p), f(a, n), n = a, n.n =
                    null)
                } function f(a, b) { a != b && (a && (a.p = b), b && (b.n = a)) } if (a in b) throw O("$cacheFactory")("iid", a); var g = 0, h = S({}, c, { id: a }), k = V(), l = c && c.capacity || Number.MAX_VALUE, m = V(), n = null, p = null; return b[a] = {
                    put: function (a, b) { if (!z(b)) { if (l < Number.MAX_VALUE) { var c = m[a] || (m[a] = { key: a }); e(c) } a in k || g++; k[a] = b; g > l && this.remove(p.key); return b } }, get: function (a) { if (l < Number.MAX_VALUE) { var b = m[a]; if (!b) return; e(b) } return k[a] }, remove: function (a) {
                        if (l < Number.MAX_VALUE) {
                            var b = m[a]; if (!b) return; b == n && (n = b.p); b == p && (p =
                            b.n); f(b.n, b.p); delete m[a]
                        } a in k && (delete k[a], g--)
                    }, removeAll: function () { k = V(); g = 0; m = V(); n = p = null }, destroy: function () { m = h = k = null; delete b[a] }, info: function () { return S({}, h, { size: g }) }
                }
            } var b = {}; a.info = function () { var a = {}; q(b, function (b, e) { a[e] = b.info() }); return a }; a.get = function (a) { return b[a] }; return a
        }
    } function yf() { this.$get = ["$cacheFactory", function (a) { return a("templates") }] } function Cc(a, b) {
        function d(a, b, c) {
            var d = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/, e = {}; q(a, function (a, f) {
                if (a in m) e[f] =
                m[a]; else { var g = a.match(d); if (!g) throw ga("iscp", b, f, a, c ? "controller bindings definition" : "isolate scope definition"); e[f] = { mode: g[1][0], collection: "*" === g[2], optional: "?" === g[3], attrName: g[4] || f }; g[4] && (m[a] = e[f]) }
            }); return e
        } function c(a) { var b = a.charAt(0); if (!b || b !== N(b)) throw ga("baddir", a); if (a !== a.trim()) throw ga("baddir", a); } var e = {}, f = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, g = /(([\w\-]+)(?:\:([^;]+))?;?)/, h = $d("ngSrc,ngSrcset,src,srcset"), k = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, l = /^(on[a-z]+|formaction)$/,
        m = V(); this.directive = function L(b, d) {
            Ta(b, "directive"); y(b) ? (c(b), tb(d, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + "Directive", ["$injector", "$exceptionHandler", function (a, c) { var d = []; q(e[b], function (e, f) { try { var g = a.invoke(e); D(g) ? g = { compile: da(g) } : !g.compile && g.link && (g.compile = da(g.link)); g.priority = g.priority || 0; g.index = f; g.name = g.name || b; g.require = g.require || g.controller && g.name; g.restrict = g.restrict || "EA"; g.$$moduleName = e.$$moduleName; d.push(g) } catch (h) { c(h) } }); return d }])),
            e[b].push(d)) : q(b, qc(L)); return this
        }; this.component = function (a, b) {
            function c(a) { function e(b) { return D(b) || M(b) ? function (c, d) { return a.invoke(b, this, { $element: c, $attrs: d }) } : b } var f = b.template || b.templateUrl ? b.template : ""; return { controller: d, controllerAs: Uc(b.controller) || b.controllerAs || "$ctrl", template: e(f), templateUrl: e(b.templateUrl), transclude: b.transclude, scope: {}, bindToController: b.bindings || {}, restrict: "E", require: b.require } } var d = b.controller || E; q(b, function (a, b) {
                "$" === b.charAt(0) && (c[b] =
                a, d[b] = a)
            }); c.$inject = ["$injector"]; return this.directive(a, c)
        }; this.aHrefSanitizationWhitelist = function (a) { return A(a) ? (b.aHrefSanitizationWhitelist(a), this) : b.aHrefSanitizationWhitelist() }; this.imgSrcSanitizationWhitelist = function (a) { return A(a) ? (b.imgSrcSanitizationWhitelist(a), this) : b.imgSrcSanitizationWhitelist() }; var n = !0; this.debugInfoEnabled = function (a) { return A(a) ? (n = a, this) : n }; var p = 10; this.onChangesTtl = function (a) { return arguments.length ? (p = a, this) : p }; this.$get = ["$injector", "$interpolate",
        "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function (a, b, c, m, v, Q, t, G, C, K) {
            function I() { try { if (!--pa) throw $ = u, ga("infchng", p); t.$apply(function () { for (var a = 0, b = $.length; a < b; ++a) $[a](); $ = u }) } finally { pa++ } } function qa(a, b) { if (b) { var c = Object.keys(b), d, e, f; d = 0; for (e = c.length; d < e; d++) f = c[d], this[f] = b[f] } else this.$attr = {}; this.$$element = a } function Ca(a, b, c) {
                la.innerHTML = "<span " + b + ">"; b = la.firstChild.attributes; var d = b[0]; b.removeNamedItem(d.name);
                d.value = c; a.attributes.setNamedItem(d)
            } function B(a, b) { try { a.addClass(b) } catch (c) { } } function ba(a, b, c, d, e) {
                a instanceof H || (a = H(a)); for (var f = /\S+/, g = 0, h = a.length; g < h; g++) { var k = a[g]; k.nodeType === Pa && k.nodeValue.match(f) && Mc(k, a[g] = P.createElement("span")) } var l = xa(a, b, a, c, d, e); ba.$$addScopeClass(a); var m = null; return function (b, c, d) {
                    tb(b, "scope"); e && e.needsNewScope && (b = b.$parent.$new()); d = d || {}; var f = d.parentBoundTranscludeFn, g = d.transcludeControllers; d = d.futureParentElement; f && f.$$boundTransclude &&
                    (f = f.$$boundTransclude); m || (m = (d = d && d[0]) ? "foreignobject" !== oa(d) && ka.call(d).match(/SVG/) ? "svg" : "html" : "html"); d = "html" !== m ? H(ca(m, H("<div>").append(a).html())) : c ? Ra.clone.call(a) : a; if (g) for (var h in g) d.data("$" + h + "Controller", g[h].instance); ba.$$addScopeInfo(d, b); c && c(d, b); l && l(b, d, d, f); return d
                }
            } function xa(a, b, c, d, e, f) {
                function g(a, c, d, e) {
                    var f, k, l, m, n, p, G; if (r) for (G = Array(c.length), m = 0; m < h.length; m += 3) f = h[m], G[f] = c[f]; else G = c; m = 0; for (n = h.length; m < n;) k = G[h[m++]], c = h[m++], f = h[m++], c ? (c.scope ?
                    (l = a.$new(), ba.$$addScopeInfo(H(k), l)) : l = a, p = c.transcludeOnThisElement ? s(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? s(a, b) : null, c(f, l, k, d, p)) : f && f(a, k.childNodes, u, e)
                } for (var h = [], k, l, m, n, r, p = 0; p < a.length; p++) {
                    k = new qa; l = A(a[p], [], k, 0 === p ? d : u, e); (f = l.length ? ra(l, a[p], k, b, c, null, [], [], f) : null) && f.scope && ba.$$addScopeClass(k.$$element); k = f && f.terminal || !(m = a[p].childNodes) || !m.length ? null : xa(m, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b); if (f || k) h.push(p, f, k),
                    n = !0, r = r || f; f = null
                } return n ? g : null
            } function s(a, b, c) { function d(e, f, g, h, k) { e || (e = a.$new(!1, k), e.$$transcluded = !0); return b(e, f, { parentBoundTranscludeFn: c, transcludeControllers: g, futureParentElement: h }) } var e = d.$$slots = V(), f; for (f in b.$$slots) e[f] = b.$$slots[f] ? s(a, b.$$slots[f], c) : null; return d } function A(a, b, c, d, e) {
                var h = c.$attr, k; switch (a.nodeType) {
                    case 1: Fa(b, ya(oa(a)), "E", d, e); for (var l, m, n, r = a.attributes, p = 0, G = r && r.length; p < G; p++) {
                        var v = !1, C = !1; l = r[p]; k = l.name; m = W(l.value); l = ya(k); if (n = za.test(l)) k =
                        k.replace(Vc, "").substr(8).replace(/_(.)/g, function (a, b) { return b.toUpperCase() }); (l = l.match(Ba)) && R(l[1]) && (v = k, C = k.substr(0, k.length - 5) + "end", k = k.substr(0, k.length - 6)); l = ya(k.toLowerCase()); h[l] = k; if (n || !c.hasOwnProperty(l)) c[l] = m, Rc(a, l) && (c[l] = !0); fa(a, b, m, l, n); Fa(b, l, "A", d, e, v, C)
                    } a = a.className; J(a) && (a = a.animVal); if (y(a) && "" !== a) for (; k = g.exec(a) ;) l = ya(k[2]), Fa(b, l, "C", d, e) && (c[l] = W(k[3])), a = a.substr(k.index + k[0].length); break; case Pa: if (11 === Da) for (; a.parentNode && a.nextSibling && a.nextSibling.nodeType ===
                    Pa;) a.nodeValue += a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling); Y(b, a.nodeValue); break; case 8: try { if (k = f.exec(a.nodeValue)) l = ya(k[1]), Fa(b, l, "M", d, e) && (c[l] = W(k[2])) } catch (w) { }
                } b.sort(Z); return b
            } function Wc(a, b, c) { var d = [], e = 0; if (b && a.hasAttribute && a.hasAttribute(b)) { do { if (!a) throw ga("uterdir", b, c); 1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--); d.push(a); a = a.nextSibling } while (0 < e) } else d.push(a); return H(d) } function O(a, b, c) {
                return function (d, e, f, g, h) {
                    e = Wc(e[0],
                    b, c); return a(d, e, f, g, h)
                }
            } function Zb(a, b, c, d, e, f) { var g; return a ? ba(b, c, d, e, f) : function () { g || (g = ba(b, c, d, e, f), b = c = f = null); return g.apply(this, arguments) } } function ra(a, b, d, e, f, g, h, k, l) {
                function m(a, b, c, d) { if (a) { c && (a = O(a, c, d)); a.require = B.require; a.directiveName = L; if (C === B || B.$$isolateScope) a = ia(a, { isolateScope: !0 }); h.push(a) } if (b) { c && (b = O(b, c, d)); b.require = B.require; b.directiveName = L; if (C === B || B.$$isolateScope) b = ia(b, { isolateScope: !0 }); k.push(b) } } function n(a, c, e, f, g) {
                    function l(a, b, c, d) {
                        var e;
                        ab(a) || (d = c, c = b, b = a, a = u); Ca && (e = K); c || (c = Ca ? t.parent() : t); if (d) { var f = g.$$slots[d]; if (f) return f(a, b, e, c, s); if (z(f)) throw ga("noslot", d, wa(t)); } else return g(a, b, e, c, s)
                    } var m, r, p, B, I, K, x, t; b === e ? (f = d, t = d.$$element) : (t = H(e), f = new qa(t, d)); I = c; C ? B = c.$new(!0) : G && (I = c.$parent); g && (x = l, x.$$boundTransclude = g, x.isSlotFilled = function (a) { return !!g.$$slots[a] }); v && (K = T(t, f, x, v, B, c, C)); C && (ba.$$addScopeInfo(t, B, !0, !(w && (w === C || w === C.$$originalDirective))), ba.$$addScopeClass(t, !0), B.$$isolateBindings = C.$$isolateBindings,
                    (p = ha(c, f, B, B.$$isolateBindings, C)) && B.$on("$destroy", p)); for (r in K) { p = v[r]; var Va = K[r], Q = p.$$bindings.bindToController; Va.identifier && Q && (m = ha(I, f, Va.instance, Q, p)); var L = Va(); L !== Va.instance && (Va.instance = L, t.data("$" + p.name + "Controller", L), m && m(), m = ha(I, f, Va.instance, Q, p)) } q(v, function (a, b) { var c = a.require; a.bindToController && !M(c) && J(c) && S(K[b].instance, jb(b, c, t, K)) }); q(K, function (a) { var b = a.instance; D(b.$onInit) && b.$onInit(); D(b.$onDestroy) && I.$on("$destroy", function () { b.$onDestroy() }) }); m =
                    0; for (r = h.length; m < r; m++) p = h[m], ja(p, p.isolateScope ? B : c, t, f, p.require && jb(p.directiveName, p.require, t, K), x); var s = c; C && (C.template || null === C.templateUrl) && (s = B); a && a(s, e.childNodes, u, g); for (m = k.length - 1; 0 <= m; m--) p = k[m], ja(p, p.isolateScope ? B : c, t, f, p.require && jb(p.directiveName, p.require, t, K), x); q(K, function (a) { a = a.instance; D(a.$postLink) && a.$postLink() })
                } l = l || {}; for (var p = -Number.MAX_VALUE, G = l.newScopeDirective, v = l.controllerDirectives, C = l.newIsolateScopeDirective, w = l.templateDirective, I = l.nonTlbTranscludeDirective,
                K = !1, x = !1, Ca = l.hasElementTranscludeDirective, t = d.$$element = H(b), B, L, Q, s = e, xa, Ea = !1, E = !1, y, ra = 0, N = a.length; ra < N; ra++) {
                    B = a[ra]; var R = B.$$start, Fa = B.$$end; R && (t = Wc(b, R, Fa)); Q = u; if (p > B.priority) break; if (y = B.scope) B.templateUrl || (J(y) ? (X("new/isolated scope", C || G, B, t), C = B) : X("new/isolated scope", C, B, t)), G = G || B; L = B.name; if (!Ea && (B.replace && (B.templateUrl || B.template) || B.transclude && !B.$$tlb)) { for (y = ra + 1; Ea = a[y++];) if (Ea.transclude && !Ea.$$tlb || Ea.replace && (Ea.templateUrl || Ea.template)) { E = !0; break } Ea = !0 } !B.templateUrl &&
                    B.controller && (y = B.controller, v = v || V(), X("'" + L + "' controller", v[L], B, t), v[L] = B); if (y = B.transclude) if (K = !0, B.$$tlb || (X("transclusion", I, B, t), I = B), "element" == y) Ca = !0, p = B.priority, Q = t, t = d.$$element = H(ba.$$createComment(L, d[L])), b = t[0], da(f, Aa.call(Q, 0), b), Q[0].$$parentNode = Q[0].parentNode, s = Zb(E, Q, e, p, g && g.name, { nonTlbTranscludeDirective: I }); else {
                        var P = V(); Q = H(Wb(b)).contents(); if (J(y)) {
                            Q = []; var Z = V(), Y = V(); q(y, function (a, b) { var c = "?" === a.charAt(0); a = c ? a.substring(1) : a; Z[a] = b; P[b] = null; Y[b] = c }); q(t.contents(),
                            function (a) { var b = Z[ya(oa(a))]; b ? (Y[b] = !0, P[b] = P[b] || [], P[b].push(a)) : Q.push(a) }); q(Y, function (a, b) { if (!a) throw ga("reqslot", b); }); for (var $ in P) P[$] && (P[$] = Zb(E, P[$], e))
                        } t.empty(); s = Zb(E, Q, e, u, u, { needsNewScope: B.$$isolateScope || B.$$newScope }); s.$$slots = P
                    } if (B.template) if (x = !0, X("template", w, B, t), w = B, y = D(B.template) ? B.template(t, d) : B.template, y = ua(y), B.replace) {
                        g = B; Q = Ub.test(y) ? Xc(ca(B.templateNamespace, W(y))) : []; b = Q[0]; if (1 != Q.length || 1 !== b.nodeType) throw ga("tplrt", L, ""); da(f, t, b); N = { $attr: {} };
                        y = A(b, [], N); var ea = a.splice(ra + 1, a.length - (ra + 1)); (C || G) && Yc(y, C, G); a = a.concat(y).concat(ea); U(d, N); N = a.length
                    } else t.html(y); if (B.templateUrl) x = !0, X("template", w, B, t), w = B, B.replace && (g = B), n = aa(a.splice(ra, a.length - ra), t, d, f, K && s, h, k, { controllerDirectives: v, newScopeDirective: G !== B && G, newIsolateScopeDirective: C, templateDirective: w, nonTlbTranscludeDirective: I }), N = a.length; else if (B.compile) try { xa = B.compile(t, d, s), D(xa) ? m(null, xa, R, Fa) : xa && m(xa.pre, xa.post, R, Fa) } catch (fa) { c(fa, wa(t)) } B.terminal && (n.terminal =
                    !0, p = Math.max(p, B.priority))
                } n.scope = G && !0 === G.scope; n.transcludeOnThisElement = K; n.templateOnThisElement = x; n.transclude = s; l.hasElementTranscludeDirective = Ca; return n
            } function jb(a, b, c, d) {
                var e; if (y(b)) { var f = b.match(k); b = b.substring(f[0].length); var g = f[1] || f[3], f = "?" === f[2]; "^^" === g ? c = c.parent() : e = (e = d && d[b]) && e.instance; if (!e) { var h = "$" + b + "Controller"; e = g ? c.inheritedData(h) : c.data(h) } if (!e && !f) throw ga("ctreq", b, a); } else if (M(b)) for (e = [], g = 0, f = b.length; g < f; g++) e[g] = jb(a, b[g], c, d); else J(b) && (e =
                {}, q(b, function (b, f) { e[f] = jb(a, b, c, d) })); return e || null
            } function T(a, b, c, d, e, f, g) { var h = V(), k; for (k in d) { var l = d[k], m = { $scope: l === g || l.$$isolateScope ? e : f, $element: a, $attrs: b, $transclude: c }, n = l.controller; "@" == n && (n = b[l.name]); m = Q(n, m, !0, l.controllerAs); h[l.name] = m; a.data("$" + l.name + "Controller", m.instance) } return h } function Yc(a, b, c) { for (var d = 0, e = a.length; d < e; d++) a[d] = Qb(a[d], { $$isolateScope: b, $$newScope: c }) } function Fa(b, f, g, h, k, l, m) {
                if (f === k) return null; k = null; if (e.hasOwnProperty(f)) {
                    var n; f =
                    a.get(f + "Directive"); for (var p = 0, G = f.length; p < G; p++) try {
                        if (n = f[p], (z(h) || h > n.priority) && -1 != n.restrict.indexOf(g)) {
                            l && (n = Qb(n, { $$start: l, $$end: m })); if (!n.$$bindings) {
                                var v = n, C = n, w = n.name, B = { isolateScope: null, bindToController: null }; J(C.scope) && (!0 === C.bindToController ? (B.bindToController = d(C.scope, w, !0), B.isolateScope = {}) : B.isolateScope = d(C.scope, w, !1)); J(C.bindToController) && (B.bindToController = d(C.bindToController, w, !0)); if (J(B.bindToController)) {
                                    var I = C.controller, K = C.controllerAs; if (!I) throw ga("noctrl",
                                    w); if (!Uc(I, K)) throw ga("noident", w);
                                } var x = v.$$bindings = B; J(x.isolateScope) && (n.$$isolateBindings = x.isolateScope)
                            } b.push(n); k = n
                        }
                    } catch (t) { c(t) }
                } return k
            } function R(b) { if (e.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), d = 0, f = c.length; d < f; d++) if (b = c[d], b.multiElement) return !0; return !1 } function U(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element; q(a, function (d, e) { "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e])) }); q(b, function (b, f) {
                    "class" == f ? (B(e, b), a["class"] = (a["class"] ?
                    a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            } function aa(a, b, c, d, e, f, g, h) {
                var k = [], l, n, p = b[0], r = a.shift(), G = Qb(r, { templateUrl: null, transclude: null, replace: null, $$originalDirective: r }), v = D(r.templateUrl) ? r.templateUrl(b, c) : r.templateUrl, C = r.templateNamespace; b.empty(); m(v).then(function (m) {
                    var w, I; m = ua(m); if (r.replace) {
                        m = Ub.test(m) ? Xc(ca(C, W(m))) : []; w = m[0]; if (1 != m.length || 1 !==
                        w.nodeType) throw ga("tplrt", r.name, v); m = { $attr: {} }; da(d, b, w); var K = A(w, [], m); J(r.scope) && Yc(K, !0); a = K.concat(a); U(c, m)
                    } else w = p, b.html(m); a.unshift(G); l = ra(a, w, c, e, b, r, f, g, h); q(d, function (a, c) { a == w && (d[c] = b[0]) }); for (n = xa(b[0].childNodes, e) ; k.length;) { m = k.shift(); I = k.shift(); var x = k.shift(), t = k.shift(), K = b[0]; if (!m.$$destroyed) { if (I !== p) { var qa = I.className; h.hasElementTranscludeDirective && r.replace || (K = Wb(w)); da(x, H(I), K); B(H(K), qa) } I = l.transcludeOnThisElement ? s(m, l.transclude, t) : t; l(n, m, K, d, I) } } k =
                    null
                }); return function (a, b, c, d, e) { a = e; b.$$destroyed || (k ? k.push(b, c, d, a) : (l.transcludeOnThisElement && (a = s(b, l.transclude, e)), l(n, b, c, d, a))) }
            } function Z(a, b) { var c = b.priority - a.priority; return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index } function X(a, b, c, d) { function e(a) { return a ? " (module: " + a + ")" : "" } if (b) throw ga("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, wa(d)); } function Y(a, c) {
                var d = b(c, !0); d && a.push({
                    priority: 0, compile: function (a) {
                        a = a.parent(); var b = !!a.length;
                        b && ba.$$addBindingClass(a); return function (a, c) { var e = c.parent(); b || ba.$$addBindingClass(e); ba.$$addBindingInfo(e, d.expressions); a.$watch(d, function (a) { c[0].nodeValue = a }) }
                    }
                })
            } function ca(a, b) { a = N(a || "html"); switch (a) { case "svg": case "math": var c = P.createElement("div"); c.innerHTML = "<" + a + ">" + b + "</" + a + ">"; return c.childNodes[0].childNodes; default: return b } } function ea(a, b) { if ("srcdoc" == b) return G.HTML; var c = oa(a); if ("xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b)) return G.RESOURCE_URL }
            function fa(a, c, d, e, f) { var g = ea(a, e); f = h[e] || f; var k = b(d, !0, g, f); if (k) { if ("multiple" === e && "select" === oa(a)) throw ga("selmulti", wa(a)); c.push({ priority: 100, compile: function () { return { pre: function (a, c, h) { c = h.$$observers || (h.$$observers = V()); if (l.test(e)) throw ga("nodomevents"); var m = h[e]; m !== d && (k = m && b(m, !0, g, f), d = m); k && (h[e] = k(a), (c[e] || (c[e] = [])).$$inter = !0, (h.$$observers && h.$$observers[e].$$scope || a).$watch(k, function (a, b) { "class" === e && a != b ? h.$updateClass(a, b) : h.$set(e, a) })) } } } }) } } function da(a, b,
            c) { var d = b[0], e = b.length, f = d.parentNode, g, h; if (a) for (g = 0, h = a.length; g < h; g++) if (a[g] == d) { a[g++] = c; h = g + e - 1; for (var k = a.length; g < k; g++, h++) h < k ? a[g] = a[h] : delete a[g]; a.length -= e - 1; a.context === d && (a.context = c); break } f && f.replaceChild(c, d); a = P.createDocumentFragment(); for (g = 0; g < e; g++) a.appendChild(b[g]); H.hasData(d) && (H.data(c, H.data(d)), H(d).off("$destroy")); H.cleanData(a.querySelectorAll("*")); for (g = 1; g < e; g++) delete b[g]; b[0] = c; b.length = 1 } function ia(a, b) {
                return S(function () { return a.apply(null, arguments) },
                a, b)
            } function ja(a, b, d, e, f, g) { try { a(b, d, e, f, g) } catch (h) { c(h, wa(d)) } } function ha(a, c, d, e, f) {
                function g(b, c, e) { D(d.$onChanges) && c !== e && ($ || (a.$$postDigest(I), $ = []), l || (l = {}, $.push(h)), l[b] && (e = l[b].previousValue), l[b] = { previousValue: e, currentValue: c }) } function h() { d.$onChanges(l); l = u } var k = [], l; q(e, function (e, h) {
                    var l = e.attrName, m = e.optional, n, r, p, G; switch (e.mode) {
                        case "@": m || va.call(c, l) || (d[h] = c[l] = void 0); c.$observe(l, function (a) { y(a) && (g(h, a, d[h]), d[h] = a) }); c.$$observers[l].$$scope = a; n = c[l]; y(n) ?
                        d[h] = b(n)(a) : Oa(n) && (d[h] = n); break; case "=": if (!va.call(c, l)) { if (m) break; c[l] = void 0 } if (m && !c[l]) break; r = v(c[l]); G = r.literal ? na : function (a, b) { return a === b || a !== a && b !== b }; p = r.assign || function () { n = d[h] = r(a); throw ga("nonassign", c[l], l, f.name); }; n = d[h] = r(a); m = function (b) { G(b, d[h]) || (G(b, n) ? p(a, b = d[h]) : d[h] = b); return n = b }; m.$stateful = !0; m = e.collection ? a.$watchCollection(c[l], m) : a.$watch(v(c[l], m), null, r.literal); k.push(m); break; case "<": if (!va.call(c, l)) { if (m) break; c[l] = void 0 } if (m && !c[l]) break; r = v(c[l]);
                            d[h] = r(a); m = a.$watch(r, function (a) { g(h, a, d[h]); d[h] = a }, r.literal); k.push(m); break; case "&": r = c.hasOwnProperty(l) ? v(c[l]) : E; if (r === E && m) break; d[h] = function (b) { return r(a, b) }
                    }
                }); return k.length && function () { for (var a = 0, b = k.length; a < b; ++a) k[a]() }
            } var ma = /^\w/, la = P.createElement("div"), pa = p, $; qa.prototype = {
                $normalize: ya, $addClass: function (a) { a && 0 < a.length && C.addClass(this.$$element, a) }, $removeClass: function (a) { a && 0 < a.length && C.removeClass(this.$$element, a) }, $updateClass: function (a, b) {
                    var c = Zc(a, b); c &&
                    c.length && C.addClass(this.$$element, c); (c = Zc(b, a)) && c.length && C.removeClass(this.$$element, c)
                }, $set: function (a, b, d, e) {
                    var f = Rc(this.$$element[0], a), g = $c[a], h = a; f ? (this.$$element.prop(a, b), e = f) : g && (this[g] = b, h = g); this[a] = b; e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = zc(a, "-")); f = oa(this.$$element); if ("a" === f && ("href" === a || "xlinkHref" === a) || "img" === f && "src" === a) this[a] = b = K(b, "src" === a); else if ("img" === f && "srcset" === a) {
                        for (var f = "", g = W(b), k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k = /\s/.test(g) ?
                            k : /(,)/, g = g.split(k), k = Math.floor(g.length / 2), l = 0; l < k; l++) var m = 2 * l, f = f + K(W(g[m]), !0), f = f + (" " + W(g[m + 1])); g = W(g[2 * l]).split(/\s/); f += K(W(g[0]), !0); 2 === g.length && (f += " " + W(g[1])); this[a] = b = f
                    } !1 !== d && (null === b || z(b) ? this.$$element.removeAttr(e) : ma.test(e) ? this.$$element.attr(e, b) : Ca(this.$$element[0], e, b)); (a = this.$$observers) && q(a[h], function (a) { try { a(b) } catch (d) { c(d) } })
                }, $observe: function (a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = V()), e = d[a] || (d[a] = []); e.push(b); t.$evalAsync(function () {
                        e.$$inter ||
                        !c.hasOwnProperty(a) || z(c[a]) || b(c[a])
                    }); return function () { bb(e, b) }
                }
            }; var sa = b.startSymbol(), ta = b.endSymbol(), ua = "{{" == sa && "}}" == ta ? $a : function (a) { return a.replace(/\{\{/g, sa).replace(/}}/g, ta) }, za = /^ngAttr[A-Z]/, Ba = /^(.+)Start$/; ba.$$addBindingInfo = n ? function (a, b) { var c = a.data("$binding") || []; M(b) ? c = c.concat(b) : c.push(b); a.data("$binding", c) } : E; ba.$$addBindingClass = n ? function (a) { B(a, "ng-binding") } : E; ba.$$addScopeInfo = n ? function (a, b, c, d) {
                a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope",
                b)
            } : E; ba.$$addScopeClass = n ? function (a, b) { B(a, b ? "ng-isolate-scope" : "ng-scope") } : E; ba.$$createComment = function (a, b) { var c = ""; n && (c = " " + (a || "") + ": " + (b || "") + " "); return P.createComment(c) }; return ba
        }]
    } function ya(a) { return fb(a.replace(Vc, "")) } function Zc(a, b) { var d = "", c = a.split(/\s+/), e = b.split(/\s+/), f = 0; a: for (; f < c.length; f++) { for (var g = c[f], h = 0; h < e.length; h++) if (g == e[h]) continue a; d += (0 < d.length ? " " : "") + g } return d } function Xc(a) {
        a = H(a); var b = a.length; if (1 >= b) return a; for (; b--;) 8 === a[b].nodeType &&
        Yf.call(a, b, 1); return a
    } function Uc(a, b) { if (b && y(b)) return b; if (y(a)) { var d = ad.exec(a); if (d) return d[3] } } function df() {
        var a = {}, b = !1; this.has = function (b) { return a.hasOwnProperty(b) }; this.register = function (b, c) { Ta(b, "controller"); J(b) ? S(a, b) : a[b] = c }; this.allowGlobals = function () { b = !0 }; this.$get = ["$injector", "$window", function (d, c) {
            function e(a, b, c, d) { if (!a || !J(a.$scope)) throw O("$controller")("noscp", d, b); a.$scope[b] = c } return function (f, g, h, k) {
                var l, m, n; h = !0 === h; k && y(k) && (n = k); if (y(f)) {
                    k = f.match(ad);
                    if (!k) throw Zf("ctrlfmt", f); m = k[1]; n = n || k[3]; f = a.hasOwnProperty(m) ? a[m] : Bc(g.$scope, m, !0) || (b ? Bc(c, m, !0) : u); Sa(f, m, !0)
                } if (h) return h = (M(f) ? f[f.length - 1] : f).prototype, l = Object.create(h || null), n && e(g, n, l, m || f.name), S(function () { var a = d.invoke(f, l, g, m); a !== l && (J(a) || D(a)) && (l = a, n && e(g, n, l, m || f.name)); return l }, { instance: l, identifier: n }); l = d.instantiate(f, g, m); n && e(g, n, l, m || f.name); return l
            }
        }]
    } function ef() { this.$get = ["$window", function (a) { return H(a.document) }] } function ff() {
        this.$get = ["$log", function (a) {
            return function (b,
            d) { a.error.apply(a, arguments) }
        }]
    } function $b(a) { return J(a) ? fa(a) ? a.toISOString() : db(a) : a } function lf() { this.$get = function () { return function (a) { if (!a) return ""; var b = []; pc(a, function (a, c) { null === a || z(a) || (M(a) ? q(a, function (a) { b.push(ja(c) + "=" + ja($b(a))) }) : b.push(ja(c) + "=" + ja($b(a)))) }); return b.join("&") } } } function mf() {
        this.$get = function () {
            return function (a) {
                function b(a, e, f) {
                    null === a || z(a) || (M(a) ? q(a, function (a, c) { b(a, e + "[" + (J(a) ? c : "") + "]") }) : J(a) && !fa(a) ? pc(a, function (a, c) {
                        b(a, e + (f ? "" : "[") + c + (f ?
                        "" : "]"))
                    }) : d.push(ja(e) + "=" + ja($b(a))))
                } if (!a) return ""; var d = []; b(a, "", !0); return d.join("&")
            }
        }
    } function ac(a, b) { if (y(a)) { var d = a.replace($f, "").trim(); if (d) { var c = b("Content-Type"); (c = c && 0 === c.indexOf(bd)) || (c = (c = d.match(ag)) && bg[c[0]].test(d)); c && (a = uc(d)) } } return a } function cd(a) { var b = V(), d; y(a) ? q(a.split("\n"), function (a) { d = a.indexOf(":"); var e = N(W(a.substr(0, d))); a = W(a.substr(d + 1)); e && (b[e] = b[e] ? b[e] + ", " + a : a) }) : J(a) && q(a, function (a, d) { var f = N(d), g = W(a); f && (b[f] = b[f] ? b[f] + ", " + g : g) }); return b }
    function dd(a) { var b; return function (d) { b || (b = cd(a)); return d ? (d = b[N(d)], void 0 === d && (d = null), d) : b } } function ed(a, b, d, c) { if (D(c)) return c(a, b, d); q(c, function (c) { a = c(a, b, d) }); return a } function kf() {
        var a = this.defaults = {
            transformResponse: [ac], transformRequest: [function (a) { return J(a) && "[object File]" !== ka.call(a) && "[object Blob]" !== ka.call(a) && "[object FormData]" !== ka.call(a) ? db(a) : a }], headers: { common: { Accept: "application/json, text/plain, */*" }, post: ia(bc), put: ia(bc), patch: ia(bc) }, xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN", paramSerializer: "$httpParamSerializer"
        }, b = !1; this.useApplyAsync = function (a) { return A(a) ? (b = !!a, this) : b }; var d = !0; this.useLegacyPromiseExtensions = function (a) { return A(a) ? (d = !!a, this) : d }; var c = this.interceptors = []; this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function (e, f, g, h, k, l) {
            function m(b) {
                function c(a) { var b = S({}, a); b.data = ed(a.data, a.headers, a.status, f.transformResponse); a = a.status; return 200 <= a && 300 > a ? b : k.reject(b) } function e(a,
                b) { var c, d = {}; q(a, function (a, e) { D(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a }); return d } if (!J(b)) throw O("$http")("badreq", b); if (!y(b.url)) throw O("$http")("badreq", b.url); var f = S({ method: "get", transformRequest: a.transformRequest, transformResponse: a.transformResponse, paramSerializer: a.paramSerializer }, b); f.headers = function (b) { var c = a.headers, d = S({}, b.headers), f, g, h, c = S({}, c.common, c[N(b.method)]); a: for (f in c) { g = N(f); for (h in d) if (N(h) === g) continue a; d[f] = c[f] } return e(d, ia(b)) }(b); f.method = vb(f.method);
                f.paramSerializer = y(f.paramSerializer) ? l.get(f.paramSerializer) : f.paramSerializer; var g = [function (b) { var d = b.headers, e = ed(b.data, dd(d), u, b.transformRequest); z(e) && q(d, function (a, b) { "content-type" === N(b) && delete d[b] }); z(b.withCredentials) && !z(a.withCredentials) && (b.withCredentials = a.withCredentials); return n(b, e).then(c, c) }, u], h = k.when(f); for (q(L, function (a) { (a.request || a.requestError) && g.unshift(a.request, a.requestError); (a.response || a.responseError) && g.push(a.response, a.responseError) }) ; g.length;) {
                    b =
                    g.shift(); var m = g.shift(), h = h.then(b, m)
                } d ? (h.success = function (a) { Sa(a, "fn"); h.then(function (b) { a(b.data, b.status, b.headers, f) }); return h }, h.error = function (a) { Sa(a, "fn"); h.then(null, function (b) { a(b.data, b.status, b.headers, f) }); return h }) : (h.success = fd("success"), h.error = fd("error")); return h
            } function n(c, d) {
                function g(a, c, d, e) { function f() { l(c, a, d, e) } K && (200 <= a && 300 > a ? K.put(L, [a, c, cd(d), e]) : K.remove(L)); b ? h.$applyAsync(f) : (f(), h.$$phase || h.$apply()) } function l(a, b, d, e) {
                    b = -1 <= b ? b : 0; (200 <= b && 300 > b ? G.resolve :
                    G.reject)({ data: a, status: b, headers: dd(d), config: c, statusText: e })
                } function n(a) { l(a.data, a.status, ia(a.headers()), a.statusText) } function t() { var a = m.pendingRequests.indexOf(c); -1 !== a && m.pendingRequests.splice(a, 1) } var G = k.defer(), C = G.promise, K, I, qa = c.headers, L = p(c.url, c.paramSerializer(c.params)); m.pendingRequests.push(c); C.then(t, t); !c.cache && !a.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (K = J(c.cache) ? c.cache : J(a.cache) ? a.cache : F); K && (I = K.get(L), A(I) ? I && D(I.then) ? I.then(n, n) : M(I) ?
                l(I[1], I[0], ia(I[2]), I[3]) : l(I, 200, {}, "OK") : K.put(L, C)); z(I) && ((I = gd(c.url) ? f()[c.xsrfCookieName || a.xsrfCookieName] : u) && (qa[c.xsrfHeaderName || a.xsrfHeaderName] = I), e(c.method, L, d, g, qa, c.timeout, c.withCredentials, c.responseType)); return C
            } function p(a, b) { 0 < b.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + b); return a } var F = g("$http"); a.paramSerializer = y(a.paramSerializer) ? l.get(a.paramSerializer) : a.paramSerializer; var L = []; q(c, function (a) { L.unshift(y(a) ? l.get(a) : l.invoke(a)) }); m.pendingRequests = []; (function (a) {
                q(arguments,
                function (a) { m[a] = function (b, c) { return m(S({}, c || {}, { method: a, url: b })) } })
            })("get", "delete", "head", "jsonp"); (function (a) { q(arguments, function (a) { m[a] = function (b, c, d) { return m(S({}, d || {}, { method: a, url: b, data: c })) } }) })("post", "put", "patch"); m.defaults = a; return m
        }]
    } function of() { this.$get = function () { return function () { return new T.XMLHttpRequest } } } function nf() { this.$get = ["$browser", "$window", "$document", "$xhrFactory", function (a, b, d, c) { return cg(a, c, a.defer, b.angular.callbacks, d[0]) }] } function cg(a, b, d,
    c, e) {
        function f(a, b, d) { var f = e.createElement("script"), m = null; f.type = "text/javascript"; f.src = a; f.async = !0; m = function (a) { f.removeEventListener("load", m, !1); f.removeEventListener("error", m, !1); e.body.removeChild(f); f = null; var g = -1, F = "unknown"; a && ("load" !== a.type || c[b].called || (a = { type: "error" }), F = a.type, g = "error" === a.type ? 404 : 200); d && d(g, F) }; f.addEventListener("load", m, !1); f.addEventListener("error", m, !1); e.body.appendChild(f); return m } return function (e, h, k, l, m, n, p, F) {
            function L() { w && w(); v && v.abort() }
            function x(b, c, e, f, g) { A(t) && d.cancel(t); w = v = null; b(c, e, f, g); a.$$completeOutstandingRequest(E) } a.$$incOutstandingRequestCount(); h = h || a.url(); if ("jsonp" == N(e)) { var r = "_" + (c.counter++).toString(36); c[r] = function (a) { c[r].data = a; c[r].called = !0 }; var w = f(h.replace("JSON_CALLBACK", "angular.callbacks." + r), r, function (a, b) { x(l, a, c[r].data, "", b); c[r] = E }) } else {
                var v = b(e, h); v.open(e, h, !0); q(m, function (a, b) { A(a) && v.setRequestHeader(b, a) }); v.onload = function () {
                    var a = v.statusText || "", b = "response" in v ? v.response : v.responseText,
                    c = 1223 === v.status ? 204 : v.status; 0 === c && (c = b ? 200 : "file" == sa(h).protocol ? 404 : 0); x(l, c, b, v.getAllResponseHeaders(), a)
                }; e = function () { x(l, -1, null, null, "") }; v.onerror = e; v.onabort = e; p && (v.withCredentials = !0); if (F) try { v.responseType = F } catch (Q) { if ("json" !== F) throw Q; } v.send(z(k) ? null : k)
            } if (0 < n) var t = d(L, n); else n && D(n.then) && n.then(L)
        }
    } function hf() {
        var a = "{{", b = "}}"; this.startSymbol = function (b) { return b ? (a = b, this) : a }; this.endSymbol = function (a) { return a ? (b = a, this) : b }; this.$get = ["$parse", "$exceptionHandler",
        "$sce", function (d, c, e) {
            function f(a) { return "\\\\\\" + a } function g(c) { return c.replace(n, a).replace(p, b) } function h(a, b, c, d) { var e; return e = a.$watch(function (a) { e(); return d(a) }, b, c) } function k(f, k, n, r) {
                function p(a) { try { var b = a; a = n ? e.getTrusted(n, b) : e.valueOf(b); var d; if (r && !A(a)) d = a; else if (null == a) d = ""; else { switch (typeof a) { case "string": break; case "number": a = "" + a; break; default: a = db(a) } d = a } return d } catch (g) { c(La.interr(f, g)) } } if (!f.length || -1 === f.indexOf(a)) {
                    var v; k || (k = g(f), v = da(k), v.exp = f, v.expressions =
                    [], v.$$watchDelegate = h); return v
                } r = !!r; var q, t, G = 0, C = [], K = []; v = f.length; for (var I = [], qa = []; G < v;) if (-1 != (q = f.indexOf(a, G)) && -1 != (t = f.indexOf(b, q + l))) G !== q && I.push(g(f.substring(G, q))), G = f.substring(q + l, t), C.push(G), K.push(d(G, p)), G = t + m, qa.push(I.length), I.push(""); else { G !== v && I.push(g(f.substring(G))); break } n && 1 < I.length && La.throwNoconcat(f); if (!k || C.length) {
                    var Ca = function (a) { for (var b = 0, c = C.length; b < c; b++) { if (r && z(a[b])) return; I[qa[b]] = a[b] } return I.join("") }; return S(function (a) {
                        var b = 0, d = C.length,
                        e = Array(d); try { for (; b < d; b++) e[b] = K[b](a); return Ca(e) } catch (g) { c(La.interr(f, g)) }
                    }, { exp: f, expressions: C, $$watchDelegate: function (a, b) { var c; return a.$watchGroup(K, function (d, e) { var f = Ca(d); D(b) && b.call(this, f, d !== e ? c : f, a); c = f }) } })
                }
            } var l = a.length, m = b.length, n = new RegExp(a.replace(/./g, f), "g"), p = new RegExp(b.replace(/./g, f), "g"); k.startSymbol = function () { return a }; k.endSymbol = function () { return b }; return k
        }]
    } function jf() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function (a, b, d, c, e) {
            function f(f,
            k, l, m) { function n() { p ? f.apply(null, F) : f(r) } var p = 4 < arguments.length, F = p ? Aa.call(arguments, 4) : [], q = b.setInterval, x = b.clearInterval, r = 0, w = A(m) && !m, v = (w ? c : d).defer(), Q = v.promise; l = A(l) ? l : 0; Q.$$intervalId = q(function () { w ? e.defer(n) : a.$evalAsync(n); v.notify(r++); 0 < l && r >= l && (v.resolve(r), x(Q.$$intervalId), delete g[Q.$$intervalId]); w || a.$apply() }, k); g[Q.$$intervalId] = v; return Q } var g = {}; f.cancel = function (a) {
                return a && a.$$intervalId in g ? (g[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId),
                delete g[a.$$intervalId], !0) : !1
            }; return f
        }]
    } function cc(a) { a = a.split("/"); for (var b = a.length; b--;) a[b] = rb(a[b]); return a.join("/") } function hd(a, b) { var d = sa(a); b.$$protocol = d.protocol; b.$$host = d.hostname; b.$$port = Y(d.port) || dg[d.protocol] || null } function id(a, b) {
        var d = "/" !== a.charAt(0); d && (a = "/" + a); var c = sa(a); b.$$path = decodeURIComponent(d && "/" === c.pathname.charAt(0) ? c.pathname.substring(1) : c.pathname); b.$$search = xc(c.search); b.$$hash = decodeURIComponent(c.hash); b.$$path && "/" != b.$$path.charAt(0) && (b.$$path =
        "/" + b.$$path)
    } function la(a, b) { if (0 === b.indexOf(a)) return b.substr(a.length) } function Ka(a) { var b = a.indexOf("#"); return -1 == b ? a : a.substr(0, b) } function kb(a) { return a.replace(/(#.+)|#$/, "$1") } function dc(a, b, d) {
        this.$$html5 = !0; d = d || ""; hd(a, this); this.$$parse = function (a) { var d = la(b, a); if (!y(d)) throw Fb("ipthprfx", a, b); id(d, this); this.$$path || (this.$$path = "/"); this.$$compose() }; this.$$compose = function () {
            var a = Sb(this.$$search), d = this.$$hash ? "#" + rb(this.$$hash) : ""; this.$$url = cc(this.$$path) + (a ? "?" + a : "") +
            d; this.$$absUrl = b + this.$$url.substr(1)
        }; this.$$parseLinkUrl = function (c, e) { if (e && "#" === e[0]) return this.hash(e.slice(1)), !0; var f, g; A(f = la(a, c)) ? (g = f, g = A(f = la(d, f)) ? b + (la("/", f) || f) : a + g) : A(f = la(b, c)) ? g = b + f : b == c + "/" && (g = b); g && this.$$parse(g); return !!g }
    } function ec(a, b, d) {
        hd(a, this); this.$$parse = function (c) {
            var e = la(a, c) || la(b, c), f; z(e) || "#" !== e.charAt(0) ? this.$$html5 ? f = e : (f = "", z(e) && (a = c, this.replace())) : (f = la(d, e), z(f) && (f = e)); id(f, this); c = this.$$path; var e = a, g = /^\/[A-Z]:(\/.*)/; 0 === f.indexOf(e) &&
            (f = f.replace(e, "")); g.exec(f) || (c = (f = g.exec(c)) ? f[1] : c); this.$$path = c; this.$$compose()
        }; this.$$compose = function () { var b = Sb(this.$$search), e = this.$$hash ? "#" + rb(this.$$hash) : ""; this.$$url = cc(this.$$path) + (b ? "?" + b : "") + e; this.$$absUrl = a + (this.$$url ? d + this.$$url : "") }; this.$$parseLinkUrl = function (b, d) { return Ka(a) == Ka(b) ? (this.$$parse(b), !0) : !1 }
    } function jd(a, b, d) {
        this.$$html5 = !0; ec.apply(this, arguments); this.$$parseLinkUrl = function (c, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0; var f, g; a == Ka(c) ?
            f = c : (g = la(b, c)) ? f = a + d + g : b === c + "/" && (f = b); f && this.$$parse(f); return !!f
        }; this.$$compose = function () { var b = Sb(this.$$search), e = this.$$hash ? "#" + rb(this.$$hash) : ""; this.$$url = cc(this.$$path) + (b ? "?" + b : "") + e; this.$$absUrl = a + d + this.$$url }
    } function Gb(a) { return function () { return this[a] } } function kd(a, b) { return function (d) { if (z(d)) return this[a]; this[a] = b(d); this.$$compose(); return this } } function pf() {
        var a = "", b = { enabled: !1, requireBase: !0, rewriteLinks: !0 }; this.hashPrefix = function (b) {
            return A(b) ? (a = b, this) :
            a
        }; this.html5Mode = function (a) { return Oa(a) ? (b.enabled = a, this) : J(a) ? (Oa(a.enabled) && (b.enabled = a.enabled), Oa(a.requireBase) && (b.requireBase = a.requireBase), Oa(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), this) : b }; this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (d, c, e, f, g) {
            function h(a, b, d) { var e = l.url(), f = l.$$state; try { c.url(a, b, d), l.$$state = c.state() } catch (g) { throw l.url(e), l.$$state = f, g; } } function k(a, b) {
                d.$broadcast("$locationChangeSuccess", l.absUrl(), a, l.$$state,
                b)
            } var l, m; m = c.baseHref(); var n = c.url(), p; if (b.enabled) { if (!m && b.requireBase) throw Fb("nobase"); p = n.substring(0, n.indexOf("/", n.indexOf("//") + 2)) + (m || "/"); m = e.history ? dc : jd } else p = Ka(n), m = ec; var F = p.substr(0, Ka(p).lastIndexOf("/") + 1); l = new m(p, F, "#" + a); l.$$parseLinkUrl(n, n); l.$$state = c.state(); var q = /^\s*(javascript|mailto):/i; f.on("click", function (a) {
                if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 != a.which && 2 != a.button) {
                    for (var e = H(a.target) ; "a" !== oa(e[0]) ;) if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var h = e.prop("href"), k = e.attr("href") || e.attr("xlink:href"); J(h) && "[object SVGAnimatedString]" === h.toString() && (h = sa(h.animVal).href); q.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || !l.$$parseLinkUrl(h, k) || (a.preventDefault(), l.absUrl() != c.url() && (d.$apply(), g.angular["ff-684208-preventDefault"] = !0))
                }
            }); kb(l.absUrl()) != kb(n) && c.url(l.absUrl(), !0); var x = !0; c.onUrlChange(function (a, b) {
                z(la(F, a)) ? g.location.href = a : (d.$evalAsync(function () {
                    var c = l.absUrl(), e = l.$$state, f; a = kb(a); l.$$parse(a);
                    l.$$state = b; f = d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented; l.absUrl() === a && (f ? (l.$$parse(c), l.$$state = e, h(c, !1, e)) : (x = !1, k(c, e)))
                }), d.$$phase || d.$digest())
            }); d.$watch(function () {
                var a = kb(c.url()), b = kb(l.absUrl()), f = c.state(), g = l.$$replace, m = a !== b || l.$$html5 && e.history && f !== l.$$state; if (x || m) x = !1, d.$evalAsync(function () {
                    var b = l.absUrl(), c = d.$broadcast("$locationChangeStart", b, a, l.$$state, f).defaultPrevented; l.absUrl() === b && (c ? (l.$$parse(a), l.$$state = f) : (m && h(b, g, f === l.$$state ? null :
                    l.$$state), k(a, f)))
                }); l.$$replace = !1
            }); return l
        }]
    } function qf() {
        var a = !0, b = this; this.debugEnabled = function (b) { return A(b) ? (a = b, this) : a }; this.$get = ["$window", function (d) {
            function c(a) { a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)); return a } function e(a) {
                var b = d.console || {}, e = b[a] || b.log || E; a = !1; try { a = !!e.apply } catch (k) { } return a ? function () {
                    var a = []; q(arguments, function (b) { a.push(c(b)) });
                    return e.apply(b, a)
                } : function (a, b) { e(a, null == b ? "" : b) }
            } return { log: e("log"), info: e("info"), warn: e("warn"), error: e("error"), debug: function () { var c = e("debug"); return function () { a && c.apply(b, arguments) } }() }
        }]
    } function Wa(a, b) { if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw ca("isecfld", b); return a } function eg(a) { return a + "" } function ta(a, b) {
        if (a) {
            if (a.constructor === a) throw ca("isecfn", b); if (a.window === a) throw ca("isecwindow", b); if (a.children &&
            (a.nodeName || a.prop && a.attr && a.find)) throw ca("isecdom", b); if (a === Object) throw ca("isecobj", b);
        } return a
    } function ld(a, b) { if (a) { if (a.constructor === a) throw ca("isecfn", b); if (a === fg || a === gg || a === hg) throw ca("isecff", b); } } function Hb(a, b) { if (a && (a === (0).constructor || a === (!1).constructor || a === "".constructor || a === {}.constructor || a === [].constructor || a === Function.constructor)) throw ca("isecaf", b); } function ig(a, b) { return "undefined" !== typeof a ? a : b } function md(a, b) {
        return "undefined" === typeof a ? b : "undefined" ===
        typeof b ? a : a + b
    } function aa(a, b) {
        var d, c; switch (a.type) {
            case s.Program: d = !0; q(a.body, function (a) { aa(a.expression, b); d = d && a.expression.constant }); a.constant = d; break; case s.Literal: a.constant = !0; a.toWatch = []; break; case s.UnaryExpression: aa(a.argument, b); a.constant = a.argument.constant; a.toWatch = a.argument.toWatch; break; case s.BinaryExpression: aa(a.left, b); aa(a.right, b); a.constant = a.left.constant && a.right.constant; a.toWatch = a.left.toWatch.concat(a.right.toWatch); break; case s.LogicalExpression: aa(a.left,
            b); aa(a.right, b); a.constant = a.left.constant && a.right.constant; a.toWatch = a.constant ? [] : [a]; break; case s.ConditionalExpression: aa(a.test, b); aa(a.alternate, b); aa(a.consequent, b); a.constant = a.test.constant && a.alternate.constant && a.consequent.constant; a.toWatch = a.constant ? [] : [a]; break; case s.Identifier: a.constant = !1; a.toWatch = [a]; break; case s.MemberExpression: aa(a.object, b); a.computed && aa(a.property, b); a.constant = a.object.constant && (!a.computed || a.property.constant); a.toWatch = [a]; break; case s.CallExpression: d =
            a.filter ? !b(a.callee.name).$stateful : !1; c = []; q(a.arguments, function (a) { aa(a, b); d = d && a.constant; a.constant || c.push.apply(c, a.toWatch) }); a.constant = d; a.toWatch = a.filter && !b(a.callee.name).$stateful ? c : [a]; break; case s.AssignmentExpression: aa(a.left, b); aa(a.right, b); a.constant = a.left.constant && a.right.constant; a.toWatch = [a]; break; case s.ArrayExpression: d = !0; c = []; q(a.elements, function (a) { aa(a, b); d = d && a.constant; a.constant || c.push.apply(c, a.toWatch) }); a.constant = d; a.toWatch = c; break; case s.ObjectExpression: d =
            !0; c = []; q(a.properties, function (a) { aa(a.value, b); d = d && a.value.constant; a.value.constant || c.push.apply(c, a.value.toWatch) }); a.constant = d; a.toWatch = c; break; case s.ThisExpression: a.constant = !1; a.toWatch = []; break; case s.LocalsExpression: a.constant = !1, a.toWatch = []
        }
    } function nd(a) { if (1 == a.length) { a = a[0].expression; var b = a.toWatch; return 1 !== b.length ? b : b[0] !== a ? b : u } } function od(a) { return a.type === s.Identifier || a.type === s.MemberExpression } function pd(a) {
        if (1 === a.body.length && od(a.body[0].expression)) return {
            type: s.AssignmentExpression,
            left: a.body[0].expression, right: { type: s.NGValueParameter }, operator: "="
        }
    } function qd(a) { return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === s.Literal || a.body[0].expression.type === s.ArrayExpression || a.body[0].expression.type === s.ObjectExpression) } function rd(a, b) { this.astBuilder = a; this.$filter = b } function sd(a, b) { this.astBuilder = a; this.$filter = b } function Ib(a) { return "constructor" == a } function fc(a) { return D(a.valueOf) ? a.valueOf() : jg.call(a) } function rf() {
        var a = V(), b = V(), d = {
            "true": !0,
            "false": !1, "null": null, undefined: u
        }; this.addLiteral = function (a, b) { d[a] = b }; this.$get = ["$filter", function (c) {
            function e(d, e, g) {
                var p, t, G; g = g || x; switch (typeof d) {
                    case "string": G = d = d.trim(); var C = g ? b : a; p = C[G]; if (!p) { ":" === d.charAt(0) && ":" === d.charAt(1) && (t = !0, d = d.substring(2)); p = g ? L : F; var K = new gc(p); p = (new hc(K, c, p)).parse(d); p.constant ? p.$$watchDelegate = m : t ? p.$$watchDelegate = p.literal ? l : k : p.inputs && (p.$$watchDelegate = h); g && (p = f(p)); C[G] = p } return n(p, e); case "function": return n(d, e); default: return n(E,
                    e)
                }
            } function f(a) { function b(c, d, e, f) { var g = x; x = !0; try { return a(c, d, e, f) } finally { x = g } } if (!a) return a; b.$$watchDelegate = a.$$watchDelegate; b.assign = f(a.assign); b.constant = a.constant; b.literal = a.literal; for (var c = 0; a.inputs && c < a.inputs.length; ++c) a.inputs[c] = f(a.inputs[c]); b.inputs = a.inputs; return b } function g(a, b) { return null == a || null == b ? a === b : "object" === typeof a && (a = fc(a), "object" === typeof a) ? !1 : a === b || a !== a && b !== b } function h(a, b, c, d, e) {
                var f = d.inputs, h; if (1 === f.length) {
                    var k = g, f = f[0]; return a.$watch(function (a) {
                        var b =
                        f(a); g(b, k) || (h = d(a, u, u, [b]), k = b && fc(b)); return h
                    }, b, c, e)
                } for (var l = [], m = [], n = 0, p = f.length; n < p; n++) l[n] = g, m[n] = null; return a.$watch(function (a) { for (var b = !1, c = 0, e = f.length; c < e; c++) { var k = f[c](a); if (b || (b = !g(k, l[c]))) m[c] = k, l[c] = k && fc(k) } b && (h = d(a, u, u, m)); return h }, b, c, e)
            } function k(a, b, c, d) { var e, f; return e = a.$watch(function (a) { return d(a) }, function (a, c, d) { f = a; D(b) && b.apply(this, arguments); A(a) && d.$$postDigest(function () { A(f) && e() }) }, c) } function l(a, b, c, d) {
                function e(a) {
                    var b = !0; q(a, function (a) {
                        A(a) ||
                        (b = !1)
                    }); return b
                } var f, g; return f = a.$watch(function (a) { return d(a) }, function (a, c, d) { g = a; D(b) && b.call(this, a, c, d); e(a) && d.$$postDigest(function () { e(g) && f() }) }, c)
            } function m(a, b, c, d) { var e; return e = a.$watch(function (a) { e(); return d(a) }, b, c) } function n(a, b) {
                if (!b) return a; var c = a.$$watchDelegate, d = !1, c = c !== l && c !== k ? function (c, e, f, g) { f = d && g ? g[0] : a(c, e, f, g); return b(f, c, e) } : function (c, d, e, f) { e = a(c, d, e, f); c = b(e, c, d); return A(e) ? c : e }; a.$$watchDelegate && a.$$watchDelegate !== h ? c.$$watchDelegate = a.$$watchDelegate :
                b.$stateful || (c.$$watchDelegate = h, d = !a.inputs, c.inputs = a.inputs ? a.inputs : [a]); return c
            } var p = Ga().noUnsafeEval, F = { csp: p, expensiveChecks: !1, literals: pa(d) }, L = { csp: p, expensiveChecks: !0, literals: pa(d) }, x = !1; e.$$runningExpensiveChecks = function () { return x }; return e
        }]
    } function tf() { this.$get = ["$rootScope", "$exceptionHandler", function (a, b) { return td(function (b) { a.$evalAsync(b) }, b) }] } function uf() { this.$get = ["$browser", "$exceptionHandler", function (a, b) { return td(function (b) { a.defer(b) }, b) }] } function td(a,
    b) {
        function d() { this.$$state = { status: 0 } } function c(a, b) { return function (c) { b.call(a, c) } } function e(c) { !c.processScheduled && c.pending && (c.processScheduled = !0, a(function () { var a, d, e; e = c.pending; c.processScheduled = !1; c.pending = u; for (var f = 0, g = e.length; f < g; ++f) { d = e[f][0]; a = e[f][c.status]; try { D(a) ? d.resolve(a(c.value)) : 1 === c.status ? d.resolve(c.value) : d.reject(c.value) } catch (h) { d.reject(h), b(h) } } })) } function f() { this.promise = new d } var g = O("$q", TypeError); S(d.prototype, {
            then: function (a, b, c) {
                if (z(a) && z(b) &&
                z(c)) return this; var d = new f; this.$$state.pending = this.$$state.pending || []; this.$$state.pending.push([d, a, b, c]); 0 < this.$$state.status && e(this.$$state); return d.promise
            }, "catch": function (a) { return this.then(null, a) }, "finally": function (a, b) { return this.then(function (b) { return k(b, !0, a) }, function (b) { return k(b, !1, a) }, b) }
        }); S(f.prototype, {
            resolve: function (a) { this.promise.$$state.status || (a === this.promise ? this.$$reject(g("qcycle", a)) : this.$$resolve(a)) }, $$resolve: function (a) {
                function d(a) { k || (k = !0, h.$$resolve(a)) }
                function f(a) { k || (k = !0, h.$$reject(a)) } var g, h = this, k = !1; try { if (J(a) || D(a)) g = a && a.then; D(g) ? (this.promise.$$state.status = -1, g.call(a, d, f, c(this, this.notify))) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, e(this.promise.$$state)) } catch (l) { f(l), b(l) }
            }, reject: function (a) { this.promise.$$state.status || this.$$reject(a) }, $$reject: function (a) { this.promise.$$state.value = a; this.promise.$$state.status = 2; e(this.promise.$$state) }, notify: function (c) {
                var d = this.promise.$$state.pending; 0 >= this.promise.$$state.status &&
                d && d.length && a(function () { for (var a, e, f = 0, g = d.length; f < g; f++) { e = d[f][0]; a = d[f][3]; try { e.notify(D(a) ? a(c) : c) } catch (h) { b(h) } } })
            }
        }); var h = function (a, b) { var c = new f; b ? c.resolve(a) : c.reject(a); return c.promise }, k = function (a, b, c) { var d = null; try { D(c) && (d = c()) } catch (e) { return h(e, !1) } return d && D(d.then) ? d.then(function () { return h(a, b) }, function (a) { return h(a, !1) }) : h(a, b) }, l = function (a, b, c, d) { var e = new f; e.resolve(a); return e.promise.then(b, c, d) }, m = function (a) {
            if (!D(a)) throw g("norslvr", a); var b = new f; a(function (a) { b.resolve(a) },
            function (a) { b.reject(a) }); return b.promise
        }; m.prototype = d.prototype; m.defer = function () { var a = new f; a.resolve = c(a, a.resolve); a.reject = c(a, a.reject); a.notify = c(a, a.notify); return a }; m.reject = function (a) { var b = new f; b.reject(a); return b.promise }; m.when = l; m.resolve = l; m.all = function (a) { var b = new f, c = 0, d = M(a) ? [] : {}; q(a, function (a, e) { c++; l(a).then(function (a) { d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d)) }, function (a) { d.hasOwnProperty(e) || b.reject(a) }) }); 0 === c && b.resolve(d); return b.promise }; return m
    } function Df() {
        this.$get =
        ["$window", "$timeout", function (a, b) { var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame, c = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame, e = !!d, f = e ? function (a) { var b = d(a); return function () { c(b) } } : function (a) { var c = b(a, 16.66, !1); return function () { b.cancel(c) } }; f.supported = e; return f }]
    } function sf() {
        function a(a) {
            function b() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null; this.$$listeners = {}; this.$$listenerCount = {}; this.$$watchersCount =
                0; this.$id = ++qb; this.$$ChildScope = null
            } b.prototype = a; return b
        } var b = 10, d = O("$rootScope"), c = null, e = null; this.digestTtl = function (a) { arguments.length && (b = a); return b }; this.$get = ["$exceptionHandler", "$parse", "$browser", function (f, g, h) {
            function k(a) { a.currentScope.$$destroyed = !0 } function l(a) { 9 === Da && (a.$$childHead && l(a.$$childHead), a.$$nextSibling && l(a.$$nextSibling)); a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null } function m() {
                this.$id = ++qb; this.$$phase =
                this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null; this.$root = this; this.$$destroyed = !1; this.$$listeners = {}; this.$$listenerCount = {}; this.$$watchersCount = 0; this.$$isolateBindings = null
            } function n(a) { if (w.$$phase) throw d("inprog", w.$$phase); w.$$phase = a } function p(a, b) { do a.$$watchersCount += b; while (a = a.$parent) } function F(a, b, c) { do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent) } function s() { } function x() {
                for (; t.length;) try { t.shift()() } catch (a) { f(a) } e =
                null
            } function r() { null === e && (e = h.defer(function () { w.$apply(x) })) } m.prototype = {
                constructor: m, $new: function (b, c) { var d; c = c || this; b ? (d = new m, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), d = new this.$$ChildScope); d.$parent = c; d.$$prevSibling = c.$$childTail; c.$$childHead ? (c.$$childTail.$$nextSibling = d, c.$$childTail = d) : c.$$childHead = c.$$childTail = d; (b || c != this) && d.$on("$destroy", k); return d }, $watch: function (a, b, d, e) {
                    var f = g(a); if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, f,
                    a); var h = this, k = h.$$watchers, l = { fn: b, last: s, get: f, exp: e || a, eq: !!d }; c = null; D(b) || (l.fn = E); k || (k = h.$$watchers = []); k.unshift(l); p(this, 1); return function () { 0 <= bb(k, l) && p(h, -1); c = null }
                }, $watchGroup: function (a, b) {
                    function c() { h = !1; k ? (k = !1, b(e, e, g)) : b(e, d, g) } var d = Array(a.length), e = Array(a.length), f = [], g = this, h = !1, k = !0; if (!a.length) { var l = !0; g.$evalAsync(function () { l && b(e, e, g) }); return function () { l = !1 } } if (1 === a.length) return this.$watch(a[0], function (a, c, f) { e[0] = a; d[0] = c; b(e, a === c ? e : d, f) }); q(a, function (a,
                    b) { var k = g.$watch(a, function (a, f) { e[b] = a; d[b] = f; h || (h = !0, g.$evalAsync(c)) }); f.push(k) }); return function () { for (; f.length;) f.shift()() }
                }, $watchCollection: function (a, b) {
                    function c(a) {
                        e = a; var b, d, g, h; if (!z(e)) {
                            if (J(e)) if (za(e)) for (f !== n && (f = n, v = f.length = 0, l++), a = e.length, v !== a && (l++, f.length = v = a), b = 0; b < a; b++) h = f[b], g = e[b], d = h !== h && g !== g, d || h === g || (l++, f[b] = g); else {
                                f !== p && (f = p = {}, v = 0, l++); a = 0; for (b in e) va.call(e, b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, d || h === g || (l++, f[b] = g)) : (v++, f[b] = g, l++)); if (v >
                                a) for (b in l++, f) va.call(e, b) || (v--, delete f[b])
                            } else f !== e && (f = e, l++); return l
                        }
                    } c.$stateful = !0; var d = this, e, f, h, k = 1 < b.length, l = 0, m = g(a, c), n = [], p = {}, r = !0, v = 0; return this.$watch(m, function () { r ? (r = !1, b(e, e, d)) : b(e, h, d); if (k) if (J(e)) if (za(e)) { h = Array(e.length); for (var a = 0; a < e.length; a++) h[a] = e[a] } else for (a in h = {}, e) va.call(e, a) && (h[a] = e[a]); else h = e })
                }, $digest: function () {
                    var a, g, k, l, m, p, r, q, t = b, F, A = [], z, y; n("$digest"); h.$$checkUrlChange(); this === w && null !== e && (h.defer.cancel(e), x()); c = null; do {
                        q = !1;
                        for (F = this; v.length;) { try { y = v.shift(), y.scope.$eval(y.expression, y.locals) } catch (E) { f(E) } c = null }a: do {
                            if (p = F.$$watchers) for (r = p.length; r--;) try { if (a = p[r]) if (m = a.get, (g = m(F)) !== (k = a.last) && !(a.eq ? na(g, k) : "number" === typeof g && "number" === typeof k && isNaN(g) && isNaN(k))) q = !0, c = a, a.last = a.eq ? pa(g, null) : g, l = a.fn, l(g, k === s ? g : k, F), 5 > t && (z = 4 - t, A[z] || (A[z] = []), A[z].push({ msg: D(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp, newVal: g, oldVal: k })); else if (a === c) { q = !1; break a } } catch (H) { f(H) } if (!(p = F.$$watchersCount &&
                            F.$$childHead || F !== this && F.$$nextSibling)) for (; F !== this && !(p = F.$$nextSibling) ;) F = F.$parent
                        } while (F = p); if ((q || v.length) && !t--) throw w.$$phase = null, d("infdig", b, A);
                    } while (q || v.length); for (w.$$phase = null; u.length;) try { u.shift()() } catch (J) { f(J) }
                }, $destroy: function () {
                    if (!this.$$destroyed) {
                        var a = this.$parent; this.$broadcast("$destroy"); this.$$destroyed = !0; this === w && h.$$applicationDestroyed(); p(this, -this.$$watchersCount); for (var b in this.$$listenerCount) F(this, this.$$listenerCount[b], b); a && a.$$childHead ==
                        this && (a.$$childHead = this.$$nextSibling); a && a.$$childTail == this && (a.$$childTail = this.$$prevSibling); this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling); this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling); this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = E; this.$on = this.$watch = this.$watchGroup = function () { return E }; this.$$listeners = {}; this.$$nextSibling = null; l(this)
                    }
                }, $eval: function (a, b) { return g(a)(this, b) }, $evalAsync: function (a, b) {
                    w.$$phase ||
                    v.length || h.defer(function () { v.length && w.$digest() }); v.push({ scope: this, expression: g(a), locals: b })
                }, $$postDigest: function (a) { u.push(a) }, $apply: function (a) { try { n("$apply"); try { return this.$eval(a) } finally { w.$$phase = null } } catch (b) { f(b) } finally { try { w.$digest() } catch (c) { throw f(c), c; } } }, $applyAsync: function (a) { function b() { c.$eval(a) } var c = this; a && t.push(b); a = g(a); r() }, $on: function (a, b) {
                    var c = this.$$listeners[a]; c || (this.$$listeners[a] = c = []); c.push(b); var d = this; do d.$$listenerCount[a] || (d.$$listenerCount[a] =
                    0), d.$$listenerCount[a]++; while (d = d.$parent); var e = this; return function () { var d = c.indexOf(b); -1 !== d && (c[d] = null, F(e, 1, a)) }
                }, $emit: function (a, b) {
                    var c = [], d, e = this, g = !1, h = { name: a, targetScope: e, stopPropagation: function () { g = !0 }, preventDefault: function () { h.defaultPrevented = !0 }, defaultPrevented: !1 }, k = cb([h], arguments, 1), l, m; do { d = e.$$listeners[a] || c; h.currentScope = e; l = 0; for (m = d.length; l < m; l++) if (d[l]) try { d[l].apply(null, k) } catch (n) { f(n) } else d.splice(l, 1), l--, m--; if (g) return h.currentScope = null, h; e = e.$parent } while (e);
                    h.currentScope = null; return h
                }, $broadcast: function (a, b) {
                    var c = this, d = this, e = { name: a, targetScope: this, preventDefault: function () { e.defaultPrevented = !0 }, defaultPrevented: !1 }; if (!this.$$listenerCount[a]) return e; for (var g = cb([e], arguments, 1), h, k; c = d;) { e.currentScope = c; d = c.$$listeners[a] || []; h = 0; for (k = d.length; h < k; h++) if (d[h]) try { d[h].apply(null, g) } catch (l) { f(l) } else d.splice(h, 1), h--, k--; if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (; c !== this && !(d = c.$$nextSibling) ;) c = c.$parent } e.currentScope =
                    null; return e
                }
            }; var w = new m, v = w.$$asyncQueue = [], u = w.$$postDigestQueue = [], t = w.$$applyAsyncQueue = []; return w
        }]
    } function le() { var a = /^\s*(https?|ftp|mailto|tel|file):/, b = /^\s*((https?|ftp|file|blob):|data:image\/)/; this.aHrefSanitizationWhitelist = function (b) { return A(b) ? (a = b, this) : a }; this.imgSrcSanitizationWhitelist = function (a) { return A(a) ? (b = a, this) : b }; this.$get = function () { return function (d, c) { var e = c ? b : a, f; f = sa(d).href; return "" === f || f.match(e) ? d : "unsafe:" + f } } } function kg(a) {
        if ("self" === a) return a;
        if (y(a)) { if (-1 < a.indexOf("***")) throw ua("iwcard", a); a = ud(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"); return new RegExp("^" + a + "$") } if (Za(a)) return new RegExp("^" + a.source + "$"); throw ua("imatcher");
    } function vd(a) { var b = []; A(a) && q(a, function (a) { b.push(kg(a)) }); return b } function wf() {
        this.SCE_CONTEXTS = ma; var a = ["self"], b = []; this.resourceUrlWhitelist = function (b) { arguments.length && (a = vd(b)); return a }; this.resourceUrlBlacklist = function (a) { arguments.length && (b = vd(a)); return b }; this.$get = ["$injector",
        function (d) {
            function c(a, b) { return "self" === a ? gd(b) : !!a.exec(b.href) } function e(a) { var b = function (a) { this.$$unwrapTrustedValue = function () { return a } }; a && (b.prototype = new a); b.prototype.valueOf = function () { return this.$$unwrapTrustedValue() }; b.prototype.toString = function () { return this.$$unwrapTrustedValue().toString() }; return b } var f = function (a) { throw ua("unsafe"); }; d.has("$sanitize") && (f = d.get("$sanitize")); var g = e(), h = {}; h[ma.HTML] = e(g); h[ma.CSS] = e(g); h[ma.URL] = e(g); h[ma.JS] = e(g); h[ma.RESOURCE_URL] =
            e(h[ma.URL]); return {
                trustAs: function (a, b) { var c = h.hasOwnProperty(a) ? h[a] : null; if (!c) throw ua("icontext", a, b); if (null === b || z(b) || "" === b) return b; if ("string" !== typeof b) throw ua("itype", a); return new c(b) }, getTrusted: function (d, e) {
                    if (null === e || z(e) || "" === e) return e; var g = h.hasOwnProperty(d) ? h[d] : null; if (g && e instanceof g) return e.$$unwrapTrustedValue(); if (d === ma.RESOURCE_URL) {
                        var g = sa(e.toString()), n, p, q = !1; n = 0; for (p = a.length; n < p; n++) if (c(a[n], g)) { q = !0; break } if (q) for (n = 0, p = b.length; n < p; n++) if (c(b[n],
                        g)) { q = !1; break } if (q) return e; throw ua("insecurl", e.toString());
                    } if (d === ma.HTML) return f(e); throw ua("unsafe");
                }, valueOf: function (a) { return a instanceof g ? a.$$unwrapTrustedValue() : a }
            }
        }]
    } function vf() {
        var a = !0; this.enabled = function (b) { arguments.length && (a = !!b); return a }; this.$get = ["$parse", "$sceDelegate", function (b, d) {
            if (a && 8 > Da) throw ua("iequirks"); var c = ia(ma); c.isEnabled = function () { return a }; c.trustAs = d.trustAs; c.getTrusted = d.getTrusted; c.valueOf = d.valueOf; a || (c.trustAs = c.getTrusted = function (a, b) { return b },
            c.valueOf = $a); c.parseAs = function (a, d) { var e = b(d); return e.literal && e.constant ? e : b(d, function (b) { return c.getTrusted(a, b) }) }; var e = c.parseAs, f = c.getTrusted, g = c.trustAs; q(ma, function (a, b) { var d = N(b); c[fb("parse_as_" + d)] = function (b) { return e(a, b) }; c[fb("get_trusted_" + d)] = function (b) { return f(a, b) }; c[fb("trust_as_" + d)] = function (b) { return g(a, b) } }); return c
        }]
    } function xf() {
        this.$get = ["$window", "$document", function (a, b) {
            var d = {}, c = !(a.chrome && a.chrome.app && a.chrome.app.runtime) && a.history && a.history.pushState,
            e = Y((/android (\d+)/.exec(N((a.navigator || {}).userAgent)) || [])[1]), f = /Boxee/i.test((a.navigator || {}).userAgent), g = b[0] || {}, h, k = /^(Moz|webkit|ms)(?=[A-Z])/, l = g.body && g.body.style, m = !1, n = !1; if (l) { for (var p in l) if (m = k.exec(p)) { h = m[0]; h = h.substr(0, 1).toUpperCase() + h.substr(1); break } h || (h = "WebkitOpacity" in l && "webkit"); m = !!("transition" in l || h + "Transition" in l); n = !!("animation" in l || h + "Animation" in l); !e || m && n || (m = y(l.webkitTransition), n = y(l.webkitAnimation)) } return {
                history: !(!c || 4 > e || f), hasEvent: function (a) {
                    if ("input" ===
                    a && 11 >= Da) return !1; if (z(d[a])) { var b = g.createElement("div"); d[a] = "on" + a in b } return d[a]
                }, csp: Ga(), vendorPrefix: h, transitions: m, animations: n, android: e
            }
        }]
    } function zf() {
        var a; this.httpOptions = function (b) { return b ? (a = b, this) : a }; this.$get = ["$templateCache", "$http", "$q", "$sce", function (b, d, c, e) {
            function f(g, h) {
                f.totalPendingRequests++; y(g) && b.get(g) || (g = e.getTrustedResourceUrl(g)); var k = d.defaults && d.defaults.transformResponse; M(k) ? k = k.filter(function (a) { return a !== ac }) : k === ac && (k = null); return d.get(g,
                S({ cache: b, transformResponse: k }, a))["finally"](function () { f.totalPendingRequests-- }).then(function (a) { b.put(g, a.data); return a.data }, function (a) { if (!h) throw lg("tpload", g, a.status, a.statusText); return c.reject(a) })
            } f.totalPendingRequests = 0; return f
        }]
    } function Af() {
        this.$get = ["$rootScope", "$browser", "$location", function (a, b, d) {
            return {
                findBindings: function (a, b, d) {
                    a = a.getElementsByClassName("ng-binding"); var g = []; q(a, function (a) {
                        var c = ea.element(a).data("$binding"); c && q(c, function (c) {
                            d ? (new RegExp("(^|\\s)" +
                            ud(b) + "(\\s|\\||$)")).test(c) && g.push(a) : -1 != c.indexOf(b) && g.push(a)
                        })
                    }); return g
                }, findModels: function (a, b, d) { for (var g = ["ng-", "data-ng-", "ng\\:"], h = 0; h < g.length; ++h) { var k = a.querySelectorAll("[" + g[h] + "model" + (d ? "=" : "*=") + '"' + b + '"]'); if (k.length) return k } }, getLocation: function () { return d.url() }, setLocation: function (b) { b !== d.url() && (d.url(b), a.$digest()) }, whenStable: function (a) { b.notifyWhenNoOutstandingRequests(a) }
            }
        }]
    } function Bf() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler",
        function (a, b, d, c, e) { function f(f, k, l) { D(f) || (l = k, k = f, f = E); var m = Aa.call(arguments, 3), n = A(l) && !l, p = (n ? c : d).defer(), q = p.promise, s; s = b.defer(function () { try { p.resolve(f.apply(null, m)) } catch (b) { p.reject(b), e(b) } finally { delete g[q.$$timeoutId] } n || a.$apply() }, k); q.$$timeoutId = s; g[s] = p; return q } var g = {}; f.cancel = function (a) { return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1 }; return f }]
    } function sa(a) {
        Da && (Z.setAttribute("href", a), a =
        Z.href); Z.setAttribute("href", a); return { href: Z.href, protocol: Z.protocol ? Z.protocol.replace(/:$/, "") : "", host: Z.host, search: Z.search ? Z.search.replace(/^\?/, "") : "", hash: Z.hash ? Z.hash.replace(/^#/, "") : "", hostname: Z.hostname, port: Z.port, pathname: "/" === Z.pathname.charAt(0) ? Z.pathname : "/" + Z.pathname }
    } function gd(a) { a = y(a) ? sa(a) : a; return a.protocol === wd.protocol && a.host === wd.host } function Cf() { this.$get = da(T) } function xd(a) {
        function b(a) { try { return decodeURIComponent(a) } catch (b) { return a } } var d = a[0] || {},
        c = {}, e = ""; return function () { var a, g, h, k, l; a = d.cookie || ""; if (a !== e) for (e = a, a = e.split("; "), c = {}, h = 0; h < a.length; h++) g = a[h], k = g.indexOf("="), 0 < k && (l = b(g.substring(0, k)), z(c[l]) && (c[l] = b(g.substring(k + 1)))); return c }
    } function Gf() { this.$get = xd } function Jc(a) {
        function b(d, c) { if (J(d)) { var e = {}; q(d, function (a, c) { e[c] = b(c, a) }); return e } return a.factory(d + "Filter", c) } this.register = b; this.$get = ["$injector", function (a) { return function (b) { return a.get(b + "Filter") } }]; b("currency", yd); b("date", zd); b("filter", mg);
        b("json", ng); b("limitTo", og); b("lowercase", pg); b("number", Ad); b("orderBy", Bd); b("uppercase", qg)
    } function mg() { return function (a, b, d) { if (!za(a)) { if (null == a) return a; throw O("filter")("notarray", a); } var c; switch (ic(b)) { case "function": break; case "boolean": case "null": case "number": case "string": c = !0; case "object": b = rg(b, d, c); break; default: return a } return Array.prototype.filter.call(a, b) } } function rg(a, b, d) {
        var c = J(a) && "$" in a; !0 === b ? b = na : D(b) || (b = function (a, b) {
            if (z(a)) return !1; if (null === a || null === b) return a ===
            b; if (J(b) || J(a) && !rc(a)) return !1; a = N("" + a); b = N("" + b); return -1 !== a.indexOf(b)
        }); return function (e) { return c && !J(e) ? Ma(e, a.$, b, !1) : Ma(e, a, b, d) }
    } function Ma(a, b, d, c, e) {
        var f = ic(a), g = ic(b); if ("string" === g && "!" === b.charAt(0)) return !Ma(a, b.substring(1), d, c); if (M(a)) return a.some(function (a) { return Ma(a, b, d, c) }); switch (f) {
            case "object": var h; if (c) { for (h in a) if ("$" !== h.charAt(0) && Ma(a[h], b, d, !0)) return !0; return e ? !1 : Ma(a, b, d, !1) } if ("object" === g) {
                for (h in b) if (e = b[h], !D(e) && !z(e) && (f = "$" === h, !Ma(f ? a : a[h],
                e, d, f, f))) return !1; return !0
            } return d(a, b); case "function": return !1; default: return d(a, b)
        }
    } function ic(a) { return null === a ? "null" : typeof a } function yd(a) { var b = a.NUMBER_FORMATS; return function (a, c, e) { z(c) && (c = b.CURRENCY_SYM); z(e) && (e = b.PATTERNS[1].maxFrac); return null == a ? a : Cd(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, e).replace(/\u00A4/g, c) } } function Ad(a) { var b = a.NUMBER_FORMATS; return function (a, c) { return null == a ? a : Cd(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c) } } function sg(a) {
        var b = 0, d, c, e, f, g; -1 <
        (c = a.indexOf(Dd)) && (a = a.replace(Dd, "")); 0 < (e = a.search(/e/i)) ? (0 > c && (c = e), c += +a.slice(e + 1), a = a.substring(0, e)) : 0 > c && (c = a.length); for (e = 0; a.charAt(e) == jc; e++); if (e == (g = a.length)) d = [0], c = 1; else { for (g--; a.charAt(g) == jc;) g--; c -= e; d = []; for (f = 0; e <= g; e++, f++) d[f] = +a.charAt(e) } c > Ed && (d = d.splice(0, Ed - 1), b = c - 1, c = 1); return { d: d, e: b, i: c }
    } function tg(a, b, d, c) {
        var e = a.d, f = e.length - a.i; b = z(b) ? Math.min(Math.max(d, f), c) : +b; d = b + a.i; c = e[d]; if (0 < d) { e.splice(Math.max(a.i, d)); for (var g = d; g < e.length; g++) e[g] = 0 } else for (f =
        Math.max(0, f), a.i = 1, e.length = Math.max(1, d = b + 1), e[0] = 0, g = 1; g < d; g++) e[g] = 0; if (5 <= c) if (0 > d - 1) { for (c = 0; c > d; c--) e.unshift(0), a.i++; e.unshift(1); a.i++ } else e[d - 1]++; for (; f < Math.max(0, b) ; f++) e.push(0); if (b = e.reduceRight(function (a, b, c, d) { b += a; d[c] = b % 10; return Math.floor(b / 10) }, 0)) e.unshift(b), a.i++
    } function Cd(a, b, d, c, e) {
        if (!y(a) && !R(a) || isNaN(a)) return ""; var f = !isFinite(a), g = !1, h = Math.abs(a) + "", k = ""; if (f) k = "\u221e"; else {
            g = sg(h); tg(g, e, b.minFrac, b.maxFrac); k = g.d; h = g.i; e = g.e; f = []; for (g = k.reduce(function (a,
            b) { return a && !b }, !0) ; 0 > h;) k.unshift(0), h++; 0 < h ? f = k.splice(h) : (f = k, k = [0]); h = []; for (k.length >= b.lgSize && h.unshift(k.splice(-b.lgSize).join("")) ; k.length > b.gSize;) h.unshift(k.splice(-b.gSize).join("")); k.length && h.unshift(k.join("")); k = h.join(d); f.length && (k += c + f.join("")); e && (k += "e+" + e)
        } return 0 > a && !g ? b.negPre + k + b.negSuf : b.posPre + k + b.posSuf
    } function Jb(a, b, d, c) { var e = ""; if (0 > a || c && 0 >= a) c ? a = -a + 1 : (a = -a, e = "-"); for (a = "" + a; a.length < b;) a = jc + a; d && (a = a.substr(a.length - b)); return e + a } function X(a, b, d, c, e) {
        d =
        d || 0; return function (f) { f = f["get" + a](); if (0 < d || f > -d) f += d; 0 === f && -12 == d && (f = 12); return Jb(f, b, c, e) }
    } function lb(a, b, d) { return function (c, e) { var f = c["get" + a](), g = vb((d ? "STANDALONE" : "") + (b ? "SHORT" : "") + a); return e[g][f] } } function Fd(a) { var b = (new Date(a, 0, 1)).getDay(); return new Date(a, 0, (4 >= b ? 5 : 12) - b) } function Gd(a) { return function (b) { var d = Fd(b.getFullYear()); b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +d; b = 1 + Math.round(b / 6048E5); return Jb(b, a) } } function kc(a, b) {
        return 0 >= a.getFullYear() ?
        b.ERAS[0] : b.ERAS[1]
    } function zd(a) {
        function b(a) { var b; if (b = a.match(d)) { a = new Date(0); var f = 0, g = 0, h = b[8] ? a.setUTCFullYear : a.setFullYear, k = b[8] ? a.setUTCHours : a.setHours; b[9] && (f = Y(b[9] + b[10]), g = Y(b[9] + b[11])); h.call(a, Y(b[1]), Y(b[2]) - 1, Y(b[3])); f = Y(b[4] || 0) - f; g = Y(b[5] || 0) - g; h = Y(b[6] || 0); b = Math.round(1E3 * parseFloat("0." + (b[7] || 0))); k.call(a, f, g, h, b) } return a } var d = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/; return function (c, d, f) {
            var g = "", h =
            [], k, l; d = d || "mediumDate"; d = a.DATETIME_FORMATS[d] || d; y(c) && (c = ug.test(c) ? Y(c) : b(c)); R(c) && (c = new Date(c)); if (!fa(c) || !isFinite(c.getTime())) return c; for (; d;) (l = vg.exec(d)) ? (h = cb(h, l, 1), d = h.pop()) : (h.push(d), d = null); var m = c.getTimezoneOffset(); f && (m = vc(f, m), c = Rb(c, f, !0)); q(h, function (b) { k = wg[b]; g += k ? k(c, a.DATETIME_FORMATS, m) : "''" === b ? "'" : b.replace(/(^'|'$)/g, "").replace(/''/g, "'") }); return g
        }
    } function ng() { return function (a, b) { z(b) && (b = 2); return db(a, b) } } function og() {
        return function (a, b, d) {
            b = Infinity ===
            Math.abs(Number(b)) ? Number(b) : Y(b); if (isNaN(b)) return a; R(a) && (a = a.toString()); if (!M(a) && !y(a)) return a; d = !d || isNaN(d) ? 0 : Y(d); d = 0 > d ? Math.max(0, a.length + d) : d; return 0 <= b ? a.slice(d, d + b) : 0 === d ? a.slice(b, a.length) : a.slice(Math.max(0, d + b), d)
        }
    } function Bd(a) {
        function b(b, d) {
            d = d ? -1 : 1; return b.map(function (b) {
                var c = 1, h = $a; if (D(b)) h = b; else if (y(b)) { if ("+" == b.charAt(0) || "-" == b.charAt(0)) c = "-" == b.charAt(0) ? -1 : 1, b = b.substring(1); if ("" !== b && (h = a(b), h.constant)) var k = h(), h = function (a) { return a[k] } } return {
                    get: h,
                    descending: c * d
                }
            })
        } function d(a) { switch (typeof a) { case "number": case "boolean": case "string": return !0; default: return !1 } } return function (a, e, f) {
            if (null == a) return a; if (!za(a)) throw O("orderBy")("notarray", a); M(e) || (e = [e]); 0 === e.length && (e = ["+"]); var g = b(e, f); g.push({ get: function () { return {} }, descending: f ? -1 : 1 }); a = Array.prototype.map.call(a, function (a, b) {
                return {
                    value: a, predicateValues: g.map(function (c) {
                        var e = c.get(a); c = typeof e; if (null === e) c = "string", e = "null"; else if ("string" === c) e = e.toLowerCase(); else if ("object" ===
                        c) a: { if ("function" === typeof e.valueOf && (e = e.valueOf(), d(e))) break a; if (rc(e) && (e = e.toString(), d(e))) break a; e = b } return { value: e, type: c }
                    })
                }
            }); a.sort(function (a, b) { for (var c = 0, d = 0, e = g.length; d < e; ++d) { var c = a.predicateValues[d], f = b.predicateValues[d], q = 0; c.type === f.type ? c.value !== f.value && (q = c.value < f.value ? -1 : 1) : q = c.type < f.type ? -1 : 1; if (c = q * g[d].descending) break } return c }); return a = a.map(function (a) { return a.value })
        }
    } function Na(a) { D(a) && (a = { link: a }); a.restrict = a.restrict || "AC"; return da(a) } function Hd(a,
    b, d, c, e) {
        var f = this, g = []; f.$error = {}; f.$$success = {}; f.$pending = u; f.$name = e(b.name || b.ngForm || "")(d); f.$dirty = !1; f.$pristine = !0; f.$valid = !0; f.$invalid = !1; f.$submitted = !1; f.$$parentForm = Kb; f.$rollbackViewValue = function () { q(g, function (a) { a.$rollbackViewValue() }) }; f.$commitViewValue = function () { q(g, function (a) { a.$commitViewValue() }) }; f.$addControl = function (a) { Ta(a.$name, "input"); g.push(a); a.$name && (f[a.$name] = a); a.$$parentForm = f }; f.$$renameControl = function (a, b) {
            var c = a.$name; f[c] === a && delete f[c]; f[b] =
            a; a.$name = b
        }; f.$removeControl = function (a) { a.$name && f[a.$name] === a && delete f[a.$name]; q(f.$pending, function (b, c) { f.$setValidity(c, null, a) }); q(f.$error, function (b, c) { f.$setValidity(c, null, a) }); q(f.$$success, function (b, c) { f.$setValidity(c, null, a) }); bb(g, a); a.$$parentForm = Kb }; Id({ ctrl: this, $element: a, set: function (a, b, c) { var d = a[b]; d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [c] }, unset: function (a, b, c) { var d = a[b]; d && (bb(d, c), 0 === d.length && delete a[b]) }, $animate: c }); f.$setDirty = function () {
            c.removeClass(a, Xa); c.addClass(a,
            Lb); f.$dirty = !0; f.$pristine = !1; f.$$parentForm.$setDirty()
        }; f.$setPristine = function () { c.setClass(a, Xa, Lb + " ng-submitted"); f.$dirty = !1; f.$pristine = !0; f.$submitted = !1; q(g, function (a) { a.$setPristine() }) }; f.$setUntouched = function () { q(g, function (a) { a.$setUntouched() }) }; f.$setSubmitted = function () { c.addClass(a, "ng-submitted"); f.$submitted = !0; f.$$parentForm.$setSubmitted() }
    } function lc(a) { a.$formatters.push(function (b) { return a.$isEmpty(b) ? b : b.toString() }) } function mb(a, b, d, c, e, f) {
        var g = N(b[0].type); if (!e.android) {
            var h =
            !1; b.on("compositionstart", function () { h = !0 }); b.on("compositionend", function () { h = !1; l() })
        } var k, l = function (a) { k && (f.defer.cancel(k), k = null); if (!h) { var e = b.val(); a = a && a.type; "password" === g || d.ngTrim && "false" === d.ngTrim || (e = W(e)); (c.$viewValue !== e || "" === e && c.$$hasNativeValidators) && c.$setViewValue(e, a) } }; if (e.hasEvent("input")) b.on("input", l); else {
            var m = function (a, b, c) { k || (k = f.defer(function () { k = null; b && b.value === c || l(a) })) }; b.on("keydown", function (a) {
                var b = a.keyCode; 91 === b || 15 < b && 19 > b || 37 <= b && 40 >= b ||
                m(a, this, this.value)
            }); if (e.hasEvent("paste")) b.on("paste cut", m)
        } b.on("change", l); if (Jd[g] && c.$$hasNativeValidators && g === d.type) b.on("keydown wheel mousedown", function (a) { if (!k) { var b = this.validity, c = b.badInput, d = b.typeMismatch; k = f.defer(function () { k = null; b.badInput === c && b.typeMismatch === d || l(a) }) } }); c.$render = function () { var a = c.$isEmpty(c.$viewValue) ? "" : c.$viewValue; b.val() !== a && b.val(a) }
    } function Mb(a, b) {
        return function (d, c) {
            var e, f; if (fa(d)) return d; if (y(d)) {
                '"' == d.charAt(0) && '"' == d.charAt(d.length -
                1) && (d = d.substring(1, d.length - 1)); if (xg.test(d)) return new Date(d); a.lastIndex = 0; if (e = a.exec(d)) return e.shift(), f = c ? { yyyy: c.getFullYear(), MM: c.getMonth() + 1, dd: c.getDate(), HH: c.getHours(), mm: c.getMinutes(), ss: c.getSeconds(), sss: c.getMilliseconds() / 1E3 } : { yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0 }, q(e, function (a, c) { c < b.length && (f[b[c]] = +a) }), new Date(f.yyyy, f.MM - 1, f.dd, f.HH, f.mm, f.ss || 0, 1E3 * f.sss || 0)
            } return NaN
        }
    } function nb(a, b, d, c) {
        return function (e, f, g, h, k, l, m) {
            function n(a) {
                return a && !(a.getTime &&
                a.getTime() !== a.getTime())
            } function p(a) { return A(a) && !fa(a) ? d(a) || u : a } Kd(e, f, g, h); mb(e, f, g, h, k, l); var q = h && h.$options && h.$options.timezone, s; h.$$parserName = a; h.$parsers.push(function (a) { return h.$isEmpty(a) ? null : b.test(a) ? (a = d(a, s), q && (a = Rb(a, q)), a) : u }); h.$formatters.push(function (a) { if (a && !fa(a)) throw ob("datefmt", a); if (n(a)) return (s = a) && q && (s = Rb(s, q, !0)), m("date")(a, c, q); s = null; return "" }); if (A(g.min) || g.ngMin) {
                var x; h.$validators.min = function (a) { return !n(a) || z(x) || d(a) >= x }; g.$observe("min", function (a) {
                    x =
                    p(a); h.$validate()
                })
            } if (A(g.max) || g.ngMax) { var r; h.$validators.max = function (a) { return !n(a) || z(r) || d(a) <= r }; g.$observe("max", function (a) { r = p(a); h.$validate() }) }
        }
    } function Kd(a, b, d, c) { (c.$$hasNativeValidators = J(b[0].validity)) && c.$parsers.push(function (a) { var c = b.prop("validity") || {}; return c.badInput || c.typeMismatch ? u : a }) } function Ld(a, b, d, c, e) { if (A(c)) { a = a(c); if (!a.constant) throw ob("constexpr", d, c); return a(b) } return e } function mc(a, b) {
        a = "ngClass" + a; return ["$animate", function (d) {
            function c(a, b) {
                var c =
                [], d = 0; a: for (; d < a.length; d++) { for (var e = a[d], m = 0; m < b.length; m++) if (e == b[m]) continue a; c.push(e) } return c
            } function e(a) { var b = []; return M(a) ? (q(a, function (a) { b = b.concat(e(a)) }), b) : y(a) ? a.split(" ") : J(a) ? (q(a, function (a, c) { a && (b = b.concat(c.split(" "))) }), b) : a } return {
                restrict: "AC", link: function (f, g, h) {
                    function k(a, b) { var c = g.data("$classCounts") || V(), d = []; q(a, function (a) { if (0 < b || c[a]) c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a) }); g.data("$classCounts", c); return d.join(" ") } function l(a) {
                        if (!0 === b || f.$index %
                        2 === b) { var l = e(a || []); if (!m) { var q = k(l, 1); h.$addClass(q) } else if (!na(a, m)) { var s = e(m), q = c(l, s), l = c(s, l), q = k(q, 1), l = k(l, -1); q && q.length && d.addClass(g, q); l && l.length && d.removeClass(g, l) } } m = ia(a)
                    } var m; f.$watch(h[a], l, !0); h.$observe("class", function (b) { l(f.$eval(h[a])) }); "ngClass" !== a && f.$watch("$index", function (c, d) { var g = c & 1; if (g !== (d & 1)) { var l = e(f.$eval(h[a])); g === b ? (g = k(l, 1), h.$addClass(g)) : (g = k(l, -1), h.$removeClass(g)) } })
                }
            }
        }]
    } function Id(a) {
        function b(a, b) {
            b && !f[a] ? (k.addClass(e, a), f[a] = !0) : !b &&
            f[a] && (k.removeClass(e, a), f[a] = !1)
        } function d(a, c) { a = a ? "-" + zc(a, "-") : ""; b(pb + a, !0 === c); b(Md + a, !1 === c) } var c = a.ctrl, e = a.$element, f = {}, g = a.set, h = a.unset, k = a.$animate; f[Md] = !(f[pb] = e.hasClass(pb)); c.$setValidity = function (a, e, f) {
            z(e) ? (c.$pending || (c.$pending = {}), g(c.$pending, a, f)) : (c.$pending && h(c.$pending, a, f), Nd(c.$pending) && (c.$pending = u)); Oa(e) ? e ? (h(c.$error, a, f), g(c.$$success, a, f)) : (g(c.$error, a, f), h(c.$$success, a, f)) : (h(c.$error, a, f), h(c.$$success, a, f)); c.$pending ? (b(Od, !0), c.$valid = c.$invalid =
            u, d("", null)) : (b(Od, !1), c.$valid = Nd(c.$error), c.$invalid = !c.$valid, d("", c.$valid)); e = c.$pending && c.$pending[a] ? u : c.$error[a] ? !1 : c.$$success[a] ? !0 : null; d(a, e); c.$$parentForm.$setValidity(a, e, c)
        }
    } function Nd(a) { if (a) for (var b in a) if (a.hasOwnProperty(b)) return !1; return !0 } var yg = /^\/(.+)\/([a-z]*)$/, va = Object.prototype.hasOwnProperty, N = function (a) { return y(a) ? a.toLowerCase() : a }, vb = function (a) { return y(a) ? a.toUpperCase() : a }, Da, H, $, Aa = [].slice, Yf = [].splice, zg = [].push, ka = Object.prototype.toString, sc = Object.getPrototypeOf,
    Ba = O("ng"), ea = T.angular || (T.angular = {}), Tb, qb = 0; Da = P.documentMode; E.$inject = []; $a.$inject = []; var M = Array.isArray, Zd = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/, W = function (a) { return y(a) ? a.trim() : a }, ud = function (a) { return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") }, Ga = function () {
        if (!A(Ga.rules)) {
            var a = P.querySelector("[ng-csp]") || P.querySelector("[data-ng-csp]"); if (a) {
                var b = a.getAttribute("ng-csp") || a.getAttribute("data-ng-csp");
                Ga.rules = { noUnsafeEval: !b || -1 !== b.indexOf("no-unsafe-eval"), noInlineStyle: !b || -1 !== b.indexOf("no-inline-style") }
            } else { a = Ga; try { new Function(""), b = !1 } catch (d) { b = !0 } a.rules = { noUnsafeEval: b, noInlineStyle: !1 } }
        } return Ga.rules
    }, sb = function () { if (A(sb.name_)) return sb.name_; var a, b, d = Qa.length, c, e; for (b = 0; b < d; ++b) if (c = Qa[b], a = P.querySelector("[" + c.replace(":", "\\:") + "jq]")) { e = a.getAttribute(c + "jq"); break } return sb.name_ = e }, be = /:/g, Qa = ["ng-", "data-ng-", "ng:", "x-ng-"], ge = /[A-Z]/g, Ac = !1, Pa = 3, ke = {
        full: "1.5.3",
        major: 1, minor: 5, dot: 3, codeName: "diplohaplontic-meiosis"
    }; U.expando = "ng339"; var hb = U.cache = {}, Mf = 1; U._data = function (a) { return this.cache[a[this.expando]] || {} }; var Hf = /([\:\-\_]+(.))/g, If = /^moz([A-Z])/, zb = { mouseleave: "mouseout", mouseenter: "mouseover" }, Vb = O("jqLite"), Lf = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Ub = /<|&#?\w+;/, Jf = /<([\w:-]+)/, Kf = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, ha = {
        option: [1, '<select multiple="multiple">', "</select>"], thead: [1, "<table>", "</table>"], col: [2,
        "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""]
    }; ha.optgroup = ha.option; ha.tbody = ha.tfoot = ha.colgroup = ha.caption = ha.thead; ha.th = ha.td; var Rf = Node.prototype.contains || function (a) { return !!(this.compareDocumentPosition(a) & 16) }, Ra = U.prototype = {
        ready: function (a) { function b() { d || (d = !0, a()) } var d = !1; "complete" === P.readyState ? setTimeout(b) : (this.on("DOMContentLoaded", b), U(T).on("load", b)) }, toString: function () {
            var a =
            []; q(this, function (b) { a.push("" + b) }); return "[" + a.join(", ") + "]"
        }, eq: function (a) { return 0 <= a ? H(this[a]) : H(this[this.length + a]) }, length: 0, push: zg, sort: [].sort, splice: [].splice
    }, Eb = {}; q("multiple selected checked disabled readOnly required open".split(" "), function (a) { Eb[N(a)] = a }); var Sc = {}; q("input select option textarea button form details".split(" "), function (a) { Sc[a] = !0 }); var $c = { ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max", ngPattern: "pattern" }; q({
        data: Xb, removeData: gb,
        hasData: function (a) { for (var b in hb[a.ng339]) return !0; return !1 }, cleanData: function (a) { for (var b = 0, d = a.length; b < d; b++) gb(a[b]) }
    }, function (a, b) { U[b] = a }); q({
        data: Xb, inheritedData: Db, scope: function (a) { return H.data(a, "$scope") || Db(a.parentNode || a, ["$isolateScope", "$scope"]) }, isolateScope: function (a) { return H.data(a, "$isolateScope") || H.data(a, "$isolateScopeNoTemplate") }, controller: Pc, injector: function (a) { return Db(a, "$injector") }, removeAttr: function (a, b) { a.removeAttribute(b) }, hasClass: Ab, css: function (a,
        b, d) { b = fb(b); if (A(d)) a.style[b] = d; else return a.style[b] }, attr: function (a, b, d) { var c = a.nodeType; if (c !== Pa && 2 !== c && 8 !== c) if (c = N(b), Eb[c]) if (A(d)) d ? (a[b] = !0, a.setAttribute(b, c)) : (a[b] = !1, a.removeAttribute(c)); else return a[b] || (a.attributes.getNamedItem(b) || E).specified ? c : u; else if (A(d)) a.setAttribute(b, d); else if (a.getAttribute) return a = a.getAttribute(b, 2), null === a ? u : a }, prop: function (a, b, d) { if (A(d)) a[b] = d; else return a[b] }, text: function () {
            function a(a, d) {
                if (z(d)) {
                    var c = a.nodeType; return 1 === c || c ===
                    Pa ? a.textContent : ""
                } a.textContent = d
            } a.$dv = ""; return a
        }(), val: function (a, b) { if (z(b)) { if (a.multiple && "select" === oa(a)) { var d = []; q(a.options, function (a) { a.selected && d.push(a.value || a.text) }); return 0 === d.length ? null : d } return a.value } a.value = b }, html: function (a, b) { if (z(b)) return a.innerHTML; xb(a, !0); a.innerHTML = b }, empty: Qc
    }, function (a, b) {
        U.prototype[b] = function (b, c) {
            var e, f, g = this.length; if (a !== Qc && z(2 == a.length && a !== Ab && a !== Pc ? b : c)) {
                if (J(b)) {
                    for (e = 0; e < g; e++) if (a === Xb) a(this[e], b); else for (f in b) a(this[e],
                    f, b[f]); return this
                } e = a.$dv; g = z(e) ? Math.min(g, 1) : g; for (f = 0; f < g; f++) { var h = a(this[f], b, c); e = e ? e + h : h } return e
            } for (e = 0; e < g; e++) a(this[e], b, c); return this
        }
    }); q({
        removeData: gb, on: function (a, b, d, c) {
            if (A(c)) throw Vb("onargs"); if (Kc(a)) {
                c = yb(a, !0); var e = c.events, f = c.handle; f || (f = c.handle = Of(a, e)); c = 0 <= b.indexOf(" ") ? b.split(" ") : [b]; for (var g = c.length, h = function (b, c, g) { var h = e[b]; h || (h = e[b] = [], h.specialHandlerWrapper = c, "$destroy" === b || g || a.addEventListener(b, f, !1)); h.push(d) }; g--;) b = c[g], zb[b] ? (h(zb[b], Qf),
                h(b, u, !0)) : h(b)
            }
        }, off: Oc, one: function (a, b, d) { a = H(a); a.on(b, function e() { a.off(b, d); a.off(b, e) }); a.on(b, d) }, replaceWith: function (a, b) { var d, c = a.parentNode; xb(a); q(new U(b), function (b) { d ? c.insertBefore(b, d.nextSibling) : c.replaceChild(b, a); d = b }) }, children: function (a) { var b = []; q(a.childNodes, function (a) { 1 === a.nodeType && b.push(a) }); return b }, contents: function (a) { return a.contentDocument || a.childNodes || [] }, append: function (a, b) { var d = a.nodeType; if (1 === d || 11 === d) { b = new U(b); for (var d = 0, c = b.length; d < c; d++) a.appendChild(b[d]) } },
        prepend: function (a, b) { if (1 === a.nodeType) { var d = a.firstChild; q(new U(b), function (b) { a.insertBefore(b, d) }) } }, wrap: function (a, b) { Mc(a, H(b).eq(0).clone()[0]) }, remove: Yb, detach: function (a) { Yb(a, !0) }, after: function (a, b) { var d = a, c = a.parentNode; b = new U(b); for (var e = 0, f = b.length; e < f; e++) { var g = b[e]; c.insertBefore(g, d.nextSibling); d = g } }, addClass: Cb, removeClass: Bb, toggleClass: function (a, b, d) { b && q(b.split(" "), function (b) { var e = d; z(e) && (e = !Ab(a, b)); (e ? Cb : Bb)(a, b) }) }, parent: function (a) {
            return (a = a.parentNode) &&
            11 !== a.nodeType ? a : null
        }, next: function (a) { return a.nextElementSibling }, find: function (a, b) { return a.getElementsByTagName ? a.getElementsByTagName(b) : [] }, clone: Wb, triggerHandler: function (a, b, d) {
            var c, e, f = b.type || b, g = yb(a); if (g = (g = g && g.events) && g[f]) c = {
                preventDefault: function () { this.defaultPrevented = !0 }, isDefaultPrevented: function () { return !0 === this.defaultPrevented }, stopImmediatePropagation: function () { this.immediatePropagationStopped = !0 }, isImmediatePropagationStopped: function () { return !0 === this.immediatePropagationStopped },
                stopPropagation: E, type: f, target: a
            }, b.type && (c = S(c, b)), b = ia(g), e = d ? [c].concat(d) : [c], q(b, function (b) { c.isImmediatePropagationStopped() || b.apply(a, e) })
        }
    }, function (a, b) { U.prototype[b] = function (b, c, e) { for (var f, g = 0, h = this.length; g < h; g++) z(f) ? (f = a(this[g], b, c, e), A(f) && (f = H(f))) : Nc(f, a(this[g], b, c, e)); return A(f) ? f : this }; U.prototype.bind = U.prototype.on; U.prototype.unbind = U.prototype.off }); Ua.prototype = {
        put: function (a, b) { this[Ha(a, this.nextUid)] = b }, get: function (a) { return this[Ha(a, this.nextUid)] }, remove: function (a) {
            var b =
            this[a = Ha(a, this.nextUid)]; delete this[a]; return b
        }
    }; var Ff = [function () { this.$get = [function () { return Ua }] }], Tf = /^([^\(]+?)=>/, Uf = /^[^\(]*\(\s*([^\)]*)\)/m, Ag = /,/, Bg = /^\s*(_?)(\S+?)\1\s*$/, Sf = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, Ia = O("$injector"); eb.$$annotate = function (a, b, d) {
        var c; if ("function" === typeof a) { if (!(c = a.$inject)) { c = []; if (a.length) { if (b) throw y(d) && d || (d = a.name || Vf(a)), Ia("strictdi", d); b = Tc(a); q(b[1].split(Ag), function (a) { a.replace(Bg, function (a, b, d) { c.push(d) }) }) } a.$inject = c } } else M(a) ?
        (b = a.length - 1, Sa(a[b], "fn"), c = a.slice(0, b)) : Sa(a, "fn", !0); return c
    }; var Pd = O("$animate"), Ye = function () { this.$get = E }, Ze = function () {
        var a = new Ua, b = []; this.$get = ["$$AnimateRunner", "$rootScope", function (d, c) {
            function e(a, b, c) { var d = !1; b && (b = y(b) ? b.split(" ") : M(b) ? b : [], q(b, function (b) { b && (d = !0, a[b] = c) })); return d } function f() {
                q(b, function (b) {
                    var c = a.get(b); if (c) {
                        var d = Wf(b.attr("class")), e = "", f = ""; q(c, function (a, b) { a !== !!d[b] && (a ? e += (e.length ? " " : "") + b : f += (f.length ? " " : "") + b) }); q(b, function (a) {
                            e && Cb(a,
                            e); f && Bb(a, f)
                        }); a.remove(b)
                    }
                }); b.length = 0
            } return { enabled: E, on: E, off: E, pin: E, push: function (g, h, k, l) { l && l(); k = k || {}; k.from && g.css(k.from); k.to && g.css(k.to); if (k.addClass || k.removeClass) if (h = k.addClass, l = k.removeClass, k = a.get(g) || {}, h = e(k, h, !0), l = e(k, l, !1), h || l) a.put(g, k), b.push(g), 1 === b.length && c.$$postDigest(f); g = new d; g.complete(); return g } }
        }]
    }, We = ["$provide", function (a) {
        var b = this; this.$$registeredAnimations = Object.create(null); this.register = function (d, c) {
            if (d && "." !== d.charAt(0)) throw Pd("notcsel",
            d); var e = d + "-animation"; b.$$registeredAnimations[d.substr(1)] = e; a.factory(e, c)
        }; this.classNameFilter = function (a) { if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString())) throw Pd("nongcls", "ng-animate"); return this.$$classNameFilter }; this.$get = ["$$animateQueue", function (a) {
            function b(a, c, d) {
                if (d) {
                    var h; a: { for (h = 0; h < d.length; h++) { var k = d[h]; if (1 === k.nodeType) { h = k; break a } } h = void 0 } !h || h.parentNode || h.previousElementSibling ||
                    (d = null)
                } d ? d.after(a) : c.prepend(a)
            } return {
                on: a.on, off: a.off, pin: a.pin, enabled: a.enabled, cancel: function (a) { a.end && a.end() }, enter: function (e, f, g, h) { f = f && H(f); g = g && H(g); f = f || g.parent(); b(e, f, g); return a.push(e, "enter", Ja(h)) }, move: function (e, f, g, h) { f = f && H(f); g = g && H(g); f = f || g.parent(); b(e, f, g); return a.push(e, "move", Ja(h)) }, leave: function (b, c) { return a.push(b, "leave", Ja(c), function () { b.remove() }) }, addClass: function (b, c, g) { g = Ja(g); g.addClass = ib(g.addclass, c); return a.push(b, "addClass", g) }, removeClass: function (b,
                c, g) { g = Ja(g); g.removeClass = ib(g.removeClass, c); return a.push(b, "removeClass", g) }, setClass: function (b, c, g, h) { h = Ja(h); h.addClass = ib(h.addClass, c); h.removeClass = ib(h.removeClass, g); return a.push(b, "setClass", h) }, animate: function (b, c, g, h, k) { k = Ja(k); k.from = k.from ? S(k.from, c) : c; k.to = k.to ? S(k.to, g) : g; k.tempClasses = ib(k.tempClasses, h || "ng-inline-animate"); return a.push(b, "animate", k) }
            }
        }]
    }], af = function () {
        this.$get = ["$$rAF", function (a) {
            function b(b) {
                d.push(b); 1 < d.length || a(function () {
                    for (var a = 0; a < d.length; a++) d[a]();
                    d = []
                })
            } var d = []; return function () { var a = !1; b(function () { a = !0 }); return function (d) { a ? d() : b(d) } }
        }]
    }, $e = function () {
        this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function (a, b, d, c, e) {
            function f(a) { this.setHost(a); var b = d(); this._doneCallbacks = []; this._tick = function (a) { var d = c[0]; d && d.hidden ? e(a, 0, !1) : b(a) }; this._state = 0 } f.chain = function (a, b) { function c() { if (d === a.length) b(!0); else a[d](function (a) { !1 === a ? b(!1) : (d++, c()) }) } var d = 0; c() }; f.all = function (a, b) {
                function c(f) {
                    e = e && f; ++d ===
                    a.length && b(e)
                } var d = 0, e = !0; q(a, function (a) { a.done(c) })
            }; f.prototype = {
                setHost: function (a) { this.host = a || {} }, done: function (a) { 2 === this._state ? a() : this._doneCallbacks.push(a) }, progress: E, getPromise: function () { if (!this.promise) { var b = this; this.promise = a(function (a, c) { b.done(function (b) { !1 === b ? c() : a() }) }) } return this.promise }, then: function (a, b) { return this.getPromise().then(a, b) }, "catch": function (a) { return this.getPromise()["catch"](a) }, "finally": function (a) { return this.getPromise()["finally"](a) }, pause: function () {
                    this.host.pause &&
                    this.host.pause()
                }, resume: function () { this.host.resume && this.host.resume() }, end: function () { this.host.end && this.host.end(); this._resolve(!0) }, cancel: function () { this.host.cancel && this.host.cancel(); this._resolve(!1) }, complete: function (a) { var b = this; 0 === b._state && (b._state = 1, b._tick(function () { b._resolve(a) })) }, _resolve: function (a) { 2 !== this._state && (q(this._doneCallbacks, function (b) { b(a) }), this._doneCallbacks.length = 0, this._state = 2) }
            }; return f
        }]
    }, Xe = function () {
        this.$get = ["$$rAF", "$q", "$$AnimateRunner",
        function (a, b, d) { return function (b, e) { function f() { a(function () { g.addClass && (b.addClass(g.addClass), g.addClass = null); g.removeClass && (b.removeClass(g.removeClass), g.removeClass = null); g.to && (b.css(g.to), g.to = null); h || k.complete(); h = !0 }); return k } var g = e || {}; g.$$prepared || (g = pa(g)); g.cleanupStyles && (g.from = g.to = null); g.from && (b.css(g.from), g.from = null); var h, k = new d; return { start: f, end: f } } }]
    }, ga = O("$compile"); Cc.$inject = ["$provide", "$$sanitizeUriProvider"]; var Vc = /^((?:x|data)[\:\-_])/i, Zf = O("$controller"),
    ad = /^(\S+)(\s+as\s+([\w$]+))?$/, gf = function () { this.$get = ["$document", function (a) { return function (b) { b ? !b.nodeType && b instanceof H && (b = b[0]) : b = a[0].body; return b.offsetWidth + 1 } }] }, bd = "application/json", bc = { "Content-Type": bd + ";charset=utf-8" }, ag = /^\[|^\{(?!\{)/, bg = { "[": /]$/, "{": /}$/ }, $f = /^\)\]\}',?\n/, Cg = O("$http"), fd = function (a) { return function () { throw Cg("legacy", a); } }, La = ea.$interpolateMinErr = O("$interpolate"); La.throwNoconcat = function (a) { throw La("noconcat", a); }; La.interr = function (a, b) {
        return La("interr",
        a, b.toString())
    }; var Dg = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, dg = { http: 80, https: 443, ftp: 21 }, Fb = O("$location"), Eg = {
        $$html5: !1, $$replace: !1, absUrl: Gb("$$absUrl"), url: function (a) { if (z(a)) return this.$$url; var b = Dg.exec(a); (b[1] || "" === a) && this.path(decodeURIComponent(b[1])); (b[2] || b[1] || "" === a) && this.search(b[3] || ""); this.hash(b[5] || ""); return this }, protocol: Gb("$$protocol"), host: Gb("$$host"), port: Gb("$$port"), path: kd("$$path", function (a) { a = null !== a ? a.toString() : ""; return "/" == a.charAt(0) ? a : "/" + a }), search: function (a,
        b) { switch (arguments.length) { case 0: return this.$$search; case 1: if (y(a) || R(a)) a = a.toString(), this.$$search = xc(a); else if (J(a)) a = pa(a, {}), q(a, function (b, c) { null == b && delete a[c] }), this.$$search = a; else throw Fb("isrcharg"); break; default: z(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b } this.$$compose(); return this }, hash: kd("$$hash", function (a) { return null !== a ? a.toString() : "" }), replace: function () { this.$$replace = !0; return this }
    }; q([jd, ec, dc], function (a) {
        a.prototype = Object.create(Eg); a.prototype.state =
        function (b) { if (!arguments.length) return this.$$state; if (a !== dc || !this.$$html5) throw Fb("nostate"); this.$$state = z(b) ? null : b; return this }
    }); var ca = O("$parse"), fg = Function.prototype.call, gg = Function.prototype.apply, hg = Function.prototype.bind, Nb = V(); q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (a) { Nb[a] = !0 }); var Fg = { n: "\n", f: "\f", r: "\r", t: "\t", v: "\v", "'": "'", '"': '"' }, gc = function (a) { this.options = a }; gc.prototype = {
        constructor: gc, lex: function (a) {
            this.text = a; this.index = 0; for (this.tokens =
            []; this.index < this.text.length;) if (a = this.text.charAt(this.index), '"' === a || "'" === a) this.readString(a); else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(a)) this.readIdent(); else if (this.is(a, "(){}[].,;:?")) this.tokens.push({ index: this.index, text: a }), this.index++; else if (this.isWhitespace(a)) this.index++; else {
                var b = a + this.peek(), d = b + this.peek(2), c = Nb[b], e = Nb[d]; Nb[a] || c || e ? (a = e ? d : c ? b : a, this.tokens.push({ index: this.index, text: a, operator: !0 }), this.index +=
                a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1)
            } return this.tokens
        }, is: function (a, b) { return -1 !== b.indexOf(a) }, peek: function (a) { a = a || 1; return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1 }, isNumber: function (a) { return "0" <= a && "9" >= a && "string" === typeof a }, isWhitespace: function (a) { return " " === a || "\r" === a || "\t" === a || "\n" === a || "\v" === a || "\u00a0" === a }, isIdent: function (a) { return "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "_" === a || "$" === a }, isExpOperator: function (a) {
            return "-" ===
            a || "+" === a || this.isNumber(a)
        }, throwError: function (a, b, d) { d = d || this.index; b = A(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, d) + "]" : " " + d; throw ca("lexerr", a, b, this.text); }, readNumber: function () {
            for (var a = "", b = this.index; this.index < this.text.length;) {
                var d = N(this.text.charAt(this.index)); if ("." == d || this.isNumber(d)) a += d; else {
                    var c = this.peek(); if ("e" == d && this.isExpOperator(c)) a += d; else if (this.isExpOperator(d) && c && this.isNumber(c) && "e" == a.charAt(a.length - 1)) a += d; else if (!this.isExpOperator(d) ||
                    c && this.isNumber(c) || "e" != a.charAt(a.length - 1)) break; else this.throwError("Invalid exponent")
                } this.index++
            } this.tokens.push({ index: b, text: a, constant: !0, value: Number(a) })
        }, readIdent: function () { for (var a = this.index; this.index < this.text.length;) { var b = this.text.charAt(this.index); if (!this.isIdent(b) && !this.isNumber(b)) break; this.index++ } this.tokens.push({ index: a, text: this.text.slice(a, this.index), identifier: !0 }) }, readString: function (a) {
            var b = this.index; this.index++; for (var d = "", c = a, e = !1; this.index < this.text.length;) {
                var f =
                this.text.charAt(this.index), c = c + f; if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), this.index += 4, d += String.fromCharCode(parseInt(e, 16))) : d += Fg[f] || f, e = !1; else if ("\\" === f) e = !0; else { if (f === a) { this.index++; this.tokens.push({ index: b, text: c, constant: !0, value: d }); return } d += f } this.index++
            } this.throwError("Unterminated quote", b)
        }
    }; var s = function (a, b) { this.lexer = a; this.options = b }; s.Program = "Program"; s.ExpressionStatement =
    "ExpressionStatement"; s.AssignmentExpression = "AssignmentExpression"; s.ConditionalExpression = "ConditionalExpression"; s.LogicalExpression = "LogicalExpression"; s.BinaryExpression = "BinaryExpression"; s.UnaryExpression = "UnaryExpression"; s.CallExpression = "CallExpression"; s.MemberExpression = "MemberExpression"; s.Identifier = "Identifier"; s.Literal = "Literal"; s.ArrayExpression = "ArrayExpression"; s.Property = "Property"; s.ObjectExpression = "ObjectExpression"; s.ThisExpression = "ThisExpression"; s.LocalsExpression = "LocalsExpression";
    s.NGValueParameter = "NGValueParameter"; s.prototype = {
        ast: function (a) { this.text = a; this.tokens = this.lexer.lex(a); a = this.program(); 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]); return a }, program: function () { for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), !this.expect(";")) return { type: s.Program, body: a } }, expressionStatement: function () { return { type: s.ExpressionStatement, expression: this.filterChain() } }, filterChain: function () {
            for (var a =
            this.expression() ; this.expect("|") ;) a = this.filter(a); return a
        }, expression: function () { return this.assignment() }, assignment: function () { var a = this.ternary(); this.expect("=") && (a = { type: s.AssignmentExpression, left: a, right: this.assignment(), operator: "=" }); return a }, ternary: function () { var a = this.logicalOR(), b, d; return this.expect("?") && (b = this.expression(), this.consume(":")) ? (d = this.expression(), { type: s.ConditionalExpression, test: a, alternate: b, consequent: d }) : a }, logicalOR: function () {
            for (var a = this.logicalAND() ; this.expect("||") ;) a =
            { type: s.LogicalExpression, operator: "||", left: a, right: this.logicalAND() }; return a
        }, logicalAND: function () { for (var a = this.equality() ; this.expect("&&") ;) a = { type: s.LogicalExpression, operator: "&&", left: a, right: this.equality() }; return a }, equality: function () { for (var a = this.relational(), b; b = this.expect("==", "!=", "===", "!==") ;) a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.relational() }; return a }, relational: function () {
            for (var a = this.additive(), b; b = this.expect("<", ">", "<=", ">=") ;) a = {
                type: s.BinaryExpression,
                operator: b.text, left: a, right: this.additive()
            }; return a
        }, additive: function () { for (var a = this.multiplicative(), b; b = this.expect("+", "-") ;) a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.multiplicative() }; return a }, multiplicative: function () { for (var a = this.unary(), b; b = this.expect("*", "/", "%") ;) a = { type: s.BinaryExpression, operator: b.text, left: a, right: this.unary() }; return a }, unary: function () {
            var a; return (a = this.expect("+", "-", "!")) ? { type: s.UnaryExpression, operator: a.text, prefix: !0, argument: this.unary() } :
            this.primary()
        }, primary: function () {
            var a; this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? a = pa(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? a = { type: s.Literal, value: this.options.literals[this.consume().text] } : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression",
            this.peek()); for (var b; b = this.expect("(", "[", ".") ;) "(" === b.text ? (a = { type: s.CallExpression, callee: a, arguments: this.parseArguments() }, this.consume(")")) : "[" === b.text ? (a = { type: s.MemberExpression, object: a, property: this.expression(), computed: !0 }, this.consume("]")) : "." === b.text ? a = { type: s.MemberExpression, object: a, property: this.identifier(), computed: !1 } : this.throwError("IMPOSSIBLE"); return a
        }, filter: function (a) {
            a = [a]; for (var b = { type: s.CallExpression, callee: this.identifier(), arguments: a, filter: !0 }; this.expect(":") ;) a.push(this.expression());
            return b
        }, parseArguments: function () { var a = []; if (")" !== this.peekToken().text) { do a.push(this.expression()); while (this.expect(",")) } return a }, identifier: function () { var a = this.consume(); a.identifier || this.throwError("is not a valid identifier", a); return { type: s.Identifier, name: a.text } }, constant: function () { return { type: s.Literal, value: this.consume().value } }, arrayDeclaration: function () {
            var a = []; if ("]" !== this.peekToken().text) { do { if (this.peek("]")) break; a.push(this.expression()) } while (this.expect(",")) } this.consume("]");
            return { type: s.ArrayExpression, elements: a }
        }, object: function () { var a = [], b; if ("}" !== this.peekToken().text) { do { if (this.peek("}")) break; b = { type: s.Property, kind: "init" }; this.peek().constant ? b.key = this.constant() : this.peek().identifier ? b.key = this.identifier() : this.throwError("invalid key", this.peek()); this.consume(":"); b.value = this.expression(); a.push(b) } while (this.expect(",")) } this.consume("}"); return { type: s.ObjectExpression, properties: a } }, throwError: function (a, b) {
            throw ca("syntax", b.text, a, b.index + 1, this.text,
            this.text.substring(b.index));
        }, consume: function (a) { if (0 === this.tokens.length) throw ca("ueoe", this.text); var b = this.expect(a); b || this.throwError("is unexpected, expecting [" + a + "]", this.peek()); return b }, peekToken: function () { if (0 === this.tokens.length) throw ca("ueoe", this.text); return this.tokens[0] }, peek: function (a, b, d, c) { return this.peekAhead(0, a, b, d, c) }, peekAhead: function (a, b, d, c, e) { if (this.tokens.length > a) { a = this.tokens[a]; var f = a.text; if (f === b || f === d || f === c || f === e || !(b || d || c || e)) return a } return !1 },
        expect: function (a, b, d, c) { return (a = this.peek(a, b, d, c)) ? (this.tokens.shift(), a) : !1 }, selfReferential: { "this": { type: s.ThisExpression }, $locals: { type: s.LocalsExpression } }
    }; rd.prototype = {
        compile: function (a, b) {
            var d = this, c = this.astBuilder.ast(a); this.state = { nextId: 0, filters: {}, expensiveChecks: b, fn: { vars: [], body: [], own: {} }, assign: { vars: [], body: [], own: {} }, inputs: [] }; aa(c, d.$filter); var e = "", f; this.stage = "assign"; if (f = pd(c)) this.state.computing = "assign", e = this.nextId(), this.recurse(f, e), this.return_(e), e = "fn.assign=" +
            this.generateFunction("assign", "s,v,l"); f = nd(c.body); d.stage = "inputs"; q(f, function (a, b) { var c = "fn" + b; d.state[c] = { vars: [], body: [], own: {} }; d.state.computing = c; var e = d.nextId(); d.recurse(a, e); d.return_(e); d.state.inputs.push(c); a.watchId = b }); this.state.computing = "fn"; this.stage = "main"; this.recurse(c); e = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + e + this.watchFns() + "return fn;"; e = (new Function("$filter", "ensureSafeMemberName", "ensureSafeObject",
            "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", e))(this.$filter, Wa, ta, ld, eg, Hb, ig, md, a); this.state = this.stage = u; e.literal = qd(c); e.constant = c.constant; return e
        }, USE: "use", STRICT: "strict", watchFns: function () { var a = [], b = this.state.inputs, d = this; q(b, function (b) { a.push("var " + b + "=" + d.generateFunction(b, "s")) }); b.length && a.push("fn.inputs=[" + b.join(",") + "];"); return a.join("") }, generateFunction: function (a, b) {
            return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) +
            "};"
        }, filterPrefix: function () { var a = [], b = this; q(this.state.filters, function (d, c) { a.push(d + "=$filter(" + b.escape(c) + ")") }); return a.length ? "var " + a.join(",") + ";" : "" }, varsPrefix: function (a) { return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : "" }, body: function (a) { return this.state[a].body.join("") }, recurse: function (a, b, d, c, e, f) {
            var g, h, k = this, l, m; c = c || E; if (!f && A(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d,
            c, e, !0)); else switch (a.type) {
                case s.Program: q(a.body, function (b, c) { k.recurse(b.expression, u, u, function (a) { h = a }); c !== a.body.length - 1 ? k.current().body.push(h, ";") : k.return_(h) }); break; case s.Literal: m = this.escape(a.value); this.assign(b, m); c(m); break; case s.UnaryExpression: this.recurse(a.argument, u, u, function (a) { h = a }); m = a.operator + "(" + this.ifDefined(h, 0) + ")"; this.assign(b, m); c(m); break; case s.BinaryExpression: this.recurse(a.left, u, u, function (a) { g = a }); this.recurse(a.right, u, u, function (a) { h = a }); m = "+" ===
                a.operator ? this.plus(g, h) : "-" === a.operator ? this.ifDefined(g, 0) + a.operator + this.ifDefined(h, 0) : "(" + g + ")" + a.operator + "(" + h + ")"; this.assign(b, m); c(m); break; case s.LogicalExpression: b = b || this.nextId(); k.recurse(a.left, b); k.if_("&&" === a.operator ? b : k.not(b), k.lazyRecurse(a.right, b)); c(b); break; case s.ConditionalExpression: b = b || this.nextId(); k.recurse(a.test, b); k.if_(b, k.lazyRecurse(a.alternate, b), k.lazyRecurse(a.consequent, b)); c(b); break; case s.Identifier: b = b || this.nextId(); d && (d.context = "inputs" === k.stage ?
                "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), d.computed = !1, d.name = a.name); Wa(a.name); k.if_("inputs" === k.stage || k.not(k.getHasOwnProperty("l", a.name)), function () { k.if_("inputs" === k.stage || "s", function () { e && 1 !== e && k.if_(k.not(k.nonComputedMember("s", a.name)), k.lazyAssign(k.nonComputedMember("s", a.name), "{}")); k.assign(b, k.nonComputedMember("s", a.name)) }) }, b && k.lazyAssign(b, k.nonComputedMember("l", a.name))); (k.state.expensiveChecks || Ib(a.name)) && k.addEnsureSafeObject(b); c(b);
                    break; case s.MemberExpression: g = d && (d.context = this.nextId()) || this.nextId(); b = b || this.nextId(); k.recurse(a.object, g, u, function () {
                        k.if_(k.notNull(g), function () {
                            e && 1 !== e && k.addEnsureSafeAssignContext(g); if (a.computed) h = k.nextId(), k.recurse(a.property, h), k.getStringValue(h), k.addEnsureSafeMemberName(h), e && 1 !== e && k.if_(k.not(k.computedMember(g, h)), k.lazyAssign(k.computedMember(g, h), "{}")), m = k.ensureSafeObject(k.computedMember(g, h)), k.assign(b, m), d && (d.computed = !0, d.name = h); else {
                                Wa(a.property.name); e &&
                                1 !== e && k.if_(k.not(k.nonComputedMember(g, a.property.name)), k.lazyAssign(k.nonComputedMember(g, a.property.name), "{}")); m = k.nonComputedMember(g, a.property.name); if (k.state.expensiveChecks || Ib(a.property.name)) m = k.ensureSafeObject(m); k.assign(b, m); d && (d.computed = !1, d.name = a.property.name)
                            }
                        }, function () { k.assign(b, "undefined") }); c(b)
                    }, !!e); break; case s.CallExpression: b = b || this.nextId(); a.filter ? (h = k.filter(a.callee.name), l = [], q(a.arguments, function (a) { var b = k.nextId(); k.recurse(a, b); l.push(b) }), m = h + "(" +
                    l.join(",") + ")", k.assign(b, m), c(b)) : (h = k.nextId(), g = {}, l = [], k.recurse(a.callee, h, g, function () { k.if_(k.notNull(h), function () { k.addEnsureSafeFunction(h); q(a.arguments, function (a) { k.recurse(a, k.nextId(), u, function (a) { l.push(k.ensureSafeObject(a)) }) }); g.name ? (k.state.expensiveChecks || k.addEnsureSafeObject(g.context), m = k.member(g.context, g.name, g.computed) + "(" + l.join(",") + ")") : m = h + "(" + l.join(",") + ")"; m = k.ensureSafeObject(m); k.assign(b, m) }, function () { k.assign(b, "undefined") }); c(b) })); break; case s.AssignmentExpression: h =
                    this.nextId(); g = {}; if (!od(a.left)) throw ca("lval"); this.recurse(a.left, u, g, function () { k.if_(k.notNull(g.context), function () { k.recurse(a.right, h); k.addEnsureSafeObject(k.member(g.context, g.name, g.computed)); k.addEnsureSafeAssignContext(g.context); m = k.member(g.context, g.name, g.computed) + a.operator + h; k.assign(b, m); c(b || m) }) }, 1); break; case s.ArrayExpression: l = []; q(a.elements, function (a) { k.recurse(a, k.nextId(), u, function (a) { l.push(a) }) }); m = "[" + l.join(",") + "]"; this.assign(b, m); c(m); break; case s.ObjectExpression: l =
                    []; q(a.properties, function (a) { k.recurse(a.value, k.nextId(), u, function (b) { l.push(k.escape(a.key.type === s.Identifier ? a.key.name : "" + a.key.value) + ":" + b) }) }); m = "{" + l.join(",") + "}"; this.assign(b, m); c(m); break; case s.ThisExpression: this.assign(b, "s"); c("s"); break; case s.LocalsExpression: this.assign(b, "l"); c("l"); break; case s.NGValueParameter: this.assign(b, "v"), c("v")
            }
        }, getHasOwnProperty: function (a, b) {
            var d = a + "." + b, c = this.current().own; c.hasOwnProperty(d) || (c[d] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " +
            a + ")")); return c[d]
        }, assign: function (a, b) { if (a) return this.current().body.push(a, "=", b, ";"), a }, filter: function (a) { this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0)); return this.state.filters[a] }, ifDefined: function (a, b) { return "ifDefined(" + a + "," + this.escape(b) + ")" }, plus: function (a, b) { return "plus(" + a + "," + b + ")" }, return_: function (a) { this.current().body.push("return ", a, ";") }, if_: function (a, b, d) {
            if (!0 === a) b(); else {
                var c = this.current().body; c.push("if(", a, "){"); b(); c.push("}");
                d && (c.push("else{"), d(), c.push("}"))
            }
        }, not: function (a) { return "!(" + a + ")" }, notNull: function (a) { return a + "!=null" }, nonComputedMember: function (a, b) { return a + "." + b }, computedMember: function (a, b) { return a + "[" + b + "]" }, member: function (a, b, d) { return d ? this.computedMember(a, b) : this.nonComputedMember(a, b) }, addEnsureSafeObject: function (a) { this.current().body.push(this.ensureSafeObject(a), ";") }, addEnsureSafeMemberName: function (a) { this.current().body.push(this.ensureSafeMemberName(a), ";") }, addEnsureSafeFunction: function (a) {
            this.current().body.push(this.ensureSafeFunction(a),
            ";")
        }, addEnsureSafeAssignContext: function (a) { this.current().body.push(this.ensureSafeAssignContext(a), ";") }, ensureSafeObject: function (a) { return "ensureSafeObject(" + a + ",text)" }, ensureSafeMemberName: function (a) { return "ensureSafeMemberName(" + a + ",text)" }, ensureSafeFunction: function (a) { return "ensureSafeFunction(" + a + ",text)" }, getStringValue: function (a) { this.assign(a, "getStringValue(" + a + ")") }, ensureSafeAssignContext: function (a) { return "ensureSafeAssignContext(" + a + ",text)" }, lazyRecurse: function (a, b, d, c, e, f) {
            var g =
            this; return function () { g.recurse(a, b, d, c, e, f) }
        }, lazyAssign: function (a, b) { var d = this; return function () { d.assign(a, b) } }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }, escape: function (a) { if (y(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'"; if (R(a)) return a.toString(); if (!0 === a) return "true"; if (!1 === a) return "false"; if (null === a) return "null"; if ("undefined" === typeof a) return "undefined"; throw ca("esc"); }, nextId: function (a,
        b) { var d = "v" + this.state.nextId++; a || this.current().vars.push(d + (b ? "=" + b : "")); return d }, current: function () { return this.state[this.state.computing] }
    }; sd.prototype = {
        compile: function (a, b) {
            var d = this, c = this.astBuilder.ast(a); this.expression = a; this.expensiveChecks = b; aa(c, d.$filter); var e, f; if (e = pd(c)) f = this.recurse(e); e = nd(c.body); var g; e && (g = [], q(e, function (a, b) { var c = d.recurse(a); a.input = c; g.push(c); a.watchId = b })); var h = []; q(c.body, function (a) { h.push(d.recurse(a.expression)) }); e = 0 === c.body.length ? E : 1 ===
            c.body.length ? h[0] : function (a, b) { var c; q(h, function (d) { c = d(a, b) }); return c }; f && (e.assign = function (a, b, c) { return f(a, c, b) }); g && (e.inputs = g); e.literal = qd(c); e.constant = c.constant; return e
        }, recurse: function (a, b, d) {
            var c, e, f = this, g; if (a.input) return this.inputs(a.input, a.watchId); switch (a.type) {
                case s.Literal: return this.value(a.value, b); case s.UnaryExpression: return e = this.recurse(a.argument), this["unary" + a.operator](e, b); case s.BinaryExpression: return c = this.recurse(a.left), e = this.recurse(a.right),
                this["binary" + a.operator](c, e, b); case s.LogicalExpression: return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b); case s.ConditionalExpression: return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b); case s.Identifier: return Wa(a.name, f.expression), f.identifier(a.name, f.expensiveChecks || Ib(a.name), b, d, f.expression); case s.MemberExpression: return c = this.recurse(a.object, !1, !!d), a.computed || (Wa(a.property.name, f.expression),
                e = a.property.name), a.computed && (e = this.recurse(a.property)), a.computed ? this.computedMember(c, e, b, d, f.expression) : this.nonComputedMember(c, e, f.expensiveChecks, b, d, f.expression); case s.CallExpression: return g = [], q(a.arguments, function (a) { g.push(f.recurse(a)) }), a.filter && (e = this.$filter(a.callee.name)), a.filter || (e = this.recurse(a.callee, !0)), a.filter ? function (a, c, d, f) { for (var n = [], p = 0; p < g.length; ++p) n.push(g[p](a, c, d, f)); a = e.apply(u, n, f); return b ? { context: u, name: u, value: a } : a } : function (a, c, d, m) {
                    var n =
                    e(a, c, d, m), p; if (null != n.value) { ta(n.context, f.expression); ld(n.value, f.expression); p = []; for (var q = 0; q < g.length; ++q) p.push(ta(g[q](a, c, d, m), f.expression)); p = ta(n.value.apply(n.context, p), f.expression) } return b ? { value: p } : p
                }; case s.AssignmentExpression: return c = this.recurse(a.left, !0, 1), e = this.recurse(a.right), function (a, d, g, m) { var n = c(a, d, g, m); a = e(a, d, g, m); ta(n.value, f.expression); Hb(n.context); n.context[n.name] = a; return b ? { value: a } : a }; case s.ArrayExpression: return g = [], q(a.elements, function (a) { g.push(f.recurse(a)) }),
                function (a, c, d, e) { for (var f = [], p = 0; p < g.length; ++p) f.push(g[p](a, c, d, e)); return b ? { value: f } : f }; case s.ObjectExpression: return g = [], q(a.properties, function (a) { g.push({ key: a.key.type === s.Identifier ? a.key.name : "" + a.key.value, value: f.recurse(a.value) }) }), function (a, c, d, e) { for (var f = {}, p = 0; p < g.length; ++p) f[g[p].key] = g[p].value(a, c, d, e); return b ? { value: f } : f }; case s.ThisExpression: return function (a) { return b ? { value: a } : a }; case s.LocalsExpression: return function (a, c) { return b ? { value: c } : c }; case s.NGValueParameter: return function (a,
                c, d) { return b ? { value: d } : d }
            }
        }, "unary+": function (a, b) { return function (d, c, e, f) { d = a(d, c, e, f); d = A(d) ? +d : 0; return b ? { value: d } : d } }, "unary-": function (a, b) { return function (d, c, e, f) { d = a(d, c, e, f); d = A(d) ? -d : 0; return b ? { value: d } : d } }, "unary!": function (a, b) { return function (d, c, e, f) { d = !a(d, c, e, f); return b ? { value: d } : d } }, "binary+": function (a, b, d) { return function (c, e, f, g) { var h = a(c, e, f, g); c = b(c, e, f, g); h = md(h, c); return d ? { value: h } : h } }, "binary-": function (a, b, d) {
            return function (c, e, f, g) {
                var h = a(c, e, f, g); c = b(c, e, f, g);
                h = (A(h) ? h : 0) - (A(c) ? c : 0); return d ? { value: h } : h
            }
        }, "binary*": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) * b(c, e, f, g); return d ? { value: c } : c } }, "binary/": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) / b(c, e, f, g); return d ? { value: c } : c } }, "binary%": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) % b(c, e, f, g); return d ? { value: c } : c } }, "binary===": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) === b(c, e, f, g); return d ? { value: c } : c } }, "binary!==": function (a, b, d) {
            return function (c, e, f, g) {
                c = a(c,
                e, f, g) !== b(c, e, f, g); return d ? { value: c } : c
            }
        }, "binary==": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) == b(c, e, f, g); return d ? { value: c } : c } }, "binary!=": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) != b(c, e, f, g); return d ? { value: c } : c } }, "binary<": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) < b(c, e, f, g); return d ? { value: c } : c } }, "binary>": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) > b(c, e, f, g); return d ? { value: c } : c } }, "binary<=": function (a, b, d) {
            return function (c, e, f, g) {
                c = a(c, e, f,
                g) <= b(c, e, f, g); return d ? { value: c } : c
            }
        }, "binary>=": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) >= b(c, e, f, g); return d ? { value: c } : c } }, "binary&&": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) && b(c, e, f, g); return d ? { value: c } : c } }, "binary||": function (a, b, d) { return function (c, e, f, g) { c = a(c, e, f, g) || b(c, e, f, g); return d ? { value: c } : c } }, "ternary?:": function (a, b, d, c) { return function (e, f, g, h) { e = a(e, f, g, h) ? b(e, f, g, h) : d(e, f, g, h); return c ? { value: e } : e } }, value: function (a, b) {
            return function () {
                return b ? {
                    context: u,
                    name: u, value: a
                } : a
            }
        }, identifier: function (a, b, d, c, e) { return function (f, g, h, k) { f = g && a in g ? g : f; c && 1 !== c && f && !f[a] && (f[a] = {}); g = f ? f[a] : u; b && ta(g, e); return d ? { context: f, name: a, value: g } : g } }, computedMember: function (a, b, d, c, e) { return function (f, g, h, k) { var l = a(f, g, h, k), m, n; null != l && (m = b(f, g, h, k), m += "", Wa(m, e), c && 1 !== c && (Hb(l), l && !l[m] && (l[m] = {})), n = l[m], ta(n, e)); return d ? { context: l, name: m, value: n } : n } }, nonComputedMember: function (a, b, d, c, e, f) {
            return function (g, h, k, l) {
                g = a(g, h, k, l); e && 1 !== e && (Hb(g), g && !g[b] &&
                (g[b] = {})); h = null != g ? g[b] : u; (d || Ib(b)) && ta(h, f); return c ? { context: g, name: b, value: h } : h
            }
        }, inputs: function (a, b) { return function (d, c, e, f) { return f ? f[b] : a(d, c, e) } }
    }; var hc = function (a, b, d) { this.lexer = a; this.$filter = b; this.options = d; this.ast = new s(a, d); this.astCompiler = d.csp ? new sd(this.ast, b) : new rd(this.ast, b) }; hc.prototype = { constructor: hc, parse: function (a) { return this.astCompiler.compile(a, this.options.expensiveChecks) } }; var jg = Object.prototype.valueOf, ua = O("$sce"), ma = {
        HTML: "html", CSS: "css", URL: "url",
        RESOURCE_URL: "resourceUrl", JS: "js"
    }, lg = O("$compile"), Z = P.createElement("a"), wd = sa(T.location.href); xd.$inject = ["$document"]; Jc.$inject = ["$provide"]; var Ed = 22, Dd = ".", jc = "0"; yd.$inject = ["$locale"]; Ad.$inject = ["$locale"]; var wg = {
        yyyy: X("FullYear", 4, 0, !1, !0), yy: X("FullYear", 2, 0, !0, !0), y: X("FullYear", 1, 0, !1, !0), MMMM: lb("Month"), MMM: lb("Month", !0), MM: X("Month", 2, 1), M: X("Month", 1, 1), LLLL: lb("Month", !1, !0), dd: X("Date", 2), d: X("Date", 1), HH: X("Hours", 2), H: X("Hours", 1), hh: X("Hours", 2, -12), h: X("Hours", 1, -12),
        mm: X("Minutes", 2), m: X("Minutes", 1), ss: X("Seconds", 2), s: X("Seconds", 1), sss: X("Milliseconds", 3), EEEE: lb("Day"), EEE: lb("Day", !0), a: function (a, b) { return 12 > a.getHours() ? b.AMPMS[0] : b.AMPMS[1] }, Z: function (a, b, d) { a = -1 * d; return a = (0 <= a ? "+" : "") + (Jb(Math[0 < a ? "floor" : "ceil"](a / 60), 2) + Jb(Math.abs(a % 60), 2)) }, ww: Gd(2), w: Gd(1), G: kc, GG: kc, GGG: kc, GGGG: function (a, b) { return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1] }
    }, vg = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
    ug = /^\-?\d+$/; zd.$inject = ["$locale"]; var pg = da(N), qg = da(vb); Bd.$inject = ["$parse"]; var me = da({ restrict: "E", compile: function (a, b) { if (!b.href && !b.xlinkHref) return function (a, b) { if ("a" === b[0].nodeName.toLowerCase()) { var e = "[object SVGAnimatedString]" === ka.call(b.prop("href")) ? "xlink:href" : "href"; b.on("click", function (a) { b.attr(e) || a.preventDefault() }) } } } }), wb = {}; q(Eb, function (a, b) {
        function d(a, d, e) { a.$watch(e[c], function (a) { e.$set(b, !!a) }) } if ("multiple" != a) {
            var c = ya("ng-" + b), e = d; "checked" === a && (e = function (a,
            b, e) { e.ngModel !== e[c] && d(a, b, e) }); wb[c] = function () { return { restrict: "A", priority: 100, link: e } }
        }
    }); q($c, function (a, b) { wb[b] = function () { return { priority: 100, link: function (a, c, e) { if ("ngPattern" === b && "/" == e.ngPattern.charAt(0) && (c = e.ngPattern.match(yg))) { e.$set("ngPattern", new RegExp(c[1], c[2])); return } a.$watch(e[b], function (a) { e.$set(b, a) }) } } } }); q(["src", "srcset", "href"], function (a) {
        var b = ya("ng-" + a); wb[b] = function () {
            return {
                priority: 99, link: function (d, c, e) {
                    var f = a, g = a; "href" === a && "[object SVGAnimatedString]" ===
                    ka.call(c.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null); e.$observe(b, function (b) { b ? (e.$set(g, b), Da && f && c.prop(f, e[g])) : "href" === a && e.$set(g, null) })
                }
            }
        }
    }); var Kb = { $addControl: E, $$renameControl: function (a, b) { a.$name = b }, $removeControl: E, $setValidity: E, $setDirty: E, $setPristine: E, $setSubmitted: E }; Hd.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"]; var Qd = function (a) {
        return ["$timeout", "$parse", function (b, d) {
            function c(a) { return "" === a ? d('this[""]').assign : d(a).assign || E } return {
                name: "form",
                restrict: a ? "EAC" : "E", require: ["form", "^^?form"], controller: Hd, compile: function (d, f) {
                    d.addClass(Xa).addClass(pb); var g = f.name ? "name" : a && f.ngForm ? "ngForm" : !1; return {
                        pre: function (a, d, e, f) {
                            var n = f[0]; if (!("action" in e)) { var p = function (b) { a.$apply(function () { n.$commitViewValue(); n.$setSubmitted() }); b.preventDefault() }; d[0].addEventListener("submit", p, !1); d.on("$destroy", function () { b(function () { d[0].removeEventListener("submit", p, !1) }, 0, !1) }) } (f[1] || n.$$parentForm).$addControl(n); var q = g ? c(n.$name) : E; g &&
                            (q(a, n), e.$observe(g, function (b) { n.$name !== b && (q(a, u), n.$$parentForm.$$renameControl(n, b), q = c(n.$name), q(a, n)) })); d.on("$destroy", function () { n.$$parentForm.$removeControl(n); q(a, u); S(n, Kb) })
                        }
                    }
                }
            }
        }]
    }, ne = Qd(), Ae = Qd(!0), xg = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/, Gg = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i, Hg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    Ig = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, Rd = /^(\d{4,})-(\d{2})-(\d{2})$/, Sd = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, nc = /^(\d{4,})-W(\d\d)$/, Td = /^(\d{4,})-(\d\d)$/, Ud = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Jd = V(); q(["date", "datetime-local", "month", "time", "week"], function (a) { Jd[a] = !0 }); var Vd = {
        text: function (a, b, d, c, e, f) { mb(a, b, d, c, e, f); lc(c) }, date: nb("date", Rd, Mb(Rd, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"), "datetime-local": nb("datetimelocal", Sd, Mb(Sd, "yyyy MM dd HH mm ss sss".split(" ")),
        "yyyy-MM-ddTHH:mm:ss.sss"), time: nb("time", Ud, Mb(Ud, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"), week: nb("week", nc, function (a, b) { if (fa(a)) return a; if (y(a)) { nc.lastIndex = 0; var d = nc.exec(a); if (d) { var c = +d[1], e = +d[2], f = d = 0, g = 0, h = 0, k = Fd(c), e = 7 * (e - 1); b && (d = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds()); return new Date(c, 0, k.getDate() + e, d, f, g, h) } } return NaN }, "yyyy-Www"), month: nb("month", Td, Mb(Td, ["yyyy", "MM"]), "yyyy-MM"), number: function (a, b, d, c, e, f) {
            Kd(a, b, d, c); mb(a, b, d, c, e, f); c.$$parserName =
            "number"; c.$parsers.push(function (a) { return c.$isEmpty(a) ? null : Ig.test(a) ? parseFloat(a) : u }); c.$formatters.push(function (a) { if (!c.$isEmpty(a)) { if (!R(a)) throw ob("numfmt", a); a = a.toString() } return a }); if (A(d.min) || d.ngMin) { var g; c.$validators.min = function (a) { return c.$isEmpty(a) || z(g) || a >= g }; d.$observe("min", function (a) { A(a) && !R(a) && (a = parseFloat(a, 10)); g = R(a) && !isNaN(a) ? a : u; c.$validate() }) } if (A(d.max) || d.ngMax) {
                var h; c.$validators.max = function (a) { return c.$isEmpty(a) || z(h) || a <= h }; d.$observe("max", function (a) {
                    A(a) &&
                    !R(a) && (a = parseFloat(a, 10)); h = R(a) && !isNaN(a) ? a : u; c.$validate()
                })
            }
        }, url: function (a, b, d, c, e, f) { mb(a, b, d, c, e, f); lc(c); c.$$parserName = "url"; c.$validators.url = function (a, b) { var d = a || b; return c.$isEmpty(d) || Gg.test(d) } }, email: function (a, b, d, c, e, f) { mb(a, b, d, c, e, f); lc(c); c.$$parserName = "email"; c.$validators.email = function (a, b) { var d = a || b; return c.$isEmpty(d) || Hg.test(d) } }, radio: function (a, b, d, c) {
            z(d.name) && b.attr("name", ++qb); b.on("click", function (a) { b[0].checked && c.$setViewValue(d.value, a && a.type) }); c.$render =
            function () { b[0].checked = d.value == c.$viewValue }; d.$observe("value", c.$render)
        }, checkbox: function (a, b, d, c, e, f, g, h) { var k = Ld(h, a, "ngTrueValue", d.ngTrueValue, !0), l = Ld(h, a, "ngFalseValue", d.ngFalseValue, !1); b.on("click", function (a) { c.$setViewValue(b[0].checked, a && a.type) }); c.$render = function () { b[0].checked = c.$viewValue }; c.$isEmpty = function (a) { return !1 === a }; c.$formatters.push(function (a) { return na(a, k) }); c.$parsers.push(function (a) { return a ? k : l }) }, hidden: E, button: E, submit: E, reset: E, file: E
    }, Dc = ["$browser",
    "$sniffer", "$filter", "$parse", function (a, b, d, c) { return { restrict: "E", require: ["?ngModel"], link: { pre: function (e, f, g, h) { h[0] && (Vd[N(g.type)] || Vd.text)(e, f, g, h[0], b, a, d, c) } } } }], Jg = /^(true|false|\d+)$/, Se = function () { return { restrict: "A", priority: 100, compile: function (a, b) { return Jg.test(b.ngValue) ? function (a, b, e) { e.$set("value", a.$eval(e.ngValue)) } : function (a, b, e) { a.$watch(e.ngValue, function (a) { e.$set("value", a) }) } } } }, se = ["$compile", function (a) {
        return {
            restrict: "AC", compile: function (b) {
                a.$$addBindingClass(b);
                return function (b, c, e) { a.$$addBindingInfo(c, e.ngBind); c = c[0]; b.$watch(e.ngBind, function (a) { c.textContent = z(a) ? "" : a }) }
            }
        }
    }], ue = ["$interpolate", "$compile", function (a, b) { return { compile: function (d) { b.$$addBindingClass(d); return function (c, d, f) { c = a(d.attr(f.$attr.ngBindTemplate)); b.$$addBindingInfo(d, c.expressions); d = d[0]; f.$observe("ngBindTemplate", function (a) { d.textContent = z(a) ? "" : a }) } } } }], te = ["$sce", "$parse", "$compile", function (a, b, d) {
        return {
            restrict: "A", compile: function (c, e) {
                var f = b(e.ngBindHtml), g =
                b(e.ngBindHtml, function (a) { return (a || "").toString() }); d.$$addBindingClass(c); return function (b, c, e) { d.$$addBindingInfo(c, e.ngBindHtml); b.$watch(g, function () { c.html(a.getTrustedHtml(f(b)) || "") }) }
            }
        }
    }], Re = da({ restrict: "A", require: "ngModel", link: function (a, b, d, c) { c.$viewChangeListeners.push(function () { a.$eval(d.ngChange) }) } }), ve = mc("", !0), xe = mc("Odd", 0), we = mc("Even", 1), ye = Na({ compile: function (a, b) { b.$set("ngCloak", u); a.removeClass("ng-cloak") } }), ze = [function () {
        return {
            restrict: "A", scope: !0, controller: "@",
            priority: 500
        }
    }], Ic = {}, Kg = { blur: !0, focus: !0 }; q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (a) { var b = ya("ng-" + a); Ic[b] = ["$parse", "$rootScope", function (d, c) { return { restrict: "A", compile: function (e, f) { var g = d(f[b], null, !0); return function (b, d) { d.on(a, function (d) { var e = function () { g(b, { $event: d }) }; Kg[a] && c.$$phase ? b.$evalAsync(e) : b.$apply(e) }) } } } }] }); var Ce = ["$animate", "$compile", function (a,
    b) { return { multiElement: !0, transclude: "element", priority: 600, terminal: !0, restrict: "A", $$tlb: !0, link: function (d, c, e, f, g) { var h, k, l; d.$watch(e.ngIf, function (d) { d ? k || g(function (d, f) { k = f; d[d.length++] = b.$$createComment("end ngIf", e.ngIf); h = { clone: d }; a.enter(d, c.parent(), c) }) : (l && (l.remove(), l = null), k && (k.$destroy(), k = null), h && (l = ub(h.clone), a.leave(l).then(function () { l = null }), h = null)) }) } } }], De = ["$templateRequest", "$anchorScroll", "$animate", function (a, b, d) {
        return {
            restrict: "ECA", priority: 400, terminal: !0,
            transclude: "element", controller: ea.noop, compile: function (c, e) {
                var f = e.ngInclude || e.src, g = e.onload || "", h = e.autoscroll; return function (c, e, m, n, p) {
                    var q = 0, s, x, r, w = function () { x && (x.remove(), x = null); s && (s.$destroy(), s = null); r && (d.leave(r).then(function () { x = null }), x = r, r = null) }; c.$watch(f, function (f) {
                        var m = function () { !A(h) || h && !c.$eval(h) || b() }, t = ++q; f ? (a(f, !0).then(function (a) {
                            if (!c.$$destroyed && t === q) {
                                var b = c.$new(); n.template = a; a = p(b, function (a) { w(); d.enter(a, null, e).then(m) }); s = b; r = a; s.$emit("$includeContentLoaded",
                                f); c.$eval(g)
                            }
                        }, function () { c.$$destroyed || t !== q || (w(), c.$emit("$includeContentError", f)) }), c.$emit("$includeContentRequested", f)) : (w(), n.template = null)
                    })
                }
            }
        }
    }], Ue = ["$compile", function (a) { return { restrict: "ECA", priority: -400, require: "ngInclude", link: function (b, d, c, e) { ka.call(d[0]).match(/SVG/) ? (d.empty(), a(Lc(e.template, P).childNodes)(b, function (a) { d.append(a) }, { futureParentElement: d })) : (d.html(e.template), a(d.contents())(b)) } } }], Ee = Na({ priority: 450, compile: function () { return { pre: function (a, b, d) { a.$eval(d.ngInit) } } } }),
    Qe = function () { return { restrict: "A", priority: 100, require: "ngModel", link: function (a, b, d, c) { var e = b.attr(d.$attr.ngList) || ", ", f = "false" !== d.ngTrim, g = f ? W(e) : e; c.$parsers.push(function (a) { if (!z(a)) { var b = []; a && q(a.split(g), function (a) { a && b.push(f ? W(a) : a) }); return b } }); c.$formatters.push(function (a) { return M(a) ? a.join(e) : u }); c.$isEmpty = function (a) { return !a || !a.length } } } }, pb = "ng-valid", Md = "ng-invalid", Xa = "ng-pristine", Lb = "ng-dirty", Od = "ng-pending", ob = O("ngModel"), Lg = ["$scope", "$exceptionHandler", "$attrs",
    "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function (a, b, d, c, e, f, g, h, k, l) {
        this.$modelValue = this.$viewValue = Number.NaN; this.$$rawModelValue = u; this.$validators = {}; this.$asyncValidators = {}; this.$parsers = []; this.$formatters = []; this.$viewChangeListeners = []; this.$untouched = !0; this.$touched = !1; this.$pristine = !0; this.$dirty = !1; this.$valid = !0; this.$invalid = !1; this.$error = {}; this.$$success = {}; this.$pending = u; this.$name = l(d.name || "", !1)(a); this.$$parentForm = Kb; var m = e(d.ngModel),
        n = m.assign, p = m, s = n, y = null, x, r = this; this.$$setOptions = function (a) { if ((r.$options = a) && a.getterSetter) { var b = e(d.ngModel + "()"), f = e(d.ngModel + "($$$p)"); p = function (a) { var c = m(a); D(c) && (c = b(a)); return c }; s = function (a, b) { D(m(a)) ? f(a, { $$$p: b }) : n(a, b) } } else if (!m.assign) throw ob("nonassign", d.ngModel, wa(c)); }; this.$render = E; this.$isEmpty = function (a) { return z(a) || "" === a || null === a || a !== a }; this.$$updateEmptyClasses = function (a) {
            r.$isEmpty(a) ? (f.removeClass(c, "ng-not-empty"), f.addClass(c, "ng-empty")) : (f.removeClass(c,
            "ng-empty"), f.addClass(c, "ng-not-empty"))
        }; var w = 0; Id({ ctrl: this, $element: c, set: function (a, b) { a[b] = !0 }, unset: function (a, b) { delete a[b] }, $animate: f }); this.$setPristine = function () { r.$dirty = !1; r.$pristine = !0; f.removeClass(c, Lb); f.addClass(c, Xa) }; this.$setDirty = function () { r.$dirty = !0; r.$pristine = !1; f.removeClass(c, Xa); f.addClass(c, Lb); r.$$parentForm.$setDirty() }; this.$setUntouched = function () { r.$touched = !1; r.$untouched = !0; f.setClass(c, "ng-untouched", "ng-touched") }; this.$setTouched = function () {
            r.$touched =
            !0; r.$untouched = !1; f.setClass(c, "ng-touched", "ng-untouched")
        }; this.$rollbackViewValue = function () { g.cancel(y); r.$viewValue = r.$$lastCommittedViewValue; r.$render() }; this.$validate = function () { if (!R(r.$modelValue) || !isNaN(r.$modelValue)) { var a = r.$$rawModelValue, b = r.$valid, c = r.$modelValue, d = r.$options && r.$options.allowInvalid; r.$$runValidators(a, r.$$lastCommittedViewValue, function (e) { d || b === e || (r.$modelValue = e ? a : u, r.$modelValue !== c && r.$$writeModelToScope()) }) } }; this.$$runValidators = function (a, b, c) {
            function d() {
                var c =
                !0; q(r.$validators, function (d, e) { var g = d(a, b); c = c && g; f(e, g) }); return c ? !0 : (q(r.$asyncValidators, function (a, b) { f(b, null) }), !1)
            } function e() { var c = [], d = !0; q(r.$asyncValidators, function (e, g) { var h = e(a, b); if (!h || !D(h.then)) throw ob("nopromise", h); f(g, u); c.push(h.then(function () { f(g, !0) }, function () { d = !1; f(g, !1) })) }); c.length ? k.all(c).then(function () { g(d) }, E) : g(!0) } function f(a, b) { h === w && r.$setValidity(a, b) } function g(a) { h === w && c(a) } w++; var h = w; (function () {
                var a = r.$$parserName || "parse"; if (z(x)) f(a, null);
                else return x || (q(r.$validators, function (a, b) { f(b, null) }), q(r.$asyncValidators, function (a, b) { f(b, null) })), f(a, x), x; return !0
            })() ? d() ? e() : g(!1) : g(!1)
        }; this.$commitViewValue = function () { var a = r.$viewValue; g.cancel(y); if (r.$$lastCommittedViewValue !== a || "" === a && r.$$hasNativeValidators) r.$$updateEmptyClasses(a), r.$$lastCommittedViewValue = a, r.$pristine && this.$setDirty(), this.$$parseAndValidate() }; this.$$parseAndValidate = function () {
            var b = r.$$lastCommittedViewValue; if (x = z(b) ? u : !0) for (var c = 0; c < r.$parsers.length; c++) if (b =
            r.$parsers[c](b), z(b)) { x = !1; break } R(r.$modelValue) && isNaN(r.$modelValue) && (r.$modelValue = p(a)); var d = r.$modelValue, e = r.$options && r.$options.allowInvalid; r.$$rawModelValue = b; e && (r.$modelValue = b, r.$modelValue !== d && r.$$writeModelToScope()); r.$$runValidators(b, r.$$lastCommittedViewValue, function (a) { e || (r.$modelValue = a ? b : u, r.$modelValue !== d && r.$$writeModelToScope()) })
        }; this.$$writeModelToScope = function () { s(a, r.$modelValue); q(r.$viewChangeListeners, function (a) { try { a() } catch (c) { b(c) } }) }; this.$setViewValue =
        function (a, b) { r.$viewValue = a; r.$options && !r.$options.updateOnDefault || r.$$debounceViewValueCommit(b) }; this.$$debounceViewValueCommit = function (b) { var c = 0, d = r.$options; d && A(d.debounce) && (d = d.debounce, R(d) ? c = d : R(d[b]) ? c = d[b] : R(d["default"]) && (c = d["default"])); g.cancel(y); c ? y = g(function () { r.$commitViewValue() }, c) : h.$$phase ? r.$commitViewValue() : a.$apply(function () { r.$commitViewValue() }) }; a.$watch(function () {
            var b = p(a); if (b !== r.$modelValue && (r.$modelValue === r.$modelValue || b === b)) {
                r.$modelValue = r.$$rawModelValue =
                b; x = u; for (var c = r.$formatters, d = c.length, e = b; d--;) e = c[d](e); r.$viewValue !== e && (r.$$updateEmptyClasses(e), r.$viewValue = r.$$lastCommittedViewValue = e, r.$render(), r.$$runValidators(b, e, E))
            } return b
        })
    }], Pe = ["$rootScope", function (a) {
        return {
            restrict: "A", require: ["ngModel", "^?form", "^?ngModelOptions"], controller: Lg, priority: 1, compile: function (b) {
                b.addClass(Xa).addClass("ng-untouched").addClass(pb); return {
                    pre: function (a, b, e, f) {
                        var g = f[0]; b = f[1] || g.$$parentForm; g.$$setOptions(f[2] && f[2].$options); b.$addControl(g);
                        e.$observe("name", function (a) { g.$name !== a && g.$$parentForm.$$renameControl(g, a) }); a.$on("$destroy", function () { g.$$parentForm.$removeControl(g) })
                    }, post: function (b, c, e, f) { var g = f[0]; if (g.$options && g.$options.updateOn) c.on(g.$options.updateOn, function (a) { g.$$debounceViewValueCommit(a && a.type) }); c.on("blur", function () { g.$touched || (a.$$phase ? b.$evalAsync(g.$setTouched) : b.$apply(g.$setTouched)) }) }
                }
            }
        }
    }], Mg = /(\s+|^)default(\s+|$)/, Te = function () {
        return {
            restrict: "A", controller: ["$scope", "$attrs", function (a,
            b) { var d = this; this.$options = pa(a.$eval(b.ngModelOptions)); A(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = W(this.$options.updateOn.replace(Mg, function () { d.$options.updateOnDefault = !0; return " " }))) : this.$options.updateOnDefault = !0 }]
        }
    }, Fe = Na({ terminal: !0, priority: 1E3 }), Ng = O("ngOptions"), Og = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
    Ne = ["$compile", "$parse", function (a, b) {
        function d(a, c, d) {
            function e(a, b, c, d, f) { this.selectValue = a; this.viewValue = b; this.label = c; this.group = d; this.disabled = f } function l(a) { var b; if (!p && za(a)) b = a; else { b = []; for (var c in a) a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c) } return b } var m = a.match(Og); if (!m) throw Ng("iexp", a, wa(c)); var n = m[5] || m[7], p = m[6]; a = / as /.test(m[0]) && m[1]; var q = m[9]; c = b(m[2] ? m[1] : n); var s = a && b(a) || c, x = q && b(q), r = q ? function (a, b) { return x(d, b) } : function (a) { return Ha(a) }, w = function (a,
            b) { return r(a, y(a, b)) }, v = b(m[2] || m[1]), u = b(m[3] || ""), t = b(m[4] || ""), G = b(m[8]), C = {}, y = p ? function (a, b) { C[p] = b; C[n] = a; return C } : function (a) { C[n] = a; return C }; return {
                trackBy: q, getTrackByValue: w, getWatchables: b(G, function (a) { var b = []; a = a || []; for (var c = l(a), e = c.length, f = 0; f < e; f++) { var g = a === c ? f : c[f], k = a[g], g = y(k, g), k = r(k, g); b.push(k); if (m[2] || m[1]) k = v(d, g), b.push(k); m[4] && (g = t(d, g), b.push(g)) } return b }), getOptions: function () {
                    for (var a = [], b = {}, c = G(d) || [], f = l(c), g = f.length, m = 0; m < g; m++) {
                        var n = c === f ? m : f[m], p =
                        y(c[n], n), x = s(d, p), n = r(x, p), C = v(d, p), A = u(d, p), p = t(d, p), x = new e(n, x, C, A, p); a.push(x); b[n] = x
                    } return { items: a, selectValueMap: b, getOptionFromViewValue: function (a) { return b[w(a)] }, getViewValueFromOption: function (a) { return q ? ea.copy(a.viewValue) : a.viewValue } }
                }
            }
        } var c = P.createElement("option"), e = P.createElement("optgroup"); return {
            restrict: "A", terminal: !0, require: ["select", "ngModel"], link: {
                pre: function (a, b, c, d) { d[0].registerOption = E }, post: function (b, g, h, k) {
                    function l(a, b) {
                        a.element = b; b.disabled = a.disabled;
                        a.label !== b.label && (b.label = a.label, b.textContent = a.label); a.value !== b.value && (b.value = a.selectValue)
                    } function m(a, b, c, d) { b && N(b.nodeName) === c ? c = b : (c = d.cloneNode(!1), b ? a.insertBefore(c, b) : a.appendChild(c)); return c } function n(a) { for (var b; a;) b = a.nextSibling, Yb(a), a = b } function p(a) { var b = w && w[0], c = G && G[0]; if (b || c) for (; a && (a === b || a === c || 8 === a.nodeType || "option" === oa(a) && "" === a.value) ;) a = a.nextSibling; return a } function s() {
                        var a = C && u.readValue(); C = z.getOptions(); var b = {}, d = g[0].firstChild; t && g.prepend(w);
                        d = p(d); C.items.forEach(function (a) { var f, h; A(a.group) ? (f = b[a.group], f || (f = m(g[0], d, "optgroup", e), d = f.nextSibling, f.label = a.group, f = b[a.group] = { groupElement: f, currentOptionElement: f.firstChild }), h = m(f.groupElement, f.currentOptionElement, "option", c), l(a, h), f.currentOptionElement = h.nextSibling) : (h = m(g[0], d, "option", c), l(a, h), d = h.nextSibling) }); Object.keys(b).forEach(function (a) { n(b[a].currentOptionElement) }); n(d); x.$render(); if (!x.$isEmpty(a)) {
                            var f = u.readValue(); (z.trackBy || r ? na(a, f) : a === f) || (x.$setViewValue(f),
                            x.$render())
                        }
                    } var u = k[0], x = k[1], r = h.multiple, w; k = 0; for (var v = g.children(), y = v.length; k < y; k++) if ("" === v[k].value) { w = v.eq(k); break } var t = !!w, G = H(c.cloneNode(!1)); G.val("?"); var C, z = d(h.ngOptions, g, b); r ? (x.$isEmpty = function (a) { return !a || 0 === a.length }, u.writeValue = function (a) { C.items.forEach(function (a) { a.element.selected = !1 }); a && a.forEach(function (a) { (a = C.getOptionFromViewValue(a)) && !a.disabled && (a.element.selected = !0) }) }, u.readValue = function () {
                        var a = g.val() || [], b = []; q(a, function (a) {
                            (a = C.selectValueMap[a]) &&
                            !a.disabled && b.push(C.getViewValueFromOption(a))
                        }); return b
                    }, z.trackBy && b.$watchCollection(function () { if (M(x.$viewValue)) return x.$viewValue.map(function (a) { return z.getTrackByValue(a) }) }, function () { x.$render() })) : (u.writeValue = function (a) {
                        var b = C.getOptionFromViewValue(a); b && !b.disabled ? (g[0].value !== b.selectValue && (G.remove(), t || w.remove(), g[0].value = b.selectValue, b.element.selected = !0), b.element.setAttribute("selected", "selected")) : null === a || t ? (G.remove(), t || g.prepend(w), g.val(""), w.prop("selected",
                        !0), w.attr("selected", !0)) : (t || w.remove(), g.prepend(G), g.val("?"), G.prop("selected", !0), G.attr("selected", !0))
                    }, u.readValue = function () { var a = C.selectValueMap[g.val()]; return a && !a.disabled ? (t || w.remove(), G.remove(), C.getViewValueFromOption(a)) : null }, z.trackBy && b.$watch(function () { return z.getTrackByValue(x.$viewValue) }, function () { x.$render() })); t ? (w.remove(), a(w)(b), w.removeClass("ng-scope")) : w = H(c.cloneNode(!1)); s(); b.$watchCollection(z.getWatchables, s)
                }
            }
        }
    }], Ge = ["$locale", "$interpolate", "$log", function (a,
    b, d) {
        var c = /{}/g, e = /^when(Minus)?(.+)$/; return {
            link: function (f, g, h) {
                function k(a) { g.text(a || "") } var l = h.count, m = h.$attr.when && g.attr(h.$attr.when), n = h.offset || 0, p = f.$eval(m) || {}, s = {}, u = b.startSymbol(), x = b.endSymbol(), r = u + l + "-" + n + x, w = ea.noop, v; q(h, function (a, b) { var c = e.exec(b); c && (c = (c[1] ? "-" : "") + N(c[2]), p[c] = g.attr(h.$attr[b])) }); q(p, function (a, d) { s[d] = b(a.replace(c, r)) }); f.$watch(l, function (b) {
                    var c = parseFloat(b), e = isNaN(c); e || c in p || (c = a.pluralCat(c - n)); c === v || e && R(v) && isNaN(v) || (w(), e = s[c], z(e) ?
                    (null != b && d.debug("ngPluralize: no rule defined for '" + c + "' in " + m), w = E, k()) : w = f.$watch(e, k), v = c)
                })
            }
        }
    }], He = ["$parse", "$animate", "$compile", function (a, b, d) {
        var c = O("ngRepeat"), e = function (a, b, c, d, e, m, n) { a[c] = d; e && (a[e] = m); a.$index = b; a.$first = 0 === b; a.$last = b === n - 1; a.$middle = !(a.$first || a.$last); a.$odd = !(a.$even = 0 === (b & 1)) }; return {
            restrict: "A", multiElement: !0, transclude: "element", priority: 1E3, terminal: !0, $$tlb: !0, compile: function (f, g) {
                var h = g.ngRepeat, k = d.$$createComment("end ngRepeat", h), l = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!l) throw c("iexp", h); var m = l[1], n = l[2], p = l[3], s = l[4], l = m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/); if (!l) throw c("iidexp", m); var y = l[3] || l[1], x = l[2]; if (p && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(p))) throw c("badident", p); var r, w, v, z, t = { $id: Ha }; s ? r = a(s) : (v = function (a, b) { return Ha(b) }, z = function (a) { return a }); return function (a, d, f, g, l) {
                    r && (w = function (b, c, d) {
                        x && (t[x] = b); t[y] = c; t.$index =
                        d; return r(a, t)
                    }); var m = V(); a.$watchCollection(n, function (f) {
                        var g, n, r = d[0], s, t = V(), A, E, H, D, I, F, J; p && (a[p] = f); if (za(f)) I = f, n = w || v; else for (J in n = w || z, I = [], f) va.call(f, J) && "$" !== J.charAt(0) && I.push(J); A = I.length; J = Array(A); for (g = 0; g < A; g++) if (E = f === I ? g : I[g], H = f[E], D = n(E, H, g), m[D]) F = m[D], delete m[D], t[D] = F, J[g] = F; else { if (t[D]) throw q(J, function (a) { a && a.scope && (m[a.id] = a) }), c("dupes", h, D, H); J[g] = { id: D, scope: u, clone: u }; t[D] = !0 } for (s in m) {
                            F = m[s]; D = ub(F.clone); b.leave(D); if (D[0].parentNode) for (g = 0, n = D.length; g <
                            n; g++) D[g].$$NG_REMOVED = !0; F.scope.$destroy()
                        } for (g = 0; g < A; g++) if (E = f === I ? g : I[g], H = f[E], F = J[g], F.scope) { s = r; do s = s.nextSibling; while (s && s.$$NG_REMOVED); F.clone[0] != s && b.move(ub(F.clone), null, r); r = F.clone[F.clone.length - 1]; e(F.scope, g, y, H, x, E, A) } else l(function (a, c) { F.scope = c; var d = k.cloneNode(!1); a[a.length++] = d; b.enter(a, null, r); r = d; F.clone = a; t[F.id] = F; e(F.scope, g, y, H, x, E, A) }); m = t
                    })
                }
            }
        }
    }], Ie = ["$animate", function (a) {
        return {
            restrict: "A", multiElement: !0, link: function (b, d, c) {
                b.$watch(c.ngShow, function (b) {
                    a[b ?
                    "removeClass" : "addClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" })
                })
            }
        }
    }], Be = ["$animate", function (a) { return { restrict: "A", multiElement: !0, link: function (b, d, c) { b.$watch(c.ngHide, function (b) { a[b ? "addClass" : "removeClass"](d, "ng-hide", { tempClasses: "ng-hide-animate" }) }) } } }], Je = Na(function (a, b, d) { a.$watch(d.ngStyle, function (a, d) { d && a !== d && q(d, function (a, c) { b.css(c, "") }); a && b.css(a) }, !0) }), Ke = ["$animate", "$compile", function (a, b) {
        return {
            require: "ngSwitch", controller: ["$scope", function () { this.cases = {} }],
            link: function (d, c, e, f) {
                var g = [], h = [], k = [], l = [], m = function (a, b) { return function () { a.splice(b, 1) } }; d.$watch(e.ngSwitch || e.on, function (c) {
                    var d, e; d = 0; for (e = k.length; d < e; ++d) a.cancel(k[d]); d = k.length = 0; for (e = l.length; d < e; ++d) { var s = ub(h[d].clone); l[d].$destroy(); (k[d] = a.leave(s)).then(m(k, d)) } h.length = 0; l.length = 0; (g = f.cases["!" + c] || f.cases["?"]) && q(g, function (c) {
                        c.transclude(function (d, e) {
                            l.push(e); var f = c.element; d[d.length++] = b.$$createComment("end ngSwitchWhen"); h.push({ clone: d }); a.enter(d, f.parent(),
                            f)
                        })
                    })
                })
            }
        }
    }], Le = Na({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function (a, b, d, c, e) { c.cases["!" + d.ngSwitchWhen] = c.cases["!" + d.ngSwitchWhen] || []; c.cases["!" + d.ngSwitchWhen].push({ transclude: e, element: b }) } }), Me = Na({ transclude: "element", priority: 1200, require: "^ngSwitch", multiElement: !0, link: function (a, b, d, c, e) { c.cases["?"] = c.cases["?"] || []; c.cases["?"].push({ transclude: e, element: b }) } }), Pg = O("ngTransclude"), Oe = Na({
        restrict: "EAC", link: function (a, b, d, c, e) {
            d.ngTransclude ===
            d.$attr.ngTransclude && (d.ngTransclude = ""); if (!e) throw Pg("orphan", wa(b)); e(function (a) { a.length && (b.empty(), b.append(a)) }, null, d.ngTransclude || d.ngTranscludeSlot)
        }
    }), oe = ["$templateCache", function (a) { return { restrict: "E", terminal: !0, compile: function (b, d) { "text/ng-template" == d.type && a.put(d.id, b[0].text) } } }], Qg = { $setViewValue: E, $render: E }, Rg = ["$element", "$scope", function (a, b) {
        var d = this, c = new Ua; d.ngModelCtrl = Qg; d.unknownOption = H(P.createElement("option")); d.renderUnknownOption = function (b) {
            b = "? " + Ha(b) +
            " ?"; d.unknownOption.val(b); a.prepend(d.unknownOption); a.val(b)
        }; b.$on("$destroy", function () { d.renderUnknownOption = E }); d.removeUnknownOption = function () { d.unknownOption.parent() && d.unknownOption.remove() }; d.readValue = function () { d.removeUnknownOption(); return a.val() }; d.writeValue = function (b) { d.hasOption(b) ? (d.removeUnknownOption(), a.val(b), "" === b && d.emptyOption.prop("selected", !0)) : null == b && d.emptyOption ? (d.removeUnknownOption(), a.val("")) : d.renderUnknownOption(b) }; d.addOption = function (a, b) {
            if (8 !==
            b[0].nodeType) { Ta(a, '"option value"'); "" === a && (d.emptyOption = b); var g = c.get(a) || 0; c.put(a, g + 1); d.ngModelCtrl.$render(); b[0].hasAttribute("selected") && (b[0].selected = !0) }
        }; d.removeOption = function (a) { var b = c.get(a); b && (1 === b ? (c.remove(a), "" === a && (d.emptyOption = u)) : c.put(a, b - 1)) }; d.hasOption = function (a) { return !!c.get(a) }; d.registerOption = function (a, b, c, h, k) {
            if (h) { var l; c.$observe("value", function (a) { A(l) && d.removeOption(l); l = a; d.addOption(a, b) }) } else k ? a.$watch(k, function (a, e) {
                c.$set("value", a); e !==
                a && d.removeOption(e); d.addOption(a, b)
            }) : d.addOption(c.value, b); b.on("$destroy", function () { d.removeOption(c.value); d.ngModelCtrl.$render() })
        }
    }], pe = function () {
        return {
            restrict: "E", require: ["select", "?ngModel"], controller: Rg, priority: 1, link: {
                pre: function (a, b, d, c) {
                    var e = c[1]; if (e) {
                        var f = c[0]; f.ngModelCtrl = e; b.on("change", function () { a.$apply(function () { e.$setViewValue(f.readValue()) }) }); if (d.multiple) {
                            f.readValue = function () { var a = []; q(b.find("option"), function (b) { b.selected && a.push(b.value) }); return a };
                            f.writeValue = function (a) { var c = new Ua(a); q(b.find("option"), function (a) { a.selected = A(c.get(a.value)) }) }; var g, h = NaN; a.$watch(function () { h !== e.$viewValue || na(g, e.$viewValue) || (g = ia(e.$viewValue), e.$render()); h = e.$viewValue }); e.$isEmpty = function (a) { return !a || 0 === a.length }
                        }
                    }
                }, post: function (a, b, d, c) { var e = c[1]; if (e) { var f = c[0]; e.$render = function () { f.writeValue(e.$viewValue) } } }
            }
        }
    }, re = ["$interpolate", function (a) {
        return {
            restrict: "E", priority: 100, compile: function (b, d) {
                if (A(d.value)) var c = a(d.value, !0); else {
                    var e =
                    a(b.text(), !0); e || d.$set("value", b.text())
                } return function (a, b, d) { var k = b.parent(); (k = k.data("$selectController") || k.parent().data("$selectController")) && k.registerOption(a, b, d, c, e) }
            }
        }
    }], qe = da({ restrict: "E", terminal: !1 }), Fc = function () { return { restrict: "A", require: "?ngModel", link: function (a, b, d, c) { c && (d.required = !0, c.$validators.required = function (a, b) { return !d.required || !c.$isEmpty(b) }, d.$observe("required", function () { c.$validate() })) } } }, Ec = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (a,
            b, d, c) { if (c) { var e, f = d.ngPattern || d.pattern; d.$observe("pattern", function (a) { y(a) && 0 < a.length && (a = new RegExp("^" + a + "$")); if (a && !a.test) throw O("ngPattern")("noregexp", f, a, wa(b)); e = a || u; c.$validate() }); c.$validators.pattern = function (a, b) { return c.$isEmpty(b) || z(e) || e.test(b) } } }
        }
    }, Hc = function () {
        return {
            restrict: "A", require: "?ngModel", link: function (a, b, d, c) {
                if (c) {
                    var e = -1; d.$observe("maxlength", function (a) { a = Y(a); e = isNaN(a) ? -1 : a; c.$validate() }); c.$validators.maxlength = function (a, b) {
                        return 0 > e || c.$isEmpty(b) ||
                        b.length <= e
                    }
                }
            }
        }
    }, Gc = function () { return { restrict: "A", require: "?ngModel", link: function (a, b, d, c) { if (c) { var e = 0; d.$observe("minlength", function (a) { e = Y(a) || 0; c.$validate() }); c.$validators.minlength = function (a, b) { return c.$isEmpty(b) || b.length >= e } } } } }; T.angular.bootstrap ? T.console && console.log("WARNING: Tried to load angular more than once.") : (he(), je(ea), ea.module("ngLocale", [], ["$provide", function (a) {
        function b(a) { a += ""; var b = a.indexOf("."); return -1 == b ? 0 : a.length - b - 1 } a.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: ["AM",
                "PM"], DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), ERANAMES: ["Before Christ", "Anno Domini"], ERAS: ["BC", "AD"], FIRSTDAYOFWEEK: 6, MONTH: "January February March April May June July August September October November December".split(" "), SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "), SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), STANDALONEMONTH: "January February March April May June July August September October November December".split(" "), WEEKENDRANGE: [5,
                6], fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", medium: "MMM d, y h:mm:ss a", mediumDate: "MMM d, y", mediumTime: "h:mm:ss a", "short": "M/d/yy h:mm a", shortDate: "M/d/yy", shortTime: "h:mm a"
            }, NUMBER_FORMATS: { CURRENCY_SYM: "$", DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [{ gSize: 3, lgSize: 3, maxFrac: 3, minFrac: 0, minInt: 1, negPre: "-", negSuf: "", posPre: "", posSuf: "" }, { gSize: 3, lgSize: 3, maxFrac: 2, minFrac: 2, minInt: 1, negPre: "-\u00a4", negSuf: "", posPre: "\u00a4", posSuf: "" }] }, id: "en-us", localeID: "en_US", pluralCat: function (a,
            c) { var e = a | 0, f = c; u === f && (f = Math.min(b(a), 3)); Math.pow(10, f); return 1 == e && 0 == f ? "one" : "other" }
        })
    }]), H(P).ready(function () { de(P, yc) }))
})(window, document); !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map;
/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (x, n, y) {
    'use strict'; function s(f, k) { var e = !1, a = !1; this.ngClickOverrideEnabled = function (b) { return n.isDefined(b) ? (b && !a && (a = !0, t.$$moduleName = "ngTouch", k.directive("ngClick", t), f.decorator("ngClickDirective", ["$delegate", function (a) { if (e) a.shift(); else for (var b = a.length - 1; 0 <= b;) { if ("ngTouch" === a[b].$$moduleName) { a.splice(b, 1); break } b-- } return a }])), e = b, this) : e }; this.$get = function () { return { ngClickOverrideEnabled: function () { return e } } } } function v(f, k, e) {
        p.directive(f, ["$parse", "$swipe", function (a,
        b) { return function (l, u, g) { function h(c) { if (!d) return !1; var a = Math.abs(c.y - d.y); c = (c.x - d.x) * k; return r && 75 > a && 0 < c && 30 < c && .3 > a / c } var m = a(g[f]), d, r, c = ["touch"]; n.isDefined(g.ngSwipeDisableMouse) || c.push("mouse"); b.bind(u, { start: function (c, a) { d = c; r = !0 }, cancel: function (c) { r = !1 }, end: function (c, d) { h(c) && l.$apply(function () { u.triggerHandler(e); m(l, { $event: d }) }) } }, c) } }])
    } var p = n.module("ngTouch", []); p.provider("$touch", s); s.$inject = ["$provide", "$compileProvider"]; p.factory("$swipe", [function () {
        function f(a) {
            a =
            a.originalEvent || a; var b = a.touches && a.touches.length ? a.touches : [a]; a = a.changedTouches && a.changedTouches[0] || b[0]; return { x: a.clientX, y: a.clientY }
        } function k(a, b) { var l = []; n.forEach(a, function (a) { (a = e[a][b]) && l.push(a) }); return l.join(" ") } var e = { mouse: { start: "mousedown", move: "mousemove", end: "mouseup" }, touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" } }; return {
            bind: function (a, b, l) {
                var e, g, h, m, d = !1; l = l || ["mouse", "touch"]; a.on(k(l, "start"), function (c) {
                    h = f(c); d = !0; g = e = 0; m =
                    h; b.start && b.start(h, c)
                }); var r = k(l, "cancel"); if (r) a.on(r, function (c) { d = !1; b.cancel && b.cancel(c) }); a.on(k(l, "move"), function (c) { if (d && h) { var a = f(c); e += Math.abs(a.x - m.x); g += Math.abs(a.y - m.y); m = a; 10 > e && 10 > g || (g > e ? (d = !1, b.cancel && b.cancel(c)) : (c.preventDefault(), b.move && b.move(a, c))) } }); a.on(k(l, "end"), function (c) { d && (d = !1, b.end && b.end(f(c), c)) })
            }
        }
    }]); var t = ["$parse", "$timeout", "$rootElement", function (f, k, e) {
        function a(a, d, b) {
            for (var c = 0; c < a.length; c += 2) {
                var g = a[c + 1], e = b; if (25 > Math.abs(a[c] - d) && 25 > Math.abs(g -
                e)) return a.splice(c, c + 2), !0
            } return !1
        } function b(b) { if (!(2500 < Date.now() - u)) { var d = b.touches && b.touches.length ? b.touches : [b], e = d[0].clientX, d = d[0].clientY; if (!(1 > e && 1 > d || h && h[0] === e && h[1] === d)) { h && (h = null); var c = b.target; "label" === n.lowercase(c.nodeName || c[0] && c[0].nodeName) && (h = [e, d]); a(g, e, d) || (b.stopPropagation(), b.preventDefault(), b.target && b.target.blur && b.target.blur()) } } } function l(a) {
            a = a.touches && a.touches.length ? a.touches : [a]; var b = a[0].clientX, e = a[0].clientY; g.push(b, e); k(function () {
                for (var a =
                0; a < g.length; a += 2) if (g[a] == b && g[a + 1] == e) { g.splice(a, a + 2); break }
            }, 2500, !1)
        } var u, g, h; return function (h, d, k) {
            var c = f(k.ngClick), w = !1, q, p, s, t; d.on("touchstart", function (a) { w = !0; q = a.target ? a.target : a.srcElement; 3 == q.nodeType && (q = q.parentNode); d.addClass("ng-click-active"); p = Date.now(); a = a.originalEvent || a; a = (a.touches && a.touches.length ? a.touches : [a])[0]; s = a.clientX; t = a.clientY }); d.on("touchcancel", function (a) { w = !1; d.removeClass("ng-click-active") }); d.on("touchend", function (c) {
                var h = Date.now() - p, f = c.originalEvent ||
                c, m = (f.changedTouches && f.changedTouches.length ? f.changedTouches : f.touches && f.touches.length ? f.touches : [f])[0], f = m.clientX, m = m.clientY, v = Math.sqrt(Math.pow(f - s, 2) + Math.pow(m - t, 2)); w && 750 > h && 12 > v && (g || (e[0].addEventListener("click", b, !0), e[0].addEventListener("touchstart", l, !0), g = []), u = Date.now(), a(g, f, m), q && q.blur(), n.isDefined(k.disabled) && !1 !== k.disabled || d.triggerHandler("click", [c])); w = !1; d.removeClass("ng-click-active")
            }); d.onclick = function (a) { }; d.on("click", function (a, b) {
                h.$apply(function () {
                    c(h,
                    { $event: b || a })
                })
            }); d.on("mousedown", function (a) { d.addClass("ng-click-active") }); d.on("mousemove mouseup", function (a) { d.removeClass("ng-click-active") })
        }
    }]; v("ngSwipeLeft", -1, "swipeleft"); v("ngSwipeRight", 1, "swiperight")
})(window, window.angular);
//# sourceMappingURL=angular-touch.min.js.map;
/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (E, w, Va) {
    'use strict'; function ya(a, b, c) { if (!a) throw Ka("areq", b || "?", c || "required"); return a } function za(a, b) { if (!a && !b) return ""; if (!a) return b; if (!b) return a; ba(a) && (a = a.join(" ")); ba(b) && (b = b.join(" ")); return a + " " + b } function La(a) { var b = {}; a && (a.to || a.from) && (b.to = a.to, b.from = a.from); return b } function V(a, b, c) { var d = ""; a = ba(a) ? a : a && I(a) && a.length ? a.split(/\s+/) : []; q(a, function (a, f) { a && 0 < a.length && (d += 0 < f ? " " : "", d += c ? b + a : a + b) }); return d } function Ma(a) {
        if (a instanceof H) switch (a.length) {
            case 0: return [];
            case 1: if (1 === a[0].nodeType) return a; break; default: return H(ga(a))
        } if (1 === a.nodeType) return H(a)
    } function ga(a) { if (!a[0]) return a; for (var b = 0; b < a.length; b++) { var c = a[b]; if (1 == c.nodeType) return c } } function Na(a, b, c) { q(b, function (b) { a.addClass(b, c) }) } function Oa(a, b, c) { q(b, function (b) { a.removeClass(b, c) }) } function Q(a) { return function (b, c) { c.addClass && (Na(a, b, c.addClass), c.addClass = null); c.removeClass && (Oa(a, b, c.removeClass), c.removeClass = null) } } function oa(a) {
        a = a || {}; if (!a.$$prepared) {
            var b = a.domOperation ||
            O; a.domOperation = function () { a.$$domOperationFired = !0; b(); b = O }; a.$$prepared = !0
        } return a
    } function ha(a, b) { Aa(a, b); Ba(a, b) } function Aa(a, b) { b.from && (a.css(b.from), b.from = null) } function Ba(a, b) { b.to && (a.css(b.to), b.to = null) } function T(a, b, c) {
        var d = b.options || {}; c = c.options || {}; var e = (d.addClass || "") + " " + (c.addClass || ""), f = (d.removeClass || "") + " " + (c.removeClass || ""); a = Pa(a.attr("class"), e, f); c.preparationClasses && (d.preparationClasses = W(c.preparationClasses, d.preparationClasses), delete c.preparationClasses);
        e = d.domOperation !== O ? d.domOperation : null; Ca(d, c); e && (d.domOperation = e); d.addClass = a.addClass ? a.addClass : null; d.removeClass = a.removeClass ? a.removeClass : null; b.addClass = d.addClass; b.removeClass = d.removeClass; return d
    } function Pa(a, b, c) {
        function d(a) { I(a) && (a = a.split(" ")); var b = {}; q(a, function (a) { a.length && (b[a] = !0) }); return b } var e = {}; a = d(a); b = d(b); q(b, function (a, b) { e[b] = 1 }); c = d(c); q(c, function (a, b) { e[b] = 1 === e[b] ? null : -1 }); var f = { addClass: "", removeClass: "" }; q(e, function (b, c) {
            var d, e; 1 === b ? (d = "addClass",
            e = !a[c]) : -1 === b && (d = "removeClass", e = a[c]); e && (f[d].length && (f[d] += " "), f[d] += c)
        }); return f
    } function A(a) { return a instanceof w.element ? a[0] : a } function Qa(a, b, c) { var d = ""; b && (d = V(b, "ng-", !0)); c.addClass && (d = W(d, V(c.addClass, "-add"))); c.removeClass && (d = W(d, V(c.removeClass, "-remove"))); d.length && (c.preparationClasses = d, a.addClass(d)) } function pa(a, b) { var c = b ? "-" + b + "s" : ""; la(a, [ma, c]); return [ma, c] } function ra(a, b) { var c = b ? "paused" : "", d = X + "PlayState"; la(a, [d, c]); return [d, c] } function la(a, b) {
        a.style[b[0]] =
        b[1]
    } function W(a, b) { return a ? b ? a + " " + b : a : b } function Da(a, b, c) { var d = Object.create(null), e = a.getComputedStyle(b) || {}; q(c, function (a, b) { var c = e[a]; if (c) { var F = c.charAt(0); if ("-" === F || "+" === F || 0 <= F) c = Ra(c); 0 === c && (c = null); d[b] = c } }); return d } function Ra(a) { var b = 0; a = a.split(/\s*,\s*/); q(a, function (a) { "s" == a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)); a = parseFloat(a) || 0; b = b ? Math.max(a, b) : a }); return b } function sa(a) { return 0 === a || null != a } function Ea(a, b) {
        var c = R, d = a + "s"; b ? c += "Duration" : d += " linear all";
        return [c, d]
    } function Fa() { var a = Object.create(null); return { flush: function () { a = Object.create(null) }, count: function (b) { return (b = a[b]) ? b.total : 0 }, get: function (b) { return (b = a[b]) && b.value }, put: function (b, c) { a[b] ? a[b].total++ : a[b] = { total: 1, value: c } } } } function Ga(a, b, c) { q(c, function (c) { a[c] = Y(a[c]) ? a[c] : b.style.getPropertyValue(c) }) } var O = w.noop, Ha = w.copy, Ca = w.extend, H = w.element, q = w.forEach, ba = w.isArray, I = w.isString, ca = w.isObject, N = w.isUndefined, Y = w.isDefined, Ia = w.isFunction, ta = w.isElement, R, ua, X, va; N(E.ontransitionend) &&
    Y(E.onwebkittransitionend) ? (R = "WebkitTransition", ua = "webkitTransitionEnd transitionend") : (R = "transition", ua = "transitionend"); N(E.onanimationend) && Y(E.onwebkitanimationend) ? (X = "WebkitAnimation", va = "webkitAnimationEnd animationend") : (X = "animation", va = "animationend"); var qa = X + "Delay", wa = X + "Duration", ma = R + "Delay"; E = R + "Duration"; var Ka = w.$$minErr("ng"), Sa = { transitionDuration: E, transitionDelay: ma, transitionProperty: R + "Property", animationDuration: wa, animationDelay: qa, animationIterationCount: X + "IterationCount" },
    Ta = { transitionDuration: E, transitionDelay: ma, animationDuration: wa, animationDelay: qa }; w.module("ngAnimate", []).directive("ngAnimateSwap", ["$animate", "$rootScope", function (a, b) { return { restrict: "A", transclude: "element", terminal: !0, priority: 600, link: function (b, d, e, f, r) { var x, F; b.$watchCollection(e.ngAnimateSwap || e["for"], function (e) { x && a.leave(x); F && (F.$destroy(), F = null); if (e || 0 === e) F = b.$new(), r(F, function (b) { x = b; a.enter(b, null, d) }) }) } } }]).directive("ngAnimateChildren", ["$interpolate", function (a) {
        return {
            link: function (b,
            c, d) { function e(a) { c.data("$$ngAnimateChildren", "on" === a || "true" === a) } var f = d.ngAnimateChildren; w.isString(f) && 0 === f.length ? c.data("$$ngAnimateChildren", !0) : (e(a(f)(b)), d.$observe("ngAnimateChildren", e)) }
        }
    }]).factory("$$rAFScheduler", ["$$rAF", function (a) { function b(a) { d = d.concat(a); c() } function c() { if (d.length) { for (var b = d.shift(), r = 0; r < b.length; r++) b[r](); e || a(function () { e || c() }) } } var d, e; d = b.queue = []; b.waitUntilQuiet = function (b) { e && e(); e = a(function () { e = null; b(); c() }) }; return b }]).provider("$$animateQueue",
    ["$animateProvider", function (a) {
        function b(a) { if (!a) return null; a = a.split(" "); var b = Object.create(null); q(a, function (a) { b[a] = !0 }); return b } function c(a, c) { if (a && c) { var d = b(c); return a.split(" ").some(function (a) { return d[a] }) } } function d(a, b, c, d) { return f[a].some(function (a) { return a(b, c, d) }) } function e(a, b) { var c = 0 < (a.addClass || "").length, d = 0 < (a.removeClass || "").length; return b ? c && d : c || d } var f = this.rules = { skip: [], cancel: [], join: [] }; f.join.push(function (a, b, c) { return !b.structural && e(b) }); f.skip.push(function (a,
        b, c) { return !b.structural && !e(b) }); f.skip.push(function (a, b, c) { return "leave" == c.event && b.structural }); f.skip.push(function (a, b, c) { return c.structural && 2 === c.state && !b.structural }); f.cancel.push(function (a, b, c) { return c.structural && b.structural }); f.cancel.push(function (a, b, c) { return 2 === c.state && b.structural }); f.cancel.push(function (a, b, d) { if (d.structural) return !1; a = b.addClass; b = b.removeClass; var e = d.addClass; d = d.removeClass; return N(a) && N(b) || N(e) && N(d) ? !1 : c(a, d) || c(b, e) }); this.$get = ["$$rAF", "$rootScope",
        "$rootElement", "$document", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", function (b, c, f, u, l, w, s, M, v, h) {
            function P() { var a = !1; return function (b) { a ? b() : c.$$postDigest(function () { a = !0; b() }) } } function y(a, b, c) { var g = A(b), d = A(a), k = []; (a = G[c]) && q(a, function (a) { t.call(a.node, g) ? k.push(a.callback) : "leave" === c && t.call(a.node, d) && k.push(a.callback) }); return k } function k(a, g, k) {
                function m(c, g, d, k) {
                    F(function () {
                        var c = y(J, a, g); c.length && b(function () {
                            q(c, function (b) {
                                b(a,
                                d, k)
                            })
                        })
                    }); c.progress(g, d, k)
                } function G(b) { var c = a, g = h; g.preparationClasses && (c.removeClass(g.preparationClasses), g.preparationClasses = null); g.activeClasses && (c.removeClass(g.activeClasses), g.activeClasses = null); Ja(a, h); ha(a, h); h.domOperation(); f.complete(!b) } var h = Ha(k), t, J; if (a = Ma(a)) t = A(a), J = a.parent(); var h = oa(h), f = new s, F = P(); ba(h.addClass) && (h.addClass = h.addClass.join(" ")); h.addClass && !I(h.addClass) && (h.addClass = null); ba(h.removeClass) && (h.removeClass = h.removeClass.join(" ")); h.removeClass &&
                !I(h.removeClass) && (h.removeClass = null); h.from && !ca(h.from) && (h.from = null); h.to && !ca(h.to) && (h.to = null); if (!t) return G(), f; k = [t.className, h.addClass, h.removeClass].join(" "); if (!Ua(k)) return G(), f; var v = 0 <= ["enter", "move", "leave"].indexOf(g), l = !K || u[0].hidden || C.get(t); k = !l && z.get(t) || {}; var Z = !!k.state; l || Z && 1 == k.state || (l = !n(a, J, g)); if (l) return G(), f; v && xa(a); l = { structural: v, element: a, event: g, addClass: h.addClass, removeClass: h.removeClass, close: G, options: h, runner: f }; if (Z) {
                    if (d("skip", a, l, k)) {
                        if (2 ===
                        k.state) return G(), f; T(a, k, l); return k.runner
                    } if (d("cancel", a, l, k)) if (2 === k.state) k.runner.end(); else if (k.structural) k.close(); else return T(a, k, l), k.runner; else if (d("join", a, l, k)) if (2 === k.state) T(a, l, {}); else return Qa(a, v ? g : null, h), g = l.event = k.event, h = T(a, k, l), k.runner
                } else T(a, l, {}); (Z = l.structural) || (Z = "animate" === l.event && 0 < Object.keys(l.options.to || {}).length || e(l)); if (!Z) return G(), ka(a), f; var M = (k.counter || 0) + 1; l.counter = M; D(a, 1, l); c.$$postDigest(function () {
                    var b = z.get(t), c = !b, b = b || {}, d =
                    0 < (a.parent() || []).length && ("animate" === b.event || b.structural || e(b)); if (c || b.counter !== M || !d) { c && (Ja(a, h), ha(a, h)); if (c || v && b.event !== g) h.domOperation(), f.end(); d || ka(a) } else g = !b.structural && e(b, !0) ? "setClass" : b.event, D(a, 2), b = w(a, g, b.options), b.done(function (b) { G(!b); (b = z.get(t)) && b.counter === M && ka(A(a)); m(f, g, "close", {}) }), f.setHost(b), m(f, g, "start", {})
                }); return f
            } function xa(a) {
                a = A(a).querySelectorAll("[data-ng-animate]"); q(a, function (a) {
                    var b = parseInt(a.getAttribute("data-ng-animate")), c = z.get(a);
                    if (c) switch (b) { case 2: c.runner.end(); case 1: z.remove(a) }
                })
            } function ka(a) { a = A(a); a.removeAttribute("data-ng-animate"); z.remove(a) } function J(a, b) { return A(a) === A(b) } function n(a, b, c) {
                c = H(u[0].body); var g = J(a, c) || "HTML" === a[0].nodeName, d = J(a, f), k = !1, h, m = C.get(A(a)); (a = H.data(a[0], "$ngAnimatePin")) && (b = a); for (b = A(b) ; b;) {
                    d || (d = J(b, f)); if (1 !== b.nodeType) break; a = z.get(b) || {}; if (!k) { var e = C.get(b); if (!0 === e && !1 !== m) { m = !0; break } else !1 === e && (m = !1); k = a.structural } if (N(h) || !0 === h) a = H.data(b, "$$ngAnimateChildren"),
                    Y(a) && (h = a); if (k && !1 === h) break; g || (g = J(b, c)); if (g && d) break; if (!d && (a = H.data(b, "$ngAnimatePin"))) { b = A(a); continue } b = b.parentNode
                } return (!k || h) && !0 !== m && d && g
            } function D(a, b, c) { c = c || {}; c.state = b; a = A(a); a.setAttribute("data-ng-animate", b); c = (b = z.get(a)) ? Ca(b, c) : c; z.put(a, c) } var z = new l, C = new l, K = null, g = c.$watch(function () { return 0 === M.totalPendingRequests }, function (a) { a && (g(), c.$$postDigest(function () { c.$$postDigest(function () { null === K && (K = !0) }) })) }), G = {}, m = a.classNameFilter(), Ua = m ? function (a) { return m.test(a) } :
            function () { return !0 }, Ja = Q(v), t = Node.prototype.contains || function (a) { return this === a || !!(this.compareDocumentPosition(a) & 16) }, Z = {
                on: function (a, b, c) { var g = ga(b); G[a] = G[a] || []; G[a].push({ node: g, callback: c }); H(b).on("$destroy", function () { Z.off(a, b, c) }) }, off: function (a, b, c) { function g(a, b, c) { var d = ga(b); return a.filter(function (a) { return !(a.node === d && (!c || a.callback === c)) }) } var d = G[a]; d && (G[a] = 1 === arguments.length ? null : g(d, b, c)) }, pin: function (a, b) {
                    ya(ta(a), "element", "not an element"); ya(ta(b), "parentElement",
                    "not an element"); a.data("$ngAnimatePin", b)
                }, push: function (a, b, c, g) { c = c || {}; c.domOperation = g; return k(a, b, c) }, enabled: function (a, b) { var c = arguments.length; if (0 === c) b = !!K; else if (ta(a)) { var g = A(a), d = C.get(g); 1 === c ? b = !d : C.put(g, !b) } else b = K = !!a; return b }
            }; return Z
        }]
    }]).provider("$$animation", ["$animateProvider", function (a) {
        function b(a) { return a.data("$$animationRunner") } var c = this.drivers = []; this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$HashMap", "$$rAFScheduler", function (a, e,
        f, r, x, F) {
            function u(a) {
                function b(a) { if (a.processed) return a; a.processed = !0; var d = a.domNode, h = d.parentNode; e.put(d, a); for (var f; h;) { if (f = e.get(h)) { f.processed || (f = b(f)); break } h = h.parentNode } (f || c).children.push(a); return a } var c = { children: [] }, d, e = new x; for (d = 0; d < a.length; d++) { var f = a[d]; e.put(f.domNode, a[d] = { domNode: f.domNode, fn: f.fn, children: [] }) } for (d = 0; d < a.length; d++) b(a[d]); return function (a) {
                    var b = [], c = [], d; for (d = 0; d < a.children.length; d++) c.push(a.children[d]); a = c.length; var h = 0, e = []; for (d = 0; d <
                    c.length; d++) { var f = c[d]; 0 >= a && (a = h, h = 0, b.push(e), e = []); e.push(f.fn); f.children.forEach(function (a) { h++; c.push(a) }); a-- } e.length && b.push(e); return b
                }(c)
            } var l = [], w = Q(a); return function (s, x, v) {
                function h(a) { a = a.hasAttribute("ng-animate-ref") ? [a] : a.querySelectorAll("[ng-animate-ref]"); var b = []; q(a, function (a) { var c = a.getAttribute("ng-animate-ref"); c && c.length && b.push(a) }); return b } function P(a) {
                    var b = [], c = {}; q(a, function (a, g) {
                        var d = A(a.element), k = 0 <= ["enter", "move"].indexOf(a.event), d = a.structural ?
                        h(d) : []; if (d.length) { var e = k ? "to" : "from"; q(d, function (a) { var b = a.getAttribute("ng-animate-ref"); c[b] = c[b] || {}; c[b][e] = { animationID: g, element: H(a) } }) } else b.push(a)
                    }); var d = {}, k = {}; q(c, function (c, h) {
                        var e = c.from, f = c.to; if (e && f) {
                            var m = a[e.animationID], C = a[f.animationID], n = e.animationID.toString(); if (!k[n]) {
                                var D = k[n] = { structural: !0, beforeStart: function () { m.beforeStart(); C.beforeStart() }, close: function () { m.close(); C.close() }, classes: y(m.classes, C.classes), from: m, to: C, anchors: [] }; D.classes.length ? b.push(D) :
                                (b.push(m), b.push(C))
                            } k[n].anchors.push({ out: e.element, "in": f.element })
                        } else e = e ? e.animationID : f.animationID, f = e.toString(), d[f] || (d[f] = !0, b.push(a[e]))
                    }); return b
                } function y(a, b) { a = a.split(" "); b = b.split(" "); for (var c = [], d = 0; d < a.length; d++) { var k = a[d]; if ("ng-" !== k.substring(0, 3)) for (var e = 0; e < b.length; e++) if (k === b[e]) { c.push(k); break } } return c.join(" ") } function k(a) { for (var b = c.length - 1; 0 <= b; b--) { var d = c[b]; if (f.has(d) && (d = f.get(d)(a))) return d } } function xa(a, c) {
                    a.from && a.to ? (b(a.from.element).setHost(c),
                    b(a.to.element).setHost(c)) : b(a.element).setHost(c)
                } function ka() { var a = b(s); !a || "leave" === x && v.$$domOperationFired || a.end() } function J(b) { s.off("$destroy", ka); s.removeData("$$animationRunner"); w(s, v); ha(s, v); v.domOperation(); C && a.removeClass(s, C); s.removeClass("ng-animate"); D.complete(!b) } v = oa(v); var n = 0 <= ["enter", "move", "leave"].indexOf(x), D = new r({ end: function () { J() }, cancel: function () { J(!0) } }); if (!c.length) return J(), D; s.data("$$animationRunner", D); var z = za(s.attr("class"), za(v.addClass, v.removeClass)),
                C = v.tempClasses; C && (z += " " + C, v.tempClasses = null); var K; n && (K = "ng-" + x + "-prepare", a.addClass(s, K)); l.push({ element: s, classes: z, event: x, structural: n, options: v, beforeStart: function () { s.addClass("ng-animate"); C && a.addClass(s, C); K && (a.removeClass(s, K), K = null) }, close: J }); s.on("$destroy", ka); if (1 < l.length) return D; e.$$postDigest(function () {
                    var a = []; q(l, function (c) { b(c.element) ? a.push(c) : c.close() }); l.length = 0; var c = P(a), d = []; q(c, function (a) {
                        d.push({
                            domNode: A(a.from ? a.from.element : a.element), fn: function () {
                                a.beforeStart();
                                var c, d = a.close; if (b(a.anchors ? a.from.element || a.to.element : a.element)) { var g = k(a); g && (c = g.start) } c ? (c = c(), c.done(function (a) { d(!a) }), xa(a, c)) : d()
                            }
                        })
                    }); F(u(d))
                }); return D
            }
        }]
    }]).provider("$animateCss", ["$animateProvider", function (a) {
        var b = Fa(), c = Fa(); this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$$animateQueue", function (a, e, f, r, x, F, u, l) {
            function w(a, b) {
                var c = a.parentNode; return (c.$$ngAnimateParentKey || (c.$$ngAnimateParentKey = ++P)) + "-" + a.getAttribute("class") +
                "-" + b
            } function s(k, h, f, l) { var n; 0 < b.count(f) && (n = c.get(f), n || (h = V(h, "-stagger"), e.addClass(k, h), n = Da(a, k, l), n.animationDuration = Math.max(n.animationDuration, 0), n.transitionDuration = Math.max(n.transitionDuration, 0), e.removeClass(k, h), c.put(f, n))); return n || {} } function M(a) { y.push(a); u.waitUntilQuiet(function () { b.flush(); c.flush(); for (var a = x(), d = 0; d < y.length; d++) y[d](a); y.length = 0 }) } function v(c, h, e) {
                h = b.get(e); h || (h = Da(a, c, Sa), "infinite" === h.animationIterationCount && (h.animationIterationCount = 1));
                b.put(e, h); c = h; e = c.animationDelay; h = c.transitionDelay; c.maxDelay = e && h ? Math.max(e, h) : e || h; c.maxDuration = Math.max(c.animationDuration * c.animationIterationCount, c.transitionDuration); return c
            } var h = Q(e), P = 0, y = []; return function (a, c) {
                function d() { n() } function u() { n(!0) } function n(b) {
                    if (!(P || H && da)) {
                        P = !0; da = !1; g.$$skipPreparationClasses || e.removeClass(a, fa); e.removeClass(a, ga); ra(m, !1); pa(m, !1); q(y, function (a) { m.style[a[0]] = "" }); h(a, g); ha(a, g); Object.keys(G).length && q(G, function (a, b) {
                            a ? m.style.setProperty(b,
                            a) : m.style.removeProperty(b)
                        }); if (g.onDone) g.onDone(); ea && ea.length && a.off(ea.join(" "), C); var c = a.data("$$animateCss"); c && (r.cancel(c[0].timer), a.removeData("$$animateCss")); E && E.complete(!b)
                    }
                } function D(a) { p.blockTransition && pa(m, a); p.blockKeyframeAnimation && ra(m, !!a) } function z() { E = new f({ end: d, cancel: u }); M(O); n(); return { $$willAnimate: !1, start: function () { return E }, end: d } } function C(a) {
                    a.stopPropagation(); var b = a.originalEvent || a; a = b.$manualTimeStamp || Date.now(); b = parseFloat(b.elapsedTime.toFixed(3));
                    Math.max(a - W, 0) >= Q && b >= L && (H = !0, n())
                } function K() {
                    function b() {
                        if (!P) {
                            D(!1); q(y, function (a) { m.style[a[0]] = a[1] }); h(a, g); e.addClass(a, ga); if (p.recalculateTimingStyles) { na = m.className + " " + fa; ia = w(m, na); B = v(m, na, ia); $ = B.maxDelay; I = Math.max($, 0); L = B.maxDuration; if (0 === L) { n(); return } p.hasTransitions = 0 < B.transitionDuration; p.hasAnimations = 0 < B.animationDuration } p.applyAnimationDelay && ($ = "boolean" !== typeof g.delay && sa(g.delay) ? parseFloat(g.delay) : $, I = Math.max($, 0), B.animationDelay = $, aa = [qa, $ + "s"], y.push(aa),
                            m.style[aa[0]] = aa[1]); Q = 1E3 * I; T = 1E3 * L; if (g.easing) { var d, f = g.easing; p.hasTransitions && (d = R + "TimingFunction", y.push([d, f]), m.style[d] = f); p.hasAnimations && (d = X + "TimingFunction", y.push([d, f]), m.style[d] = f) } B.transitionDuration && ea.push(ua); B.animationDuration && ea.push(va); W = Date.now(); var l = Q + 1.5 * T; d = W + l; var f = a.data("$$animateCss") || [], K = !0; if (f.length) { var z = f[0]; (K = d > z.expectedEndTime) ? r.cancel(z.timer) : f.push(n) } K && (l = r(c, l, !1), f[0] = { timer: l, expectedEndTime: d }, f.push(n), a.data("$$animateCss", f));
                            if (ea.length) a.on(ea.join(" "), C); g.to && (g.cleanupStyles && Ga(G, m, Object.keys(g.to)), Ba(a, g))
                        }
                    } function c() { var b = a.data("$$animateCss"); if (b) { for (var d = 1; d < b.length; d++) b[d](); a.removeData("$$animateCss") } } if (!P) if (m.parentNode) {
                        var d = function (a) { if (H) da && a && (da = !1, n()); else if (da = !a, B.animationDuration) if (a = ra(m, da), da) y.push(a); else { var b = y, c = b.indexOf(a); 0 <= a && b.splice(c, 1) } }, f = 0 < ca && (B.transitionDuration && 0 === U.transitionDuration || B.animationDuration && 0 === U.animationDuration) && Math.max(U.animationDelay,
                        U.transitionDelay); f ? r(b, Math.floor(f * ca * 1E3), !1) : b(); N.resume = function () { d(!0) }; N.pause = function () { d(!1) }
                    } else n()
                } var g = c || {}; g.$$prepared || (g = oa(Ha(g))); var G = {}, m = A(a); if (!m || !m.parentNode || !l.enabled()) return z(); var y = [], x = a.attr("class"), t = La(g), P, da, H, E, N, I, Q, L, T, W, ea = []; if (0 === g.duration || !F.animations && !F.transitions) return z(); var ja = g.event && ba(g.event) ? g.event.join(" ") : g.event, Y = "", S = ""; ja && g.structural ? Y = V(ja, "ng-", !0) : ja && (Y = ja); g.addClass && (S += V(g.addClass, "-add")); g.removeClass &&
                (S.length && (S += " "), S += V(g.removeClass, "-remove")); g.applyClassesEarly && S.length && h(a, g); var fa = [Y, S].join(" ").trim(), na = x + " " + fa, ga = V(fa, "-active"), x = t.to && 0 < Object.keys(t.to).length; if (!(0 < (g.keyframeStyle || "").length || x || fa)) return z(); var ia, U; 0 < g.stagger ? (t = parseFloat(g.stagger), U = { transitionDelay: t, animationDelay: t, transitionDuration: 0, animationDuration: 0 }) : (ia = w(m, na), U = s(m, fa, ia, Ta)); g.$$skipPreparationClasses || e.addClass(a, fa); g.transitionStyle && (t = [R, g.transitionStyle], la(m, t), y.push(t));
                0 <= g.duration && (t = 0 < m.style[R].length, t = Ea(g.duration, t), la(m, t), y.push(t)); g.keyframeStyle && (t = [X, g.keyframeStyle], la(m, t), y.push(t)); var ca = U ? 0 <= g.staggerIndex ? g.staggerIndex : b.count(ia) : 0; (ja = 0 === ca) && !g.skipBlocking && pa(m, 9999); var B = v(m, na, ia), $ = B.maxDelay; I = Math.max($, 0); L = B.maxDuration; var p = {}; p.hasTransitions = 0 < B.transitionDuration; p.hasAnimations = 0 < B.animationDuration; p.hasTransitionAll = p.hasTransitions && "all" == B.transitionProperty; p.applyTransitionDuration = x && (p.hasTransitions && !p.hasTransitionAll ||
                p.hasAnimations && !p.hasTransitions); p.applyAnimationDuration = g.duration && p.hasAnimations; p.applyTransitionDelay = sa(g.delay) && (p.applyTransitionDuration || p.hasTransitions); p.applyAnimationDelay = sa(g.delay) && p.hasAnimations; p.recalculateTimingStyles = 0 < S.length; if (p.applyTransitionDuration || p.applyAnimationDuration) L = g.duration ? parseFloat(g.duration) : L, p.applyTransitionDuration && (p.hasTransitions = !0, B.transitionDuration = L, t = 0 < m.style[R + "Property"].length, y.push(Ea(L, t))), p.applyAnimationDuration && (p.hasAnimations =
                !0, B.animationDuration = L, y.push([wa, L + "s"])); if (0 === L && !p.recalculateTimingStyles) return z(); if (null != g.delay) { var aa; "boolean" !== typeof g.delay && (aa = parseFloat(g.delay), I = Math.max(aa, 0)); p.applyTransitionDelay && y.push([ma, aa + "s"]); p.applyAnimationDelay && y.push([qa, aa + "s"]) } null == g.duration && 0 < B.transitionDuration && (p.recalculateTimingStyles = p.recalculateTimingStyles || ja); Q = 1E3 * I; T = 1E3 * L; g.skipBlocking || (p.blockTransition = 0 < B.transitionDuration, p.blockKeyframeAnimation = 0 < B.animationDuration && 0 < U.animationDelay &&
                0 === U.animationDuration); g.from && (g.cleanupStyles && Ga(G, m, Object.keys(g.from)), Aa(a, g)); p.blockTransition || p.blockKeyframeAnimation ? D(L) : g.skipBlocking || pa(m, !1); return { $$willAnimate: !0, end: d, start: function () { if (!P) return N = { end: d, cancel: u, resume: null, pause: null }, E = new f(N), M(K), E } }
            }
        }]
    }]).provider("$$animateCssDriver", ["$$animationProvider", function (a) {
        a.drivers.push("$$animateCssDriver"); this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$sniffer", "$$jqLite", "$document", function (a,
        c, d, e, f, r, x) {
            function F(a) { return a.replace(/\bng-\S+\b/g, "") } function u(a, b) { I(a) && (a = a.split(" ")); I(b) && (b = b.split(" ")); return a.filter(function (a) { return -1 === b.indexOf(a) }).join(" ") } function l(c, e, f) {
                function k(a) { var b = {}, c = A(a).getBoundingClientRect(); q(["width", "height", "top", "left"], function (a) { var d = c[a]; switch (a) { case "top": d += M.scrollTop; break; case "left": d += M.scrollLeft } b[a] = Math.floor(d) + "px" }); return b } function l() {
                    var c = F(f.attr("class") || ""), d = u(c, n), c = u(n, c), d = a(r, {
                        to: k(f), addClass: "ng-anchor-in " +
                        d, removeClass: "ng-anchor-out " + c, delay: !0
                    }); return d.$$willAnimate ? d : null
                } function x() { r.remove(); e.removeClass("ng-animate-shim"); f.removeClass("ng-animate-shim") } var r = H(A(e).cloneNode(!0)), n = F(r.attr("class") || ""); e.addClass("ng-animate-shim"); f.addClass("ng-animate-shim"); r.addClass("ng-anchor"); v.append(r); var D; c = function () { var c = a(r, { addClass: "ng-anchor-out", delay: !0, from: k(e) }); return c.$$willAnimate ? c : null }(); if (!c && (D = l(), !D)) return x(); var z = c || D; return {
                    start: function () {
                        function a() {
                            c &&
                            c.end()
                        } var b, c = z.start(); c.done(function () { c = null; if (!D && (D = l())) return c = D.start(), c.done(function () { c = null; x(); b.complete() }), c; x(); b.complete() }); return b = new d({ end: a, cancel: a })
                    }
                }
            } function w(a, b, c, e) {
                var f = s(a, O), r = s(b, O), x = []; q(e, function (a) { (a = l(c, a.out, a["in"])) && x.push(a) }); if (f || r || 0 !== x.length) return {
                    start: function () {
                        function a() { q(b, function (a) { a.end() }) } var b = []; f && b.push(f.start()); r && b.push(r.start()); q(x, function (a) { b.push(a.start()) }); var c = new d({ end: a, cancel: a }); d.all(b, function (a) { c.complete(a) });
                        return c
                    }
                }
            } function s(c) { var d = c.element, e = c.options || {}; c.structural && (e.event = c.event, e.structural = !0, e.applyClassesEarly = !0, "leave" === c.event && (e.onDone = e.domOperation)); e.preparationClasses && (e.event = W(e.event, e.preparationClasses)); c = a(d, e); return c.$$willAnimate ? c : null } if (!f.animations && !f.transitions) return O; var M = x[0].body; c = A(e); var v = H(c.parentNode && 11 === c.parentNode.nodeType || M.contains(c) ? c : M); Q(r); return function (a) { return a.from && a.to ? w(a.from, a.to, a.classes, a.anchors) : s(a) }
        }]
    }]).provider("$$animateJs",
    ["$animateProvider", function (a) {
        this.$get = ["$injector", "$$AnimateRunner", "$$jqLite", function (b, c, d) {
            function e(c) { c = ba(c) ? c : c.split(" "); for (var d = [], e = {}, f = 0; f < c.length; f++) { var l = c[f], q = a.$$registeredAnimations[l]; q && !e[l] && (d.push(b.get(q)), e[l] = !0) } return d } var f = Q(d); return function (a, b, d, u) {
                function l() { u.domOperation(); f(a, u) } function w(a, b, d, e, g) {
                    switch (d) {
                        case "animate": b = [b, e.from, e.to, g]; break; case "setClass": b = [b, h, H, g]; break; case "addClass": b = [b, h, g]; break; case "removeClass": b = [b, H, g];
                            break; default: b = [b, g]
                    } b.push(e); if (a = a.apply(a, b)) if (Ia(a.start) && (a = a.start()), a instanceof c) a.done(g); else if (Ia(a)) return a; return O
                } function s(a, b, d, e, g) { var f = []; q(e, function (e) { var h = e[g]; h && f.push(function () { var e, g, f = !1, k = function (a) { f || (f = !0, (g || O)(a), e.complete(!a)) }; e = new c({ end: function () { k() }, cancel: function () { k(!0) } }); g = w(h, a, b, d, function (a) { k(!1 === a) }); return e }) }); return f } function A(a, b, d, e, g) {
                    var f = s(a, b, d, e, g); if (0 === f.length) {
                        var h, k; "beforeSetClass" === g ? (h = s(a, "removeClass",
                        d, e, "beforeRemoveClass"), k = s(a, "addClass", d, e, "beforeAddClass")) : "setClass" === g && (h = s(a, "removeClass", d, e, "removeClass"), k = s(a, "addClass", d, e, "addClass")); h && (f = f.concat(h)); k && (f = f.concat(k))
                    } if (0 !== f.length) return function (a) { var b = []; f.length && q(f, function (a) { b.push(a()) }); b.length ? c.all(b, a) : a(); return function (a) { q(b, function (b) { a ? b.cancel() : b.end() }) } }
                } var v = !1; 3 === arguments.length && ca(d) && (u = d, d = null); u = oa(u); d || (d = a.attr("class") || "", u.addClass && (d += " " + u.addClass), u.removeClass && (d += " " +
                u.removeClass)); var h = u.addClass, H = u.removeClass, y = e(d), k, E; if (y.length) { var I, J; "leave" == b ? (J = "leave", I = "afterLeave") : (J = "before" + b.charAt(0).toUpperCase() + b.substr(1), I = b); "enter" !== b && "move" !== b && (k = A(a, b, u, y, J)); E = A(a, b, u, y, I) } if (k || E) {
                    var n; return {
                        $$willAnimate: !0, end: function () { n ? n.end() : (v = !0, l(), ha(a, u), n = new c, n.complete(!0)); return n }, start: function () {
                            function b(c) { v = !0; l(); ha(a, u); n.complete(c) } if (n) return n; n = new c; var d, e = []; k && e.push(function (a) { d = k(a) }); e.length ? e.push(function (a) {
                                l();
                                a(!0)
                            }) : l(); E && e.push(function (a) { d = E(a) }); n.setHost({ end: function () { v || ((d || O)(void 0), b(void 0)) }, cancel: function () { v || ((d || O)(!0), b(!0)) } }); c.chain(e, b); return n
                        }
                    }
                }
            }
        }]
    }]).provider("$$animateJsDriver", ["$$animationProvider", function (a) {
        a.drivers.push("$$animateJsDriver"); this.$get = ["$$animateJs", "$$AnimateRunner", function (a, c) {
            function d(c) { return a(c.element, c.event, c.classes, c.options) } return function (a) {
                if (a.from && a.to) {
                    var b = d(a.from), r = d(a.to); if (b || r) return {
                        start: function () {
                            function a() {
                                return function () {
                                    q(d,
                                    function (a) { a.end() })
                                }
                            } var d = []; b && d.push(b.start()); r && d.push(r.start()); c.all(d, function (a) { e.complete(a) }); var e = new c({ end: a(), cancel: a() }); return e
                        }
                    }
                } else return d(a)
            }
        }]
    }])
})(window, window.angular);
//# sourceMappingURL=angular-animate.min.js.map;
(function(e){var i;e.module("ui.materialize",["ui.materialize.ngModel","ui.materialize.collapsible","ui.materialize.toast","ui.materialize.sidenav","ui.materialize.material_select","ui.materialize.dropdown","ui.materialize.inputfield","ui.materialize.input_date","ui.materialize.tabs","ui.materialize.pagination","ui.materialize.pushpin","ui.materialize.scrollspy","ui.materialize.parallax","ui.materialize.modal","ui.materialize.tooltipped","ui.materialize.slider","ui.materialize.materialboxed","ui.materialize.scrollFire","ui.materialize.nouislider","ui.materialize.input_clock","ui.materialize.carousel"]);e.module("ui.materialize.scrollFire",[]).directive("scrollFire",["$compile","$timeout",function(i,n){return{restrict:"A",scope:{offset:"@",scrollFire:"&"},link:function(i,n,a){var o=i.offset;if(!e.isDefined(i.offset)){o=0}o=Number(o)||0;var r=false;var l=t(function(){if(r){return}var e=window.pageYOffset+window.innerHeight;var t=n[0].getBoundingClientRect().top+window.pageYOffset;if(e>t+o){r=true;i.scrollFire({});s()}},100);function s(){$(window).off("scroll resize blur focus",l)}$(window).on("scroll resize blur focus",l);l();i.$on("$destroy",s)}}}]);function t(e,i){var t,n,a,o;var r=0;var l=function(){r=+new Date;t=null;o=e.apply(n,a);if(!t)n=a=null};var s=function(){var s=+new Date;var u=i-(s-r);n=this;a=arguments;if(u<=0||u>i){if(t){clearTimeout(t);t=null}r=s;o=e.apply(n,a);if(!t)n=a=null}else if(!t){t=setTimeout(l,u)}return o};s.cancel=function(){clearTimeout(t);r=0;t=n=a=null};return s}e.module("ui.materialize.ngModel",[]).directive("ngModel",["$timeout",function(e){return{restrict:"A",priority:-1,link:function(t,n,a){t.$watch(a.ngModel,function(t,a){e(function(){if(t instanceof Array&&a instanceof Array){if(t.length==a.length){return}}if(t){n.trigger("change")}else if(n.attr("placeholder")===i){if(!n.is(":focus"))n.trigger("blur")}})})}}}]);e.module("ui.materialize.slider",[]).directive("slider",["$timeout",function(i){return{restrict:"A",scope:{height:"=",transition:"=",interval:"=",indicators:"="},link:function(t,n,a){n.addClass("slider");i(function(){n.slider({height:e.isDefined(t.height)?t.height:400,transition:e.isDefined(t.transition)?t.transition:500,interval:e.isDefined(t.interval)?t.interval:6e3,indicators:e.isDefined(t.indicators)?t.indicators:true})})}}}]);e.module("ui.materialize.carousel",[]).directive("carousel",["$timeout",function(i){return{restrict:"A",scope:{timeConstant:"@",dist:"@",shift:"@",padding:"@",fullWidth:"@",indicators:"@",noWrap:"@"},link:function(t,n,a){n.addClass("carousel");i(function(){n.carousel({time_constant:e.isDefined(t.timeConstant)?t.timeConstant:200,dist:e.isDefined(t.dist)?t.dist:-100,shift:e.isDefined(t.shift)?t.shift:0,padding:e.isDefined(t.padding)?t.padding:0,full_width:e.isDefined(t.fullWidth)?t.fullWidth:false,indicators:e.isDefined(t.indicators)?t.indicators:false,no_wrap:e.isDefined(t.noWrap)?t.noWrap:false})})}}}]);e.module("ui.materialize.collapsible",[]).directive("collapsible",["$timeout",function(e){return{link:function(i,t,n){e(function(){t.collapsible()});if("watch"in n){i.$watch(function(){return t[0].innerHTML},function(i,n){if(i!==n){e(function(){t.collapsible()})}})}}}}]);e.module("ui.materialize.parallax",[]).directive("parallax",["$timeout",function(e){return{link:function(i,t,n){e(function(){t.parallax()})}}}]);e.module("ui.materialize.toast",[]).constant("toastConfig",{duration:3e3}).directive("toast",["toastConfig",function(i){return{scope:{message:"@",duration:"@",callback:"&"},link:function(t,n,a){n.bind(a.toast,function(){var n=e.isDefined(t.message)?t.message:"";var o=e.isDefined(a.toastclass)?a.toastclass:"";Materialize.toast(n,t.duration?t.duration:i.duration,o,t.callback)})}}}]);e.module("ui.materialize.pushpin",[]).directive("pushpin",[function(){return{restrict:"AE",require:["?pushpinTop","?pushpinOffset","?pushpinBottom"],link:function(e,i,t){var n=t.pushpinTop||0;var a=t.pushpinOffset||0;var o=t.pushpinBottom||Infinity;setTimeout(function(){i.pushpin({top:n,offset:a,bottom:o})},0)}}}]);e.module("ui.materialize.scrollspy",[]).directive("scrollspy",["$timeout",function(e){return{restrict:"A",link:function(i,t,n){t.addClass("scrollspy");e(function(){t.scrollSpy()})}}}]);e.module("ui.materialize.tabs",[]).directive("tabs",["$timeout",function(e){return{scope:{reload:"="},link:function(i,t,n){t.addClass("tabs");e(function(){t.tabs()});i.$watch("reload",function(e){if(e===true){t.tabs();i.reload=false}})}}}]);e.module("ui.materialize.sidenav",[]).directive("sidenav",[function(){return{scope:{menuwidth:"@",closeonclick:"@"},link:function(t,n,a){n.sideNav({menuWidth:e.isDefined(t.menuwidth)?parseInt(t.menuwidth,10):i,edge:a.sidenav?a.sidenav:"left",closeOnClick:e.isDefined(t.closeonclick)?t.closeonclick=="true":i})}}}]);e.module("ui.materialize.material_select",[]).directive("materialSelect",["$compile","$timeout",function(t,n){return{link:function(t,a,o){if(a.is("select")){function r(e,n){if(o.multiple){if(n!==i&&e!==i){if(n.length===e.length){return}}var r=a.siblings("ul.active");if(e!==i&&r.length){var l=r.children("li.active").length;if(l==e.length){return}}}a.siblings(".caret").remove();t.$evalAsync(function(){a.material_select(function(){if(!o.multiple){$("input.select-dropdown").trigger("close")}});var e=function(e){if(e.clientX>=e.target.clientWidth||e.clientY>=e.target.clientHeight){e.preventDefault()}};a.siblings("input.select-dropdown").on("mousedown",e)})}n(r);if(o.ngModel){if(o.ngModel&&!e.isDefined(t.$eval(o.ngModel))){var l=false;t.$watch(o.ngModel,function(i,n){if(!l&&e.isDefined(t.$eval(o.ngModel))){l=true;r()}else{r(i,n)}})}else{t.$watch(o.ngModel,r)}}if("watch"in o){t.$watch(function(){return a[0].innerHTML},function(e,i){if(e!==i){n(r)}})}}}}}]);e.module("ui.materialize.dropdown",[]).directive("dropdown",["$timeout",function(t){return{scope:{inDuration:"@",outDuration:"@",constrainWidth:"@",hover:"@",alignment:"@",gutter:"@",belowOrigin:"@"},link:function(n,a,o){t(function(){a.dropdown({inDuration:e.isDefined(n.inDuration)?n.inDuration:i,outDuration:e.isDefined(n.outDuration)?n.outDuration:i,constrain_width:e.isDefined(n.constrainWidth)?n.constrainWidth:i,hover:e.isDefined(n.hover)?n.hover:i,alignment:e.isDefined(n.alignment)?n.alignment:i,gutter:e.isDefined(n.gutter)?n.gutter:i,belowOrigin:e.isDefined(n.belowOrigin)?n.belowOrigin:i})})}}}]);e.module("ui.materialize.inputfield",[]).directive("inputField",["$timeout",function(i){var t=0;return{transclude:true,scope:{},link:function(n,a){i(function(){var o=a.find("> > input, > > textarea");var r=a.find("> > label");if(o.length==1&&r.length==1&&!o.attr("id")&&!r.attr("for")){var l="angularMaterializeID"+t++;o.attr("id",l);r.attr("for",l)}Materialize.updateTextFields();a.find("> > .materialize-textarea").each(function(){var e=$(this);e.addClass("materialize-textarea");e.trigger("autoresize");var t=e.attr("ng-model");if(t){n.$parent.$watch(t,function(t,n){if(t!==n){i(function(){e.trigger("autoresize")})}})}});a.find("> > .materialize-textarea, > > input").each(function(i,t){t=e.element(t);if(!t.siblings('span[class="character-counter"]').length){t.characterCounter()}})})},template:'<div ng-transclude class="input-field"></div>'}}]);e.module("ui.materialize.input_date",[]).directive("inputDate",["$compile","$timeout",function(t,n){var a=$("<style>#inputCreated_root {outline: none;}</style>");$("html > head").append(a);var o=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,t=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g,a=function(e,i){e=String(e);i=i||2;while(e.length<i){e="0"+e}return e};return function(r,l,s){var u=o;if(arguments.length===1&&Object.prototype.toString.call(r)=="[object String]"&&!/\d/.test(r)){l=r;r=i}r=r?new Date(r):new Date;if(isNaN(r))throw SyntaxError("invalid date");l=String(u.masks[l]||l||u.masks["default"]);if(l.slice(0,4)=="UTC:"){l=l.slice(4);s=true}var c=s?"getUTC":"get",d=r[c+"Date"](),f=r[c+"Day"](),m=r[c+"Month"](),p=r[c+"FullYear"](),g=r[c+"Hours"](),v=r[c+"Minutes"](),h=r[c+"Seconds"](),y=r[c+"Milliseconds"](),D=s?0:r.getTimezoneOffset(),b={d:d,dd:a(d),ddd:u.i18n.dayNames[f],dddd:u.i18n.dayNames[f+7],m:m+1,mm:a(m+1),mmm:u.i18n.monthNames[m],mmmm:u.i18n.monthNames[m+12],yy:String(p).slice(2),yyyy:p,h:g%12||12,hh:a(g%12||12),H:g,HH:a(g),M:v,MM:a(v),s:h,ss:a(h),l:a(y,3),L:a(y>99?Math.round(y/10):y),t:g<12?"a":"p",tt:g<12?"am":"pm",T:g<12?"A":"P",TT:g<12?"AM":"PM",Z:s?"UTC":(String(r).match(t)||[""]).pop().replace(n,""),o:(D>0?"-":"+")+a(Math.floor(Math.abs(D)/60)*100+Math.abs(D)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10]};return l.replace(e,function(e){return e in b?b[e]:e.slice(1,e.length-1)})}}();o.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};o.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Date.prototype.format=function(e,i){return o(this,e,i)};var r=function(e){if(Object.prototype.toString.call(e)==="[object Date]"){return!isNaN(e.getTime())}return false};return{require:"ngModel",scope:{container:"@",format:"@",formatSubmit:"@",monthsFull:"@",monthsShort:"@",weekdaysFull:"@",weekdaysShort:"@",weekdaysLetter:"@",firstDay:"=",disable:"=",today:"=",clear:"=",close:"=",selectYears:"=",onStart:"&",onRender:"&",onOpen:"&",onClose:"&",onSet:"&",onStop:"&",ngReadonly:"=?",max:"@",min:"@"},link:function(a,o,l,s){s.$formatters.unshift(function(i){if(i){var t=new Date(i);return e.isDefined(a.format)?t.format(a.format):t.format("d mmmm, yyyy")}return null});var u=e.isDefined(a.monthsFull)?a.$eval(a.monthsFull):i,c=e.isDefined(a.monthsShort)?a.$eval(a.monthsShort):i,d=e.isDefined(a.weekdaysFull)?a.$eval(a.weekdaysFull):i,f=e.isDefined(a.weekdaysShort)?a.$eval(a.weekdaysShort):i,m=e.isDefined(a.weekdaysLetter)?a.$eval(a.weekdaysLetter):i;t(o.contents())(a);if(!a.ngReadonly){n(function(){var t={container:a.container,format:e.isDefined(a.format)?a.format:i,formatSubmit:e.isDefined(a.formatSubmit)?a.formatSubmit:i,monthsFull:e.isDefined(u)?u:i,monthsShort:e.isDefined(c)?c:i,weekdaysFull:e.isDefined(d)?d:i,weekdaysShort:e.isDefined(f)?f:i,weekdaysLetter:e.isDefined(m)?m:i,firstDay:e.isDefined(a.firstDay)?a.firstDay:0,disable:e.isDefined(a.disable)?a.disable:i,today:e.isDefined(a.today)?a.today:i,clear:e.isDefined(a.clear)?a.clear:i,close:e.isDefined(a.close)?a.close:i,selectYears:e.isDefined(a.selectYears)?a.selectYears:i,onStart:e.isDefined(a.onStart)?function(){a.onStart()}:i,onRender:e.isDefined(a.onRender)?function(){a.onRender()}:i,onOpen:e.isDefined(a.onOpen)?function(){a.onOpen()}:i,onClose:e.isDefined(a.onClose)?function(){a.onClose()}:i,onSet:e.isDefined(a.onSet)?function(){a.onSet()}:i,onStop:e.isDefined(a.onStop)?function(){a.onStop()}:i};if(!a.container){delete t.container}var n=o.pickadate(t);var l=n.pickadate("picker");a.$watch("max",function(e){if(l){var i=new Date(e);l.set({max:r(i)?i:false})}});a.$watch("min",function(e){if(l){var i=new Date(e);l.set({min:r(i)?i:false})}});a.$watch("disable",function(i){if(l){var t=e.isDefined(i)&&e.isArray(i)?i:false;l.set({disable:t})}})})}}}}]);e.module("ui.materialize.input_clock",[]).directive("inputClock",[function(){return{restrict:"A",scope:{"default":"@",fromnow:"=?",donetext:"@",autoclose:"=?",ampmclickable:"=?",darktheme:"=?",twelvehour:"=?",vibrate:"=?"},link:function(i,t){$(t).addClass("timepicker");if(!i.ngReadonly){t.pickatime({"default":e.isDefined(i.default)?i.default:"",fromnow:e.isDefined(i.fromnow)?i.fromnow:0,donetext:e.isDefined(i.donetext)?i.donetext:"Done",autoclose:e.isDefined(i.autoclose)?i.autoclose:false,ampmclickable:e.isDefined(i.ampmclickable)?i.ampmclickable:false,darktheme:e.isDefined(i.darktheme)?i.darktheme:false,twelvehour:e.isDefined(i.twelvehour)?i.twelvehour:true,vibrate:e.isDefined(i.vibrate)?i.vibrate:true})}}}}]);e.module("ui.materialize.pagination",[]).directive("pagination",["$sce",function(e){function i(e,i){e.List=[];e.Hide=false;e.page=parseInt(e.page)||1;e.total=parseInt(e.total)||0;e.dots=e.dots||"...";e.ulClass=e.ulClass||i.ulClass||"pagination";e.adjacent=parseInt(e.adjacent)||2;e.activeClass="active";e.disabledClass="disabled";e.scrollTop=e.$eval(i.scrollTop);e.hideIfEmpty=e.$eval(i.hideIfEmpty);e.showPrevNext=e.$eval(i.showPrevNext);e.useSimplePrevNext=e.$eval(i.useSimplePrevNext)}function t(e,i){if(e.page>i){e.page=i}if(e.page<=0){e.page=1}if(e.adjacent<=0){e.adjacent=2}if(i<=1){e.Hide=e.hideIfEmpty}}function n(e,i){i=i.valueOf();if(e.page==i){return}e.page=i;e.paginationAction({page:i});if(e.scrollTop){scrollTo(0,0)}}function a(i,t,a){var o=0;for(o=i;o<=t;o++){var r={value:e.trustAsHtml(o.toString()),liClass:a.page==o?a.activeClass:"waves-effect",action:function(){n(a,this.value)}};a.List.push(r)}}function o(i){i.List.push({value:e.trustAsHtml(i.dots)})}function r(e,i){a(1,2,e);if(i!=3){o(e)}}function l(i,t,a){if(!i.showPrevNext||t<1){return}var o,r,l;if(a==="prev"){o=i.page-1<=0;var s=i.page-1<=0?1:i.page-1;if(i.useSimplePrevNext){r={value:"<<",title:"First Page",page:1};l={value:"<",title:"Previous Page",page:s}}else{r={value:'<i class="material-icons">first_page</i>',title:"First Page",page:1};l={value:'<i class="material-icons">chevron_left</i>',title:"Previous Page",page:s}}}else{o=i.page+1>t;var u=i.page+1>=t?t:i.page+1;if(i.useSimplePrevNext){r={value:">",title:"Next Page",page:u};l={value:">>",title:"Last Page",page:t}}else{r={value:'<i class="material-icons">chevron_right</i>',title:"Next Page",page:u};l={value:'<i class="material-icons">last_page</i>',title:"Last Page",page:t}}}var c=function(t,a){i.List.push({value:e.trustAsHtml(t.value),title:t.title,liClass:a?i.disabledClass:"",action:function(){if(!a){n(i,t.page)}}})};c(r,o);c(l,o)}function s(e,i,t){if(t!=e-2){o(i)}a(e-1,e,i)}function u(e,n){if(!e.pageSize||e.pageSize<0){return}i(e,n);var o,u=e.adjacent*2,c=Math.ceil(e.total/e.pageSize);t(e,c);l(e,c,"prev");if(c<5+u){o=1;a(o,c,e)}else{var d;if(e.page<=1+u){o=1;d=2+u+(e.adjacent-1);a(o,d,e);s(c,e,d)}else if(c-u>e.page&&e.page>u){o=e.page-e.adjacent;d=e.page+e.adjacent;r(e,o);a(o,d,e);s(c,e,d)}else{o=c-(1+u+(e.adjacent-1));d=c;r(e,o);a(o,d,e)}}l(e,c,"next")}return{restrict:"EA",scope:{page:"=",pageSize:"=",total:"=",dots:"@",hideIfEmpty:"@",adjacent:"@",scrollTop:"@",showPrevNext:"@",useSimplePrevNext:"@",paginationAction:"&",ulClass:"=?"},template:'<ul ng-hide="Hide" ng-class="ulClass"> '+"<li "+'ng-class="Item.liClass" '+'ng-click="Item.action()" '+'ng-repeat="Item in List"> '+"<a href> "+'<span ng-bind-html="Item.value"></span> '+"</a>"+"</ul>",link:function(e,i,t){e.$watchCollection("[page, total, pageSize]",function(){u(e,t)})}}}]);e.module("ui.materialize.modal",[]).directive("modal",["$compile","$timeout",function(t,n){return{scope:{dismissible:"=",opacity:"@",inDuration:"@",outDuration:"@",ready:"&?",complete:"&?",open:"=?",enableTabs:"@?"},link:function(a,o,r){n(function(){var n=$(r.href?r.href:"#"+r.target);t(o.contents())(a);var l=function(){e.isFunction(a.complete)&&a.$apply(a.complete);a.open=false;a.$apply()};var s=function(){e.isFunction(a.ready)&&a.$apply(a.ready);a.open=true;if(a.enableTabs){n.find("ul.tabs").tabs()}};var u={dismissible:e.isDefined(a.dismissible)?a.dismissible:i,opacity:e.isDefined(a.opacity)?a.opacity:i,in_duration:e.isDefined(a.inDuration)?a.inDuration:i,out_duration:e.isDefined(a.outDuration)?a.outDuration:i,ready:s,complete:l};o.leanModal(u);if(e.isDefined(r.open)&&n.length>0){a.$watch("open",function(i,t){if(!e.isDefined(i)){return}i===true?n.openModal(u):n.closeModal()})}})}}}]);e.module("ui.materialize.tooltipped",[]).directive("tooltipped",["$compile","$timeout",function(e,i){return{restrict:"A",scope:true,link:function(t,n,a){var o=Function.prototype;function r(){n.addClass("tooltipped");e(n.contents())(t);i(function(){if(n.attr("data-tooltip-id")){n.tooltip("remove")}n.tooltip()});o=t.$on("$destroy",function(){n.tooltip("remove")})}a.$observe("tooltipped",function(e){if(e==="false"&&o!==Function.prototype){n.tooltip("remove");o();o=Function.prototype}else if(e!=="false"&&o===Function.prototype){r()}});if(a.tooltipped!=="false"){r()}n.on("$destroy",function(){n.tooltip("remove")})}}}]);e.module("ui.materialize.materialboxed",[]).directive("materialboxed",["$timeout",function(e){return{restrict:"A",link:function(i,t,n){e(function(){t.materialbox()})}}}]);e.module("ui.materialize.nouislider",[]).directive("nouislider",["$timeout",function(t){return{restrict:"A",scope:{ngModel:"=",min:"@",max:"@",step:"@?",connect:"@?",tooltips:"@?"},link:function(n,a,o){t(function(){noUiSlider.create(a[0],{start:n.ngModel||0,step:parseFloat(n.step||1),tooltips:e.isDefined(n.connect)?n.tooltips:i,connect:e.isDefined(n.connect)?n.connect:"lower",range:{min:parseFloat(n.min||0),max:parseFloat(n.max||100)},format:{to:function(e){return Math.round(e*100)/100},from:function(e){return Number(e)}}});a[0].noUiSlider.on("update",function(e,i){n.ngModel=parseInt(e[0],10);n.$apply()})})}}}])})(angular);;
angular.module("componentsModule", ["systemModule"])

    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        $httpProvider.interceptors.push(function ($q) {
            return {
                "responseError": function (rejection) {
                    if (rejection.status == 401) {
                        window.location.href = "/" + gv.lang + "/Error/NotAuthorized";
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }])

    .service("$util", ["$location", "$timeout", function ($location, $timeout) {
        var self = this;

        self.openWindow = function (url, name, width, height) {
            var x = 0, y = 0, w = 800, h = 600; // default value: width=800, height=600
            if (width) w = width;
            if (height) h = height;
            try {
                x = (screen.width - w) / 2;
                y = (screen.height - h) / 2;
            } catch (e) { }
            var features = "resizable=1, scrollbars=1, left=" + x + ", top=" + y + ", width=" + w + ", height=" + h;
            var hostname = document.location.hostname.replace(/\.|-/g, ""); // remove dot from hostname
            var win = window.open(url, hostname + name, features);
            try {
                win.focus();
            } catch (e) { }
            return win;
        };

        self.padNum = function (num, maxLength) {
            maxLength = maxLength || 2;
            num = (num || "0") + "";
            return num.length >= maxLength ? num : new Array(maxLength - num.length + 1).join("0") + num;
        }

        self.roundNum = function (number, decimal) {
            if (!decimal) decimal = 0;
            var result = Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
            return result;
        };

        self.addDays = function (date, days) {
            var newDate = new Date(date.valueOf());
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        }

        self.getUrlVars = function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        };

        self.onScrollToBottom = function (callback) {
            var isCallBack = false;
            $("#scrollContainer").scroll(function () {
                if (typeof callback === "function" && $("#scrollContainer").scrollTop() > ($("#scrollContainer")[0].scrollHeight) * 0.95 && !isCallBack) {
                    isCallBack = true;
                    callback();
                    $timeout(function () {
                        isCallBack = false;
                    }, 1000);
                }
            });
        };

        self.checkSupportProduct = function () {
            var product = $location.path().replace('/', '');
            product = product === "" ? gv.product : product;
            var isSupportProduct = true;
            switch (product) {
                case "keno":
                    isSupportProduct = typeof gv.activeKeno === 'boolean' ? gv.activeKeno : true;
                    break;
                case "lotto":
                    isSupportProduct = typeof gv.activeLotto === 'boolean' ? gv.activeLotto : true;
                    break;
            }

            if (!isSupportProduct) {
                window.location.href = "/" + gv.lang + "/Error/NotFound";
            }
        };
    }])

    .factory("$dialog", ["$rootScope", "$sce", function ($rootScope, $sce) {
        var title = "";
        var message = "";
        var buttons = [];
        var isAnnouncement = false;
        var settings = {
            getTitle: function () {
                return title;
            },
            getMessage: function () {
                return message || title;
            },
            getIsAnnouncement: function () {
                return isAnnouncement;
            },
            show: function (tit, msg, btns, dialogOnly, isAnnounce) {
                title = tit;
                isAnnouncement = isAnnounce;
                message = isAnnouncement ? msg : $sce.trustAsHtml(msg);
                buttons = !!btns ? btns : [
                    {
                        Text: R.Text.OK,
                        Callback: function () {
                            settings.close();
                        }
                    }
                ];

                $rootScope.$broadcast("showDialog", { dialogOnly: dialogOnly });
            },
            close: function (dialogOnly) {
                $rootScope.$broadcast("closeDialog", { dialogOnly: dialogOnly });
            },
            getButtons: function () {
                return buttons;
            }
        }

        return settings;
    }])

    .factory("$popup", ["$rootScope", function ($rootScope) {
        var title = "";
        var bindingUrl = "";

        var settings = {
            getTitle: function () {
                return title;
            },
            getUrl: function () {
                return bindingUrl || title;
            },
            show: function (tit, url) {
                title = tit;
                bindingUrl = url;

                $rootScope.$broadcast("showPopup");
            },
            close: function () {
                $rootScope.$broadcast("closePopup");
            }
        }

        return settings;
    }])

    .directive("loading", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var loadingDiv = $("<div></div>");
                element.append(loadingDiv);
                element.css("position", "relative");

                scope.$watch(function () { return element.attr('loading'); }, function (loading) {
                    if (loading === true || loading === "true") {
                        loadingDiv.addClass("loading");
                    } else {
                        loadingDiv.removeClass("loading");
                    }
                });
            }
        };
    })

    .directive("draggable", ["$document", "$window", function ($document, $window) {
        return function (scope, element, attr) {
            var startX = 0, startY = 0,
                x = $window.innerWidth, y = $window.innerHeight,
                width = 0, height = 0;

            angular.element($window).bind("load resize", function () {
                width = $window.innerWidth - element.find(".circles-number").innerWidth() - 30;
                height = $window.innerHeight - element.find(".circles-number").innerHeight() - 30;
                move();
                element.removeClass("ng-hide");
            });

            element.on("mousedown", function (event) {
                event.preventDefault();
                startX = event.screenX - x;
                startY = event.screenY - y;
                $document.on("mousemove", mousemove);
                $document.on("mouseup", mouseup);
            });

            function mousemove(event) {
                x = event.screenX - startX;
                y = event.screenY - startY;
                scope.isDraging = move();
            }

            function mouseup() {
                $document.off("mousemove", mousemove);
                $document.off("mouseup", mouseup);
                scope.isDraging = false;
            }

            function move() {
                //LeftTop range
                x = x < 30 ? 30 : x;
                y = y < 30 ? 30 : y;

                //RightBottom range
                x = x > width ? width : x;
                y = y > height ? height : y;

                var top = element.prop("offsetTop");
                var left = element.prop("offsetLeft");

                /* zone *
                 *********
                 * 1 * 2 *
                 *********
                 * 3 * 4 *
                 *********/
                if (y < height / 2) {
                    // zone 1 & 2
                    element.removeClass("left2right");
                    element.removeClass("right2left");
                } else if (x < width / 2) {
                    // zone 3
                    element.addClass("left2right");
                    element.removeClass("right2left");
                } else {
                    // zone 4
                    element.removeClass("left2right");
                    element.addClass("right2left");

                    var right = element.prop("offsetRight");
                    if (top != y || right != (width - x + 30)) {
                        element.css({
                            top: y + "px",
                            right: (width - x + 30) + "px",
                            left: ""
                        });
                        return true;
                    }

                    return;
                }

                if (top != y || left != x) {
                    element.css({
                        top: y + "px",
                        left: (x - 17) + "px",
                        right: ""
                    });
                    return true;
                }
            }
        };
    }])

    .directive("popupWindow", ["$document", "$window", "$util", function ($document, $window, $util) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var tokens = attrs.popupWindow.split("|");
                element.on("click", function () {
                    $util.openWindow(attrs.href, tokens[0], tokens[1], tokens[2]);
                    return false;
                });
            }
        }
    }])

    .directive("onScrollToBottom", ["$interval", function ($interval) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (!attrs["onScrollToBottom"] ||
                    !scope[attrs["onScrollToBottom"]] ||
                    !angular.isFunction(scope[attrs["onScrollToBottom"]])) return;

                var callback = scope[attrs["onScrollToBottom"]];
                var $element = $(element);
                var canInvokeCallback = false;
                var scrollBarTop = 0;

                $interval(function () {
                    if (!$element.find(".jspTrack").height() ||
                        !$element.find(".jspDrag").offset() ||
                        !$element.find(".jspDrag").offsetParent() ||
                        !$element.find(".jspDrag").offsetParent().offset()) return;

                    var newScrollBarTop = $element.find(".jspDrag").offset().top - $element.find(".jspDrag").offsetParent().offset().top;

                    if (scrollBarTop != newScrollBarTop) {
                        scrollBarTop = newScrollBarTop;
                        canInvokeCallback = true;
                    }

                    var containerHeight = $element.find(".jspTrack").height();
                    var scrollBarHeight = $element.find(".jspDrag").height();

                    if (containerHeight && scrollBarHeight && scrollBarTop && scrollBarHeight + scrollBarTop == containerHeight && canInvokeCallback) {
                        canInvokeCallback = false;
                        callback();
                    }
                }, 200);
            }
        };
    }])
    .directive("jscrollpaneCover", ["$window", "$interval", function ($window, $interval) {
        return {
            restrict: "AE",
            replace: true,
            template: "<div><div></div></div>",
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {
                if (!attrs.jscrollpaneCover) return;

                var $element = $(element);
                var $target = $("[cover-by='" + attrs.jscrollpaneCover + "']");

                $element.addClass("jscrollpane-cover");
                $target.addClass("jscrollpane-cover");

                var maxHeight = 0;
                var marginBottom = 0;

                if (attrs.marginBottom) {
                    marginBottom = parseInt(attrs.marginBottom);
                    marginBottom = isNaN(marginBottom) ? 0 : marginBottom;
                }

                var getOffsetTop = function (ele) {
                    var offsetTop = ele.offsetTop;
                    while (ele.offsetParent) {
                        offsetTop += ele.offsetParent.offsetTop;
                        ele = ele.offsetParent;
                    }
                    return offsetTop;
                }

                var refreshScrollBar = function () {
                    maxHeight = $window.innerHeight - getOffsetTop($target[0]) - marginBottom;
                    var newHeight = $target.find(".jspPane").height();
                    $element.height(newHeight > maxHeight ? maxHeight : newHeight);
                    if (newHeight > maxHeight) {
                        $element.removeClass("active");
                        $target.addClass("active");
                    }
                    else {
                        $target.removeClass("active");
                        $element.addClass("active");
                    }
                }

                transclude(function (clone) {
                    element.find("div").html(clone);
                    refreshScrollBar();
                });

                angular.element($window).bind("load resize", function () {
                    refreshScrollBar();
                });

                var lastHeight = 0;
                var lastOffsetTop = 0;
                $interval(function () {
                    var height = $target.find(".jspPane").height();
                    var offsetTop = getOffsetTop($target[0]);
                    if (height != lastHeight || offsetTop != lastOffsetTop) {
                        lastHeight = height;
                        lastOffsetTop = offsetTop;
                        refreshScrollBar();
                    }
                }, 50);

                scope.refreshScrollBar = refreshScrollBar;
            }
        }
    }])
    .directive("jscrollpane", ["$window", "$interval", function ($window, $interval) {
        return {
            restrict: "AE",
            replace: true,
            template: "<div><div></div></div>",
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {
                var $element = $(element);
                var maxHeight = 0;
                var fillFull = (attrs.fillFull === "true" || attrs.fillFull === true);

                var marginBottom = 0;

                var loadNextPage = null;
                if (attrs["loadNextPage"] &&
                    scope[attrs["loadNextPage"]] &&
                    angular.isFunction(scope[attrs["loadNextPage"]])) {
                    loadNextPage = scope[attrs["loadNextPage"]];
                }

                if (attrs.marginBottom) {
                    marginBottom = parseInt(attrs.marginBottom);
                    marginBottom = isNaN(marginBottom) ? 0 : marginBottom;
                }

                var getOffsetTop = function (ele) {
                    var offsetTop = ele.offsetTop;
                    while (ele.offsetParent) {
                        offsetTop += ele.offsetParent.offsetTop;
                        ele = ele.offsetParent;
                    }
                    return offsetTop;
                }

                var refreshScrollBar = function () {
                    jspPaneHeight = $element.find(".jspPane").height();
                    maxHeight = $window.innerHeight - getOffsetTop($element[0]) - marginBottom;
                    if (fillFull) {
                        $element.height(maxHeight);
                    } else {
                        $element.height(jspPaneHeight > maxHeight ? maxHeight : jspPaneHeight);
                    }
                    $element.width(100);
                    $element.jScrollPane({ autoReinitialise: !fillFull });

                    if (loadNextPage && jspPaneHeight > 0 && maxHeight > jspPaneHeight) {
                        loadNextPage();
                    }
                }

                transclude(function (clone) {
                    element.find("div").html(clone);
                    refreshScrollBar();
                });

                angular.element($window).bind("load resize", function () {
                    refreshScrollBar();
                });

                var lastHeight = 0;
                var lastOffsetTop = 0;
                $interval(function () {
                    var height = element.find(".jspPane").height();
                    var offsetTop = getOffsetTop($element[0]);
                    if (height != lastHeight || offsetTop != lastOffsetTop) {
                        lastHeight = height;
                        lastOffsetTop = offsetTop;
                        refreshScrollBar();
                    }
                }, 50);

                scope.refreshScrollBar = refreshScrollBar;
            }
        }
    }])
    .directive("renderComplete", ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$parent.refreshScrollBar();
                    });
                }

                if (attrs.ngShow) {
                    scope.$watch(attrs.ngShow, function (newValue) {
                        $timeout(function () {
                            scope.$parent.refreshScrollBar();
                        });
                    });
                }
            }
        }
    }])

    .directive("datepicker", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                var option = {
                    dateFormat: "yy-mm-dd",
                    inline: true,
                    showOtherMonths: true,
                    onSelect: function (date) {
                        var ngModelNameArr = this.attributes["ng-model"].value.split(".");

                        if (scope.$parent[ngModelNameArr[0]])
                            scope = scope.$parent;

                        var model = null;
                        for (var i = 0; i < ngModelNameArr.length; i++) {
                            if (ngModelNameArr.length == 1) {
                                scope[ngModelNameArr[i]] = date;
                            } else if (model == null && scope[ngModelNameArr[i]]) {
                                model = scope[ngModelNameArr[i]];
                            } else if (model && i == ngModelNameArr.length - 1) {
                                model[ngModelNameArr[i]] = date;
                            } else if (model) {
                                model = model[ngModelNameArr[i]];
                            }
                        }

                        if (!scope.$$phase)
                            scope.$apply();
                    }
                };

                var dgmt8 = new Date();
                var diffHoursGmt8 = (8 - (-dgmt8.getTimezoneOffset() / 60));
                dgmt8.setTime(dgmt8.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
                var gmtDiff = dgmt8.getDate() - (new Date().getDate());

                if (attrs.minDate) option.minDate = parseFloat(attrs.minDate, 10) + gmtDiff;
                if (attrs.maxDate) option.maxDate = parseFloat(attrs.maxDate, 10) + gmtDiff;
                element.datepicker(option);
                if (attrs.datepicker)
                    $('#ui-datepicker-div').addClass(attrs.datepicker);
            }
        };
    })

    .directive("decimal", ["$filter", function ($filter) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                var maxNoOfDecimal = attrs.decimal || 0;
                var limitTo = attrs.limitTo || 0;
                element.on("keydown", function (e) {
                    var val = element.val();
                    if (e.keyCode == 110 || e.keyCode == 190) {
                        // Allow: dot and only 1 dot is allowed, first character cannot be dot
                        if (val.indexOf(".") != -1 || val === "") {
                            e.preventDefault();
                        } else {
                            return;
                        }
                    } else if (e.shiftKey === true && e.keyCode >= 48 && e.keyCode <= 57) {
                        // Not allow shift to prevent @!$#%^&
                        e.preventDefault();
                    }
                    else if (val === "" && (e.keyCode == 48 || e.keyCode == 96)) {
                        // Not allow enter 0 if textbox is empty
                        e.preventDefault();
                    }

                    // Allow: backspace, delete, tab and escape
                    if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V
                        (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 86 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    }

                    if (val.indexOf(".") != -1 &&
                        document.activeElement.selectionStart > val.indexOf(".")) {
                        var currentNoOfDecimal = val.split(".")[1].length;
                        if (maxNoOfDecimal != 0 &&
                            currentNoOfDecimal == maxNoOfDecimal &&
                            document.activeElement.selectionStart == document.activeElement.selectionEnd) {
                            e.preventDefault();
                        }
                    }
                    else if (limitTo != 0) {
                        if (val.split(".")[0].length == limitTo &&
                            document.activeElement.selectionStart == document.activeElement.selectionEnd) {
                            e.preventDefault();
                        }
                    }
                });

                element.on("focus", function (e) {
                    element.triggerHandler("select");
                });

                element.on("blur", function (e) {
                    var val = element.val().replace(/\,/g, "");
                    if (isNaN(val)) {
                        element.val("");
                        element.triggerHandler("focus");
                    } else if (element.val() !== "") {
                        var ngModelNameArr = this.attributes["ng-model"].value.split(".");
                        if (scope.$parent[ngModelNameArr[0]]) scope = scope.$parent;
                        var model = null;
                        for (var i = 0; i < ngModelNameArr.length; i++) {
                            if (ngModelNameArr.length == 1) {
                                scope[ngModelNameArr[i]] = val;
                            } else if (model == null && scope[ngModelNameArr[i]]) {
                                model = scope[ngModelNameArr[i]];
                            } else if (model && i == ngModelNameArr.length - 1) {
                                model[ngModelNameArr[i]] = val;
                            } else if (model) {
                                model = model[ngModelNameArr[i]];
                            }
                        }
                        if (!scope.$$phase) {
                            element.val($filter("addComma")(val, maxNoOfDecimal));
                            scope.$apply();
                        }
                    }
                });

                var unregister = scope.$watch(attrs.ngModel, function (value) {
                    if (value)
                        element.triggerHandler("blur");
                    unregister();
                });
            }
        };
    }])
    .directive("integer", ["$filter", function ($filter) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                var limitTo = attrs.limitTo || 0;
                element.on("keydown", function (e) {
                    var val = element.val();
                    if (e.shiftKey === true && e.keyCode >= 48 && e.keyCode <= 57) {
                        // Not allow shift to prevent @!$#%^&
                        e.preventDefault();
                    }

                    // Allow: backspace, delete, tab and escape
                    if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V
                        (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 86 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    }

                    if (limitTo != 0) {
                        if (val.length == limitTo &&
                            document.activeElement.selectionStart == document.activeElement.selectionEnd) {
                            e.preventDefault();
                        }
                    }
                });

                element.on("focus", function (e) {
                    element.triggerHandler("select");
                });

                element.on("blur", function (e) {
                    var val = element.val().replace(/\,/g, "");
                    if (isNaN(val)) {
                        element.val("");
                        element.triggerHandler("focus");
                    } else if (element.val() !== "") {
                        var ngModelNameArr = this.attributes["ng-model"].value.split(".");
                        var model = null;
                        for (var i = 0; i < ngModelNameArr.length; i++) {
                            if (ngModelNameArr.length == 1) {
                                scope[ngModelNameArr[i]] = val;
                            } else if (model == null && scope[ngModelNameArr[i]]) {
                                model = scope[ngModelNameArr[i]];
                            } else if (model && i == ngModelNameArr.length - 1) {
                                model[ngModelNameArr[i]] = val;
                            } else if (model) {
                                model = model[ngModelNameArr[i]];
                            }
                        }
                        if (!scope.$$phase) {
                            element.val($filter("addComma")(val));
                            scope.$apply();
                        }
                    }
                });

                var unregister = scope.$watch(attrs.ngModel, function (value) {
                    if (value)
                        element.triggerHandler("blur");
                    unregister();
                });
            }
        };
    }])

    .directive("onlyKeyNumber", ["$filter", function ($filter) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                element.on("keydown", function (e) {
                    var val = element.val();
                    if (e.shiftKey === true && e.keyCode >= 48 && e.keyCode <= 57) {
                        // Not allow shift to prevent @!$#%^&
                        e.preventDefault();
                    }

                    // Allow: backspace, delete, tab and escape
                    if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V
                        (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 86 && e.ctrlKey === true) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    }
                });
            }
        };
    }])

    .directive("autoFocus", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                $timeout(function () {
                    element[0].focus();
                }, 0);
            }
        };
    }])

    .directive("enter", function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.enter);
                    });

                    event.preventDefault();
                }
            });
        };
    })

    .directive("mobileDialog", [function () {
        return {
            template: '<div>' +
            '<div class="popup-overlay"></div>' +
            '<div class="popup-wrapper">' +
            '<div class="dialog-c">' +
            '<div class="dialog-c-inner">' +
            '<div class="dialog-titlebar">' +
            '<a class="btn-close" ng-click="setting.close()"></a>' +
            '<span ng-bind="setting.title"></span>' +
            '</div>' +
            '<div class="dialog-body">' +
            '<div class="dialog-msg">' +
            '<div ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '<div class="btn-row">' +
            '<a href="javascript:void(0);" class="btn primary dialogBtn" ng-repeat="btn in setting.buttons" ng-click="btn.Callback()">{{btn.Text}}</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: "E",
            transclude: true,
            scope: {
                setting: "="
            },
            link: function ($scope, $element, $attrs) {
                $scope.close = function () {
                    if (!!$scope.setting && $scope.setting.close) {
                        $scope.setting.close();
                    }
                }
            }
        };
    }])
    .directive("scroll", ["$window", "$document", function ($window, $document) {
        return function (scope) {
            angular.element($window).bind("scroll", function () {
                var pageYOffset = $window.pageYOffset;
                var scrollHeight = $document[0].body.scrollHeight;
                var innerHeight = $window.innerHeight;
                var percentage = (scrollHeight - pageYOffset - innerHeight) / innerHeight * 100;

                if (percentage < 20) {
                    scope.scroll.fetch();
                    //scope.$apply();
                }
            });
        };
    }])

    .directive("fixedThead", ["$window", function ($window) {
        return function (scope, element, attrs) {
            angular.element($window).bind("scroll", function () {
                var fixedZoneHight = attrs.fixedThead || 0;
                var yPos = 0;
                var ele = element.context;
                while (ele) {
                    yPos += ele.offsetTop;
                    ele = ele.offsetParent;
                };
                if (yPos - $window.pageYOffset < fixedZoneHight) {
                    $(".table-fixed").removeClass("table-hidden");
                    $(".table-fixed").addClass("table-visible");
                }
                else {
                    $(".table-fixed").removeClass("table-visible");
                    $(".table-fixed").addClass("table-hidden");
                }
            });
        };
    }])

    .directive('fixTopClassMobile', ["$window", "$timeout", function ($window, $timeout) {
        var $win = angular.element($window); // wrap window object as jQuery object
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    var offsetTop = element.offset().top,
                        class1 = 'fixedtoTop-1', class2 = 'fixedtoTop-2',
                        betSlipPanel = angular.element('.betSlipPanel'),
                        tempHeight = angular.element('#tempHeight'),
                        srollTop = 0;
                    $win.on('scroll',
                        function () {
                            if ($win.scrollTop() >= offsetTop) {
                                srollTop = $win.scrollTop();
                                tempHeight.show();
                                element.addClass(class1);
                                betSlipPanel.addClass(class2);
                                srollTop -= $win.scrollTop();
                                return;
                            }
                            if ($win.scrollTop() < offsetTop - srollTop) {
                                srollTop = 0;
                                tempHeight.hide();
                                element.removeClass(class1);
                                betSlipPanel.removeClass(class2);
                            }
                        });
                });
            }
        };
    }])

    .directive("floatingNav", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs, ctrl) {
                var navArr = $("nav");
                if (navArr.length > 0) {
                    var navHeight = 0;
                    var navTop = [];
                    for (var i = 0; i < navArr.length; i++) {
                        $(navArr[i]).css("position", "fixed");
                        $(navArr[i]).css("z-index", navArr.length - i);
                        var top = (i > 0 ? $(navArr[i - 1]).height() : 0);
                        navTop.push(top);
                        $(navArr[i]).css("top", top + "px");
                        navHeight += $(navArr[i]).height();
                    }
                    $(element).css("margin-top", navHeight + "px");

                    var preScrollTop = 0;
                    var minScrollTop = 0;
                    var handler = function () {
                        var maxScrollTop = $(document).height() - $(window).height();
                        if (maxScrollTop <= navHeight) return;
                        var scrollTop = $(window).scrollTop();
                        scrollTop = scrollTop < 0 ? 0 : scrollTop > maxScrollTop ? maxScrollTop : scrollTop;
                        if (scrollTop < 0 || scrollTop > maxScrollTop || scrollTop == preScrollTop) return;
                        for (var i = 0; i < navArr.length; i++) {
                            var minTop = 0 - navHeight + (i > 0 ? $(navArr[i - 1]).height() : 0);
                            var maxTop = (i > 0 ? $(navArr[i - 1]).height() : 0);
                            var caltop = navTop[i] + preScrollTop - scrollTop;
                            navTop[i] = caltop < minTop ? minTop : caltop > maxTop ? maxTop : caltop;

                            $(navArr[i]).css("top", navTop[i] + "px");
                        }
                        preScrollTop = scrollTop;
                    };
                    setInterval(handler, 1);
                }
            }
        };
    })

    .directive("carouselTabs", [function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (element.length != 1 || element.find("li").length < 2) return;
                var showCnt = 3;
                var tabItems = element.find("li");
                element.prepend($(tabItems[tabItems.length - 1]).clone().addClass("clone"));
                element.prepend($(tabItems[tabItems.length - 2]).clone().addClass("clone").addClass("virtual"));
                element.append($(tabItems[0]).clone().addClass("clone"));
                element.append($(tabItems[1]).clone().addClass("clone").addClass("virtual"));
                element.find("li.clone a.active").removeClass("active");
                var childrenCnt = element.find("li").length;
                var virtualCnt = element.find("li.clone.virtual").length;
                var tabCnt = childrenCnt - virtualCnt;
                if (childrenCnt <= 0) return;
                element.css("overflow-x", "hidden");
                $(window).on("resize", function () {
                    var windowWidth = $(window).width();
                    var tabWidth = windowWidth / showCnt;
                    var offsetArr = [];
                    for (var i = 0; i < tabCnt; i++) offsetArr.push(i * tabWidth);
                    $(element.find("li.clone a")[1]).attr("carousel-tab-clone", tabCnt - 1);
                    $(element.find("li.clone a")[2]).attr("carousel-tab-clone", 2);
                    setTimeout(function () {
                        element.style("width", (tabWidth * childrenCnt) + "px", "important");
                        element.find("li a").width(tabWidth - 20);
                        for (var i = 0; i < offsetArr.length; i++) {
                            $(element.find("li a")[i + 1]).attr("carousel-tab-offset", offsetArr[i]);
                        }
                        if (element.find("li:not(.clone) a.active").length == 1)
                            element.find("li:not(.clone) a.active").trigger("click");
                        else
                            $(element.find("li a")[2]).trigger("click");
                    }, 100);
                })
                $(window).trigger("resize");
                element.find("li a").on("click", function (e) {
                    if ($(this).parent().hasClass("virtual")) return;
                    var offset = $(this).attr("carousel-tab-offset");
                    if (offset == undefined) return;
                    element.css("transition", $(this).attr("no-transition") ? "" : "300ms ease");
                    element.css("transform", "translate3d(" + -offset + "px,0px,0px)");
                    $(this).attr("no-transition", "");
                    element.parent().append('<div class="carousel-tabs-block"></div>');
                    setTimeout(function () {
                        element.parent().find("div.carousel-tabs-block").remove();
                    }, 300);
                    var cloneTarget = $(this).attr("carousel-tab-clone");
                    if (cloneTarget != undefined) {
                        var $target = $(element.find("li a")[cloneTarget]);
                        $target.attr("no-transition", true);
                        $target.addClass("active");
                        setTimeout(function () {
                            $target.trigger("click");
                        }, 300);
                    }
                })
            }
        };
    }])

    .controller("dialogCtrl", ["$rootScope", "$scope", "$dialog", function ($rootScope, $scope, $dialog) {
        $scope.isShowDialog = false;
        $rootScope.$on("showDialog", function showDialog(event, args) {
            $scope.title = $dialog.getTitle();
            $scope.message = $dialog.getMessage();
            $scope.isAnnouncement = $dialog.getIsAnnouncement();
            $scope.close = function () {
                if ($scope.buttons && $scope.buttons.length > 0
                    && $scope.buttons[$scope.buttons.length - 1].Callback)
                    $scope.buttons[$scope.buttons.length - 1].Callback();
                display(false);
            }
            display(true, args.dialogOnly);
            $scope.buttons = $dialog.getButtons();
        });

        $rootScope.$on("closeDialog", function closeDialog(event, args) {
            display(false, args.dialogOnly);
        });

        display = function (bool, isdialogOnly) {
            $scope.isShowDialog = bool;
            if (isdialogOnly == true) {
                return;
            }
            if (bool) angular.element("body").addClass("greyOutBody");
            else angular.element("body").removeClass("greyOutBody");
        }
    }])

    .controller("popupDialogCtrl", ["$rootScope", "$scope", "$popup", "$location", function ($rootScope, $scope, $popup, $location) {
        $scope.isShowPopup = false;
        $scope.product = '';
        $scope.openbetTotalStake = 0;
        $scope.openbetEstWinning = 0;
        $scope.statementDic = [];
        $scope.statemenTotalStake = 0;
        $scope.statemenWinLoss = 0;
        $rootScope.$on("showPopup", function showPopup() {
            $scope.title = $popup.getTitle();
            $scope.contentUrl = $popup.getUrl();
            $scope.close = function () {
                if ($scope.buttons && $scope.buttons.length > 0 && $scope.buttons[$scope.buttons.length - 1].Callback) {
                    $scope.buttons[$scope.buttons.length - 1].Callback();
                }
                displayPopup(false);
                $scope.contentUrl = '';
                $rootScope.wagerCount = undefined;
                $rootScope.statementDate = null;
                $rootScope.selectedDate = null;
                $location.search({});
            };
            displayPopup(true);
        });

        displayPopup = function (bool) {
            $scope.isShowPopup = bool;
            $scope.$emit("toggleGreyOut", null, false);

            if (bool) angular.element("body").addClass("afterPopup");
            else angular.element("body").removeClass("afterPopup");
        }

        $scope.goBackStatement = function () {
            $location.search({});
            $rootScope.statementDate = null;
        };

        $scope.$on("openBetTotalInfo", function onRefresh(event, args) {
            $scope.openbetTotalStake = args.stake;
            $scope.openbetEstWinning = args.estWinning;
        });
        $scope.$on("statementTotalInfo", function onRefresh(event, args) {
            $scope.product = args.product;
            $scope.statementDic = args.statementDic;
        });
        $scope.$on("statementDetailTotalInfo", function onRefresh(event, args) {
            $scope.product = args.product;
            $scope.statemenTotalStake = args.totalStake;
            $scope.statemenWinLoss = args.totalWinLoss;
        });
    }])

    .controller("popupCtrl", ["$scope", "$window", "$location", function ($scope, $window, $location) {
        $scope.$on("$locationChangeSuccess", function (event) {
            $scope.product = $location.path().replace("/", "");
        });
        $scope.print = function () {
            window.print();
        };
        $scope.refresh = function () {
            $window.location.reload();
        };
    }])

    .filter("datetimeFormat", ["$util", function ($util) {
        return function (datetime, hideSecond) {
            var d = new Date(datetime);
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-") + " ";
            dformat += hideSecond ?
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes())].join(":") :
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes()),
                $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("datetimeFormatgmt8", ["$util", function ($util) {
        return function (datetime, hideSecond) {
            var d = new Date(datetime);
            // append offset hours (with GMT+8) to the 'd' variable.
            var diffHoursGmt8 = (8 - (-d.getTimezoneOffset() / 60));
            d.setTime(d.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-") + " ";
            dformat += hideSecond ?
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes())].join(":") :
                [$util.padNum(d.getHours()),
                $util.padNum(d.getMinutes()),
                $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("dateFormat", ["$util", function ($util) {
        return function (datetime) {
            var d = new Date(datetime);
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-");
            return dformat;
        }
    }])
    .filter("dateFormatgmt8", ["$util", function ($util) {
        //Note. Adjusting the hours to GMT+8 will cause the datetime variable changed, so make sure to compute with a clone datetime variable.
        return function (datetime) {
            var d = new Date(datetime);
            // append offset hours (with GMT+8) to the 'd' variable.
            var diffHoursGmt8 = (8 - (-d.getTimezoneOffset() / 60));
            d.setTime(d.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
            var dformat = [$util.padNum(d.getFullYear()),
            $util.padNum(d.getMonth() + 1),
            $util.padNum(d.getDate())].join("-");
            return dformat;
        }
    }])
    .filter("timeFormat", ["$util", function ($util) {
        return function (datetime) {
            var d = new Date(datetime);
            var dformat = [$util.padNum(d.getHours()),
            $util.padNum(d.getMinutes()),
            $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("timeFormatgmt8", ["$util", function ($util) {
        return function (datetime) {
            var d = new Date(datetime);
            // append offset hours (with GMT+8) to the 'd' variable.
            var diffHoursGmt8 = (8 - (-d.getTimezoneOffset() / 60));
            d.setTime(d.getTime() + (diffHoursGmt8 * 60 * 60 * 1000));
            var dformat = [$util.padNum(d.getHours()),
            $util.padNum(d.getMinutes()),
            $util.padNum(d.getSeconds())].join(":");
            return dformat;
        }
    }])
    .filter("padNum", ["$util", function ($util) {
        return function (num, maxLength) {
            return $util.padNum(num, maxLength);
        }
    }])
    .filter("addComma", ["$util", function ($util) {
        return function (number, noOfDecimal) {
            if (!number) number = 0;
            number += "";
            number = number.replace(/\,/g, ""); // remove comma first
            number = parseFloat(number); // make sure is float
            number = $util.roundNum(number, noOfDecimal);
            number += "";
            if (noOfDecimal === undefined || noOfDecimal == null || noOfDecimal === 0) { // no specify noOfDecimal, default is 0
                number = number.split(".")[0];
            } else {
                // contains . and has specified noOfDecimal
                number = number + ((number.indexOf(".") != -1) ? "000" : ".000"); // added 3 more zero behind, so if number is 1.8 and noOfDecimal is 2, it will return 1.80
                number = number.split(".")[0] + "." + number.split(".")[1].substr(0, noOfDecimal);
            }
            x = number.split(".");
            x1 = x[0];
            x2 = (x.length > 1 && x[1] !== "") ? ("." + x[1]) : "";
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, "$1" + "," + "$2");
            }
            return x1 + x2;
        };
    }])
    .filter("sumList", function () {
        return function (list, field) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (list[key][field]) {
                        sum += parseFloat((list[key][field] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("sumList2", function () {
        return function (list, field, field2) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (list[key][field][field2]) {
                        sum += parseFloat((list[key][field][field2] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("sumListfilter", function () {
        return function (list, field, ignore) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (key === ignore)
                        continue;

                    if (list[key][field]) {
                        sum += parseFloat((list[key][field] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("sumListfilterNew", function () {
        return function (list, field, belong) {
            var sum = 0;
            if (list)
                for (var key in list) {
                    if (key !== belong)
                        continue;

                    if (list[key][field]) {
                        sum += parseFloat((list[key][field] + "").replace(/,/g, ""));
                    }
                }
            return sum;
        }
    })
    .filter("stringFormat", function () {
        return function () {
            var s = arguments[0];
            if (!s) return "";
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                s = s.replace(reg, arguments[i + 1]);
            }

            return s;
        }
    })
    .filter("pearlBallSelNum", function () {
        return function (num) {
            return num === 999 ? '?' : num;
        }
    })

    .run(["$rootScope", function ($rootScope) {
        $rootScope.range = function (start, end) {
            var arr = [];

            if (end == null) {
                end = start - 1;
                start = 0;
            }

            if (start <= end) {
                while (start <= end) {
                    arr.push(start++);
                }
            } else {
                while (start >= end) {
                    arr.push(start--);
                }
            }
            return arr;
        }
    }]);;
angular.module("systemModule", ["ui.materialize", "componentsModule", "counterModule"])

    .service("$systemService", ["$http", function ($http) {
        this.getAnnouncements = function () {
            return $http.get("/api/Announcements");
        }

        this.getRules = function (product) {
            return $http.get("/api/Rule/" + product);
        }

        this.getSingleCounterLottoRules = function () {
            return $http.get("/api/Rule/Lotto/Single");
        }

        this.getSyncData = function () {
            return $http.get("/api/Sync");
        }
        this.setCookie = function (c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) +
                ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/;";
            document.cookie = c_name + "=" + c_value;
        }

        this.getCookie = function (c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
            return "";
        }
    }])
    .controller("timerCtrl", ["$rootScope", "$scope", "$interval", "$systemService", "$dialog", "$filter", "$counterService", function ($rootScope, $scope, $interval, $systemService, $dialog, $filter, $counterService) {
        $scope.init = function (initServerTime, isUpComing) {
            isUpComing = isUpComing === undefined ? false : isUpComing;

            $rootScope.serverTime = new Date(initServerTime);
            $scope.countDownTimer = $filter("datetimeFormat")($rootScope.serverTime);

            var count = 0;

            $scope.ShowSessionTimeoutDialog = function () {
                var closeEvent = function () {
                    if (parent.window.opener)
                        parent.window.close();
                    else
                        window.location.href = gv.memberLobbyUrl ? gv.memberLobbyUrl : "/" + gv.lang + "/Error/NotAuthorized";
                };

                $dialog.show(R.Text.KickedOutTitle, R.Text.SessionTimeOut, [{
                    Text: R.Text.Btn_Close,
                    Callback: closeEvent
                }]);

                $interval(closeEvent, 10 * 1000);
            }

            $interval(function () {
                $rootScope.serverTime.setSeconds($rootScope.serverTime.getSeconds() + 1);
                $scope.countDownTimer = $filter("datetimeFormat")($rootScope.serverTime);
                if (++count % 10 == 0) {
                    $systemService.getSyncData().success(function (result) {
                        if (result.isSuccess) {
                            $rootScope.serverTime = new Date(result.data.serverTime);

                            if (isUpComing) {
                            } else if (result.data.maintenance) {
                                window.location.href = "/" + gv.lang + "/Maintenance/Index";
                            } else if (result.data.invalid) {
                                console.info("sessionTimeOut");
                                $scope.ShowSessionTimeoutDialog();
                            }
                        }
                    });
                }
            }, 1000);

            $systemService.setCookie("userId", gv.memberId ? gv.memberId : "");
            $systemService.setCookie("channel", gv.distributionChannel ? gv.distributionChannel : "");

            var hub = $.connection.sessionhub;

            hub.client.kickOutLegacyConnection = function () {
                console.info("kickOutLegacyConnection");
                $scope.ShowSessionTimeoutDialog();
            }

            $counterService.setSignalRConnection();
        }
    }])
    .controller("announcementCtrl", ["$scope", "$timeout", "$filter", "$systemService", "$dialog", "$counterCache", "$interval", "$http", "$location", "$util", function ($scope, $timeout, $filter, $systemService, $dialog, $counterCache, $interval, $http, $location, $util) {
        var annKey = "PopUpAnn";

        $scope.init = function (memberCode) {
            annKey = "PopUpAnn_" + memberCode;
            var interval = $interval(function () {
                if ($counterCache.pageData) {
                    $interval.cancel(interval);
                    $scope.announcements = $counterCache.pageData.Announcements;
                    $timeout(function () {
                        var temp = $scope.announcements;
                        if (!gv.mobile && hasNewPopupAnnouncements()) {
                            var popAnnms = getPopupAnnouncements();
                            var message = "";
                            angular.forEach(popAnnms, function (item) {
                                message += item.content + "<br/><br/>";
                            });
                            $dialog.show(R.Text.Title_ImportantAnnouncement, message, null, null, true);
                        }
                        $scope.announcements = temp;
                    }, 100);
                }
            }, 100);
        }

        $scope.announceInit = function () {
            $util.checkSupportProduct();

            $http.get("/api/Announcements").success(function (result) {
                if (result.isSuccess)
                    $scope.announcements = result.data;
            });
        }

        function getPopupAnnouncements() {
            var temp = [];
            for (var idx = 0; idx < $scope.announcements.length; idx++) {
                var annm = $scope.announcements[idx];
                if (annm.isImportant) {
                    temp.push(annm);
                }
            }

            return temp;
        }

        function hasNewPopupAnnouncements() {
            var value = $systemService.getCookie(annKey);
            var updatedDate = !!value ? new Date(value) : new Date("0001-01-01");
            var newUpdatedDate = updatedDate;
            var popupAnnms = getPopupAnnouncements();

            if (popupAnnms.length == 0) {
                return false;
            }

            angular.forEach(popupAnnms, function (item) {
                var utDate = new Date(item.expiryTime),
                    ctDate = new Date(item.createTime);

                var tempUpDate = ctDate > utDate ? ctDate : utDate;
                newUpdatedDate = tempUpDate > newUpdatedDate ? tempUpDate : newUpdatedDate;
            });

            $systemService.setCookie(annKey, $filter('date')(newUpdatedDate, "yyyy-MM-ddTHH:mm:ss"));
            console.log($filter('date')(newUpdatedDate, "yyyy-MM-ddTHH:mm:ss"));
            return newUpdatedDate > updatedDate;
        }
    }]);;
angular.module("memberModule", [])

    .service("$memberService", ["$http", function ($http) {
        this.getChips = function () {
            return $http.get("/api/Member/Chips");
        }

        this.setUsedChips = function (chips) {
            return $http.put("/api/Member/Chips", chips);
        }

        this.getBalance = function () {
            return $http.get("/api/Member/Balance");
        }

        this.getMemberInfo = function () {
            return $http.get("/api/Member");
        }

        this.logout = function () {
            return $http.delete("/api/Member/Logout");
        }
    }])

    .controller("balanceCtrl", ["$rootScope", "$scope", "$memberService", "$timeout", function ($rootScope, $scope, $memberService, $timeout) {
        $scope.init = function (balance) {
            $scope.balance = balance;
            angular.element("#refreshBalanceImg").hide();
        }

        $scope.refresh = function () {
            angular.element("#refreshBalanceImg").show();
            angular.element("#refreshBalanceBtn").hide();

            $memberService.getBalance().success(function (result) {
                if (result.isSuccess) {
                    $scope.balance = result.data;
                }
            });
            $timeout(function () {
                angular.element("#refreshBalanceImg").hide();
                angular.element("#refreshBalanceBtn").show();
            }, 500)
        }

        $rootScope.$on("refreshBalance", function onRefresh(event, args) {
            $scope.refresh();
        });
    }]);;
angular.module("reportModule", ["componentsModule"])

    .service("$reportService", ["$http", function ($http) {
        this.getOpenBet = function (product, pageNum, pageSize) {
            var url = "/api/Report/" + product + "/OpenBets?";
            url += "pageNum=" + (pageNum || 1) + "&pageSize=" + (pageSize || 10);
            return $http.get(url);
        }

        this.getStatement = function (dateFrom, dateTo) {
            var url = "/api/Report/Statement?";
            if (dateFrom) url += "dateFrom=" + dateFrom + "&";
            if (dateTo) url += "dateTo=" + dateTo;
            return $http.get(url);
        }

        this.getStatementDetails = function (product, date, pageNum, pageSize) {
            var url = "/api/Report/" + product + "/Statement?";
            if (date) url += "date=" + date + "&";
            url += "pageNum=" + (pageNum || 1) + "&";
            url += "pageSize=" + (pageSize || 50);
            return $http.get(url);
        }

        this.getStatementDetailsByCriteria = function (product, criteria) {
            return $http.post("/api/Report/" + product + "/Statement/Details", criteria);
        }
    }])

    .filter("counterName", function () {
        return function (counterId) {
            if (!counterId) return;
            var key = "CounterName_" + counterId;
            return (R.Game[key]) ? R.Game[key].toUpperCase() : key;
        }
    })
    .filter("counterBackground", function () {
        return function (counterId) {
            switch (counterId) {
                case 1:
                case 310:
                    return "1";
                case 2:
                case 320:
                    return "2";
                case 3:
                case 330:
                    return "3";
                case 4:
                case 340:
                    return "4";
                case 5:
                case 350:
                    return "5";
                case 6:
                case 360:
                    return "6";
            }
        }
    })
    .filter("getMaxOdds", ["$util", function ($util) {
        return function (items) {
            var odds = 0, maxOdds = 0;
            for (var i = 0; i < items.length; i++) {
                odds = parseFloat(items[i].odds);
                if (odds >= maxOdds)
                    maxOdds = odds;
            }
            return $util.roundNum(maxOdds, 2);
        }
    }])
    .filter("winning", ["$filter", "$util", function ($filter, $util) {
        return function (amount, items) {
            var odds = $filter("getMaxOdds")(items);
            return amount * $util.roundNum(odds - 1, 2);
        }
    }]);;
angular.module("counterModule", ["componentsModule"])
    .controller("mobileCtrl", ["$scope", "$http", "$window", "$counterCache", function ($scope, $http, $window, $counterCache) {
        $scope.checkLandScape = function () {
            return (window.innerWidth >= window.innerHeight);
        }

        $scope.init = function () {
            if (!gv.product) return;

            $scope.isLandScape = $scope.checkLandScape();
            window.addEventListener("orientationchange", function () {
                setTimeout(function () {
                    $scope.isLandScape = $scope.checkLandScape();
                }, 300);
            }, false);
            $http.get("/api/" + gv.product + "/Mobile?_=" + new Date().getTime()).success(function (model) {
                if (model.isSuccess) {
                    var data = model.data;
                    $counterCache.pageData = {
                        Announcements: data.announcements,
                        Member: data.member,
                        CounterList: data.counters,
                        TrendViewList: data.trendsList,
                        OpenBets: data.openBets,
                        BetSlip: JSON.parse(data.betSlip || "null"),
                    };
                }
            });
        };
    }])
    .controller("menuCtrl", ["$rootScope", "$scope", "$window", "$http", "$counterCache", function ($rootScope, $scope, $window, $http, $counterCache) {
        var lastLeftPosition = 0;

        angular.element($window).bind("scroll", function (s, e) {
            if (lastLeftPosition !== $window.pageXOffset) {
                var style = { "left": 0 - $window.pageXOffset };
                $("#page-header").css(style);
                $("#sidebar").css(style);
                $("#navbdr").css(style);
                $("#left-panel").css(style);
                $(".full-cover").css({ "left": 0 - $window.pageXOffset + 5 });
                lastLeftPosition = $window.pageXOffset;
            }
        });

        angular.element($window).bind("resize", function () {
            resetPosition();
        });

        var resetPosition = function () {
            var left = 0;
            if ($("#main").length > 0)
                left = $("#main").position().left;
            else if ($("#single-counter").length > 0)
                left = $("#single-counter").position().left;

            var style = { "left": left };
            $("#page-header").css(style);
            $("#sidebar").css(style);
            $("#navbdr").css(style);
            $("#left-panel").css(style);
            $(".full-cover").css({ "left": left + 5 });
        }
        resetPosition();

        $scope.init = function (product) {
            $http.get("/api/" + product).success(function (model) {
                if (model.isSuccess) {
                    var data = model.data;
                    $counterCache.pageData = {
                        Announcements: data.announcements,
                        CounterList: data.counters,
                        TrendViewList: data.trendsList,
                        OpenBets: data.openBets,
                        BetSlip: JSON.parse(data.betSlip || "null"),
                    };
                }
            });
        };
    }])
    .controller("progressBarCtrl", ["$scope", "$interval", function ($scope, $interval) {
        $scope.intervalTime = 200;
        $scope.percent = 100;
        $scope.interval = null;

        $scope.init = function (serverTime, counter) {
            if (serverTime && counter.draw && counter.draw.startTime && counter.draw.endTime) {
                startDateTime = new Date(counter.draw.startTime);
                endDateTime = new Date(counter.draw.endTime);
                var total = (endDateTime - startDateTime);
                var left = (endDateTime - serverTime);
                $scope.percent = (left / total) * 100;

                if ($scope.interval === null) {
                    $scope.interval = $interval(function () {
                        if ($scope.percent < 0) {
                            $scope.percent += 100;
                        }
                        $scope.percent -= ($scope.intervalTime / total) * 100;
                    }, $scope.intervalTime);
                }
            };
        };
    }])

    .service("$counterService", ["$http", function ($http) {
        var self = this;
        var product = "keno";
        var culture = gv.lang;

        var ieVersion = (function () {
            var version,
                matches;

            if (window.navigator.appName === 'Microsoft Internet Explorer') {
                // Check if the user agent has the pattern "MSIE (one or more numbers).(one or more numbers)";
                matches = /MSIE ([0-9]+\.[0-9]+)/.exec(window.navigator.userAgent);

                if (matches) {
                    version = window.parseFloat(matches[1]);
                }
            }

            // undefined value means not IE
            return version;
        })();

        self.setProduct = function (p) {
            product = p;
        }

        self.getCounterList = function (counterId) {
            return counterId
                ? $http.get("/api/" + product + "/MiniCounter/" + counterId)
                : $http.get("/api/" + product + "/Counters");
        }

        self.getCounter = function (counterId) {
            return $http.get("/api/" + product + "/Counter/" + counterId);
        }

        self.getGameResult = function (counterId, index) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/GameResults?pageNum=" + (index + 1) + "&pageSize=1");
        }

        self.getGameResults = function (product, counterId, drawNo, date, pageNum, pageSize) {
            var url = "/api/" + product + "/Counter/" + counterId + "/GameResults?";
            if (drawNo) url += "drawNo=" + drawNo + "&";
            if (date) url += "date=" + date + "&";
            url += "pageNum=" + (pageNum || 1) + "&";
            url += "pageSize=" + (pageSize || 50);
            return $http.get(url);
        }

        self.getTrends = function (counterId) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/Trends");
        }

        //self.getTrendList = function (counterId) {
        //    return $http.get("/api/" + product + "/Trends");
        //}

        self.getTrendStatistics = function (counterId) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/Trends/Statistics");
        }

        self.placeBet = function (placeBetList) {
            return $http.post("/api/" + product + "/PlaceBet", placeBetList);
        }

        self.getPickMarketSelection = function (counterId, selection) {
            return $http.get("/api/" + product + "/Counter/" + counterId + "/Pick/" + selection);
        }

        this.setSignalRConnection = function () {
            if (ieVersion <= 9) {
                $.connection.hub.start({ transport: ["foreverFrame", "longPolling"] });
            } else {
                $.connection.hub.start({ transport: ["serverSentEvents", "longPolling"] });
            }
        }
    }])
    .service("$counterCache", ["$util", function ($util) {
        var self = this;
        var counterList = [];
        var DrawStatus =
            {
                NA: 0,
                New: 1,
                Obsolete: 2,
                Skip: 3,
                Open: 4,
                Close: 5,
                Resulted: 6,
            }
        var CounterStatus =
            {
                NA: 0,
                Open: 2,
                Pause: 3,
                Close: 4,
            };

        self.getCounterList = function () {
            return counterList.sort(function (a, b) { return a.OrderNo - b.OrderNo });
        };

        self.getCounter = function (counterId) {
            var counterIndex = -1;
            for (var i = 0; i < counterList.length; i++) {
                if (counterList[i].id === counterId) {
                    counterIndex = i;
                    break;
                }
            }
            return counterList[counterIndex];
        };

        self.setCounter = function (counter) {
            var counterIndex = -1;
            for (var i = 0; i < counterList.length; i++) {
                if (counterList[i].id === counter.id) {
                    counterIndex = i;
                    break;
                }
            }
            if (counterIndex === -1) {
                counterList.push(counter);
                counterIndex = counterList.length - 1;
            }
            counter.displayGameResultIndex = 0;
            counter.displayGameResultMaxIndex = 9999;
            counter.displayGameResult = counter.gameResult;
            //
            counter.fixedDigit = 1;  //1,2,3
            counter.twoFixedSelectedIndex = 0;
            counter.threeFixedSelectedIndex = 0;
            counter.twoFixedPickCache = [];
            counter.threeFixedPickCache = [];
            counter.twoFixedList = [];
            counter.threeFixedList = [];
            if (counter.ballCount === 3) {
                counter.twoFixedList = [[3, 2], [3, 1], [2, 1]];
                counter.threeFixedList = [[3, 2, 1]];
                counter.twoFixedBallNum = 32;
                counter.threeFixedBallNum = 321;
            } else if (counter.ballCount === 5) {
                counter.twoFixedList = [[5, 4], [5, 3], [5, 2], [5, 1], [4, 3], [4, 2], [4, 1], [3, 2], [3, 1], [2, 1]];
                counter.threeFixedList = [[5, 4, 3], [4, 3, 2], [3, 2, 1]];
                counter.twoFixedBallNum = 54;
                counter.threeFixedBallNum = 543;
            }

            if (!counter.selections) {
                counter.selections = counterList[counterIndex].selections;
            }
            counter.expand = counterList[counterIndex].expand;
            counterList[counterIndex] = counter;
            return counterList[counterIndex];
        };

        self.updateProfile = function (counter, selections) {
            counter.selections = selections;
        }

        self.getDrawStatus = function (drawStatus) {
            if (drawStatus === DrawStatus.Skip)
                return "skip";
            else if (drawStatus === DrawStatus.Close)
                return "close";
            else if (drawStatus === DrawStatus.Resulted)
                return "result";
            else
                return "open";
        };

        self.getCounterStatus = function (counter) {
            var isBeforeResultOpen = counter.resultOpenCountdown !== 0;
            if (counter.draw == null || counter.status === CounterStatus.Close)
                return "close";
            else if (counter.draw.drawStatus === DrawStatus.Skip
                || (counter.draw.drawStatus === DrawStatus.Close && counter.draw.isCloseManually))
                return "skip";
            else if (counter.resultOpenCountdown > 0)
                return "result";
            else if (counter.timer !== "00:00" && self.isLessThanBetClosedTime(counter))
                return "stop";
            else if (counter.timer === "00:00" && isBeforeResultOpen)
                return "wait";
            else
                return "open";
        };

        self.isLessThanBetClosedTime = function (counter) {
            if (!counter.timer || !counter.draw || !counter.draw.betClosedMMSS) return false;

            var c_arr = counter.timer.split(":");
            if (c_arr.length !== 2) return false;

            var d_arr = counter.draw.betClosedMMSS.split(":");
            if (d_arr.length !== 2) return false;

            var c_mm = parseInt(c_arr[0]);
            var c_ss = parseInt(c_arr[1]);
            var d_mm = parseInt(d_arr[0]);
            var d_ss = parseInt(d_arr[1]);

            return c_mm < d_mm || (c_mm === d_mm && c_ss <= d_ss);
        }

        self.getTrendText = function (resultType) {
            var txt = "";
            switch (resultType.toLowerCase()) {
                case "b":
                    txt = R.Game.Trend_Big;
                    break;
                case "s":
                    txt = R.Game.Trend_Small;
                    break;
                case "o":
                    txt = R.Game.Trend_Odd;
                    break;
                case "wo":
                    txt = R.Game.Trend_Wood;
                    break;
                case "e":
                    txt = R.Game.Trend_Even;
                    break;
                case "ea":
                    txt = R.Game.Trend_Earth;
                    break;
                case "os":
                    txt = R.Game.Trend_Odds;
                    break;
                case "es":
                    txt = R.Game.Trend_Evens;
                    break;
                case "t":
                    txt = R.Game.Trend_Tie;
                    break;
                case "u":
                    txt = R.Game.Trend_Up;
                    break;
                case "d":
                    txt = R.Game.Trend_Down;
                    break;
                case "g":
                    txt = R.Game.Trend_Gold;
                    break;
                case "wa":
                    txt = R.Game.Trend_Water;
                    break;
                case "f":
                    txt = R.Game.Trend_Fire;
                    break;
            }
            return txt;
        };

        self.countdown = function (serverDateTime, endDateTime) {
            if (endDateTime) endDateTime = new Date(endDateTime);
            var mmss = "00:00";
            if (serverDateTime < endDateTime) { // make sure no second like 0-7
                mmss = $util.padNum(parseInt((endDateTime - serverDateTime) / 1000 / 60));
                mmss += ":" + $util.padNum(parseInt((endDateTime - serverDateTime) / 1000 % 60));
            }
            return mmss;
        };
    }])
    .service("$placeBetCache", ["$rootScope", "$counterCache", "$dialog", "$filter", "$systemService", function ($rootScope, $counterCache, $dialog, $filter, $systemService) {
        var self = this;
        var wagerList = [];
        var totalStake = "";

        self.isBetProcessing = false;

        self.refreshWager = function () {
            $rootScope.$broadcast("refreshWager");
        }

        self.getTotalStake = function () {
            return totalStake;
        };

        self.getWagerList = function () {
            return wagerList;
        };

        self.getWager = function (index) {
            return (wagerList.length > index) ? wagerList[index] : null;
        };

        self.addWager = function (wager) {
            if (self.isBetProcessing) return;

            if (gv.wagerLimitInOneBet) {
                var unplacedWagers = wagerList.filter(function (wager) { return !wager.wagerNo; });
                if (unplacedWagers.length >= gv.wagerLimitInOneBet) {
                    $dialog.show(R.Text.Error, $filter("stringFormat")(R.Message.TooManyWagers, gv.wagerLimitInOneBet), [{
                        Text: R.Text.Btn_Close,
                        Callback: function () {
                            $dialog.close();
                        }
                    }]);
                    return;
                }
            }

            wagerList.push(wager);
            self.cleanSuccessBet();
        };

        self.deleteWager = function (index) {
            if (self.isBetProcessing) return;

            wagerList.splice(index, 1);
            self.refreshWager();
        };

        self.deleteWagers = function (indices) {
            if (self.isBetProcessing) return;

            indices.sort(function (a, b) { return b - a; })
                .forEach(function (v) { wagerList.splice(v, 1); });

            self.refreshWager();
        };

        self.deleteAllWager = function () {
            if (self.isBetProcessing) return;

            wagerList.splice(0, wagerList.length);
            self.refreshWager();
        };

        self.updateSinglesBetStake = function (stake) {
            if (self.isBetProcessing) return;

            totalStake = stake;
            for (var i = 0; i < wagerList.length; i++) {
                if (!wagerList[i].wagerNo) {
                    var validStake = Math.min(wagerList[i].selections[0].maxBet, stake);
                    wagerList[i].stake = validStake ? validStake : "";
                }
            }
            self.refreshWager();
        };

        self.getValidWager = function () {
            if (self.isBetProcessing) return;

            var validWagerList = [];
            for (var i = 0; i < wagerList.length; i++) {
                wagerList[i].showValid = true;
                var counter = $counterCache.getCounter(wagerList[i].counterId);

                if (!wagerList[i].stake) {
                    wagerList[i].error = R.Message.BS_StakeMustValidNumber.toUpperCase();
                }
                else if (counter.draw.drawNo !== wagerList[i].drawNo) {
                    wagerList[i].error = R.Message.BS_DrawNotOpen.toUpperCase();
                }
                else if ($counterCache.isLessThanBetClosedTime(counter) || $counterCache.getCounterStatus(counter) !== "open") {
                    wagerList[i].error = R.Message.BS_CounterPaused.toUpperCase();
                }
                else if (wagerList[i].uivalid) {
                    validWagerList.push(wagerList[i]);
                }
            }
            self.refreshWager();
            return validWagerList;
        };

        self.cleanSuccessBet = function () {
            if (self.isBetProcessing) return;

            var list = [];
            for (var i = 0; i < wagerList.length; i++) {
                if (!wagerList[i].wagerNo) {
                    list.push(wagerList[i]);
                }
            }
            wagerList = list;
            self.refreshWager();
        };
    }])
    .service("$trendCache", function () {
        var self = this;

        var trendData = {};
        var trendView = {};
        var trendType = {};
        var trendBall = {};

        self.getTrendData = function (counterId) {
            if (!trendData[counterId]) trendData[counterId] = [];
            return trendData[counterId];
        };
        self.setTrendData = function (counterId, newValue) {
            trendData[counterId] = newValue;
            return trendData[counterId];
        };

        self.getTrendView = function (counterId) {
            if (!trendView[counterId]) trendView[counterId] = "big";
            return trendView[counterId];
        };
        self.setTrendView = function (counterId, newValue) {
            trendView[counterId] = newValue;
            return trendView[counterId];
        };

        self.getTrendType = function (counterId) {
            if (!trendType[counterId]) trendType[counterId] = "bs";
            return trendType[counterId];
        };
        self.setTrendType = function (counterId, newValue) {
            trendType[counterId] = newValue;
            return trendType[counterId];
        };

        self.getTrendBall = function (counterId) {
            if (!trendBall[counterId]) trendBall[counterId] = -1;
            return trendBall[counterId];
        };
        self.setTrendBall = function (counterId, newValue) {
            trendBall[counterId] = newValue;
            return trendBall[counterId];
        };

        self.genDefaultTrendTable = function (rowsCount, colCount) {
            var resultTable = [];
            for (var ri = 0; ri < rowsCount; ri++) {
                resultTable[ri] = [];
                for (var ci = 0; ci < colCount; ci++) {
                    resultTable[ri][ci] = {};
                }
            }
            return resultTable;
        };
    })

    .filter("countdown", ["$counterCache", function ($counterCache) {
        return function (serverDateTime, endDateTime) {
            return $counterCache.countdown(serverDateTime, endDateTime);
        }
    }])
    .filter("trendText", ["$counterCache", function ($counterCache) {
        return function (type) {
            return $counterCache.getTrendText(type);
        }
    }]);;
angular.module("betSlipModule", ["ngAnimate", "counterModule", "reportModule", "componentsModule"])

    .controller("betSlipCtrl", ["$rootScope", "$scope", "$interval", "$counterService", "$placeBetCache", "$reportService", "$dialog", "$sce", "$counterCache", "$timeout", "$systemService", function ($rootScope, $scope, $interval, $counterService, $placeBetCache, $reportService, $dialog, $sce, $counterCache, $timeout, $systemService) {
        var productType = "";
        var currentPage = 1;
        var pageSize = 10;

        $scope.init = function (product) {
            $scope.totalStake = "";
            $scope.betSlipView = "bet";
            $scope.isShowOpenBetDetail = false;
            $scope.isBetProcessing = false;
            productType = product || gv.product;
            $scope.wagerList = $placeBetCache.getWagerList();
            var interval = $interval(function () {
                if ($counterCache.pageData) {
                    $interval.cancel(interval);
                    $scope.openBetData = $counterCache.pageData.OpenBets.wagers;
                    $scope.openBetCount = $counterCache.pageData.OpenBets.totalCount;
                    $scope.stake = $counterCache.pageData.OpenBets.totalStake;
                    $scope.estWinning = $counterCache.pageData.OpenBets.totalReturnAmount;
                    $scope.displayOpenBet = $scope.openBetData;
                }
            }, 100);
            $scope.$watch(
                function () { return $("#betSlipFooter").height(); },
                function (value) { $("div.betslipContainter").css("padding-bottom", value + "px"); });
        }

        $scope.refreshOpenBet = function () {
            $reportService.getOpenBet(productType, 1, pageSize * currentPage).success(function (result) {
                if (result.isSuccess) {
                    $scope.openBetData = result.data.wagers;
                    $scope.openBetCount = result.data.totalCount;
                    $scope.stake = result.data.totalStake;
                    $scope.estWinning = result.data.totalReturnAmount;
                    $scope.displayOpenBet = $scope.openBetData;
                    currentPage = Math.ceil($scope.openBetData.length / pageSize);
                    $scope.showOpenBet();
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            });
        }

        $scope.showOpenBet = function () {
            $scope.displayOpenBet = $scope.openBetData;
            $scope.isShowParlay = false;
        }

        $scope.showParlay = function (item) {
            if (item.bets.length > 1) {
                $scope.displayOpenBet = item;
                $scope.isShowParlay = true;
            }
        }

        $scope.deleteWager = function (index, $event) {
            if ($event) {
                //for mobile mode
                $scope.isBetSlipInTransition = true;
                $($event.target).closest("div.betslip-animation").bind("transitionend webkitTransitionEnd", function () { $scope.isBetSlipInTransition = false; });
            }

            var wager = $placeBetCache.getWager(index);
            $placeBetCache.deleteWager(index);
            $rootScope.$broadcast("betSlipDeleteSingleWager", { wager: wager });
        }

        $scope.deleteAllWager = function () {
            if ($placeBetCache.getWagerList().length == 0) { return; }
            $dialog.show(R.Text.Btn_Clear, R.Message.ConfirmToClearAllWagers, [{
                Text: R.Text.OK,
                Callback: function () {
                    $placeBetCache.deleteAllWager();
                    $dialog.close(true);
                }
            },
            {
                Text: R.Text.Cancel,
                Callback: function () {
                    $dialog.close(true);
                }
            }], true);

            $rootScope.$broadcast("betSlipDeleteAllWager");
        }

        $scope.updateSinglesBetStake = function () {
            $placeBetCache.updateSinglesBetStake($scope.totalStake ? $scope.totalStake.replace(/\,/g, "") : "");
        }

        $scope.getErrorMsg = function (error) {
            if (error.required) {
                return "required";
            } else if (error.min) {
                return R.Message.BS_BetLessThanProfileMinBet;
            } else if (error.max) {
                return R.Message.BS_BetExceedProfileMaxBet;
            }
        }

        $scope.validWager = function () {
            $placeBetCache.getValidWager();
        }

        $scope.placeBet = function () {
            if ($scope.isBetProcessing) return;
            $placeBetCache.cleanSuccessBet();
            var list = $placeBetCache.getValidWager();
            if (list.length == 0) {
                $scope.isBetProcessing = false;
                $scope.isShowLoading = false;
                return;
            };

            $scope.isBetProcessing = true;
            $placeBetCache.isBetProcessing = $scope.isBetProcessing;
            $counterService.placeBet(list).success(function (result) {
                if (result.isSuccess) {
                    // Session expired
                    if (result.msg == "InvalidSessionKey") {
                        if (parent.window.opener) {
                            $dialog.show(R.Text.KickedOutTitle, R.Text.SessionTimeOut, [{
                                Text: R.Text.Btn_Close,
                                Callback: function () {
                                    parent.window.close();
                                }
                            }]);
                            $interval(function () {
                                parent.window.close();
                            }, 10 * 1000);
                        } else {
                            window.location.href = "/" + gv.lang + "/Error/NotAuthorized";
                        }
                    } else if (result.msg == "hold") {
                        return;
                    }

                    $scope.totalStake = "";
                    $placeBetCache.totalStake = $scope.totalStake;

                    if (!result.data) {
                        for (var i = 0; i < list.length; i++) {
                            if (result.msg)
                                list[i].error = result.msg.toUpperCase();
                        }
                        $scope.results = list;
                    } else if (list.length == result.data.length) {
                        for (var i = 0; i < list.length; i++) {
                            var item = result.data[i];

                            if (!!item.error) {
                                list[i].wagerNo = 0;
                                list[i].error = (R.Message[item.error] ? R.Message[item.error] : R.Message.BS_Unknown).toUpperCase();
                            }
                            else {
                                list[i].wagerNo = item.wagerNo;
                                list[i].error = null;
                                $scope.placeBetSuccess = true;
                            }

                            if (list[i].stake != "") {
                                list[i].stake =
                                    list[i].stake < list[i].selections[0].minBet ? list[i].selections[0].minBet :
                                        list[i].stake > list[i].selections[0].maxBet ? list[i].selections[0].maxBet :
                                            list[i].stake;
                            }

                            if (list[i].selection && typeof (list[i].selection) === "string") {
                                list[i].selectionText = R.Game["SelectionType_" + list[i].selection.replace("OddsEvensTie", "Tie").replace("UpDownTie", "Tie")];
                            }
                        }
                        $scope.results = list;
                    }
                    $scope.refreshOpenBet();
                    $scope.updateSingleWalletHostBalance();
                    $rootScope.$broadcast("refreshBalance");
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            }).catch(function (e) {
                console.log("$counterService.placeBet failed!", e);
            }).then(function () {
                $scope.isBetProcessing = false;
                $placeBetCache.isBetProcessing = $scope.isBetProcessing;
                $scope.isShowLoading = false;
                $scope.showResult();
            });
        }

        $scope.updateSingleWalletHostBalance = function () {
            var buCode = $systemService.getCookie("buCode");

            if (buCode.toUpperCase() === "V9BET" || buCode.toUpperCase() === "R88") {
                var origin = gv.parentDomain;
                try {
                    window.parent.postMessage({ topic: "KenoUpdateBalance", data: "KenoUpdateBalance" }, origin);
                } catch (e) {
                    console.log("PostMessage Fail. origin:" + origin);
                }
            }
        }

        $scope.cleanSuccessBet = function () {
            $placeBetCache.getWagerList().forEach(function (wager) {
                if (!!wager.wagerNo)
                    $rootScope.$broadcast("betSlipDeleteSingleWager", { wager: wager });
            });

            $placeBetCache.cleanSuccessBet();
        }

        $scope.cleanSuccessBetMobile = function () {
            $placeBetCache.cleanSuccessBet();
            if ($placeBetCache.getWagerList().length == 0) $scope.$parent.$parent.toggleBetSlip();
        }

        $rootScope.$on("refreshWager", function onRefresh(event, args) {
            $scope.totalStake = $placeBetCache.getTotalStake();
            $scope.wagerList = $placeBetCache.getWagerList();
            $scope.betSlipView = "bet";
            $scope.placeBetSuccess = false;
        });

        $scope.addWagerAmount = function (amount) {
            if (!$scope.wager.stake) {
                $scope.wager.stake = 0;
            }
            $scope.wager.stake += amount;
            $placeBetCache.updateSinglesBetStake($scope.wager.stake);
        };
        $scope.isShowLoading = false;
        $scope.confirmBet = function () {
            var errMsg = "";
            if ($scope.wager.stake === undefined) {
                errMsg = R.Text.EnterStakeAmount;
            } else if ($scope.wager.stake < $scope.wager.selections[0].minBet) {
                errMsg = R.Text.StakeAmountLessThanMinSingleBetAmount;
            } else if ($scope.wager.stake > $scope.wager.selections[0].maxBet) {
                errMsg = R.Text.StakeAmountMoreThanMaxSingleBetAmount;
            }

            if (errMsg.length > 0) {
                $dialog.show(R.Text.Bet, errMsg, [
                    {
                        Text: R.Text.Cancel,
                        Callback: function () {
                            $dialog.close();
                        }
                    }]);
                return;
            }

            $dialog.show(R.Text.Bet, R.Text.SureToPlaceBet, [{
                Text: R.Text.OK,
                Callback: function () {
                    $scope.isShowLoading = true;
                    $scope.placeBet();
                    $dialog.close();
                }
            },
            {
                Text: R.Text.Cancel,
                Callback: function () {
                    $dialog.close();
                }
            }]);
        };

        $scope.dialogSetting = {
            isShowDialog: false,
            title: R.Text.Bet,
            message: R.Text.SureToPlaceBet,
            close: $scope.close,
            buttons: [
                {
                    Text: R.Text.Close,
                    Callback: function () {
                        $scope.dialogSetting.isShowDialog = false;
                    }
                }
            ]
        };

        $scope.showResult = function () {
            $scope.dialogSetting.isShowDialog = true;
            $scope.dialogSetting.buttons = [
                {
                    Text: R.Text.Close,
                    Callback: function () {
                        $scope.dialogSetting.isShowDialog = false;
                        $scope.$emit("closeResult");
                    }
                }
            ];
        }

        $rootScope.$on("CounterDrawStatusChanged", function (event, args) {
            $scope.dialogSetting.isShowDialog = false;
        });

        $scope.$watch("wagerList.length", function (newValue, oldValue) {
            if (newValue != oldValue) {
                angular.element('.badge.hidden').removeClass("visible");
                $timeout(function () {
                    angular.element('.badge.hidden').addClass("visible")
                }, 200);
            }
        });

        $scope.getNextOpenBet = function () {
            if (currentPage * pageSize >= $scope.openBetCount) return;
            $reportService.getOpenBet(productType, currentPage + 1, pageSize).success(function (result) {
                if (result.isSuccess) {
                    if ($scope.openBetCount != result.data.totalCount || $scope.stake != result.data.totalStake || $scope.estWinning != result.data.totalReturnAmount) {
                        $scope.refreshOpenBet();
                        return;
                    }
                    currentPage++;
                    $scope.openBetCount = result.data.totalCount;
                    $scope.stake = result.data.totalStake;
                    $scope.estWinning = result.data.totalReturnAmount;
                    result.data.wagers.forEach(function (item) { $scope.openBetData.push(item); });
                    $scope.displayOpenBet = $scope.openBetData;
                } else {
                    $dialog.show(R.Text.Error, result.msg);
                }
            });
        };

        $scope.toggleChipBox = function (action, wager, stakeInput) {
            $scope.isShowChipBox = false;
            $scope.wagerList.forEach(function (item) { item.isShowChipBox = false; });
            wager = wager || $scope;
            switch (action) {
                case "focus":
                    wager.isShowChipBox = true;
                    if (wager.hideChipBox) {
                        $timeout.cancel(wager.hideChipBox);
                        wager.hideChipBox = null;
                    }
                    $timeout(function () {
                        // This tricky is for detecting soft keypad hides out in the case of Android.
                        if (wager.detectSoftKeyPad) return;
                        var oldSize = $(window).height() + $(window).width();
                        wager.detectSoftKeyPad = $interval(function () {
                            var size = $(window).height() + $(window).width();
                            if (size > oldSize) {
                                // It means that soft keypad disappeared.
                                $(stakeInput).blur();
                                $interval.cancel(wager.detectSoftKeyPad);
                                wager.detectSoftKeyPad = null;
                            }
                        }, 50);
                    }, 500);
                    break;
                case "blur":
                    if (!wager.hideChipBox) {
                        wager.hideChipBox = $timeout(function () {
                            wager.isShowChipBox = false;
                        }, 200);
                    }
                    break;
                default:
                    break;
            }
        };

        $scope.getEstWinAmount = function () {
            if (this.wagerForm.Stake.$error.min || this.wagerForm.Stake.$error.max) {
                return 0;
            }
            var stake = (this.wager.stake + "").replace(",", "");
            return stake * (this.wager.selections[this.wager.selections.length - 1].odds - 1);
        }
    }])
    .controller("chipboxCtrl", ["$scope", "$memberService", function ($scope, $memberService) {
        $scope.init = function () {
            $scope.isShowChipbox = true;
        }

        $scope.showChip = function () {
            if ($scope.isDraging) return;
            if ($scope.isShowChip) {
                $scope.isShowChip = false;
                return;
            }
            $memberService.getChips().success(function (result) {
                $scope.chips = result.data.filter(function (chip) {
                    return chip.favorite;
                });
                $scope.isShowChip = true;
            });
        }

        $scope.addChip = function (val) {
            var $activeElement = angular.element(document.activeElement);
            if ($activeElement.attr("type") == "text") {
                var oriVal = $activeElement.val() ? parseFloat($activeElement.val().replace(/\,/g, "")) : 0;
                $activeElement.val(oriVal + val);
                $activeElement.trigger("change");
            }
        }

        $scope.addMobileChip = function (val, wager) {
            var $activeElement = angular.element($(this.stakeInput));
            var oriVal = $activeElement.val() ? parseFloat($activeElement.val().replace(/\,/g, "")) : 0;
            oriVal = oriVal + val;
            updateElementVal($activeElement, oriVal, wager);
        }

        $scope.appendNumber = function (val, wager) {
            var $activeElement = angular.element($(this.stakeInput));
            var oriVal = $activeElement.val();
            oriVal = oriVal === "NaN" ? "" : oriVal;
            oriVal = oriVal.replace(/\,/g, "") + val;
            oriVal = oriVal <= 0 ? "" : oriVal;
            updateElementVal($activeElement, oriVal, wager);
        }

        $scope.backspace = function () {
            var $activeElement = angular.element($(this.stakeInput));
            var oriVal = $activeElement.val();
            oriVal = oriVal === "NaN" ? "" : oriVal;
            oriVal = oriVal.replace(/\,/g, "").slice(0, -1);
            updateElementVal($activeElement, oriVal);
        }

        updateElementVal = function ($ele, val, wager) {
            if ((wager && wager.wagerNo) || $scope.isBetProcessing) {
                return;
            }
            if (val.length > 12) {
                return;
            }
            if (wager && val > wager.selections[0].maxBet) {
                val = wager.selections[0].maxBet;
            }
            $ele.val(val);
            $ele.trigger("change");
            $ele.focus();
        }
    }])

    .filter("countList", function () {
        return function (list, field) {
            var count = 0;
            if (list)
                for (var i = 0; i < list.length; i++) {
                    if (list[i][field]) {
                        count++;
                    }
                }
            return count;
        }
    })
    .filter("betTypeName", function () {
        return function (betType) {
            var betTypeName = "";
            switch (betType) {
                case "bs": betTypeName = R.Game.BetType_BigSmall; break;
                case "oses": betTypeName = R.Game.BetType_OddsEvens; break;
                case "oe": betTypeName = R.Game.BetType_OddEven; break;
                case "ud": betTypeName = R.Game.BetType_UpDown; break;
                case "ele": betTypeName = R.Game.BetType_FiveElement; break;
                case "bsoe": betTypeName = R.Game.BetType_BigSmallOddEven; break;
            }
            return betTypeName;
        }
    });;
