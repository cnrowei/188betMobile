package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"

	"./handler"
	"./helper"
	"github.com/gin-gonic/gin"
)

func main() {
	handler.SessionMgr = helper.NewSessionMgr("188betCookie", 3600)

	gin.SetMode(gin.DebugMode)

	router := gin.Default()
	router.Delims("{[{", "}]}")
	router.Static("/Content", "./content")
	router.Static("/contents", "./contents")
	router.Static("/bundles", "./bundles")
	router.Static("/signalrnet", "./signalrnet")
	router.Static("/cdn1101", "./cdn1101")
	router.Static("/cdn1103", "./cdn1103")
	//router.LoadHTMLFiles("templates/*")
	router.LoadHTMLGlob("templates/*")
	//router.LoadHTMLGlob("templates/myaccount/*")

	router.GET("/zh-cn", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.tpl.html", gin.H{
			"title": "login",
		})
	})

	router.GET("/zh-cn/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.tpl.html", nil)
	})

	router.GET("/zh-cn/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.tpl.html", gin.H{
			"title": "login",
		})
	})

	router.GET("/service/msghubapi/getAnnouncement", func(c *gin.Context) {
		data := readFile1("data/getAnnouncement.json")
		c.Writer.WriteString(data)
	})

	router.POST("/service/userapi/login", handler.Login)
	router.POST("/postlogin", handler.Postlogin)
	router.POST("/service/healthapi/needrefresh", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"kickoff":     false,
			"needRefresh": false,
			"token":       "laSWXHuuhMVOcLcXxlNrTA..",
		})
	})

	//异步判断登录情况
	router.GET("/api/Sync", func(c *gin.Context) {
		formate := "2006-01-02T15:04:05+08:00"
		now := time.Now().Format(formate)

		if handler.HasSessionUser(c) {
			c.JSON(http.StatusOK, gin.H{"isSuccess": true, "data": gin.H{"serverTime": now}})
		} else {
			c.JSON(http.StatusOK, gin.H{"isSuccess": true, "data": gin.H{"serverTime": now, "invalid": true}})
		}
	})

	///api/Member/Chips
	router.GET("/api/Member/Chips", handler.Chips)
	///api/Member/Chips
	router.PUT("/api/Member/Chips", handler.PutChips)

	///余额
	router.GET("/api/Member/Balance", handler.Balance)
	//彩票列表
	router.GET("/api/lotto/Mobile", handler.Mobile)
	//Counter 彩票到期，单个服务
	router.GET("/api/lotto/Counter/:number", handler.CounterID)
	//开奖结果
	router.GET("/api/lotto/Counter/:number/Trends", handler.Trends)

	//确认下注
	router.POST("/api/:name/PlaceBet", handler.PlaceBet)
	router.POST("/api/:name/BetSlip", func(c *gin.Context) {})

	router.GET("/api/report/Statement", handler.Statement())
	router.GET("/api/report/lotto/Statement", handler.Statement())
	///api/Report/lotto/OpenBets?pageNum=1&pageSize=10
	router.GET("/api/report/lotto/OpenBets", handler.OpenBets())

	//判断跳转
	router.GET("/zh-cn/lotto/lobby", func(c *gin.Context) {
		partnerId := c.Query("partnerId")
		if partnerId == "10" {
			c.Redirect(http.StatusMovedPermanently, "/zh-cn/keno/main-lobby")
		}

		if partnerId == "18" {
			c.Redirect(http.StatusMovedPermanently, "/zh-cn/lotto/main-lobby")
		}
	})

	router.GET("/service/MsgHubApi/GetMsgCounter", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"inbox":  0,
			"notifi": 0,
		})
	})

	//API
	router.GET("/api/service/GetContent", func(c *gin.Context) {
		c.Writer.WriteString(`angular.callbacks._0({"resultType":0,"content":"\r\n\r\n\r\n<div class=\"col-lg-12  {{rowClass}}\">\r\n<div class=\"col-lg-12\" lotto-ilotto ></div>\r\n\r\n</div>\r\n<!--col-lg--->","redirectUrl":null,"message":null});`)
	})

	router.GET("/api/Rule/Lotto/Single", func(c *gin.Context) {
		data := readFile1("data/Single.json")
		c.Writer.WriteString(data)
	})

	router.GET("/signalr/negotiate", func(c *gin.Context) {})

	router.POST("/signalr/poll", func(c *gin.Context) {})

	router.GET("/api/Rule/lotto", func(c *gin.Context) {
		data := readFile1("data/lotto.json")
		c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
		c.Writer.WriteString(data)
	})

	router.GET("/api/Announcements", func(c *gin.Context) {
		data := readFile1("data/Announcements.json")
		c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
		c.Writer.WriteString(data)
	})
	///api/lotto/Counter/320/GameResults?drawNo=69&date=2018-04-07&pageNum=1&pageSize=50
	router.GET("/api/lotto/Counter/:number/GameResults", handler.GameResults)
	router.POST("/service/myaccounttapi/GetSummaryHistory", handler.GetSummaryHistory)
	router.GET("/service/myaccounttapi/GetSettleBet", handler.GetSettleBet)
	router.GET("/service/myaccounttapi/GetUnSettleBet", handler.GetSettleBet)

	router.GET("/zh-cn/integrate/result", func(c *gin.Context) {
		c.HTML(http.StatusOK, "result.tpl.html", gin.H{
			"title": "用户管理",
		})
	})

	//需要登录的页面
	router.Use(handler.SessionMiddleware())
	{
		//WEB
		router.GET("/zh-cn/my-account/statement/transaction-history/summary", GinHTML("summary.tpl.html"))
		router.GET("/zh-cn/my-account/statement/betting-history/:name/:bet", GinHTML("settled-bets.tpl.html"))
		//router.GET("/zh-cn/my-account/statement/betting-history/:name/unsettled-bets", GinHTML("settled-bets.tpl.html"))
		router.GET("/zh-cn/my-account/statement/member-manage/agent", GinHTML("member-agent.tpl.html"))
		router.GET("/zh-cn/my-account/statement/member-manage/member", GinHTML("member-agent.tpl.html"))

		//彩票首页
		router.GET("/zh-cn/lotto", func(c *gin.Context) {
			c.HTML(http.StatusOK, "lotto.tpl.html", gin.H{
				"title": "lotto",
			})
		})

		//列表
		router.GET("/zh-cn/lotto/main-lobby", func(c *gin.Context) {
			formate := "2006/01/02 15:04:05"
			formate2 := "2006-01-02T15:04:05+08:00"

			uinfo := handler.GetSessionUsername(c)
			if uinfo != nil {
				c.HTML(http.StatusOK, "main-lobby.tpl.html", gin.H{
					"lpb":        time.Now().Format(formate),
					"serverTime": time.Now().Format(formate2),
					"ln":         uinfo.Username,
					"balance":    uinfo.Balance,
				})
			}
		})

		//下注页面
		router.GET("/zh-cn/lotto/counter/:id/:counterType", func(c *gin.Context) {
			formate := "2006/01/02 15:04:05"
			formate2 := "2006-01-02T15:04:05+08:00"

			uinfo := handler.GetSessionUsername(c)
			if uinfo != nil {
				c.HTML(http.StatusOK, "counter.tpl.html", gin.H{
					"id":         c.Param("id"),
					"lpb":        time.Now().Format(formate),
					"serverTime": time.Now().Format(formate2),
					"ln":         uinfo.Username,
					"balance":    uinfo.Balance,
				})
			}
		})

		//下注状态
		router.GET("/zh-cn/report/OpenBets", func(c *gin.Context) {
			c.HTML(http.StatusOK, "openbets.tpl.html", nil)
		})

		//账户历史
		router.GET("/zh-cn/report/Statement", func(c *gin.Context) {
			c.HTML(http.StatusOK, "statement.tpl.html", nil)
		})

		//开奖结果
		router.GET("/zh-cn/report/results", func(c *gin.Context) {
			c.HTML(http.StatusOK, "results.tpl.html", nil)
		})

		//公告栏
		router.GET("/zh-cn/announcements", func(c *gin.Context) {
			c.HTML(http.StatusOK, "announcements.tpl.html", nil)
		})

		//设定
		router.GET("/zh-cn/home/settings", func(c *gin.Context) {
			c.HTML(http.StatusOK, "settings.tpl.html", nil)
		})

		//规则
		router.GET("/zh-cn/rules", func(c *gin.Context) {
			c.HTML(http.StatusOK, "rules.tpl.html", nil)
		})

	}

	router.Run(":8188")
}

