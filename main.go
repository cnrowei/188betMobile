package main

import (
	"io/ioutil"
	"net/http"
	"os"
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

	//需要登录的页面
	router.Use(handler.SessionMiddleware)

	//彩票首页
	router.GET("/zh-cn/lotto", func(c *gin.Context) {
		c.HTML(http.StatusOK, "lotto.tpl.html", gin.H{
			"title": "lotto",
		})
	})

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

	router.GET("/zh-cn/my-account/statement/transaction-history/summary", func(c *gin.Context) {
		c.HTML(http.StatusOK, "summary.tpl.html", gin.H{
			"title": "摘要",
		})
	})

	router.GET("/zh-cn/my-account/statement/betting-history/lotto/settled-bets", func(c *gin.Context) {
		c.HTML(http.StatusOK, "settled-bets.tpl.html", gin.H{
			"title": "彩票已结算投注",
		})
	})

	router.GET("/zh-cn/my-account/statement/betting-history/lotto/unsettled-bets", func(c *gin.Context) {
		c.HTML(http.StatusOK, "settled-bets.tpl.html", gin.H{
			"title": "彩票未结算投注",
		})
	})

	router.GET("/zh-cn/my-account/statement/member-manage/agent", func(c *gin.Context) {
		c.HTML(http.StatusOK, "member-agent.tpl.html", gin.H{
			"title": "彩票未结算投注",
		})
	})

	router.GET("/zh-cn/my-account/statement/member-manage/member", func(c *gin.Context) {
		c.HTML(http.StatusOK, "member-agent.tpl.html", gin.H{
			"title": "用户管理",
		})
	})

	router.GET("/zh-cn/integrate/result", func(c *gin.Context) {
		c.HTML(http.StatusOK, "result.tpl.html", gin.H{
			"title": "用户管理",
		})
	})

	//列表
	router.GET("/zh-cn/lotto/main-lobby", func(c *gin.Context) {
		formate := "2006/01/02 15:04:05"
		formate2 := "2006-01-02T15:04:05+08:00"

		uinfo := handler.GetSessionUsername(c)

		c.HTML(http.StatusOK, "main-lobby.tpl.html", gin.H{
			"lpb":        time.Now().Format(formate),
			"serverTime": time.Now().Format(formate2),
			"ln":         uinfo.Username,
			"balance":    uinfo.Balance,
		})
	})

	//下注页面
	router.GET("/zh-cn/lotto/counter/:id/:counterType", func(c *gin.Context) {
		formate := "2006/01/02 15:04:05"
		formate2 := "2006-01-02T15:04:05+08:00"
		uinfo := handler.GetSessionUsername(c)

		c.HTML(http.StatusOK, "main-lobby.tpl.html", gin.H{
			"lpb":        time.Now().Format(formate),
			"serverTime": time.Now().Format(formate2),
			"ln":         uinfo.Username,
			"balance":    uinfo.Balance,
		})
	})

	//下注状态
	router.GET("/zh-cn/report/OpenBets", func(c *gin.Context) {
		c.HTML(http.StatusOK, "0penbets.tpl.html", nil)
	})

	//账户历史
	router.GET("/zh-cn/report/statement", func(c *gin.Context) {
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

	///service

	router.GET("/service/myaccounttapi/GetSettleBet", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/GETSETTLEBET.JSON")
		c.Writer.WriteString(xxxjson)
	})

	router.GET("/service/MsgHubApi/GetMsgCounter", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"inbox":  0,
			"notifi": 0,
		})
	})

	router.GET("/service/msghubapi/getAnnouncement", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/getAnnouncement.json")
		c.Writer.WriteString(xxxjson)
	})

	//API
	router.GET("/api/service/GetContent", func(c *gin.Context) {
		c.Writer.WriteString(`angular.callbacks._0({"resultType":0,"content":"\r\n\r\n\r\n<div class=\"col-lg-12  {{rowClass}}\">\r\n<div class=\"col-lg-12\" lotto-ilotto ></div>\r\n\r\n</div>\r\n<!--col-lg--->","redirectUrl":null,"message":null});`)
	})

	router.GET("/api/Rule/Lotto/Single", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/Single.json")
		c.Writer.WriteString(xxxjson)
		/*
			c.JSON(http.StatusOK, gin.H{
				"isSuccess": true,
				"data": gin.H{
					"serverTime": "2018-04-06T22:56:17+08:00",
					"invalid":    true,
				},
			})*/
	})

	//总页码
	router.GET("/api/lotto/Mobile", handler.Mobile)
	// router.GET("/api/lotto/Mobile", func(c *gin.Context) {
	// 	c.Writer.WriteString(readFile1("testjson/Mobile2.json"))
	// })

	//Counter 彩票到期，单个服务
	router.GET("/api/lotto/Counter/:number", handler.CounterID)

	//Counter 彩票到期，单个服务
	//router.GET("/api/lotto/Counter", handler.CounterID)

	//开奖结果
	router.GET("/api/lotto/Counter/:number/Trends", handler.Trends)

	// router.GET("/api/lotto/Counter/:number/Trends", func(c *gin.Context) {
	// 	data := readFile1("testjson/Trends.json")
	// 	c.Writer.WriteString(data)
	// })

	//确认下注
	router.POST("/api/lotto/PlaceBet", handler.PlaceBet)

	///余额
	router.GET("/api/Member/Balance", handler.Balance)

	//OpenBets
	///api/Report/lotto/OpenBets?pageNum=1&pageSize=10
	router.GET("/api/Report/:name/OpenBets", handler.OpenBets)

	//https://ng-gc-188.prdangb18a1.com/api/lotto/Counter/320/GameResults?drawNo=69&date=2018-04-07&pageNum=1&pageSize=50
	router.GET("/api/lotto/Counter/:number/GameResults", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/GameResults.json")
		c.Writer.WriteString(xxxjson)
	})

	router.GET("/signalr/negotiate", func(c *gin.Context) {
		//b := bytes.Buffer{}
		//b.WriteString("[")
		// var xxxjson string
		// xxxjson = readFile1("testjson/Mobile.json")
		// c.Writer.WriteString(xxxjson)
	})

	router.POST("/signalr/poll", func(c *gin.Context) {
		// var xxxjson string
		// xxxjson = readFile1("testjson/poll.json")
		// c.Writer.WriteString(xxxjson)
	})

	router.POST("/api/Lotto/BetSlip", func(c *gin.Context) {

		//c.GetPostFormArray
		//var xxxjson string
		//xxxjson = readFile1("testjson/Mobile.json")
		//c.Writer.WriteString(xxxjson)
		/*
			c.JSON(http.StatusOK, gin.H{
				"isSuccess": true,
				"data": gin.H{
					"serverTime": "2018-04-06T22:56:17+08:00",
					"invalid":    true,
				},
			})*/
	})

	///service/healthapi/needrefresh

	// str := 20180419099
	// content := str[8:len(str)]
	// fmt.Println(content)

	router.Run(":8188")
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
