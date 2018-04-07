package main

import (
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

//"fmt"

//"github.com/gin-gonic/gin/binding"

func main() {
	router := gin.Default()
	router.Delims("{[{", "}]}")
	router.Static("/Content", "./content")
	router.Static("/bundles", "./bundles")
	router.Static("/signalrnet", "./signalrnet")
	//router.LoadHTMLFiles("templates/*")
	router.LoadHTMLGlob("templates/lotto/*")

	router.GET("/zh-cn/lotto/main-lobby", func(c *gin.Context) {
		formate := "2006-01-02 15:04:05"
		c.HTML(http.StatusOK, "main-lobby.html", gin.H{
			"title": "列表",
			"lpb":   time.Now().Format(formate),
		})
	})

	//API
	router.GET("/api/Sync", func(c *gin.Context) {

		// formate := "2006-01-02T15:04:05+08:00"

		// now := time.Now().Format(formate)

		c.JSON(http.StatusOK, gin.H{
			"isSuccess": true,
			"data": gin.H{
				"serverTime": "2018-04-07T01:48:23+08:00",
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

	router.GET("/api/lotto/Mobile", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/Mobile.json")
		c.Writer.WriteString(xxxjson)
	})

	// router.GET("/api/lotto/Counter/360", func(c *gin.Context) {
	// 	var xxxjson string
	// 	xxxjson = readFile1("testjson/360.json")
	// 	c.Writer.WriteString(xxxjson)
	// })

	router.GET("/api/lotto/Counter/:number", func(c *gin.Context) {
		var xxxjson string
		xxxjson = readFile1("testjson/360.json")
		c.Writer.WriteString(xxxjson)
	})

	router.GET("/signalr/negotiate", func(c *gin.Context) {
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
