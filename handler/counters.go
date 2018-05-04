package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"time"

	"../helper"
	"../models"
	"github.com/gin-gonic/gin"
)

type Bets struct {
	Text             struct{}        `json:"text"`
	Bet              Bettype         `json:"bet"`
	BallNum          interface{}     `json:"ballNum"`
	MobileBetText    Bettype         `json:"mobileBetText"`
	BetType          string          `json:"betType"`
	Selection        interface{}     `json:"selection"`
	CounterID        int64           `json:"counterId"`
	CounterName      string          `json:"counterName"`
	DrawNo           int64           `json:"drawNo"`
	Selections       []BetSelections `json:"selections"`
	Stake            interface{}     `json:"stake"`
	IsShowChipBox    bool            `json:"isShowChipBox"`
	Uivalid          bool            `json:"uivalid"`
	IsSystemPick     bool            `json:"isSystemPick"`
	EstWinning       float64         `json:"estWinning"`
	DetectSoftKeyPad struct{}        `json:"detectSoftKeyPad"`
	HideChipBox      interface{}     `json:"hideChipBox"`
	ShowValid        bool            `form:"showValid" json:"showValid"`
	ReturnAmount     float64         `json:"hideChipBox"`
}

type Bettype struct {
	BetType   string      `json:"betType"`
	Selection interface{} `json:"selection"`
}

type BetSelections struct {
	ID     int     `json:"id"`
	Odds   float64 `json:"odds"`
	MinBet float64 `json:"minBet"`
	MaxBet float64 `json:"maxBet"`
}

