package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"../helper"
	"../models"
	"github.com/gin-gonic/gin"
)

var SessionMgr *helper.SessionMgr = nil
var SessionUser models.Users

//中间件方法全局
func SessionMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		fmt.Println("before middleware")
		var sessionID = SessionMgr.CheckCookieValid(c.Writer, c.Request)
		if sessionID != "" {
			if userInfo, ok := SessionMgr.GetSessionVal(sessionID, "UserInfo"); ok {
				SessionUser = userInfo.(models.Users)
				// if value, ok := userInfo.(models.Users); ok {
				log.Println(SessionUser.Username)
				// }
			}
		} else {
			fmt.Println("sessionID:", sessionID)
			c.Redirect(http.StatusFound, "/zh-cn/login?redirectUrl="+c.Request.URL.String())
			return
		}
		fmt.Println("end before middleware")
	}
}

//手工获取
func GetSessionUsername(c *gin.Context) *models.Users {
	var sessionID = SessionMgr.CheckCookieValid(c.Writer, c.Request)
	if sessionID != "" {
		if userInfo, ok := SessionMgr.GetSessionVal(sessionID, "UserInfo"); ok {
			SessionUser = userInfo.(models.Users)
			if info, err := models.GetUserInfo(SessionUser.Username); err == nil {
				return info
			}
		}
	}
	return nil
}

