package handler

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"../helper"
	"../models"
	"github.com/gin-gonic/gin"
)

var SessionMgr *helper.SessionMgr = nil
var SessionUser models.Users

//中间件方法全局
func SessionMiddleware(c *gin.Context) {
	var sessionID = SessionMgr.CheckCookieValid(c.Writer, c.Request)
	if sessionID != "" {
		if userInfo, ok := SessionMgr.GetSessionVal(sessionID, "UserInfo"); ok {
			SessionUser = userInfo.(models.Users)
			// if value, ok := userInfo.(models.Users); ok {
			fmt.Println(SessionUser.Id)
			// }
		}
	} else {
		http.Redirect(c.Writer, c.Request, "/zh-cn/login", http.StatusFound)
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
	data := loadjson("testjson/Chips.json")
	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(data)
}

//下注列表
func OpenBets(c *gin.Context) {
	name := c.Param("name")
	pageNum := c.Query("pageNum")
	pageSize := c.Query("pageSize")

	fmt.Print(name, pageNum, pageSize)

	data := loadjson("testjson/OpenBets.json")
	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(data)
}

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

	//{"redirectUrl":null,"passport":"BlJbkEWwV%2b630XCEDXY%2bIOFeRIkfljdh%2bMGSQszYWow%3d","returnCode":"0000","recDomain":[],"cc":null,"remindDuration":0}

	//跳转页面
	c.Redirect(http.StatusMovedPermanently, "/zh-cn/lotto")
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
		"redirectUrl":    nil,
		"passport":       "BlJbkEWwV%2b630XCEDXY%2bIOFeRIkfljdh%2bMGSQszYWow%3d",
		"returnCode":     returnCode,
		"recDomain":      []interface{}{},
		"cc":             nil,
		"remindDuration": 0,
	})
}