//下注
func PlaceBet(c *gin.Context) {
	var bet []*Bets
	// if err := c.ShouldBindJSON(&bet); err == nil {
	// 	fmt.Println(&bet)
	// } else {
	// 	fmt.Println(err.Error())
	// }

	if err := c.BindJSON(&bet); err == nil {

		var err error
		var allstake float64
		var userid int64

		iw, err := helper.NewIdWorker(1)
		if err != nil {
			fmt.Println(err)
		}

		//
		b := bytes.Buffer{}
		uinfo := GetSessionUsername(c)

		fmt.Println("SessionUser:", SessionUser.Username)

		if uinfo != nil {
			b.WriteString(`{"isSuccess": true,`)
			userid = SessionUser.Id
		} else {
			b.WriteString(`{"isSuccess": false,`)
		}

		b.WriteString(`"data":[ `)

		//下注循环
		for i, v := range bet {
			b.WriteString(`{`)
			//是否添加记录
			flag := true

			//所有下注额度
			allstake = 0

			//下注额类型确认
			stake, ok := v.Stake.(float64)
			if !ok {
				stake, err = strconv.ParseFloat(v.Stake.(string), 64)
				if err != nil {
					//投注额必须大于0。
					flag = false
					b.WriteString(`"error": "BS_StakeMustGreaterThanZero",`)
				}
			}
			//下注的类型
			selection, ok := v.Selection.(string)
			if !ok {
				selection = Float64toStr(v.Selection.(float64))
			}

			if v.BetType == "" {
				v.BetType = v.Bet.BetType
			}

			if stake < v.Selections[0].MinBet {
				//投注额不能低于最低限额。
				flag = false
				b.WriteString(`"error": "BS_BetLessThanProfileMinBet",`)
			}

			//单注总额度
			allstake = allstake + stake

			//减去会员账号的信用余额
			uinfo := GetSessionUsername(c)
			if uinfo.Balance < stake {
				//投注额超出您的帐户余额。
				flag = false
				b.WriteString(`"error": "BS_InsufficientMemberBalance",`)
			} else {
				balance := uinfo.Balance - stake
				if err := models.UpUserBalance(uinfo, balance); err != nil {
					//投注额超出您的帐户余额。
					flag = false
					b.WriteString(`"error": "BS_InsufficientMemberBalance",`)
				}
			}

			wg := &models.Wagers{}
			wg.Uid = userid
			wg.Counterid = v.CounterID
			wg.Drawno = v.DrawNo

			wg.Stake = stake
			wg.Estwinning = v.EstWinning
			wg.Issystempick = v.IsShowChipBox
			wg.Bettype = v.BetType

			wg.Bettext = v.MobileBetText.BetType

			// jsonbet, err := json.Marshal(v.Bet)
			// if err != nil {
			// 	flag = false
			// 	fmt.Println("Json bet to struct Error!", err.Error())
			// }
			// wg.Bets = string(jsonbet)
			wg.Selection = selection
			wg.Returnamount = v.ReturnAmount
			wg.Status = -1
			wg.Createtime = time.Now()

			jsonselection, err := json.Marshal(v.Selections)
			if err != nil {
				flag = false
				b.WriteString(`"error": "BS_ExceedAccumulatePayout",`)
				fmt.Println("Json bet to struct Error:", err.Error())
			}

			wg.Selections = string(jsonselection)

			//SnowFlake算法分布式ID
			wagerNo, err := iw.NextId()
			if err != nil {
				flag = false
				fmt.Println(err)
			}
			wg.Id = wagerNo

			//添加数据
			if flag {
				wagerNo, err = models.NewWager(wg)
				if err != nil {
					//此投注选项暂时无法受注。请稍后再试。
					b.WriteString(`"error": "BS_ExceedAccumulatePayout",`)
					fmt.Println("add wager err:", err.Error())
				}
			}

			b.WriteString(`"counterId": ` + strconv.FormatInt(v.CounterID, 10) + `,`)
			b.WriteString(`"drawNo": ` + strconv.FormatInt(v.DrawNo, 10) + `,`)
			b.WriteString(`"selections": [`)
			for e, s := range v.Selections {
				b.WriteString(`{`)
				b.WriteString(`"id": ` + strconv.Itoa(s.ID) + `,`)
				b.WriteString(`"odds":` + Float64toStr(s.Odds) + `,`)
				b.WriteString(`"minBet": ` + Float64toStr(s.MinBet) + `,`)
				b.WriteString(`"maxBet": ` + Float64toStr(s.MaxBet) + ``)
				if e >= len(v.Selections)-1 {
					b.WriteString(`}`)
				} else {
					b.WriteString(`},`)
				}
			}
			b.WriteString(`],`)

			if stake, ok := v.Stake.(float64); ok {
				b.WriteString(`"stake": ` + Float64toStr(stake) + `,`)
			} else {
				b.WriteString(`"stake": ` + v.Stake.(string) + `,`)
			}

			b.WriteString(`"estWinning": ` + Float64toStr(v.EstWinning) + `,`)
			b.WriteString(`"isSystemPick": ` + strconv.FormatBool(v.IsSystemPick) + `,`)
			b.WriteString(`"wagerNo": ` + strconv.FormatInt(wagerNo, 10) + `,`)
			b.WriteString(`"betType": "` + v.BetType + `",`)

			//余额不够提示
			//b.WriteString(`"error": "BS_InsufficientMemberBalance",`)
			//b.WriteString(`"error": "BS_BetLessThanProfileMinBet",`)

			if wagerNo == 0 {
				//BS_ExceedAccumulatePayout: "此投注选项暂时无法受注。请稍后再试。",
				b.WriteString(`"error": "BS_ExceedAccumulatePayout",`)
			}

			b.WriteString(`"selection":"` + selection + `"`)

			if i >= len(bet)-1 {
				b.WriteString(`}`)
			} else {
				b.WriteString(`},`)
			}

		}

		b.WriteString(`]}`)

		c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
		c.Writer.WriteString(b.String())
		//
	} else {
		fmt.Println(err.Error())
	}
}