//bool
func HasSessionUser(c *gin.Context) bool {
	var sessionID = SessionMgr.CheckCookieValid(c.Writer, c.Request)
	if sessionID != "" {
		if _, ok := SessionMgr.GetSessionVal(sessionID, "UserInfo"); ok {

			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

func loadjson(path string) string {
	fi, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	fd, err := ioutil.ReadAll(fi)
	return string(fd)

}

//下注前确认
func Chips(c *gin.Context) {
	data := loadjson("data/Chips.json")
	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(data)
}

//下注前确认
func PutChips(c *gin.Context) {
	data := loadjson("data/Chips.json")
	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(data)
}

//下注列表
func OpenBets() gin.HandlerFunc {
	return func(c *gin.Context) {
		var lists []*models.Wagers
		var err error

		formate := "2006-01-02T15:04:05+08:00"

		name := c.Param("name")
		pageNum := c.Query("pageNum")
		pageSize := c.Query("pageSize")

		b := bytes.Buffer{}
		uinfo := GetSessionUsername(c)
		if uinfo != nil {
			b.WriteString(`{"isSuccess": true,`)
		} else {
			b.WriteString(`{"isSuccess": flase,`)
		}

		b.WriteString(`"data":{ `)

		if uinfo != nil {
			lists, err = models.GetWagers(uinfo.Id, -1)

			if err != nil {
				log.Fatalln("error!")
			}
		}

		var totalStake float64 = 0
		var totalReturnAmount float64 = 0

		totalCount := len(lists)

		//wagers
		b.WriteString(`"wagers": [`)
		for i, v := range lists {

			b.WriteString(`{`)
			b.WriteString(`"createTime": "` + v.Createtime.Format(formate) + `",`)
			b.WriteString(`"wagerNo": "` + strconv.FormatInt(v.Id, 10) + `",`)
			b.WriteString(`"stake": ` + Float64toStr(v.Stake) + `,`)
			b.WriteString(`"returnAmount": ` + Float64toStr(v.Returnamount) + `,`)

			//bets
			b.WriteString(`"bets": [`)

			b.WriteString(`{`)
			b.WriteString(`"counterId": ` + strconv.FormatInt(v.Counterid, 10) + `,`)
			b.WriteString(`"drawNo": "` + strconv.FormatInt(v.Drawno, 10) + `",`)
			b.WriteString(`"betType": "` + v.Bettext + `",`)
			b.WriteString(`"selection": "` + BettypeCN(v.Selection) + `",`)

			var sel []BetSelections
			json.Unmarshal([]byte(v.Selections), &sel)

			//log.Println(sel[0])

			b.WriteString(`"odds": ` + Float64toStr(sel[0].Odds) + ``)
			b.WriteString(`}`)

			b.WriteString(`]`)
			//end bets

			totalStake = totalStake + v.Stake
			returnAmount := v.Stake * sel[0].Odds
			totalReturnAmount = totalReturnAmount + returnAmount

			if i >= len(lists)-1 {
				b.WriteString(`}`)
			} else {
				b.WriteString(`},`)
			}
		}

		b.WriteString(`],`)
		b.WriteString(`"totalCount": ` + strconv.Itoa(totalCount) + `,`)
		b.WriteString(`"totalStake": ` + Float64toStr(totalStake) + `,`)
		b.WriteString(`"totalReturnAmount": ` + Float64toStr(totalReturnAmount) + ``)
		//end wagers

		b.WriteString("}")
		b.WriteString("}")

		fmt.Print(name, pageNum, pageSize)
		c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
		c.Writer.WriteString(b.String())
	}
}

//历史报表
func Statement() gin.HandlerFunc {
	return func(c *gin.Context) {
		to := c.Query("dateTo")
		from := c.Query("dateFrom")

		date := c.Query("date")

		formate := "2006-01-02 15:04:05"
		formate1 := "2006-01-02"

		b := bytes.Buffer{}

		uinfo := GetSessionUsername(c)
		if uinfo != nil {
			b.WriteString(`{"isSuccess": true,`)
		} else {
			b.WriteString(`{"isSuccess": flase,`)
		}

		b.WriteString(`"data":{ `)
		d, _ := time.ParseDuration("+24h")
		s, _ := time.ParseDuration("+86399s")
		var lists []*models.Wagers
		var sel []BetSelections
		var err error

		//历史列表主要
		if to != "" && from != "" {
			log.Println(to)
			log.Println(from)

			toTime, _ := time.ParseInLocation(formate, to+" 00:00:00", time.Local)
			fromTime, _ := time.ParseInLocation(formate, from+" 00:00:00", time.Local)
			var toendtime time.Time

			log.Println(toTime)
			log.Println(fromTime)

			//时间类型比较,是否在fromTime之前
			for toTime.Before(fromTime) {

				log.Println(toTime)
				log.Println(fromTime)

				toTime = toTime.Add(d)
				toendtime = toTime.Add(s)

				lists, err = models.GetWagersStatement(uinfo.Id, toTime, toendtime)

				if lists != nil && err == nil {
					var totalCount int
					var totalStake float64
					var totalReturnAmount float64
					var returnAmount float64

					for _, v := range lists {

						json.Unmarshal([]byte(v.Selections), &sel)
						totalStake = totalStake + v.Stake
						if v.Status == 1 {
							returnAmount = v.Stake * sel[0].Odds
							totalReturnAmount = totalReturnAmount + returnAmount
						} else if v.Status == 0 {
							totalReturnAmount = totalReturnAmount - v.Stake
						}
					}

					totalCount = len(lists)

					if totalCount > 0 {
						b.WriteString(`"` + toTime.Format(formate1) + ` (` + Weekdaycn(toTime.Weekday().String()) + `)": {`)
						b.WriteString(`"lotto": {`)
						b.WriteString(`"gameDate": "` + toTime.Format(formate) + `",`)
						b.WriteString(` "totalCount": ` + strconv.Itoa(totalCount) + `,`)
						b.WriteString(`"totalStake": ` + Float64toStr(totalStake) + `,`)
						b.WriteString(`"totalReturnAmount": ` + Float64toStr(totalReturnAmount) + ``)
						b.WriteString("}")

						if toTime.Equal(fromTime) {
							b.WriteString("}")
						} else {
							b.WriteString("},")
						}
					}
				}
			}
		}

		//1天的数据
		if date != "" {
			//pageNum := c.DefaultQuery("pageNum", "1")
			//pageSize := c.DefaultQuery("pageNum", "50")
			toTime, _ := time.ParseInLocation(formate, date+" 00:00:00", time.Local)
			fromTime, _ := time.ParseInLocation(formate, date+" 23:59:59", time.Local)
			//s, _ := time.ParseDuration("+86399s")

			var totalCount int
			var totalStake float64
			var totalReturnAmount float64

			lists, err = models.GetWagersStatement(uinfo.Id, toTime, fromTime)

			if err != nil {
				log.Fatalln("error!")
			}

			//wagers
			b.WriteString(`"wagers": [`)
			for i, v := range lists {
				var sel []BetSelections
				var returnAmount float64

				json.Unmarshal([]byte(v.Selections), &sel)
				totalStake = totalStake + v.Stake
				if v.Status == 1 {
					returnAmount = v.Stake * sel[0].Odds
					totalReturnAmount = totalReturnAmount + returnAmount
				} else if v.Status == 0 {
					returnAmount = returnAmount - v.Stake
					totalReturnAmount = totalReturnAmount - v.Stake
				}

				b.WriteString(`{`)
				b.WriteString(`"createTime": "` + v.Createtime.Format(formate) + `",`)
				b.WriteString(`"wagerNo": "` + strconv.FormatInt(v.Id, 10) + `",`)
				b.WriteString(`"stake": ` + Float64toStr(v.Stake) + `,`)
				b.WriteString(`"returnAmount": ` + Float64toStr(returnAmount) + `,`)
				if v.Status == 0 {
					b.WriteString(`"wagerStatus":"输",`)
				} else if v.Status == 1 {
					b.WriteString(`"wagerStatus":"赢",`)
				}

				b.WriteString(`"cancelReason":"",`)

				//bets
				b.WriteString(`"bets": [`)
				b.WriteString(`{`)
				b.WriteString(`"counterId": ` + strconv.FormatInt(v.Counterid, 10) + `,`)
				b.WriteString(`"drawNo": "` + strconv.FormatInt(v.Drawno, 10) + `",`)
				b.WriteString(`"betType": "` + v.Bettext + `",`)
				b.WriteString(`"selection": "` + BettypeCN(v.Selection) + `",`)
				b.WriteString(`"odds": ` + Float64toStr(sel[0].Odds) + ``)
				b.WriteString(`}`)
				b.WriteString(`]`)
				//end bets

				if i >= len(lists)-1 {
					b.WriteString(`}`)
				} else {
					b.WriteString(`},`)
				}
			}

			b.WriteString(`],`)
			b.WriteString(`"totalCount": ` + strconv.Itoa(totalCount) + `,`)
			b.WriteString(`"totalStake": ` + Float64toStr(totalStake) + `,`)
			b.WriteString(`"totalReturnAmount": ` + Float64toStr(totalReturnAmount) + ``)
			//end wagers

		}

		b.WriteString("}")
		b.WriteString("}")

		c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
		c.Writer.WriteString(b.String())
	}
}

func BettypeCN(str string) string {
	//var cn string
	switch str {
	case "Even":
		return "双"
	case "Odd":
		return "单"
	case "Big":
		return "大"
	case "Small":
		return "小"
	default:
		return str
	}
}

//
func Weekdaycn(en string) string {
	switch en {
	case "Monday":
		return "星期一"
	case "Tuesday":
		return "星期二"
	case "Wednesday":
		return "星期三"
	case "Thursday":
		return "星期四"
	case "Friday":
		return "星期五"
	case "Saturday":
		return "星期六"
	case "Sunday":
		return "星期天"
	default:
		return en
	}
}

// func Fixed_BS_CN(str string) string {
// 	strs := strings.Split(str, "_")
// 	strslen := len(strs)
// 	if strslen == 2 {

// 	}else if（strslen ==3){

// 	}
// 	return ""
// }

//读取账户余额
func Balance(c *gin.Context) {
	sessionID := SessionMgr.CheckCookieValid(c.Writer, c.Request)
	if userInfo, ok := SessionMgr.GetSessionVal(sessionID, "UserInfo"); ok {
		SessionUser = userInfo.(models.Users)

		if info, err := models.GetUserInfo(SessionUser.Username); err == nil {
			c.JSON(http.StatusOK, gin.H{"isSuccess": true, "data": info.Balance})
		} else {
			c.JSON(http.StatusOK, gin.H{"isSuccess": false, "data": 0})
		}
	}

}

func Postlogin(c *gin.Context) {

	// type Pslogin struct {
	// 	RedirectURL    interface{}   `json:"redirectUrl"`
	// 	Passport       string        `json:"passport"`
	// 	ReturnCode     string        `json:"returnCode"`
	// 	RecDomain      []interface{} `json:"recDomain"`
	// 	Cc             interface{}   `json:"cc"`
	// 	RemindDuration int           `json:"remindDuration"`
	// }
	// var login Pslogin
	// if err := c.BindJSON(&login); err == nil {

	// 	if login.RedirectURL != "" {
	// 		//跳转页面
	// 		c.Redirect(http.StatusMovedPermanently, login.RedirectURL.(string))
	// 	} else {
	// 		//跳转页面
	// 		c.Redirect(http.StatusMovedPermanently, "/zh-cn/lotto")
	// 	}

	// } else {

	// }

	c.Redirect(http.StatusMovedPermanently, "/zh-cn/lotto")

	//{"redirectUrl":null,"passport":"BlJbkEWwV%2b630XCEDXY%2bIOFeRIkfljdh%2bMGSQszYWow%3d","returnCode":"0000","recDomain":[],"cc":null,"remindDuration":0}

	//c.Header().Set("Location", "url") c.WriteHeader(301)
}

//登录
func Login(c *gin.Context) {

	type Loginuser struct {
		Username string `form:"Ud" json:"Ud" binding:"required"`
		Password string `form:"Pd" json:"Pd" binding:"required"`
		BlackBox string `form:"BlackBox" json:"BlackBox"`
	}
	var returnCode string
	var login Loginuser

	if err := c.ShouldBindJSON(&login); err == nil {

		//{"redirectUrl":null,"passport":null,"returnCode":"0002","recDomain":null,"cc":null,"remindDuration":0}

		if info, err := models.GetUserInfo(login.Username); err == nil {
			if info != nil {
				pass_md5 := helper.MD5_16(login.Password)

				fmt.Println(pass_md5)
				fmt.Println(info.Password)

				if info.Password == pass_md5 {

					//账户是否可以登录
					if info.Login {

						//session
						var sessionID = SessionMgr.StartSession(c.Writer, c.Request)
						var loginUserInfo = models.Users{Id: info.Id, Username: info.Username, Role: info.Role, Agentid: info.Agentid}

						//踢除重复登录的,session
						var onlineSessionIDList = SessionMgr.GetSessionIDList()

						for _, onlineSessionID := range onlineSessionIDList {
							if userInfo, ok := SessionMgr.GetSessionVal(onlineSessionID, "UserInfo"); ok {
								if value, ok := userInfo.(models.Users); ok {
									if value.Id == info.Id {
										SessionMgr.EndSessionBy(onlineSessionID)
									}
								}
							}
						}
						//设置变量值
						SessionMgr.SetSessionVal(sessionID, "UserInfo", loginUserInfo)

						//cookie
						// cookie := &http.Cookie{
						// 	Name:     "session_id",
						// 	Value:    "123",
						// 	Path:     "/",
						// 	HttpOnly: true,
						// }

						// http.SetCookie(c.Writer, cookie)

						//可以登录成功
						returnCode = "0000"
					} else {
						//被冻结
						returnCode = "0013"
					}

				} else {
					returnCode = "0002"
				}
			} else {
				returnCode = "0002"
			}

		} else {
			returnCode = "0002"
		}
	} else {
		//登录无效
		returnCode = "0200"
		fmt.Println(err)
	}

	c.JSON(http.StatusOK, gin.H{
		"redirectUrl":    c.Request.Referer(),
		"passport":       "BlJbkEWwV%2b630XCEDXY%2bIOFeRIkfljdh%2bMGSQszYWow%3d",
		"returnCode":     returnCode,
		"recDomain":      []interface{}{},
		"cc":             nil,
		"remindDuration": 0,
	})
}
