package handler

import (
	"bytes"
	"fmt"
	"strconv"
	"time"

	"../models"
	"github.com/gin-gonic/gin"
)

func Mobile(c *gin.Context) {
	//formate := "2006-01-02T15:04:05+08:00"
	// now := time.Now().Format(formate)

	b := bytes.Buffer{}
	b.WriteString(`{"isSuccess": true,`)
	b.WriteString(`"data":{ `)
	b.WriteString(`"announcements": [],`)

	//openBets
	b.WriteString(`"openBets": {`)
	b.WriteString(`"totalCount": 0,`)
	b.WriteString(`"totalStake": 0.0,`)
	b.WriteString(`"totalReturnAmount": 0.0,`)
	b.WriteString(`"wagers": []`)
	b.WriteString(`},`)
	//openBets

	//counters
	b.WriteString(`"counters": [`)
	//var lists []models.Counters
	lists, _ := models.GetCounters("seq")
	for i, v := range lists {
		b.WriteString(`{`)
		b.WriteString(`"id":` + strconv.FormatInt(v.Id, 10) + `,`)
		b.WriteString(`"name": "` + v.Name + `",`)
		b.WriteString(`"official": "` + v.Official + `",`)
		b.WriteString(`"status": ` + strconv.Itoa(v.Status) + `,`)

		//draw
		if info, err := models.GetDraw(time.Now(), v.Id); info != nil && err == nil {
			b.WriteString(`"draw": {`)
			b.WriteString(`"drawNo": ` + strconv.FormatInt(info.Drawno, 10) + `,`)
			b.WriteString(`"drawStatus": ` + strconv.Itoa(info.Drawstatus) + `,`)
			b.WriteString(`"status": ` + strconv.Itoa(v.Status) + `,`)
			b.WriteString(`"startTime": "` + info.Starttime.String() + `",`)
			b.WriteString(`"endTime": "` + info.Endtime.String() + `",`)
			b.WriteString(`"betClosedMMSS": "` + info.Betclosedmmss + `",`)
			b.WriteString(`"isCloseManually": ` + strconv.FormatBool(info.Isclosemanually) + ``)
			b.WriteString(`},`)
		}
		//draw

		//selections
		b.WriteString(`"selections": {`)
		selections, _ := models.GetSelections(v.Id)
		for x, s := range selections {

			b.WriteString(`"` + s.Name + `": {`)
			b.WriteString(`"id": ` + strconv.FormatInt(s.Id, 10) + `,`)
			b.WriteString(`"odds": ` + Float64toStr(s.Odds) + `,`)
			b.WriteString(`"minBet": ` + Float64toStr(s.Minbet) + `,`)
			b.WriteString(`"maxBet": ` + Float64toStr(s.Maxbet) + ``)
			fmt.Println("#######################", x, len(selections))
			if x >= len(selections)-1 {
				b.WriteString(`}`)
			} else {
				b.WriteString(`},`)
			}

		}
		b.WriteString(`},`)
		//selections

		b.WriteString(`"gameResult": {`)
		b.WriteString(`},`)
		b.WriteString(`"seq": ` + strconv.Itoa(v.Seq) + `,`)
		b.WriteString(`"ballCount": ` + strconv.Itoa(v.Ballcount) + `,`)
		b.WriteString(`"resultOpenIntervalSecond": ` + strconv.Itoa(v.Resultopenintervalsecond) + `,`)
		b.WriteString(`"resultWaitingIntervalSecond": ` + strconv.Itoa(v.Resultwaitingintervalsecond) + ``)

		if i >= len(lists)-1 {
			b.WriteString(`}`)
		} else {
			b.WriteString(`},`)
		}
	}

	b.WriteString(`],`)
	//counters

	//trendsList
	b.WriteString(`"trendsList": [`)
	b.WriteString(`{`)
	b.WriteString(`"counterId": 310,`)

	b.WriteString(`"trends": [`)
	b.WriteString(`{`)
	b.WriteString(`"counterId": 0,`)
	b.WriteString(`"drawNo": 2018040702,`)
	b.WriteString(`"drawTime": "0001-01-01T00:00:00+08:00",`)
	b.WriteString(`"drawStatus": 0,`)
	b.WriteString(`"voidReason": 0,`)
	b.WriteString(`"resultBalls": [6, 2, 2]`)
	b.WriteString(`}`)
	b.WriteString(`]`)

	b.WriteString(`}`)
	b.WriteString(`],`)
	//trendsList

	//betslip
	b.WriteString(`"betSlip": "[{\"counterId\":320,\"drawNo\":61,\"bet\":{\"betType\":\"num\",\"selection\":\"66\"},\"ballNum\":\"53\"}]",`)

	//member begin
	b.WriteString(`"member": {`)
	b.WriteString(`"MemberId": 268042,`)
	b.WriteString(`"MemberName": "conku188",`)
	b.WriteString(`"CurrencyCode": "RMB",`)
	b.WriteString(`"Balance": "1341.2319"`)
	b.WriteString(`}`)
	//member end

	b.WriteString(`}`)
	b.WriteString("}")

	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(b.String())
}

func Float64toStr(v float64) string {
	string := strconv.FormatFloat(v, 'E', -1, 64)
	return string
}

func Float32toStr(v float64) string {
	string := strconv.FormatFloat(v, 'E', -1, 32)
	return string
}