//开奖结果
func GameResults(c *gin.Context) {

	number := c.Param("number")
	drawNo := c.Query("drawNo")

	date := c.Query("date")
	formate := "2006-01-02 15:04:05"
	//pageNum := c.Query("pageNum")
	//pageSize := c.Query("pageSize")

	toTime, _ := time.ParseInLocation(formate, date+" 00:00:00", time.Local)
	formate1 := "2006-01-02T15:04:05+08:00"

	if number == "" {
		return
	}

	counterid, err := strconv.ParseInt(number, 10, 64)
	if err != nil {
		log.Println("counterid to int64 error", err.Error())
	}

	fmt.Println("“drawNo”", drawNo, counterid)

	var lists []*models.Draws

	if drawNo != "" {
		drawno, err := strconv.ParseInt(drawNo, 10, 64)
		if err != nil {
			log.Println("drawno to int64 error", err.Error())
		}
		lists, _ = models.GetDrawsResultsDrawno(counterid, drawno)
	} else {
		//GetDraws
		lists, _ = models.GetDrawsResults(toTime, time.Now(), counterid)
	}

	b := bytes.Buffer{}
	uinfo := GetSessionUsername(c)
	if uinfo != nil {
		b.WriteString(`{"isSuccess": true,`)
		//userid = uinfo.Id
	} else {
		b.WriteString(`{"isSuccess": false,`)
	}

	b.WriteString(`"data":{`)
	b.WriteString(`"totalCount": 1,`)
	b.WriteString(` "gameResults": [`)

	for i, v := range lists {
		b.WriteString(`{`)
		b.WriteString(`"counterId": ` + strconv.FormatInt(v.Counterid, 10) + `,`)
		b.WriteString(`"drawNo": ` + strconv.FormatInt(v.Drawno, 10) + `,`)
		b.WriteString(`"drawTime": "` + v.Drawtime.Format(formate1) + `",`)
		b.WriteString(`"drawStatus": ` + strconv.Itoa(v.Drawstatus) + `,`)
		b.WriteString(`"voidReason": ` + strconv.Itoa(v.Voidreason) + `,`)
		b.WriteString(`"resultBalls": [` + v.Resultballs + `]`)

		if i >= len(lists)-1 {
			b.WriteString(`}`)
		} else {
			b.WriteString(`},`)
		}
	}
	b.WriteString(`]`)

	b.WriteString(`}}`)

	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(b.String())
}

//单个数据抓取
func CounterID(c *gin.Context) {

	//fmt.Println(c.Param("number"))

	formate := "2006-01-02T15:04:05+08:00"
	cid, err := strconv.ParseInt(c.Param("number"), 10, 64)

	if err != nil {
		fmt.Println("cid is :", err.Error())
	}

	//标注上一期
	var drawno int64

	b := bytes.Buffer{}
	b.WriteString(`{"isSuccess": true,`)
	b.WriteString(`"data":{ `)
	if v, err := models.GetCounter(cid); err == nil {

		b.WriteString(`"id":` + strconv.FormatInt(v.Id, 10) + `,`)
		b.WriteString(`"name": "` + v.Name + `",`)
		b.WriteString(`"official": "` + v.Official + `",`)
		b.WriteString(`"status": ` + strconv.Itoa(v.Status) + `,`)

		// //draw
		if info, err := models.GetDraw(time.Now(), v.Id); info != nil && err == nil {

			drawno = info.Drawno - 1

			b.WriteString(`"draw": {`)
			b.WriteString(`"drawNo": ` + strconv.FormatInt(info.Drawno, 10) + `,`)
			b.WriteString(`"drawStatus": ` + strconv.Itoa(info.Drawstatus) + `,`)
			//b.WriteString(`"status": ` + strconv.Itoa(v.Status) + `,`)
			b.WriteString(`"startTime": "` + info.Starttime.Format(formate) + `",`)
			b.WriteString(`"endTime": "` + info.Endtime.Format(formate) + `",`)
			b.WriteString(`"betClosedMMSS": "` + info.Betclosedmmss + `",`)
			b.WriteString(`"isCloseManually": ` + strconv.FormatBool(info.Isclosemanually) + ``)
			b.WriteString(`},`)
		}
		// //draw

		//selections
		b.WriteString(`"selections": {`)
		selections, _ := models.GetSelections(v.Id)
		for x, s := range selections {

			b.WriteString(`"` + s.Name + `": {`)
			b.WriteString(`"id": ` + strconv.FormatInt(s.Id, 10) + `,`)
			b.WriteString(`"odds": ` + Float64toStr(s.Odds) + `,`)
			b.WriteString(`"minBet": ` + Float64toStr(s.Minbet) + `,`)
			b.WriteString(`"maxBet": ` + Float64toStr(s.Maxbet) + ``)

			//fmt.Println("#######################", x, len(selections))
			if x >= len(selections)-1 {
				b.WriteString(`}`)
			} else {
				b.WriteString(`},`)
			}

		}
		b.WriteString(`},`)
		//selections

		//gameResult
		b.WriteString(`"gameResult": {`)

		if info, err := models.GetDrawno(drawno); err == nil {
			b.WriteString(`"counterId": ` + strconv.FormatInt(v.Id, 10) + `,`)
			b.WriteString(`"drawNo": ` + strconv.FormatInt(info.Drawno, 10) + `,`)
			b.WriteString(`"drawTime":  "` + info.Endtime.Format(formate) + `",`)
			b.WriteString(`"drawStatus": ` + strconv.Itoa(info.Drawstatus) + `,`)
			b.WriteString(`"voidReason": ` + strconv.Itoa(info.Voidreason) + `,`)
			b.WriteString(`"resultBalls": [` + info.Resultballs + `]`)
		}
		b.WriteString(`},`)
		//end gameResult

		b.WriteString(`"seq": ` + strconv.Itoa(v.Seq) + `,`)
		b.WriteString(`"ballCount": ` + strconv.Itoa(v.Ballcount) + `,`)
		b.WriteString(`"resultOpenIntervalSecond": ` + strconv.Itoa(v.Resultopenintervalsecond) + `,`)
		b.WriteString(`"resultWaitingIntervalSecond": ` + strconv.Itoa(v.Resultwaitingintervalsecond) + ``)

		b.WriteString("}")
	}

	b.WriteString("}")

	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(b.String())

}

