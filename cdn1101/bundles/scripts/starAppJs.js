! function (e) {
    function t(a) {
        if (n[a]) return n[a].exports;
        var r = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    var n = {};
    t.m = e, t.c = n, t.d = function (e, n, a) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, t.p = "/", t(t.s = 51)
}(Array(51).concat([function (e, t, n) {
    n(52), n(53), n(54), n(55), n(56), n(57), n(58), n(59), n(60), n(61), n(62), n(63), n(64), n(65), n(66), n(67), n(68), n(69), n(70), n(71), n(72), n(73), n(74), n(75), n(76), n(77), n(78), n(79), n(80), n(81), n(82), n(83), e.exports = n(84)
}, function (e, t) {
    new MobileDetect(window.navigator.userAgent), Date.prototype.addDays = function (e) {
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
                case "period":
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
                a = e.getDate(),
                r = t - this.getFullYear();
            return n < this.getMonth() ? r-- : n == this.getMonth() && a < this.getDate() && r--, r
        }, String.prototype.format = function () {
            var e = arguments;
            return this.replace(/{(\d+)}/g, function (t, n) {
                return void 0 !== e[n] ? e[n] : t
            })
        }, window.isValidDate = function (e) {
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
        }, window.receiveMessage = function (e) {
            var t = e.data;
            if ("string" == typeof t && "" != t) try {
                t = {
                    topic: "resize",
                    data: {
                        windowName: "virtualFrame",
                        height: JSON.parse(t).data.height
                    }
                }
            } catch (e) {}
            switch (t.topic) {
                case "setHistory":
                    var a = t.data.url || "",
                        r = void 0 === t.data.caller ? "sbk" : t.data.caller;
                    switch (r) {
                        case "sbk":
                            break;
                        case "fsb":
                            a = "/" + window.gv.lan + "/racing/" + a.replace("/sportsbook/", "");
                            break;
                        case "esports":
                        default:
                            a = "/" + window.gv.lan + "/" + r + a
                    }
                    if (Modernizr.history) {
                        var i = {
                            caller: r
                        };
                        history.replaceState(i, "", a)
                    }
                    break;
                case "updateBalance":
                    $(".bal-refresh").trigger("click");
                    break;
                case "showDialog":
                    var o = angular.element("*[ng-app]").injector().get("dataService"),
                        s = angular.element("body").scope();
                    s.msg = {
                        title: t.data.title,
                        content: t.data.message
                    }, o.dialog(s);
                    break;
                case "resize":
                    c = t.data.windowName, $('[name="' + c + '"]').height(t.data.height);
                    break;
                case "updateWinSize":
                    var l = t.data;
                    window.resizeTo(l.width, l.height);
                    break;
                case "reloadIframe":
                    var c = t.data.windowName;
                    $("[name=" + c + "]").length > 0 ? $("[name=" + c + "]").attr("src", $("[name=" + c + "]").attr("src")) : sendMessage(parent, {
                        topic: "reloadIframe",
                        data: {
                            windowName: c
                        }
                    }, "*");
                    break;
                case "gotoGameLobby":
                    sendMessage(parent, {
                        topic: "reloadIframe",
                        data: {
                            windowName: "sideGameifrme"
                        }
                    }, "*");
                    break;
                case "gotoRetry":
                    sendMessage(parent, {
                        topic: "reloadIframe",
                        data: {
                            windowName: "launchiframe"
                        }
                    }, "*");
                    break;
                case "iFrameReload":
                    var u = t.data.currentLocation,
                        d = t.data.windowName;
                    $('[name="' + d + '"]').attr("src", u);
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
        }, window.addEventListener && window.addEventListener("message", window.receiveMessage, !1), window.sendMessage = function (e, t, n) {
            e.postMessage && e.postMessage(t, n)
        }, "https:" == location.protocol && "serviceWorker" in navigator && navigator.serviceWorker.register("/serviceworker.js", {
            scope: "/"
        }),
        function () {
            "use strict";
            var e, t = 0;
            $(window).scroll(function (t) {
                e = !0
            }), ["virtual", "racing"].every(function (e) {
                return -1 === window.location.href.indexOf(e)
            }) && setInterval(function () {
                e && (function () {
                    var e = $(window).scrollTop(),
                        n = $(window).height(),
                        a = $(document).height(),
                        r = $("header nav").outerHeight();
                    Math.abs(t - e) <= 5 || "sports" == gv.prodName || (e > t && e > r && a > n ? ($("nav.navbar").removeClass("nav-down").removeClass("nav-down-down").addClass("nav-up"), $("nav#navmenu-products-mobile").removeClass("show"), $("body").removeClass("show-navmenu-products-mobile"), $(".static-searchbox").removeClass("nav-down").addClass("nav-up")) : e + n < a && ($("nav.navbar").removeClass("nav-up").removeClass("nav-down-down").addClass("nav-down"), $(".static-searchbox").removeClass("nav-up").addClass("nav-down")), t = e)
                }(), e = !1)
            }, 250), $("body").on("mousedown", ".reveal-pw-toggle", function () {
                $(this).closest(".input-group").find('[type="password"]').attr("type", "text")
            }).on("mouseup mouseleave", ".reveal-pw-toggle", function () {
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
            return function (a, r, i) {
                a = a || "", r = r || uv.geod.timezone;
                var o = e("date")(a, n[gv.lan] + (i ? " HH:mm" : ""), r),
                    s = e("quicki18n")(new Date(a).getMonth(), "monthNames"),
                    l = t.instant(s);
                return o.replace("{0}", l)
            }
        }

        function t(e, t) {
            return function (n, a) {
                n = n || "", a = a || uv.geod.timezone;
                var r = e("date")(n, "EEE", a),
                    i = e("quicki18n")(r, "weekdayNames");
                return t.instant(i)
            }
        }

        function n(e) {
            return function (t, n) {
                var a = "";
                t = t || [], n = n || "";
                var r = new RegExp(gv.domains.oldContents, "ig");
                try {
                    var i = "" == n ? t : e("filter")(t, {
                        key: n
                    }, !0)[0];
                    a = (e("filter")(i.lanVals, {
                        LangCode: gv.lan
                    }, !0)[0] || e("filter")(i.lanVals, {
                        LangCode: "en-gb"
                    }, !0)[0] || i.lanVals[0]).Value
                } catch (e) {}
                return a.replace(r, gv.domains.content)
            }
        }

        function a(e) {
            return function (t, n) {
                var a = "";
                t = t || [], n = n || "";
                try {
                    a = (e("filter")(t, {
                        code: gv.lan
                    }, !0)[0] || e("filter")(t, {
                        code: "en-gb"
                    }, !0)[0] || {})[n]
                } catch (e) {}
                return a
            }
        }

        function r(e) {
            return function (t) {
                return e.trustAsResourceUrl(t)
            }
        }

        function i(e) {
            return function (t, n) {
                var a = Math.pow(10, n),
                    r = t >= 0 ? 1 : -1;
                return r * Math.floor(r * e.mul(t, a)) / a
            }
        }

        function o(e, t, n, a, r, i) {
            return {
                paramsMethod: ["GET", "JSONP"],
                fetch: function (a, o, s, l, c) {
                    var u = {};
                    l = l || 30, c = c || !0, angular.copy(s, u);
                    var d = (u = u || {}).guId || "";
                    "JSONP" == a && (u.callback = "JSON_CALLBACK");
                    var m, g = -1 == this.paramsMethod.indexOf(a) ? {
                            method: a,
                            url: o,
                            data: u
                        } : {
                            method: a,
                            url: o,
                            params: u
                        },
                        f = e(g),
                        p = t.defer(),
                        v = this.dialog;
                    return "" != d && (n.ajaxStackObj[d] = !0, delete u.guId, m = r(function () {
                        n.ajaxStackObj[d] && (p.resolve(), c) && (n.msg = {
                            title: i.instant("txtCommonHelp"),
                            content: i.instant("msgCommonSystemError")
                        }, v(n).result.then(function () {
                            location.reload()
                        }))
                    }, 1e3 * l)), f.success(function (e) {
                        p.resolve(e), d && (delete n.ajaxStackObj[d], r.cancel(m))
                    }).error(function (e) {
                        p.reject(e), d && (delete n.ajaxStackObj[d], r.cancel(m))
                    }), p.promise
                },
                dialog: function (e, t) {
                    var n = (t = t || {
                        templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                        controller: "modalInstanceCtrl"
                    }).appendTo ? $(t.appendTo) : void 0;
                    return a.open({
                        scope: e,
                        size: t.size,
                        animation: t.animation,
                        templateUrl: t.templateUrl,
                        controller: t.controller,
                        windowClass: t.windowClass || "modal-align-mid",
                        appendTo: n,
                        backdrop: !angular.isDefined(t.backdrop) || t.backdrop,
                        resolve: {
                            items: function () {
                                return t.items
                            }
                        }
                    })
                },
                mi: function (e, t) {
                    t = t || 15e3, n.miList.unshift(e), r(function () {
                        e.fade = !0
                    }, t)
                }
            }
        }

        function s(e, t, n, a, r, i, o, s) {
            function l() {
                var a = n("attrsFilter")(gv.prods, "allows", uv.pd.r, !0);
                a = n("filter")(a, function (e) {
                    return 0 == uv.sessionD.disableProds.length || -1 == uv.sessionD.disableProds.indexOf(e.index)
                }, !0), e.restRegions = n("filter")(gv.regs, {
                    code: "!" + uv.pd.r
                }), e.currRegion = n("filter")(gv.regs, {
                    code: uv.pd.r
                }), !0 === uv.sessionD.isEzdomain && gv.modules.forEach(function (e) {
                    e.status = 0
                }), a.forEach(function (e) {
                    e.isMaintenance = n("filter")(gv.modules, function (t) {
                        return t.id == e.index && 0 != t.status
                    }).length > 0
                }), e.availableProds = n("filter")(a, function (e) {
                    return null != e.regexPath
                }), e.menuProds = angular.copy(e.availableProds), "UK" !== uv.pd.r && e.availableProds.push(gv.prods.filter(function (e) {
                    return 7100 == e.index
                })[0]), e.availableRules = n("filter")(a, function (e) {
                    return null != e.regexPath && "" != e.regexPath
                }), e.availableNews = n("filter")(a, function (e) {
                    return 1 == e.isNews
                });
                var r = n("filter")(gv.emails || [], function (e) {
                    return "CS" == e.accountCategory
                });
                1 == r.length && (e.conditEmails = n("filter")(r[0].group, function (e) {
                    return -1 != e.supportRegs.indexOf(uv.pd.r) && -1 != e.supportLans.indexOf(gv.lan)
                }) || "");
                var i = location.pathname.split("/").length > 2 ? location.pathname.split("/")[2].toLowerCase() : "home";
                i = new RegExp(/asia|multiprogramme|programme/gi).test(i) ? "sports" : i, gv.prodName = 1 == n("filter")(e.availableRules, {
                    name: i
                }, !0).length ? i : "home", e.cooperativeSet.sponsor = n("attrsFilter")(gv.cooperativeSet.sponsor.partners, "allows", uv.geod.country, !0), "sports" == gv.prodName && (uv.pd.sv = 1 != location.pathname.indexOf(gv.lan + "/asia") ? 1 : 2), 503 != gv.pageStatus && t.putObject("prefer", uv.pd, {
                    path: "/",
                    expires: (new Date).addDays(30)
                }), e.cooperativeSet.paymentMethod = n("attrsFilter")(gv.cooperativeSet.paymentMethod.partners, "allows", uv.pd.r, !0), e.cooperativeSet.socialMedia = n("attrsFilter")(gv.cooperativeSet.socialMedia.partners, "allows", uv.pd.r, !0), angular.forEach(e.cooperativeSet.socialMedia, function (e) {
                    var t = n("filter")(s[e.name], function (e) {
                        return -1 != e.allow.indexOf(uv.pd.r) || "default" == e.allow
                    }, !0);
                    if (s[e.name] && t.length > 0) {
                        var a = e.partnerUrl.lastIndexOf("/") == e.partnerUrl.length - 1;
                        e.partnerUrl = a ? e.partnerUrl + t[0].account : e.partnerUrl
                    }
                });
                var o = n("attrsFilter")(gv.cooperativeSet.responsibleGaming.licenses, "prods", gv.prodName, !0);
                e.cooperativeSet.responsibleGaming = n("attrsFilter")(o, "allows", uv.pd.r, !0);
                var l = n("attrsFilter")(gv.cooperativeSet.securityTrust.licenses, "prods", gv.prodName, !0);
                e.cooperativeSet.securityTrust = n("attrsFilter")(l, "allows", uv.pd.r, !0);
                var c = n("attrsFilter")(gv.cooperativeSet.issueLicenses.licenses, "prods", gv.prodName, !0);
                e.cooperativeSet.issueLicenses = n("attrsFilter")(c, "allows", uv.pd.r, !0), angular.forEach(gv.generals.sports.feeds.Schedule, function (e) {
                    var t = {
                        home: {},
                        away: {}
                    };
                    t.home = n("filter")(gv.generals.sports.feeds.DailyBoxScore || [], {
                        fv1: e.fv1,
                        fv2: e.fv3
                    }, !0)[0], t.away = n("filter")(gv.generals.sports.feeds.DailyBoxScore || [], {
                        fv1: e.fv1,
                        fv2: e.fv4
                    }, !0)[0], e.boxscore = t
                })
            }

            function c() {
                var t = getFromSearch("_a");
                e.msg = {
                    title: a.instant("txtBtnLogin"),
                    content: a.instant("msgLoginError" + t)
                }, i.fetch("POST", "/service/userapi/logout"), i.fetch("POST", "/service/userapi/logout").then(function (t) {
                    localStorage.removeItem("recommendDomain"), i.dialog(e).result.then(function () {
                        location.href = location.pathname
                    }, function () {
                        location.href = location.pathname
                    })
                })
            }
            e.global = window.gv, e.client = window.uv, e.ajaxStackObj = {
                guIdSet: {}
            }, e.availableProds = [], e.miList = [], e.gameBackground = "", e.cooperativeSet = {
                sponsor: [],
                paymentMethod: [],
                responsibleGaming: [],
                socialMedia: [],
                issueLicenses: [],
                securityTrust: []
            }, e.msgCounter = {
                notifi: 0,
                inbox: 0
            }, e.hasLobbyHeader = !0, e.switchRegion = function (n, a) {
                var r = {
                    r: n || ""
                };
                i.fetch("POST", "/service/userapi/setpreferences", r).then(function (n) {
                    e.client.pd = n, t.putObject("prefer", uv.pd, {
                        path: "/",
                        expires: (new Date).addDays(30)
                    }), window.location = a
                }), event.stopPropagation(), event.preventDefault()
            }, e.translated = function (e) {
                return n("translate")(e.value).toString()
            }, e.getSportsView = function () {
                return "/" + gv.lan + "/" + (1 == uv.pd.sv ? "sports" : "asia")
            }, e.client.sessionD.apsChannelId = e.global.apsChannelId, e.msg = {};
            var u = {};
            window.self === window.top && 503 != gv.pageStatus && setInterval(function () {
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
                }, 3e4),
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
                            u = {
                                templateUrl: "/cdn1101/resource/templates/modal/user/changePassword.html",
                                controller: "userModalChangePassCtrl"
                            }, i.dialog(e, u).result.then(function (t) {
                                e.msg = t, i.fetch("POST", "/service/userapi/logout").then(function (t) {
                                    localStorage.removeItem("recommendDomain"), i.dialog(e).result.finally(function () {
                                        location.href = location.pathname
                                    })
                                })
                            });
                            break;
                        default:
                            r(c, 1e3)
                    }
                }(), l(),
                function () {
                    function t(e) {
                        return !e.disallow.some(function (e) {
                            return e === uv.pd.r
                        })
                    }
                    var a = [];
                    for (var r in gv.generals) {
                        var i = gv.generals[r],
                            o = i.partners.filter(t).map(function (e) {
                                return e.translateKey = n("quicki18n")(e.id, "partnerNames"), e.isMaintenance = gv.modules.some(function (t) {
                                    var n = t.id === e.id + i.Id,
                                        a = 0 !== t.status;
                                    return n && a
                                }), e.productName = r, e
                            });
                        a = a.concat(o)
                    }
                    e.availablePartners = a
                }(),
                function () {
                    var t = location.pathname.split("/").length > 2 ? location.pathname.split("/")[2].toLowerCase() : "home";
                    e.hiddenUserpanel = new RegExp("/|error|forbidden|not-acceptable/g").test(t)
                }(), o(), e.$watch("client.pd", function () {
                    l()
                })
        }

        function l(e, t) {
            e.close = function () {
                t.dismiss("cancel")
            }, e.confirm = function () {
                t.close()
            }
        }

        function c() {
            var e = location.pathname.split("/")[2] || "home",
                t = "demo" == (e = "sports" == gv.prodName ? gv.prodName : e) ? getFromSearch("productIndex") : gv.generals[e] ? gv.generals[e].Id : 100,
                n = "demo" == e ? 1 * getFromSearch("countryId") : 1 * uv.pd.cid,
                a = "demo" == e ? getFromSearch("date") : "",
                r = window.location.pathname.split("/");
            return {
                countryId: n,
                pageKey: t,
                simDate: a,
                pageName: r[r.length - 1] || "home"
            }
        }
        angular.module("starApp", ["pascalprecht.translate", "ngCookies", "ui.bootstrap", "ngSanitize", "flow", "infinite-scroll", "angular.filter", "ngAnimate", "localytics.directives"]).factory("gameService", function () {
            return {
                launch: function (e) {
                    var t, n, a = 600,
                        r = 600;
                    switch (e.game) {
                        case "bingo":
                            a = 750, r = 650;
                            break;
                        case "casino":
                            a = 1e3, r = 700;
                            break;
                        case "lotto":
                            a = 1220, r = 880;
                            break;
                        case "poker":
                            a = 1e3, r = 695;
                            break;
                        case "live-1000x720":
                            a = 1e3, r = 720;
                            break;
                        case "live-1024x768":
                            t = 20, n = 10, a = 1024, r = 768
                    }
                    t || n || (t = (window.innerWidth - a) / 2, n = (window.innerHeight - r) / 2), window.open(e.url, e.windowName, "width=" + a + ",height=" + r + ",left=" + t + ",top=" + n + ",resizable=1")
                }
            }
        }).factory("dataService", o).factory("floatCalculator", function () {
            var e = function (e, t) {
                var n = 0,
                    a = e.toString(),
                    r = t.toString();
                try {
                    n += a.split(".")[1].length
                } catch (e) {}
                try {
                    n += r.split(".")[1].length
                } catch (e) {}
                return Number(a.replace(".", "")) * Number(r.replace(".", "")) / Math.pow(10, n)
            };
            return {
                add: function (t, n) {
                    var a, r, i;
                    try {
                        a = t.toString().split(".")[1].length
                    } catch (e) {
                        a = 0
                    }
                    try {
                        r = n.toString().split(".")[1].length
                    } catch (e) {
                        r = 0
                    }
                    return i = Math.pow(10, Math.max(a, r)), (e(t, i) + e(n, i)) / i
                },
                minus: function (e, t) {
                    var n, a, r, i;
                    try {
                        n = e.toString().split(".")[1].length
                    } catch (e) {
                        n = 0
                    }
                    try {
                        a = t.toString().split(".")[1].length
                    } catch (e) {
                        a = 0
                    }
                    return r = Math.pow(10, Math.max(n, a)), i = n >= a ? n : a, ((e * r - t * r) / r).toFixed(i)
                },
                mul: e,
                div: function (e, t) {
                    var n, a, r = 0,
                        i = 0;
                    try {
                        r = e.toString().split(".")[1].length
                    } catch (e) {}
                    try {
                        i = t.toString().split(".")[1].length
                    } catch (e) {}
                    return n = Number(e.toString().replace(".", "")), a = Number(t.toString().replace(".", "")), n / a * Math.pow(10, i - r)
                }
            }
        }).factory("piperSetting", c).constant("socialMedia", {
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
        }).config(["$translateProvider", "$sceDelegateProvider", "$provide", function (e, t, n) {
            n.decorator("$browser", ["$delegate", function (e) {
                return e.onUrlChange = function () {}, e.url = function () {
                    return ""
                }, e
            }]), t.resourceUrlWhitelist(["self", gv.domains.content + "**"]), e.useStaticFilesLoader({
                prefix: gv.domains.cdn + "/cdn1101/resource/i18n/",
                suffix: ".json?rv=" + gv.rv
            }), e.preferredLanguage(gv.lan), e.useSanitizeValueStrategy("escaped")
        }]).run(s).filter("attrsFilter", function () {
            return function (e, t, n, a) {
                a = a || !1;
                var r = [];
                return angular.forEach(e, function (e) {
                    if (!angular.isUndefined(e[t])) {
                        var i = angular.isArray(e[t]) ? e[t] : e[t].split(",").map(function (e) {
                                return e
                            }),
                            o = -1 != i.indexOf("*") || -1 != i.indexOf(n);
                        (a && o || !a && !o) && r.push(e)
                    }
                }), r
            }
        }).filter("getResource", n).filter("getLocalizations", a).filter("quicki18n", function () {
            var e = {
                weekdayNames: {
                    Mon: "txtComMonday",
                    Tue: "txtComTuesday",
                    Wed: "txtComWednesday",
                    Thu: "txtComThursday",
                    Fri: "txtComFriday",
                    Sat: "txtComSaturday",
                    Sun: "txtComSunday"
                },
                monthNames: ["txtComStJan", "txtComStFeb", "txtComStMar", "txtComStApr", "txtComStMay", "txtComStJun", "txtComStJul", "txtComStAug", "txtComStSep", "txtComStOct", "txtComStNov", "txtComStDec"],
                prodNames: {
                    1103: "navEurocupRoot",
                    1100: "navSbkRoot",
                    2100: "navRacingRoot",
                    3100: "navESportsRoot",
                    4100: "navCsnRoot",
                    5100: "navLiveCsnRoot",
                    8100: "navLottoRoot",
                    9100: "navBingoRoot",
                    6100: "navPokerRoot",
                    7100: "navFinsRoot",
                    10100: "navPromoRoot",
                    11100: "navMahjongRoot",
                    10104: "navMobileRoot",
                    12100: "navVirtualRoot"
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
                var a;
                switch (parseInt(t)) {
                    case NaN:
                        a = t;
                        break;
                    default:
                        a = e[n][t]
                }
                return a
            }
        }).filter("forloopRange", function () {
            return function (e) {
                var t = [];
                if (e.length < 1) return t;
                for (var n = 2 === e.length ? parseInt(e[1]) : parseInt(e[0]), a = 2 === e.length ? parseInt(e[0]) : 1; a <= n; a++) t.push(a);
                return t
            }
        }).filter("navCollapse", function () {
            return function (e, t, n, a, r) {
                e = e || [], r = r || !1, t = t || 0, n = n || 0, a = a || 1;
                var i = Math.floor((t - n) / a),
                    o = e.slice(0, i - 1),
                    s = e.slice(i - 1, e.length);
                return r ? s : o
            }
        }).filter("localizedDate", e).filter("localizedDay", t).filter("abs", function () {
            return function (e) {
                return Math.abs(e || 0)
            }
        }).filter("trustUrl", r).filter("gameFilterByCategory", function () {
            return function (e, t) {
                return e.filter(function (e) {
                    return e.parentPartnerId == t
                })
            }
        }).filter("floorNumber", i).filter("gCdnReplace", function () {
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
        }).controller("modalInstanceCtrl", l), angular.module("infinite-scroll").value("THROTTLE_MILLISECONDS", 250), n.$inject = ["$filter", "$sce"], a.$inject = ["$filter"], e.$inject = ["$filter", "$translate"], t.$inject = ["$filter", "$translate"], r.$inject = ["$sce"], i.$inject = ["floatCalculator"], s.$inject = ["$rootScope", "$cookies", "$filter", "$translate", "$timeout", "dataService", "signalRHub", "socialMedia"], o.$inject = ["$http", "$q", "$rootScope", "$uibModal", "$timeout", "$translate"], l.$inject = ["$scope", "$uibModalInstance"], c.$inject = []
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r) {
            e.switchLang = function (e) {
                var t = window.location.pathname.replace(gv.lan, e);
                window.location.href = t + window.location.search
            }, e.indexMenu = function (e) {
                return 0 == window.location.pathname.indexOf("/" + gv.lan + "/" + e) || gv.prodName == e
            }, e.checkAvailable = function (e) {
                var n = t("filter")(gv.prods, {
                        index: e
                    }, !0)[0],
                    a = -1 != n.allows.indexOf("*") || -1 != n.allows.indexOf(uv.pd.r),
                    r = -1 != n.forbiddens.indexOf(uv.geod.cc);
                return a && !r
            }, e.statementUrl = function () {
                var e = location.pathname.split("/"),
                    t = e.length > 2 ? e[2] : "home",
                    n = "/" + gv.lan + "/";
                switch (t = -1 !== t.indexOf("sports") ? "sports" : t) {
                    case "sports":
                    case "financials":
                    case "lotto":
                    case "racing":
                    case "virtual":
                        n += "my-account/statement/betting-history/" + t + "/settled-bets";
                        break;
                    case "casino":
                        n += "my-account/statement/betting-history/casino";
                        break;
                    case "live":
                        n += "my-account/statement/betting-history/live";
                        break;
                    default:
                        n += "my-account/statement/transaction-history/summary"
                }
                return n
            }(), r.getMsgCounter(), e.closeDropDown = function () {
                $('[data-toggle="dropdown"]').parent().removeClass("open")
            }
        }

        function t(e, t, n) {
            e.toggleMenu = function () {
                e.showhelpMenu = !e.showhelpMenu
            }, e.showhelpMenu = !1
        }

        function n(e, t) {
            e.openStatus = {}, e.isExpanded = function (e) {
                return -1 !== location.pathname.indexOf(e)
            }, location.pathname.split("/").forEach(function (t) {
                e.openStatus[t] = !0
            })
        }

        function a(e) {
            function t() {
                var t = location.pathname.split("/");
                e.widget.selectedCatgory = t.length > 3 ? t[3] : "sports";
                var a = "undefined" != typeof errorContentPath ? "/" + gv.lan + "/" + errorContentPath : location.pathname;
                e.contentUrl = gv.domains.content + n + a + ".html" + contentsVersionNo()
            }
            e.onInit = t, e.contentUrl = "";
            var n = "UK" != uv.pd.r ? "/MB" : "/UKMB";
            e.sbkbettingRulesUrl = gv.domains.content + n + "/" + gv.lan + "/rules/sports/bettingRules.html" + contentsVersionNo(), e.mahjongbettingRulesUrl = gv.domains.content + n + "/" + gv.lan + "/rules/mahjong/bettingRules.html" + contentsVersionNo(), e.widget = {
                selectedCatgory: ""
            }, t(), $("head #webteamstyle").prop("href", gv.domains.content + "/components/webteam/webteam.css" + contentsVersionNo())
        }

        function r(e, t, n) {
            e.onInit = function () {
                if ("" !== o) switch (gv.pageIndex = o, 503 != gv.pageStatus && (gv.pageStatus = 1 === c.length ? c[0].status : 0), gv.pageStatus) {
                    case 0:
                        if (1100 === o && -1 === i.indexOf(a[3])) return;
                        e.module.guId = getGuid();
                        var t = {
                            guId: e.module.guId,
                            productIndex: 1 * o,
                            languageId: 1 * gv.language.index,
                            countryId: 0 == s ? 204 : s,
                            date: l
                        };
                        n.fetch("JSONP", gv.domains.piper, t).then(function (t) {
                            e.content = t.content
                        });
                        break;
                    case 503:
                    default:
                        var r = gv.lan + "/" + gv.prodName,
                            u = gv.domains.content + "/MB/" + r + ".html" + contentsVersionNo();
                        n.fetch("GET", u).then(function (t) {
                            e.content = t, e.module.effectiveTo = c[0].effectiveTo
                        })
                }
            }, e.module = {
                effectiveTo: 0,
                guId: 0
            };
            var a = location.pathname.split("/"),
                r = a[2] || "home",
                i = ["getbanner", "getfooter"],
                o = "demo" == (r = "sports" == gv.prodName ? gv.prodName : r) ? getFromSearch("productIndex") : gv.generals[r] ? gv.generals[r].Id : 100,
                s = "demo" == r ? 1 * getFromSearch("countryId") : 1 * uv.pd.cid,
                l = "demo" == r ? getFromSearch("date") : "",
                c = t("filter")(gv.modules, {
                    id: o
                }, !0)
        }

        function i(e, t) {
            var n = "";
            switch (e.videoType) {
                case "html5player":
                    n = e.videoUrl;
                    break;
                case "youtube":
                default:
                    n = "https://www.youtube.com/embed/" + e.videoId, n += "?rel=0&autoplay=1&autohide=1&modestbranding=1&showinfo=1&controls=1"
            }
            e.videoSrc = t.trustAsResourceUrl(n)
        }
        angular.module("starApp").controller("headerCtrl", e).controller("videoModalCtrl", i).controller("assistToolsCtrl", t).controller("staticContentCtrl", a).controller("piperSubcriberCtrl", r).directive("resizingFrame", ["$window", function (e) {
            return {
                restrict: "A",
                link: function (t, n, a) {
                    function r() {
                        if (i) $(n).height(e.innerHeight - i);
                        else if (o) {
                            var t = $(n).height();
                            $(n).width(t * (1 * o))
                        }
                    }
                    var i = a.restHeight,
                        o = a.resizingRatio;
                    r(), angular.element(e).bind("resize", r)
                }
            }
        }]).directive("msHeader", ["$window", "$timeout", function (e, t) {
            return {
                restrict: "A",
                controller: "headerCtrl",
                templateUrl: "/cdn1101/resource/templates/common/header.tpl.html",
                link: function (e, n) {
                    function a() {
                        //var t = $(n).find(".more-products").width() + 20,
                            a = $(n).find("#nav-wrapper").width() - ($(n).find("#logo-188bet").width() + $(n).find("#hdr-panel").width()) - t,
                            i = 0;
                        // e.menuProds.push.apply(e.menuProds, e.moreMenuProds),
                        //     function () {
                        //         return r || (r = $("#menu-products>li").map(function (e, t) {
                        //             return $(t).outerWidth()
                        //         }).toArray()).pop(), r
                        //     }().some(function (t, n) {
                        //         var r = i + t;
                        //         if (!(r < a)) return e.moreMenuProds = e.menuProds.splice(n - 1), !0;
                        //         i = r, e.menuProds.length - 1 == n && (e.moreMenuProds = [])
                        //     }), $(n).find("#menu-products").css("opacity", 1)
                    }
                    var r;
                    // e.$watch("menuProds", function () {
                    //     e.menuProds && (e.moreMenuProds = [], $(n).find("#menu-products").css("opacity", 0), t(a))
                    // }), window.addEventListener("resize", function () {
                    //     e.menuProds && ($(n).find("#menu-products").css("opacity", 0), t(a))
                    // }), e.$on("$translateChangeSuccess", function () {
                    //     r = null, e.menuProds && (e.moreMenuProds = [], $(n).find("#menu-products").css("opacity", 0), t(a))
                    // })
                }
            }
        }]).directive("msLobbyheader", [function () {
            return {
                restrict: "A",
                controller: "headerCtrl",
                templateUrl: "/cdn1101/resource/templates/common/lobbyheader.tpl.html"
            }
        }]).directive("msFooter", ["$window", "$timeout", function (e, t) {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/common/footer.tpl.html",
                link: function (n) {
                    function a() {
                        var e = $("body").height();
                        sendMessage(parent, {
                            topic: "setBannerHeight",
                            data: {
                                t: "b",
                                h: e
                            }
                        }, gv.domains.sbkframeInDomain)
                    }
                    n.affiliatesMaintenance = 0 !== gv.modules.find(function (e) {
                        return 104 == e.id
                    }).status, "sports" == gv.prodName && (angular.element(e).bind("resize", function () {
                        t(a, 1e3)
                    }), t(a, 1e3)), n.copyrightYear = (new Date).getFullYear()
                }
            }
        }]).directive("msLobbyfooter", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/common/lobbyfooter.tpl.html"
            }
        }]).directive("starClock", ["dateFilter", "$rootScope", function (e, t) {
            return function (n, a, r) {
                function i() {
                    var n = "0" === t.client.geod.timezone.split(":")[0].charAt(1) ? "+" + t.client.geod.timezone.split(":")[0].charAt(2) : t.client.geod.timezone.split(":")[0],
                        r = "00" === t.client.geod.timezone.split(":")[1] ? "" : ":" + t.client.geod.timezone.split(":")[1];
                    a.text(e(new Date, o, t.client.geod.timezone.replace(":", "")) + " (GMT" + n + r + ")")
                }
                var o;
                n.$watch(r.format, function (e) {
                    o = e, i()
                }), window.setInterval(i, 1e3)
            }
        }]).directive("countdownTimer", ["$interval", function (e) {
            return {
                restrict: "A",
                scope: {
                    countdownTimer: "="
                },
                transclude: !0,
                link: function (t, n, a, r, i) {
                    function o() {
                        var e = t.countdownTimer;
                        angular.isUndefined(e) || (t.clock = new Date(1 * e).timeDiff(s))
                    }
                    var s;
                    s = a.maxUnit || "hours", t.$watch("countdownTimer", o), o(), i(t, function (e) {
                        n.append(e)
                    }), "days" != s && e(o, 1e3)
                }
            }
        }]).directive("userPanel", [function () {
            return {
                restrict: "A",
                controller: "userPanelCtrl"
            }
        }]).directive("announcement", ["msgService", "$timeout", function (e, t) {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/common/announcement.tpl.html",
                link: function (n, a, r) {
                    n.runConfig = {
                        isRun: !0
                    }, n.topAnnouncement = [], e.getAnnouncement().then(function (e) {
                        n.topAnnouncement = e.Items.filter(function (e) {
                            return -1 !== e.sender.indexOf("pos=both") || -1 !== e.sender.indexOf("pos=public")
                        }), t(function () {
                            var e = $(a).find(".marquee-list").outerWidth(),
                                t = $(a).find(".media-body").outerWidth();
                            n.runConfig.position = t, window.setInterval(function () {
                                n.runConfig.isRun && (e + n.runConfig.position <= 0 && (n.runConfig.position = t), n.runConfig.position -= .4, $("#announceHeaderBar").css("margin-left", n.runConfig.position))
                            }, 10)
                        })
                    })
                }
            }
        }]).directive("signUp", [function () {
            return {
                restrict: "A",
                controller: "userRegistrationCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/sign-up.wg.html"
            }
        }]).directive("assistTools", [function () {
            return {
                restrict: "A",
                controller: "assistToolsCtrl",
                templateUrl: "/cdn1101/resource/templates/common/assisttools.tpl.html",
                link: function (e, t) {
                    e.showhelpMenu = !1, t.bind("click", function (e) {
                        e.stopPropagation()
                    }), angular.element(document.body).on("click", function (t) {
                        e.$apply(function () {
                            e.showhelpMenu && (e.showhelpMenu = !e.showhelpMenu)
                        })
                    })
                }
            }
        }]).directive("myAccountSidebar", [function () {
            return {
                restrict: "E",
                link: n,
                templateUrl: "/cdn1101/resource/templates/common/static-leftbar.tpl.html"
            }
        }]).directive("staticContent", [function () {
            return {
                restrict: "A",
                controller: "staticContentCtrl"
            }
        }]).directive("rulesContent", ["$window", function (e) {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/help/rules.tpl.html",
                link: function (t, n) {
                    t.categoryWidth = $(n).width(), angular.element(e).bind("resize", function () {
                        t.categoryWidth = $(n).width()
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
                link: function (e, a) {
                    e.params = e.params || !1, e.videoType = -1 != e.videoUrl.indexOf("youtube.com") ? "youtube" : "html5player";
                    var r;
                    switch (e.params = "", a.bind("click", function () {
                        n.dialog(e, {
                            size: "video",
                            windowClass: "center-modal",
                            templateUrl: "/cdn1101/resource/templates/modal/videoplayerModal.tpl.html",
                            controller: "videoModalCtrl"
                        })
                    }), e.videoType) {
                        case "youtube":
                            e.videoId = getFromSearch("v", e.videoUrl.substr(e.videoUrl.lastIndexOf("?")));
                            var i = gv.domains.gApi + e.videoId;
                            t.get(i).then(function (t) {
                                e.video = t.data.items[0], e.params && (-1 != e.params.indexOf("snapshot") && (r = '<img src="' + e.video.snippet.thumbnails.default.url + '" />'), -1 != e.params.indexOf("views") && (r += "<div>" + e.video.statistics.viewCount + " Views </div>"), a.append(angular.element(r)))
                            })
                    }
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
                            templateUrl: "/cdn1101/resource/templates/modal/qrcode.tpl.html",
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
        }]).directive("socialMedia", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/common/socialmedia.tpl.html"
            }
        }]).directive("microInteraction", [function () {
            return {
                restrict: "A",
                replace: !0,
                templateUrl: "/cdn1101/resource/templates/common/microinteraction.tpl.html"
            }
        }]).directive("carousel188", ["$compile", function (e) {
            return {
                restrict: "A",
                link: function (t, n) {
                    t.items = n.find(".carousel-inner .item"), $(t.items[0]).addClass("active");
                    var a = "<div class='container pos-relative carousel-navigation hidden-xs'><ol class='carousel-indicators'>";
                    a += "<li class='' ng-if='items.length > 1' data-slide-to='{{$index}}' data-target='#carousel-example-generic' ng-repeat='item in items '></li>", a += "</ol></div>";
                    var r = e(angular.element(a))(t);
                    n.find("div.carousel-inner").append(r)
                }
            }
        }]).directive("piperSub", ["$compile", "$window", "$interval", function (e, t, n) {
            return {
                restrict: "A",
                controller: "piperSubcriberCtrl",
                link: function (t, a, r) {
                    var i = r.piperSub,
                        o = "",
                        s = new RegExp(gv.domains.oldContents, "ig");
                    t.$watch(r.dynamicHtml, function (r) {
                        if (r) {
                            if (r = r.replace(s, gv.domains.content), i) {
                                o = $(r).filter("." + i);
                                var l = "sbk-center" == i ? "t" : "r";
                                n(function () {
                                    var e = $("body").height();
                                    t.height != e && sendMessage(parent, {
                                        topic: "setBannerHeight",
                                        data: {
                                            t: l,
                                            h: e > 15 ? e : 0
                                        }
                                    }, gv.domains.sbkframeInDomain), t.height = e
                                }, 1e3)
                            } else {
                                var c = $(r);
                                o = "", angular.forEach(c, function (e) {
                                    var t = $(e).find("#carousel-example-generic").length > 0;
                                    angular.isUndefined($(e).prop("outerHTML")) || (o += t ? $(e).prop("outerHTML") : "<div>" + $(e).prop("outerHTML") + "</div>")
                                })
                            }
                            a.html(o), e(a.contents())(t), $("head #webteamstyle").prop("href", gv.domains.content + "/components/webteam/webteam.css" + contentsVersionNo())
                        }
                    })
                }
            }
        }]).directive("numericOnly", function () {
            return {
                require: "ngModel",
                link: function (e, t, n, a) {
                    var r = n.numericOnly;
                    a.$parsers.push(function (e) {
                        var t = e.replace(/[^\d.]/g, "");
                        if (n.numericOnly && t) {
                            var i = t.split("."),
                                o = i[0],
                                s = i[0];
                            o.length > r && (s = o.substring(0, r)), t = s || ""
                        }
                        return t !== e && (a.$setViewValue(t), a.$render()), t
                    }), a.$formatters.push(function (e) {
                        return -1 == e ? "" : e
                    })
                }
            }
        }).directive("bindHtmlCompile", ["$compile", function (e) {
            return {
                restrict: "A",
                link: function (t, n, a) {
                    t.$watch(function () {
                        return t.$eval(a.bindHtmlCompile)
                    }, function (a) {
                        n.html(a), e(n.contents())(t)
                    })
                }
            }
        }]).directive("scrolly", function () {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    var a = t[0];
                    t.bind("scroll", function () {
                        a.scrollTop + a.offsetHeight >= a.scrollHeight && e.$apply(n.scrolly)
                    })
                }
            }
        }).directive("noDisrupt", ["$window", function (e) {
            return {
                restrict: "A",
                link: function (t, n, a) {
                    ["/my-account/banking/deposit", "/my-account/banking/withdraw"].some(function (e) {
                        return -1 !== location.pathname.indexOf(e)
                    }) || n.click(function (t) {
                        var n = a.href,
                            r = a.windowName;
                        e.open(n, r).focus(), t.preventDefault()
                    })
                }
            }
        }]).directive("fixInside", function () {
            return {
                link: function (e, t, n) {
                    var a = t[0].getBoundingClientRect(),
                        r = a.left < 0,
                        i = a.right - $(window).width(),
                        o = i > 0;
                    r && t.css("left", "-=" + a.left), o && t.css("left", "-=" + i)
                }
            }
        }).directive("optionStyle", function (e, t) {
            return {
                restrict: "A",
                priority: 1e4,
                link: function (e, t, n) {
                    for (var a = e[n.optionStyle], r = t.find("option"), i = 0; i < r.length; i++) angular.element(r[i]).attr("color", a[i].Code)
                }
            }
        }).directive("windowOpen", ["$window", function (e) {
            return {
                restrict: "A",
                link: function (t, n, a) {
                    var r, i, o = a.windowOpen.toLowerCase();
                    switch (o) {
                        case "livechat":
                            t.$watch("client.sessionD.ssid", function () {
                                503 != gv.pageStatus && a.$set("href", "/{0}/live-chat?region={1}&token={2}".format(gv.lan, uv.pd.r, uv.sessionD.ssid))
                            }), 503 == gv.pageStatus && a.$set("href", gv.livechat[gv.lan]), a.$set("windowStyle", "width=800, height=600");
                            break;
                        case "statement":
                            angular.isUndefined(a.ngHref) && angular.isUndefined(a.href) && a.$set("href", "/{0}/my-account/statement/transaction-history/summary".format(gv.lan)), a.$set("windowStyle", "width=1050px,height=700px,scrollbars=1");
                            break;
                        case "luckywheel":
                            a.$set("windowStyle", "width=480,height=768,top=5,left=" + (window.top.outerWidth / 2 - 240));
                        case "resgame":
                            a.$set("windowStyle", "width=1050px,height=700px,scrollbars=yes")
                    }
                    n.click(function () {
                        return r = a.href, i = a.windowStyle, e.open(r, o, i).focus(), !1
                    })
                }
            }
        }]).directive("maintenanceChecker", ["$filter", "$compile", "dataService", function (e, t, n) {
            return {
                restrict: "A",
                link: function (a, r, i) {
                    var o = parseInt(i.pageKey);
                    if (a.module = e("filter")(gv.modules, {
                            id: o
                        }, !0), 1 == a.module.length ? a.module[0].status : 0) {
                        var s = gv.domains.content + "/MB" + location.pathname + ".html";
                        n.fetch("GET", s).then(function (e) {
                            a.effectiveTo = angular.isDefined(a.module) && angular.isDefined(a.module[0].effectiveTo) ? a.module[0].effectiveTo : "", r.html(e), t(r.contents())(a)
                        })
                    }
                }
            }
        }]).directive("countryFlag", [function () {
            return {
                require: "ngModel",
                restrict: "A",
                link: function (e, t, n, a) {
                    function r(e) {
                        ! function () {
                            var e = o.find("option");
                            "" === e.first().text() && e.first().remove()
                        }();
                        var t = o.find("option");
                        angular.forEach(t, function (t, n) {
                            if (0 != n) {
                                var a = $(t),
                                    r = e[n - 1],
                                    i = angular.isDefined(r) ? r.Code.toLowerCase() : "";
                                a.attr("data-icon", "flag-icon flag-icon-" + i)
                            }
                        })
                    }

                    function i() {
                        a.$viewValue && o.val(a.$viewValue), o.selectpicker({
                            noneSelectedText: ""
                        }), o.selectpicker("refresh")
                    }
                    var o = $(t);
                    e.$watch(n.countryFlag, function (e, t) {
                        angular.isDefined(e) && (r(e), i())
                    }, !0), e.$watch(n.ngModel, function () {
                        i()
                    })
                }
            }
        }]).directive("balanceChecker", ["dataService", "$translate", function (e, t) {
            return {
                restrict: "A",
                link: function (n, a, r) {
                    var i = r.playfor || getFromSearch("playfor"),
                        o = 1 * (r.balanceChecker || getFromSearch("partnerId")),
                        s = n.availablePartners.filter(function (e) {
                            return e.id === o
                        })[0],
                        l = n.availablePartners.filter(function (e) {
                            return s.attrs.ParentPartnerId && s.attrs.ParentPartnerId[0] == e.id
                        })[0];
                    l && (s = l), "real" === i && s && 0 !== s.transferId && function (a) {
                        e.fetch("GET", "/service/myaccounttapi/GetTransferBalance", {
                            partnerIds: [a]
                        }).then(function (r) {
                            if (0 === r[0].balance) switch (a) {
                                case 21:
                                    i = {
                                        templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                                        controller: "modalInstanceCtrl",
                                        backdrop: "static"
                                    }, n.msg = {
                                        title: t.instant("txtComNotice"),
                                        content: t.instant("msgTransferNetEntFirst")
                                    }, (o = e.dialog(n, i)).result.then(function () {
                                        window.open("/{0}/my-account/banking/transfer".format(gv.lan), "188main").focus()
                                    });
                                    break;
                                case 23:
                                case 33:
                                    var i = {
                                        templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                                        controller: "modalInstanceCtrl",
                                        backdrop: "static"
                                    };
                                    n.msg = {
                                        title: t.instant("txtComNotice"),
                                        content: t.instant("msgTransferEveryMatrixFirst")
                                    };
                                    var o = e.dialog(n, i);
                                    o.result.then(function () {
                                        window.open("/{0}/my-account/banking/transfer".format(gv.lan), "188main").focus()
                                    })
                            }
                        })
                    }(s.transferId)
                }
            }
        }]).directive("loadDone", function () {
            return {
                restrict: "A",
                compile: function (e, t) {
                    t.$set("loadDone", void 0)
                }
            }
        }).directive("categoryAutoSizing", ["$timeout", function (e) {
            return {
                restrict: "A",
                scope: {
                    categories: "=",
                    morecategories: "="
                },
                link: function (t, n, a) {
                    function r() {
                        var e = o.find(".fixArea").outerWidth(),
                            n = o.width() - e,
                            r = 0;
                        t.categories.push.apply(t.categories, t.morecategories),
                            function () {
                                return i || (i = $("#categoryList>button").map(function (e, t) {
                                    return $(t).outerWidth()
                                }).toArray()), i
                            }().some(function (e, i) {
                                var o = r + e;
                                if (!(o < n)) return t.morecategories = t.categories.splice(i - a.defaultBtnCount - 1), !0;
                                r = o
                            })
                    }
                    var i, o = $(n);
                    t.$watch("categories", function () {
                        t.categories && (t.morecategories = [], e(r))
                    }), window.addEventListener("resize", function () {
                        t.categories && e(r)
                    })
                }
            }
        }]).directive("backTop", ["$window", function (e) {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/common/backtop.tpl.html",
                link: function (t, n) {
                    function a() {
                        var e = $(window).height();
                        n.parent().height() - n.parent().find("#footer").height() > e ? n.css("display", "block") : n.css("display", "none")
                    }
                    angular.element(e).bind("load", a), angular.element(e).bind("resize", a)
                }
            }
        }]).directive("oddsCalculator", [function () {
            return {
                restrict: "A",
                link: function (e, t) {
                    function n(e) {
                        var t = 0,
                            n = 0;
                        for (var a in e) {
                            var r = e[a];
                            r >= 1 ? (t += 1 / r, n++) : e[a] = ""
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
                link: function (t, n, a) {
                    t.currentVersion = "";
                    var r = {
                        v: (new Date).getTime()
                    };
                    e.fetch("GET", gv.domains.iOSAppAsiaUrl + "/version.json", r).then(function (e) {
                        t.currentVersion = e.currentVersion;
                        var r = "itms-services://?action=download-manifest&url=" + gv.domains.iOSAppAsiaUrl + "/" + t.currentVersion + "/manifest.plist";
                        a.$set("href", r), angular.element(n)[0].click()
                    })
                }
            }
        }]).directive("generateQrcodeUrl", [function () {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    var a = parseInt(n.width),
                        r = parseInt(n.height),
                        i = n.generateQrcodeUrl,
                        o = document.createElement("a");
                    o.href = i, i = location.origin + o.pathname;
                    var s = "https://chart.googleapis.com/chart?chs=" + a + "x" + r + "&cht=qr&chl=" + encodeURIComponent(i) + "&choe=UTF-8";
                    t.attr("src", s)
                }
            }
        }]).directive("requireLogin", ["dataService", "$translate", function (e, t) {
            return {
                restrict: "A",
                link: function (n, a) {
                    n.msg = {
                        title: t.instant("txtBtnLogin"),
                        content: t.instant("msgCommonRequestLogin")
                    }, a.click(function (t) {
                        uv.sessionD.login || (t.preventDefault(), t.stopPropagation(), e.dialog(n))
                    })
                }
            }
        }]), e.$inject = ["$scope", "$filter", "$document", "dataService", "msgService"], t.$inject = ["$scope", "$window", "$timeout"], a.$inject = ["$scope"], r.$inject = ["$scope", "$filter", "dataService"], i.$inject = ["$scope", "$sce", "$http"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r) {
            var i = a.location.pathname.split("/")[2];
            e.onInit = function () {
                switch (i) {
                    case "bingo":
                        ! function () {
                            if (!uv.sessionD.aliases || !uv.sessionD.aliases.an || "" === uv.sessionD.aliases.an) {
                                var n = {
                                    templateUrl: "/cdn1101/resource/templates/modal/bingo/createAlias.tpl.html",
                                    controller: "bingoCreateAliasCtrl",
                                    animation: !0,
                                    backdrop: "static"
                                };
                                t.dialog(e, n), event.stopPropagation(), event.preventDefault()
                            }
                        }()
                }
            }
        }

        function t(e, t, n, a) {
            var r = getGuid();
            e.createAlias = function (i) {
                n.fetch("POST", "/service/bingoApi/createAlias", {
                    alias: i,
                    guId: r
                }).then(function (r) {
                    r.Status ? (e.msg.content = a.instant("msgBingoCreateAliasSuccess"), n.dialog(e).result.then(function () {
                        t.close(), location.reload()
                    })) : 103 === r.ErrorCode ? (e.msg.content = a.instant("msgBingoAliasExisted"), n.dialog(e)) : (e.msg.content = a.instant("msgComErrOccur"), n.dialog(e))
                })
            }, e.guId = r, e.msg = {
                title: a.instant("titBingoCreateAlias")
            }
        }
        angular.module("starApp").controller("bingoCreateAliasCtrl", t).controller("gameLobbyCtrl", e), t.$inject = ["$scope", "$uibModalInstance", "dataService", "$translate"], e.$inject = ["$scope", "dataService", "$translate", "$window", "$log"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a) {
            function r() {
                var i = t("attrsFilter")(gv.generals.bingo.categories, "disallow", uv.pd.r);
                a.fetch("GET", "/service/prodApi/getprodFeeds", {
                    prodName: "bingo",
                    feedKey: "BingoRoom"
                }).then(function (e) {
                    var n = e.BingoRoom;
                    angular.forEach(i, function (e) {
                        var a = t("filter")(n, {
                            fv1: e.uniqueKey
                        }, !0);
                        a.length > 0 && (e.identifier = a[0].fv0, e.roomId = a[0].fv1, e.gameName = a[0].fv2, e.pot = a[0].fv3, e.bonuspot = a[0].fv4, e.price = a[0].fv5, e.players = a[0].fv6, e.startTime = a[0].fv7)
                    })
                }), e.roomInfos = i, n(r, 12e4)
            }
            e.widget = {}, e.onInit = r
        }

        function t(e, t, n, a) {
            function r() {
                var o = gv.generals.bingo.categories,
                    s = location.pathname.split("/");
                e.gameName = 4 === s.length ? s[3] : "", e.roomInfo = t("filter")(o, {
                    uniqueKey: e.gameName
                }, !0)[0], a.fetch("GET", "/service/prodApi/getprodFeeds", {
                    prodName: "bingo",
                    feedKey: ""
                }).then(function (n) {
                    var a = t("filter")(n.BingoRoom, {
                            fv1: e.gameName
                        }, !0)[0],
                        r = t("filter")(n.BingoGame, {
                            fv1: e.gameName
                        }, !0);
                    e.roomInfo.identifier = a.fv0, e.roomInfo.roomId = a.fv1, e.roomInfo.gameName = a.fv2, e.roomInfo.pot = a.fv3, e.roomInfo.bonuspot = a.fv4, e.roomInfo.price = a.fv5, e.roomInfo.players = a.fv6, e.roomInfo.startTime = a.fv7, angular.forEach(r, function (t) {
                        var n = {};
                        n.gameName = t.fv5, n.startTime = t.fv6, n.price = t.fv7, n.bonusTicket = t.fv9, e.totalGames.push(n)
                    }), i(e.widget.tabIndex)
                }), n(r, 3e5)
            }

            function i(n) {
                e.widget.pageIndex = 1;
                var a = n - (new Date).getDay(),
                    r = (new Date).addDays(a).setHours(0, 0, 0, 0),
                    i = (new Date).addDays(a + 1).setHours(0, 0, 0, 0);
                e.currnetGames = t("filter")(e.totalGames, function (e) {
                    return 1 * e.startTime >= r && 1 * e.startTime <= i
                }, !0), e.widget.tabIndex = n;
                var o = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.widget.totalPage = Math.ceil(e.currnetGames.length / e.widget.pageSize), e.perPageGames = e.currnetGames.slice(o, o + e.widget.pageSize)
            }
            e.gameName = "", e.totalGames = [], e.perPageGames = [], e.widget = {
                tabIndex: (new Date).getDay(),
                pageIndex: 1,
                pageSize: 10,
                totalPage: 1
            }, e.onInit = r, e.switchWeekDay = i, e.$watch("widget.pageIndex", function () {
                var t = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.perPageGames = e.currnetGames.slice(t, t + e.widget.pageSize)
            })
        }
        angular.module("starApp").controller("bingoRoomlistCtrl", e).controller("bingoRoominfoCtrl", t).directive("bingoRoomlist", [function () {
            return {
                restrict: "A",
                controller: "bingoRoomlistCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/bingo-roomlist.wg.html"
            }
        }]).directive("bingolauncher", ["$translate", "dataService", "gameService", "$rootScope", function (e, t, n, a) {
            return {
                restrict: "A",
                link: function (r, i, o) {
                    function s(e) {
                        c.url = e, o.$set("href", e), o.$set("target", c.windowName)
                    }
                    var l = "/" + gv.lan + "/bingo/lobby?roomId=" + (o.bingolauncher || ""),
                        c = {
                            game: "bingo",
                            windowName: "bingogamelauncher"
                        },
                        u = a.$new();
                    s(l), r.$watch(function () {
                        return $(i).attr("bingolauncher")
                    }, function (e) {
                        s("/" + gv.lan + "/bingo/lobby?roomId=" + e)
                    }), i.bind("click", function (a) {
                        return uv.sessionD.login ? uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion ? (u.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgResGamingSuspended")
                        }, t.dialog(u), a.stopPropagation(), a.preventDefault(), !1) : void n.launch(c) : (u.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgCommonRequestLogin")
                        }, t.dialog(u), a.stopPropagation(), a.preventDefault(), !1)
                    })
                }
            }
        }]).directive("bingoGamepopup", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/widgets/bingo-gamePopup.tpl.html"
            }
        }]).directive("bingoGameinfo", [function () {
            return {
                restrict: "A",
                controller: "bingoRoominfoCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/bingo-roomInfo.tpl.html"
            }
        }]), e.$inject = ["$scope", "$filter", "$timeout", "dataService"], t.$inject = ["$scope", "$filter", "$timeout", "dataService"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e) {
            e.allowPlayForFun = "UK" !== uv.pd.r || uv.sessionD.login
        }

        function t(e) {
            return function (t) {
                var n = [];
                return gv.generals.casino.feeds.Jackpot && (n = e("filter")(gv.generals.casino.feeds.Jackpot, function (e) {
                    return e.keyIndex == t && -1 != e.fv4.indexOf("Flash") && (e.fv2 == uv.geod.cc || "*" == e.fv2)
                }, !0)), n.length > 0 ? 1 * n[0].fv1 : 0
            }
        }

        function n(e, t) {
            function n() {
                t.fetch("GET", "/service/prodApi/getprodTips", {
                    prodName: "casino",
                    counter: 3
                }).then(function (t) {
                    var n = (t = t || []).length > 0 ? Math.floor(10 * Math.random() + 1) % t.length : -1;
                    e.randomTip = t.length > 0 ? t[n] : {}
                })
            }
            e.onInit = n, n()
        }

        function a(e, t, n, a, r, i, o) {
            function s() {
                var n = t("attrsFilter")(gv.prods, "allows", uv.pd.r, !0);
                if ((n = t("filter")(n, function (e) {
                        return (0 == uv.sessionD.disableProds.length || -1 == uv.sessionD.disableProds.indexOf(e.index)) && "casino" === e.name
                    }, !0)).length > 0) {
                    var r = t("filter")(i.sideGameTypes, function (e) {
                            return $(a).width() >= e.minWidth && $(a).width() <= e.maxWidth
                        }, !0)[0],
                        o = $(a).width() >= 456 ? 8 : $(a).width() >= 350 ? 6 : 4;
                    if (o != e.previewsidegame.displayCount) {
                        e.previewsidegame.displayCount = o, e.previewsidegame.value = r.value, e.previewsidegame.minWidth = r.minWidth;
                        var s = a.find("iframe")[0].contentDocument,
                            l = "/" + gv.lan + "/casino/side-game-panel?sideGameType=" + r.value;
                        s.location.replace(l)
                    }
                }
            }

            function l() {
                new Date - e.nowtime < e.delaytime ? r(l, e.delaytime) : (e.timeout = !1, s())
            }
            e.onInit = s, e.nowtime = new Date, e.timeout = !1, e.delaytime = 200, e.previewsidegame = {
                value: "",
                minWidth: 0,
                displayCount: 0
            }, angular.element(o).bind("resize", function () {
                e.nowtime = new Date, !1 === e.timeout && (e.timeout = !0, r(l, e.delaytime))
            })
        }

        function r(e, t, n, a, r, i, o) {
            function s(n) {
                e.filteredgames = t("orderBy")(e.csnsideallgames, "betCount", !0), e.Paging.TotalCount = e.filteredgames.length, e.Paging.TotalPages = parseInt(e.Paging.TotalCount / e.Paging.pageSize) + (e.Paging.TotalCount % e.Paging.pageSize == 0 ? 0 : 1), e.Paging.pageIndex = n, e.Paging.startIndex = e.Paging.TotalCount > 0 ? (n - 1) * e.Paging.pageSize + 1 : 0;
                var a = n === e.Paging.TotalPages;
                e.Paging.endIndex = e.Paging.TotalCount > 0 ? a ? e.Paging.TotalCount : e.Paging.startIndex + e.Paging.pageSize - 1 : 0, e.csnsidegames = e.filteredgames.slice((n - 1) * e.Paging.pageSize, n * e.Paging.pageSize)
            }
            e.csnsidegames = [], e.csnsideallgames = [], e.filteredgames = [], e.Paging = {
                startIndex: 1,
                endIndex: 4,
                pageIndex: 1,
                pageSize: 4,
                TotalCount: 0,
                TotalPages: 0
            }, e.onInit = function () {
                var a = t("filter")(r.sideGameTypes, function (e) {
                    return getFromSearch("sideGameType") == e.value
                }, !0)[0] || [];
                e.sideGameType.value = a.value, e.sideGameType.minWidth = a.minWidth, e.sideGameType.popoverClass = "Mini" == e.sideGameType.value ? "right" : "bottom";
                var i = 0,
                    o = $(window).width() >= 456 ? 8 : $(window).width() >= 350 ? 6 : 4,
                    l = [],
                    c = {
                        Category: "all",
                        lan: gv.lan,
                        guId: e.guId
                    };
                n.fetch("POST", "/service/casinoApi/getsidegames", c).then(function (n) {
                    angular.forEach(n, function (e) {
                        angular.forEach(e.items, function (t, n) {
                            if (("SideGameFlash" == t.plarform || "SideGameHTML5" == t.plarform) && parseInt(t.attrs["min-Width"]) >= a.minWidth && parseInt(t.attrs["max-Width"]) <= a.maxWidth) {
                                var r = angular.copy(e);
                                r.filtersidegame = e.items[n], r.trackById = i++, l.push(r)
                            }
                        })
                    }), e.Paging.pageSize = o, e.csnsideallgames = t("orderBy")(l, "betCount", !0), s(1)
                })
            }, e.nextPage = function (t) {
                s(e.Paging.pageIndex + t)
            }, e.guId = getGuid(), e.sideGameType = {
                value: "",
                minWidth: 0,
                popoverClass: "",
                step: 1
            }, e.clearContent = function () {
                angular.element(document.querySelector("#launchiframe")).contents().find("body").html("")
            }
        }

        function i(e, t) {
            function n(e) {
                if ("agileslot" === e) {
                    var t = [{
                        value: "Mini",
                        widthScale: 16,
                        heightScale: 9
                    }, {
                        value: "Nano",
                        widthScale: 23,
                        heightScale: 30
                    }];
                    angular.forEach(t, function (e) {
                        if (e.value === sideGameType) {
                            var t = $(".mini-game-content").width(),
                                n = t / e.widthScale * e.heightScale;
                            $("#AgileslotUrl").css({
                                width: t,
                                height: n
                            })
                        }
                    })
                }
                var n = $(window.parent.document).find("#launchiframe").next().height(),
                    a = ("agileslot" === e ? angular.element(document.querySelector("#AgileslotUrl")).height() : checkMgsType(mgsSidegameSetting, sideGameType).minHeight) + n;
                $(window.parent.document).find("#launchiframe").css("height", a + "px")
            }
            e.onInit = function (e) {
                n(e),
                    function () {
                        if ("" !== sideGameType && 1 == uv.sessionD.login) {
                            var e = {
                                    id: checkMgsType(mgsSidegameSetting, sideGameType).value,
                                    name: checkMgsType(mgsSidegameSetting, sideGameType).name
                                },
                                t = checkMgsType(mgsSidegameSetting, sideGameType).minWidth,
                                n = checkMgsType(mgsSidegameSetting, sideGameType).minHeight,
                                a = {
                                    bgcolor: "#000000",
                                    scale: "showall",
                                    wmode: "opaque",
                                    align: "middle",
                                    allowFullScreen: "true",
                                    allowScriptAccess: "always",
                                    swliveconnect: "true"
                                };
                            swfobject.embedSWF(sysUrl, "systemContent", t, n, "8.0.24.0", null, {}, a, e)
                        }
                    }()
            }, angular.element(t).bind("resize", function () {
                $("#AgileslotUrl").length > 0 && n("agileslot")
            })
        }

        function o(e, t, n, a, r, i, o, s) {
            function l(e, t) {
                e = e || [], t = t || [];
                for (var n = !1, a = 0; a < t.length && !(n = -1 != e.indexOf(t[a])); a++);
                return n
            }

            function c() {
                0 != e.totalgames.length ? (e.filteredgames = t("orderBy")(e.totalgames.slice(1, e.totalgames.length), e.czfilter.sortBy, !0), e.filteredgames = 0 != e.czfilter.theme.length ? t("filter")(e.filteredgames, function (t) {
                    return l(e.czfilter.theme, t.attrs.CsnThemes)
                }) : e.filteredgames, e.filteredgames = 0 != e.czfilter.bounsType.length && -1 == e.widget.selCategory.indexOf("Slots") ? t("filter")(e.filteredgames, function (t) {
                    return l(e.czfilter.bounsType, t.attrs.SlotBonusType)
                }) : e.filteredgames, e.filteredgames = 0 != e.czfilter.winlines.length && -1 == e.widget.selCategory.indexOf("Slots") ? t("filter")(e.filteredgames, function (t) {
                    return -1 !== e.czfilter.winlines.indexOf(t.attrs.SlotWinLine.toString())
                }) : e.filteredgames, e.filteredgames = 0 != e.czfilter.minBets.length ? t("filter")(e.filteredgames, function (t) {
                    return 0 == e.czfilter.minBets.length || -1 !== e.czfilter.minBets.indexOf(t.minBets)
                }) : e.filteredgames, e.widget.showfeatureGame = 1 == t("filter")(e.totalgames, {
                    uniqueKey: e.featureGame.uniqueKey
                }, !0).length, e.csngames = e.filteredgames.slice(0, e.widget.gameLimit)) : e.csngames = []
            }

            function u(n) {
                if (e.widget.selCategory != n) {
                    e.widget.selCategory = n || e.widget.selCategory, e.guId = getGuid();
                    var a = {
                        Category: e.widget.selCategory,
                        lan: gv.lan,
                        guId: e.guId
                    };
                    i.fetch("POST", "/service/casinoApi/getgames", a).then(function (a) {
                        e.widget.gameLimit = 20, e.totalgames = a, angular.forEach(e.totalgames, function (a) {
                            if (a.minBets = a.attrs.CsnMinBet.toString(), a.jackpot = t("jackpot")(a.uniqueKey), "" == n) {
                                var r = {
                                    uniqueKey: a.uniqueKey,
                                    partnerId: a.partnerId,
                                    Name: t("getResource")(a.resource, "DisplayName")
                                };
                                1 != uv.sessionD.login && "true" != a.attrs.SupportDemo.toString() || e.searchOptions.push(r)
                            }
                        }), e.featureGame = e.totalgames[0] || null, e.groupAttrs.Themes = t("filter")(gv.generals.casino.resource, {
                            localizationType: 901
                        }, !0), e.groupAttrs.BonusType = t("filter")(gv.generals.casino.resource, {
                            localizationType: 902
                        }, !0), e.groupAttrs.WinLine = t("countBy")(e.totalgames, "attrs.SlotWinLine"), e.groupAttrs.MinBet = t("countBy")(e.totalgames, "minBets"), e.filteredgames = a.slice(1, e.totalgames.length), c()
                    })
                }
            }
            e.showFilter = "UK" !== uv.pd.r || uv.sessionD.login, e.widget = {
                selCategory: "all",
                gameLimit: 20,
                searchKey: "",
                showfeatureGame: !0
            }, e.featureGame = {}, e.csngames = [], e.filteredgames = [], e.totalgames = [], e.searchOptions = [], e.guId = 0, e.favoritegames = uv.pd.favs.split(",").map(function (e) {
                return 1 * e
            }), e.czfilter = {
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
                e.general = gv.generals.casino, e.general.categories = t("attrsFilter")(gv.generals.casino.categories, "disallow", uv.pd.r), u("")
            }, e.toggleFavgames = function (t) {
                var n = e.favoritegames.indexOf(t); - 1 == n ? e.favoritegames.push(t) : (e.favoritegames.splice(n, 1), i.fetch("GET", "/service/casinoApi/setfavoritegames", {
                    favoritegames: e.favoritegames.toString()
                })), uv.pd.favs = e.favoritegames.toString(), a.putObject("prefer", uv.pd, {
                    path: "/",
                    expires: (new Date).addDays(30)
                })
            }, e.switchCategory = u, e.loadmoreGames = function () {
                e.widget.gameLimit = e.widget.gameLimit + 20, e.csngames = e.filteredgames.slice(0, e.widget.gameLimit)
            }, e.toggleFilter = function () {
                i.dialog(e, {
                    size: "lg",
                    templateUrl: "/cdn1101/resource/templates/modal/casino/csn-gamefilter.tpl.html",
                    controller: "csnGameFilterCtrl"
                }).result.then(function (t) {
                    e.czfilter = t
                })
            }, e.updatefilter = function (e, t, n) {
                if (e.stopPropagation(), e.preventDefault(), angular.isArray(t)) {
                    var a = t.indexOf(n); - 1 != a ? t.splice(a, 1) : t.push(n)
                }
            }, e.selectResult = function (t) {
                var n = 1 == uv.sessionD.login ? "real" : "fun",
                    a = {
                        game: "casino",
                        windowName: "casinogamelauncher",
                        url: "/" + gv.lan + "/casino/lobby?playfor=" + n + "&gameName=" + t.uniqueKey,
                        templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                        backdrop: "static",
                        controller: "modalInstanceCtrl"
                    };
                s.launch(n, a, t.uniqueKey, t.partnerId), event.stopPropagation(), event.preventDefault(), e.widget.searchKey = ""
            }, e.$watch("czfilter", c, !0)
        }

        function s(e, t, n, a, r) {
            function i() {
                e.preczfilter.theme = [], e.preczfilter.winlines = [], e.preczfilter.bounsType = [], e.preczfilter.minBets = []
            }
            e.preczfilter = {
                sortBy: "betCount",
                theme: [],
                winlines: [],
                bounsType: [],
                minBets: []
            }, e.close = function () {
                a.dismiss("cancel")
            }, e.submitFilter = function () {
                a.close(e.preczfilter)
            }, e.deselectAll = i, i(), e.preczfilter.sortBy = e.czfilter.sortBy, e.preczfilter.theme = e.czfilter.theme, e.preczfilter.winlines = e.czfilter.winlines, e.preczfilter.bounsType = e.czfilter.bounsType, e.preczfilter.minBets = e.czfilter.minBets
        }

        function l(e, t, n, a, r, i, o, s, l) {
            function c() {
                o.dialog(null, {
                    templateUrl: "/cdn1101/resource/templates/modal/casino/play4Fun.tpl.html",
                    controller: "playForFunModalCtrl",
                    animation: !0,
                    size: "sm"
                })
            }
            t.gameInfo = {}, t.randomTip = {}, t.mediaSrcs = [], t.favoritegames = uv.pd.favs.split(",").map(function (e) {
                return 1 * e
            }), t.specificGame = {
                id: "",
                rate: 0,
                loginId: "",
                playfor: getFromSearch("playfor")
            }, t.Oninit = function () {
                uv.sessionD.login || "fun" != t.specificGame.playfor || s(c, 3e5);
                var a = i.gameUniquekey,
                    r = {
                        gameName: "lobby" == a ? getFromSearch("gameName") : a,
                        Language: gv.lan,
                        guId: t.guId
                    };
                o.fetch("GET", "/service/casinoApi/getGameInfo", r).then(function (a) {
                    uv.pd.ratelist = uv.pd.ratelist || {}, t.gameInfo = a, t.specificGame.id = a.id, t.specificGame.rate = uv.pd.ratelist[a.id] || 0, t.gameInfo.jackpot = n("jackpot")(t.gameInfo.uniqueKey), e.gameBackground = n("getResource")(a.resource, "GameBackground");
                    var r = n("filter")(a.resource, {
                        localizationType: "!0"
                    });
                    angular.forEach(r, function (e) {
                        var a = n("getResource")(e),
                            r = "China" == uv.pd.r ? [2] : [3];
                        "" != a && -1 == ["GameBackground", "Preview"].indexOf(e.key) && -1 == r.indexOf(e.localizationType) && t.mediaSrcs.push({
                            localizationType: e.localizationType,
                            key: e.key,
                            val: a
                        })
                    })
                })
            }, t.changeGame = function () {
                o.dialog("", {
                    size: "change-game",
                    templateUrl: "/cdn1101/resource/templates/modal/casino/casino-changegame.tpl.html",
                    controller: "csnChangegameCtrl"
                })
            }, t.toggleFavgames = function (e) {
                var n = t.favoritegames.indexOf(e); - 1 == n ? t.favoritegames.push(e) : (t.favoritegames.splice(n, 1), o.fetch("GET", "/service/casinoApi/setfavoritegames", {
                    favoritegames: t.favoritegames.toString()
                })), uv.pd.favs = t.favoritegames.toString(), r.putObject("prefer", uv.pd, {
                    path: "/",
                    expires: (new Date).addDays(30)
                })
            }, t.guId = getGuid(), t.showClickRating = !1, t.changeWindowSize = function () {
                e.hasLobbyHeader = !e.hasLobbyHeader
            }, t.$watch("specificGame", function (e) {
                if ("" != e.id && 0 != e.rate) {
                    var n = angular.isUndefined(uv.pd.ratelist[e.id]),
                        a = n ? e.rate : e.rate - uv.pd.ratelist[e.id];
                    t.gameInfo.rateCount = n ? t.gameInfo.rateCount + 1 : t.gameInfo.rateCount, t.gameInfo.totalRate = t.gameInfo.totalRate + a, t.gameInfo.rating = 0 != t.gameInfo.rateCount ? t.gameInfo.totalRate / t.gameInfo.rateCount : 0, uv.pd.ratelist[e.id] = e.rate, 0 != a && (o.fetch("GET", "/service/casinoApi/setGameRating", {
                        gameId: e.id,
                        rating: a,
                        addCount: n
                    }), r.putObject("prefer", uv.pd, {
                        path: "/",
                        expires: (new Date).addDays(30)
                    }))
                }
            }, !0)
        }

        function c(e, t, n, a, r) {
            e.gameLimit = 20, e.totalgames = [], e.filtergames = [], e.csngames = [], e.searchKey = "", e.onInit = function () {
                var a = {
                    Category: "all",
                    LanguageCode: gv.lan
                };
                n.fetch("POST", "/service/casinoApi/getgames", a).then(function (n) {
                    e.totalgames = t("filter")(n, function (e) {
                        return "real" == i || "true" == e.attrs.SupportDemo.toString()
                    }, !0), e.csngames = e.totalgames.slice(0, e.gameLimit)
                })
            }, e.modalClose = function () {
                a.dismiss("cancel")
            }, e.switchGame = function (t) {
                (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) && "real" == i ? (e.msg = {
                    title: r.instant("txtBtnLogin"),
                    content: r.instant("msgResGamingSuspended")
                }, n.dialog(e), event.stopPropagation(), event.preventDefault()) : location.href = "/" + gv.lan + "/casino/lobby?playfor=" + i + "&gameName=" + t
            }, e.loadMoreGames = function () {
                e.csngames.length != e.totalgames.length && (e.gameLimit = e.gameLimit + 20, e.csngames = e.totalgames.slice(0, e.gameLimit))
            };
            var i = getFromSearch("playfor") || "fun";
            e.$watch("searchKey", function (n) {
                e.filtergames = t("filter")(e.totalgames, function (e) {
                    return -1 != t("getResource")(e.resource, "DisplayName").toLowerCase().indexOf(n.toLowerCase())
                }), e.csngames = e.filtergames.slice(0, e.gameLimit)
            })
        }

        function u(e, t, n, a, r, i) {
            e.onInit = function () {
                var t = {
                    recentlyGames: e.suggestGame.recentlygame.toString(),
                    counter: e.widget.counter,
                    language: gv.lan,
                    currentGameUniqueKey: e.widget.currentGame,
                    guId: e.suggestGame.guId
                };
                n.fetch("GET", "/service/casinoApi/getSuggestGames", t).then(function (t) {
                    e.suggestGame.recentlygames = t.recentlygames.filter(function (e) {
                        return null != e
                    }), e.suggestGame.recommendgames = t.recommendgames
                })
            }, e.gv = gv, e.widget = {
                gamesType: a.casinoSuggestgame,
                counter: a.counter || 5,
                currentGame: a.currentGame ? a.currentGame : "",
                title: a.$$element.parent().attr("title"),
                desc: a.$$element.parent().attr("desc")
            }, e.suggestGame = {
                recentlygame: [],
                recommandGames: [],
                guId: getGuid()
            }, e.suggestGame.recentlygame = r.getObject("recentlyGames") || [], e.widget.counter = i.closest(".tvscreen-use").length > 0 ? 3 : 5
        }

        function d(e, t, n, a) {
            e.onInit = function () {
                var t = {
                    counter: e.widget.counter,
                    language: gv.lan,
                    guId: e.featureGames.guId
                };
                n.fetch("GET", "/service/casinoApi/getFeatureGames", t).then(function (t) {
                    e.featureGames.result = t
                })
            }, e.gv = gv, e.widget = {
                counter: a.counter || 12
            }, e.featureGames = {
                result: [],
                guId: getGuid()
            }
        }

        function m(e, t, n, a, r) {
            e.onInit = function () {
                var t = {
                    counter: e.widget.counter,
                    language: gv.lan,
                    guId: e.popularGames.guId
                };
                n.fetch("GET", "/service/casinoApi/getPopularGames", t).then(function (t) {
                    e.popularGames.result = t
                })
            }, e.getBetCount = function (e, t) {
                var n = [{
                        value: 1e3,
                        key: "Thousand"
                    }, {
                        value: 1e6,
                        key: "Million"
                    }, {
                        value: 1e9,
                        key: "Billion"
                    }],
                    a = {
                        amount: 0,
                        playeri18n: ""
                    };
                if (e >= 1e3) {
                    var i = e / 1e3 >= 1e3 ? e / 1e6 >= 1e3 ? n[2] : n[1] : n[0];
                    a.amount = Math.round(e / i.value * 10) / 10, a.playeri18n = 0 == t ? r.instant("txtCasino" + i.key + "Players") : r.instant("txtCom" + i.key)
                } else a.amount = e, a.playeri18n = r.instant("txtCasinoPlayers");
                return a
            }, e.gv = gv, e.widget = {
                counter: a.counter || 5
            }, e.popularGames = {
                result: [],
                guId: getGuid()
            }
        }

        function g(e, t, n, a, r, i) {
            e.onInit = function () {
                e.jackpotWinnersGames.result = JSON.parse(e.widget.jackpotWinnersGames.replace(/\'/g, '"')), r(function () {
                    i.find(".jackpot-winners").vTicker({
                        showItems: 1,
                        animation: "fade"
                    })
                })
            }, e.gv = gv, e.widget = {
                jackpotWinnersGames: a.casinoJackpotWinners || []
            }, e.jackpotWinnersGames = {
                result: []
            }
        }

        function f(e, t, n, a, r, i, o) {
            e.onInit = function () {
                var a = {
                    prod: "casino",
                    counter: e.widget.counter,
                    category: "Jackpot",
                    lan: gv.lan,
                    guId: e.jackpotGames.guId
                };
                n.fetch("GET", "/service/casinoApi/getJackpotGames", a).then(function (n) {
                    e.jackpotGames.result = t("orderBy")(n, "betCount", !0), e.jackpotGames.secondresult = e.jackpotGames.result.slice(1, e.jackpotGames.result.length), e.jackpotGames.secondresult.push(e.jackpotGames.result[0]), r(function () {
                        o.find(".star2-csn-carousel").addClass("switch"), i(function () {
                            o.find(".star2-csn-carousel").removeClass("switch"), e.jackpotGames.result.push(e.jackpotGames.result.shift()), e.jackpotGames.secondresult.push(e.jackpotGames.secondresult.shift())
                        }, 500)
                    }, 5e3)
                })
            }, e.gv = gv, e.uv = uv, e.widget = {
                counter: a.counter || 4
            }, e.jackpotGames = {
                result: [],
                secondresult: [],
                guId: getGuid()
            }, e.widget.counter = o.closest(".tvscreen-use").length > 0 || o.closest(".sidebar-use").length > 0 ? 3 : 4
        }

        function p(e, t, n, a) {
            e.onInit = function () {}, e.gv = gv, e.widget = {
                counter: a.counter || 6
            }, e.payoutGames = {
                result: [],
                guId: getGuid()
            }
        }

        function v(e, t, n) {
            e.currentDomain = location.href, e.close = function () {
                t.dismiss("cancel")
            }, e.login = function () {
                $(".input-username>input").trigger("focus"), t.close()
            }, e.onInit = function () {}, e.isShowFb = function () {
                return e.cooperativeSet.socialMedia.some(function (e) {
                    return "facebook" === e.name
                })
            }
        }

        function h(e, t, n, a, r, i) {
            function o(e) {
                var t = n.getObject("recentlyGames") || [],
                    a = t.indexOf(e); - 1 != a && t.splice(a, 1), t.unshift(e);
                var r = t.length > 20 ? t.length - 20 : 0;
                n.putObject("recentlyGames", t.slice(r, r + 20), {
                    path: "/"
                })
            }
            return {
                launch: function (n, s, l, c) {
                    var u = e.$new();
                    if ("real" == n) {
                        if (!i.checkAccessProd("casino")) return sendMessage(top, {
                            topic: "showDialog",
                            data: {
                                title: t.instant("txtBtnLogin"),
                                message: t.instant("msgCsnUnavailableAccess")
                            }
                        }, "*");
                        if (!uv.sessionD.login) return sendMessage(top, {
                            topic: "showDialog",
                            data: {
                                title: t.instant("txtBtnLogin"),
                                message: t.instant("msgCommonRequestLogin")
                            }
                        }, "*");
                        if (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) return sendMessage(top, {
                            topic: "showDialog",
                            data: {
                                title: t.instant("txtBtnLogin"),
                                message: t.instant("msgResGamingSuspended")
                            }
                        }, "*");
                        if (("IDR" == uv.geod.cc || "VND" == uv.geod.cc || "KRW" == uv.geod.cc) && 13 !== c && 17 !== c && 22 !== c && 35 !== c) return u.msg = {
                            title: t.instant("txtComNotice"),
                            content: t.instant("msgCsnTruncated")
                        }, a.dialog(u, s).result.then(function () {
                            r.launch(s), o(l)
                        })
                    }
                    r.launch(s), o(l)
                }
            }
        }

        function w(e) {
            return {
                checkAccessProd: function (t) {
                    var n = e("attrsFilter")(gv.prods, "allows", uv.pd.r, !0);
                    return (n = e("filter")(n, function (e) {
                        return (0 == uv.sessionD.disableProds.length || -1 == uv.sessionD.disableProds.indexOf(e.index)) && e.name === t
                    }, !0)).length > 0
                }
            }
        }
        angular.module("starApp").run(e).controller("csnGamelistCtrl", o).controller("csnGameFilterCtrl", s).controller("csnGameInfoCtrl", l).controller("csnChangegameCtrl", c).controller("casinoSuggestgameCtrl", u).controller("casinoFeaturegameCtrl", d).controller("casinoPopulargameCtrl", m).controller("casinoJackpotWinnersCtrl", g).controller("casinoProgressiveJackpotCtrl", f).controller("casinoTopPayoutCtrl", p).controller("csnTipsCtrl", n).controller("playForFunModalCtrl", v).controller("csnSidegameCtrl", a).controller("csnSideGamePanelCtrl", r).controller("csnSideGameSysCtrl", i).constant("sideGameConst", {
            sideGameTypes: [{
                value: "Mini",
                minWidth: 330,
                maxWidth: 1280
            }, {
                value: "Nano",
                minWidth: 200,
                maxWidth: 329
            }, {
                value: "",
                minWidth: 0,
                maxWidth: 0
            }]
        }).factory("fbService", function () {
            var e = {
                "en-gb": "en_US",
                "zh-cn": "zh_CN",
                "vi-vn": "vi_VN",
                "th-th": "th_TH",
                "id-id": "id_ID",
                "km-kh": "km_KH"
            };
            return {
                share: function () {
                    var t = angular.isUndefined(e[gv.lan]) ? "en_US" : e[gv.lan];
                    ! function (e, n, a) {
                        var r, i = e.getElementsByTagName(n)[0];
                        e.getElementById(a) || ((r = e.createElement(n)).id = a, r.src = "//connect.facebook.net/{lang}/sdk.js#xfbml=1&appId=219151658144170&version=v2.3".replace("{lang}", t), i.parentNode.insertBefore(r, i))
                    }(document, "script", "facebook-jssdk")
                }
            }
        }).factory("casinoLaunchService", h).factory("availableProdsService", w).filter("jackpot", t).directive("casinoGamelist", ["$window", "$timeout", function (e, t) {
            return {
                restrict: "A",
                controller: "csnGamelistCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-gamelist.wg.html"
            }
        }]).directive("casinoGameinfo", [function () {
            return {
                restrict: "A",
                controller: "csnGameInfoCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-gameInfo.tpl.html"
            }
        }]).directive("casinoSuggestgame", [function () {
            return {
                restrict: "A",
                scope: !0,
                controller: "casinoSuggestgameCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-suggestGame.tpl.html"
            }
        }]).directive("casinoFeaturegame", [function () {
            return {
                restrict: "A",
                scope: !0,
                controller: "casinoFeaturegameCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-featureGame.tpl.html"
            }
        }]).directive("casinoPopulargame", [function () {
            return {
                restrict: "A",
                scope: !0,
                controller: "casinoPopulargameCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-popularGame.tpl.html"
            }
        }]).directive("casinoJackpotWinners", [function () {
            return {
                restrict: "A",
                scope: !0,
                controller: "casinoJackpotWinnersCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-jackpotWinners.tpl.html"
            }
        }]).directive("casinoProgressiveJackpot", [function () {
            return {
                restrict: "A",
                scope: !0,
                controller: "casinoProgressiveJackpotCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-progressiveJackpot.tpl.html"
            }
        }]).directive("casinoTopPayout", [function () {
            return {
                restrict: "A",
                scope: !0,
                controller: "casinoTopPayoutCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-topPayout.tpl.html"
            }
        }]).directive("csnGamepopup", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-gamePopup.tpl.html"
            }
        }]).directive("casinoTips", [function () {
            return {
                restrict: "A",
                controller: "csnTipsCtrl"
            }
        }]).directive("csnlauncher", ["$translate", "dataService", "$cookies", "gameService", "$rootScope", "casinoLaunchService", function (e, t, n, a, r, i) {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    var a = n.playfor || "fun",
                        r = {
                            game: "casino",
                            windowName: "casinogamelauncher",
                            templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                            backdrop: "static",
                            controller: "modalInstanceCtrl"
                        };
                    n.$observe("csnlauncher", function () {
                        a = n.playfor || "fun";
                        var e = "/{0}/casino/lobby?playfor={1}&gameName={2}".format(gv.lan, a, n.csnlauncher);
                        r.url = e, n.$set("href", e), n.$set("target", r.windowName)
                    }), t.bind("click", function (e) {
                        a = n.playfor || "fun", i.launch(a, r, n.csnlauncher, 1 * n.partnerid), e.stopPropagation(), e.preventDefault()
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
                link: function (n, a, r) {
                    function i(n) {
                        angular.isUndefined(n) || (l = e("jackpot")(n), a.text(l > 0 ? e("currency")(l, uv.geod.symbol) : ""), angular.isDefined(s) && t.cancel(s), l > 0 && (s = t(o, 1e3)))
                    }

                    function o() {
                        l += .01, a.text(e("currency")(l, uv.geod.symbol))
                    }
                    var s, l = 0;
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
        }).directive("csnRealityCheckListener", function () {
            return {
                restrict: "A",
                link: function (e, t) {
                    if ("UK" === uv.pd.r) {
                        var n = "https://quickfire.gcontent.eu/",
                            a = t[0].contentWindow;
                        e.$on("realityCheck.show", function () {
                            a.postMessage("StopGamePlay", n)
                        }), e.$on("realityCheck.no", function () {
                            a.postMessage("ReStartGamePlay", n)
                        })
                    }
                }
            }
        }).directive("casinoSidegame", [function () {
            return {
                restrict: "A",
                scope: {},
                controller: "csnSidegameCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-sidegame.wg.html"
            }
        }]).directive("casinoSideGamePanel", [function () {
            return {
                restrict: "A",
                controller: "csnSideGamePanelCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/casino-sidegamePanel.tpl.html"
            }
        }]).directive("sideGameLauncher", ["$translate", "$filter", "dataService", "$interval", "$timeout", function (e, t, n, a, r) {
            return {
                restrict: "A",
                link: function (i, o, s) {
                    o.bind("click", function () {
                        function o() {
                            r(function () {
                                i.sideGameType.step = 2
                            }), angular.element(document.querySelector("#launchiframe")).contents().find("body").html(""), postobject.sideGameType = i.sideGameType.value, postobject.gameID = l.filtersidegame.partnerKey, postobject.partnerId = c, i.sideGameType.gameName = postobject.gameName = t("getResource")(l.resource, "DisplayName"), i.sideGameType.gameRtp = postobject.gameRtp = l.attrs.GameRTP.toString();
                            var e = "/" + gv.lan + "/casino/postform";
                            switch (c) {
                                case 1:
                                    $(".sidegamePanel").addClass("load-spinner"), n.fetch("POST", "/service/casinoApi/getCsnToken").then(function (t) {
                                        postobject.token = t, swfobject.removeSWF("XProx"), $("#sideGameWrapper").prepend("<div id='systemContent'></div>"), swfobject.embedSWF(xproxUrl, "systemContent", "0", "0", "8.0.24.0", null, {}, {
                                            bgcolor: "#000000",
                                            scale: "showall",
                                            align: "middle",
                                            allowFullScreen: "false",
                                            allowScriptAccess: "always",
                                            swliveconnect: "true"
                                        }, {
                                            id: "XProx",
                                            name: "XProx"
                                        }), postobject.partnerId = "";
                                        var n = new Date,
                                            r = a(function () {
                                                if (postobject.loginComplete || new Date - n > 6e4) {
                                                    var t = "?&partner=mgs&userType=" + postobject.userType + "&sEXT1=" + postobject.sEXT1 + "&sEXT2=" + postobject.sEXT2 + "&token=" + postobject.token + "&casinoID=" + postobject.casinoID + "&xSession=" + postobject.xSession + "&localConnectionID=" + postobject.localConnectionID + "&balance=" + postobject.balance + "&gameID=" + postobject.gameID + "&gameName=" + encodeURI(postobject.gameName) + "&gameRtp=" + postobject.gameRtp + "&sideGameType=" + postobject.sideGameType;
                                                    $("#launchiframe").attr("src", e + t), $(".sidegamePanel").removeClass("load-spinner"), postobject.loginComplete = !1, a.cancel(r)
                                                }
                                            }, 100)
                                    });
                                    break;
                                case 17:
                                    var o = l.filtersidegame.partnerKey,
                                        s = l.uniqueKey,
                                        u = "?&partner=agileslot&gameName=" + encodeURI(postobject.gameName) + "&gameRtp=" + postobject.gameRtp + "&sideGameType=" + postobject.sideGameType + "&partnerkey=" + o + "&uniqueKey=" + s;
                                    $("#launchiframe").attr("src", e + u)
                            }
                        }
                        var l, c;
                        return uv.sessionD.login ? (l = JSON.parse(s.gameinfo), c = l.partnerId, uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion ? sendMessage(top, {
                            topic: "showDialog",
                            data: {
                                title: e.instant("txtBtnLogin"),
                                message: e.instant("msgResGamingSuspended")
                            }
                        }, "*") : "IDR" != uv.geod.cc && "VND" != uv.geod.cc && "KRW" != uv.geod.cc || 13 === c || 17 === c || 22 === c ? void o() : (i.msg = {
                            title: e.instant("txtComNotice"),
                            content: e.instant("msgCsnTruncated")
                        }, n.dialog(i).result.then(function () {
                            o()
                        }))) : sendMessage(top, {
                            topic: "showDialog",
                            data: {
                                title: e.instant("txtBtnLogin"),
                                message: e.instant("msgCommonRequestLogin")
                            }
                        }, "*")
                    })
                }
            }
        }]), e.$inject = ["$rootScope"], h.$inject = ["$rootScope", "$translate", "$cookies", "dataService", "gameService", "availableProdsService"], n.$inject = ["$scope", "dataService"], o.$inject = ["$scope", "$filter", "$q", "$cookies", "$translate", "dataService", "gameService", "casinoLaunchService"], s.$inject = ["$scope", "$filter", "$q", "$uibModalInstance", "dataService"], l.$inject = ["$rootScope", "$scope", "$filter", "$q", "$cookies", "$attrs", "dataService", "$timeout", "$translate"], c.$inject = ["$scope", "$filter", "dataService", "$uibModalInstance", "$translate"], u.$inject = ["$scope", "$filter", "dataService", "$attrs", "$cookies", "$element"], d.$inject = ["$scope", "$filter", "dataService", "$attrs"], m.$inject = ["$scope", "$filter", "dataService", "$attrs", "$translate"], g.$inject = ["$scope", "$filter", "dataService", "$attrs", "$timeout", "$element"], f.$inject = ["$scope", "$filter", "dataService", "$attrs", "$interval", "$timeout", "$element"], p.$inject = ["$scope", "$filter", "dataService", "$attrs"], v.$inject = ["$scope", "$uibModalInstance", "fbService"], a.$inject = ["$scope", "$filter", "dataService", "$element", "$timeout", "sideGameConst", "$window"], r.$inject = ["$scope", "$filter", "dataService", "$element", "sideGameConst", "$timeout", "$window"], i.$inject = ["$scope", "$window"], w.$inject = ["$filter"], t.$inject = ["$filter"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n) {
            e.popupNeedLogin = function () {
                e.msg = {
                    title: n.instant("navFinsRoot"),
                    content: n.instant("msgCommonRequestLogin")
                }, t.dialog(e)
            }, e.popupSelfExcludeOrSuspended = function () {
                e.msg = {
                    title: n.instant("navFinsRoot"),
                    content: n.instant("msgResGamingSuspended")
                }, t.dialog(e)
            }, e.popupConfirmPlaceBet = function (a) {
                return e.msg = {
                    title: n.instant("navFinsRoot"),
                    content: a
                }, t.dialog(e, {
                    templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                    controller: "modalInstanceCtrl"
                })
            }
        }

        function t(e, t) {
            var n = "fins",
                a = t.getObject(n);
            e.fins = {}, e.gv = gv, e.widgetMessage = widgetMessage, $(".leftContainer .activeOption").trigger("click"), e.fins = function () {
                var e, t, n, r, i = location.pathname.toLowerCase().split("/").pop();
                if (-1 !== i.indexOf("my-statistics") || -1 !== i.indexOf("past-expiries")) n = !angular.isDefined(a) || !angular.isDefined(a.isSingle) || a.isSingle, r = "/{0}/financials/{1}-{2}".format(gv.lan, "digital", n ? "multi" : "single");
                else {
                    var o = i.split("-");
                    n = "single" === o[1], t = o[0], r = "/{0}/financials/{1}-{2}".format(gv.lan, t, n ? "multi" : "single")
                }
                return e = n ? "single" : "multi", {
                    view: i,
                    viewType: e,
                    gameType: t,
                    isSingle: n,
                    switchUrl: r
                }
            }(), t.putObject(n, {
                isSingle: e.fins.isSingle
            }, {
                path: "/"
            }), e.fins.isSingle && (angular.isUndefined(widgets.links.tradologic) || angular.isUndefined(widgets.links.tradologic.option) || (e.selectedAsset = widgets.links.tradologic.option.name, $(window).on(widgets.events.linkOptionUpdated, function () {
                e.$apply(function () {
                    e.selectedAsset = widgets.links.tradologic.option.name
                })
            })))
        }
        angular.module("starApp").controller("financialsParentCtrl", e).controller("financialsCtrl", t).factory("finsService", ["dataService", function (e) {
            return {
                getTradeRoomSessionId: function () {
                    return e.fetch("GET", "/service/finsApi/GetAnonymousToken").then(function (e) {
                        var t = "";
                        try {
                            t = angular.fromJson(e).data.sessionId
                        } catch (e) {}
                        return t
                    })
                }
            }
        }]).directive("financialsGame", ["finsService", function (e) {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/widgets/financials-game.wg.html",
                scope: !0,
                link: function (t) {
                    var n = location.pathname,
                        a = -1 !== n.indexOf("financials") ? n.replace("financials", "financials/view") : "/{0}/financials/view/digital-single".format(gv.lan);
                    uv.sessionD.login ? e.getTradeRoomSessionId().then(function (e) {
                        t.iframeSrc = "{0}?hash={1}".format(a, e)
                    }) : t.iframeSrc = a
                }
            }
        }]).directive("tradeHeader", [function () {
            return {
                restrict: "AE",
                transclude: !0,
                scope: {
                    selectedAsset: "=",
                    green: "=",
                    red: "="
                },
                template: '<span class="goOrDonwLabel">' + widgetMessage.Trade_Header + "</span>"
            }
        }]).directive("disableTranslate", [function () {
            return {
                restrict: "A",
                controller: ["$scope", function (e) {
                    e.disableTranslate = !0
                }]
            }
        }]).directive("finslauncher", ["$translate", "$window", function (e, t) {
            return {
                restrict: "A",
                link: function (e, n, a) {
                    n.bind("click", function () {
                        var e = t.parent.angular.element(t.frameElement).scope();
                        angular.isDefined(e) && (uv.sessionD.login ? uv.sessionD.excluded || uv.sessionD.suspended || uv.sessionD.isAdminExclusion ? e.popupSelfExcludeOrSuspended() : e.popupConfirmPlaceBet(widgetMessage.PleaceBet_ConfirmMsg).result.then(function () {
                            $(".widgetBuyButton").trigger("click")
                        }) : e.popupNeedLogin())
                    })
                }
            }
        }]).directive("autoHeightFrame", ["$interval", function (e) {
            return {
                link: function (t, n, a) {
                    var r = n[0];
                    e(function () {
                        void 0 !== r.contentWindow.document.getElementsByTagName("html")[0] && (r.height = r.contentWindow.document.getElementsByTagName("html")[0].scrollHeight)
                    }, 1e3)
                }
            }
        }]), e.$inject = ["$scope", "dataService", "$translate"], t.$inject = ["$scope", "$cookies", "dataService", "$window"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n) {
            return {
                parseFeed: function (t) {
                    var n = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent('select * from feednormalizer where url="' + t + '"') + "&format=json";
                    return e.get(n)
                },
                parseFeeds: function (e) {
                    for (var n = [], a = 0; a < e.length; a++) n.push(this.parseFeed(e[a]));
                    return t.all(n)
                }
            }
        }

        function t(e, t, n, a, r) {
            function i(n) {
                if (e.widget.selPromoType != n) {
                    e.widget.selPromoType = n, e.filteredPromos = t("filter")(e.availablePromos, function (e) {
                        return "all" === n || e.categoryId == n
                    }), e.filteredCategories = t("filter")(e.promoCategories, function (n) {
                        return t("filter")(e.filteredPromos, {
                            categoryId: n.categoryId
                        }, !0).length > 0
                    });
                    var r = window.location.hash;
                    "" != r && a(function () {
                        var e = $(r);
                        e.length > 0 && e[0].scrollIntoView();
                        var t = e[0].getBoundingClientRect().top;
                        window.scrollBy(0, t)
                    }, 1e3)
                }
            }
            var o = window.gv.domains.aps;
            e.promoGuid = 0, e.availablePromos = [], e.filteredPromos = [], e.promoCategories = [], e.filteredCategories = [], e.widget = {
                selPromoType: ""
            }, e.onInit = function () {
                e.promoGuid = getGuid();
                var n = {
                    countryId: uv.pd.cid,
                    channelId: e.client.sessionD.apsChannelId,
                    member: uv.sessionD.login ? uv.sessionD.ssid : "",
                    guId: e.promoGuid
                };
                r.fetch("JSONP", o + "GetEligiblePromo", n).then(function (n) {
                    angular.forEach(n.promotions, function (n) {
                        n.localization = t("filter")(n.localizations, {
                            code: window.gv.lan
                        }, !0)[0] || t("orderBy")(n.localizations, "id")[0] || {
                            bannerUrl: ""
                        }, e.availablePromos.push(n)
                    }), angular.forEach(n.promoCategories, function (n) {
                        n.localization = t("filter")(n.localizations, {
                            languageCode: window.gv.lan
                        }, !0)[0] || t("orderBy")(n.localizations, "id")[0], n.counter = t("filter")(e.availablePromos, {
                            categoryId: n.categoryId
                        }, !0).length, e.promoCategories.push(n)
                    }), i("all")
                })
            }, e.switchPromoType = i;
            var s = "UK" != uv.pd.r ? "/MB" : "/UKMB";
            e.promoTncUrl = window.gv.domains.content + s + "/" + window.gv.lan + "/promo-general-tnc.html" + contentsVersionNo()
        }

        function n(e, t, n, a, r, i, o) {
            function s() {
                e.promoGuid = getGuid();
                var n = {
                    member: uv.sessionD.login ? uv.sessionD.ssid : "",
                    promoCode: e.promoCode,
                    channelId: e.client.sessionD.apsChannelId,
                    guId: e.promoGuid
                };
                a.fetch("JSONP", u + "checkMemberEligible", n).then(function (n) {
                    e.promoDetail = n.promotion, e.promoSetting = angular.fromJson(n.promotionDetailSetting), e.promoDetail.termsTpl = window.gv.domains.content + "/templates/Promotions/finalclause.html" + contentsVersionNo(), e.promoDetail.tncTpl = window.gv.domains.content + "/templates/Promotions/tncLabel.html" + contentsVersionNo(), e.promoDetail.regionalTerms = uv.pd.r + "." + window.gv.lan, e.isClaimed = "Duplicate Claim Violation" == n.result.remark, e.warningMsg = t("filter")(n.message, {
                        code: window.gv.lan
                    }, !0)[0], e.isEligible = n.result.isEligible && !uv.sessionD.suspended && !uv.sessionD.isAdminExclusion, e.isRejected = 5 === n.result.bonusStatus, e.isEligible && 1 === e.promoSetting.specialPromoType && (n.memAllowListRemark && e.promoSetting.luckyWheelTheme ? e.prizeWon = n.memAllowListRemark.toLowerCase() : e.isEligible = !1)
                })
            }

            function l() {
                e.promoGuid = getGuid();
                var r = 1 === e.promoSetting.specialPromoType ? uv.pd.did ? uv.pd.did : "-1" : uv.pd.did,
                    i = {
                        token: uv.sessionD.ssid,
                        promoCode: e.promoCode,
                        did: r,
                        promoType: e.promoDetail.promoType.id,
                        channelId: e.client.sessionD.apsChannelId,
                        guId: e.promoGuid
                    },
                    l = 2 === e.promoSetting.specialPromoType;
                l && c(), a.fetch("JSONP", u + "claimPromo", i).then(function (r) {
                    o.dismissAll();
                    var i = r.result.isVaild,
                        c = "";
                    if (i)
                        if (l) c = n.instant("msgComSubmitSuccess");
                        else {
                            var u = r.result.bonus;
                            c = n.instant("msgPromoSuccessClaim") + (u > 0 ? "<br/>" + n.instant("msgPromoRewardBouns", {
                                bouns: u,
                                currency: uv.geod.cc
                            }) : "")
                        }
                    else {
                        var d = t("filter")(r.result.messages || [], {
                            code: window.gv.lan
                        }, !0)[0];
                        c = void 0 === d || "General Error" === d.text ? n.instant("msgPromoNotQualified") : d.text
                    }
                    e.isEligible = !i && e.isEligible, e.msg = {
                        title: n.instant("txtComNotification"),
                        content: c
                    }, a.dialog(e).result.then(function () {
                        s()
                    })
                })
            }

            function c() {
                var t = {
                    json: JSON.stringify({
                        promoCode: e.promoCode,
                        token: uv.sessionD.ssid,
                        answers: e.answers
                    })
                };
                a.fetch("JSONP", u + "saveAnswer", t).then(function (e) {})
            }
            var u = gv.domains.aps;
            e.contentPath = gv.domains.content + i.contentPath + contentsVersionNo(), e.englishVersionUrl = location.pathname.replace(window.gv.lan, "en-gb"), e.promoCode = i.promoContent || i.luckyWheel, e.onInit = s, e.checkClaimpromo = function () {
                if (0 == e.promoDetail.allowArray.enableClaimWTPW) {
                    e.msg = {
                        title: n.instant("navPromoRoot"),
                        content: e.warningMsg.text
                    };
                    var t = {
                        templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                        controller: "modalInstanceCtrl"
                    };
                    a.dialog(e, t).result.then(l)
                } else e.claimPromo()
            }, e.claimPromo = l, e.showLuckyWheel = function () {
                e.iframeSrc = "/{0}/promotions/luckywheel?theme={1}&promocode={2}&p={3}&promotype={4}&warningmsg={5}".format(window.gv.lan, e.promoSetting.luckyWheelTheme, e.promoCode, e.prizeWon, e.promoDetail.promoType.id, e.promoDetail.allowArray.enableClaimWTPW ? "" : encodeURIComponent(e.warningMsg.text)), a.dialog(e, {
                    templateUrl: "/cdn1101/resource/templates/modal/iframeModal.html",
                    controller: "modalInstanceCtrl",
                    size: "sm"
                }).result.finally(function () {
                    s()
                })
            }, e.showQuestionnaire = function () {
                a.fetch("JSONP", u + "getQuestionnaire", {
                    promoCode: e.promoCode,
                    langCode: window.gv.lan
                }).then(function (t) {
                    e.questionnaireSetting = t.questionnaireDetail.setting, e.localization = t.questionnaireDetail.localizations[0], e.answers = [], a.dialog(e, {
                        templateUrl: "/cdn1101/resource/templates/modal/questionnaire.html",
                        controller: "modalInstanceCtrl",
                        size: "md",
                        backdrop: "static"
                    }).result.finally(function () {
                        s()
                    })
                })
            }, e.toggleOption = function (e, t) {
                var n = e.indexOf(t);
                n > -1 ? e.splice(n, 1) : e.push(t)
            }, e.saveAnswer = c, e.isWinners = -1 != location.pathname.toLowerCase().indexOf("/winners")
        }

        function a(e, t, n, a, r, i) {
            function o(n, a) {
                if (t.widget.selectedCatgory != n) {
                    t.widget.guId = getGuid(), t.widget.selectedCatgory = n || t.widget.selectedCatgory;
                    var r = "all" == t.widget.selectedCatgory ? e.availableNews.map(function (e) {
                            return e.hashTag
                        }).toString() : t.widget.selectedCatgory,
                        o = {
                            languageCode: window.gv.lan,
                            keyword: r,
                            month: t.widget.month,
                            guId: t.widget.guId
                        };
                    i.fetch("GET", "/service/newsApi/GetMonthNews", o).then(function (e) {
                        t.widget.reuslt = e;
                        var n = a ? location.pathname + "#" + t.widget.selectedCatgory : location.pathname;
                        window.history.pushState("", "", n)
                    })
                }
            }
            t.onInit = function () {
                var a = location.pathname.split("/"),
                    r = location.hash.split("#");
                switch (t.widget.catgories = "all" == t.newsType ? e.availableNews : window.gv.generals[t.newsType].categories, t.widget.selectedCatgory = r.length > 1 ? r[1] : "all" == t.newsType ? "all" : window.gv.generals[t.newsType].categories[0].uniqueKey, a[2]) {
                    case "news":
                        t.widget.month = a.length > 3 ? a[3] : n("date")(new Date, "MMyyyy", uv.sessionD.timezone);
                        break;
                    case "2016-euro":
                        t.widget.month = a.length > 3 ? -1 : 0;
                        break;
                    default:
                        t.widget.month = 0
                }
                o("", !1),
                    function () {
                        for (var e = [], a = new Date, r = 0; r < 48; r++) {
                            var i = new Date(a.getFullYear(), a.getMonth() - r, 1);
                            e.push({
                                val: i.valueOf(),
                                month: i.getMonth(),
                                year: i.getFullYear(),
                                subOpts: []
                            })
                        }
                        for (var o = e.slice(0, a.getMonth() + 1), r = 1; r <= 2; r++) {
                            var s = a.getFullYear() - r,
                                l = n("filter")(e, {
                                    year: s
                                }, !0);
                            o.push({
                                val: l[0].val,
                                month: "",
                                year: s,
                                subOpts: l
                            })
                        }
                        var c = 0 == t.widget.month || -1 == t.widget.month ? a : new Date(t.widget.month.substr(2), parseInt(t.widget.month.substr(0, 2)) - 1);
                        t.options.selected = {
                            val: c,
                            month: c.getMonth()
                        }, t.options.month = o
                    }()
            }, t.switchCatgory = o, t.widget = {
                selectedCatgory: "all",
                guId: "",
                catgories: [],
                month: 0,
                reuslt: []
            }, t.options = {
                month: [],
                selected: {
                    month: 0,
                    val: 0
                }
            }, t.newsType = r.generalNewslist || "all", t.redirectUrl = function (e, t) {
                var n = "all" !== e ? "#" + e : "";
                window.location.href = "/" + window.gv.lan + "/news/" + t + n
            }
        }

        function r(e, t, n, a) {
            function r() {
                a.fetch("GET", "/service/prodApi/getprodFeeds", {
                    prodName: "esports",
                    feedKey: ""
                }).then(function (n) {
                    e.widget.categories = [];
                    var a = n.GroupCompetitions;
                    angular.forEach(window.gv.generals.esports.categories, function (n) {
                        var r = t("filter")(a, {
                            fv1: n.uniqueKey
                        }, !0);
                        r.length > 0 && e.widget.categories.push({
                            id: r[0].fv0,
                            name: n.uniqueKey,
                            competitions: r[0].fv10,
                            resource: n.resource
                        })
                    }), o(e.widget.selectedCatgory, !0)
                })
            }

            function i() {
                angular.isDefined(s) && (n.cancel(s), s = void 0)
            }

            function o(o, l) {
                if (l || e.widget.selectedCatgory != o) {
                    i(), e.widget.selectedCatgory = o || e.widget.selectedCatgory;
                    var c = t("filter")(e.widget.categories, {
                            id: e.widget.selectedCatgory
                        }, !0)[0],
                        u = window.gv.domains.sbkfeed + "/en-gb/Service/OddsService?GetEventsByCompetitions",
                        d = {
                            Language: window.gv.lan,
                            SportId: 23,
                            CompetitionIds: c.competitions,
                            OddsType: uv.sessionD.oddsType,
                            TimeZoneUtcOffset: uv.geod.utcoffset
                        };
                    a.fetch("JSONP", u, d).then(function (t) {
                        e.widget.reuslt.inplay = t["inplay-evs"] || [], e.widget.reuslt.furture = t["further-evs"] || [], e.widget.timer = (new Date).valueOf() + 9e4, s = n(r, 9e4)
                    })
                }
            }
            e.onInit = r, e.switchCatgory = o, e.stopInterval = i, e.widget = {
                timer: 90,
                selectedCatgory: "1",
                categories: [],
                reuslt: {
                    inplay: [],
                    furture: []
                }
            };
            var s
        }

        function i(e, t, n, a, r) {
            function i(n) {
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
                    languageCode: window.gv.lan,
                    category: "all",
                    guId: e.widget.guId
                };
                n.all({
                    regionFaqs: r.fetch("GET", "/service/faqsApi/getRegionFaqs", t),
                    top5Faqs: r.fetch("GET", "/service/faqsApi/getTop5Faqs", t)
                }).then(function (t) {
                    e.top5Faqs = t.top5Faqs, e.availableFaqs = t.regionFaqs.categories, e.allFaqs = t.regionFaqs.allcontents, angular.forEach(e.availableFaqs, function (t) {
                        e.categories.push({
                            code: t.code,
                            resource: t.resource,
                            priority: t.priority
                        })
                    });
                    var n = location.pathname.split("/");
                    i(n.length > 3 ? n[3] : "all"), e.widget.searchKey = getHashVal("q")
                })
            }, e.switchFaqsCategory = i, e.feedback = function (t, n) {
                switch (t = t || "No") {
                    case "Yes":
                        e.msg = {
                            title: a.instant("titCommonMessage"),
                            content: a.instant("msgFaqsThanksForFeedBack")
                        }, r.dialog(e);
                        break;
                    default:
                        e.msg = {
                            title: a.instant("titCommonMessage"),
                            content: a.instant("msgFaqsSpeakToLiveChat")
                        }, e.faqId = n;
                        var i = {
                            templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                            controller: "modalInstanceCtrl"
                        };
                        r.dialog(e, i).result.then(function () {
                            var e = "/{0}/live-chat?region={1}&token={2}".format(window.gv.lan, uv.pd.r, uv.sessionD.ssid);
                            window.open(e, "livechat", "width=800, height=600")
                        })
                }
            }, e.confirm = confirm, e.$watch("widget.searchKey", function (n, a) {
                e.matchFaqs = t("filter")(e.allFaqs, function (e) {
                    return -1 != e.tags.indexOf(n.toLowerCase()) || -1 != e.subject.toLowerCase().indexOf(n.toLowerCase())
                }), (n || a) && window.history.pushState("", "", location.pathname + "#q=" + n)
            })
        }

        function o(e, t, n, a, r) {
            e.onInit = function () {
                var t = {
                    regionCode: uv.pd.r,
                    languageCode: window.gv.lan
                };
                r.fetch("GET", "/service/faqsApi/getRegionFaqsCategories", t).then(function (t) {
                    e.faqsCategories = t
                })
            }
        }

        function s(e, t, n, a, r, i) {
            function o() {
                e.filteredOpts = t("filter")(e.allpaymentOpts, function (t) {
                    return -1 != t.supportedCountry.indexOf(e.czfilter.selcountry) && -1 != t.supportedCurrency.indexOf(e.czfilter.selcurrency)
                }, !0), angular.forEach(e.allpaymentOpts, function (e) {
                    e.showDesc = !1
                })
            }
            e.onInit = function () {
                e.form.guId = getGuid, a.all({
                    payOpts: i.fetch("GET", "/service/prodApi/getPaymentOpts", e.form),
                    filtersOpts: i.fetch("GET", "/service/prodApi/GetAllFilters", {
                        lanaguageCode: window.gv.lan
                    })
                }).then(function (t) {
                    var n = JSON.parse(t.payOpts) || {};
                    e.allpaymentOpts = n[e.widget.optType][0].pOpts, e.widget.opts = t.filtersOpts, o()
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
            }, e.allpaymentOpts = [], e.filteredOpts = [], e.$watch("czfilter.selcountry", o), e.$watch("czfilter.selcurrency", o)
        }

        function l(e, t, n, a, r, i, o) {
            e.rssFeeds = [], e.filteredrssFeeds = [], e.widget = {
                rssLimit: 1
            }, e.onInit = function () {
                var n = [],
                    a = [];
                e.dynamicHeight = t.height ? {
                    height: t.height
                } : {};
                for (var i = 0; i < t.generalRsslist.split(",").length; i++) n.push(t.generalRsslist.split(",")[i]);
                r.parseFeeds(n).then(function (t) {
                    angular.forEach(t, function (e) {
                        try {
                            200 == e.status && angular.forEach(e.data.query.results.rss.channel.item, function (e) {
                                var t = new Date(e.pubDate).getTime();
                                e.pubDate = t > 0 ? t : 0, a.push(e)
                            })
                        } catch (e) {}
                    }), e.filteredrssFeeds = a.slice(0, a.length), e.rssFeeds = e.filteredrssFeeds.slice(0, e.widget.rssLimit)
                })
            }, e.loadmoreRssFeeds = function () {
                e.widget.rssLimit = e.widget.rssLimit + 5, e.rssFeeds = e.filteredrssFeeds.slice(0, e.widget.rssLimit)
            }
        }

        function c(e, t, n) {
            e.switchCategory = function (t) {
                e.widget.selCategory != t && (e.widget.selCategory = t || e.widget.selCategory)
            }, e.widget = {
                selCategory: "iOS"
            }
        }

        function u(e, t, n) {
            e.onInit = function () {
                for (var n = window.location.pathname.replace("/", "").split("/"), a = "", r = 2; r < n.length; r++) a += "/" + n[r];
                t.fetch("GET", "/service/esportsApi/getFrameSrc", {
                    language: window.gv.lan,
                    url: a
                }).then(function (t) {
                    e.iframeSrc = t
                }), document.getElementsByName("esportsGame")[0].addEventListener("load", function () {
                    window.scrollTo(0, 0)
                }, !1)
            }
        }

        function d(e, t, n) {
            return {
                launch: function () {
                    var a = e.$new();
                    (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) && (a.msg = {
                        title: t.instant("txtBtnLogin"),
                        content: t.instant("msgResGamingSuspended")
                    }, n.dialog(a).result.then(function () {
                        window.location.href = "/" + window.gv.lan
                    }, function () {
                        window.location.href = "/" + window.gv.lan
                    }))
                }
            }
        }
        angular.module("starApp").factory("rssFeedService", e).factory("launchGCService", d).controller("promolistCtrl", t).controller("promoTnCCtrl", n).controller("newslistCtrl", a).controller("esportsGrouplistCtrl", r).controller("faqsCtrl", i).controller("faqsCategoriesCtrl", o).controller("paymentOptsCtrl", s).controller("rsslistCtrl", l).controller("mobilelistCtrl", c).controller("esportsGameCtrl", u).controller("modalCarouselCtrl", u).directive("faqsContent", [function () {
            return {
                restrict: "A",
                controller: "faqsCtrl",
                templateUrl: "/cdn1101/resource/templates/help/faqs.tpl.html"
            }
        }]).directive("faqsCategories", [function () {
            return {
                restrict: "A",
                controller: "faqsCategoriesCtrl"
            }
        }]).directive("generalPromolist", ["$window", function (e) {
            return {
                restrict: "A",
                controller: "promolistCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/general-promolist.wg.html",
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
                templateUrl: "/cdn1101/resource/templates/widgets/general-newslist.wg.html",
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
                templateUrl: "/cdn1101/resource/templates/widgets/esports-grouplist.wg.html"
            }
        }]).directive("promoContent", [function () {
            return {
                restrict: "A",
                controller: "promoTnCCtrl",
                templateUrl: "/cdn1101/resource/templates/help/promoTnC.tpl.html"
            }
        }]).directive("paymentoptsContent", [function () {
            return {
                restrict: "A",
                controller: "paymentOptsCtrl",
                templateUrl: "/cdn1101/resource/templates/help/faqs-banking.tpl.html"
            }
        }]).directive("luckyWheel", ["dataService", "$translate", "$filter", function (e, t, n) {
            return {
                restrict: "A",
                link: function (a, r, i) {
                    function o() {
                        var r = getFromSearch("preview");
                        if (r) return p = r, s();
                        a.promoGuid = getGuid();
                        var i = uv.pd.did ? uv.pd.did : "-1",
                            o = {
                                token: uv.sessionD.ssid,
                                promoCode: m,
                                did: i,
                                promoType: g,
                                channelId: a.client.sessionD.apsChannelId,
                                guId: a.promoGuid
                            };
                        e.fetch("JSONP", window.gv.domains.aps + "claimPromo", o).then(function (r) {
                            if (a.isClaimed = !0, r.result.isVaild) s();
                            else {
                                var i = n("filter")(r.result.messages || [], {
                                        code: window.gv.lan
                                    }, !0)[0],
                                    o = void 0 === i || "General Error" === i.text ? t.instant("msgPromoNotQualified") : i.text;
                                a.msg = {
                                    title: t.instant("navPromoRoot"),
                                    content: o
                                }, e.dialog(a)
                            }
                        })
                    }

                    function s() {
                        a.spinComplete = !1;
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
                    a.prizeWon = d, a.checkClaimpromo = function () {
                        if (f) {
                            a.msg = {
                                title: t.instant("navPromoRoot"),
                                content: f
                            };
                            var n = {
                                templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                                controller: "modalInstanceCtrl"
                            };
                            e.dialog(a, n).result.then(o)
                        } else o()
                    }
                }
            }
        }]).directive("generalRsslist", [function () {
            return {
                restrict: "A",
                scope: !0,
                controller: "rsslistCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/general-rsslist.tpl.html"
            }
        }]).directive("esportsGame", [function () {
            return {
                restrict: "A",
                controller: "esportsGameCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/esports-game.wg.html"
            }
        }]).directive("questionnaireReview", ["dataService", "$q", function (e, t) {
            return {
                restrict: "A",
                link: function (n) {
                    var a = window.gv.domains.aps,
                        r = e.fetch("JSONP", a + "getAnswer", {
                            promoCode: n.promoCode,
                            token: uv.sessionD.ssid,
                            guId: n.promoGuid
                        }),
                        i = e.fetch("JSONP", a + "getQuestionnaire", {
                            promoCode: n.promoCode,
                            langCode: window.gv.lan,
                            guId: n.promoGuid
                        });
                    t.all([r, i]).then(function (e) {
                        if ("00000000" === e[0].returnCode && "00000000" === e[1].returnCode) {
                            var t = e[0].answer || {},
                                a = e[1].questionnaireDetail;
                            n.qDetail = {
                                questions: a.localizations[0].questions.map(function (e) {
                                    return e.title
                                }),
                                answers: t.answers
                            }
                        }
                    })
                }
            }
        }]).directive("tutorialLoader", ["dataService", "piperSetting", "$compile", "$uibModal", function (e, t, n, a) {
            var r = t.pageName,
                i = "demo" === r;
            return {
                restrict: "EA",
                link: function (n) {
                    var o;
                    if (i) o = {
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
                        o = function (e) {
                            return {
                                guId: window.getGuid(),
                                productIndex: 1 * e.Id,
                                languageId: 1 * gv.language.index,
                                countryId: 1 * window.uv.pd.cid == 0 ? 204 : 1 * window.uv.pd.cid
                            }
                        }(l)
                    }
                    if (o) {
                        var c = void 0,
                            u = $("body");
                        n.close = function () {
                            c && (c.close(), u.removeClass("tutorial-on"))
                        }, e.fetch("JSONP", window.gv.domains.piper, o).then(function (e) {
                            u.addClass("tutorial-on"), c = a.open({
                                scope: n,
                                size: "fs",
                                windowClass: "modal-tutorial",
                                template: e.content
                            })
                        })
                    }
                }
            }
        }]).directive("tutorial", [function () {
            return {
                restrict: "AE",
                transclude: !0,
                template: '\n                    <div id="tutorial" style="display: block;padding-left: 17px;">\n                        <div class ="modal-dialog modal-tutorial modal-fs">\n                            <div class ="modal-content">\n                                <div class ="container">\n                                    <div class ="fs-modal-header" data-dismiss="modal">\n                                        <span class ="betfont icon-close pull-right close-modal"  ng-click="close()"></span>\n                                    </div>\n                                </div>\n                                <ng-transclude></ng-transclude>\n                            </div>\n                        </div>\n                    </div>\n                    '
            }
        }]), e.$inject = ["$http", "$q", "dataService"], d.$inject = ["$rootScope", "$translate", "dataService"], t.$inject = ["$scope", "$filter", "$translate", "$timeout", "dataService"], n.$inject = ["$scope", "$filter", "$translate", "dataService", "$element", "$attrs", "$uibModalStack"], a.$inject = ["$rootScope", "$scope", "$filter", "$translate", "$attrs", "dataService"], r.$inject = ["$scope", "$filter", "$interval", "dataService"], i.$inject = ["$scope", "$filter", "$q", "$translate", "dataService"], o.$inject = ["$scope", "$filter", "$q", "$translate", "dataService"], s.$inject = ["$scope", "$filter", "$attrs", "$q", "$translate", "dataService"], l.$inject = ["$scope", "$attrs", "dataService", "$interval", "rssFeedService", "$element", "$timeout"], c.$inject = ["$scope", "$attrs", "$element"], u.$inject = ["$scope", "dataService", "launchGCService"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r, i) {
            e.widget = {
                selCategory: "all",
                gameLimit: 20,
                searchKey: "",
                showfeatureGame: !0,
                preCategory: ""
            }, e.onInit = function () {
                var n = getGuid(),
                    o = gv.generals.live;
                e.guId = n;
                var s = {
                    Category: "all",
                    lan: gv.lan
                };
                (uv.sessionD.login ? r.all({
                    feeds: a.fetch("GET", "/service/prodApi/getprodFeeds", {
                        prodName: "live",
                        feedKey: ""
                    }),
                    games: a.fetch("POST", "/service/livecasinoApi/getgames", s),
                    partnerWallets: i.getTransferBalance(n)
                }) : r.all({
                    feeds: a.fetch("GET", "/service/prodApi/getprodFeeds", {
                        prodName: "live",
                        feedKey: ""
                    }),
                    games: a.fetch("POST", "/service/livecasinoApi/getgames", s)
                })).then(function (n) {
                    var a = n.games,
                        r = t("attrsFilter")(o.categories, "disallow", uv.pd.r);
                    e.parentPartners = t("availableParentPartners")(e.availablePartners, "live"), e.totalgames = function (n, a, r, i) {
                        var o = [];
                        if (r.NetEntOpenTable) {
                            var s = r.NetEntOpenTable.filter(function (e) {
                                    return e.fv1 === uv.geod.cc
                                }).map(function (e) {
                                    return JSON.parse(e.fv10)
                                }),
                                l = e.availablePartners.filter(function (e) {
                                    return "live" === e.productName && 21 == e.id && 0 == e.isMaintenance
                                })[0];
                            l && (m = {
                                balance: -1
                            }, i && (m = i.filter(function (e) {
                                return e.id == l.transferId
                            })[0]), s.forEach(function (e) {
                                var r = "netentTable" + e.tableId,
                                    i = n.filter(function (e) {
                                        return e.uniqueKey === r
                                    })[0],
                                    s = e.games.filter(function (e) {
                                        return -1 === e.gameId.indexOf("mobile")
                                    })[0];
                                i && s && (e.gameInfo = a.filter(function (e) {
                                    return e.items[0].partnerKey == s.gameId
                                })[0], e.availableGame = s, e.tableDisplayName = e.tableDisplayName || t("getResource")(i.resource, "DisplayName"), e.tableBackgroundImageUrl = e.tableBackgroundImageUrl || t("getResource")(i.resource, "Preview"), e.parentPartnerId = l.id, e.partnerName = t("getResource")(l.resource, "DisplayName"), e.transferId = l.transferId, e.balance = m.balance, o.push(e))
                            }))
                        }
                        if (r.EM_LiveCasinoFeed) {
                            var c = e.availablePartners.filter(function (e) {
                                    return "live" === e.productName && e.attrs.ParentPartnerId && "33" == e.attrs.ParentPartnerId[0] && 0 == e.isMaintenance
                                }).map(function (e) {
                                    return e.id
                                }),
                                u = a.filter(function (e) {
                                    return -1 !== c.indexOf(e.partnerId)
                                }),
                                d = e.availablePartners.filter(function (e) {
                                    return "live" === e.productName && 33 == e.id
                                })[0];
                            if (d) {
                                var m = {
                                    balance: -1
                                };
                                i && (m = i.filter(function (e) {
                                    return e.id == d.transferId
                                })[0]), u.forEach(function (e) {
                                    var n = {},
                                        a = r.EM_LiveCasinoFeed.filter(function (t) {
                                            return t.fv0 == e.items[0].partnerKey
                                        })[0];
                                    if (a) {
                                        var i = JSON.parse(a.fv10);
                                        i.isOpen && i.enabled && (n.minBet = i.limits && i.limits[uv.geod.cc] ? i.limits[uv.geod.cc].min : 0, n.maxBet = i.limits && i.limits[uv.geod.cc] ? i.limits[uv.geod.cc].max : 0, n.tableBackgroundImageUrl = t("getResource")(e.resource, "Preview") || i.backgroundImage, n.tableDisplayName = t("getResource")(e.resource, "DisplayName"), n.gameInfo = e, n.parentPartnerId = d.id, n.transferId = d.transferId, n.partnerName = t("getResource")(d.resource, "DisplayName"), n.balance = m.balance, o.push(n))
                                    }
                                })
                            }
                        }
                        return o
                    }(r, a, n.feeds, n.partnerWallets), e.filteredgames = angular.copy(e.totalgames)
                })
            }, e.filterCount = function (t) {
                return t.uniqueKey == e.widget.selCategory
            }, e.switchCategory = function (n) {
                e.widget.selCategory != n && (e.widget.selCategory = n, "all" !== e.widget.selCategory ? e.filteredgames = t("gameFilterByCategory")(e.totalgames, e.widget.selCategory) : e.filteredgames = e.totalgames)
            }
        }

        function t(e, t, n, a) {
            function r(n) {
                var r = {
                    Partner: n = n || e.widget.selpartner,
                    LanguageCode: gv.lan
                };
                a.fetch("POST", "/service/livecsnApi/getcategoryGames", r).then(function (a) {
                    e.widget.selpartner = n, e.categorygames = a, angular.forEach(e.categorygames, function (n) {
                        n.games = n.games.filter(function (n) {
                            return t("filter")(e.general.partners, {
                                id: n.partnerId
                            }, !0).length > 0
                        })
                    }), e.categorygames = e.categorygames.filter(function (e) {
                        return e.games.length > 0
                    })
                })
            }
            e.widget = {
                selpartner: -1,
                gameLimit: 20,
                filterSwitch: !1
            }, e.categorygames = [], e.onInit = function () {
                e.general = gv.generals.live, e.general.partners = e.general.partners.filter(function (e) {
                    return "true" === e.attrs.SupportDesktop[0]
                }), e.general.partners = t("attrsFilter")(e.general.partners, "disallow", uv.pd.r), angular.forEach(e.general.partners, function (e) {
                    e.isMaintain = t("filter")(gv.modules, function (t) {
                        return t.id == gv.generals.live.Id + e.id && 0 != t.status
                    }, !0).length > 0
                }), r(e.general.partners.length > 1 ? -1 : 11)
            }, e.getCategoryGames = r, e.filterperGame = function (e) {
                return function (n) {
                    return t("filter")(e, {
                        partnerId: n.id
                    }, !0).length > 0
                }
            }
        }

        function n(e, t, n, a) {
            e.categameInfo = {}, e.onInit = function () {
                var t = location.pathname.split("/");
                e.gameName = 4 === t.length ? t[3] : "", e.general = gv.generals.live;
                var n = {
                    gameName: e.gameName
                };
                a.fetch("GET", "/service/livecsnApi/getCategoryGameInfo", n).then(function (t) {
                    e.categameInfo = t
                })
            }, e.filterperGame = function (e) {
                return function (n) {
                    return t("filter")(e, {
                        partnerId: n.id
                    }, !0).length > 0
                }
            }
        }
        angular.module("starApp").controller("liveGamelistCtrl", t).controller("liveGameinfoCtrl", n).controller("liveUkGamelistCtrl", e).directive("liveLobbylist", ["$filter", function (e) {
            return {
                templateUrl: "/cdn1101/resource/templates/widgets/live-lobbylist.wg.html",
                link: function (e) {
                    e.widget = {}, e.widget.partners = e.availablePartners.filter(function (e) {
                        return "live" === e.productName && 0 == e.isMaintenance
                    }), e.selectedPartner = e.widget.partners[0], e.selectPartner = function (t) {
                        e.selectedPartner = t
                    }
                }
            }
        }]).directive("liveGamelist", [function () {
            return {
                restrict: "A",
                controller: "liveGamelistCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/live-gamelist.wg.html"
            }
        }]).directive("liveUkGamelist", [function () {
            return {
                restrict: "A",
                controller: "liveUkGamelistCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/live-uk-gamelist.wg.html"
            }
        }]).directive("liveGamepopup", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/widgets/live-gamePopup.tpl.html"
            }
        }]).directive("livelauncher", ["$filter", "$translate", "gameService", "dataService", "$rootScope", function (e, t, n, a, r) {
            return {
                restrict: "A",
                link: function (i, o, s) {
                    function l() {
                        var t = "",
                            n = 1 * s.livelauncher || "";
                        switch (p = e("filter")(gv.generals.live.partners, {
                            id: 1 * n
                        }, !0)[0] || {}, u) {
                            case "download":
                                var a = e("filter")(p.resource, {
                                    key: "DownloadSrc"
                                }, !0);
                                if (angular.isUndefined(a) || angular.isUndefined(a[0].lanVals) || 0 == a[0].lanVals.length) o.remove();
                                else {
                                    var r = window.location.href.split("/");
                                    t = r[0] + "//" + r[2] + "/help/download?prod=live&id=" + s.livelauncher + "&lang=" + gv.lan
                                }
                                break;
                            default:
                                var l = i.$eval(s.query) || {},
                                    g = $.param(l);
                                t = "/" + gv.lan + "/live/lobby?partnerId=" + n + "&partnerName=" + p.uniqueKey + "&playfor=" + c + "&" + g, angular.isUndefined(d) || (t += "&gameType=" + d)
                        }
                        s.$set("href", t), s.$set("target", m.windowName), m.url = t, m.partnerName = p.uniqueKey
                    }
                    var c = s.playfor || "real",
                        u = s.launcherType || "playNow",
                        d = s.launcherGame || "",
                        m = {
                            game: "live-1000x720",
                            windowName: "livecsngamelauncher"
                        },
                        g = r.$new(),
                        f = {
                            templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                            backdrop: "static",
                            controller: "modalInstanceCtrl"
                        },
                        p = null,
                        v = s.balance ? Number(s.balance) : null,
                        h = s.transferid ? Number(s.transferid) : null;
                    l(), s.$observe("livelauncher", l), o.bind("click", function (e) {
                        if (uv.sessionD.login)
                            if (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) g.msg = {
                                title: t.instant("txtBtnLogin"),
                                content: t.instant("msgResGamingSuspended")
                            }, a.dialog(g), e.stopPropagation(), e.preventDefault();
                            else if (null == h || 21 != h && 23 != h || null == v || 0 != v)
                            if ("Royal-Suite" != m.partnerName || "IDR" != uv.geod.cc && "VND" != uv.geod.cc && "KRW" != uv.geod.cc)
                                if ("Imperial-Suite" != m.partnerName && "Oriental-Suite" != m.partnerName || "IDR" != uv.geod.cc && "VND" != uv.geod.cc) {
                                    if ("download" != u) {
                                        var r = m.partnerName;
                                        "Imperial-Suite" !== r && "Euro Live Dealer" !== r || (m.game = "live-1024x768"), n.launch(m), e.stopPropagation(), e.preventDefault()
                                    }
                                } else g.msg = {
                                    title: t.instant("txtComNotice"),
                                    content: t.instant("msgCsnTruncated")
                                }, i = a.dialog(g, f), i.result.then(function () {
                                    n.launch(m)
                                }), e.stopPropagation(), e.preventDefault();
                        else {
                            g.msg = {
                                title: t.instant("txtComNotice"),
                                content: t.instant("msgCsnTruncated")
                            };
                            var i;
                            (i = a.dialog(g, f)).result.then(function () {
                                n.launch(m)
                            }), e.stopPropagation(), e.preventDefault()
                        } else {
                            var o = {
                                templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                                controller: "modalInstanceCtrl",
                                backdrop: "static"
                            };
                            g.msg = {
                                title: t.instant("txtComNotice"),
                                content: 21 == h ? t.instant("msgTransferNetEntFirst") : t.instant("msgTransferEveryMatrixFirst")
                            }, e.stopPropagation(), e.preventDefault(), a.dialog(g, o).result.then(function () {
                                location.href = "/{0}/my-account/banking/transfer".format(gv.lan)
                            }, function () {
                                n.launch(m)
                            })
                        } else g.msg = {
                            title: t.instant("txtBtnLogin"),
                            content: t.instant("msgCommonRequestLogin")
                        }, a.dialog(g), e.stopPropagation(), e.preventDefault()
                    })
                }
            }
        }]).directive("liveGameinfo", [function () {
            return {
                restrict: "A",
                controller: "liveGameinfoCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/live-gameInfo.tpl.html"
            }
        }]).directive("netentGameClient", [function () {
            return {
                link: function () {
                    function e(e) {
                        var t = document.getElementById("neGameClient");
                        a = t.offsetWidth, r = t.offsetHeight
                    }

                    function t(e) {}

                    function n() {
                        var e = Math.min(window.innerWidth / a, window.innerHeight / r),
                            t = document.getElementById("neGameClient");
                        t.width = Math.round(a * e), t.height = Math.round(r * e)
                    }
                    var a, r;
                    launchConfig && (netent.launch(launchConfig, e, t), window.onresize = n, $("body").addClass("netentLive"))
                }
            }
        }]), t.$inject = ["$scope", "$filter", "$translate", "dataService"], n.$inject = ["$scope", "$filter", "$translate", "dataService"], e.$inject = ["$scope", "$filter", "$translate", "dataService", "$q", "transferService"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r) {
            function i() {
                e.intervalTime && n.cancel(e.intervalTime), e.marketInfos = gv.generals.lotto.categories, r.fetch("GET", "/service/prodApi/getprodFeeds", {
                    prodName: "lotto",
                    feedKey: ""
                }).then(function (a) {
                    e.marketfeed = t("orderBy")(a.KenoMarket, "fv2");
                    var r = o(e.marketInfos);
                    e.intervalTime = n(function () {
                        var a = -1,
                            r = t("filter")(e.marketInfos, function (e) {
                                return e.startTime < (new Date).valueOf() && "open" == e.status
                            }, !0);
                        r.length > 0 && (a = o(r)), 0 == a && n.cancel(e.intervalTime)
                    }, 1e3), 0 == r && n.cancel(e.intervalTime)
                }), a(i, 3e5)
            }

            function o(n) {
                return angular.forEach(n, function (n) {
                    var a = (new Date).valueOf(),
                        r = t("filter")(e.marketfeed, function (e) {
                            return e.fv0 == n.uniqueKey && e.fv2 > a
                        }, !0),
                        i = t("filter")(e.marketfeed, {
                            fv0: n.uniqueKey
                        }, !0);
                    r.length > 0 ? (n.marketName = r[0].fv0, n.drawNumber = r[0].fv1, n.startTime = r[0].fv2, n.counterId = r[0].fv3, n.status = "open") : i.length > 0 && (n.marketName = i[0].fv0, n.drawNumber = i[0].fv1, n.startTime = i[0].fv2, n.counterId = i[0].fv3, n.status = "closed")
                }), t("filter")(e.marketInfos, function (e) {
                    return "open" == e.status
                }, !0).length
            }
            e.widget = {}, e.onInit = i
        }

        function t(e, t) {
            e.onInit = function () {
                e.lottoPartners = t("attrsFilter")(gv.generals.lotto.partners, "disallow", uv.pd.r), e.lottoPartners = e.lottoPartners.filter(function (e) {
                    return "true" === e.attrs.SupportDesktop[0]
                })
            }
        }
        angular.module("starApp").controller("lottoMarketinfoCtrl", e).controller("lottoinfoCtrl", t).directive("lottoMarketlist", [function () {
            return {
                restrict: "A",
                controller: "lottoMarketinfoCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/lotto-marketlist.wg.html"
            }
        }]).directive("lottoIlotto", [function () {
            return {
                restrict: "A",
                controller: "lottoinfoCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/lotto-ilotto.wg.html"
            }
        }]).directive("lottolauncher", ["$translate", "dataService", "gameService", function (e, t, n) {
            return {
                restrict: "A",
                link: function (a, r, i) {
                    function o(e) {
                        s.url = e, i.$set("href", e), i.$set("target", s.windowName)
                    }
                    var s = {
                        game: "lotto",
                        windowName: "lottogamelauncher"
                    };
                    o("/" + gv.lan + "/lotto/lobby"), a.$watch(function () {
                        return $(r).attr("lottolauncher")
                    }, function (e) {
                        e && o("/" + gv.lan + "/lotto/lobby" + (e ? "?partnerId=" + e : ""))
                    }), a.$watch(function () {
                        return $(r).attr("counterlauncher")
                    }, function (e) {
                        e && o("/" + gv.lan + "/lotto/lobby" + (e ? "?counterId=" + e : ""))
                    }), r.bind("click", function (r) {
                        return uv.sessionD.login ? uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion ? (a.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgResGamingSuspended")
                        }, t.dialog(a), r.stopPropagation(), r.preventDefault(), !1) : void n.launch(s) : (a.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgCommonRequestLogin")
                        }, t.dialog(a), r.stopPropagation(), r.preventDefault(), !1)
                    })
                }
            }
        }]).directive("lottoMarketbox", [function () {
            return {
                restrict: "A",
                link: function (e, t) {
                    t.bind("mouseover", function () {
                        t.addClass("active")
                    }).bind("mouseleave", function () {
                        t.removeClass("active")
                    })
                }
            }
        }]), e.$inject = ["$scope", "$filter", "$interval", "$timeout", "dataService"], t.$inject = ["$scope", "$filter"]
    }()
}, function (e, t) {
    angular.module("starApp").directive("downloadInstaller", [function () {
        return {
            restrict: "A",
            link: function (e, t, n) {
                var a = function () {
                    var e = window.location.href.split("/");
                    return e[0] + "//" + e[2]
                }() + "/help/download?prod=" + n.downloadInstaller + "&id=" + n.id + "&lang=" + gv.lan;
                n.$set("href", a)
            }
        }
    }])
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r, i, o) {
            function s(n) {
                e.widget.pageIndex = 1;
                var a = c[n],
                    r = (new Date).valueOf(),
                    i = t("filter")(e.tournaments, function (e) {
                        e.buyin = 1 * e.attrs["buy-in"], e.fee = 1 * e.attrs.fee, e.players = 1 * e.attrs.players;
                        var t = 1 * e.attrs["buy-in"] + 1 * e.attrs.fee;
                        return t >= a.min && t <= a.max && e.createDate >= r
                    }, !0);
                e.originGames = i, i = t("filter")(i, function (t) {
                    return -1 != t.uniqueKey.toLowerCase().indexOf(e.widget.searchKey.toLowerCase()) || -1 != t.attrs["buy-in"].toString().toLowerCase().indexOf(e.widget.searchKey.toLowerCase()) || -1 != t.attrs.fee.toString().toLowerCase().indexOf(e.widget.searchKey.toLowerCase()) || -1 != t.attrs.players.toString().toLowerCase().indexOf(e.widget.searchKey.toLowerCase())
                }, !0), e.currnetGames = t("orderBy")(i, e.widget.sortcolum, e.widget.reverse), e.widget.tabIndex = n, l(e.currnetGames)
            }

            function l(t) {
                var n = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.widget.totalPage = Math.ceil(t.length / e.widget.pageSize), e.perPageGames = t.slice(n, n + e.widget.pageSize)
            }
            e.tournaments = [], e.currnetGames = [], e.perPageGames = [], e.widget = {
                className: o.pokerTournaments || "subscreen-use",
                tabIndex: 1,
                pageIndex: 1,
                pageSize: 10,
                totalPage: 1,
                reverse: !1,
                sortcolum: "createDate",
                searchKey: ""
            }, e.gv = gv, e.onInit = function () {
                i.fetch("POST", "/service/pokerApi/getTournaments", {
                    Category: "TournamentsFeed"
                }).then(function (t) {
                    e.widget.pageIndex = 1, e.tournaments = t, s(0)
                })
            }, e.switchTournaments = s, e.sortBy = function (n, a) {
                e.widget.reverse = !e.widget.reverse, e.widget.sortcolum = a, e.currnetGames = t("orderBy")(e.currnetGames, e.widget.sortcolum, e.widget.reverse), l(e.currnetGames);
                var r = e.widget.reverse ? "icon-sort-down" : "icon-sort-up";
                angular.element(n.currentTarget).siblings().find(".icon").removeClass("icon-sort-up icon-sort-down").addClass("icon-sort-unsorted"), angular.element(n.currentTarget).find(".icon").removeClass("icon-sort-up icon-sort-down icon-sort-unsorted").addClass(r)
            }, e.calculateTotalPages = l;
            var c = [{
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
                e.widget.pageIndex = 1 * e.widget.pageIndex;
                var t = e.widget.pageIndex * e.widget.pageSize - e.widget.pageSize;
                e.perPageGames = e.currnetGames.slice(t, t + e.widget.pageSize)
            }), e.$watch("widget.searchKey", function (n, a) {
                "" !== n ? (e.currnetGames = t("filter")(e.originGames, function (e) {
                    return -1 != e.uniqueKey.toLowerCase().indexOf(n.toLowerCase()) || -1 != e.attrs["buy-in"].toString().toLowerCase().indexOf(n.toLowerCase()) || -1 != e.attrs.fee.toString().toLowerCase().indexOf(n.toLowerCase()) || -1 != e.attrs.players.toString().toLowerCase().indexOf(n.toLowerCase())
                }), l(e.currnetGames)) : "" == n && "" != a && (e.currnetGames = e.originGames, l(e.currnetGames))
            })
        }
        angular.module("starApp").controller("pokerTournamentsCtrl", e).directive("pokerTournaments", [function () {
            return {
                restrict: "A",
                controller: "pokerTournamentsCtrl",
                scope: !0,
                templateUrl: "/cdn1101/resource/templates/widgets/poker-tournaments.wg.html"
            }
        }]).directive("badbeatJackpot", ["$filter", function (e) {
            return {
                restrict: "A",
                link: function (t, n) {
                    var a = gv.generals.poker.feeds.BadbeatJackpot || "";
                    n.text(e("currency")(a[0].fv0, "€"))
                }
            }
        }]).directive("pokerlauncher", ["$translate", "$filter", "gameService", "dataService", "$rootScope", function (e, t, n, a, r) {
            return {
                restrict: "A",
                link: function (i, o, s) {
                    var l = s.pokerlauncher,
                        c = t("filter")(gv.generals.poker.partners, {
                            id: 8
                        }, !0),
                        u = (t("filter")(c[0].resource, {
                            key: "DownloadSrc"
                        }, !0), {
                            game: "poker",
                            windowName: "pokergamelauncher"
                        }),
                        d = window.location.href.split("/"),
                        m = d[0] + "//" + d[2],
                        g = gv.lan,
                        f = "instant" != l ? m + "/help/download?prod=poker&id=8&lang=" + g : "/" + gv.lan + "/poker/postform",
                        p = r.$new();
                    s.$set("href", f), s.$set("target", u.windowName), o.bind("click", function (t) {
                        return "instant" == l && (uv.sessionD.suspended || uv.sessionD.excluded || uv.sessionD.isAdminExclusion) ? (p.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgResGamingSuspended")
                        }, a.dialog(p), !1) : "instant" != l || uv.sessionD.login ? void("instant" == l && (u.url = f, "IDR" == uv.geod.cc || "VND" == uv.geod.cc || "KRW" == uv.geod.cc ? (p.msg = {
                            title: e.instant("txtComNotice"),
                            content: e.instant("msgPokerCurrencyCondition")
                        }, a.dialog(p, u).result.then(function () {
                            n.launch(u)
                        })) : n.launch(u), t.stopPropagation(), t.preventDefault())) : (p.msg = {
                            title: e.instant("txtBtnLogin"),
                            content: e.instant("msgCommonRequestLogin")
                        }, a.dialog(p), !1)
                    })
                }
            }
        }]), e.$inject = ["$scope", "$filter", "$q", "$cookies", "$translate", "dataService", "$attrs"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";
        angular.module("starApp").directive("racingGame", ["dataService", "$q", function (e, t) {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/widgets/racing-game.wg.html",
                scope: !0,
                link: function (n) {
                    function a() {
                        var e = [window.scrollY, window.innerHeight];
                        document.getElementsByName("racingGame")[0].contentWindow.postMessage(e, r)
                    }
                    var r = void 0;
                    n.reload = function () {
                        var a = t.defer();
                        return e.fetch("GET", "/service/racingApi/getFrameSrc", {
                            language: gv.lan
                        }).then(function (e) {
                            var t = document.createElement("a");
                            t.href = e, r = t.protocol + "//" + t.hostname, n.iframeSrc = e + "&iframeParentUrl=" + window.location.origin, a.resolve()
                        }), a.promise
                    }, document.getElementsByName("racingGame")[0].addEventListener("load", function () {
                        a()
                    }, !1), window.addEventListener("scroll", function () {
                        a()
                    }), window.addEventListener("resize", function () {
                        a()
                    }), n.reload()
                }
            }
        }]).filter("trusted", ["$sce", function (e) {
            return function (t) {
                return e.trustAsResourceUrl(t)
            }
        }])
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a) {
            e.widgetEvs = {
                    guId: 0,
                    inplay: [],
                    furture: [],
                    targetEv: {}
                },
                function () {
                    e.sportId = n.sportid || "", e.competitionId = n.competitionid || "-1", e.eventId = 1 * (n.eventid || "0"), e.widgetEvs.guId = getGuid();
                    var r = gv.domains.sbkfeed + "/" + gv.lan + "/Service/OddsService?GetEventsByCompetitions",
                        i = {
                            guId: e.widgetEvs.guId,
                            Language: gv.lan,
                            SportId: e.sportId,
                            CompetitionIds: e.competitionId,
                            OddsType: uv.sessionD.oddsType,
                            TimeZoneUtcOffset: uv.geod.utcoffset
                        };
                    a.fetch("JSONP", r, i).then(function (n) {
                        e.widgetEvs.furture = n["further-evs"] || [], e.widgetEvs.targetEv = t("filter")(e.widgetEvs.furture[0].events, {
                            eventId: e.eventId
                        }, !0)[0] || {}
                    })
                }()
        }

        function t(e, t, n, a, r) {
            function i() {
                angular.isDefined(c) && (a.cancel(c), c = void 0)
            }

            function o(e) {
                if (t.widgetEvs.furture && 0 != t.widgetEvs.furture[0].events.length) {
                    var n = t.widgetEvs.furture[0].events.length < t.widgetEvs.targetIndex ? 0 : t.widgetEvs.targetIndex,
                        a = Math.min(t.widgetEvs.counter, t.widgetEvs.furture[0].events.length);
                    switch (e) {
                        case "prev":
                            n = n - 1 < 0 ? a - 1 : n - 1;
                            break;
                        case "next":
                            n = (n + 1) % a
                    }
                    $("#carousel-eurocup-match").carousel(n), t.widgetEvs.targetIndex = n, t.widgetEvs.counter = a, t.widgetEvs.targetEv = t.widgetEvs.furture[0].events[n], l(t.widgetEvs.targetEv)
                }
            }

            function s() {
                t.sportsId = t.sportsId || "", t.competitionIds = t.competitionIds || "-1", i(), t.widgetEvs.isLoading = !0;
                var e = gv.domains.sbkfeed + "/" + gv.lan + "/Service/OddsService?GetEventsByCompetitions",
                    l = {
                        guId: t.widgetEvs.guId,
                        Language: gv.lan,
                        SportId: t.sportsId,
                        CompetitionIds: t.competitionIds,
                        OddsType: uv.sessionD.oddsType,
                        TimeZoneUtcOffset: uv.geod.utcoffset
                    };
                r.fetch("JSONP", e, l).then(function (e) {
                    t.widgetEvs.inplay = e["inplay-evs"] || [], t.widgetEvs.furture = e["further-evs"] || [], t.widgetEvs.timer = (new Date).valueOf() + 9e4, angular.forEach(t.widgetEvs.furture[0].events || [], function (e) {
                        e.data.HomeShort = n("getTeamname")(e.data.HomeShort), e.data.AwayShort = n("getTeamname")(e.data.AwayShort)
                    }), o(), c = a(s, 9e4), t.widgetEvs.isLoading = !1
                }, function () {
                    t.widgetEvs.isLoading = !1
                })
            }

            function l(e) {
                var a = n("date")(e.eventDate, "MMdd", "+0:00") + e.data.HomeShort + e.data.AwayShort + ".html";
                t.contentPath = gv.domains.content + "/MB/" + gv.lan + "/2016-euro/headtohead/" + a
            }
            t.wgclient = {
                timezone: uv.geod.timezone,
                lan: gv.lan
            }, t.onInit = s, t.stopInterval = i, t.setContentPath = l, t.changeTargetEv = o, t.widgetEvs = {
                isLoading: !1,
                timer: 90,
                allevs: [],
                inplay: [],
                furture: [],
                counter: 3,
                targetIndex: 0,
                targetEv: null
            }, t.contentPath = "";
            var c;
            s()
        }

        function n(e, t, n, a, r) {
            function i() {
                t.sportsId = t.sportsId || "", t.competitionIds = t.competitionIds || "-1", angular.isDefined(o) && (a.cancel(o), o = void 0), t.widgetEvs.isLoading = !0;
                var e = gv.domains.sbkfeed + "/" + gv.lan + "/Service/OddsService?GetEventsByCompetitions",
                    s = {
                        guId: t.widgetEvs.guId,
                        Language: gv.lan,
                        SportId: t.sportsId,
                        CompetitionIds: t.competitionIds,
                        OddsType: uv.sessionD.oddsType,
                        TimeZoneUtcOffset: uv.geod.utcoffset
                    };
                r.fetch("JSONP", e, s).then(function (e) {
                    t.widgetEvs.inplay = e["inplay-evs"] || [], t.widgetEvs.furture = e["further-evs"] || [], t.widgetEvs.timer = (new Date).valueOf() + 9e4;
                    var r = t.widgetEvs.inplay.length > 0 ? t.widgetEvs.inplay[0].events : [],
                        s = t.widgetEvs.furture.length > 0 ? t.widgetEvs.furture[0].events : [];
                    r.push.apply(r, s), angular.forEach(r, function (e) {
                        e.data.HomeShort = n("getTeamname")(e.data.HomeShort), e.data.AwayShort = n("getTeamname")(e.data.AwayShort)
                    }), t.widgetEvs.allevs = r, o = a(i, 9e4), t.widgetEvs.isLoading = !1
                }, function () {
                    t.widgetEvs.isLoading = !1
                })
            }
            t.onInit = i, t.widgetEvs = {
                    isLoading: !1,
                    timer: 90,
                    allevs: [],
                    inplay: [],
                    furture: [],
                    activeTab: 0
                },
                function () {
                    var e = (new Date).valueOf();
                    e > 1465938000001 && (t.widgetEvs.activeTab = 1), e > 1466283600001 && (t.widgetEvs.activeTab = 2), e > 1466629200001 && (t.widgetEvs.activeTab = 3)
                }();
            var o;
            i()
        }
        angular.module("starApp").filter("getTeamname", function () {
            var e = {
                Albania: "ALB",
                France: "FRA",
                Romania: "ROU",
                Switzerland: "SUI",
                England: "ENG",
                Russia: "RUS",
                Slovakia: "SVK",
                Wales: "WAL",
                Germany: "GER",
                "Northern Ireland": "NIR",
                Poland: "POL",
                Ukraine: "UKR",
                Croatia: "CRO",
                "Czech Republic": "CZE",
                Spain: "ESP",
                Turkey: "TUR",
                Belgium: "BEL",
                "Republic Of Ireland": "IRL",
                Italy: "ITA",
                Sweden: "SWE",
                Austria: "AUT",
                Hungary: "HUN",
                Iceland: "ISL",
                Portugal: "POR"
            };
            return function (t) {
                return e[t] || e.France
            }
        }).controller("sportsEventCtrl", e).controller("sportsScheduleCtrl", n).controller("sportsUpcomingpanelCtrl", t).directive("sportsEventodds", [function () {
            return {
                restrict: "A",
                controller: "sportsEventCtrl"
            }
        }]).directive("sportsEurocupSchedule", [function () {
            return {
                restrict: "A",
                scope: {
                    sportsId: "@sportsOddsfeed",
                    competitionIds: "@competitionids"
                },
                controller: "sportsScheduleCtrl",
                templateUrl: "/cdn1101/resource/templates/widgets/sports-eurocup-schedule.wg.html"
            }
        }]).directive("eurocupGroupstage", ["$filter", function (e) {
            return {
                restrict: "A",
                scope: {
                    seasonid: "@eurocupGroupstage"
                },
                templateUrl: "/cdn1101/resource/templates/widgets/eurocup-groupstage.tpl.html",
                link: function (t, n, a, r) {
                    function i() {
                        for (var n = [], a = new Date(e("date")(t.matchfrom, "MM/dd/yyyy UTC" + uv.geod.timezone)).valueOf(); a < t.matchto;) {
                            var r = {
                                eventDate: a,
                                matches: []
                            };
                            r.matches = e("filter")(o, function (e) {
                                return 1 * e.fv2 >= a && 1 * e.fv2 < a + 864e5
                            }, !0), n.push(r), a += 864e5
                        }
                        t.schduleMatchesBydate = n
                    }
                    t.matchfrom = 1 * (a.matchfrom || 0), t.matchto = 1 * (a.matchto || 0), t.wgclient = {
                        timezone: uv.geod.timezone,
                        lan: gv.lan
                    };
                    var o = e("filter")(gv.generals.sports.feeds.Schedule, function (e) {
                        return e.fv0 == t.seasonid && 1 * e.fv2 >= t.matchfrom && 1 * e.fv2 < t.matchto
                    }, !0);
                    t.schduleMatchesBydate = [], t.parentWidgetEvs = t.$parent.widgetEvs, t.$watch("parentWidgetEvs", function (n) {
                        0 != t.parentWidgetEvs.allevs.length ? function (t) {
                            angular.forEach(o, function (n) {
                                var a = e("filter")(t, function (e) {
                                    return e.eventDate == 1 * n.fv2 && (e.data.HomeShort == n.fv3 || e.data.HomeShort == n.fv4)
                                });
                                n.evOdds = a.length > 0 ? a[0] : {}, n.needSwitch = a.length > 0 && a[0].data.HomeShort != n.fv3, n.isInplay = 1 * n.fv2 < (new Date).valueOf(), n.isInplay && a.length > 0 && (n.boxscore.home = {
                                    fv4: n.evOdds.data.HomeScore || "0"
                                }, n.boxscore.away = {
                                    fv4: n.evOdds.data.AwayScore || "0"
                                })
                            }), i()
                        }(t.parentWidgetEvs.allevs) : i()
                    }, !0)
                }
            }
        }]).directive("eurocupPlayoff", ["$filter", function (e) {
            return {
                restrict: "A",
                scope: {
                    seasonid: "@eurocupPlayoff",
                    matchfrom: "@matchfrom",
                    matchto: "@matchto"
                },
                templateUrl: "/cdn1101/resource/templates/widgets/eurocup-playoff.tpl.html",
                link: function (t) {
                    t.wgclient = {
                        timezone: uv.geod.timezone,
                        lan: gv.lan
                    }, t.matchfrom = 1 * t.matchfrom, t.matchto = 1 * t.matchto, t.playoffmatches = e("filter")(gv.generals.sports.feeds.Schedule, function (e) {
                        return e.fv0 == t.seasonid && 1 * e.fv2 >= t.matchfrom && 1 * e.fv2 < t.matchto
                    }, !0), t.parentWidgetEvs = t.$parent.widgetEvs, t.$watch("parentWidgetEvs", function (n) {
                        0 != t.parentWidgetEvs.allevs.length && function (n) {
                            angular.forEach(t.playoffmatches, function (t) {
                                var a = e("filter")(n, function (e) {
                                    return e.eventDate == 1 * t.fv2
                                });
                                t.evOdds = a.length > 0 ? a[0] : {}, t.needSwitch = a.length > 0 && a[0].data.HomeShort != t.fv3, t.isInplay = 1 * t.fv2 < (new Date).valueOf(), t.isInplay && a.length > 0 && (t.boxscore.home = {
                                    fv4: t.evOdds.data.HomeScore || "0"
                                }, t.boxscore.away = {
                                    fv4: t.evOdds.data.AwayScore || "0"
                                })
                            })
                        }(t.parentWidgetEvs.allevs)
                    }, !0)
                }
            }
        }]).directive("sportsStanding", ["$filter", function (e) {
            return {
                restrict: "A",
                scope: {
                    seasonid: "@sportsStanding"
                },
                templateUrl: "/cdn1101/resource/templates/widgets/sports-standing.wg.html",
                link: function (t, n, a, r) {
                    t.wgclient = {
                        timezone: uv.geod.timezone,
                        lan: gv.lan
                    }, t.teamStanding = e("filter")(gv.generals.sports.feeds.Standing, {
                        fv0: t.seasonid
                    }, !0), angular.forEach(t.teamStanding, function (e) {
                        e.fv4 = "" != e.fv4 ? 1 * e.fv4 : 0, e.fv5 = "" != e.fv5 ? 1 * e.fv5 : 0, e.fv6 = "" != e.fv6 ? 1 * e.fv6 : 0, e.fv7 = "" != e.fv7 ? 1 * e.fv7 : 0, e.fv8 = "" != e.fv8 ? 1 * e.fv8 : 0, e.played = 1 * e.fv5 + 1 * e.fv6 + 1 * e.fv7
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
                templateUrl: "/cdn1101/resource/templates/widgets/sports-upcomingpanel.wg.html"
            }
        }]), e.$inject = ["$scope", "$filter", "$attrs", "dataService"], n.$inject = ["$rootScope", "$scope", "$filter", "$interval", "dataService"], t.$inject = ["$rootScope", "$scope", "$filter", "$interval", "dataService"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r, i, o, s) {
            e.guId = getGuid(), e.onInit = function () {
                var t = {
                    lan: gv.lan,
                    guId: e.guId
                };
                o.fetch("POST", "/service/virtualApi/getgames", t).then(function (t) {
                    e.virtualtList = n("orderBy")(t, "priority", !1), e.activeUniqueKey = e.virtualtList[0].uniqueKey, e.frameSrc = s.trustAsResourceUrl("/" + gv.lan + "/virtual/lobby?gameName=" + e.virtualtList[0].uniqueKey)
                })
            }, e.virtualtList = [], e.getVirtualGameSrc = function (t) {
                e.activeUniqueKey = t, e.frameSrc = s.trustAsResourceUrl("/" + gv.lan + "/virtual/lobby?gameName=" + t)
            }, e.activeUniqueKey = ""
        }
        angular.module("starApp").controller("virtualLobbyCtrl", e).directive("virtualLobby", [function () {
            return {
                templateUrl: "/cdn1101/resource/templates/widgets/virtual-lobby.wg.html",
                controller: "virtualLobbyCtrl",
                restrict: "A"
            }
        }]), e.$inject = ["$scope", "$rootScope", "$filter", "$q", "$cookies", "$translate", "dataService", "$sce"]
    }()
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(n, a, r, i, o) {
            function s() {
                if (m.cookieNotify) {
                    var e = -1 !== location.pathname.indexOf("/sign-up");
                    if (!m.idle || e) {
                        var r = location.href;
                        if (!(["forbidden", "page-not-found", "error"].filter(function (e) {
                                return -1 !== r.indexOf(e)
                            }).length > 0)) {
                            var i = 0,
                                o = setInterval(function () {
                                    ++i >= 60 && (function () {
                                        a.idleUrl = gv.domains.content + "/idle/" + gv.lan + "/index.html" + radomVersionNo();
                                        var t = {
                                            templateUrl: e ? "/cdn1101/resource/templates/modal/idle.register.tpl.html" : "/cdn1101/resource/templates/modal/idle.tpl.html",
                                            controller: "modalInstanceCtrl",
                                            animation: !0,
                                            backdrop: !1,
                                            size: e ? "sm" : "",
                                            windowClass: "modal-align-bottom-right idle-open"
                                        };
                                        n.dialog(a, t)
                                    }(), clearInterval(o), u("idle"))
                                }, 1e3);
                            t(document).on("mousemove keypress", function () {
                                i = 0
                            })
                        }
                    }
                }
            }

            function l(e) {
                var t = [];
                e.forEach(function (e) {
                    t.push(n.fetch("GET", e.domain + "/google5dba05b2e477d3e4.html", null, 3, !1))
                });
                var a = o.defer();
                return Q.allSettled(t).then(function (t) {
                    t.forEach(function (t, n) {
                        var a = "fulfilled" === t.state && "google-site-verification: google5dba05b2e477d3e4.html" == t.value;
                        e[n].domain = e[n].domain.replace("//", ""), e[n].isSucess = a, e[n].remark = a ? "fulfilled" : "rejected"
                    }), a.resolve(e)
                }), a.promise
            }

            function c() {
                if (!m.lowBalance) {
                    var e = uv.sessionD.balance <= gv.lowBalance[uv.geod.cc];
                    if (1 === uv.sessionD.mberType && e) {
                        var t = {
                            templateUrl: "/cdn1101/resource/templates/modal/lowBalance.tpl.html",
                            controller: "modalInstanceCtrl",
                            animation: !0,
                            size: "sm",
                            windowClass: "modal-align-mid"
                        };
                        n.dialog(null, t)
                    }
                    u("lowBalance")
                }
            }

            function u(e) {
                m[e] = !0, r.putObject(d, m, {
                    path: "/",
                    expires: (new Date).addDays(30)
                })
            }
            var d = "check",
                m = function () {
                    var e = r.getObject(d);
                    return angular.isDefined(e) ? e : {}
                }(),
                g = Boolean(e.opener);
            return {
                init: function () {
                    ! function () {
                        try {
                            return e.self !== e.top
                        } catch (e) {
                            return !0
                        }
                    }() ? (e.location.search.indexOf("dialog") > -1 && (o.all({
                        title: i("txtComAlert"),
                        content: i("txtProductUnavailable")
                    }).then(function (e) {
                        a.msg = {
                            title: e.title,
                            content: e.content
                        }, n.dialog(a)
                    }), history.pushState(null, null, "/" + uv.sessionD.lans[0].value)), uv.sessionD.login ? (function () {
                        if (uv.sessionD.landinged) {
                            var e, t, r = JSON.parse(localStorage.getItem("recommendDomain")),
                                i = !0;
                            if (r && (i = r.isShowRecDomains, t = r.aId == uv.sessionD.aId, e = r.recDomains), (!r || r && !t) && (e = uv.sessionD.recdomain), !i || !e || 0 == e.length) return c();
                            l(e).then(function (e) {
                                var t = e.filter(function (e) {
                                    return 1 == e.isSucess
                                });
                                if (0 != t.length) {
                                    var r = o.defer(),
                                        i = {
                                            templateUrl: "/cdn1101/resource/templates/modal/user/recommendedDomain.tpl.html",
                                            controller: "modalInstanceCtrl",
                                            animation: !0,
                                            size: "sm",
                                            windowClass: "modal-align-mid"
                                        };
                                    return a.recDomain = t, n.dialog(a, i).result.then(function () {
                                        r.resolve()
                                    }).finally(function () {
                                        r.resolve();
                                        var t = {
                                            isShowRecDomains: !0,
                                            aid: uv.sessionD.aId,
                                            recDomains: e
                                        };
                                        localStorage.setItem("recommendDomain", JSON.stringify(t)), uv.sessionD.landinged = !1, c()
                                    }), r.promise
                                }
                            })
                        }
                    }(), m.inboxReminder || a.$on("getMsgCounter", function () {
                        var e = a.msgCounter.inbox,
                            t = a.msgCounter.notifi,
                            r = a.msgCounter.inbox > 0,
                            o = a.msgCounter.notifi > 0;
                        o && r ? i("msgInboxHasMailAndNotify").then(function (a) {
                            n.mi({
                                body: a.format(e, t)
                            })
                        }) : r ? i("msgInboxHasMail").then(function (t) {
                            n.mi({
                                body: t.format(e)
                            })
                        }) : o && i("msgInboxHasNotification").then(function (e) {
                            n.mi({
                                body: e.format(t)
                            })
                        }), u("inboxReminder")
                    }), "UK" === uv.pd.r && function () {
                        function t() {
                            function t(e) {
                                var t = {
                                    title: "RealityCheckRespond",
                                    newValue: e,
                                    remarks: location.href,
                                    isCreate: !0
                                };
                                n.fetch("POST", "/service/userapi/createMemberAuditLog", t)
                            }
                            l = !0, a.$broadcast("realityCheck.show"), a.msg = {
                                title: i.instant("txtComAlert"),
                                content: i.instant("msgResGamingRemindEndSession").format(o)
                            };
                            n.dialog(a, {
                                size: "sm",
                                templateUrl: "/cdn1101/resource/templates/modal/realityCheck.tpl.html",
                                controller: "modalInstanceCtrl",
                                backdrop: "static"
                            }).result.then(function () {
                                t("Yes"), g && e.close(), location.href = "/"
                            }, function () {
                                a.$broadcast("realityCheck.no"), t("No")
                            }).finally(function () {
                                l = !1
                            })
                        }
                        var r = 0,
                            o = (setInterval(function () {
                                ++r % s != 0 || l || t()
                            }, 1e3), uv.sessionD.remindDuration),
                            s = 60 * o * 60,
                            l = !1
                    }()) : (s(), m.cookieNotify || n.dialog(a, {
                        templateUrl: "/cdn1101/resource/templates/modal/idle.cookie.tpl.html",
                        controller: "modalInstanceCtrl",
                        animation: !0,
                        backdrop: !1,
                        size: "sm",
                        appendTo: ".modal-parent",
                        windowClass: "modal-align-bottom-right"
                    }).result.then(function () {
                        u("cookieNotify"), s()
                    }))) : t("body").addClass("inIframe")
                },
                initLoginCheck: function () {
                    m.lowBalance = m.inboxReminder = !1, r.putObject(d, m, {
                        path: "/"
                    }), localStorage.removeItem("recommendDomain")
                },
                checkAvailableDomain: l
            }
        }
        angular.module("starApp").factory("checkService", n).directive("checkServiceDirective", ["checkService", function (e) {
            return {
                restrict: "A",
                link: function (t, n, a) {
                    e.init()
                }
            }
        }]), n.$inject = ["dataService", "$rootScope", "$cookies", "$translate", "$q"]
    }(window, $)
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t) {
            var t = t || "",
                n = $("#sso_form");
            n.prop("action", t + "/postlogin"), n.find("[name=passport]").val(e.passport), n.find("[name=postpage]").val(location.pathname + location.search), n.find("[name=timezone]").val(uv.geod.timezone), document.getElementById("sso_form").submit()
        }

        function t(t, n, a, r, i, o, s, c) {
            n.loginform = {
                username: "",
                password: "",
                isFoucs: !1
            }, n.showBalance = !0, n.onInit = function () {
                n.paymentMaintenance.pch = r("filter")(gv.modules, function (e) {
                    return 103 == e.id && 0 != e.status
                }, !0).length > 0, n.paymentMaintenance.transfer = r("filter")(gv.modules, function (e) {
                    return 102 == e.id && 0 != e.status
                }, !0).length > 0, n.paymentUrl.deposit = n.paymentMaintenance.pch ? "#" : "/" + gv.lan + "/my-account/banking/deposit", n.paymentUrl.withdrawal = n.paymentMaintenance.pch ? "#" : "/" + gv.lan + "/my-account/banking/withdrawal", n.paymentUrl.transfer = n.paymentMaintenance.transfer ? "#" : "/" + gv.lan + "/my-account/banking/transfer"
            }, n.submitLogin = function () {
                n.loginform.guId = getGuid();
                var t = {
                    BlackBox: getBlackbox(),
                    Ud: n.loginform.username,
                    Pd: n.loginform.password,
                    guId: n.loginform.guId
                };
                o.fetch("POST", "/service/userapi/login", t).then(function (t) {
                    switch (t.returnCode) {
                        case "0001":
                            e(t);
                            break;
                        case "0000":
                            s.initLoginCheck();
                            var i = {
                                isShowRecDomains: !1,
                                aid: "",
                                recDomains: []
                            };
                            s.checkAvailableDomain(t.recDomain).then(function (n) {
                                var a = r("filter")(n, {
                                        isSucess: !0
                                    }),
                                    s = r("filter")(a, {
                                        domain: location.hostname
                                    }).length > 0 || 0 == a.length ? "" : "//" + a[0].domain,
                                    l = {
                                        failList: r("filter")(n, {
                                            isSucess: !1
                                        }),
                                        orginalDomain: location.hostname,
                                        loginDomain: s || location.hostname
                                    };
                                o.fetch("POST", "/service/userapi/adddomainsreport", l), s || (i.isShowRecDomains = !1, i.recDomains = n, localStorage.setItem("recommendDomain", JSON.stringify(i))), e(t, s)
                            });
                            break;
                        case "0005":
                            n.msg = {
                                title: a.instant("txtBtnLogin"),
                                content: a.instant("msgLoginError" + t.returnCode)
                            };
                            var c = {
                                    templateUrl: "/cdn1101/resource/templates/modal/user/loginWithCaptcha.html",
                                    controller: "userModalCaptchaLoginCtrl"
                                },
                                u = o.dialog(n, c);
                            u.rendered.then(function () {
                                l()
                            }), u.result.then(function (e) {
                                n.msg = {
                                    title: a.instant("txtBtnLogin"),
                                    content: a.instant("msgLoginError" + e)
                                }, o.dialog(n)
                            });
                            break;
                        default:
                            n.msg = {
                                title: a.instant("txtBtnLogin"),
                                content: a.instant("msgLoginError" + t.returnCode)
                            }, o.dialog(n)
                    }
                })
            }, n.submitLogOut = c.logOut, n.getBalance = c.refreshBalance, n.toggleBalance = function () {
                uv.pd.sb = !uv.pd.sb, i.putObject("prefer", uv.pd, {
                    path: "/",
                    expires: (new Date).addDays(30)
                })
            }, n.userAssistance = function (e) {
                var t = {};
                switch (e) {
                    case "forgotpassword":
                        t = {
                            templateUrl: "/cdn1101/resource/templates/modal/user/forgotpassword.html",
                            controller: "userModal4gotPassCtrl"
                        };
                        break;
                    case "forgotusername":
                        t = {
                            templateUrl: "/cdn1101/resource/templates/modal/user/forgotusername.html",
                            controller: "userModal4gotUnCtrl"
                        }
                }
                var a = o.dialog(n, t);
                a.rendered.then(function () {
                    l()
                }), a.result.then(function (e) {
                    n.msg = e, o.dialog(n)
                })
            }, n.paymentMaintenance = {
                pch: !1,
                transfer: !1
            }, n.paymentUrl = {
                deposit: "",
                withdrawal: "",
                transfer: ""
            }
        }

        function n(t, n, a, r) {
            t.errorCode = "", t.submit = function () {
                var a = {
                    Ud: t.formData.username,
                    Pd: t.formData.password,
                    CaptchaText: t.formData.captcha
                };
                r.fetch("POST", "/service/userapi/loginCaptcha", a).then(function (a) {
                    switch (a.returnCode) {
                        case "0000":
                        case "0001":
                            e(a);
                            break;
                        case "0011":
                            n.close("0011");
                            break;
                        default:
                            l(), t.errorCode = a.returnCode
                    }
                })
            }, t.close = function () {
                n.dismiss("cancel")
            }, t.refreshCaptcha = l, t.refreshCaptcha(), t.formData = {
                username: "",
                password: "",
                captcha: ""
            }
        }

        function a(e, t, n, a) {
            e.close = function () {
                t.dismiss("cancel")
            }, e.submit = function () {
                e.formData.guId = getGuid();
                var r = {
                    OldPassword: e.formData.currentPass,
                    NewPassword: e.formData.newPassword,
                    NewPasswordConfirm: e.formData.confirmPassword,
                    CaptchaText: e.formData.captcha,
                    guId: e.formData.guId
                };
                a.fetch("POST", "/service/userapi/changepassword", r).then(function (a) {
                    switch (a) {
                        case 0:
                            e.msg = {
                                title: n.instant("txtProfileChangePassword"),
                                content: n.instant("msgSecureChangePassSuccess")
                            }, t.close(e.msg);
                            break;
                        default:
                            l(), e.errorCode = a
                    }
                })
            }, e.errorCode = "", e.pattern = {
                userId: new RegExp("^([0-9]|[a-zA-Z]){5,16}$"),
                password: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$")
            }, e.refreshCaptcha = l, e.formData = {
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

        function r(e, t, n, a) {
            e.close = function () {
                t.dismiss("cancel")
            }, e.submit = function () {
                e.formData.guId = getGuid();
                var r = {
                    Email: e.formData.email,
                    CaptchaText: e.formData.captcha,
                    guId: e.formData.guId
                };
                a.fetch("POST", "/service/userapi/forgotUsername", r).then(function (a) {
                    switch (a) {
                        case 0:
                            e.msg = {
                                title: n.instant("txtSecureForgotUserName"),
                                content: n.instant("msgSecureGetUserSuccess")
                            }, t.close(e.msg);
                            break;
                        default:
                            l(), e.errorCode = a
                    }
                })
            }, e.errorCode = "", e.refreshCaptcha = l, e.formData = {
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

        function i(e, t, n, a) {
            e.close = function () {
                t.dismiss("cancel")
            }, e.errorCode = 0, e.verifyEmail = function () {
                if (e.formData.email) {
                    var t = {
                        Email: e.formData.email
                    };
                    a.fetch("POST", "/service/userapi/verifyrequiredemail", t).then(function (t) {
                        switch (e.errorCode = 0, t.returnCode) {
                            case 0:
                                e.formData.secQuestion = t.SecureQuestion;
                                break;
                            default:
                                l(), e.errorCode = t.returnCode
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
                a.fetch("POST", "/service/userapi/verifyrequiredfields", r).then(function (r) {
                    switch (r) {
                        case 0:
                            e.msg = {
                                title: n.instant("txtSecureForgotPassword"),
                                content: n.instant("msgSecureResetPass")
                            }, t.close(e.msg);
                            break;
                        case 99999:
                            e.msg = {
                                title: n.instant("txtCommonHelp"),
                                content: n.instant("msgCommonSystemError")
                            }, a.dialog(e);
                            break;
                        default:
                            l(), e.errorCode = r
                    }
                })
            }, e.refreshCaptcha = l, e.formSetp = 1, e.formData = {
                email: "",
                secQuestion: "",
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

        function o(e, t) {
            function n() {
                e.guId = getGuid();
                var n = {
                    languageCode: gv.lan,
                    guId: e.guId
                };
                t.fetch("GET", "/service/userApi/getProfileVerificationDetail", n).then(function (t) {
                    t && (e.profileDocs = t, angular.forEach(e.profileDocs, function (e) {
                        var t = e.expiryDate - (new Date).valueOf();
                        e.expired = t < 0 ? 2 : t < a ? 1 : 0, e.expiredFlag = 0 == e.expiryDate ? 0 : e.expired
                    }))
                })
            }
            e.profileDocs = [], e.OnInit = n, e.guId = "", e.existFiles = [], e.openUploadPanel = function (a) {
                e.uploadDocType = a.docType, e.docIdentifier = a.docTypeName, e.docSubmissionID = a.docSubmissionID, t.dialog(e, {
                    size: "fileupload",
                    templateUrl: "/cdn1101/resource/templates/modal/fileupload.tpl.html",
                    controller: "userFilesUploadCtrl"
                }).result.then(function (a) {
                    n(), e.msg = a, t.dialog(e)
                })
            }, e.disableOpenUploadPanelButton = function (e) {
                return "Accepted" != e.docStatusName && !e.allowUpload || "Accepted" == e.docStatusName && 0 == e.expiredFlag
            };
            var a = 5184e6
        }

        function s(e, t, n, a, r) {
            function i() {
                var t = e.formData.files.length,
                    n = 0;
                return e.existFiles && (n = r("filter")(e.existFiles, function (e) {
                    return !e.deleted
                }).length), n + t
            }

            function o(e) {
                return unescape(encodeURIComponent(e))
            }
            e.hasError = !1, e.formData = {
                    guId: null,
                    docType: e.uploadDocType,
                    comment: "",
                    files: [],
                    isInvalid: !1
                }, e.sizeLimit = 4194304, e.maxSizeMsg = "4MB", e.validfiles = function (t) {
                    angular.forEach(t, function (t) {
                        var n = new FileReader;
                        n.onload = function (a) {
                            e.$apply(function () {
                                var a = t.size > e.sizeLimit ? "sizing" : /\.(jpeg|jpg|exif|tiff|gif|bmp|png|pdf)$/i.test(t.name) ? "valid" : "extension",
                                    r = {
                                        fileBody: n.result,
                                        fileName: t.name,
                                        size: t.size,
                                        error: a
                                    };
                                e.formData.files.push(r), e.formData.isInvalid = e.formData.isInvalid || "valid" != r.error
                            })
                        }, n.readAsDataURL(t.file)
                    })
                }, e.close = function () {
                    t.dismiss("cancel")
                }, e.confirm = function () {
                    e.formData.aId = uv.sessionD.aId, e.formData.token = uv.sessionD.ssid, e.formData.guId = getGuid(), e.formData.docSubmissionID = e.docSubmissionID, e.formData.files && (e.formData.files = r("filter")(e.formData.files, function (t) {
                        return t.size <= e.sizeLimit
                    })), e.existFiles && (e.formData.deleteFilenames = r("filter")(e.existFiles, function (e) {
                        return e.deleted
                    }).map(function (e) {
                        return e.filename
                    })), n.fetch("POST", gv.domains.rtmsul + "/service/fileapi/uploadfiles", e.formData, 300).then(function (n) {
                        switch (n) {
                            case 0:
                                e.hasError = !1, e.msg = {
                                    title: a.instant("txtKycUploadDoc") + ': <span class="file-name">(' + e.docIdentifier + ")</span>",
                                    content: a.instant("msgKycUploadSuccess")
                                }, t.close(e.msg);
                                break;
                            default:
                                e.hasError = !0
                        }
                    })
                }, e.removeFile = function (t, n) {
                    var a = e.formData.files.indexOf(t); - 1 != a && (e.formData.files.splice(a, 1), n.removeFile(n.files.find(function (e) {
                        return e.name == t.fileName && e.size == t.size
                    }))), e.formData.isInvalid = r("filter")(e.formData.files, {
                        error: "!valid"
                    }, !0).length > 0
                }, e.deleteFile = function (e) {
                    e.deleted = !0
                }, e.disableSubmitButton = function () {
                    return 0 == e.formData.files.length && (!e.existFiles || 0 == r("filter")(e.existFiles, function (e) {
                        return e.deleted
                    }).length) || i() > e.verifyFileLimit || e.formData.isInvalid
                }, e.verifyFileLimit = 5, e.numberOfFileForVerify = i, e.commentLimit = function () {
                    if (e.formData.comment) {
                        var t = e.formData.comment;
                        e.formData.comment = function (e, t) {
                            if (o(e).length <= 200) return e;
                            for (var n = "", a = 0, r = 0; r < 0; a++) r += e.charCodeAt(a) < 128 ? 1 : o(e[a]).length;
                            for (var i = a + 200, s = a; a <= i; s++) i -= e.charCodeAt(s) < 128 ? 1 : o(e[s]).length, n += e[s];
                            return n
                        }(t)
                    }
                },
                function () {
                    if (e.docSubmissionID) {
                        var t = {
                            docSubmissionID: e.docSubmissionID
                        };
                        n.fetch("POST", "/service/userapi/GetVerifictionFiles", t).then(function (t) {
                            e.existFiles = t.map(function (e) {
                                return e.deleted = !1, e
                            })
                        })
                    }
                }()
        }

        function l() {
            event && (event.stopPropagation(), event.preventDefault());
            var e = $("#captchaImg");
            $("#captchaText").val("");
            var t = e.attr("src");
            e.attr("src", t + "?" + (new Date).valueOf()).text("")
        }

        function c(e, t) {
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
        angular.module("starApp").controller("userPanelCtrl", t).controller("userModal4gotUnCtrl", r).controller("userModal4gotPassCtrl", i).controller("userModalCaptchaLoginCtrl", n).controller("userModalChangePassCtrl", a).controller("profileVerificationCtrl", o).controller("userFilesUploadCtrl", s).factory("userService", c).directive("profileVerification", [function () {
            return {
                restrict: "A",
                controller: "profileVerificationCtrl",
                templateUrl: "/cdn1101/resource/templates/myaccount/profile-verification.tpl.html?v=" + gv.rv
            }
        }]), t.$inject = ["$rootScope", "$scope", "$translate", "$filter", "$cookies", "dataService", "checkService", "userService"], r.$inject = ["$scope", "$uibModalInstance", "$translate", "dataService"], i.$inject = ["$scope", "$uibModalInstance", "$translate", "dataService"], n.$inject = ["$scope", "$uibModalInstance", "$translate", "dataService"], a.$inject = ["$scope", "$uibModalInstance", "$translate", "dataService"], s.$inject = ["$scope", "$uibModalInstance", "dataService", "$translate", "$filter"], o.$inject = ["$scope", "dataService"], c.$inject = ["$rootScope", "dataService"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, a, r, i, o) {
            function s(n) {
                var r = gv.regs.filter(function (e) {
                    return e.code == uv.pd.r
                })[0];
                n = n || (r.hasDefCountry ? {
                    Code: uv.pd.c
                } : {
                    Code: uv.geod.country
                }), t.all({
                    form: i.fetch("GET", "/service/registerApi/getRegisterform", {
                        countryCode: n.Code
                    }),
                    preference: i.fetch("GET", "/service/registerApi/getCountryPreference", {
                        countryCode: n.Code,
                        LanguageCode: gv.lan
                    }),
                    options: i.fetch("GET", "/service/registerApi/getRegisterOptions", {
                        LanguageCode: gv.lan,
                        regionCode: uv.pd.r
                    })
                }).then(function (t) {
                    e.options = t.options, e.preference = t.preference, e.registerForm = JSON.parse(t.form), e.required = {
                            MiddleName: null === e.registerForm.MiddleName,
                            FamilyName: null === e.registerForm.FamilyName,
                            BuildingName: null === e.registerForm.BuildingName
                        }, e.registerForm.LangCode = gv.lan, e.registerForm.MobileNo = "", e.registerForm.HomeNo = "", e.registerForm.EmailUpdate = !0, e.registerForm.CountryName = "", a("filter")(t.options.countries, {
                            Name: e.preference.countryName
                        }).length > 0 && (e.registerForm.CountryName = e.preference.countryName), e.registerForm.NationalityName = e.preference.countryName, e.registerForm.PlaceOfBirthName = e.preference.countryName,
                        function (t) {
                            var n = a("filter")(e.options.countrieslegalage, {
                                Id: t
                            }, !0) || "";
                            e.legalAge = 18, n.length > 0 && (e.legalAge = n[0].Name), e.dateoptions = {
                                date: [31],
                                month: [12],
                                year: [c - 90, c - e.legalAge]
                            }
                        }(n.Id);
                    var r = a("filter")(e.options.phoneExt, function (t) {
                        return t.Id == e.preference.phoneExt
                    }, !0).length > 0;
                    e.registerForm.MobileExt = r ? e.preference.phoneExt : "-", e.registerForm.HomeExt = r ? e.preference.phoneExt : "-", e.registerForm.CurrencyCode = e.preference.defcurrency, e.registerForm.TimeZone = uv.geod.timezone, e.options.currencies = a("filter")(e.options.currencies, function (n) {
                        return void 0 !== t.options && -1 != e.preference.currencies.indexOf(n.Code)
                    })
                })
            }

            function l(e) {
                return e && "" != e ? e + "," : ""
            }
            var c = (new Date).getFullYear();
            e.options = {}, e.required = {
                MiddleName: !1,
                FamilyName: !1
            }, e.dateoptions = {
                date: [31],
                month: [12],
                year: [c - 90, c - 18]
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
            }, e.onInit = s, e.refreshCaptcha = n, e.submitForm = function () {
                e.registerForm.BlackBox = getBlackbox(), e.registerForm.BirthDate = e.birth.date + "/" + e.birth.month + "/" + e.birth.year, e.registerForm.guId = getGuid(), i.fetch("POST", "/service/registerApi/submitRegistration", e.registerForm, 90).then(function (t) {
                    switch (t.returnCode) {
                        case "0000":
                            o.initLoginCheck();
                            var a = $("#sso_form");
                            a.prop("action", "/postlogin"), a.find("[name=passport]").val(t.passport), a.find("[name=postpage]").val("/" + gv.lan + "/sign-up-success"), a.find("[name=timezone]").val(uv.geod.timezone), document.getElementById("sso_form").submit();
                            break;
                        default:
                            n(), e.errorCode = t.returnCode, e.errorList = t.errorList, -1 != e.errorList.indexOf("0004") ? e.wizard.stepIndex = 2 : -1 != e.errorList.indexOf("0003") ? e.wizard.stepIndex = 3 : (e.msg = {
                                title: r.instant("txtJoinUsSignUp"),
                                content: r.instant("msgCommonSystemError")
                            }, i.dialog(e))
                    }
                }, function (t) {
                    e.msg = {
                        title: r.instant("txtJoinUsSignUp"),
                        content: r.instant("msgCommonSystemError")
                    }, i.dialog(e)
                })
            }, e.getAddressInfo = function () {
                e.addressForm.guId = getGuid(), i.fetch("GET", "/service/registerApi/getAddressInfos", {
                    postCode: e.registerForm.PostalCode,
                    guId: e.addressForm.guId
                }).then(function (t) {
                    var n = {},
                        a = "Success" == t.result && "" !== t.rtn[0].ZipPostcode;
                    switch (a) {
                        case !0:
                            angular.forEach(t.rtn, function (e) {
                                var t = l(e.Premise) + l(e.Building) + l(e.Street) + l(e.City) + l(e.ZipPostcode);
                                e.label = t.substring(0, t.length - 1)
                            }), e.addressForm = {
                                selectedOpt: t.rtn[0],
                                infomations: t.rtn
                            }, n = {
                                templateUrl: "/cdn1101/resource/templates/modal/user/addressInfos.html",
                                controller: "id3ModalAddressCtrl"
                            };
                            break;
                        default:
                            var o = "Success" == t.result ? "msgJoinUsPostalCodeUK" : "msgJoinUsUKServiceUnavailable";
                            e.msg = {
                                title: r.instant("txtJoinUsSignUp"),
                                content: r.instant(o)
                            }
                    }
                    i.dialog(e, a ? n : null).result.then(function (t) {
                        t && (e.addressForm.selectedOpt = t, e.registerForm.BuildingName = t.Premise, e.registerForm.BuildingNumber = t.Building, e.registerForm.Street = t.Street, e.registerForm.City = t.City, e.registerForm.PostalCode = t.ZipPostcode)
                    })
                })
            }, e.$watch("registerForm.UserId", function (t) {
                t && e.accountForm.userId.$valid && (e.verifyForm.guId = getGuid(), i.fetch("POST", "/service/registerApi/verifyLoginId", {
                    loginId: t,
                    guId: e.verifyForm.guId
                }).then(function (t) {
                    e.verifyForm.userId = t
                }))
            }), e.$watch("registerForm.Email", function (t) {
                t && e.contactForm.email.$valid && (e.verifyForm.guId = getGuid(), i.fetch("POST", "/service/registerApi/verifyEmail", {
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
                    return !!e.options.countries && (e.registerForm.CountryName && a("filter")(e.options.countries, {
                        Name: e.registerForm.CountryName
                    }, !0).length > 0)
                },
                propsValidate: function (t, n) {
                    var r = !0;
                    if (!t || !n || !t[n]) return !0;
                    switch (n) {
                        case "salutation":
                            if (!t.$dirty) return !1;
                            r = -1 != e.registerForm.GenderId;
                            break;
                        case "middleName":
                            r = t[n].$valid;
                            break;
                        case "firstName":
                        case "lastName":
                            if (!t[n].$dirty) return !1;
                            r = t[n].$valid;
                            break;
                        case "nationality":
                            if (!e.options.nationalities || !e.registerForm.NationalityName) return !1;
                            r = a("filter")(e.options.nationalities, {
                                Name: e.registerForm.NationalityName
                            }, !0).length > 0;
                            break;
                        case "placeofbirth":
                            if (!e.options.nationalities || !e.registerForm.PlaceOfBirthName) return !1;
                            r = a("filter")(e.options.nationalities, {
                                Name: e.registerForm.PlaceOfBirthName
                            }, !0).length > 0;
                            break;
                        case "dateofbirth":
                            if (!t[n].$dirty) return !1;
                            if (!isValidDate(e.birth.year + "-" + e.birth.month + "-" + e.birth.date)) return !1;
                            var i = new Date(e.birth.year, e.birth.month - 1, e.birth.date).getAges();
                            r = "-1" !== e.birth.date && "-1" !== e.birth.month && "-1" !== e.birth.year && i >= e.legalAge
                    }
                    return r
                }
            }, e.wizardStep2 = {
                validate: function (t) {
                    return !(!t.$dirty && t.$invalid || !e.wizardStep2.propsValidate(t, "address") || !e.wizardStep2.propsValidate(t, "postalCode") || !e.wizardStep2.propsValidate(t, "city") || !e.wizardStep2.propsValidate(t, "email") || !e.wizardStep2.propsValidate(t, "confirmEmail") || !e.wizardStep2.propsValidate(t, "mobileNo") && !e.wizardStep2.propsValidate(t, "homeNo") || !e.wizardStep2.propsValidate(t, "buildingName") || !e.wizardStep2.propsValidate(t, "buildingNumber") || !e.wizardStep2.propsValidate(t, "street") || !e.wizardStep2.propsValidate(t, "region"))
                },
                propsValidate: function (t, n) {
                    var a = !0;
                    if (!t || !n || !t[n]) return !0;
                    if (!t.$dirty) return !1;
                    switch (n) {
                        case "address":
                        case "postalCode":
                            if (!t[n].$dirty) return !1;
                            a = t[n].$valid;
                            break;
                        case "city":
                        case "buildingNumber":
                        case "street":
                            if (!t[n].$dirty && !e.addressForm.selectedOpt) return !1;
                            a = t[n].$valid;
                            break;
                        case "buildingName":
                        case "region":
                            a = t[n].$valid;
                            break;
                        case "email":
                            if (!t[n].$dirty) return !1;
                            a = t[n].$valid && 1 == e.verifyForm.email;
                            break;
                        case "confirmEmail":
                            if (!t[n].$dirty) return !1;
                            a = t[n].$valid && e.registerForm.EmailConfirm.toLowerCase() === e.registerForm.Email.toLowerCase();
                            break;
                        case "mobileNo":
                            if (!t[n].$dirty) return !1;
                            a = "-" !== e.registerForm.MobileExt && t[n].$valid;
                            break;
                        case "homeNo":
                            if (!t[n].$dirty) return !1;
                            a = "-" !== e.registerForm.HomeExt && t[n].$valid
                    }
                    return a
                }
            }, e.wizardStep3 = {
                validate: function (t) {
                    return !(!t.$dirty && t.$invalid || !e.wizardStep3.propsValidate(t, "userId") || !e.wizardStep3.propsValidate(t, "passwd") || !e.wizardStep3.propsValidate(t, "passConfirm") || !e.wizardStep3.propsValidate(t, "secureQ") || !e.wizardStep3.propsValidate(t, "secureAnswer") || !e.wizardStep3.propsValidate(t, "currency"))
                },
                propsValidate: function (t, n) {
                    var a = !0;
                    if (!t || !n || !t[n]) return !0;
                    if (!t.$dirty) return !1;
                    switch (n) {
                        case "userId":
                            if (!t[n].$dirty) return !1;
                            a = t[n].$valid && 1 == e.verifyForm.userId;
                            break;
                        case "passwd":
                            if (!t[n].$dirty) return !1;
                            a = t[n].$valid && e.registerForm.Passwd.toLowerCase() != e.registerForm.UserId.toLowerCase();
                            break;
                        case "passConfirm":
                            if (!t[n].$dirty) return !1;
                            a = t[n].$valid && e.registerForm.PasswdConfirm === e.registerForm.Passwd;
                            break;
                        case "secureQ":
                            if (!t[n].$dirty) return !1;
                            a = -1 != e.registerForm.SecQuestion;
                            break;
                        case "secureAnswer":
                            if (!t[n].$dirty) return !1;
                            a = t[n].$valid;
                            break;
                        case "currency":
                            a = -1 != e.registerForm.CurrencyId
                    }
                    return a
                }
            }, e.$watch("registerForm.CountryName", function (t) {
                function n(e, t) {
                    return !!(e && t && e.Name) && e.Name.toLowerCase().trim() === t.toLowerCase().trim()
                }
                if (e.options.countries && t && !t.Id) {
                    var r = a("filter")(e.options.countries, t, n);
                    r.length > 0 && (t = r[0])
                }
                e.options.countries && t && t.Id && t.Code && s(t)
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
        angular.module("starApp").controller("userRegistrationCtrl", e).controller("id3ModalAddressCtrl", t), e.$inject = ["$scope", "$q", "$filter", "$translate", "dataService", "checkService"], t.$inject = ["$scope", "$filter", "$uibModalInstance", "$translate"]
    }()
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e, t, n) {
            function a() {
                var t = [];
                return e.availablePartners.forEach(function (e) {
                    0 !== e.transferId && -1 === t.indexOf(e.transferId) && t.push(e.transferId)
                }), t
            }
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
                getTransferPartnerIds: a,
                getTransferBalance: function (e) {
                    var r = t.myAccountRootApi,
                        i = a();
                    return n.fetch("GET", r + "GetTransferBalance", {
                        partnerIds: i,
                        guId: e
                    })
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

        function a(e, t, n, a, r, i, o) {
            function s() {
                (uv.sessionD.excluded || uv.sessionD.suspended) && a(["txtStatementTransfer", "msgResGamingSuspended"]).then(function (t) {
                    e.msg = {
                        title: t.txtStatementTransfer,
                        content: t.msgResGamingSuspended
                    }, e.hideClose = !0, n.dialog(e)
                }), e.transferData = {
                    from: -1,
                    to: -1,
                    amount: 0
                }, o.all({
                    myWalletBalance: r.refreshBalance(),
                    partnerWallets: i.getTransferBalance(c)
                }).then(function (t) {
                    var n = {
                            name: "myWallet",
                            id: 0,
                            balance: t.myWalletBalance
                        },
                        a = t.partnerWallets;
                    a.unshift(n), e.wallets = a
                })
            }
            var l = t.myAccountRootApi,
                c = getGuid();
            e.wallets = [], e.guId = c, e.transfer = function (t) {
                (function (t) {
                    if (("VND" === uv.geod.cc || "IDR" === uv.geod.cc) && t.amount < 1e3) return e.msg = {
                        title: a.instant("txtStatementTransfer"),
                        content: a.instant("msgTransferErrorMinLimit") + 1e3 + uv.geod.cc
                    }, n.dialog(e), !1;
                    var r = uv.sessionD.aliases && null !== uv.sessionD.aliases.an && "" !== uv.sessionD.aliases.an;
                    return !!(12 !== t.from && 12 !== t.to || r) || (e.msg = {
                        title: a.instant("txtStatementTransfer"),
                        content: a.instant("msgTransferCreatAliasFirst")
                    }, n.dialog(e), !1)
                })(t) && (t.guId = c, n.fetch("POST", l + "Transfer", t).then(function (t) {
                    switch (t.statusCode) {
                        case 0:
                            s(), e.msg = t;
                            var r = {
                                templateUrl: "/cdn1101/resource/templates/modal/user/transferSuccessPrompt.tpl.html",
                                controller: "modalInstanceCtrl"
                            };
                            n.dialog(e, r);
                            break;
                        case 203:
                            e.msg = {
                                title: a.instant("txtStatementTransfer"),
                                content: a.instant("msgTransferErrorMaxLimit")
                            }, n.dialog(e);
                            break;
                        case 205:
                            e.msg = {
                                title: a.instant("txtStatementTransfer"),
                                content: a.instant("msgTransferRestrictWithdrawal")
                            }, n.dialog(e);
                            break;
                        default:
                            e.msg = {
                                title: a.instant("txtStatementTransfer"),
                                content: a.instant("msgTransferErrorGeneral")
                            }, n.dialog(e)
                    }
                }))
            }, e.getTransferKey = i.getTransferKey, e.isValidTransferForm = function (t) {
                var n = e.wallets.filter(function (e) {
                        return e.id === t.from
                    })[0],
                    a = e.wallets.filter(function (e) {
                        return e.id === t.to
                    })[0];
                return !(!n || !a || n === a || t.amount <= 0 || t.amount > n.balance)
            }, e.isTransferOptionsAvailable = function (t, n) {
                var a = t !== n,
                    r = 0 === t && 0 !== n || 0 === n && 0 !== t,
                    i = !e.client.sessionD.excluded;
                return (-1 === n || a && r) && i && !(12 === t && "UK" == e.client.pd.r)
            }, e.isTransferPartnerInMaintenance = function (t) {
                return e.availablePartners.every(function (e) {
                    return e.transferId !== t || e.isMaintenance
                })
            }, e.getTransferToolTipKey = i.getTransferToolTipKey, s()
        }
        angular.module("starApp").factory("transferService", n).controller("transferCtrl", a), a.$inject = ["$scope", "myAccountConst", "dataService", "$translate", "userService", "transferService", "$q"], n.$inject = ["$rootScope", "myAccountConst", "dataService"]
    }(window, $)
}, function (e, t) {
    angular.module("starApp").directive("kycQuestionnaire", ["dataService", "uibButtonConfig", "$translate", function (e, t, n) {
        return {
            restrict: "A",
            templateUrl: "/cdn1101/resource/templates/myaccount/kyc_questionnaire.tpl.html?v=" + gv.rv,
            link: function (a) {
                function r(e) {
                    a.quesetionnaire = e.questions.map(function (e, t) {
                        return e.index = t, e
                    }), a.records = e.records.map(function (e) {
                        return e.Answer = null == e.Answer ? void 0 : e.Answer.toString(), e
                    });
                    var t = a.quesetionnaire,
                        n = a.records;
                    a.employmentInformation = t.filter(function (e) {
                        return "1" === e.GroupID
                    }), a.sourceOfWealth = t.filter(function (e) {
                        return "2" === e.GroupID
                    }), a.commentBox = t.find(function (e) {
                        return null == e.GroupID
                    }), a.answers = function (e, t) {
                        var n = Array.from({
                            length: e.length
                        });
                        return e.map(function (e, a) {
                            var r = function (e) {
                                var t = {
                                    QuestionId: 0,
                                    Answer: void 0,
                                    Remark: void 0
                                };
                                switch (e.Type) {
                                    case 0:
                                        t.Answer = !1;
                                        break;
                                    case 1:
                                    case 2:
                                    case 3:
                                    default:
                                        t.Answer = void 0
                                }
                                return t
                            }(e);
                            r.QuestionId = e.ID, n[a] = r;
                            var i = t.find(function (t) {
                                return t.QuestionId == e.ID
                            });
                            i && (r.Answer = function (e) {
                                return 3 == e.Type || 0 == e.Type
                            }(e) ? function (e) {
                                return e && (1 == e || 0 == e) && (e = 1 == e), e
                            }(i.Answer) : i.Answer, r.Remark = i.Remark)
                        }), n
                    }(t, n), a.questionnaire = t, i = a.answers.filter(function (e) {
                        return a.sourceOfWealth.some(function (t) {
                            return t.ID == e.QuestionId
                        })
                    }), a.employedChanged()
                }
                t.activeClass = "checked";
                var i = void 0;
                a.loadGuid = getGuid(), a.answers = void 0, a.unemployed = !1, a.showValidate = !1, a.AggreeSOW_KYC = !1, a.employmentInformation = void 0, a.sourceOfWealth = void 0, a.commentBox = void 0, e.fetch("GET", "/service/myaccounttapi/getquestionnaire", {
                    languageCode: gv.lan,
                    currencyCode: uv.geod.cc,
                    docSubmissionId: getFromSearch("docSubmissionId"),
                    DocTypeId: getFromSearch("docType"),
                    accountId: uv.sessionD.aId,
                    guId: a.loadGuid
                }).then(function (e) {
                    r(e)
                }), a.showValid = function () {
                    a.showValidate = !0
                }, a.submitSOW = function () {
                    if (a.form.$valid || a.AggreeSOW_KYC) {
                        a.loadGuid = getGuid();
                        var t = {
                            Answers: function (e) {
                                return e.map(function (e) {
                                    var t = Object.assign({}, e);
                                    return "string" == typeof t.Answer ? t.Answer = parseInt(t.Answer) : "boolean" == typeof t.Answer && (t.Answer = !0 === t.Answer ? 1 : 0), void 0 === t.Remark && (t.Remark = ""), t
                                })
                            }(a.answers),
                            AccountId: uv.sessionD.aId,
                            MemberCode: uv.sessionD.memberCode,
                            DocSubmissionId: getFromSearch("docSubmissionId"),
                            DocTypeId: getFromSearch("docType"),
                            guId: a.loadGuid
                        };
                        e.fetch("POST", "/service/myaccounttapi/savequestionnaire", t).then(function (t) {
                            1 == t ? (a.msg = {
                                title: n.instant("txtComAnnouncement"),
                                content: n.instant("msgComSubmitSuccess")
                            }, e.dialog(a).closed.then(function () {
                                window.location.href = "/" + gv.lan + "/my-account/profile-verification"
                            })) : (a.msg = {
                                title: n.instant("txtComAlert"),
                                content: n.instant("msgCommonSystemError")
                            }, e.dialog(a))
                        })
                    }
                }, a.cleanRemark = function (e) {
                    e.Remark = void 0
                }, a.employedChanged = function () {
                    a.unemployed = "22" === a.answers.find(function (e) {
                        return "1" == e.QuestionId
                    }).Answer, a.employmentInformation.filter(function (e) {
                        return "1" !== e.ID && "6" !== e.ID
                    }).forEach(function (e) {
                        return e.IsRequired = 0 == a.unemployed
                    }), a.unemployed && a.answers.filter(function (e) {
                        return "2,3,4,5".indexOf(e.QuestionId) > -1
                    }).forEach(function (e) {
                        e.Answer = void 0, e.Remark = void 0
                    })
                }, a.checkboxClicked = function () {
                    a.form.sourceOfWealth.$setDirty(), a.form.sourceOfWealth.$setTouched()
                }, a.someSelected = function () {
                    return a.answers.filter(function (e) {
                        return a.sourceOfWealth.some(function (t) {
                            return t.ID == e.QuestionId
                        })
                    }).some(function (e) {
                        return e.Answer
                    })
                }, a.selectedRemarkOption = function (e, t) {
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

        function n(e, n, a, r, i, o, s, l) {
            function c() {
                o.all({
                    options: n.fetch("GET", d + "getProfileOptions", {
                        LanguageCode: gv.lan,
                        guId: f
                    }),
                    profileVm: n.fetch("GET", d + "getProfile")
                }).then(function (t) {
                    e.options = t.options;
                    var n = t.profileVm; - 1 !== n.howDoYouLearnAnswer.indexOf("Others,") ? (n.howDoYouLearnOther = n.howDoYouLearnAnswer.substring(7), n.howDoYouLearn = n.howDoYouLearnAnswer.substring(0, 7)) : n.howDoYouLearn = n.howDoYouLearnAnswer, e.profileVm = n, m = angular.copy(n);
                    var a = "UK" === uv.pd.r || "IM" === uv.pd.c;
                    e.disableProp = e.profileVm.hasDeposit || e.profileVm.hasAdjustment || 1 === e.profileVm.kycStatus || e.profileVm.isPhotoIdAccept || a,
                        function (t) {
                            var n = s("filter")(e.options.countrieslegalage, {
                                Id: t
                            }, !0) || "";
                            e.legalAge = 18, n.length > 0 && (e.legalAge = n[0].Name), e.dateoptions = {
                                date: [31],
                                month: [12],
                                year: [g - 90, g - e.legalAge]
                            }
                        }(n.countryId), e.dateoptions.year[0] = function (e, t) {
                            var n = e - t;
                            return n < 0 ? t + n : t
                        }(n.yearOfBirth, e.dateoptions.year[0])
                })
            }

            function u() {
                var t = e.profileVm,
                    n = m,
                    a = [];
                for (var r in t) t[r] !== n[r] && a.push(r);
                e.differProp = a
            }
            var d = r.myAccountRootApi,
                m = {},
                g = (new Date).getFullYear(),
                f = getGuid();
            e.profileVm = {}, e.differProp = [], e.options = [], e.disableProp = !1, e.requireFullName = "China" === uv.pd.r || "Indonesia" === uv.pd.r || "Vietnam" === uv.pd.r, e.requireMiddleName = "UK" === uv.pd.r, e.dateFormat = "dd/MM/yyyy, HH:mm:ss", e.dateoptions = {
                date: [31],
                month: [12],
                year: [g - 90, g - 18]
            }, e.timezoneOptions = ["-12:00", "-11:00", "-10:00", "-09:00", "-08:00", "-07:00", "-06:00", "-05:00", "-04:00", "-03:00", "-02:00", "-01:00", "+00:00", "+01:00", "+02:00", "+03:00", "+03:30", "+04:00", "+04:30", "+05:00", "+05:30", "+05:45", "+06:00", "+06:30", "+07:00", "+08:00", "+09:00", "+09:30", "+10:00", "+11:00", "+12:00", "+13:00"], e.profileCtrl = {
                state: "listing",
                guId: f
            }, e.pattern = {
                phoneNo: new RegExp("^\\d{1,15}$"),
                nospecCharDigit: new RegExp("^(?=.*$)(?!.*[~,_:!@#$%^&*\\[\\]()-+'\";`><?|{|}1-9])"),
                nospecChar: new RegExp("^(?=.*$)(?!.*[~,_:!@#$%^&*\\[\\]()-+'\";`><?|{|}])"),
                postCode: new RegExp("^[a-zA-Z0-9-\\s]{0,20}$"),
                nodigits: new RegExp("^\\D{1,30}$")
            }, e.onInit = c, e.changePassword = function () {
                if (!uv.sessionD.suspended && !uv.sessionD.isAdminExclusion) {
                    var t = {
                        templateUrl: "/cdn1101/resource/templates/modal/user/changePassword.html",
                        controller: "userModalChangePassCtrl"
                    };
                    n.dialog(e, t).result.then(function (t) {
                        e.msg = t, n.dialog(e), location.reload()
                    })
                }
            }, e.getDifferent = u, e.validate = function (t, n) {
                var a = !0,
                    r = t[n];
                if (!t || !n || !r) return !0;
                switch (n) {
                    case "nationalityId":
                    case "placeOfBirthId":
                        if (!e.options.nationalities) return !1;
                        var i = e.options.nationalities.filter(function (e) {
                            return e.Name === r.$viewValue
                        })[0];
                        (a = angular.isDefined(i)) && (e.profileVm[n] = i.Id);
                        break;
                    case "dayOfBirth":
                        if (!isValidDate(e.profileVm.yearOfBirth + "-" + e.profileVm.monthOfBirth + "-" + e.profileVm.dayOfBirth)) return !1;
                        var o = new Date(e.profileVm.yearOfBirth, e.profileVm.monthOfBirth - 1, e.profileVm.dayOfBirth).getAges();
                        a = "-1" !== e.profileVm.yearOfBirth && "-1" !== e.profileVm.monthOfBirth && "-1" !== e.profileVm.dayOfBirth && o >= e.legalAge
                }
                r.$setValidity(n, a)
            }, e.formatNameObj = function (e, t) {
                if (!angular.isArray(t)) return "";
                for (var n = 0; n < t.length; n++)
                    if (e === t[n].Id) return t[n].Name
            }, e.getText = function (e) {
                var n = t(document.forms.profileForm[e]);
                return "select" === n.prop("tagName").toLowerCase() ? n.find("option:selected").text() : n.val()
            }, e.updateProfile = function (t) {
                t.guId = f;
                var r = n.fetch("PUT", d + "updateProfile", t);
                e.msg = {
                    title: a.instant("txtComNotice")
                }, r.then(function (t) {
                    switch (t) {
                        case 0:
                            e.msg.content = a.instant("msgProfileUpdateSucess"), n.dialog(e).result.then(function () {
                                location.reload()
                            });
                            break;
                        case 3:
                            e.msg.content = a.instant("msgSecureInvalidSecQnOrAnswer"), n.dialog(e);
                            break;
                        case 4:
                            e.msg.content = a.instant("msgJoinUsEmailExisted"), n.dialog(e);
                            break;
                        default:
                            e.msg.content = a.instant("msgProfileUpdateFailed"), n.dialog(e)
                    }
                })
            }, e.getCountryName = function (t) {
                if (e.options.nationalities && t) return e.options.nationalities.filter(function (e) {
                    return e.Id === t
                })[0].Name
            }, e.isProfileChanged = function () {
                return JSON.stringify(e.profileVm) !== JSON.stringify(m)
            }, e.updateHowDoYouLearnAnswer = function () {
                "Others," !== e.profileVm.howDoYouLearn && (e.profileVm.howDoYouLearnOther = ""), e.profileVm.howDoYouLearnAnswer = e.profileVm.howDoYouLearn + e.profileVm.howDoYouLearnOther
            }, e.goNextStep = function () {
                if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) {
                    e.msg = {
                        title: a.instant("txtComNotice"),
                        content: a.instant("msgResGamingSuspended")
                    };
                    var t = {
                        backdrop: "static",
                        templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                        controller: "modalInstanceCtrl"
                    };
                    n.dialog(e, t).result.then(function () {
                        c()
                    })
                } else e.profileCtrl.state = "confirm", u()
            };
            var p = localStorage.getItem("recommendDomain") || !1;
            e.recUrl = p ? JSON.parse(localStorage.getItem("recommendDomain")).recDomains.filter(function (e) {
                return 1 == e.isSucess
            }) : []
        }
        angular.module("starApp").controller("profileCtrl", n).directive("profileListing", [function () {
            return {
                restrict: "E",
                templateUrl: 1 === uv.sessionD.mberType ? "/cdn1101/resource/templates/myAccount/profile.listing.tpl.html" : "/cdn1101/resource/templates/myAccount/profile.credit.tpl.html"
            }
        }]).directive("profileConfirm", [function () {
            return {
                restrict: "E",
                templateUrl: "/cdn1101/resource/templates/myAccount/profile.confirm.tpl.html"
            }
        }]).directive("toNum", function () {
            return {
                require: "ngModel",
                link: function (e, t, n, a) {
                    a.$parsers.push(function (e) {
                        return parseInt(e, 10)
                    }), a.$formatters.push(function (e) {
                        return "" + e
                    })
                }
            }
        }).directive("bookMark", function () {
            return {
                link: function (n, a, r) {
                    t(a).click(function () {
                        if (e.sidebar && e.sidebar.addPanel) e.sidebar.addPanel(document.title, e.location.href, "");
                        else if (e.external && "AddFavorite" in e.external) e.external.AddFavorite(location.href, document.title);
                        else {
                            if (e.opera && e.print) return this.title = document.title, !0;
                            alert("Press " + (-1 !== navigator.userAgent.toLowerCase().indexOf("mac") ? "Command/Cmd" : "CTRL") + " + D to bookmark this page.")
                        }
                    })
                }
            }
        }).directive("novalidateWhenDisable", function () {
            return {
                require: "form",
                restrict: "A",
                link: function (e, n, a, r) {
                    var i = n.find("input");
                    angular.forEach(i, function (n, a) {
                        var i = t(n);
                        e.$watch(function () {
                            return e.$eval(i.attr("ng-disabled"))
                        }, function (e) {
                            if (e) {
                                var t = r[i.attr("name")];
                                angular.isDefined(t) && r.$removeControl(t)
                            }
                        })
                    })
                }
            }
        }), n.$inject = ["$scope", "dataService", "$translate", "myAccountConst", "$timeout", "$q", "$filter", "$cookies"]
    }(window, $)
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r) {
            function i() {
                var t = getGuid();
                a.fetch("GET", "/service/myaccounttapi/GetResGamingSetting", {
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

            function o(e, t) {
                for (var n in e)
                    if (e[n].value == t) return e[n];
                return null
            }
            e.resGamingSetting = {};
            var s = "UK" != uv.pd.r ? "/MB" : "/UKMB";
            e.resGamingContentUrl = gv.domains.content + s + "/" + gv.lan + "/corporate-affairs/responsible-gaming.html" + contentsVersionNo(), e.contentUrl = gv.domains.content + s + location.pathname + ".html" + contentsVersionNo(), e.onInit = i, e.setExclusion = function (n, s, l) {
                if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) e.msg = {
                    title: t.instant("txtComNotice"),
                    content: t.instant("msgResGamingSuspended")
                }, u = {
                    backdrop: "static",
                    templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                    controller: "modalInstanceCtrl"
                }, a.dialog(e, u).result.then(function () {
                    i()
                });
                else if (n.isSelfExclusion) c = o(s, n.selfExclusionPeriod), n.localizePeriod = t.instant(c.key, {
                    value: c.transValue
                }), u = {
                    templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                    controller: "modalInstanceCtrl"
                }, e.msg = {
                    title: t.instant("navCorAffairsResponsibleGaming"),
                    content: t.instant("msgResGamingselfExclusionConfirm", {
                        period: n.localizePeriod
                    })
                }, a.dialog(e, u).result.then(function () {
                    ! function (n, o) {
                        var s = {},
                            l = getGuid();
                        e.guId = l, n.guId = l, n.localizePeriod = t.instant(o.key, {
                            value: o.transValue
                        }), r.all({
                            englishPeriod: t(o.key + "OnlyEn", {
                                value: o.transValue
                            }),
                            localizePeriod: t(o.key, {
                                value: o.transValue
                            })
                        }).then(function (r) {
                            n.englishPeriod = r.englishPeriod, n.localizePeriod = r.localizePeriod, a.fetch("POST", "/service/myaccounttapi/setExclusion", n).then(function (r) {
                                switch (r) {
                                    case "0000":
                                        e.msg.content = t.instant("msgResGamingAppliedSelfExclusion", {
                                            period: n.localizePeriod
                                        }), s = {
                                            templateUrl: "/cdn1101/resource/templates/modal/User/selfExclusionPrompt.html",
                                            controller: "modalInstanceCtrl",
                                            backdrop: "static"
                                        }, a.dialog(e, s).result.then(function () {
                                            location.href = "/{0}/my-account/banking/withdrawal".format(gv.lan)
                                        }, i);
                                        break;
                                    default:
                                        e.msg.content = t.instant("msgResGamingFailUpdate"), a.dialog(e)
                                }
                            })
                        })
                    }(n, c)
                });
                else {
                    var c = o(l, n.timeoutPeriod);
                    n.localizePeriod = t.instant(c.key, {
                        value: c.transValue
                    }), n.englishPeriod = t.instant(c.key + "OnlyEn", {
                        value: c.transValue
                    }), e.resGamingSetting = n, e.msg.title = t.instant("txtResGamingTimeOut"), e.msg.content = t.instant("msgResGamingAppliedTimeOut", {
                        period: n.localizePeriod
                    });
                    var u = {
                        templateUrl: "/cdn1101/resource/templates/modal/User/timeoutPrompt.html",
                        controller: "setTimeOutCtrl",
                        backdrop: "static"
                    };
                    a.dialog(e, u)
                }
            }, e.submitLogOut = function () {
                a.fetch("POST", "/service/userapi/logout", {
                    Ud: uv.sessionD.memberCode
                }).then(function (e) {
                    localStorage.removeItem("recommendDomain"), window.location.href = e.redirectUrl
                })
            }
        }

        function t(e, t, n, a) {
            e.cancel = function () {
                t.dismiss("cancel")
            }, e.confirm = function () {
                a.fetch("POST", "/service/myaccounttapi/setExclusion", e.resGamingSetting).then(function (t) {
                    switch (t) {
                        case "0001":
                            a.fetch("POST", "/service/userapi/logout", {
                                Ud: uv.sessionD.memberCode
                            }).then(function (e) {
                                localStorage.removeItem("recommendDomain"), window.location.href = e.redirectUrl
                            });
                            break;
                        default:
                            e.msg.content = n.instant("msgResGamingFailUpdate"), a.dialog(e)
                    }
                })
            }
        }
        angular.module("starApp").controller("resGamingCtrl", e).controller("setTimeOutCtrl", t).directive("setTimeOut", [function () {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/myaccount/account-settings/setTimeOut.tpl.html"
            }
        }]).directive("setRealityCheck", ["dataService", "$translate", function (e, t) {
            return {
                restrict: "AE",
                templateUrl: "/cdn1101/resource/templates/myaccount/account-settings/setRealityCheck.tpl.html",
                link: function (n) {
                    n.setRealityCheck = function (a) {
                        if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) {
                            n.msg = {
                                title: t.instant("txtComNotice"),
                                content: t.instant("msgResGamingSuspended")
                            };
                            var r = {
                                backdrop: "static",
                                templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                                controller: "modalInstanceCtrl"
                            };
                            e.dialog(n, r)
                        } else e.fetch("POST", "/service/myaccounttapi/setRealityCheck?remindDuration=" + a).then(function (r) {
                            n.msg = {
                                title: t.instant("txtComNotice"),
                                content: r ? t.instant("msgRealityCheckUpdateSucess").format(a) : t.instant("msgCommonSystemError")
                            }, e.dialog(n).result.finally(function () {
                                location.reload()
                            })
                        })
                    }
                }
            }
        }]).directive("setDepositLimit", ["dataService", "$translate", "$q", "$filter", function (e, t, n, a) {
            return {
                restrict: "A",
                templateUrl: "/cdn1101/resource/templates/myaccount/account-settings/setDepositLimit.tpl.html",
                link: function (r, i, o) {
                    function s() {
                        n.all({
                            depositLimitVm: e.fetch("GET", "/service/myaccounttapi/getDepositLimit"),
                            unConfirmDepositLimitVm: e.fetch("GET", "/service/myaccounttapi/getUnConfirmedDepositLimit")
                        }).then(function (e) {
                            r.originalDepositLimit = angular.copy(e.depositLimitVm), r.depositLimitVm = e.depositLimitVm, r.depositLimitVm.period < 0 && (r.depositLimitVm.period = 1), r.unConfirmDepositLimitVm = e.unConfirmDepositLimitVm, r.hasUnConfirmLimit = 0 !== e.unConfirmDepositLimitVm.dateApplied, p = r.depositLimitVm.dateApplied > 0;
                            var n = new Date;
                            m = new Date(e.unConfirmDepositLimitVm.dateApplied), g = m.addDays(1), f = m.addDays(3);
                            var a = -1 == r.depositLimitVm.limit;
                            r.inConfirmPeriod = n > g && n < f, r.showRemoveLimitBtn = !r.hasUnConfirmLimit && !r.inConfirmPeriod && !a,
                                function () {
                                    if (r.hasUnConfirmLimit) {
                                        var e = -1 == r.unConfirmDepositLimitVm.limit;
                                        if (r.inConfirmPeriod) {
                                            var n = t.instant("msgRGDepositLimitConfirmRemove"),
                                                a = t.instant("msgRGDepositLimitConfirmChange", {
                                                    period: l(r.unConfirmDepositLimitVm.period),
                                                    limit: r.unConfirmDepositLimitVm.limit
                                                });
                                            r.hintMessage = e ? n : a
                                        } else {
                                            var i = t.instant("msgRGDepositLimitConfirmRemoveTime", {
                                                    timestamp: c(g)
                                                }),
                                                o = t.instant("msgRGDepositLimitConfirmIncreaseTime", {
                                                    period: l(r.unConfirmDepositLimitVm.period),
                                                    limit: r.unConfirmDepositLimitVm.limit,
                                                    timestamp: c(g)
                                                });
                                            r.hintMessage = e ? i : o
                                        }
                                    } else p && (r.hintMessage = "{0} {1}".format(c(r.depositLimitVm.dateApplied), t.instant("txtResGamingLastChange")))
                                }()
                        })
                    }

                    function l(e) {
                        return r.depositLimitOptions.filter(function (t) {
                            return t.value === e
                        })[0].text
                    }

                    function c(e) {
                        return "{0}(GMT {1})".format(a("date")(e, "dd/MM/yyyy HH:mm", uv.geod.timezone), uv.geod.timezone)
                    }

                    function u(e) {
                        if (!angular.isUndefined(e)) return -1 == e.limit ? 1 / 0 : e.limit / e.period
                    }
                    var d, m, g, f, p;
                    angular.isUndefined(r.guId) ? r.guId = getGuid() : d = r.guId, r.setDepositLimit = function (n) {
                        function a() {
                            n.guId = d, e.fetch("POST", "/service/myaccounttapi/SetDepositLimit", n).then(function (a) {
                                var o;
                                o = a ? i ? t.instant("msgRGDepositLimitComfirmIncrease24") : t.instant("msgRGDepositLimitConfirmChange", {
                                    period: c,
                                    limit: n.limit
                                }) : t.instant("msgResGameDepositLimitFailed"), r.msg.content = o, e.dialog(r), s()
                            })
                        }
                        if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) r.msg = {
                            title: t.instant("txtComNotice"),
                            content: t.instant("msgResGamingSuspended")
                        }, o = {
                            backdrop: "static",
                            templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                            controller: "modalInstanceCtrl"
                        }, e.dialog(r, o).result.then(function () {
                            s()
                        });
                        else {
                            var i = u(n) > u(r.originalDepositLimit);
                            if (r.hasUnConfirmLimit && i) return function () {
                                var n = r.unConfirmDepositLimitVm.limit;
                                r.msg.content = -1 == n ? t.instant("msgRGDepositLimitInMiddleRemove") : t.instant("msgRGDepositLimitInMiddle", {
                                    limit: n
                                }), e.dialog(r)
                            }(), void(r.depositLimitVm = angular.copy(r.originalDepositLimit));
                            var o = {
                                    templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                                    controller: "modalInstanceCtrl"
                                },
                                c = l(n.period);
                            r.msg.content = t.instant("msgRGDepositLimitApplied", {
                                period: c,
                                limit: n.limit
                            }), r.msg.rightBtnTxt = "txtComConfirm", e.dialog(r, o).result.then(a)
                        }
                    }, r.confirmDepositLimit = function () {
                        var n, a = {
                            guId: r.guId
                        };
                        e.fetch("POST", "/service/myaccounttapi/confirmDepositLimit", a).then(function (a) {
                            n = a ? "msgResGameDepositLimitSuccess" : "msgResGameDepositLimitFailed", r.msg.content = t.instant(n), e.dialog(r), s()
                        })
                    }, r.removeDepositLimit = function () {
                        function n() {
                            var n = {
                                period: 1,
                                limit: -1,
                                guId: r.guId
                            };
                            e.fetch("POST", "/service/myaccounttapi/SetDepositLimit", n).then(function (n) {
                                var a;
                                a = n ? t.instant("msgRGDepositLimitConfirmRemove24") : t.instant("msgResGameDepositLimitFailed"), r.msg.content = a, e.dialog(r), s()
                            })
                        }
                        if (uv.sessionD.suspended || uv.sessionD.isAdminExclusion) r.msg = {
                            title: t.instant("txtComNotice"),
                            content: t.instant("msgResGamingSuspended")
                        }, a = {
                            backdrop: "static",
                            templateUrl: "/cdn1101/resource/templates/modal/messageAlert.html",
                            controller: "modalInstanceCtrl"
                        }, e.dialog(r, a).result.then(function () {
                            s()
                        });
                        else {
                            var a = {
                                templateUrl: "/cdn1101/resource/templates/modal/messagePrompt.html",
                                controller: "modalInstanceCtrl"
                            };
                            r.msg.content = t.instant("msgRGDepositLimitAppliedRemove"), r.msg.rightBtnTxt = "txtComConfirm", e.dialog(r, a).result.then(n)
                        }
                    }, r.getDailyLimit = u, r.msg = {
                        title: t.instant("txtResGamingDailyDepositLimits")
                    }, r.depositLimitOptions = [{
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
        }]), e.$inject = ["$scope", "$translate", "myAccountConst", "dataService", "$q"], t.$inject = ["$scope", "$uibModalInstance", "$translate", "dataService"]
    }()
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e) {
            return {
                restrict: "AE",
                scope: !0,
                controller: "bettingHistoryDetailCtrl",
                templateUrl: "/cdn1101/resource/templates/myaccount/statement/bettinghistory/" + e.getProduct() + "/settled-bets-detail.table.tpl.html"
            }
        }

        function a(t) {
            var n = e.location.pathname.split("/");
            return {
                restrict: "AE",
                controller: "bettingHistoryCtrl",
                templateUrl: "/cdn1101/resource/templates/myaccount/statement/bettinghistory/" + (angular.isDefined(n[5]) && "live" == n[5] ? "livecsn" : t.getPage()) + ".layout.tpl.html"
            }
        }

        function r(t, n, a, r, i) {
            t.betHisCtrlDetail = {
                guId: getGuid()
            };
            var o = e.location.pathname.split("/"),
                s = o[5],
                l = {
                    guId: t.betHisCtrlDetail.guId,
                    language: o[1],
                    token: uv.sessionD.ssid,
                    channelProductId: gv.generals[s].Id,
                    partnerId: getFromSearch("partnerId"),
                    jsDateFrom: getFromSearch("betDate"),
                    jsDateTo: getFromSearch("betDate"),
                    gameType: getFromSearch("gameType"),
                    gameCode: getFromSearch("gameCode")
                };
            t.sumStake = function (e) {
                var t = 0;
                if (0 != e.length) {
                    for (var n in e) 1 == e[n].status && (t += e[n].stake);
                    return t
                }
                return 0
            }, i.fetch("GET", "/service/myaccounttapi/GetSettleBetDetail", l).then(function (e) {
                t.settlebetListDetail = [], t.settlebetParlayListDetail = [], e.length > 0 && "parlay".indexOf(e[0].uniqueGameID.toLowerCase()) > -1 ? t.settlebetParlayListDetail = function (e) {
                    for (var t in e) e[t].result = JSON.parse(e[t].result);
                    return e
                }(e) : e.length > 0 && "parlay".indexOf(e[0].uniqueGameID.toLowerCase()) < 0 && (t.settlebetListDetail = e)
            })
        }

        function i(e, t, n, a, r, i) {
            function o(t) {
                e.dateRange = t;
                var n = {
                    token: uv.sessionD.ssid,
                    channelProductId: gv.generals[s].Id,
                    partnerIds: gv.generals[s].partners.map(function (e) {
                        return e.id
                    }),
                    jsDateFrom: t.dateFrom,
                    jsDateTo: t.dateTo,
                    language: gv.lan,
                    region: uv.pd.r,
                    guId: c
                };
                r.fetch("GET", "/service/myaccounttapi/GetSettleBet", n).then(function (t) {
                    e.betHisCtrl.settlebetModel = t
                })
            }
            var s = a.getProduct(),
                l = a.getPage(),
                c = getGuid();
            e.betHisCtrl = {
                    settlebetModel: [],
                    currentLottoIndex: -1,
                    partnerFilter: 0,
                    winlossFilter: "",
                    prod: s,
                    guId: c,
                    prodKey: a.getProdKey(s),
                    title: "settled-bets" == l ? "txtStatementBetHistorySettledBets" : "txtStatementBetHistoryUnsettledBets",
                    serachByRange: o,
                    getProdTable: function () {
                        return "/cdn1101/resource/templates/myaccount/statement/bettinghistory/{0}/{1}.table.tpl.html".format(s, l)
                    },
                    winOrLose: function (e, t) {
                        return function (n) {
                            if (angular.isUndefined(t) || "" === t) return !0;
                            var a = n[e],
                                r = 0;
                            return a > 0 && (r = 1), 0 === parseInt(a) && (r = 0), a < 0 && (r = -1), r == t
                        }
                    },
                    getRacingMainBet: function (e, t) {
                        return e.filter(function (e) {
                            var n;
                            return e.extend.reqId === t && (n = e.selections.some(function (e) {
                                return "" === e.extend.eachWay
                            })), n
                        })[0]
                    }
                }, e.dateRange = t.getDateRange(0), e.selectWinLoseList = [{
                    key: "txtCommonAll",
                    value: ""
                }, {
                    key: "txtStatementDraw",
                    value: 0
                }, {
                    key: "txtStatementWin",
                    value: 1
                }, {
                    key: "txtStatementLose",
                    value: -1
                }], e.selectProcesssList = [{
                    key: "txtCommonAll",
                    value: ""
                }, {
                    key: "txtStatementPending",
                    value: 0
                }, {
                    key: "txtStatementWin",
                    value: 1
                }, {
                    key: "txtStatementLose",
                    value: -1
                }], e.selectPartnerList = function () {
                    return [{
                        key: "txtCommonAll",
                        value: 0
                    }].concat(e.availablePartners.filter(function (e) {
                        return "live" === e.productName && void 0 != e.attrs.ParentPartnerId && (0 == e.attrs.ParentPartnerId.length || 1 == e.attrs.ParentPartnerId.length && "" == e.attrs.ParentPartnerId)
                    }).map(function (e) {
                        return {
                            key: e.translateKey,
                            value: e.id
                        }
                    }))
                }(),
                function () {
                    switch (l) {
                        case "settled-bets":
                            o(e.dateRange);
                            break;
                        case "unsettled-bets":
                            ! function () {
                                var t = {
                                    token: uv.sessionD.ssid,
                                    channelProductId: gv.generals[s].Id,
                                    partnerIds: gv.generals[s].partners.map(function (e) {
                                        return e.id
                                    }),
                                    language: gv.lan,
                                    region: uv.pd.r,
                                    guId: c
                                };
                                r.fetch("GET", "/service/myaccounttapi/GetUnSettleBet", t).then(function (t) {
                                    e.betHisCtrl.settlebetModel = t
                                })
                            }()
                    }
                }()
        }
        angular.module("starApp").controller("bettingHistoryCtrl", i).directive("bettingHistory", a).controller("bettingHistoryDetailCtrl", r).directive("bettingHistoryDetail", n).directive("livecsnTable", function () {
            return {
                restrict: "AE",
                scope: !0,
                link: function (e, n, a) {
                    var r = t(n);
                    e.attrPartnerId = a.partnerId, e.attrPartnerKey = a.partnerKey, e.collapseTable = function () {
                        r.find("table").parent().slideToggle(), r.find("span").toggleClass("icon-caretdownthin").toggleClass("icon-caretupthin")
                    }
                },
                templateUrl: "/cdn1101/resource/templates/myaccount/statement/bettinghistory/live/settled-bets.table.tpl.html"
            }
        }).factory("betHistoryService", function () {
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
                    mahjong: "navMahjongRoot",
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
        }), a.$inject = ["betHistoryService"], n.$inject = ["betHistoryService"], i.$inject = ["$scope", "statementService", "myAccountConst", "betHistoryService", "dataService", "$q"], r.$inject = ["$scope", "statementService", "myAccountConst", "betHistoryService", "dataService"]
    }(window, $)
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e) {
            return angular.extend({}, e[0], {
                templateUrl: "/cdn1101/resource/templates/myAccount/accordion.tpl.html"
            })
        }

        function t(e) {
            return angular.extend({}, e[0], {
                templateUrl: "/cdn1101/resource/templates/myAccount/accordionGroup.tpl.html"
            })
        }

        function n(e) {
            return function (t, n, a) {
                if (!angular.isArray(t)) return 0;
                if (angular.isDefined(n)) {
                    for (var r = 0, i = t.length - 1; i >= 0; i--) r = angular.isDefined(a) ? Math.abs(e.add(t[i][n], r)) : e.add(t[i][n], r);
                    return r
                }
                return t.reduce(function (t, n) {
                    return e.add(t, n)
                })
            }
        }

        function a(e) {
            return {
                restrict: "AE",
                scope: {
                    searchFn: "&searchFn",
                    dateRange: "=dateRange",
                    maxDateRange: "=maxDateRange"
                },
                link: function (t, n, a) {
                    t.maxDateRange = angular.isDefined(t.maxDateRange) ? t.maxDateRange : 30, t.getDateRange = e.getDateRange, t.daysFilterUrl = 30 == t.maxDateRange ? "/cdn1101/resource/templates/myaccount/daysFilter.html" : "/cdn1101/resource/templates/myaccount/3monthsFilter.html"
                },
                template: '<div ng-include="daysFilterUrl"></div>'
            }
        }
        angular.module("starApp").directive("dateRangeFilter", function () {
            return {
                restrict: "AE",
                scope: {
                    searchFn: "&searchFn",
                    dateRange: "=dateRange",
                    maxDateRange: "=maxDateRange"
                },
                link: function (e, t, n) {
                    e.validate = function () {
                        var t = new Date(e.dateRange.dateFrom),
                            n = new Date(e.dateRange.dateTo);
                        e.dateRangeForm.$setValidity("rangeValidation", t < n && (n.getTime() - t.getTime()) / a <= e.maxDateRange)
                    };
                    var a = 864e5;
                    e.maxDateRange = angular.isDefined(e.maxDateRange) ? e.maxDateRange : 30
                },
                templateUrl: "/cdn1101/resource/templates/myaccount/dateRangeFilter.html"
            }
        }).directive("daysFilter", a).directive("printButton", function () {
            return {
                restrict: "E",
                link: function (e, t) {
                    $(t).click(function () {
                        window.print()
                    })
                }
            }
        }).directive("datePicker", function () {
            return {
                restrict: "A",
                link: function (e, t, n, a) {
                    e.maxDateRange = angular.isDefined(e.maxDateRange) ? e.maxDateRange : 30;
                    var r = "-" + e.maxDateRange + "d";
                    a.$formatters.push(function (e) {
                        return new Date(e), s.getDate() + "/" + s.getMonth() + "/" + s.getFullYear()
                    }), a.$parsers.push(function (e) {
                        var t = e.split("/");
                        return new Date(parseInt(t[2]), parseInt(t[1]) - 1, parseInt(t[0])).getTime()
                    }), e.datePattern = new RegExp(/^[0-9]*/);
                    var i = $(t);
                    i.ngdatepicker({
                        orientation: "bottom",
                        autoclose: !0,
                        forceParse: !0,
                        startDate: r,
                        endDate: "+2d",
                        format: "dd/mm/yyyy"
                    }), e.$watch(function () {
                        return a.$modelValue
                    }, function (e) {
                        void 0 !== e && i.ngdatepicker("update", new Date(e))
                    }), angular.isDefined(n.default) && i.ngdatepicker("update", new Date(s.getFullYear(), s.getMonth(), s.getDate()).addDays(n.default));
                    var o = Math.ceil((parseInt(e.initDate) - (new Date).getTime()) / 864e5),
                        s = new Date;
                    i.ngdatepicker("update", new Date(s.getFullYear(), s.getMonth(), s.getDate()).addDays(o))
                },
                require: "ngModel",
                scope: {
                    maxDateRange: "=maxDateRange",
                    initDate: "@initDate"
                }
            }
        }).directive("myaccAccordion", e).directive("myaccAccordionGroup", t).directive("statementSelect", function () {
            return {
                restrict: "AE",
                link: function (e, t, n) {
                    for (var a in e.list) e.currentselectvalue === e.list[a].value && (e.currentselectkey = e.list[a].key);
                    e.changeselect = function (t) {
                        e.currentselectvalue = t.value, e.currentselectkey = t.key
                    }
                },
                scope: {
                    currentselectvalue: "=currentValue",
                    list: "=source"
                },
                templateUrl: "/cdn1101/resource/templates/myAccount/statementSelect.tpl.html"
            }
        }).factory("statementService", function () {
            return {
                getDateRange: function (e, t) {
                    if (!angular.isNumber(e)) return e;
                    t = !angular.isDefined(t) || t;
                    var n = new Date,
                        a = new Date(n.getFullYear(), n.getMonth(), n.getDate()),
                        r = t ? a.addDays(1) : a,
                        i = a.addDays(e);
                    return {
                        dateTo: r.valueOf(),
                        dateFrom: i.valueOf()
                    }
                }
            }
        }).filter("sum", n).constant("myAccountConst", {
            myAccountRootApi: "/service/myaccounttapi/"
        }), e.$inject = ["uibAccordionDirective"], t.$inject = ["uibAccordionGroupDirective"], a.$inject = ["statementService"], n.$inject = ["floatCalculator"]
    }()
}, function (e, t) {
    ! function () {
        "use strict";

        function e(e, t, n, a, r, i, o) {
            function s(n) {
                switch (l = n.dateFrom, c = n.dateTo, e.dateRange = n, d) {
                    case "promotions":
                        var a = {
                            token: uv.sessionD.ssid,
                            periodFrom: l,
                            periodTo: c,
                            guId: e.tranHisCtrl.guId
                        };
                        t.fetch("JSONP", gv.domains.aps + "getPromoStatement", a).then(function (t) {
                            e.tranHisCtrl.transModel = t.claimedRecords
                        });
                        break;
                    case "summary":
                        r = {
                            token: uv.sessionD.ssid,
                            jsDateFrom: l,
                            jsDateTo: c,
                            guId: e.tranHisCtrl.guId,
                            aId: uv.sessionD.aId,
                            currencyCode: uv.geod.cc,
                            productIndexs: e.availableProds.map(function (e) {
                                return e.index
                            }),
                            transferPartnerIds: i.getTransferPartnerIds()
                        }, (s = t.fetch("POST", u + "GetSummaryHistory", r)).then(function (t) {
                            e.tranHisCtrl.transModel = t
                        });
                        break;
                    case "deposit":
                    case "withdrawal":
                        var r = {
                                token: uv.sessionD.ssid,
                                jsDateFrom: l,
                                jsDateTo: c,
                                language: gv.lan,
                                guId: e.tranHisCtrl.guId,
                                transactionType: d
                            },
                            s = t.fetch("GET", u + "GetBankingHistory", r);
                        s.then(function (t) {
                            e.tranHisCtrl.transModel = t
                        });
                        break;
                    case "adjustment":
                        var r = {
                                token: uv.sessionD.ssid,
                                jsDateFrom: l,
                                jsDateTo: c,
                                language: gv.lan,
                                guId: e.tranHisCtrl.guId
                            },
                            m = gv.domains.oldStatement,
                            g = {
                                statement: t.fetch("GET", u + "GetAdjustmentHistory", r),
                                oldStatement: angular.isDefined(m) ? t.fetch("GET", m + u + "GetAdjustmentHistory", r) : {}
                            };
                        o.all(g).then(function (t) {
                            e.tranHisCtrl.transModel = m ? t.statement.concat(t.oldStatement) : t.statement
                        });
                        break;
                    case "transfer":
                        var r = {
                                token: uv.sessionD.ssid,
                                jsDateFrom: l,
                                jsDateTo: c,
                                language: gv.lan,
                                guId: e.tranHisCtrl.guId
                            },
                            m = gv.domains.oldStatement,
                            g = {
                                statement: t.fetch("GET", u + "GetTransferHistory", r),
                                oldStatement: angular.isDefined(m) ? t.fetch("GET", m + u + "GetTransferHistory", r) : {}
                            };
                        o.all(g).then(function (t) {
                            e.tranHisCtrl.transModel = m ? t.statement.concat(t.oldStatement) : t.statement
                        })
                }
            }
            var l, c, u = a.myAccountRootApi,
                d = location.pathname.split("/")[5] || "",
                m = getGuid();
            e.dateMaxRange = 30, e.dateRange = n.getDateRange(0), e.tranHisCtrl = {
                    transModel: [],
                    guId: m,
                    pageKey: void 0,
                    getTable: "/cdn1101/resource/templates/myaccount/statement/transactionHistory/{0}.table.tpl.html".format(d),
                    serachByRange: s,
                    cancelWithdraw: function (n) {
                        e.msg = {
                            title: r.instant("txtStatementCancelRequest"),
                            content: r.instant("msgStatementConfirmCancelRequest"),
                            needCancelBtn: !0
                        }, t.dialog(e).result.then(function () {
                            t.fetch("GET", u + "CancelWithdraw", {
                                transactionId: n
                            }).then(function (n) {
                                switch (n) {
                                    case "000":
                                        s(e.dateRange);
                                        break;
                                    case "101":
                                        e.msg.content = r.instant("msgWithDrawalCancelFail101"), t.dialog(e);
                                        break;
                                    default:
                                        e.msg.content = r.instant("msgSecurePassGeneralError"), t.dialog(e)
                                }
                            })
                        })
                    },
                    getTransferKey: i.getTransferKey,
                    getTxnTypeLink: function (e) {
                        var t;
                        switch (e = e.toLowerCase()) {
                            case "casino":
                            case "live":
                                t = "/" + gv.lan + "/my-account/statement/betting-history/" + e;
                                break;
                            case "fromsports":
                            case "fromcasino":
                            case "frombingo":
                            case "fromnetent":
                            case "fromwallet":
                            case "from188betgames":
                                t = "/" + gv.lan + "/my-account/statement/transaction-history/transfer";
                                break;
                            case "deposit":
                            case "withdrawal":
                            case "adjustment":
                                t = "/" + gv.lan + "/my-account/statement/transaction-history/" + e;
                                break;
                            default:
                                t = "/" + gv.lan + "/my-account/statement/betting-history/{0}/settled-bets".format(e)
                        }
                        return t
                    }
                },
                function () {
                    switch (d) {
                        case "deposit":
                            e.tranHisCtrl.pageKey = "navStatementDeposit", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [{
                                key: "txtCommonAll",
                                value: ""
                            }, {
                                key: "txtStatementPending",
                                value: 1
                            }, {
                                key: "txtStatementProcessing",
                                value: 2
                            }, {
                                key: "txtStatementApproved",
                                value: 3
                            }, {
                                key: "txtStatementRejected",
                                value: 4
                            }], s(e.dateRange);
                            break;
                        case "withdrawal":
                            e.tranHisCtrl.pageKey = "navStatementWithdrawal", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [{
                                key: "txtCommonAll",
                                value: ""
                            }, {
                                key: "txtStatementPending",
                                value: 1
                            }, {
                                key: "txtStatementProcessing",
                                value: 2
                            }, {
                                key: "txtStatementApproved",
                                value: 3
                            }, {
                                key: "txtStatementRejected",
                                value: 4
                            }], s(e.dateRange);
                            break;
                        case "transfer":
                            e.tranHisCtrl.pageKey = "navStatementTransfer", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [{
                                key: "txtCommonAll",
                                value: ""
                            }, {
                                key: "txtTransferStatusSuccess",
                                value: 0
                            }, {
                                key: "txtTransferStatusFailed",
                                value: 98
                            }], s(e.dateRange);
                            break;
                        case "summary":
                            e.tranHisCtrl.pageKey = "txtStatementSummary", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [], s(e.dateRange);
                            break;
                        case "agent":
                            e.tranHisCtrl.pageKey = "txtStatementAgent", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [], s(e.dateRange);
                            break;
                        case "member":
                            e.tranHisCtrl.pageKey = "txtStatementMember", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [], s(e.dateRange);
                            break;
                        case "adjustment":
                            e.tranHisCtrl.pageKey = "navStatementAdjustment", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [{
                                key: "txtCommonAll",
                                value: ""
                            }, {
                                key: "txtStatementApproved",
                                value: "APPROVED"
                            }, {
                                key: "txtStatementPending",
                                value: "PENDING"
                            }], s(e.dateRange);
                            break;
                        case "promotions":
                            e.tranHisCtrl.pageKey = "navPromoRoot", e.tranHisCtrl.statusFilter = "", e.tranHisCtrl.selectFilterList = [], e.dateRange = n.getDateRange(-6), e.dateMaxRange = 90, s(e.dateRange)
                    }
                }()
        }
        angular.module("starApp").controller("transHistoryCtrl", e), e.$inject = ["$scope", "dataService", "statementService", "myAccountConst", "$translate", "transferService", "$q"]
    }()
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e, t, n, a, r, i) {
            t.compose = {
                cancel: function () {
                    n.dismiss("cancel")
                },
                send: function (o) {
                    var s = r.getDefaultCategoryByLan(gv.lan),
                        l = {
                            subject: o.subject,
                            recipient: s.senderUri,
                            catId: s.catId,
                            body: o.body.split("\n")
                        };
                    a.send(l).then(function (a) {
                        a ? (t.msg = {
                            title: i.instant("navInbox"),
                            content: i.instant("msgInboxSendSuccess")
                        }, e.dialog(t).result.then(function () {
                            n.close()
                        })) : (t.msg = {
                            title: i.instant("navInbox"),
                            content: i.instant("msgInboxSendFail")
                        }, e.dialog(t))
                    })
                },
                attach: function (e) {
                    t.compose.attachments.push(e)
                },
                attachments: []
            }
        }
        angular.module("starApp").controller("composeCtrl", n), n.$inject = ["dataService", "$scope", "$uibModalInstance", "msgService", "categoryService", "$translate"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e) {
            return function (t) {
                return e.trustAsHtml(t)
            }
        }

        function a(e) {
            return function (t, n) {
                if (!angular.isArray(t)) return t;
                var a = [],
                    r = t.map(function (e) {
                        return e[n]
                    }),
                    i = e("unique")(r);
                return t.forEach(function (e) {
                    var t = e[n],
                        r = i.indexOf(t);
                    null !== t && -1 != r ? (i.splice(r, 1), a.push(e)) : null === t && a.push(e)
                }), a
            }
        }

        function r(e) {
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
                        a = n.length;
                    return 0 === a ? t = {
                        senderUri: "mailto:188bet@188bet.com"
                    } : 1 === a ? t = n[0] : a > 1 && n.forEach(function (n) {
                        n.lan === e && (t = n)
                    }), t
                }
            }
        }
        angular.module("starApp").directive("readMessage", [function () {
            return {
                templateUrl: "/cdn1101/resource/templates/inbox/messageReading.tpl.html"
            }
        }]).directive("listMessage", [function () {
            return {
                templateUrl: "/cdn1101/resource/templates/inbox/messageListing.tpl.html"
            }
        }]).directive("announcementListing", [function () {
            return {
                templateUrl: "/cdn1101/resource/templates/inbox/announcementListing.tpl.html"
            }
        }]).filter("htmlToPlaintext", function () {
            return function (e) {
                return e ? String(e).replace(/<[^>]+>/gm, "") : ""
            }
        }).filter("trustAsHtml", n).filter("distinctNotNull", a).filter("dataInPage", function () {
            return function (e, t, n) {
                if (angular.isArray(e)) {
                    var a = (n - 1) * t;
                    return e.length < a ? [] : e.slice(a, a + t)
                }
                return e
            }
        }).factory("categoryService", r).constant("inboxConst", {
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
        }), n.$inject = ["$sce"], a.$inject = ["$filter"], r.$inject = ["$translate"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(e, t, n, a, r, i, o, s, l) {
            e.inbox = {
                    state: "listing",
                    dateFormat: t.dateFormat,
                    openComposeModal: function () {
                        n.dialog(null, {
                            templateUrl: "/cdn1101/resource/templates/modal/inbox/compose.tpl.html",
                            controller: "composeCtrl",
                            items: [],
                            animation: !0
                        })
                    },
                    reply: function (t, o) {
                        var s = function (e) {
                                return e.filter(function (e) {
                                    return e.sender != r.memberUri
                                })
                            }(t).slice(0)[0],
                            l = {
                                subject: s.subject,
                                refId: null == s.refId ? s.id : s.refId,
                                sender: r.memberUri,
                                catId: s.catId,
                                recipient: s.sender,
                                body: o.body.split("\n"),
                                contentType: "text/plain"
                            };
                        r.send(l).then(function (c) {
                            c ? (o.body = "", e.msg = {
                                title: a.instant("navInbox"),
                                content: a.instant("msgInboxSendSuccess")
                            }, t.unshift(l), n.dialog(e), r.markAsRequest([s], i.replied)) : (e.msg = {
                                title: a.instant("navInbox"),
                                content: a.instant("msgInboxSendFail")
                            }, n.dialog(e))
                        })
                    },
                    getCateName: l.getCateName
                }, e.channel = {}, e.msgStatus = i, e.channelType = o, e.msgService = r, e.getCurrentChannel = function () {
                    e.channel = r.getCurrentChannel()
                },
                function () {
                    var t = s.location.pathname.split("/").pop();
                    for (var n in o) {
                        var a = o[n];
                        if (a.url === t) {
                            r.initChannel(a), e.channel = r.getCurrentChannel();
                            break
                        }
                    }
                }()
        }
        angular.module("starApp").controller("inboxCtrl", n), n.$inject = ["$scope", "inboxConst", "dataService", "$translate", "msgService", "msgStatus", "channelType", "$window", "categoryService"]
    }(window, $)
}, function (e, t) {
    ! function (e, t) {
        "use strict";

        function n(t, n, a, r, i, o, s, l) {
            function c(e, n, r) {
                var i = e === a.announcement,
                    o = {
                        channel: e.enumValue,
                        pageIndex: n,
                        pageSize: r,
                        guId: h
                    };
                (i ? u() : t.fetch("GET", p + "getSummary", o)).then(function (e) {
                    var t = e.PageIndex === e.TotalPages;
                    e.PageSize = r, e.startIndex = (e.PageIndex - 1) * e.PageSize + 1, e.endIndex = t ? e.TotalCount : e.startIndex + e.PageSize - 1, f.pageList = e
                })
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
                f.currentIndex = n.indexOf(e), e.status === r.unRead && m([e], r.read, 1);
                var a = {
                    refId: null == e.refId ? e.id : e.refId,
                    channelType: f.channelType.enumValue,
                    pageIndex: 1,
                    pageSize: 100,
                    guId: h
                };
                t.fetch("GET", p + "getMsg", a).then(function (e) {
                    f.currentMsg = e.Items
                })
            }

            function m(e, n, r) {
                if (f.channelType.hasStatus && 0 !== e.length) {
                    ! function (e) {
                        if (angular.isNumber(e)) switch (f.channelType) {
                            case a.inbox:
                                i.msgCounter.inbox -= e, i.msgCounter.totalCount -= e;
                                break;
                            case a.notifications:
                                i.msgCounter.notifi -= e, i.msgCounter.totalCount -= e;
                                break;
                            case a.announcement:
                                i.msgCounter.announcement -= e
                        }
                    }(r);
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
                        o.log("success mark as")
                    }, function (e) {
                        o.log(e)
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
                    }(t), f.channelType = t, f.currentIndex = 0, f.currentMsg = [], c(t, 1, 20))
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
                    for (var e = [], t = 0, n = f.pageList.Items, a = n.length; a--;) n[a].isChecked && (n[a].status === r.unRead && t++, e = e.concat(n.splice(a, 1)));
                    f.pageList.TotalCount -= e.length, m(e, r.archive, t)
                },
                markAsRead: function () {
                    var e = [];
                    f.pageList.Items.forEach(function (t, n) {
                        t.isChecked && t.status === r.unRead && e.push(t)
                    }), m(e, r.read, e.length)
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
                        a = f.currentIndex + e; - 1 === a ? a = n - 1 : a === n && (a = 0), d(t[a])
                },
                deleteCurrent: function () {
                    f.pageList.TotalCount -= 1;
                    var e = f.pageList.Items.splice(f.currentIndex, 1),
                        t = 0;
                    e[0].status === r.unRead && t++, m(e, r.archive, t)
                },
                nextPage: function (e) {
                    c(f.channelType, f.pageList.PageIndex + e, 20)
                },
                receiveMsg: function (e) {
                    f.channelType && f.channelType.enumValue === e && c(f.channelType, 1, 20)
                },
                getMsgCounter: function () {
                    uv.sessionD.login && l.all({
                        msgCounter: t.fetch("GET", "/service/MsgHubApi/GetMsgCounter"),
                        announcementPageList: u()
                    }).then(function (e) {
                        i.msgCounter = e.msgCounter;
                        var t = 0;
                        e.announcementPageList.Items.forEach(function (e) {
                            e.status === r.unRead && -1 === e.sender.indexOf("pos=public") && t++
                        }), i.msgCounter.announcement = t, i.msgCounter.totalCount = i.msgCounter.inbox + i.msgCounter.notifi, i.$emit("getMsgCounter")
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
    function n(e, t, n, a, r, i) {
        return function () {
            if (uv.sessionD.login && $.connection && $.connection.hub && $.connection.signalRHub && ! function () {
                    try {
                        return window.self !== window.top
                    } catch (e) {
                        return !0
                    }
                }()) {
                $.connection.hub.url = gv.domains.rtms + "/signalr/hubs";
                var i = $.connection.hub,
                    o = $.connection.signalRHub;
                i.qs = {
                    token: uv.sessionD.ssid,
                    channelId: gv.channelId
                }, i.start().done(function () {}).fail(function (e) {}), o.client.kickout = function (n) {
                    if (n) {
                        var a = e.$new(),
                            i = isNaN(n) ? "msgRG" : "msgLoginError";
                        t.fetch("POST", "/service/userapi/logout").then(function (e) {
                            return a.msg = {
                                title: r.instant("txtComNotice"),
                                content: r.instant(i + n)
                            }, t.dialog(a).result.finally(function () {
                                localStorage.removeItem("recommendDomain"), window.location.href = e.redirectUrl
                            })
                        })
                    }
                }, o.client.receiveMsg = function (i, o) {
                    switch (o) {
                        case n.inbox.enumValue:
                            e.msgCounter.inbox += 1, e.msgCounter.totalCount += 1, a.receiveMsg(o), r("msgInboxHasMail").then(function (e) {
                                t.mi({
                                    body: e.format(1)
                                })
                            });
                            break;
                        case n.notifications.enumValue:
                            e.msgCounter.notifi += 1, e.msgCounter.totalCount += 1, a.receiveMsg(o), r("msgInboxHasNotification").then(function (e) {
                                t.mi({
                                    body: e.format(1)
                                })
                            });
                            break;
                        case n.Mi.enumValue:
                            e.$apply(function () {
                                t.mi({
                                    body: i.body.join(" ")
                                })
                            })
                    }
                }
            }
        }
    }
    angular.module("starApp").factory("signalRHub", n), n.$inject = ["$rootScope", "dataService", "channelType", "msgService", "$translate", "userService"]
}, function (e, t) {
    ! function (e) {
        "use strict";

        function t(e) {
            var t = !1;
            window.name = "liveChat", liveagent.init(Liveagent_Init_Url, Deployment_Id, Org_Id), liveagent.addButtonEventHandler(Button_Id, function (n) {
                n == liveagent.BUTTON_EVENT.BUTTON_AVAILABLE ? t || (t = !0, location.href = "/{0}/pre-chat?endpoint={1}&token={2}".format(gv.lan, liveChat_Url, getFromSearch("token"))) : n == liveagent.BUTTON_EVENT.BUTTON_UNAVAILABLE && e.$apply(function () {
                    e.agentOffline = !0
                })
            });
            var n = document.createElement("a");
            liveagent.showWhenOffline(Button_Id, n), liveagent.showWhenOnline(Button_Id, n)
        }
        angular.module("starApp").controller("liveChatCtrl", t), t.$inject = ["$scope"]
    }($)
}, function (e, t) {
    ! function (e) {
        "use strict";

        function t(e, t, n) {
            var a = getGuid();
            e.guId = a, e.improvementCheck = {}, e.survey = {
                ChatKey__c: chatKey
            }, e.insertSurvey = function (r) {
                r.guId = a, t.fetch("POST", "/service/livechatApi/insertSurvey", r).then(function (a) {
                    a && a.success && (e.msg = {
                        title: n.instant("txtComNotice"),
                        content: n.instant("txtHelpLiveChatThankYou")
                    }, t.dialog(e).result.then(function () {
                        setTimeout(function () {
                            window.close()
                        }, 2e3)
                    }))
                })
            }, e.$watchCollection("improvementCheck", function () {
                e.survey.ImprovementAreaM__c = "", angular.forEach(e.improvementCheck, function (t, n) {
                    angular.isDefined(t) && (e.survey.ImprovementAreaM__c += t + ";")
                })
            })
        }
        angular.module("starApp").controller("postChatCtrl", t), t.$inject = ["$scope", "dataService", "$translate"]
    }($)
}, function (e, t) {
    ! function (e) {
        "use strict";

        function t(t, n, a) {
            var r = getGuid(),
                i = memberData.memberCode.length > 0,
                o = decodeURIComponent(getFromSearch("endpoint"));
            t.guId = r, t.requireFullName = -1 !== ["china", "vietnam", "indonesia"].indexOf(uv.pd.r.toLowerCase()), t.livechatLanguage = {
                "en-gb": "en_US",
                "zh-cn": "zh_CN",
                "vi-vn": "vi",
                "th-th": "th",
                "id-id": "in",
                "km-kh": "khmer",
                "ja-jp": "ja",
                "pt-br": "pt_BR",
                "ko-kr": "ko"
            }[gv.lan], t.isLoggedInMember = t.isMember = i, t.startMemberChat = function (i) {
                function s() {
                    e("#visitorName").after('<input type="hidden" name="liveagent.prechat.findorcreate.map:Account" value="Email__c,contactEmail;LoginID__c,accountMemberCode" /><input type="hidden" name="liveagent.prechat.findorcreate.map.doFind:Account" value="Email__c,true;LoginID__c,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.map.isExactMatch:Account" value="Email__c,true;LoginID__c,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.map.doCreate:Account" value="Email__c,true;LoginID__c,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.saveToTranscript:Account" value="Account" /><input type="hidden" name="liveagent.prechat.findorcreate.showOnCreate:Account" value="true" /><input type="hidden" name="liveagent.prechat:caseOrigin" value="Live Chat" /><input type="hidden" name="liveagent.prechat.findorcreate.map:Case" value="Origin,caseOrigin;Subject,caseSubject;" /><input type="hidden" name="liveagent.prechat.findorcreate.map.doCreate:Case" value="Origin,true;Subject,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.saveToTranscript:Case" value="Case" /><input type="hidden" name="liveagent.prechat.findorcreate.showOnCreate:Case" value="true" /><input type= "hidden" name="liveagent.prechat.findorcreate.linkToEntity:Account" value="Case,AccountId" />');
                    var t = e("#memberForm");
                    t.attr("action", o), t.submit()
                }
                t.isLoggedInMember ? s() : n.fetch("GET", "/service/livechatApi/validatemember", {
                    memberCode: t.sfPrefix + i.memberCode,
                    email: i.email || "",
                    guId: r
                }).then(function (e) {
                    e.records && e.records[0] && e.records[0].LoginID__c ? s() : (t.msg = {
                        title: a.instant("txtComNotice"),
                        content: a.instant("msgHelpLiveChatInvalidMemberCode")
                    }, n.dialog(t))
                })
            }, t.startNonMemberChat = function () {
                e("#visitorName").after('<input type="hidden" name="liveagent.prechat.query:accountEmail" value="Account,Account.Email__c" /><input type="hidden" name="liveagent.prechat:caseOrigin" value="Live Chat" /><input type="hidden" name="liveagent.prechat.findorcreate.map:Case" value="Origin,caseOrigin;Subject,caseSubject;" /><input type="hidden" name="liveagent.prechat.findorcreate.map.doCreate:Case" value="Origin,true;Subject,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.saveToTranscript:Case" value="Case" /><input type="hidden" name="liveagent.prechat.findorcreate.showOnCreate:Case" value="true" /><input type="hidden" name="liveagent.prechat.findorcreate.map:Account" value="FirstName,accountFirstName;LastName,accountLastName;Email__c,accountEmail;" /><input type="hidden" name="liveagent.prechat.findorcreate.map.doFind:Account" value="Email__c,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.map.isExactMatch:Account" value="Email__c,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.map.doCreate:Account" value="FirstName,true;LastName,true;Email__c,true;" /><input type="hidden" name="liveagent.prechat.findorcreate.saveToTranscript:Account" value="Account" /><input type="hidden" name="liveagent.prechat.findorcreate.showOnCreate:Account" value="true" /><input type= "hidden" name="liveagent.prechat.findorcreate.linkToEntity:Account" value="Case,AccountId" />');
                var t = e("#nonMemberForm");
                t.attr("action", o), t.submit()
            }, t.memberData = memberData, t.sfPrefix = "UK" === uv.pd.r ? "*" : ""
        }
        angular.module("starApp").controller("preChatCtrl", t), t.$inject = ["$scope", "dataService", "$translate"]
    }($)
}]));