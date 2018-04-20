! function (e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    t.m = e, t.c = n, t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "/", t(t.s = 47)
}([function (e, t) {
    var n;
    n = function () {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (n = window)
    }
    e.exports = n
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function (e, t, n) {
    n(48), n(49), n(50), n(51), n(52), n(53), n(54), n(55), n(56), n(57), n(58), n(59), n(60), n(61), n(62), n(63), n(64), n(65), n(66), n(67), n(68), n(69), n(70), n(71), n(72), n(73), n(74), e.exports = n(75)
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t) {
            var n = {
                "en-gb": "{0} dd, yyyy",
                "id-id": "dd {0} yyyy",
                "km-kh": "dd {0} yyyy",
                "ja-jp": "yyyy年 {0}dd日",
                "ko-kr": "yyyy {0} dd",
                "th-th": "dd {0} yyyy",
                "vi-vn": "dd {0} yyyy",
                "zh-cn": "yyyy年 {0}dd日",
                "pt-br": "dd {0} yyyy"
            };
            return function (r, i, o) {
                r = r || "", i = i || uv.geod.timezone;
                var a = e("date")(r, n[gv.lan] + (o ? " HH:mm" : ""), i),
                    s = e("quicki18n")(new Date(Number(r)).getMonth(), "monthNames"),
                    l = t.instant(s);
                return a.replace("{0}", l)
            }
        }

        function t(e, t) {
            return function (t, n, r) {
                var i = "";
                t = t || [], n = n || "", r = r || 0;
                var o = new RegExp(gv.domains.oldContents, "ig");
                try {
                    var a = "" == n ? t : e("filter")(t, {
                        key: n
                    }, !0)[0];
                    i = (e("filter")(a.lanVals, {
                        LangCode: gv.lan
                    }, !0)[0] || e("filter")(a.lanVals, {
                        LangCode: "en-gb"
                    }, !0)[0] || a.lanVals[0]).Value
                } catch (e) {}
                return i.replace(o, gv.domains.content)
            }
        }

        function n(e) {
            return function (t, n) {
                var r = "";
                t = t || [], n = n || "";
                try {
                    r = (e("filter")(t, {
                        code: gv.lan
                    }, !0)[0] || e("filter")(t, {
                        code: "en-gb"
                    }, !0)[0] || {})[n]
                } catch (e) {}
                return r
            }
        }

        function r(e) {
            return function (t) {
                return e.trustAsResourceUrl(t)
            }
        }

        function i(e) {
            return function (t, n) {
                var r = Math.pow(10, n),
                    i = t >= 0 ? 1 : -1;
                return i * Math.floor(i * e.mul(t, r)) / r
            }
        }

        function o(e) {
            return {
                openMenu: function (t) {
                    e.open({
                        placement: "right",
                        templateUrl: "/cdn1103/resource/templates/common/quickmenu.tpl.html",
                        controller: "quickMenuCtrl",
                        size: "lg",
                        openedClass: "modal-aside-open",
                        resolve: {
                            selectedMenu: function () {
                                return t
                            }
                        }
                    })
                }
            }
        }

        function a(e, t, n, r, i, o) {
            return {
                paramsMethod: ["GET", "JSONP"],
                fetch: function (r, a, s, l, c) {
                    var u = {};
                    c = c || !0, l = l || 30, angular.copy(s, u);
                    var d = (u = u || {}).guId || "";
                    "JSONP" == r && (u.callback = "JSON_CALLBACK");
                    var m, g = -1 == this.paramsMethod.indexOf(r) ? {
                            method: r,
                            url: a,
                            data: u
                        } : {
                            method: r,
                            url: a,
                            params: u
                        },
                        f = e(g),
                        p = t.defer(),
                        v = this.dialog;
                    return "" != d && (n.ajaxStackObj[d] = !0, delete u.guId, m = i(function () {
                        n.ajaxStackObj[d] && (p.resolve(), c) && (n.msg = {
                            title: o.instant("txtCommonHelp"),
                            content: o.instant("msgCommonSystemError")
                        }, v(n).result.then(function () {
                            location.reload()
                        }))
                    }, 1e3 * l)), f.success(function (e) {
                        p.resolve(e), d && (delete n.ajaxStackObj[d], i.cancel(m))
                    }).error(function (e) {
                        p.reject(e), d && (delete n.ajaxStackObj[d], i.cancel(m))
                    }), p.promise
                },
                dialog: function (e, t) {
                    return t = t || {
                        templateUrl: "/cdn1103/resource/templates/modal/messageDialog.html",
                        controller: "modalInstanceCtrl"
                    }, r.open({
                        scope: e,
                        size: t.size,
                        animation: t.animation,
                        templateUrl: t.templateUrl,
                        controller: t.controller,
                        windowClass: t.windowClass || "dflt-modal",
                        backdrop: !angular.isDefined(t.backdrop) || t.backdrop,
                        resolve: {
                            items: function () {
                                return t.items
                            }
                        }
                    })
                },
                mi: function (e, t) {
                    t = t || 15e3, n.miList.unshift(e), i(function () {
                        e.fade = !0
                    }, t)
                }
            }
        }

        function s(e, t, n, r, i, o, a, s, l, c) {
            function u() {
                i.close("close");
                var e = $("body").scrollTop();
                setTimeout("$('body').scrollTop(" + e + ")", 100)
            }
            t.onInit = function () {
                t.paymentMaintenance.pch = gv.modules.filter(function (e) {
                    return 203 == e.id && 0 != e.status
                }).length > 0, t.paymentMaintenance.transfer = gv.modules.filter(function (e) {
                    return 202 == e.id && 0 != e.status
                }).length > 0, t.paymentUrl.deposit = t.paymentMaintenance.pch ? "#" : "/" + gv.lan + "/my-account/banking/deposit", t.paymentUrl.withdrawal = t.paymentMaintenance.pch ? "#" : "/" + gv.lan + "/my-account/banking/withdrawal", t.paymentUrl.transfer = t.paymentMaintenance.transfer ? "#" : "/" + gv.lan + "/my-account/banking/transfer"
            }, t.close = u, t.back = function () {
                if (0 !== d.length) {
                    var e = d.pop();
                    t.selectedMenu = e.history, t.selectedTitle = e.title
                } else u()
            }, t.choose = function (e, n) {
                d.push({
                    history: t.selectedMenu,
                    title: t.selectedTitle
                }), t.selectedMenu = e, t.selectedTitle = n ? r.trustAsHtml(a.instant(n)) : "901" === e ? r.trustAsHtml(gv.language.display) : ""
            }, t.logout = function () {
                o.fetch("POST", "/service/userapi/logout").then(function (e) {
                    localStorage.removeItem("recommendDomain"), location.href = e.redirectUrl
                })
            }, t.getBalance = c.refreshBalance, t.paymentMaintenance = {
                pch: !1,
                transfer: !1
            }, t.paymentUrl = {
                deposit: "",
                withdrawal: "",
                transfer: ""
            };
            var d = [];
            void 0 !== s && (t.selectedMenu = s), void 0 !== t.selectedMenu || uv.sessionD.login || (t.selectedMenu = "001"), void 0 === t.selectedMenu && uv.sessionD.login && (t.selectedMenu = "101"), "901" === t.selectedMenu && switchLanguage()
        }

        function l(e, t, n, r, i, o, a, s) {
            function l() {
                var t = n("attrsFilter")(gv.prods, "allows", uv.pd.r, !0);
                t = n("filter")(t, function (e) {
                    return 0 == uv.sessionD.disableProds.length || -1 == uv.sessionD.disableProds.indexOf(e.index)
                }, !0), !0 === uv.sessionD.isEzdomain && gv.modules.forEach(function (e) {
                    e.status = 0
                }), t.forEach(function (e) {
                    e.isMaintenance = n("filter")(gv.modules, function (t) {
                        return t.id == e.index && 0 != t.status
                    }).length > 0
                }), e.restRegions = n("filter")(gv.regs, {
                    code: "!" + uv.pd.r
                }), e.currRegion = n("filter")(gv.regs, {
                    code: uv.pd.r
                }), e.availableProds = n("filter")(t, function (e) {
                    return null != e.regexPath
                }), e.availableRules = n("filter")(t, function (e) {
                    return null != e.regexPath && "" != e.regexPath
                }), e.availableNews = n("filter")(t, function (e) {
                    return 1 == e.isNews
                });
                var r = n("filter")(gv.emails, function (e) {
                    return "CS" == e.accountCategory
                });
                1 == r.length && (e.conditEmails = n("filter")(r[0].group, function (e) {
                    return -1 != e.supportRegs.indexOf(uv.pd.r) && -1 != e.supportLans.indexOf(gv.lan)
                }) || "");
                var i = -1 != location.pathname.indexOf("user/login"),
                    o = parseUri(i ? document.referrer || location.href : location.href),
                    a = /asia|multiprogramme|programme|sports/.test(o.path) ? "sports" : o.path.split("/").length > 2 ? o.path.split("/")[2] : "home",
                    l = n("filter")(t, function (e) {
                        return null != e.regexPath && "" !== e.regexPath && new RegExp(e.regexPath).test(a)
                    }, !0);
                a = l.length > 0 ? l[0].name : "home", gv.prodName = 1 == n("filter")(e.availableRules, {
                    name: a
                }, !0).length ? a : "home", e.cooperativeSet.sponsor = n("attrsFilter")(gv.cooperativeSet.sponsor.partners, "allows", uv.geod.country, !0), e.cooperativeSet.paymentMethod = n("attrsFilter")(gv.cooperativeSet.paymentMethod.partners, "allows", uv.pd.r, !0), e.cooperativeSet.socialMedia = n("attrsFilter")(gv.cooperativeSet.socialMedia.partners, "allows", uv.pd.r, !0), angular.forEach(e.cooperativeSet.socialMedia, function (e) {
                    var t = n("filter")(s[e.name], function (e) {
                        return -1 != e.allow.indexOf(uv.pd.r) || "default" == e.allow
                    }, !0);
                    if (s[e.name] && t.length > 0) {
                        var r = e.partnerUrl.lastIndexOf("/") == e.partnerUrl.length - 1;
                        e.partnerUrl = r ? e.partnerUrl + t[0].account : e.partnerUrl
                    }
                });
                var c = n("attrsFilter")(gv.cooperativeSet.responsibleGaming.licenses, "prods", gv.prodName, !0);
                e.cooperativeSet.responsibleGaming = n("attrsFilter")(c, "allows", uv.pd.r, !0);
                var u = n("attrsFilter")(gv.cooperativeSet.securityTrust.licenses, "prods", gv.prodName, !0);
                e.cooperativeSet.securityTrust = n("attrsFilter")(u, "allows", uv.pd.r, !0);
                var d = n("attrsFilter")(gv.cooperativeSet.issueLicenses.licenses, "prods", gv.prodName, !0);
                e.cooperativeSet.issueLicenses = n("attrsFilter")(d, "allows", uv.pd.r, !0)
            }

            function c() {
                var e = {
                    isLogin: uv.sessionD.login,
                    pageIndex: gv.pageIndex,
                    isMaintenance: 0 != gv.pageStatus
                };
                i.fetch("POST", "/service/healthapi/needrefresh", e).then(function (e) {
                    uv.sessionD.ssid = e.token, e.kickoff ? location.replace("/" + gv.lan) : e.needRefresh && location.reload()
                }, function (e) {
                    location.replace("/" + gv.lan)
                })
            }
            e.global = gv, e.client = uv, e.ajaxStackObj = {}, e.availableProds = [], e.miList = [], e.gameBackground = "", e.cooperativeSet = {
                sponsor: [],
                paymentMethod: [],
                responsibleGaming: [],
                socialMedia: [],
                issueLicenses: [],
                securityTrust: []
            }, e.switchRegion = function (n, r) {
                var o = {
                    r: n || ""
                };
                i.fetch("POST", "/service/userapi/setpreferences", o).then(function (n) {
                    e.client.pd = n, t.putObject("prefer", n, {
                        path: "/"
                    }), window.location = r
                }), event.stopPropagation(), event.preventDefault()
            }, e.translated = function (e) {
                return n("translate")(e.value).toString()
            }, e.isLoginPage = function () {
                return location.pathname.indexOf("/user/login") > -1
            }, e.isDisplayLoginLayout = function () {
                return (void 0 === location.pathname.split("/")[2] || "" === location.pathname.split("/")[2]) && !uv.sessionD.login && !0 === uv.dlg.dLoginLayer
            }, e.msgCounter = {
                notifi: 0,
                inbox: 0
            }, e.showLogin = void 0 === location.pathname.split("/")[2] || "" === location.pathname.split("/")[2];
            var u = new MobileDetect(window.navigator.userAgent);
            e.client.sessionD.deviceOS = function (e) {
                    switch (e) {
                        case "iOS":
                            return "iOS";
                        case "AndroidOS":
                            return "Android";
                        default:
                            return "HTML5"
                    }
                }(u.os()), e.client.sessionD.apsChannelId = e.global.apsChannelId, e.msg = {}, 503 != gv.pageStatus && (setInterval(c, 3e4), t.putObject("prefer", uv.pd, {
                    path: "/",
                    expires: (new Date).addDays(30)
                })),
                function () {
                    var e = location.pathname.split("/")[1],
                        t = gv.lans.filter(function (t) {
                            return t.value === e
                        }),
                        n = t.length > 0 ? t[0] : function () {
                            var e = navigator.language.substr(0, 2).toLowerCase(),
                                t = gv.lans.filter(function (t) {
                                    return -1 != t.value.indexOf(e)
                                });
                            return 0 != t.length ? t[0] : gv.lans[0]
                        }();
                    gv.language = n, gv.lan = n.value
                }(),
                function () {
                    if (!uv.sessionD.login) {
                        uv.geod.utcoffset = (new Date).getTimezoneOffset();
                        var e = n("date")(1e3 * Math.abs(uv.geod.utcoffset), "mm:ss", "+00:00");
                        uv.geod.timezone = uv.geod.utcoffset > 0 ? "-" + e : "+" + e
                    }
                }(),
                function () {
                    var t = getFromSearch("_a");
                    if (uv.sessionD.loginId && t) switch (t) {
                        case "0001":
                            window.location.href = "/" + gv.lan + "/user/changepassword?type=login";
                            break;
                        default:
                            e.msg = {
                                title: r.instant("txtBtnLogin"),
                                content: r.instant("msgLoginError" + t)
                            }, i.dialog(e), i.fetch("POST", "/service/userapi/logout"), localStorage.removeItem("recommendDomain")
                    }
                }(), l(),
                function () {
                    function t(e) {
                        return !e.disallow.some(function (e) {
                            return e === uv.pd.r
                        })
                    }
                    var r = [];
                    for (var i in gv.generals) {
                        var o = gv.generals[i],
                            a = o.partners.filter(t).map(function (e) {
                                return e.translateKey = n("quicki18n")(e.id, "partnerNames"), e.isMaintenance = gv.modules.some(function (t) {
                                    var n = t.id === e.id + o.Id,
                                        r = 0 !== t.status;
                                    return n && r
                                }), e.productName = i, e
                            });
                        r = r.concat(a)
                    }
                    e.availablePartners = r
                }(),
                function () {
                    var t = location.pathname.split("/").length > 2 ? location.pathname.split("/")[2].toLowerCase() : "home";
                    e.hiddenUserpanel = new RegExp("/|error|forbidden|not-acceptable/g").test(t) || 503 == gv.pageStatus
                }(), a(), o.init(),
                function () {
                    e.displaylayout = {
                        header: !1
                    };
                    var t = location.pathname.split("/").length > 2 && "" !== location.pathname.split("/")[2] ? location.pathname.split("/")[2] : " ";
                    n("filter")(e.availableProds, function (e) {
                        return -1 != e.name.indexOf(t)
                    }).length > 0 && (e.displaylayout.header = !0)
                }(), e.$watch("client.pd", function () {
                    l()
                })
        }

        function c(e, t) {
            e.close = function () {
                t.dismiss("cancel")
            }, e.confirm = function (n) {
                t.close(n), void 0 !== e.msg.redirect && (window.location.href = "/" + gv.lan + e.msg.redirect)
            }
        }

        function u() {
            var e = location.pathname.split("/")[2] || "home",
                t = "demo" == (e = "sports" == gv.prodName ? gv.prodName : e) ? getFromSearch("productIndex") : gv.generals[e] ? gv.generals[e].Id : 100,
                n = "demo" == e ? 1 * getFromSearch("countryId") : 1 * uv.pd.cid,
                r = "demo" == e ? getFromSearch("date") : "",
                i = window.location.pathname.split("/");
            return {
                countryId: n,
                pageKey: t,
                simDate: r,
                pageName: i[i.length - 1] || "home"
            }
        }
        angular.module("starApp", ["pascalprecht.translate", "ngCookies", "ui.bootstrap", "ngSanitize", "flow", "infinite-scroll", "angular.filter", "ngAside", "ui.checkbox"]).factory("dataService", a).factory("quickMenuService", o).factory("floatCalculator", function () {
            var e = function (e, t) {
                var n = 0,
                    r = e.toString(),
                    i = t.toString();
                try {
                    n += r.split(".")[1].length
                } catch (e) {}
                try {
                    n += i.split(".")[1].length
                } catch (e) {}
                return Number(r.replace(".", "")) * Number(i.replace(".", "")) / Math.pow(10, n)
            };
            return {
                add: function (t, n) {
                    var r, i, o;
                    try {
                        r = t.toString().split(".")[1].length
                    } catch (e) {
                        r = 0
                    }
                    try {
                        i = n.toString().split(".")[1].length
                    } catch (e) {
                        i = 0
                    }
                    return o = Math.pow(10, Math.max(r, i)), (e(t, o) + e(n, o)) / o
                },
                minus: function (e, t) {
                    var n, r, i, o;
                    try {
                        n = e.toString().split(".")[1].length
                    } catch (e) {
                        n = 0
                    }
                    try {
                        r = t.toString().split(".")[1].length
                    } catch (e) {
                        r = 0
                    }
                    return i = Math.pow(10, Math.max(n, r)), o = n >= r ? n : r, ((e * i - t * i) / i).toFixed(o)
                },
                mul: e,
                div: function (e, t) {
                    var n, r, i = 0,
                        o = 0;
                    try {
                        i = e.toString().split(".")[1].length
                    } catch (e) {}
                    try {
                        o = t.toString().split(".")[1].length
                    } catch (e) {}
                    return n = Number(e.toString().replace(".", "")), r = Number(t.toString().replace(".", "")), n / r * Math.pow(10, o - i)
                }
            }
        }).factory("piperSetting", u).constant("socialMedia", {
            youtube: [{
                allow: "Brazil",
                account: "188BETBRASIL"
            }, {
                allow: "UK,ROE",
                account: "188BET"
            }, {
                allow: "Vietnam",
                account: "c/188BETVietNamofficial"
            }, {
                allow: "default",
                account: "188BETASIA"
            }],
            twitter: [{
                allow: "Brazil",
                account: "188betbrasil"
            }, {
                allow: "Indonesia",
                account: "188BETINDONESIA"
            }, {
                allow: "default",
                account: "188BET"
            }],
            facebook: [{
                allow: "Korea,Malaysia,ROA,ROW",
                account: "ASIA188BET"
            }, {
                allow: "Brazil",
                account: "188BETBRASIL"
            }, {
                allow: "UK,ROE",
                account: "188BETUK"
            }, {
                allow: "Japan",
                account: "188BETJapan"
            }, {
                allow: "Cambodia",
                account: "188BETCAMBODIA"
            }, {
                allow: "Indonesia",
                account: "groups/683781788490315"
            }, {
                allow: "Thailand",
                account: "188BETThailandOfficial"
            }, {
                allow: "Vietnam",
                account: "VN188BET"
            }, {
                allow: "default",
                account: "188BET"
            }]
        }).config(["$translateProvider", "$sceDelegateProvider", "$provide", "$compileProvider", function (e, t, n, r) {
            n.decorator("$browser", ["$delegate", function (e) {
                return e.onUrlChange = function () {}, e.url = function () {
                    return ""
                }, e
            }]), t.resourceUrlWhitelist(["self", gv.domains.content + "**"]), e.useStaticFilesLoader({
                prefix: gv.domains.cdn + "/cdn1103/resource/i18n/",
                suffix: ".json?rv=" + gv.rv
            }), e.preferredLanguage(gv.lan), e.useSanitizeValueStrategy("escaped"), r.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|itms-services):/)
        }]).run(l).filter("attrsFilter", function () {
            return function (e, t, n, r) {
                r = r || !1;
                var i = [];
                return angular.forEach(e, function (e) {
                    if (!angular.isUndefined(e[t])) {
                        var o = angular.isArray(e[t]) ? e[t] : e[t].split(",").map(function (e) {
                                return e
                            }),
                            a = -1 != o.indexOf("*") || -1 != o.indexOf(n);
                        (r && a || !r && !a) && i.push(e)
                    }
                }), i
            }
        }).filter("getResource", t).filter("getLocalizations", n).filter("quicki18n", function () {
            var e = {
                monthNames: ["txtComStJan", "txtComStFeb", "txtComStMar", "txtComStApr", "txtComStMay", "txtComStJun", "txtComStJul", "txtComStAug", "txtComStSep", "txtComStOct", "txtComStNov", "txtComStDec"],
                prodNames: {
                    1203: "navEurocupRoot",
                    1200: "navSbkRoot",
                    2200: "navRacingRoot",
                    3200: "navESportsRoot",
                    4200: "navCsnRoot",
                    5200: "navLiveCsnRoot",
                    8200: "navLottoRoot",
                    6200: "navPokerRoot",
                    10200: "navPromoRoot",
                    10204: "navMobileRoot",
                    12200: "navVirtualRoot"
                },
                partnerNames: {
                    3: "titLivsCsnVipsuite",
                    6: "titLivsCsnImperialSuite",
                    9: "titLivsCsnGrandSuite",
                    11: "titLivsCsnRoyalSuite",
                    21: "txtComEuroLiveDealer",
                    23: "txt188BETGames",
                    33: "txt188BETGames",
                    25: "titLivsCsnAsiaGaming"
                }
            };
            return function (t, n) {
                var r;
                switch (parseInt(t)) {
                    case NaN:
                        r = t;
                        break;
                    default:
                        r = e[n][t]
                }
                return r
            }
        }).filter("forloopRange", function () {
            return function (e) {
                var t = [];
                if (e.length < 1) return t;
                for (var n = 2 === e.length ? parseInt(e[1]) : parseInt(e[0]), r = 2 === e.length ? parseInt(e[0]) : 1; r <= n; r++) t.push(r);
                return t
            }
        }).filter("navCollapse", function () {
            return function (e, t, n, r, i) {
                e = e || [], i = i || !1, t = t || 0, n = n || 0, r = r || 1;
                var o = Math.floor((t - n) / r),
                    a = e.slice(0, o - 1),
                    s = e.slice(o - 1, e.length);
                return i ? s : a
            }
        }).filter("localizedDate", e).filter("trustUrl", r).filter("floorNumber", i).filter("gCdnReplace", function () {
            return function (e) {
                e = e || "";
                var t = new RegExp(gv.domains.oldContents, "ig");
                return e.replace(t, gv.domains.content)
            }
        }).filter("availableParentPartners", function () {
            return function (e, t) {
                return e.filter(function (e) {
                    return e.attrs.ParentPartnerId && (0 == e.attrs.ParentPartnerId.length || 1 == e.attrs.ParentPartnerId.length && "" == e.attrs.ParentPartnerId) && e.productName === t
                })
            }
        }).filter("gameFilterByCategory", function () {
            return function (e, t) {
                return e.filter(function (e) {
                    return e.parentPartnerId == t
                })
            }
        }).filter("swapCurrencySymbol", function () {
            return function (e) {
                var t = e;
                if ("BRL" == uv.geod.cc)
                    if (e.toString().contains(".")) {
                        var n = e.toString().split(".");
                        t = n[0].replace(new RegExp(",", "g"), ".") + "," + n[1]
                    } else t = e.toString().replace(new RegExp(",", "g"), ".");
                return t
            }
        }).controller("modalInstanceCtrl", c).controller("quickMenuCtrl", s), angular.module("infinite-scroll").value("THROTTLE_MILLISECONDS", 3e4), t.$inject = ["$filter", "$sce"], e.$inject = ["$filter", "$translate"], n.$inject = ["$filter"], l.$inject = ["$rootScope", "$cookies", "$filter", "$translate", "dataService", "checkService", "signalRHub", "socialMedia"], r.$inject = ["$sce"], a.$inject = ["$http", "$q", "$rootScope", "$modal", "$timeout", "$translate"], i.$inject = ["floatCalculator"], o.$inject = ["$aside"], c.$inject = ["$scope", "$modalInstance"], s.$inject = ["$rootScope", "$scope", "$window", "$sce", "$modalInstance", "dataService", "$translate", "selectedMenu", "checkService", "userService"], u.$inject = []
    }()
}, function (e, t) {
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    ! function () {
        "use strict";

        function e(e, t, n, r) {
            e.switchLang = function (e) {
                var t = window.location.pathname.replace(gv.lan, e);
                window.location.href = t
            }, e.indexMenu = function (e) {
                return 0 == window.location.pathname.indexOf("/" + gv.lan + "/" + e)
            }, e.checkAvailable = function (e) {
                var n = t("filter")(gv.prods, {
                        index: e
                    }, !0)[0],
                    r = -1 != n.allows.indexOf("*") || -1 != n.allows.indexOf(uv.pd.r),
                    i = -1 != n.forbiddens.indexOf(uv.geod.cc);
                return r && !i
            }, e.openMenu = n.openMenu, r.getMsgCounter()
        }

        function t(e, t, n) {
            e.filterConitidion = function (e) {
                return t("filter")(gv.prods, {
                    index: prodIndex
                }, !0).length > 0
            }, e.openMenu = n.openMenu, e.copyrightYear = (new Date).getFullYear()
        }

        function r(e, t) {
            function n() {
                var n = "undefined" != typeof errorContentPath ? "/" + gv.lan + "/" + errorContentPath : location.pathname; - 1 === n.indexOf("install-ios-steps") && -1 === n.indexOf("install-android-steps") || (is_weixin() && (n = "/" + gv.lan + "/mobile/wechat-error", $("header").css("display", "none"), $("footer").css("display", "none")), t.addClass("how-2-install-ios-content"));
                var i = location.pathname.split("/");
                e.widget.selectedCatgory = i.length > 3 ? i[3] : "sports", e.contentUrl = gv.domains.content + r + n + ".html" + radomVersionNo()
            }
            e.onInit = n, e.contentUrl = "";
            var r = "UK" != uv.pd.r ? "/MB" : "/UKMB";
            e.sbkbettingRulesUrl = gv.domains.content + r + "/" + gv.lan + "/rules/sports/bettingRules.html" + contentsVersionNo(), e.mahjongkbettingRulesUrl = gv.domains.content + r + "/" + gv.lan + "/rules/mahjong/bettingRules.html" + contentsVersionNo(), e.widget = {
                selectedCatgory: ""
            }, n(), $("head #webteamstyle").prop("href", gv.domains.content + "/components/webteam/webteam.css" + contentsVersionNo())
        }

        function i(e, t, n) {
            e.onInit = function () {
                if ("" != o) switch (gv.pageIndex = o, 503 != gv.pageStatus && (gv.pageStatus = 1 == s.length ? s[0].status : 0), gv.pageStatus) {
                    case 0:
                        e.module.guId = getGuid();
                        var t = {
                            guId: e.module.guId,
                            productIndex: 1 * o,
                            languageId: 1 * gv.language.index,
                            countryId: 1 * a
                        };
                        n.fetch("JSONP", gv.domains.piper, t).then(function (t) {
                            e.content = t.content
                        });
                        break;
                    default:
                        var r = gv.lan + "/" + gv.prodName,
                            i = gv.domains.content + "/MB/" + r + ".html" + contentsVersionNo();
                        n.fetch("GET", i).then(function (t) {
                            e.content = t, e.module.effectiveTo = s[0].effectiveTo
                        })
                }
            }, e.module = {
                effectiveTo: 0
            };
            var r = location.pathname.split("/"),
                i = void 0 !== r[2] && "" != r[2] ? r[2] : "home",
                o = "demo" == i ? getFromSearch("productIndex") : gv.generals[i] ? gv.generals[i].Id : 0,
                a = "demo" == i ? getFromSearch("countryId") : uv.pd.cid,
                s = t("filter")(gv.modules, {
                    id: o
                }, !0)
        }

        function o(e, t) {
            e.close = function () {
                uv.dlg.dLoginLayer = !1, t.putObject("dlg", uv.dlg, {
                    path: "/",
                    expires: (new Date).addDays(7)
                })
            }
        }

        function a(e, t) {
            var n = "";
            n = e.videoUrl, e.videoSrc = t.trustAsResourceUrl(n)
        }
        angular.module("starApp").controller("headerCtrl", e).controller("footerCtrl", t).controller("staticContentCtrl", r).controller("piperSubcriberCtrl", i).controller("loginLayerCtrl", o).controller("videoModalCtrl", a).directive("autoWidth", [function () {
            return {
                scope: {
                    itemArray: "=",
                    restWidth: "=",
                    itemWidth: "="
                },
                restrict: "A",
                link: function (e, t) {
                    e.dataSet = {
                        originalItem: [],
                        collapseItem: []
                    }, e.itemWidth = e.itemWidth || 30;
                    var n = $(t).parent().width() - (e.restWidth || 0),
                        r = Math.floor(n / e.itemWidth);
                    e.dataSet.originalItem = e.itemArray.slice(0, r - 1), e.dataSet.collapseItem = e.itemArray.slice(r, e.itemArray.length - 1)
                }
            }
        }]).directive("resizingFrame", ["$window", function (e) {
            return {
                restrict: "A",
                link: function (t, n) {
                    function r() {
                        $(n).height(e.innerHeight - 294)
                    }
                    r(), angular.element(e).bind("resize", r)
                }
            }
        }]).directive("msHeader", [function () {
            return {
                restrict: "A",
                controller: "headerCtrl",
                templateUrl: "/cdn1103/resource/templates/common/header.tpl.html"
            }
        }]).directive("msFooter", [function () {
            return {
                restrict: "A",
                controller: "footerCtrl",
                templateUrl: "/cdn1103/resource/templates/common/footer.tpl.html"
            }
        }]).directive("starClock", ["dateFilter", "$rootScope", function (e, t) {
            return function (n, r, i) {
                function o() {
                    r.text(e(new Date, a, t.client.geod.timezone.replace(":", "")) + " (GMT" + t.client.geod.timezone + ")")
                }
                var a;
                n.$watch(i.format, function (e) {
                    a = e, o()
                }), window.setInterval(o, 1e3)
            }
        }]).directive("countdownTimer", ["$interval", function (e) {
            return {
                restrict: "A",
                scope: {
                    countdownTimer: "="
                },
                transclude: !0,
                link: function (t, n, r, i, o) {
                    function a() {
                        var e = t.countdownTimer;
                        angular.isUndefined(e) || (t.clock = new Date(1 * e).timeDiff(s))
                    }
                    var s;
                    s = r.maxUnit || "hours", t.$watch("countdownTimer", a), a(), o(t, function (e) {
                        n.append(e)
                    }), "hours" == s && e(a, 1e3)
                }
            }
        }]).directive("userPanel", [function () {
            return {
                restrict: "A",
                controller: "userPanelCtrl"
            }
        }]).directive("ssoForm", [function () {
            return {
                restrict: "A",
                replace: !0,
                templateUrl: "/cdn1103/resource/templates/common/ssoform.tpl.html"
            }
        }]).directive("userRegistration", [function () {
            return {
                restrict: "A",
                controller: "userRegistrationCtrl",
                templateUrl: "/cdn1103/resource/templates/registration/registration.tpl.html"
            }
        }]).directive("staticContent", [function () {
            return {
                restrict: "A",
                controller: "staticContentCtrl"
            }
        }]).directive("carousel188", ["$compile", function (e) {
            return {
                restrict: "A",
                link: function (t, n) {
                    t.items = n.find(".carousel-inner .item"), $(t.items[0]).addClass("active"), n.find(".carousel").addClass("mobile-carousel");
                    var r = "<div class='container pos-relative carousel-navigation hidden-xs'><ol class='carousel-indicators'>";
                    r += "<li class='' data-slide-to='{{$index}}' data-target='#carousel-example-generic' ng-repeat='item in items '></li>", r += "</ol></div>";
                    var i = e(angular.element(r))(t);
                    n.find("div.carousel-inner").append(i)
                }
            }
        }]).directive("piperSub", ["$compile", function (e) {
            return {
                restrict: "A",
                controller: "piperSubcriberCtrl",
                link: function (t, n, r) {
                    t.$watch(r.dynamicHtml, function (r) {
                        if (r) {
                            var i = new RegExp(gv.domains.oldContents, "ig");
                            r = r.replace(i, gv.domains.content), n.html(r), e(n.contents())(t), $("head #webteamstyle").prop("href", gv.domains.content + "/components/webteam/webteam.css" + contentsVersionNo())
                        }
                    })
                }
            }
        }]).directive("msLoginLayer", [function () {
            return {
                restrict: "A",
                controller: "loginLayerCtrl",
                templateUrl: "/cdn1103/resource/templates/common/loginLayer.tpl.html"
            }
        }]).directive("numericOnly", function () {
            return {
                require: "ngModel",
                link: function (e, t, n, r) {
                    var i = n.numericOnly;
                    r.$parsers.push(function (e) {
                        var t = e.replace(/[^\d.]/g, "");
                        if (n.numericOnly && t) {
                            var o = t.split("."),
                                a = o[0],
                                s = o[0];
                            a.length > i && (s = a.substring(0, i)), t = s || ""
                        }
                        return t !== e && (r.$setViewValue(t), r.$render()), t
                    }), r.$formatters.push(function (e) {
                        return -1 == e ? "" : e
                    })
                }
            }
        }).directive("bindHtmlCompile", ["$compile", function (e) {
            return {
                restrict: "A",
                link: function (t, n, r) {
                    t.$watch(function () {
                        return t.$eval(r.bindHtmlCompile)
                    }, function (r) {
                        n.html(r), e(n.contents())(t)
                    })
                }
            }
        }]).directive("qrcode", ["dataService", function (e) {
            return {
                restrict: "A",
                link: function (t, n) {
                    n.bind("click", function () {
                        t.partnerName = $(n).attr("qrcode"), e.dialog(t, {
                            size: "qrcode",
                            windowClass: "center-modal",
                            templateUrl: "/cdn1103/resource/templates/modal/qrcode.tpl.html",
                            controller: "modalInstanceCtrl"
                        })
                    })
                }
            }
        }]).directive("sportRulesSelection", ["$location", function (e) {
            return {
                restrict: "A",
                link: function (e, t) {
                    var n = window.location.pathname.split("/");
                    e.selectedSport = n.length > 4 ? n[2] + "/" + n[3] + "/" + n[4] : "", "" !== e.selectedSport && t.find("span.var-txt").text(t.find("a[ng-href*='" + e.selectedSport + "']").text())
                }
            }
        }]).directive("compile", ["$compile", function (e) {
            return function (t, n, r) {
                t.$watch(function (e) {
                    return e.$eval(r.compile)
                }, function (r) {
                    n.html(r), e(n.contents())(t)
                })
            }
        }]).directive("windowOpen", ["$window", function (e) {
            return {
                restrict: "A",
                link: function (t, n, r) {
                    var i, o, a = r.windowOpen.toLowerCase();
                    switch (a) {
                        case "statement":
                            angular.isUndefined(r.ngHref) && angular.isUndefined(r.href) && r.$set("href", "/{0}/my-account/statement/transaction-history/summary".format(gv.lan));
                            break;
                        case "luckywheel":
                            r.$set("windowStyle", "width=480,height=768,top=5,left=" + (window.top.outerWidth / 2 - 240));
                            break;
                        case "livechat":
                            r.$set("href", "/{0}/live-chat?region={1}".format(gv.lan, uv.pd.r)), 503 == gv.pageStatus && r.$set("href", gv.livechat[gv.lan])
                    }
                    n.click(function () {
                        return i = r.href, o = r.windowStyle, e.open(i, a, o).focus(), !1
                    })
                }
            }
        }]).directive("videoplayer", ["$sce", "$http", "dataService", function (e, t, n) {
            return {
                restrict: "A",
                scope: {
                    videoUrl: "@videoplayer",
                    params: "@"
                },
                link: function (r, i, o) {
                    r.params = r.params || !1, r.videoType = -1 != r.videoUrl.indexOf("youtube.com") ? "youtube" : "html5player";
                    var a;
                    switch (o.$set("href", r.videoUrl), r.videoType) {
                        case "youtube":
                            r.videoId = getFromSearch("v", r.videoUrl.substr(r.videoUrl.lastIndexOf("?")));
                            var s = gv.domains.gApi + r.videoId;
                            t.get(s).then(function (e) {
                                r.video = e.data.items[0], r.params && (-1 != r.params.indexOf("snapshot") && (a = '<img src="' + r.video.snippet.thumbnails.default.url + '" />'), -1 != r.params.indexOf("views") && (a += "<div>" + r.video.statistics.viewCount + " Views </div>"), i.append(angular.element(a)))
                            });
                            break;
                        case "html5player":
                            var l = e.trustAsResourceUrl(i.attr("poster"));
                            a = l ? '<video poster="' + l + '"><source src="' + e.trustAsResourceUrl(r.videoUrl) + '" type="video/mp4"></video>' : '<video><source src="' + e.trustAsResourceUrl(r.videoUrl) + '" type="video/mp4"></video>', i.append(angular.element(a)), i.bind("click", function () {
                                n.dialog(r, {
                                    size: "video",
                                    windowClass: "center-modal",
                                    templateUrl: "/cdn1103/resource/templates/modal/videoplayerModal.tpl.html",
                                    controller: "videoModalCtrl"
                                })
                            })
                    }
                }
            }
        }]).directive("loadDone", function () {
            return {
                restrict: "A",
                compile: function (e, t) {
                    t.$set("loadDone", void 0)
                }
            }
        }).directive("oddsCalculator", [function () {
            return {
                restrict: "A",
                link: function (e, t) {
                    function n(e) {
                        var t = 0,
                            n = 0;
                        for (var r in e) {
                            var i = e[r];
                            i >= 1 ? (t += 1 / i, n++) : e[r] = ""
                        }
                        return n >= 2 ? t : 0
                    }
                    e.clear = function () {
                        e.ourOdds = {}, e.otherOdds = {}
                    }, e.getPercentMarket = n, e.getTheoreticalHold = function (e) {
                        var t = n(e);
                        return t > 0 ? 1 - 1 / t : 0
                    }
                }
            }
        }]).directive("downloadiosAppUrl", ["dataService", function (e) {
            return {
                restrict: "A",
                link: function (t, n, r) {
                    t.currentVersion = "";
                    var i = {
                        v: (new Date).getTime()
                    };
                    e.fetch("GET", gv.domains.iOSAppAsiaUrl + "/version.json", i).then(function (e) {
                        t.currentVersion = e.currentVersion;
                        var i = "itms-services://?action=download-manifest&url=" + gv.domains.iOSAppAsiaUrl + "/" + t.currentVersion + "/manifest.plist";
                        r.$set("href", i), angular.element(n)[0].click()
                    })
                }
            }
        }]).directive("downloadandroidAppUrl", ["dataService", "$cookies", function (e, t) {
            return {
                restrict: "A",
                link: function (r, i, o) {
                    var a = function () {
                            var e = t.getObject("affiliateInfo"),
                                r = "UK" === uv.pd.r ? "188BET_UK_" : "188BET_",
                                i = "";
                            return (void 0 === e || "object" == (void 0 === e ? "undefined" : n(e)) && null == e) && (e = {
                                VendorType: "vendor",
                                Data: {
                                    vendorId: "255",
                                    vendorType: "3"
                                }
                            }), i = r + "1_" + ("vendor" === e.VendorType ? e.Data.vendorId : "255") + "_" + ("vendor" === e.VendorType ? e.Data.vendorType : "3"), "btag" === e.VendorType ? i = r + "2_" + e.Data.filter(function (e) {
                                return "btag" == e.Key
                            })[0].Value : "affiliate" === e.VendorType && (i = r + "3_" + e.Data.filter(function (e) {
                                return "AffiliateCode" == e.Key
                            })[0].Value), i = i.Length > 240 ? i.Substring(0, 240) : i.substring(0, i.Length) + "_.apk"
                        }(),
                        s = {
                            v: (new Date).getTime()
                        };
                    e.fetch("GET", gv.domains.AndroidAppUrl, s).then(function (e) {
                        var t = document.createElement("a");
                        t.href = e.downloadUrl;
                        for (var n = "", r = 0; r < t.pathname.split("/").length - 1; r++) n += "" !== t.pathname.split("/")[r] ? "/" + t.pathname.split("/")[r] : "";
                        var i = "/" + a,
                            s = t.origin + n + i;
                        o.$set("href", s)
                    })
                }
            }
        }]).directive("generateQrcodeUrl", ["dataService", function (e) {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    var r = parseInt(n.width),
                        i = parseInt(n.height),
                        o = n.generateQrcodeUrl,
                        a = document.createElement("a");
                    a.href = o, o = location.origin + a.pathname;
                    var s = "https://chart.googleapis.com/chart?chs=" + r + "x" + i + "&cht=qr&chl=" + encodeURIComponent(o) + "&choe=UTF-8";
                    t.attr("src", s)
                }
            }
        }]).directive("requireLogin", ["dataService", "$translate", function (e, t) {
            return {
                restrict: "A",
                link: function (n, r) {
                    n.msg = {
                        title: t.instant("txtBtnLogin"),
                        content: t.instant("msgCommonRequestLogin")
                    }, r.click(function (t) {
                        uv.sessionD.login || (t.preventDefault(), t.stopPropagation(), e.dialog(n))
                    })
                }
            }
        }]), e.$inject = ["$scope", "$filter", "quickMenuService", "msgService"], t.$inject = ["$scope", "$filter", "quickMenuService"], r.$inject = ["$scope", "$element"], i.$inject = ["$scope", "$filter", "dataService"], o.$inject = ["$scope", "$cookies"], a.$inject = ["$scope", "$sce", "$http"]
    }()
}, function (e, t) {
    $.fn.isOnScreen = function () {
            var e = $(window),
                t = {
                    top: e.scrollTop(),
                    left: e.scrollLeft()
                };
            t.right = t.left + e.width(), t.bottom = t.top + e.height();
            var n = this.offset();
            return n.right = n.left + this.outerWidth(), n.bottom = n.top + this.outerHeight(), !(t.right < n.left || t.left > n.right || t.bottom < n.top || t.top > n.bottom)
        }, Date.prototype.addDays = function (e) {
            var t = new Date(this.valueOf());
            return t.setDate(t.getDate() + parseInt(e)), t
        }, Date.prototype.timeDiff = function (e) {
            e = e || "hour";
            var t = this > new Date ? this - new Date : 0,
                n = {
                    days: 0,
                    hours: 0,
                    mins: 0,
                    secs: 0,
                    totalms: t
                };
            switch (e) {
                case "days":
                    n.days = Math.floor(t / 864e5), n.hours = new Date(t).getUTCHours();
                    break;
                case "hour":
                    n.hours = Math.floor(t / 36e5)
            }
            return n.mins = new Date(t).getUTCMinutes(), n.secs = new Date(t).getUTCSeconds(), n
        }, Date.prototype.toLocalDate = function () {
            var e = this.valueOf(),
                t = new Date(e);
            return new Date(t.getFullYear(), t.getMonth(), t.getDate())
        }, Date.prototype.getAges = function () {
            var e = new Date,
                t = e.getFullYear(),
                n = e.getMonth(),
                r = e.getDate(),
                i = t - this.getFullYear();
            return n < this.getMonth() ? i-- : n == this.getMonth() && r < this.getDate() && i--, i
        }, String.prototype.format || (String.prototype.format = function () {
            var e = arguments;
            return this.replace(/{(\d+)}/g, function (t, n) {
                return void 0 !== e[n] ? e[n] : t
            })
        }), window.isValidDate = function (e) {
            var t = e.split("-"),
                n = new Date(t[0], t[1] - 1, t[2]);
            return n.getFullYear() == t[0] && n.getMonth() + 1 == t[1] && n.getDate() == Number(t[2])
        }, window.getFromSearch = function (e, t) {
            t = t || location.search || "", e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var n = new RegExp("[\\?&]" + e + "=([^&#]*)", "i").exec(t);
            return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
        }, window.getHashVal = function (e) {
            var t = location.hash || "";
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var n = new RegExp("[\\#?&]" + e + "=([^&#]*)").exec(t);
            return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "))
        }, window.getGuid = function () {
            function e() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        }, window.contentsVersionNo = function () {
            return -1 != gv.cv.indexOf("mtn") ? radomVersionNo() : "?v=" + gv.cv
        }, window.radomVersionNo = function () {
            return "?v=" + parseInt((new Date).valueOf() / 3e5)
        }, window.isLocalStorageNameSupported = function () {
            var e = window.localStorage;
            try {
                return e.setItem("test", "1"), e.removeItem("test"), !0
            } catch (e) {
                return !1
            }
        }, window.is_weixin = function () {
            return !(!/micromessenger/i.test(navigator.userAgent.toLowerCase()) && void 0 === navigator.wxuserAgent)
        }, window.parseUri = function (e) {
            for (var t = parseUri.options, n = t.parser[t.strictMode ? "strict" : "loose"].exec(e), r = {}, i = 14; i--;) r[t.key[i]] = n[i] || "";
            return r[t.q.name] = {}, r[t.key[12]].replace(t.q.parser, function (e, n, i) {
                n && (r[t.q.name][n] = i)
            }), r
        }, parseUri.options = {
            strictMode: !1,
            key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            q: {
                name: "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        }, window.receiveMessage = function (e) {
            var t = e.data;
            switch (t.topic) {
                case "setHistory":
                    var r = "",
                        i = {
                            caller: "sbk"
                        };
                    (r = t.data.url || "") && Modernizr.history && history.replaceState(i, "", r);
                    break;
                case "updateBalance":
                    $(".bal-refresh").trigger("click");
                    break;
                case "showDialog":
                    var o = angular.element("*[ng-app]").injector().get("dataService"),
                        a = {
                            msg: {
                                title: "",
                                content: t.data
                            }
                        };
                    o.dialog(a);
                    break;
                case "resize":
                    var s = t.data.windowName;
                    $('[name="' + s + '"]').height(t.data.height + (screen.width >= 737 ? 100 : 50));
                    break;
                case "updateBetSlipCount":
                    var l = !0;
                    if (Modernizr.sessionstorage && (l = null != sessionStorage.getItem("firstBetRacing") && !!sessionStorage.getItem("firstBetRacing")), t.data.counter > 0 && !l) {
                        var c = $("body").find(".racingGame").attr("src"),
                            u = c.indexOf("#"),
                            d = c > 0 ? c.substring(0, u) + "#bet_slip" : c + "#bet_slip";
                        $(".bs-bar").css("display", "none"), $("body").find(".racingGame").attr("ng-src", d), $("body").find(".racingGame").attr("src", d), window.scrollTo(0, 0), sessionStorage.setItem("firstBetRacing", !0)
                    } else {
                        var m = t.data.counter;
                        $(".betcount-number").text(m), 0 == m ? $(".bs-bar").addClass("ng-hide") : (m > 99 && $(".betcount-number").text("99+"), $(".bs-bar").removeClass("ng-hide"))
                    }
                    break;
                case "iFramePageId":
                    "#bet_slip" == t.data.pageId.toLowerCase() ? $(".bs-bar").css("display", "none") : $(".bs-bar").css("display", "block");
                    break;
                case "iFrameScroll":
                    var g = t.data.horizontal,
                        f = t.data.vertical;
                    window.scrollTo(g, f);
                    break;
                case "iFrameReload":
                    var p = t.data.currentLocation,
                        v = t.data.windowName;
                    $('[name="' + v + '"]').attr("ng-src", p), $('[name="' + v + '"]').attr("src", p);
                    break;
                case "scrollTo":
                    window.scrollTo(t.data.x, t.data.y);
                    break;
                case "changeURL":
                    n.doRedirect(t.data.category);
                    break;
                case "racing":
                    angular.element("[racing-game]").scope().reload()
            }
        }, window.addEventListener("message", window.receiveMessage, !1), window.sendMessage = function (e, t, n) {
            e.postMessage(t, n)
        }, "https:" == location.protocol && "serviceWorker" in navigator && navigator.serviceWorker.register("/serviceworker.js", {
            scope: "/"
        }),
        function () {
            "use strict";
            angular.module("starApp");
            var e, t = 0,
                n = $("header").outerHeight();
            $(window).scroll(function (t) {
                e = !0
            }), ["virtual", "racing"].every(function (e) {
                return -1 === window.location.href.indexOf(e)
            }) && setInterval(function () {
                e && (function () {
                    var e = $(window).scrollTop();
                    Math.abs(t - e) <= 5 || (e > t && e > n ? ($("nav.navbar").removeClass("nav-down").removeClass("nav-down-down").addClass("nav-up"), $("nav#navmenu-products-mobile").removeClass("show"), $("body").removeClass("show-navmenu-products-mobile"), $(".navy-blue-bar").removeClass("nav-down").addClass("nav-up")) : e + $(window).height() < $(document).height() && ($("nav.navbar").removeClass("nav-up").removeClass("nav-down-down").addClass("nav-down"), $(".navy-blue-bar").removeClass("nav-up").addClass("nav-down")), t = e)
                }(), e = !1)
            }, 250), $("body").on("touchstart mousedown", ".inner-box-pw", function () {
                $(this).closest(".input-group").find('[type="password"]').attr("type", "text")
            }).on("touchend mouseup mouseleave", ".inner-box-pw", function () {
                $(this).closest(".input-group").find('[type="text"]').attr("type", "password")
            }), $("body").on("click", "#scrollScreenCapsLeft", function () {
                var e = $(this);
                e.parent().find("ul").animate({
                    left: "250px"
                }, {
                    complete: function () {
                        e.parent().find("ul").prepend(e.parent().find("li").eq(e.parent().find("li").length - 1)), e.parent().find("ul").css("left", "auto")
                    }
                })
            }).on("click", "#scrollScreenCapsRight", function () {
                var e = $(this);
                e.parent().find("ul").animate({
                    right: "250px",
                    speed: 1e3
                }, {
                    complete: function () {
                        e.parent().find("ul").append(e.parent().find("li").eq(0)), e.parent().find("ul").css("right", "auto")
                    }
                })
            }), -1 === location.pathname.indexOf("/my-account/banking/deposit") && -1 === location.pathname.indexOf("/my-account/banking/withdrawal") || $("body").addClass("load-spinner"), jQuery(window).load(function () {
                if (null !== document.getElementById("carousel-example-generic")) {
                    var e = new Hammer(document.getElementById("carousel-example-generic"));
                    e.on("swipeleft", function (e) {
                        $("#carousel-example-generic").carousel("next")
                    }), e.on("swiperight", function (e) {
                        $("#carousel-example-generic").carousel("prev")
                    })
                }
                if (null !== document.getElementById("ec2016-other-matches-Carousel")) {
                    var t = new Hammer(document.getElementById("ec2016-other-matches-Carousel"));
                    t.on("swipeleft", function (e) {
                        $("#ec2016-other-matches-Carousel").carousel("next")
                    }), t.on("swiperight", function (e) {
                        $("#ec2016-other-matches-Carousel").carousel("prev")
                    })
                }
            })
        }();
    var n = {
        mappingDic: {
            "all-sports": "/sports",
            "in-play": "/sports/all/in-play",
            football: "/sports/football/select-competition/default",
            tennis: "/sports/tennis",
            rugby: "/sports/rugby",
            cricket: "/sports/cricket",
            darts: "/sports/darts",
            "american-football": "/sports/american-football",
            baseball: "/sports/baseball",
            golf: "/sports/golf",
            "betting-rules": "/rules/racing",
            faqs: "/faqs"
        },
        doRedirect: function (e) {
            if (void 0 !== e) {
                var t = n.mappingDic[e];
                t = t || n.mappingDic[0], window.location.href = "/" + gv.lan + t
            }
        }
    }
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(t, n, r, i, o) {
            function a(e) {
                var n = [];
                e.forEach(function (e) {
                    n.push(t.fetch("GET", e.domain + "/google5dba05b2e477d3e4.html", null, 3, !1))
                });
                var r = o.defer();
                return Q.allSettled(n).then(function (t) {
                    t.forEach(function (t, n) {
                        var r = "fulfilled" === t.state && "google-site-verification: google5dba05b2e477d3e4.html" == t.value;
                        e[n].domain = e[n].domain.replace("//", ""), e[n].isSucess = r, e[n].remark = r ? "fulfilled" : "rejected"
                    }), r.resolve(e)
                }), r.promise
            }

            function s() {
                if (!u.lowBalance) {
                    var n = uv.sessionD.balance <= gv.lowBalance[uv.geod.cc];
                    if (1 === uv.sessionD.mberType && n) {
                        var r = {
                            templateUrl: "/cdn1103/resource/templates/modal/lowBalance.tpl.html",
                            controller: "modalInstanceCtrl",
                            animation: !0,
                            size: "sm"
                        };
                        t.dialog(null, r).result.then(function () {
                            for (var t = "", n = 3; n < document.referrer.split("/").length; n++) t += "/" + document.referrer.split("/")[n];
                            e.location.href = t
                        })
                    }
                    l("lowBalance")
                }
            }

            function l(e) {
                u[e] = !0, r.putObject(c, u, {
                    path: "/",
                    expires: (new Date).addDays(30)
                })
            }
            var c = "check",
                u = function () {
                    var e = r.getObject(c);
                    return angular.isDefined(e) ? e : {}
                }(),
                d = function () {
                    try {
                        return e.self !== e.top
                    } catch (e) {
                        return !0
                    }
                }();
            return {
                init: function () {
                    d || (uv.sessionD.login ? (function () {
                        if (uv.sessionD.landinged) {
                            var e, r, i = !!Modernizr.localstorage && JSON.parse(localStorage.getItem("recommendDomain")),
                                l = !0;
                            if (i && (l = i.isShowRecDomains, r = i.aId == uv.sessionD.aId, e = i.recDomains), (!i || i && !r) && (e = uv.sessionD.recdomain), !l || 0 == e.length) return s();
                            a(e).then(function (e) {
                                var r = e.filter(function (e) {
                                    return 1 == e.isSucess
                                });
                                if (0 != r.length) {
                                    var i = o.defer(),
                                        a = {
                                            templateUrl: "/cdn1103/resource/templates/modal/user/recommendedDomain.tpl.html",
                                            controller: "modalInstanceCtrl",
                                            animation: !0,
                                            size: "sm",
                                            windowClass: "modal-align-mid"
                                        };
                                    return n.recDomain = r, t.dialog(n, a).result.then(function () {
                                        i.resolve()
                                    }).finally(function () {
                                        i.resolve();
                                        var t = {
                                            isShowRecDomains: !0,
                                            aid: uv.sessionD.aId,
                                            recDomains: e
                                        };
                                        Modernizr.localstorage && localStorage.setItem("recommendDomain", JSON.stringify(t)), uv.sessionD.landinged = !1, s()
                                    }), i.promise
                                }
                            })
                        }
                    }(), function () {
                    /*
                        var r = "Android" === n.client.sessionD.deviceOS,
                            i = -1 !== navigator.userAgent.indexOf("Darwin"),
                            o = -1 !== navigator.userAgent.indexOf("BigMac"),
                            a = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/i.test(e.navigator.userAgent) && /(iPhone|iPod|iPad).*AppleWebKit(?!.*CriOS)/i.test(e.navigator.userAgent) && /(iPhone|iPod|iPad).*AppleWebKit(?!.*FxiOS)/i.test(e.navigator.userAgent),
                            s = "iOS" === n.client.sessionD.deviceOS,
                            c = "UK" === n.client.pd.r,
                            d = -1 !== n.client.pd.c.indexOf("GB") || -1 !== n.client.pd.c.indexOf("IE");
                        uv.sessionD.allowAccess && (r || s) && (r && (u.notifyDownloadApps || i || o) || s && (u.notifyDownloadApps || c && !d) || a || t.dialog(n, {
                            templateUrl: "/cdn1103/resource/templates/modal/DownloadAppsPrompt.html",
                            controller: "modalInstanceCtrl",
                            backdrop: "static"
                        }).result.then(function (t) {
                            if (t && (s && (n = c ? gv.domains.iOSAppUKUrl : "/" + gv.lan + "/mobile/install-ios-steps", e.location.href = n), r)) {
                                var n = "/" + gv.lan + "/mobile/install-android-steps";
                                e.location.href = n
                            }
                            l("notifyDownloadApps")
                        }))*/
                    }()) : u.cookieNotify || t.dialog(n, {
                        templateUrl: "/cdn1103/resource/templates/modal/idle.cookie.tpl.html",
                        controller: "modalInstanceCtrl",
                        animation: !0,
                        backdrop: !1,
                        size: "sm",
                        windowClass: "modal-align-bottom"
                    }).result.then(function () {
                        l("cookieNotify")
                    })), e.location.search.indexOf("dialog") > -1 && (o.all({
                        title: i("txtComAlert"),
                        content: i("txtProductUnavailable")
                    }).then(function (e) {
                        n.msg = {
                            title: e.title,
                            content: e.content
                        }, t.dialog(n)
                    }), history.pushState(null, null, "/" + uv.sessionD.lans[0].value)), "UK" === uv.pd.r && function () {
                        var r = -1 !== location.pathname.indexOf("/interface");
                        if (!d || r) var o = 0,
                            a = (setInterval(function () {
                                ++o % s != 0 || l || function () {
                                    function o(e) {
                                        var n = {
                                            title: "RealityCheckRespond",
                                            newValue: e,
                                            remarks: location.href,
                                            isCreate: !0
                                        };
                                        t.fetch("POST", "/service/userapi/createMemberAuditLog", n)
                                    }

                                    function s(e) {
                                        "A" === e.target.nodeName && o("Acc Summary")
                                    }
                                    r ? function () {
                                        l = !0, mgs.inGameInterface.init(function () {
                                            mgs.inGameInterface.setMode(mgs.inGameInterface.modes.fullscreen), mgs.inGameInterface.preventGameplay()
                                        }), n.resumeGame = function () {
                                            o("No"), l = !1, mgs.inGameInterface.setMode(mgs.inGameInterface.modes.hidden), mgs.inGameInterface.allowGameplay()
                                        }, n.goToHomePage = function () {
                                            o("Yes"), l = !1, e.top.location.href = gv.domains.mobile
                                        }, n.createAuditLogIfGoAccountSummary = s, i(["txtComAlert", "msgResGamingRemindEndSession"]).then(function (e) {
                                            n.msg = {
                                                title: e.txtComAlert,
                                                content: e.msgResGamingRemindEndSession.format(a)
                                            }
                                        })
                                    }() : function () {
                                        l = !0, n.$broadcast("realityCheck.show"), n.createAuditLogIfGoAccountSummary = s, n.msg = {
                                            title: i.instant("txtComAlert"),
                                            content: i.instant("msgResGamingRemindEndSession").format(a)
                                        };
                                        t.dialog(n, {
                                            size: "sm",
                                            templateUrl: "/cdn1103/resource/templates/modal/realityCheck.tpl.html",
                                            controller: "modalInstanceCtrl",
                                            backdrop: "static"
                                        }).result.then(function () {
                                            location.href = "/", o("Yes")
                                        }, function () {
                                            n.$broadcast("realityCheck.no"), o("No")
                                        }).finally(function () {
                                            l = !1
                                        })
                                    }()
                                }()
                            }, 1e3), uv.sessionD.remindDuration),
                            s = 60 * a * 60,
                            l = !1
                    }()
                },
                initLoginCheck: function () {
                    console.log(u.lowBalance)
                    console.log(u.inboxReminder)
                    console.log(r)
                    u.lowBalance = u.inboxReminder = !1, r.putObject(c, u, {
                        path: "/"
                    }), Modernizr.localstorage && localStorage.removeItem("recommendDomain")
                },
                checkAvailableDomain: a
            }
        }
        angular.module("starApp").factory("checkService", n).directive("checkServiceDirective", ["checkService", function (e) {
            return {
                restrict: "A",
                link: function (t, n, r) {
                    e.init()
                }
            }
        }]), n.$inject = ["dataService", "$rootScope", "$cookies", "$translate", "$q"]
    }(window, $)
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t) {
            for (var t = t || "", n = "", r = 3; r < document.referrer.split("/").length; r++) n += "/" + document.referrer.split("/")[r];
            var i = n + location.search;
            i = "banking" == getFromSearch("target") ? "/" + gv.lan + "/my-account/banking/deposit" : "racing" == gv.prodName || "sports" == gv.prodName ? "/" + gv.lan + "/" + gv.prodName + location.search : i;
            var o = $("#sso_form");
            o.prop("action", t + "/postlogin"), o.find("[name=passport]").val(e.passport), o.find("[name=postpage]").val(i), o.find("[name=timezone]").val(uv.geod.timezone), document.getElementById("sso_form").submit()
        }

        function t(t, n, r, i, o, s, l, c, u, d) {
            var m = getGuid();
            n.loginform = {
                username: "",
                password: ""
            }, n.showBalance = !0, n.submitLogin = function () {
                var t = {
                    BlackBox: getBlackbox(),
                    Ud: n.loginform.username,
                    Pd: n.loginform.password,
                    guId: m
                };
                o.fetch("POST", "/service/userapi/login", t).then(function (t) {
                    switch (t.returnCode) {
                        case "0001":
                            e(t);
                            break;
                        case "0000":

                            console.log("OK_"+t.returnCode)

                            c.initLoginCheck();
                            var s = {
                                isShowRecDomains: !1,
                                aid: "",
                                recDomains: []
                            };
                            //console.log(t.recDomain+","+t.passport+","+redirectUrl+","+remindDuration+","+t.cc)
                            //alert(t.recDomain+","+t.passport+","+redirectUrl+","+remindDuration+","+t.cc)

                            c.checkAvailableDomain(t.recDomain).then(function (n) {
                                var r = i("filter")(n, {
                                        isSucess: !0
                                    }),
                                    a = i("filter")(r, {
                                        domain: location.hostname
                                    }).length > 0 || 0 == r.length ? "" : "//" + r[0].domain,
                                    l = {
                                        failList: i("filter")(n, {
                                            isSucess: !1
                                        }),
                                        orginalDomain: location.hostname,
                                        loginDomain: a || location.hostname
                                    };
                                o.fetch("POST", "/service/userapi/adddomainsreport", l), a || (s.isShowRecDomains = !1, s.recDomains = n, Modernizr.localstorage && localStorage.setItem("recommendDomain", JSON.stringify(s))), e(t, a)
                            });
                            break;
                        case "0005":
                            n.msg = {
                                title: r.instant("txtBtnLogin"),
                                content: r.instant("msgLoginError" + t.returnCode)
                            };
                            var l = {
                                    templateUrl: "/cdn1103/resource/templates/modal/user/loginWithCaptcha.html",
                                    controller: "userModalCaptchaLoginCtrl"
                                },
                                u = o.dialog(n, l);
                            u.rendered.then(function () {
                                a()
                            }), u.result.then(function (e) {
                                n.msg = {
                                    title: r.instant("txtBtnLogin"),
                                    content: r.instant("msgLoginError" + e)
                                }, o.dialog(n)
                            });
                            break;
                        default:
                            n.msg = {
                                title: r.instant("txtBtnLogin"),
                                content: r.instant("msgLoginError" + t.returnCode)
                            }, o.dialog(n)
                    }
                })
            }, n.submitLogOut = d.logOut, n.toggleBalance = function () {
                n.showBalance = !n.showBalance
            }, n.userAssistance = function (e) {
                s.location.href = "/" + gv.lan + "/user/" + e
            }, n.joinUsSignUp = function () {
                window.location.href = "/" + gv.lan + "/sign-up"
            }, n.userPanelCtrl = {
                guId: m
            };
            var g = angular.element("#username").bind("blur", p),
                f = angular.element("#password").bind("blur", p),
                p = function () {
                    n.loginform.username = g.val(), n.loginform.password = f.val()
                };
            u(p, 200)
        }

        function n(t, n, r, i) {
            t.close = function () {
                n.dismiss("cancel")
            }, t.submit = function () {
                var r = {
                    Ud: t.formData.username,
                    Pd: t.formData.password,
                    CaptchaText: t.formData.captcha
                };
                i.fetch("POST", "/service/userapi/loginCaptcha", r).then(function (r) {
                    switch (r.returnCode) {
                        case "0000":
                        case "0001":
                            e(r);
                            break;
                        case "0011":
                            n.close("0011");
                            break;
                        default:
                            a(), t.errorCode = r.returnCode
                    }
                })
            }, t.errorCode = "", t.refreshCaptcha = a, t.formData = {
                username: "",
                password: "",
                captcha: ""
            }
        }

        function r(e, t, n, r, i) {
            e.close = function () {
                history.go(-1)
            }, e.submit = function () {
                e.formData.guId = getGuid();
                var r = {
                    OldPassword: e.formData.currentPass,
                    NewPassword: e.formData.newPassword,
                    NewPasswordConfirm: e.formData.confirmPassword,
                    CaptchaText: e.formData.captcha,
                    guId: e.formData.guId
                };
                n.fetch("POST", "/service/userapi/changepassword", r).then(function (r) {
                    switch (r) {
                        case 0:
                            e.msg = {
                                title: t.instant("txtProfileChangePassword"),
                                content: t.instant("msgSecureChangePassSuccess")
                            }, n.dialog(e).result.then(function () {
                                "login" === i.changepassType ? (n.fetch("POST", "/service/userapi/logout"), localStorage.removeItem("recommendDomain"), window.location.href = "/" + gv.lan) : window.location.href = "/" + gv.lan + "/my-account/account-settings/profile"
                            });
                            break;
                        default:
                            a(), e.errorCode = r
                    }
                })
            }, e.errorCode = "", e.pattern = {
                userId: new RegExp("^([0-9]|[a-zA-Z]){5,16}$"),
                password: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$")
            }, e.refreshCaptcha = a, e.formData = {
                currentPass: "",
                newPassword: "",
                confirmPassword: "",
                captcha: "",
                guId: getGuid()
            }, e.pattern = {
                phoneNo: new RegExp("^\\d{1,10}$"),
                nospecChar: new RegExp("^(?=.*$)(?!.*[~!@#$%^&*()-+'\";`><?|{|}])"),
                nodigits: new RegExp("^\\D{1,10}$"),
                userId: new RegExp("^([0-9]|[a-zA-Z]){5,16}$"),
                password: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$"),
                captha: new RegExp("^[a-zA-Z0-9]{5}$")
            }
        }

        function i(e, t, n) {
            e.close = function () {
                history.go(-1)
            }, e.submit = function () {
                e.formData.guId = getGuid();
                var r = {
                    Email: e.formData.email,
                    CaptchaText: e.formData.captcha,
                    guId: e.formData.guId
                };
                n.fetch("POST", "/service/userapi/forgotUsername", r).then(function (r) {
                    switch (r) {
                        case 0:
                            e.msg = {
                                title: t.instant("txtSecureForgotUserName"),
                                content: t.instant("msgSecureGetUserSuccess"),
                                redirect: "/user/login"
                            }, n.dialog(e);
                            break;
                        default:
                            a(), e.errorCode = r
                    }
                })
            }, e.errorCode = "", e.refreshCaptcha = a, e.formData = {
                email: "",
                captcha: "",
                guId: getGuid()
            }, e.pattern = {
                phoneNo: new RegExp("^\\d{1,10}$"),
                nospecChar: new RegExp("^(?=.*$)(?!.*[~!@#$%^&*()-+'\";`><?|{|}])"),
                nodigits: new RegExp("^\\D{1,10}$"),
                userId: new RegExp("^([0-9]|[a-zA-Z]){5,16}$"),
                password: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$"),
                captha: new RegExp("^[a-zA-Z0-9]{5}$")
            }
        }

        function o(e, t, n, r) {
            e.close = function () {
                history.go(-1)
            }, e.errorCode = 0, e.verifyEmail = function () {
                if (e.formData.email) {
                    var t = {
                        Email: e.formData.email
                    };
                    n.fetch("POST", "/service/userapi/verifyrequiredemail", t).then(function (t) {
                        switch (e.errorCode = 0, t.returnCode) {
                            case 0:
                                e.formData.secQuestion = t.SecureQuestion;
                                break;
                            default:
                                a(), e.errorCode = t.returnCode
                        }
                    })
                }
            }, e.verifyRequiredFields = function () {
                e.formData.guId = getGuid();
                var r = {
                    Email: e.formData.email,
                    SecQuestion: e.formData.secQuestion,
                    SecAnswer: e.formData.secAnswer,
                    CaptchaText: e.formData.captcha,
                    guId: e.formData.guId
                };
                n.fetch("POST", "/service/userapi/verifyrequiredfields", r).then(function (r) {
                    switch (r) {
                        case 0:
                            e.msg = {
                                title: t.instant("txtSecureForgotPassword"),
                                content: t.instant("msgSecureResetPass"),
                                redirect: "/user/login"
                            }, n.dialog(e);
                            break;
                        case 99999:
                            e.msg = {
                                title: t.instant("txtCommonHelp"),
                                content: t.instant("msgCommonSystemError")
                            }, n.dialog(e);
                            break;
                        default:
                            a(), e.errorCode = r
                    }
                })
            }, e.refreshCaptcha = a, e.formSetp = 1, e.formData = {
                email: "",
                secQuestion: "-1",
                secAnswer: "",
                captcha: "",
                guId: ""
            }, e.form2Data = {
                password: "",
                confirmPassword: ""
            }, e.pattern = {
                phoneNo: new RegExp("^\\d{1,10}$"),
                nospecChar: new RegExp("^(?=.*$)(?!.*[~!@#$%^&*()-+'\";`><?|{|}])"),
                nodigits: new RegExp("^\\D{1,10}$"),
                userId: new RegExp("^([0-9]|[a-zA-Z]){5,16}$"),
                password: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$"),
                captha: new RegExp("^[a-zA-Z0-9]{5}$")
            }
        }

        function a() {
            event.stopPropagation(), event.preventDefault();
            var e = $("#captchaImg");
            $("#captchaText").val("");
            var t = e.attr("src");
            e.attr("src", t + "?" + (new Date).valueOf()).text("")
        }

        function s(e, t) {
            e.profileDocs = [], e.OnInit = function () {
                e.guId = getGuid();
                var r = {
                    languageCode: gv.lan,
                    guId: e.guId
                };
                t.fetch("GET", "/service/userApi/getProfileVerificationDetail", r).then(function (t) {
                    t && (e.profileDocs = t, angular.forEach(e.profileDocs, function (e) {
                        var t = e.expiryDate - (new Date).valueOf();
                        e.expired = t < 0 ? 2 : t < n ? 1 : 0, e.expiredFlag = 0 == e.expiryDate ? 0 : e.expired
                    }))
                })
            }, e.guId = "", e.openUploadPanel = function (e) {
                e.docSubmissionID ? window.location.href = "/" + gv.lan + "/my-account/profile-fileupload?docType=" + e.docType + "&docTypeName=" + encodeURI(e.docTypeName) + "&docSubmissionID=" + e.docSubmissionID : window.location.href = "/" + gv.lan + "/my-account/profile-fileupload?docType=" + e.docType + "&docTypeName=" + encodeURI(e.docTypeName)
            }, e.disableOpenUploadPanelButton = function (e) {
                return "Accepted" != e.docStatusName && !e.allowUpload || "Accepted" == e.docStatusName && 0 == e.expiredFlag
            };
            var n = 5184e6
        }

        function l(e, t, n, r, i) {
            function o(e) {
                return l ? c.cors[e] : c.noncors[e]
            }

            function a() {
                var t = e.formData.files.length,
                    n = 0;
                return e.existFiles && (n = r("filter")(e.existFiles, function (e) {
                    return !e.deleted
                }).length), n + t
            }

            function s(e) {
                return unescape(encodeURIComponent(e))
            }
            var l = angular.isDefined(gv.domains.rtmsul) && "" != gv.domains.rtmsul;
            e.hasError = !1, e.formData = {
                docType: i.getQueryString("docType"),
                comment: "",
                files: [],
                isInvalid: !1,
                uploadCount: 0
            };
            var c = {
                cors: {
                    byte: 4194304,
                    uiMsg: "4MB"
                },
                noncors: {
                    byte: 512e3,
                    uiMsg: "500KB"
                }
            };
            e.maxSizeMsg = o("uiMsg"), e.docIdentifier = i.getQueryString("docTypeName"), e.validfiles = function (t, n, r) {
                    angular.forEach(t, function (t) {
                        var n = new FileReader;
                        n.onload = function (i) {
                            e.$apply(function () {
                                var i = /\.(jpeg|jpg|exif|tiff|gif|bmp|png|pdf)$/i.test(t.name) ? t.size > o("byte") ? "sizing" : "valid" : "extension",
                                    a = {};
                                if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                                    a = {
                                        fileBody: n.result,
                                        size: t.size,
                                        error: i
                                    };
                                    var s = r.files.findIndex(function (e) {
                                            return e.name == t.name && e.size == t.size
                                        }),
                                        l = t.name.split(".")[0] + "" + e.formData.uploadCount + "." + t.name.split(".")[1];
                                    a.fileName = l, r.files[s].name = l, e.formData.uploadCount++
                                } else a = {
                                    fileBody: n.result,
                                    fileName: t.name,
                                    size: t.size,
                                    error: i
                                };
                                e.formData.files.push(a), e.formData.isInvalid = e.formData.isInvalid || "valid" != a.error
                            })
                        }, n.readAsDataURL(t.file)
                    })
                }, e.close = function () {
                    history.go(-1)
                }, e.confirm = function () {
                    e.formData.guId = getGuid(), e.formData.docSubmissionID = e.docSubmissionID, e.formData.files && (e.formData.files = r("filter")(e.formData.files, function (e) {
                        return e.size <= o("byte")
                    })), e.existFiles && (e.formData.deleteFilenames = r("filter")(e.existFiles, function (e) {
                        return e.deleted
                    }).map(function (e) {
                        return e.filename
                    })), l && (e.formData.token = uv.sessionD.ssid, e.formData.aId = uv.sessionD.aId), (l ? function () {
                        return t.fetch("POST", gv.domains.rtmsul + "/service/fileapi/uploadfiles", e.formData, 300)
                    } : function () {
                        return t.fetch("POST", "/service/userapi/vaildateUploadFiles", e.formData)
                    })().then(function (r) {
                        switch (r) {
                            case 0:
                                e.hasError = !1, e.msg = {
                                    title: n.instant("navKycProfileVerification"),
                                    content: n.instant("msgKycUploadSuccess"),
                                    redirect: "/my-account/profile-verification"
                                }, t.dialog(e);
                                break;
                            default:
                                e.hasError = !0
                        }
                    })
                }, e.removeFile = function (t, n) {
                    var i = e.formData.files.indexOf(t); - 1 != i && (e.formData.files.splice(i, 1), n.removeFile(n.files.find(function (e) {
                        return e.name == t.fileName && e.size == t.size
                    }))), e.formData.isInvalid = r("filter")(e.formData.files, {
                        error: "!valid"
                    }, !0).length > 0
                }, e.deleteFile = function (e) {
                    e.deleted = !0
                }, e.disableSubmitButton = function () {
                    return 0 == e.formData.files.length && (!e.existFiles || 0 == r("filter")(e.existFiles, function (e) {
                        return e.deleted
                    }).length) || a() > e.verifyFileLimit || e.formData.isInvalid
                }, e.verifyFileLimit = 5, e.numberOfFileForVerify = a, e.docSubmissionID = i.getQueryString("docSubmissionID"), e.commentLimit = function () {
                    if (e.formData.comment) {
                        var t = e.formData.comment;
                        e.formData.comment = function (e, t) {
                            if (s(e).length <= 200) return e;
                            for (var n = "", r = 0, i = 0; i < 0; r++) i += e.charCodeAt(r) < 128 ? 1 : s(e[r]).length;
                            for (var o = r + 200, a = r; r <= o; a++) o -= e.charCodeAt(a) < 128 ? 1 : s(e[a]).length, n += e[a];
                            return n
                        }(t)
                    }
                },
                function () {
                    if (e.docSubmissionID) {
                        var n = {
                            docSubmissionID: e.docSubmissionID
                        };
                        t.fetch("POST", "/service/userapi/GetVerifictionFiles", n).then(function (t) {
                            e.existFiles = t.map(function (e) {
                                return e.deleted = !1, e
                            })
                        })
                    }
                }()
        }

        function c(e, t, n) {
            var r = getGuid();
            e.userFilesUploadMainCtrl = {
                guId: r
            }, e.onInit = function () {
                n.ajaxStackObj[e.userFilesUploadMainCtrl.guId] = !0, t(function () {
                    n.ajaxStackObj[e.userFilesUploadMainCtrl.guId] = !1
                }, 200)
            }
        }

        function u(e, t) {
            return {
                refreshBalance: function () {
                    return t.fetch("GET", "/service/userapi/getBalance").then(function (t) {
                        t.login || location.reload();
                        var n = t.balance;
                        return e.client.sessionD.balance = n, n
                    })
                },
                logOut: function () {
                    t.fetch("POST", "/service/userapi/logout").then(function (e) {
                        localStorage.removeItem("recommendDomain"), window.location.href = e.redirectUrl
                    })
                }
            }
        }
        angular.module("starApp").controller("userPanelCtrl", t).controller("userModal4gotUnCtrl", i).controller("userModal4gotPassCtrl", o).controller("userModalCaptchaLoginCtrl", n).controller("userModalChangePassCtrl", r).controller("profileVerificationCtrl", s).controller("userFilesUploadCtrl", l).controller("userFilesUploadMainCtrl", c).factory("userService", u).directive("profileVerification", [function () {
            return {
                restrict: "A",
                controller: "profileVerificationCtrl",
                templateUrl: "/cdn1103/resource/templates/myaccount/profile-verification.tpl.html?v=" + gv.rv
            }
        }]).directive("forgotpassword", [function () {
            return {
                restrict: "A",
                controller: "userModal4gotPassCtrl",
                templateUrl: "/cdn1103/resource/templates/modal/user/forgotpassword.html"
            }
        }]).directive("forgotusername", [function () {
            return {
                restrict: "A",
                controller: "userModal4gotUnCtrl",
                templateUrl: "/cdn1103/resource/templates/modal/user/forgotusername.html"
            }
        }]).directive("profileUpload", [function () {
            return {
                restrict: "AE",
                controller: "userFilesUploadCtrl",
                templateUrl: "/cdn1103/resource/templates/modal/fileupload.tpl.html"
            }
        }]).factory("userFilesUploadService", function () {
            return {
                getQueryString: function (e, t) {
                    var n = t || window.location.href,
                        r = new RegExp("[?&]" + e + "=([^&#]*)", "i").exec(n);
                    return r ? decodeURI(r[1]) : null
                }
            }
        }), t.$inject = ["$rootScope", "$scope", "$translate", "$filter", "dataService", "$window", "$cookies", "checkService", "$interval", "userService"], i.$inject = ["$scope", "$translate", "dataService"], o.$inject = ["$scope", "$translate", "dataService", "$window"], n.$inject = ["$scope", "$modalInstance", "$translate", "dataService"], r.$inject = ["$scope", "$translate", "dataService", "$cookies", "$attrs"], l.$inject = ["$scope", "dataService", "$translate", "$filter", "userFilesUploadService"], s.$inject = ["$scope", "dataService"], c.$inject = ["$scope", "$timeout", "$rootScope"], u.$inject = ["$rootScope", "dataService"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, r, i, o, a, s, l) {
            function c(n) {
                var i = gv.regs.filter(function (e) {
                    return e.code == uv.pd.r
                })[0];
                n = n || (i.hasDefCountry ? {
                    Code: uv.pd.c
                } : {
                    Code: uv.geod.country
                }), t.all({
                    form: o.fetch("GET", "/service/registerApi/getRegisterform", {
                        countryCode: n.Code
                    }),
                    preference: o.fetch("GET", "/service/registerApi/getCountryPreference", {
                        countryCode: n.Code,
                        LanguageCode: gv.lan
                    }),
                    options: o.fetch("GET", "/service/registerApi/getRegisterOptions", {
                        LanguageCode: gv.lan,
                        regionCode: uv.pd.r
                    })
                }).then(function (t) {
                    e.options = t.options, e.preference = t.preference, e.registerForm = JSON.parse(t.form), e.required = {
                            MiddleName: null === e.registerForm.MiddleName,
                            FamilyName: null === e.registerForm.FamilyName,
                            BuildingName: null === e.registerForm.BuildingName
                        }, e.registerForm.LangCode = gv.lan, e.registerForm.MobileNo = "", e.registerForm.HomeNo = "", e.registerForm.CountryName = "", r("filter")(t.options.countries, {
                            Name: e.preference.countryName
                        }).length > 0 && (e.registerForm.CountryName = e.preference.countryName), e.registerForm.NationalityName = e.preference.countryName, e.registerForm.PlaceOfBirthName = e.preference.countryName,
                        function (t) {
                            var n = r("filter")(e.options.countrieslegalage, {
                                Id: t
                            }, !0) || "";
                            e.legalAge = 18, n.length > 0 && (e.legalAge = n[0].Name), e.dateoptions = {
                                date: [31],
                                month: [12],
                                year: [d - 90, d - e.legalAge]
                            }
                        }(n.Id);
                    var i = r("filter")(e.options.phoneExt, function (t) {
                        return t.Id == e.preference.phoneExt
                    }, !0).length > 0;
                    e.registerForm.MobileExt = i ? e.preference.phoneExt : "-", e.registerForm.HomeExt = i ? e.preference.phoneExt : "-", e.registerForm.CurrencyCode = e.preference.defcurrency, e.registerForm.TimeZone = uv.geod.timezone, e.options.currencies = r("filter")(e.options.currencies, function (n) {
                        return void 0 !== t.options && -1 != e.preference.currencies.indexOf(n.Code)
                    }), l(function () {
                        $(s).find(".selectpicker").selectpicker("refresh")
                    }, 1e3)
                })
            }

            function u(e) {
                return e && "" != e ? e + "," : ""
            }
            var d = (new Date).getFullYear();
            e.options = {}, e.required = {
                MiddleName: !1,
                FamilyName: !1
            }, e.dateoptions = {
                date: [31],
                month: [12],
                year: [d - 90, d - 18]
            }, e.verifyForm = {
                userId: !1,
                email: !1,
                guId: 0
            }, e.preference = {}, e.registerForm = {}, e.errorList = [], e.birth = {
                date: "-1",
                month: "-1",
                year: "-1"
            }, e.wizard = {
                stepIndex: 1,
                validateStatus: !1,
                showHomeNo: !1
            }, e.addressForm = {
                selectedOpt: "",
                infomations: [],
                guId: ""
            }, e.pattern = {
                phoneNo: new RegExp("^\\d{1,15}$"),
                nospecCharDigit: new RegExp("^(?=.*$)(?!.*[~,_:!@#$%^&*\\[\\]()-+'\";`><?|{|}1-9])"),
                nospecChar: new RegExp("^(?=.*$)(?!.*[~,_:!@#$%^&*\\[\\]()-+'\";`><?|{|}])"),
                postCode: new RegExp("^[a-zA-Z0-9-\\s]{0,20}$"),
                nodigits: new RegExp("^\\D{1,30}$"),
                userId: new RegExp("^([0-9]|[a-zA-Z]){5,16}$"),
                password: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$"),
                captha: new RegExp("^[a-zA-Z0-9]{5}$")
            }, e.onInit = c, e.refreshCaptcha = n, e.submitForm = function () {
                e.registerForm.BlackBox = getBlackbox(), e.registerForm.BirthDate = e.birth.date + "/" + e.birth.month + "/" + e.birth.year, e.registerForm.guId = getGuid(), o.fetch("POST", "/service/registerApi/submitRegistration", e.registerForm).then(function (t) {
                    switch (t.returnCode) {
                        case "0000":
                            var r = $("#sso_form");
                            r.prop("action", "/postlogin"), r.find("[name=passport]").val(t.passport), r.find("[name=postpage]").val("/" + gv.lan + "/sign-up-success"), r.find("[name=timezone]").val(uv.geod.timezone), document.getElementById("sso_form").submit();
                            break;
                        default:
                            n(), e.errorCode = t.returnCode, e.errorList = t.errorList, null !== e.errorList && (-1 != e.errorList.indexOf("0004") ? e.wizard.stepIndex = 2 : -1 != e.errorList.indexOf("0003") ? e.wizard.stepIndex = 3 : (e.msg = {
                                title: i.instant("txtJoinUsSignUp"),
                                content: i.instant("msgCommonSystemError")
                            }, o.dialog(e)))
                    }
                }, function (t) {
                    e.msg = {
                        title: i.instant("txtJoinUsSignUp"),
                        content: i.instant("msgCommonSystemError")
                    }, o.dialog(e)
                })
            }, e.getAddressInfo = function () {
                e.addressForm.guId = getGuid(), o.fetch("GET", "/service/registerApi/getAddressInfos", {
                    postCode: e.registerForm.PostalCode,
                    guId: e.addressForm.guId
                }).then(function (t) {
                    var n = {},
                        r = "Success" == t.result && "" !== t.rtn[0].ZipPostcode;
                    switch (r) {
                        case !0:
                            angular.forEach(t.rtn, function (e) {
                                var t = u(e.Premise) + u(e.Building) + u(e.Street) + u(e.City) + u(e.ZipPostcode);
                                e.label = t.substring(0, t.length - 1)
                            }), e.addressForm = {
                                selectedOpt: t.rtn[0],
                                infomations: t.rtn
                            }, n = {
                                templateUrl: "/cdn1103/resource/templates/modal/user/addressInfos.html",
                                controller: "id3ModalAddressCtrl"
                            };
                            break;
                        default:
                            var a = "Success" == t.result ? "msgJoinUsUKInvalidPostalCode" : "msgJoinUsUKServiceUnavailable";
                            e.msg = {
                                title: i.instant("txtJoinUsSignUp"),
                                content: i.instant(a)
                            }
                    }
                    o.dialog(e, r ? n : null).result.then(function (t) {
                        t && (e.addressForm.selectedOpt = t, e.registerForm.BuildingName = t.Premise, e.registerForm.BuildingNumber = t.Building, e.registerForm.Street = t.Street, e.registerForm.City = t.City, e.registerForm.PostalCode = t.ZipPostcode)
                    })
                })
            }, e.goPage = function (t) {
                e.wizard.stepIndex = t, a(0)
            }, e.$watch("registerForm.UserId", function (t) {
                t && e.accountForm.userId.$valid && (e.verifyForm.guId = getGuid(), o.fetch("POST", "/service/registerApi/verifyLoginId", {
                    loginId: t,
                    guId: e.verifyForm.guId
                }).then(function (t) {
                    e.verifyForm.userId = t
                }))
            }), e.$watch("registerForm.Email", function (t) {
                t && e.contactForm.email.$valid && (e.verifyForm.guId = getGuid(), o.fetch("POST", "/service/registerApi/verifyEmail", {
                    emailAddress: t,
                    guId: e.verifyForm.guId
                }).then(function (t) {
                    e.verifyForm.email = t
                }))
            }), e.wizardStep1 = {
                validate: function (t) {
                    return !(!t.$dirty && t.$invalid || !e.wizardStep1.validateCountry() || !e.wizardStep1.propsValidate(t, "salutation") || !e.wizardStep1.propsValidate(t, "firstName") || !e.wizardStep1.propsValidate(t, "middleName") || !e.wizardStep1.propsValidate(t, "lastName") || !e.wizardStep1.propsValidate(t, "nationality") || !e.wizardStep1.propsValidate(t, "placeofbirth") || !e.wizardStep1.propsValidate(t, "dateofbirth"))
                },
                validateCountry: function () {
                    return !!e.options.countries && (e.registerForm.CountryName && r("filter")(e.options.countries, {
                        Name: e.registerForm.CountryName
                    }, !0).length > 0)
                },
                propsValidate: function (t, n) {
                    var i = !0;
                    if (!t || !n || !t[n]) return !0;
                    switch (n) {
                        case "salutation":
                            if (!t.$dirty) return !1;
                            i = -1 != e.registerForm.GenderId;
                            break;
                        case "middleName":
                            i = t[n].$valid;
                            break;
                        case "firstName":
                        case "lastName":
                            if (!t[n].$dirty) return !1;
                            i = t[n].$valid;
                            break;
                        case "nationality":
                            if (!e.options.nationalities || !e.registerForm.NationalityName) return !1;
                            if (void 0 === e.registerForm.NationalityName) return !1;
                            i = r("filter")(e.options.nationalities, {
                                Name: e.registerForm.NationalityName
                            }, !0).length > 0;
                            break;
                        case "placeofbirth":
                            if (!e.options.nationalities || !e.registerForm.PlaceOfBirthName) return !1;
                            if (void 0 === e.registerForm.PlaceOfBirthName) return !1;
                            i = r("filter")(e.options.nationalities, {
                                Name: e.registerForm.PlaceOfBirthName
                            }, !0).length > 0;
                            break;
                        case "dateofbirth":
                            if (!t[n].$dirty) return !1;
                            if (!isValidDate(e.birth.year + "-" + e.birth.month + "-" + e.birth.date)) return !1;
                            var o = new Date(e.birth.year, e.birth.month - 1, e.birth.date).getAges();
                            i = "-1" !== e.birth.date && "-1" !== e.birth.month && "-1" !== e.birth.year && o >= e.legalAge
                    }
                    return i
                }
            }, e.wizardStep2 = {
                validate: function (t) {
                    return !(!t.$dirty && t.$invalid || !e.wizardStep2.propsValidate(t, "address") || !e.wizardStep2.propsValidate(t, "postalCode") || !e.wizardStep2.propsValidate(t, "city") || !e.wizardStep2.propsValidate(t, "email") || !e.wizardStep2.propsValidate(t, "confirmEmail") || !e.wizardStep2.propsValidate(t, "mobileNo") && !e.wizardStep2.propsValidate(t, "homeNo") || !e.wizardStep2.propsValidate(t, "buildingName") || !e.wizardStep2.propsValidate(t, "buildingNumber") || !e.wizardStep2.propsValidate(t, "street") || !e.wizardStep2.propsValidate(t, "region"))
                },
                propsValidate: function (t, n) {
                    var r = !0;
                    if (!t || !n || !t[n]) return !0;
                    if (!t.$dirty) return !1;
                    switch (n) {
                        case "address":
                        case "postalCode":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid;
                            break;
                        case "city":
                        case "buildingNumber":
                        case "street":
                            if (!t[n].$dirty && !e.addressForm.selectedOpt) return !1;
                            r = t[n].$valid;
                            break;
                        case "buildingName":
                        case "region":
                            r = t[n].$valid;
                            break;
                        case "email":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid && 1 == e.verifyForm.email;
                            break;
                        case "confirmEmail":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid && e.registerForm.EmailConfirm.toLowerCase() === e.registerForm.Email.toLowerCase();
                            break;
                        case "mobileNo":
                            if (!t[n].$dirty) return !1;
                            r = "-" !== e.registerForm.MobileExt && t[n].$valid;
                            break;
                        case "homeNo":
                            if (!t[n].$dirty) return !1;
                            r = "-" !== e.registerForm.HomeExt && t[n].$valid
                    }
                    return r
                }
            }, e.wizardStep3 = {
                validate: function (t) {
                    return !(!t.$dirty && t.$invalid || !e.wizardStep3.propsValidate(t, "userId") || !e.wizardStep3.propsValidate(t, "passwd") || !e.wizardStep3.propsValidate(t, "passConfirm") || !e.wizardStep3.propsValidate(t, "secureQ") || !e.wizardStep3.propsValidate(t, "secureAnswer") || !e.wizardStep3.propsValidate(t, "currency"))
                },
                propsValidate: function (t, n) {
                    var r = !0;
                    if (!t || !n || !t[n]) return !0;
                    switch (n) {
                        case "userId":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid && 1 == e.verifyForm.userId;
                            break;
                        case "passwd":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid && e.registerForm.Passwd.toLowerCase() != e.registerForm.UserId.toLowerCase();
                            break;
                        case "passConfirm":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid && e.registerForm.PasswdConfirm === e.registerForm.Passwd;
                            break;
                        case "secureQ":
                            if (!t[n].$dirty) return !1;
                            r = -1 != e.registerForm.SecQuestion;
                            break;
                        case "secureAnswer":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid;
                            break;
                        case "currency":
                            r = -1 != e.registerForm.CurrencyCode
                    }
                    return r
                }
            }, e.$watch("registerForm.CountryName", function (t) {
                function n(e, t) {
                    return !!(e && t && e.Name) && e.Name.toLowerCase().trim() === t.toLowerCase().trim()
                }
                if (e.options.countries && t && !t.Id) {
                    var i = r("filter")(e.options.countries, t, n);
                    i.length > 0 && (t = i[0])
                }
                e.options.countries && t && t.Id && t.Code && c(t)
            })
        }

        function t(e, t, n) {
            e.close = function () {
                n.dismiss("cancel")
            }, e.confirm = function () {
                n.close(e.addressForm.selectedOpt)
            }
        }

        function n() {
            var e = $("#captchaImg2");
            $("#captchaCode").val("");
            var t = e.attr("src");
            e.attr("src", t + "?" + (new Date).valueOf()).text("")
        }
        angular.module("starApp").controller("userRegistrationCtrl", e).controller("id3ModalAddressCtrl", t), e.$inject = ["$scope", "$q", "$filter", "$translate", "dataService", "$anchorScroll", "$element", "$timeout"], t.$inject = ["$scope", "$filter", "$modalInstance", "$translate"]
    }()
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e, t, n, r, i) {
            e.onInit = function () {
                var n = t("attrsFilter")(gv.prods, "allows", uv.pd.r, !0);
                e.PCHQuickMenuProds = t("filter")(n, {
                    isPCHQuickMenuEnable: !0
                })
            }, e.submitForm = function (t) {
                i.fetch("POST", t).then(function (t) {
                    e.msg = t
                })
            }, e.PCHQuickMenuProds = [], e.postData = []
        }
        angular.module("starApp").controller("bankingPaymentCtrl", n).directive("autoSubmitForm", function (e) {
            return {
                restrict: "A",
                link: function (t, n, r) {
                    e(function () {
                        n.submit()
                    }, 100)
                }
            }
        }), n.$inject = ["$scope", "$filter", "$http", "$translate", "dataService"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e) {
            return {
                getTransferKey: function (e) {
                    switch (e *= 1) {
                        case 0:
                            return "txtStatementSportbook";
                        case 6:
                            return "txtStatementOrientalSuite";
                        case 12:
                            return "navBingoRoot";
                        case 21:
                            return "txtComEuroLiveDealerAndSlot";
                        case 23:
                            return "txt188BETGames";
                        default:
                            return ""
                    }
                },
                getTransferPartnerIds: function () {
                    var t = [];
                    return e.availablePartners.forEach(function (e) {
                        e.isMaintenance || 0 === e.transferId || -1 !== t.indexOf(e.transferId) || t.push(e.transferId)
                    }), t
                },
                getTransferToolTipKey: function (e) {
                    switch (e *= 1) {
                        case 21:
                            return "titCommonNetEnt";
                        case 23:
                            return "titCommon188BETGames";
                        default:
                            return ""
                    }
                }
            }
        }

        function r(e, t, n, r, i, o, a) {
            function s() {
                (uv.sessionD.excluded || uv.sessionD.suspended) && r(["txtStatementTransfer", "msgResGamingExclusion"]).then(function (t) {
                    e.msg = {
                        title: t.txtStatementTransfer,
                        content: t.msgResGamingExclusion
                    }, e.hideClose = !0, n.dialog(e)
                }), e.transferData = {
                    from: -1,
                    to: -1,
                    amount: 0
                }, a.all({
                    myWalletBalance: i.refreshBalance(),
                    partnerWallets: n.fetch("GET", l + "GetTransferBalance", {
                        partnerIds: function () {
                            var t = [];
                            return e.availablePartners.forEach(function (e) {
                                0 !== e.transferId && -1 === t.indexOf(e.transferId) && t.push(e.transferId)
                            }), t
                        }(),
                        guId: c
                    })
                }).then(function (t) {
                    var n = {
                            name: "myWallet",
                            id: 0,
                            balance: t.myWalletBalance
                        },
                        r = t.partnerWallets;
                    r.unshift(n), e.wallets = r
                })
            }
            var l = t.myAccountRootApi,
                c = getGuid();
            e.wallets = [], e.guId = c, e.transfer = function (t) {
                (function (t) {
                    if (("VND" === uv.geod.cc || "IDR" === uv.geod.cc) && t.amount < 1e3) return e.msg = {
                        title: r.instant("txtStatementTransfer"),
                        content: r.instant("msgTransferErrorMinLimit") + 1e3 + uv.geod.cc
                    }, n.dialog(e), !1;
                    var i = uv.sessionD.aliases && null !== uv.sessionD.aliases.an && "" !== uv.sessionD.aliases.an;
                    return !!(12 !== t.from && 12 !== t.to || i) || (e.msg = {
                        title: r.instant("txtStatementTransfer"),
                        content: r.instant("msgTransferCreatAliasFirst")
                    }, n.dialog(e), !1)
                })(t) && (t.guId = c, n.fetch("POST", l + "Transfer", t).then(function (t) {
                    switch (t.statusCode) {
                        case 0:
                            s(), e.msg = t;
                            var i = {
                                templateUrl: "/cdn1103/resource/templates/modal/user/transferSuccessPrompt.tpl.html",
                                controller: "modalInstanceCtrl"
                            };
                            n.dialog(e, i);
                            break;
                        case 203:
                            e.msg = {
                                title: r.instant("txtStatementTransfer"),
                                content: r.instant("msgTransferErrorMaxLimit")
                            }, n.dialog(e);
                            break;
                        case 205:
                            e.msg = {
                                title: r.instant("txtStatementTransfer"),
                                content: r.instant("msgTransferRestrictWithdrawal")
                            }, n.dialog(e);
                            break;
                        default:
                            e.msg = {
                                title: r.instant("txtStatementTransfer"),
                                content: r.instant("msgTransferErrorGeneral")
                            }, n.dialog(e)
                    }
                }))
            }, e.getTransferKey = o.getTransferKey, e.isValidTransferForm = function (t) {
                var n = e.wallets.filter(function (e) {
                        return e.id === t.from
                    })[0],
                    r = e.wallets.filter(function (e) {
                        return e.id === t.to
                    })[0];
                return !(!n || !r || n === r || t.amount <= 0 || t.amount > n.balance)
            }, e.isTransferOptionsAvailable = function (t, n) {
                var r = t !== n,
                    i = 0 === t && 0 !== n || 0 === n && 0 !== t,
                    o = !e.client.sessionD.excluded;
                return (-1 === n || r && i) && o
            }, e.isTransferPartnerInMaintenance = function (t) {
                return e.availablePartners.every(function (e) {
                    return e.transferId !== t || e.isMaintenance
                })
            }, e.getTransferToolTipKey = o.getTransferToolTipKey, s()
        }
        angular.module("starApp").factory("transferService", n).controller("transferCtrl", r), r.$inject = ["$scope", "myAccountConst", "dataService", "$translate", "userService", "transferService", "$q"], n.$inject = ["$rootScope"]
    }(window, $)
}, function (e, t) {
    angular.module("starApp").directive("kycQuestionnaire", ["dataService", "uibButtonConfig", "$translate", function (e, t, n) {
        return {
            restrict: "A",
            templateUrl: "/cdn1103/resource/templates/myaccount/kyc_questionnaire.tpl.html?v=" + gv.rv,
            link: function (r) {
                function i(e) {
                    var t = e.questions.map(function (e, t) {
                            return e.index = t, e
                        }),
                        n = e.records.map(function (e) {
                            return e.Answer = null == e.Answer ? void 0 : e.Answer.toString(), e
                        });
                    r.employmentInformation = t.filter(function (e) {
                        return "1" === e.GroupID
                    }), r.sourceOfWealth = t.filter(function (e) {
                        return "2" === e.GroupID
                    }), r.commentBox = t.find(function (e) {
                        return null == e.GroupID
                    }), r.answers = function (e, t) {
                        var n = Array.from({
                            length: e.length
                        });
                        return e.map(function (e, r) {
                            var i = function (e) {
                                var t = {
                                    QuestionId: 0,
                                    Answer: void 0,
                                    Remark: void 0
                                };
                                switch (e.Type) {
                                    case 0:
                                        t.Answer = !1;
                                        break;
                                    case 3:
                                    case 1:
                                    case 2:
                                    default:
                                        t.Answer = void 0
                                }
                                return t
                            }(e);
                            i.QuestionId = e.ID, n[r] = i;
                            var o = t.find(function (t) {
                                return t.QuestionId == e.ID
                            });
                            o && (i.Answer = 0 == e.Type ? function (e) {
                                return e && (1 == e || 0 == e) && (e = 1 == e), e
                            }(o.Answer) : o.Answer, i.Remark = o.Remark)
                        }), n
                    }(t, n), r.questionnaire = t, o = r.answers.filter(function (e) {
                        return r.sourceOfWealth.some(function (t) {
                            return t.ID == e.QuestionId
                        })
                    }), r.employedChanged()
                }
                t.activeClass = "icon-check";
                var o = void 0;
                r.loadGuid = getGuid(), r.unemployed = !1, r.showValidate = !1, r.AggreeSOW_KYC = !1, r.answers = void 0, r.employmentInformation = void 0, r.sourceOfWealth = void 0, r.commentBox = void 0, e.fetch("GET", "/service/myaccounttapi/getquestionnaire", {
                    languageCode: gv.lan,
                    currencyCode: uv.geod.cc,
                    docSubmissionId: getFromSearch("docSubmissionId"),
                    accountId: uv.sessionD.aId,
                    guId: r.loadGuid
                }).then(function (e) {
                    i(e)
                }), r.submitSOW = function () {
                    if (r.showValidate = !0, r.form.$valid || r.AggreeSOW_KYC) {
                        var t = {
                            Answers: function (e) {
                                return e.map(function (e) {
                                    var t = Object.assign({}, e);
                                    return "string" == typeof t.Answer ? t.Answer = parseInt(t.Answer) : "boolean" == typeof t.Answer && (t.Answer = !0 === t.Answer ? 1 : 0), void 0 === t.Remark && (t.Remark = ""), t
                                })
                            }(r.answers),
                            AccountId: uv.sessionD.aId,
                            MemberCode: uv.sessionD.memberCode,
                            DocSubmissionId: getFromSearch("docSubmissionId"),
                            DocTypeId: getFromSearch("docType"),
                            guId: getGuid()
                        };
                        e.fetch("POST", "/service/myaccounttapi/savequestionnaire", t).then(function (t) {
                            1 == t ? (r.msg = {
                                title: n.instant("txtComAnnouncement"),
                                content: n.instant("msgComSubmitSuccess")
                            }, e.dialog(r).result.then(function () {
                                window.location.href = "/" + gv.lan + "/my-account/profile-verification"
                            })) : (r.msg = {
                                title: n.instant("txtComAlert"),
                                content: n.instant("msgCommonSystemError")
                            }, e.dialog(r))
                        })
                    }
                }, r.showValid = function () {
                    r.showValidate = !0
                }, r.ClickAggreeSOW_KYC = function () {
                    r.AggreeSOW_KYC = !r.AggreeSOW_KYC
                }, r.checkboxClicked = function (e) {
                    e.Answer = !e.Answer, r.form.sourceOfWealth.$setDirty(), r.form.sourceOfWealth.$setTouched()
                }, r.cleanRemark = function (e) {
                    e.Remark = void 0
                }, r.employedChanged = function () {
                    r.unemployed = "22" === r.answers.find(function (e) {
                        return "1" == e.QuestionId
                    }).Answer, r.employmentInformation.filter(function (e) {
                        return "1" !== e.ID && "6" !== e.ID
                    }).forEach(function (e) {
                        return e.IsRequired = 0 == r.unemployed
                    }), r.unemployed && r.answers.filter(function (e) {
                        return "2,3,4,5".indexOf(e.QuestionId) > -1
                    }).forEach(function (e) {
                        e.Answer = void 0, e.Remark = void 0
                    })
                }, r.someSelected = function () {
                    return r.answers.filter(function (e) {
                        return r.sourceOfWealth.some(function (t) {
                            return t.ID == e.QuestionId
                        })
                    }).some(function (e) {
                        return e.Answer
                    })
                }, r.selectedRemarkOption = function (e, t) {
                    return e.Options.some(function (e) {
                        return e.Seq == t && e.HasRemark
                    })
                }
            }
        }
    }])
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(n, r, i, o, a, s, l) {
            function c() {
                s.all({
                    options: r.fetch("GET", u + "getProfileOptions", {
                        LanguageCode: gv.lan,
                        guId: g
                    }),
                    profileVm: r.fetch("GET", u + "getProfile")
                }).then(function (e) {
                    n.options = e.options;
                    var t = e.profileVm; - 1 !== t.howDoYouLearnAnswer.indexOf("Others,") ? (t.howDoYouLearnOther = t.howDoYouLearnAnswer.substring(7), t.howDoYouLearn = t.howDoYouLearnAnswer.substring(0, 7)) : t.howDoYouLearn = t.howDoYouLearnAnswer, n.profileVm = t, d = angular.copy(t);
                    var r = "UK" === uv.pd.r || "IM" === uv.pd.c;
                    n.disableProp = n.profileVm.hasDeposit || n.profileVm.hasAdjustment || 1 === n.profileVm.kycStatus || n.profileVm.isPhotoIdAccept || r,
                        function (e) {
                            var t = l("filter")(n.options.countrieslegalage, {
                                Id: e
                            }, !0) || "";
                            n.legalAge = 18, t.length > 0 && (n.legalAge = t[0].Name), n.dateoptions = {
                                date: [31],
                                month: [12],
                                year: [m - 90, m - n.legalAge]
                            }
                        }(t.countryId), n.dateoptions.year[0] = function (e, t) {
                            var n = e - t;
                            return n < 0 ? t + n : t
                        }(t.yearOfBirth, n.dateoptions.year[0])
                })
            }
            var u = o.myAccountRootApi,
                d = {},
                m = (new Date).getFullYear(),
                g = getGuid();
            n.profileVm = {}, n.differProp = [], n.options = [], n.disableProp = !1, n.requireFullName = "China" === uv.pd.r || "Indonesia" === uv.pd.r || "Vietnam" === uv.pd.r, n.dateFormat = o.dateFormat, n.dateoptions = {
                date: [31],
                month: [12],
                year: [m - 90, m - 17]
            }, n.timezoneOptions = ["-12:00", "-11:00", "-10:00", "-09:00", "-08:00", "-07:00", "-06:00", "-05:00", "-04:00", "-03:00", "-02:00", "-01:00", "+00:00", "+01:00", "+02:00", "+03:00", "+03:30", "+04:00", "+04:30", "+05:00", "+05:30", "+05:45", "+06:00", "+06:30", "+07:00", "+08:00", "+09:00", "+09:30", "+10:00", "+11:00", "+12:00", "+13:00"], n.profileCtrl = {
                state: "listing",
                guId: g
            }, n.pattern = {
                phoneNo: new RegExp("^\\d{1,15}$"),
                nospecCharDigit: new RegExp("^(?=.*$)(?!.*[~,_:!@#$%^&*\\[\\]()-+'\";`><?|{|}1-9])"),
                nospecChar: new RegExp("^(?=.*$)(?!.*[~,_:!@#$%^&*\\[\\]()-+'\";`><?|{|}])"),
                postCode: new RegExp("^[a-zA-Z0-9-\\s]{0,20}$"),
                nodigits: new RegExp("^\\D{1,10}$")
            }, n.onInit = c, n.changePassword = function () {
                uv.sessionD.suspended || uv.sessionD.isAdminExclusion || (e.location.href = "/" + gv.lan + "/user/changepassword")
            }, n.getDifferent = function () {
                var e = n.profileVm,
                    t = d,
                    r = [];
                for (var i in e) e[i] !== t[i] && r.push(i);
                return n.differProp = r, r
            }, n.validate = function (e, t) {
                var r = !0;
                if (!e || !t || !e[t]) return !0;
                switch (t) {
                    case "nationalityId":
                        if (!n.options.nationalities) return !1;
                        r = n.options.nationalities.filter(function (e) {
                            return e.Id === n.profileVm.nationalityId
                        }).length > 0;
                        break;
                    case "placeOfBirthId":
                        if (!n.options.nationalities) return !1;
                        r = n.options.nationalities.filter(function (e) {
                            return e.Id === n.profileVm.placeOfBirthId
                        }).length > 0;
                        break;
                    case "dayOfBirth":
                        if (!isValidDate(n.profileVm.yearOfBirth + "-" + n.profileVm.monthOfBirth + "-" + n.profileVm.dayOfBirth)) return !1;
                        var i = new Date(n.profileVm.yearOfBirth, n.profileVm.monthOfBirth - 1, n.profileVm.dayOfBirth).getAges();
                        r = "-1" !== n.profileVm.yearOfBirth && "-1" !== n.profileVm.monthOfBirth && "-1" !== n.profileVm.dayOfBirth && i >= n.legalAge
                }
                e[t].$setValidity(t, r)
            }, n.formatNameObj = function (e, t) {
                if (!angular.isArray(t)) return "";
                for (var n = 0; n < t.length; n++)
                    if (e === t[n].Id) return t[n].Name
            }, n.getText = function (e) {
                var n = t(document.forms.profileForm[e]);
                return "select" === n.prop("tagName").toLowerCase() ? n.find("option:selected").text() : n.val()
            }, n.updateProfile = function (e) {
                e.guId = g;
                var t = r.fetch("PUT", u + "updateProfile", e);
                n.msg = {
                    title: i.instant("txtComNotice")
                }, t.then(function (e) {
                    switch (e) {
                        case 0:
                            n.msg.content = i.instant("msgProfileUpdateSucess"), r.dialog(n).result.then(function () {
                                location.reload()
                            });
                            break;
                        case 3:
                            n.msg.content = i.instant("msgSecureInvalidSecQnOrAnswer"), r.dialog(n);
                            break;
                        case 4:
                            n.msg.content = i.instant("msgJoinUsEmailExisted"), r.dialog(n);
                            break;
                        default:
                            n.msg.content = i.instant("msgProfileUpdateFailed"), r.dialog(n)
                    }
                })
            }, n.goPage = function (e) {
                if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) {
                    n.msg = {
                        title: i.instant("txtComNotice"),
                        content: i.instant("msgResGamingSuspended")
                    };
                    var t = {
                        backdrop: "static",
                        templateUrl: "/cdn1103/resource/templates/modal/messageDialog.html",
                        controller: "modalInstanceCtrl"
                    };
                    r.dialog(n, t).result.then(function () {
                        c()
                    })
                } else n.profileCtrl.state = e, a(0)
            }, n.updateHowDoYouLearnAnswer = function () {
                "Others," !== n.profileVm.howDoYouLearn && (n.profileVm.howDoYouLearnOther = ""), n.profileVm.howDoYouLearnAnswer = n.profileVm.howDoYouLearn + n.profileVm.howDoYouLearnOther
            };
            var f = localStorage.getItem("recommendDomain") || !1;
            n.recUrl = f ? JSON.parse(localStorage.getItem("recommendDomain")).recDomains.filter(function (e) {
                return 1 == e.isSucess
            }) : []
        }
        angular.module("starApp").controller("profileCtrl", n).directive("profileListing", [function () {
            return {
                restrict: "E",
                templateUrl: "/cdn1103/resource/templates/myAccount/profile.listing.tpl.html"
            }
        }]).directive("profileConfirm", [function () {
            return {
                restrict: "E",
                templateUrl: "/cdn1103/resource/templates/myAccount/profile.confirm.tpl.html"
            }
        }]).directive("toNum", function () {
            return {
                require: "ngModel",
                link: function (e, t, n, r) {
                    r.$parsers.push(function (e) {
                        return parseInt(e, 10)
                    }), r.$formatters.push(function (e) {
                        return "" + e
                    })
                }
            }
        }).directive("bookMark", function () {
            return {
                link: function (n, r, i) {
                    t(r).click(function () {
                        if (e.sidebar && e.sidebar.addPanel) e.sidebar.addPanel(document.title, e.location.href, "");
                        else if (e.external && "AddFavorite" in e.external) e.external.AddFavorite(location.href, document.title);
                        else {
                            if (e.opera && e.print) return this.title = document.title, !0;
                            alert("Press " + (-1 !== navigator.userAgent.toLowerCase().indexOf("mac") ? "Command/Cmd" : "CTRL") + " + D to bookmark this page.")
                        }
                    })
                }
            }
        }).directive("changepassword", [function () {
            return {
                restrict: "A",
                controller: "userModalChangePassCtrl",
                templateUrl: "/cdn1103/resource/templates/modal/user/changePassword.html"
            }
        }]).directive("novalidateWhenDisable", function () {
            return {
                require: "form",
                restrict: "A",
                link: function (e, n, r, i) {
                    var o = n.find("input");
                    angular.forEach(o, function (n, r) {
                        var o = t(n);
                        e.$watch(function () {
                            return e.$eval(o.attr("ng-disabled"))
                        }, function (e) {
                            if (e) {
                                var t = i[o.attr("name")];
                                angular.isDefined(t) && i.$removeControl(t)
                            }
                        })
                    })
                }
            }
        }).directive("countryFlag", [function () {
            return {
                require: "ngModel",
                restrict: "A",
                link: function (e, n, r, i) {
                    function o(e) {
                        ! function () {
                            var e = s.find("option");
                            "" === e.first().text() && e.first().remove()
                        }();
                        var n = s.find("option");
                        angular.forEach(n, function (n, r) {
                            if (0 != r) {
                                var i = t(n),
                                    o = e[r - 1],
                                    a = angular.isDefined(o) ? o.Code.toLowerCase() : "";
                                i.attr("data-icon", "flag-icon flag-icon-" + a)
                            }
                        })
                    }

                    function a() {
                        i.$viewValue && s.val(i.$viewValue), s.selectpicker({
                            noneSelectedText: ""
                        }), s.selectpicker("refresh")
                    }
                    var s = t(n);
                    e.$watch(r.countryFlag, function (e, t) {
                        angular.isDefined(e) && (o(e), a())
                    }, !0), e.$watch(r.ngModel, function () {
                        a()
                    })
                }
            }
        }]), n.$inject = ["$scope", "dataService", "$translate", "myAccountConst", "$anchorScroll", "$q", "$filter"]
    }(window, $)
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, r, i) {
            function o() {
                var t = getGuid();
                r.fetch("GET", "/service/myaccounttapi/GetResGamingSetting", {
                    guId: t
                }).then(function (t) {
                    e.resGamingSetting = t
                }), e.date = new Date, e.selfExclusionOptions = [{
                    key: "txtCommonMonths",
                    transValue: 6,
                    value: 6
                }, {
                    key: "txtCommonYear",
                    transValue: 1,
                    value: 12
                }, {
                    key: "txtCommonYears",
                    transValue: 2,
                    value: 24
                }, {
                    key: "txtCommonYears",
                    transValue: 5,
                    value: 60
                }, {
                    key: "txtResGamingPermanent",
                    transValue: 9999,
                    value: 9999
                }], e.timeOutOptions = [{
                    key: "txtCommonHours",
                    transValue: 24,
                    value: 1
                }, {
                    key: "txtCommonWeek",
                    transValue: 1,
                    value: 7
                }, {
                    key: "txtCommonMonth",
                    transValue: 1,
                    value: 30
                }, {
                    key: "txtCommonWeeks",
                    transValue: 6,
                    value: 42
                }]
            }

            function a(e, t) {
                for (var n in e)
                    if (e[n].value == t) return e[n];
                return null
            }
            e.resGamingSetting = {};
            var s = "UK" != uv.pd.r ? "/MB" : "/UKMB";
            e.resGamingContentUrl = gv.domains.content + s + "/" + gv.lan + "/corporate-affairs/responsible-gaming.html" + contentsVersionNo(), e.contentUrl = gv.domains.content + s + location.pathname + ".html" + contentsVersionNo(), e.onInit = o, e.setExclusion = function (n, s, l) {
                if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) e.msg = {
                    title: t.instant("txtComNotice"),
                    content: t.instant("msgResGamingSuspended")
                }, u = {
                    backdrop: "static",
                    templateUrl: "/cdn1103/resource/templates/modal/messageDialog.html",
                    controller: "modalInstanceCtrl"
                }, r.dialog(e, u).result.then(function () {
                    o()
                });
                else if (n.isSelfExclusion) c = a(s, n.selfExclusionPeriod), n.localizePeriod = t.instant(c.key, {
                    value: c.transValue
                }), u = {
                    templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                    controller: "modalInstanceCtrl"
                }, e.msg = {
                    title: t.instant("navCorAffairsResponsibleGaming"),
                    content: t.instant("msgResGamingselfExclusionConfirm", {
                        period: n.localizePeriod
                    })
                }, r.dialog(e, u).result.then(function () {
                    ! function (n, a) {
                        var s = {},
                            l = getGuid();
                        e.guId = l, n.guId = l, i.all({
                            englishPeriod: t(a.key + "OnlyEn", {
                                value: a.transValue
                            }),
                            localizePeriod: t(a.key, {
                                value: a.transValue
                            })
                        }).then(function (i) {
                            n.englishPeriod = i.englishPeriod, n.localizePeriod = i.localizePeriod, r.fetch("POST", "/service/myaccounttapi/setExclusion", n).then(function (i) {
                                switch (i) {
                                    case "0000":
                                        e.msg.content = t.instant("msgResGamingAppliedSelfExclusion", {
                                            period: n.localizePeriod
                                        }), s = {
                                            templateUrl: "/cdn1103/resource/templates/modal/User/selfExclusionPrompt.html",
                                            controller: "modalInstanceCtrl",
                                            backdrop: "static",
                                            windowClass: "full-screen",
                                            size: "lg"
                                        }, r.dialog(e, s).result.then(function () {
                                            o(), location.href = "/{0}/my-account/banking/withdrawal".format(gv.lan)
                                        }, function () {
                                            o()
                                        });
                                        break;
                                    default:
                                        e.msg.content = t.instant("msgResGamingFailUpdate"), e.msg.needCancelBtn = !1, s = {
                                            templateUrl: "/cdn1103/resource/templates/modal/messageDialog.html",
                                            controller: "modalInstanceCtrl",
                                            windowClass: "full-screen",
                                            size: "lg"
                                        }, r.dialog(e, s)
                                }
                            })
                        })
                    }(n, c)
                });
                else {
                    var c = a(l, n.timeoutPeriod);
                    n.localizePeriod = t.instant(c.key, {
                        value: c.transValue
                    }), n.englishPeriod = t.instant(c.key + "OnlyEn", {
                        value: c.transValue
                    }), e.resGamingSetting = n, e.msg.title = t.instant("txtResGamingTimeOut"), e.msg.content = t.instant("msgResGamingAppliedTimeOut", {
                        period: n.localizePeriod
                    });
                    var u = {
                        templateUrl: "/cdn1103/resource/templates/modal/User/timeoutPrompt.html",
                        controller: "setTimeOutCtrl",
                        backdrop: "static",
                        windowClass: "full-screen",
                        size: "lg"
                    };
                    r.dialog(e, u)
                }
            }, e.submitLogOut = function () {
                r.fetch("POST", "/service/userapi/logout").then(function (e) {
                    localStorage.removeItem("recommendDomain"), window.location.href = e.redirectUrl
                })
            }
        }

        function t(e, t, n, r) {
            e.cancel = function () {
                t.dismiss("cancel")
            }, e.confirm = function () {
                r.fetch("POST", "/service/myaccounttapi/setExclusion", e.resGamingSetting).then(function (t) {
                    switch (t) {
                        case "0001":
                            r.fetch("POST", "/service/userapi/logout", {
                                Ud: uv.sessionD.memberCode
                            }).then(function (e) {
                                localStorage.removeItem("recommendDomain"), window.location.href = e.redirectUrl
                            });
                            break;
                        default:
                            e.msg.content = n.instant("msgResGamingFailUpdate"), r.dialog(e)
                    }
                })
            }
        }
        angular.module("starApp").controller("resGamingCtrl", e).controller("setTimeOutCtrl", t).directive("setTimeOut", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1103/resource/templates/myaccount/account-settings/setTimeOut.tpl.html"
            }
        }]).directive("setRealityCheck", ["dataService", "$translate", function (e, t) {
            return {
                restrict: "AE",
                templateUrl: "/cdn1103/resource/templates/myaccount/account-settings/setRealityCheck.tpl.html",
                link: function (n) {
                    n.setRealityCheck = function (r) {
                        if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) {
                            n.msg = {
                                title: t.instant("txtComNotice"),
                                content: t.instant("msgResGamingSuspended")
                            };
                            var i = {
                                backdrop: "static",
                                templateUrl: "/cdn1103/resource/templates/modal/messageAlert.html",
                                controller: "modalInstanceCtrl"
                            };
                            e.dialog(n, i)
                        } else e.fetch("POST", "/service/myaccounttapi/setRealityCheck?remindDuration=" + r).then(function (i) {
                            n.msg = {
                                title: t.instant("txtComNotice"),
                                content: i ? t.instant("msgRealityCheckUpdateSucess").format(r) : t.instant("msgCommonSystemError")
                            }, e.dialog(n).result.finally(function () {
                                location.reload()
                            })
                        })
                    }
                }
            }
        }]).directive("setDepositLimit", ["dataService", "$translate", "$q", "$filter", function (e, t, n, r) {
            return {
                restrict: "A",
                templateUrl: "/cdn1103/resource/templates/myaccount/account-settings/setDepositLimit.tpl.html",
                link: function (i, o, a) {
                    function s() {
                        n.all({
                            depositLimitVm: e.fetch("GET", "/service/myaccounttapi/getDepositLimit"),
                            unConfirmDepositLimitVm: e.fetch("GET", "/service/myaccounttapi/getUnConfirmedDepositLimit")
                        }).then(function (e) {
                            i.originalDepositLimit = angular.copy(e.depositLimitVm), i.depositLimitVm = e.depositLimitVm, i.depositLimitVm.period < 0 && (i.depositLimitVm.period = 1), i.unConfirmDepositLimitVm = e.unConfirmDepositLimitVm, i.hasUnConfirmLimit = 0 !== e.unConfirmDepositLimitVm.dateApplied, p = i.depositLimitVm.dateApplied > 0;
                            var n = new Date;
                            m = new Date(e.unConfirmDepositLimitVm.dateApplied), g = m.addDays(1), f = m.addDays(3);
                            var r = -1 == i.depositLimitVm.limit;
                            i.inConfirmPeriod = n > g && n < f, i.showRemoveLimitBtn = !i.hasUnConfirmLimit && !i.inConfirmPeriod && !r,
                                function () {
                                    if (i.hasUnConfirmLimit) {
                                        var e = -1 == i.unConfirmDepositLimitVm.limit;
                                        if (i.inConfirmPeriod) {
                                            var n = t.instant("msgRGDepositLimitConfirmRemove"),
                                                r = t.instant("msgRGDepositLimitConfirmChange", {
                                                    period: l(i.unConfirmDepositLimitVm.period),
                                                    limit: i.unConfirmDepositLimitVm.limit
                                                });
                                            i.hintMessage = e ? n : r
                                        } else {
                                            var o = t.instant("msgRGDepositLimitConfirmRemoveTime", {
                                                    timestamp: c(g)
                                                }),
                                                a = t.instant("msgRGDepositLimitConfirmIncreaseTime", {
                                                    period: l(i.unConfirmDepositLimitVm.period),
                                                    limit: i.unConfirmDepositLimitVm.limit,
                                                    timestamp: c(g)
                                                });
                                            i.hintMessage = e ? o : a
                                        }
                                    } else p && (i.hintMessage = "{0} {1}".format(c(i.depositLimitVm.dateApplied), t.instant("txtResGamingLastChange")))
                                }()
                        })
                    }

                    function l(e) {
                        return i.depositLimitOptions.filter(function (t) {
                            return t.value === e
                        })[0].text
                    }

                    function c(e) {
                        return "{0}(GMT {1})".format(r("date")(e, "dd/MM/yyyy HH:mm", uv.geod.timezone), uv.geod.timezone)
                    }

                    function u(e) {
                        if (!angular.isUndefined(e)) return -1 == e.limit ? 1 / 0 : e.limit / e.period
                    }
                    var d, m, g, f, p;
                    angular.isUndefined(i.guId) ? i.guId = getGuid() : d = i.guId, i.setDepositLimit = function (n) {
                        function r() {
                            n.guId = d, e.fetch("POST", "/service/myaccounttapi/SetDepositLimit", n).then(function (r) {
                                var a;
                                a = r ? o ? t.instant("msgRGDepositLimitComfirmIncrease24") : t.instant("msgRGDepositLimitConfirmChange", {
                                    period: c,
                                    limit: n.limit
                                }) : t.instant("msgResGameDepositLimitFailed"), i.msg.content = a, e.dialog(i), s()
                            })
                        }
                        if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) i.msg = {
                            title: t.instant("txtComNotice"),
                            content: t.instant("msgResGamingSuspended")
                        }, a = {
                            backdrop: "static",
                            templateUrl: "/cdn1103/resource/templates/modal/messageDialog.html",
                            controller: "modalInstanceCtrl"
                        }, e.dialog(i, a).result.then(function () {
                            s()
                        });
                        else {
                            var o = u(n) > u(i.originalDepositLimit);
                            if (i.hasUnConfirmLimit && o) return function () {
                                var n = i.unConfirmDepositLimitVm.limit;
                                i.msg.content = -1 == n ? t.instant("msgRGDepositLimitInMiddleRemove") : t.instant("msgRGDepositLimitInMiddle", {
                                    limit: n
                                }), e.dialog(i)
                            }(), void(i.depositLimitVm = angular.copy(i.originalDepositLimit));
                            var a = {
                                    templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                                    controller: "modalInstanceCtrl"
                                },
                                c = l(n.period);
                            i.msg.content = t.instant("msgRGDepositLimitApplied", {
                                period: c,
                                limit: n.limit
                            }), i.msg.rightBtnTxt = "txtComConfirm", e.dialog(i, a).result.then(r)
                        }
                    }, i.confirmDepositLimit = function () {
                        var n, r = {
                            guId: i.guId
                        };
                        e.fetch("POST", "/service/myaccounttapi/confirmDepositLimit", r).then(function (r) {
                            n = r ? "msgResGameDepositLimitSuccess" : "msgResGameDepositLimitFailed", i.msg.content = t.instant(n), e.dialog(i), s()
                        })
                    }, i.removeDepositLimit = function () {
                        function n() {
                            var n = {
                                period: 1,
                                limit: -1,
                                guId: i.guId
                            };
                            e.fetch("POST", "/service/myaccounttapi/SetDepositLimit", n).then(function (n) {
                                var r;
                                r = n ? t.instant("msgRGDepositLimitConfirmRemove24") : t.instant("msgResGameDepositLimitFailed"), i.msg.content = r, e.dialog(i), s()
                            })
                        }
                        if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) i.msg = {
                            title: t.instant("txtComNotice"),
                            content: t.instant("msgResGamingSuspended")
                        }, r = {
                            backdrop: "static",
                            templateUrl: "/cdn1103/resource/templates/modal/messageDialog.html",
                            controller: "modalInstanceCtrl"
                        }, e.dialog(i, r).result.then(function () {
                            s()
                        });
                        else {
                            var r = {
                                templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                                controller: "modalInstanceCtrl"
                            };
                            i.msg.content = t.instant("msgRGDepositLimitAppliedRemove"), i.msg.rightBtnTxt = "txtComConfirm", e.dialog(i, r).result.then(n)
                        }
                    }, i.getDailyLimit = u, i.msg = {
                        title: t.instant("txtResGamingDailyDepositLimits")
                    }, i.depositLimitOptions = [{
                        value: 1,
                        text: t.instant("txtResGamingDaily")
                    }, {
                        value: 7,
                        text: t.instant("txtCommondays", {
                            value: 7
                        })
                    }, {
                        value: 30,
                        text: t.instant("txtCommondays", {
                            value: 30
                        })
                    }], s()
                }
            }
        }]), e.$inject = ["$scope", "$translate", "myAccountConst", "dataService", "$q"], t.$inject = ["$scope", "$modalInstance", "$translate", "dataService"]
    }()
}, function (e, t) {
    ! function (e) {
        "use strict";

        function t(e) {
            return {
                restrict: "AE",
                controller: "bettingHistoryCtrl",
                templateUrl: "/cdn1103/resource/templates/myaccount/statement/bettinghistory/" + e.getProduct() + "/" + e.getPage() + ".tpl.html"
            }
        }

        function n(e, t, n, r, i, o, a, s) {
            function l(n, i) {
                ! function (t) {
                    e.dateRange = t;
                    var n = {
                        token: uv.sessionD.ssid,
                        channelProductId: gv.generals[c].Id,
                        partnerIds: gv.generals[c].partners.map(function (e) {
                            return e.id
                        }),
                        jsDateFrom: t.dateFrom,
                        jsDateTo: t.dateTo,
                        language: gv.lan,
                        region: uv.pd.r,
                        guId: g
                    };
                    r.fetch("GET", "/service/myaccounttapi/GetSettleBet", n).then(function (t) {
                        e.betObj.settlebetModel = t
                    })
                }(t.getDateRange(n, i)),
                function (t) {
                    switch (t) {
                        case 0:
                            e.btnText = "txtComToday";
                            break;
                        case -1:
                            e.btnText = "txtComYesterday";
                            break;
                        case -29:
                            e.btnText = "txtComLast30Days"
                    }
                }(n), e.modalInstance && e.modalInstance.close()
            }
            var c = n.getProduct(),
                u = n.getPage(),
                d = "settled-bets",
                m = u === d,
                g = getGuid();
            e.betObj = {
                    title: m ? "txtStatementBetHistorySettledBets" : "txtStatementBetHistoryUnsettledBets",
                    settlebetModel: [],
                    prod: c,
                    guId: g,
                    getProdTable: function () {
                        return "/cdn1103/resource/templates/myaccount/statement/bettinghistory/{0}/{1}.table.tpl.html".format(c, u)
                    },
                    prodKey: n.getProdKey(c),
                    winOrLose: function (e, t) {
                        return function (n) {
                            if (angular.isUndefined(t) || "" === t) return !0;
                            var r = n[e],
                                i = 0;
                            return r > 0 && (i = 1), 0 === parseInt(r) && (i = 0), r < 0 && (i = -1), i == t
                        }
                    }
                }, e.top = function () {
                    i(0)
                }, e.open = function () {
                    e.modalInstance = o.open({
                        animation: e.animationsEnabled,
                        templateUrl: "/cdn1103/resource/templates/myaccount/daysFilter.html",
                        size: "lg",
                        windowClass: "menu-modal"
                    })
                }, e.searchByDay = l, e.getPartnerName = function (e) {
                    switch (1 * e) {
                        case 3:
                            return a("translate")("titLivsCsnVipsuite");
                        case 6:
                            return a("translate")("titLivsCsnImperialSuite");
                        case 9:
                            return a("translate")("titLivsCsnGrandSuite");
                        case 11:
                            return a("translate")("titLivsCsnRoyalSuite");
                        case 21:
                            return a("translate")("txtComEuroLiveDealer");
                        case 33:
                            return a("translate")("txt188BETGames");
                        case 25:
                            return a("translate")("titLivsCsnAsiaGaming")
                    }
                },
                function () {
                    switch (u) {
                        case d:
                            l(0);
                            break;
                        case "unsettled-bets":
                            ! function () {
                                var t = {
                                    token: uv.sessionD.ssid,
                                    channelProductId: gv.generals[c].Id,
                                    partnerIds: gv.generals[c].partners.map(function (e) {
                                        return e.id
                                    }),
                                    guId: g
                                };
                                r.fetch("GET", "/service/myaccounttapi/GetUnSettleBet", t).then(function (t) {
                                    e.betObj.settlebetModel = t
                                })
                            }()
                    }
                }()
        }
        angular.module("starApp").controller("bettingHistoryCtrl", n).directive("bettingHistory", t).factory("betHistoryService", function () {
            var t = e.location.pathname.split("/"),
                n = {
                    sports: "navSbkRoot",
                    racing: "navRacingRoot",
                    esports: "navESportsRoot",
                    casino: "navCsnRoot",
                    live: "navLiveCsnRoot",
                    livecsn: "navLiveCsnRoot",
                    lotto: "navLottoRoot",
                    bingo: "navBingoRoot",
                    poker: "navPokerRoot",
                    financials: "navFinsRoot",
                    virtual: "navVirtualRoot"
                };
            return {
                getProdKey: function (e) {
                    return n[e.toLowerCase()]
                },
                getProduct: function () {
                    return angular.isUndefined(t[5]) ? "" : t[5].toLowerCase()
                },
                getPage: function () {
                    return angular.isUndefined(t[6]) ? "settled-bets" : t[6].toLowerCase()
                }
            }
        }), t.$inject = ["betHistoryService"], n.$inject = ["$scope", "statementService", "betHistoryService", "dataService", "$anchorScroll", "$modal", "$filter", "$q"]
    }(window)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e) {
            return function (t, n, r) {
                if (!angular.isArray(t)) return 0;
                if (angular.isDefined(n)) {
                    for (var i = 0, o = t.length - 1; o >= 0; o--) i = angular.isDefined(r) ? Math.abs(e.add(t[o][n], i)) : e.add(t[o][n], i);
                    return i
                }
                return t.reduce(function (t, n) {
                    return e.add(t, n)
                })
            }
        }
        angular.module("starApp").factory("statementService", function () {
            return {
                getDateRange: function (e, t) {
                    if (!angular.isNumber(e)) return e;
                    t = !angular.isDefined(t) || t;
                    var n = new Date,
                        r = new Date(n.getFullYear(), n.getMonth(), n.getDate()),
                        i = t ? r.addDays(1) : r,
                        o = r.addDays(e);
                    return {
                        dateTo: i.valueOf(),
                        dateFrom: o.valueOf()
                    }
                }
            }
        }).filter("sum", n).filter("abs", function () {
            return function (e) {
                return angular.isDefined(e) ? Math.abs(e) : 0
            }
        }).constant("myAccountConst", {
            myAccountRootApi: "/service/myaccounttapi/",
            dateFormat: "MM/dd/yyyy, HH:mm:ss"
        }), n.$inject = ["floatCalculator"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e, t, n, r, i, o, a, s, l, c) {
            function u(t, r) {
                ! function (t) {
                    switch (t) {
                        case 0:
                            e.btnText = "txtComToday";
                            break;
                        case -1:
                            e.btnText = "txtComYesterday";
                            break;
                        case -6:
                            e.btnText = "txtComLast7Days";
                            break;
                        case -29:
                            e.btnText = "txtComLast30Days";
                            break;
                        case -89:
                            e.btnText = "txtComLast90Days"
                    }
                }(t), d(n.getDateRange(t, r)), e.modalInstance && e.modalInstance.close()
            }

            function d(n) {
                switch (g = n.dateFrom, f = n.dateTo, e.dateRange = n, m) {
                    case "promotions":
                        var r = {
                            token: uv.sessionD.ssid,
                            periodFrom: g,
                            periodTo: f,
                            guId: e.tranHisCtrl.guId
                        };
                        t.fetch("JSONP", gv.domains.aps + "getPromoStatement", r).then(function (t) {
                            e.tranHisCtrl.transModel = t.claimedRecords
                        });
                        break;
                    case "summary":
                        i = {
                            token: uv.sessionD.ssid,
                            jsDateFrom: g,
                            jsDateTo: f,
                            guId: e.tranHisCtrl.guId,
                            aId: uv.sessionD.aId,
                            currencyCode: uv.geod.cc,
                            productIndexs: e.availableProds.map(function (e) {
                                return e.index
                            }),
                            transferPartnerIds: c.getTransferPartnerIds()
                        }, (o = t.fetch("POST", p + "GetSummaryHistory", i)).then(function (t) {
                            e.tranHisCtrl.transModel = t
                        });
                        break;
                    case "deposit":
                    case "withdrawal":
                        var i = {
                                token: uv.sessionD.ssid,
                                jsDateFrom: g,
                                jsDateTo: f,
                                language: gv.lan,
                                guId: e.tranHisCtrl.guId,
                                transactionType: m
                            },
                            o = t.fetch("GET", p + "GetBankingHistory", i);
                        o.then(function (t) {
                            e.tranHisCtrl.transModel = t
                        });
                        break;
                    case "adjustment":
                        var i = {
                                token: uv.sessionD.ssid,
                                jsDateFrom: g,
                                jsDateTo: f,
                                language: gv.lan,
                                guId: e.tranHisCtrl.guId
                            },
                            a = gv.domains.oldStatement,
                            s = {
                                statement: t.fetch("GET", p + "GetAdjustmentHistory", i),
                                oldStatement: angular.isDefined(a) ? t.fetch("GET", a + p + "GetAdjustmentHistory", i) : {}
                            };
                        l.all(s).then(function (t) {
                            e.tranHisCtrl.transModel = a ? t.statement.concat(t.oldStatement) : t.statement
                        });
                        break;
                    case "transfer":
                        var i = {
                                token: uv.sessionD.ssid,
                                jsDateFrom: g,
                                jsDateTo: f,
                                language: gv.lan,
                                guId: e.tranHisCtrl.guId
                            },
                            a = gv.domains.oldStatement,
                            s = {
                                statement: t.fetch("GET", p + "GetTransferHistory", i),
                                oldStatement: angular.isDefined(a) ? t.fetch("GET", a + p + "GetTransferHistory", i) : {}
                            };
                        l.all(s).then(function (t) {
                            e.tranHisCtrl.transModel = a ? t.statement.concat(t.oldStatement) : t.statement
                        })
                }
            }
            var m, g, f, p = r.myAccountRootApi,
                v = getGuid();
            e.top = function () {
                    o(0)
                }, e.open = function () {
                    e.modalInstance = a.open({
                        animation: e.animationsEnabled,
                        templateUrl: "/cdn1103/resource/templates/myaccount/daysFilter.html",
                        size: "lg",
                        windowClass: "menu-modal"
                    })
                }, e.page = m = s.getPage(), e.searchByDay = u, e.tranHisCtrl = {
                    transModel: [],
                    dateFormat: r.dateFormat,
                    cancelWithdraw: function (n) {
                        e.msg = {
                            title: i.instant("txtStatementCancelRequest"),
                            content: i.instant("msgStatementConfirmCancelRequest"),
                            needCancelBtn: !0
                        }, t.dialog(e).result.then(function () {
                            t.fetch("GET", p + "CancelWithdraw", {
                                transactionId: n
                            }).then(function (n) {
                                switch (n) {
                                    case "000":
                                        d(e.dateRange);
                                        break;
                                    case "101":
                                        e.msg.content = i.instant("msgWithDrawalCancelFail101"), t.dialog(e);
                                        break;
                                    default:
                                        e.msg.content = i.instant("msgSecurePassGeneralError"), t.dialog(e)
                                }
                            })
                        })
                    },
                    getTransferKey: c.getTransferKey,
                    guId: v
                },
                function () {
                    switch (m) {
                        case "promotions":
                            u(-6);
                            break;
                        default:
                            u(0)
                    }
                }()
        }
        angular.module("starApp").controller("transHistoryCtrl", n).directive("transactionHistory", ["transactionHistoryService", function (e) {
            return {
                restrict: "AE",
                controller: "transHistoryCtrl",
                templateUrl: "/cdn1103/resource/templates/myaccount/statement/transactionHistory/" + e.getPage() + ".tpl.html"
            }
        }]).factory("transactionHistoryService", function () {
            var t = e.location.pathname.split("/");
            return {
                getPage: function () {
                    return angular.isDefined(t[5]) ? t[5] : ""
                }
            }
        }), n.$inject = ["$scope", "dataService", "statementService", "myAccountConst", "$translate", "$anchorScroll", "$modal", "transactionHistoryService", "$q", "transferService"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(t, n, r, i, o) {
            n.compose = {
                cancel: function () {
                    e.location.href = "/" + gv.lan + "/inbox"
                },
                send: function (e) {
                    var a = i.getDefaultCategoryByLan(gv.lan),
                        s = {
                            subject: e.subject,
                            recipient: a.senderUri,
                            catId: a.catId,
                            body: e.body.split("\n")
                        };
                    r.send(s).then(function (e) {
                        n.msg = {
                            title: o.instant("navInbox"),
                            content: o.instant("msgInboxSendSuccess"),
                            redirect: "/inbox"
                        }, t.dialog(n)
                    }, function (e) {
                        n.msg = {
                            title: o.instant("navInbox"),
                            content: o.instant("msgInboxSendFail"),
                            redirect: "/inbox"
                        }, t.dialog(n)
                    })
                },
                attach: function (e) {
                    n.compose.attachments.push(e)
                },
                attachments: []
            }
        }
        angular.module("starApp").controller("composeCtrl", n), n.$inject = ["dataService", "$scope", "msgService", "categoryService", "$translate"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e) {
            return function (t) {
                return e.trustAsHtml(t)
            }
        }

        function r(e) {
            return function (t, n) {
                if (!angular.isArray(t)) return t;
                var r = [],
                    i = t.map(function (e) {
                        return e[n]
                    }),
                    o = e("unique")(i);
                return t.forEach(function (e) {
                    var t = e[n],
                        i = o.indexOf(t);
                    null !== t && -1 != i ? (o.splice(i, 1), r.push(e)) : null === t && r.push(e)
                }), r
            }
        }

        function i(e) {
            return {
                getCateName: function (e) {
                    var t = e.catId,
                        n = "188bet";
                    return categorInfo.forEach(function (e) {
                        e.catId !== t || e.lan !== gv.lan || (n = e.name)
                    }), n
                },
                getDefaultCategoryByLan: function (e) {
                    var t, n = categorInfo.filter(function (e) {
                            return "188bet" === e.name.toLowerCase()
                        }),
                        r = n.length;
                    return 0 === r ? t = {
                        senderUri: "mailto:188bet@188bet.com"
                    } : 1 === r ? t = n[0] : r > 1 && n.forEach(function (n) {
                        n.lan === e && (t = n)
                    }), t
                }
            }
        }
        angular.module("starApp").directive("readMessage", [function () {
            return {
                templateUrl: "/cdn1103/resource/templates/inbox/messageReading.tpl.html"
            }
        }]).directive("listMessage", [function () {
            return {
                templateUrl: "/cdn1103/resource/templates/inbox/messageListing.tpl.html"
            }
        }]).directive("announcementListing", [function () {
            return {
                templateUrl: "/cdn1103/resource/templates/inbox/announcementListing.tpl.html"
            }
        }]).filter("htmlToPlaintext", function () {
            return function (e) {
                return e ? String(e).replace(/<[^>]+>/gm, "") : ""
            }
        }).filter("trustAsHtml", n).filter("distinctNotNull", r).filter("dataInPage", function () {
            return function (e, t, n) {
                if (angular.isArray(e)) {
                    var r = (n - 1) * t;
                    return e.length < r ? [] : e.slice(r, r + t)
                }
                return e
            }
        }).factory("categoryService", i).constant("inboxConst", {
            inboxRootApi: "/service/msghubapi/",
            dateFormat: "MM/dd/yyyy, HH:mm:ss"
        }).constant("msgStatus", {
            unRead: 0,
            read: 1,
            archive: 2,
            replied: 3
        }).constant("channelType", {
            inbox: {
                url: "inbox",
                canReply: !gv.firstLaunch && ("Japan" === uv.pd.r || "Korea" === uv.pd.r),
                hasStatus: !0,
                canCompose: !gv.firstLaunch && ("Japan" === uv.pd.r || "Korea" === uv.pd.r),
                canDelete: !0,
                canCheck: !0,
                enumValue: 0
            },
            notifications: {
                url: "notifications",
                canReply: !1,
                hasStatus: !0,
                canCompose: !1,
                canDelete: !0,
                canCheck: !0,
                enumValue: 1
            },
            Mi: {
                url: "",
                canReply: !1,
                hasStatus: !1,
                canCompose: !1,
                canDelete: !1,
                canCheck: !1,
                enumValue: 2
            },
            announcement: {
                url: "announcement",
                canReply: !1,
                hasStatus: !0,
                canCompose: !1,
                canDelete: !0,
                canCheck: !0,
                enumValue: 3
            }
        }), n.$inject = ["$sce"], r.$inject = ["$filter"], i.$inject = ["$translate"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e, t, n, r, i, o, a, s, l, c) {
            e.inbox = {
                    state: "listing",
                    dateFormat: t.dateFormat,
                    openComposeModal: function () {
                        n.dialog(null, {
                            templateUrl: "/cdn1103/resource/templates/modal/inbox/compose.tpl.html",
                            controller: "composeCtrl",
                            items: [],
                            animation: !0
                        })
                    },
                    reply: function (t, a) {
                        var s = function (e) {
                                return e.filter(function (e) {
                                    return e.sender != i.memberUri
                                })
                            }(t).slice(0)[0],
                            l = {
                                subject: s.subject,
                                refId: null == s.refId ? s.id : s.refId,
                                sender: i.memberUri,
                                catId: s.catId,
                                recipient: s.sender,
                                body: a.body.split("\n"),
                                contentType: "text/plain"
                            };
                        i.send(l).then(function (c) {
                            a.body = "", e.msg = {
                                title: r.instant("navInbox"),
                                content: r.instant("msgInboxSendSuccess")
                            }, t.unshift(l), n.dialog(e), i.markAsRequest([s], o.replied)
                        }, function (t) {
                            e.msg = {
                                title: r.instant("navInbox"),
                                content: r.instant("msgInboxSendFail")
                            }, n.dialog(e)
                        })
                    },
                    getCateName: l.getCateName
                }, e.channel = {}, e.msgStatus = o, e.modalInstance = null, e.openMessageSelector = function () {
                    e.modalInstance = c.open({
                        animation: e.animationsEnabled,
                        templateUrl: "/cdn1103/resource/templates/modal/messageSelector.html",
                        size: "lg",
                        windowClass: "menu-modal",
                        scope: e
                    })
                }, e.msgInitChannel = function (t) {
                    i.initChannel(t), e.modalInstance.close()
                }, e.channelType = a, e.msgService = i, e.getCurrentChannel = function () {
                    e.channel = i.getCurrentChannel()
                },
                function () {
                    var t = s.location.pathname.split("/").pop();
                    for (var n in a) {
                        var r = a[n];
                        if (r.url === t) {
                            i.initChannel(r), e.channel = i.getCurrentChannel();
                            break
                        }
                    }
                }()
        }
        angular.module("starApp").controller("inboxCtrl", n), n.$inject = ["$scope", "inboxConst", "dataService", "$translate", "msgService", "msgStatus", "channelType", "$window", "categoryService", "$modal"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(t, n, r, i, o, a, s, l) {
            function c(e, n, i) {
                var o = e === r.announcement,
                    a = {
                        channel: e.enumValue,
                        pageIndex: n,
                        pageSize: i,
                        guId: h
                    };
                return o ? u() : t.fetch("GET", p + "getSummary", a)
            }

            function u() {
                if (!g) {
                    var e = {
                        region: uv.pd.r,
                        lan: gv.lan,
                        pageIndex: 1,
                        pageSize: 1e3,
                        guId: h
                    };
                    g = t.fetch("GET", n.inboxRootApi + "getAnnouncement", e)
                }
                return g
            }

            function d(e) {
                var n = f.pageList.Items;
                f.currentIndex = n.indexOf(e), e.status === i.unRead && m([e], i.read, 1);
                var r = {
                    refId: null == e.refId ? e.id : e.refId,
                    channelType: f.channelType.enumValue,
                    pageIndex: 1,
                    pageSize: 100,
                    guId: h
                };
                t.fetch("GET", p + "getMsg", r).then(function (e) {
                    f.currentMsg = e.Items
                })
            }

            function m(e, n, i) {
                if (f.channelType.hasStatus && 0 !== e.length) {
                    ! function (e) {
                        if (angular.isNumber(e)) switch (f.channelType) {
                            case r.inbox:
                                o.msgCounter.inbox -= e, o.msgCounter.totalCount -= e;
                                break;
                            case r.notifications:
                                o.msgCounter.notifi -= e, o.msgCounter.totalCount -= e;
                                break;
                            case r.announcement:
                                o.msgCounter.announcement -= e
                        }
                    }(i);
                    var s = {
                        MessageIDList: e.map(function (e) {
                            return e.status = n, e.id
                        }),
                        ChangeTo: n,
                        RecipientUri: e[0].recipient,
                        Name: uv.sessionD.memberCode,
                        Host: gv.memberHost
                    };
                    t.fetch("POST", p + "markAs", s).then(function (e) {
                        a.log("success mark as")
                    }, function (e) {
                        a.log(e)
                    })
                }
            }
            var g, f = {},
                p = n.inboxRootApi,
                v = "mailto:{0}@{1}".format(uv.sessionD.memberCode, gv.memberHost),
                h = getGuid();
            return {
                guId: h,
                memberUri: v,
                isAllChecked: function () {
                    return !!(f.pageList && f.pageList.Items.length > 0) && (f.allChecked = f.pageList.Items.every(function (e) {
                        return e.isChecked
                    }), f.isAnyItemChecked = f.pageList.Items.some(function (e) {
                        return e.isChecked
                    }), f.allChecked)
                },
                initChannel: function (t) {
                    f.channelType !== t && (function (t) {
                        var n = t.url;
                        n !== e.location.href.split("/").pop() && (e.history.pushState ? e.history.pushState(null, document.title, n) : location.href = "/{0}/{1}".format(gv.lan, n))
                    }(t), f.channelType = t, f.currentIndex = 0, f.currentMsg = [], c(t, 1, 20).then(function (e) {
                        e.PageSize = 1, f.pageList = e
                    }))
                },
                getCurrentChannel: function () {
                    return f
                },
                send: function (e) {
                    return e.guId = h, t.fetch("POST", p + "sendMsg", e)
                },
                getMessageDetail: d,
                getAnnouncement: u,
                deleteMsg: function () {
                    for (var e = [], t = 0, n = f.pageList.Items, r = n.length; r--;) n[r].isChecked && (n[r].status === i.unRead && t++, e = e.concat(n.splice(r, 1)));
                    f.pageList.TotalCount -= e.length, m(e, i.archive, t)
                },
                markAsRead: function () {
                    var e = [];
                    f.pageList.Items.forEach(function (t, n) {
                        t.isChecked && t.status === i.unRead && e.push(t)
                    }), m(e, i.read, e.length)
                },
                markAsRequest: m,
                checkAll: function () {
                    f.allChecked = !f.allChecked, f.pageList.Items.forEach(function (e, t) {
                        e.isChecked = f.allChecked
                    })
                },
                getNextMessageDetail: function (e) {
                    var t = f.pageList.Items,
                        n = t.length,
                        r = f.currentIndex + e; - 1 === r ? r = n - 1 : r === n && (r = 0), d(t[r])
                },
                deleteCurrent: function () {
                    f.pageList.TotalCount -= 1;
                    var e = f.pageList.Items.splice(f.currentIndex, 1),
                        t = 0;
                    e[0].status === i.unRead && t++, m(e, i.archive, t)
                },
                nextPage: function (e) {
                    f.channelType !== r.announcement && (f.pageList.PageIndex += e, c(f.channelType, f.pageList.PageIndex, 20).then(function (e) {
                        f.pageList.Items = f.pageList.Items.concat(e.Items)
                    }))
                },
                receiveMsg: function (e) {
                    f.channelType && f.channelType.enumValue === e && c(f.channelType, 1, 20).then(function (e) {
                        e.PageSize = 1, f.pageList = e
                    })
                },
                getMsgCounter: function () {
                    uv.sessionD.login && l.all({
                        msgCounter: t.fetch("GET", "/service/MsgHubApi/GetMsgCounter"),
                        announcementPageList: u()
                    }).then(function (e) {
                        o.msgCounter = e.msgCounter;
                        var t = 0;
                        e.announcementPageList.Items.forEach(function (e) {
                            e.status === i.unRead && -1 === e.sender.indexOf("pos=public") && t++
                        }), o.msgCounter.announcement = t, o.msgCounter.totalCount = o.msgCounter.inbox + o.msgCounter.notifi, o.$emit("getMsgCounter")
                    })
                },
                filterBySender: function (e) {
                    var t = e.sender;
                    return -1 !== t.indexOf("pos=both") || -1 !== t.indexOf("pos=member")
                }
            }
        }
        angular.module("starApp").factory("msgService", n), n.$inject = ["dataService", "inboxConst", "channelType", "msgStatus", "$rootScope", "$log", "$sanitize", "$q"]
    }(window, $)
}, function (e, t) {
    function n(e, t, n, r, i, o) {
        return function () {
            if (uv.sessionD.login && $.connection && $.connection.hub && $.connection.signalRHub && ! function () {
                    try {
                        return window.self !== window.top
                    } catch (e) {
                        return !0
                    }
                }()) {
                $.connection.hub.url = gv.domains.rtms + "/signalr/hubs";
                var o = $.connection.hub,
                    a = $.connection.signalRHub;
                o.qs = {
                    token: uv.sessionD.ssid,
                    channelId: gv.channelId
                }, o.start().done(function () {}).fail(function (e) {}), a.client.kickout = function (n) {
                    if (n) {
                        var r = e.$new(),
                            o = isNaN(n) ? "msgRG" : "msgLoginError";
                        t.fetch("POST", "/service/userapi/logout").then(function (e) {
                            return r.msg = {
                                title: i.instant("txtComNotice"),
                                content: i.instant(o + n)
                            }, t.dialog(r).result.finally(function () {
                                localStorage.removeItem("recommendDomain"), window.location.href = e.redirectUrl
                            })
                        })
                    }
                }, a.client.receiveMsg = function (o, a) {
                    switch (a) {
                        case n.inbox.enumValue:
                            e.msgCounter.inbox += 1, e.msgCounter.totalCount += 1, r.receiveMsg(a), i("msgInboxHasMail").then(function (e) {
                                t.mi({
                                    body: e.format(1)
                                })
                            });
                            break;
                        case n.notifications.enumValue:
                            e.msgCounter.notifi += 1, e.msgCounter.totalCount += 1, r.receiveMsg(a), i("msgInboxHasNotification").then(function (e) {
                                t.mi({
                                    body: e.format(1)
                                })
                            });
                            break;
                        case n.Mi.enumValue:
                            e.$apply(function () {
                                t.mi({
                                    body: o.body.join(" ")
                                })
                            })
                    }
                }
            }
        }
    }
    angular.module("starApp").factory("signalRHub", n), n.$inject = ["$rootScope", "dataService", "channelType", "msgService", "$translate", "userService"]
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t) {
            e.widget = {}, e.onInit = function () {
                var n = gv.generals.bingo.feeds.BingoRoom,
                    r = gv.generals.bingo.categories;
                angular.forEach(r, function (e) {
                    var r = t("filter")(n, {
                        fv1: e.uniqueKey
                    }, !0)[0];
                    e.identifier = r.fv0, e.roomId = r.fv1, e.gameName = r.fv2, e.pot = r.fv3, e.bonuspot = r.fv4, e.price = r.fv5, e.players = r.fv6, e.startTime = r.DateCreated
                }), e.roomInfos = r
            }
        }

        function t(e, t) {
            function n(n) {
                e.widget.pageIndex = 1;
                var r = n - (new Date).getDay(),
                    i = (new Date).addDays(r).setHours(0, 0, 0, 0),
                    o = (new Date).addDays(r + 1).setHours(0, 0, 0, 0);
                e.currnetGames = t("filter")(e.totalGames, function (e) {
                    return 1 * e.startTime >= i && 1 * e.startTime <= o
                }, !0), e.widget.tabIndex = n;
                var a = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.widget.totalPage = Math.ceil(e.currnetGames.length / e.widget.pageSize), e.perPageGames = e.currnetGames.slice(a, a + e.widget.pageSize)
            }
            e.gameName = "", e.totalGames = [], e.perPageGames = [], e.widget = {
                tabIndex: (new Date).getDay(),
                pageIndex: 1,
                pageSize: 10,
                totalPage: 1
            }, e.onInit = function () {
                var r = gv.generals.bingo.categories,
                    i = location.pathname.split("/");
                e.gameName = 4 === i.length ? i[3] : "", e.roomInfo = t("filter")(r, {
                    uniqueKey: e.gameName
                }, !0)[0];
                var o = t("filter")(gv.generals.bingo.feeds.BingoRoom, {
                        fv1: e.gameName
                    }, !0)[0],
                    a = t("filter")(gv.generals.bingo.feeds.BingoGame, {
                        fv1: e.gameName
                    }, !0);
                e.roomInfo.identifier = o.fv0, e.roomInfo.roomId = o.fv1, e.roomInfo.gameName = o.fv2, e.roomInfo.pot = o.fv3, e.roomInfo.bonuspot = o.fv4, e.roomInfo.price = o.fv5, e.roomInfo.players = o.fv6, e.roomInfo.startTime = o.DateCreated, angular.forEach(a, function (t) {
                    var n = {};
                    n.gameName = t.fv5, n.startTime = t.fv2, n.price = t.fv7, n.bonusTicket = t.fv9, e.totalGames.push(n)
                }), n(e.widget.tabIndex)
            }, e.switchWeekDay = n, e.$watch("widget.pageIndex", function () {
                var t = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.perPageGames = e.currnetGames.slice(t, t + e.widget.pageSize)
            })
        }
        angular.module("starApp").controller("bingoRoomlistCtrl", e).controller("bingoRoominfoCtrl", t).directive("bingoRoomlist", [function () {
            return {
                restrict: "A",
                controller: "bingoRoomlistCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/bingo-roomlist.wg.html"
            }
        }]).directive("bingolauncher", ["$translate", "dataService", function (e, t) {
            return {
                restrict: "A",
                link: function (n, r, i) {
                    function o(e) {
                        i.$set("href", e), i.$set("target", "_blank")
                    }
                    o("/" + gv.lan + "/bingo/lobby?roomId=" + (i.bingolauncher || "")), n.$watch(i.bingolauncher, function (e) {
                        o("/" + gv.lan + "/bingo/lobby?roomId=" + e)
                    }), r.bind("click", function (r) {
                        uv.sessionD.login || (n.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgCommonRequestLogin")
                        }, t.dialog(n), r.stopPropagation(), r.preventDefault())
                    })
                }
            }
        }]).directive("bingoRoombox", ["$compile", function (e) {
            return {
                restrict: "A",
                link: function (t, n) {
                    n.bind("mouseover", function () {
                        if (!(n.find("div.bingo-popup").length > 0)) {
                            var r = e(angular.element('<div class="bingo-popup" bingo-gamepopup></div>'))(t);
                            n.append(r)
                        }
                    }).bind("mouseleave", function () {
                        var e = n.find("div.bingo-popup");
                        e && angular.element(e).remove()
                    })
                }
            }
        }]).directive("bingoGamepopup", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1103/resource/templates/widgets/bingo-gamePopup.tpl.html"
            }
        }]).directive("bingoGameinfo", [function () {
            return {
                restrict: "A",
                controller: "bingoRoominfoCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/bingo-roomInfo.tpl.html"
            }
        }]), e.$inject = ["$scope", "$filter"], t.$inject = ["$scope", "$filter"]
    }()
}, function (e, t, n) {
    (function (e) {
        ! function () {
            "use strict";

            function t(e) {
                return function (t) {
                    var n = [];
                    return gv.generals.casino.feeds.Jackpot && (n = e("filter")(gv.generals.casino.feeds.Jackpot, function (e) {
                        return !(e.keyIndex != t || -1 == e.fv4.indexOf(uv.sessionD.deviceOS) && -1 == e.fv4.indexOf("HTML5") || e.fv2 != uv.geod.cc && "*" != e.fv2)
                    }, !0)), n.length > 0 ? 1 * n[0].fv1 : 0
                }
            }

            function n(e) {
                e.allowPlayForFun = "UK" !== uv.pd.r || uv.sessionD.login
            }

            function r(e, t, n, r, i, o, a, s) {
                function l(n) {
                    if (e.widget.selCategory != n) {
                        e.widget.selCategory = n || e.widget.selCategory, e.widget.preCategory = n || e.widget.selCategory;
                        var r = {
                            Category: e.widget.selCategory,
                            lan: gv.lan
                        };
                        o.fetch("POST", "/service/casinoApi/getgames", r).then(function (r) {
                            e.widget.gameLimit = 20, e.featureGame = r[0] || {}, e.totalgames = r, "" == n && (e.general.categories = e.general.categories.filter(function (t) {
                                return e.totalgames.some(function (e) {
                                    return -1 !== e.categories.indexOf(t.uniqueKey)
                                })
                            })), angular.forEach(e.totalgames, function (r) {
                                if (r.minBets = r.attrs.CsnMinBet.toString(), "" == n) {
                                    var i = {
                                        uniqueKey: r.uniqueKey,
                                        partnerId: r.partnerId,
                                        Name: t("getResource")(r.resource, "DisplayName")
                                    };
                                    1 != uv.sessionD.login && "true" != r.attrs.SupportDemo.toString() || e.searchOptions.push(i)
                                }
                            }), e.groupAttrs.Themes = t("filter")(gv.generals.casino.resource, {
                                localizationType: 901
                            }, !0), e.groupAttrs.BonusType = t("filter")(gv.generals.casino.resource, {
                                localizationType: 902
                            }, !0), e.groupAttrs.WinLine = t("countBy")(e.totalgames, "attrs.SlotWinLine"), e.groupAttrs.MinBet = t("countBy")(e.totalgames, "minBets"), e.filteredgames = r.slice(0, e.totalgames.length), c()
                        })
                    }
                }

                function c() {
                    (e.czfilter.theme.length > 0 || e.czfilter.theme.length > 0 || e.czfilter.bounsType.length > 0 || e.czfilter.minBets.length > 0) && (e.widget.selCategory = "custom"), 0 != e.totalgames.length && (e.filteredgames = t("orderBy")(e.totalgames.slice(0, e.totalgames.length), e.czfilter.sortBy, !0), e.filteredgames = 0 != e.czfilter.theme.length ? t("filter")(e.filteredgames, function (t) {
                        return u(e.czfilter.theme, t.attrs.CsnThemes)
                    }) : e.filteredgames, e.filteredgames = 0 != e.czfilter.bounsType.length && -1 == e.widget.selCategory.indexOf("Slots") ? t("filter")(e.filteredgames, function (t) {
                        return u(e.czfilter.bounsType, t.attrs.SlotBonusType)
                    }) : e.filteredgames, e.filteredgames = 0 != e.czfilter.winlines.length && -1 == e.widget.selCategory.indexOf("Slots") ? t("filter")(e.filteredgames, function (t) {
                        return -1 !== e.czfilter.winlines.indexOf(t.attrs.SlotWinLine.toString())
                    }) : e.filteredgames, e.filteredgames = 0 != e.czfilter.minBets.length ? t("filter")(e.filteredgames, function (t) {
                        return 0 == e.czfilter.minBets.length || -1 !== e.czfilter.minBets.indexOf(t.minBets)
                    }) : e.filteredgames, e.widget.showfeatureGame = 1 == t("filter")(e.totalgames, {
                        uniqueKey: e.featureGame.uniqueKey
                    }, !0).length, e.csngames = e.filteredgames.slice(0, e.widget.gameLimit))
                }

                function u(e, t) {
                    e = e || [], t = t || [];
                    for (var n = !1, r = 0; r < t.length && !(n = -1 != e.indexOf(t[r])); r++);
                    return n
                }
                e.showFilter = "UK" !== uv.pd.r || uv.sessionD.login, e.widget = {
                    selCategory: "all",
                    gameLimit: 20,
                    searchKey: "",
                    showfeatureGame: !0,
                    preCategory: ""
                }, e.featureGame = {}, e.csngames = [], e.filteredgames = [], e.totalgames = [], e.searchOptions = [], e.actualCategory = [], e.czfilter = {
                    sortBy: "betCount",
                    theme: [],
                    winlines: [],
                    bounsType: [],
                    minBets: []
                }, e.groupAttrs = {
                    MinBet: [],
                    Themes: [],
                    WinLine: [],
                    BonusType: []
                }, e.onInit = function () {
                    e.general = gv.generals.casino, e.general.categories = t("attrsFilter")(gv.generals.casino.categories, "disallow", uv.pd.r), l("")
                }, e.openCategory = function () {
                    o.dialog(e, {
                        templateUrl: "/cdn1103/resource/templates/widgets/casino-gameCategory.tpl.html",
                        controller: "csnGameCategoryCtrl",
                        windowClass: "menu-modal"
                    }).result.then(function (e) {
                        l(e)
                    })
                }, e.filterCount = function (t) {
                    return t.uniqueKey == e.widget.selCategory
                }, e.toggleFilter = function () {
                    e.czfilter.theme.length > 0 || e.czfilter.theme.length > 0 || e.czfilter.bounsType.length > 0 || e.czfilter.minBets.length > 0 || o.dialog(e, {
                        size: "lg",
                        templateUrl: "/cdn1103/resource/templates/modal/casino/csn-gamefilter.tpl.html",
                        controller: "csnGameFilterCtrl",
                        windowClass: " "
                    }).result.then(function (t) {
                        e.czfilter = t
                    })
                }, e.updatefilter = function (e, t, n) {
                    if (e.stopPropagation(), e.preventDefault(), angular.isArray(t)) {
                        var r = t.indexOf(n); - 1 != r ? t.splice(r, 1) : t.push(n)
                    }
                }, e.clearfilter = function () {
                    e.czfilter.theme = [], e.czfilter.winlines = [], e.czfilter.bounsType = [], e.czfilter.minBets = [], l(e.widget.preCategory)
                }, e.loadmoreGames = function () {
                    e.widget.gameLimit = e.widget.gameLimit + 20, e.csngames = e.filteredgames.slice(0, e.widget.gameLimit)
                }, e.selectResult = function (e) {
                    var t = 1 == uv.sessionD.login ? "real" : "fun";
                    s.launch(t, e.uniqueKey, e.partnerId), event.stopPropagation(), event.preventDefault()
                }, e.$watch("czfilter", c, !0)
            }

            function i(e, t, n, r) {
                e.switchCategory = function (e) {
                    r.close(e)
                }
            }

            function o(e, t, n, r, i) {
                function o() {
                    e.preczfilter.theme = [], e.preczfilter.winlines = [], e.preczfilter.bounsType = [], e.preczfilter.minBets = []
                }
                e.preczfilter = {
                    sortBy: "betCount",
                    theme: [],
                    winlines: [],
                    bounsType: [],
                    minBets: []
                }, e.close = function () {
                    r.dismiss("cancel")
                }, e.submitFilter = function () {
                    r.close(e.preczfilter)
                }, e.deselectAll = o, o(), e.preczfilter.sortBy = e.czfilter.sortBy, e.preczfilter.theme = e.czfilter.theme, e.preczfilter.winlines = e.czfilter.winlines, e.preczfilter.bounsType = e.czfilter.bounsType, e.preczfilter.minBets = e.czfilter.minBets
            }

            function a(e, t, n, r, i, o, a) {
                t.gameInfo = {}, t.randomTip = {}, t.mediaSrcs = [], t.favoritegames = uv.pd.favs.split(",").map(function (e) {
                    return 1 * e
                }), t.specificGame = {
                    id: "",
                    rate: 0,
                    loginId: ""
                }, t.currentDomain = location.href, t.Back = function () {
                    window.location.href = "/" + gv.lan + "/casino"
                }, t.Oninit = function () {
                    var r = location.pathname.split("/")[3].toLowerCase(),
                        i = {
                            gameName: "lobby" == r ? getFromSearch("gameName") : r,
                            Language: gv.lan,
                            guId: t.guId
                        };
                    o.fetch("GET", "/service/casinoApi/getGameInfo", i).then(function (r) {
                        uv.pd.ratelist = uv.pd.ratelist || {}, t.gameInfo = r, t.specificGame.id = r.id, t.specificGame.rate = uv.pd.ratelist[r.id] || 0;
                        var i = null != gv.generals.casino.tips ? Math.floor(10 * Math.random() + 1) % gv.generals.casino.tips.length : -1;
                        t.randomTip = null != gv.generals.casino.tips ? gv.generals.casino.tips[i] : {}, e.gameBackground = n("getResource")(r.resource, "GameBackground");
                        var o = n("filter")(r.resource, {
                            localizationType: "!0"
                        });
                        angular.forEach(o, function (e) {
                            var r = n("getResource")(e),
                                i = "China" == uv.pd.r ? [2] : [3];
                            "" != r && -1 == ["GameBackground", "Preview"].indexOf(e.key) && -1 == i.indexOf(e.localizationType) && t.mediaSrcs.push({
                                localizationType: e.localizationType,
                                key: e.key,
                                val: r
                            })
                        })
                    })
                }, t.toggleFavgames = function (e) {
                    var n = t.favoritegames.indexOf(e); - 1 == n ? t.favoritegames.push(e) : (t.favoritegames.splice(n, 1), o.fetch("GET", "/service/casinoApi/setfavoritegames", {
                        favoritegames: t.favoritegames.toString()
                    })), uv.pd.favs = t.favoritegames.toString(), i.putObject("prefer", uv.pd, {
                        path: "/"
                    })
                }, t.scrollScreenCaps = function (e) {}, t.isShowFb = function () {
                    var e = !1;
                    return t.cooperativeSet.socialMedia.forEach(function (t) {
                        "facebook" !== t.name || (e = !0)
                    }), e
                }, t.guId = getGuid(), t.$watch("specificGame", function (e) {
                    if ("" != e.id && 0 != e.rate) {
                        var n = angular.isUndefined(uv.pd.ratelist[e.id]),
                            r = n ? e.rate : e.rate - uv.pd.ratelist[e.id];
                        t.gameInfo.rateCount = n ? t.gameInfo.rateCount + 1 : t.gameInfo.rateCount, t.gameInfo.totalRate = t.gameInfo.totalRate + r, t.gameInfo.rating = 0 != t.gameInfo.rateCount ? t.gameInfo.totalRate / t.gameInfo.rateCount : 0, uv.pd.ratelist[e.id] = e.rate, 0 != r && (o.fetch("GET", "/service/casinoApi/setGameRating", {
                            gameId: e.id,
                            rating: r,
                            addCount: n
                        }), i.putObject("prefer", uv.pd, {
                            path: "/"
                        }))
                    }
                }, !0)
            }

            function s(t, n, r, i, o) {
                t.onInit = function () {
                    var e = {
                        recentlyGames: t.suggestGame.recentlygame.toString(),
                        counter: t.widget.counter,
                        language: gv.lan
                    };
                    r.fetch("GET", "/service/casinoApi/getSuggestGames", e).then(function (e) {
                        t.suggestGame.recentlygames = e.recentlygames.filter(function (e) {
                            return null != e
                        }), t.suggestGame.recommendgames = e.recommendgames
                    })
                }, t.global = e, t.widget = {
                    gamesType: i.casinoSuggestgame,
                    counter: 3
                }, t.suggestGame = {
                    recentlygame: [],
                    recommandGames: []
                }, t.suggestGame.recentlygame = o.getObject("recentlyGames") || []
            }

            function l(e, t, n, r, i) {
                return {
                    launch: function (o, a, s) {
                        function l() {
                            ! function (e) {
                                var t = n.getObject("recentlyGames") || [],
                                    r = t.indexOf(e); - 1 != r && t.splice(r, 1), t.push(e);
                                var i = t.length > 3 ? t.length - 3 : 0;
                                n.putObject("recentlyGames", t.slice(i, i + 3), {
                                    path: "/"
                                })
                            }(a), window.location.href = "/" + gv.lan + "/casino/lobby?playfor=" + o + "&gameName=" + a
                        }
                        var c = n.getObject("recentlyGames") || [],
                            u = c.indexOf(a); - 1 != u && c.splice(u, 1), c.push(a), c.length > 3 && c.length;
                        var d = e.$new(),
                            m = i("filter")(gv.generals.casino.partners, {
                                id: s
                            }, !0)[0],
                            g = e.availablePartners.filter(function (e) {
                                return "casino" == m.productName && m.attrs.ParentPartnerId && m.attrs.ParentPartnerId[0] == e.id
                            })[0];
                        if ("real" == o) {
                            if (!uv.sessionD.login) return d.msg = {
                                title: t.instant("txtBtnLogin"),
                                content: t.instant("msgCommonRequestLogin")
                            }, r.dialog(d);
                            if (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) return d.msg = {
                                title: t.instant("txtBtnLogin"),
                                content: t.instant("msgResGamingExclusion")
                            }, r.dialog(d);
                            if (20 === s || g && 23 == g.id) return r.fetch("GET", "/service/myaccounttapi/GetTransferBalance", {
                                partnerIds: [g ? g.transferId : m.transferId],
                                guId: e.guId
                            }).then(function (e) {
                                if (0 === e[0].balance) {
                                    var n = {
                                        templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                                        controller: "modalInstanceCtrl",
                                        backdrop: "static"
                                    };
                                    d.msg = {
                                        title: t.instant("txtComNotice"),
                                        content: 20 == s ? t.instant("msgTransferNetEntFirst") : t.instant("msgTransferEveryMatrixFirst")
                                    }, r.dialog(d, n).result.then(function () {
                                        location.href = "/{0}/my-account/banking/transfer".format(gv.lan)
                                    }, l)
                                } else l()
                            });
                            if (("IDR" == uv.geod.cc || "VND" == uv.geod.cc || "KRW" == uv.geod.cc) && 13 !== s && 17 !== s && 22 !== s && 35 !== s) return d.msg = {
                                title: t.instant("txtComNotice"),
                                content: t.instant("msgCsnTruncated")
                            }, r.dialog(d).result.then(function () {
                                l()
                            })
                        }
                        l()
                    }
                }
            }
            angular.module("starApp").run(n).controller("csnGamelistCtrl", r).controller("csnGameCategoryCtrl", i).controller("csnGameFilterCtrl", o).controller("csnGameInfoCtrl", a).controller("casinoSuggestgameCtrl", s).factory("casinoLaunchService", l).filter("jackpot", t).directive("casinoGamelist", [function () {
                return {
                    restrict: "A",
                    controller: "csnGamelistCtrl",
                    templateUrl: "/cdn1103/resource/templates/widgets/casino-gamelist.wg.html"
                }
            }]).directive("casinoGameinfo", [function () {
                return {
                    restrict: "A",
                    controller: "csnGameInfoCtrl",
                    templateUrl: "/cdn1103/resource/templates/widgets/casino-gameInfo.tpl.html"
                }
            }]).directive("casinoSuggestgame", [function () {
                return {
                    restrict: "A",
                    scope: !0,
                    controller: "casinoSuggestgameCtrl",
                    templateUrl: "/cdn1103/resource/templates/widgets/casino-suggestGame.tpl.html"
                }
            }]).directive("csnlauncher", ["$translate", "$cookies", "dataService", "casinoLaunchService", function (e, t, n, r) {
                return {
                    restrict: "A",
                    link: function (e, t, n) {
                        function i(e, t) {
                            var r = "/" + gv.lan + "/casino/lobby?playfor=" + e + "&gameName=" + t;
                            n.$set("href", r)
                        }
                        var o = n.playfor || "fun";
                        i(o, n.csnlauncher), e.$watch(function () {
                            return $(t).attr("csnlauncher")
                        }, function (e) {
                            i(o, e)
                        }), t.bind("click", function (e) {
                            var t = 1 * n.partnerid;
                            r.launch(o, n.csnlauncher, t), e.stopPropagation(), e.preventDefault()
                        })
                    }
                }
            }]).directive("jackpot", ["$filter", "$interval", function (e, t) {
                return {
                    restrict: "A",
                    scope: {
                        uniqueKey: "=jackpot",
                        txtuniqueKey: "@jackpot"
                    },
                    link: function (n, r) {
                        function i(n) {
                            angular.isUndefined(n) || (s = e("jackpot")(n), r.text(s > 0 ? e("currency")(s, uv.geod.symbol) : ""), angular.isDefined(a) && t.cancel(a), s > 0 && (a = t(o, 1e3)))
                        }

                        function o() {
                            s += .01, r.text(e("currency")(s, uv.geod.symbol))
                        }
                        var a, s = 0;
                        i(n.txtuniqueKey), n.$watch("uniqueKey", function (e) {
                            i(e)
                        })
                    }
                }
            }]).directive("loadingImg", function () {
                return {
                    restrict: "A",
                    link: function (e, t) {
                        t.find("img").on("load", function () {
                            t.removeClass("load-spinner")
                        }).on("error", function () {
                            t.removeClass("load-spinner")
                        })
                    }
                }
            }), n.$inject = ["$rootScope"], l.$inject = ["$rootScope", "$translate", "$cookies", "dataService", "$filter"], r.$inject = ["$scope", "$filter", "$q", "$cookies", "$translate", "dataService", "$rootScope", "casinoLaunchService"], i.$inject = ["$scope", "$filter", "dataService", "$modalInstance"], o.$inject = ["$scope", "$filter", "$q", "$modalInstance", "dataService"], a.$inject = ["$rootScope", "$scope", "$filter", "$q", "$cookies", "dataService", "$timeout"], s.$inject = ["$scope", "$filter", "dataService", "$attrs", "$cookies"], t.$inject = ["$filter"]
        }()
    }).call(t, n(0))
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, r, i, o) {
            function a(n, r) {
                if (e.widget.selPromoType != n) {
                    e.widget.selPromoType = n, e.filteredPromos = t("filter")(e.availablePromos, function (e) {
                        return "all" === n || e.categoryId == n
                    }), e.filteredCategories = t("filter")(e.promoCategories, function (n) {
                        return t("filter")(e.filteredPromos, {
                            categoryId: n.categoryId
                        }, !0).length > 0
                    });
                    var i = window.location.hash;
                    "" != i && o(function () {
                        var e = $(i);
                        e.length > 0 && e[0].scrollIntoView();
                        var t = e[0].getBoundingClientRect().top;
                        window.scrollBy(0, t)
                    }, 1e3), e.widget.selPromoName = r, e.modalInstance && e.modalInstance.close()
                } else e.modalInstance.close()
            }
            var s = gv.domains.aps;
            e.promoGuid = 0, e.availablePromos = [], e.filteredPromos = [], e.promoCategories = [], e.filteredCategories = [], e.widget = {
                selPromoType: "",
                selPromoName: n.instant("txtCommonAll")
            }, e.onInit = function () {
                e.promoGuid = getGuid();
                var i = {
                    countryId: uv.pd.cid,
                    channelId: e.client.sessionD.apsChannelId,
                    member: uv.sessionD.login ? uv.sessionD.ssid : "",
                    guId: e.promoGuid
                };
                r.fetch("JSONP", s + "GetEligiblePromo", i).then(function (r) {
                    angular.forEach(r.promotions, function (n) {
                        n.localization = t("filter")(n.localizations, {
                            code: gv.lan
                        }, !0)[0] || t("orderBy")(n.localizations, "id")[0] || {
                            bannerUrl: ""
                        }, e.availablePromos.push(n)
                    }), angular.forEach(r.promoCategories, function (n) {
                        n.localization = t("filter")(n.localizations, {
                            languageCode: gv.lan
                        }, !0)[0] || t("orderBy")(n.localizations, "id")[0], n.counter = t("filter")(e.availablePromos, {
                            categoryId: n.categoryId
                        }, !0).length, e.promoCategories.push(n)
                    }), a("all", n.instant("txtCommonAll"))
                })
            }, e.open = function () {
                e.modalInstance = i.open({
                    animation: e.animationsEnabled,
                    templateUrl: "/cdn1103/resource/templates/widgets/general-promoCategory.tpl.html",
                    size: "lg",
                    windowClass: "menu-modal",
                    scope: e
                })
            }, e.switchPromoType = a;
            var l = "UK" != uv.pd.r ? "/MB" : "/UKMB";
            e.promoTncUrl = gv.domains.content + l + "/" + gv.lan + "/promo-general-tnc.html" + contentsVersionNo()
        }

        function t(e, t, n, r, i, o) {
            function a() {
                e.promoGuid = getGuid();
                var n = {
                    member: uv.sessionD.login ? uv.sessionD.ssid : "",
                    promoCode: e.promoCode,
                    channelId: e.client.sessionD.apsChannelId,
                    guId: e.promoGuid
                };
                r.fetch("JSONP", c + "checkMemberEligible", n).then(function (n) {
                    e.promoDetail = n.promotion, e.promoSetting = angular.fromJson(n.promotionDetailSetting), e.promoDetail.termsTpl = gv.domains.content + "/templates/Promotions/finalclause.html" + contentsVersionNo(), e.promoDetail.tncTpl = gv.domains.content + "/templates/Promotions/tncLabel.html" + contentsVersionNo(), e.promoDetail.regionalTerms = uv.pd.r + "." + gv.lan, e.isClaimed = "Duplicate Claim Violation" == n.result.remark, e.warningMsg = t("filter")(n.message, {
                        code: gv.lan
                    }, !0)[0], e.isEligible = n.result.isEligible && !uv.sessionD.suspended && !uv.sessionD.isAdminExclusion, e.isRejected = 5 === n.result.bonusStatus, e.isEligible && 1 === e.promoSetting.specialPromoType && (n.memAllowListRemark && e.promoSetting.luckyWheelTheme ? e.prizeWon = n.memAllowListRemark.toLowerCase() : e.isEligible = !1)
                })
            }

            function s() {
                e.promoGuid = getGuid();
                var i = 1 === e.promoSetting.specialPromoType ? uv.pd.did ? uv.pd.did : "-1" : uv.pd.did,
                    o = {
                        token: uv.sessionD.ssid,
                        promoCode: e.promoCode,
                        did: i,
                        promoType: e.promoDetail.promoType.id,
                        channelId: e.client.sessionD.apsChannelId,
                        guId: e.promoGuid
                    },
                    s = 2 === e.promoSetting.specialPromoType;
                s && l(), r.fetch("JSONP", c + "claimPromo", o).then(function (i) {
                    var o = i.result.isVaild,
                        l = "";
                    if (o)
                        if (s) l = n.instant("msgComSubmitSuccess");
                        else {
                            var c = i.result.bonus;
                            l = n.instant("msgPromoSuccessClaim") + (c > 0 ? "<br/>" + n.instant("msgPromoRewardBouns", {
                                bouns: c,
                                currency: uv.geod.cc
                            }) : "")
                        }
                    else {
                        var u = t("filter")(i.result.messages || [], {
                            code: gv.lan
                        }, !0)[0];
                        l = void 0 === u || "General Error" === u.text ? n.instant("msgPromoNotQualified") : u.text
                    }
                    e.isEligible = !o && e.isEligible, e.msg = {
                        title: n.instant("txtComNotification"),
                        content: l
                    }, r.dialog(e).result.then(function () {
                        e.pageStatus.showSurvey = !1, a()
                    })
                })
            }

            function l() {
                var t = {
                    json: JSON.stringify({
                        promoCode: e.promoCode,
                        token: uv.sessionD.ssid,
                        answers: e.answers
                    })
                };
                r.fetch("JSONP", c + "saveAnswer", t).then(function (e) {})
            }
            var c = gv.domains.aps;
            e.contentPath = gv.domains.content + o.contentPath + contentsVersionNo(), e.englishVersionUrl = location.pathname.replace(gv.lan, "en-gb"), e.promoCode = o.promoContent || o.luckyWheel, e.onInit = a, e.checkClaimpromo = function () {
                if (0 == e.promoDetail.allowArray.enableClaimWTPW) {
                    e.msg = {
                        title: n.instant("navPromoRoot"),
                        content: e.warningMsg.text
                    };
                    var t = {
                        templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                        controller: "modalInstanceCtrl"
                    };
                    r.dialog(e, t).result.then(s)
                } else e.claimPromo()
            }, e.claimPromo = s, e.showLuckyWheel = function () {
                e.iframeSrc = "/{0}/promotions/luckywheel?theme={1}&promocode={2}&p={3}&promotype={4}&warningmsg={5}".format(gv.lan, e.promoSetting.luckyWheelTheme, e.promoCode, e.prizeWon, e.promoDetail.promoType.id, e.promoDetail.allowArray.enableClaimWTPW ? "" : encodeURIComponent(e.warningMsg.text)), r.dialog(e, {
                    templateUrl: "/cdn1103/resource/templates/modal/iframeModal.html",
                    controller: "modalInstanceCtrl",
                    size: "sm"
                }).result.finally(function () {
                    a()
                })
            }, e.showQuestionnaire = function () {
                r.fetch("JSONP", c + "getQuestionnaire", {
                    guId: e.promoGuid,
                    promoCode: e.promoCode,
                    langCode: gv.lan
                }).then(function (t) {
                    e.questionnaireSetting = t.questionnaireDetail.setting, e.localization = t.questionnaireDetail.localizations[0], e.answers = e.answers || [], e.pageStatus.showSurvey = !0
                })
            }, e.toggleOption = function (e, t) {
                var n = e.indexOf(t);
                n > -1 ? e.splice(n, 1) : e.push(t)
            }, e.saveAnswer = l, e.isWinners = -1 != location.pathname.toLowerCase().indexOf("/winners"), e.pageStatus = {
                showSurvey: !1
            }
        }

        function n(e, t, n, r, i, o, a) {
            function s(n, r) {
                if (t.widget.selectedCatgory != n) {
                    t.widget.selectedCatgory = n || t.widget.selectedCatgory;
                    var o = "all" == t.widget.selectedCatgory ? e.availableNews.map(function (e) {
                            return e.hashTag
                        }).toString() : t.widget.selectedCatgory,
                        a = {
                            languageCode: gv.lan,
                            keyword: o,
                            month: t.widget.month
                        };
                    i.fetch("GET", "/service/newsApi/GetMonthNews", a).then(function (e) {
                        t.widget.reuslt = e;
                        var n = r ? location.pathname + "#" + t.widget.selectedCatgory : location.pathname;
                        window.history.pushState("", "", n)
                    })
                }
            }
            t.onInit = function () {
                var r = location.pathname.split("/"),
                    i = location.hash.split("#");
                switch (t.widget.catgories = "all" == t.newsType ? e.availableNews : gv.generals[t.newsType].categories, t.widget.selectedCatgory = i.length > 1 ? i[1] : "all" == t.newsType ? "all" : gv.generals[t.newsType].categories[0].uniqueKey, r[2]) {
                    case "news":
                        t.widget.month = r.length > 3 ? r[3] : n("date")(new Date, "MMyyyy", uv.sessionD.timezone);
                        break;
                    case "2016-euro":
                        t.widget.month = r.length > 3 ? -1 : 0;
                        break;
                    default:
                        t.widget.month = 0
                }
                s("", !1),
                    function () {
                        for (var e = [], r = new Date, i = 0; i < 48; i++) {
                            var o = new Date(r.getFullYear(), r.getMonth() - i, 1);
                            e.push({
                                val: o.valueOf(),
                                month: o.getMonth(),
                                year: o.getFullYear(),
                                subOpts: []
                            })
                        }
                        for (var a = e.slice(0, r.getMonth() + 1), s = r.getFullYear() - 1, l = n("filter")(e, {
                                year: s
                            }, !0), i = 0; i < l.length; i++) a.push({
                            val: l[i].val,
                            month: l[i].month,
                            year: l[i].year,
                            subOpts: []
                        });
                        var c = 0 == t.widget.month || -1 == t.widget.month ? r : new Date(t.widget.month.substr(2), parseInt(t.widget.month.substr(0, 2)) - 1);
                        t.options.selected = {
                            val: c,
                            month: c.getMonth()
                        }, t.options.month = a.slice(0, 6)
                    }()
            }, t.switchCatgory = s, t.open = function () {
                t.modalInstance = o.open({
                    animation: t.animationsEnabled,
                    templateUrl: "/cdn1103/resource/templates/widgets/general-newsCategory.tpl.html",
                    size: "lg",
                    windowClass: "menu-modal",
                    scope: t
                })
            }, t.loadMore = function () {
                window.location.href = "/" + gv.lan + "/news"
            }, t.switchModalCatgory = function (e, n) {
                s(e, n), t.modalInstance.close()
            }, t.openDate = function () {
                var e = {
                    templateUrl: "/cdn1103/resource/templates/widgets/general-newsDate.tpl.html",
                    size: "lg",
                    windowClass: "menu-modal",
                    scope: t
                };
                i.dialog(t, e)
            }, t.widget = {
                selectedCatgory: "all",
                catgories: [],
                month: 0,
                reuslt: []
            }, t.options = {
                month: [],
                selected: {
                    month: 0,
                    val: 0
                }
            }, t.newsType = a.generalNewslist || "all", t.redirectUrl = function (e, t) {
                var n = "all" !== e ? "#" + e : "";
                window.location.href = "/" + gv.lan + "/news/" + t + n
            }
        }

        function r(e, t, n, r) {
            function i() {
                r.fetch("GET", "/service/prodApi/getprodFeeds", {
                    prodName: "esports"
                }).then(function (n) {
                    e.widget.categories = [];
                    var r = n.GroupCompetitions;
                    angular.forEach(gv.generals.esports.categories, function (n) {
                        var i = t("filter")(r, {
                            fv1: n.uniqueKey
                        }, !0);
                        i.length > 0 && e.widget.categories.push({
                            id: i[0].fv0,
                            name: n.uniqueKey,
                            competitions: i[0].fv10,
                            resource: n.resource
                        })
                    }), a(e.widget.selectedCategory, !0)
                })
            }

            function o() {
                angular.isDefined(s) && (n.cancel(s), s = void 0)
            }

            function a(a, l) {
                if (l || e.widget.selectedCategory != a) {
                    o(), e.widget.selectedCategory = a || e.widget.selectedCategory;
                    var c = t("filter")(e.widget.categories, {
                            id: e.widget.selectedCategory
                        }, !0)[0],
                        u = gv.domains.sbkfeed + "/en-gb/Service/OddsService?GetEventsByCompetitions",
                        d = {
                            Language: gv.lan,
                            SportId: 23,
                            CompetitionIds: c.competitions,
                            OddsType: uv.sessionD.oddsType,
                            TimeZoneUtcOffset: uv.geod.utcoffset
                        };
                    r.fetch("JSONP", u, d).then(function (t) {
                        e.widget.reuslt.inplay = t["inplay-evs"] || [], e.widget.reuslt.furture = t["further-evs"] || [], e.widget.timer = (new Date).valueOf() + 9e4, s = n(i, 9e4)
                    })
                }
            }
            e.onInit = i, e.openCategory = function () {
                r.dialog(e, {
                    templateUrl: "/cdn1103/resource/templates/widgets/esports-category.tpl.html",
                    controller: "esportsCategoryCtrl",
                    windowClass: "menu-modal"
                }).result.then(function (e) {
                    a(e)
                })
            }, e.stopInterval = o, e.MoreBetCounter = function (e) {
                window.location.href = "/" + gv.lan + "/sports/" + e
            }, e.widget = {
                timer: 90,
                selectedCategory: "1",
                categories: [],
                reuslt: {
                    inplay: [],
                    furture: []
                }
            };
            var s
        }

        function i(e, t) {
            e.switchCategory = function (e) {
                t.close(e)
            }
        }

        function o(e, t, n, r, i, o) {
            function a(n) {
                e.widget.selectedCatgory != n && (e.widget.selectedCatgory = n, e.filteredFaqs = "all" !== n ? t("filter")(e.availableFaqs, {
                    code: e.widget.selectedCatgory
                }) : e.availableFaqs.slice(0, e.availableFaqs.length))
            }
            e.availableFaqs = [], e.filteredFaqs = [], e.top5Faqs = [], e.allFaqs = [], e.matchFaqs = [], e.categories = [], e.widget = {
                selCategory: "all",
                searchKey: "",
                guId: ""
            }, e.onInit = function () {
                e.widget.guId = getGuid();
                var t = {
                    regionCode: uv.pd.r,
                    languageCode: gv.lan,
                    category: "all",
                    guId: e.widget.guId
                };
                n.all({
                    regionFaqs: i.fetch("GET", "/service/faqsApi/getRegionFaqs", t),
                    top5Faqs: i.fetch("GET", "/service/faqsApi/getTop5Faqs", t)
                }).then(function (t) {
                    e.top5Faqs = t.top5Faqs, e.availableFaqs = t.regionFaqs.categories, e.allFaqs = t.regionFaqs.allcontents, angular.forEach(e.availableFaqs, function (t) {
                        e.categories.push({
                            code: t.code,
                            resource: t.resource,
                            priority: t.priority
                        })
                    });
                    var n = location.pathname.split("/");
                    a(n.length > 3 ? n[3] : "all"), e.widget.searchKey = getHashVal("q")
                })
            }, e.switchFaqsCategory = a, e.feedback = function (t, n) {
                switch (t = t || "No") {
                    case "Yes":
                        e.msg = {
                            title: r.instant("titCommonMessage"),
                            content: r.instant("msgFaqsThanksForFeedBack")
                        }, i.dialog(e);
                        break;
                    default:
                        e.msg = {
                            title: r.instant("titCommonMessage"),
                            content: r.instant("msgFaqsSpeakToLiveChat")
                        }, e.faqId = n;
                        var o = {
                            templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                            controller: "modalInstanceCtrl"
                        };
                        i.dialog(e, o).result.then(function () {
                            var e = "/" + gv.lan + "/live-chat?region=" + uv.pd.r;
                            window.open(e, "LiveChat")
                        })
                }
            }, e.confirm = confirm, e.$watch("widget.searchKey", function (n) {
                e.matchFaqs = t("filter")(e.allFaqs, function (e) {
                    return -1 != e.tags.indexOf(n.toLowerCase()) || -1 != e.subject.toLowerCase().indexOf(n.toLowerCase())
                }), (n || oldval) && window.history.pushState("", "", location.pathname + "#q=" + n)
            }), e.openCategory = function () {
                e.modalInstance = o.open({
                    animation: e.animationsEnabled,
                    templateUrl: "/cdn1103/resource/templates/help/faqsCategory.tpl.html",
                    size: "lg",
                    windowClass: "menu-modal",
                    scope: e
                })
            }
        }

        function a(e, t, n, r, i) {
            e.widget = {
                selCategory: "Sports"
            }, e.switchCategory = function (t) {
                e.modalInstance.close(), e.widget.selectedCatgory != t && (e.widget.selectedCatgory = t, location.href = "/" + gv.lan + "/rules/" + t)
            }, ! function (t) {
                e.btnText = "txtTransType" + t.substring(0, 1).toUpperCase() + t.substring(1)
            }(window.location.pathname.split("/")[3]), e.openCategory = function () {
                e.modalInstance = i.open({
                    animation: e.animationsEnabled,
                    templateUrl: "/cdn1103/resource/templates/help/rulesCategory.tpl.html",
                    size: "lg",
                    windowClass: "menu-modal"
                })
            }
        }

        function s(e, t, n, r, i) {
            e.onInit = function () {
                var t = {
                    regionCode: uv.pd.r,
                    languageCode: gv.lan
                };
                i.fetch("GET", "/service/faqsApi/getRegionFaqsCategories", t).then(function (t) {
                    e.faqsCategories = t
                })
            }
        }

        function l(e, t, n, r, i, o) {
            function a() {
                e.filteredOpts = t("filter")(e.allpaymentOpts, function (t) {
                    return -1 != t.supportedCountry.indexOf(e.czfilter.selcountry) && -1 != t.supportedCurrency.indexOf(e.czfilter.selcurrency)
                }, !0), angular.forEach(e.allpaymentOpts, function (e) {
                    e.showDesc = !1
                })
            }
            e.onInit = function () {
                e.form.guId = getGuid, r.all({
                    payOpts: o.fetch("GET", "/service/prodApi/getPaymentOpts", e.form),
                    filtersOpts: o.fetch("GET", "/service/prodApi/GetAllFilters", {
                        lanaguageCode: gv.lan
                    })
                }).then(function (t) {
                    var n = JSON.parse(t.payOpts) || {};
                    e.allpaymentOpts = n[e.widget.optType][0].pOpts, e.widget.opts = t.filtersOpts, a()
                })
            }, e.form = {
                guId: ""
            }, e.widget = {
                optType: n.paymentoptsContent || "Deposit",
                opts: {
                    countries: [],
                    currencies: []
                }
            }, e.czfilter = {
                selcountry: uv.pd.c,
                selcurrency: uv.geod.cc
            }, e.allpaymentOpts = [], e.filteredOpts = [], e.$watch("czfilter.selcountry", a), e.$watch("czfilter.selcurrency", a)
        }

        function c(e, t, n, r) {
            e.switchCategory = function (t) {
                e.modalInstance && e.modalInstance.close(), e.widget.selCategory != t && (e.widget.selCategory = t || e.widget.selCategory)
            }, e.open = function () {
                e.modalInstance = r.open({
                    templateUrl: "mobileCategoryModel.tpl.html",
                    scope: e,
                    windowClass: "menu-modal"
                })
            }, e.widget = {
                selCategory: "iOS"
            }
        }

        function u(e, t) {
            e.onInit = function () {
                t.fetch("GET", "/service/esportsApi/getFrameSrc", {
                    language: gv.lan
                }).then(function (t) {
                    e.iframeSrc = t
                })
            }
        }
        angular.module("starApp").controller("promolistCtrl", e).controller("promoTnCCtrl", t).controller("newslistCtrl", n).controller("esportsGrouplistCtrl", r).controller("esportsCategoryCtrl", i).controller("faqsCtrl", o).controller("faqsCategoriesCtrl", s).controller("rulesCtrl", a).controller("paymentOptsCtrl", l).controller("mobilelistCtrl", c).controller("esportsGameCtrl", u).directive("faqsContent", [function () {
            return {
                restrict: "A",
                controller: "faqsCtrl",
                templateUrl: "/cdn1103/resource/templates/help/faqs.tpl.html"
            }
        }]).directive("faqsCategories", [function () {
            return {
                restrict: "A",
                controller: "faqsCategoriesCtrl"
            }
        }]).directive("rulesContent", ["$window", function (e) {
            return {
                restrict: "A",
                controller: "rulesCtrl",
                templateUrl: "/cdn1103/resource/templates/help/rules.tpl.html",
                link: function (t, n) {
                    t.categoryWidth = $(n).width(), angular.element(e).bind("resize", function () {
                        t.categoryWidth = $(n).width()
                    })
                }
            }
        }]).directive("generalPromolist", ["$window", function (e) {
            return {
                restrict: "A",
                controller: "promolistCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/general-promolist.wg.html",
                link: function (t, n) {
                    t.categoryWidth = $(n).width(), angular.element(e).bind("resize", function () {
                        t.categoryWidth = $(n).width()
                    })
                }
            }
        }]).directive("generalNewslist", ["$window", function (e) {
            return {
                restrict: "A",
                scope: !0,
                controller: "newslistCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/general-newslist.wg.html",
                link: function (t, n) {
                    t.categoryWidth = $(n).width(), angular.element(e).bind("resize", function () {
                        t.categoryWidth = $(n).width()
                    })
                }
            }
        }]).directive("sbkItems", function () {
            return {
                restrict: "A",
                link: function (e) {
                    e.sportsItems = [{
                        key: "football",
                        value: "navSbkRulesFootball"
                    }, {
                        key: "american-football",
                        value: "navSbkRulesAmericanFootball"
                    }, {
                        key: "cricket",
                        value: "navSbkRulesCricket"
                    }, {
                        key: "lottery",
                        value: "navSbkRulesLottery"
                    }, {
                        key: "tennis",
                        value: "navSbkRulesTennis"
                    }, {
                        key: "baseball",
                        value: "navSbkRulesBaseball"
                    }, {
                        key: "cycling",
                        value: "navSbkRulesCycling"
                    }, {
                        key: "golf",
                        value: "navSbkRulesGolf"
                    }, {
                        key: "motor-racing",
                        value: "navSbkRulesMotorRacing"
                    }, {
                        key: "track-and-field",
                        value: "navSbkRulesTrackandField"
                    }, {
                        key: "basketball",
                        value: "navSbkRulesBasketball"
                    }, {
                        key: "darts",
                        value: "navSbkRulesDarts"
                    }, {
                        key: "handball",
                        value: "navSbkRulesHandball"
                    }, {
                        key: "rugby",
                        value: "navSbkRulesRugby"
                    }, {
                        key: "volleyball",
                        value: "navSbkRulesVolleyball"
                    }, {
                        key: "boxing",
                        value: "navSbkRulesBoxing"
                    }, {
                        key: "specials",
                        value: "navSbkRulesSpecials"
                    }, {
                        key: "ice-hockey",
                        value: "navSbkRulesIceHockey"
                    }, {
                        key: "financial-bets",
                        value: "navFinsRoot"
                    }]
                }
            }
        }).directive("esportsGrouplist", [function () {
            return {
                restrict: "A",
                controller: "esportsGrouplistCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/esports-grouplist.wg.html"
            }
        }]).directive("promoContent", [function () {
            return {
                restrict: "A",
                controller: "promoTnCCtrl",
                templateUrl: "/cdn1103/resource/templates/help/promoTnC.tpl.html"
            }
        }]).directive("paymentoptsContent", [function () {
            return {
                restrict: "A",
                controller: "paymentOptsCtrl",
                templateUrl: "/cdn1103/resource/templates/help/faqs-banking.tpl.html"
            }
        }]).directive("luckyWheel", ["dataService", "$translate", "$filter", function (e, t, n) {
            return {
                restrict: "A",
                link: function (r, i, o) {
                    function a() {
                        var i = getFromSearch("preview");
                        if (i) return p = i, s();
                        r.promoGuid = getGuid();
                        var o = uv.pd.did ? uv.pd.did : "-1",
                            a = {
                                token: uv.sessionD.ssid,
                                promoCode: m,
                                did: o,
                                promoType: g,
                                channelId: r.client.sessionD.apsChannelId,
                                guId: r.promoGuid
                            };
                        e.fetch("JSONP", gv.domains.aps + "claimPromo", a).then(function (i) {
                            if (r.isClaimed = !0, i.result.isVaild) s();
                            else {
                                var o = n("filter")(i.result.messages || [], {
                                        code: gv.lan
                                    }, !0)[0],
                                    a = void 0 === o || "General Error" === o.text ? t.instant("msgPromoNotQualified") : o.text;
                                r.msg = {
                                    title: t.instant("navPromoRoot"),
                                    content: a
                                }, e.dialog(r)
                            }
                        })
                    }

                    function s() {
                        r.spinComplete = !1;
                        var e = themeConfig.pieSections,
                            t = u(360) / e * (e - p + .5);
                        spin_nums_out.rotation = 0, spin_nums_spade.rotation = u(1440) + t, TweenLite.to(spin_nums_out, 7, {
                            rotation: u(1440) + t,
                            onUpdate: l,
                            onComplete: d == themeConfig.grandPrize ? function () {
                                spin_container.addChild(spin_logo), firePixieDust(), c()
                            } : c
                        })
                    }

                    function l() {
                        var e = spin_nums_out.rotation % (6.28 / 24);
                        e <= .06 ? spin_tg.rotation = u(-45 * e / .05) : e > .06 && e < .12 && (spin_tg.rotation = u(-45 * (.12 - e) / .06))
                    }

                    function c() {
                        setTimeout(function () {
                            $(".ui-popup").show(), $(".ui-result").fitText(1.9), $(".sub-line").fitText(3.2), $(".x-btn").fitText(.1), $(".try-again").fitText(1.1)
                        }, 1500), spin_tg.rotation = 0
                    }

                    function u(e) {
                        return e / 180 * 3.14
                    }
                    var d = getFromSearch("p"),
                        m = getFromSearch("promocode"),
                        g = getFromSearch("promotype"),
                        f = getFromSearch("warningmsg"),
                        p = themeConfig.symbolLocation[d];
                    r.prizeWon = d, r.checkClaimpromo = function () {
                        if (f) {
                            r.msg = {
                                title: t.instant("navPromoRoot"),
                                content: f
                            };
                            var n = {
                                templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                                controller: "modalInstanceCtrl"
                            };
                            e.dialog(r, n).result.then(a)
                        } else a()
                    }
                }
            }
        }]).directive("esportsGame", [function () {
            return {
                restrict: "A",
                controller: "esportsGameCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/esports-game.wg.html"
            }
        }]).directive("questionnaireReview", ["dataService", "$q", function (e, t) {
            return {
                restrict: "A",
                link: function (n) {
                    var r = gv.domains.aps,
                        i = e.fetch("JSONP", r + "getAnswer", {
                            promoCode: n.promoCode,
                            token: uv.sessionD.ssid,
                            guId: n.promoGuid
                        }),
                        o = e.fetch("JSONP", r + "getQuestionnaire", {
                            promoCode: n.promoCode,
                            langCode: gv.lan,
                            guId: n.promoGuid
                        });
                    t.all([i, o]).then(function (e) {
                        if ("00000000" === e[0].returnCode && "00000000" === e[1].returnCode) {
                            var t = e[0].answer || {},
                                r = e[1].questionnaireDetail;
                            n.qDetail = {
                                questions: r.localizations[0].questions.map(function (e) {
                                    return e.title
                                }),
                                answers: t.answers
                            }
                        }
                    })
                }
            }
        }]).directive("fullscreenCarouselLoader", ["dataService", "piperSetting", "$uibModal", "$compile", function (e, t, n) {
            var r = t.pageName,
                i = "demo" === r;
            return {
                restrict: "EA",
                link: function (o) {
                    var a = void 0;
                    if (i) a = {
                        guId: window.getGuid(),
                        productIndex: 1 * t.pageKey,
                        languageId: 1 * gv.language.index,
                        countryId: 1 * t.countryId
                    };
                    else {
                        if (0 == !!window.uv.sessionD.landinged) return;
                        var s = window.gv.generals[r];
                        if (0 == !!s) return;
                        var l = s.generals.filter(function (e) {
                            return e.name.toLowerCase().indexOf("tutorial") > -1
                        })[0];
                        if (0 == !!l) return;
                        a = function (e) {
                            return {
                                guId: window.getGuid(),
                                productIndex: 1 * e.Id,
                                languageId: 1 * gv.language.index,
                                countryId: 1 * window.uv.pd.cid == 0 ? 204 : 1 * window.uv.pd.cid
                            }
                        }(l)
                    }
                    var c = $("body");
                    if (a) {
                        var u = void 0;
                        o.close = function () {
                            u && (c.removeClass("tutorial-on"), u.close())
                        }, e.fetch("JSONP", window.gv.domains.piper, a).then(function (e) {
                            u = n.open({
                                scope: o,
                                size: "fs",
                                windowClass: "modal-tutorial",
                                template: e.content
                            }), setTimeout(function () {
                                c.addClass("tutorial-on"), new Swiper(".tutorial-inner", {
                                    pagination: ".tutorial-pagination",
                                    slideClass: "item",
                                    wrapperClass: "swiper-wrapper",
                                    paginationType: "bullets",
                                    paginationClickable: !0,
                                    loop: !0
                                })
                            }, 0)
                        })
                    }
                }
            }
        }]), e.$inject = ["$scope", "$filter", "$translate", "dataService", "$modal", "$timeout"], t.$inject = ["$scope", "$filter", "$translate", "dataService", "$element", "$attrs"], n.$inject = ["$rootScope", "$scope", "$filter", "$translate", "dataService", "$modal", "$attrs"], r.$inject = ["$scope", "$filter", "$interval", "dataService"], i.$inject = ["$scope", "$modalInstance"], o.$inject = ["$scope", "$filter", "$q", "$translate", "dataService", "$modal"], a.$inject = ["$scope", "$filter", "$q", "$translate", "$modal"], s.$inject = ["$scope", "$filter", "$q", "$translate", "dataService"], l.$inject = ["$scope", "$filter", "$attrs", "$q", "$translate", "dataService"], c.$inject = ["$scope", "$attrs", "$element", "$modal"], u.$inject = ["$scope", "dataService"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, r, i) {
            e.widget = {
                selCategory: "all",
                gameLimit: 20,
                searchKey: "",
                showfeatureGame: !0,
                preCategory: ""
            }, e.onInit = function () {
                var n = gv.generals.live,
                    o = (n.categories, {
                        Category: "all",
                        lan: gv.lan
                    });
                i.all({
                    feeds: r.fetch("GET", "/service/prodApi/getprodFeeds", {
                        prodName: "live",
                        feedKey: ""
                    }),
                    games: r.fetch("POST", "/service/livecasinoApi/getgames", o)
                }).then(function (r) {
                    var i = r.games,
                        o = t("attrsFilter")(n.categories, "disallow", uv.pd.r);
                    e.parentPartners = t("availableParentPartners")(e.availablePartners, "live"), e.totalgames = function (n, r, i) {
                        var o = [];
                        if (i.NetEntOpenTable) {
                            var a = i.NetEntOpenTable.filter(function (e) {
                                    return e.fv1 === uv.geod.cc
                                }).map(function (e) {
                                    return JSON.parse(e.fv10)
                                }),
                                s = e.availablePartners.filter(function (e) {
                                    return "live" === e.productName && 21 == e.id && 0 == e.isMaintenance
                                })[0];
                            s && a.forEach(function (e) {
                                var i = "netentTable" + e.tableId,
                                    a = n.filter(function (e) {
                                        return e.uniqueKey === i
                                    })[0],
                                    l = e.games.filter(function (e) {
                                        return -1 !== e.gameId.indexOf("mobile")
                                    })[0];
                                a && l && (e.gameInfo = r.filter(function (e) {
                                    return e.items[0].partnerKey == l.gameId
                                })[0], e.availableGame = l, e.tableDisplayName = e.tableDisplayName || t("getResource")(a.resource, "DisplayName"), e.tableBackgroundImageUrl = e.tableBackgroundImageUrl || t("getResource")(a.resource, "Preview"), e.parentPartnerId = s.id, e.partnerName = t("getResource")(s.resource, "DisplayName"), o.push(e))
                            })
                        }
                        if (i.EM_LiveCasinoFeed) {
                            var l = e.availablePartners.filter(function (e) {
                                    return "live" === e.productName && e.attrs.ParentPartnerId && "33" == e.attrs.ParentPartnerId[0] && 0 == e.isMaintenance
                                }).map(function (e) {
                                    return e.id
                                }),
                                c = e.availablePartners.filter(function (e) {
                                    return "live" === e.productName && 33 == e.id
                                })[0];
                            c && r.filter(function (e) {
                                return -1 !== l.indexOf(e.partnerId)
                            }).forEach(function (e) {
                                var n = {},
                                    r = i.EM_LiveCasinoFeed.filter(function (t) {
                                        return t.fv0 == e.items[0].partnerKey
                                    })[0];
                                if (r) {
                                    var a = JSON.parse(r.fv10);
                                    a.isOpen && a.enabled && (n.minBet = a.limits && a.limits[uv.geod.cc] ? a.limits[uv.geod.cc].min : 0, n.maxBet = a.limits && a.limits[uv.geod.cc] ? a.limits[uv.geod.cc].max : 0, n.tableBackgroundImageUrl = t("getResource")(e.resource, "Preview") || a.backgroundImage, n.tableDisplayName = t("getResource")(e.resource, "DisplayName"), n.gameInfo = e, n.parentPartnerId = c.id, n.partnerName = t("getResource")(c.resource, "DisplayName"), o.push(n))
                                }
                            })
                        }
                        return o
                    }(o, i, r.feeds), e.filteredgames = angular.copy(e.totalgames)
                })
            }, e.openCategory = function () {
                r.dialog(e, {
                    templateUrl: "/cdn1103/resource/templates/widgets/livecasino-gameCategory.tpl.html",
                    controller: "liveGameCategoryCtrl",
                    windowClass: "menu-modal"
                }).result.then(function (n) {
                    ! function (n) {
                        e.widget.selCategory != n && (e.widget.selCategory = n, "all" !== e.widget.selCategory ? e.filteredgames = t("gameFilterByCategory")(e.totalgames, e.widget.selCategory) : e.filteredgames = e.totalgames)
                    }(n)
                })
            }, e.filterCount = function (t) {
                return t.id == e.widget.selCategory
            }
        }

        function t(e, t, n, r) {
            function i(t) {
                var n = {
                    partner: t,
                    lan: gv.lan
                };
                r.fetch("POST", "/service/livecsnApi/getcategoryGames", n).then(function (t) {
                    e.categorygames = t
                })
            }
            e.onInit = function () {
                e.general = gv.generals.live, e.general.partners = t("attrsFilter")(e.general.partners, "disallow", uv.pd.r), i(e.general.partners.length > 1 ? -1 : 9)
            }, e.getCategoryGames = i
        }

        function n(e, t, n, r) {
            e.categameInfo = {}, e.onInit = function () {
                var t = location.pathname.split("/");
                e.gameName = 4 === t.length ? t[3] : "", e.general = gv.generals.live;
                var n = {
                    gameName: e.gameName
                };
                r.fetch("GET", "/service/livecsnApi/getCategoryGameInfo", n).then(function (t) {
                    e.categameInfo = t
                })
            }
        }

        function r(e, t, n, r) {
            e.switchCategory = function (e) {
                r.close(e)
            }
        }

        function i(e, t, n, r, i) {
            function o(n) {
                var i = {
                    partner: n,
                    lan: gv.lan
                };
                r.fetch("POST", "/service/livecsnApi/getcategoryGames", i).then(function (r) {
                    e.widget.selpartner = n, e.categorygames = r, angular.forEach(e.categorygames, function (n) {
                        n.games = n.games.filter(function (n) {
                            return t("filter")(e.general.partners, {
                                id: n.partnerId
                            }, !0).length > 0
                        })
                    }), e.categorygames = e.categorygames.filter(function (e) {
                        return e.games.length > 0
                    }), e.modalInstance && e.modalInstance.close()
                })
            }
            e.widget = {
                selpartner: -1
            }, e.onInit = function () {
                e.general = gv.generals.live, e.general.partners = t("attrsFilter")(e.general.partners, "disallow", uv.pd.r), angular.forEach(e.general.partners, function (e) {
                    e.isMaintain = t("filter")(gv.modules, function (t) {
                        return t.id == gv.generals.live.Id + e.id && 0 != t.status
                    }, !0).length > 0
                }), e.general.partners = e.general.partners.filter(function (e) {
                    return "true" === e.attrs.SupportMoblieWeb[0] && "live" === e.productName && 0 == e.isMaintenance
                }), o(e.general.partners.length > 1 ? e.widget.selpartner : e.general.partners[0].id)
            }, e.getCategoryGames = o, e.openCategory = function () {
                e.isAsia = !0, e.modalInstance = i.open({
                    animation: e.animationsEnabled,
                    templateUrl: "/cdn1103/resource/templates/widgets/livecasino-gameCategory.tpl.html",
                    size: "lg",
                    windowClass: "menu-modal",
                    scope: e
                })
            }, e.filterCount = function (t) {
                return t.id == e.widget.selpartner
            }, e.openGamePopup = function (t) {
                e.categameInfo = t, e.modalInstance = i.open({
                    animation: e.animationsEnabled,
                    templateUrl: "/cdn1103/resource/templates/widgets/live-asia-gamePopup.tpl.html",
                    size: "lg",
                    windowClass: "menu-modal",
                    scope: e
                })
            }, e.filterperGame = function (e) {
                return function (n) {
                    return t("filter")(e, {
                        partnerId: n.id
                    }, !0).length > 0
                }
            }
        }
        angular.module("starApp").controller("liveCategorylistCtrl", t).controller("liveGameCategoryCtrl", r).controller("liveGameinfoCtrl", n).controller("liveUkGamelistCtrl", e).controller("liveAsiaGamelistCtrl", i).directive("liveGamelist", [function () {
            return {
                restrict: "A",
                controller: "liveCategorylistCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/live-gamelist.wg.html"
            }
        }]).directive("liveAsiaGamelist", [function () {
            return {
                restrict: "A",
                controller: "liveAsiaGamelistCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/live-asia-gamelist.wg.html"
            }
        }]).directive("liveUkGamelist", [function () {
            return {
                restrict: "A",
                controller: "liveUkGamelistCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/live-uk-gamelist.wg.html"
            }
        }]).directive("livelauncher", ["$filter", "$translate", "dataService", "$rootScope", function (e, t, n, r) {
            return {
                restrict: "A",
                link: function (i, o, a) {
                    function s() {
                        u = e("filter")(gv.generals.live.partners, {
                            id: l
                        }, !0)[0];
                        var t = i.$eval(a.query) || {},
                            n = $.param(t),
                            r = "/{0}/live/lobby?partnerName={1}&partnerId={2}&playfor={3}&{4}".format(gv.lan, u.uniqueKey, u.id, c, n);
                        a.$set("href", r)
                    }
                    var l = 1 * a.livelauncher || "",
                        c = a.playfor || "real";
                    s(), i.$watch(a, s);
                    var u, d = i.availablePartners.some(function (e) {
                            return e.id == l && e.isMaintenance
                        }),
                        m = i.availablePartners.filter(function (e) {
                            return u.attrs.ParentPartnerId && u.attrs.ParentPartnerId[0] == e.id
                        })[0];
                    o.bind("click", function (e) {
                        if (d) return e.stopPropagation(), void e.preventDefault();
                        if (!uv.sessionD.login && "fun" !== a.playfor) return i.msg = {
                            title: t.instant("txtBtnLogin"),
                            content: t.instant("msgCommonRequestLogin")
                        }, o = n.dialog(i), e.stopPropagation(), e.preventDefault(), void o.result.then(function () {
                            i.modalInstance && i.modalInstance.close()
                        });
                        if (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) return i.msg = {
                            title: t.instant("txtBtnLogin"),
                            content: t.instant("msgResGamingExclusion")
                        }, o = n.dialog(i), e.stopPropagation(), e.preventDefault(), void o.result.then(function () {
                            i.modalInstance && i.modalInstance.close()
                        });
                        if (21 === l || m && 33 == m.id) e.stopPropagation(), e.preventDefault(), r.guId = getGuid(), n.fetch("GET", "/service/myaccounttapi/GetTransferBalance", {
                            partnerIds: [m ? m.transferId : 0 != u.transferId ? u.transferId : l],
                            guId: r.guId
                        }).then(function (e) {
                            if (0 === e[0].balance) {
                                var r = {
                                    templateUrl: "/cdn1103/resource/templates/modal/messagePrompt.html",
                                    controller: "modalInstanceCtrl",
                                    backdrop: "static"
                                };
                                i.msg = {
                                    title: t.instant("txtComNotice"),
                                    content: 21 == l ? t.instant("msgTransferNetEntFirst") : t.instant("msgTransferEveryMatrixFirst")
                                }, n.dialog(i, r).result.then(function () {
                                    location.href = "/{0}/my-account/banking/transfer".format(gv.lan)
                                }, function () {
                                    location.href = a.href
                                })
                            } else location.href = a.href
                        });
                        else if (25 == l && ("IDR" == uv.geod.cc || "VND" == uv.geod.cc)) {
                            i.msg = {
                                title: t.instant("txtComNotice"),
                                content: t.instant("msgCsnTruncated")
                            };
                            var o;
                            (o = n.dialog(i)).result.then(function () {
                                location.href = a.href
                            }), e.stopPropagation(), e.preventDefault()
                        }
                        $(".modal").is(":visible") ? $(".modal-dialog").addClass("load-spinner") : $("body").addClass("load-spinner")
                    })
                }
            }
        }]).directive("liveGameinfo", [function () {
            return {
                restrict: "A",
                controller: "liveGameinfoCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/live-gameInfo.tpl.html"
            }
        }]).directive("liveLobbylist", ["$filter", function (e) {
            return {
                templateUrl: "/cdn1103/resource/templates/widgets/live-lobbylist.wg.html",
                link: function (t) {
                    t.partners = e("attrsFilter")(t.gv.generals.live.partners, "disallow", uv.pd.r), t.partners = t.partners.filter(function (e) {
                        return "true" === e.attrs.SupportMoblieWeb[0] && "live" === e.productName && 0 == e.isMaintenance
                    })
                }
            }
        }]).directive("liveTablelist", ["$filter", "dataService", "$q", function (e, t, n) {
            return {
                templateUrl: "/cdn1103/resource/templates/widgets/live-tablelist.wg.html",
                link: function (r) {
                    function i() {
                        var t = [];
                        return r.availablePartners.forEach(function (n) {
                            switch (n.id) {
                                case 21:
                                    t.push({
                                        partnerId: n.id,
                                        isMaintenance: n.isMaintenance,
                                        partnerKey: "txtComEuroLiveDealer",
                                        tables: function () {
                                            var t = [];
                                            if (o.NetEntOpenTable) return o.NetEntOpenTable.filter(function (e) {
                                                return e.fv1 === uv.geod.cc
                                            }).map(function (e) {
                                                return JSON.parse(e.fv10)
                                            }).forEach(function (n) {
                                                var r = "netentTable" + n.tableId,
                                                    i = a.filter(function (e) {
                                                        return e.uniqueKey === r
                                                    })[0],
                                                    o = n.games.filter(function (e) {
                                                        return -1 !== e.gameId.indexOf("mobile")
                                                    })[0];
                                                i && o && (n.availableGame = o, n.tableDisplayName = n.tableDisplayName || e("getResource")(i.resource, "DisplayName"), n.tableBackgroundImageUrl = n.tableBackgroundImageUrl || e("getResource")(i.resource, "Preview"), t.push(n))
                                            }), t
                                        }()
                                    })
                            }
                        }), t
                    }
                    var o = [],
                        a = [];
                    r.partnerTables = [], n.all({
                        feeds: t.fetch("GET", "/service/prodApi/getprodFeeds", {
                            prodName: "live",
                            feedKey: ""
                        }),
                        categories: t.fetch("GET", "/service/livecsnApi/GetLiveCsnCategories")
                    }).then(function (e) {
                        o = e.feeds, a = e.categories, r.partnerTables = i()
                    })
                }
            }
        }]), r.$inject = ["$scope", "$filter", "dataService", "$modalInstance"], t.$inject = ["$scope", "$filter", "$translate", "dataService"], n.$inject = ["$scope", "$filter", "$translate", "dataService"], e.$inject = ["$scope", "$filter", "$translate", "dataService", "$q"], i.$inject = ["$scope", "$filter", "$translate", "dataService", "$modal"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, r, i) {
            function o() {
                e.intervalTime && n.cancel(e.intervalTime), e.marketInfos = gv.generals.lotto.categories, i.fetch("GET", "/service/prodApi/getprodFeeds", {
                    prodName: "lotto",
                    feedKey: ""
                }).then(function (r) {
                    e.marketfeed = t("orderBy")(r.KenoMarket, "fv2");
                    var i = a(e.marketInfos);
                    e.intervalTime = n(function () {
                        var r = -1,
                            i = t("filter")(e.marketInfos, function (e) {
                                return e.startTime < (new Date).valueOf() && "open" == e.status
                            }, !0);
                        i.length > 0 && (r = a(i)), 0 == r && n.cancel(e.intervalTime)
                    }, 1e3), 0 == i && n.cancel(e.intervalTime)
                }), r(o, 3e5)
            }

            function a(n) {
                return angular.forEach(n, function (n) {
                    var r = (new Date).valueOf(),
                        i = t("filter")(e.marketfeed, function (e) {
                            return e.fv0 == n.uniqueKey && e.fv2 > r
                        }, !0),
                        o = t("filter")(e.marketfeed, {
                            fv0: n.uniqueKey
                        }, !0);
                    i.length > 0 ? (n.marketName = i[0].fv0, n.drawNumber = i[0].fv1, n.counterId = i[0].fv3, n.status = "open") : o.length > 0 && (n.marketName = o[0].fv0, n.drawNumber = o[0].fv1, n.counterId = o[0].fv3, n.status = "closed")
                }), t("filter")(e.marketInfos, function (e) {
                    return "open" == e.status
                }, !0).length
            }
            e.widget = {}, e.onInit = o
        }

        function t(e, t) {
            e.onInit = function () {
                e.lottoPartners = t("attrsFilter")(gv.generals.lotto.partners, "disallow", uv.pd.r)
            }
        }
        angular.module("starApp").controller("lottoMarketinfoCtrl", e).controller("lottoinfoCtrl", t).directive("lottoMarketlist", [function () {
            return {
                restrict: "A",
                controller: "lottoMarketinfoCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/lotto-marketlist.wg.html"
            }
        }]).directive("lottoIlotto", [function () {
            return {
                restrict: "A",
                controller: "lottoinfoCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/lotto-ilotto.wg.html"
            }
        }]).directive("lottolauncher", ["$translate", "dataService", "$window", function (e, t, n) {
            return {
                restrict: "A",
                link: function (r, i, o) {
                    function a(e) {
                        o.$set("href", e)
                    }
                    var s = "/" + gv.lan + "/lotto/lobby";
                    a(s), r.$watch(function () {
                        return $(i).attr("lottolauncher")
                    }, function (e) {
                        e && a("/" + gv.lan + "/lotto/lobby" + (e ? "?partnerId=" + e : ""))
                    }), r.$watch(function () {
                        return $(i).attr("counterlauncher")
                    }, function (e) {
                        e && a("/" + gv.lan + "/lotto/lobby" + (e ? "?counterId=" + e : ""))
                    }), i.bind("click", function (o) {
                        uv.sessionD.login ? uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion ? (r.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgResGamingExclusion")
                        }, t.dialog(r), o.stopPropagation(), o.preventDefault()) : "BUTTON" == i[0].tagName.toUpperCase() && (n.location.href = s) : (r.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgCommonRequestLogin")
                        }, t.dialog(r), o.stopPropagation(), o.preventDefault())
                    })
                }
            }
        }]).directive("lottorules", ["$window", function (e) {
            return {
                restrict: "A",
                link: function (t, n, r) {
                    n.bind("click", function () {
                        e.location.href = "/" + gv.lan + "/rules/lotto"
                    })
                }
            }
        }]), e.$inject = ["$scope", "$filter", "$interval", "$timeout", "dataService"], t.$inject = ["$scope", "$filter"]
    }()
}, function (e, t) {
    angular.module("starApp").directive("downloadGameClient", [function () {
        return {
            restrict: "A",
            link: function (e, t, n) {
                var r = function (e, t) {
                        return function (n) {
                            var r = !1;
                            return n.hasOwnProperty(e) && (r = n[e] === t), r
                        }
                    },
                    i = gv.lan,
                    o = n.downloadGameClient.toLowerCase(),
                    a = gv.generals[o];
                if (a) {
                    var s = r("key", "DownloadSrc"),
                        l = r("LangCode", i),
                        c = a.partners.map(function (e) {
                            return e.resource
                        }).filter(function (e) {
                            return e.some(s)
                        }).map(function (e) {
                            return e.find(s)
                        }).filter(function (e) {
                            return e.lanVals.some(l)
                        }).map(function (e) {
                            return e.lanVals.find(l)
                        }).find(l);
                    c && n.$set("href", c.Value)
                }
            }
        }
    }])
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e) {
            e.onInit = function () {
                var e = {
                        token: token,
                        ln: lang,
                        wc: "Vanguard"
                    },
                    t = {
                        lobbyURL: url,
                        lobbyName: "188betpoker",
                        lobbyMode: "Login",
                        navState: "Games",
                        returnFrom: "ExternalLogin"
                    };
                new PokerClientLauncher(e, {
                    lobbyURL: "http://webserver3.bluemesa.mgsops.net/flashpoker/builds/latest/Test_Web_MPN_Vault/poker.aspx",
                    windowSettings: "height=768,width=1024,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no"
                }, t).launchLobby()
            }
        }

        function t(e, t, n, r, i, o) {
            function a(n) {
                e.widget.pageIndex = 1;
                var r = s[n],
                    i = (new Date).valueOf(),
                    o = t("filter")(e.tournaments, function (e) {
                        var t = 1 * e.attrs["buy-in"] + 1 * e.attrs.fee;
                        return t >= r.min && t <= r.max && e.createDate >= i
                    }, !0);
                e.currnetGames = t("orderBy")(o, "createDate"), e.widget.tabIndex = n;
                var a = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.widget.totalPage = Math.ceil(e.currnetGames.length / e.widget.pageSize), e.perPageGames = e.currnetGames.slice(a, a + e.widget.pageSize)
            }
            e.tournaments = [], e.currnetGames = [], e.perPageGames = [], e.widget = {
                tabIndex: 1,
                pageIndex: 1,
                pageSize: 10,
                totalPage: 1,
                sortcolum: "",
                reverse: !1
            }, e.onInit = function () {
                o.fetch("POST", "/service/pokerApi/getTournaments", {
                    Category: "TournamentsFeed"
                }).then(function (t) {
                    e.widget.pageIndex = 1, e.tournaments = t, a(0)
                })
            }, e.switchTournaments = a;
            var s = [{
                min: .01,
                max: 50
            }, {
                min: 50,
                max: 99999
            }, {
                min: 0,
                max: .01
            }];
            e.$watch("widget.pageIndex", function () {
                var t = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.perPageGames = e.currnetGames.slice(t, t + e.widget.pageSize)
            })
        }
        angular.module("starApp").controller("pokerTournamentsCtrl", t).controller("pokerLauncherCtrl", e).directive("pokerTournaments", [function () {
            return {
                restrict: "A",
                controller: "pokerTournamentsCtrl",
                templateUrl: "/cdn1103/resource/templates/widgets/poker-tournaments.wg.html"
            }
        }]).directive("badbeatJackpot", ["$filter", function (e) {
            return {
                restrict: "A",
                link: function (t, n) {
                    var r = gv.generals.poker.feeds.BadbeatJackpot || "";
                    n.text(e("currency")(r[0].fv0, "€"))
                }
            }
        }]).directive("pokerlauncher", ["$translate", "dataService", "$rootScope", function (e, t, n) {
            return {
                restrict: "A",
                link: function (r, i, o) {
                    var a = "/" + gv.lan + "/poker/lobby";
                    o.$set("href", a);
                    var s = n.$new();
                    i.bind("click", function (n) {
                        if (!uv.sessionD.login) return s.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgCommonRequestLogin")
                        }, t.dialog(s), n.stopPropagation(), n.preventDefault(), !1;
                        if (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) return s.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgResGamingExclusion")
                        }, t.dialog(s), n.stopPropagation(), n.preventDefault(), !1;
                        if ("IDR" == uv.geod.cc || "VND" == uv.geod.cc || "KRW" == uv.geod.cc) {
                            s.msg = {
                                title: e.instant("txtComNotice"),
                                content: e.instant("msgPokerCurrencyCondition")
                            };
                            var r = t.dialog(s);
                            n.stopPropagation(), n.preventDefault(), r.result.then(function () {
                                return window.location.href = "/" + gv.lan + "/poker/lobby", !0
                            })
                        }
                    })
                }
            }
        }]), t.$inject = ["$scope", "$filter", "$q", "$cookies", "$translate", "dataService"], e.$inject = ["$scope"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";
        angular.module("starApp").directive("racingGame", ["dataService", "$q", function (e, t) {
            return {
                restrict: "A",
                templateUrl: "/cdn1103/resource/templates/widgets/racing-game.wg.html",
                scope: !0,
                link: function (n) {
                    function r() {
                        var e = [window.scrollY, window.innerHeight];
                        document.getElementsByName("racingGame")[0].contentWindow.postMessage(e, i)
                    }
                    var i = void 0;
                    n.reload = function () {
                        var r = t.defer();
                        return e.fetch("GET", "/service/racingApi/getFrameSrc", {
                            language: gv.lan
                        }).then(function (e) {
                            var t = document.createElement("a");
                            t.href = e, i = t.protocol + "//" + t.hostname, n.iframeSrc = e + "&iframeParentUrl=" + window.location.origin, r.resolve()
                        }), r.promise
                    }, document.getElementsByName("racingGame")[0].addEventListener("load", function () {
                        r()
                    }, !1), window.addEventListener("scroll", function () {
                        r()
                    }), window.addEventListener("resize", function () {
                        r()
                    }), n.reload()
                }
            }
        }]).filter("trusted", ["$sce", function (e) {
            return function (t) {
                return e.trustAsResourceUrl(t)
            }
        }])
    }()
}, function (e, t, n) {
    (function (e) {
        ! function () {
            "use strict";

            function t(e, t, n, r, i) {
                e.euro2016 = {
                    state: "2016euro"
                }, e.onInit = function () {
                    var t = i.location.pathname.split("/").pop().toLowerCase();
                    e.euro2016.state = t
                }
            }

            function n(e, t, n, r) {
                e.widgetEvs = {
                        guId: 0,
                        inplay: [],
                        furture: [],
                        targetEv: {}
                    },
                    function () {
                        e.sportId = n.sportid || "", e.competitionId = n.competitionid || "-1", e.eventId = 1 * (n.eventid || "0"), e.widgetEvs.guId = getGuid();
                        var i = gv.domains.sbkfeed + "/" + gv.lan + "/Service/OddsService?GetEventsByCompetitions",
                            o = {
                                guId: e.widgetEvs.guId,
                                Language: gv.lan,
                                SportId: e.sportId,
                                CompetitionIds: e.competitionId,
                                OddsType: uv.sessionD.oddsType,
                                TimeZoneUtcOffset: uv.geod.utcoffset
                            };
                        r.fetch("JSONP", i, o).then(function (n) {
                            e.widgetEvs.future = n["further-evs"] || [], e.widgetEvs.targetEv = t("filter")(e.widgetEvs.furture[0].events, {
                                eventId: e.eventId
                            }, !0)[0] || {}
                        })
                    }()
            }

            function r(t, n, r, i) {
                function o() {
                    angular.isDefined(l) && (r.cancel(l), l = void 0)
                }

                function a() {
                    t.sportsId = t.sportsId || "", t.competitionIds = t.competitionIds || "-1", o();
                    var e = gv.domains.sbkfeed + "/" + gv.lan + "/Service/OddsService?GetEventsByCompetitions",
                        n = {
                            guId: t.widgetEvs.guId,
                            Language: gv.lan,
                            SportId: t.sportsId,
                            CompetitionIds: t.competitionIds,
                            OddsType: uv.sessionD.oddsType,
                            TimeZoneUtcOffset: uv.geod.utcoffset
                        };
                    i.fetch("JSONP", e, n).then(function (e) {
                        t.widgetEvs.inplay = e["inplay-evs"] || [], t.widgetEvs.furture = e["further-evs"] || [], t.widgetEvs.timer = (new Date).valueOf() + 9e4, s(t.widgetEvs.furture[0].events[0]), l = r(a, 9e4)
                    })
                }

                function s(e) {
                    var r = n("date")(e.eventDate, "MMdd", "+0:00") + n("getTeamname")(e.data.HomeShort) + n("getTeamname")(e.data.AwayShort) + ".html";
                    t.contentPath = gv.domains.content + "/MB/" + gv.lan + "/2016-euro/headtohead/" + r
                }
                t.wgclient = {
                    timezone: uv.geod.timezone,
                    lan: gv.lan
                }, t.global = e, t.client = uv, t.onInit = a, t.stopInterval = o, t.setContentPath = s, t.widgetEvs = {
                    guId: 0,
                    timer: 90,
                    inplay: [],
                    furture: []
                };
                var l;
                a()
            }

            function i(e, t, n, r, i) {
                function o() {
                    e.sportsId = i.sportsOddsfeed || "", e.competitionIds = i.competitionids || "-1", angular.isDefined(s) && (n.cancel(s), s = void 0);
                    var t = gv.domains.sbkfeed + "/" + gv.lan + "/Service/OddsService?GetEventsByCompetitions",
                        a = {
                            guId: e.widgetEvs.guId,
                            Language: gv.lan,
                            SportId: e.sportsId,
                            CompetitionIds: e.competitionIds,
                            OddsType: uv.sessionD.oddsType,
                            TimeZoneUtcOffset: uv.geod.utcoffset
                        };
                    r.fetch("JSONP", t, a).then(function (t) {
                        e.widgetEvs.inplay = t["inplay-evs"] || [], e.widgetEvs.furture = t["further-evs"] || [], e.widgetEvs.timer = (new Date).valueOf() + 9e4, s = n(o, 9e4)
                    })
                }

                function a(n) {
                    angular.forEach(l, function (e) {
                            e.evOdds = t("filter")(n, {
                                eventDate: 1 * e.fv2
                            }, !0)[0]
                        }),
                        function () {
                            var n = {
                                matches: []
                            };
                            l = t("orderBy")(l, "fv2"), n.matches = t("filter")(l, function (e) {
                                return !!e.evOdds
                            }, !0), e.schduleMatchesBydate = n
                        }()
                }
                e.wgclient = {
                    timezone: uv.geod.timezone,
                    lan: gv.lan
                }, e.widgetEvs = {
                    guId: 0,
                    timer: 90,
                    inplay: [],
                    furture: []
                }, e.matchfrom = 1 * i.matchfrom, e.matchto = 1 * i.matchto, e.schduleMatchesBydate = [];
                var s;
                o();
                var l = t("filter")(gv.generals.sports.feeds.Schedule, function (t) {
                    return t.fv0 == i.sportsEurocupSchedule && 1 * t.fv2 >= e.matchfrom && 1 * t.fv2 < e.matchto
                }, !0);
                e.$watch("widgetEvs", function (t) {
                    0 != e.widgetEvs.furture.length && a(e.widgetEvs.furture[0].events)
                }, !0)
            }
            angular.module("starApp").filter("getTeamname", function () {
                var e = {
                    Iceland: "ISL",
                    Croatia: "CRO",
                    Switzerland: "SUI",
                    Austria: "AUT",
                    Russia: "RUS",
                    Poland: "POL",
                    Sweden: "SWE",
                    Germany: "GER",
                    Spain: "ESP",
                    Ukraine: "UKR",
                    Ireland: "IRL",
                    Hungary: "HUN",
                    France: "FRA",
                    "Czech Republic": "CZE",
                    Wales: "WAL",
                    Albania: "ALB",
                    England: "ENG",
                    Portugal: "POR",
                    "Northern Ireland": "NIR",
                    Turkey: "TUR",
                    Belgium: "BEL",
                    Romania: "ROU",
                    Slovakia: "SVK",
                    Italy: "ITA"
                };
                return function (t) {
                    return e[t] || e.France
                }
            }).controller("euro2016Ctrl", t).controller("sportsEventCtrl", n).controller("sportsScheduleCtrl", i).controller("sportsUpcomingpanelCtrl", r).directive("sportsEventodds", [function () {
                return {
                    restrict: "A",
                    controller: "sportsEventCtrl"
                }
            }]).directive("sportsEurocupSchedule", ["$filter", function (e) {
                return {
                    restrict: "A",
                    controller: "sportsScheduleCtrl",
                    templateUrl: "/cdn1103/resource/templates/widgets/eurocup-schedule.tpl.html"
                }
            }]).directive("sportsTeams", ["$filter", function (e) {
                return {
                    restrict: "A",
                    scope: {
                        seasonid: "@sportsTeams"
                    },
                    templateUrl: "/cdn1103/resource/templates/widgets/eurocup-teams.tpl.html",
                    link: function (t, n, r, i) {
                        t.teamStanding = e("filter")(gv.generals.sports.feeds.Standing, {
                            fv0: t.seasonid
                        }, !0), t.wgclient = {
                            lan: gv.lan
                        }
                    }
                }
            }]).directive("sportsStanding", ["$filter", function (e) {
                return {
                    restrict: "A",
                    scope: {
                        seasonid: "@sportsStanding"
                    },
                    templateUrl: "/cdn1103/resource/templates/widgets/eurocup-standing.tpl.html",
                    link: function (t, n, r, i) {
                        t.teamStanding = e("filter")(gv.generals.sports.feeds.Standing, {
                            fv0: t.seasonid
                        }, !0), angular.forEach(t.teamStanding, function (e) {
                            e.fv5 = "" != e.fv5 ? e.fv5 : 0, e.fv6 = "" != e.fv6 ? e.fv6 : 0, e.fv7 = "" != e.fv7 ? e.fv7 : 0, e.fv8 = "" != e.fv8 ? e.fv8 : 0, e.played = 1 * e.fv5 + 1 * e.fv6 + 1 * e.fv7
                        })
                    }
                }
            }]).directive("sportsUpcomingpanel", [function () {
                return {
                    restrict: "A",
                    scope: {
                        sportsId: "@sportsOddsfeed",
                        competitionIds: "@competitionids"
                    },
                    controller: "sportsUpcomingpanelCtrl",
                    templateUrl: "/cdn1103/resource/templates/widgets/sports-upcomingpanel.wg.html"
                }
            }]), t.$inject = ["$scope", "$filter", "$timeout", "dataService", "$window"], n.$inject = ["$scope", "$filter", "$attrs", "dataService"], i.$inject = ["$scope", "$filter", "$interval", "dataService", "$attrs"], r.$inject = ["$scope", "$filter", "$interval", "dataService"]
        }()
    }).call(t, n(0))
}]);