func Mobile(c *gin.Context) {

	formate := "2006-01-02T15:04:05+08:00"
	//now := time.Now().Format(formate)

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

	//标注上一期
	var drawno int64
	now := time.Now()
	beginTime := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)

	lists, _ := models.GetCounters("seq")
	for i, v := range lists {

		b.WriteString(`{`)
		b.WriteString(`"id":` + strconv.FormatInt(v.Id, 10) + `,`)
		b.WriteString(`"name": "` + v.Name + `",`)
		b.WriteString(`"official": "` + v.Official + `",`)
		b.WriteString(`"status": ` + strconv.Itoa(v.Status) + `,`)

		// //draw
		if info, err := models.GetDraw(time.Now(), v.Id); info != nil && err == nil {

			drawno = info.Drawno - 1

			b.WriteString(`"draw": {`)
			b.WriteString(`"drawNo": ` + strconv.FormatInt(info.Drawno, 10) + `,`)
			b.WriteString(`"drawStatus": ` + strconv.Itoa(info.Drawstatus) + `,`)
			//b.WriteString(`"status": ` + strconv.Itoa(v.Status) + `,`)
			b.WriteString(`"startTime": "` + info.Starttime.Format(formate) + `",`)
			b.WriteString(`"endTime": "` + info.Endtime.Format(formate) + `",`)
			b.WriteString(`"betClosedMMSS": "` + info.Betclosedmmss + `",`)
			b.WriteString(`"isCloseManually": ` + strconv.FormatBool(info.Isclosemanually) + ``)
			b.WriteString(`},`)
		}
		// //draw

		//selections
		b.WriteString(`"selections": {`)
		selections, _ := models.GetSelections(v.Id)
		for x, s := range selections {

			b.WriteString(`"` + s.Name + `": {`)
			b.WriteString(`"id": ` + strconv.FormatInt(s.Id, 10) + `,`)
			b.WriteString(`"odds": ` + Float64toStr(s.Odds) + `,`)
			b.WriteString(`"minBet": ` + Float64toStr(s.Minbet) + `,`)
			b.WriteString(`"maxBet": ` + Float64toStr(s.Maxbet) + ``)

			//fmt.Println("#######################", x, len(selections))
			if x >= len(selections)-1 {
				b.WriteString(`}`)
			} else {
				b.WriteString(`},`)
			}

		}
		b.WriteString(`},`)
		//selections

		//gameResult
		b.WriteString(`"gameResult": {`)

		if info, err := models.GetDrawno(drawno); err == nil {
			b.WriteString(`"counterId": ` + strconv.FormatInt(v.Id, 10) + `,`)
			b.WriteString(`"drawNo": ` + strconv.FormatInt(info.Drawno, 10) + `,`)
			b.WriteString(`"drawTime":  "` + info.Starttime.Format(formate) + `",`)
			b.WriteString(`"drawStatus": ` + strconv.Itoa(info.Drawstatus) + `,`)
			b.WriteString(`"voidReason": ` + strconv.Itoa(info.Voidreason) + `,`)
			b.WriteString(`"resultBalls": [` + info.Resultballs + `]`)
		}
		b.WriteString(`},`)
		//end gameResult

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
	//end counters

	//trendsList
	b.WriteString(`"trendsList": [`)
	for i, v := range lists {
		b.WriteString(`{`)
		b.WriteString(`"counterId": ` + strconv.FormatInt(v.Id, 10) + `,`)

		b.WriteString(`"trends": [`)

		if dlists, err := models.GetDraws(time.Now(), beginTime, v.Id); err == nil {
			for i, v := range dlists {

				strNo := strconv.FormatInt(v.Drawno, 10)
				str := strNo[8:len(strNo)]

				intNo, err := strconv.Atoi(str)
				if err != nil {
					fmt.Println("strconv Atoi error")
				}

				b.WriteString("{")
				b.WriteString(`"counterId": 0,`)
				b.WriteString(`"drawNo": ` + strconv.Itoa(intNo) + `,`)
				b.WriteString(`"drawTime":  "` + v.Drawtime.Format(formate) + `",`)
				b.WriteString(`"drawStatus": ` + strconv.Itoa(v.Drawstatus) + `,`)
				b.WriteString(`"voidReason": ` + strconv.Itoa(v.Voidreason) + `,`)
				b.WriteString(`"resultBalls": [` + v.Resultballs + `]`)

				if i >= len(dlists)-1 {
					b.WriteString(`}`)
				} else {
					b.WriteString(`},`)
				}
			}
		}

		b.WriteString(`]`)

		if i >= len(lists)-1 {
			b.WriteString(`}`)
		} else {
			b.WriteString(`},`)
		}

	}
	b.WriteString(`],`)
	//trendsList

	//betslip
	b.WriteString(`"betSlip": "[{\"counterId\":320,\"drawNo\":61,\"bet\":{\"betType\":\"num\",\"selection\":\"66\"},\"ballNum\":\"53\"}]",`)

	uinfo := GetSessionUsername(c)

	if uinfo != nil {
		//member begin
		b.WriteString(`"member": {`)
		b.WriteString(`"MemberId": ` + strconv.FormatInt(uinfo.Id, 10) + `,`)
		b.WriteString(`"MemberName": "` + uinfo.Username + `",`)
		b.WriteString(`"CurrencyCode": "` + uinfo.Currency + `",`)
		b.WriteString(`"Balance": "` + Float64toStr(uinfo.Balance) + `"`)
		b.WriteString(`}`)
	}
	//member end

	b.WriteString(`}`)
	b.WriteString("}")

	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(b.String())
}