//中间件方法全局
func GinHTML(htmlname string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.HTML(http.StatusOK, htmlname, gin.H{
			"title":          "摘要",
			"prods":          rep(string(LoadJson("content/Json/prods.json"))),
			"generals":       rep(string(LoadJson("content/Json/generals.json"))),
			"domains":        rep(string(LoadJson("content/Json/domains.json"))),
			"regs":           rep(string(LoadJson("content/Json/regs.json"))),
			"cooperativeSet": rep(string(LoadJson("content/Json/cooperativeSet.json"))),
			"emails":         rep(string(LoadJson("content/Json/emails.json"))),
			"modules":        rep(string(LoadJson("content/Json/modules.json"))),
			"lowBalance":     rep(string(LoadJson("content/Json/lowBalance.json"))),
		})
	}
}

func rep(str string) string {
	str = strings.Replace(str, " ", "", -1)
	str = strings.Replace(str, "\n", "", -1)
	str = strings.Replace(str, "\x22", `"`, -1)
	return str
}

func str(v interface{}) string {
	return fmt.Sprintf("%c", v)
}

func typeof(v interface{}) string {
	return fmt.Sprintf("%T", v)
}

func readFile1(path string) string {
	fi, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	fd, err := ioutil.ReadAll(fi)
	return string(fd)

}

func LoadJson(filename string) []byte {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil
	} else {
		return []byte(data)
	}
}
