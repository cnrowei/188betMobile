var JSON, jQuery, Vel, R;
(function (n, t) {
    typeof module == "object" && typeof module.exports == "object" ? module.exports = n.document ? t(n, !0) : function (n) {
        if (!n.document) throw new Error("jQuery requires a window with a document");
        return t(n)
    } : t(n)
})(typeof window != "undefined" ? window : this, function (n, t) {
    function ri(n) {
        var t = "length" in n && n.length,
            r = i.type(n);
        return r === "function" || i.isWindow(n) ? !1 : n.nodeType === 1 && t ? !0 : r === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in n
    }

    function ui(n, t, r) {
        if (i.isFunction(t)) return i.grep(n, function (n, i) {
            return !!t.call(n, i, n) !== r
        });
        if (t.nodeType) return i.grep(n, function (n) {
            return n === t !== r
        });
        if (typeof t == "string") {
            if (re.test(t)) return i.filter(t, n, r);
            t = i.filter(t, n)
        }
        return i.grep(n, function (n) {
            return i.inArray(n, t) >= 0 !== r
        })
    }

    function hr(n, t) {
        do n = n[t]; while (n && n.nodeType !== 1);
        return n
    }

    function ee(n) {
        var t = fi[n] = {};
        return i.each(n.match(h) || [], function (n, i) {
            t[i] = !0
        }), t
    }

    function cr() {
        u.addEventListener ? (u.removeEventListener("DOMContentLoaded", a, !1), n.removeEventListener("load", a, !1)) : (u.detachEvent("onreadystatechange", a), n.detachEvent("onload", a))
    }

    function a() {
        (u.addEventListener || event.type === "load" || u.readyState === "complete") && (cr(), i.ready())
    }

    function yr(n, t, r) {
        if (r === undefined && n.nodeType === 1) {
            var u = "data-" + t.replace(vr, "-$1").toLowerCase();
            if (r = n.getAttribute(u), typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : ar.test(r) ? i.parseJSON(r) : r
                } catch (f) {}
                i.data(n, t, r)
            } else r = undefined
        }
        return r
    }

    function ei(n) {
        for (var t in n)
            if ((t !== "data" || !i.isEmptyObject(n[t])) && t !== "toJSON") return !1;
        return !0
    }

    function pr(n, t, r, u) {
        if (i.acceptData(n)) {
            var s, e, h = i.expando,
                l = n.nodeType,
                o = l ? i.cache : n,
                f = l ? n[h] : n[h] && h;
            if (f && o[f] && (u || o[f].data) || r !== undefined || typeof t != "string") return f || (f = l ? n[h] = c.pop() || i.guid++ : h), o[f] || (o[f] = l ? {} : {
                toJSON: i.noop
            }), (typeof t == "object" || typeof t == "function") && (u ? o[f] = i.extend(o[f], t) : o[f].data = i.extend(o[f].data, t)), e = o[f], u || (e.data || (e.data = {}), e = e.data), r !== undefined && (e[i.camelCase(t)] = r), typeof t == "string" ? (s = e[t], s == null && (s = e[i.camelCase(t)])) : s = e, s
        }
    }

    function wr(n, t, u) {
        if (i.acceptData(n)) {
            var e, s, h = n.nodeType,
                f = h ? i.cache : n,
                o = h ? n[i.expando] : i.expando;
            if (f[o]) {
                if (t && (e = u ? f[o] : f[o].data, e)) {
                    for (i.isArray(t) ? t = t.concat(i.map(t, i.camelCase)) : (t in e) ? t = [t] : (t = i.camelCase(t), t = t in e ? [t] : t.split(" ")), s = t.length; s--;) delete e[t[s]];
                    if (u ? !ei(e) : !i.isEmptyObject(e)) return
                }(u || (delete f[o].data, ei(f[o]))) && (h ? i.cleanData([n], !0) : r.deleteExpando || f != f.window ? delete f[o] : f[o] = null)
            }
        }
    }

    function vt() {
        return !0
    }

    function it() {
        return !1
    }

    function dr() {
        try {
            return u.activeElement
        } catch (n) {}
    }

    function gr(n) {
        var i = nu.split("|"),
            t = n.createDocumentFragment();
        if (t.createElement)
            while (i.length) t.createElement(i.pop());
        return t
    }

    function f(n, t) {
        var e, u, s = 0,
            r = typeof n.getElementsByTagName !== o ? n.getElementsByTagName(t || "*") : typeof n.querySelectorAll !== o ? n.querySelectorAll(t || "*") : undefined;
        if (!r)
            for (r = [], e = n.childNodes || n;
                (u = e[s]) != null; s++) !t || i.nodeName(u, t) ? r.push(u) : i.merge(r, f(u, t));
        return t === undefined || t && i.nodeName(n, t) ? i.merge([n], r) : r
    }

    function we(n) {
        oi.test(n.type) && (n.defaultChecked = n.checked)
    }

    function eu(n, t) {
        return i.nodeName(n, "table") && i.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
    }

    function ou(n) {
        return n.type = (i.find.attr(n, "type") !== null) + "/" + n.type, n
    }

    function su(n) {
        var t = ve.exec(n.type);
        return t ? n.type = t[1] : n.removeAttribute("type"), n
    }

    function li(n, t) {
        for (var u, r = 0;
            (u = n[r]) != null; r++) i._data(u, "globalEval", !t || i._data(t[r], "globalEval"))
    }

    function hu(n, t) {
        if (t.nodeType === 1 && i.hasData(n)) {
            var u, f, o, s = i._data(n),
                r = i._data(t, s),
                e = s.events;
            if (e) {
                delete r.handle;
                r.events = {};
                for (u in e)
                    for (f = 0, o = e[u].length; f < o; f++) i.event.add(t, u, e[u][f])
            }
            r.data && (r.data = i.extend({}, r.data))
        }
    }

    function be(n, t) {
        var u, e, f;
        if (t.nodeType === 1) {
            if (u = t.nodeName.toLowerCase(), !r.noCloneEvent && t[i.expando]) {
                f = i._data(t);
                for (e in f.events) i.removeEvent(t, e, f.handle);
                t.removeAttribute(i.expando)
            }
            u === "script" && t.text !== n.text ? (ou(t).text = n.text, su(t)) : u === "object" ? (t.parentNode && (t.outerHTML = n.outerHTML), r.html5Clone && n.innerHTML && !i.trim(t.innerHTML) && (t.innerHTML = n.innerHTML)) : u === "input" && oi.test(n.type) ? (t.defaultChecked = t.checked = n.checked, t.value !== n.value && (t.value = n.value)) : u === "option" ? t.defaultSelected = t.selected = n.defaultSelected : (u === "input" || u === "textarea") && (t.defaultValue = n.defaultValue)
        }
    }

    function cu(t, r) {
        var f, u = i(r.createElement(t)).appendTo(r.body),
            e = n.getDefaultComputedStyle && (f = n.getDefaultComputedStyle(u[0])) ? f.display : i.css(u[0], "display");
        return u.detach(), e
    }

    function yt(n) {
        var r = u,
            t = ai[n];
        return t || (t = cu(n, r), t !== "none" && t || (ot = (ot || i("<iframe frameborder='0' width='0' height='0'/>")).appendTo(r.documentElement), r = (ot[0].contentWindow || ot[0].contentDocument).document, r.write(), r.close(), t = cu(n, r), ot.detach()), ai[n] = t), t
    }

    function au(n, t) {
        return {
            get: function () {
                var i = n();
                if (i != null) {
                    if (i) {
                        delete this.get;
                        return
                    }
                    return (this.get = t).apply(this, arguments)
                }
            }
        }
    }

    function pu(n, t) {
        if (t in n) return t;
        for (var r = t.charAt(0).toUpperCase() + t.slice(1), u = t, i = yu.length; i--;)
            if (t = yu[i] + r, t in n) return t;
        return u
    }

    function wu(n, t) {
        for (var f, r, o, e = [], u = 0, s = n.length; u < s; u++)(r = n[u], r.style) && (e[u] = i._data(r, "olddisplay"), f = r.style.display, t ? (e[u] || f !== "none" || (r.style.display = ""), r.style.display === "" && et(r) && (e[u] = i._data(r, "olddisplay", yt(r.nodeName)))) : (o = et(r), (f && f !== "none" || !o) && i._data(r, "olddisplay", o ? f : i.css(r, "display"))));
        for (u = 0; u < s; u++)(r = n[u], r.style) && (t && r.style.display !== "none" && r.style.display !== "" || (r.style.display = t ? e[u] || "" : "none"));
        return n
    }

    function bu(n, t, i) {
        var r = no.exec(t);
        return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
    }

    function ku(n, t, r, u, f) {
        for (var e = r === (u ? "border" : "content") ? 4 : t === "width" ? 1 : 0, o = 0; e < 4; e += 2) r === "margin" && (o += i.css(n, r + w[e], !0, f)), u ? (r === "content" && (o -= i.css(n, "padding" + w[e], !0, f)), r !== "margin" && (o -= i.css(n, "border" + w[e] + "Width", !0, f))) : (o += i.css(n, "padding" + w[e], !0, f), r !== "padding" && (o += i.css(n, "border" + w[e] + "Width", !0, f)));
        return o
    }

    function du(n, t, u) {
        var o = !0,
            f = t === "width" ? n.offsetWidth : n.offsetHeight,
            e = k(n),
            s = r.boxSizing && i.css(n, "boxSizing", !1, e) === "border-box";
        if (f <= 0 || f == null) {
            if (f = d(n, t, e), (f < 0 || f == null) && (f = n.style[t]), pt.test(f)) return f;
            o = s && (r.boxSizingReliable() || f === n.style[t]);
            f = parseFloat(f) || 0
        }
        return f + ku(n, t, u || (s ? "border" : "content"), o, e) + "px"
    }

    function e(n, t, i, r, u) {
        return new e.prototype.init(n, t, i, r, u)
    }

    function nf() {
        return setTimeout(function () {
            rt = undefined
        }), rt = i.now()
    }

    function kt(n, t) {
        var r, i = {
                height: n
            },
            u = 0;
        for (t = t ? 1 : 0; u < 4; u += 2 - t) r = w[u], i["margin" + r] = i["padding" + r] = n;
        return t && (i.opacity = i.width = n), i
    }

    function tf(n, t, i) {
        for (var u, f = (st[t] || []).concat(st["*"]), r = 0, e = f.length; r < e; r++)
            if (u = f[r].call(i, t, n)) return u
    }

    function fo(n, t, u) {
        var f, a, p, v, s, w, h, b, l = this,
            y = {},
            o = n.style,
            c = n.nodeType && et(n),
            e = i._data(n, "fxshow");
        u.queue || (s = i._queueHooks(n, "fx"), s.unqueued == null && (s.unqueued = 0, w = s.empty.fire, s.empty.fire = function () {
            s.unqueued || w()
        }), s.unqueued++, l.always(function () {
            l.always(function () {
                s.unqueued--;
                i.queue(n, "fx").length || s.empty.fire()
            })
        }));
        n.nodeType === 1 && ("height" in t || "width" in t) && (u.overflow = [o.overflow, o.overflowX, o.overflowY], h = i.css(n, "display"), b = h === "none" ? i._data(n, "olddisplay") || yt(n.nodeName) : h, b === "inline" && i.css(n, "float") === "none" && (r.inlineBlockNeedsLayout && yt(n.nodeName) !== "inline" ? o.zoom = 1 : o.display = "inline-block"));
        u.overflow && (o.overflow = "hidden", r.shrinkWrapBlocks() || l.always(function () {
            o.overflow = u.overflow[0];
            o.overflowX = u.overflow[1];
            o.overflowY = u.overflow[2]
        }));
        for (f in t)
            if (a = t[f], ro.exec(a)) {
                if (delete t[f], p = p || a === "toggle", a === (c ? "hide" : "show"))
                    if (a === "show" && e && e[f] !== undefined) c = !0;
                    else continue;
                y[f] = e && e[f] || i.style(n, f)
            } else h = undefined;
        if (i.isEmptyObject(y))(h === "none" ? yt(n.nodeName) : h) === "inline" && (o.display = h);
        else {
            e ? "hidden" in e && (c = e.hidden) : e = i._data(n, "fxshow", {});
            p && (e.hidden = !c);
            c ? i(n).show() : l.done(function () {
                i(n).hide()
            });
            l.done(function () {
                var t;
                i._removeData(n, "fxshow");
                for (t in y) i.style(n, t, y[t])
            });
            for (f in y) v = tf(c ? e[f] : 0, f, l), f in e || (e[f] = v.start, c && (v.end = v.start, v.start = f === "width" || f === "height" ? 1 : 0))
        }
    }

    function eo(n, t) {
        var r, f, e, u, o;
        for (r in n)
            if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
                u = o.expand(u);
                delete n[f];
                for (r in u) r in n || (n[r] = u[r], t[r] = e)
            } else t[f] = e
    }

    function rf(n, t, r) {
        var e, o, s = 0,
            l = bt.length,
            f = i.Deferred().always(function () {
                delete c.elem
            }),
            c = function () {
                if (o) return !1;
                for (var s = rt || nf(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, e = u.tweens.length; r < e; r++) u.tweens[r].run(i);
                return f.notifyWith(n, [u, i, t]), i < 1 && e ? t : (f.resolveWith(n, [u]), !1)
            },
            u = f.promise({
                elem: n,
                props: i.extend({}, t),
                opts: i.extend(!0, {
                    specialEasing: {}
                }, r),
                originalProperties: t,
                originalOptions: r,
                startTime: rt || nf(),
                duration: r.duration,
                tweens: [],
                createTween: function (t, r) {
                    var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(f), f
                },
                stop: function (t) {
                    var i = 0,
                        r = t ? u.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i < r; i++) u.tweens[i].run(1);
                    return t ? f.resolveWith(n, [u, t]) : f.rejectWith(n, [u, t]), this
                }
            }),
            h = u.props;
        for (eo(h, u.opts.specialEasing); s < l; s++)
            if (e = bt[s].call(u, n, h, u.opts), e) return e;
        return i.map(h, tf, u), i.isFunction(u.opts.start) && u.opts.start.call(n, u), i.fx.timer(i.extend(c, {
            elem: n,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function af(n) {
        return function (t, r) {
            typeof t != "string" && (r = t, t = "*");
            var u, f = 0,
                e = t.toLowerCase().match(h) || [];
            if (i.isFunction(r))
                while (u = e[f++]) u.charAt(0) === "+" ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
        }
    }

    function vf(n, t, r, u) {
        function e(s) {
            var h;
            return f[s] = !0, i.each(n[s] || [], function (n, i) {
                var s = i(t, r, u);
                if (typeof s != "string" || o || f[s]) {
                    if (o) return !(h = s)
                } else return t.dataTypes.unshift(s), e(s), !1
            }), h
        }
        var f = {},
            o = n === bi;
        return e(t.dataTypes[0]) || !f["*"] && e("*")
    }

    function ki(n, t) {
        var u, r, f = i.ajaxSettings.flatOptions || {};
        for (r in t) t[r] !== undefined && ((f[r] ? n : u || (u = {}))[r] = t[r]);
        return u && i.extend(!0, n, u), n
    }

    function ao(n, t, i) {
        for (var o, e, u, f, s = n.contents, r = n.dataTypes; r[0] === "*";) r.shift(), e === undefined && (e = n.mimeType || t.getResponseHeader("Content-Type"));
        if (e)
            for (f in s)
                if (s[f] && s[f].test(e)) {
                    r.unshift(f);
                    break
                }
        if (r[0] in i) u = r[0];
        else {
            for (f in i) {
                if (!r[0] || n.converters[f + " " + r[0]]) {
                    u = f;
                    break
                }
                o || (o = f)
            }
            u = u || o
        }
        if (u) return u !== r[0] && r.unshift(u), i[u]
    }

    function vo(n, t, i, r) {
        var h, u, f, s, e, o = {},
            c = n.dataTypes.slice();
        if (c[1])
            for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
        for (u = c.shift(); u;)
            if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift(), u)
                if (u === "*") u = e;
                else if (e !== "*" && e !== u) {
            if (f = o[e + " " + u] || o["* " + u], !f)
                for (h in o)
                    if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]], f)) {
                        f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
                        break
                    }
            if (f !== !0)
                if (f && n.throws) t = f(t);
                else try {
                    t = f(t)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: f ? l : "No conversion from " + e + " to " + u
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function di(n, t, r, u) {
        var f;
        if (i.isArray(t)) i.each(t, function (t, i) {
            r || po.test(n) ? u(n, i) : di(n + "[" + (typeof i == "object" ? t : "") + "]", i, r, u)
        });
        else if (r || i.type(t) !== "object") u(n, t);
        else
            for (f in t) di(n + "[" + f + "]", t[f], r, u)
    }

    function pf() {
        try {
            return new n.XMLHttpRequest
        } catch (t) {}
    }

    function go() {
        try {
            return new n.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function wf(n) {
        return i.isWindow(n) ? n : n.nodeType === 9 ? n.defaultView || n.parentWindow : !1
    }
    var c = [],
        l = c.slice,
        ir = c.concat,
        ii = c.push,
        rr = c.indexOf,
        ct = {},
        df = ct.toString,
        tt = ct.hasOwnProperty,
        r = {},
        ur = "1.11.3",
        i = function (n, t) {
            return new i.fn.init(n, t)
        },
        gf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ne = /^-ms-/,
        te = /-([\da-z])/gi,
        ie = function (n, t) {
            return t.toUpperCase()
        },
        p, or, sr, h, fi, lt, o, lr, ar, vr, ot, ai, uf, ef, of , gt, gi, ti, nr, tr, bf, kf;
    i.fn = i.prototype = {
        jquery: ur,
        constructor: i,
        selector: "",
        length: 0,
        toArray: function () {
            return l.call(this)
        },
        get: function (n) {
            return n != null ? n < 0 ? this[n + this.length] : this[n] : l.call(this)
        },
        pushStack: function (n) {
            var t = i.merge(this.constructor(), n);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function (n, t) {
            return i.each(this, n, t)
        },
        map: function (n) {
            return this.pushStack(i.map(this, function (t, i) {
                return n.call(t, i, t)
            }))
        },
        slice: function () {
            return this.pushStack(l.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (n) {
            var i = this.length,
                t = +n + (n < 0 ? i : 0);
            return this.pushStack(t >= 0 && t < i ? [this[t]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: ii,
        sort: c.sort,
        splice: c.splice
    };
    i.extend = i.fn.extend = function () {
        var r, e, t, f, o, s, n = arguments[0] || {},
            u = 1,
            c = arguments.length,
            h = !1;
        for (typeof n == "boolean" && (h = n, n = arguments[u] || {}, u++), typeof n == "object" || i.isFunction(n) || (n = {}), u === c && (n = this, u--); u < c; u++)
            if ((o = arguments[u]) != null)
                for (f in o)(r = n[f], t = o[f], n !== t) && (h && t && (i.isPlainObject(t) || (e = i.isArray(t))) ? (e ? (e = !1, s = r && i.isArray(r) ? r : []) : s = r && i.isPlainObject(r) ? r : {}, n[f] = i.extend(h, s, t)) : t !== undefined && (n[f] = t));
        return n
    };
    i.extend({
        expando: "jQuery" + (ur + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (n) {
            throw new Error(n);
        },
        noop: function () {},
        isFunction: function (n) {
            return i.type(n) === "function"
        },
        isArray: Array.isArray || function (n) {
            return i.type(n) === "array"
        },
        isWindow: function (n) {
            return n != null && n == n.window
        },
        isNumeric: function (n) {
            return !i.isArray(n) && n - parseFloat(n) + 1 >= 0
        },
        isEmptyObject: function (n) {
            for (var t in n) return !1;
            return !0
        },
        isPlainObject: function (n) {
            var t;
            if (!n || i.type(n) !== "object" || n.nodeType || i.isWindow(n)) return !1;
            try {
                if (n.constructor && !tt.call(n, "constructor") && !tt.call(n.constructor.prototype, "isPrototypeOf")) return !1
            } catch (u) {
                return !1
            }
            if (r.ownLast)
                for (t in n) return tt.call(n, t);
            for (t in n);
            return t === undefined || tt.call(n, t)
        },
        type: function (n) {
            return n == null ? n + "" : typeof n == "object" || typeof n == "function" ? ct[df.call(n)] || "object" : typeof n
        },
        globalEval: function (t) {
            t && i.trim(t) && (n.execScript || function (t) {
                n.eval.call(n, t)
            })(t)
        },
        camelCase: function (n) {
            return n.replace(ne, "ms-").replace(te, ie)
        },
        nodeName: function (n, t) {
            return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (n, t, i) {
            var u, r = 0,
                f = n.length,
                e = ri(n);
            if (i) {
                if (e) {
                    for (; r < f; r++)
                        if (u = t.apply(n[r], i), u === !1) break
                } else
                    for (r in n)
                        if (u = t.apply(n[r], i), u === !1) break
            } else if (e) {
                for (; r < f; r++)
                    if (u = t.call(n[r], r, n[r]), u === !1) break
            } else
                for (r in n)
                    if (u = t.call(n[r], r, n[r]), u === !1) break;
            return n
        },
        trim: function (n) {
            return n == null ? "" : (n + "").replace(gf, "")
        },
        makeArray: function (n, t) {
            var r = t || [];
            return n != null && (ri(Object(n)) ? i.merge(r, typeof n == "string" ? [n] : n) : ii.call(r, n)), r
        },
        inArray: function (n, t, i) {
            var r;
            if (t) {
                if (rr) return rr.call(t, n, i);
                for (r = t.length, i = i ? i < 0 ? Math.max(0, r + i) : i : 0; i < r; i++)
                    if (i in t && t[i] === n) return i
            }
            return -1
        },
        merge: function (n, t) {
            for (var r = +t.length, i = 0, u = n.length; i < r;) n[u++] = t[i++];
            if (r !== r)
                while (t[i] !== undefined) n[u++] = t[i++];
            return n.length = u, n
        },
        grep: function (n, t, i) {
            for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++) u = !t(n[r], r), u !== o && f.push(n[r]);
            return f
        },
        map: function (n, t, i) {
            var u, r = 0,
                e = n.length,
                o = ri(n),
                f = [];
            if (o)
                for (; r < e; r++) u = t(n[r], r, i), u != null && f.push(u);
            else
                for (r in n) u = t(n[r], r, i), u != null && f.push(u);
            return ir.apply([], f)
        },
        guid: 1,
        proxy: function (n, t) {
            var u, r, f;
            return (typeof t == "string" && (f = n[t], t = n, n = f), !i.isFunction(n)) ? undefined : (u = l.call(arguments, 2), r = function () {
                return n.apply(t || this, u.concat(l.call(arguments)))
            }, r.guid = n.guid = n.guid || i.guid++, r)
        },
        now: function () {
            return +new Date
        },
        support: r
    });
    i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (n, t) {
        ct["[object " + t + "]"] = t.toLowerCase()
    });
    p = function (n) {
        function r(n, t, i, r) {
            var p, s, a, c, w, y, d, v, nt, g;
            if ((t ? t.ownerDocument || t : h) !== o && k(t), t = t || o, i = i || [], c = t.nodeType, typeof n != "string" || !n || c !== 1 && c !== 9 && c !== 11) return i;
            if (!r && l) {
                if (c !== 11 && (p = hr.exec(n)))
                    if (a = p[1]) {
                        if (c === 9)
                            if (s = t.getElementById(a), s && s.parentNode) {
                                if (s.id === a) return i.push(s), i
                            } else return i;
                        else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && et(t, s) && s.id === a) return i.push(s), i
                    } else {
                        if (p[2]) return b.apply(i, t.getElementsByTagName(n)), i;
                        if ((a = p[3]) && u.getElementsByClassName) return b.apply(i, t.getElementsByClassName(a)), i
                    }
                if (u.qsa && (!e || !e.test(n))) {
                    if (v = d = f, nt = t, g = c !== 1 && n, c === 1 && t.nodeName.toLowerCase() !== "object") {
                        for (y = ft(n), (d = t.getAttribute("id")) ? v = d.replace(cr, "\\$&") : t.setAttribute("id", v), v = "[id='" + v + "'] ", w = y.length; w--;) y[w] = v + vt(y[w]);
                        nt = dt.test(n) && ti(t.parentNode) || t;
                        g = y.join(",")
                    }
                    if (g) try {
                        return b.apply(i, nt.querySelectorAll(g)), i
                    } catch (tt) {} finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return oi(n.replace(lt, "$1"), t, i, r)
        }

        function gt() {
            function n(r, u) {
                return i.push(r + " ") > t.cacheLength && delete n[i.shift()], n[r + " "] = u
            }
            var i = [];
            return n
        }

        function c(n) {
            return n[f] = !0, n
        }

        function v(n) {
            var t = o.createElement("div");
            try {
                return !!n(t)
            } catch (i) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null
            }
        }

        function ni(n, i) {
            for (var u = n.split("|"), r = n.length; r--;) t.attrHandle[u[r]] = i
        }

        function wi(n, t) {
            var i = t && n,
                r = i && n.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || li) - (~n.sourceIndex || li);
            if (r) return r;
            if (i)
                while (i = i.nextSibling)
                    if (i === t) return -1;
            return n ? 1 : -1
        }

        function lr(n) {
            return function (t) {
                var i = t.nodeName.toLowerCase();
                return i === "input" && t.type === n
            }
        }

        function ar(n) {
            return function (t) {
                var i = t.nodeName.toLowerCase();
                return (i === "input" || i === "button") && t.type === n
            }
        }

        function tt(n) {
            return c(function (t) {
                return t = +t, c(function (i, r) {
                    for (var u, f = n([], i.length, t), e = f.length; e--;) i[u = f[e]] && (i[u] = !(r[u] = i[u]))
                })
            })
        }

        function ti(n) {
            return n && typeof n.getElementsByTagName != "undefined" && n
        }

        function bi() {}

        function vt(n) {
            for (var t = 0, r = n.length, i = ""; t < r; t++) i += n[t].value;
            return i
        }

        function ii(n, t, i) {
            var r = t.dir,
                u = i && r === "parentNode",
                e = ki++;
            return t.first ? function (t, i, f) {
                while (t = t[r])
                    if (t.nodeType === 1 || u) return n(t, i, f)
            } : function (t, i, o) {
                var s, h, c = [a, e];
                if (o) {
                    while (t = t[r])
                        if ((t.nodeType === 1 || u) && n(t, i, o)) return !0
                } else
                    while (t = t[r])
                        if (t.nodeType === 1 || u) {
                            if (h = t[f] || (t[f] = {}), (s = h[r]) && s[0] === a && s[1] === e) return c[2] = s[2];
                            if (h[r] = c, c[2] = n(t, i, o)) return !0
                        }
            }
        }

        function ri(n) {
            return n.length > 1 ? function (t, i, r) {
                for (var u = n.length; u--;)
                    if (!n[u](t, i, r)) return !1;
                return !0
            } : n[0]
        }

        function vr(n, t, i) {
            for (var u = 0, f = t.length; u < f; u++) r(n, t[u], i);
            return i
        }

        function yt(n, t, i, r, u) {
            for (var e, o = [], f = 0, s = n.length, h = t != null; f < s; f++)(e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
            return o
        }

        function ui(n, t, i, r, u, e) {
            return r && !r[f] && (r = ui(r)), u && !u[f] && (u = ui(u, e)), c(function (f, e, o, s) {
                var l, c, a, p = [],
                    y = [],
                    w = e.length,
                    k = f || vr(t || "*", o.nodeType ? [o] : o, []),
                    v = n && (f || !t) ? yt(k, p, n, o, s) : k,
                    h = i ? u || (f ? n : w || r) ? [] : e : v;
                if (i && i(v, h, o, s), r)
                    for (l = yt(h, y), r(l, [], o, s), c = l.length; c--;)(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                if (f) {
                    if (u || n) {
                        if (u) {
                            for (l = [], c = h.length; c--;)(a = h[c]) && l.push(v[c] = a);
                            u(null, h = [], l, s)
                        }
                        for (c = h.length; c--;)(a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
                    }
                } else h = yt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : b.apply(e, h)
            })
        }

        function fi(n) {
            for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = ii(function (n) {
                    return n === o
                }, c, !0), a = ii(function (n) {
                    return nt(o, n) > -1
                }, c, !0), e = [function (n, t, i) {
                    var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                    return o = null, r
                }]; i < s; i++)
                if (u = t.relative[n[i].type]) e = [ii(ri(e), u)];
                else {
                    if (u = t.filter[n[i].type].apply(null, n[i].matches), u[f]) {
                        for (r = ++i; r < s; r++)
                            if (t.relative[n[r].type]) break;
                        return ui(i > 1 && ri(e), i > 1 && vt(n.slice(0, i - 1).concat({
                            value: n[i - 2].type === " " ? "*" : ""
                        })).replace(lt, "$1"), u, i < r && fi(n.slice(i, r)), r < s && fi(n = n.slice(r)), r < s && vt(n))
                    }
                    e.push(u)
                }
            return ri(e)
        }

        function yr(n, i) {
            var u = i.length > 0,
                f = n.length > 0,
                e = function (e, s, h, c, l) {
                    var y, d, w, k = 0,
                        v = "0",
                        g = e && [],
                        p = [],
                        nt = ht,
                        tt = e || f && t.find.TAG("*", l),
                        it = a += nt == null ? 1 : Math.random() || .1,
                        rt = tt.length;
                    for (l && (ht = s !== o && s); v !== rt && (y = tt[v]) != null; v++) {
                        if (f && y) {
                            for (d = 0; w = n[d++];)
                                if (w(y, s, h)) {
                                    c.push(y);
                                    break
                                }
                            l && (a = it)
                        }
                        u && ((y = !w && y) && k--, e && g.push(y))
                    }
                    if (k += v, u && v !== k) {
                        for (d = 0; w = i[d++];) w(g, p, s, h);
                        if (e) {
                            if (k > 0)
                                while (v--) g[v] || p[v] || (p[v] = gi.call(c));
                            p = yt(p)
                        }
                        b.apply(c, p);
                        l && !e && p.length > 0 && k + i.length > 1 && r.uniqueSort(c)
                    }
                    return l && (a = it, ht = nt), g
                };
            return u ? c(e) : e
        }
        var it, u, t, st, ei, ft, pt, oi, ht, w, rt, k, o, s, l, e, d, ct, et, f = "sizzle" + 1 * new Date,
            h = n.document,
            a = 0,
            ki = 0,
            si = gt(),
            hi = gt(),
            ci = gt(),
            wt = function (n, t) {
                return n === t && (rt = !0), 0
            },
            li = -2147483648,
            di = {}.hasOwnProperty,
            g = [],
            gi = g.pop,
            nr = g.push,
            b = g.push,
            ai = g.slice,
            nt = function (n, t) {
                for (var i = 0, r = n.length; i < r; i++)
                    if (n[i] === t) return i;
                return -1
            },
            bt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            i = "[\\x20\\t\\r\\n\\f]",
            ut = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            vi = ut.replace("w", "w#"),
            yi = "\\[" + i + "*(" + ut + ")(?:" + i + "*([*^$|!~]?=)" + i + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + vi + "))|)" + i + "*\\]",
            kt = ":(" + ut + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + yi + ")*)|.*)\\)|)",
            tr = new RegExp(i + "+", "g"),
            lt = new RegExp("^" + i + "+|((?:^|[^\\\\])(?:\\\\.)*)" + i + "+$", "g"),
            ir = new RegExp("^" + i + "*," + i + "*"),
            rr = new RegExp("^" + i + "*([>+~]|" + i + ")" + i + "*"),
            ur = new RegExp("=" + i + "*([^\\]'\"]*?)" + i + "*\\]", "g"),
            fr = new RegExp(kt),
            er = new RegExp("^" + vi + "$"),
            at = {
                ID: new RegExp("^#(" + ut + ")"),
                CLASS: new RegExp("^\\.(" + ut + ")"),
                TAG: new RegExp("^(" + ut.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + yi),
                PSEUDO: new RegExp("^" + kt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + i + "*(even|odd|(([+-]|)(\\d*)n|)" + i + "*(?:([+-]|)" + i + "*(\\d+)|))" + i + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + bt + ")$", "i"),
                needsContext: new RegExp("^" + i + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + i + "*((?:-\\d)?\\d*)" + i + "*\\)|)(?=[^-]|$)", "i")
            },
            or = /^(?:input|select|textarea|button)$/i,
            sr = /^h\d$/i,
            ot = /^[^{]+\{\s*\[native \w/,
            hr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            dt = /[+~]/,
            cr = /'|\\/g,
            y = new RegExp("\\\\([\\da-f]{1,6}" + i + "?|(" + i + ")|.)", "ig"),
            p = function (n, t, i) {
                var r = "0x" + t - 65536;
                return r !== r || i ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
            },
            pi = function () {
                k()
            };
        try {
            b.apply(g = ai.call(h.childNodes), h.childNodes);
            g[h.childNodes.length].nodeType
        } catch (pr) {
            b = {
                apply: g.length ? function (n, t) {
                    nr.apply(n, ai.call(t))
                } : function (n, t) {
                    for (var i = n.length, r = 0; n[i++] = t[r++];);
                    n.length = i - 1
                }
            }
        }
        u = r.support = {};
        ei = r.isXML = function (n) {
            var t = n && (n.ownerDocument || n).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        };
        k = r.setDocument = function (n) {
            var a, c, r = n ? n.ownerDocument || n : h;
            return r === o || r.nodeType !== 9 || !r.documentElement ? o : (o = r, s = r.documentElement, c = r.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", pi, !1) : c.attachEvent && c.attachEvent("onunload", pi)), l = !ei(r), u.attributes = v(function (n) {
                return n.className = "i", !n.getAttribute("className")
            }), u.getElementsByTagName = v(function (n) {
                return n.appendChild(r.createComment("")), !n.getElementsByTagName("*").length
            }), u.getElementsByClassName = ot.test(r.getElementsByClassName), u.getById = v(function (n) {
                return s.appendChild(n).id = f, !r.getElementsByName || !r.getElementsByName(f).length
            }), u.getById ? (t.find.ID = function (n, t) {
                if (typeof t.getElementById != "undefined" && l) {
                    var i = t.getElementById(n);
                    return i && i.parentNode ? [i] : []
                }
            }, t.filter.ID = function (n) {
                var t = n.replace(y, p);
                return function (n) {
                    return n.getAttribute("id") === t
                }
            }) : (delete t.find.ID, t.filter.ID = function (n) {
                var t = n.replace(y, p);
                return function (n) {
                    var i = typeof n.getAttributeNode != "undefined" && n.getAttributeNode("id");
                    return i && i.value === t
                }
            }), t.find.TAG = u.getElementsByTagName ? function (n, t) {
                return typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName(n) : u.qsa ? t.querySelectorAll(n) : void 0
            } : function (n, t) {
                var i, r = [],
                    f = 0,
                    u = t.getElementsByTagName(n);
                if (n === "*") {
                    while (i = u[f++]) i.nodeType === 1 && r.push(i);
                    return r
                }
                return u
            }, t.find.CLASS = u.getElementsByClassName && function (n, t) {
                if (l) return t.getElementsByClassName(n)
            }, d = [], e = [], (u.qsa = ot.test(r.querySelectorAll)) && (v(function (n) {
                s.appendChild(n).innerHTML = "<a id='" + f + "'><\/a><select id='" + f + "-\f]' msallowcapture=''><option selected=''><\/option><\/select>";
                n.querySelectorAll("[msallowcapture^='']").length && e.push("[*^$]=" + i + "*(?:''|\"\")");
                n.querySelectorAll("[selected]").length || e.push("\\[" + i + "*(?:value|" + bt + ")");
                n.querySelectorAll("[id~=" + f + "-]").length || e.push("~=");
                n.querySelectorAll(":checked").length || e.push(":checked");
                n.querySelectorAll("a#" + f + "+*").length || e.push(".#.+[+~]")
            }), v(function (n) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden");
                n.appendChild(t).setAttribute("name", "D");
                n.querySelectorAll("[name=d]").length && e.push("name" + i + "*[*^$|!~]?=");
                n.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled");
                n.querySelectorAll("*,:x");
                e.push(",.*:")
            })), (u.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && v(function (n) {
                u.disconnectedMatch = ct.call(n, "div");
                ct.call(n, "[s!='']:x");
                d.push("!=", kt)
            }), e = e.length && new RegExp(e.join("|")), d = d.length && new RegExp(d.join("|")), a = ot.test(s.compareDocumentPosition), et = a || ot.test(s.contains) ? function (n, t) {
                var r = n.nodeType === 9 ? n.documentElement : n,
                    i = t && t.parentNode;
                return n === i || !!(i && i.nodeType === 1 && (r.contains ? r.contains(i) : n.compareDocumentPosition && n.compareDocumentPosition(i) & 16))
            } : function (n, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === n) return !0;
                return !1
            }, wt = a ? function (n, t) {
                if (n === t) return rt = !0, 0;
                var i = !n.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i : (i = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1, i & 1 || !u.sortDetached && t.compareDocumentPosition(n) === i) ? n === r || n.ownerDocument === h && et(h, n) ? -1 : t === r || t.ownerDocument === h && et(h, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : i & 4 ? -1 : 1
            } : function (n, t) {
                if (n === t) return rt = !0, 0;
                var i, u = 0,
                    o = n.parentNode,
                    s = t.parentNode,
                    f = [n],
                    e = [t];
                if (o && s) {
                    if (o === s) return wi(n, t)
                } else return n === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                for (i = n; i = i.parentNode;) f.unshift(i);
                for (i = t; i = i.parentNode;) e.unshift(i);
                while (f[u] === e[u]) u++;
                return u ? wi(f[u], e[u]) : f[u] === h ? -1 : e[u] === h ? 1 : 0
            }, r)
        };
        r.matches = function (n, t) {
            return r(n, null, null, t)
        };
        r.matchesSelector = function (n, t) {
            if ((n.ownerDocument || n) !== o && k(n), t = t.replace(ur, "='$1']"), u.matchesSelector && l && (!d || !d.test(t)) && (!e || !e.test(t))) try {
                var i = ct.call(n, t);
                if (i || u.disconnectedMatch || n.document && n.document.nodeType !== 11) return i
            } catch (f) {}
            return r(t, o, null, [n]).length > 0
        };
        r.contains = function (n, t) {
            return (n.ownerDocument || n) !== o && k(n), et(n, t)
        };
        r.attr = function (n, i) {
            (n.ownerDocument || n) !== o && k(n);
            var f = t.attrHandle[i.toLowerCase()],
                r = f && di.call(t.attrHandle, i.toLowerCase()) ? f(n, i, !l) : undefined;
            return r !== undefined ? r : u.attributes || !l ? n.getAttribute(i) : (r = n.getAttributeNode(i)) && r.specified ? r.value : null
        };
        r.error = function (n) {
            throw new Error("Syntax error, unrecognized expression: " + n);
        };
        r.uniqueSort = function (n) {
            var r, f = [],
                t = 0,
                i = 0;
            if (rt = !u.detectDuplicates, w = !u.sortStable && n.slice(0), n.sort(wt), rt) {
                while (r = n[i++]) r === n[i] && (t = f.push(i));
                while (t--) n.splice(f[t], 1)
            }
            return w = null, n
        };
        st = r.getText = function (n) {
            var r, i = "",
                u = 0,
                t = n.nodeType;
            if (t) {
                if (t === 1 || t === 9 || t === 11) {
                    if (typeof n.textContent == "string") return n.textContent;
                    for (n = n.firstChild; n; n = n.nextSibling) i += st(n)
                } else if (t === 3 || t === 4) return n.nodeValue
            } else
                while (r = n[u++]) i += st(r);
            return i
        };
        t = r.selectors = {
            cacheLength: 50,
            createPseudo: c,
            match: at,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (n) {
                    return n[1] = n[1].replace(y, p), n[3] = (n[3] || n[4] || n[5] || "").replace(y, p), n[2] === "~=" && (n[3] = " " + n[3] + " "), n.slice(0, 4)
                },
                CHILD: function (n) {
                    return n[1] = n[1].toLowerCase(), n[1].slice(0, 3) === "nth" ? (n[3] || r.error(n[0]), n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * (n[3] === "even" || n[3] === "odd")), n[5] = +(n[7] + n[8] || n[3] === "odd")) : n[3] && r.error(n[0]), n
                },
                PSEUDO: function (n) {
                    var i, t = !n[6] && n[2];
                    return at.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && fr.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i), n[2] = t.slice(0, i)), n.slice(0, 3))
                }
            },
            filter: {
                TAG: function (n) {
                    var t = n.replace(y, p).toLowerCase();
                    return n === "*" ? function () {
                        return !0
                    } : function (n) {
                        return n.nodeName && n.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function (n) {
                    var t = si[n + " "];
                    return t || (t = new RegExp("(^|" + i + ")" + n + "(" + i + "|$)")) && si(n, function (n) {
                        return t.test(typeof n.className == "string" && n.className || typeof n.getAttribute != "undefined" && n.getAttribute("class") || "")
                    })
                },
                ATTR: function (n, t, i) {
                    return function (u) {
                        var f = r.attr(u, n);
                        return f == null ? t === "!=" : t ? (f += "", t === "=" ? f === i : t === "!=" ? f !== i : t === "^=" ? i && f.indexOf(i) === 0 : t === "*=" ? i && f.indexOf(i) > -1 : t === "$=" ? i && f.slice(-i.length) === i : t === "~=" ? (" " + f.replace(tr, " ") + " ").indexOf(i) > -1 : t === "|=" ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function (n, t, i, r, u) {
                    var s = n.slice(0, 3) !== "nth",
                        o = n.slice(-4) !== "last",
                        e = t === "of-type";
                    return r === 1 && u === 0 ? function (n) {
                        return !!n.parentNode
                    } : function (t, i, h) {
                        var v, k, c, l, y, w, b = s !== o ? "nextSibling" : "previousSibling",
                            p = t.parentNode,
                            g = e && t.nodeName.toLowerCase(),
                            d = !h && !e;
                        if (p) {
                            if (s) {
                                while (b) {
                                    for (c = t; c = c[b];)
                                        if (e ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                                    w = b = n === "only" && !w && "nextSibling"
                                }
                                return !0
                            }
                            if (w = [o ? p.firstChild : p.lastChild], o && d) {
                                for (k = p[f] || (p[f] = {}), v = k[n] || [], y = v[0] === a && v[1], l = v[0] === a && v[2], c = y && p.childNodes[y]; c = ++y && c && c[b] || (l = y = 0) || w.pop();)
                                    if (c.nodeType === 1 && ++l && c === t) {
                                        k[n] = [a, y, l];
                                        break
                                    }
                            } else if (d && (v = (t[f] || (t[f] = {}))[n]) && v[0] === a) l = v[1];
                            else
                                while (c = ++y && c && c[b] || (l = y = 0) || w.pop())
                                    if ((e ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++l && (d && ((c[f] || (c[f] = {}))[n] = [a, l]), c === t)) break;
                            return l -= u, l === r || l % r == 0 && l / r >= 0
                        }
                    }
                },
                PSEUDO: function (n, i) {
                    var e, u = t.pseudos[n] || t.setFilters[n.toLowerCase()] || r.error("unsupported pseudo: " + n);
                    return u[f] ? u(i) : u.length > 1 ? (e = [n, n, "", i], t.setFilters.hasOwnProperty(n.toLowerCase()) ? c(function (n, t) {
                        for (var r, f = u(n, i), e = f.length; e--;) r = nt(n, f[e]), n[r] = !(t[r] = f[e])
                    }) : function (n) {
                        return u(n, 0, e)
                    }) : u
                }
            },
            pseudos: {
                not: c(function (n) {
                    var t = [],
                        r = [],
                        i = pt(n.replace(lt, "$1"));
                    return i[f] ? c(function (n, t, r, u) {
                        for (var e, o = i(n, null, u, []), f = n.length; f--;)(e = o[f]) && (n[f] = !(t[f] = e))
                    }) : function (n, u, f) {
                        return t[0] = n, i(t, null, f, r), t[0] = null, !r.pop()
                    }
                }),
                has: c(function (n) {
                    return function (t) {
                        return r(n, t).length > 0
                    }
                }),
                contains: c(function (n) {
                    return n = n.replace(y, p),
                        function (t) {
                            return (t.textContent || t.innerText || st(t)).indexOf(n) > -1
                        }
                }),
                lang: c(function (n) {
                    return er.test(n || "") || r.error("unsupported lang: " + n), n = n.replace(y, p).toLowerCase(),
                        function (t) {
                            var i;
                            do
                                if (i = l ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === n || i.indexOf(n + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
                            return !1
                        }
                }),
                target: function (t) {
                    var i = n.location && n.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function (n) {
                    return n === s
                },
                focus: function (n) {
                    return n === o.activeElement && (!o.hasFocus || o.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
                },
                enabled: function (n) {
                    return n.disabled === !1
                },
                disabled: function (n) {
                    return n.disabled === !0
                },
                checked: function (n) {
                    var t = n.nodeName.toLowerCase();
                    return t === "input" && !!n.checked || t === "option" && !!n.selected
                },
                selected: function (n) {
                    return n.parentNode && n.parentNode.selectedIndex, n.selected === !0
                },
                empty: function (n) {
                    for (n = n.firstChild; n; n = n.nextSibling)
                        if (n.nodeType < 6) return !1;
                    return !0
                },
                parent: function (n) {
                    return !t.pseudos.empty(n)
                },
                header: function (n) {
                    return sr.test(n.nodeName)
                },
                input: function (n) {
                    return or.test(n.nodeName)
                },
                button: function (n) {
                    var t = n.nodeName.toLowerCase();
                    return t === "input" && n.type === "button" || t === "button"
                },
                text: function (n) {
                    var t;
                    return n.nodeName.toLowerCase() === "input" && n.type === "text" && ((t = n.getAttribute("type")) == null || t.toLowerCase() === "text")
                },
                first: tt(function () {
                    return [0]
                }),
                last: tt(function (n, t) {
                    return [t - 1]
                }),
                eq: tt(function (n, t, i) {
                    return [i < 0 ? i + t : i]
                }),
                even: tt(function (n, t) {
                    for (var i = 0; i < t; i += 2) n.push(i);
                    return n
                }),
                odd: tt(function (n, t) {
                    for (var i = 1; i < t; i += 2) n.push(i);
                    return n
                }),
                lt: tt(function (n, t, i) {
                    for (var r = i < 0 ? i + t : i; --r >= 0;) n.push(r);
                    return n
                }),
                gt: tt(function (n, t, i) {
                    for (var r = i < 0 ? i + t : i; ++r < t;) n.push(r);
                    return n
                })
            }
        };
        t.pseudos.nth = t.pseudos.eq;
        for (it in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) t.pseudos[it] = lr(it);
        for (it in {
                submit: !0,
                reset: !0
            }) t.pseudos[it] = ar(it);
        return bi.prototype = t.filters = t.pseudos, t.setFilters = new bi, ft = r.tokenize = function (n, i) {
            var e, f, s, o, u, h, c, l = hi[n + " "];
            if (l) return i ? 0 : l.slice(0);
            for (u = n, h = [], c = t.preFilter; u;) {
                (!e || (f = ir.exec(u))) && (f && (u = u.slice(f[0].length) || u), h.push(s = []));
                e = !1;
                (f = rr.exec(u)) && (e = f.shift(), s.push({
                    value: e,
                    type: f[0].replace(lt, " ")
                }), u = u.slice(e.length));
                for (o in t.filter)(f = at[o].exec(u)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
                    value: e,
                    type: o,
                    matches: f
                }), u = u.slice(e.length));
                if (!e) break
            }
            return i ? u.length : u ? r.error(n) : hi(n, h).slice(0)
        }, pt = r.compile = function (n, t) {
            var r, u = [],
                e = [],
                i = ci[n + " "];
            if (!i) {
                for (t || (t = ft(n)), r = t.length; r--;) i = fi(t[r]), i[f] ? u.push(i) : e.push(i);
                i = ci(n, yr(e, u));
                i.selector = n
            }
            return i
        }, oi = r.select = function (n, i, r, f) {
            var s, e, o, a, v, c = typeof n == "function" && n,
                h = !f && ft(n = c.selector || n);
            if (r = r || [], h.length === 1) {
                if (e = h[0] = h[0].slice(0), e.length > 2 && (o = e[0]).type === "ID" && u.getById && i.nodeType === 9 && l && t.relative[e[1].type]) {
                    if (i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0], i) c && (i = i.parentNode);
                    else return r;
                    n = n.slice(e.shift().value.length)
                }
                for (s = at.needsContext.test(n) ? 0 : e.length; s--;) {
                    if (o = e[s], t.relative[a = o.type]) break;
                    if ((v = t.find[a]) && (f = v(o.matches[0].replace(y, p), dt.test(e[0].type) && ti(i.parentNode) || i))) {
                        if (e.splice(s, 1), n = f.length && vt(e), !n) return b.apply(r, f), r;
                        break
                    }
                }
            }
            return (c || pt(n, h))(f, i, !l, r, dt.test(n) && ti(i.parentNode) || i), r
        }, u.sortStable = f.split("").sort(wt).join("") === f, u.detectDuplicates = !!rt, k(), u.sortDetached = v(function (n) {
            return n.compareDocumentPosition(o.createElement("div")) & 1
        }), v(function (n) {
            return n.innerHTML = "<a href='#'><\/a>", n.firstChild.getAttribute("href") === "#"
        }) || ni("type|href|height|width", function (n, t, i) {
            if (!i) return n.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
        }), u.attributes && v(function (n) {
            return n.innerHTML = "<input/>", n.firstChild.setAttribute("value", ""), n.firstChild.getAttribute("value") === ""
        }) || ni("value", function (n, t, i) {
            if (!i && n.nodeName.toLowerCase() === "input") return n.defaultValue
        }), v(function (n) {
            return n.getAttribute("disabled") == null
        }) || ni(bt, function (n, t, i) {
            var r;
            if (!i) return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
        }), r
    }(n);
    i.find = p;
    i.expr = p.selectors;
    i.expr[":"] = i.expr.pseudos;
    i.unique = p.uniqueSort;
    i.text = p.getText;
    i.isXMLDoc = p.isXML;
    i.contains = p.contains;
    var fr = i.expr.match.needsContext,
        er = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        re = /^.[^:#\[\.,]*$/;
    i.filter = function (n, t, r) {
        var u = t[0];
        return r && (n = ":not(" + n + ")"), t.length === 1 && u.nodeType === 1 ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function (n) {
            return n.nodeType === 1
        }))
    };
    i.fn.extend({
        find: function (n) {
            var t, r = [],
                u = this,
                f = u.length;
            if (typeof n != "string") return this.pushStack(i(n).filter(function () {
                for (t = 0; t < f; t++)
                    if (i.contains(u[t], this)) return !0
            }));
            for (t = 0; t < f; t++) i.find(n, u[t], r);
            return r = this.pushStack(f > 1 ? i.unique(r) : r), r.selector = this.selector ? this.selector + " " + n : n, r
        },
        filter: function (n) {
            return this.pushStack(ui(this, n || [], !1))
        },
        not: function (n) {
            return this.pushStack(ui(this, n || [], !0))
        },
        is: function (n) {
            return !!ui(this, typeof n == "string" && fr.test(n) ? i(n) : n || [], !1).length
        }
    });
    var ft, u = n.document,
        ue = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        fe = i.fn.init = function (n, t) {
            var r, f;
            if (!n) return this;
            if (typeof n == "string") {
                if (r = n.charAt(0) === "<" && n.charAt(n.length - 1) === ">" && n.length >= 3 ? [null, n, null] : ue.exec(n), r && (r[1] || !t)) {
                    if (r[1]) {
                        if (t = t instanceof i ? t[0] : t, i.merge(this, i.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : u, !0)), er.test(r[1]) && i.isPlainObject(t))
                            for (r in t) i.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    if (f = u.getElementById(r[2]), f && f.parentNode) {
                        if (f.id !== r[2]) return ft.find(n);
                        this.length = 1;
                        this[0] = f
                    }
                    return this.context = u, this.selector = n, this
                }
                return !t || t.jquery ? (t || ft).find(n) : this.constructor(t).find(n)
            }
            return n.nodeType ? (this.context = this[0] = n, this.length = 1, this) : i.isFunction(n) ? typeof ft.ready != "undefined" ? ft.ready(n) : n(i) : (n.selector !== undefined && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
        };
    fe.prototype = i.fn;
    ft = i(u);
    or = /^(?:parents|prev(?:Until|All))/;
    sr = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    i.extend({
        dir: function (n, t, r) {
            for (var f = [], u = n[t]; u && u.nodeType !== 9 && (r === undefined || u.nodeType !== 1 || !i(u).is(r));) u.nodeType === 1 && f.push(u), u = u[t];
            return f
        },
        sibling: function (n, t) {
            for (var i = []; n; n = n.nextSibling) n.nodeType === 1 && n !== t && i.push(n);
            return i
        }
    });
    i.fn.extend({
        has: function (n) {
            var t, r = i(n, this),
                u = r.length;
            return this.filter(function () {
                for (t = 0; t < u; t++)
                    if (i.contains(this, r[t])) return !0
            })
        },
        closest: function (n, t) {
            for (var r, f = 0, o = this.length, u = [], e = fr.test(n) || typeof n != "string" ? i(n, t || this.context) : 0; f < o; f++)
                for (r = this[f]; r && r !== t; r = r.parentNode)
                    if (r.nodeType < 11 && (e ? e.index(r) > -1 : r.nodeType === 1 && i.find.matchesSelector(r, n))) {
                        u.push(r);
                        break
                    }
            return this.pushStack(u.length > 1 ? i.unique(u) : u)
        },
        index: function (n) {
            return n ? typeof n == "string" ? i.inArray(this[0], i(n)) : i.inArray(n.jquery ? n[0] : n, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (n, t) {
            return this.pushStack(i.unique(i.merge(this.get(), i(n, t))))
        },
        addBack: function (n) {
            return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
        }
    });
    i.each({
        parent: function (n) {
            var t = n.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function (n) {
            return i.dir(n, "parentNode")
        },
        parentsUntil: function (n, t, r) {
            return i.dir(n, "parentNode", r)
        },
        next: function (n) {
            return hr(n, "nextSibling")
        },
        prev: function (n) {
            return hr(n, "previousSibling")
        },
        nextAll: function (n) {
            return i.dir(n, "nextSibling")
        },
        prevAll: function (n) {
            return i.dir(n, "previousSibling")
        },
        nextUntil: function (n, t, r) {
            return i.dir(n, "nextSibling", r)
        },
        prevUntil: function (n, t, r) {
            return i.dir(n, "previousSibling", r)
        },
        siblings: function (n) {
            return i.sibling((n.parentNode || {}).firstChild, n)
        },
        children: function (n) {
            return i.sibling(n.firstChild)
        },
        contents: function (n) {
            return i.nodeName(n, "iframe") ? n.contentDocument || n.contentWindow.document : i.merge([], n.childNodes)
        }
    }, function (n, t) {
        i.fn[n] = function (r, u) {
            var f = i.map(this, t, r);
            return n.slice(-5) !== "Until" && (u = r), u && typeof u == "string" && (f = i.filter(u, f)), this.length > 1 && (sr[n] || (f = i.unique(f)), or.test(n) && (f = f.reverse())), this.pushStack(f)
        }
    });
    h = /\S+/g;
    fi = {};
    i.Callbacks = function (n) {
        n = typeof n == "string" ? fi[n] || ee(n) : i.extend({}, n);
        var o, u, h, f, e, c, t = [],
            r = !n.once && [],
            l = function (i) {
                for (u = n.memory && i, h = !0, e = c || 0, c = 0, f = t.length, o = !0; t && e < f; e++)
                    if (t[e].apply(i[0], i[1]) === !1 && n.stopOnFalse) {
                        u = !1;
                        break
                    }
                o = !1;
                t && (r ? r.length && l(r.shift()) : u ? t = [] : s.disable())
            },
            s = {
                add: function () {
                    if (t) {
                        var r = t.length;
                        (function e(r) {
                            i.each(r, function (r, u) {
                                var f = i.type(u);
                                f === "function" ? n.unique && s.has(u) || t.push(u) : u && u.length && f !== "string" && e(u)
                            })
                        })(arguments);
                        o ? f = t.length : u && (c = r, l(u))
                    }
                    return this
                },
                remove: function () {
                    return t && i.each(arguments, function (n, r) {
                        for (var u;
                            (u = i.inArray(r, t, u)) > -1;) t.splice(u, 1), o && (u <= f && f--, u <= e && e--)
                    }), this
                },
                has: function (n) {
                    return n ? i.inArray(n, t) > -1 : !!(t && t.length)
                },
                empty: function () {
                    return t = [], f = 0, this
                },
                disable: function () {
                    return t = r = u = undefined, this
                },
                disabled: function () {
                    return !t
                },
                lock: function () {
                    return r = undefined, u || s.disable(), this
                },
                locked: function () {
                    return !r
                },
                fireWith: function (n, i) {
                    return t && (!h || r) && (i = i || [], i = [n, i.slice ? i.slice() : i], o ? r.push(i) : l(i)), this
                },
                fire: function () {
                    return s.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!h
                }
            };
        return s
    };
    i.extend({
        Deferred: function (n) {
            var u = [
                    ["resolve", "done", i.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", i.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", i.Callbacks("memory")]
                ],
                f = "pending",
                r = {
                    state: function () {
                        return f
                    },
                    always: function () {
                        return t.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var n = arguments;
                        return i.Deferred(function (f) {
                            i.each(u, function (u, e) {
                                var o = i.isFunction(n[u]) && n[u];
                                t[e[1]](function () {
                                    var n = o && o.apply(this, arguments);
                                    n && i.isFunction(n.promise) ? n.promise().done(f.resolve).fail(f.reject).progress(f.notify) : f[e[0] + "With"](this === r ? f.promise() : this, o ? [n] : arguments)
                                })
                            });
                            n = null
                        }).promise()
                    },
                    promise: function (n) {
                        return n != null ? i.extend(n, r) : r
                    }
                },
                t = {};
            return r.pipe = r.then, i.each(u, function (n, i) {
                var e = i[2],
                    o = i[3];
                r[i[1]] = e.add;
                o && e.add(function () {
                    f = o
                }, u[n ^ 1][2].disable, u[2][2].lock);
                t[i[0]] = function () {
                    return t[i[0] + "With"](this === t ? r : this, arguments), this
                };
                t[i[0] + "With"] = e.fireWith
            }), r.promise(t), n && n.call(t, t), t
        },
        when: function (n) {
            var t = 0,
                u = l.call(arguments),
                r = u.length,
                e = r !== 1 || n && i.isFunction(n.promise) ? r : 0,
                f = e === 1 ? n : i.Deferred(),
                h = function (n, t, i) {
                    return function (r) {
                        t[n] = this;
                        i[n] = arguments.length > 1 ? l.call(arguments) : r;
                        i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
                    }
                },
                o, c, s;
            if (r > 1)
                for (o = new Array(r), c = new Array(r), s = new Array(r); t < r; t++) u[t] && i.isFunction(u[t].promise) ? u[t].promise().done(h(t, s, u)).fail(f.reject).progress(h(t, c, o)) : --e;
            return e || f.resolveWith(s, u), f.promise()
        }
    });
    i.fn.ready = function (n) {
        return i.ready.promise().done(n), this
    };
    i.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (n) {
            n ? i.readyWait++ : i.ready(!0)
        },
        ready: function (n) {
            if (n === !0 ? !--i.readyWait : !i.isReady) {
                if (!u.body) return setTimeout(i.ready);
                (i.isReady = !0, n !== !0 && --i.readyWait > 0) || (lt.resolveWith(u, [i]), i.fn.triggerHandler && (i(u).triggerHandler("ready"), i(u).off("ready")))
            }
        }
    });
    i.ready.promise = function (t) {
        if (!lt)
            if (lt = i.Deferred(), u.readyState === "complete") setTimeout(i.ready);
            else if (u.addEventListener) u.addEventListener("DOMContentLoaded", a, !1), n.addEventListener("load", a, !1);
        else {
            u.attachEvent("onreadystatechange", a);
            n.attachEvent("onload", a);
            var r = !1;
            try {
                r = n.frameElement == null && u.documentElement
            } catch (e) {}
            r && r.doScroll && function f() {
                if (!i.isReady) {
                    try {
                        r.doScroll("left")
                    } catch (n) {
                        return setTimeout(f, 50)
                    }
                    cr();
                    i.ready()
                }
            }()
        }
        return lt.promise(t)
    };
    o = typeof undefined;
    for (lr in i(r)) break;
    r.ownLast = lr !== "0";
    r.inlineBlockNeedsLayout = !1;
    i(function () {
            var f, t, n, i;
            (n = u.getElementsByTagName("body")[0], n && n.style) && (t = u.createElement("div"), i = u.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== o && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", r.inlineBlockNeedsLayout = f = t.offsetWidth === 3, f && (n.style.zoom = 1)), n.removeChild(i))
        }),
        function () {
            var n = u.createElement("div");
            if (r.deleteExpando == null) {
                r.deleteExpando = !0;
                try {
                    delete n.test
                } catch (t) {
                    r.deleteExpando = !1
                }
            }
            n = null
        }();
    i.acceptData = function (n) {
        var t = i.noData[(n.nodeName + " ").toLowerCase()],
            r = +n.nodeType || 1;
        return r !== 1 && r !== 9 ? !1 : !t || t !== !0 && n.getAttribute("classid") === t
    };
    ar = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
    vr = /([A-Z])/g;
    i.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function (n) {
            return n = n.nodeType ? i.cache[n[i.expando]] : n[i.expando], !!n && !ei(n)
        },
        data: function (n, t, i) {
            return pr(n, t, i)
        },
        removeData: function (n, t) {
            return wr(n, t)
        },
        _data: function (n, t, i) {
            return pr(n, t, i, !0)
        },
        _removeData: function (n, t) {
            return wr(n, t, !0)
        }
    });
    i.fn.extend({
        data: function (n, t) {
            var f, u, e, r = this[0],
                o = r && r.attributes;
            if (n === undefined) {
                if (this.length && (e = i.data(r), r.nodeType === 1 && !i._data(r, "parsedAttrs"))) {
                    for (f = o.length; f--;) o[f] && (u = o[f].name, u.indexOf("data-") === 0 && (u = i.camelCase(u.slice(5)), yr(r, u, e[u])));
                    i._data(r, "parsedAttrs", !0)
                }
                return e
            }
            return typeof n == "object" ? this.each(function () {
                i.data(this, n)
            }) : arguments.length > 1 ? this.each(function () {
                i.data(this, n, t)
            }) : r ? yr(r, n, i.data(r, n)) : undefined
        },
        removeData: function (n) {
            return this.each(function () {
                i.removeData(this, n)
            })
        }
    });
    i.extend({
        queue: function (n, t, r) {
            var u;
            if (n) return t = (t || "fx") + "queue", u = i._data(n, t), r && (!u || i.isArray(r) ? u = i._data(n, t, i.makeArray(r)) : u.push(r)), u || []
        },
        dequeue: function (n, t) {
            t = t || "fx";
            var r = i.queue(n, t),
                e = r.length,
                u = r.shift(),
                f = i._queueHooks(n, t),
                o = function () {
                    i.dequeue(n, t)
                };
            u === "inprogress" && (u = r.shift(), e--);
            u && (t === "fx" && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
            !e && f && f.empty.fire()
        },
        _queueHooks: function (n, t) {
            var r = t + "queueHooks";
            return i._data(n, r) || i._data(n, r, {
                empty: i.Callbacks("once memory").add(function () {
                    i._removeData(n, t + "queue");
                    i._removeData(n, r)
                })
            })
        }
    });
    i.fn.extend({
        queue: function (n, t) {
            var r = 2;
            return (typeof n != "string" && (t = n, n = "fx", r--), arguments.length < r) ? i.queue(this[0], n) : t === undefined ? this : this.each(function () {
                var r = i.queue(this, n, t);
                i._queueHooks(this, n);
                n === "fx" && r[0] !== "inprogress" && i.dequeue(this, n)
            })
        },
        dequeue: function (n) {
            return this.each(function () {
                i.dequeue(this, n)
            })
        },
        clearQueue: function (n) {
            return this.queue(n || "fx", [])
        },
        promise: function (n, t) {
            var r, f = 1,
                e = i.Deferred(),
                u = this,
                o = this.length,
                s = function () {
                    --f || e.resolveWith(u, [u])
                };
            for (typeof n != "string" && (t = n, n = undefined), n = n || "fx"; o--;) r = i._data(u[o], n + "queueHooks"), r && r.empty && (f++, r.empty.add(s));
            return s(), e.promise(t)
        }
    });
    var at = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        w = ["Top", "Right", "Bottom", "Left"],
        et = function (n, t) {
            return n = t || n, i.css(n, "display") === "none" || !i.contains(n.ownerDocument, n)
        },
        b = i.access = function (n, t, r, u, f, e, o) {
            var s = 0,
                c = n.length,
                h = r == null;
            if (i.type(r) === "object") {
                f = !0;
                for (s in r) i.access(n, t, s, r[s], !0, e, o)
            } else if (u !== undefined && (f = !0, i.isFunction(u) || (o = !0), h && (o ? (t.call(n, u), t = null) : (h = t, t = function (n, t, r) {
                    return h.call(i(n), r)
                })), t))
                for (; s < c; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
            return f ? n : h ? t.call(n) : c ? t(n[0], r) : e
        },
        oi = /^(?:checkbox|radio)$/i;
    (function () {
        var t = u.createElement("input"),
            n = u.createElement("div"),
            i = u.createDocumentFragment();
        if (n.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>", r.leadingWhitespace = n.firstChild.nodeType === 3, r.tbody = !n.getElementsByTagName("tbody").length, r.htmlSerialize = !!n.getElementsByTagName("link").length, r.html5Clone = u.createElement("nav").cloneNode(!0).outerHTML !== "<:nav><\/:nav>", t.type = "checkbox", t.checked = !0, i.appendChild(t), r.appendChecked = t.checked, n.innerHTML = "<textarea>x<\/textarea>", r.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue, i.appendChild(n), n.innerHTML = "<input type='radio' checked='checked' name='t'/>", r.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, r.noCloneEvent = !0, n.attachEvent && (n.attachEvent("onclick", function () {
                r.noCloneEvent = !1
            }), n.cloneNode(!0).click()), r.deleteExpando == null) {
            r.deleteExpando = !0;
            try {
                delete n.test
            } catch (f) {
                r.deleteExpando = !1
            }
        }
    })(),
    function () {
        var t, i, f = u.createElement("div");
        for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) i = "on" + t, (r[t + "Bubbles"] = i in n) || (f.setAttribute(i, "t"), r[t + "Bubbles"] = f.attributes[i].expando === !1);
        f = null
    }();
    var si = /^(?:input|select|textarea)$/i,
        oe = /^key/,
        se = /^(?:mouse|pointer|contextmenu)|click/,
        br = /^(?:focusinfocus|focusoutblur)$/,
        kr = /^([^.]*)(?:\.(.+)|)$/;
    i.event = {
        global: {},
        add: function (n, t, r, u, f) {
            var w, y, b, p, s, c, l, a, e, k, d, v = i._data(n);
            if (v) {
                for (r.handler && (p = r, r = p.handler, f = p.selector), r.guid || (r.guid = i.guid++), (y = v.events) || (y = v.events = {}), (c = v.handle) || (c = v.handle = function (n) {
                        return typeof i !== o && (!n || i.event.triggered !== n.type) ? i.event.dispatch.apply(c.elem, arguments) : undefined
                    }, c.elem = n), t = (t || "").match(h) || [""], b = t.length; b--;)(w = kr.exec(t[b]) || [], e = d = w[1], k = (w[2] || "").split(".").sort(), e) && (s = i.event.special[e] || {}, e = (f ? s.delegateType : s.bindType) || e, s = i.event.special[e] || {}, l = i.extend({
                    type: e,
                    origType: d,
                    data: u,
                    handler: r,
                    guid: r.guid,
                    selector: f,
                    needsContext: f && i.expr.match.needsContext.test(f),
                    namespace: k.join(".")
                }, p), (a = y[e]) || (a = y[e] = [], a.delegateCount = 0, s.setup && s.setup.call(n, u, k, c) !== !1 || (n.addEventListener ? n.addEventListener(e, c, !1) : n.attachEvent && n.attachEvent("on" + e, c))), s.add && (s.add.call(n, l), l.handler.guid || (l.handler.guid = r.guid)), f ? a.splice(a.delegateCount++, 0, l) : a.push(l), i.event.global[e] = !0);
                n = null
            }
        },
        remove: function (n, t, r, u, f) {
            var y, o, s, b, p, a, c, l, e, w, k, v = i.hasData(n) && i._data(n);
            if (v && (a = v.events)) {
                for (t = (t || "").match(h) || [""], p = t.length; p--;) {
                    if (s = kr.exec(t[p]) || [], e = k = s[1], w = (s[2] || "").split(".").sort(), !e) {
                        for (e in a) i.event.remove(n, e + t[p], r, u, !0);
                        continue
                    }
                    for (c = i.event.special[e] || {}, e = (u ? c.delegateType : c.bindType) || e, l = a[e] || [], s = s[2] && new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)"), b = y = l.length; y--;) o = l[y], (f || k === o.origType) && (!r || r.guid === o.guid) && (!s || s.test(o.namespace)) && (!u || u === o.selector || u === "**" && o.selector) && (l.splice(y, 1), o.selector && l.delegateCount--, c.remove && c.remove.call(n, o));
                    b && !l.length && (c.teardown && c.teardown.call(n, w, v.handle) !== !1 || i.removeEvent(n, e, v.handle), delete a[e])
                }
                i.isEmptyObject(a) && (delete v.handle, i._removeData(n, "events"))
            }
        },
        trigger: function (t, r, f, e) {
            var l, a, o, p, c, h, w, y = [f || u],
                s = tt.call(t, "type") ? t.type : t,
                v = tt.call(t, "namespace") ? t.namespace.split(".") : [];
            if ((o = h = f = f || u, f.nodeType !== 3 && f.nodeType !== 8) && !br.test(s + i.event.triggered) && (s.indexOf(".") >= 0 && (v = s.split("."), s = v.shift(), v.sort()), a = s.indexOf(":") < 0 && "on" + s, t = t[i.expando] ? t : new i.Event(s, typeof t == "object" && t), t.isTrigger = e ? 2 : 3, t.namespace = v.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = f), r = r == null ? [t] : i.makeArray(r, [t]), c = i.event.special[s] || {}, e || !c.trigger || c.trigger.apply(f, r) !== !1)) {
                if (!e && !c.noBubble && !i.isWindow(f)) {
                    for (p = c.delegateType || s, br.test(p + s) || (o = o.parentNode); o; o = o.parentNode) y.push(o), h = o;
                    h === (f.ownerDocument || u) && y.push(h.defaultView || h.parentWindow || n)
                }
                for (w = 0;
                    (o = y[w++]) && !t.isPropagationStopped();) t.type = w > 1 ? p : c.bindType || s, l = (i._data(o, "events") || {})[t.type] && i._data(o, "handle"), l && l.apply(o, r), l = a && o[a], l && l.apply && i.acceptData(o) && (t.result = l.apply(o, r), t.result === !1 && t.preventDefault());
                if (t.type = s, !e && !t.isDefaultPrevented() && (!c._default || c._default.apply(y.pop(), r) === !1) && i.acceptData(f) && a && f[s] && !i.isWindow(f)) {
                    h = f[a];
                    h && (f[a] = null);
                    i.event.triggered = s;
                    try {
                        f[s]()
                    } catch (b) {}
                    i.event.triggered = undefined;
                    h && (f[a] = h)
                }
                return t.result
            }
        },
        dispatch: function (n) {
            n = i.event.fix(n);
            var e, f, t, r, o, s = [],
                h = l.call(arguments),
                c = (i._data(this, "events") || {})[n.type] || [],
                u = i.event.special[n.type] || {};
            if (h[0] = n, n.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, n) !== !1) {
                for (s = i.event.handlers.call(this, n, c), e = 0;
                    (r = s[e++]) && !n.isPropagationStopped();)
                    for (n.currentTarget = r.elem, o = 0;
                        (t = r.handlers[o++]) && !n.isImmediatePropagationStopped();)(!n.namespace_re || n.namespace_re.test(t.namespace)) && (n.handleObj = t, n.data = t.data, f = ((i.event.special[t.origType] || {}).handle || t.handler).apply(r.elem, h), f !== undefined && (n.result = f) === !1 && (n.preventDefault(), n.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, n), n.result
            }
        },
        handlers: function (n, t) {
            var f, e, u, o, h = [],
                s = t.delegateCount,
                r = n.target;
            if (s && r.nodeType && (!n.button || n.type !== "click"))
                for (; r != this; r = r.parentNode || this)
                    if (r.nodeType === 1 && (r.disabled !== !0 || n.type !== "click")) {
                        for (u = [], o = 0; o < s; o++) e = t[o], f = e.selector + " ", u[f] === undefined && (u[f] = e.needsContext ? i(f, this).index(r) >= 0 : i.find(f, this, null, [r]).length), u[f] && u.push(e);
                        u.length && h.push({
                            elem: r,
                            handlers: u
                        })
                    }
            return s < t.length && h.push({
                elem: this,
                handlers: t.slice(s)
            }), h
        },
        fix: function (n) {
            if (n[i.expando]) return n;
            var e, o, s, r = n.type,
                f = n,
                t = this.fixHooks[r];
            for (t || (this.fixHooks[r] = t = se.test(r) ? this.mouseHooks : oe.test(r) ? this.keyHooks : {}), s = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(f), e = s.length; e--;) o = s[e], n[o] = f[o];
            return n.target || (n.target = f.srcElement || u), n.target.nodeType === 3 && (n.target = n.target.parentNode), n.metaKey = !!n.metaKey, t.filter ? t.filter(n, f) : n
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (n, t) {
                return n.which == null && (n.which = t.charCode != null ? t.charCode : t.keyCode), n
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (n, t) {
                var i, e, r, f = t.button,
                    o = t.fromElement;
                return n.pageX == null && t.clientX != null && (e = n.target.ownerDocument || u, r = e.documentElement, i = e.body, n.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), n.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !n.relatedTarget && o && (n.relatedTarget = o === n.target ? t.toElement : o), n.which || f === undefined || (n.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0), n
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== dr() && this.focus) try {
                        return this.focus(), !1
                    } catch (n) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === dr() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    if (i.nodeName(this, "input") && this.type === "checkbox" && this.click) return this.click(), !1
                },
                _default: function (n) {
                    return i.nodeName(n.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (n) {
                    n.result !== undefined && n.originalEvent && (n.originalEvent.returnValue = n.result)
                }
            }
        },
        simulate: function (n, t, r, u) {
            var f = i.extend(new i.Event, r, {
                type: n,
                isSimulated: !0,
                originalEvent: {}
            });
            u ? i.event.trigger(f, null, t) : i.event.dispatch.call(t, f);
            f.isDefaultPrevented() && r.preventDefault()
        }
    };
    i.removeEvent = u.removeEventListener ? function (n, t, i) {
        n.removeEventListener && n.removeEventListener(t, i, !1)
    } : function (n, t, i) {
        var r = "on" + t;
        n.detachEvent && (typeof n[r] === o && (n[r] = null), n.detachEvent(r, i))
    };
    i.Event = function (n, t) {
        if (!(this instanceof i.Event)) return new i.Event(n, t);
        n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || n.defaultPrevented === undefined && n.returnValue === !1 ? vt : it) : this.type = n;
        t && i.extend(this, t);
        this.timeStamp = n && n.timeStamp || i.now();
        this[i.expando] = !0
    };
    i.Event.prototype = {
        isDefaultPrevented: it,
        isPropagationStopped: it,
        isImmediatePropagationStopped: it,
        preventDefault: function () {
            var n = this.originalEvent;
            (this.isDefaultPrevented = vt, n) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
        },
        stopPropagation: function () {
            var n = this.originalEvent;
            (this.isPropagationStopped = vt, n) && (n.stopPropagation && n.stopPropagation(), n.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var n = this.originalEvent;
            this.isImmediatePropagationStopped = vt;
            n && n.stopImmediatePropagation && n.stopImmediatePropagation();
            this.stopPropagation()
        }
    };
    i.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (n, t) {
        i.event.special[n] = {
            delegateType: t,
            bindType: t,
            handle: function (n) {
                var u, f = this,
                    r = n.relatedTarget,
                    e = n.handleObj;
                return r && (r === f || i.contains(f, r)) || (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t), u
            }
        }
    });
    r.submitBubbles || (i.event.special.submit = {
        setup: function () {
            if (i.nodeName(this, "form")) return !1;
            i.event.add(this, "click._submit keypress._submit", function (n) {
                var r = n.target,
                    t = i.nodeName(r, "input") || i.nodeName(r, "button") ? r.form : undefined;
                t && !i._data(t, "submitBubbles") && (i.event.add(t, "submit._submit", function (n) {
                    n._submit_bubble = !0
                }), i._data(t, "submitBubbles", !0))
            })
        },
        postDispatch: function (n) {
            n._submit_bubble && (delete n._submit_bubble, this.parentNode && !n.isTrigger && i.event.simulate("submit", this.parentNode, n, !0))
        },
        teardown: function () {
            if (i.nodeName(this, "form")) return !1;
            i.event.remove(this, "._submit")
        }
    });
    r.changeBubbles || (i.event.special.change = {
        setup: function () {
            if (si.test(this.nodeName)) return (this.type === "checkbox" || this.type === "radio") && (i.event.add(this, "propertychange._change", function (n) {
                n.originalEvent.propertyName === "checked" && (this._just_changed = !0)
            }), i.event.add(this, "click._change", function (n) {
                this._just_changed && !n.isTrigger && (this._just_changed = !1);
                i.event.simulate("change", this, n, !0)
            })), !1;
            i.event.add(this, "beforeactivate._change", function (n) {
                var t = n.target;
                si.test(t.nodeName) && !i._data(t, "changeBubbles") && (i.event.add(t, "change._change", function (n) {
                    !this.parentNode || n.isSimulated || n.isTrigger || i.event.simulate("change", this.parentNode, n, !0)
                }), i._data(t, "changeBubbles", !0))
            })
        },
        handle: function (n) {
            var t = n.target;
            if (this !== t || n.isSimulated || n.isTrigger || t.type !== "radio" && t.type !== "checkbox") return n.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            return i.event.remove(this, "._change"), !si.test(this.nodeName)
        }
    });
    r.focusinBubbles || i.each({
        focus: "focusin",
        blur: "focusout"
    }, function (n, t) {
        var r = function (n) {
            i.event.simulate(t, n.target, i.event.fix(n), !0)
        };
        i.event.special[t] = {
            setup: function () {
                var u = this.ownerDocument || this,
                    f = i._data(u, t);
                f || u.addEventListener(n, r, !0);
                i._data(u, t, (f || 0) + 1)
            },
            teardown: function () {
                var u = this.ownerDocument || this,
                    f = i._data(u, t) - 1;
                f ? i._data(u, t, f) : (u.removeEventListener(n, r, !0), i._removeData(u, t))
            }
        }
    });
    i.fn.extend({
        on: function (n, t, r, u, f) {
            var o, e;
            if (typeof n == "object") {
                typeof t != "string" && (r = r || t, t = undefined);
                for (o in n) this.on(o, t, r, n[o], f);
                return this
            }
            if (r == null && u == null ? (u = t, r = t = undefined) : u == null && (typeof t == "string" ? (u = r, r = undefined) : (u = r, r = t, t = undefined)), u === !1) u = it;
            else if (!u) return this;
            return f === 1 && (e = u, u = function (n) {
                return i().off(n), e.apply(this, arguments)
            }, u.guid = e.guid || (e.guid = i.guid++)), this.each(function () {
                i.event.add(this, n, u, r, t)
            })
        },
        one: function (n, t, i, r) {
            return this.on(n, t, i, r, 1)
        },
        off: function (n, t, r) {
            var u, f;
            if (n && n.preventDefault && n.handleObj) return u = n.handleObj, i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
            if (typeof n == "object") {
                for (f in n) this.off(f, t, n[f]);
                return this
            }
            return (t === !1 || typeof t == "function") && (r = t, t = undefined), r === !1 && (r = it), this.each(function () {
                i.event.remove(this, n, r, t)
            })
        },
        trigger: function (n, t) {
            return this.each(function () {
                i.event.trigger(n, t, this)
            })
        },
        triggerHandler: function (n, t) {
            var r = this[0];
            if (r) return i.event.trigger(n, t, r, !0)
        }
    });
    var nu = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        he = / jQuery\d+="(?:null|\d+)"/g,
        tu = new RegExp("<(?:" + nu + ")[\\s/>]", "i"),
        hi = /^\s+/,
        iu = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ru = /<([\w:]+)/,
        uu = /<tbody/i,
        ce = /<|&#?\w+;/,
        le = /<(?:script|style|link)/i,
        ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fu = /^$|\/(?:java|ecma)script/i,
        ve = /^true\/(.*)/,
        ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        s = {
            option: [1, "<select multiple='multiple'>", "<\/select>"],
            legend: [1, "<fieldset>", "<\/fieldset>"],
            area: [1, "<map>", "<\/map>"],
            param: [1, "<object>", "<\/object>"],
            thead: [1, "<table>", "<\/table>"],
            tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
            col: [2, "<table><tbody><\/tbody><colgroup>", "<\/colgroup><\/table>"],
            td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
            _default: r.htmlSerialize ? [0, "", ""] : [1, "X<div>", "<\/div>"]
        },
        pe = gr(u),
        ci = pe.appendChild(u.createElement("div"));
    s.optgroup = s.option;
    s.tbody = s.tfoot = s.colgroup = s.caption = s.thead;
    s.th = s.td;
    i.extend({
        clone: function (n, t, u) {
            var e, c, s, o, h, l = i.contains(n.ownerDocument, n);
            if (r.html5Clone || i.isXMLDoc(n) || !tu.test("<" + n.nodeName + ">") ? s = n.cloneNode(!0) : (ci.innerHTML = n.outerHTML, ci.removeChild(s = ci.firstChild)), (!r.noCloneEvent || !r.noCloneChecked) && (n.nodeType === 1 || n.nodeType === 11) && !i.isXMLDoc(n))
                for (e = f(s), h = f(n), o = 0;
                    (c = h[o]) != null; ++o) e[o] && be(c, e[o]);
            if (t)
                if (u)
                    for (h = h || f(n), e = e || f(s), o = 0;
                        (c = h[o]) != null; o++) hu(c, e[o]);
                else hu(n, s);
            return e = f(s, "script"), e.length > 0 && li(e, !l && f(n, "script")), e = h = c = null, s
        },
        buildFragment: function (n, t, u, e) {
            for (var c, o, b, h, p, w, a, k = n.length, v = gr(t), l = [], y = 0; y < k; y++)
                if (o = n[y], o || o === 0)
                    if (i.type(o) === "object") i.merge(l, o.nodeType ? [o] : o);
                    else if (ce.test(o)) {
                for (h = h || v.appendChild(t.createElement("div")), p = (ru.exec(o) || ["", ""])[1].toLowerCase(), a = s[p] || s._default, h.innerHTML = a[1] + o.replace(iu, "<$1><\/$2>") + a[2], c = a[0]; c--;) h = h.lastChild;
                if (!r.leadingWhitespace && hi.test(o) && l.push(t.createTextNode(hi.exec(o)[0])), !r.tbody)
                    for (o = p === "table" && !uu.test(o) ? h.firstChild : a[1] === "<table>" && !uu.test(o) ? h : 0, c = o && o.childNodes.length; c--;) i.nodeName(w = o.childNodes[c], "tbody") && !w.childNodes.length && o.removeChild(w);
                for (i.merge(l, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                h = v.lastChild
            } else l.push(t.createTextNode(o));
            for (h && v.removeChild(h), r.appendChecked || i.grep(f(l, "input"), we), y = 0; o = l[y++];)
                if ((!e || i.inArray(o, e) === -1) && (b = i.contains(o.ownerDocument, o), h = f(v.appendChild(o), "script"), b && li(h), u))
                    for (c = 0; o = h[c++];) fu.test(o.type || "") && u.push(o);
            return h = null, v
        },
        cleanData: function (n, t) {
            for (var u, s, f, e, a = 0, h = i.expando, l = i.cache, v = r.deleteExpando, y = i.event.special;
                (u = n[a]) != null; a++)
                if ((t || i.acceptData(u)) && (f = u[h], e = f && l[f], e)) {
                    if (e.events)
                        for (s in e.events) y[s] ? i.event.remove(u, s) : i.removeEvent(u, s, e.handle);
                    l[f] && (delete l[f], v ? delete u[h] : typeof u.removeAttribute !== o ? u.removeAttribute(h) : u[h] = null, c.push(f))
                }
        }
    });
    i.fn.extend({
        text: function (n) {
            return b(this, function (n) {
                return n === undefined ? i.text(this) : this.empty().append((this[0] && this[0].ownerDocument || u).createTextNode(n))
            }, null, n, arguments.length)
        },
        append: function () {
            return this.domManip(arguments, function (n) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = eu(this, n);
                    t.appendChild(n)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, function (n) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = eu(this, n);
                    t.insertBefore(n, t.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, function (n) {
                this.parentNode && this.parentNode.insertBefore(n, this)
            })
        },
        after: function () {
            return this.domManip(arguments, function (n) {
                this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
            })
        },
        remove: function (n, t) {
            for (var r, e = n ? i.filter(n, this) : this, u = 0;
                (r = e[u]) != null; u++) t || r.nodeType !== 1 || i.cleanData(f(r)), r.parentNode && (t && i.contains(r.ownerDocument, r) && li(f(r, "script")), r.parentNode.removeChild(r));
            return this
        },
        empty: function () {
            for (var n, t = 0;
                (n = this[t]) != null; t++) {
                for (n.nodeType === 1 && i.cleanData(f(n, !1)); n.firstChild;) n.removeChild(n.firstChild);
                n.options && i.nodeName(n, "select") && (n.options.length = 0)
            }
            return this
        },
        clone: function (n, t) {
            return n = n == null ? !1 : n, t = t == null ? n : t, this.map(function () {
                return i.clone(this, n, t)
            })
        },
        html: function (n) {
            return b(this, function (n) {
                var t = this[0] || {},
                    u = 0,
                    e = this.length;
                if (n === undefined) return t.nodeType === 1 ? t.innerHTML.replace(he, "") : undefined;
                if (typeof n == "string" && !le.test(n) && (r.htmlSerialize || !tu.test(n)) && (r.leadingWhitespace || !hi.test(n)) && !s[(ru.exec(n) || ["", ""])[1].toLowerCase()]) {
                    n = n.replace(iu, "<$1><\/$2>");
                    try {
                        for (; u < e; u++) t = this[u] || {}, t.nodeType === 1 && (i.cleanData(f(t, !1)), t.innerHTML = n);
                        t = 0
                    } catch (o) {}
                }
                t && this.empty().append(n)
            }, null, n, arguments.length)
        },
        replaceWith: function () {
            var n = arguments[0];
            return this.domManip(arguments, function (t) {
                n = this.parentNode;
                i.cleanData(f(this));
                n && n.replaceChild(t, this)
            }), n && (n.length || n.nodeType) ? this : this.remove()
        },
        detach: function (n) {
            return this.remove(n, !0)
        },
        domManip: function (n, t) {
            n = ir.apply([], n);
            var h, u, c, o, v, s, e = 0,
                l = this.length,
                p = this,
                w = l - 1,
                a = n[0],
                y = i.isFunction(a);
            if (y || l > 1 && typeof a == "string" && !r.checkClone && ae.test(a)) return this.each(function (i) {
                var r = p.eq(i);
                y && (n[0] = a.call(this, i, r.html()));
                r.domManip(n, t)
            });
            if (l && (s = i.buildFragment(n, this[0].ownerDocument, !1, this), h = s.firstChild, s.childNodes.length === 1 && (s = h), h)) {
                for (o = i.map(f(s, "script"), ou), c = o.length; e < l; e++) u = s, e !== w && (u = i.clone(u, !0, !0), c && i.merge(o, f(u, "script"))), t.call(this[e], u, e);
                if (c)
                    for (v = o[o.length - 1].ownerDocument, i.map(o, su), e = 0; e < c; e++) u = o[e], fu.test(u.type || "") && !i._data(u, "globalEval") && i.contains(v, u) && (u.src ? i._evalUrl && i._evalUrl(u.src) : i.globalEval((u.text || u.textContent || u.innerHTML || "").replace(ye, "")));
                s = h = null
            }
            return this
        }
    });
    i.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (n, t) {
        i.fn[n] = function (n) {
            for (var u, r = 0, f = [], e = i(n), o = e.length - 1; r <= o; r++) u = r === o ? this : this.clone(!0), i(e[r])[t](u), ii.apply(f, u.get());
            return this.pushStack(f)
        }
    });
    ai = {},
        function () {
            var n;
            r.shrinkWrapBlocks = function () {
                if (n != null) return n;
                n = !1;
                var t, i, r;
                if (i = u.getElementsByTagName("body")[0], i && i.style) return t = u.createElement("div"), r = u.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(r).appendChild(t), typeof t.style.zoom !== o && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(u.createElement("div")).style.width = "5px", n = t.offsetWidth !== 3), i.removeChild(r), n
            }
        }();
    var lu = /^margin/,
        pt = new RegExp("^(" + at + ")(?!px)[a-z%]+$", "i"),
        k, d, ke = /^(top|right|bottom|left)$/;
    n.getComputedStyle ? (k = function (t) {
            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : n.getComputedStyle(t, null)
        }, d = function (n, t, r) {
            var e, o, s, u, f = n.style;
            return r = r || k(n), u = r ? r.getPropertyValue(t) || r[t] : undefined, r && (u !== "" || i.contains(n.ownerDocument, n) || (u = i.style(n, t)), pt.test(u) && lu.test(t) && (e = f.width, o = f.minWidth, s = f.maxWidth, f.minWidth = f.maxWidth = f.width = u, u = r.width, f.width = e, f.minWidth = o, f.maxWidth = s)), u === undefined ? u : u + ""
        }) : u.documentElement.currentStyle && (k = function (n) {
            return n.currentStyle
        }, d = function (n, t, i) {
            var o, f, e, r, u = n.style;
            return i = i || k(n), r = i ? i[t] : undefined, r == null && u && u[t] && (r = u[t]), pt.test(r) && !ke.test(t) && (o = u.left, f = n.runtimeStyle, e = f && f.left, e && (f.left = n.currentStyle.left), u.left = t === "fontSize" ? "1em" : r, r = u.pixelLeft + "px", u.left = o, e && (f.left = e)), r === undefined ? r : r + "" || "auto"
        }),
        function () {
            function c() {
                var i, r, f, t;
                (r = u.getElementsByTagName("body")[0], r && r.style) && (i = u.createElement("div"), f = u.createElement("div"), f.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", r.appendChild(f).appendChild(i), i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = s = !1, h = !0, n.getComputedStyle && (o = (n.getComputedStyle(i, null) || {}).top !== "1%", s = (n.getComputedStyle(i, null) || {
                    width: "4px"
                }).width === "4px", t = i.appendChild(u.createElement("div")), t.style.cssText = i.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", i.style.width = "1px", h = !parseFloat((n.getComputedStyle(t, null) || {}).marginRight), i.removeChild(t)), i.innerHTML = "<table><tr><td><\/td><td>t<\/td><\/tr><\/table>", t = i.getElementsByTagName("td"), t[0].style.cssText = "margin:0;border:0;padding:0;display:none", e = t[0].offsetHeight === 0, e && (t[0].style.display = "", t[1].style.display = "none", e = t[0].offsetHeight === 0), r.removeChild(f))
            }
            var f, t, l, o, s, e, h;
            (f = u.createElement("div"), f.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>", l = f.getElementsByTagName("a")[0], t = l && l.style, t) && (t.cssText = "float:left;opacity:.5", r.opacity = t.opacity === "0.5", r.cssFloat = !!t.cssFloat, f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", r.clearCloneStyle = f.style.backgroundClip === "content-box", r.boxSizing = t.boxSizing === "" || t.MozBoxSizing === "" || t.WebkitBoxSizing === "", i.extend(r, {
                reliableHiddenOffsets: function () {
                    return e == null && c(), e
                },
                boxSizingReliable: function () {
                    return s == null && c(), s
                },
                pixelPosition: function () {
                    return o == null && c(), o
                },
                reliableMarginRight: function () {
                    return h == null && c(), h
                }
            }))
        }();
    i.swap = function (n, t, i, r) {
        var f, u, e = {};
        for (u in t) e[u] = n.style[u], n.style[u] = t[u];
        f = i.apply(n, r || []);
        for (u in t) n.style[u] = e[u];
        return f
    };
    var vi = /alpha\([^)]*\)/i,
        de = /opacity\s*=\s*([^)]*)/,
        ge = /^(none|table(?!-c[ea]).+)/,
        no = new RegExp("^(" + at + ")(.*)$", "i"),
        to = new RegExp("^([+-])=(" + at + ")", "i"),
        io = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        vu = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        yu = ["Webkit", "O", "Moz", "ms"];
    i.extend({
        cssHooks: {
            opacity: {
                get: function (n, t) {
                    if (t) {
                        var i = d(n, "opacity");
                        return i === "" ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: r.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (n, t, u, f) {
            if (n && n.nodeType !== 3 && n.nodeType !== 8 && n.style) {
                var o, h, e, s = i.camelCase(t),
                    c = n.style;
                if (t = i.cssProps[s] || (i.cssProps[s] = pu(c, s)), e = i.cssHooks[t] || i.cssHooks[s], u !== undefined) {
                    if (h = typeof u, h === "string" && (o = to.exec(u)) && (u = (o[1] + 1) * o[2] + parseFloat(i.css(n, t)), h = "number"), u == null || u !== u) return;
                    if (h !== "number" || i.cssNumber[s] || (u += "px"), r.clearCloneStyle || u !== "" || t.indexOf("background") !== 0 || (c[t] = "inherit"), !e || !("set" in e) || (u = e.set(n, u, f)) !== undefined) try {
                        c[t] = u
                    } catch (l) {}
                } else return e && "get" in e && (o = e.get(n, !1, f)) !== undefined ? o : c[t]
            }
        },
        css: function (n, t, r, u) {
            var s, f, e, o = i.camelCase(t);
            return (t = i.cssProps[o] || (i.cssProps[o] = pu(n.style, o)), e = i.cssHooks[t] || i.cssHooks[o], e && "get" in e && (f = e.get(n, !0, r)), f === undefined && (f = d(n, t, u)), f === "normal" && t in vu && (f = vu[t]), r === "" || r) ? (s = parseFloat(f), r === !0 || i.isNumeric(s) ? s || 0 : f) : f
        }
    });
    i.each(["height", "width"], function (n, t) {
        i.cssHooks[t] = {
            get: function (n, r, u) {
                if (r) return ge.test(i.css(n, "display")) && n.offsetWidth === 0 ? i.swap(n, io, function () {
                    return du(n, t, u)
                }) : du(n, t, u)
            },
            set: function (n, u, f) {
                var e = f && k(n);
                return bu(n, u, f ? ku(n, t, f, r.boxSizing && i.css(n, "boxSizing", !1, e) === "border-box", e) : 0)
            }
        }
    });
    r.opacity || (i.cssHooks.opacity = {
        get: function (n, t) {
            return de.test((t && n.currentStyle ? n.currentStyle.filter : n.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function (n, t) {
            var r = n.style,
                u = n.currentStyle,
                e = i.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                f = u && u.filter || r.filter || "";
            (r.zoom = 1, (t >= 1 || t === "") && i.trim(f.replace(vi, "")) === "" && r.removeAttribute && (r.removeAttribute("filter"), t === "" || u && !u.filter)) || (r.filter = vi.test(f) ? f.replace(vi, e) : f + " " + e)
        }
    });
    i.cssHooks.marginRight = au(r.reliableMarginRight, function (n, t) {
        if (t) return i.swap(n, {
            display: "inline-block"
        }, d, [n, "marginRight"])
    });
    i.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (n, t) {
        i.cssHooks[n + t] = {
            expand: function (i) {
                for (var r = 0, f = {}, u = typeof i == "string" ? i.split(" ") : [i]; r < 4; r++) f[n + w[r] + t] = u[r] || u[r - 2] || u[0];
                return f
            }
        };
        lu.test(n) || (i.cssHooks[n + t].set = bu)
    });
    i.fn.extend({
        css: function (n, t) {
            return b(this, function (n, t, r) {
                var f, e, o = {},
                    u = 0;
                if (i.isArray(t)) {
                    for (f = k(n), e = t.length; u < e; u++) o[t[u]] = i.css(n, t[u], !1, f);
                    return o
                }
                return r !== undefined ? i.style(n, t, r) : i.css(n, t)
            }, n, t, arguments.length > 1)
        },
        show: function () {
            return wu(this, !0)
        },
        hide: function () {
            return wu(this)
        },
        toggle: function (n) {
            return typeof n == "boolean" ? n ? this.show() : this.hide() : this.each(function () {
                et(this) ? i(this).show() : i(this).hide()
            })
        }
    });
    i.Tween = e;
    e.prototype = {
        constructor: e,
        init: function (n, t, r, u, f, e) {
            this.elem = n;
            this.prop = r;
            this.easing = f || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = u;
            this.unit = e || (i.cssNumber[r] ? "" : "px")
        },
        cur: function () {
            var n = e.propHooks[this.prop];
            return n && n.get ? n.get(this) : e.propHooks._default.get(this)
        },
        run: function (n) {
            var t, r = e.propHooks[this.prop];
            return this.pos = this.options.duration ? t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : e.propHooks._default.set(this), this
        }
    };
    e.prototype.init.prototype = e.prototype;
    e.propHooks = {
        _default: {
            get: function (n) {
                var t;
                return n.elem[n.prop] != null && (!n.elem.style || n.elem.style[n.prop] == null) ? n.elem[n.prop] : (t = i.css(n.elem, n.prop, ""), !t || t === "auto" ? 0 : t)
            },
            set: function (n) {
                i.fx.step[n.prop] ? i.fx.step[n.prop](n) : n.elem.style && (n.elem.style[i.cssProps[n.prop]] != null || i.cssHooks[n.prop]) ? i.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
            }
        }
    };
    e.propHooks.scrollTop = e.propHooks.scrollLeft = {
        set: function (n) {
            n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
        }
    };
    i.easing = {
        linear: function (n) {
            return n
        },
        swing: function (n) {
            return .5 - Math.cos(n * Math.PI) / 2
        }
    };
    i.fx = e.prototype.init;
    i.fx.step = {};
    var rt, wt, ro = /^(?:toggle|show|hide)$/,
        gu = new RegExp("^(?:([+-])=|)(" + at + ")([a-z%]*)$", "i"),
        uo = /queueHooks$/,
        bt = [fo],
        st = {
            "*": [function (n, t) {
                var f = this.createTween(n, t),
                    s = f.cur(),
                    u = gu.exec(t),
                    e = u && u[3] || (i.cssNumber[n] ? "" : "px"),
                    r = (i.cssNumber[n] || e !== "px" && +s) && gu.exec(i.css(f.elem, n)),
                    o = 1,
                    h = 20;
                if (r && r[3] !== e) {
                    e = e || r[3];
                    u = u || [];
                    r = +s || 1;
                    do o = o || ".5", r = r / o, i.style(f.elem, n, r + e); while (o !== (o = f.cur() / s) && o !== 1 && --h)
                }
                return u && (r = f.start = +r || +s || 0, f.unit = e, f.end = u[1] ? r + (u[1] + 1) * u[2] : +u[2]), f
            }]
        };
    i.Animation = i.extend(rf, {
        tweener: function (n, t) {
            i.isFunction(n) ? (t = n, n = ["*"]) : n = n.split(" ");
            for (var r, u = 0, f = n.length; u < f; u++) r = n[u], st[r] = st[r] || [], st[r].unshift(t)
        },
        prefilter: function (n, t) {
            t ? bt.unshift(n) : bt.push(n)
        }
    });
    i.speed = function (n, t, r) {
        var u = n && typeof n == "object" ? i.extend({}, n) : {
            complete: r || !r && t || i.isFunction(n) && n,
            duration: n,
            easing: r && t || t && !i.isFunction(t) && t
        };
        return u.duration = i.fx.off ? 0 : typeof u.duration == "number" ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default, (u.queue == null || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function () {
            i.isFunction(u.old) && u.old.call(this);
            u.queue && i.dequeue(this, u.queue)
        }, u
    };
    i.fn.extend({
        fadeTo: function (n, t, i, r) {
            return this.filter(et).css("opacity", 0).show().end().animate({
                opacity: t
            }, n, i, r)
        },
        animate: function (n, t, r, u) {
            var o = i.isEmptyObject(n),
                e = i.speed(t, r, u),
                f = function () {
                    var t = rf(this, i.extend({}, n), e);
                    (o || i._data(this, "finish")) && t.stop(!0)
                };
            return f.finish = f, o || e.queue === !1 ? this.each(f) : this.queue(e.queue, f)
        },
        stop: function (n, t, r) {
            var u = function (n) {
                var t = n.stop;
                delete n.stop;
                t(r)
            };
            return typeof n != "string" && (r = t, t = n, n = undefined), t && n !== !1 && this.queue(n || "fx", []), this.each(function () {
                var o = !0,
                    t = n != null && n + "queueHooks",
                    e = i.timers,
                    f = i._data(this);
                if (t) f[t] && f[t].stop && u(f[t]);
                else
                    for (t in f) f[t] && f[t].stop && uo.test(t) && u(f[t]);
                for (t = e.length; t--;) e[t].elem === this && (n == null || e[t].queue === n) && (e[t].anim.stop(r), o = !1, e.splice(t, 1));
                (o || !r) && i.dequeue(this, n)
            })
        },
        finish: function (n) {
            return n !== !1 && (n = n || "fx"), this.each(function () {
                var t, f = i._data(this),
                    r = f[n + "queue"],
                    e = f[n + "queueHooks"],
                    u = i.timers,
                    o = r ? r.length : 0;
                for (f.finish = !0, i.queue(this, n, []), e && e.stop && e.stop.call(this, !0), t = u.length; t--;) u[t].elem === this && u[t].queue === n && (u[t].anim.stop(!0), u.splice(t, 1));
                for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete f.finish
            })
        }
    });
    i.each(["toggle", "show", "hide"], function (n, t) {
        var r = i.fn[t];
        i.fn[t] = function (n, i, u) {
            return n == null || typeof n == "boolean" ? r.apply(this, arguments) : this.animate(kt(t, !0), n, i, u)
        }
    });
    i.each({
        slideDown: kt("show"),
        slideUp: kt("hide"),
        slideToggle: kt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (n, t) {
        i.fn[n] = function (n, i, r) {
            return this.animate(t, n, i, r)
        }
    });
    i.timers = [];
    i.fx.tick = function () {
        var r, n = i.timers,
            t = 0;
        for (rt = i.now(); t < n.length; t++) r = n[t], r() || n[t] !== r || n.splice(t--, 1);
        n.length || i.fx.stop();
        rt = undefined
    };
    i.fx.timer = function (n) {
        i.timers.push(n);
        n() ? i.fx.start() : i.timers.pop()
    };
    i.fx.interval = 13;
    i.fx.start = function () {
        wt || (wt = setInterval(i.fx.tick, i.fx.interval))
    };
    i.fx.stop = function () {
        clearInterval(wt);
        wt = null
    };
    i.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    i.fn.delay = function (n, t) {
            return n = i.fx ? i.fx.speeds[n] || n : n, t = t || "fx", this.queue(t, function (t, i) {
                var r = setTimeout(t, n);
                i.stop = function () {
                    clearTimeout(r)
                }
            })
        },
        function () {
            var n, t, f, i, e;
            t = u.createElement("div");
            t.setAttribute("className", "t");
            t.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>";
            i = t.getElementsByTagName("a")[0];
            f = u.createElement("select");
            e = f.appendChild(u.createElement("option"));
            n = t.getElementsByTagName("input")[0];
            i.style.cssText = "top:1px";
            r.getSetAttribute = t.className !== "t";
            r.style = /top/.test(i.getAttribute("style"));
            r.hrefNormalized = i.getAttribute("href") === "/a";
            r.checkOn = !!n.value;
            r.optSelected = e.selected;
            r.enctype = !!u.createElement("form").enctype;
            f.disabled = !0;
            r.optDisabled = !e.disabled;
            n = u.createElement("input");
            n.setAttribute("value", "");
            r.input = n.getAttribute("value") === "";
            n.value = "t";
            n.setAttribute("type", "radio");
            r.radioValue = n.value === "t"
        }();
    uf = /\r/g;
    i.fn.extend({
        val: function (n) {
            var t, r, f, u = this[0];
            return arguments.length ? (f = i.isFunction(n), this.each(function (r) {
                var u;
                this.nodeType === 1 && (u = f ? n.call(this, r, i(this).val()) : n, u == null ? u = "" : typeof u == "number" ? u += "" : i.isArray(u) && (u = i.map(u, function (n) {
                    return n == null ? "" : n + ""
                })), t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, u, "value") !== undefined || (this.value = u))
            })) : u ? (t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()], t && "get" in t && (r = t.get(u, "value")) !== undefined) ? r : (r = u.value, typeof r == "string" ? r.replace(uf, "") : r == null ? "" : r) : void 0
        }
    });
    i.extend({
        valHooks: {
            option: {
                get: function (n) {
                    var t = i.find.attr(n, "value");
                    return t != null ? t : i.trim(i.text(n))
                }
            },
            select: {
                get: function (n) {
                    for (var o, t, s = n.options, u = n.selectedIndex, f = n.type === "select-one" || u < 0, h = f ? null : [], c = f ? u + 1 : s.length, e = u < 0 ? c : f ? u : 0; e < c; e++)
                        if (t = s[e], (t.selected || e === u) && (r.optDisabled ? !t.disabled : t.getAttribute("disabled") === null) && (!t.parentNode.disabled || !i.nodeName(t.parentNode, "optgroup"))) {
                            if (o = i(t).val(), f) return o;
                            h.push(o)
                        }
                    return h
                },
                set: function (n, t) {
                    for (var f, r, u = n.options, o = i.makeArray(t), e = u.length; e--;)
                        if (r = u[e], i.inArray(i.valHooks.option.get(r), o) >= 0) try {
                            r.selected = f = !0
                        } catch (s) {
                            r.scrollHeight
                        } else r.selected = !1;
                    return f || (n.selectedIndex = -1), u
                }
            }
        }
    });
    i.each(["radio", "checkbox"], function () {
        i.valHooks[this] = {
            set: function (n, t) {
                if (i.isArray(t)) return n.checked = i.inArray(i(n).val(), t) >= 0
            }
        };
        r.checkOn || (i.valHooks[this].get = function (n) {
            return n.getAttribute("value") === null ? "on" : n.value
        })
    });
    var ut, ff, v = i.expr.attrHandle,
        yi = /^(?:checked|selected)$/i,
        g = r.getSetAttribute,
        dt = r.input;
    i.fn.extend({
        attr: function (n, t) {
            return b(this, i.attr, n, t, arguments.length > 1)
        },
        removeAttr: function (n) {
            return this.each(function () {
                i.removeAttr(this, n)
            })
        }
    });
    i.extend({
        attr: function (n, t, r) {
            var u, f, e = n.nodeType;
            if (n && e !== 3 && e !== 8 && e !== 2) {
                if (typeof n.getAttribute === o) return i.prop(n, t, r);
                if (e === 1 && i.isXMLDoc(n) || (t = t.toLowerCase(), u = i.attrHooks[t] || (i.expr.match.bool.test(t) ? ff : ut)), r !== undefined)
                    if (r === null) i.removeAttr(n, t);
                    else return u && "set" in u && (f = u.set(n, r, t)) !== undefined ? f : (n.setAttribute(t, r + ""), r);
                else return u && "get" in u && (f = u.get(n, t)) !== null ? f : (f = i.find.attr(n, t), f == null ? undefined : f)
            }
        },
        removeAttr: function (n, t) {
            var r, u, e = 0,
                f = t && t.match(h);
            if (f && n.nodeType === 1)
                while (r = f[e++]) u = i.propFix[r] || r, i.expr.match.bool.test(r) ? dt && g || !yi.test(r) ? n[u] = !1 : n[i.camelCase("default-" + r)] = n[u] = !1 : i.attr(n, r, ""), n.removeAttribute(g ? r : u)
        },
        attrHooks: {
            type: {
                set: function (n, t) {
                    if (!r.radioValue && t === "radio" && i.nodeName(n, "input")) {
                        var u = n.value;
                        return n.setAttribute("type", t), u && (n.value = u), t
                    }
                }
            }
        }
    });
    ff = {
        set: function (n, t, r) {
            return t === !1 ? i.removeAttr(n, r) : dt && g || !yi.test(r) ? n.setAttribute(!g && i.propFix[r] || r, r) : n[i.camelCase("default-" + r)] = n[r] = !0, r
        }
    };
    i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
        var r = v[t] || i.find.attr;
        v[t] = dt && g || !yi.test(t) ? function (n, t, i) {
            var u, f;
            return i || (f = v[t], v[t] = u, u = r(n, t, i) != null ? t.toLowerCase() : null, v[t] = f), u
        } : function (n, t, r) {
            if (!r) return n[i.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    });
    dt && g || (i.attrHooks.value = {
        set: function (n, t, r) {
            if (i.nodeName(n, "input")) n.defaultValue = t;
            else return ut && ut.set(n, t, r)
        }
    });
    g || (ut = {
        set: function (n, t, i) {
            var r = n.getAttributeNode(i);
            return r || n.setAttributeNode(r = n.ownerDocument.createAttribute(i)), r.value = t += "", i === "value" || t === n.getAttribute(i) ? t : void 0
        }
    }, v.id = v.name = v.coords = function (n, t, i) {
        var r;
        if (!i) return (r = n.getAttributeNode(t)) && r.value !== "" ? r.value : null
    }, i.valHooks.button = {
        get: function (n, t) {
            var i = n.getAttributeNode(t);
            if (i && i.specified) return i.value
        },
        set: ut.set
    }, i.attrHooks.contenteditable = {
        set: function (n, t, i) {
            ut.set(n, t === "" ? !1 : t, i)
        }
    }, i.each(["width", "height"], function (n, t) {
        i.attrHooks[t] = {
            set: function (n, i) {
                if (i === "") return n.setAttribute(t, "auto"), i
            }
        }
    }));
    r.style || (i.attrHooks.style = {
        get: function (n) {
            return n.style.cssText || undefined
        },
        set: function (n, t) {
            return n.style.cssText = t + ""
        }
    });
    ef = /^(?:input|select|textarea|button|object)$/i; of = /^(?:a|area)$/i;
    i.fn.extend({
        prop: function (n, t) {
            return b(this, i.prop, n, t, arguments.length > 1)
        },
        removeProp: function (n) {
            return n = i.propFix[n] || n, this.each(function () {
                try {
                    this[n] = undefined;
                    delete this[n]
                } catch (t) {}
            })
        }
    });
    i.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function (n, t, r) {
            var f, u, o, e = n.nodeType;
            if (n && e !== 3 && e !== 8 && e !== 2) return o = e !== 1 || !i.isXMLDoc(n), o && (t = i.propFix[t] || t, u = i.propHooks[t]), r !== undefined ? u && "set" in u && (f = u.set(n, r, t)) !== undefined ? f : n[t] = r : u && "get" in u && (f = u.get(n, t)) !== null ? f : n[t]
        },
        propHooks: {
            tabIndex: {
                get: function (n) {
                    var t = i.find.attr(n, "tabindex");
                    return t ? parseInt(t, 10) : ef.test(n.nodeName) || of .test(n.nodeName) && n.href ? 0 : -1
                }
            }
        }
    });
    r.hrefNormalized || i.each(["href", "src"], function (n, t) {
        i.propHooks[t] = {
            get: function (n) {
                return n.getAttribute(t, 4)
            }
        }
    });
    r.optSelected || (i.propHooks.selected = {
        get: function (n) {
            var t = n.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    });
    i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        i.propFix[this.toLowerCase()] = this
    });
    r.enctype || (i.propFix.enctype = "encoding");
    gt = /[\t\r\n\f]/g;
    i.fn.extend({
        addClass: function (n) {
            var o, t, r, u, s, f, e = 0,
                c = this.length,
                l = typeof n == "string" && n;
            if (i.isFunction(n)) return this.each(function (t) {
                i(this).addClass(n.call(this, t, this.className))
            });
            if (l)
                for (o = (n || "").match(h) || []; e < c; e++)
                    if (t = this[e], r = t.nodeType === 1 && (t.className ? (" " + t.className + " ").replace(gt, " ") : " "), r) {
                        for (s = 0; u = o[s++];) r.indexOf(" " + u + " ") < 0 && (r += u + " ");
                        f = i.trim(r);
                        t.className !== f && (t.className = f)
                    }
            return this
        },
        removeClass: function (n) {
            var o, t, r, u, s, f, e = 0,
                c = this.length,
                l = arguments.length === 0 || typeof n == "string" && n;
            if (i.isFunction(n)) return this.each(function (t) {
                i(this).removeClass(n.call(this, t, this.className))
            });
            if (l)
                for (o = (n || "").match(h) || []; e < c; e++)
                    if (t = this[e], r = t.nodeType === 1 && (t.className ? (" " + t.className + " ").replace(gt, " ") : ""), r) {
                        for (s = 0; u = o[s++];)
                            while (r.indexOf(" " + u + " ") >= 0) r = r.replace(" " + u + " ", " ");
                        f = n ? i.trim(r) : "";
                        t.className !== f && (t.className = f)
                    }
            return this
        },
        toggleClass: function (n, t) {
            var r = typeof n;
            return typeof t == "boolean" && r === "string" ? t ? this.addClass(n) : this.removeClass(n) : i.isFunction(n) ? this.each(function (r) {
                i(this).toggleClass(n.call(this, r, this.className, t), t)
            }) : this.each(function () {
                if (r === "string")
                    for (var t, f = 0, u = i(this), e = n.match(h) || []; t = e[f++];) u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                else(r === o || r === "boolean") && (this.className && i._data(this, "__className__", this.className), this.className = this.className || n === !1 ? "" : i._data(this, "__className__") || "")
            })
        },
        hasClass: function (n) {
            for (var i = " " + n + " ", t = 0, r = this.length; t < r; t++)
                if (this[t].nodeType === 1 && (" " + this[t].className + " ").replace(gt, " ").indexOf(i) >= 0) return !0;
            return !1
        }
    });
    i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (n, t) {
        i.fn[t] = function (n, i) {
            return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
        }
    });
    i.fn.extend({
        hover: function (n, t) {
            return this.mouseenter(n).mouseleave(t || n)
        },
        bind: function (n, t, i) {
            return this.on(n, null, t, i)
        },
        unbind: function (n, t) {
            return this.off(n, null, t)
        },
        delegate: function (n, t, i, r) {
            return this.on(t, n, i, r)
        },
        undelegate: function (n, t, i) {
            return arguments.length === 1 ? this.off(n, "**") : this.off(t, n || "**", i)
        }
    });
    var pi = i.now(),
        wi = /\?/,
        oo = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    i.parseJSON = function (t) {
        if (n.JSON && n.JSON.parse) return n.JSON.parse(t + "");
        var f, r = null,
            u = i.trim(t + "");
        return u && !i.trim(u.replace(oo, function (n, t, i, u) {
            return (f && t && (r = 0), r === 0) ? n : (f = i || t, r += !u - !i, "")
        })) ? Function("return " + u)() : i.error("Invalid JSON: " + t)
    };
    i.parseXML = function (t) {
        var r, u;
        if (!t || typeof t != "string") return null;
        try {
            n.DOMParser ? (u = new DOMParser, r = u.parseFromString(t, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(t))
        } catch (f) {
            r = undefined
        }
        return r && r.documentElement && !r.getElementsByTagName("parsererror").length || i.error("Invalid XML: " + t), r
    };
    var nt, y, so = /#.*$/,
        sf = /([?&])_=[^&]*/,
        ho = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        co = /^(?:GET|HEAD)$/,
        lo = /^\/\//,
        hf = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        cf = {},
        bi = {},
        lf = "*/".concat("*");
    try {
        y = location.href
    } catch (ns) {
        y = u.createElement("a");
        y.href = "";
        y = y.href
    }
    nt = hf.exec(y.toLowerCase()) || [];
    i.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: y,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(nt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": lf,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": i.parseJSON,
                "text xml": i.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (n, t) {
            return t ? ki(ki(n, i.ajaxSettings), t) : ki(i.ajaxSettings, n)
        },
        ajaxPrefilter: af(cf),
        ajaxTransport: af(bi),
        ajax: function (n, t) {
            function w(n, t, s, h) {
                var v, it, nt, y, w, c = t;
                e !== 2 && (e = 2, k && clearTimeout(k), l = undefined, b = h || "", u.readyState = n > 0 ? 4 : 0, v = n >= 200 && n < 300 || n === 304, s && (y = ao(r, u, s)), y = vo(r, y, u, v), v ? (r.ifModified && (w = u.getResponseHeader("Last-Modified"), w && (i.lastModified[f] = w), w = u.getResponseHeader("etag"), w && (i.etag[f] = w)), n === 204 || r.type === "HEAD" ? c = "nocontent" : n === 304 ? c = "notmodified" : (c = y.state, it = y.data, nt = y.error, v = !nt)) : (nt = c, (n || !c) && (c = "error", n < 0 && (n = 0))), u.status = n, u.statusText = (t || c) + "", v ? g.resolveWith(o, [it, c, u]) : g.rejectWith(o, [u, c, nt]), u.statusCode(p), p = undefined, a && d.trigger(v ? "ajaxSuccess" : "ajaxError", [u, r, v ? it : nt]), tt.fireWith(o, [u, c]), a && (d.trigger("ajaxComplete", [u, r]), --i.active || i.event.trigger("ajaxStop")))
            }
            typeof n == "object" && (t = n, n = undefined);
            t = t || {};
            var s, c, f, b, k, a, l, v, r = i.ajaxSetup({}, t),
                o = r.context || r,
                d = r.context && (o.nodeType || o.jquery) ? i(o) : i.event,
                g = i.Deferred(),
                tt = i.Callbacks("once memory"),
                p = r.statusCode || {},
                it = {},
                rt = {},
                e = 0,
                ut = "canceled",
                u = {
                    readyState: 0,
                    getResponseHeader: function (n) {
                        var t;
                        if (e === 2) {
                            if (!v)
                                for (v = {}; t = ho.exec(b);) v[t[1].toLowerCase()] = t[2];
                            t = v[n.toLowerCase()]
                        }
                        return t == null ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return e === 2 ? b : null
                    },
                    setRequestHeader: function (n, t) {
                        var i = n.toLowerCase();
                        return e || (n = rt[i] = rt[i] || n, it[n] = t), this
                    },
                    overrideMimeType: function (n) {
                        return e || (r.mimeType = n), this
                    },
                    statusCode: function (n) {
                        var t;
                        if (n)
                            if (e < 2)
                                for (t in n) p[t] = [p[t], n[t]];
                            else u.always(n[u.status]);
                        return this
                    },
                    abort: function (n) {
                        var t = n || ut;
                        return l && l.abort(t), w(0, t), this
                    }
                };
            if (g.promise(u).complete = tt.add, u.success = u.done, u.error = u.fail, r.url = ((n || r.url || y) + "").replace(so, "").replace(lo, nt[1] + "//"), r.type = t.method || t.type || r.method || r.type, r.dataTypes = i.trim(r.dataType || "*").toLowerCase().match(h) || [""], r.crossDomain == null && (s = hf.exec(r.url.toLowerCase()), r.crossDomain = !!(s && (s[1] !== nt[1] || s[2] !== nt[2] || (s[3] || (s[1] === "http:" ? "80" : "443")) !== (nt[3] || (nt[1] === "http:" ? "80" : "443"))))), r.data && r.processData && typeof r.data != "string" && (r.data = i.param(r.data, r.traditional)), vf(cf, r, t, u), e === 2) return u;
            a = i.event && r.global;
            a && i.active++ == 0 && i.event.trigger("ajaxStart");
            r.type = r.type.toUpperCase();
            r.hasContent = !co.test(r.type);
            f = r.url;
            r.hasContent || (r.data && (f = r.url += (wi.test(f) ? "&" : "?") + r.data, delete r.data), r.cache === !1 && (r.url = sf.test(f) ? f.replace(sf, "$1_=" + pi++) : f + (wi.test(f) ? "&" : "?") + "_=" + pi++));
            r.ifModified && (i.lastModified[f] && u.setRequestHeader("If-Modified-Since", i.lastModified[f]), i.etag[f] && u.setRequestHeader("If-None-Match", i.etag[f]));
            (r.data && r.hasContent && r.contentType !== !1 || t.contentType) && u.setRequestHeader("Content-Type", r.contentType);
            u.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + lf + "; q=0.01" : "") : r.accepts["*"]);
            for (c in r.headers) u.setRequestHeader(c, r.headers[c]);
            if (r.beforeSend && (r.beforeSend.call(o, u, r) === !1 || e === 2)) return u.abort();
            ut = "abort";
            for (c in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) u[c](r[c]);
            if (l = vf(bi, r, t, u), l) {
                u.readyState = 1;
                a && d.trigger("ajaxSend", [u, r]);
                r.async && r.timeout > 0 && (k = setTimeout(function () {
                    u.abort("timeout")
                }, r.timeout));
                try {
                    e = 1;
                    l.send(it, w)
                } catch (ft) {
                    if (e < 2) w(-1, ft);
                    else throw ft;
                }
            } else w(-1, "No Transport");
            return u
        },
        getJSON: function (n, t, r) {
            return i.get(n, t, r, "json")
        },
        getScript: function (n, t) {
            return i.get(n, undefined, t, "script")
        }
    });
    i.each(["get", "post"], function (n, t) {
        i[t] = function (n, r, u, f) {
            return i.isFunction(r) && (f = f || u, u = r, r = undefined), i.ajax({
                url: n,
                type: t,
                dataType: f,
                data: r,
                success: u
            })
        }
    });
    i._evalUrl = function (n) {
        return i.ajax({
            url: n,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    };
    i.fn.extend({
        wrapAll: function (n) {
            if (i.isFunction(n)) return this.each(function (t) {
                i(this).wrapAll(n.call(this, t))
            });
            if (this[0]) {
                var t = i(n, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]);
                t.map(function () {
                    for (var n = this; n.firstChild && n.firstChild.nodeType === 1;) n = n.firstChild;
                    return n
                }).append(this)
            }
            return this
        },
        wrapInner: function (n) {
            return i.isFunction(n) ? this.each(function (t) {
                i(this).wrapInner(n.call(this, t))
            }) : this.each(function () {
                var t = i(this),
                    r = t.contents();
                r.length ? r.wrapAll(n) : t.append(n)
            })
        },
        wrap: function (n) {
            var t = i.isFunction(n);
            return this.each(function (r) {
                i(this).wrapAll(t ? n.call(this, r) : n)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    i.expr.filters.hidden = function (n) {
        return n.offsetWidth <= 0 && n.offsetHeight <= 0 || !r.reliableHiddenOffsets() && (n.style && n.style.display || i.css(n, "display")) === "none"
    };
    i.expr.filters.visible = function (n) {
        return !i.expr.filters.hidden(n)
    };
    var yo = /%20/g,
        po = /\[\]$/,
        yf = /\r?\n/g,
        wo = /^(?:submit|button|image|reset|file)$/i,
        bo = /^(?:input|select|textarea|keygen)/i;
    i.param = function (n, t) {
        var r, u = [],
            f = function (n, t) {
                t = i.isFunction(t) ? t() : t == null ? "" : t;
                u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
            };
        if (t === undefined && (t = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || n.jquery && !i.isPlainObject(n)) i.each(n, function () {
            f(this.name, this.value)
        });
        else
            for (r in n) di(r, n[r], t, f);
        return u.join("&").replace(yo, "+")
    };
    i.fn.extend({
        serialize: function () {
            return i.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var n = i.prop(this, "elements");
                return n ? i.makeArray(n) : this
            }).filter(function () {
                var n = this.type;
                return this.name && !i(this).is(":disabled") && bo.test(this.nodeName) && !wo.test(n) && (this.checked || !oi.test(n))
            }).map(function (n, t) {
                var r = i(this).val();
                return r == null ? null : i.isArray(r) ? i.map(r, function (n) {
                    return {
                        name: t.name,
                        value: n.replace(yf, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: r.replace(yf, "\r\n")
                }
            }).get()
        }
    });
    i.ajaxSettings.xhr = n.ActiveXObject !== undefined ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && pf() || go()
    } : pf;
    var ko = 0,
        ni = {},
        ht = i.ajaxSettings.xhr();
    return n.attachEvent && n.attachEvent("onunload", function () {
        for (var n in ni) ni[n](undefined, !0)
    }), r.cors = !!ht && "withCredentials" in ht, ht = r.ajax = !!ht, ht && i.ajaxTransport(function (n) {
        if (!n.crossDomain || r.cors) {
            var t;
            return {
                send: function (r, u) {
                    var e, f = n.xhr(),
                        o = ++ko;
                    if (f.open(n.type, n.url, n.async, n.username, n.password), n.xhrFields)
                        for (e in n.xhrFields) f[e] = n.xhrFields[e];
                    n.mimeType && f.overrideMimeType && f.overrideMimeType(n.mimeType);
                    n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                    for (e in r) r[e] !== undefined && f.setRequestHeader(e, r[e] + "");
                    f.send(n.hasContent && n.data || null);
                    t = function (r, e) {
                        var s, c, h;
                        if (t && (e || f.readyState === 4))
                            if (delete ni[o], t = undefined, f.onreadystatechange = i.noop, e) f.readyState !== 4 && f.abort();
                            else {
                                h = {};
                                s = f.status;
                                typeof f.responseText == "string" && (h.text = f.responseText);
                                try {
                                    c = f.statusText
                                } catch (l) {
                                    c = ""
                                }
                                s || !n.isLocal || n.crossDomain ? s === 1223 && (s = 204) : s = h.text ? 200 : 404
                            }
                        h && u(s, c, h, f.getAllResponseHeaders())
                    };
                    n.async ? f.readyState === 4 ? setTimeout(t) : f.onreadystatechange = ni[o] = t : t()
                },
                abort: function () {
                    t && t(undefined, !0)
                }
            }
        }
    }), i.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (n) {
                return i.globalEval(n), n
            }
        }
    }), i.ajaxPrefilter("script", function (n) {
        n.cache === undefined && (n.cache = !1);
        n.crossDomain && (n.type = "GET", n.global = !1)
    }), i.ajaxTransport("script", function (n) {
        if (n.crossDomain) {
            var t, r = u.head || i("head")[0] || u.documentElement;
            return {
                send: function (i, f) {
                    t = u.createElement("script");
                    t.async = !0;
                    n.scriptCharset && (t.charset = n.scriptCharset);
                    t.src = n.url;
                    t.onload = t.onreadystatechange = function (n, i) {
                        (i || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, i || f(200, "success"))
                    };
                    r.insertBefore(t, r.firstChild)
                },
                abort: function () {
                    if (t) t.onload(undefined, !0)
                }
            }
        }
    }), gi = [], ti = /(=)\?(?=&|$)|\?\?/, i.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var n = gi.pop() || i.expando + "_" + pi++;
            return this[n] = !0, n
        }
    }), i.ajaxPrefilter("json jsonp", function (t, r, u) {
        var f, o, e, s = t.jsonp !== !1 && (ti.test(t.url) ? "url" : typeof t.data == "string" && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ti.test(t.data) && "data");
        if (s || t.dataTypes[0] === "jsonp") return f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ti, "$1" + f) : t.jsonp !== !1 && (t.url += (wi.test(t.url) ? "&" : "?") + t.jsonp + "=" + f), t.converters["script json"] = function () {
            return e || i.error(f + " was not called"), e[0]
        }, t.dataTypes[0] = "json", o = n[f], n[f] = function () {
            e = arguments
        }, u.always(function () {
            n[f] = o;
            t[f] && (t.jsonpCallback = r.jsonpCallback, gi.push(f));
            e && i.isFunction(o) && o(e[0]);
            e = o = undefined
        }), "script"
    }), i.parseHTML = function (n, t, r) {
        if (!n || typeof n != "string") return null;
        typeof t == "boolean" && (r = t, t = !1);
        t = t || u;
        var f = er.exec(n),
            e = !r && [];
        return f ? [t.createElement(f[1])] : (f = i.buildFragment([n], t, e), e && e.length && i(e).remove(), i.merge([], f.childNodes))
    }, nr = i.fn.load, i.fn.load = function (n, t, r) {
        if (typeof n != "string" && nr) return nr.apply(this, arguments);
        var u, o, s, f = this,
            e = n.indexOf(" ");
        return e >= 0 && (u = i.trim(n.slice(e, n.length)), n = n.slice(0, e)), i.isFunction(t) ? (r = t, t = undefined) : t && typeof t == "object" && (s = "POST"), f.length > 0 && i.ajax({
            url: n,
            type: s,
            dataType: "html",
            data: t
        }).done(function (n) {
            o = arguments;
            f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n)
        }).complete(r && function (n, t) {
            f.each(r, o || [n.responseText, t, n])
        }), this
    }, i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (n, t) {
        i.fn[t] = function (n) {
            return this.on(t, n)
        }
    }), i.expr.filters.animated = function (n) {
        return i.grep(i.timers, function (t) {
            return n === t.elem
        }).length
    }, tr = n.document.documentElement, i.offset = {
        setOffset: function (n, t, r) {
            var e, o, s, h, u, c, v, l = i.css(n, "position"),
                a = i(n),
                f = {};
            l === "static" && (n.style.position = "relative");
            u = a.offset();
            s = i.css(n, "top");
            c = i.css(n, "left");
            v = (l === "absolute" || l === "fixed") && i.inArray("auto", [s, c]) > -1;
            v ? (e = a.position(), h = e.top, o = e.left) : (h = parseFloat(s) || 0, o = parseFloat(c) || 0);
            i.isFunction(t) && (t = t.call(n, r, u));
            t.top != null && (f.top = t.top - u.top + h);
            t.left != null && (f.left = t.left - u.left + o);
            "using" in t ? t.using.call(n, f) : a.css(f)
        }
    }, i.fn.extend({
        offset: function (n) {
            if (arguments.length) return n === undefined ? this : this.each(function (t) {
                i.offset.setOffset(this, n, t)
            });
            var t, f, u = {
                    top: 0,
                    left: 0
                },
                r = this[0],
                e = r && r.ownerDocument;
            if (e) return (t = e.documentElement, !i.contains(t, r)) ? u : (typeof r.getBoundingClientRect !== o && (u = r.getBoundingClientRect()), f = wf(e), {
                top: u.top + (f.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: u.left + (f.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            })
        },
        position: function () {
            if (this[0]) {
                var n, r, t = {
                        top: 0,
                        left: 0
                    },
                    u = this[0];
                return i.css(u, "position") === "fixed" ? r = u.getBoundingClientRect() : (n = this.offsetParent(), r = this.offset(), i.nodeName(n[0], "html") || (t = n.offset()), t.top += i.css(n[0], "borderTopWidth", !0), t.left += i.css(n[0], "borderLeftWidth", !0)), {
                    top: r.top - t.top - i.css(u, "marginTop", !0),
                    left: r.left - t.left - i.css(u, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var n = this.offsetParent || tr; n && !i.nodeName(n, "html") && i.css(n, "position") === "static";) n = n.offsetParent;
                return n || tr
            })
        }
    }), i.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (n, t) {
        var r = /Y/.test(t);
        i.fn[n] = function (u) {
            return b(this, function (n, u, f) {
                var e = wf(n);
                if (f === undefined) return e ? t in e ? e[t] : e.document.documentElement[u] : n[u];
                e ? e.scrollTo(r ? i(e).scrollLeft() : f, r ? f : i(e).scrollTop()) : n[u] = f
            }, n, u, arguments.length, null)
        }
    }), i.each(["top", "left"], function (n, t) {
        i.cssHooks[t] = au(r.pixelPosition, function (n, r) {
            if (r) return r = d(n, t), pt.test(r) ? i(n).position()[t] + "px" : r
        })
    }), i.each({
        Height: "height",
        Width: "width"
    }, function (n, t) {
        i.each({
            padding: "inner" + n,
            content: t,
            "": "outer" + n
        }, function (r, u) {
            i.fn[u] = function (u, f) {
                var e = arguments.length && (r || typeof u != "boolean"),
                    o = r || (u === !0 || f === !0 ? "margin" : "border");
                return b(this, function (t, r, u) {
                    var f;
                    return i.isWindow(t) ? t.document.documentElement["client" + n] : t.nodeType === 9 ? (f = t.documentElement, Math.max(t.body["scroll" + n], f["scroll" + n], t.body["offset" + n], f["offset" + n], f["client" + n])) : u === undefined ? i.css(t, r, o) : i.style(t, r, u, o)
                }, t, e ? u : undefined, e, null)
            }
        })
    }), i.fn.size = function () {
        return this.length
    }, i.fn.andSelf = i.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function () {
        return i
    }), bf = n.jQuery, kf = n.$, i.noConflict = function (t) {
        return n.$ === i && (n.$ = kf), t && n.jQuery === i && (n.jQuery = bf), i
    }, typeof t === o && (n.jQuery = n.$ = i), i
}),
function (n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
}(function (n) {
    function r(t, i) {
        var r, f, e, o = t.nodeName.toLowerCase();
        return "area" === o ? (r = t.parentNode, f = r.name, t.href && f && "map" === r.nodeName.toLowerCase() ? (e = n("img[usemap='#" + f + "']")[0], !!e && u(e)) : !1) : (/^(input|select|textarea|button|object)$/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && u(t)
    }

    function u(t) {
        return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function () {
            return "hidden" === n.css(this, "visibility")
        }).length
    }

    function s(n) {
        for (var t, i; n.length && n[0] !== document;) {
            if (t = n.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(n.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            n = n.parent()
        }
        return 0
    }

    function f() {
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._datepickerShowing = !1;
        this._inDialog = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        };
        n.extend(this._defaults, this.regional[""]);
        this.regional.en = n.extend(!0, {}, this.regional[""]);
        this.regional["en-US"] = n.extend(!0, {}, this.regional.en);
        this.dpDiv = e(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"))
    }

    function e(t) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.delegate(i, "mouseout", function () {
            n(this).removeClass("ui-state-hover"); - 1 !== this.className.indexOf("ui-datepicker-prev") && n(this).removeClass("ui-datepicker-prev-hover"); - 1 !== this.className.indexOf("ui-datepicker-next") && n(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", o)
    }

    function o() {
        n.datepicker._isDisabledDatepicker(t.inline ? t.dpDiv.parent()[0] : t.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && n(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && n(this).addClass("ui-datepicker-next-hover"))
    }

    function i(t, i) {
        n.extend(t, i);
        for (var r in i) null == i[r] && (t[r] = i[r]);
        return t
    }
    n.ui = n.ui || {};
    n.extend(n.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    n.fn.extend({
        scrollParent: function (t) {
            var i = this.css("position"),
                u = "absolute" === i,
                f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                r = this.parents().filter(function () {
                    var t = n(this);
                    return u && "static" === t.css("position") ? !1 : f.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                }).eq(0);
            return "fixed" !== i && r.length ? r : n(this[0].ownerDocument || document)
        },
        uniqueId: function () {
            var n = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++n)
                })
            }
        }(),
        removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
            })
        }
    });
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function (t) {
            return function (i) {
                return !!n.data(i, t)
            }
        }) : function (t, i, r) {
            return !!n.data(t, r[3])
        },
        focusable: function (t) {
            return r(t, !isNaN(n.attr(t, "tabindex")))
        },
        tabbable: function (t) {
            var i = n.attr(t, "tabindex"),
                u = isNaN(i);
            return (u || i >= 0) && r(t, !u)
        }
    });
    n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function (t, i) {
        function r(t, i, r, u) {
            return n.each(e, function () {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
            }), i
        }
        var e = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
            u = i.toLowerCase(),
            f = {
                innerWidth: n.fn.innerWidth,
                innerHeight: n.fn.innerHeight,
                outerWidth: n.fn.outerWidth,
                outerHeight: n.fn.outerHeight
            };
        n.fn["inner" + i] = function (t) {
            return void 0 === t ? f["inner" + i].call(this) : this.each(function () {
                n(this).css(u, r(this, t) + "px")
            })
        };
        n.fn["outer" + i] = function (t, e) {
            return "number" != typeof t ? f["outer" + i].call(this, t) : this.each(function () {
                n(this).css(u, r(this, t, !0, e) + "px")
            })
        }
    });
    n.fn.addBack || (n.fn.addBack = function (n) {
        return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
    });
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function (t) {
        return function (i) {
            return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
        }
    }(n.fn.removeData));
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    n.fn.extend({
        focus: function (t) {
            return function (i, r) {
                return "number" == typeof i ? this.each(function () {
                    var t = this;
                    setTimeout(function () {
                        n(t).focus();
                        r && r.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(n.fn.focus),
        disableSelection: function () {
            var n = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(n + ".ui-disableSelection", function (n) {
                    n.preventDefault()
                })
            }
        }(),
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function (t) {
            if (void 0 !== t) return this.css("zIndex", t);
            if (this.length)
                for (var r, u, i = n(this[0]); i.length && i[0] !== document;) {
                    if (r = i.css("position"), ("absolute" === r || "relative" === r || "fixed" === r) && (u = parseInt(i.css("zIndex"), 10), !isNaN(u) && 0 !== u)) return u;
                    i = i.parent()
                }
            return 0
        }
    });
    n.ui.plugin = {
        add: function (t, i, r) {
            var u, f = n.ui[t].prototype;
            for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
        },
        call: function (n, t, i, r) {
            var u, f = n.plugins[t];
            if (f && (r || n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType))
                for (u = 0; f.length > u; u++) n.options[f[u][0]] && f[u][1].apply(n.element, i)
        }
    };
    n.extend(n.ui, {
        datepicker: {
            version: "1.11.4"
        }
    });
    var t;
    n.extend(f.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (n) {
            return i(this._defaults, n || {}), this
        },
        _attachDatepicker: function (t, i) {
            var r, f, u;
            r = t.nodeName.toLowerCase();
            f = "div" === r || "span" === r;
            t.id || (this.uuid += 1, t.id = "dp" + this.uuid);
            u = this._newInst(n(t), f);
            u.settings = n.extend({}, i || {});
            "input" === r ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u)
        },
        _newInst: function (t, i) {
            var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: r,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? e(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function (t, i) {
            var r = n(t);
            i.append = n([]);
            i.trigger = n([]);
            r.hasClass(this.markerClassName) || (this._attachments(r, i), r.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), n.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function (t, i) {
            var u, r, f, e = this._get(i, "appendText"),
                o = this._get(i, "isRTL");
            i.append && i.append.remove();
            e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"), t[o ? "before" : "after"](i.append));
            t.unbind("focus", this._showDatepicker);
            i.trigger && i.trigger.remove();
            u = this._get(i, "showOn");
            ("focus" === u || "both" === u) && t.focus(this._showDatepicker);
            ("button" === u || "both" === u) && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: r,
                title: r
            }) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({
                src: f,
                alt: r,
                title: r
            }) : r)), t[o ? "before" : "after"](i.trigger), i.trigger.click(function () {
                return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(), n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]), !1
            }))
        },
        _autoSize: function (n) {
            if (this._get(n, "autoSize") && !n.inline) {
                var r, u, f, t, i = new Date(2009, 11, 20),
                    e = this._get(n, "dateFormat");
                e.match(/[DM]/) && (r = function (n) {
                    for (u = 0, f = 0, t = 0; n.length > t; t++) n[t].length > u && (u = n[t].length, f = t);
                    return f
                }, i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))), i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay()));
                n.input.attr("size", this._formatDate(n, i).length)
            }
        },
        _inlineDatepicker: function (t, i) {
            var r = n(t);
            r.hasClass(this.markerClassName) || (r.addClass(this.markerClassName).append(i.dpDiv), n.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (t, r, u, f, e) {
            var s, h, c, l, a, o = this._dialogInst;
            return o || (this.uuid += 1, s = "dp" + this.uuid, this._dialogInput = n("<input type='text' id='" + s + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), n("body").append(this._dialogInput), o = this._dialogInst = this._newInst(this._dialogInput, !1), o.settings = {}, n.data(this._dialogInput[0], "datepicker", o)), i(o.settings, f || {}), r = r && r.constructor === Date ? this._formatDate(o, r) : r, this._dialogInput.val(r), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null, this._pos || (h = document.documentElement.clientWidth, c = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, a = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + l, c / 2 - 150 + a]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), o.settings.onSelect = u, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], "datepicker", o), this
        },
        _destroyDatepicker: function (i) {
            var r, u = n(i),
                f = n.data(i, "datepicker");
            u.hasClass(this.markerClassName) && (r = i.nodeName.toLowerCase(), n.removeData(i, "datepicker"), "input" === r ? (f.append.remove(), f.trigger.remove(), u.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === r || "span" === r) && u.removeClass(this.markerClassName).empty(), t === f && (t = null))
        },
        _enableDatepicker: function (t) {
            var i, r, u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, f.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().removeClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = n.map(this._disabledInputs, function (n) {
                return n === t ? null : n
            }))
        },
        _disableDatepicker: function (t) {
            var i, r, u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, f.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().addClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = n.map(this._disabledInputs, function (n) {
                return n === t ? null : n
            }), this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function (n) {
            if (!n) return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === n) return !0;
            return !1
        },
        _getInst: function (t) {
            try {
                return n.data(t, "datepicker")
            } catch (i) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function (t, r, u) {
            var e, h, o, s, f = this._getInst(t);
            return 2 === arguments.length && "string" == typeof r ? "defaults" === r ? n.extend({}, n.datepicker._defaults) : f ? "all" === r ? n.extend({}, f.settings) : this._get(f, r) : null : (e = r || {}, "string" == typeof r && (e = {}, e[r] = u), f && (this._curInst === f && this._hideDatepicker(), h = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(f, "min"), s = this._getMinMaxDate(f, "max"), i(f.settings, e), null !== o && void 0 !== e.dateFormat && void 0 === e.minDate && (f.settings.minDate = this._formatDate(f, o)), null !== s && void 0 !== e.dateFormat && void 0 === e.maxDate && (f.settings.maxDate = this._formatDate(f, s)), "disabled" in e && (e.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(n(t), f), this._autoSize(f), this._setDate(f, h), this._updateAlternate(f), this._updateDatepicker(f)), void 0)
        },
        _changeDatepicker: function (n, t, i) {
            this._optionDatepicker(n, t, i)
        },
        _refreshDatepicker: function (n) {
            var t = this._getInst(n);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function (n, t) {
            var i = this._getInst(n);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function (n, t) {
            var i = this._getInst(n);
            return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
        },
        _doKeyDown: function (t) {
            var u, e, f, i = n.datepicker._getInst(t.target),
                r = !0,
                o = i.dpDiv.is(".ui-datepicker-rtl");
            if (i._keyEvent = !0, n.datepicker._datepickerShowing) switch (t.keyCode) {
                case 9:
                    n.datepicker._hideDatepicker();
                    r = !1;
                    break;
                case 13:
                    return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv), f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]), u = n.datepicker._get(i, "onSelect"), u ? (e = n.datepicker._formatDate(i), u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(), !1;
                case 27:
                    n.datepicker._hideDatepicker();
                    break;
                case 33:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 34:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
            } else 36 === t.keyCode && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function (t) {
            var i, r, u = n.datepicker._getInst(t.target);
            if (n.datepicker._get(u, "constrainInput")) return (i = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")), r = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > r || !i || i.indexOf(r) > -1)
        },
        _doKeyUp: function (t) {
            var r, i = n.datepicker._getInst(t.target);
            if (i.input.val() !== i.lastVal) try {
                r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i));
                r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i))
            } catch (u) {}
            return !0
        },
        _showDatepicker: function (t) {
            if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
                var r, o, h, u, f, e, c;
                r = n.datepicker._getInst(t);
                n.datepicker._curInst && n.datepicker._curInst !== r && (n.datepicker._curInst.dpDiv.stop(!0, !0), r && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0]));
                o = n.datepicker._get(r, "beforeShow");
                h = o ? o.apply(t, [t, r]) : {};
                h !== !1 && (i(r.settings, h), r.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(r), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), u = !1, n(t).parents().each(function () {
                    return u |= "fixed" === n(this).css("position"), !u
                }), f = {
                    left: n.datepicker._pos[0],
                    top: n.datepicker._pos[1]
                }, n.datepicker._pos = null, r.dpDiv.empty(), r.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), n.datepicker._updateDatepicker(r), f = n.datepicker._checkOffset(r, f, u), r.dpDiv.css({
                    position: n.datepicker._inDialog && n.blockUI ? "static" : u ? "fixed" : "absolute",
                    display: "none",
                    left: f.left + "px",
                    top: f.top + "px"
                }), r.inline || (e = n.datepicker._get(r, "showAnim"), c = n.datepicker._get(r, "duration"), r.dpDiv.css("z-index", s(n(t)) + 1), n.datepicker._datepickerShowing = !0, n.effects && n.effects.effect[e] ? r.dpDiv.show(e, n.datepicker._get(r, "showOptions"), c) : r.dpDiv[e || "show"](e ? c : null), n.datepicker._shouldFocusInput(r) && r.input.focus(), n.datepicker._curInst = r))
            }
        },
        _updateDatepicker: function (i) {
            this.maxRows = 4;
            t = i;
            i.dpDiv.empty().append(this._generateHTML(i));
            this._attachHandlers(i);
            var r, u = this._getNumberOfMonths(i),
                f = u[1],
                e = i.dpDiv.find("." + this._dayOverClass + " a");
            e.length > 0 && o.apply(e.get(0));
            i.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            f > 1 && i.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", 17 * f + "em");
            i.dpDiv[(1 !== u[0] || 1 !== u[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            i.dpDiv[(this._get(i, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            i === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(i) && i.input.focus();
            i.yearshtml && (r = i.yearshtml, setTimeout(function () {
                r === i.yearshtml && i.yearshtml && i.dpDiv.find("select.ui-datepicker-year:first").replaceWith(i.yearshtml);
                r = i.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function (n) {
            return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus")
        },
        _checkOffset: function (t, i, r) {
            var u = t.dpDiv.outerWidth(),
                f = t.dpDiv.outerHeight(),
                h = t.input ? t.input.outerWidth() : 0,
                o = t.input ? t.input.outerHeight() : 0,
                e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft()),
                s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
            return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0), i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0), i
        },
        _findPos: function (t) {
            for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));) t = t[u ? "previousSibling" : "nextSibling"];
            return i = n(t).offset(), [i.left, i.top]
        },
        _hideDatepicker: function (t) {
            var r, f, u, e, i = this._curInst;
            !i || t && i !== n.data(t, "datepicker") || this._datepickerShowing && (r = this._get(i, "showAnim"), f = this._get(i, "duration"), u = function () {
                n.datepicker._tidyDialog(i)
            }, n.effects && (n.effects.effect[r] || n.effects[r]) ? i.dpDiv.hide(r, n.datepicker._get(i, "showOptions"), f, u) : i.dpDiv["slideDown" === r ? "slideUp" : "fadeIn" === r ? "fadeOut" : "hide"](r ? f : null, u), r || u(), this._datepickerShowing = !1, e = this._get(i, "onClose"), e && e.apply(i.input ? i.input[0] : null, [i.input ? i.input.val() : "", i]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function (n) {
            n.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (t) {
            if (n.datepicker._curInst) {
                var i = n(t.target),
                    r = n.datepicker._getInst(i[0]);
                (i[0].id === n.datepicker._mainDivId || 0 !== i.parents("#" + n.datepicker._mainDivId).length || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u))
        },
        _gotoToday: function (t) {
            var r, u = n(t),
                i = this._getInst(u[0]);
            this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear());
            this._notifyChange(i);
            this._adjustDate(u)
        },
        _selectMonthYear: function (t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            u["selected" + ("M" === r ? "Month" : "Year")] = u["draw" + ("M" === r ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
            this._notifyChange(u);
            this._adjustDate(f)
        },
        _selectDay: function (t, i, r, u) {
            var f, e = n(t);
            n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
        },
        _clearDate: function (t) {
            var i = n(t);
            this._selectDate(i, "")
        },
        _selectDate: function (t, i) {
            var u, f = n(t),
                r = this._getInst(f[0]);
            i = null != i ? i : this._formatDate(r);
            r.input && r.input.val(i);
            this._updateAlternate(r);
            u = this._get(r, "onSelect");
            u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change");
            r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (t) {
            var i, r, u, f = this._get(t, "altField");
            f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), u = this.formatDate(i, r, this._getFormatConfig(t)), n(f).each(function () {
                n(this).val(u)
            }))
        },
        noWeekends: function (n) {
            var t = n.getDay();
            return [t > 0 && 6 > t, ""]
        },
        iso8601Week: function (n) {
            var i, t = new Date(n.getTime());
            return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
        },
        parseDate: function (t, i, r) {
            if (null == t || null == i) throw "Invalid arguments";
            if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
            for (var a, v, u, f = 0, y = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff, d = "string" != typeof y ? y : (new Date).getFullYear() % 100 + parseInt(y, 10), g = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort, nt = (r ? r.dayNames : null) || this._defaults.dayNames, tt = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort, it = (r ? r.monthNames : null) || this._defaults.monthNames, e = -1, s = -1, h = -1, p = -1, w = !1, l = function (n) {
                    var i = t.length > o + 1 && t.charAt(o + 1) === n;
                    return i && o++, i
                }, c = function (n) {
                    var u = l(n),
                        r = "@" === n ? 14 : "!" === n ? 20 : "y" === n && u ? 4 : "o" === n ? 3 : 2,
                        e = "y" === n ? r : 1,
                        o = RegExp("^\\d{" + e + "," + r + "}"),
                        t = i.substring(f).match(o);
                    if (!t) throw "Missing number at position " + f;
                    return f += t[0].length, parseInt(t[0], 10)
                }, k = function (t, r, u) {
                    var e = -1,
                        o = n.map(l(t) ? u : r, function (n, t) {
                            return [
                                [t, n]
                            ]
                        }).sort(function (n, t) {
                            return -(n[1].length - t[1].length)
                        });
                    if (n.each(o, function (n, t) {
                            var r = t[1];
                            if (i.substr(f, r.length).toLowerCase() === r.toLowerCase()) return (e = t[0], f += r.length, !1)
                        }), -1 !== e) return e + 1;
                    throw "Unknown name at position " + f;
                }, b = function () {
                    if (i.charAt(f) !== t.charAt(o)) throw "Unexpected literal at position " + f;
                    f++
                }, o = 0; t.length > o; o++)
                if (w) "'" !== t.charAt(o) || l("'") ? b() : w = !1;
                else switch (t.charAt(o)) {
                    case "d":
                        h = c("d");
                        break;
                    case "D":
                        k("D", g, nt);
                        break;
                    case "o":
                        p = c("o");
                        break;
                    case "m":
                        s = c("m");
                        break;
                    case "M":
                        s = k("M", tt, it);
                        break;
                    case "y":
                        e = c("y");
                        break;
                    case "@":
                        u = new Date(c("@"));
                        e = u.getFullYear();
                        s = u.getMonth() + 1;
                        h = u.getDate();
                        break;
                    case "!":
                        u = new Date((c("!") - this._ticksTo1970) / 1e4);
                        e = u.getFullYear();
                        s = u.getMonth() + 1;
                        h = u.getDate();
                        break;
                    case "'":
                        l("'") ? b() : w = !0;
                        break;
                    default:
                        b()
                }
            if (i.length > f && (v = i.substr(f), !/^\s+/.test(v))) throw "Extra/unparsed characters found in date: " + v;
            if (-1 === e ? e = (new Date).getFullYear() : 100 > e && (e += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d >= e ? 0 : -100)), p > -1)
                for (s = 1, h = p;;) {
                    if (a = this._getDaysInMonth(e, s - 1), a >= h) break;
                    s++;
                    h -= a
                }
            if (u = this._daylightSavingAdjust(new Date(e, s - 1, h)), u.getFullYear() !== e || u.getMonth() + 1 !== s || u.getDate() !== h) throw "Invalid date";
            return u
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (n, t, i) {
            if (!t) return "";
            var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                c = (i ? i.dayNames : null) || this._defaults.dayNames,
                l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                a = (i ? i.monthNames : null) || this._defaults.monthNames,
                f = function (t) {
                    var i = n.length > u + 1 && n.charAt(u + 1) === t;
                    return i && u++, i
                },
                e = function (n, t, i) {
                    var r = "" + t;
                    if (f(n))
                        for (; i > r.length;) r = "0" + r;
                    return r
                },
                s = function (n, t, i, r) {
                    return f(n) ? r[t] : i[t]
                },
                r = "",
                o = !1;
            if (t)
                for (u = 0; n.length > u; u++)
                    if (o) "'" !== n.charAt(u) || f("'") ? r += n.charAt(u) : o = !1;
                    else switch (n.charAt(u)) {
                        case "d":
                            r += e("d", t.getDate(), 2);
                            break;
                        case "D":
                            r += s("D", t.getDay(), h, c);
                            break;
                        case "o":
                            r += e("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            r += e("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            r += s("M", t.getMonth(), l, a);
                            break;
                        case "y":
                            r += f("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            r += t.getTime();
                            break;
                        case "!":
                            r += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            f("'") ? r += "'" : o = !0;
                            break;
                        default:
                            r += n.charAt(u)
                    }
            return r
        },
        _possibleChars: function (n) {
            for (var i = "", r = !1, u = function (i) {
                    var r = n.length > t + 1 && n.charAt(t + 1) === i;
                    return r && t++, r
                }, t = 0; n.length > t; t++)
                if (r) "'" !== n.charAt(t) || u("'") ? i += n.charAt(t) : r = !1;
                else switch (n.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        u("'") ? i += "'" : r = !0;
                        break;
                    default:
                        i += n.charAt(t)
                }
            return i
        },
        _get: function (n, t) {
            return void 0 !== n.settings[t] ? n.settings[t] : this._defaults[t]
        },
        _setDateFromField: function (n, t) {
            if (n.input.val() !== n.lastVal) {
                var f = this._get(n, "dateFormat"),
                    r = n.lastVal = n.input ? n.input.val() : null,
                    u = this._getDefaultDate(n),
                    i = u,
                    e = this._getFormatConfig(n);
                try {
                    i = this.parseDate(f, r, e) || u
                } catch (o) {
                    r = t ? "" : r
                }
                n.selectedDay = i.getDate();
                n.drawMonth = n.selectedMonth = i.getMonth();
                n.drawYear = n.selectedYear = i.getFullYear();
                n.currentDay = r ? i.getDate() : 0;
                n.currentMonth = r ? i.getMonth() : 0;
                n.currentYear = r ? i.getFullYear() : 0;
                this._adjustInstDate(n)
            }
        },
        _getDefaultDate: function (n) {
            return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
        },
        _determineDate: function (t, i, r) {
            var f = function (n) {
                    var t = new Date;
                    return t.setDate(t.getDate() + n), t
                },
                e = function (i) {
                    try {
                        return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
                    } catch (h) {}
                    for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
                        switch (u[2] || "d") {
                            case "d":
                            case "D":
                                r += parseInt(u[1], 10);
                                break;
                            case "w":
                            case "W":
                                r += 7 * parseInt(u[1], 10);
                                break;
                            case "m":
                            case "M":
                                e += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                                break;
                            case "y":
                            case "Y":
                                f += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
                        }
                        u = s.exec(i)
                    }
                    return new Date(f, e, r)
                },
                u = null == i || "" === i ? r : "string" == typeof i ? e(i) : "number" == typeof i ? isNaN(i) ? r : f(i) : new Date(i.getTime());
            return u = u && "Invalid Date" == "" + u ? r : u, u && (u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0)), this._daylightSavingAdjust(u)
        },
        _daylightSavingAdjust: function (n) {
            return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null
        },
        _setDate: function (n, t, i) {
            var u = !t,
                f = n.selectedMonth,
                e = n.selectedYear,
                r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
            n.selectedDay = n.currentDay = r.getDate();
            n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
            n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
            f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n);
            this._adjustInstDate(n);
            n.input && n.input.val(u ? "" : this._formatDate(n))
        },
        _getDate: function (n) {
            return !n.currentYear || n.input && "" === n.input.val() ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay))
        },
        _attachHandlers: function (t) {
            var r = this._get(t, "stepMonths"),
                i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function () {
                var t = {
                    prev: function () {
                        n.datepicker._adjustDate(i, -r, "M")
                    },
                    next: function () {
                        n.datepicker._adjustDate(i, +r, "M")
                    },
                    hide: function () {
                        n.datepicker._hideDatepicker()
                    },
                    today: function () {
                        n.datepicker._gotoToday(i)
                    },
                    selectDay: function () {
                        return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function () {
                        return n.datepicker._selectMonthYear(i, this, "M"), !1
                    },
                    selectYear: function () {
                        return n.datepicker._selectMonthYear(i, this, "Y"), !1
                    }
                };
                n(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (n) {
            var b, s, rt, h, ut, k, ft, et, ri, c, ot, ui, fi, ei, oi, st, g, si, ht, nt, o, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, i, bt, kt, d, a, it, dt = new Date,
                gt = this._daylightSavingAdjust(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())),
                f = this._get(n, "isRTL"),
                li = this._get(n, "showButtonPanel"),
                hi = this._get(n, "hideIfNoPrevNext"),
                ni = this._get(n, "navigationAsDateFormat"),
                e = this._getNumberOfMonths(n),
                ai = this._get(n, "showCurrentAtPos"),
                ci = this._get(n, "stepMonths"),
                ti = 1 !== e[0] || 1 !== e[1],
                ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear, n.currentMonth, n.currentDay) : new Date(9999, 9, 9)),
                w = this._getMinMaxDate(n, "min"),
                v = this._getMinMaxDate(n, "max"),
                t = n.drawMonth - ai,
                r = n.drawYear;
            if (0 > t && (t += 12, r--), v)
                for (b = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth() - e[0] * e[1] + 1, v.getDate())), b = w && w > b ? w : b; this._daylightSavingAdjust(new Date(r, t, 1)) > b;) t--, 0 > t && (t = 11, r--);
            for (n.drawMonth = t, n.drawYear = r, s = this._get(n, "prevText"), s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r, t - ci, 1)), this._getFormatConfig(n)) : s, rt = this._canAdjustMonth(n, -1, r, t) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>", h = this._get(n, "nextText"), h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r, t + ci, 1)), this._getFormatConfig(n)) : h, ut = this._canAdjustMonth(n, 1, r, t) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>", k = this._get(n, "currentText"), ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt, k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k, et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>", ri = li ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (f ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (f ? "" : et) + "<\/div>" : "", c = parseInt(this._get(n, "firstDay"), 10), c = isNaN(c) ? 0 : c, ot = this._get(n, "showWeek"), ui = this._get(n, "dayNames"), fi = this._get(n, "dayNamesMin"), ei = this._get(n, "monthNames"), oi = this._get(n, "monthNamesShort"), st = this._get(n, "beforeShowDay"), g = this._get(n, "showOtherMonths"), si = this._get(n, "selectOtherMonths"), ht = this._getDefaultDate(n), nt = "", y = 0; e[0] > y; y++) {
                for (ct = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
                    if (lt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay)), l = " ui-corner-all", u = "", ti) {
                        if (u += "<div class='ui-datepicker-group", e[1] > 1) switch (p) {
                            case 0:
                                u += " ui-datepicker-group-first";
                                l = " ui-corner-" + (f ? "right" : "left");
                                break;
                            case e[1] - 1:
                                u += " ui-datepicker-group-last";
                                l = " ui-corner-" + (f ? "left" : "right");
                                break;
                            default:
                                u += " ui-datepicker-group-middle";
                                l = ""
                        }
                        u += "'>"
                    }
                    for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && 0 === y ? f ? ut : rt : "") + (/all|right/.test(l) && 0 === y ? f ? rt : ut : "") + this._generateMonthYearHeader(n, t, r, w, v, y > 0 || p > 0, ei, oi) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>", at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "", o = 0; 7 > o; o++) vt = (o + c) % 7, at += "<th scope='col'" + ((o + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ui[vt] + "'>" + fi[vt] + "<\/span><\/th>";
                    for (u += at + "<\/tr><\/thead><tbody>", yt = this._getDaysInMonth(r, t), r === n.selectedYear && t === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)), pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7, tt = Math.ceil((pt + yt) / 7), wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt, this.maxRows = wt, i = this._daylightSavingAdjust(new Date(r, t, 1 - pt)), bt = 0; wt > bt; bt++) {
                        for (u += "<tr>", kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(i) + "<\/td>" : "", o = 0; 7 > o; o++) d = st ? st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""], a = i.getMonth() !== t, it = a && !si || !d[0] || w && w > i || v && i > v, kt += "<td class='" + ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (i.getTime() === lt.getTime() && t === n.selectedMonth && n._keyEvent || ht.getTime() === i.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (i.getTime() === ii.getTime() ? " " + this._currentClass : "") + (i.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + (a && !g || !d[2] ? "" : " title='" + d[2].replace(/'/g, "&#39;") + "'") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + i.getMonth() + "' data-year='" + i.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'>" + i.getDate() + "<\/span>" : "<a class='ui-state-default" + (i.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (i.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'>" + i.getDate() + "<\/a>") + "<\/td>", i.setDate(i.getDate() + 1), i = this._daylightSavingAdjust(i);
                        u += kt + "<\/tr>"
                    }
                    t++;
                    t > 11 && (t = 0, r++);
                    u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (e[0] > 0 && p === e[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : "");
                    ct += u
                }
                nt += ct
            }
            return nt += ri, n._keyEvent = !1, nt
        },
        _generateMonthYearHeader: function (n, t, i, r, u, f, e, o) {
            var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"),
                b = this._get(n, "changeYear"),
                g = this._get(n, "showMonthAfterYear"),
                c = "<div class='ui-datepicker-title'>",
                l = "";
            if (f || !w) l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
            else {
                for (k = r && r.getFullYear() === i, d = u && u.getFullYear() === i, l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)(!k || h >= r.getMonth()) && (!d || u.getMonth() >= h) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
                l += "<\/select>"
            }
            if (g || (c += l + (!f && w && b ? "" : "&#xa0;")), !n.yearshtml)
                if (n.yearshtml = "", f || !b) c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
                else {
                    for (v = this._get(n, "yearRange").split(":"), y = (new Date).getFullYear(), p = function (n) {
                            var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
                            return isNaN(t) ? y : t
                        }, s = p(v[0]), a = Math.max(s, p(v[1] || "")), s = r ? Math.max(s, r.getFullYear()) : s, a = u ? Math.min(a, u.getFullYear()) : a, n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; a >= s; s++) n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
                    n.yearshtml += "<\/select>";
                    c += n.yearshtml;
                    n.yearshtml = null
                }
            return c += this._get(n, "yearSuffix"), g && (c += (!f && w && b ? "" : "&#xa0;") + l), c + "<\/div>"
        },
        _adjustInstDate: function (n, t, i) {
            var u = n.drawYear + ("Y" === i ? t : 0),
                f = n.drawMonth + ("M" === i ? t : 0),
                e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + ("D" === i ? t : 0),
                r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
            n.selectedDay = r.getDate();
            n.drawMonth = n.selectedMonth = r.getMonth();
            n.drawYear = n.selectedYear = r.getFullYear();
            ("M" === i || "Y" === i) && this._notifyChange(n)
        },
        _restrictMinMax: function (n, t) {
            var i = this._getMinMaxDate(n, "min"),
                r = this._getMinMaxDate(n, "max"),
                u = i && i > t ? i : t;
            return r && u > r ? r : u
        },
        _notifyChange: function (n) {
            var t = this._get(n, "onChangeMonthYear");
            t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
        },
        _getNumberOfMonths: function (n) {
            var t = this._get(n, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function (n, t) {
            return this._determineDate(n, this._get(n, t + "Date"), null)
        },
        _getDaysInMonth: function (n, t) {
            return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function (n, t) {
            return new Date(n, t, 1).getDay()
        },
        _canAdjustMonth: function (n, t, i, r) {
            var f = this._getNumberOfMonths(n),
                u = this._daylightSavingAdjust(new Date(i, r + (0 > t ? t : f[0] * f[1]), 1));
            return 0 > t && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u)
        },
        _isInRange: function (n, t) {
            var i, f, e = this._getMinMaxDate(n, "min"),
                o = this._getMinMaxDate(n, "max"),
                r = null,
                u = null,
                s = this._get(n, "yearRange");
            return s && (i = s.split(":"), f = (new Date).getFullYear(), r = parseInt(i[0], 10), u = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += f), i[1].match(/[+\-].*/) && (u += f)), (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || u >= t.getFullYear())
        },
        _getFormatConfig: function (n) {
            var t = this._get(n, "shortYearCutoff");
            return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                shortYearCutoff: t,
                dayNamesShort: this._get(n, "dayNamesShort"),
                dayNames: this._get(n, "dayNames"),
                monthNamesShort: this._get(n, "monthNamesShort"),
                monthNames: this._get(n, "monthNames")
            }
        },
        _formatDate: function (n, t, i, r) {
            t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
            var u = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
            return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
        }
    });
    n.fn.datepicker = function (t) {
        if (!this.length) return this;
        n.datepicker.initialized || (n(document).mousedown(n.datepicker._checkExternalClick), n.datepicker.initialized = !0);
        0 === n("#" + n.datepicker._mainDivId).length && n("body").append(n.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function () {
            "string" == typeof t ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
        }) : n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i))
    };
    n.datepicker = new f;
    n.datepicker.initialized = !1;
    n.datepicker.uuid = (new Date).getTime();
    n.datepicker.version = "1.11.4";
    n.datepicker
}),
function (n) {
    function t() {
        this.regional = [];
        this.regional[""] = {
            currentText: "Now",
            closeText: "Done",
            ampm: !1,
            amNames: ["AM", "A"],
            pmNames: ["PM", "P"],
            timeFormat: "hh:mm tt",
            timeSuffix: "",
            timeOnlyTitle: "Choose Time",
            timeText: "Time",
            hourText: "Hour",
            minuteText: "Minute",
            secondText: "Second",
            millisecText: "Millisecond",
            timezoneText: "Time Zone"
        };
        this._defaults = {
            showButtonPanel: !0,
            timeOnly: !1,
            showHour: !0,
            showMinute: !0,
            showSecond: !1,
            showMillisec: !1,
            showTimezone: !1,
            showTime: !0,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            stepMillisec: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: "+0000",
            hourMin: 0,
            minuteMin: 0,
            secondMin: 0,
            millisecMin: 0,
            hourMax: 23,
            minuteMax: 59,
            secondMax: 59,
            millisecMax: 999,
            minDateTime: null,
            maxDateTime: null,
            onSelect: null,
            hourGrid: 0,
            minuteGrid: 0,
            secondGrid: 0,
            millisecGrid: 0,
            alwaysSetTime: !0,
            separator: " ",
            altFieldTimeOnly: !0,
            showTimepicker: !0,
            timezoneIso8609: !1,
            timezoneList: null,
            addSliderAccess: !1,
            sliderAccessArgs: null
        };
        n.extend(this._defaults, this.regional[""])
    }

    function i(t, i) {
        n.extend(t, i);
        for (var r in i)(i[r] === null || i[r] === undefined) && (t[r] = i[r]);
        return t
    }
    n.extend(n.ui, {
        timepicker: {
            version: "0.9.9"
        }
    });
    n.extend(t.prototype, {
        $input: null,
        $altInput: null,
        $timeObj: null,
        inst: null,
        hour_slider: null,
        minute_slider: null,
        second_slider: null,
        millisec_slider: null,
        timezone_select: null,
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0,
        timezone: "+0000",
        hourMinOriginal: null,
        minuteMinOriginal: null,
        secondMinOriginal: null,
        millisecMinOriginal: null,
        hourMaxOriginal: null,
        minuteMaxOriginal: null,
        secondMaxOriginal: null,
        millisecMaxOriginal: null,
        ampm: "",
        formattedDate: "",
        formattedTime: "",
        formattedDateTime: "",
        timezoneList: null,
        setDefaults: function (n) {
            return i(this._defaults, n || {}), this
        },
        _newInst: function ($input, o) {
            var tp_inst = new t,
                inlineSettings = {},
                attrName, attrValue, timezoneList, i;
            for (attrName in this._defaults)
                if (attrValue = $input.attr("time:" + attrName), attrValue) try {
                    inlineSettings[attrName] = eval(attrValue)
                } catch (err) {
                    inlineSettings[attrName] = attrValue
                }
            if (tp_inst._defaults = n.extend({}, this._defaults, inlineSettings, o, {
                    beforeShow: function (t, i) {
                        if (n.isFunction(o.beforeShow)) return o.beforeShow(t, i, tp_inst)
                    },
                    onChangeMonthYear: function (t, i, r) {
                        tp_inst._updateDateTime(r);
                        n.isFunction(o.onChangeMonthYear) && o.onChangeMonthYear.call($input[0], t, i, r, tp_inst)
                    },
                    onClose: function (t, i) {
                        tp_inst.timeDefined === !0 && $input.val() != "" && tp_inst._updateDateTime(i);
                        n.isFunction(o.onClose) && o.onClose.call($input[0], t, i, tp_inst)
                    },
                    timepicker: tp_inst
                }), tp_inst.amNames = n.map(tp_inst._defaults.amNames, function (n) {
                    return n.toUpperCase()
                }), tp_inst.pmNames = n.map(tp_inst._defaults.pmNames, function (n) {
                    return n.toUpperCase()
                }), tp_inst._defaults.timezoneList === null) {
                for (timezoneList = [], i = -11; i <= 12; i++) timezoneList.push((i >= 0 ? "+" : "-") + ("0" + Math.abs(i).toString()).slice(-2) + "00");
                tp_inst._defaults.timezoneIso8609 && (timezoneList = n.map(timezoneList, function (n) {
                    return n == "+0000" ? "Z" : n.substring(0, 3) + ":" + n.substring(3)
                }));
                tp_inst._defaults.timezoneList = timezoneList
            }
            return tp_inst.hour = tp_inst._defaults.hour, tp_inst.minute = tp_inst._defaults.minute, tp_inst.second = tp_inst._defaults.second, tp_inst.millisec = tp_inst._defaults.millisec, tp_inst.ampm = "", tp_inst.$input = $input, o.altField && (tp_inst.$altInput = n(o.altField).css({
                cursor: "pointer"
            }).focus(function () {
                $input.trigger("focus")
            })), (tp_inst._defaults.minDate == 0 || tp_inst._defaults.minDateTime == 0) && (tp_inst._defaults.minDate = new Date), (tp_inst._defaults.maxDate == 0 || tp_inst._defaults.maxDateTime == 0) && (tp_inst._defaults.maxDate = new Date), tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date && (tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())), tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date && (tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())), tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date && (tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())), tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date && (tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())), tp_inst
        },
        _addTimePicker: function (n) {
            var t = this.$altInput && this._defaults.altFieldTimeOnly ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
            this.timeDefined = this._parseTime(t);
            this._limitMinMaxDateTime(n, !1);
            this._injectTimePicker()
        },
        _parseTime: function (t, i) {
            var o = this._defaults.timeFormat.toString().replace(/h{1,2}/ig, "(\\d?\\d)").replace(/m{1,2}/ig, "(\\d?\\d)").replace(/s{1,2}/ig, "(\\d?\\d)").replace(/l{1}/ig, "(\\d?\\d?\\d)").replace(/t{1,2}/ig, this._getPatternAmpm()).replace(/z{1}/ig, "(z|[-+]\\d\\d:?\\d\\d)?").replace(/\s/g, "\\s?") + this._defaults.timeSuffix + "$",
                r = this._getFormatPositions(),
                e = "",
                u, s, h, f;
            if (this.inst || (this.inst = n.datepicker._getInst(this.$input[0])), (i || !this._defaults.timeOnly) && (s = n.datepicker._get(this.inst, "dateFormat"), h = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"), o = "^.{" + s.length + ",}?" + this._defaults.separator.replace(h, "\\$&") + o), u = t.match(new RegExp(o, "i")), u) {
                if (r.t !== -1 && (u[r.t] === undefined || u[r.t].length === 0 ? (e = "", this.ampm = "") : (e = n.inArray(u[r.t].toUpperCase(), this.amNames) !== -1 ? "AM" : "PM", this.ampm = this._defaults[e == "AM" ? "amNames" : "pmNames"][0])), r.h !== -1 && (this.hour = e == "AM" && u[r.h] == "12" ? 0 : e == "PM" && u[r.h] != "12" ? (parseFloat(u[r.h]) + 12).toFixed(0) : Number(u[r.h])), r.m !== -1 && (this.minute = Number(u[r.m])), r.s !== -1 && (this.second = Number(u[r.s])), r.l !== -1 && (this.millisec = Number(u[r.l])), r.z !== -1 && u[r.z] !== undefined) {
                    f = u[r.z].toUpperCase();
                    switch (f.length) {
                        case 1:
                            f = this._defaults.timezoneIso8609 ? "Z" : "+0000";
                            break;
                        case 5:
                            this._defaults.timezoneIso8609 && (f = f.substring(1) == "0000" ? "Z" : f.substring(0, 3) + ":" + f.substring(3));
                            break;
                        case 6:
                            this._defaults.timezoneIso8609 ? f.substring(1) == "00:00" && (f = "Z") : f = f == "Z" || f.substring(1) == "00:00" ? "+0000" : f.replace(/:/, "")
                    }
                    this.timezone = f
                }
                return !0
            }
            return !1
        },
        _getPatternAmpm: function () {
            var t = [];
            return o = this._defaults, o.amNames && n.merge(t, o.amNames), o.pmNames && n.merge(t, o.pmNames), t = n.map(t, function (n) {
                return n.replace(/[.*+?|()\[\]{}\\]/g, "\\$&")
            }), "(" + t.join("|") + ")?"
        },
        _getFormatPositions: function () {
            var t = this._defaults.timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z)/g),
                i = {
                    h: -1,
                    m: -1,
                    s: -1,
                    l: -1,
                    t: -1,
                    z: -1
                },
                n;
            if (t)
                for (n = 0; n < t.length; n++) i[t[n].toString().charAt(0)] == -1 && (i[t[n].toString().charAt(0)] = n + 1);
            return i
        },
        _injectTimePicker: function () {
            var v = this.inst.dpDiv,
                t = this._defaults,
                r = this,
                w = parseInt(t.hourMax - (t.hourMax - t.hourMin) % t.stepHour, 10),
                b = parseInt(t.minuteMax - (t.minuteMax - t.minuteMin) % t.stepMinute, 10),
                nt = parseInt(t.secondMax - (t.secondMax - t.secondMin) % t.stepSecond, 10),
                tt = parseInt(t.millisecMax - (t.millisecMax - t.millisecMin) % t.stepMillisec, 10),
                u = this.inst.id.toString().replace(/([^A-Za-z0-9_])/g, ""),
                o, s, h, c, l, g, it, a, rt;
            if (v.find("div#ui-timepicker-div-" + u).length === 0 && t.showTimepicker) {
                var f = ' style="display:none;"',
                    i = '<div class="ui-timepicker-div" id="ui-timepicker-div-' + u + '"><dl><dt class="ui_tpicker_time_label" id="ui_tpicker_time_label_' + u + '"' + (t.showTime ? "" : f) + ">" + t.timeText + '<\/dt><dd class="ui_tpicker_time" id="ui_tpicker_time_' + u + '"' + (t.showTime ? "" : f) + '><\/dd><dt class="ui_tpicker_hour_label" id="ui_tpicker_hour_label_' + u + '"' + (t.showHour ? "" : f) + ">" + t.hourText + "<\/dt>",
                    y = 0,
                    p = 0,
                    k = 0,
                    d = 0,
                    e;
                if (i += '<dd class="ui_tpicker_hour"><div id="ui_tpicker_hour_' + u + '"' + (t.showHour ? "" : f) + "><\/div>", t.showHour && t.hourGrid > 0) {
                    for (i += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>', o = t.hourMin; o <= w; o += parseInt(t.hourGrid, 10)) y++, s = t.ampm && o > 12 ? o - 12 : o, s < 10 && (s = "0" + s), t.ampm && (o == 0 ? s = "12a" : s += o < 12 ? "a" : "p"), i += "<td>" + s + "<\/td>";
                    i += "<\/tr><\/table><\/div>"
                }
                if (i += "<\/dd>", i += '<dt class="ui_tpicker_minute_label" id="ui_tpicker_minute_label_' + u + '"' + (t.showMinute ? "" : f) + ">" + t.minuteText + '<\/dt><dd class="ui_tpicker_minute"><div id="ui_tpicker_minute_' + u + '"' + (t.showMinute ? "" : f) + "><\/div>", t.showMinute && t.minuteGrid > 0) {
                    for (i += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>', h = t.minuteMin; h <= b; h += parseInt(t.minuteGrid, 10)) p++, i += "<td>" + (h < 10 ? "0" : "") + h + "<\/td>";
                    i += "<\/tr><\/table><\/div>"
                }
                if (i += "<\/dd>", i += '<dt class="ui_tpicker_second_label" id="ui_tpicker_second_label_' + u + '"' + (t.showSecond ? "" : f) + ">" + t.secondText + '<\/dt><dd class="ui_tpicker_second"><div id="ui_tpicker_second_' + u + '"' + (t.showSecond ? "" : f) + "><\/div>", t.showSecond && t.secondGrid > 0) {
                    for (i += '<div style="padding-left: 1px"><table><tr>', c = t.secondMin; c <= nt; c += parseInt(t.secondGrid, 10)) k++, i += "<td>" + (c < 10 ? "0" : "") + c + "<\/td>";
                    i += "<\/tr><\/table><\/div>"
                }
                if (i += "<\/dd>", i += '<dt class="ui_tpicker_millisec_label" id="ui_tpicker_millisec_label_' + u + '"' + (t.showMillisec ? "" : f) + ">" + t.millisecText + '<\/dt><dd class="ui_tpicker_millisec"><div id="ui_tpicker_millisec_' + u + '"' + (t.showMillisec ? "" : f) + "><\/div>", t.showMillisec && t.millisecGrid > 0) {
                    for (i += '<div style="padding-left: 1px"><table><tr>', l = t.millisecMin; l <= tt; l += parseInt(t.millisecGrid, 10)) d++, i += "<td>" + (l < 10 ? "0" : "") + l + "<\/td>";
                    i += "<\/tr><\/table><\/div>"
                }
                i += "<\/dd>";
                i += '<dt class="ui_tpicker_timezone_label" id="ui_tpicker_timezone_label_' + u + '"' + (t.showTimezone ? "" : f) + ">" + t.timezoneText + "<\/dt>";
                i += '<dd class="ui_tpicker_timezone" id="ui_tpicker_timezone_' + u + '"' + (t.showTimezone ? "" : f) + "><\/dd>";
                i += "<\/dl><\/div>";
                $tp = n(i);
                t.timeOnly === !0 && ($tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + t.timeOnlyTitle + "<\/div><\/div>"), v.find(".ui-datepicker-header, .ui-datepicker-calendar").hide());
                this.hour_slider = $tp.find("#ui_tpicker_hour_" + u).slider({
                    orientation: "horizontal",
                    value: this.hour,
                    min: t.hourMin,
                    max: w,
                    step: t.stepHour,
                    slide: function (n, t) {
                        r.hour_slider.slider("option", "value", t.value);
                        r._onTimeChange()
                    }
                });
                this.minute_slider = $tp.find("#ui_tpicker_minute_" + u).slider({
                    orientation: "horizontal",
                    value: this.minute,
                    min: t.minuteMin,
                    max: b,
                    step: t.stepMinute,
                    slide: function (n, t) {
                        r.minute_slider.slider("option", "value", t.value);
                        r._onTimeChange()
                    }
                });
                this.second_slider = $tp.find("#ui_tpicker_second_" + u).slider({
                    orientation: "horizontal",
                    value: this.second,
                    min: t.secondMin,
                    max: nt,
                    step: t.stepSecond,
                    slide: function (n, t) {
                        r.second_slider.slider("option", "value", t.value);
                        r._onTimeChange()
                    }
                });
                this.millisec_slider = $tp.find("#ui_tpicker_millisec_" + u).slider({
                    orientation: "horizontal",
                    value: this.millisec,
                    min: t.millisecMin,
                    max: tt,
                    step: t.stepMillisec,
                    slide: function (n, t) {
                        r.millisec_slider.slider("option", "value", t.value);
                        r._onTimeChange()
                    }
                });
                this.timezone_select = $tp.find("#ui_tpicker_timezone_" + u).append("<select><\/select>").find("select");
                n.fn.append.apply(this.timezone_select, n.map(t.timezoneList, function (t) {
                    return n("<option />").val(typeof t == "object" ? t.value : t).text(typeof t == "object" ? t.label : t)
                }));
                this.timezone_select.val(typeof this.timezone != "undefined" && this.timezone != null && this.timezone != "" ? this.timezone : t.timezone);
                this.timezone_select.change(function () {
                    r._onTimeChange()
                });
                t.showHour && t.hourGrid > 0 && (e = 100 * y * t.hourGrid / (w - t.hourMin), $tp.find(".ui_tpicker_hour table").css({
                    width: e + "%",
                    marginLeft: e / (-2 * y) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function () {
                    n(this).click(function () {
                        var u = n(this).html(),
                            f, i;
                        t.ampm && (f = u.substring(2).toLowerCase(), i = parseInt(u.substring(0, 2), 10), u = f == "a" ? i == 12 ? 0 : i : i == 12 ? 12 : i + 12);
                        r.hour_slider.slider("option", "value", u);
                        r._onTimeChange();
                        r._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / y + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                }));
                t.showMinute && t.minuteGrid > 0 && (e = 100 * p * t.minuteGrid / (b - t.minuteMin), $tp.find(".ui_tpicker_minute table").css({
                    width: e + "%",
                    marginLeft: e / (-2 * p) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function () {
                    n(this).click(function () {
                        r.minute_slider.slider("option", "value", n(this).html());
                        r._onTimeChange();
                        r._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / p + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                }));
                t.showSecond && t.secondGrid > 0 && $tp.find(".ui_tpicker_second table").css({
                    width: e + "%",
                    marginLeft: e / (-2 * k) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function () {
                    n(this).click(function () {
                        r.second_slider.slider("option", "value", n(this).html());
                        r._onTimeChange();
                        r._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / k + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                });
                t.showMillisec && t.millisecGrid > 0 && $tp.find(".ui_tpicker_millisec table").css({
                    width: e + "%",
                    marginLeft: e / (-2 * d) + "%",
                    borderCollapse: "collapse"
                }).find("td").each(function () {
                    n(this).click(function () {
                        r.millisec_slider.slider("option", "value", n(this).html());
                        r._onTimeChange();
                        r._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / d + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    })
                });
                g = v.find(".ui-datepicker-buttonpane");
                g.length ? g.before($tp) : v.append($tp);
                this.$timeObj = $tp.find("#ui_tpicker_time_" + u);
                this.inst !== null && (it = this.timeDefined, this._onTimeChange(), this.timeDefined = it);
                a = function () {
                    r._onSelectHandler()
                };
                this.hour_slider.bind("slidestop", a);
                this.minute_slider.bind("slidestop", a);
                this.second_slider.bind("slidestop", a);
                this.millisec_slider.bind("slidestop", a);
                this._defaults.addSliderAccess && (rt = this._defaults.sliderAccessArgs, setTimeout(function () {
                    if ($tp.find(".ui-slider-access").length == 0) {
                        $tp.find(".ui-slider:visible").sliderAccess(rt);
                        var t = $tp.find(".ui-slider-access:eq(0)").outerWidth(!0);
                        t && $tp.find("table:visible").each(function () {
                            var i = n(this),
                                r = i.outerWidth(),
                                f = i.css("marginLeft").toString().replace("%", ""),
                                u = r - t,
                                e = f * u / r + "%";
                            i.css({
                                width: u,
                                marginLeft: e
                            })
                        })
                    }
                }, 0))
            }
        },
        _limitMinMaxDateTime: function (t, i) {
            var r = this._defaults,
                e = new Date(t.selectedYear, t.selectedMonth, t.selectedDay),
                u, o, f, s;
            if (this._defaults.showTimepicker && (n.datepicker._get(t, "minDateTime") !== null && n.datepicker._get(t, "minDateTime") !== undefined && e && (u = n.datepicker._get(t, "minDateTime"), o = new Date(u.getFullYear(), u.getMonth(), u.getDate(), 0, 0, 0, 0), (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null) && (this.hourMinOriginal = r.hourMin, this.minuteMinOriginal = r.minuteMin, this.secondMinOriginal = r.secondMin, this.millisecMinOriginal = r.millisecMin), t.settings.timeOnly || o.getTime() == e.getTime() ? (this._defaults.hourMin = u.getHours(), this.hour <= this._defaults.hourMin ? (this.hour = this._defaults.hourMin, this._defaults.minuteMin = u.getMinutes(), this.minute <= this._defaults.minuteMin ? (this.minute = this._defaults.minuteMin, this._defaults.secondMin = u.getSeconds()) : this.second <= this._defaults.secondMin ? (this.second = this._defaults.secondMin, this._defaults.millisecMin = u.getMilliseconds()) : (this.millisec < this._defaults.millisecMin && (this.millisec = this._defaults.millisecMin), this._defaults.millisecMin = this.millisecMinOriginal)) : (this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal)) : (this._defaults.hourMin = this.hourMinOriginal, this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal)), n.datepicker._get(t, "maxDateTime") !== null && n.datepicker._get(t, "maxDateTime") !== undefined && e && (f = n.datepicker._get(t, "maxDateTime"), s = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 0, 0, 0, 0), (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null) && (this.hourMaxOriginal = r.hourMax, this.minuteMaxOriginal = r.minuteMax, this.secondMaxOriginal = r.secondMax, this.millisecMaxOriginal = r.millisecMax), t.settings.timeOnly || s.getTime() == e.getTime() ? (this._defaults.hourMax = f.getHours(), this.hour >= this._defaults.hourMax ? (this.hour = this._defaults.hourMax, this._defaults.minuteMax = f.getMinutes(), this.minute >= this._defaults.minuteMax ? (this.minute = this._defaults.minuteMax, this._defaults.secondMax = f.getSeconds()) : this.second >= this._defaults.secondMax ? (this.second = this._defaults.secondMax, this._defaults.millisecMax = f.getMilliseconds()) : (this.millisec > this._defaults.millisecMax && (this.millisec = this._defaults.millisecMax), this._defaults.millisecMax = this.millisecMaxOriginal)) : (this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal)) : (this._defaults.hourMax = this.hourMaxOriginal, this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal)), i !== undefined && i === !0)) {
                var h = parseInt(this._defaults.hourMax - (this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour, 10),
                    c = parseInt(this._defaults.minuteMax - (this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute, 10),
                    l = parseInt(this._defaults.secondMax - (this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond, 10),
                    a = parseInt(this._defaults.millisecMax - (this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec, 10);
                this.hour_slider && this.hour_slider.slider("option", {
                    min: this._defaults.hourMin,
                    max: h
                }).slider("value", this.hour);
                this.minute_slider && this.minute_slider.slider("option", {
                    min: this._defaults.minuteMin,
                    max: c
                }).slider("value", this.minute);
                this.second_slider && this.second_slider.slider("option", {
                    min: this._defaults.secondMin,
                    max: l
                }).slider("value", this.second);
                this.millisec_slider && this.millisec_slider.slider("option", {
                    min: this._defaults.millisecMin,
                    max: a
                }).slider("value", this.millisec)
            }
        },
        _onTimeChange: function () {
            var t = this.hour_slider ? this.hour_slider.slider("value") : !1,
                i = this.minute_slider ? this.minute_slider.slider("value") : !1,
                r = this.second_slider ? this.second_slider.slider("value") : !1,
                u = this.millisec_slider ? this.millisec_slider.slider("value") : !1,
                f = this.timezone_select ? this.timezone_select.val() : !1,
                e = this._defaults,
                s, o;
            typeof t == "object" && (t = !1);
            typeof i == "object" && (i = !1);
            typeof r == "object" && (r = !1);
            typeof u == "object" && (u = !1);
            typeof f == "object" && (f = !1);
            t !== !1 && (t = parseInt(t, 10));
            i !== !1 && (i = parseInt(i, 10));
            r !== !1 && (r = parseInt(r, 10));
            u !== !1 && (u = parseInt(u, 10));
            s = e[t < 12 ? "amNames" : "pmNames"][0];
            o = t != this.hour || i != this.minute || r != this.second || u != this.millisec || this.ampm.length > 0 && t < 12 != (n.inArray(this.ampm.toUpperCase(), this.amNames) !== -1) || f != this.timezone;
            o && (t !== !1 && (this.hour = t), i !== !1 && (this.minute = i), r !== !1 && (this.second = r), u !== !1 && (this.millisec = u), f !== !1 && (this.timezone = f), this.inst || (this.inst = n.datepicker._getInst(this.$input[0])), this._limitMinMaxDateTime(this.inst, !0));
            e.ampm && (this.ampm = s);
            this.formattedTime = n.datepicker.formatTime(this._defaults.timeFormat, this, this._defaults);
            this.$timeObj && this.$timeObj.text(this.formattedTime + e.timeSuffix);
            this.timeDefined = !0;
            o && this._updateDateTime()
        },
        _onSelectHandler: function () {
            var n = this._defaults.onSelect,
                t = this.$input ? this.$input[0] : null;
            n && t && n.apply(t, [this.formattedDateTime, this])
        },
        _formatTime: function (t, i) {
            t = t || {
                hour: this.hour,
                minute: this.minute,
                second: this.second,
                millisec: this.millisec,
                ampm: this.ampm,
                timezone: this.timezone
            };
            var r = (i || this._defaults.timeFormat).toString();
            if (r = n.datepicker.formatTime(r, t, this._defaults), arguments.length) return r;
            this.formattedTime = r
        },
        _updateDateTime: function (t) {
            var i;
            t = this.inst || t;
            var r = n.datepicker._daylightSavingAdjust(new Date(t.selectedYear, t.selectedMonth, t.selectedDay)),
                u = n.datepicker._get(t, "dateFormat"),
                f = n.datepicker._getFormatConfig(t),
                e = r !== null && this.timeDefined;
            (this.formattedDate = n.datepicker.formatDate(u, r === null ? new Date : r, f), i = this.formattedDate, t.lastVal !== undefined && t.lastVal.length > 0 && this.$input.val().length === 0) || (this._defaults.timeOnly === !0 ? i = this.formattedTime : this._defaults.timeOnly !== !0 && (this._defaults.alwaysSetTime || e) && (i += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix), this.formattedDateTime = i, this._defaults.showTimepicker ? this.$altInput && this._defaults.altFieldTimeOnly === !0 ? (this.$altInput.val(this.formattedTime), this.$input.val(this.formattedDate)) : this.$altInput ? (this.$altInput.val(i), this.$input.val(i)) : this.$input.val(i) : this.$input.val(this.formattedDate), this.$input.trigger("change"))
        }
    });
    n.fn.extend({
        timepicker: function (t) {
            t = t || {};
            var i = arguments;
            return typeof t == "object" && (i[0] = n.extend(t, {
                timeOnly: !0
            })), n(this).each(function () {
                n.fn.datetimepicker.apply(n(this), i)
            })
        },
        datetimepicker: function (t) {
            t = t || {};
            var r = this,
                i = arguments;
            return typeof t == "string" ? t == "getDate" ? n.fn.datepicker.apply(n(this[0]), i) : this.each(function () {
                var t = n(this);
                t.datepicker.apply(t, i)
            }) : this.each(function () {
                var i = n(this);
                i.datepicker(n.timepicker._newInst(i, t)._defaults)
            })
        }
    });
    n.datepicker.formatTime = function (t, i, r) {
        r = r || {};
        r = n.extend(n.timepicker._defaults, r);
        i = n.extend({
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            timezone: "+0000"
        }, i);
        var e = t,
            f = r.amNames[0],
            u = parseInt(i.hour, 10);
        return r.ampm && (u > 11 && (f = r.pmNames[0], u > 12 && (u = u % 12)), u === 0 && (u = 12)), e = e.replace(/(?:hh?|mm?|ss?|[tT]{1,2}|[lz])/g, function (n) {
            switch (n.toLowerCase()) {
                case "hh":
                    return ("0" + u).slice(-2);
                case "h":
                    return u;
                case "mm":
                    return ("0" + i.minute).slice(-2);
                case "m":
                    return i.minute;
                case "ss":
                    return ("0" + i.second).slice(-2);
                case "s":
                    return i.second;
                case "l":
                    return ("00" + i.millisec).slice(-3);
                case "z":
                    return i.timezone;
                case "t":
                case "tt":
                    return r.ampm ? (n.length == 1 && (f = f.charAt(0)), n.charAt(0) == "T" ? f.toUpperCase() : f.toLowerCase()) : ""
            }
        }), n.trim(e)
    };
    n.datepicker._base_selectDate = n.datepicker._selectDate;
    n.datepicker._selectDate = function (t, i) {
        var r = this._getInst(n(t)[0]),
            u = this._get(r, "timepicker");
        u ? (u._limitMinMaxDateTime(r, !0), r.inline = r.stay_open = !0, this._base_selectDate(t, i), r.inline = r.stay_open = !1, this._notifyChange(r), this._updateDatepicker(r)) : this._base_selectDate(t, i)
    };
    n.datepicker._base_updateDatepicker = n.datepicker._updateDatepicker;
    n.datepicker._updateDatepicker = function (t) {
        var r = t.input[0],
            i;
        n.datepicker._curInst && n.datepicker._curInst != t && n.datepicker._datepickerShowing && n.datepicker._lastInput != r || (typeof t.stay_open != "boolean" || t.stay_open === !1) && (this._base_updateDatepicker(t), i = this._get(t, "timepicker"), i && i._addTimePicker(t))
    };
    n.datepicker._base_doKeyPress = n.datepicker._doKeyPress;
    n.datepicker._doKeyPress = function (t) {
        var u = n.datepicker._getInst(t.target),
            i = n.datepicker._get(u, "timepicker");
        if (i && n.datepicker._get(u, "constrainInput")) {
            var r = i._defaults.ampm,
                f = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")),
                o = i._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, r ? "APM" : "").replace(/Tt/g, r ? "AaPpMm" : "").replace(/tT/g, r ? "AaPpMm" : "").replace(/T/g, r ? "AP" : "").replace(/tt/g, r ? "apm" : "").replace(/t/g, r ? "ap" : "") + " " + i._defaults.separator + i._defaults.timeSuffix + (i._defaults.showTimezone ? i._defaults.timezoneList.join("") : "") + i._defaults.amNames.join("") + i._defaults.pmNames.join("") + f,
                e = String.fromCharCode(t.charCode === undefined ? t.keyCode : t.charCode);
            return t.ctrlKey || e < " " || !f || o.indexOf(e) > -1
        }
        return n.datepicker._base_doKeyPress(t)
    };
    n.datepicker._base_doKeyUp = n.datepicker._doKeyUp;
    n.datepicker._doKeyUp = function (t) {
        var i = n.datepicker._getInst(t.target),
            r = n.datepicker._get(i, "timepicker");
        if (r && r._defaults.timeOnly && i.input.val() != i.lastVal) try {
            n.datepicker._updateDatepicker(i)
        } catch (u) {
            n.datepicker.log(u)
        }
        return n.datepicker._base_doKeyUp(t)
    };
    n.datepicker._base_gotoToday = n.datepicker._gotoToday;
    n.datepicker._gotoToday = function (t) {
        var u = this._getInst(n(t)[0]),
            s = u.dpDiv,
            f, r, i, o, e;
        this._base_gotoToday(t);
        f = new Date;
        r = this._get(u, "timepicker");
        r && r._defaults.showTimezone && r.timezone_select && (i = f.getTimezoneOffset(), o = i > 0 ? "-" : "+", i = Math.abs(i), e = i % 60, i = o + ("0" + (i - e) / 60).slice(-2) + ("0" + e).slice(-2), r._defaults.timezoneIso8609 && (i = i.substring(0, 3) + ":" + i.substring(3)), r.timezone_select.val(i));
        this._setTime(u, f);
        n(".ui-datepicker-today", s).click()
    };
    n.datepicker._disableTimepickerDatepicker = function (t) {
        var r = this._getInst(t),
            i = this._get(r, "timepicker");
        n(t).datepicker("getDate");
        i && (i._defaults.showTimepicker = !1, i._updateDateTime(r))
    };
    n.datepicker._enableTimepickerDatepicker = function (t) {
        var r = this._getInst(t),
            i = this._get(r, "timepicker");
        n(t).datepicker("getDate");
        i && (i._defaults.showTimepicker = !0, i._addTimePicker(r), i._updateDateTime(r))
    };
    n.datepicker._setTime = function (n, t) {
        var i = this._get(n, "timepicker");
        if (i) {
            var r = i._defaults,
                u = t ? t.getHours() : r.hour,
                f = t ? t.getMinutes() : r.minute,
                e = t ? t.getSeconds() : r.second,
                o = t ? t.getMilliseconds() : r.millisec;
            (u < r.hourMin || u > r.hourMax || f < r.minuteMin || f > r.minuteMax || e < r.secondMin || e > r.secondMax || o < r.millisecMin || o > r.millisecMax) && (u = r.hourMin, f = r.minuteMin, e = r.secondMin, o = r.millisecMin);
            i.hour = u;
            i.minute = f;
            i.second = e;
            i.millisec = o;
            i.hour_slider && i.hour_slider.slider("value", u);
            i.minute_slider && i.minute_slider.slider("value", f);
            i.second_slider && i.second_slider.slider("value", e);
            i.millisec_slider && i.millisec_slider.slider("value", o);
            i._onTimeChange();
            i._updateDateTime(n)
        }
    };
    n.datepicker._setTimeDatepicker = function (n, t, i) {
        var f = this._getInst(n),
            r = this._get(f, "timepicker"),
            u;
        r && (this._setDateFromField(f), t && (typeof t == "string" ? (r._parseTime(t, i), u = new Date, u.setHours(r.hour, r.minute, r.second, r.millisec)) : u = new Date(t.getTime()), u.toString() == "Invalid Date" && (u = undefined), this._setTime(f, u)))
    };
    n.datepicker._base_setDateDatepicker = n.datepicker._setDateDatepicker;
    n.datepicker._setDateDatepicker = function (n, t) {
        var i = this._getInst(n),
            r = t instanceof Date ? new Date(t.getTime()) : t;
        this._updateDatepicker(i);
        this._base_setDateDatepicker.apply(this, arguments);
        this._setTimeDatepicker(n, r, !0)
    };
    n.datepicker._base_getDateDatepicker = n.datepicker._getDateDatepicker;
    n.datepicker._getDateDatepicker = function (t, i) {
        var f = this._getInst(t),
            r = this._get(f, "timepicker"),
            u;
        return r ? (this._setDateFromField(f, i), u = this._getDate(f), u && r._parseTime(n(t).val(), r.timeOnly) && u.setHours(r.hour, r.minute, r.second, r.millisec), u) : this._base_getDateDatepicker(t, i)
    };
    n.datepicker._base_parseDate = n.datepicker.parseDate;
    n.datepicker.parseDate = function (n, t, i) {
        var u;
        try {
            u = this._base_parseDate(n, t, i)
        } catch (r) {
            if (r.indexOf(":") >= 0) u = this._base_parseDate(n, t.substring(0, t.length - (r.length - r.indexOf(":") - 2)), i);
            else throw r;
        }
        return u
    };
    n.datepicker._base_formatDate = n.datepicker._formatDate;
    n.datepicker._formatDate = function (n, t, i, r) {
        var u = this._get(n, "timepicker"),
            f;
        return u ? (t && (f = this._base_formatDate(n, t, i, r)), u._updateDateTime(n), u.$input.val()) : this._base_formatDate(n)
    };
    n.datepicker._base_optionDatepicker = n.datepicker._optionDatepicker;
    n.datepicker._optionDatepicker = function (n, t, i) {
        var o = this._getInst(n),
            f = this._get(o, "timepicker"),
            r, u, e;
        return (f && (typeof t == "string" ? t === "minDate" || t === "minDateTime" ? r = i : t === "maxDate" || t === "maxDateTime" ? u = i : t === "onSelect" && (e = i) : typeof t == "object" && (t.minDate ? r = t.minDate : t.minDateTime ? r = t.minDateTime : t.maxDate ? u = t.maxDate : t.maxDateTime && (u = t.maxDateTime)), r ? (r = r == 0 ? new Date : new Date(r), f._defaults.minDate = r, f._defaults.minDateTime = r) : u ? (u = u == 0 ? new Date : new Date(u), f._defaults.maxDate = u, f._defaults.maxDateTime = u) : e && (f._defaults.onSelect = e)), i === undefined) ? this._base_optionDatepicker(n, t) : this._base_optionDatepicker(n, t, i)
    };
    n.timepicker = new t;
    n.timepicker.version = "0.9.9"
}(jQuery);
jQuery(function (n) {
    n.datepicker.regional["zh-CN"] = {
        closeText: "关闭",
        prevText: "&#x3c;上月",
        nextText: "下月&#x3e;",
        currentText: "今天",
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        weekHeader: "周",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: "年"
    };
    n.datepicker.setDefaults(n.datepicker.regional["zh-CN"]);
    n.timepicker.regional["zh-CN"] = {
        timeOnlyTitle: "选择时间",
        timeText: "时间",
        hourText: "小时",
        minuteText: "分钟",
        secondText: "秒",
        millisecText: "毫秒",
        currentText: "现在",
        closeText: "完成",
        ampm: !1
    };
    n.timepicker.setDefaults(n.timepicker.regional["zh-CN"])
});
JSON || (JSON = {}),
    function () {
        "use strict";

        function i(n) {
            return n < 10 ? "0" + n : n
        }

        function o(n) {
            return e.lastIndex = 0, e.test(n) ? '"' + n.replace(e, function (n) {
                var t = s[n];
                return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + n + '"'
        }

        function u(i, f) {
            var s, l, h, a, v = n,
                c, e = f[i];
            e && typeof e == "object" && typeof e.toJSON == "function" && (e = e.toJSON(i));
            typeof t == "function" && (e = t.call(f, i, e));
            switch (typeof e) {
                case "string":
                    return o(e);
                case "number":
                    return isFinite(e) ? String(e) : "null";
                case "boolean":
                case "null":
                    return String(e);
                case "object":
                    if (!e) return "null";
                    if (n += r, c = [], Object.prototype.toString.apply(e) === "[object Array]") {
                        for (a = e.length, s = 0; s < a; s += 1) c[s] = u(s, e) || "null";
                        return h = c.length === 0 ? "[]" : n ? "[\n" + n + c.join(",\n" + n) + "\n" + v + "]" : "[" + c.join(",") + "]", n = v, h
                    }
                    if (t && typeof t == "object")
                        for (a = t.length, s = 0; s < a; s += 1) typeof t[s] == "string" && (l = t[s], h = u(l, e), h && c.push(o(l) + (n ? ": " : ":") + h));
                    else
                        for (l in e) Object.prototype.hasOwnProperty.call(e, l) && (h = u(l, e), h && c.push(o(l) + (n ? ": " : ":") + h));
                    return h = c.length === 0 ? "{}" : n ? "{\n" + n + c.join(",\n" + n) + "\n" + v + "}" : "{" + c.join(",") + "}", n = v, h
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            n, r, s = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            t;
        typeof JSON.stringify != "function" && (JSON.stringify = function (i, f, e) {
            var o;
            if (n = "", r = "", typeof e == "number")
                for (o = 0; o < e; o += 1) r += " ";
            else typeof e == "string" && (r = e);
            if (t = f, f && typeof f != "function" && (typeof f != "object" || typeof f.length != "number")) throw new Error("JSON.stringify");
            return u("", {
                "": i
            })
        });
        typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
            function walk(n, t) {
                var r, u, i = n[t];
                if (i && typeof i == "object")
                    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (u = walk(i, r), u !== undefined ? i[r] = u : delete i[r]);
                return reviver.call(n, t, i)
            }
            var j;
            if (text = String(text), f.lastIndex = 0, f.test(text) && (text = text.replace(f, function (n) {
                    return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse");
        })
    }(),
    function (n, t, i) {
        function v(t, i) {
            var u, f;
            if (n.isArray(t)) {
                for (u = t.length - 1; u >= 0; u--) f = t[u], n.type(f) === "string" && r.transports[f] || (i.log("Invalid transport: " + f + ", removing it from the transports list."), t.splice(u, 1));
                t.length === 0 && (i.log("No transports remain within the specified transport array."), t = null)
            } else if (r.transports[t] || t === "auto") {
                if (t === "auto" && r._.ieVersion <= 8) return ["longPolling"]
            } else i.log("Invalid transport: " + t.toString() + "."), t = null;
            return t
        }

        function y(n) {
            return n === "http:" ? 80 : n === "https:" ? 443 : void 0
        }

        function h(n, t) {
            return t.match(/:\d+$/) ? t : t + ":" + y(n)
        }

        function p(t, i) {
            var u = this,
                r = [];
            u.tryBuffer = function (i) {
                return t.state === n.signalR.connectionState.connecting ? (r.push(i), !0) : !1
            };
            u.drain = function () {
                if (t.state === n.signalR.connectionState.connected)
                    while (r.length > 0) i(r.shift())
            };
            u.clear = function () {
                r = []
            }
        }
        var f = {
            nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",
            noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",
            errorOnNegotiate: "Error during negotiation request.",
            stoppedWhileLoading: "The connection was stopped during page load.",
            stoppedWhileNegotiating: "The connection was stopped during the negotiate request.",
            errorParsingNegotiateResponse: "Error parsing negotiate response.",
            errorDuringStartRequest: "Error during start request. Stopping the connection.",
            stoppedDuringStartRequest: "The connection was stopped during the start request.",
            errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.",
            invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.",
            protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",
            sendFailed: "Send failed.",
            parseFailed: "Failed at parsing response: {0}",
            longPollFailed: "Long polling request failed.",
            eventSourceFailedToConnect: "EventSource failed to connect.",
            eventSourceError: "Error raised by EventSource",
            webSocketClosed: "WebSocket closed.",
            pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.",
            pingServerFailed: "Failed to ping server.",
            pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.",
            pingServerFailedParse: "Failed to parse ping server response, stopping the connection.",
            noConnectionTransport: "Connection is in an invalid state, there is no transport active.",
            webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.",
            reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",
            reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."
        };
        if (typeof n != "function") throw new Error(f.nojQuery);
        var r, c, s = t.document.readyState === "complete",
            e = n(t),
            l = "__Negotiate Aborted__",
            u = {
                onStart: "onStart",
                onStarting: "onStarting",
                onReceived: "onReceived",
                onError: "onError",
                onConnectionSlow: "onConnectionSlow",
                onReconnecting: "onReconnecting",
                onReconnect: "onReconnect",
                onStateChanged: "onStateChanged",
                onDisconnect: "onDisconnect"
            },
            w = function (n, i) {
                if (i !== !1) {
                    var r;
                    typeof t.console != "undefined" && (r = "[" + (new Date).toTimeString() + "] SignalR: " + n, t.console.debug ? t.console.debug(r) : t.console.log && t.console.log(r))
                }
            },
            o = function (t, i, r) {
                return i === t.state ? (t.state = r, n(t).triggerHandler(u.onStateChanged, [{
                    oldState: i,
                    newState: r
                }]), !0) : !1
            },
            b = function (n) {
                return n.state === r.connectionState.disconnected
            },
            a = function (n) {
                return n._.keepAliveData.activated && n.transport.supportsKeepAlive(n)
            },
            k = function (i) {
                var f, e;
                i._.configuredStopReconnectingTimeout || (e = function (t) {
                    var i = r._.format(r.resources.reconnectTimeout, t.disconnectTimeout);
                    t.log(i);
                    n(t).triggerHandler(u.onError, [r._.error(i, "TimeoutException")]);
                    t.stop(!1, !1)
                }, i.reconnecting(function () {
                    var n = this;
                    n.state === r.connectionState.reconnecting && (f = t.setTimeout(function () {
                        e(n)
                    }, n.disconnectTimeout))
                }), i.stateChanged(function (n) {
                    n.oldState === r.connectionState.reconnecting && t.clearTimeout(f)
                }), i._.configuredStopReconnectingTimeout = !0)
            };
        r = function (n, t, i) {
            return new r.fn.init(n, t, i)
        };
        r._ = {
            defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8",
            ieVersion: function () {
                var i, n;
                return t.navigator.appName === "Microsoft Internet Explorer" && (n = /MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent), n && (i = t.parseFloat(n[1]))), i
            }(),
            error: function (n, t, i) {
                var r = new Error(n);
                return r.source = t, typeof i != "undefined" && (r.context = i), r
            },
            transportError: function (n, t, r, u) {
                var f = this.error(n, r, u);
                return f.transport = t ? t.name : i, f
            },
            format: function () {
                for (var t = arguments[0], n = 0; n < arguments.length - 1; n++) t = t.replace("{" + n + "}", arguments[n + 1]);
                return t
            },
            firefoxMajorVersion: function (n) {
                var t = n.match(/Firefox\/(\d+)/);
                return !t || !t.length || t.length < 2 ? 0 : parseInt(t[1], 10)
            },
            configurePingInterval: function (i) {
                var f = i._.config,
                    e = function (t) {
                        n(i).triggerHandler(u.onError, [t])
                    };
                f && !i._.pingIntervalId && f.pingInterval && (i._.pingIntervalId = t.setInterval(function () {
                    r.transports._logic.pingServer(i).fail(e)
                }, f.pingInterval))
            }
        };
        r.events = u;
        r.resources = f;
        r.ajaxDefaults = {
            processData: !0,
            timeout: null,
            async: !0,
            global: !1,
            cache: !1
        };
        r.changeState = o;
        r.isDisconnecting = b;
        r.connectionState = {
            connecting: 0,
            connected: 1,
            reconnecting: 2,
            disconnected: 4
        };
        r.hub = {
            start: function () {
                throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'><\/script>.");
            }
        };
        e.load(function () {
            s = !0
        });
        r.fn = r.prototype = {
            init: function (t, i, r) {
                var f = n(this);
                this.url = t;
                this.qs = i;
                this.lastError = null;
                this._ = {
                    keepAliveData: {},
                    connectingMessageBuffer: new p(this, function (n) {
                        f.triggerHandler(u.onReceived, [n])
                    }),
                    lastMessageAt: (new Date).getTime(),
                    lastActiveAt: (new Date).getTime(),
                    beatInterval: 5e3,
                    beatHandle: null,
                    totalTransportConnectTimeout: 0
                };
                typeof r == "boolean" && (this.logging = r)
            },
            _parseResponse: function (n) {
                var t = this;
                return n ? typeof n == "string" ? t.json.parse(n) : n : n
            },
            _originalJson: t.JSON,
            json: t.JSON,
            isCrossDomain: function (i, r) {
                var u;
                return (i = n.trim(i), r = r || t.location, i.indexOf("http") !== 0) ? !1 : (u = t.document.createElement("a"), u.href = i, u.protocol + h(u.protocol, u.host) !== r.protocol + h(r.protocol, r.host))
            },
            ajaxDataType: "text",
            contentType: "application/json; charset=UTF-8",
            logging: !1,
            state: r.connectionState.disconnected,
            clientProtocol: "1.5",
            reconnectDelay: 2e3,
            transportConnectTimeout: 0,
            disconnectTimeout: 3e4,
            reconnectWindow: 3e4,
            keepAliveWarnAt: 2 / 3,
            start: function (i, h) {
                var c = this,
                    y = {
                        pingInterval: 3e5,
                        waitForPageLoad: !0,
                        transport: "auto",
                        jsonp: !1
                    },
                    d, p = c._deferral || n.Deferred(),
                    w = t.document.createElement("a"),
                    b, g;
                if (c.lastError = null, c._deferral = p, !c.json) throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");
                if (n.type(i) === "function" ? h = i : n.type(i) === "object" && (n.extend(y, i), n.type(y.callback) === "function" && (h = y.callback)), y.transport = v(y.transport, c), !y.transport) throw new Error("SignalR: Invalid transport(s) specified, aborting start.");
                return (c._.config = y, !s && y.waitForPageLoad === !0) ? (c._.deferredStartHandler = function () {
                    c.start(i, h)
                }, e.bind("load", c._.deferredStartHandler), p.promise()) : c.state === r.connectionState.connecting ? p.promise() : o(c, r.connectionState.disconnected, r.connectionState.connecting) === !1 ? (p.resolve(c), p.promise()) : (k(c), w.href = c.url, w.protocol && w.protocol !== ":" ? (c.protocol = w.protocol, c.host = w.host) : (c.protocol = t.document.location.protocol, c.host = w.host || t.document.location.host), c.baseUrl = c.protocol + "//" + c.host, c.wsProtocol = c.protocol === "https:" ? "wss://" : "ws://", y.transport === "auto" && y.jsonp === !0 && (y.transport = "longPolling"), c.url.indexOf("//") === 0 && (c.url = t.location.protocol + c.url, c.log("Protocol relative URL detected, normalizing it to '" + c.url + "'.")), this.isCrossDomain(c.url) && (c.log("Auto detected cross domain url."), y.transport === "auto" && (y.transport = ["webSockets", "serverSentEvents", "longPolling"]), typeof y.withCredentials == "undefined" && (y.withCredentials = !0), y.jsonp || (y.jsonp = !n.support.cors, y.jsonp && c.log("Using jsonp because this browser doesn't support CORS.")), c.contentType = r._.defaultContentType), c.withCredentials = y.withCredentials, c.ajaxDataType = y.jsonp ? "jsonp" : "text", n(c).bind(u.onStart, function () {
                    n.type(h) === "function" && h.call(c);
                    p.resolve(c)
                }), c._.initHandler = r.transports._logic.initHandler(c), d = function (i, s) {
                    var l = r._.error(f.noTransportOnInit);
                    if (s = s || 0, s >= i.length) {
                        s === 0 ? c.log("No transports supported by the server were selected.") : s === 1 ? c.log("No fallback transports were selected.") : c.log("Fallback transports exhausted.");
                        n(c).triggerHandler(u.onError, [l]);
                        p.reject(l);
                        c.stop();
                        return
                    }
                    if (c.state !== r.connectionState.disconnected) {
                        var y = i[s],
                            h = r.transports[y],
                            v = function () {
                                d(i, s + 1)
                            };
                        c.transport = h;
                        try {
                            c._.initHandler.start(h, function () {
                                var i = r._.firefoxMajorVersion(t.navigator.userAgent) >= 11,
                                    f = !!c.withCredentials && i;
                                c.log("The start request succeeded. Transitioning to the connected state.");
                                a(c) && r.transports._logic.monitorKeepAlive(c);
                                r.transports._logic.startHeartbeat(c);
                                r._.configurePingInterval(c);
                                o(c, r.connectionState.connecting, r.connectionState.connected) || c.log("WARNING! The connection was not in the connecting state.");
                                c._.connectingMessageBuffer.drain();
                                n(c).triggerHandler(u.onStart);
                                e.bind("unload", function () {
                                    c.log("Window unloading, stopping the connection.");
                                    c.stop(f)
                                });
                                i && e.bind("beforeunload", function () {
                                    t.setTimeout(function () {
                                        c.stop(f)
                                    }, 0)
                                })
                            }, v)
                        } catch (w) {
                            c.log(h.name + " transport threw '" + w.message + "' when attempting to start.");
                            v()
                        }
                    }
                }, b = c.url + "/negotiate", g = function (t, i) {
                    var e = r._.error(f.errorOnNegotiate, t, i._.negotiateRequest);
                    n(i).triggerHandler(u.onError, e);
                    p.reject(e);
                    i.stop()
                }, n(c).triggerHandler(u.onStarting), b = r.transports._logic.prepareQueryString(c, b), c.log("Negotiating with '" + b + "'."), c._.negotiateRequest = r.transports._logic.ajax(c, {
                    url: b,
                    error: function (n, t) {
                        t !== l ? g(n, c) : p.reject(r._.error(f.stoppedWhileNegotiating, null, c._.negotiateRequest))
                    },
                    success: function (t) {
                        var i, e, h, o = [],
                            s = [];
                        try {
                            i = c._parseResponse(t)
                        } catch (l) {
                            g(r._.error(f.errorParsingNegotiateResponse, l), c);
                            return
                        }
                        if (e = c._.keepAliveData, c.appRelativeUrl = i.Url, c.id = i.ConnectionId, c.token = i.ConnectionToken, c.webSocketServerUrl = i.WebSocketServerUrl, c._.pollTimeout = i.ConnectionTimeout * 1e3 + 1e4, c.disconnectTimeout = i.DisconnectTimeout * 1e3, c._.totalTransportConnectTimeout = c.transportConnectTimeout + i.TransportConnectTimeout * 1e3, i.KeepAliveTimeout ? (e.activated = !0, e.timeout = i.KeepAliveTimeout * 1e3, e.timeoutWarning = e.timeout * c.keepAliveWarnAt, c._.beatInterval = (e.timeout - e.timeoutWarning) / 3) : e.activated = !1, c.reconnectWindow = c.disconnectTimeout + (e.timeout || 0), !i.ProtocolVersion || i.ProtocolVersion !== c.clientProtocol) {
                            h = r._.error(r._.format(f.protocolIncompatible, c.clientProtocol, i.ProtocolVersion));
                            n(c).triggerHandler(u.onError, [h]);
                            p.reject(h);
                            return
                        }
                        n.each(r.transports, function (n) {
                            if (n.indexOf("_") === 0 || n === "webSockets" && !i.TryWebSockets) return !0;
                            s.push(n)
                        });
                        n.isArray(y.transport) ? n.each(y.transport, function (t, i) {
                            n.inArray(i, s) >= 0 && o.push(i)
                        }) : y.transport === "auto" ? o = s : n.inArray(y.transport, s) >= 0 && o.push(y.transport);
                        d(o)
                    }
                }), p.promise())
            },
            starting: function (t) {
                var i = this;
                return n(i).bind(u.onStarting, function () {
                    t.call(i)
                }), i
            },
            send: function (n) {
                var t = this;
                if (t.state === r.connectionState.disconnected) throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");
                if (t.state === r.connectionState.connecting) throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");
                return t.transport.send(t, n), t
            },
            received: function (t) {
                var i = this;
                return n(i).bind(u.onReceived, function (n, r) {
                    t.call(i, r)
                }), i
            },
            stateChanged: function (t) {
                var i = this;
                return n(i).bind(u.onStateChanged, function (n, r) {
                    t.call(i, r)
                }), i
            },
            error: function (t) {
                var i = this;
                return n(i).bind(u.onError, function (n, r, u) {
                    i.lastError = r;
                    t.call(i, r, u)
                }), i
            },
            disconnected: function (t) {
                var i = this;
                return n(i).bind(u.onDisconnect, function () {
                    t.call(i)
                }), i
            },
            connectionSlow: function (t) {
                var i = this;
                return n(i).bind(u.onConnectionSlow, function () {
                    t.call(i)
                }), i
            },
            reconnecting: function (t) {
                var i = this;
                return n(i).bind(u.onReconnecting, function () {
                    t.call(i)
                }), i
            },
            reconnected: function (t) {
                var i = this;
                return n(i).bind(u.onReconnect, function () {
                    t.call(i)
                }), i
            },
            stop: function (i, h) {
                var c = this,
                    v = c._deferral;
                if (c._.deferredStartHandler && e.unbind("load", c._.deferredStartHandler), delete c._.config, delete c._.deferredStartHandler, !s && (!c._.config || c._.config.waitForPageLoad === !0)) {
                    c.log("Stopping connection prior to negotiate.");
                    v && v.reject(r._.error(f.stoppedWhileLoading));
                    return
                }
                if (c.state !== r.connectionState.disconnected) return c.log("Stopping connection."), o(c, c.state, r.connectionState.disconnected), t.clearTimeout(c._.beatHandle), t.clearInterval(c._.pingIntervalId), c.transport && (c.transport.stop(c), h !== !1 && c.transport.abort(c, i), a(c) && r.transports._logic.stopMonitoringKeepAlive(c), c.transport = null), c._.negotiateRequest && (c._.negotiateRequest.abort(l), delete c._.negotiateRequest), c._.initHandler && c._.initHandler.stop(), n(c).triggerHandler(u.onDisconnect), delete c._deferral, delete c.messageId, delete c.groupsToken, delete c.id, delete c._.pingIntervalId, delete c._.lastMessageAt, delete c._.lastActiveAt, c._.connectingMessageBuffer.clear(), c
            },
            log: function (n) {
                w(n, this.logging)
            }
        };
        r.fn.init.prototype = r.fn;
        r.noConflict = function () {
            return n.connection === r && (n.connection = c), r
        };
        n.connection && (c = n.connection);
        n.connection = n.signalR = r
    }(window.jQuery, window),
    function (n, t, i) {
        function o(n) {
            n._.keepAliveData.monitoring && c(n);
            u.markActive(n) && (n._.beatHandle = t.setTimeout(function () {
                o(n)
            }, n._.beatInterval))
        }

        function c(t) {
            var i = t._.keepAliveData,
                u;
            t.state === r.connectionState.connected && (u = (new Date).getTime() - t._.lastMessageAt, u >= i.timeout ? (t.log("Keep alive timed out.  Notifying transport that connection has been lost."), t.transport.lostConnection(t)) : u >= i.timeoutWarning ? i.userNotified || (t.log("Keep alive has been missed, connection may be dead/slow."), n(t).triggerHandler(f.onConnectionSlow), i.userNotified = !0) : i.userNotified = !1)
        }

        function e(n, t) {
            var i = n.url + t;
            return n.transport && (i += "?transport=" + n.transport.name), u.prepareQueryString(n, i)
        }

        function s(n) {
            this.connection = n;
            this.startRequested = !1;
            this.startCompleted = !1;
            this.connectionStopped = !1
        }
        var r = n.signalR,
            f = n.signalR.events,
            l = n.signalR.changeState,
            h = "__Start Aborted__",
            u;
        r.transports = {};
        s.prototype = {
            start: function (n, r, u) {
                var f = this,
                    e = f.connection,
                    o = !1;
                if (f.startRequested || f.connectionStopped) {
                    e.log("WARNING! " + n.name + " transport cannot be started. Initialization ongoing or completed.");
                    return
                }
                e.log(n.name + " transport starting.");
                f.transportTimeoutHandle = t.setTimeout(function () {
                    o || (o = !0, e.log(n.name + " transport timed out when trying to connect."), f.transportFailed(n, i, u))
                }, e._.totalTransportConnectTimeout);
                n.start(e, function () {
                    o || f.initReceived(n, r)
                }, function (t) {
                    return o || (o = !0, f.transportFailed(n, t, u)), !f.startCompleted || f.connectionStopped
                })
            },
            stop: function () {
                this.connectionStopped = !0;
                t.clearTimeout(this.transportTimeoutHandle);
                r.transports._logic.tryAbortStartRequest(this.connection)
            },
            initReceived: function (n, i) {
                var u = this,
                    f = u.connection;
                if (u.startRequested) {
                    f.log("WARNING! The client received multiple init messages.");
                    return
                }
                u.connectionStopped || (u.startRequested = !0, t.clearTimeout(u.transportTimeoutHandle), f.log(n.name + " transport connected. Initiating start request."), r.transports._logic.ajaxStart(f, function () {
                    u.startCompleted = !0;
                    i()
                }))
            },
            transportFailed: function (i, u, e) {
                var o = this.connection,
                    h = o._deferral,
                    s;
                this.connectionStopped || (t.clearTimeout(this.transportTimeoutHandle), this.startRequested ? this.startCompleted || (s = r._.error(r.resources.errorDuringStartRequest, u), o.log(i.name + " transport failed during the start request. Stopping the connection."), n(o).triggerHandler(f.onError, [s]), h && h.reject(s), o.stop()) : (i.stop(o), o.log(i.name + " transport failed to connect. Attempting to fall back."), e()))
            }
        };
        u = r.transports._logic = {
            ajax: function (t, i) {
                return n.ajax(n.extend(!0, {}, n.signalR.ajaxDefaults, {
                    type: "GET",
                    data: {},
                    xhrFields: {
                        withCredentials: t.withCredentials
                    },
                    contentType: t.contentType,
                    dataType: t.ajaxDataType
                }, i))
            },
            pingServer: function (t) {
                var e, f, i = n.Deferred();
                return t.transport ? (e = t.url + "/ping", e = u.addQs(e, t.qs), f = u.ajax(t, {
                    url: e,
                    success: function (n) {
                        var u;
                        try {
                            u = t._parseResponse(n)
                        } catch (e) {
                            i.reject(r._.transportError(r.resources.pingServerFailedParse, t.transport, e, f));
                            t.stop();
                            return
                        }
                        u.Response === "pong" ? i.resolve() : i.reject(r._.transportError(r._.format(r.resources.pingServerFailedInvalidResponse, n), t.transport, null, f))
                    },
                    error: function (n) {
                        n.status === 401 || n.status === 403 ? (i.reject(r._.transportError(r._.format(r.resources.pingServerFailedStatusCode, n.status), t.transport, n, f)), t.stop()) : i.reject(r._.transportError(r.resources.pingServerFailed, t.transport, n, f))
                    }
                })) : i.reject(r._.transportError(r.resources.noConnectionTransport, t.transport)), i.promise()
            },
            prepareQueryString: function (n, i) {
                var r;
                return r = u.addQs(i, "clientProtocol=" + n.clientProtocol), r = u.addQs(r, n.qs), n.token && (r += "&connectionToken=" + t.encodeURIComponent(n.token)), n.data && (r += "&connectionData=" + t.encodeURIComponent(n.data)), r
            },
            addQs: function (t, i) {
                var r = t.indexOf("?") !== -1 ? "&" : "?",
                    u;
                if (!i) return t;
                if (typeof i == "object") return t + r + n.param(i);
                if (typeof i == "string") return u = i.charAt(0), (u === "?" || u === "&") && (r = ""), t + r + i;
                throw new Error("Query string property must be either a string or object.");
            },
            getUrl: function (n, i, r, f, e) {
                var h = i === "webSockets" ? "" : n.baseUrl,
                    o = h + n.appRelativeUrl,
                    s = "transport=" + i;
                return !e && n.groupsToken && (s += "&groupsToken=" + t.encodeURIComponent(n.groupsToken)), r ? (o += f ? "/poll" : "/reconnect", !e && n.messageId && (s += "&messageId=" + t.encodeURIComponent(n.messageId))) : o += "/connect", o += "?" + s, o = u.prepareQueryString(n, o), e || (o += "&tid=" + Math.floor(Math.random() * 11)), o
            },
            maximizePersistentResponse: function (n) {
                return {
                    MessageId: n.C,
                    Messages: n.M,
                    Initialized: typeof n.S != "undefined" ? !0 : !1,
                    ShouldReconnect: typeof n.T != "undefined" ? !0 : !1,
                    LongPollDelay: n.L,
                    GroupsToken: n.G
                }
            },
            updateGroups: function (n, t) {
                t && (n.groupsToken = t)
            },
            stringifySend: function (n, t) {
                return typeof t == "string" || typeof t == "undefined" || t === null ? t : n.json.stringify(t)
            },
            ajaxSend: function (t, i) {
                var h = u.stringifySend(t, i),
                    c = e(t, "/send"),
                    o, s = function (t, u) {
                        n(u).triggerHandler(f.onError, [r._.transportError(r.resources.sendFailed, u.transport, t, o), i])
                    };
                return o = u.ajax(t, {
                    url: c,
                    type: t.ajaxDataType === "jsonp" ? "GET" : "POST",
                    contentType: r._.defaultContentType,
                    data: {
                        data: h
                    },
                    success: function (n) {
                        var i;
                        if (n) {
                            try {
                                i = t._parseResponse(n)
                            } catch (r) {
                                s(r, t);
                                t.stop();
                                return
                            }
                            u.triggerReceived(t, i)
                        }
                    },
                    error: function (n, i) {
                        i !== "abort" && i !== "parsererror" && s(n, t)
                    }
                })
            },
            ajaxAbort: function (n, t) {
                if (typeof n.transport != "undefined") {
                    t = typeof t == "undefined" ? !0 : t;
                    var i = e(n, "/abort");
                    u.ajax(n, {
                        url: i,
                        async: t,
                        timeout: 1e3,
                        type: "POST"
                    });
                    n.log("Fired ajax abort async = " + t + ".")
                }
            },
            ajaxStart: function (t, i) {
                var s = function (n) {
                        var i = t._deferral;
                        i && i.reject(n)
                    },
                    o = function (i) {
                        t.log("The start request failed. Stopping the connection.");
                        n(t).triggerHandler(f.onError, [i]);
                        s(i);
                        t.stop()
                    };
                t._.startRequest = u.ajax(t, {
                    url: e(t, "/start"),
                    success: function (n, u, f) {
                        var e;
                        try {
                            e = t._parseResponse(n)
                        } catch (s) {
                            o(r._.error(r._.format(r.resources.errorParsingStartResponse, n), s, f));
                            return
                        }
                        e.Response === "started" ? i() : o(r._.error(r._.format(r.resources.invalidStartResponse, n), null, f))
                    },
                    error: function (n, i, u) {
                        i !== h ? o(r._.error(r.resources.errorDuringStartRequest, u, n)) : (t.log("The start request aborted because connection.stop() was called."), s(r._.error(r.resources.stoppedDuringStartRequest, null, n)))
                    }
                })
            },
            tryAbortStartRequest: function (n) {
                n._.startRequest && (n._.startRequest.abort(h), delete n._.startRequest)
            },
            tryInitialize: function (n, t) {
                n.Initialized && t()
            },
            triggerReceived: function (t, i) {
                t._.connectingMessageBuffer.tryBuffer(i) || n(t).triggerHandler(f.onReceived, [i])
            },
            processMessages: function (t, i, r) {
                var f;
                u.markLastMessage(t);
                i && (f = u.maximizePersistentResponse(i), u.updateGroups(t, f.GroupsToken), f.MessageId && (t.messageId = f.MessageId), f.Messages && (n.each(f.Messages, function (n, i) {
                    u.triggerReceived(t, i)
                }), u.tryInitialize(f, r)))
            },
            monitorKeepAlive: function (t) {
                var i = t._.keepAliveData;
                i.monitoring ? t.log("Tried to monitor keep alive but it's already being monitored.") : (i.monitoring = !0, u.markLastMessage(t), t._.keepAliveData.reconnectKeepAliveUpdate = function () {
                    u.markLastMessage(t)
                }, n(t).bind(f.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t.log("Now monitoring keep alive with a warning timeout of " + i.timeoutWarning + ", keep alive timeout of " + i.timeout + " and disconnecting timeout of " + t.disconnectTimeout))
            },
            stopMonitoringKeepAlive: function (t) {
                var i = t._.keepAliveData;
                i.monitoring && (i.monitoring = !1, n(t).unbind(f.onReconnect, t._.keepAliveData.reconnectKeepAliveUpdate), t._.keepAliveData = {}, t.log("Stopping the monitoring of the keep alive."))
            },
            startHeartbeat: function (n) {
                n._.lastActiveAt = (new Date).getTime();
                o(n)
            },
            markLastMessage: function (n) {
                n._.lastMessageAt = (new Date).getTime()
            },
            markActive: function (n) {
                return u.verifyLastActive(n) ? (n._.lastActiveAt = (new Date).getTime(), !0) : !1
            },
            isConnectedOrReconnecting: function (n) {
                return n.state === r.connectionState.connected || n.state === r.connectionState.reconnecting
            },
            ensureReconnectingState: function (t) {
                return l(t, r.connectionState.connected, r.connectionState.reconnecting) === !0 && n(t).triggerHandler(f.onReconnecting), t.state === r.connectionState.reconnecting
            },
            clearReconnectTimeout: function (n) {
                n && n._.reconnectTimeout && (t.clearTimeout(n._.reconnectTimeout), delete n._.reconnectTimeout)
            },
            verifyLastActive: function (t) {
                if ((new Date).getTime() - t._.lastActiveAt >= t.reconnectWindow) {
                    var i = r._.format(r.resources.reconnectWindowTimeout, new Date(t._.lastActiveAt), t.reconnectWindow);
                    return t.log(i), n(t).triggerHandler(f.onError, [r._.error(i, "TimeoutException")]), t.stop(!1, !1), !1
                }
                return !0
            },
            reconnect: function (n, i) {
                var f = r.transports[i];
                if (u.isConnectedOrReconnecting(n) && !n._.reconnectTimeout) {
                    if (!u.verifyLastActive(n)) return;
                    n._.reconnectTimeout = t.setTimeout(function () {
                        u.verifyLastActive(n) && (f.stop(n), u.ensureReconnectingState(n) && (n.log(i + " reconnecting."), f.start(n)))
                    }, n.reconnectDelay)
                }
            },
            handleParseFailure: function (t, i, u, e, o) {
                var s = r._.transportError(r._.format(r.resources.parseFailed, i), t.transport, u, o);
                e && e(s) ? t.log("Failed to parse server response while attempting to connect.") : (n(t).triggerHandler(f.onError, [s]), t.stop())
            },
            initHandler: function (n) {
                return new s(n)
            },
            foreverFrame: {
                count: 0,
                connections: {}
            }
        }
    }(window.jQuery, window),
    function (n, t) {
        var r = n.signalR,
            u = n.signalR.events,
            f = n.signalR.changeState,
            i = r.transports._logic;
        r.transports.webSockets = {
            name: "webSockets",
            supportsKeepAlive: function () {
                return !0
            },
            send: function (t, f) {
                var e = i.stringifySend(t, f);
                try {
                    t.socket.send(e)
                } catch (o) {
                    n(t).triggerHandler(u.onError, [r._.transportError(r.resources.webSocketsInvalidState, t.transport, o, t.socket), f])
                }
            },
            start: function (e, o, s) {
                var h, c = !1,
                    l = this,
                    a = !o,
                    v = n(e);
                if (!t.WebSocket) {
                    s();
                    return
                }
                e.socket || (h = e.webSocketServerUrl ? e.webSocketServerUrl : e.wsProtocol + e.host, h += i.getUrl(e, this.name, a), e.log("Connecting to websocket endpoint '" + h + "'."), e.socket = new t.WebSocket(h), e.socket.onopen = function () {
                    c = !0;
                    e.log("Websocket opened.");
                    i.clearReconnectTimeout(e);
                    f(e, r.connectionState.reconnecting, r.connectionState.connected) === !0 && v.triggerHandler(u.onReconnect)
                }, e.socket.onclose = function (t) {
                    var i;
                    this === e.socket && (c && typeof t.wasClean != "undefined" && t.wasClean === !1 ? (i = r._.transportError(r.resources.webSocketClosed, e.transport, t), e.log("Unclean disconnect from websocket: " + (t.reason || "[no reason given]."))) : e.log("Websocket closed."), s && s(i) || (i && n(e).triggerHandler(u.onError, [i]), l.reconnect(e)))
                }, e.socket.onmessage = function (t) {
                    var r;
                    try {
                        r = e._parseResponse(t.data)
                    } catch (u) {
                        i.handleParseFailure(e, t.data, u, s, t);
                        return
                    }
                    r && (n.isEmptyObject(r) || r.M ? i.processMessages(e, r, o) : i.triggerReceived(e, r))
                })
            },
            reconnect: function (n) {
                i.reconnect(n, this.name)
            },
            lostConnection: function (n) {
                this.reconnect(n)
            },
            stop: function (n) {
                i.clearReconnectTimeout(n);
                n.socket && (n.log("Closing the Websocket."), n.socket.close(), n.socket = null)
            },
            abort: function (n, t) {
                i.ajaxAbort(n, t)
            }
        }
    }(window.jQuery, window),
    function (n, t) {
        var i = n.signalR,
            u = n.signalR.events,
            e = n.signalR.changeState,
            r = i.transports._logic,
            f = function (n) {
                t.clearTimeout(n._.reconnectAttemptTimeoutHandle);
                delete n._.reconnectAttemptTimeoutHandle
            };
        i.transports.serverSentEvents = {
            name: "serverSentEvents",
            supportsKeepAlive: function () {
                return !0
            },
            timeOut: 3e3,
            start: function (o, s, h) {
                var c = this,
                    l = !1,
                    a = n(o),
                    v = !s,
                    y;
                if (o.eventSource && (o.log("The connection already has an event source. Stopping it."), o.stop()), !t.EventSource) {
                    h && (o.log("This browser doesn't support SSE."), h());
                    return
                }
                y = r.getUrl(o, this.name, v);
                try {
                    o.log("Attempting to connect to SSE endpoint '" + y + "'.");
                    o.eventSource = new t.EventSource(y, {
                        withCredentials: o.withCredentials
                    })
                } catch (p) {
                    o.log("EventSource failed trying to connect with error " + p.Message + ".");
                    h ? h() : (a.triggerHandler(u.onError, [i._.transportError(i.resources.eventSourceFailedToConnect, o.transport, p)]), v && c.reconnect(o));
                    return
                }
                v && (o._.reconnectAttemptTimeoutHandle = t.setTimeout(function () {
                    l === !1 && o.eventSource.readyState !== t.EventSource.OPEN && c.reconnect(o)
                }, c.timeOut));
                o.eventSource.addEventListener("open", function () {
                    o.log("EventSource connected.");
                    f(o);
                    r.clearReconnectTimeout(o);
                    l === !1 && (l = !0, e(o, i.connectionState.reconnecting, i.connectionState.connected) === !0 && a.triggerHandler(u.onReconnect))
                }, !1);
                o.eventSource.addEventListener("message", function (n) {
                    var t;
                    if (n.data !== "initialized") {
                        try {
                            t = o._parseResponse(n.data)
                        } catch (i) {
                            r.handleParseFailure(o, n.data, i, h, n);
                            return
                        }
                        r.processMessages(o, t, s)
                    }
                }, !1);
                o.eventSource.addEventListener("error", function (n) {
                    var r = i._.transportError(i.resources.eventSourceError, o.transport, n);
                    this === o.eventSource && (h && h(r) || (o.log("EventSource readyState: " + o.eventSource.readyState + "."), n.eventPhase === t.EventSource.CLOSED ? (o.log("EventSource reconnecting due to the server connection ending."), c.reconnect(o)) : (o.log("EventSource error."), a.triggerHandler(u.onError, [r]))))
                }, !1)
            },
            reconnect: function (n) {
                r.reconnect(n, this.name)
            },
            lostConnection: function (n) {
                this.reconnect(n)
            },
            send: function (n, t) {
                r.ajaxSend(n, t)
            },
            stop: function (n) {
                f(n);
                r.clearReconnectTimeout(n);
                n && n.eventSource && (n.log("EventSource calling close()."), n.eventSource.close(), n.eventSource = null, delete n.eventSource)
            },
            abort: function (n, t) {
                r.ajaxAbort(n, t)
            }
        }
    }(window.jQuery, window),
    function (n, t) {
        var r = n.signalR,
            e = n.signalR.events,
            o = n.signalR.changeState,
            i = r.transports._logic,
            u = function () {
                var n = t.document.createElement("iframe");
                return n.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;"), n
            },
            f = function () {
                var i = null,
                    f = 1e3,
                    n = 0;
                return {
                    prevent: function () {
                        r._.ieVersion <= 8 && (n === 0 && (i = t.setInterval(function () {
                            var n = u();
                            t.document.body.appendChild(n);
                            t.document.body.removeChild(n);
                            n = null
                        }, f)), n++)
                    },
                    cancel: function () {
                        n === 1 && t.clearInterval(i);
                        n > 0 && n--
                    }
                }
            }();
        r.transports.foreverFrame = {
            name: "foreverFrame",
            supportsKeepAlive: function () {
                return !0
            },
            iframeClearThreshold: 50,
            start: function (n, r, e) {
                var l = this,
                    s = i.foreverFrame.count += 1,
                    h, o = u(),
                    c = function () {
                        n.log("Forever frame iframe finished loading and is no longer receiving messages.");
                        e && e() || l.reconnect(n)
                    };
                if (t.EventSource) {
                    e && (n.log("Forever Frame is not supported by SignalR on browsers with SSE support."), e());
                    return
                }
                o.setAttribute("data-signalr-connection-id", n.id);
                f.prevent();
                h = i.getUrl(n, this.name);
                h += "&frameId=" + s;
                t.document.documentElement.appendChild(o);
                n.log("Binding to iframe's load event.");
                o.addEventListener ? o.addEventListener("load", c, !1) : o.attachEvent && o.attachEvent("onload", c);
                o.src = h;
                i.foreverFrame.connections[s] = n;
                n.frame = o;
                n.frameId = s;
                r && (n.onSuccess = function () {
                    n.log("Iframe transport started.");
                    r()
                })
            },
            reconnect: function (n) {
                var r = this;
                i.isConnectedOrReconnecting(n) && i.verifyLastActive(n) && t.setTimeout(function () {
                    if (i.verifyLastActive(n) && n.frame && i.ensureReconnectingState(n)) {
                        var u = n.frame,
                            t = i.getUrl(n, r.name, !0) + "&frameId=" + n.frameId;
                        n.log("Updating iframe src to '" + t + "'.");
                        u.src = t
                    }
                }, n.reconnectDelay)
            },
            lostConnection: function (n) {
                this.reconnect(n)
            },
            send: function (n, t) {
                i.ajaxSend(n, t)
            },
            receive: function (t, u) {
                var f, e, o;
                if (t.json !== t._originalJson && (u = t._originalJson.stringify(u)), o = t._parseResponse(u), i.processMessages(t, o, t.onSuccess), t.state === n.signalR.connectionState.connected && (t.frameMessageCount = (t.frameMessageCount || 0) + 1, t.frameMessageCount > r.transports.foreverFrame.iframeClearThreshold && (t.frameMessageCount = 0, f = t.frame.contentWindow || t.frame.contentDocument, f && f.document && f.document.body)))
                    for (e = f.document.body; e.firstChild;) e.removeChild(e.firstChild)
            },
            stop: function (n) {
                var r = null;
                if (f.cancel(), n.frame) {
                    if (n.frame.stop) n.frame.stop();
                    else try {
                        r = n.frame.contentWindow || n.frame.contentDocument;
                        r.document && r.document.execCommand && r.document.execCommand("Stop")
                    } catch (u) {
                        n.log("Error occured when stopping foreverFrame transport. Message = " + u.message + ".")
                    }
                    n.frame.parentNode === t.document.body && t.document.body.removeChild(n.frame);
                    delete i.foreverFrame.connections[n.frameId];
                    n.frame = null;
                    n.frameId = null;
                    delete n.frame;
                    delete n.frameId;
                    delete n.onSuccess;
                    delete n.frameMessageCount;
                    n.log("Stopping forever frame.")
                }
            },
            abort: function (n, t) {
                i.ajaxAbort(n, t)
            },
            getConnection: function (n) {
                return i.foreverFrame.connections[n]
            },
            started: function (t) {
                o(t, r.connectionState.reconnecting, r.connectionState.connected) === !0 && n(t).triggerHandler(e.onReconnect)
            }
        }
    }(window.jQuery, window),
    function (n, t) {
        var r = n.signalR,
            u = n.signalR.events,
            e = n.signalR.changeState,
            f = n.signalR.isDisconnecting,
            i = r.transports._logic;
        r.transports.longPolling = {
            name: "longPolling",
            supportsKeepAlive: function () {
                return !1
            },
            reconnectDelay: 3e3,
            start: function (o, s, h) {
                var a = this,
                    v = function () {
                        v = n.noop;
                        o.log("LongPolling connected.");
                        s()
                    },
                    y = function (n) {
                        return h(n) ? (o.log("LongPolling failed to connect."), !0) : !1
                    },
                    c = o._,
                    l = 0,
                    p = function (i) {
                        t.clearTimeout(c.reconnectTimeoutId);
                        c.reconnectTimeoutId = null;
                        e(i, r.connectionState.reconnecting, r.connectionState.connected) === !0 && (i.log("Raising the reconnect event"), n(i).triggerHandler(u.onReconnect))
                    },
                    w = 36e5;
                o.pollXhr && (o.log("Polling xhr requests already exists, aborting."), o.stop());
                o.messageId = null;
                c.reconnectTimeoutId = null;
                c.pollTimeoutId = t.setTimeout(function () {
                    (function e(s, h) {
                        var g = s.messageId,
                            nt = g === null,
                            k = !nt,
                            tt = !h,
                            d = i.getUrl(s, a.name, k, tt, !0),
                            b = {};
                        (s.messageId && (b.messageId = s.messageId), s.groupsToken && (b.groupsToken = s.groupsToken), f(s) !== !0) && (o.log("Opening long polling request to '" + d + "'."), s.pollXhr = i.ajax(o, {
                            xhrFields: {
                                onprogress: function () {
                                    i.markLastMessage(o)
                                }
                            },
                            url: d,
                            type: "POST",
                            contentType: r._.defaultContentType,
                            data: b,
                            timeout: o._.pollTimeout,
                            success: function (r) {
                                var h, w = 0,
                                    u, a;
                                o.log("Long poll complete.");
                                l = 0;
                                try {
                                    h = o._parseResponse(r)
                                } catch (b) {
                                    i.handleParseFailure(s, r, b, y, s.pollXhr);
                                    return
                                }(c.reconnectTimeoutId !== null && p(s), h && (u = i.maximizePersistentResponse(h)), i.processMessages(s, h, v), u && n.type(u.LongPollDelay) === "number" && (w = u.LongPollDelay), f(s) !== !0) && (a = u && u.ShouldReconnect, !a || i.ensureReconnectingState(s)) && (w > 0 ? c.pollTimeoutId = t.setTimeout(function () {
                                    e(s, a)
                                }, w) : e(s, a))
                            },
                            error: function (f, h) {
                                var v = r._.transportError(r.resources.longPollFailed, o.transport, f, s.pollXhr);
                                if (t.clearTimeout(c.reconnectTimeoutId), c.reconnectTimeoutId = null, h === "abort") {
                                    o.log("Aborted xhr request.");
                                    return
                                }
                                if (!y(v)) {
                                    if (l++, o.state !== r.connectionState.reconnecting && (o.log("An error occurred using longPolling. Status = " + h + ".  Response = " + f.responseText + "."), n(s).triggerHandler(u.onError, [v])), (o.state === r.connectionState.connected || o.state === r.connectionState.reconnecting) && !i.verifyLastActive(o)) return;
                                    if (!i.ensureReconnectingState(s)) return;
                                    c.pollTimeoutId = t.setTimeout(function () {
                                        e(s, !0)
                                    }, a.reconnectDelay)
                                }
                            }
                        }), k && h === !0 && (c.reconnectTimeoutId = t.setTimeout(function () {
                            p(s)
                        }, Math.min(1e3 * (Math.pow(2, l) - 1), w))))
                    })(o)
                }, 250)
            },
            lostConnection: function (n) {
                n.pollXhr && n.pollXhr.abort("lostConnection")
            },
            send: function (n, t) {
                i.ajaxSend(n, t)
            },
            stop: function (n) {
                t.clearTimeout(n._.pollTimeoutId);
                t.clearTimeout(n._.reconnectTimeoutId);
                delete n._.pollTimeoutId;
                delete n._.reconnectTimeoutId;
                n.pollXhr && (n.pollXhr.abort(), n.pollXhr = null, delete n.pollXhr)
            },
            abort: function (n, t) {
                i.ajaxAbort(n, t)
            }
        }
    }(window.jQuery, window),
    function (n) {
        function r(n) {
            return n + s
        }

        function e(n, t, i) {
            for (var f = n.length, u = [], r = 0; r < f; r += 1) n.hasOwnProperty(r) && (u[r] = t.call(i, n[r], r, n));
            return u
        }

        function o(t) {
            return n.isFunction(t) ? null : n.type(t) === "undefined" ? null : t
        }

        function u(n) {
            for (var t in n)
                if (n.hasOwnProperty(t)) return !0;
            return !1
        }

        function f(n, t) {
            var i = n._.invocationCallbacks,
                r, f;
            u(i) && n.log("Clearing hub invocation callbacks with error: " + t + ".");
            n._.invocationCallbackId = 0;
            delete n._.invocationCallbacks;
            n._.invocationCallbacks = {};
            for (f in i) r = i[f], r.method.call(r.scope, {
                E: t
            })
        }

        function i(n, t) {
            return new i.fn.init(n, t)
        }

        function t(i, r) {
            var u = {
                qs: null,
                logging: !1,
                useDefaultPath: !0
            };
            return n.extend(u, r), (!i || u.useDefaultPath) && (i = (i || "") + "/signalr"), new t.fn.init(i, u)
        }
        var s = ".hubProxy",
            h = n.signalR;
        i.fn = i.prototype = {
            init: function (n, t) {
                this.state = {};
                this.connection = n;
                this.hubName = t;
                this._ = {
                    callbackMap: {}
                }
            },
            constructor: i,
            hasSubscriptions: function () {
                return u(this._.callbackMap)
            },
            on: function (t, i) {
                var u = this,
                    f = u._.callbackMap;
                return t = t.toLowerCase(), f[t] || (f[t] = {}), f[t][i] = function (n, t) {
                    i.apply(u, t)
                }, n(u).bind(r(t), f[t][i]), u
            },
            off: function (t, i) {
                var e = this,
                    o = e._.callbackMap,
                    f;
                return t = t.toLowerCase(), f = o[t], f && (f[i] ? (n(e).unbind(r(t), f[i]), delete f[i], u(f) || delete o[t]) : i || (n(e).unbind(r(t)), delete o[t])), e
            },
            invoke: function (t) {
                var i = this,
                    r = i.connection,
                    s = n.makeArray(arguments).slice(1),
                    c = e(s, o),
                    f = {
                        H: i.hubName,
                        M: t,
                        A: c,
                        I: r._.invocationCallbackId
                    },
                    u = n.Deferred(),
                    l = function (f) {
                        var e = i._maximizeHubResponse(f),
                            s, o;
                        n.extend(i.state, e.State);
                        e.Progress ? u.notifyWith ? u.notifyWith(i, [e.Progress.Data]) : r._.progressjQueryVersionLogged || (r.log("A hub method invocation progress update was received but the version of jQuery in use (" + n.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications."), r._.progressjQueryVersionLogged = !0) : e.Error ? (e.StackTrace && r.log(e.Error + "\n" + e.StackTrace + "."), s = e.IsHubException ? "HubException" : "Exception", o = h._.error(e.Error, s), o.data = e.ErrorData, r.log(i.hubName + "." + t + " failed to execute. Error: " + o.message), u.rejectWith(i, [o])) : (r.log("Invoked " + i.hubName + "." + t), u.resolveWith(i, [e.Result]))
                    };
                return r._.invocationCallbacks[r._.invocationCallbackId.toString()] = {
                    scope: i,
                    method: l
                }, r._.invocationCallbackId += 1, n.isEmptyObject(i.state) || (f.S = i.state), r.log("Invoking " + i.hubName + "." + t), r.send(f), u.promise()
            },
            _maximizeHubResponse: function (n) {
                return {
                    State: n.S,
                    Result: n.R,
                    Progress: n.P ? {
                        Id: n.P.I,
                        Data: n.P.D
                    } : null,
                    Id: n.I,
                    IsHubException: n.H,
                    Error: n.E,
                    StackTrace: n.T,
                    ErrorData: n.D
                }
            }
        };
        i.fn.init.prototype = i.fn;
        t.fn = t.prototype = n.connection();
        t.fn.init = function (t, i) {
            var e = {
                    qs: null,
                    logging: !1,
                    useDefaultPath: !0
                },
                u = this;
            n.extend(e, i);
            n.signalR.fn.init.call(u, t, e.qs, e.logging);
            u.proxies = {};
            u._.invocationCallbackId = 0;
            u._.invocationCallbacks = {};
            u.received(function (t) {
                var f, o, e, i, s, h;
                t && (typeof t.P != "undefined" ? (e = t.P.I.toString(), i = u._.invocationCallbacks[e], i && i.method.call(i.scope, t)) : typeof t.I != "undefined" ? (e = t.I.toString(), i = u._.invocationCallbacks[e], i && (u._.invocationCallbacks[e] = null, delete u._.invocationCallbacks[e], i.method.call(i.scope, t))) : (f = this._maximizeClientHubInvocation(t), u.log("Triggering client hub event '" + f.Method + "' on hub '" + f.Hub + "'."), s = f.Hub.toLowerCase(), h = f.Method.toLowerCase(), o = this.proxies[s], n.extend(o.state, f.State), n(o).triggerHandler(r(h), [f.Args])))
            });
            u.error(function (n, t) {
                var i, r;
                t && (i = t.I, r = u._.invocationCallbacks[i], r && (u._.invocationCallbacks[i] = null, delete u._.invocationCallbacks[i], r.method.call(r.scope, {
                    E: n
                })))
            });
            u.reconnecting(function () {
                u.transport && u.transport.name === "webSockets" && f(u, "Connection started reconnecting before invocation result was received.")
            });
            u.disconnected(function () {
                f(u, "Connection was disconnected before invocation result was received.")
            })
        };
        t.fn._maximizeClientHubInvocation = function (n) {
            return {
                Hub: n.H,
                Method: n.M,
                Args: n.A,
                State: n.S
            }
        };
        t.fn._registerSubscribedHubs = function () {
            var t = this;
            t._subscribedToHubs || (t._subscribedToHubs = !0, t.starting(function () {
                var i = [];
                n.each(t.proxies, function (n) {
                    this.hasSubscriptions() && (i.push({
                        name: n
                    }), t.log("Client subscribed to hub '" + n + "'."))
                });
                i.length === 0 && t.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");
                t.data = t.json.stringify(i)
            }))
        };
        t.fn.createHubProxy = function (n) {
            n = n.toLowerCase();
            var t = this.proxies[n];
            return t || (t = i(this, n), this.proxies[n] = t), this._registerSubscribedHubs(), t
        };
        t.fn.init.prototype = t.fn;
        n.hubConnection = t
    }(window.jQuery, window),
    function (n) {
        n.signalR.version = "2.2.0"
    }(window.jQuery),
    function (n) {
        typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports == "object" ? module.exports = n : n(jQuery)
    }(function (n) {
        function e(r) {
            var f = r || window.event,
                w = h.call(arguments, 1),
                l = 0,
                o = 0,
                e = 0,
                a = 0,
                b = 0,
                k = 0,
                v, y, p;
            if (r = n.event.fix(f), r.type = "mousewheel", "detail" in f && (e = f.detail * -1), "wheelDelta" in f && (e = f.wheelDelta), "wheelDeltaY" in f && (e = f.wheelDeltaY), "wheelDeltaX" in f && (o = f.wheelDeltaX * -1), "axis" in f && f.axis === f.HORIZONTAL_AXIS && (o = e * -1, e = 0), l = e === 0 ? o : e, "deltaY" in f && (e = f.deltaY * -1, l = e), "deltaX" in f && (o = f.deltaX, e === 0 && (l = o * -1)), e !== 0 || o !== 0) return f.deltaMode === 1 ? (v = n.data(this, "mousewheel-line-height"), l *= v, e *= v, o *= v) : f.deltaMode === 2 && (y = n.data(this, "mousewheel-page-height"), l *= y, e *= y, o *= y), a = Math.max(Math.abs(e), Math.abs(o)), (!t || a < t) && (t = a, s(f, a) && (t /= 40)), s(f, a) && (l /= 40, o /= 40, e /= 40), l = Math[l >= 1 ? "floor" : "ceil"](l / t), o = Math[o >= 1 ? "floor" : "ceil"](o / t), e = Math[e >= 1 ? "floor" : "ceil"](e / t), i.settings.normalizeOffset && this.getBoundingClientRect && (p = this.getBoundingClientRect(), b = r.clientX - p.left, k = r.clientY - p.top), r.deltaX = o, r.deltaY = e, r.deltaFactor = t, r.offsetX = b, r.offsetY = k, r.deltaMode = 0, w.unshift(r, l, o, e), u && clearTimeout(u), u = setTimeout(c, 200), (n.event.dispatch || n.event.handle).apply(this, w)
        }

        function c() {
            t = null
        }

        function s(n, t) {
            return i.settings.adjustOldDeltas && n.type === "mousewheel" && t % 120 == 0
        }
        var o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            h = Array.prototype.slice,
            u, t, f, i;
        if (n.event.fixHooks)
            for (f = o.length; f;) n.event.fixHooks[o[--f]] = n.event.mouseHooks;
        i = n.event.special.mousewheel = {
            version: "3.1.12",
            setup: function () {
                if (this.addEventListener)
                    for (var t = r.length; t;) this.addEventListener(r[--t], e, !1);
                else this.onmousewheel = e;
                n.data(this, "mousewheel-line-height", i.getLineHeight(this));
                n.data(this, "mousewheel-page-height", i.getPageHeight(this))
            },
            teardown: function () {
                if (this.removeEventListener)
                    for (var t = r.length; t;) this.removeEventListener(r[--t], e, !1);
                else this.onmousewheel = null;
                n.removeData(this, "mousewheel-line-height");
                n.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function (t) {
                var r = n(t),
                    i = r["offsetParent" in n.fn ? "offsetParent" : "parent"]();
                return i.length || (i = n("body")), parseInt(i.css("fontSize"), 10) || parseInt(r.css("fontSize"), 10) || 16
            },
            getPageHeight: function (t) {
                return n(t).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        n.fn.extend({
            mousewheel: function (n) {
                return n ? this.bind("mousewheel", n) : this.trigger("mousewheel")
            },
            unmousewheel: function (n) {
                return this.unbind("mousewheel", n)
            }
        })
    });
! function (n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function (n) {
    n.fn.jScrollPane = function (t) {
        function i(t, i) {
            function fi(i) {
                var c, k, d, v, y, w, g = !1,
                    nt = !1;
                if (r = i, void 0 === u) y = t.scrollTop(), w = t.scrollLeft(), t.css({
                    overflow: "hidden",
                    padding: 0
                }), o = t.innerWidth() + et, e = t.innerHeight(), t.width(o), u = n('<div class="jspPane" />').css("padding", ci).append(t.children()), f = n('<div class="jspContainer" />').css({
                    width: o + "px",
                    height: e + "px"
                }).append(u).appendTo(t);
                else {
                    if (t.css("width", ""), g = r.stickToBottom && fr(), nt = r.stickToRight && er(), v = t.innerWidth() + et != o || t.outerHeight() != e, v && (o = t.innerWidth() + et, e = t.innerHeight(), f.css({
                            width: o + "px",
                            height: e + "px"
                        })), !v && ki == a && u.outerHeight() == l) return void t.width(o);
                    ki = a;
                    u.css("width", "");
                    t.width(o);
                    f.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                }
                u.css("overflow", "auto");
                a = i.contentWidth ? i.contentWidth : u[0].scrollWidth;
                l = u[0].scrollHeight;
                u.css("overflow", "");
                si = a / o;
                dt = l / e;
                b = dt > 1;
                p = si > 1;
                p || b ? (t.addClass("jspScrollable"), c = r.maintainPosition && (s || h), c && (k = it(), d = rt()), di(), gi(), nr(), c && (ct(nt ? a - o : k, !1), tt(g ? l - e : d, !1)), hr(), or(), pr(), r.enableKeyboardNavigation && lr(), r.clickOnTrack && ir(), vr(), r.hijackInternalLinks && yr()) : (t.removeClass("jspScrollable"), u.css({
                    top: 0,
                    left: 0,
                    width: f.width() - et
                }), sr(), cr(), ar(), wi());
                r.autoReinitialise && !vt ? vt = setInterval(function () {
                    fi(r)
                }, r.autoReinitialiseDelay) : !r.autoReinitialise && vt && clearInterval(vt);
                y && t.scrollTop(0) && tt(y, !1);
                w && t.scrollLeft(0) && ct(w, !1);
                t.trigger("jsp-initialised", [p || b])
            }

            function di() {
                b && (f.append(n('<div class="jspVerticalBar" />').append(n('<div class="jspCap jspCapTop" />'), n('<div class="jspTrack" />').append(n('<div class="jspDrag" />').append(n('<div class="jspDragTop" />'), n('<div class="jspDragBottom" />'))), n('<div class="jspCap jspCapBottom" />'))), gt = f.find(">.jspVerticalBar"), d = gt.find(">.jspTrack"), v = d.find(">.jspDrag"), r.showArrows && (yt = n('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", nt(0, -1)).bind("click.jsp", lt), pt = n('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", nt(0, 1)).bind("click.jsp", lt), r.arrowScrollOnHover && (yt.bind("mouseover.jsp", nt(0, -1, yt)), pt.bind("mouseover.jsp", nt(0, 1, pt))), pi(d, r.verticalArrowPositions, yt, pt)), at = e, f.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
                    at -= n(this).outerHeight()
                }), v.hover(function () {
                    v.addClass("jspHover")
                }, function () {
                    v.removeClass("jspHover")
                }).bind("mousedown.jsp", function (t) {
                    n("html").bind("dragstart.jsp selectstart.jsp", lt);
                    v.addClass("jspActive");
                    var i = t.pageY - v.position().top;
                    return n("html").bind("mousemove.jsp", function (n) {
                        ot(n.pageY - i, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", bi), !1
                }), vi())
            }

            function vi() {
                d.height(at + "px");
                s = 0;
                hi = r.verticalGutter + d.outerWidth();
                u.width(o - hi - et);
                try {
                    0 === gt.position().left && u.css("margin-left", hi + "px")
                } catch (n) {}
            }

            function gi() {
                p && (f.append(n('<div class="jspHorizontalBar" />').append(n('<div class="jspCap jspCapLeft" />'), n('<div class="jspTrack" />').append(n('<div class="jspDrag" />').append(n('<div class="jspDragLeft" />'), n('<div class="jspDragRight" />'))), n('<div class="jspCap jspCapRight" />'))), ni = f.find(">.jspHorizontalBar"), g = ni.find(">.jspTrack"), y = g.find(">.jspDrag"), r.showArrows && (wt = n('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", nt(-1, 0)).bind("click.jsp", lt), bt = n('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", nt(1, 0)).bind("click.jsp", lt), r.arrowScrollOnHover && (wt.bind("mouseover.jsp", nt(-1, 0, wt)), bt.bind("mouseover.jsp", nt(1, 0, bt))), pi(g, r.horizontalArrowPositions, wt, bt)), y.hover(function () {
                    y.addClass("jspHover")
                }, function () {
                    y.removeClass("jspHover")
                }).bind("mousedown.jsp", function (t) {
                    n("html").bind("dragstart.jsp selectstart.jsp", lt);
                    y.addClass("jspActive");
                    var i = t.pageX - y.position().left;
                    return n("html").bind("mousemove.jsp", function (n) {
                        ht(n.pageX - i, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", bi), !1
                }), st = f.innerWidth(), yi())
            }

            function yi() {
                f.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
                    st -= n(this).outerWidth()
                });
                g.width(st + "px");
                h = 0
            }

            function nr() {
                if (p && b) {
                    var t = g.outerHeight(),
                        i = d.outerWidth();
                    at -= t;
                    n(ni).find(">.jspCap:visible,>.jspArrow").each(function () {
                        st += n(this).outerWidth()
                    });
                    st -= i;
                    e -= i;
                    o -= t;
                    g.parent().append(n('<div class="jspCorner" />').css("width", t + "px"));
                    vi();
                    yi()
                }
                p && u.width(f.outerWidth() - et + "px");
                l = u.outerHeight();
                dt = l / e;
                p && (ft = Math.ceil(1 / si * st), ft > r.horizontalDragMaxWidth ? ft = r.horizontalDragMaxWidth : ft < r.horizontalDragMinWidth && (ft = r.horizontalDragMinWidth), y.width(ft + "px"), k = st - ft, oi(h));
                b && (ut = Math.ceil(1 / dt * at), ut > r.verticalDragMaxHeight ? ut = r.verticalDragMaxHeight : ut < r.verticalDragMinHeight && (ut = r.verticalDragMinHeight), v.height(ut + "px"), w = at - ut, ei(s))
            }

            function pi(n, t, i, r) {
                var e, u = "before",
                    f = "after";
                "os" == t && (t = /Mac/.test(navigator.platform) ? "after" : "split");
                t == u ? f = t : t == f && (u = t, e = i, i = r, r = e);
                n[u](i)[f](r)
            }

            function nt(n, t, i) {
                return function () {
                    return tr(n, t, this, i), this.blur(), !1
                }
            }

            function tr(t, i, u, f) {
                u = n(u).addClass("jspActive");
                var o, e, s = !0,
                    h = function () {
                        0 !== t && c.scrollByX(t * r.arrowButtonSpeed);
                        0 !== i && c.scrollByY(i * r.arrowButtonSpeed);
                        e = setTimeout(h, s ? r.initialDelay : r.arrowRepeatFreq);
                        s = !1
                    };
                h();
                o = f ? "mouseout.jsp" : "mouseup.jsp";
                f = f || n("html");
                f.bind(o, function () {
                    u.removeClass("jspActive");
                    e && clearTimeout(e);
                    e = null;
                    f.unbind(o)
                })
            }

            function ir() {
                wi();
                b && d.bind("mousedown.jsp", function (t) {
                    if (void 0 === t.originalTarget || t.originalTarget == t.currentTarget) {
                        var i, f = n(this),
                            v = f.offset(),
                            o = t.pageY - v.top - s,
                            h = !0,
                            a = function () {
                                var p = f.offset(),
                                    n = t.pageY - p.top - ut / 2,
                                    v = e * r.scrollPagePercent,
                                    y = w * v / (l - e);
                                if (0 > o) s - y > n ? c.scrollByY(-v) : ot(n);
                                else {
                                    if (!(o > 0)) return void u();
                                    n > s + y ? c.scrollByY(v) : ot(n)
                                }
                                i = setTimeout(a, h ? r.initialDelay : r.trackClickRepeatFreq);
                                h = !1
                            },
                            u = function () {
                                i && clearTimeout(i);
                                i = null;
                                n(document).unbind("mouseup.jsp", u)
                            };
                        return a(), n(document).bind("mouseup.jsp", u), !1
                    }
                });
                p && g.bind("mousedown.jsp", function (t) {
                    if (void 0 === t.originalTarget || t.originalTarget == t.currentTarget) {
                        var i, f = n(this),
                            v = f.offset(),
                            e = t.pageX - v.left - h,
                            s = !0,
                            l = function () {
                                var p = f.offset(),
                                    n = t.pageX - p.left - ft / 2,
                                    v = o * r.scrollPagePercent,
                                    y = k * v / (a - o);
                                if (0 > e) h - y > n ? c.scrollByX(-v) : ht(n);
                                else {
                                    if (!(e > 0)) return void u();
                                    n > h + y ? c.scrollByX(v) : ht(n)
                                }
                                i = setTimeout(l, s ? r.initialDelay : r.trackClickRepeatFreq);
                                s = !1
                            },
                            u = function () {
                                i && clearTimeout(i);
                                i = null;
                                n(document).unbind("mouseup.jsp", u)
                            };
                        return l(), n(document).bind("mouseup.jsp", u), !1
                    }
                })
            }

            function wi() {
                g && g.unbind("mousedown.jsp");
                d && d.unbind("mousedown.jsp")
            }

            function bi() {
                n("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
                v && v.removeClass("jspActive");
                y && y.removeClass("jspActive")
            }

            function ot(i, u) {
                var f;
                if (b && (0 > i ? i = 0 : i > w && (i = w), f = new n.Event("jsp-will-scroll-y"), t.trigger(f, [i]), !f.isDefaultPrevented())) {
                    var o = i || 0,
                        s = 0 === o,
                        h = o == w,
                        y = i / w,
                        a = -y * (l - e);
                    void 0 === u && (u = r.animateScroll);
                    u ? c.animate(v, "top", i, ei, function () {
                        t.trigger("jsp-user-scroll-y", [-a, s, h])
                    }) : (v.css("top", i), ei(i), t.trigger("jsp-user-scroll-y", [-a, s, h]))
                }
            }

            function ei(n) {
                void 0 === n && (n = v.position().top);
                f.scrollTop(0);
                s = n || 0;
                var i = 0 === s,
                    r = s == w,
                    h = n / w,
                    o = -h * (l - e);
                (ti != i || ri != r) && (ti = i, ri = r, t.trigger("jsp-arrow-change", [ti, ri, ii, ui]));
                rr(i, r);
                u.css("top", o);
                t.trigger("jsp-scroll-y", [-o, i, r]).trigger("scroll")
            }

            function ht(i, u) {
                var f;
                if (p && (0 > i ? i = 0 : i > k && (i = k), f = new n.Event("jsp-will-scroll-x"), t.trigger(f, [i]), !f.isDefaultPrevented())) {
                    var e = i || 0,
                        s = 0 === e,
                        h = e == k,
                        v = i / k,
                        l = -v * (a - o);
                    void 0 === u && (u = r.animateScroll);
                    u ? c.animate(y, "left", i, oi, function () {
                        t.trigger("jsp-user-scroll-x", [-l, s, h])
                    }) : (y.css("left", i), oi(i), t.trigger("jsp-user-scroll-x", [-l, s, h]))
                }
            }

            function oi(n) {
                void 0 === n && (n = y.position().left);
                f.scrollTop(0);
                h = n || 0;
                var i = 0 === h,
                    r = h == k,
                    s = n / k,
                    e = -s * (a - o);
                (ii != i || ui != r) && (ii = i, ui = r, t.trigger("jsp-arrow-change", [ti, ri, ii, ui]));
                ur(i, r);
                u.css("left", e);
                t.trigger("jsp-scroll-x", [-e, i, r]).trigger("scroll")
            }

            function rr(n, t) {
                r.showArrows && (yt[n ? "addClass" : "removeClass"]("jspDisabled"), pt[t ? "addClass" : "removeClass"]("jspDisabled"))
            }

            function ur(n, t) {
                r.showArrows && (wt[n ? "addClass" : "removeClass"]("jspDisabled"), bt[t ? "addClass" : "removeClass"]("jspDisabled"))
            }

            function tt(n, t) {
                var i = n / (l - e);
                ot(i * w, t)
            }

            function ct(n, t) {
                var i = n / (a - o);
                ht(i * k, t)
            }

            function kt(t, i, u) {
                var s, v, y, p, w, b, k, l, a, h = 0,
                    c = 0;
                try {
                    s = n(t)
                } catch (d) {
                    return
                }
                for (v = s.outerHeight(), y = s.outerWidth(), f.scrollTop(0), f.scrollLeft(0); !s.is(".jspPane");)
                    if (h += s.position().top, c += s.position().left, s = s.offsetParent(), /^body|html$/i.test(s[0].nodeName)) return;
                p = rt();
                b = p + e;
                p > h || i ? l = h - r.horizontalGutter : h + v > b && (l = h - e + v + r.horizontalGutter);
                isNaN(l) || tt(l, u);
                w = it();
                k = w + o;
                w > c || i ? a = c - r.horizontalGutter : c + y > k && (a = c - o + y + r.horizontalGutter);
                isNaN(a) || ct(a, u)
            }

            function it() {
                return -u.position().left
            }

            function rt() {
                return -u.position().top
            }

            function fr() {
                var n = l - e;
                return n > 20 && n - rt() < 10
            }

            function er() {
                var n = a - o;
                return n > 20 && n - it() < 10
            }

            function or() {
                f.unbind(ai).bind(ai, function (n, t, i, u) {
                    h || (h = 0);
                    s || (s = 0);
                    var e = h,
                        o = s,
                        f = n.deltaFactor || r.mouseWheelSpeed;
                    return c.scrollBy(i * f, -u * f, !1), e == h && o == s
                })
            }

            function sr() {
                f.unbind(ai)
            }

            function lt() {
                return !1
            }

            function hr() {
                u.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (n) {
                    kt(n.target, !1)
                })
            }

            function cr() {
                u.find(":input,a").unbind("focus.jsp")
            }

            function lr() {
                function v() {
                    var n = h,
                        t = s;
                    switch (i) {
                        case 40:
                            c.scrollByY(r.keyboardSpeed, !1);
                            break;
                        case 38:
                            c.scrollByY(-r.keyboardSpeed, !1);
                            break;
                        case 34:
                        case 32:
                            c.scrollByY(e * r.scrollPagePercent, !1);
                            break;
                        case 33:
                            c.scrollByY(-e * r.scrollPagePercent, !1);
                            break;
                        case 39:
                            c.scrollByX(r.keyboardSpeed, !1);
                            break;
                        case 37:
                            c.scrollByX(-r.keyboardSpeed, !1)
                    }
                    return a = n != h || t != s
                }
                var i, a, o = [];
                p && o.push(ni[0]);
                b && o.push(gt[0]);
                u.bind("focus.jsp", function () {
                    t.focus()
                });
                t.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function (t) {
                    if (t.target === this || o.length && n(t.target).closest(o).length) {
                        var r = h,
                            u = s;
                        switch (t.keyCode) {
                            case 40:
                            case 38:
                            case 34:
                            case 32:
                            case 33:
                            case 39:
                            case 37:
                                i = t.keyCode;
                                v();
                                break;
                            case 35:
                                tt(l - e);
                                i = null;
                                break;
                            case 36:
                                tt(0);
                                i = null
                        }
                        return a = t.keyCode == i && r != h || u != s, !a
                    }
                }).bind("keypress.jsp", function (t) {
                    return t.keyCode == i && v(), t.target === this || o.length && n(t.target).closest(o).length ? !a : void 0
                });
                r.hideFocus ? (t.css("outline", "none"), "hideFocus" in f[0] && t.attr("hideFocus", !0)) : (t.css("outline", ""), "hideFocus" in f[0] && t.attr("hideFocus", !1))
            }

            function ar() {
                t.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp");
                u.unbind(".jsp")
            }

            function vr() {
                if (location.hash && location.hash.length > 1) {
                    var t, r, i = escape(location.hash.substr(1));
                    try {
                        t = n("#" + i + ', a[name="' + i + '"]')
                    } catch (e) {
                        return
                    }
                    t.length && u.find(i) && (0 === f.scrollTop() ? r = setInterval(function () {
                        f.scrollTop() > 0 && (kt(t, !0), n(document).scrollTop(f.position().top), clearInterval(r))
                    }, 50) : (kt(t, !0), n(document).scrollTop(f.position().top)))
                }
            }

            function yr() {
                n(document.body).data("jspHijack") || (n(document.body).data("jspHijack", !0), n(document.body).delegate('a[href*="#"]', "click", function (t) {
                    var u, i, r, o, f, e, h = this.href.substr(0, this.href.indexOf("#")),
                        s = location.href;
                    if (-1 !== location.href.indexOf("#") && (s = location.href.substr(0, location.href.indexOf("#"))), h === s) {
                        u = escape(this.href.substr(this.href.indexOf("#") + 1));
                        try {
                            i = n("#" + u + ', a[name="' + u + '"]')
                        } catch (c) {
                            return
                        }
                        i.length && (r = i.closest(".jspScrollable"), o = r.data("jsp"), o.scrollToElement(i, !0), r[0].scrollIntoView && (f = n(window).scrollTop(), e = i.offset().top, (f > e || e > f + n(window).height()) && r[0].scrollIntoView()), t.preventDefault())
                    }
                }))
            }

            function pr() {
                var u, e, t, i, n, r = !1;
                f.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function (f) {
                    var o = f.originalEvent.touches[0];
                    u = it();
                    e = rt();
                    t = o.pageX;
                    i = o.pageY;
                    n = !1;
                    r = !0
                }).bind("touchmove.jsp", function (f) {
                    if (r) {
                        var o = f.originalEvent.touches[0],
                            l = h,
                            a = s;
                        return c.scrollTo(u + t - o.pageX, e + i - o.pageY), n = n || Math.abs(t - o.pageX) > 5 || Math.abs(i - o.pageY) > 5, l == h && a == s
                    }
                }).bind("touchend.jsp", function () {
                    r = !1
                }).bind("click.jsp-touchclick", function () {
                    if (n) return (n = !1, !1)
                })
            }

            function wr() {
                var n = rt(),
                    i = it();
                t.removeClass("jspScrollable").unbind(".jsp");
                u.unbind(".jsp");
                t.replaceWith(li.append(u.children()));
                li.scrollTop(n);
                li.scrollLeft(i);
                vt && clearInterval(vt)
            }
            var r, u, o, e, f, a, l, si, dt, b, p, v, w, s, y, k, h, gt, d, hi, at, ut, yt, pt, ni, g, st, ft, wt, bt, vt, ci, et, ki, c = this,
                ti = !0,
                ii = !0,
                ri = !1,
                ui = !1,
                li = t.clone(!1, !1).empty(),
                ai = n.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            "border-box" === t.css("box-sizing") ? (ci = 0, et = 0) : (ci = t.css("paddingTop") + " " + t.css("paddingRight") + " " + t.css("paddingBottom") + " " + t.css("paddingLeft"), et = (parseInt(t.css("paddingLeft"), 10) || 0) + (parseInt(t.css("paddingRight"), 10) || 0));
            n.extend(c, {
                reinitialise: function (t) {
                    t = n.extend({}, r, t);
                    fi(t)
                },
                scrollToElement: function (n, t, i) {
                    kt(n, t, i)
                },
                scrollTo: function (n, t, i) {
                    ct(n, i);
                    tt(t, i)
                },
                scrollToX: function (n, t) {
                    ct(n, t)
                },
                scrollToY: function (n, t) {
                    tt(n, t)
                },
                scrollToPercentX: function (n, t) {
                    ct(n * (a - o), t)
                },
                scrollToPercentY: function (n, t) {
                    tt(n * (l - e), t)
                },
                scrollBy: function (n, t, i) {
                    c.scrollByX(n, i);
                    c.scrollByY(t, i)
                },
                scrollByX: function (n, t) {
                    var i = it() + Math[0 > n ? "floor" : "ceil"](n),
                        r = i / (a - o);
                    ht(r * k, t)
                },
                scrollByY: function (n, t) {
                    var i = rt() + Math[0 > n ? "floor" : "ceil"](n),
                        r = i / (l - e);
                    ot(r * w, t)
                },
                positionDragX: function (n, t) {
                    ht(n, t)
                },
                positionDragY: function (n, t) {
                    ot(n, t)
                },
                animate: function (n, t, i, u, f) {
                    var e = {};
                    e[t] = i;
                    n.animate(e, {
                        duration: r.animateDuration,
                        easing: r.animateEase,
                        queue: !1,
                        step: u,
                        complete: f
                    })
                },
                getContentPositionX: function () {
                    return it()
                },
                getContentPositionY: function () {
                    return rt()
                },
                getContentWidth: function () {
                    return a
                },
                getContentHeight: function () {
                    return l
                },
                getPercentScrolledX: function () {
                    return it() / (a - o)
                },
                getPercentScrolledY: function () {
                    return rt() / (l - e)
                },
                getIsScrollableH: function () {
                    return p
                },
                getIsScrollableV: function () {
                    return b
                },
                getContentPane: function () {
                    return u
                },
                scrollToBottom: function (n) {
                    ot(w, n)
                },
                hijackInternalLinks: n.noop,
                destroy: function () {
                    wr()
                }
            });
            fi(i)
        }
        return t = n.extend({}, n.fn.jScrollPane.defaults, t), n.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
            t[this] = t[this] || t.speed
        }), this.each(function () {
            var r = n(this),
                u = r.data("jsp");
            u ? u.reinitialise(t) : (n("script", r).filter('[type="text/javascript"],:not([type])').remove(), u = new i(r, t), r.data("jsp", u))
        })
    };
    n.fn.jScrollPane.defaults = {
        showArrows: !1,
        maintainPosition: !0,
        stickToBottom: !1,
        stickToRight: !1,
        clickOnTrack: !0,
        autoReinitialise: !1,
        autoReinitialiseDelay: 500,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        contentWidth: void 0,
        animateScroll: !1,
        animateDuration: 300,
        animateEase: "linear",
        hijackInternalLinks: !1,
        verticalGutter: 4,
        horizontalGutter: 4,
        mouseWheelSpeed: 3,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: !1,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: "split",
        horizontalArrowPositions: "split",
        enableKeyboardNavigation: !0,
        hideFocus: !1,
        keyboardSpeed: 0,
        initialDelay: 300,
        speed: 30,
        scrollPagePercent: .8
    }
});
"undefined" == typeof jQuery && (jQuery = "function" == typeof require ? $ = require("jquery") : $);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (n, t, i, r, u) {
        return jQuery.easing[jQuery.easing.def](n, t, i, r, u)
    },
    easeInQuad: function (n, t, i, r, u) {
        return r * (t /= u) * t + i
    },
    easeOutQuad: function (n, t, i, r, u) {
        return -r * (t /= u) * (t - 2) + i
    },
    easeInOutQuad: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t + i : -r / 2 * (--t * (t - 2) - 1) + i
    },
    easeInCubic: function (n, t, i, r, u) {
        return r * (t /= u) * t * t + i
    },
    easeOutCubic: function (n, t, i, r, u) {
        return r * ((t = t / u - 1) * t * t + 1) + i
    },
    easeInOutCubic: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t * t + i : r / 2 * ((t -= 2) * t * t + 2) + i
    },
    easeInQuart: function (n, t, i, r, u) {
        return r * (t /= u) * t * t * t + i
    },
    easeOutQuart: function (n, t, i, r, u) {
        return -r * ((t = t / u - 1) * t * t * t - 1) + i
    },
    easeInOutQuart: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t * t * t + i : -r / 2 * ((t -= 2) * t * t * t - 2) + i
    },
    easeInQuint: function (n, t, i, r, u) {
        return r * (t /= u) * t * t * t * t + i
    },
    easeOutQuint: function (n, t, i, r, u) {
        return r * ((t = t / u - 1) * t * t * t * t + 1) + i
    },
    easeInOutQuint: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t * t * t * t + i : r / 2 * ((t -= 2) * t * t * t * t + 2) + i
    },
    easeInSine: function (n, t, i, r, u) {
        return -r * Math.cos(t / u * (Math.PI / 2)) + r + i
    },
    easeOutSine: function (n, t, i, r, u) {
        return r * Math.sin(t / u * (Math.PI / 2)) + i
    },
    easeInOutSine: function (n, t, i, r, u) {
        return -r / 2 * (Math.cos(Math.PI * t / u) - 1) + i
    },
    easeInExpo: function (n, t, i, r, u) {
        return 0 == t ? i : r * Math.pow(2, 10 * (t / u - 1)) + i
    },
    easeOutExpo: function (n, t, i, r, u) {
        return t == u ? i + r : r * (-Math.pow(2, -10 * t / u) + 1) + i
    },
    easeInOutExpo: function (n, t, i, r, u) {
        return 0 == t ? i : t == u ? i + r : (t /= u / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + i : r / 2 * (-Math.pow(2, -10 * --t) + 2) + i
    },
    easeInCirc: function (n, t, i, r, u) {
        return -r * (Math.sqrt(1 - (t /= u) * t) - 1) + i
    },
    easeOutCirc: function (n, t, i, r, u) {
        return r * Math.sqrt(1 - (t = t / u - 1) * t) + i
    },
    easeInOutCirc: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + i : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
    },
    easeInElastic: function (n, t, i, r, u) {
        var o = 1.70158,
            f = 0,
            e = r;
        return 0 == t ? i : 1 == (t /= u) ? i + r : ((f || (f = .3 * u), e < Math.abs(r)) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), -(e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f)) + i)
    },
    easeOutElastic: function (n, t, i, r, u) {
        var o = 1.70158,
            f = 0,
            e = r;
        return 0 == t ? i : 1 == (t /= u) ? i + r : ((f || (f = .3 * u), e < Math.abs(r)) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), e * Math.pow(2, -10 * t) * Math.sin((t * u - o) * 2 * Math.PI / f) + r + i)
    },
    easeInOutElastic: function (n, t, i, r, u) {
        var o = 1.70158,
            f = 0,
            e = r;
        return 0 == t ? i : 2 == (t /= u / 2) ? i + r : ((f || (f = u * .3 * 1.5), e < Math.abs(r)) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), 1 > t ? -.5 * e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f) + i : e * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f) * .5 + r + i)
    },
    easeInBack: function (n, t, i, r, u, f) {
        return void 0 == f && (f = 1.70158), r * (t /= u) * t * ((f + 1) * t - f) + i
    },
    easeOutBack: function (n, t, i, r, u, f) {
        return void 0 == f && (f = 1.70158), r * ((t = t / u - 1) * t * ((f + 1) * t + f) + 1) + i
    },
    easeInOutBack: function (n, t, i, r, u, f) {
        return void 0 == f && (f = 1.70158), (t /= u / 2) < 1 ? r / 2 * t * t * (((f *= 1.525) + 1) * t - f) + i : r / 2 * ((t -= 2) * t * (((f *= 1.525) + 1) * t + f) + 2) + i
    },
    easeInBounce: function (n, t, i, r, u) {
        return r - jQuery.easing.easeOutBounce(n, u - t, 0, r, u) + i
    },
    easeOutBounce: function (n, t, i, r, u) {
        return (t /= u) < 1 / 2.75 ? r * 7.5625 * t * t + i : 2 / 2.75 > t ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : 2.5 / 2.75 > t ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
    },
    easeInOutBounce: function (n, t, i, r, u) {
        return u / 2 > t ? .5 * jQuery.easing.easeInBounce(n, 2 * t, 0, r, u) + i : .5 * jQuery.easing.easeOutBounce(n, 2 * t - u, 0, r, u) + .5 * r + i
    }
});
jQuery.extend(jQuery.easing, {
    easeInOutMaterial: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t + i : r / 4 * ((t -= 2) * t * t + 2) + i
    }
});
jQuery.Velocity ? console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity.") : (! function (n) {
    function o(n) {
        var i = n.length,
            r = t.type(n);
        return "function" === r || t.isWindow(n) ? !1 : 1 === n.nodeType && i ? !0 : "array" === r || 0 === i || "number" == typeof i && i > 0 && i - 1 in n
    }
    var t, i;
    if (!n.jQuery) {
        t = function (n, i) {
            return new t.fn.init(n, i)
        };
        t.isWindow = function (n) {
            return null != n && n == n.window
        };
        t.type = function (n) {
            return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? r[s.call(n)] || "object" : typeof n
        };
        t.isArray = Array.isArray || function (n) {
            return "array" === t.type(n)
        };
        t.isPlainObject = function (n) {
            var i;
            if (!n || "object" !== t.type(n) || n.nodeType || t.isWindow(n)) return !1;
            try {
                if (n.constructor && !f.call(n, "constructor") && !f.call(n.constructor.prototype, "isPrototypeOf")) return !1
            } catch (r) {
                return !1
            }
            for (i in n);
            return void 0 === i || f.call(n, i)
        };
        t.each = function (n, t, i) {
            var u, r = 0,
                f = n.length,
                e = o(n);
            if (i) {
                if (e)
                    for (; f > r && (u = t.apply(n[r], i), u !== !1); r++);
                else
                    for (r in n)
                        if (u = t.apply(n[r], i), u === !1) break
            } else if (e)
                for (; f > r && (u = t.call(n[r], r, n[r]), u !== !1); r++);
            else
                for (r in n)
                    if (u = t.call(n[r], r, n[r]), u === !1) break;
            return n
        };
        t.data = function (n, r, u) {
            var e, f;
            if (void 0 === u) {
                if (f = n[t.expando], e = f && i[f], void 0 === r) return e;
                if (e && r in e) return e[r]
            } else if (void 0 !== r) return f = n[t.expando] || (n[t.expando] = ++t.uuid), i[f] = i[f] || {}, i[f][r] = u, u
        };
        t.removeData = function (n, r) {
            var u = n[t.expando],
                f = u && i[u];
            f && t.each(r, function (n, t) {
                delete f[t]
            })
        };
        t.extend = function () {
            var r, e, i, f, o, s, n = arguments[0] || {},
                u = 1,
                c = arguments.length,
                h = !1;
            for ("boolean" == typeof n && (h = n, n = arguments[u] || {}, u++), "object" != typeof n && "function" !== t.type(n) && (n = {}), u === c && (n = this, u--); c > u; u++)
                if (null != (o = arguments[u]))
                    for (f in o) r = n[f], i = o[f], n !== i && (h && i && (t.isPlainObject(i) || (e = t.isArray(i))) ? (e ? (e = !1, s = r && t.isArray(r) ? r : []) : s = r && t.isPlainObject(r) ? r : {}, n[f] = t.extend(h, s, i)) : void 0 !== i && (n[f] = i));
            return n
        };
        t.queue = function (n, i, r) {
            function f(n, t) {
                var i = t || [];
                return null != n && (o(Object(n)) ? ! function (n, t) {
                    for (var r = +t.length, i = 0, u = n.length; r > i;) n[u++] = t[i++];
                    if (r !== r)
                        for (; void 0 !== t[i];) n[u++] = t[i++];
                    return n.length = u, n
                }(i, "string" == typeof n ? [n] : n) : [].push.call(i, n)), i
            }
            if (n) {
                i = (i || "fx") + "queue";
                var u = t.data(n, i);
                return r ? (!u || t.isArray(r) ? u = t.data(n, i, f(r)) : u.push(r), u) : u || []
            }
        };
        t.dequeue = function (n, i) {
            t.each(n.nodeType ? [n] : n, function (n, r) {
                i = i || "fx";
                var f = t.queue(r, i),
                    u = f.shift();
                "inprogress" === u && (u = f.shift());
                u && ("fx" === i && f.unshift("inprogress"), u.call(r, function () {
                    t.dequeue(r, i)
                }))
            })
        };
        t.fn = t.prototype = {
            init: function (n) {
                if (n.nodeType) return this[0] = n, this;
                throw new Error("Not a DOM node.");
            },
            offset: function () {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (n.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: t.left + (n.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function () {
                function n() {
                    for (var n = this.offsetParent || document; n && !1 && "static" === n.style.position;) n = n.offsetParent;
                    return n || document
                }
                var u = this[0],
                    n = n.apply(u),
                    i = this.offset(),
                    r = /^(?:body|html)$/i.test(n.nodeName) ? {
                        top: 0,
                        left: 0
                    } : t(n).offset();
                return i.top -= parseFloat(u.style.marginTop) || 0, i.left -= parseFloat(u.style.marginLeft) || 0, n.style && (r.top += parseFloat(n.style.borderTopWidth) || 0, r.left += parseFloat(n.style.borderLeftWidth) || 0), {
                    top: i.top - r.top,
                    left: i.left - r.left
                }
            }
        };
        i = {};
        t.expando = "velocity" + (new Date).getTime();
        t.uuid = 0;
        for (var r = {}, f = r.hasOwnProperty, s = r.toString, e = "Boolean Number String Function Array Date RegExp Object Error".split(" "), u = 0; u < e.length; u++) r["[object " + e[u] + "]"] = e[u].toLowerCase();
        t.fn.init.prototype = t.fn;
        n.Velocity = {
            Utilities: t
        }
    }
}(window), function (n) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : n()
}(function () {
    return function (n, t, i, r) {
        function tt(n) {
            for (var t, i = -1, u = n ? n.length : 0, r = []; ++i < u;) t = n[i], t && r.push(t);
            return r
        }

        function y(n) {
            return s.isWrapped(n) ? n = [].slice.call(n) : s.isNode(n) && (n = [n]), n
        }

        function e(n) {
            var t = o.data(n, "velocity");
            return null === t ? r : t
        }

        function it(n) {
            return function (t) {
                return Math.round(t * n) * (1 / n)
            }
        }

        function p(n, i, r, u) {
            function l(n, t) {
                return 1 - 3 * t + 3 * n
            }

            function a(n, t) {
                return 3 * t - 6 * n
            }

            function v(n) {
                return 3 * n
            }

            function s(n, t, i) {
                return ((l(t, i) * n + a(t, i)) * n + v(t)) * n
            }

            function y(n, t, i) {
                return 3 * l(t, i) * n * n + 2 * a(t, i) * n + v(t)
            }

            function b(t, i) {
                for (var f, e, u = 0; tt > u; ++u) {
                    if (f = y(i, n, r), 0 === f) return i;
                    e = s(i, n, r) - t;
                    i -= e / f
                }
                return i
            }

            function k() {
                for (var t = 0; e > t; ++t) o[t] = s(t * h, n, r)
            }

            function d(t, i, u) {
                var e, f, o = 0;
                do f = i + (u - i) / 2, e = s(f, n, r) - t, e > 0 ? u = f : i = f; while (Math.abs(e) > rt && ++o < ut);
                return f
            }

            function g(t) {
                for (var u = 0, i = 1, c = e - 1; i != c && o[i] <= t; ++i) u += h;
                --i;
                var l = (t - o[i]) / (o[i + 1] - o[i]),
                    f = u + l * h,
                    s = y(f, n, r);
                return s >= it ? b(t, f) : 0 == s ? f : d(t, u, u + h)
            }

            function nt() {
                p = !0;
                (n != i || r != u) && k()
            }
            var tt = 4,
                it = .001,
                rt = 1e-7,
                ut = 10,
                e = 11,
                h = 1 / (e - 1),
                ft = "Float32Array" in t,
                f, w;
            if (4 !== arguments.length) return !1;
            for (f = 0; 4 > f; ++f)
                if ("number" != typeof arguments[f] || isNaN(arguments[f]) || !isFinite(arguments[f])) return !1;
            n = Math.min(n, 1);
            r = Math.min(r, 1);
            n = Math.max(n, 0);
            r = Math.max(r, 0);
            var o = ft ? new Float32Array(e) : new Array(e),
                p = !1,
                c = function (t) {
                    return p || nt(), n === i && r === u ? t : 0 === t ? 0 : 1 === t ? 1 : s(g(t), i, u)
                };
            return c.getControlPoints = function () {
                return [{
                    x: n,
                    y: i
                }, {
                    x: r,
                    y: u
                }]
            }, w = "generateBezier(" + [n, i, r, u] + ")", c.toString = function () {
                return w
            }, c
        }

        function w(n, t) {
            var i = n;
            return s.isString(n) ? f.Easings[n] || (i = !1) : i = s.isArray(n) && 1 === n.length ? it.apply(null, n) : s.isArray(n) && 2 === n.length ? nt.apply(null, n.concat([t])) : s.isArray(n) && 4 === n.length ? p.apply(null, n) : !1, i === !1 && (i = f.Easings[f.defaults.easing] ? f.defaults.easing : g), i
        }

        function a(n) {
            var d, ut, c, nt, h, it, ct, v, p, i, lt, et, k, ot, rt;
            if (n)
                for (d = (new Date).getTime(), ut = f.State.calls.length, ut > 1e4 && (f.State.calls = tt(f.State.calls)), c = 0; ut > c; c++)
                    if (f.State.calls[c]) {
                        var w = f.State.calls[c],
                            st = w[0],
                            t = w[2],
                            y = w[3],
                            at = !!y,
                            ht = null;
                        y || (y = f.State.calls[c][3] = d - 16);
                        for (var g = Math.min((d - y) / t.duration, 1), ft = 0, vt = st.length; vt > ft; ft++)
                            if (nt = st[ft], h = nt.element, e(h)) {
                                it = !1;
                                t.display !== r && null !== t.display && "none" !== t.display && ("flex" === t.display && (ct = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"], o.each(ct, function (n, t) {
                                    u.setPropertyValue(h, "display", t)
                                })), u.setPropertyValue(h, "display", t.display));
                                t.visibility !== r && "hidden" !== t.visibility && u.setPropertyValue(h, "visibility", t.visibility);
                                for (v in nt)
                                    if ("element" !== v) {
                                        if (i = nt[v], lt = s.isString(i.easing) ? f.Easings[i.easing] : i.easing, 1 === g) p = i.endValue;
                                        else if (et = i.endValue - i.startValue, p = i.startValue + et * lt(g, t, et), !at && p === i.currentValue) continue;
                                        (i.currentValue = p, "tween" === v) ? ht = p: (u.Hooks.registered[v] && (k = u.Hooks.getRoot(v), ot = e(h).rootPropertyValueCache[k], ot && (i.rootPropertyValue = ot)), rt = u.setPropertyValue(h, v, i.currentValue + (0 === parseFloat(p) ? "" : i.unitType), i.rootPropertyValue, i.scrollData), u.Hooks.registered[v] && (e(h).rootPropertyValueCache[k] = u.Normalizations.registered[k] ? u.Normalizations.registered[k]("extract", null, rt[1]) : rt[1]), "transform" === rt[0] && (it = !0))
                                    }
                                t.mobileHA && e(h).transformCache.translate3d === r && (e(h).transformCache.translate3d = "(0px, 0px, 0px)", it = !0);
                                it && u.flushTransformCache(h)
                            }
                        t.display !== r && "none" !== t.display && (f.State.calls[c][2].display = !1);
                        t.visibility !== r && "hidden" !== t.visibility && (f.State.calls[c][2].visibility = !1);
                        t.progress && t.progress.call(w[1], w[1], g, Math.max(0, y + t.duration - d), y, ht);
                        1 === g && b(c)
                    }
            f.State.isTicking && l(a)
        }

        function b(n, t) {
            var i, c, l, b;
            if (!f.State.calls[n]) return !1;
            for (var v = f.State.calls[n][0], a = f.State.calls[n][1], s = f.State.calls[n][2], y = f.State.calls[n][4], p = !1, h = 0, w = v.length; w > h; h++) {
                if (i = v[h].element, (t || s.loop || ("none" === s.display && u.setPropertyValue(i, "display", s.display), "hidden" === s.visibility && u.setPropertyValue(i, "visibility", s.visibility)), s.loop !== !0 && (o.queue(i)[1] === r || !/\.velocityQueueEntryFlag/i.test(o.queue(i)[1])) && e(i)) && (e(i).isAnimating = !1, e(i).rootPropertyValueCache = {}, c = !1, o.each(u.Lists.transforms3D, function (n, t) {
                        var u = /^scale/.test(t) ? 1 : 0,
                            f = e(i).transformCache[t];
                        e(i).transformCache[t] !== r && new RegExp("^\\(" + u + "[^.]").test(f) && (c = !0, delete e(i).transformCache[t])
                    }), s.mobileHA && (c = !0, delete e(i).transformCache.translate3d), c && u.flushTransformCache(i), u.Values.removeClass(i, "velocity-animating")), !t && s.complete && !s.loop && h === w - 1) try {
                    s.complete.call(a, a)
                } catch (k) {
                    setTimeout(function () {
                        throw k;
                    }, 1)
                }
                y && s.loop !== !0 && y(a);
                e(i) && s.loop === !0 && !t && (o.each(e(i).tweensContainer, function (n, t) {
                    /^rotate/.test(n) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360);
                    /^backgroundPosition/.test(n) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                }), f(i, "reverse", {
                    loop: !0,
                    delay: s.delay
                }));
                s.queue !== !1 && o.dequeue(i, s.queue)
            }
            for (f.State.calls[n] = !1, l = 0, b = f.State.calls.length; b > l; l++)
                if (f.State.calls[l] !== !1) {
                    p = !0;
                    break
                }
            p === !1 && (f.State.isTicking = !1, delete f.State.calls, f.State.calls = [])
        }
        var o, h = function () {
                var n, t;
                if (i.documentMode) return i.documentMode;
                for (n = 7; n > 4; n--)
                    if (t = i.createElement("div"), t.innerHTML = "<!--[if IE " + n + "]><span><\/span><![endif]-->", t.getElementsByTagName("span").length) return t = null, n;
                return r
            }(),
            k = function () {
                var n = 0;
                return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
                    var i, r = (new Date).getTime();
                    return i = Math.max(0, 16 - (r - n)), n = r + i, setTimeout(function () {
                        t(r + i)
                    }, i)
                }
            }(),
            s = {
                isString: function (n) {
                    return "string" == typeof n
                },
                isArray: Array.isArray || function (n) {
                    return "[object Array]" === Object.prototype.toString.call(n)
                },
                isFunction: function (n) {
                    return "[object Function]" === Object.prototype.toString.call(n)
                },
                isNode: function (n) {
                    return n && n.nodeType
                },
                isNodeList: function (n) {
                    return "object" == typeof n && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(n)) && n.length !== r && (0 === n.length || "object" == typeof n[0] && n[0].nodeType > 0)
                },
                isWrapped: function (n) {
                    return n && (n.jquery || t.Zepto && t.Zepto.zepto.isZ(n))
                },
                isSVG: function (n) {
                    return t.SVGElement && n instanceof t.SVGElement
                },
                isEmptyObject: function (n) {
                    for (var t in n) return !1;
                    return !0
                }
            },
            d = !1,
            nt, u, c, l;
        if (n.fn && n.fn.jquery ? (o = n, d = !0) : o = t.Velocity.Utilities, 8 >= h && !d) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= h) return void(jQuery.fn.velocity = jQuery.fn.animate);
        var v = 400,
            g = "swing",
            f = {
                State: {
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                    isAndroid: /Android/i.test(navigator.userAgent),
                    isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                    isChrome: t.chrome,
                    isFirefox: /Firefox/i.test(navigator.userAgent),
                    prefixElement: i.createElement("div"),
                    prefixMatches: {},
                    scrollAnchor: null,
                    scrollPropertyLeft: null,
                    scrollPropertyTop: null,
                    isTicking: !1,
                    calls: []
                },
                CSS: {},
                Utilities: o,
                Redirects: {},
                Easings: {},
                Promise: t.Promise,
                defaults: {
                    queue: "",
                    duration: v,
                    easing: g,
                    begin: r,
                    complete: r,
                    progress: r,
                    display: r,
                    visibility: r,
                    loop: !1,
                    delay: !1,
                    mobileHA: !0,
                    _cacheValues: !0
                },
                init: function (n) {
                    o.data(n, "velocity", {
                        isSVG: s.isSVG(n),
                        isAnimating: !1,
                        computedStyle: null,
                        tweensContainer: null,
                        rootPropertyValueCache: {},
                        transformCache: {}
                    })
                },
                hook: null,
                mock: !1,
                version: {
                    major: 1,
                    minor: 2,
                    patch: 2
                },
                debug: !1
            };
        return t.pageYOffset !== r ? (f.State.scrollAnchor = t, f.State.scrollPropertyLeft = "pageXOffset", f.State.scrollPropertyTop = "pageYOffset") : (f.State.scrollAnchor = i.documentElement || i.body.parentNode || i.body, f.State.scrollPropertyLeft = "scrollLeft", f.State.scrollPropertyTop = "scrollTop"), nt = function () {
            function t(n) {
                return -n.tension * n.x - n.friction * n.v
            }

            function n(n, i, r) {
                var u = {
                    x: n.x + r.dx * i,
                    v: n.v + r.dv * i,
                    tension: n.tension,
                    friction: n.friction
                };
                return {
                    dx: u.v,
                    dv: t(u)
                }
            }

            function i(i, r) {
                var u = {
                        dx: i.v,
                        dv: t(i)
                    },
                    f = n(i, .5 * r, u),
                    e = n(i, .5 * r, f),
                    o = n(i, r, e),
                    s = 1 / 6 * (u.dx + 2 * (f.dx + e.dx) + o.dx),
                    h = 1 / 6 * (u.dv + 2 * (f.dv + e.dv) + o.dv);
                return i.x = i.x + s * r, i.v = i.v + h * r, i
            }
            return function r(n, t, u) {
                var o, s, f, h = {
                        x: -1,
                        v: 0,
                        tension: null,
                        friction: null
                    },
                    c = [0],
                    e = 0,
                    l = .0001,
                    a = .016;
                for (n = parseFloat(n) || 500, t = parseFloat(t) || 20, u = u || null, h.tension = n, h.friction = t, o = null !== u, o ? (e = r(n, t), s = e / u * a) : s = a; f = i(f || h, s), c.push(1 + f.x), e += 16, Math.abs(f.x) > l && Math.abs(f.v) > l;);
                return o ? function (n) {
                    return c[n * (c.length - 1) | 0]
                } : e
            }
        }(), f.Easings = {
            linear: function (n) {
                return n
            },
            swing: function (n) {
                return .5 - Math.cos(n * Math.PI) / 2
            },
            spring: function (n) {
                return 1 - Math.cos(4.5 * n * Math.PI) * Math.exp(6 * -n)
            }
        }, o.each([
            ["ease", [.25, .1, .25, 1]],
            ["ease-in", [.42, 0, 1, 1]],
            ["ease-out", [0, 0, .58, 1]],
            ["ease-in-out", [.42, 0, .58, 1]],
            ["easeInSine", [.47, 0, .745, .715]],
            ["easeOutSine", [.39, .575, .565, 1]],
            ["easeInOutSine", [.445, .05, .55, .95]],
            ["easeInQuad", [.55, .085, .68, .53]],
            ["easeOutQuad", [.25, .46, .45, .94]],
            ["easeInOutQuad", [.455, .03, .515, .955]],
            ["easeInCubic", [.55, .055, .675, .19]],
            ["easeOutCubic", [.215, .61, .355, 1]],
            ["easeInOutCubic", [.645, .045, .355, 1]],
            ["easeInQuart", [.895, .03, .685, .22]],
            ["easeOutQuart", [.165, .84, .44, 1]],
            ["easeInOutQuart", [.77, 0, .175, 1]],
            ["easeInQuint", [.755, .05, .855, .06]],
            ["easeOutQuint", [.23, 1, .32, 1]],
            ["easeInOutQuint", [.86, 0, .07, 1]],
            ["easeInExpo", [.95, .05, .795, .035]],
            ["easeOutExpo", [.19, 1, .22, 1]],
            ["easeInOutExpo", [1, 0, 0, 1]],
            ["easeInCirc", [.6, .04, .98, .335]],
            ["easeOutCirc", [.075, .82, .165, 1]],
            ["easeInOutCirc", [.785, .135, .15, .86]]
        ], function (n, t) {
            f.Easings[t[0]] = p.apply(null, t[1])
        }), u = f.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function () {
                    for (var e, i, r, t, f, o, s, n = 0; n < u.Lists.colors.length; n++) e = "color" === u.Lists.colors[n] ? "0 0 0 1" : "255 255 255 1", u.Hooks.templates[u.Lists.colors[n]] = ["Red Green Blue Alpha", e];
                    if (h)
                        for (i in u.Hooks.templates) r = u.Hooks.templates[i], t = r[0].split(" "), f = r[1].match(u.RegEx.valueSplit), "Color" === t[0] && (t.push(t.shift()), f.push(f.shift()), u.Hooks.templates[i] = [t.join(" "), f.join(" ")]);
                    for (i in u.Hooks.templates) {
                        r = u.Hooks.templates[i];
                        t = r[0].split(" ");
                        for (n in t) o = i + t[n], s = n, u.Hooks.registered[o] = [i, s]
                    }
                },
                getRoot: function (n) {
                    var t = u.Hooks.registered[n];
                    return t ? t[0] : n
                },
                cleanRootPropertyValue: function (n, t) {
                    return u.RegEx.valueUnwrap.test(t) && (t = t.match(u.RegEx.valueUnwrap)[1]), u.Values.isCSSNullValue(t) && (t = u.Hooks.templates[n][1]), t
                },
                extractValue: function (n, t) {
                    var i = u.Hooks.registered[n],
                        r, f;
                    return i ? (r = i[0], f = i[1], t = u.Hooks.cleanRootPropertyValue(r, t), t.toString().match(u.RegEx.valueSplit)[f]) : t
                },
                injectValue: function (n, t, i) {
                    var r = u.Hooks.registered[n],
                        f, s, e, o;
                    return r ? (e = r[0], o = r[1], i = u.Hooks.cleanRootPropertyValue(e, i), f = i.toString().match(u.RegEx.valueSplit), f[o] = t, s = f.join(" ")) : i
                }
            },
            Normalizations: {
                registered: {
                    clip: function (n, t, i) {
                        switch (n) {
                            case "name":
                                return "clip";
                            case "extract":
                                var r;
                                return u.RegEx.wrappedValueAlreadyExtracted.test(i) ? r = i : (r = i.toString().match(u.RegEx.valueUnwrap), r = r ? r[1].replace(/,(\s+)?/g, " ") : i), r;
                            case "inject":
                                return "rect(" + i + ")"
                        }
                    },
                    blur: function (n, t, i) {
                        var r, u;
                        switch (n) {
                            case "name":
                                return f.State.isFirefox ? "filter" : "-webkit-filter";
                            case "extract":
                                return r = parseFloat(i), r || 0 === r || (u = i.toString().match(/blur\(([0-9]+[A-z]+)\)/i), r = u ? u[1] : 0), r;
                            case "inject":
                                return parseFloat(i) ? "blur(" + i + ")" : "none"
                        }
                    },
                    opacity: function (n, t, i) {
                        if (8 >= h) switch (n) {
                            case "name":
                                return "filter";
                            case "extract":
                                var r = i.toString().match(/alpha\(opacity=(.*)\)/i);
                                return r ? r[1] / 100 : 1;
                            case "inject":
                                return t.style.zoom = 1, parseFloat(i) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(i), 10) + ")"
                        } else switch (n) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return i;
                            case "inject":
                                return i
                        }
                    }
                },
                register: function () {
                    var n;
                    for (9 >= h || f.State.isGingerbread || (u.Lists.transformsBase = u.Lists.transformsBase.concat(u.Lists.transforms3D)), n = 0; n < u.Lists.transformsBase.length; n++) ! function () {
                        var t = u.Lists.transformsBase[n];
                        u.Normalizations.registered[t] = function (n, i, u) {
                            switch (n) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return e(i) === r || e(i).transformCache[t] === r ? /^scale/i.test(t) ? 1 : 0 : e(i).transformCache[t].replace(/[()]/g, "");
                                case "inject":
                                    var o = !1;
                                    switch (t.substr(0, t.length - 1)) {
                                        case "translate":
                                            o = !/(%|px|em|rem|vw|vh|\d)$/i.test(u);
                                            break;
                                        case "scal":
                                        case "scale":
                                            f.State.isAndroid && e(i).transformCache[t] === r && 1 > u && (u = 1);
                                            o = !/(\d)$/i.test(u);
                                            break;
                                        case "skew":
                                            o = !/(deg|\d)$/i.test(u);
                                            break;
                                        case "rotate":
                                            o = !/(deg|\d)$/i.test(u)
                                    }
                                    return o || (e(i).transformCache[t] = "(" + u + ")"), e(i).transformCache[t]
                            }
                        }
                    }();
                    for (n = 0; n < u.Lists.colors.length; n++) ! function () {
                        var t = u.Lists.colors[n];
                        u.Normalizations.registered[t] = function (n, i, f) {
                            var e, s, o;
                            switch (n) {
                                case "name":
                                    return t;
                                case "extract":
                                    return u.RegEx.wrappedValueAlreadyExtracted.test(f) ? e = f : (o = {
                                        black: "rgb(0, 0, 0)",
                                        blue: "rgb(0, 0, 255)",
                                        gray: "rgb(128, 128, 128)",
                                        green: "rgb(0, 128, 0)",
                                        red: "rgb(255, 0, 0)",
                                        white: "rgb(255, 255, 255)"
                                    }, /^[A-z]+$/i.test(f) ? s = o[f] !== r ? o[f] : o.black : u.RegEx.isHex.test(f) ? s = "rgb(" + u.Values.hexToRgb(f).join(" ") + ")" : /^rgba?\(/i.test(f) || (s = o.black), e = (s || f).toString().match(u.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")), 8 >= h || 3 !== e.split(" ").length || (e += " 1"), e;
                                case "inject":
                                    return 8 >= h ? 4 === f.split(" ").length && (f = f.split(/\s+/).slice(0, 3).join(" ")) : 3 === f.split(" ").length && (f += " 1"), (8 >= h ? "rgb" : "rgba") + "(" + f.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                            }
                        }
                    }()
                }
            },
            Names: {
                camelCase: function (n) {
                    return n.replace(/-(\w)/g, function (n, t) {
                        return t.toUpperCase()
                    })
                },
                SVGAttribute: function (n) {
                    var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (h || f.State.isAndroid && !f.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(n)
                },
                prefixCheck: function (n) {
                    var i;
                    if (f.State.prefixMatches[n]) return [f.State.prefixMatches[n], !0];
                    for (var r = ["", "Webkit", "Moz", "ms", "O"], t = 0, u = r.length; u > t; t++)
                        if (i = 0 === t ? n : r[t] + n.replace(/^\w/, function (n) {
                                return n.toUpperCase()
                            }), s.isString(f.State.prefixElement.style[i])) return f.State.prefixMatches[n] = i, [i, !0];
                    return [n, !1]
                }
            },
            Values: {
                hexToRgb: function (n) {
                    var t;
                    return n = n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (n, t, i, r) {
                        return t + t + i + i + r + r
                    }), t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function (n) {
                    return 0 == n || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(n)
                },
                getUnitType: function (n) {
                    return /^(rotate|skew)/i.test(n) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(n) ? "" : "px"
                },
                getDisplayType: function (n) {
                    var t = n && n.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                },
                addClass: function (n, t) {
                    n.classList ? n.classList.add(t) : n.className += (n.className.length ? " " : "") + t
                },
                removeClass: function (n, t) {
                    n.classList ? n.classList.remove(t) : n.className = n.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                }
            },
            getPropertyValue: function (n, i, s, c) {
                function y(n, i) {
                    function s() {
                        l && u.setPropertyValue(n, "display", "none")
                    }
                    var f = 0,
                        l, p, w, a, v;
                    if (8 >= h) f = o.css(n, i);
                    else {
                        if (l = !1, /^(width|height)$/.test(i) && 0 === u.getPropertyValue(n, "display") && (l = !0, u.setPropertyValue(n, "display", u.Values.getDisplayType(n))), !c) {
                            if ("height" === i && "border-box" !== u.getPropertyValue(n, "boxSizing").toString().toLowerCase()) return p = n.offsetHeight - (parseFloat(u.getPropertyValue(n, "borderTopWidth")) || 0) - (parseFloat(u.getPropertyValue(n, "borderBottomWidth")) || 0) - (parseFloat(u.getPropertyValue(n, "paddingTop")) || 0) - (parseFloat(u.getPropertyValue(n, "paddingBottom")) || 0), s(), p;
                            if ("width" === i && "border-box" !== u.getPropertyValue(n, "boxSizing").toString().toLowerCase()) return w = n.offsetWidth - (parseFloat(u.getPropertyValue(n, "borderLeftWidth")) || 0) - (parseFloat(u.getPropertyValue(n, "borderRightWidth")) || 0) - (parseFloat(u.getPropertyValue(n, "paddingLeft")) || 0) - (parseFloat(u.getPropertyValue(n, "paddingRight")) || 0), s(), w
                        }
                        a = e(n) === r ? t.getComputedStyle(n, null) : e(n).computedStyle ? e(n).computedStyle : e(n).computedStyle = t.getComputedStyle(n, null);
                        "borderColor" === i && (i = "borderTopColor");
                        f = 9 === h && "filter" === i ? a.getPropertyValue(i) : a[i];
                        ("" === f || null === f) && (f = n.style[i]);
                        s()
                    }
                    return "auto" === f && /^(top|right|bottom|left)$/i.test(i) && (v = y(n, "position"), ("fixed" === v || "absolute" === v && /top|left/i.test(i)) && (f = o(n).position()[i] + "px")), f
                }
                var l, p, a, w, v;
                if (u.Hooks.registered[i] ? (p = i, a = u.Hooks.getRoot(p), s === r && (s = u.getPropertyValue(n, u.Names.prefixCheck(a)[0])), u.Normalizations.registered[a] && (s = u.Normalizations.registered[a]("extract", n, s)), l = u.Hooks.extractValue(p, s)) : u.Normalizations.registered[i] && (w = u.Normalizations.registered[i]("name", n), "transform" !== w && (v = y(n, u.Names.prefixCheck(w)[0]), u.Values.isCSSNullValue(v) && u.Hooks.templates[i] && (v = u.Hooks.templates[i][1])), l = u.Normalizations.registered[i]("extract", n, v)), !/^[\d-]/.test(l))
                    if (e(n) && e(n).isSVG && u.Names.SVGAttribute(i))
                        if (/^(height|width)$/i.test(i)) try {
                            l = n.getBBox()[i]
                        } catch (b) {
                            l = 0
                        } else l = n.getAttribute(i);
                        else l = y(n, u.Names.prefixCheck(i)[0]);
                return u.Values.isCSSNullValue(l) && (l = 0), f.debug >= 2 && console.log("Get " + i + ": " + l), l
            },
            setPropertyValue: function (n, i, r, o, s) {
                var c = i,
                    a, l;
                if ("scroll" === i) s.container ? s.container["scroll" + s.direction] = r : "Left" === s.direction ? t.scrollTo(r, s.alternateValue) : t.scrollTo(s.alternateValue, r);
                else if (u.Normalizations.registered[i] && "transform" === u.Normalizations.registered[i]("name", n)) u.Normalizations.registered[i]("inject", n, r), c = "transform", r = e(n).transformCache[i];
                else {
                    if (u.Hooks.registered[i] && (a = i, l = u.Hooks.getRoot(i), o = o || u.getPropertyValue(n, l), r = u.Hooks.injectValue(a, r, o), i = l), u.Normalizations.registered[i] && (r = u.Normalizations.registered[i]("inject", n, r), i = u.Normalizations.registered[i]("name", n)), c = u.Names.prefixCheck(i)[0], 8 >= h) try {
                        n.style[c] = r
                    } catch (v) {
                        f.debug && console.log("Browser does not support [" + r + "] for [" + c + "]")
                    } else e(n) && e(n).isSVG && u.Names.SVGAttribute(i) ? n.setAttribute(i, r) : n.style[c] = r;
                    f.debug >= 2 && console.log("Set " + i + " (" + c + "): " + r)
                }
                return [c, r]
            },
            flushTransformCache: function (n) {
                function t(t) {
                    return parseFloat(u.getPropertyValue(n, t))
                }
                var i = "",
                    r, s, c;
                (h || f.State.isAndroid && !f.State.isChrome) && e(n).isSVG ? (r = {
                    translate: [t("translateX"), t("translateY")],
                    skewX: [t("skewX")],
                    skewY: [t("skewY")],
                    scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                    rotate: [t("rotateZ"), 0, 0]
                }, o.each(e(n).transformCache, function (n) {
                    /^translate/i.test(n) ? n = "translate" : /^scale/i.test(n) ? n = "scale" : /^rotate/i.test(n) && (n = "rotate");
                    r[n] && (i += n + "(" + r[n].join(" ") + ") ", delete r[n])
                })) : (o.each(e(n).transformCache, function (t) {
                    return s = e(n).transformCache[t], "transformPerspective" === t ? (c = s, !0) : (9 === h && "rotateZ" === t && (t = "rotate"), void(i += t + s + " "))
                }), c && (i = "perspective" + c + " " + i));
                u.setPropertyValue(n, "transform", i)
            }
        }, u.Hooks.register(), u.Normalizations.register(), f.hook = function (n, t, i) {
            var u = r;
            return n = y(n), o.each(n, function (n, o) {
                if (e(o) === r && f.init(o), i === r) u === r && (u = f.CSS.getPropertyValue(o, t));
                else {
                    var s = f.CSS.setPropertyValue(o, t, i);
                    "transform" === s[0] && f.CSS.flushTransformCache(o);
                    u = s
                }
            }), u
        }, c = function () {
            function ft() {
                return et ? d.promise || null : at
            }

            function wt() {
                function g() {
                    function dt(t, i) {
                        var f = r,
                            o = r,
                            e = r;
                        return s.isArray(t) ? (f = t[0], !s.isArray(t[1]) && /^[\d-]/.test(t[1]) || s.isFunction(t[1]) || u.RegEx.isHex.test(t[1]) ? e = t[1] : (s.isString(t[1]) && !u.RegEx.isHex.test(t[1]) || s.isArray(t[1])) && (o = i ? t[1] : w(t[1], n.duration), t[2] !== r && (e = t[2]))) : f = t, i || (o = o || n.easing), s.isFunction(f) && (f = f.call(c, tt, nt)), s.isFunction(e) && (e = e.call(c, tt, nt)), [f || 0, o, e]
                    }

                    function gt(n, t) {
                        var i, r;
                        return r = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (n) {
                            return i = n, ""
                        }), i || (i = u.Values.getUnitType(n)), [r, i]
                    }

                    function ii() {
                        var s = {
                                myParent: c.parentNode || i.body,
                                position: u.getPropertyValue(c, "position"),
                                fontSize: u.getPropertyValue(c, "fontSize")
                            },
                            a = s.position === l.lastPosition && s.myParent === l.lastParent,
                            v = s.fontSize === l.lastFontSize,
                            h, r, n;
                        return l.lastParent = s.myParent, l.lastPosition = s.position, l.lastFontSize = s.fontSize, h = 100, r = {}, v && a ? (r.emToPx = l.lastEmToPx, r.percentToPxWidth = l.lastPercentToPxWidth, r.percentToPxHeight = l.lastPercentToPxHeight) : (n = e(c).isSVG ? i.createElementNS("http://www.w3.org/2000/svg", "rect") : i.createElement("div"), f.init(n), s.myParent.appendChild(n), o.each(["overflow", "overflowX", "overflowY"], function (t, i) {
                            f.CSS.setPropertyValue(n, i, "hidden")
                        }), f.CSS.setPropertyValue(n, "position", s.position), f.CSS.setPropertyValue(n, "fontSize", s.fontSize), f.CSS.setPropertyValue(n, "boxSizing", "content-box"), o.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (t, i) {
                            f.CSS.setPropertyValue(n, i, h + "%")
                        }), f.CSS.setPropertyValue(n, "paddingLeft", h + "em"), r.percentToPxWidth = l.lastPercentToPxWidth = (parseFloat(u.getPropertyValue(n, "width", null, !0)) || 1) / h, r.percentToPxHeight = l.lastPercentToPxHeight = (parseFloat(u.getPropertyValue(n, "height", null, !0)) || 1) / h, r.emToPx = l.lastEmToPx = (parseFloat(u.getPropertyValue(n, "paddingLeft")) || 1) / h, s.myParent.removeChild(n)), null === l.remToPx && (l.remToPx = parseFloat(u.getPropertyValue(i.body, "fontSize")) || 16), null === l.vwToPx && (l.vwToPx = parseFloat(t.innerWidth) / 100, l.vhToPx = parseFloat(t.innerHeight) / 100), r.remToPx = l.remToPx, r.vwToPx = l.vwToPx, r.vhToPx = l.vhToPx, f.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(r), c), r
                    }
                    var vt, ni, pt, st, wt, et, ti, ut, v, ot, ht, lt, ft, at, yt, kt;
                    if (n.begin && 0 === tt) try {
                        n.begin.call(k, k)
                    } catch (ri) {
                        setTimeout(function () {
                            throw ri;
                        }, 1)
                    }
                    if ("scroll" === it) st = /^x$/i.test(n.axis) ? "Left" : "Top", wt = parseFloat(n.offset) || 0, n.container ? s.isWrapped(n.container) || s.isNode(n.container) ? (n.container = n.container[0] || n.container, vt = n.container["scroll" + st], pt = vt + o(c).position()[st.toLowerCase()] + wt) : n.container = null : (vt = f.State.scrollAnchor[f.State["scrollProperty" + st]], ni = f.State.scrollAnchor[f.State["scrollProperty" + ("Left" === st ? "Top" : "Left")]], pt = o(c).offset()[st.toLowerCase()] + wt), y = {
                        scroll: {
                            rootPropertyValue: !1,
                            startValue: vt,
                            currentValue: vt,
                            endValue: pt,
                            unitType: "",
                            easing: n.easing,
                            scrollData: {
                                container: n.container,
                                direction: st,
                                alternateValue: ni
                            }
                        },
                        element: c
                    }, f.debug && console.log("tweensContainer (scroll): ", y.scroll, c);
                    else if ("reverse" === it) {
                        if (!e(c).tweensContainer) return void o.dequeue(c, n.queue);
                        "none" === e(c).opts.display && (e(c).opts.display = "auto");
                        "hidden" === e(c).opts.visibility && (e(c).opts.visibility = "visible");
                        e(c).opts.loop = !1;
                        e(c).opts.begin = null;
                        e(c).opts.complete = null;
                        h.easing || delete n.easing;
                        h.duration || delete n.duration;
                        n = o.extend({}, e(c).opts, n);
                        ut = o.extend(!0, {}, e(c).tweensContainer);
                        for (et in ut) "element" !== et && (ti = ut[et].startValue, ut[et].startValue = ut[et].currentValue = ut[et].endValue, ut[et].endValue = ti, s.isEmptyObject(h) || (ut[et].easing = n.easing), f.debug && console.log("reverse tweensContainer (" + et + "): " + JSON.stringify(ut[et]), c));
                        y = ut
                    } else if ("start" === it) {
                        e(c).tweensContainer && e(c).isAnimating === !0 && (ut = e(c).tweensContainer);
                        o.each(p, function (n, t) {
                            var f;
                            if (RegExp("^" + u.Lists.colors.join("$|^") + "$").test(n)) {
                                var e = dt(t, !0),
                                    o = e[0],
                                    s = e[1],
                                    h = e[2];
                                if (u.RegEx.isHex.test(o)) {
                                    for (var c = ["Red", "Green", "Blue"], a = u.Values.hexToRgb(o), l = h ? u.Values.hexToRgb(h) : r, i = 0; i < c.length; i++) f = [a[i]], s && f.push(s), l !== r && f.push(l[i]), p[n + c[i]] = f;
                                    delete p[n]
                                }
                            }
                        });
                        for (v in p) {
                            var bt = dt(p[v]),
                                rt = bt[0],
                                ui = bt[1],
                                g = bt[2];
                            if (v = u.Names.camelCase(v), ot = u.Hooks.getRoot(v), ht = !1, e(c).isSVG || "tween" === ot || u.Names.prefixCheck(ot)[1] !== !1 || u.Normalizations.registered[ot] !== r) {
                                if ((n.display !== r && null !== n.display && "none" !== n.display || n.visibility !== r && "hidden" !== n.visibility) && /opacity|filter/.test(v) && !g && 0 !== rt && (g = 0), n._cacheValues && ut && ut[v] ? (g === r && (g = ut[v].endValue + ut[v].unitType), ht = e(c).rootPropertyValueCache[ot]) : u.Hooks.registered[v] ? g === r ? (ht = u.getPropertyValue(c, ot), g = u.getPropertyValue(c, v, ht)) : ht = u.Hooks.templates[ot][1] : g === r && (g = u.getPropertyValue(c, v)), yt = !1, lt = gt(v, g), g = lt[0], at = lt[1], lt = gt(v, rt), rt = lt[0].replace(/^([+-\/*])=/, function (n, t) {
                                        return yt = t, ""
                                    }), ft = lt[1], g = parseFloat(g) || 0, rt = parseFloat(rt) || 0, "%" === ft && (/^(fontSize|lineHeight)$/.test(v) ? (rt /= 100, ft = "em") : /^scale/.test(v) ? (rt /= 100, ft = "") : /(Red|Green|Blue)$/i.test(v) && (rt = rt / 100 * 255, ft = "")), /[\/*]/.test(yt)) ft = at;
                                else if (at !== ft && 0 !== g)
                                    if (0 === rt) ft = at;
                                    else {
                                        b = b || ii();
                                        kt = /margin|padding|left|right|width|text|word|letter/i.test(v) || /X$/.test(v) || "x" === v ? "x" : "y";
                                        switch (at) {
                                            case "%":
                                                g *= "x" === kt ? b.percentToPxWidth : b.percentToPxHeight;
                                                break;
                                            case "px":
                                                break;
                                            default:
                                                g *= b[at + "ToPx"]
                                        }
                                        switch (ft) {
                                            case "%":
                                                g *= 1 / ("x" === kt ? b.percentToPxWidth : b.percentToPxHeight);
                                                break;
                                            case "px":
                                                break;
                                            default:
                                                g *= 1 / b[ft + "ToPx"]
                                        }
                                    }
                                switch (yt) {
                                    case "+":
                                        rt = g + rt;
                                        break;
                                    case "-":
                                        rt = g - rt;
                                        break;
                                    case "*":
                                        rt = g * rt;
                                        break;
                                    case "/":
                                        rt = g / rt
                                }
                                y[v] = {
                                    rootPropertyValue: ht,
                                    startValue: g,
                                    currentValue: g,
                                    endValue: rt,
                                    unitType: ft,
                                    easing: ui
                                };
                                f.debug && console.log("tweensContainer (" + v + "): " + JSON.stringify(y[v]), c)
                            } else f.debug && console.log("Skipping [" + ot + "] due to a lack of browser support.")
                        }
                        y.element = c
                    }
                    y.element && (u.Values.addClass(c, "velocity-animating"), ct.push(y), "" === n.queue && (e(c).tweensContainer = y, e(c).opts = n), e(c).isAnimating = !0, tt === nt - 1 ? (f.State.calls.push([ct, k, n, null, d.resolver]), f.State.isTicking === !1 && (f.State.isTicking = !0, a())) : tt++)
                }
                var b, c = this,
                    n = o.extend({}, f.defaults, h),
                    y = {};
                switch (e(c) === r && f.init(c), parseFloat(n.delay) && n.queue !== !1 && o.queue(c, n.queue, function (t) {
                    f.velocityQueueEntryFlag = !0;
                    e(c).delayTimer = {
                        setTimeout: setTimeout(t, parseFloat(n.delay)),
                        next: t
                    }
                }), n.duration.toString().toLowerCase()) {
                    case "fast":
                        n.duration = 200;
                        break;
                    case "normal":
                        n.duration = v;
                        break;
                    case "slow":
                        n.duration = 600;
                        break;
                    default:
                        n.duration = parseFloat(n.duration) || 1
                }
                f.mock !== !1 && (f.mock === !0 ? n.duration = n.delay = 1 : (n.duration *= parseFloat(f.mock) || 1, n.delay *= parseFloat(f.mock) || 1));
                n.easing = w(n.easing, n.duration);
                n.begin && !s.isFunction(n.begin) && (n.begin = null);
                n.progress && !s.isFunction(n.progress) && (n.progress = null);
                n.complete && !s.isFunction(n.complete) && (n.complete = null);
                n.display !== r && null !== n.display && (n.display = n.display.toString().toLowerCase(), "auto" === n.display && (n.display = f.CSS.Values.getDisplayType(c)));
                n.visibility !== r && null !== n.visibility && (n.visibility = n.visibility.toString().toLowerCase());
                n.mobileHA = n.mobileHA && f.State.isMobile && !f.State.isGingerbread;
                n.queue === !1 ? n.delay ? setTimeout(g, n.delay) : g() : o.queue(c, n.queue, function (n, t) {
                    return t === !0 ? (d.promise && d.resolver(k), !0) : (f.velocityQueueEntryFlag = !0, void g(n))
                });
                "" !== n.queue && "fx" !== n.queue || "inprogress" === o.queue(c)[0] || o.dequeue(c)
            }
            var et, at, rt, k, p, h, vt = arguments[0] && (arguments[0].p || o.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || s.isString(arguments[0].properties)),
                nt, tt, yt, g, d, it, st, ht, l, ct, lt, n, ot, ut;
            if (s.isWrapped(this) ? (et = !1, rt = 0, k = this, at = this) : (et = !0, rt = 1, k = vt ? arguments[0].elements || arguments[0].e : arguments[0]), k = y(k)) {
                if (vt ? (p = arguments[0].properties || arguments[0].p, h = arguments[0].options || arguments[0].o) : (p = arguments[rt], h = arguments[rt + 1]), nt = k.length, tt = 0, !/^(stop|finish)$/i.test(p) && !o.isPlainObject(h))
                    for (yt = rt + 1, h = {}, g = yt; g < arguments.length; g++) s.isArray(arguments[g]) || !/^(fast|normal|slow)$/i.test(arguments[g]) && !/^\d/.test(arguments[g]) ? s.isString(arguments[g]) || s.isArray(arguments[g]) ? h.easing = arguments[g] : s.isFunction(arguments[g]) && (h.complete = arguments[g]) : h.duration = arguments[g];
                d = {
                    promise: null,
                    resolver: null,
                    rejecter: null
                };
                et && f.Promise && (d.promise = new f.Promise(function (n, t) {
                    d.resolver = n;
                    d.rejecter = t
                }));
                switch (p) {
                    case "scroll":
                        it = "scroll";
                        break;
                    case "reverse":
                        it = "reverse";
                        break;
                    case "finish":
                    case "stop":
                        return o.each(k, function (n, t) {
                            e(t) && e(t).delayTimer && (clearTimeout(e(t).delayTimer.setTimeout), e(t).delayTimer.next && e(t).delayTimer.next(), delete e(t).delayTimer)
                        }), st = [], o.each(f.State.calls, function (n, t) {
                            t && o.each(t[1], function (i, u) {
                                var f = h === r ? "" : h;
                                return f === !0 || t[2].queue === f || h === r && t[2].queue === !1 ? void o.each(k, function (i, r) {
                                    r === u && ((h === !0 || s.isString(h)) && (o.each(o.queue(r, s.isString(h) ? h : ""), function (n, t) {
                                        s.isFunction(t) && t(null, !0)
                                    }), o.queue(r, s.isString(h) ? h : "", [])), "stop" === p ? (e(r) && e(r).tweensContainer && f !== !1 && o.each(e(r).tweensContainer, function (n, t) {
                                        t.endValue = t.currentValue
                                    }), st.push(n)) : "finish" === p && (t[2].duration = 1))
                                }) : !0
                            })
                        }), "stop" === p && (o.each(st, function (n, t) {
                            b(t, !0)
                        }), d.promise && d.resolver(k)), ft();
                    default:
                        if (!o.isPlainObject(p) || s.isEmptyObject(p)) {
                            if (s.isString(p) && f.Redirects[p]) {
                                var n = o.extend({}, h),
                                    bt = n.duration,
                                    pt = n.delay || 0;
                                return n.backwards === !0 && (k = o.extend(!0, [], k).reverse()), o.each(k, function (t, i) {
                                    parseFloat(n.stagger) ? n.delay = pt + parseFloat(n.stagger) * t : s.isFunction(n.stagger) && (n.delay = pt + n.stagger.call(i, t, nt));
                                    n.drag && (n.duration = parseFloat(bt) || (/^(callout|transition)/.test(p) ? 1e3 : v), n.duration = Math.max(n.duration * (n.backwards ? 1 - t / nt : (t + 1) / nt), .75 * n.duration, 200));
                                    f.Redirects[p].call(i, i, n || {}, t, nt, k, d.promise ? d : r)
                                }), ft()
                            }
                            return ht = "Velocity: First argument (" + p + ") was not a property map, a known action, or a registered redirect. Aborting.", d.promise ? d.rejecter(new Error(ht)) : console.log(ht), ft()
                        }
                        it = "start"
                }
                if (l = {
                        lastParent: null,
                        lastPosition: null,
                        lastFontSize: null,
                        lastPercentToPxWidth: null,
                        lastPercentToPxHeight: null,
                        lastEmToPx: null,
                        remToPx: null,
                        vwToPx: null,
                        vhToPx: null
                    }, ct = [], o.each(k, function (n, t) {
                        s.isNode(t) && wt.call(t)
                    }), n = o.extend({}, f.defaults, h), n.loop = parseInt(n.loop), lt = 2 * n.loop - 1, n.loop)
                    for (ot = 0; lt > ot; ot++) ut = {
                        delay: n.delay,
                        progress: n.progress
                    }, ot === lt - 1 && (ut.display = n.display, ut.visibility = n.visibility, ut.complete = n.complete), c(k, "reverse", ut);
                return ft()
            }
        }, f = o.extend(c, f), f.animate = c, l = t.requestAnimationFrame || k, f.State.isMobile || i.hidden === r || i.addEventListener("visibilitychange", function () {
            i.hidden ? (l = function (n) {
                return setTimeout(function () {
                    n(!0)
                }, 16)
            }, a()) : l = t.requestAnimationFrame || k
        }), n.Velocity = f, n !== t && (n.fn.velocity = c, n.fn.velocity.defaults = f.defaults), o.each(["Down", "Up"], function (n, t) {
            f.Redirects["slide" + t] = function (n, i, u, e, s, h) {
                var c = o.extend({}, i),
                    v = c.begin,
                    y = c.complete,
                    a = {
                        height: "",
                        marginTop: "",
                        marginBottom: "",
                        paddingTop: "",
                        paddingBottom: ""
                    },
                    l = {};
                c.display === r && (c.display = "Down" === t ? "inline" === f.CSS.Values.getDisplayType(n) ? "inline-block" : "block" : "none");
                c.begin = function () {
                    var i, r;
                    v && v.call(s, s);
                    for (i in a) l[i] = n.style[i], r = f.CSS.getPropertyValue(n, i), a[i] = "Down" === t ? [r, 0] : [0, r];
                    l.overflow = n.style.overflow;
                    n.style.overflow = "hidden"
                };
                c.complete = function () {
                    for (var t in l) n.style[t] = l[t];
                    y && y.call(s, s);
                    h && h.resolver(s)
                };
                f(n, a, c)
            }
        }), o.each(["In", "Out"], function (n, t) {
            f.Redirects["fade" + t] = function (n, i, u, e, s, h) {
                var c = o.extend({}, i),
                    a = {
                        opacity: "In" === t ? 1 : 0
                    },
                    l = c.complete;
                c.complete = u !== e - 1 ? c.begin = null : function () {
                    l && l.call(s, s);
                    h && h.resolver(s)
                };
                c.display === r && (c.display = "In" === t ? "auto" : "none");
                f(this, a, c)
            }
        }), f
    }(window.jQuery || window.Zepto || window, window, document)
}));
! function (n, t, i, r) {
    "use strict";

    function si(n, t, i) {
        return setTimeout(ci(n, i), t)
    }

    function tt(n, t, i) {
        return Array.isArray(n) ? (v(n, i[t], i), !0) : !1
    }

    function v(n, t, i) {
        var u;
        if (n)
            if (n.forEach) n.forEach(t, i);
            else if (n.length !== r)
            for (u = 0; u < n.length;) t.call(i, n[u], u, n), u++;
        else
            for (u in n) n.hasOwnProperty(u) && t.call(i, n[u], u, n)
    }

    function k(n, t, i) {
        for (var f = Object.keys(t), u = 0; u < f.length;)(!i || i && n[f[u]] === r) && (n[f[u]] = t[f[u]]), u++;
        return n
    }

    function hi(n, t) {
        return k(n, t, !0)
    }

    function o(n, t, i) {
        var r, u = t.prototype;
        r = n.prototype = Object.create(u);
        r.constructor = n;
        r._super = u;
        i && k(r, i)
    }

    function ci(n, t) {
        return function () {
            return n.apply(t, arguments)
        }
    }

    function li(n, t) {
        return typeof n == pr ? n.apply(t ? t[0] || r : r, t) : n
    }

    function ur(n, t) {
        return n === r ? t : n
    }

    function pt(n, t, i) {
        v(bt(t), function (t) {
            n.addEventListener(t, i, !1)
        })
    }

    function wt(n, t, i) {
        v(bt(t), function (t) {
            n.removeEventListener(t, i, !1)
        })
    }

    function fr(n, t) {
        for (; n;) {
            if (n == t) return !0;
            n = n.parentNode
        }
        return !1
    }

    function d(n, t) {
        return n.indexOf(t) > -1
    }

    function bt(n) {
        return n.trim().split(/\s+/g)
    }

    function it(n, t, i) {
        if (n.indexOf && !i) return n.indexOf(t);
        for (var r = 0; r < n.length;) {
            if (i && n[r][i] == t || !i && n[r] === t) return r;
            r++
        }
        return -1
    }

    function kt(n) {
        return Array.prototype.slice.call(n, 0)
    }

    function er(n, t, i) {
        for (var f, u = [], e = [], r = 0; r < n.length;) f = t ? n[r][t] : n[r], it(e, f) < 0 && u.push(n[r]), e[r] = f, r++;
        return i && (u = t ? u.sort(function (n, i) {
            return n[t] > i[t]
        }) : u.sort()), u
    }

    function dt(n, t) {
        for (var i, u, e = t[0].toUpperCase() + t.slice(1), f = 0; f < yr.length;) {
            if (i = yr[f], u = i ? i + e : t, u in n) return u;
            f++
        }
        return r
    }

    function ou() {
        return tf++
    }

    function or(n) {
        var t = n.ownerDocument;
        return t.defaultView || t.parentWindow
    }

    function s(n, t) {
        var i = this;
        this.manager = n;
        this.callback = t;
        this.element = n.element;
        this.target = n.options.inputTarget;
        this.domHandler = function (t) {
            li(n.options.enable, [n]) && i.handler(t)
        };
        this.init()
    }

    function su(n) {
        var i, t = n.options.inputClass;
        return new(i = t ? t : rf ? vi : uf ? ti : wr ? yi : ni)(n, hu)
    }

    function hu(n, t, i) {
        var r = i.pointers.length,
            o = i.changedPointers.length,
            s = t & f && 0 == r - o,
            h = t & (u | e) && 0 == r - o;
        i.isFirst = !!s;
        i.isFinal = !!h;
        s && (n.session = {});
        i.eventType = t;
        cu(n, i);
        n.emit("hammer.input", i);
        n.recognize(i);
        n.session.prevInput = i
    }

    function cu(n, t) {
        var i = n.session,
            u = t.pointers,
            e = u.length,
            f;
        i.firstInput || (i.firstInput = sr(t));
        e > 1 && !i.firstMultiple ? i.firstMultiple = sr(t) : 1 === e && (i.firstMultiple = !1);
        var o = i.firstInput,
            r = i.firstMultiple,
            s = r ? r.center : o.center,
            h = t.center = hr(u);
        t.timeStamp = nr();
        t.deltaTime = t.timeStamp - o.timeStamp;
        t.angle = ai(s, h);
        t.distance = gt(s, h);
        lu(i, t);
        t.offsetDirection = cr(t.deltaX, t.deltaY);
        t.scale = r ? pu(r.pointers, u) : 1;
        t.rotation = r ? yu(r.pointers, u) : 0;
        au(i, t);
        f = n.element;
        fr(t.srcEvent.target, f) && (f = t.srcEvent.target);
        t.target = f
    }

    function lu(n, t) {
        var i = t.center,
            r = n.offsetDelta || {},
            e = n.prevDelta || {},
            o = n.prevInput || {};
        (t.eventType === f || o.eventType === u) && (e = n.prevDelta = {
            x: o.deltaX || 0,
            y: o.deltaY || 0
        }, r = n.offsetDelta = {
            x: i.x,
            y: i.y
        });
        t.deltaX = e.x + (i.x - r.x);
        t.deltaY = e.y + (i.y - r.y)
    }

    function au(n, t) {
        var f, o, s, h, i = n.lastInterval || t,
            c = t.timeStamp - i.timeStamp;
        if (t.eventType != e && (c > ff || i.velocity === r)) {
            var l = i.deltaX - t.deltaX,
                a = i.deltaY - t.deltaY,
                u = vu(c, l, a);
            o = u.x;
            s = u.y;
            f = ft(u.x) > ft(u.y) ? u.x : u.y;
            h = cr(l, a);
            n.lastInterval = t
        } else f = i.velocity, o = i.velocityX, s = i.velocityY, h = i.direction;
        t.velocity = f;
        t.velocityX = o;
        t.velocityY = s;
        t.direction = h
    }

    function sr(n) {
        for (var i = [], t = 0; t < n.pointers.length;) i[t] = {
            clientX: rt(n.pointers[t].clientX),
            clientY: rt(n.pointers[t].clientY)
        }, t++;
        return {
            timeStamp: nr(),
            pointers: i,
            center: hr(i),
            deltaX: n.deltaX,
            deltaY: n.deltaY
        }
    }

    function hr(n) {
        var t = n.length;
        if (1 === t) return {
            x: rt(n[0].clientX),
            y: rt(n[0].clientY)
        };
        for (var r = 0, u = 0, i = 0; t > i;) r += n[i].clientX, u += n[i].clientY, i++;
        return {
            x: rt(r / t),
            y: rt(u / t)
        }
    }

    function vu(n, t, i) {
        return {
            x: t / n || 0,
            y: i / n || 0
        }
    }

    function cr(n, t) {
        return n === t ? fi : ft(n) >= ft(t) ? n > 0 ? ot : st : t > 0 ? ht : ct
    }

    function gt(n, t, i) {
        i || (i = kr);
        var r = t[i[0]] - n[i[0]],
            u = t[i[1]] - n[i[1]];
        return Math.sqrt(r * r + u * u)
    }

    function ai(n, t, i) {
        i || (i = kr);
        var r = t[i[0]] - n[i[0]],
            u = t[i[1]] - n[i[1]];
        return 180 * Math.atan2(u, r) / Math.PI
    }

    function yu(n, t) {
        return ai(t[1], t[0], ei) - ai(n[1], n[0], ei)
    }

    function pu(n, t) {
        return gt(t[0], t[1], ei) / gt(n[0], n[1], ei)
    }

    function ni() {
        this.evEl = of ;
        this.evWin = sf;
        this.allow = !0;
        this.pressed = !1;
        s.apply(this, arguments)
    }

    function vi() {
        this.evEl = dr;
        this.evWin = gr;
        s.apply(this, arguments);
        this.store = this.manager.session.pointerEvents = []
    }

    function lr() {
        this.evTarget = af;
        this.evWin = vf;
        this.started = !1;
        s.apply(this, arguments)
    }

    function wu(n, t) {
        var i = kt(n.touches),
            r = kt(n.changedTouches);
        return t & (u | e) && (i = er(i.concat(r), "identifier", !0)), [i, r]
    }

    function ti() {
        this.evTarget = tu;
        this.targetIds = {};
        s.apply(this, arguments)
    }

    function bu(n, t) {
        var r = kt(n.touches),
            o = this.targetIds;
        if (t & (f | g) && 1 === r.length) return o[r[0].identifier] = !0, [r, r];
        var i, s, h = kt(n.changedTouches),
            c = [],
            l = this.target;
        if (s = r.filter(function (n) {
                return fr(n.target, l)
            }), t === f)
            for (i = 0; i < s.length;) o[s[i].identifier] = !0, i++;
        for (i = 0; i < h.length;) o[h[i].identifier] && c.push(h[i]), t & (u | e) && delete o[h[i].identifier], i++;
        if (c.length) return [er(s.concat(c), "identifier", !0), c]
    }

    function yi() {
        s.apply(this, arguments);
        var n = ci(this.handler, this);
        this.touch = new ti(this.manager, n);
        this.mouse = new ni(this.manager, n)
    }

    function pi(n, t) {
        this.manager = n;
        this.set(t)
    }

    function ku(n) {
        if (d(n, lt)) return lt;
        var t = d(n, at),
            i = d(n, vt);
        return t && i ? at + " " + vt : t || i ? t ? at : vt : d(n, ir) ? ir : fu
    }

    function y(n) {
        this.id = ou();
        this.manager = null;
        this.options = hi(n || {}, this.defaults);
        this.options.enable = ur(this.options.enable, !0);
        this.state = oi;
        this.simultaneous = {};
        this.requireFail = []
    }

    function du(n) {
        return n & yt ? "cancel" : n & b ? "end" : n & ut ? "move" : n & h ? "start" : ""
    }

    function ar(n) {
        return n == ct ? "down" : n == ht ? "up" : n == ot ? "left" : n == st ? "right" : ""
    }

    function ii(n, t) {
        var i = t.manager;
        return i ? i.get(n) : n
    }

    function c() {
        y.apply(this, arguments)
    }

    function ri() {
        c.apply(this, arguments);
        this.pX = null;
        this.pY = null
    }

    function wi() {
        c.apply(this, arguments)
    }

    function bi() {
        y.apply(this, arguments);
        this._timer = null;
        this._input = null
    }

    function ki() {
        c.apply(this, arguments)
    }

    function di() {
        c.apply(this, arguments)
    }

    function ui() {
        y.apply(this, arguments);
        this.pTime = !1;
        this.pCenter = !1;
        this._timer = null;
        this._input = null;
        this.count = 0
    }

    function w(n, t) {
        return t = t || {}, t.recognizers = ur(t.recognizers, w.defaults.preset), new gi(n, t)
    }

    function gi(n, t) {
        t = t || {};
        this.options = hi(t, w.defaults);
        this.options.inputTarget = this.options.inputTarget || n;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.element = n;
        this.input = su(this);
        this.touchAction = new pi(this, this.options.touchAction);
        vr(this, !0);
        v(t.recognizers, function (n) {
            var t = this.add(new n[0](n[1]));
            n[2] && t.recognizeWith(n[2]);
            n[3] && t.requireFailure(n[3])
        }, this)
    }

    function vr(n, t) {
        var i = n.element;
        v(n.options.cssProps, function (n, r) {
            i.style[dt(i.style, r)] = t ? n : ""
        })
    }

    function gu(n, i) {
        var r = t.createEvent("Event");
        r.initEvent(n, !0, !0);
        r.gesture = i;
        i.target.dispatchEvent(r)
    }
    var yr = ["", "webkit", "moz", "MS", "ms", "o"],
        nf = t.createElement("div"),
        pr = "function",
        rt = Math.round,
        ft = Math.abs,
        nr = Date.now,
        tf = 1,
        wr = "ontouchstart" in n,
        rf = dt(n, "PointerEvent") !== r,
        uf = wr && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
        et = "touch",
        tr = "mouse",
        ff = 25,
        f = 1,
        g = 2,
        u = 4,
        e = 8,
        fi = 1,
        ot = 2,
        st = 4,
        ht = 8,
        ct = 16,
        l = ot | st,
        nt = ht | ct,
        br = l | nt,
        kr = ["x", "y"],
        ei = ["clientX", "clientY"],
        nu, tu, eu, rr;
    s.prototype = {
        handler: function () {},
        init: function () {
            this.evEl && pt(this.element, this.evEl, this.domHandler);
            this.evTarget && pt(this.target, this.evTarget, this.domHandler);
            this.evWin && pt(or(this.element), this.evWin, this.domHandler)
        },
        destroy: function () {
            this.evEl && wt(this.element, this.evEl, this.domHandler);
            this.evTarget && wt(this.target, this.evTarget, this.domHandler);
            this.evWin && wt(or(this.element), this.evWin, this.domHandler)
        }
    };
    var ef = {
            mousedown: f,
            mousemove: g,
            mouseup: u
        },
        of = "mousedown",
        sf = "mousemove mouseup";
    o(ni, s, {
        handler: function (n) {
            var t = ef[n.type];
            t & f && 0 === n.button && (this.pressed = !0);
            t & g && 1 !== n.which && (t = u);
            this.pressed && this.allow && (t & u && (this.pressed = !1), this.callback(this.manager, t, {
                pointers: [n],
                changedPointers: [n],
                pointerType: tr,
                srcEvent: n
            }))
        }
    });
    var hf = {
            pointerdown: f,
            pointermove: g,
            pointerup: u,
            pointercancel: e,
            pointerout: e
        },
        cf = {
            2: et,
            3: "pen",
            4: tr,
            5: "kinect"
        },
        dr = "pointerdown",
        gr = "pointermove pointerup pointercancel";
    n.MSPointerEvent && (dr = "MSPointerDown", gr = "MSPointerMove MSPointerUp MSPointerCancel");
    o(vi, s, {
        handler: function (n) {
            var t = this.store,
                o = !1,
                h = n.type.toLowerCase().replace("ms", ""),
                r = hf[h],
                s = cf[n.pointerType] || n.pointerType,
                c = s == et,
                i = it(t, n.pointerId, "pointerId");
            r & f && (0 === n.button || c) ? 0 > i && (t.push(n), i = t.length - 1) : r & (u | e) && (o = !0);
            0 > i || (t[i] = n, this.callback(this.manager, r, {
                pointers: t,
                changedPointers: [n],
                pointerType: s,
                srcEvent: n
            }), o && t.splice(i, 1))
        }
    });
    var lf = {
            touchstart: f,
            touchmove: g,
            touchend: u,
            touchcancel: e
        },
        af = "touchstart",
        vf = "touchstart touchmove touchend touchcancel";
    o(lr, s, {
        handler: function (n) {
            var i = lf[n.type],
                t;
            (i === f && (this.started = !0), this.started) && (t = wu.call(this, n, i), i & (u | e) && 0 == t[0].length - t[1].length && (this.started = !1), this.callback(this.manager, i, {
                pointers: t[0],
                changedPointers: t[1],
                pointerType: et,
                srcEvent: n
            }))
        }
    });
    nu = {
        touchstart: f,
        touchmove: g,
        touchend: u,
        touchcancel: e
    };
    tu = "touchstart touchmove touchend touchcancel";
    o(ti, s, {
        handler: function (n) {
            var i = nu[n.type],
                t = bu.call(this, n, i);
            t && this.callback(this.manager, i, {
                pointers: t[0],
                changedPointers: t[1],
                pointerType: et,
                srcEvent: n
            })
        }
    });
    o(yi, s, {
        handler: function (n, t, i) {
            var r = i.pointerType == et,
                f = i.pointerType == tr;
            if (r) this.mouse.allow = !1;
            else if (f && !this.mouse.allow) return;
            t & (u | e) && (this.mouse.allow = !0);
            this.callback(n, t, i)
        },
        destroy: function () {
            this.touch.destroy();
            this.mouse.destroy()
        }
    });
    var iu = dt(nf.style, "touchAction"),
        ru = iu !== r,
        uu = "compute",
        fu = "auto",
        ir = "manipulation",
        lt = "none",
        at = "pan-x",
        vt = "pan-y";
    pi.prototype = {
        set: function (n) {
            n == uu && (n = this.compute());
            ru && (this.manager.element.style[iu] = n);
            this.actions = n.toLowerCase().trim()
        },
        update: function () {
            this.set(this.manager.options.touchAction)
        },
        compute: function () {
            var n = [];
            return v(this.manager.recognizers, function (t) {
                li(t.options.enable, [t]) && (n = n.concat(t.getTouchAction()))
            }), ku(n.join(" "))
        },
        preventDefaults: function (n) {
            var t, i;
            if (!ru) {
                if (t = n.srcEvent, i = n.offsetDirection, this.manager.session.prevented) return void t.preventDefault();
                var r = this.actions,
                    u = d(r, lt),
                    f = d(r, vt),
                    e = d(r, at);
                return u || f && i & l || e && i & nt ? this.preventSrc(t) : void 0
            }
        },
        preventSrc: function (n) {
            this.manager.session.prevented = !0;
            n.preventDefault()
        }
    };
    var oi = 1,
        h = 2,
        ut = 4,
        b = 8,
        p = b,
        yt = 16,
        a = 32;
    y.prototype = {
        defaults: {},
        set: function (n) {
            return k(this.options, n), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function (n) {
            if (tt(n, "recognizeWith", this)) return this;
            var t = this.simultaneous;
            return n = ii(n, this), t[n.id] || (t[n.id] = n, n.recognizeWith(this)), this
        },
        dropRecognizeWith: function (n) {
            return tt(n, "dropRecognizeWith", this) ? this : (n = ii(n, this), delete this.simultaneous[n.id], this)
        },
        requireFailure: function (n) {
            if (tt(n, "requireFailure", this)) return this;
            var t = this.requireFail;
            return n = ii(n, this), -1 === it(t, n) && (t.push(n), n.requireFailure(this)), this
        },
        dropRequireFailure: function (n) {
            if (tt(n, "dropRequireFailure", this)) return this;
            n = ii(n, this);
            var t = it(this.requireFail, n);
            return t > -1 && this.requireFail.splice(t, 1), this
        },
        hasRequireFailures: function () {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function (n) {
            return !!this.simultaneous[n.id]
        },
        emit: function (n) {
            function t(t) {
                r.manager.emit(r.options.event + (t ? du(i) : ""), n)
            }
            var r = this,
                i = this.state;
            b > i && t(!0);
            t();
            i >= b && t(!0)
        },
        tryEmit: function (n) {
            return this.canEmit() ? this.emit(n) : void(this.state = a)
        },
        canEmit: function () {
            for (var n = 0; n < this.requireFail.length;) {
                if (!(this.requireFail[n].state & (a | oi))) return !1;
                n++
            }
            return !0
        },
        recognize: function (n) {
            var t = k({}, n);
            return li(this.options.enable, [this, t]) ? (this.state & (p | yt | a) && (this.state = oi), this.state = this.process(t), void(this.state & (h | ut | b | yt) && this.tryEmit(t))) : (this.reset(), void(this.state = a))
        },
        process: function () {},
        getTouchAction: function () {},
        reset: function () {}
    };
    o(c, y, {
        defaults: {
            pointers: 1
        },
        attrTest: function (n) {
            var t = this.options.pointers;
            return 0 === t || n.pointers.length === t
        },
        process: function (n) {
            var t = this.state,
                i = n.eventType,
                r = t & (h | ut),
                f = this.attrTest(n);
            return r && (i & e || !f) ? t | yt : r || f ? i & u ? t | b : t & h ? t | ut : h : a
        }
    });
    o(ri, c, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: br
        },
        getTouchAction: function () {
            var t = this.options.direction,
                n = [];
            return t & l && n.push(vt), t & nt && n.push(at), n
        },
        directionTest: function (n) {
            var i = this.options,
                r = !0,
                u = n.distance,
                t = n.direction,
                f = n.deltaX,
                e = n.deltaY;
            return t & i.direction || (i.direction & l ? (t = 0 === f ? fi : 0 > f ? ot : st, r = f != this.pX, u = Math.abs(n.deltaX)) : (t = 0 === e ? fi : 0 > e ? ht : ct, r = e != this.pY, u = Math.abs(n.deltaY))), n.direction = t, r && u > i.threshold && t & i.direction
        },
        attrTest: function (n) {
            return c.prototype.attrTest.call(this, n) && (this.state & h || !(this.state & h) && this.directionTest(n))
        },
        emit: function (n) {
            this.pX = n.deltaX;
            this.pY = n.deltaY;
            var t = ar(n.direction);
            t && this.manager.emit(this.options.event + t, n);
            this._super.emit.call(this, n)
        }
    });
    o(wi, c, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function () {
            return [lt]
        },
        attrTest: function (n) {
            return this._super.attrTest.call(this, n) && (Math.abs(n.scale - 1) > this.options.threshold || this.state & h)
        },
        emit: function (n) {
            if (this._super.emit.call(this, n), 1 !== n.scale) {
                var t = n.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + t, n)
            }
        }
    });
    o(bi, y, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function () {
            return [fu]
        },
        process: function (n) {
            var t = this.options,
                i = n.pointers.length === t.pointers,
                r = n.distance < t.threshold,
                o = n.deltaTime > t.time;
            if (this._input = n, !r || !i || n.eventType & (u | e) && !o) this.reset();
            else if (n.eventType & f) this.reset(), this._timer = si(function () {
                this.state = p;
                this.tryEmit()
            }, t.time, this);
            else if (n.eventType & u) return p;
            return a
        },
        reset: function () {
            clearTimeout(this._timer)
        },
        emit: function (n) {
            this.state === p && (n && n.eventType & u ? this.manager.emit(this.options.event + "up", n) : (this._input.timeStamp = nr(), this.manager.emit(this.options.event, this._input)))
        }
    });
    o(ki, c, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function () {
            return [lt]
        },
        attrTest: function (n) {
            return this._super.attrTest.call(this, n) && (Math.abs(n.rotation) > this.options.threshold || this.state & h)
        }
    });
    o(di, c, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: l | nt,
            pointers: 1
        },
        getTouchAction: function () {
            return ri.prototype.getTouchAction.call(this)
        },
        attrTest: function (n) {
            var t, i = this.options.direction;
            return i & (l | nt) ? t = n.velocity : i & l ? t = n.velocityX : i & nt && (t = n.velocityY), this._super.attrTest.call(this, n) && i & n.direction && n.distance > this.options.threshold && ft(t) > this.options.velocity && n.eventType & u
        },
        emit: function (n) {
            var t = ar(n.direction);
            t && this.manager.emit(this.options.event + t, n);
            this.manager.emit(this.options.event, n)
        }
    });
    o(ui, y, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        },
        getTouchAction: function () {
            return [ir]
        },
        process: function (n) {
            var t = this.options,
                o = n.pointers.length === t.pointers,
                s = n.distance < t.threshold,
                c = n.deltaTime < t.time,
                i, r, e;
            if (this.reset(), n.eventType & f && 0 === this.count) return this.failTimeout();
            if (s && c && o) {
                if (n.eventType != u) return this.failTimeout();
                if (i = this.pTime ? n.timeStamp - this.pTime < t.interval : !0, r = !this.pCenter || gt(this.pCenter, n.center) < t.posThreshold, this.pTime = n.timeStamp, this.pCenter = n.center, r && i ? this.count += 1 : this.count = 1, this._input = n, e = this.count % t.taps, 0 === e) return this.hasRequireFailures() ? (this._timer = si(function () {
                    this.state = p;
                    this.tryEmit()
                }, t.interval, this), h) : p
            }
            return a
        },
        failTimeout: function () {
            return this._timer = si(function () {
                this.state = a
            }, this.options.interval, this), a
        },
        reset: function () {
            clearTimeout(this._timer)
        },
        emit: function () {
            this.state == p && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    });
    w.VERSION = "2.0.4";
    w.defaults = {
        domEvents: !1,
        touchAction: uu,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
            [ki, {
                enable: !1
            }],
            [wi, {
                    enable: !1
                },
                ["rotate"]
            ],
            [di, {
                direction: l
            }],
            [ri, {
                    direction: l
                },
                ["swipe"]
            ],
            [ui],
            [ui, {
                    event: "doubletap",
                    taps: 2
                },
                ["tap"]
            ],
            [bi]
        ],
        cssProps: {
            userSelect: "default",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    eu = 1;
    rr = 2;
    gi.prototype = {
        set: function (n) {
            return k(this.options, n), n.touchAction && this.touchAction.update(), n.inputTarget && (this.input.destroy(), this.input.target = n.inputTarget, this.input.init()), this
        },
        stop: function (n) {
            this.session.stopped = n ? rr : eu
        },
        recognize: function (n) {
            var r = this.session,
                i, f, t, u;
            if (!r.stopped)
                for (this.touchAction.preventDefaults(n), f = this.recognizers, t = r.curRecognizer, (!t || t && t.state & p) && (t = r.curRecognizer = null), u = 0; u < f.length;) i = f[u], r.stopped === rr || t && i != t && !i.canRecognizeWith(t) ? i.reset() : i.recognize(n), !t && i.state & (h | ut | b) && (t = r.curRecognizer = i), u++
        },
        get: function (n) {
            if (n instanceof y) return n;
            for (var i = this.recognizers, t = 0; t < i.length; t++)
                if (i[t].options.event == n) return i[t];
            return null
        },
        add: function (n) {
            if (tt(n, "add", this)) return this;
            var t = this.get(n.options.event);
            return t && this.remove(t), this.recognizers.push(n), n.manager = this, this.touchAction.update(), n
        },
        remove: function (n) {
            if (tt(n, "remove", this)) return this;
            var t = this.recognizers;
            return n = this.get(n), t.splice(it(t, n), 1), this.touchAction.update(), this
        },
        on: function (n, t) {
            var i = this.handlers;
            return v(bt(n), function (n) {
                i[n] = i[n] || [];
                i[n].push(t)
            }), this
        },
        off: function (n, t) {
            var i = this.handlers;
            return v(bt(n), function (n) {
                t ? i[n].splice(it(i[n], t), 1) : delete i[n]
            }), this
        },
        emit: function (n, t) {
            var i, r;
            if (this.options.domEvents && gu(n, t), i = this.handlers[n] && this.handlers[n].slice(), i && i.length)
                for (t.type = n, t.preventDefault = function () {
                        t.srcEvent.preventDefault()
                    }, r = 0; r < i.length;) i[r](t), r++
        },
        destroy: function () {
            this.element && vr(this, !1);
            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null
        }
    };
    k(w, {
        INPUT_START: f,
        INPUT_MOVE: g,
        INPUT_END: u,
        INPUT_CANCEL: e,
        STATE_POSSIBLE: oi,
        STATE_BEGAN: h,
        STATE_CHANGED: ut,
        STATE_ENDED: b,
        STATE_RECOGNIZED: p,
        STATE_CANCELLED: yt,
        STATE_FAILED: a,
        DIRECTION_NONE: fi,
        DIRECTION_LEFT: ot,
        DIRECTION_RIGHT: st,
        DIRECTION_UP: ht,
        DIRECTION_DOWN: ct,
        DIRECTION_HORIZONTAL: l,
        DIRECTION_VERTICAL: nt,
        DIRECTION_ALL: br,
        Manager: gi,
        Input: s,
        TouchAction: pi,
        TouchInput: ti,
        MouseInput: ni,
        PointerEventInput: vi,
        TouchMouseInput: yi,
        SingleTouchInput: lr,
        Recognizer: y,
        AttrRecognizer: c,
        Tap: ui,
        Pan: ri,
        Swipe: di,
        Pinch: wi,
        Rotate: ki,
        Press: bi,
        on: pt,
        off: wt,
        each: v,
        merge: hi,
        extend: k,
        inherit: o,
        bindFn: ci,
        prefixed: dt
    });
    typeof define == pr && define.amd ? define(function () {
        return w
    }) : "undefined" != typeof module && module.exports ? module.exports = w : n[i] = w
}(window, document, "Hammer"),
function (n) {
    "function" == typeof define && define.amd ? define(["jquery", "hammerjs"], n) : "object" == typeof exports ? n(require("jquery"), require("hammerjs")) : n(jQuery, Hammer)
}(function (n, t) {
    function i(i, r) {
        var u = n(i);
        u.data("hammer") || u.data("hammer", new t(u[0], r))
    }
    n.fn.hammer = function (n) {
        return this.each(function () {
            i(this, n)
        })
    };
    t.Manager.prototype.emit = function (t) {
        return function (i, r) {
            t.call(this, i, r);
            n(this.element).trigger({
                type: i,
                gesture: r
            })
        }
    }(t.Manager.prototype.emit)
}),
function (n) {
    n.Package ? Materialize = {} : n.Materialize = {}
}(window);
Materialize.guid = function () {
    function n() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return function () {
        return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n()
    }
}();
Materialize.elementOrParentIsFixed = function (n) {
    var t = $(n),
        r = t.add(t.parents()),
        i = !1;
    return r.each(function () {
        if ("fixed" === $(this).css("position")) return (i = !0, !1)
    }), i
};
Vel = $ ? $.Velocity : jQuery ? jQuery.Velocity : Velocity,
    function (n) {
        n.fn.collapsible = function (t) {
            return t = n.extend({
                accordion: void 0
            }, t), this.each(function () {
                function e(t) {
                    i = r.find("> li > .collapsible-header");
                    t.hasClass("active") ? t.parent().addClass("active") : t.parent().removeClass("active");
                    t.parent().hasClass("active") ? t.siblings(".collapsible-body").stop(!0, !1).slideDown({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function () {
                            n(this).css("height", "")
                        }
                    }) : t.siblings(".collapsible-body").stop(!0, !1).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function () {
                            n(this).css("height", "")
                        }
                    });
                    i.not(t).removeClass("active").parent().removeClass("active");
                    i.not(t).parent().children(".collapsible-body").stop(!0, !1).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function () {
                            n(this).css("height", "")
                        }
                    })
                }

                function f(t) {
                    t.hasClass("active") ? t.parent().addClass("active") : t.parent().removeClass("active");
                    t.parent().hasClass("active") ? t.siblings(".collapsible-body").stop(!0, !1).slideDown({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function () {
                            n(this).css("height", "")
                        }
                    }) : t.siblings(".collapsible-body").stop(!0, !1).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: !1,
                        complete: function () {
                            n(this).css("height", "")
                        }
                    })
                }

                function s(n) {
                    var t = o(n);
                    return t.length > 0
                }

                function o(n) {
                    return n.closest("li > .collapsible-header")
                }
                var r = n(this),
                    i = n(this).find("> li > .collapsible-header"),
                    u = r.data("collapsible");
                r.off("click.collapse", "> li > .collapsible-header");
                i.off("click.collapse");
                r.on("click.collapse", "> li > .collapsible-header", function (i) {
                    var h = n(this),
                        r = n(i.target);
                    s(r) && (r = o(r));
                    r.toggleClass("active");
                    t.accordion || "accordion" === u || void 0 === u ? e(r) : (f(r), h.hasClass("active") && f(h))
                });
                i = r.find("> li > .collapsible-header");
                t.accordion || "accordion" === u || void 0 === u ? e(i.filter(".active").first()) : i.filter(".active").each(function () {
                    f(n(this))
                })
            })
        };
        n(document).ready(function () {
            n(".collapsible").collapsible()
        })
    }(jQuery),
    function (n) {
        n.fn.scrollTo = function (t) {
            return n(this).scrollTop(n(this).scrollTop() - n(this).offset().top + n(t).offset().top), this
        };
        n.fn.dropdown = function (t) {
            var i = {
                inDuration: 300,
                outDuration: 225,
                constrain_width: !0,
                hover: !1,
                gutter: 0,
                belowOrigin: !1,
                alignment: "left",
                stopPropagation: !1
            };
            return "open" === t ? (this.each(function () {
                n(this).trigger("open")
            }), !1) : "close" === t ? (this.each(function () {
                n(this).trigger("close")
            }), !1) : void this.each(function () {
                function h() {
                    void 0 !== t.data("induration") && (u.inDuration = t.data("induration"));
                    void 0 !== t.data("outduration") && (u.outDuration = t.data("outduration"));
                    void 0 !== t.data("constrainwidth") && (u.constrain_width = t.data("constrainwidth"));
                    void 0 !== t.data("hover") && (u.hover = t.data("hover"));
                    void 0 !== t.data("gutter") && (u.gutter = t.data("gutter"));
                    void 0 !== t.data("beloworigin") && (u.belowOrigin = t.data("beloworigin"));
                    void 0 !== t.data("alignment") && (u.alignment = t.data("alignment"));
                    void 0 !== t.data("stoppropagation") && (u.stopPropagation = t.data("stoppropagation"))
                }

                function o(i) {
                    var k, d;
                    "focus" === i && (s = !0);
                    h();
                    r.addClass("active");
                    t.addClass("active");
                    u.constrain_width === !0 ? r.css("width", t.outerWidth()) : r.css("white-space", "nowrap");
                    var y = window.innerHeight,
                        l = t.innerHeight(),
                        p = t.offset().left,
                        a = t.offset().top - n(window).scrollTop(),
                        o = u.alignment,
                        c = 0,
                        v = 0,
                        e = 0;
                    u.belowOrigin === !0 && (e = l);
                    var w = 0,
                        b = 0,
                        f = t.parent();
                    (f.is("body") || (f[0].scrollHeight > f[0].clientHeight && (w = f[0].scrollTop), f[0].scrollWidth > f[0].clientWidth && (b = f[0].scrollLeft)), p + r.innerWidth() > n(window).width() ? o = "right" : p - r.innerWidth() + t.innerWidth() < 0 && (o = "left"), a + r.innerHeight() > y) && (a + l - r.innerHeight() < 0 ? (k = y - a - e, r.css("max-height", k)) : (e || (e += l), e -= r.innerHeight()));
                    "left" === o ? (c = u.gutter, v = t.position().left + c) : "right" === o && (d = t.position().left + t.outerWidth() - r.outerWidth(), c = -u.gutter, v = d + c);
                    r.css({
                        position: "absolute",
                        top: t.position().top + e + w,
                        left: v + b
                    });
                    r.stop(!0, !0).css("opacity", 0).slideDown({
                        queue: !1,
                        duration: u.inDuration,
                        easing: "easeOutCubic",
                        complete: function () {
                            n(this).css("height", "")
                        }
                    }).animate({
                        opacity: 1
                    }, {
                        queue: !1,
                        duration: u.inDuration,
                        easing: "easeOutSine"
                    })
                }

                function f() {
                    s = !1;
                    r.fadeOut(u.outDuration);
                    r.removeClass("active");
                    t.removeClass("active");
                    setTimeout(function () {
                        r.css("max-height", "")
                    }, u.outDuration)
                }
                var t = n(this),
                    u = n.extend({}, i, u),
                    s = !1,
                    r = n("#" + t.attr("data-activates")),
                    e;
                (h(), t.after(r), u.hover) ? (e = !1, t.unbind("click." + t.attr("id")), t.on("mouseenter", function () {
                    e === !1 && (o(), e = !0)
                }), t.on("mouseleave", function (t) {
                    var i = t.toElement || t.relatedTarget;
                    n(i).closest(".dropdown-content").is(r) || (r.stop(!0, !0), f(), e = !1)
                }), r.on("mouseleave", function (i) {
                    var u = i.toElement || i.relatedTarget;
                    n(u).closest(".dropdown-button").is(t) || (r.stop(!0, !0), f(), e = !1)
                })) : (t.unbind("click." + t.attr("id")), t.bind("click." + t.attr("id"), function (i) {
                    s || (t[0] != i.currentTarget || t.hasClass("active") || 0 !== n(i.target).closest(".dropdown-content").length ? t.hasClass("active") && (f(), n(document).unbind("click." + r.attr("id") + " touchstart." + r.attr("id"))) : (i.preventDefault(), u.stopPropagation && i.stopPropagation(), o("click")), r.hasClass("active") && n(document).bind("click." + r.attr("id") + " touchstart." + r.attr("id"), function (i) {
                        r.is(i.target) || t.is(i.target) || t.find(i.target).length || (f(), n(document).unbind("click." + r.attr("id") + " touchstart." + r.attr("id")))
                    }))
                }));
                t.on("open", function (n, t) {
                    o(t)
                });
                t.on("close", f)
            })
        };
        n(document).ready(function () {
            n(".dropdown-button").dropdown()
        })
    }(jQuery),
    function (n) {
        var t = 0,
            i = 0,
            r = function () {
                return i++, "materialize-lean-overlay-" + i
            };
        n.fn.extend({
            openModal: function (i) {
                var o = n("body"),
                    h = o.innerWidth(),
                    s, u, e, f;
                o.css("overflow", "hidden");
                o.width(h);
                s = {
                    opacity: .5,
                    in_duration: 350,
                    out_duration: 250,
                    ready: void 0,
                    complete: void 0,
                    dismissible: !0,
                    starting_top: "4%",
                    ending_top: "10%"
                };
                u = n(this);
                u.hasClass("open") || (e = r(), f = n('<div class="lean-overlay"><\/div>'), lStack = ++t, f.attr("id", e).css("z-index", 1e3 + 2 * lStack), u.data("overlay-id", e).css("z-index", 1e3 + 2 * lStack + 1), u.addClass("open"), n("body").append(f), i = n.extend(s, i), i.dismissible && (f.click(function () {
                    u.closeModal(i)
                }), n(document).on("keyup.leanModal" + e, function (n) {
                    27 === n.keyCode && u.closeModal(i)
                })), u.find(".modal-close").on("click.close", function () {
                    u.closeModal(i)
                }), f.css({
                    display: "block",
                    opacity: 0
                }), u.css({
                    display: "block",
                    opacity: 0
                }), f.velocity({
                    opacity: i.opacity
                }, {
                    duration: i.in_duration,
                    queue: !1,
                    ease: "easeOutCubic"
                }), u.data("associated-overlay", f[0]), u.hasClass("bottom-sheet") ? u.velocity({
                    bottom: "0",
                    opacity: 1
                }, {
                    duration: i.in_duration,
                    queue: !1,
                    ease: "easeOutCubic",
                    complete: function () {
                        "function" == typeof i.ready && i.ready()
                    }
                }) : (n.Velocity.hook(u, "scaleX", .7), u.css({
                    top: i.starting_top
                }), u.velocity({
                    top: i.ending_top,
                    opacity: 1,
                    scaleX: "1"
                }, {
                    duration: i.in_duration,
                    queue: !1,
                    ease: "easeOutCubic",
                    complete: function () {
                        "function" == typeof i.ready && i.ready()
                    }
                })))
            }
        });
        n.fn.extend({
            closeModal: function (i) {
                var r = n(this),
                    f = r.data("overlay-id"),
                    u = n("#" + f);
                r.removeClass("open");
                i = n.extend({
                    out_duration: 250,
                    complete: void 0
                }, i);
                n("body").css({
                    overflow: "",
                    width: ""
                });
                r.find(".modal-close").off("click.close");
                n(document).off("keyup.leanModal" + f);
                u.velocity({
                    opacity: 0
                }, {
                    duration: i.out_duration,
                    queue: !1,
                    ease: "easeOutQuart"
                });
                r.hasClass("bottom-sheet") ? r.velocity({
                    bottom: "-100%",
                    opacity: 0
                }, {
                    duration: i.out_duration,
                    queue: !1,
                    ease: "easeOutCubic",
                    complete: function () {
                        u.css({
                            display: "none"
                        });
                        "function" == typeof i.complete && i.complete();
                        u.remove();
                        t--
                    }
                }) : r.velocity({
                    top: i.starting_top,
                    opacity: 0,
                    scaleX: .7
                }, {
                    duration: i.out_duration,
                    complete: function () {
                        n(this).css("display", "none");
                        "function" == typeof i.complete && i.complete();
                        u.remove();
                        t--
                    }
                })
            }
        });
        n.fn.extend({
            leanModal: function (t) {
                return this.each(function () {
                    var i = n.extend({
                        starting_top: "4%"
                    }, t);
                    n(this).click(function (t) {
                        i.starting_top = (n(this).offset().top - n(window).scrollTop()) / 1.15;
                        var r = n(this).attr("href") || "#" + n(this).data("target");
                        n(r).openModal(i);
                        t.preventDefault()
                    })
                })
            }
        })
    }(jQuery),
    function (n) {
        n.fn.materialbox = function () {
            return this.each(function () {
                function f() {
                    i = !1;
                    var u = t.parent(".material-placeholder"),
                        f = (window.innerWidth, window.innerHeight, t.data("width")),
                        o = t.data("height");
                    t.velocity("stop", !0);
                    n("#materialbox-overlay").velocity("stop", !0);
                    n(".materialbox-caption").velocity("stop", !0);
                    n("#materialbox-overlay").velocity({
                        opacity: 0
                    }, {
                        duration: s,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function () {
                            e = !1;
                            n(this).remove()
                        }
                    });
                    t.velocity({
                        width: f,
                        height: o,
                        left: 0,
                        top: 0
                    }, {
                        duration: s,
                        queue: !1,
                        easing: "easeOutQuad"
                    });
                    n(".materialbox-caption").velocity({
                        opacity: 0
                    }, {
                        duration: s,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function () {
                            u.css({
                                height: "",
                                width: "",
                                position: "",
                                top: "",
                                left: ""
                            });
                            t.css({
                                height: "",
                                top: "",
                                left: "",
                                width: "",
                                "max-width": "",
                                position: "",
                                "z-index": ""
                            });
                            t.removeClass("active");
                            i = !0;
                            n(this).remove();
                            r && r.css("overflow", "")
                        }
                    })
                }
                if (!n(this).hasClass("initialized")) {
                    n(this).addClass("initialized");
                    var r, u, e = !1,
                        i = !0,
                        o = 275,
                        s = 200,
                        t = n(this),
                        h = n("<div><\/div>").addClass("material-placeholder");
                    t.wrap(h);
                    t.on("click", function () {
                        var p = t.parent(".material-placeholder"),
                            c = window.innerWidth,
                            l = window.innerHeight,
                            a = t.width(),
                            w = t.height(),
                            v, k, y;
                        if (i === !1 || e && i === !0) return f(), !1;
                        for (i = !1, t.addClass("active"), e = !0, p.css({
                                width: p[0].getBoundingClientRect().width,
                                height: p[0].getBoundingClientRect().height,
                                position: "relative",
                                top: 0,
                                left: 0
                            }), r = void 0, u = p[0].parentNode; null !== u && !n(u).is(document);) v = n(u), "visible" !== v.css("overflow") && (v.css("overflow", "visible"), r = void 0 === r ? v : r.add(v)), u = u.parentNode;
                        t.css({
                            position: "absolute",
                            "z-index": 1e3
                        }).data("width", a).data("height", w);
                        k = n('<div id="materialbox-overlay"><\/div>').css({
                            opacity: 0
                        }).click(function () {
                            i === !0 && f()
                        });
                        (t.before(k), k.velocity({
                            opacity: 1
                        }, {
                            duration: o,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), "" !== t.data("caption")) && (y = n('<div class="materialbox-caption"><\/div>'), y.text(t.data("caption")), n("body").append(y), y.css({
                            display: "inline"
                        }), y.velocity({
                            opacity: 1
                        }, {
                            duration: o,
                            queue: !1,
                            easing: "easeOutQuad"
                        }));
                        var b = 0,
                            d = a / c,
                            g = w / l,
                            s = 0,
                            h = 0;
                        d > g ? (b = w / a, s = .9 * c, h = .9 * c * b) : (b = a / w, s = .9 * l * b, h = .9 * l);
                        t.hasClass("responsive-img") ? t.velocity({
                            "max-width": s,
                            width: a
                        }, {
                            duration: 0,
                            queue: !1,
                            complete: function () {
                                t.css({
                                    left: 0,
                                    top: 0
                                }).velocity({
                                    height: h,
                                    width: s,
                                    left: n(document).scrollLeft() + c / 2 - t.parent(".material-placeholder").offset().left - s / 2,
                                    top: n(document).scrollTop() + l / 2 - t.parent(".material-placeholder").offset().top - h / 2
                                }, {
                                    duration: o,
                                    queue: !1,
                                    easing: "easeOutQuad",
                                    complete: function () {
                                        i = !0
                                    }
                                })
                            }
                        }) : t.css("left", 0).css("top", 0).velocity({
                            height: h,
                            width: s,
                            left: n(document).scrollLeft() + c / 2 - t.parent(".material-placeholder").offset().left - s / 2,
                            top: n(document).scrollTop() + l / 2 - t.parent(".material-placeholder").offset().top - h / 2
                        }, {
                            duration: o,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function () {
                                i = !0
                            }
                        })
                    });
                    n(window).scroll(function () {
                        e && f()
                    });
                    n(document).keyup(function (n) {
                        27 === n.keyCode && i === !0 && e && f()
                    })
                }
            })
        };
        n(document).ready(function () {
            n(".materialboxed").materialbox()
        })
    }(jQuery),
    function (n) {
        n.fn.parallax = function () {
            var t = n(window).width();
            return this.each(function () {
                function r(r) {
                    var u = 601 > t ? i.height() > 0 ? i.height() : i.children("img").height() : i.height() > 0 ? i.height() : 500;
                    var f = i.children("img").first(),
                        h = f.height(),
                        c = h - u,
                        l = i.offset().top + u,
                        s = i.offset().top,
                        e = n(window).scrollTop(),
                        o = window.innerHeight,
                        a = e + o,
                        v = (a - s) / (u + o),
                        y = Math.round(c * v);
                    r && f.css("display", "block");
                    l > e && e + o > s && f.css("transform", "translate3D(-50%," + y + "px, 0)")
                }
                var i = n(this);
                i.addClass("parallax");
                i.children("img").one("load", function () {
                    r(!0)
                }).each(function () {
                    this.complete && n(this).load()
                });
                n(window).scroll(function () {
                    t = n(window).width();
                    r(!1)
                });
                n(window).resize(function () {
                    t = n(window).width();
                    r(!1)
                })
            })
        }
    }(jQuery),
    function (n) {
        var t = {
            init: function (t) {
                return t = n.extend({
                    onShow: null
                }, t), this.each(function () {
                    var r = n(this),
                        o;
                    n(window).width();
                    r.width("100%");
                    var u, h, s = r.find("li.tab a"),
                        e = r.width(),
                        f = Math.max(e, r[0].scrollWidth) / s.length,
                        i = 0;
                    u = n(s.filter('[href="' + location.hash + '"]'));
                    0 === u.length && (u = n(this).find("li.tab a.active").first());
                    0 === u.length && (u = n(this).find("li.tab a").first());
                    u.addClass("active");
                    i = s.index(u);
                    0 > i && (i = 0);
                    void 0 !== u[0] && (h = n(u[0].hash));
                    r.append('<div class="indicator"><\/div>');
                    o = r.find(".indicator");
                    r.is(":visible") && (o.css({
                        right: e - (i + 1) * f
                    }), o.css({
                        left: i * f
                    }));
                    n(window).resize(function () {
                        e = r.width();
                        f = Math.max(e, r[0].scrollWidth) / s.length;
                        0 > i && (i = 0);
                        0 !== f && 0 !== e && (o.css({
                            right: e - (i + 1) * f
                        }), o.css({
                            left: i * f
                        }))
                    });
                    s.not(u).each(function () {
                        n(this.hash).hide()
                    });
                    r.on("click", "a", function (c) {
                        if (n(this).parent().hasClass("disabled")) return void c.preventDefault();
                        if (!n(this).attr("target")) {
                            e = r.width();
                            f = Math.max(e, r[0].scrollWidth) / s.length;
                            u.removeClass("active");
                            void 0 !== h && h.hide();
                            u = n(this);
                            h = n(this.hash);
                            s = r.find("li.tab a");
                            u.addClass("active");
                            var l = i;
                            i = s.index(n(this));
                            0 > i && (i = 0);
                            void 0 !== h && (h.show(), "function" == typeof t.onShow && t.onShow.call(this, h));
                            i - l >= 0 ? (o.velocity({
                                right: e - (i + 1) * f
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), o.velocity({
                                left: i * f
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                delay: 90
                            })) : (o.velocity({
                                left: i * f
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), o.velocity({
                                right: e - (i + 1) * f
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                delay: 90
                            }));
                            c.preventDefault()
                        }
                    })
                })
            },
            select_tab: function (n) {
                this.find('a[href="#' + n + '"]').trigger("click")
            }
        };
        n.fn.tabs = function (i) {
            return t[i] ? t[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void n.error("Method " + i + " does not exist on jQuery.tooltip") : t.init.apply(this, arguments)
        };
        n(document).ready(function () {
            n("ul.tabs").tabs()
        })
    }(jQuery),
    function (n) {
        n.fn.tooltip = function (i) {
            var r = 5;
            return "remove" === i ? (this.each(function () {
                n("#" + n(this).attr("data-tooltip-id")).remove();
                n(this).off("mouseenter.tooltip mouseleave.tooltip")
            }), !1) : (i = n.extend({
                delay: 350,
                tooltip: "",
                position: "bottom",
                html: !1
            }, i), this.each(function () {
                var a = Materialize.guid(),
                    u = n(this),
                    v, h, s, e, o, f, l, y, p, c;
                u.attr("data-tooltip-id", a);
                l = function () {
                    v = u.attr("data-html") ? "true" === u.attr("data-html") : i.html;
                    h = u.attr("data-delay");
                    h = void 0 === h || "" === h ? i.delay : h;
                    s = u.attr("data-position");
                    s = void 0 === s || "" === s ? i.position : s;
                    e = u.attr("data-tooltip");
                    e = void 0 === e || "" === e ? i.tooltip : e
                };
                l();
                y = function () {
                    var t = n('<div class="material-tooltip"><\/div>');
                    return e = v ? n("<span><\/span>").html(e) : n("<span><\/span>").text(e), t.append(e).appendTo(n("body")).attr("id", a), f = n('<div class="backdrop"><\/div>'), f.appendTo(t), t
                };
                o = y();
                u.off("mouseenter.tooltip mouseleave.tooltip");
                c = !1;
                u.on({
                    "mouseenter.tooltip": function () {
                        var n = function () {
                            l();
                            c = !0;
                            o.velocity("stop");
                            f.velocity("stop");
                            o.css({
                                display: "block",
                                left: "0px",
                                top: "0px"
                            });
                            var e, h, a, v = u.outerWidth(),
                                w = u.outerHeight(),
                                n = o.outerHeight(),
                                i = o.outerWidth(),
                                y = "0px",
                                p = "0px",
                                b = 8,
                                k = 8;
                            "top" === s ? (e = u.offset().top - n - r, h = u.offset().left + v / 2 - i / 2, a = t(h, e, i, n), y = "-10px", f.css({
                                bottom: 0,
                                left: 0,
                                borderRadius: "14px 14px 0 0",
                                transformOrigin: "50% 100%",
                                marginTop: n,
                                marginLeft: i / 2 - f.width() / 2
                            })) : "left" === s ? (e = u.offset().top + w / 2 - n / 2, h = u.offset().left - i - r, a = t(h, e, i, n), p = "-10px", f.css({
                                top: "-7px",
                                right: 0,
                                width: "14px",
                                height: "14px",
                                borderRadius: "14px 0 0 14px",
                                transformOrigin: "95% 50%",
                                marginTop: n / 2,
                                marginLeft: i
                            })) : "right" === s ? (e = u.offset().top + w / 2 - n / 2, h = u.offset().left + v + r, a = t(h, e, i, n), p = "+10px", f.css({
                                top: "-7px",
                                left: 0,
                                width: "14px",
                                height: "14px",
                                borderRadius: "0 14px 14px 0",
                                transformOrigin: "5% 50%",
                                marginTop: n / 2,
                                marginLeft: "0px"
                            })) : (e = u.offset().top + u.outerHeight() + r, h = u.offset().left + v / 2 - i / 2, a = t(h, e, i, n), y = "+10px", f.css({
                                top: 0,
                                left: 0,
                                marginLeft: i / 2 - f.width() / 2
                            }));
                            o.css({
                                top: a.y,
                                left: a.x
                            });
                            b = Math.SQRT2 * i / parseInt(f.css("width"));
                            k = Math.SQRT2 * n / parseInt(f.css("height"));
                            o.velocity({
                                marginTop: y,
                                marginLeft: p
                            }, {
                                duration: 350,
                                queue: !1
                            }).velocity({
                                opacity: 1
                            }, {
                                duration: 300,
                                delay: 50,
                                queue: !1
                            });
                            f.css({
                                display: "block"
                            }).velocity({
                                opacity: 1
                            }, {
                                duration: 55,
                                delay: 0,
                                queue: !1
                            }).velocity({
                                scaleX: b,
                                scaleY: k
                            }, {
                                duration: 300,
                                delay: 0,
                                queue: !1,
                                easing: "easeInOutQuad"
                            })
                        };
                        p = setTimeout(n, h)
                    },
                    "mouseleave.tooltip": function () {
                        c = !1;
                        clearTimeout(p);
                        setTimeout(function () {
                            c !== !0 && (o.velocity({
                                opacity: 0,
                                marginTop: 0,
                                marginLeft: 0
                            }, {
                                duration: 225,
                                queue: !1
                            }), f.velocity({
                                opacity: 0,
                                scaleX: 1,
                                scaleY: 1
                            }, {
                                duration: 225,
                                queue: !1,
                                complete: function () {
                                    f.css("display", "none");
                                    o.css("display", "none");
                                    c = !1
                                }
                            }))
                        }, 225)
                    }
                })
            }))
        };
        var t = function (t, i, r, u) {
            var f = t,
                e = i;
            return 0 > f ? f = 4 : f + r > window.innerWidth && (f -= f + r - window.innerWidth), 0 > e ? e = 4 : e + u > window.innerHeight + n(window).scrollTop && (e -= e + u - window.innerHeight), {
                x: f,
                y: e
            }
        };
        n(document).ready(function () {
            n(".tooltipped").tooltip()
        })
    }(jQuery),
    function (n) {
        "use strict";

        function e(n) {
            return null !== n && n === n.window
        }

        function o(n) {
            return e(n) ? n : 9 === n.nodeType && n.defaultView
        }

        function s(n) {
            var t, i, r = {
                    top: 0,
                    left: 0
                },
                u = n && n.ownerDocument;
            return t = u.documentElement, "undefined" != typeof n.getBoundingClientRect && (r = n.getBoundingClientRect()), i = o(u), {
                top: r.top + i.pageYOffset - t.clientTop,
                left: r.left + i.pageXOffset - t.clientLeft
            }
        }

        function f(n) {
            var i = "";
            for (var t in n) n.hasOwnProperty(t) && (i += t + ":" + n[t] + ";");
            return i
        }

        function h(n) {
            if (i.allowEvent(n) === !1) return null;
            for (var r = null, t = n.target || n.srcElement; null !== t.parentElement;) {
                if (!(t instanceof SVGElement || -1 === t.className.indexOf("waves-effect"))) {
                    r = t;
                    break
                }
                if (t.classList.contains("waves-effect")) {
                    r = t;
                    break
                }
                t = t.parentElement
            }
            return r
        }

        function u(i) {
            var r = h(i);
            null !== r && (t.show(i, r), "ontouchstart" in n && (r.addEventListener("touchend", t.hide, !1), r.addEventListener("touchcancel", t.hide, !1)), r.addEventListener("mouseup", t.hide, !1), r.addEventListener("mouseleave", t.hide, !1))
        }
        var r = r || {},
            c = document.querySelectorAll.bind(document),
            t = {
                duration: 750,
                show: function (n, i) {
                    var o, u, r;
                    if (2 === n.button) return !1;
                    o = i || this;
                    u = document.createElement("div");
                    u.className = "waves-ripple";
                    o.appendChild(u);
                    var h = s(o),
                        c = n.pageY - h.top,
                        l = n.pageX - h.left,
                        e = "scale(" + o.clientWidth / 10 + ")";
                    "touches" in n && (c = n.touches[0].pageY - h.top, l = n.touches[0].pageX - h.left);
                    u.setAttribute("data-hold", Date.now());
                    u.setAttribute("data-scale", e);
                    u.setAttribute("data-x", l);
                    u.setAttribute("data-y", c);
                    r = {
                        top: c + "px",
                        left: l + "px"
                    };
                    u.className = u.className + " waves-notransition";
                    u.setAttribute("style", f(r));
                    u.className = u.className.replace("waves-notransition", "");
                    r["-webkit-transform"] = e;
                    r["-moz-transform"] = e;
                    r["-ms-transform"] = e;
                    r["-o-transform"] = e;
                    r.transform = e;
                    r.opacity = "1";
                    r["-webkit-transition-duration"] = t.duration + "ms";
                    r["-moz-transition-duration"] = t.duration + "ms";
                    r["-o-transition-duration"] = t.duration + "ms";
                    r["transition-duration"] = t.duration + "ms";
                    r["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
                    r["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
                    r["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
                    r["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
                    u.setAttribute("style", f(r))
                },
                hide: function (n) {
                    i.touchup(n);
                    var e = this,
                        r = (1.4 * e.clientWidth, null),
                        o = e.getElementsByClassName("waves-ripple");
                    if (!(o.length > 0)) return !1;
                    r = o[o.length - 1];
                    var h = r.getAttribute("data-x"),
                        c = r.getAttribute("data-y"),
                        u = r.getAttribute("data-scale"),
                        l = Date.now() - Number(r.getAttribute("data-hold")),
                        s = 350 - l;
                    0 > s && (s = 0);
                    setTimeout(function () {
                        var n = {
                            top: c + "px",
                            left: h + "px",
                            opacity: "0",
                            "-webkit-transition-duration": t.duration + "ms",
                            "-moz-transition-duration": t.duration + "ms",
                            "-o-transition-duration": t.duration + "ms",
                            "transition-duration": t.duration + "ms",
                            "-webkit-transform": u,
                            "-moz-transform": u,
                            "-ms-transform": u,
                            "-o-transform": u,
                            transform: u
                        };
                        r.setAttribute("style", f(n));
                        setTimeout(function () {
                            try {
                                e.removeChild(r)
                            } catch (n) {
                                return !1
                            }
                        }, t.duration)
                    }, s)
                },
                wrapInput: function (n) {
                    for (var t, u, i, f, r = 0; r < n.length; r++)
                        if (t = n[r], "input" === t.tagName.toLowerCase()) {
                            if (u = t.parentNode, "i" === u.tagName.toLowerCase() && -1 !== u.className.indexOf("waves-effect")) continue;
                            i = document.createElement("i");
                            i.className = t.className + " waves-input-wrapper";
                            f = t.getAttribute("style");
                            f || (f = "");
                            i.setAttribute("style", f);
                            t.className = "waves-button-input";
                            t.removeAttribute("style");
                            u.replaceChild(i, t);
                            i.appendChild(t)
                        }
                }
            },
            i = {
                touches: 0,
                allowEvent: function (n) {
                    var t = !0;
                    return "touchstart" === n.type ? i.touches += 1 : "touchend" === n.type || "touchcancel" === n.type ? setTimeout(function () {
                        i.touches > 0 && (i.touches -= 1)
                    }, 500) : "mousedown" === n.type && i.touches > 0 && (t = !1), t
                },
                touchup: function (n) {
                    i.allowEvent(n)
                }
            };
        r.displayEffect = function (i) {
            i = i || {};
            "duration" in i && (t.duration = i.duration);
            t.wrapInput(c(".waves-effect"));
            "ontouchstart" in n && document.body.addEventListener("touchstart", u, !1);
            document.body.addEventListener("mousedown", u, !1)
        };
        r.attach = function (i) {
            "input" === i.tagName.toLowerCase() && (t.wrapInput([i]), i = i.parentElement);
            "ontouchstart" in n && i.addEventListener("touchstart", u, !1);
            i.addEventListener("mousedown", u, !1)
        };
        n.Waves = r;
        document.addEventListener("DOMContentLoaded", function () {
            r.displayEffect()
        }, !1)
    }(window);
Materialize.toast = function (n, t, i, r) {
        function s(n) {
            var t = document.createElement("div"),
                f;
            if (t.classList.add("toast"), i)
                for (var e = i.split(" "), u = 0, o = e.length; o > u; u++) t.classList.add(e[u]);
            return ("object" == typeof HTMLElement ? n instanceof HTMLElement : n && "object" == typeof n && null !== n && 1 === n.nodeType && "string" == typeof n.nodeName) ? t.appendChild(n) : n instanceof jQuery ? t.appendChild(n[0]) : t.innerHTML = n, f = new Hammer(t, {
                prevent_default: !1
            }), f.on("pan", function (n) {
                var r = n.deltaX,
                    i;
                t.classList.contains("panning") || t.classList.add("panning");
                i = 1 - Math.abs(r / 80);
                0 > i && (i = 0);
                Vel(t, {
                    left: r,
                    opacity: i
                }, {
                    duration: 50,
                    queue: !1,
                    easing: "easeOutQuad"
                })
            }), f.on("panend", function (n) {
                var i = n.deltaX;
                Math.abs(i) > 80 ? Vel(t, {
                    marginTop: "-40px"
                }, {
                    duration: 375,
                    easing: "easeOutExpo",
                    queue: !1,
                    complete: function () {
                        "function" == typeof r && r();
                        t.parentNode.removeChild(t)
                    }
                }) : (t.classList.remove("panning"), Vel(t, {
                    left: 0,
                    opacity: 1
                }, {
                    duration: 300,
                    easing: "easeOutExpo",
                    queue: !1
                }))
            }), t
        }
        var f, u, e, o;
        i = i || "";
        f = document.getElementById("toast-container");
        null === f && (f = document.createElement("div"), f.id = "toast-container", document.body.appendChild(f));
        u = s(n);
        n && f.appendChild(u);
        u.style.top = "35px";
        u.style.opacity = 0;
        Vel(u, {
            top: "0px",
            opacity: 1
        }, {
            duration: 300,
            easing: "easeOutCubic",
            queue: !1
        });
        e = t;
        o = setInterval(function () {
            null === u.parentNode && window.clearInterval(o);
            u.classList.contains("panning") || (e -= 20);
            0 >= e && (Vel(u, {
                opacity: 0,
                marginTop: "-40px"
            }, {
                duration: 375,
                easing: "easeOutExpo",
                queue: !1,
                complete: function () {
                    "function" == typeof r && r();
                    this[0].parentNode.removeChild(this[0])
                }
            }), window.clearInterval(o))
        }, 20)
    },
    function (n) {
        var t = {
            init: function (t) {
                t = n.extend({
                    menuWidth: 300,
                    edge: "left",
                    closeOnClick: !1
                }, t);
                n(this).each(function () {
                    function f(f) {
                        e = !1;
                        r = !1;
                        n("body").css({
                            overflow: "",
                            width: ""
                        });
                        n("#sidenav-overlay").velocity({
                            opacity: 0
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function () {
                                n(this).remove()
                            }
                        });
                        "left" === t.edge ? (u.css({
                            width: "",
                            right: "",
                            left: "0"
                        }), i.velocity({
                            translateX: "-100%"
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutCubic",
                            complete: function () {
                                f === !0 && (i.removeAttr("style"), i.css("width", t.menuWidth))
                            }
                        })) : (u.css({
                            width: "",
                            right: "0",
                            left: ""
                        }), i.velocity({
                            translateX: "100%"
                        }, {
                            duration: 200,
                            queue: !1,
                            easing: "easeOutCubic",
                            complete: function () {
                                f === !0 && (i.removeAttr("style"), i.css("width", t.menuWidth))
                            }
                        }))
                    }
                    var o = n(this),
                        i = n("#" + o.attr("data-activates")),
                        u, e, r;
                    300 != t.menuWidth && i.css("width", t.menuWidth);
                    u = n('<div class="drag-target"><\/div>');
                    n("body").append(u);
                    "left" == t.edge ? (i.css("transform", "translateX(-100%)"), u.css({
                        left: 0
                    })) : (i.addClass("right-aligned").css("transform", "translateX(100%)"), u.css({
                        right: 0
                    }));
                    i.hasClass("fixed") && window.innerWidth > 992 && i.css("transform", "translateX(0)");
                    i.hasClass("fixed") && n(window).resize(function () {
                        window.innerWidth > 992 ? 0 !== n("#sidenav-overlay").length && r ? f(!0) : i.css("transform", "translateX(0%)") : r === !1 && ("left" === t.edge ? i.css("transform", "translateX(-100%)") : i.css("transform", "translateX(100%)"))
                    });
                    t.closeOnClick === !0 && i.on("click.itemclick", "a:not(.collapsible-header)", function () {
                        f()
                    });
                    e = !1;
                    r = !1;
                    u.on("click", function () {
                        r && f()
                    });
                    u.hammer({
                        prevent_default: !1
                    }).bind("pan", function (u) {
                        var c, o, s;
                        if ("touch" == u.gesture.pointerType) {
                            var e = (u.gesture.direction, u.gesture.center.x),
                                h = (u.gesture.center.y, u.gesture.velocityX, n("body")),
                                l = h.innerWidth();
                            (h.css("overflow", "hidden"), h.width(l), 0 === n("#sidenav-overlay").length) && (c = n('<div id="sidenav-overlay"><\/div>'), c.css("opacity", 0).click(function () {
                                f()
                            }), n("body").append(c));
                            ("left" === t.edge && (e > t.menuWidth ? e = t.menuWidth : 0 > e && (e = 0)), "left" === t.edge) ? (e < t.menuWidth / 2 ? r = !1 : e >= t.menuWidth / 2 && (r = !0), i.css("transform", "translateX(" + (e - t.menuWidth) + "px)")) : (e < window.innerWidth - t.menuWidth / 2 ? r = !0 : e >= window.innerWidth - t.menuWidth / 2 && (r = !1), o = e - t.menuWidth / 2, 0 > o && (o = 0), i.css("transform", "translateX(" + o + "px)"));
                            "left" === t.edge ? (s = e / t.menuWidth, n("#sidenav-overlay").velocity({
                                opacity: s
                            }, {
                                duration: 10,
                                queue: !1,
                                easing: "easeOutQuad"
                            })) : (s = Math.abs((e - window.innerWidth) / t.menuWidth), n("#sidenav-overlay").velocity({
                                opacity: s
                            }, {
                                duration: 10,
                                queue: !1,
                                easing: "easeOutQuad"
                            }))
                        }
                    }).bind("panend", function (f) {
                        if ("touch" == f.gesture.pointerType) {
                            var o = f.gesture.velocityX,
                                c = f.gesture.center.x,
                                s = c - t.menuWidth,
                                h = c - t.menuWidth / 2;
                            s > 0 && (s = 0);
                            0 > h && (h = 0);
                            e = !1;
                            "left" === t.edge ? r && .3 >= o || -.5 > o ? (0 !== s && i.velocity({
                                translateX: [0, s]
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), n("#sidenav-overlay").velocity({
                                opacity: 1
                            }, {
                                duration: 50,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), u.css({
                                width: "50%",
                                right: 0,
                                left: ""
                            }), r = !0) : (!r || o > .3) && (n("body").css({
                                overflow: "",
                                width: ""
                            }), i.velocity({
                                translateX: [-1 * t.menuWidth - 10, s]
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), n("#sidenav-overlay").velocity({
                                opacity: 0
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function () {
                                    n(this).remove()
                                }
                            }), u.css({
                                width: "10px",
                                right: "",
                                left: 0
                            })) : r && o >= -.3 || o > .5 ? (0 !== h && i.velocity({
                                translateX: [0, h]
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), n("#sidenav-overlay").velocity({
                                opacity: 1
                            }, {
                                duration: 50,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), u.css({
                                width: "50%",
                                right: "",
                                left: 0
                            }), r = !0) : (!r || -.3 > o) && (n("body").css({
                                overflow: "",
                                width: ""
                            }), i.velocity({
                                translateX: [t.menuWidth + 10, h]
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad"
                            }), n("#sidenav-overlay").velocity({
                                opacity: 0
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function () {
                                    n(this).remove()
                                }
                            }), u.css({
                                width: "10px",
                                right: 0,
                                left: ""
                            }))
                        }
                    });
                    o.click(function () {
                        var s, h, o;
                        return r === !0 ? (r = !1, e = !1, f()) : (s = n("body"), h = s.innerWidth(), s.css("overflow", "hidden"), s.width(h), n("body").append(u), "left" === t.edge ? (u.css({
                            width: "50%",
                            right: 0,
                            left: ""
                        }), i.velocity({
                            translateX: [0, -1 * t.menuWidth]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        })) : (u.css({
                            width: "50%",
                            right: "",
                            left: 0
                        }), i.velocity({
                            translateX: [0, t.menuWidth]
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        })), o = n('<div id="sidenav-overlay"><\/div>'), o.css("opacity", 0).click(function () {
                            r = !1;
                            e = !1;
                            f();
                            o.velocity({
                                opacity: 0
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function () {
                                    n(this).remove()
                                }
                            })
                        }), n("body").append(o), o.velocity({
                            opacity: 1
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function () {
                                r = !0;
                                e = !1
                            }
                        })), !1
                    })
                })
            },
            show: function () {
                this.trigger("click")
            },
            hide: function () {
                n("#sidenav-overlay").trigger("click")
            }
        };
        n.fn.sideNav = function (i) {
            return t[i] ? t[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void n.error("Method " + i + " does not exist on jQuery.sideNav") : t.init.apply(this, arguments)
        }
    }(jQuery),
    function (n) {
        function h(t, i, r, u) {
            var e = n();
            return n.each(f, function (n, f) {
                if (f.height() > 0) {
                    var o = f.offset().top,
                        s = f.offset().left,
                        h = s + f.width(),
                        c = o + f.height(),
                        l = !(s > i || u > h || o > r || t > c);
                    l && e.push(f)
                }
            }), e
        }

        function c() {
            ++r;
            var u = t.scrollTop(),
                f = t.scrollLeft(),
                s = f + t.width(),
                c = u + t.height(),
                o = h(u + i.top + 200, s + i.right, c + i.bottom, f + i.left);
            n.each(o, function (n, t) {
                var i = t.data("scrollSpy:ticks");
                "number" != typeof i && t.triggerHandler("scrollSpy:enter");
                t.data("scrollSpy:ticks", r)
            });
            n.each(e, function (n, t) {
                var i = t.data("scrollSpy:ticks");
                "number" == typeof i && i !== r && (t.triggerHandler("scrollSpy:exit"), t.data("scrollSpy:ticks", null))
            });
            e = o
        }

        function l() {
            t.trigger("scrollSpy:winSize")
        }

        function u(n, t, i) {
            var r, u, o, f = null,
                e = 0,
                h;
            return i || (i = {}), h = function () {
                    e = i.leading === !1 ? 0 : s();
                    f = null;
                    o = n.apply(r, u);
                    r = u = null
                },
                function () {
                    var c = s(),
                        l;
                    return e || i.leading !== !1 || (e = c), l = t - (c - e), r = this, u = arguments, 0 >= l ? (clearTimeout(f), f = null, e = c, o = n.apply(r, u), r = u = null) : f || i.trailing === !1 || (f = setTimeout(h, l)), o
                }
        }
        var t = n(window),
            f = [],
            e = [],
            o = !1,
            r = 0,
            i = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            s = Date.now || function () {
                return (new Date).getTime()
            };
        n.scrollSpy = function (r, e) {
            var s, l, h;
            return e = n.extend({
                throttle: 100,
                scrollOffset: 200
            }, e), s = [], r = n(r), r.each(function (t, i) {
                f.push(n(i));
                n(i).data("scrollSpy:id", t);
                n('a[href="#' + n(i).attr("id") + '"]').click(function (t) {
                    t.preventDefault();
                    var i = n(this.hash).offset().top + 1;
                    n("html, body").animate({
                        scrollTop: i - e.scrollOffset
                    }, {
                        duration: 400,
                        queue: !1,
                        easing: "easeOutCubic"
                    })
                })
            }), i.top = e.offsetTop || 0, i.right = e.offsetRight || 0, i.bottom = e.offsetBottom || 0, i.left = e.offsetLeft || 0, l = u(c, e.throttle || 100), h = function () {
                n(document).ready(l)
            }, o || (t.on("scroll", h), t.on("resize", h), o = !0), setTimeout(h, 0), r.on("scrollSpy:enter", function () {
                s = n.grep(s, function (n) {
                    return 0 != n.height()
                });
                var t = n(this);
                s[0] ? (n('a[href="#' + s[0].attr("id") + '"]').removeClass("active"), t.data("scrollSpy:id") < s[0].data("scrollSpy:id") ? s.unshift(n(this)) : s.push(n(this))) : s.push(n(this));
                n('a[href="#' + s[0].attr("id") + '"]').addClass("active")
            }), r.on("scrollSpy:exit", function () {
                if (s = n.grep(s, function (n) {
                        return 0 != n.height()
                    }), s[0]) {
                    n('a[href="#' + s[0].attr("id") + '"]').removeClass("active");
                    var t = n(this);
                    s = n.grep(s, function (n) {
                        return n.attr("id") != t.attr("id")
                    });
                    s[0] && n('a[href="#' + s[0].attr("id") + '"]').addClass("active")
                }
            }), r
        };
        n.winSizeSpy = function (i) {
            return n.winSizeSpy = function () {
                return t
            }, i = i || {
                throttle: 100
            }, t.on("resize", u(l, i.throttle || 100))
        };
        n.fn.scrollSpy = function (t) {
            return n.scrollSpy(n(this), t)
        }
    }(jQuery),
    function (n) {
        n(document).ready(function () {
            function s(i) {
                var r = i.css("font-family"),
                    u = i.css("font-size"),
                    f = i.css("line-height"),
                    e;
                u && t.css("font-size", u);
                r && t.css("font-family", r);
                f && t.css("line-height", f);
                "off" === i.attr("wrap") && t.css("overflow-wrap", "normal").css("white-space", "pre");
                t.text(i.val() + "\n");
                e = t.html().replace(/\n/g, "<br>");
                t.html(e);
                i.is(":visible") ? t.css("width", i.width()) : t.css("width", n(window).width() / 2);
                i.css("height", t.height())
            }
            var i, h, t, o, r, u, f, e;
            Materialize.updateTextFields = function () {
                n("input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea").each(function (t, i) {
                    n(i).val().length > 0 || i.autofocus || void 0 !== n(this).attr("placeholder") || n(i)[0].validity.badInput === !0 ? n(this).siblings("label").addClass("active") : n(this).siblings("label").removeClass("active")
                })
            };
            i = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";
            n(document).on("change", i, function () {
                (0 !== n(this).val().length || void 0 !== n(this).attr("placeholder")) && n(this).siblings("label").addClass("active");
                validate_field(n(this))
            });
            n(document).ready(function () {
                Materialize.updateTextFields()
            });
            n(document).on("reset", function (t) {
                var r = n(t.target);
                r.is("form") && (r.find(i).removeClass("valid").removeClass("invalid"), r.find(i).each(function () {
                    "" === n(this).attr("value") && n(this).siblings("label").removeClass("active")
                }), r.find("select.initialized").each(function () {
                    var n = r.find("option[selected]").text();
                    r.siblings("input.select-dropdown").val(n)
                }))
            });
            n(document).on("focus", i, function () {
                n(this).siblings("label, .prefix").addClass("active")
            });
            n(document).on("blur", i, function () {
                var t = n(this),
                    i = ".prefix";
                0 === t.val().length && t[0].validity.badInput !== !0 && void 0 === t.attr("placeholder") && (i += ", label");
                t.siblings(i).removeClass("active");
                validate_field(t)
            });
            window.validate_field = function (n) {
                var t = void 0 !== n.attr("length"),
                    i = parseInt(n.attr("length")),
                    r = n.val().length;
                0 === n.val().length && n[0].validity.badInput === !1 ? n.hasClass("validate") && (n.removeClass("valid"), n.removeClass("invalid")) : n.hasClass("validate") && (n.is(":valid") && t && i >= r || n.is(":valid") && !t ? (n.removeClass("invalid"), n.addClass("valid")) : (n.removeClass("valid"), n.addClass("invalid")))
            };
            h = "input[type=radio], input[type=checkbox]";
            n(document).on("keyup.radio", h, function (t) {
                if (9 === t.which) {
                    n(this).addClass("tabbed");
                    var i = n(this);
                    return void i.one("blur", function () {
                        n(this).removeClass("tabbed")
                    })
                }
            });
            t = n(".hiddendiv").first();
            t.length || (t = n('<div class="hiddendiv common"><\/div>'), n("body").append(t));
            o = ".materialize-textarea";
            n(o).each(function () {
                var t = n(this);
                t.val().length && s(t)
            });
            n("body").on("keyup keydown autoresize", o, function () {
                s(n(this))
            });
            n(document).on("change", '.file-field input[type="file"]', function () {
                for (var f = n(this).closest(".file-field"), i = f.find("input.file-path"), r = n(this)[0].files, u = [], t = 0; t < r.length; t++) u.push(r[t].name);
                i.val(u.join(", "));
                i.trigger("change")
            });
            u = "input[type=range]";
            f = !1;
            n(u).each(function () {
                var t = n('<span class="thumb"><span class="value"><\/span><\/span>');
                n(this).after(t)
            });
            e = ".range-field";
            n(document).on("change", u, function () {
                var t = n(this).siblings(".thumb");
                t.find(".value").html(n(this).val())
            });
            n(document).on("input mousedown touchstart", u, function (t) {
                var i = n(this).siblings(".thumb"),
                    u = n(this).outerWidth();
                i.length <= 0 && (i = n('<span class="thumb"><span class="value"><\/span><\/span>'), n(this).after(i));
                i.find(".value").html(n(this).val());
                f = !0;
                n(this).addClass("active");
                i.hasClass("active") || i.velocity({
                    height: "30px",
                    width: "30px",
                    top: "-20px",
                    marginLeft: "-15px"
                }, {
                    duration: 300,
                    easing: "easeOutExpo"
                });
                "input" !== t.type && (r = void 0 === t.pageX || null === t.pageX ? t.originalEvent.touches[0].pageX - n(this).offset().left : t.pageX - n(this).offset().left, 0 > r ? r = 0 : r > u && (r = u), i.addClass("active").css("left", r));
                i.find(".value").html(n(this).val())
            });
            n(document).on("mouseup touchend", e, function () {
                f = !1;
                n(this).removeClass("active")
            });
            n(document).on("mousemove touchmove", e, function (t) {
                var i, r = n(this).children(".thumb"),
                    e;
                f && (r.hasClass("active") || r.velocity({
                    height: "30px",
                    width: "30px",
                    top: "-20px",
                    marginLeft: "-15px"
                }, {
                    duration: 300,
                    easing: "easeOutExpo"
                }), i = void 0 === t.pageX || null === t.pageX ? t.originalEvent.touches[0].pageX - n(this).offset().left : t.pageX - n(this).offset().left, e = n(this).outerWidth(), 0 > i ? i = 0 : i > e && (i = e), r.addClass("active").css("left", i), r.find(".value").html(r.siblings(u).val()))
            });
            n(document).on("mouseout touchleave", e, function () {
                if (!f) {
                    var t = n(this).children(".thumb");
                    t.hasClass("active") && t.velocity({
                        height: "0",
                        width: "0",
                        top: "10px",
                        marginLeft: "-6px"
                    }, {
                        duration: 100
                    });
                    t.removeClass("active")
                }
            });
            n.fn.autocomplete = function (t) {
                return t = n.extend({
                    data: {}
                }, t), this.each(function () {
                    var r = n(this),
                        u = t.data,
                        f = r.closest(".input-field"),
                        i, e;
                    n.isEmptyObject(u) || (i = n('<ul class="autocomplete-content dropdown-content"><\/ul>'), f.length ? f.append(i) : r.after(i), e = function (n, t) {
                        var r = t.find("img"),
                            i = t.text().toLowerCase().indexOf("" + n.toLowerCase()),
                            u = i + n.length - 1,
                            f = t.text().slice(0, i),
                            e = t.text().slice(i, u + 1),
                            o = t.text().slice(u + 1);
                        t.html("<span>" + f + "<span class='highlight'>" + e + "<\/span>" + o + "<\/span>");
                        r.length && t.prepend(r)
                    }, r.on("keyup", function (t) {
                        var o, f, s;
                        if (13 === t.which) return void i.find("li").first().click();
                        if (o = r.val().toLowerCase(), i.empty(), "" !== o)
                            for (f in u) u.hasOwnProperty(f) && -1 !== f.toLowerCase().indexOf(o) && f.toLowerCase() !== o && (s = n("<li><\/li>"), u[f] ? s.append('<img src="' + u[f] + '" class="right circle"><span>' + f + "<\/span>") : s.append("<span>" + f + "<\/span>"), i.append(s), e(o, s))
                    }), i.on("click", "li", function () {
                        r.val(n(this).text().trim());
                        i.empty()
                    }))
                })
            }
        });
        n.fn.material_select = function (t) {
            function i(n, t, i) {
                var f = n.indexOf(t),
                    u = -1 === f;
                return u ? n.push(t) : n.splice(f, 1), i.siblings("ul.dropdown-content").find("li").eq(t).toggleClass("active"), i.find("option").eq(t).prop("selected", u), r(n, i), u
            }

            function r(n, t) {
                for (var u, i = "", r = 0, f = n.length; f > r; r++) u = t.find("option").eq(n[r]).text(), i += 0 === r ? u : ", " + u;
                "" === i && (i = t.find("option:disabled").eq(0).text());
                t.siblings("input.select-dropdown").val(i)
            }
            n(this).each(function () {
                var r = n(this),
                    e, h, s, c, v, b, f;
                if (!r.hasClass("browser-default")) {
                    if (e = r.attr("multiple") ? !0 : !1, h = r.data("select-id"), h && (r.parent().find("span.caret").remove(), r.parent().find("input").remove(), r.unwrap(), n("ul#select-options-" + h).remove()), "destroy" === t) return void r.data("select-id", null).removeClass("initialized");
                    s = Materialize.guid();
                    r.data("select-id", s);
                    c = n('<div class="select-wrapper"><\/div>');
                    c.addClass(r.attr("class"));
                    var u = n('<ul id="select-options-' + s + '" class="dropdown-content select-dropdown ' + (e ? "multiple-select-dropdown" : "") + '"><\/ul>'),
                        p = r.children("option, optgroup"),
                        w = [],
                        l = !1,
                        k = r.find("option:selected").html() || r.find("option:first").html() || "",
                        a = function (t, i, r) {
                            var f = i.is(":disabled") ? "disabled " : "",
                                s = "optgroup-option" === r ? "optgroup-option " : "",
                                o = i.data("icon"),
                                h = i.attr("class"),
                                e;
                            if (o) return e = "", h && (e = ' class="' + h + '"'), "multiple" === r ? u.append(n('<li class="' + f + '"><img src="' + o + '"' + e + '><span><input type="checkbox"' + f + "/><label><\/label>" + i.html() + "<\/span><\/li>")) : u.append(n('<li class="' + f + s + '"><img src="' + o + '"' + e + "><span>" + i.html() + "<\/span><\/li>")), !0;
                            "multiple" === r ? u.append(n('<li class="' + f + '"><span><input type="checkbox"' + f + "/><label><\/label>" + i.html() + "<\/span><\/li>")) : u.append(n('<li class="' + f + s + '"><span>' + i.html() + "<\/span><\/li>"))
                        };
                    p.length && p.each(function () {
                        if (n(this).is("option")) e ? a(r, n(this), "multiple") : a(r, n(this));
                        else if (n(this).is("optgroup")) {
                            var t = n(this).children("option");
                            u.append(n('<li class="optgroup"><span>' + n(this).attr("label") + "<\/span><\/li>"));
                            t.each(function () {
                                a(r, n(this), "optgroup-option")
                            })
                        }
                    });
                    u.find("li:not(.optgroup)").each(function (s) {
                        n(this).click(function (h) {
                            if (!n(this).hasClass("disabled") && !n(this).hasClass("optgroup")) {
                                var c = !0;
                                e ? (n('input[type="checkbox"]', this).prop("checked", function (n, t) {
                                    return !t
                                }), c = i(w, n(this).index(), r), f.trigger("focus")) : (u.find("li").removeClass("active"), n(this).toggleClass("active"), f.val(n(this).text()));
                                o(u, n(this));
                                r.find("option").eq(s).prop("selected", c);
                                r.trigger("change");
                                "undefined" != typeof t && t()
                            }
                            h.stopPropagation()
                        })
                    });
                    r.wrap(c);
                    v = n('<span class="caret">&#9660;<\/span>');
                    r.is(":disabled") && v.addClass("disabled");
                    b = k.replace(/"/g, "&quot;");
                    f = n('<input type="text" class="select-dropdown" readonly="true" ' + (r.is(":disabled") ? "disabled" : "") + ' data-activates="select-options-' + s + '" value="' + b + '"/>');
                    r.before(f);
                    f.before(v);
                    f.after(u);
                    r.is(":disabled") || f.dropdown({
                        hover: !1,
                        closeOnClick: !1
                    });
                    r.attr("tabindex") && n(f[0]).attr("tabindex", r.attr("tabindex"));
                    r.addClass("initialized");
                    f.on({
                        focus: function () {
                            if (n("ul.select-dropdown").not(u[0]).is(":visible") && n("input.select-dropdown").trigger("close"), !u.is(":visible")) {
                                n(this).trigger("open", ["focus"]);
                                var t = n(this).val(),
                                    i = u.find("li").filter(function () {
                                        return n(this).text().toLowerCase() === t.toLowerCase()
                                    })[0];
                                o(u, i)
                            }
                        },
                        click: function (n) {
                            n.stopPropagation()
                        }
                    });
                    f.on("blur", function () {
                        e || n(this).trigger("close");
                        u.find("li.selected").removeClass("selected")
                    });
                    u.hover(function () {
                        l = !0
                    }, function () {
                        l = !1
                    });
                    n(window).on({
                        click: function () {
                            e && (l || f.trigger("close"))
                        }
                    });
                    e && r.find("option:selected:not(:disabled)").each(function () {
                        var t = n(this).index();
                        i(w, t, r);
                        u.find("li").eq(t).find(":checkbox").prop("checked", !0)
                    });
                    var o = function (t, i) {
                            if (i) {
                                t.find("li.selected").removeClass("selected");
                                var r = n(i);
                                r.addClass("selected");
                                u.scrollTo(r)
                            }
                        },
                        y = [],
                        d = function (t) {
                            var r, h, c, i, s;
                            if (9 == t.which) return void f.trigger("close");
                            if (40 == t.which && !u.is(":visible")) return void f.trigger("open");
                            (13 != t.which || u.is(":visible")) && (t.preventDefault(), r = String.fromCharCode(t.which).toLowerCase(), h = [9, 13, 27, 38, 40], r && -1 === h.indexOf(t.which) && (y.push(r), c = y.join(""), i = u.find("li").filter(function () {
                                return 0 === n(this).text().toLowerCase().indexOf(c)
                            })[0], i && o(u, i)), 13 == t.which && (s = u.find("li.selected:not(.disabled)")[0], s && (n(s).trigger("click"), e || f.trigger("close"))), 40 == t.which && (i = u.find("li.selected").length ? u.find("li.selected").next("li:not(.disabled)")[0] : u.find("li:not(.disabled)")[0], o(u, i)), 27 == t.which && f.trigger("close"), 38 == t.which && (i = u.find("li.selected").prev("li:not(.disabled)")[0], i && o(u, i)), setTimeout(function () {
                                y = []
                            }, 1e3))
                        };
                    f.on("keydown", d)
                }
            })
        }
    }(jQuery),
    function (n) {
        var t = {
            init: function (t) {
                return t = n.extend({
                    indicators: !0,
                    height: 400,
                    transition: 500,
                    interval: 6e3
                }, t), this.each(function () {
                    function a(n, t) {
                        n.hasClass("center-align") ? n.velocity({
                            opacity: 0,
                            translateY: -100
                        }, {
                            duration: t,
                            queue: !1
                        }) : n.hasClass("right-align") ? n.velocity({
                            opacity: 0,
                            translateX: 100
                        }, {
                            duration: t,
                            queue: !1
                        }) : n.hasClass("left-align") && n.velocity({
                            opacity: 0,
                            translateX: -100
                        }, {
                            duration: t,
                            queue: !1
                        })
                    }

                    function o(n) {
                        n >= r.length ? n = 0 : 0 > n && (n = r.length - 1);
                        i = f.find(".active").index();
                        i != n && (e = r.eq(i), $caption = e.find(".caption"), e.removeClass("active"), e.velocity({
                            opacity: 0
                        }, {
                            duration: t.transition,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function () {
                                r.not(".active").velocity({
                                    opacity: 0,
                                    translateX: 0,
                                    translateY: 0
                                }, {
                                    duration: 0,
                                    queue: !1
                                })
                            }
                        }), a($caption, t.transition), t.indicators && h.eq(i).removeClass("active"), r.eq(n).velocity({
                            opacity: 1
                        }, {
                            duration: t.transition,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), r.eq(n).find(".caption").velocity({
                            opacity: 1,
                            translateX: 0,
                            translateY: 0
                        }, {
                            duration: t.transition,
                            delay: t.transition,
                            queue: !1,
                            easing: "easeOutQuad"
                        }), r.eq(n).addClass("active"), t.indicators && h.eq(n).addClass("active"))
                    }
                    var e, h, s, u = n(this),
                        f = u.find("ul.slides").first(),
                        r = f.find("> li"),
                        i = f.find(".active").index(); - 1 != i && (e = r.eq(i));
                    u.hasClass("fullscreen") || (t.indicators ? u.height(t.height + 40) : u.height(t.height), f.height(t.height));
                    r.find(".caption").each(function () {
                        a(n(this), 0)
                    });
                    r.find("img").each(function () {
                        var t = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                        n(this).attr("src") !== t && (n(this).css("background-image", "url(" + n(this).attr("src") + ")"), n(this).attr("src", t))
                    });
                    t.indicators && (h = n('<ul class="indicators"><\/ul>'), r.each(function () {
                        var u = n('<li class="indicator-item"><\/li>');
                        u.click(function () {
                            var u = f.parent(),
                                e = u.find(n(this)).index();
                            o(e);
                            clearInterval(s);
                            s = setInterval(function () {
                                i = f.find(".active").index();
                                r.length == i + 1 ? i = 0 : i += 1;
                                o(i)
                            }, t.transition + t.interval)
                        });
                        h.append(u)
                    }), u.append(h), h = u.find("ul.indicators").find("li.indicator-item"));
                    e ? e.show() : (r.first().addClass("active").velocity({
                        opacity: 1
                    }, {
                        duration: t.transition,
                        queue: !1,
                        easing: "easeOutQuad"
                    }), i = 0, e = r.eq(i), t.indicators && h.eq(i).addClass("active"));
                    e.find("img").each(function () {
                        e.find(".caption").velocity({
                            opacity: 1,
                            translateX: 0,
                            translateY: 0
                        }, {
                            duration: t.transition,
                            queue: !1,
                            easing: "easeOutQuad"
                        })
                    });
                    s = setInterval(function () {
                        i = f.find(".active").index();
                        o(i + 1)
                    }, t.transition + t.interval);
                    var v = !1,
                        c = !1,
                        l = !1;
                    u.hammer({
                        prevent_default: !1
                    }).bind("pan", function (n) {
                        var t;
                        if ("touch" === n.gesture.pointerType) {
                            clearInterval(s);
                            var e = n.gesture.direction,
                                i = n.gesture.deltaX,
                                o = n.gesture.velocityX;
                            $curr_slide = f.find(".active");
                            $curr_slide.velocity({
                                translateX: i
                            }, {
                                duration: 50,
                                queue: !1,
                                easing: "easeOutQuad"
                            });
                            4 === e && (i > u.innerWidth() / 2 || -.65 > o) ? l = !0 : 2 === e && (i < u.innerWidth() / -2 || o > .65) && (c = !0);
                            c && (t = $curr_slide.next(), 0 === t.length && (t = r.first()), t.velocity({
                                opacity: 1
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }));
                            l && (t = $curr_slide.prev(), 0 === t.length && (t = r.last()), t.velocity({
                                opacity: 1
                            }, {
                                duration: 300,
                                queue: !1,
                                easing: "easeOutQuad"
                            }))
                        }
                    }).bind("panend", function (n) {
                        "touch" === n.gesture.pointerType && ($curr_slide = f.find(".active"), v = !1, curr_index = f.find(".active").index(), !l && !c || r.length <= 1 ? $curr_slide.velocity({
                            translateX: 0
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad"
                        }) : c ? (o(curr_index + 1), $curr_slide.velocity({
                            translateX: -1 * u.innerWidth()
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function () {
                                $curr_slide.velocity({
                                    opacity: 0,
                                    translateX: 0
                                }, {
                                    duration: 0,
                                    queue: !1
                                })
                            }
                        })) : l && (o(curr_index - 1), $curr_slide.velocity({
                            translateX: u.innerWidth()
                        }, {
                            duration: 300,
                            queue: !1,
                            easing: "easeOutQuad",
                            complete: function () {
                                $curr_slide.velocity({
                                    opacity: 0,
                                    translateX: 0
                                }, {
                                    duration: 0,
                                    queue: !1
                                })
                            }
                        })), c = !1, l = !1, clearInterval(s), s = setInterval(function () {
                            i = f.find(".active").index();
                            r.length == i + 1 ? i = 0 : i += 1;
                            o(i)
                        }, t.transition + t.interval))
                    });
                    u.on("sliderPause", function () {
                        clearInterval(s)
                    });
                    u.on("sliderStart", function () {
                        clearInterval(s);
                        s = setInterval(function () {
                            i = f.find(".active").index();
                            r.length == i + 1 ? i = 0 : i += 1;
                            o(i)
                        }, t.transition + t.interval)
                    });
                    u.on("sliderNext", function () {
                        i = f.find(".active").index();
                        o(i + 1)
                    });
                    u.on("sliderPrev", function () {
                        i = f.find(".active").index();
                        o(i - 1)
                    })
                })
            },
            pause: function () {
                n(this).trigger("sliderPause")
            },
            start: function () {
                n(this).trigger("sliderStart")
            },
            next: function () {
                n(this).trigger("sliderNext")
            },
            prev: function () {
                n(this).trigger("sliderPrev")
            }
        };
        n.fn.slider = function (i) {
            return t[i] ? t[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void n.error("Method " + i + " does not exist on jQuery.tooltip") : t.init.apply(this, arguments)
        }
    }(jQuery),
    function (n) {
        n(document).ready(function () {
            n(document).on("click.card", ".card", function (t) {
                n(this).find("> .card-reveal").length && (n(t.target).is(n(".card-reveal .card-title")) || n(t.target).is(n(".card-reveal .card-title i")) ? n(this).find(".card-reveal").velocity({
                    translateY: 0
                }, {
                    duration: 225,
                    queue: !1,
                    easing: "easeInOutQuad",
                    complete: function () {
                        n(this).css({
                            display: "none"
                        })
                    }
                }) : (n(t.target).is(n(".card .activator")) || n(t.target).is(n(".card .activator i"))) && (n(t.target).closest(".card").css("overflow", "hidden"), n(this).find(".card-reveal").css({
                    display: "block"
                }).velocity("stop", !1).velocity({
                    translateY: "-100%"
                }, {
                    duration: 300,
                    queue: !1,
                    easing: "easeInOutQuad"
                })))
            })
        })
    }(jQuery),
    function (n) {
        var t = !1,
            i = {
                data: [],
                placeholder: "",
                secondaryPlaceholder: ""
            };
        n(document).ready(function () {
            n(document).on("click", ".chip .close", function () {
                var t = n(this).closest(".chips");
                t.data("initialized") || n(this).closest(".chip").remove()
            })
        });
        n.fn.material_chip = function (r) {
            var u = this;
            return this.$el = n(this), this.$document = n(document), this.SELS = {
                CHIPS: ".chips",
                CHIP: ".chip",
                INPUT: "input",
                DELETE: ".material-icons",
                SELECTED_CHIP: ".selected"
            }, "data" === r ? this.$el.data("chips") : "options" === r ? this.$el.data("options") : (this.$el.data("options", n.extend({}, i, r)), this.init = function () {
                var t = 0;
                u.$el.each(function () {
                    var i = n(this),
                        r;
                    i.data("initialized") || (r = i.data("options"), (!r.data || !r.data instanceof Array) && (r.data = []), i.data("chips", r.data), i.data("index", t), i.data("initialized", !0), i.hasClass(u.SELS.CHIPS) || i.addClass("chips"), u.chips(i), t++)
                })
            }, this.handleEvents = function () {
                var t = u.SELS;
                u.$document.on("click", t.CHIPS, function (i) {
                    n(i.target).find(t.INPUT).focus()
                });
                u.$document.on("click", t.CHIP, function () {
                    n(t.CHIP).removeClass("selected");
                    n(this).toggleClass("selected")
                });
                u.$document.on("keydown", function (i) {
                    var h, e;
                    if (!n(i.target).is("input, textarea")) {
                        var r, o = u.$document.find(t.CHIP + t.SELECTED_CHIP),
                            f = o.closest(t.CHIPS),
                            s = o.siblings(t.CHIP).length;
                        if (o.length)
                            if (8 === i.which || 46 === i.which) i.preventDefault(), h = f.data("index"), r = o.index(), u.deleteChip(h, r, f), e = null, s > r + 1 ? e = r : (r === s || r + 1 === s) && (e = s - 1), 0 > e && (e = null), null !== e && u.selectChip(h, e, f), s || f.find("input").focus();
                            else if (37 === i.which) {
                            if (r = o.index() - 1, 0 > r) return;
                            n(t.CHIP).removeClass("selected");
                            u.selectChip(f.data("index"), r, f)
                        } else if (39 === i.which) {
                            if (r = o.index() + 1, n(t.CHIP).removeClass("selected"), r > s) return void f.find("input").focus();
                            u.selectChip(f.data("index"), r, f)
                        }
                    }
                });
                u.$document.on("focusin", t.CHIPS + " " + t.INPUT, function (i) {
                    n(i.target).closest(t.CHIPS).addClass("focus");
                    n(t.CHIP).removeClass("selected")
                });
                u.$document.on("focusout", t.CHIPS + " " + t.INPUT, function (i) {
                    n(i.target).closest(t.CHIPS).removeClass("focus")
                });
                u.$document.on("keydown", t.CHIPS + " " + t.INPUT, function (i) {
                    var r = n(i.target),
                        f = r.closest(t.CHIPS),
                        e = f.data("index"),
                        o = f.children(t.CHIP).length;
                    return 13 === i.which ? (i.preventDefault(), u.addChip(e, {
                        tag: r.val()
                    }, f), void r.val("")) : 8 !== i.keyCode && 37 !== i.keyCode || "" !== r.val() || !o ? void 0 : (u.selectChip(e, o - 1, f), void r.blur())
                });
                u.$document.on("click", t.CHIPS + " " + t.DELETE, function (i) {
                    var f = n(i.target),
                        r = f.closest(t.CHIPS),
                        e = f.closest(t.CHIP);
                    i.stopPropagation();
                    u.deleteChip(r.data("index"), e.index(), r);
                    r.find("input").focus()
                })
            }, this.chips = function (n) {
                var t = "";
                n.data("options");
                n.data("chips").forEach(function (n) {
                    t += u.renderChip(n)
                });
                t += '<input class="input" placeholder="">';
                n.html(t);
                u.setPlaceholder(n)
            }, this.renderChip = function (n) {
                if (n.tag) {
                    var t = '<div class="chip">' + n.tag;
                    return n.image && (t += ' <img src="' + n.image + '"> '), t += '<i class="material-icons close">close<\/i>', t + "<\/div>"
                }
            }, this.setPlaceholder = function (n) {
                var t = n.data("options");
                n.data("chips").length && t.placeholder ? n.find("input").prop("placeholder", t.placeholder) : !n.data("chips").length && t.secondaryPlaceholder && n.find("input").prop("placeholder", t.secondaryPlaceholder)
            }, this.isValid = function (n, t) {
                for (var r = n.data("chips"), u = !1, i = 0; i < r.length; i++)
                    if (r[i].tag === t.tag) return void(u = !0);
                return "" !== t.tag && !u
            }, this.addChip = function (t, i, r) {
                if (u.isValid(r, i)) {
                    var f = (r.data("options"), u.renderChip(i));
                    r.data("chips").push(i);
                    n(f).insertBefore(r.find("input"));
                    r.trigger("chip.add", i);
                    u.setPlaceholder(r)
                }
            }, this.deleteChip = function (n, t, i) {
                var r = i.data("chips")[t];
                i.find(".chip").eq(t).remove();
                i.data("chips").splice(t, 1);
                i.trigger("chip.delete", r);
                u.setPlaceholder(i)
            }, this.selectChip = function (n, t, i) {
                var r = i.find(".chip").eq(t);
                r && !1 === r.hasClass("selected") && (r.addClass("selected"), i.trigger("chip.select", i.data("chips")[t]))
            }, this.getChipsElement = function (n, t) {
                return t.eq(n)
            }, this.init(), void(t || (this.handleEvents(), t = !0)))
        }
    }(jQuery),
    function (n) {
        n.fn.pushpin = function (t) {
            return "remove" === t ? (this.each(function () {
                (id = n(this).data("pushpin-id")) && (n(window).off("scroll." + id), n(this).removeData("pushpin-id").removeClass("pin-top pinned pin-bottom").removeAttr("style"))
            }), !1) : (t = n.extend({
                top: 0,
                bottom: 1 / 0,
                offset: 0
            }, t), $index = 0, this.each(function () {
                function i(n) {
                    n.removeClass("pin-top");
                    n.removeClass("pinned");
                    n.removeClass("pin-bottom")
                }

                function r(r, u) {
                    r.each(function () {
                        t.top <= u && t.bottom >= u && !n(this).hasClass("pinned") && (i(n(this)), n(this).css("top", t.offset), n(this).addClass("pinned"));
                        u < t.top && !n(this).hasClass("pin-top") && (i(n(this)), n(this).css("top", 0), n(this).addClass("pin-top"));
                        u > t.bottom && !n(this).hasClass("pin-bottom") && (i(n(this)), n(this).addClass("pin-bottom"), n(this).css("top", t.bottom - e))
                    })
                }
                var u = Materialize.guid(),
                    f = n(this),
                    e = n(this).offset().top;
                n(this).data("pushpin-id", u);
                r(f, n(window).scrollTop());
                n(window).on("scroll." + u, function () {
                    var i = n(window).scrollTop() + t.offset;
                    r(f, i)
                })
            }))
        }
    }(jQuery),
    function (n) {
        n(document).ready(function () {
            n.fn.reverse = [].reverse;
            n(document).on("mouseenter.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function () {
                var i = n(this);
                t(i)
            });
            n(document).on("mouseleave.fixedActionBtn", ".fixed-action-btn:not(.click-to-toggle)", function () {
                var t = n(this);
                i(t)
            });
            n(document).on("click.fixedActionBtn", ".fixed-action-btn.click-to-toggle > a", function () {
                var u = n(this),
                    r = u.parent();
                r.hasClass("active") ? i(r) : t(r)
            })
        });
        n.fn.extend({
            openFAB: function () {
                t(n(this))
            },
            closeFAB: function () {
                i(n(this))
            }
        });
        var t = function (t) {
                var r, u, f, i;
                ($this = t, $this.hasClass("active") === !1) && (f = $this.hasClass("horizontal"), f === !0 ? u = 40 : r = 40, $this.addClass("active"), $this.find("ul .btn-floating").velocity({
                    scaleY: ".4",
                    scaleX: ".4",
                    translateY: r + "px",
                    translateX: u + "px"
                }, {
                    duration: 0
                }), i = 0, $this.find("ul .btn-floating").reverse().each(function () {
                    n(this).velocity({
                        opacity: "1",
                        scaleX: "1",
                        scaleY: "1",
                        translateY: "0",
                        translateX: "0"
                    }, {
                        duration: 80,
                        delay: i
                    });
                    i += 40
                }))
            },
            i = function (n) {
                $this = n;
                var t, i, r = $this.hasClass("horizontal");
                r === !0 ? i = 40 : t = 40;
                $this.removeClass("active");
                $this.find("ul .btn-floating").velocity("stop", !0);
                $this.find("ul .btn-floating").velocity({
                    opacity: "0",
                    scaleX: ".4",
                    scaleY: ".4",
                    translateY: t + "px",
                    translateX: i + "px"
                }, {
                    duration: 80
                })
            }
    }(jQuery),
    function (n) {
        Materialize.fadeInImage = function (t) {
            var i;
            if ("string" == typeof t) i = n(t);
            else {
                if ("object" != typeof t) return;
                i = t
            }
            i.css({
                opacity: 0
            });
            n(i).velocity({
                opacity: 1
            }, {
                duration: 650,
                queue: !1,
                easing: "easeOutSine"
            });
            n(i).velocity({
                opacity: 1
            }, {
                duration: 1300,
                queue: !1,
                easing: "swing",
                step: function (t, i) {
                    i.start = 100;
                    var u = t / 100,
                        r = 150 - (100 - t) / 1.75;
                    100 > r && (r = 100);
                    t >= 0 && n(this).css({
                        "-webkit-filter": "grayscale(" + u + ")brightness(" + r + "%)",
                        filter: "grayscale(" + u + ")brightness(" + r + "%)"
                    })
                }
            })
        };
        Materialize.showStaggeredList = function (t) {
            var i, r;
            if ("string" == typeof t) i = n(t);
            else {
                if ("object" != typeof t) return;
                i = t
            }
            r = 0;
            i.find("li").velocity({
                translateX: "-100px"
            }, {
                duration: 0
            });
            i.find("li").each(function () {
                n(this).velocity({
                    opacity: "1",
                    translateX: "0"
                }, {
                    duration: 800,
                    delay: r,
                    easing: [60, 10]
                });
                r += 120
            })
        };
        n(document).ready(function () {
            var t = !1,
                i = !1;
            n(".dismissable").each(function () {
                n(this).hammer({
                    prevent_default: !1
                }).bind("pan", function (r) {
                    if ("touch" === r.gesture.pointerType) {
                        var u = n(this),
                            e = r.gesture.direction,
                            f = r.gesture.deltaX,
                            o = r.gesture.velocityX;
                        u.velocity({
                            translateX: f
                        }, {
                            duration: 50,
                            queue: !1,
                            easing: "easeOutQuad"
                        });
                        4 === e && (f > u.innerWidth() / 2 || -.75 > o) && (t = !0);
                        2 === e && (f < u.innerWidth() / -2 || o > .75) && (i = !0)
                    }
                }).bind("panend", function (r) {
                    var u, f;
                    (Math.abs(r.gesture.deltaX) < n(this).innerWidth() / 2 && (i = !1, t = !1), "touch" === r.gesture.pointerType) && (u = n(this), t || i ? (f = t ? u.innerWidth() : -1 * u.innerWidth(), u.velocity({
                        translateX: f
                    }, {
                        duration: 100,
                        queue: !1,
                        easing: "easeOutQuad",
                        complete: function () {
                            u.css("border", "none");
                            u.velocity({
                                height: 0,
                                padding: 0
                            }, {
                                duration: 200,
                                queue: !1,
                                easing: "easeOutQuad",
                                complete: function () {
                                    u.remove()
                                }
                            })
                        }
                    })) : u.velocity({
                        translateX: 0
                    }, {
                        duration: 100,
                        queue: !1,
                        easing: "easeOutQuad"
                    }), t = !1, i = !1)
                })
            })
        })
    }(jQuery),
    function () {
        Materialize.scrollFire = function (n) {
            var t = !1;
            window.addEventListener("scroll", function () {
                t = !0
            });
            setInterval(function () {
                var e, r, o, s;
                if (t)
                    for (t = !1, e = window.pageYOffset + window.innerHeight, r = 0; r < n.length; r++) {
                        var i = n[r],
                            h = i.selector,
                            c = i.offset,
                            u = i.callback,
                            f = document.querySelector(h);
                        null !== f && (o = f.getBoundingClientRect().top + window.pageYOffset, e > o + c && i.done !== !0 && ("function" == typeof u ? u.call(this, f) : "string" == typeof u && (s = new Function(u), s(f)), i.done = !0))
                    }
            }, 100)
        }
    }(jQuery),
    function (n) {
        "function" == typeof define && define.amd ? define("picker", ["jquery"], n) : "object" == typeof exports ? module.exports = n(require("jquery")) : this.Picker = n(jQuery)
    }(function (n) {
        function t(f, h, c, l) {
            function d() {
                return t._.node("div", t._.node("div", t._.node("div", t._.node("div", a.component.nodes(v.open), p.box), p.wrap), p.frame), p.holder)
            }

            function tt() {
                w.data(h, a).addClass(p.input).attr("tabindex", -1).val(w.data("value") ? a.get("select", y.format) : f.value);
                y.editable || w.on("focus." + v.id + " click." + v.id, function (n) {
                    n.preventDefault();
                    a.$root.eq(0).focus()
                }).on("keydown." + v.id, g);
                i(f, {
                    haspopup: !0,
                    expanded: !1,
                    readonly: !1,
                    owns: f.id + "_root"
                })
            }

            function it() {
                a.$root.on({
                    keydown: g,
                    focusin: function (n) {
                        a.$root.removeClass(p.focused);
                        n.stopPropagation()
                    },
                    "mousedown click": function (t) {
                        var i = t.target;
                        i != a.$root.children()[0] && (t.stopPropagation(), "mousedown" != t.type || n(i).is("input, select, textarea, button, option") || (t.preventDefault(), a.$root.eq(0).focus()))
                    }
                }).on({
                    focus: function () {
                        w.addClass(p.target)
                    },
                    blur: function () {
                        w.removeClass(p.target)
                    }
                }).on("focus.toOpen", nt).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function () {
                    var r = n(this),
                        t = r.data(),
                        u = r.hasClass(p.navDisabled) || r.hasClass(p.disabled),
                        i = e();
                    i = i && (i.type || i.href);
                    (u || i && !n.contains(a.$root[0], i)) && a.$root.eq(0).focus();
                    !u && t.nav ? a.set("highlight", a.component.item.highlight, {
                        nav: t.nav
                    }) : !u && "pick" in t ? a.set("select", t.pick) : t.clear ? a.clear().close(!0) : t.close && a.close(!0)
                });
                i(a.$root[0], "hidden", !0)
            }

            function rt() {
                var t;
                y.hiddenName === !0 ? (t = f.name, f.name = "") : (t = ["string" == typeof y.hiddenPrefix ? y.hiddenPrefix : "", "string" == typeof y.hiddenSuffix ? y.hiddenSuffix : "_submit"], t = t[0] + f.name + t[1]);
                a._hidden = n('<input type=hidden name="' + t + '"' + (w.data("value") || f.value ? ' value="' + a.get("select", y.formatSubmit) + '"' : "") + ">")[0];
                w.on("change." + v.id, function () {
                    a._hidden.value = f.value ? a.get("select", y.formatSubmit) : ""
                });
                y.container ? n(y.container).append(a._hidden) : w.after(a._hidden)
            }

            function g(n) {
                var t = n.keyCode,
                    i = /^(8|46)$/.test(t);
                return 27 == t ? (a.close(), !1) : void((32 == t || i || !v.open && a.component.key[t]) && (n.preventDefault(), n.stopPropagation(), i ? a.clear().close() : a.open()))
            }

            function nt(n) {
                n.stopPropagation();
                "focus" == n.type && a.$root.addClass(p.focused);
                a.open()
            }
            if (!f) return t;
            var b = !1,
                v = {
                    id: f.id || "P" + Math.abs(~~(Math.random() * new Date))
                },
                y = c ? n.extend(!0, {}, c.defaults, l) : l || {},
                p = n.extend({}, t.klasses(), y.klass),
                w = n(f),
                k = function () {
                    return this.start()
                },
                a = k.prototype = {
                    constructor: k,
                    $node: w,
                    start: function () {
                        return v && v.start ? a : (v.methods = {}, v.start = !0, v.open = !1, v.type = f.type, f.autofocus = f == e(), f.readOnly = !y.editable, f.id = f.id || v.id, "text" != f.type && (f.type = "text"), a.component = new c(a, y), a.$root = n(t._.node("div", d(), p.picker, 'id="' + f.id + '_root" tabindex="0"')), it(), y.formatSubmit && rt(), tt(), y.container ? n(y.container).append(a.$root) : w.after(a.$root), a.on({
                            start: a.component.onStart,
                            render: a.component.onRender,
                            stop: a.component.onStop,
                            open: a.component.onOpen,
                            close: a.component.onClose,
                            set: a.component.onSet
                        }).on({
                            start: y.onStart,
                            render: y.onRender,
                            stop: y.onStop,
                            open: y.onOpen,
                            close: y.onClose,
                            set: y.onSet
                        }), b = s(a.$root.children()[0]), f.autofocus && a.open(), a.trigger("start").trigger("render"))
                    },
                    render: function (n) {
                        return n ? a.$root.html(d()) : a.$root.find("." + p.box).html(a.component.nodes(v.open)), a.trigger("render")
                    },
                    stop: function () {
                        return v.start ? (a.close(), a._hidden && a._hidden.parentNode.removeChild(a._hidden), a.$root.remove(), w.removeClass(p.input).removeData(h), setTimeout(function () {
                            w.off("." + v.id)
                        }, 0), f.type = v.type, f.readOnly = !1, a.trigger("stop"), v.methods = {}, v.start = !1, a) : a
                    },
                    open: function (e) {
                        return v.open ? a : (w.addClass(p.active), i(f, "expanded", !0), setTimeout(function () {
                            a.$root.addClass(p.opened);
                            i(a.$root[0], "hidden", !1)
                        }, 0), e !== !1 && (v.open = !0, b && r.css("overflow", "hidden").css("padding-right", "+=" + u()), a.$root.eq(0).focus(), o.on("click." + v.id + " focusin." + v.id, function (n) {
                            var t = n.target;
                            t != f && t != document && 3 != n.which && a.close(t === a.$root.children()[0])
                        }).on("keydown." + v.id, function (i) {
                            var r = i.keyCode,
                                u = a.component.key[r],
                                f = i.target;
                            27 == r ? a.close(!0) : f != a.$root[0] || !u && 13 != r ? n.contains(a.$root[0], f) && 13 == r && (i.preventDefault(), f.click()) : (i.preventDefault(), u ? t._.trigger(a.component.key.go, a, [t._.trigger(u)]) : a.$root.find("." + p.highlighted).hasClass(p.disabled) || a.set("select", a.component.item.highlight).close())
                        })), a.trigger("open"))
                    },
                    close: function (n) {
                        return n && (a.$root.off("focus.toOpen").eq(0).focus(), setTimeout(function () {
                            a.$root.on("focus.toOpen", nt)
                        }, 0)), w.removeClass(p.active), i(f, "expanded", !1), setTimeout(function () {
                            a.$root.removeClass(p.opened + " " + p.focused);
                            i(a.$root[0], "hidden", !0)
                        }, 0), v.open ? (v.open = !1, b && r.css("overflow", "").css("padding-right", "-=" + u()), o.off("." + v.id), a.trigger("close")) : a
                    },
                    clear: function (n) {
                        return a.set("clear", null, n)
                    },
                    set: function (t, i, r) {
                        var u, f, o = n.isPlainObject(t),
                            e = o ? t : {};
                        if (r = o && n.isPlainObject(i) ? i : r || {}, t) {
                            o || (e[t] = i);
                            for (u in e) f = e[u], u in a.component.item && (void 0 === f && (f = null), a.component.set(u, f, r)), ("select" == u || "clear" == u) && w.val("clear" == u ? "" : a.get(u, y.format)).trigger("change");
                            a.render()
                        }
                        return r.muted ? a : a.trigger("set", e)
                    },
                    get: function (n, i) {
                        if (n = n || "value", null != v[n]) return v[n];
                        if ("valueSubmit" == n) {
                            if (a._hidden) return a._hidden.value;
                            n = "value"
                        }
                        if ("value" == n) return f.value;
                        if (n in a.component.item) {
                            if ("string" == typeof i) {
                                var r = a.component.get(n);
                                return r ? t._.trigger(a.component.formats.toString, a.component, [i, r]) : ""
                            }
                            return a.component.get(n)
                        }
                    },
                    on: function (t, i, r) {
                        var u, e, o = n.isPlainObject(t),
                            f = o ? t : {};
                        if (t) {
                            o || (f[t] = i);
                            for (u in f) e = f[u], r && (u = "_" + u), v.methods[u] = v.methods[u] || [], v.methods[u].push(e)
                        }
                        return a
                    },
                    off: function () {
                        var n, t, i = arguments;
                        for (n = 0, namesCount = i.length; n < namesCount; n += 1) t = i[n], t in v.methods && delete v.methods[t];
                        return a
                    },
                    trigger: function (n, i) {
                        var r = function (n) {
                            var r = v.methods[n];
                            r && r.map(function (n) {
                                t._.trigger(n, a, [i])
                            })
                        };
                        return r("_" + n), r(n), a
                    }
                };
            return new k
        }

        function s(n) {
            var t, i = "position";
            return n.currentStyle ? t = n.currentStyle[i] : window.getComputedStyle && (t = getComputedStyle(n)[i]), "fixed" == t
        }

        function u() {
            var t, i, u, f;
            return r.height() <= c.height() ? 0 : (t = n('<div style="visibility:hidden;width:100px" />').appendTo("body"), i = t[0].offsetWidth, t.css("overflow", "scroll"), u = n('<div style="width:100%" />').appendTo(t), f = u[0].offsetWidth, t.remove(), i - f)
        }

        function i(t, i, r) {
            if (n.isPlainObject(i))
                for (var u in i) f(t, u, i[u]);
            else f(t, i, r)
        }

        function f(n, t, i) {
            n.setAttribute(("role" == t ? "" : "aria-") + t, i)
        }

        function h(t, i) {
            var r, u, f;
            n.isPlainObject(t) || (t = {
                attribute: i
            });
            i = "";
            for (r in t) u = ("role" == r ? "" : "aria-") + r, f = t[r], i += null == f ? "" : u + '="' + t[r] + '"';
            return i
        }

        function e() {
            try {
                return document.activeElement
            } catch (n) {}
        }
        var c = n(window),
            o = n(document),
            r = n(document.documentElement);
        return t.klasses = function (n) {
            return n = n || "picker", {
                picker: n,
                opened: n + "--opened",
                focused: n + "--focused",
                input: n + "__input",
                active: n + "__input--active",
                target: n + "__input--target",
                holder: n + "__holder",
                frame: n + "__frame",
                wrap: n + "__wrap",
                box: n + "__box"
            }
        }, t._ = {
            group: function (n) {
                for (var i, u = "", r = t._.trigger(n.min, n); r <= t._.trigger(n.max, n, [r]); r += n.i) i = t._.trigger(n.item, n, [r]), u += t._.node(n.node, i[0], i[1], i[2]);
                return u
            },
            node: function (t, i, r, u) {
                return i ? (i = n.isArray(i) ? i.join("") : i, r = r ? ' class="' + r + '"' : "", u = u ? " " + u : "", "<" + t + r + u + ">" + i + "<\/" + t + ">") : ""
            },
            lead: function (n) {
                return (10 > n ? "0" : "") + n
            },
            trigger: function (n, t, i) {
                return "function" == typeof n ? n.apply(t, i || []) : n
            },
            digits: function (n) {
                return /\d/.test(n[1]) ? 2 : 1
            },
            isDate: function (n) {
                return {}.toString.call(n).indexOf("Date") > -1 && this.isInteger(n.getDate())
            },
            isInteger: function (n) {
                return {}.toString.call(n).indexOf("Number") > -1 && n % 1 == 0
            },
            ariaAttr: h
        }, t.extend = function (i, r) {
            n.fn[i] = function (u, f) {
                var e = this.data(i);
                return "picker" == u ? e : e && "string" == typeof u ? t._.trigger(e[u], e, [f]) : this.each(function () {
                    var f = n(this);
                    f.data(i) || new t(this, i, r, u)
                })
            };
            n.fn[i].defaults = r.defaults
        }, t
    }),
    function (n) {
        "function" == typeof define && define.amd ? define(["picker", "jquery"], n) : "object" == typeof exports ? module.exports = n(require("./picker.js"), require("jquery")) : n(Picker, jQuery)
    }(function (n, t) {
        function r(n, t) {
            var i = this,
                r = n.$node[0],
                o = r.value,
                u = n.$node.data("value"),
                f = u || o,
                s = u ? t.formatSubmit : t.format,
                e = function () {
                    return r.currentStyle ? "rtl" == r.currentStyle.direction : "rtl" == getComputedStyle(n.$root[0]).direction
                };
            i.settings = t;
            i.$node = n.$node;
            i.queue = {
                min: "measure create",
                max: "measure create",
                now: "now create",
                select: "parse create validate",
                highlight: "parse navigate create validate",
                view: "parse create validate viewset",
                disable: "deactivate",
                enable: "activate"
            };
            i.item = {};
            i.item.clear = null;
            i.item.disable = (t.disable || []).slice(0);
            i.item.enable = - function (n) {
                return n[0] === !0 ? n.shift() : -1
            }(i.item.disable);
            i.set("min", t.min).set("max", t.max).set("now");
            f ? i.set("select", f, {
                format: s
            }) : i.set("select", null).set("highlight", i.item.now);
            i.key = {
                40: 7,
                38: -7,
                39: function () {
                    return e() ? -1 : 1
                },
                37: function () {
                    return e() ? 1 : -1
                },
                go: function (n) {
                    var t = i.item.highlight,
                        r = new Date(t.year, t.month, t.date + n);
                    i.set("highlight", r, {
                        interval: n
                    });
                    this.render()
                }
            };
            n.on("render", function () {
                n.$root.find("." + t.klass.selectMonth).on("change", function () {
                    var i = this.value;
                    i && (n.set("highlight", [n.get("view").year, i, n.get("highlight").date]), n.$root.find("." + t.klass.selectMonth).trigger("focus"))
                });
                n.$root.find("." + t.klass.selectYear).on("change", function () {
                    var i = this.value;
                    i && (n.set("highlight", [i, n.get("view").month, n.get("highlight").date]), n.$root.find("." + t.klass.selectYear).trigger("focus"))
                })
            }, 1).on("open", function () {
                var r = "";
                i.disabled(i.get("now")) && (r = ":not(." + t.klass.buttonToday + ")");
                n.$root.find("button" + r + ", select").attr("disabled", !1)
            }, 1).on("close", function () {
                n.$root.find("button, select").attr("disabled", !0)
            }, 1)
        }
        var u = 7,
            f = 6,
            i = n._;
        r.prototype.set = function (n, t, i) {
            var r = this,
                u = r.item;
            return null === t ? ("clear" == n && (n = "select"), u[n] = t, r) : (u["enable" == n ? "disable" : "flip" == n ? "enable" : n] = r.queue[n].split(" ").map(function (u) {
                return t = r[u](n, t, i)
            }).pop(), "select" == n ? r.set("highlight", u.select, i) : "highlight" == n ? r.set("view", u.highlight, i) : n.match(/^(flip|min|max|disable|enable)$/) && (u.select && r.disabled(u.select) && r.set("select", u.select, i), u.highlight && r.disabled(u.highlight) && r.set("highlight", u.highlight, i)), r)
        };
        r.prototype.get = function (n) {
            return this.item[n]
        };
        r.prototype.create = function (n, r, u) {
            var f, e = this;
            return r = void 0 === r ? n : r, r == -(1 / 0) || r == 1 / 0 ? f = r : t.isPlainObject(r) && i.isInteger(r.pick) ? r = r.obj : t.isArray(r) ? (r = new Date(r[0], r[1], r[2]), r = i.isDate(r) ? r : e.create().obj) : r = i.isInteger(r) || i.isDate(r) ? e.normalize(new Date(r), u) : e.now(n, r, u), {
                year: f || r.getFullYear(),
                month: f || r.getMonth(),
                date: f || r.getDate(),
                day: f || r.getDay(),
                obj: f || r,
                pick: f || r.getTime()
            }
        };
        r.prototype.createRange = function (n, r) {
            var f = this,
                u = function (n) {
                    return n === !0 || t.isArray(n) || i.isDate(n) ? f.create(n) : n
                };
            return i.isInteger(n) || (n = u(n)), i.isInteger(r) || (r = u(r)), i.isInteger(n) && t.isPlainObject(r) ? n = [r.year, r.month, r.date + n] : i.isInteger(r) && t.isPlainObject(n) && (r = [n.year, n.month, n.date + r]), {
                from: u(n),
                to: u(r)
            }
        };
        r.prototype.withinRange = function (n, t) {
            return n = this.createRange(n.from, n.to), t.pick >= n.from.pick && t.pick <= n.to.pick
        };
        r.prototype.overlapRanges = function (n, t) {
            var i = this;
            return n = i.createRange(n.from, n.to), t = i.createRange(t.from, t.to), i.withinRange(n, t.from) || i.withinRange(n, t.to) || i.withinRange(t, n.from) || i.withinRange(t, n.to)
        };
        r.prototype.now = function (n, t, i) {
            return t = new Date, i && i.rel && t.setDate(t.getDate() + i.rel), this.normalize(t, i)
        };
        r.prototype.navigate = function (n, i, r) {
            var s, f, u, e, c = t.isArray(i),
                h = t.isPlainObject(i),
                o = this.item.view;
            if (c || h) {
                for (h ? (f = i.year, u = i.month, e = i.date) : (f = +i[0], u = +i[1], e = +i[2]), r && r.nav && o && o.month !== u && (f = o.year, u = o.month), s = new Date(f, u + (r && r.nav ? r.nav : 0), 1), f = s.getFullYear(), u = s.getMonth(); new Date(f, u, e).getMonth() !== u;) e -= 1;
                i = [f, u, e]
            }
            return i
        };
        r.prototype.normalize = function (n) {
            return n.setHours(0, 0, 0, 0), n
        };
        r.prototype.measure = function (n, t) {
            var r = this;
            return t ? "string" == typeof t ? t = r.parse(n, t) : i.isInteger(t) && (t = r.now(n, t, {
                rel: t
            })) : t = "min" == n ? -(1 / 0) : 1 / 0, t
        };
        r.prototype.viewset = function (n, t) {
            return this.create([t.year, t.month, 1])
        };
        r.prototype.validate = function (n, r, u) {
            var c, l, v, y, f = this,
                a = r,
                e = u && u.interval ? u.interval : 1,
                h = -1 === f.item.enable,
                o = f.item.min,
                s = f.item.max,
                p = h && f.item.disable.filter(function (n) {
                    if (t.isArray(n)) {
                        var u = f.create(n).pick;
                        u < r.pick ? c = !0 : u > r.pick && (l = !0)
                    }
                    return i.isInteger(n)
                }).length;
            if ((!u || !u.nav) && (!h && f.disabled(r) || h && f.disabled(r) && (p || c || l) || !h && (r.pick <= o.pick || r.pick >= s.pick)))
                for (h && !p && (!l && e > 0 || !c && 0 > e) && (e *= -1); f.disabled(r) && (Math.abs(e) > 1 && (r.month < a.month || r.month > a.month) && (r = a, e = e > 0 ? 1 : -1), r.pick <= o.pick ? (v = !0, e = 1, r = f.create([o.year, o.month, o.date + (r.pick === o.pick ? 0 : -1)])) : r.pick >= s.pick && (y = !0, e = -1, r = f.create([s.year, s.month, s.date + (r.pick === s.pick ? 0 : 1)])), !v || !y);) r = f.create([r.year, r.month, r.date + e]);
            return r
        };
        r.prototype.disabled = function (n) {
            var r = this,
                u = r.item.disable.filter(function (u) {
                    return i.isInteger(u) ? n.day === (r.settings.firstDay ? u : u - 1) % 7 : t.isArray(u) || i.isDate(u) ? n.pick === r.create(u).pick : t.isPlainObject(u) ? r.withinRange(u, n) : void 0
                });
            return u = u.length && !u.filter(function (n) {
                return t.isArray(n) && "inverted" == n[3] || t.isPlainObject(n) && n.inverted
            }).length, -1 === r.item.enable ? !u : u || n.pick < r.item.min.pick || n.pick > r.item.max.pick
        };
        r.prototype.parse = function (n, t, r) {
            var f = this,
                u = {};
            return t && "string" == typeof t ? (r && r.format || (r = r || {}, r.format = f.settings.format), f.formats.toArray(r.format).map(function (n) {
                var r = f.formats[n],
                    e = r ? i.trigger(r, f, [t, u]) : n.replace(/^!/, "").length;
                r && (u[n] = t.substr(0, e));
                t = t.substr(e)
            }), [u.yyyy || u.yy, +(u.mm || u.m) - 1, u.dd || u.d]) : t
        };
        r.prototype.formats = function () {
            function n(n, t, i) {
                var r = n.match(/\w+/)[0];
                return i.mm || i.m || (i.m = t.indexOf(r) + 1), r.length
            }

            function t(n) {
                return n.match(/\w+/)[0].length
            }
            return {
                d: function (n, t) {
                    return n ? i.digits(n) : t.date
                },
                dd: function (n, t) {
                    return n ? 2 : i.lead(t.date)
                },
                ddd: function (n, i) {
                    return n ? t(n) : this.settings.weekdaysShort[i.day]
                },
                dddd: function (n, i) {
                    return n ? t(n) : this.settings.weekdaysFull[i.day]
                },
                m: function (n, t) {
                    return n ? i.digits(n) : t.month + 1
                },
                mm: function (n, t) {
                    return n ? 2 : i.lead(t.month + 1)
                },
                mmm: function (t, i) {
                    var r = this.settings.monthsShort;
                    return t ? n(t, r, i) : r[i.month]
                },
                mmmm: function (t, i) {
                    var r = this.settings.monthsFull;
                    return t ? n(t, r, i) : r[i.month]
                },
                yy: function (n, t) {
                    return n ? 2 : ("" + t.year).slice(2)
                },
                yyyy: function (n, t) {
                    return n ? 4 : t.year
                },
                toArray: function (n) {
                    return n.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
                },
                toString: function (n, t) {
                    var r = this;
                    return r.formats.toArray(n).map(function (n) {
                        return i.trigger(r.formats[n], r, [0, t]) || n.replace(/^!/, "")
                    }).join("")
                }
            }
        }();
        r.prototype.isDateExact = function (n, r) {
            var u = this;
            return i.isInteger(n) && i.isInteger(r) || "boolean" == typeof n && "boolean" == typeof r ? n === r : (i.isDate(n) || t.isArray(n)) && (i.isDate(r) || t.isArray(r)) ? u.create(n).pick === u.create(r).pick : t.isPlainObject(n) && t.isPlainObject(r) ? u.isDateExact(n.from, r.from) && u.isDateExact(n.to, r.to) : !1
        };
        r.prototype.isDateOverlap = function (n, r) {
            var u = this,
                f = u.settings.firstDay ? 1 : 0;
            return i.isInteger(n) && (i.isDate(r) || t.isArray(r)) ? (n = n % 7 + f, n === u.create(r).day + 1) : i.isInteger(r) && (i.isDate(n) || t.isArray(n)) ? (r = r % 7 + f, r === u.create(n).day + 1) : t.isPlainObject(n) && t.isPlainObject(r) ? u.overlapRanges(n, r) : !1
        };
        r.prototype.flipEnable = function (n) {
            var t = this.item;
            t.enable = n || (-1 == t.enable ? 1 : -1)
        };
        r.prototype.deactivate = function (n, r) {
            var f = this,
                u = f.item.disable.slice(0);
            return "flip" == r ? f.flipEnable() : r === !1 ? (f.flipEnable(1), u = []) : r === !0 ? (f.flipEnable(-1), u = []) : r.map(function (n) {
                for (var e, r = 0; r < u.length; r += 1)
                    if (f.isDateExact(n, u[r])) {
                        e = !0;
                        break
                    }
                e || (i.isInteger(n) || i.isDate(n) || t.isArray(n) || t.isPlainObject(n) && n.from && n.to) && u.push(n)
            }), u
        };
        r.prototype.activate = function (n, r) {
            var f = this,
                u = f.item.disable,
                e = u.length;
            return "flip" == r ? f.flipEnable() : r === !0 ? (f.flipEnable(1), u = []) : r === !1 ? (f.flipEnable(-1), u = []) : r.map(function (n) {
                for (var o, s, h, r = 0; e > r; r += 1) {
                    if (s = u[r], f.isDateExact(s, n)) {
                        o = u[r] = null;
                        h = !0;
                        break
                    }
                    if (f.isDateOverlap(s, n)) {
                        t.isPlainObject(n) ? (n.inverted = !0, o = n) : t.isArray(n) ? (o = n, o[3] || o.push("inverted")) : i.isDate(n) && (o = [n.getFullYear(), n.getMonth(), n.getDate(), "inverted"]);
                        break
                    }
                }
                if (o)
                    for (r = 0; e > r; r += 1)
                        if (f.isDateExact(u[r], n)) {
                            u[r] = null;
                            break
                        }
                if (h)
                    for (r = 0; e > r; r += 1)
                        if (f.isDateOverlap(u[r], n)) {
                            u[r] = null;
                            break
                        }
                o && u.push(o)
            }), u.filter(function (n) {
                return null != n
            })
        };
        r.prototype.nodes = function (n) {
            var r = this,
                t = r.settings,
                s = r.item,
                l = s.now,
                o = s.select,
                y = s.highlight,
                e = s.view,
                w = s.disable,
                h = s.min,
                c = s.max,
                b = function (n, r) {
                    return t.firstDay && (n.push(n.shift()), r.push(r.shift())), i.node("thead", i.node("tr", i.group({
                        min: 0,
                        max: u - 1,
                        i: 1,
                        node: "th",
                        item: function (i) {
                            return [n[i], t.klass.weekdays, 'scope=col title="' + r[i] + '"']
                        }
                    })))
                }((t.showWeekdaysFull ? t.weekdaysFull : t.weekdaysLetter).slice(0), t.weekdaysFull.slice(0)),
                p = function (n) {
                    return i.node("div", " ", t.klass["nav" + (n ? "Next" : "Prev")] + (n && e.year >= c.year && e.month >= c.month || !n && e.year <= h.year && e.month <= h.month ? " " + t.klass.navDisabled : ""), "data-nav=" + (n || -1) + " " + i.ariaAttr({
                        role: "button",
                        controls: r.$node[0].id + "_table"
                    }) + ' title="' + (n ? t.labelMonthNext : t.labelMonthPrev) + '"')
                },
                a = function (u) {
                    var f = t.showMonthsShort ? t.monthsShort : t.monthsFull;
                    return "short_months" == u && (f = t.monthsShort), t.selectMonths && void 0 == u ? i.node("select", i.group({
                        min: 0,
                        max: 11,
                        i: 1,
                        node: "option",
                        item: function (n) {
                            return [f[n], 0, "value=" + n + (e.month == n ? " selected" : "") + (e.year == h.year && n < h.month || e.year == c.year && n > c.month ? " disabled" : "")]
                        }
                    }), t.klass.selectMonth + " browser-default", (n ? "" : "disabled") + " " + i.ariaAttr({
                        controls: r.$node[0].id + "_table"
                    }) + ' title="' + t.labelMonthSelect + '"') : "short_months" == u ? null != o ? i.node("div", f[o.month]) : i.node("div", f[e.month]) : i.node("div", f[e.month], t.klass.month)
                },
                v = function (u) {
                    var o = e.year,
                        a = t.selectYears === !0 ? 5 : ~~(t.selectYears / 2),
                        y, p;
                    if (a) {
                        var l = h.year,
                            v = c.year,
                            f = o - a,
                            s = o + a;
                        if ((l > f && (s += l - f, f = l), s > v) && (y = f - l, p = s - v, f -= y > p ? p : y, s = v), t.selectYears && void 0 == u) return i.node("select", i.group({
                            min: f,
                            max: s,
                            i: 1,
                            node: "option",
                            item: function (n) {
                                return [n, 0, "value=" + n + (o == n ? " selected" : "")]
                            }
                        }), t.klass.selectYear + " browser-default", (n ? "" : "disabled") + " " + i.ariaAttr({
                            controls: r.$node[0].id + "_table"
                        }) + ' title="' + t.labelYearSelect + '"')
                    }
                    return "raw" == u ? i.node("div", o) : i.node("div", o, t.klass.year)
                };
            return createDayLabel = function () {
                return null != o ? i.node("div", o.date) : i.node("div", l.date)
            }, createWeekdayLabel = function () {
                var n;
                return n = null != o ? o.day : l.day, t.weekdaysFull[n]
            }, i.node("div", i.node("div", createWeekdayLabel(), "picker__weekday-display") + i.node("div", a("short_months"), t.klass.month_display) + i.node("div", createDayLabel(), t.klass.day_display) + i.node("div", v("raw"), t.klass.year_display), t.klass.date_display) + i.node("div", i.node("div", (t.selectYears ? a() + v() : a() + v()) + p() + p(1), t.klass.header) + i.node("table", b + i.node("tbody", i.group({
                min: 0,
                max: f - 1,
                i: 1,
                node: "tr",
                item: function (n) {
                    var f = t.firstDay && 0 === r.create([e.year, e.month, 1]).day ? -7 : 0;
                    return [i.group({
                        min: u * n - e.day + f + 1,
                        max: function () {
                            return this.min + u - 1
                        },
                        i: 1,
                        node: "td",
                        item: function (n) {
                            n = r.create([e.year, e.month, n + (t.firstDay ? 1 : 0)]);
                            var u = o && o.pick == n.pick,
                                f = y && y.pick == n.pick,
                                s = w && r.disabled(n) || n.pick < h.pick || n.pick > c.pick,
                                a = i.trigger(r.formats.toString, r, [t.format, n]);
                            return [i.node("div", n.date, function (i) {
                                return i.push(e.month == n.month ? t.klass.infocus : t.klass.outfocus), l.pick == n.pick && i.push(t.klass.now), u && i.push(t.klass.selected), f && i.push(t.klass.highlighted), s && i.push(t.klass.disabled), i.join(" ")
                            }([t.klass.day]), "data-pick=" + n.pick + " " + i.ariaAttr({
                                role: "gridcell",
                                label: a,
                                selected: u && r.$node.val() === a ? !0 : null,
                                activedescendant: f ? !0 : null,
                                disabled: s ? !0 : null
                            })), "", i.ariaAttr({
                                role: "presentation"
                            })]
                        }
                    })]
                }
            })), t.klass.table, 'id="' + r.$node[0].id + '_table" ' + i.ariaAttr({
                role: "grid",
                controls: r.$node[0].id,
                readonly: !0
            })), t.klass.calendar_container) + i.node("div", i.node("button", t.today, "btn-flat picker__today", "type=button data-pick=" + l.pick + (n && !r.disabled(l) ? "" : " disabled") + " " + i.ariaAttr({
                controls: r.$node[0].id
            })) + i.node("button", t.clear, "btn-flat picker__clear", "type=button data-clear=1" + (n ? "" : " disabled") + " " + i.ariaAttr({
                controls: r.$node[0].id
            })) + i.node("button", t.close, "btn-flat picker__close", "type=button data-close=true " + (n ? "" : " disabled") + " " + i.ariaAttr({
                controls: r.$node[0].id
            })), t.klass.footer)
        };
        r.defaults = function (n) {
            return {
                labelMonthNext: "Next month",
                labelMonthPrev: "Previous month",
                labelMonthSelect: "Select a month",
                labelYearSelect: "Select a year",
                monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                weekdaysLetter: ["S", "M", "T", "W", "T", "F", "S"],
                today: "Today",
                clear: "Clear",
                close: "Close",
                format: "d mmmm, yyyy",
                klass: {
                    table: n + "table",
                    header: n + "header",
                    date_display: n + "date-display",
                    day_display: n + "day-display",
                    month_display: n + "month-display",
                    year_display: n + "year-display",
                    calendar_container: n + "calendar-container",
                    navPrev: n + "nav--prev",
                    navNext: n + "nav--next",
                    navDisabled: n + "nav--disabled",
                    month: n + "month",
                    year: n + "year",
                    selectMonth: n + "select--month",
                    selectYear: n + "select--year",
                    weekdays: n + "weekday",
                    day: n + "day",
                    disabled: n + "day--disabled",
                    selected: n + "day--selected",
                    highlighted: n + "day--highlighted",
                    now: n + "day--today",
                    infocus: n + "day--infocus",
                    outfocus: n + "day--outfocus",
                    footer: n + "footer",
                    buttonClear: n + "button--clear",
                    buttonToday: n + "button--today",
                    buttonClose: n + "button--close"
                }
            }
        }(n.klasses().picker + "__");
        n.extend("pickadate", r)
    }),
    function (n) {
        function t() {
            var t = +n(this).attr("length"),
                i = +n(this).val().length,
                r = t >= i;
            n(this).parent().find('span[class="character-counter"]').html(i + "/" + t);
            u(r, n(this))
        }

        function i(t) {
            var i = t.parent().find('span[class="character-counter"]');
            i.length || (i = n("<span/>").addClass("character-counter").css("float", "right").css("font-size", "12px").css("height", 1), t.parent().append(i))
        }

        function r() {
            n(this).parent().find('span[class="character-counter"]').html("")
        }

        function u(n, t) {
            var i = t.hasClass("invalid");
            n && i ? t.removeClass("invalid") : n || i || (t.removeClass("valid"), t.addClass("invalid"))
        }
        n.fn.characterCounter = function () {
            return this.each(function () {
                var u = n(this),
                    e = u.parent().find('span[class="character-counter"]'),
                    f;
                e.length || (f = void 0 !== u.attr("length"), f && (u.on("input", t), u.on("focus", t), u.on("blur", r), i(u)))
            })
        };
        n(document).ready(function () {
            n("input, textarea").characterCounter()
        })
    }(jQuery),
    function (n) {
        var t = {
            init: function (t) {
                return t = n.extend({
                    time_constant: 200,
                    dist: -100,
                    shift: 0,
                    padding: 0,
                    full_width: !1,
                    indicators: !1,
                    no_wrap: !1
                }, t), this.each(function () {
                    function at() {
                        "undefined" != typeof ontouchstart && (i[0].addEventListener("touchstart", ht), i[0].addEventListener("touchmove", ct), i[0].addEventListener("touchend", tt));
                        i[0].addEventListener("mousedown", ht);
                        i[0].addEventListener("mousemove", ct);
                        i[0].addEventListener("mouseup", tt);
                        i[0].addEventListener("mouseleave", tt);
                        i[0].addEventListener("click", yt)
                    }

                    function ot(n) {
                        return n.targetTouches && n.targetTouches.length >= 1 ? n.targetTouches[0].clientX : n.clientX
                    }

                    function st(n) {
                        return n.targetTouches && n.targetTouches.length >= 1 ? n.targetTouches[0].clientY : n.clientY
                    }

                    function p(n) {
                        return n >= u ? n % u : 0 > n ? p(u + n % u) : n
                    }

                    function w(n) {
                        var s, w, l, v, c, f, y, b, k;
                        for ((r = "number" == typeof n ? n : r, e = Math.floor((r + o / 2) / o), l = r - e * o, v = 0 > l ? 1 : -1, c = -v * l * 2 / o, w = u >> 1, t.full_width ? y = "translateX(0)" : (y = "translateX(" + (i[0].clientWidth - item_width) / 2 + "px) ", y += "translateY(" + (i[0].clientHeight - item_width) / 2 + "px)"), g) && (b = e % u, k = d.find(".indicator-item.active"), k.index() !== b && (k.removeClass("active"), d.find(".indicator-item").eq(b).addClass("active"))), (!t.no_wrap || e >= 0 && u > e) && (f = h[p(e)], f.style[a] = y + " translateX(" + -l / 2 + "px) translateX(" + v * t.shift * c * s + "px) translateZ(" + t.dist * c + "px)", f.style.zIndex = 0, tweenedOpacity = t.full_width ? 1 : 1 - .2 * c, f.style.opacity = tweenedOpacity, f.style.display = "block"), s = 1; w >= s; ++s) t.full_width ? (zTranslation = t.dist, tweenedOpacity = s === w && 0 > l ? 1 - c : 1) : (zTranslation = t.dist * (2 * s + c * v), tweenedOpacity = 1 - .2 * (2 * s + c * v)), (!t.no_wrap || u > e + s) && (f = h[p(e + s)], f.style[a] = y + " translateX(" + (t.shift + (o * s - l) / 2) + "px) translateZ(" + zTranslation + "px)", f.style.zIndex = -s, f.style.opacity = tweenedOpacity, f.style.display = "block"), t.full_width ? (zTranslation = t.dist, tweenedOpacity = s === w && l > 0 ? 1 - c : 1) : (zTranslation = t.dist * (2 * s - c * v), tweenedOpacity = 1 - .2 * (2 * s - c * v)), (!t.no_wrap || e - s >= 0) && (f = h[p(e - s)], f.style[a] = y + " translateX(" + (-t.shift + (-o * s - l) / 2) + "px) translateZ(" + zTranslation + "px)", f.style.zIndex = -s, f.style.opacity = tweenedOpacity, f.style.display = "block");
                        (!t.no_wrap || e >= 0 && u > e) && (f = h[p(e)], f.style[a] = y + " translateX(" + -l / 2 + "px) translateX(" + v * t.shift * c + "px) translateZ(" + t.dist * c + "px)", f.style.zIndex = 0, tweenedOpacity = t.full_width ? 1 : 1 - .2 * c, f.style.opacity = tweenedOpacity, f.style.display = "block")
                    }

                    function vt() {
                        var n, t, i, u;
                        n = Date.now();
                        t = n - c;
                        c = n;
                        i = r - rt;
                        rt = r;
                        u = 1e3 * i / (1 + t);
                        l = .8 * u + .2 * l
                    }

                    function k() {
                        var i, n;
                        s && (i = Date.now() - c, n = s * Math.exp(-i / t.time_constant), n > 2 || -2 > n ? (w(f - n), requestAnimationFrame(k)) : w(f))
                    }

                    function yt(i) {
                        if (v) return i.preventDefault(), i.stopPropagation(), !1;
                        if (!t.full_width) {
                            var r = n(i.target).closest(".carousel-item").index(),
                                f = e % u - r;
                            0 !== f && (i.preventDefault(), i.stopPropagation());
                            nt(r)
                        }
                    }

                    function nt(n) {
                        var r = e % u - n;
                        t.no_wrap || (0 > r ? Math.abs(r + u) < Math.abs(r) && (r += u) : r > 0 && Math.abs(r - u) < r && (r -= u));
                        0 > r ? i.trigger("carouselNext", [Math.abs(r)]) : r > 0 && i.trigger("carouselPrev", [r])
                    }

                    function ht(n) {
                        b = !0;
                        v = !1;
                        ft = !1;
                        it = ot(n);
                        lt = st(n);
                        l = s = 0;
                        rt = r;
                        c = Date.now();
                        clearInterval(ut);
                        ut = setInterval(vt, 100)
                    }

                    function ct(n) {
                        var i, t, u;
                        if (b)
                            if (i = ot(n), y = st(n), t = it - i, u = Math.abs(lt - y), 30 > u && !ft)(t > 2 || -2 > t) && (v = !0, it = i, w(r + t));
                            else {
                                if (v) return n.preventDefault(), n.stopPropagation(), !1;
                                ft = !0
                            }
                        if (v) return (n.preventDefault(), n.stopPropagation(), !1)
                    }

                    function tt(n) {
                        if (b) return (b = !1, clearInterval(ut), f = r, (l > 10 || -10 > l) && (s = .9 * l, f = r + s), f = Math.round(f / o) * o, t.no_wrap && (f >= o * (u - 1) ? f = o * (u - 1) : 0 > f && (f = 0)), s = f - r, c = Date.now(), requestAnimationFrame(k), v && (n.preventDefault(), n.stopPropagation()), !1)
                    }
                    var h, r, e, b, o, u, it, lt, s, f, l, a, rt, c, ut, v, ft, d = n('<ul class="indicators"><\/ul>'),
                        i = n(this),
                        g = i.attr("data-indicators") || t.indicators,
                        et;
                    if (i.hasClass("initialized")) return n(this).trigger("carouselNext", [1e-6]), !0;
                    t.full_width && (t.dist = 0, et = i.find(".carousel-item img").first(), et.length ? imageHeight = et.load(function () {
                        i.css("height", n(this).height())
                    }) : (imageHeight = i.find(".carousel-item").first().height(), i.css("height", imageHeight)), g && i.find(".carousel-fixed-item").addClass("with-indicators"));
                    i.addClass("initialized");
                    b = !1;
                    r = f = 0;
                    h = [];
                    item_width = i.find(".carousel-item").first().innerWidth();
                    o = 2 * item_width + t.padding;
                    i.find(".carousel-item").each(function (t) {
                        if (h.push(n(this)[0]), g) {
                            var i = n('<li class="indicator-item"><\/li>');
                            0 === t && i.addClass("active");
                            i.click(function () {
                                var t = n(this).index();
                                nt(t)
                            });
                            d.append(i)
                        }
                    });
                    g && i.append(d);
                    u = h.length;
                    a = "transform";
                    ["webkit", "Moz", "O", "ms"].every(function (n) {
                        var t = n + "Transform";
                        return "undefined" != typeof document.body.style[t] ? (a = t, !1) : !0
                    });
                    window.onresize = w;
                    at();
                    w(r);
                    n(this).on("carouselNext", function (n, t) {
                        void 0 === t && (t = 1);
                        f = r + o * t;
                        r !== f && (s = f - r, c = Date.now(), requestAnimationFrame(k))
                    });
                    n(this).on("carouselPrev", function (n, t) {
                        void 0 === t && (t = 1);
                        f = r - o * t;
                        r !== f && (s = f - r, c = Date.now(), requestAnimationFrame(k))
                    });
                    n(this).on("carouselSet", function (n, t) {
                        void 0 === t && (t = 0);
                        nt(t)
                    })
                })
            },
            next: function (t) {
                n(this).trigger("carouselNext", [t])
            },
            prev: function (t) {
                n(this).trigger("carouselPrev", [t])
            },
            set: function (t) {
                n(this).trigger("carouselSet", [t])
            }
        };
        n.fn.carousel = function (i) {
            return t[i] ? t[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void n.error("Method " + i + " does not exist on jQuery.carousel") : t.init.apply(this, arguments)
        }
    }(jQuery);
R = {
    Game: {
        BetType_Sum: "和值",
        LottoSelectionTypeGroup_2351: "和值（7,20）",
        LottoSelectionType_ThreeNumber1: "三字 (组六)",
        LottoSelectionTypeGroup_1404: "一定位 (万)",
        SelectionType_SmallOdd: "小单",
        LottoSelectionTypeGroup_15311: "二定位 (十个)",
        LottoBetType_19061: "合尾质合 (十个)",
        LottoBetType_19071: "合尾质合 (百个)",
        LottoBetType_19021: "质合 (十)",
        LottoBetType_19031: "质合 (百)",
        CounterName_350: "福彩3D",
        LottoBetType_19011: "质合 (个)",
        LottoSelectionTypeGroup_23561: "和值 (三定位) (12, 15)",
        SelectionType_Small_Short: "小",
        LottoSelectionTypeGroup_2350: "和值（0-6）（21-27）",
        LottoSelectionTypeGroup_1403: "一定位 (千)",
        LottoSelectionTypeGroup_26001: "一字过关",
        LottoSelectionTypeGroup_1201: "二字（双重）",
        LottoSelectionTypeGroup_2201: "跨度（1,9）",
        SelectionType_Total810: "和值 810",
        LottoBetType_2600: "一字过关",
        LottoBetType_1508: "千百 | 二定位单号",
        LottoSelectionTypeGroup_23551: "和值 (三定位) (11,16)",
        LottoBetType_2306: "和值二定位 (千十)",
        LottoBetType_2307: "和值二定位 (万十)",
        LottoBetType_2304: "和值二定位 (万个)",
        LottoBetType_2305: "和值二定位",
        LottoBetType_2302: "和值二定位",
        LottoResultBetType_Small_Abbr1: "小",
        LottoBetType_1631: "百十个 | 三定位单号",
        LottoBetType_2301: "和值二定位",
        LottoSelectionTypeGroup_1402: "一定位 (百)",
        LottoResultBetType_Prime_Abbr1: "质",
        LottoSelectionTypeGroup_1200: "二字",
        LottoBetType_2309: "和值二定位 (万百)",
        LottoSelectionTypeGroup_2200: "跨度（0）",
        BetType_LastDigitOfSum: "和尾",
        LottoBetType_25021: "复式组合(十)",
        LottoBetType_25031: "复式组合(百)",
        LottoBetType_1711: "千十 | 和尾单双",
        LottoBetType_25011: "复式组合(个)",
        LottoSelectionTypeGroup_15321: "二定位 (百个)",
        LottoResultBetType_Big1: "大",
        LottoBetTypeGroup_13001: "三字",
        LottoSelectionTypeGroup_19001: "质合",
        LottoBetType_2310: "和值二定位 (万千)",
        LottoBetType_1706: "十个 | 和尾单双",
        LottoBetType_1707: "百个 | 和尾单双",
        LottoBetType_1704: "千 | 一定位单/双",
        LottoSelectionType_ThreeNumber: "三字 (组六)",
        LottoBetType_1702: "十 | 一定位单/双",
        LottoBetType_1703: "百 | 一定位单/双",
        LottoBetType_1701: "个 | 一定位单/双",
        LottoBetTypeGroup_1600: "三定位",
        LottoBetType_1708: "千个 | 和尾单双",
        LottoBetType_1709: "万个 | 和尾单双",
        Trend_Earth: "土",
        LottoBetTypeGroup_1900: "质合",
        LottoSelectionTypeGroup_23531: "和值 (三定位) (9, 18)",
        BetType_UpDown: "上下",
        BetType_LastDigitOddEven: "和尾单双",
        WagerStatus_Confirmed: "已确认",
        LottoBetType_10011: "一字 (后三)||一字 ",
        LottoSelectionTypeGroup_22041: "跨度 (4,6)",
        LottoBetType_1716: "百十个 | 和尾单双",
        LottoBetType_1717: "千百十 | 和尾单双",
        SelectionType_Odds: "奇",
        LottoBetType_1715: "万千 | 和尾单双",
        LottoBetType_1712: "万十 | 和尾单双",
        LottoBetType_1713: "千百 | 和尾单双",
        LottoBetType_1710: "百十 | 和尾单双",
        LottoSelectionTypeGroup_2500: "复式组合",
        LottoResultBetType_Odd: "单",
        CounterName_330: "江西",
        LottoBetType_1718: "万千百 | 和尾单双",
        BetType_PearlBall_Short: "珠仔",
        LottoBetTypeGroup_1800: "大小",
        LottoBetType_1816: "百十个 | 和尾大小",
        LottoSelectionTypeGroup_22031: "跨度 (3,7)",
        LottoBetTypeGroup_22001: "跨度",
        LottoBetTypeGroup_23501: "和值三定位",
        LottoSelectionTypeGroup_25001: "複式組合",
        LottoSelectionTypeGroup_1508: "二定位 (千百)",
        LottoBetType_BigSmall_Short: "大小",
        LottoSelectionTypeGroup_2204: "跨度（4,6）",
        LottoBetType_1806: "十个 | 和尾大小",
        LottoBetType_1807: "百个 | 和尾大小",
        LottoBetType_1804: "千 | 一定位大/小",
        LottoBetType_1805: "万 | 一定位大/小",
        LottoBetType_1802: "十 | 一定位大/小",
        LottoBetType_1803: "百 | 一定位大/小",
        Trend_Down: "下",
        LottoBetType_1801: "个 | 一定位大/小",
        LottoSelectionTypeGroup_2006: "选10",
        LottoSelectionTypeGroup_12011: "二字（双重）",
        LottoSelectionTypeGroup_22021: "跨度 (2,8)",
        LottoResultBetType_Odd_Abbr1: "单",
        LottoBetType_1808: "千个 | 和尾大小",
        LottoBetType_1809: "万个 | 和尾大小",
        LottoSelectionTypeGroup_1800: "大小",
        BetType_Total: "总额",
        LottoBetType_19101: "合尾质合 (百十)",
        SelectionType_SmallEven_Short: "小/双",
        LottoResultBetType_CombinedBig: "合大",
        LottoResultBetType_Composite_Abbr1: "合",
        LottoSelectionTypeGroup_1631: "三定位",
        LottoResultBetType_Even: "双",
        LottoBetType_1817: "千百十 | 和尾大小",
        LottoBetType_1814: "万百 | 和尾大小",
        LottoBetType_1815: "万千 | 和尾大小",
        SelectionType_4thDigit: "千",
        LottoBetType_1813: "千百 | 和尾大小",
        LottoBetType_1810: "百十 | 和尾大小",
        LottoBetType_1811: "千十 | 和尾大小",
        LottoSelectionTypeGroup_2005: "选9",
        LottoSelectionTypeGroup_12001: "二字",
        SelectionType_1stDigit: "个",
        LottoBetType_1818: "万千百 | 和尾大小",
        BetType_Span: "跨度",
        BetType_LastDigitBigSmall: "和尾大小",
        BetType_3_FixedDigit: "三定位",
        SelectionType_SmallEven: "小双",
        SelectionType_Down: "下",
        LottoBetTypeGroup_2200: "跨度",
        LottoSelectionTypeGroup_2004: "选8",
        Trend_Even: "双",
        LottoSelectionTypeGroup_1400: "一定位",
        BetType_UpDown_Short: "上下",
        LottoBetTypeGroup_1400: "一定位",
        Trend_Tie: "和",
        LottoSelectionTypeGroup_1510: "二定位 (万千)",
        LottoBetTypeGroup_2100: "组选六",
        LottoBetType_OddEven: "一定位单/双",
        LottoSelectionTypeGroup_14321: "一定位 (百)",
        LottoSelectionType_ThreeNumberTriple1: "三字 (豹子)",
        Trend_Odd: "单",
        LottoSelectionTypeGroup_2305: "和值（9），",
        LottoSelectionTypeGroup_2003: "选7",
        LottoSelectionTypeGroup_1501: "二定位 (十个)",
        LottoBetType_2308: "和值二定位 (千百)",
        ResultBall_Wood: "木",
        BetType_UpTieDown_Short: "上/和/下",
        LottoBetTypeGroup_2000: "组选三",
        LottoBetType_1603: "万千百 | 三定位单号",
        LottoBetTypeGroup_17001: "单双",
        LottoSelectionTypeGroup_14311: "一定位 (十)",
        LottoSelectionTypeGroup_2304: "和值（8,10）",
        LottoSelectionTypeGroup_2002: "选6",
        LottoBetType_1906: "两面质合",
        LottoBetType_1907: "两面质合",
        LottoBetType_1904: "质合 (千)",
        LottoResultBetType_Small1: "小",
        LottoBetType_1902: "两面质合",
        LottoBetType_1903: "两面质合",
        LottoResultBetType_Composite1: "合",
        LottoBetType_1901: "两面质合",
        SelectionType_Evens: "偶",
        CounterName_340: "天津",
        LottoBetType_1908: "合尾质合 (千个)",
        LottoResultBetType_Odd_Abbr: "单",
        LottoSelectionTypeGroup_14301: "一定位 (个)",
        LottoBetType_2413: "和尾 (前三)",
        LottoResultBetType_Odd1: "单",
        LottoBetType_26001: "一字过关",
        LottoSelectionTypeGroup_2303: "和值（7,11）",
        LottoBetType_1916: "合尾质合 (后三)||合尾质合",
        LottoBetType_1917: "合尾质合 (中三)",
        LottoResultBetType_Even1: "双",
        LottoBetType_1915: "合尾质合 (万千)",
        LottoBetType_1912: "合尾质合 (万十)",
        LottoBetType_1913: "合尾质合 (千百)",
        LottoBetType_1910: "两面质合",
        LottoBetType_1911: "合尾质合 (千十)",
        LottoBetType_23051: "和值二定位 (百十)",
        LottoBetType_23021: "和值二定位 (百个)",
        LottoBetType_23011: "和值二定位 (十个)",
        LottoBetType_1918: "合尾质合 (前三)",
        ResultBall_Small: "小",
        LottoBetTypeGroup_2600: "一字过关",
        LottoSelectionTypeGroup_1302: "豹子",
        LottoSelectionTypeGroup_2302: "和值（6,12）",
        LottoSelectionTypeGroup_1100: "一字 (全五)",
        LottoSelectionType_ThreeNumberDouble1: "三字 (组三)",
        LottoSelectionTypeGroup_18001: "大小",
        LottoResultPosition_ThreeDigit: "百",
        BetType_FiveElement: "五行",
        LottoSelectionTypeGroup_1535: "二定位（00X）",
        Trend_Small: "小",
        LottoBetType_1431: "个 | 一定位单号",
        LottoSelectionTypeGroup_2352: "和值（8,19）",
        LottoBetTypeGroup_18001: "大小",
        LottoBetType_1503: "千个 | 二定位单号",
        LottoSelectionTypeGroup_17002: "单双",
        LottoSelectionType_ThreeNumberTriple: "三字 (豹子)",
        LottoBetTypeGroup_2500: "复式组合",
        LottoSelectionTypeGroup_1603: "三定位 (前三)",
        LottoSelectionTypeGroup_1401: "一定位 (十)",
        SelectionType_Up: "上",
        ResultBall_Gold: "金",
        BetType_FiveElement_Short: "五行",
        LottoBetType_1002: "一字 (中三)",
        LottoBetType_1003: "一字 (前三)",
        LottoBetType_1001: "百十个 | 一字",
        LottoBetType_1602: "千百十 | 三定位单号",
        LottoBetTypeGroup_2400: "和尾",
        LottoSelectionTypeGroup_1602: "三定位 (中三)",
        Trend_Up: "上",
        BetType_OddsEvens_Short: "奇偶",
        SelectionType_Odd: "单",
        LottoResultBetType_Small_Abbr: "小",
        LottoSelectionTypeGroup_2400: "和尾",
        BetType_2Digits_Double: "双重",
        LottoBetType_2411: "和尾",
        SelectionType_Big_Short: "大",
        CounterName_320: "重庆",
        ResultBall_Up: "上",
        BetType_1_FixedDigit: "一定位",
        LottoSelectionTypeGroup_23521: "和值 (三定位) (8, 19)",
        LottoResultBetType_Even_Abbr1: "双",
        LottoSelectionTypeGroup_1502: "二定位 (百个)",
        SelectionType_Fire: "火",
        LottoSelectionTypeGroup_22001: "跨度 (0)",
        LottoBetTypeGroup_1300: "三字",
        LottoResultBetType_CombinedEven1: "合双",
        SelectionType_PearlBall: "珠仔",
        LottoSelectionTypeGroup_22051: "跨度 (5)",
        BetType_PearlBall: "珠仔",
        LottoSelectionTypeGroup_1532: "二定位（为0x0）",
        LottoSelectionTypeGroup_23511: "和值 (三定位) (7, 20)",
        LottoResultBetType_Composite: "合",
        LottoSelectionTypeGroup_1509: "二定位 (万百)",
        LottoSelectionTypeGroup_1700: "单双",
        ResultBall_Water: "水",
        LottoBetType_2002: "组选三 (中三)",
        LottoBetType_2003: "组选三 (前三)",
        LottoBetType_2001: "组选三",
        Trend_Fire: "火",
        LottoSelectionTypeGroup_1531: "二定位（X00）",
        ResultBall_Odd: "单",
        LottoBetType_1714: "万百 | 和尾单双",
        LottoSelectionTypeGroup_23501: "和值 (三定位) (0-6, 21-27)",
        LottoBetType_1601: "百十个 | 三定位单号",
        WagerStatus_Open: "未结帐",
        LottoBetType_2352: "和值三定位 (中三)",
        LottoBetType_2353: "和值三定位 (前三)",
        LottoBetType_2351: "百十个 | 和值",
        LottoBetTypeGroup_1100: "一字全五",
        LottoBetType_2303: "和值二定位 (千个)",
        LottoBetTypeGroup_12001: "二字",
        ResultBall_Earth: "土",
        LottoResultBetType_Prime1: "质",
        LottoBetType_1404: "千 | 一定位单号",
        LottoBetType_1405: "万 | 一定位单号",
        LottoBetType_1402: "十 | 一定位单号",
        LottoBetType_1403: "百 | 一定位单号",
        LottoBetType_1401: "个 | 一定位单号",
        Trend_Gold: "金",
        LottoSelectionType_ThreeNumberDouble: "三字 (组三)",
        SelectionType_Tie: "和",
        LottoResultBetType_CombinedSmall1: "合小",
        SelectionType_BigEven: "大双",
        Trend_Odds: "奇",
        LottoBetTypeGroup_1000: "一字",
        LottoBetType_1101: "一字 (全五)",
        LottoResultBetType_Prime: "质",
        SelectionType_Wood: "木",
        LottoSelectionTypeGroup_2354: "和值（10,17）",
        WagerCancelReason_OfficialResultSuspend: "官方网站没开奖",
        SelectionType_BigOdd: "大单",
        LottoSelectionTypeGroup_22011: "跨度 (1,9)",
        LottoSelectionTypeGroup_2205: "跨度（5）",
        SelectionType_3rdDigit: "百",
        LottoResultBetType_Big: "大",
        LottoBetType_1507: "万十 | 二定位单号",
        LottoBetTypeGroup_1700: "单双",
        LottoResultBetType_CombinedOdd: "合单",
        LottoSelectionTypeGroup_14001: "一定位 (个)",
        LottoResultBetType_Small: "小",
        BetType_3Digits_3x3: "组三",
        SelectionType_BigOdd_Short: "大/单",
        LottoSelectionTypeGroup_1506: "二定位 (千十)",
        BetType_OddEven_Short: "单双",
        LottoResultPosition_OneDigit: "个",
        ResultBall_Fire: "火",
        BetType_OddEven: "单双",
        Trend_Big: "大",
        BetType_OddsTieEvens_Short: "奇/和/偶",
        LottoBetType_2406: "和尾 (千十)",
        LottoBetType_2407: "和尾 (万十)",
        LottoBetType_2404: "和尾 (万个)",
        LottoBetType_2405: "和尾",
        LottoBetType_2402: "和尾",
        LottoBetType_2403: "和尾 (千个)",
        LottoBetType_2401: "和尾",
        LottoSelectionTypeGroup_24001: "和尾",
        LottoBetType_2102: "组选六 (中三)",
        LottoBetType_2408: "和尾 (千百)",
        LottoBetType_2409: "和尾 (万百)",
        LottoBetType_1432: "十 | 一定位单号",
        LottoBetType_1433: "百 | 一定位单号",
        LottoBetType_2103: "组选六 (前三)",
        LottoBetType_BigSmall: "一定位大/小",
        LottoBetType_2101: "组选六",
        LottoResultBetType_Even_Abbr: "双",
        LottoSelectionTypeGroup_2203: "跨度（3,7）",
        LottoSelectionTypeGroup_2001: "组选六",
        LottoBetType_2412: "和尾 (中三)",
        LottoBetTypeGroup_1500: "二定位",
        LottoBetType_2410: "和尾 (万千)",
        BetType_Total810: "和值 810",
        BetType_3Digits: "三字",
        LottoResultPosition_TwoDigit: "十",
        LottoSelectionTypeGroup_20001: "组选三",
        ResultBall_Big: "大",
        LottoResultBetType_CombinedEven: "合双",
        LottoResultBetType_CombinedOdd1: "合单",
        LottoSelectionTypeGroup_1504: "二定位 (万个)",
        LottoBetType_1506: "千十 | 二定位单号",
        LottoSelectionTypeGroup_17001: "单双",
        LottoSelectionTypeGroup_2202: "跨度（2,8）",
        LottoSelectionTypeGroup_1000: "一字",
        LottoBetType_1502: "百个 | 二定位单号",
        BetType_3rd2nd1st: "百十个",
        LottoSelectionTypeGroup_2000: "组选三",
        LottoBetType_1501: "十个 | 二定位单号",
        LottoSelectionTypeGroup_16311: "三定位 (前三)",
        SelectionType_SmallOdd_Short: "小/单",
        CounterName_360: "新疆",
        BetType_2Digits: "二字",
        LottoBetType_1509: "万百 | 二定位单号",
        LottoSelectionTypeGroup_1507: "二定位 (万十)",
        BetType_BigSmall: "大小",
        LottoSelectionTypeGroup_23541: "和值 (三定位) (10, 17)",
        LottoBetType_1504: "万个 | 二定位单号",
        SelectionType_Odd_Short: "单",
        LottoSelectionTypeGroup_1503: "二定位 (千个)",
        ResultBall_Odds: "奇",
        LottoResultPosition_FiveDigit: "万",
        LottoSelectionTypeGroup_1301: "组三",
        ResultBall_Down: "下",
        LottoSelectionTypeGroup_2301: "和值（5,13）",
        LottoBetType_1510: "万千 | 二定位单号",
        BetType_Big810Small_Short: "大/810/小",
        SelectionType_BigEven_Short: "大/双",
        LottoResultBetType_CombinedBig1: "合大",
        Trend_Water: "水",
        BetType_BigSmall_Short: "大小",
        LottoResultBetType_Prime_Abbr: "质",
        SelectionType_5thDigit: "万",
        Trend_Wood: "木",
        LottoBetType_1705: "万 | 一定位单/双",
        LottoSelectionTypeGroup_1300: "组六",
        SelectionType_Gold: "金",
        LottoSelectionTypeGroup_2300: "和值（0-4）（4-18）",
        CounterName_310: "上海",
        LottoSelectionTypeGroup_23051: "和值 (二定位) (9)",
        LottoSelectionTypeGroup_23011: "和值 (二定位) (5, 13)",
        SelectionType_Big: "大",
        SelectionType_Even_Short: "双",
        WagerCancelReason_BetCancelled: "注单取消",
        LottoResultBetType_Big_Abbr: "大",
        LottoBetType_2502: "复式组合（十）",
        LottoBetType_2503: "复式组合（百）",
        LottoBetType_2500: "复式组合",
        LottoBetType_2501: "复式组合（个）",
        LottoBetTypeGroup_10001: "一字",
        LottoSelectionTypeGroup_1601: "三定位 (后三)",
        LottoBetType_1535: "百十 | 二定位单号",
        LottoBetType_1532: "百个 | 二定位单号",
        LottoBetType_1531: "十个 | 二定位单号",
        LottoSelectionTypeGroup_20011: "组选六",
        LottoSelectionTypeGroup_1432: "一定位（0XX）",
        LottoBetTypeGroup_1200: "二字",
        LottoResultBetType_Big_Abbr1: "大",
        LottoResultPosition_FourDigit: "千",
        SelectionType_Water: "水",
        ResultBall_Even: "双",
        LottoBetType_20011: "组选三 (后三)||组选三 ",
        LottoSelectionTypeGroup_23041: "和值 (二定位) (8, 10)",
        LottoResultBetType_CombinedSmall: "合小",
        LottoSelectionTypeGroup_2600: "一字过关",
        LottoBetType_1505: "百十 | 二定位单号",
        LottoBetType_1909: "合尾质合 (万个)",
        LottoSelectionTypeGroup_10001: "一字",
        LottoSelectionTypeGroup_1431: "一定位（x0x）",
        LottoBetType_1202: "二字 (中三)",
        LottoBetType_1203: "二字 (前三)",
        WagerStatus_Cancelled: "取消",
        LottoBetType_1201: "百十个 | 二字",
        ResultBall_Tie: "和",
        BetType_BigSmallOddEven: "大小 & 单双",
        LottoSelectionTypeGroup_13021: "三字 (豹子)",
        LottoBetType_1905: "质合 (万)",
        LottoSelectionTypeGroup_23031: "和值 (二定位) (7, 11)",
        LottoSelectionTypeGroup_2355: "和值（11,16）",
        LottoSelectionTypeGroup_1505: "二定位 (百十)",
        LottoSelectionTypeGroup_1430: "一定位（xx0）",
        LottoBetType_24111: "和尾 (后三)||和尾 ",
        LottoBetTypeGroup_14001: "一定位",
        SelectionType_Earth: "土",
        BetType_3Digits_3x6: "组六",
        LottoBetType_OddEven_Short: "单双",
        LottoSelectionTypeGroup_15351: "二定位 (百十)",
        LottoSelectionTypeGroup_13011: "三字 (組三)",
        LottoSelectionTypeGroup_1900: "质合",
        LottoSelectionTypeGroup_23021: "和值 (二定位) (6, 12)",
        LottoBetTypeGroup_2300: "和值二定位",
        BetType_1Digit: "一字",
        LottoBetTypeGroup_2350: "三定位总和",
        LottoResultBetType_Composite_Abbr: "合",
        Trend_Evens: "偶",
        LottoSelectionTypeGroup_13001: "三字 (組六)",
        LottoBetType_2202: "跨度 (中三)",
        LottoBetType_2203: "跨度 (前三)",
        LottoBetType_2201: "百十个 | 跨度",
        BetType_2_FixedDigit: "二定位",
        LottoSelectionTypeGroup_2357: "和值（13,14）",
        LottoSelectionTypeGroup_2353: "和值（9,18）",
        SelectionType_Even: "双",
        SelectionType_2ndDigit: "十",
        LottoBetType_24051: "和尾 (百十)",
        LottoBetType_24021: "和尾 (百个)",
        BetType_3Digits_Triple: "豹子",
        LottoBetType_24011: "和尾 (十个)",
        LottoSelectionTypeGroup_23001: "和值 (二定位) (0-4, 14-18)",
        LottoBetType_21011: "组选六 (后三)||组选六 ",
        LottoBetType_1914: "合尾质合 (万百)",
        BetType_OddsEvens: "奇偶",
        CounterName_5: "加拿大",
        CounterName_4: "加拿大西部",
        ResultBall_Evens: "偶",
        CounterName_6: "马耳他",
        CounterName_1: "北京快乐8",
        CounterName_3: "澳洲ACTTAB",
        CounterName_2: "斯洛伐克",
        LottoSelectionTypeGroup_2356: "和值（12,15）",
        LottoBetType_1302: "三字 (中三)",
        LottoBetType_1303: "三字 (前三)",
        LottoBetType_1301: "百十个 | 三字",
        LottoBetType_1812: "万十 | 和尾大小",
        SelectionType_Small: "小",
        LottoSelectionTypeGroup_23571: "和值 (三定位) (13, 14)"
    },
    Message: {
        BS_BetNotAllowAfterDrawDate: "盘口已关闭。",
        BS_GameProfileMemberSettingItemNotFound: "无法找到会员设定。",
        Error_Captcha: "请输入正确的验证号码。",
        BS_ExceedMemberAccumulateBetAmount: "投注额已超出您最高投注额",
        BS_BetExceedProfileMaxBet: "投注额已超出最高限额。",
        BS_BetExeceedProfileMaxPayout: "可赢额已超出最高派彩金额。",
        BS_PauseAllBet: "彩期正在更新中。。。",
        BS_InactiveMember: "您的帐户已被冻结。",
        BS_GameProfileSettingNotFound: "无法找到投注设定。",
        BS_OddsDifferent: "赔率已更新。",
        Error_PageNotFound: "此页面不存在。 ",
        Layer_InProgress: "进行中。。。",
        BS_StakeMustGreaterThanZero: "投注额必须大于0。",
        BS_EstimatePayoutNotTally: "赔率已更新。",
        BS_InvalidOddsRange: "无法确认赔率。",
        BS_GameProfileSettingNotActive: "投注设定已被停用。",
        EnumError_INTEGRATION_PARTNER_GREATERTHANMAXBET: "投注额已超出最高限额。",
        BS_LessThanMemberMinBet: "投注额不能低于最低限额。",
        Error_InternalServerErrorHeader: "500 内部服务器错误",
        BS_MemberNotFound: "无法找到会员。",
        BS_InactiveCounter: "此游戏盘口已被停用。",
        BS_ExceedPartnerMemberPayout: "您已超过今天的赢输限额。请明天再来投注。",
        RecommendedBrowsers: "推荐浏览器为 <a href=&quot;http://windows.microsoft.com/zh-cn/internet-explorer/products/ie/home&quot; target=&quot;_blank&quot;>微软IE9<\/a>，<a href=&quot;http://www.google.com/chrome?hl=zh-CN&quot; target=&quot;_blank&quot;>谷歌Chrome<\/a>，<a href=&quot;http://firefox.com.cn/&quot; target=&quot;_blank&quot;>火狐Firefox<\/a> 以及 <a href=&quot;http://www.apple.com.cn/safari/download/&quot; target=&quot;_blank&quot;>苹果Safari<\/a>。",
        Error_NoPermission: "您没有权限访问此页面。",
        BS_CounterClosed: "盘口已关闭。",
        EnumError_INTEGRATION_PARTNER_MAXWINLOSSLIMITDAY: "您已超过今天的赢输限额。请明天再来投注。",
        BS_WrongSetting: "设定错误。",
        BS_ExceedPartnerMemberUplinePayout: "您的上线每日可输金额已超过，无法进行投注！",
        BS_ExceedAccumulatePayout: "此投注选项暂时无法受注。请稍后再试。",
        EnumError_INTEGRATION_INACTIVE_BU: "系统目前无法访问。<br /><br />请联系客服中心寻求帮助。",
        Error_SessionTimeOutHeader: "登入状态已无效",
        Maintenance_DateTimeFormat: "dd/MM/yyyy HH:mm",
        BS_CounterPaused: "系统正在更新彩期资料，请稍后。",
        Error_Login: "登入帐号或密码不正确。",
        ConfirmToClearAllWagers: "确认删除所有投注？",
        Layer_StopBetting: "停止下注",
        BS_NotAllowDuplicatePearlBallNumber: "您输入的珠仔号码已重叠。",
        Error_ClickToLogin_Format: "请点击<a href=&quot;{0}&quot; target=&quot;_top&quot; class=&quot;link-style3&quot;>这里<\/a>登录。",
        Error_NotAuthorized: "请先登录。",
        Layer_MarketIsClosed: "盘口已关闭",
        Error_ServerInternal: "由于技术错误，我们无法执行您的请求。",
        EnumError_OPA_User_MEMBER_CURRENCY_BU_NOT_SUPPORTED: "会员货币并不在营商可用货币选择里。",
        EnumError_INTEGRATION_PARTNER_UPLINEMAXLOSSLIMITDAY: "您的上线每日可输金额已超过，无法进行投注！",
        Maintenance_ToServeYou: "为了更好地为您服务，我们目前正在执行系统维护。<br />对所造成的不方便，我们深表歉意。",
        BS_DrawNotOpen: "彩期盘口已关闭。",
        BS_ExceedMarginControl: "投注已超出这期最高奖金",
        EnumError_INTEGRATION_INACTIVE_MEMBER: "您的帐号已被停用。",
        Layer_NextDrawSoon: "下一期即将开放投注。。。",
        TooManyWagers: "请勿在同一时间下超过 {0} 注",
        BS_NA: "下注失败",
        BS_Unknown: "下注失败",
        Layer_WaitingForDrawResult: "等待开奖。。。",
        Error_PageNotFoundHeader: "404 此页面不存在",
        BS_GameProfileBuSettingItemNotFound: "无法找到公司投注设定。",
        BS_ExceedPearlBallNumberRange: "请输入正确的珠仔号码。",
        Error_Forbidden: "您所在地区被禁止访问我们的网址。<br/><br/>给您造成不便，敬请谅解。",
        Error_KickOut: "您的登入状态已无效。",
        Error_SessionTimeOut: "您的登入状态已无效。<br/><br/>请重新打开快乐彩游戏会员端。",
        TT_Password: "密码至少6个字英文字母，只能在'a-z','A-Z','0-9', '!@#$%^&*().'的范围内",
        BS_StakeMustValidNumber: "请输入有效的数字。",
        Disclaimer: "所有交易的日期和时间记载是以GMT +08:00 (北京时间)为根据。",
        BS_InsufficientMemberBalance: "投注额超出您的帐户余额。",
        BS_InactiveBusinessUnit: "公司已被冻结。",
        BS_GreaterThanMemberMaxBet: "投注额已超出最高限额。",
        RecommendedResolution: "推荐分辨率为1280× 768及以上。",
        BS_GameProfileMultiplierNotFound: "无法找到投注设定。",
        BS_BetLessThanProfileMinBet: "投注额不能低于最低限额。",
        Error_AccessDeniedHeader: "403 访问被拒绝",
        BS_CounterNotOpen: "盘口已关闭。",
        EnumError_INTEGRATION_PARTNER_LESSTHANMINBET: "投注额不能低于最低限额。"
    },
    Text: {
        Title_BetTransactionDetails: "帐户历史详情",
        KickedOutTitle: "登出",
        Btn_Clear: "清除",
        Link_Statement: "帐户历史",
        Lbl_Hot: "热门",
        TH_DrawNo: "期号",
        Tab_BetTransaction: "下注详情",
        OK: "确定",
        WagerNo: "注单编号",
        Ball_5th: "万",
        Lbl_Draw: "期号",
        Cold: "冷门",
        Update: "修改",
        TT_GoToResultsPage: "打开开奖结果页面",
        NoMainLobbyURL: "网址不存在",
        PageTitleHome: "快乐彩",
        SelectAtLeastOnePearlBall: "请选择至少一个号码。",
        SessionTimeOut: "您的登入状态已无效。<br/><br/>请重新打开快乐彩游戏会员端。",
        Lbl_Drawing: "开奖中",
        Wager_2_numbers: "两个号码",
        NoRecordFound: "没有记录",
        TH_CounterDrawNo: "彩期详情",
        TotalBet: "注单总数",
        Ball: "彩球",
        PageTitleResults: "开奖结果",
        PlaceBetFailed: "下注失败。",
        TT_MoreLastBets: "打开下注状况",
        Refresh: "刷新",
        TH_Total: "总和",
        Btn_SkipForNext: "跳过开奖，<br />继续下一期投注",
        Lbl_To: "到",
        Btn_LaunceGameClient: "启动快乐彩客户端",
        Btn_Print: "打印",
        Hot: "热门",
        Title_OpenBets: "下注状况",
        TH_Date: "日期",
        Earth: "土",
        Lbl_Counter: "开彩国家",
        TT_Refresh: "刷新",
        Ball_2nd: "十",
        Lbl_UpcomingDraws: "开盘时间",
        BetSlip: "注单",
        PageTitleMainLobby: "大堂",
        PageTitleSingleCounter: "单一开彩国家",
        PleaseSelect3Number: "组六/组三/豹子",
        TT_GoToNextDrawNo: "转到下一期结果",
        Lbl_EstWinning: "可赢额",
        TH_BetType: "投注类型",
        Wager_1_numbers: "一个号码",
        TT_GoToThisCounter: "切换此游戏玩法界面",
        GameDrawResultVoidReason_NA: "N/A",
        Link_Rules: "规则说明",
        TransferIn: "转入",
        TH_TotalStake: "总计投注额",
        TH_No: "序号",
        Add: "加入",
        Btn_NextDraw: "下一期",
        Title_Results: "开奖结果",
        UpdatedSuccessfully: "修改成功。",
        EnterStakeAmount: "请输入投注金额。",
        TH_DateTime: "日期/时间",
        PageTitleStatementDetails: "帐户历史详情",
        PageTitleNotAuthorized: "登入状态已无效",
        Tab_Transfer: "转账",
        PleaseSelect2Number: "两码/对子",
        Lbl_UpcomingTournaments: "即将到来的比赛",
        PageTitleRules: "规则说明",
        ProductKeno: "快乐彩",
        TH_BetDetails: "投注详情",
        Title_Statement: "帐户历史",
        Btn_Last30Days: "过去30天",
        MemberStatusIsNotActive: "您的帐户已被停用。",
        Wager_3_numbers: "三个号码",
        BetResults: "开奖结果",
        ProductLotto: "时时彩",
        PageTitleStatement: "帐户历史",
        Lbl_Singles: "单式",
        TH_NoOfTransfer: "转账计数",
        Odd: "单",
        Link_Deposit: "存款",
        Lbl_TotalEstWinning: "总计可赢额",
        Btn_Close: "关闭",
        Btn_Yesterday: "昨天",
        MoreBetTypes: "更多投注类型",
        Tie: "和",
        Up: "上",
        Title_ManualInput: "手动输入",
        Title_ImportantAnnouncement: "重要公告",
        Btn_LastMonth: "上月",
        PageTitleError: "500 内部服务器错误",
        Lbl_MinBet: "最低限额",
        TokenSizeNotFound: "筹码大小不存在. 请再次储存.",
        Link_Profile: "会员资料",
        TT_Close: "关闭",
        Btn_More: "更多",
        Btn_Last8Days: "过去8天",
        Lbl_NextDraw: "下一期",
        TH_TransferIn: "转入",
        Btn_Refresh: "刷新",
        DateFormat: "yy/mm/dd",
        Link_OfficialSite: "官方网站",
        TH_Status: "状况",
        OfficialResultSuspended: "官方网站没开奖",
        Off: "关",
        OfficialEventCancelled: "彩期取消",
        Title_StatementDetails: "帐户历史详情",
        TH_Announcement: "公告栏",
        Down: "下",
        TransferOut: "转出",
        Odds: "奇",
        Lbl_Total: "总计",
        Close: "关闭",
        Btn_Cancel: "取消",
        Link_Setting: "设定",
        Ball_1st: "个",
        Lbl_321_Ball: "百十个彩球",
        Lbl_Numbers: "号码",
        PageTitleSystemMaintenance: "系统维护",
        Btn_Back: "返回",
        Home: "主页",
        TH_TransactionType: "交易类别",
        Total810: "和值 810",
        PlacedBetSuccessfully: "下注成功。",
        TT_WinningNumbers: "中奖号码",
        Link_BackToLobby: "返回大厅",
        TT_SwitchTrendView: "切换路子视图",
        Link_Results: "开奖结果",
        TH_Stake: "投注额",
        Wager_4_numbers: "四个号码",
        Btn_PlaceBet: "下注",
        Lbl_Date: "日期",
        TH_Number: "序号",
        GameDrawResultVoidReason_OfficialResultSuspended: "官方网站没开奖",
        Lbl_TokenSize: "筹码大小 : ",
        TH_RefNo: "参考号",
        Even: "双",
        Big: "大",
        Btn_Today: "今天",
        PleaseEnterNumber: "请输入有效的数字。",
        TT_SwitchStatisticsView: "切换数据分析",
        Digit: "一定位单号",
        Link_Win: "赢",
        PageTitleForbidden: "403 访问被拒绝",
        Wager_5_numbers: "五个号码",
        Link_OpenBets: "下注状况",
        Lbl_Cold: "冷门",
        Btn_ThisMonth: "本月",
        Lbl_LoginName: "登录名 : ",
        PleaseSelect1Number: "定位",
        Lbl_H_C: "热/冷",
        Lbl_Stake: "投注额",
        SureToPlaceBet: "您确定要下注吗？",
        Ball_4th: "千",
        Error: "错误",
        Lbl_Closed: "盘口已关闭！",
        Lbl_DateRange: "日期范围",
        Lbl_DrawNo: "受注期号",
        Lbl_NA: "N/A",
        TT_GoToPreviousDrawNo: "转到上一期结果",
        Wood: "木",
        Lbl_MaxBet: "最高限额",
        TH_Amount: "金额",
        Lbl_Bet: "下注",
        Water: "水",
        TH_Previous: "上一期",
        TT_GoToLastDrawNo: "转到最后开奖结果",
        TH_Market: "开彩国家",
        TH_NoOfBet: "投注计数",
        TH_Results: "开奖结果",
        Lbl_CurrentDrawResult: "即将开奖彩期",
        Small: "小",
        PageTitleAnnouncements: "公告栏",
        GameDrawResultVoidReason_OfficialEventCancelled: "彩期取消",
        BetDetails: "投注详情",
        Title_TransferDetails: "转账明细",
        Btn_Confirm: "确定",
        LimitationOfTokenSize: "如果你要自择筹码大小，至少选择一个和最多四个.",
        Gold: "金",
        Link_Statistics: "统计",
        Btn_Login: "登录",
        Lbl_Captcha: "验证码",
        Title_Announcements: "公告栏",
        ResultNotFound: "无法找到开奖结果。",
        Lbl_GrandTotal: "总计",
        PageTitleNotFound: "404 此页面不存在",
        Lbl_Last10Bets: "最后10个投注",
        Btn_Save: "储存",
        Lbl_Ticket: "注单编号",
        Link_Print: "打印",
        TH_EstimatedWinning: "可赢额",
        PageTitleProfiles: "会员资料",
        RefreshSecond: "秒",
        Bet: "下注",
        Link_Announcements: "公告栏",
        Btn_Search: "查询",
        TH_CountdownTime: "倒数时间",
        StakeAmountMoreThanBalance: "您的余额不足。",
        TT_GoToSingleView: "进入单一游戏玩法界面",
        Pick: "选 {0}",
        Ball_3rd: "百",
        Link_Lose: "输",
        SystemPickMax5Picks: "最多只能选择5个号码。",
        TH_DrawNumber: "期号",
        Evens: "偶",
        Btn_Ok: "确定",
        Cancel: "取消",
        TH_Selection: "选项",
        StakeAmountLessThanMinSingleBetAmount: "投注额不能低于最低限额。",
        Lbl_UserName: "登入帐号",
        Fire: "火",
        Link_LogOut: "登出",
        TH_Next: "下一期",
        Lbl_Password: "密码",
        Lbl_Hit: "中",
        TH_TransferOut: "转出",
        Lbl_Area: "开彩地区",
        StakeAmountMoreThanMaxSingleBetAmount: "投注额已超出最高限额。",
        Remove: "删除",
        Btn_Bet: "下注",
        NoLogOutURL: "登出网址不存在",
        NoBetAllowedLessThanEqualOddsOne: "无法确认赔率。",
        TH_TotalWinLoss: "总计赢/输",
        SystemPick: "自动挑选",
        TH_WinLoss: "赢/输",
        NoBalance: "您的余额不足。",
        AddToBetSlip: "加入注单",
        Title_BetSlip: "注单",
        TT_BackToMainLobby: "返回多游戏玩法界面",
        On: "开",
        Link_Refund: "退还",
        Lbl_MaintenanceSchedule: "维护时间",
        PageTitleOpenBets: "下注状况"
    }
}