//开奖数据图形
func Trends(c *gin.Context) {
	formate := "2006-01-02T15:04:05+08:00"
	counterId, err := strconv.ParseInt(c.Param("number"), 10, 64)

	if err != nil {
		fmt.Println("counterId is :", err.Error())
	}

	now := time.Now()
	beginTime := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)

	b := bytes.Buffer{}
	b.WriteString(`{"isSuccess": true,`)
	b.WriteString(`"data":[ `)

	if lists, err := models.GetDraws(time.Now(), beginTime, counterId); err == nil {
		for i, v := range lists {

			strNo := strconv.FormatInt(v.Drawno, 10)
			str := strNo[8:len(strNo)]

			intNo, err := strconv.Atoi(str)
			if err != nil {
				fmt.Println("strconv Atoi error")
			}

			b.WriteString("{")
			b.WriteString(`"counterId": 0,`)
			b.WriteString(`"drawNo": ` + strconv.Itoa(intNo) + `,`)
			b.WriteString(`"drawTime":  "` + v.Drawtime.Format(formate) + `",`)
			b.WriteString(`"drawStatus": 0,`)
			b.WriteString(`"voidReason": ` + strconv.Itoa(v.Voidreason) + `,`)
			b.WriteString(`"resultBalls": [` + v.Resultballs + `]`)

			if i >= len(lists)-1 {
				b.WriteString(`}`)
			} else {
				b.WriteString(`},`)
			}
		}
	}

	b.WriteString(`]`)
	b.WriteString("}")

	c.Request.Header.Set("Content-Type", "application/json;charset=UTF-8")
	c.Writer.WriteString(b.String())

}

func Float64toStr(v float64) string {
	string := strconv.FormatFloat(v, 'f', -3, 64)
	return string
}

func Float32toStr(v float64) string {
	string := strconv.FormatFloat(v, 'f', -1, 32)
	return string
}
