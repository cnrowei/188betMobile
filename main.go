package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"./handler"
	"./models"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Delims("{[{", "}]}")
	router.Static("/Content", "./content")
	router.Static("/bundles", "./bundles")
	router.Static("/signalrnet", "./signalrnet")
	router.Static("/cdn1101", "./cdn1101")
	//router.LoadHTMLFiles("templates/*")
	router.LoadHTMLGlob("templates/*")
	//router.LoadHTMLGlob("templates/myaccount/*")

	router.GET("/zh-cn/my-account/statement/transaction-history/summary", func(c *gin.Context) {
		c.HTML(http.StatusOK, "summary.tpl.html", gin.H{
			"title": "摘要",
		})
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

	router.GET("/zh-cn/lotto/main-lobby", func(c *gin.Context) {
		formate := "2006-01-02 15:04:05"
		c.HTML(http.StatusOK, "main-lobby.tpl.html", gin.H{
			"title": "列表",
			"lpb":   time.Now().Format(formate),
		})
	})

	router.GET("/zh-cn/lotto/counter/:id/:counterType", func(c *gin.Context) {
		formate := "2006-01-02 15:04:05"
		c.HTML(http.StatusOK, "counter.tpl.html", gin.H{
			"title": "列表",
			"lpb":   time.Now().Format(formate),
		})
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
	router.GET("/api/Sync", func(c *gin.Context) {

		// formate := "2006-01-02T15:04:05+08:00"
		// now := time.Now().Format(formate)

		c.JSON(http.StatusOK, gin.H{
			"isSuccess": true,
			"data": gin.H{
				"serverTime": "2018-04-07T15:59:30+08:00",
				//”serverTime":"2018-04-07T15:59:00+08:00",
				//"invalid":    true,
			},
		})
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

	router.GET("/api/lotto/Mobile", handler.Mobile)

	//
	router.GET("/api/lotto/Counter/:number", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/360.json")
		c.Writer.WriteString(xxxjson)
	})

	//开奖结果
	router.GET("/api/lotto/Counter/:number/Trends", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/Trends.json")
		c.Writer.WriteString(xxxjson)
	})

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

	router.POST("/service/healthapi/needrefresh", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"kickoff":     false,
			"needRefresh": false,
			"token":       "laSWXHuuhMVOcLcXxlNrTA..",
		})
	})

	//initData()

	router.Run(":8188")
}

type AutoGenerated struct {
	Name   string  `json:"name"`
	ID     int     `json:"id"`
	Odds   float64 `json:"odds"`
	MinBet float64 `json:"minBet"`
	MaxBet float64 `json:"maxBet"`
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

//初始化投注数据
func initData() {

	fi, err := os.Open("testjson/320_1.json")
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	fd, err := ioutil.ReadAll(fi)

	var dat []AutoGenerated

	if err := json.Unmarshal([]byte(fd), &dat); err != nil {
		log.Fatalln("json unmarshal error:", err)
	} else {

		//读取JSON数据
		for _, v := range dat {

			has, _ := models.FindSelection(v.Name, 320)
			//fmt.Println("HAS", v.Name, v.Odds, v.MinBet, v.MaxBet)
			if has == 0 {
				fmt.Println("HAS", v.Name, v.Odds, v.MinBet, v.MaxBet)

				sel := &models.Selections{}
				sel.Name = v.Name
				sel.Counterid = 320
				sel.Odds = v.Odds
				sel.Minbet = v.MinBet
				sel.Maxbet = v.MaxBet

				models.NewSelection(sel)

			}

		}
	}

	fmt.Println("##################  Service Start! #####################")
}
