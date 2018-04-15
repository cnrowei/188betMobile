var app = angular.module("app", ["componentsModule", "counterModule", "reportModule"]);
app.controller("resultCtrl", ["$scope", "$counterService", "$dialog", function (n, t, i) {
    n.init = function (r) {
        !r || t.getGameResults(r.product, r.counterId, r.drawNo, r.date).success(function (t) {
            if (t.isSuccess) {
                if (t.data.gameResults.length == 1) {
                    if (n.product = r.product, n.wagerNo = r.wagerNo, n.result = t.data.gameResults[0], n.product == "lotto") {
                        var e = 0,
                            u = n.result.resultBalls[0],
                            f = n.result.resultBalls[0];
                        n.result.resultBalls.forEach(function (t, i) {
                            t >= 0 ? (n["ball_" + (i + 1)] = t, i < 3 && (e += t, u = u < t ? u : t, f = f > t ? f : t)) : n["ball_" + (i + 1)] = null
                        });
                        n.sum = e;
                        n.span = f - u
                    }
                    n.detail = n.getResultDetail(n.result.resultBalls);
                    n.displayResult = !0
                }
            } else i.show(R.Text.Error, t.msg)
        })
    };
    n.getResultDetail = function (t) {
        var i = {},
            u, f;
        if (t.length == 0) {
            i.total = "";
            i.bs = "";
            i.oe = "";
            i.ud = "";
            i.oses = "";
            i.ele = "";
            return
        }
        var r = 0,
            e = 0,
            o = 0;
        for (u = 0; u < t.length; u++) f = t[u], r += f, f <= 40 && e++, f % 2 && o++;
        return i.total = r, i.bs = r == 810 ? "t" : r > 810 ? "b" : "s", i.oe = r % 2 ? "o" : "e", i.ud = e == 10 ? "t" : e > 10 ? "u" : "d", i.oses = o == 10 ? "t" : o > 10 ? "os" : "es", i.ele = n.getElement(r), i
    };
    n.getElement = function (n) {
        return n <= 695 ? "g" : n <= 763 ? "wo" : n <= 855 ? "wa" : n <= 923 ? "f" : "ea"
    };
    n.close = function () {
        n.displayResult = !1
    };
    n.$on("showResult", function (r, u) {
        if (n.displayResult && u.wagerNo == n.wagerNo) {
            n.displayResult = !1;
            return
        }
        t.getGameResults(n.product, u.counterId, u.drawNo, u.date).success(function (t) {
            if (t.isSuccess) {
                if (t.data.gameResults.length == 1) {
                    if (n.product = u.product, n.wagerNo = u.wagerNo, n.position = u.position, n.result = t.data.gameResults[0], n.product == "lotto") {
                        var e = 0,
                            r = n.result.resultBalls[0],
                            f = n.result.resultBalls[0];
                        n.result.resultBalls.forEach(function (t, i) {
                            t >= 0 ? (n["ball_" + (i + 1)] = t, i < 3 && (e += t, r = r < t ? r : t, f = f > t ? f : t)) : n["ball_" + (i + 1)] = null
                        });
                        n.sum = e;
                        n.span = f - r
                    }
                    n.detail = n.getResultDetail(n.result.resultBalls);
                    n.displayResult = !0
                }
            } else i.show(R.Text.Error, t.msg)
        })
    })
}]).controller("statementCtrl", ["$scope", "$window", "$location", "$filter", "$reportService", "$dialog", "$util", function (n, t, i, r, u, f) {
    n.init = function (t) {
        n.product = t.Product;
        n.displayResult = !1;
        n.wagerList = [];
        u.getStatementDetailsByCriteria(t.Product, t).success(function (t) {
            t.isSuccess ? n.wagerList = t.data : f.show(R.Text.Error, t.msg)
        })
    };
    n.showResult = function (t, i, r) {
        var u = {
            X: r ? 0 : t.target.offsetLeft + t.target.offsetParent.offsetLeft - 365,
            Y: t.target.offsetTop + t.target.offsetParent.offsetTop - 17
        };
        n.$broadcast("showResult", {
            product: n.product,
            wagerNo: i.wagerNo,
            counterId: i.bets[0].counterId,
            drawNo: i.bets[0].drawNo,
            position: u,
            date: i.createTime
        })
    }
}]).filter("countDic", function () {
    return function (n, t) {
        var i = 0,
            r;
        if (n)
            for (r in n) n[r][t] && i++;
        return i
    }
})