package handler

import (
	"bytes"

	"github.com/gin-gonic/gin"
)

//摘要
func GetSummaryHistory(c *gin.Context) {

}

//投注记录
//Request URL: https://www.mylucky.net/service/myaccounttapi/GetSettleBet?channelProductId=8100&
//jsDateFrom=1522252800000&jsDateTo=1524844800000&language=zh-cn&partnerIds=10&partnerIds=18&region=China
func GetSettleBet(c *gin.Context) {

	//获取用户信息
	// uinfo := GetSessionUsername(c)

	// if uinfo != nil {

	// }

	b := bytes.Buffer{}
	b.WriteString(`[`)
	b.WriteString(`{`)
	b.WriteString(`"partnerName": "Keno",`)
	b.WriteString(`"partnerId": 10,`)
	b.WriteString(`"betTime": 1524154461000.0,`)
	b.WriteString(`"betId": "180420008611790949",`)
	b.WriteString(`"betType": "BigSmall",`)
	b.WriteString(`"stake": 20.0,`)
	b.WriteString(`"return": 19.0,`)
	b.WriteString(`"status": 1,`)
	b.WriteString(`"extend": {`)
	b.WriteString(`"location": "Australia",`)
	b.WriteString(`"drawNo": "954",`)
	b.WriteString(`"ballNum": null,`)
	b.WriteString(`"gameResult": "8,3,8,6,4",`)
	b.WriteString(`"drawUrl": "https://188.com/zh-cn/integrate/result?product=2&counterCode=Chongqing&drawNo=61&date=2018-04-23",`)
	b.WriteString(`"wagerUrl": "https://188.com/zh-cn/integrate/WagerDetails?product=2&membercode=conku188&token=AZZ_SIXff6lPfdtIH66yeA..&wagerno=180423576721328964&date=2018-04-23"`)
	b.WriteString(`},`)
	b.WriteString(` "selections": [`)
	b.WriteString(`{`)
	b.WriteString(`"selName": "Odd",`)
	b.WriteString(`"odds": "1.95",`)
	b.WriteString(`"betTime": null,`)
	b.WriteString(`"status": null,`)
	b.WriteString(`"extend": {},`)
	b.WriteString(`"parts": {},`)
	b.WriteString(`"betAdjustments": null`)
	b.WriteString(`}`)
	b.WriteString(`]`)

	b.WriteString(`}`)
	b.WriteString(`]`)

	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(b.String())

}

func GetMemberlist(c *gin.Context) {

}
