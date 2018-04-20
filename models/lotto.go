package models

import (
	"time"
)

//彩票列表
type Counters struct {
	Id                          int64  `gorm:"AUTO_INCREMENT" json:"id"`
	Name                        string `json:"name"`     //名称
	Official                    string `json:"official"` //盘口浏览地址
	Status                      int    `json:"status"`   //状态
	Seq                         int    `json:"seq"`
	Ballcount                   int    `json:"ballCount"`
	Resultopenintervalsecond    int    `json:"resultOpenIntervalSecond"`
	Resultwaitingintervalsecond int    `json:"resultWaitingIntervalSecond"`
}

//期数
type Draws struct {
	Id              int64     `gorm:"AUTO_INCREMENT" json:"id"`
	Counterid       int64     `gorm:"index" json:"counterId"`
	Drawno          int64     `json:"drawNo"`
	Drawtime        time.Time `json:"drawTime"`
	Drawstatus      int       `json:"drawStatus"` //开奖的状态
	Starttime       time.Time `json:"startTime"`  //开奖的时间
	Endtime         time.Time `json:"endTime"`    //结束的时间
	Betclosedmmss   string    `json:"betClosedMMSS"`
	Isclosemanually bool      `json:"isCloseManually"`
	Voidreason      int       `json:"voidReason"`
	Resultballs     string    `json:"resultBalls"` //开奖的数字
}

//投注的列表
type Selections struct {
	Id        int64   `gorm:"AUTO_INCREMENT" json:"id"`
	Counterid int64   `gorm:"index" json:"counterId"`
	Name      string  `gorm:"varchar(50)" json:"name"` //标识词
	Odds      float64 `json:"odds"`                    //赔率
	Minbet    float64 `json:"minBet"`                  //最小押注
	Maxbet    float64 `json:"maxBet"`                  //最大押注

}

/*
{
    "isSuccess": true,
    "data": {
        "totalCount": 2,
        "totalStake": 4.0000,
        "totalReturnAmount": 3.80000000,
        "wagers": [{
            "createTime": "2018-04-20T10:52:18+08:00",
            "wagerNo": "180420391381795475",
            "stake": 2.0000,
            "returnAmount": 0.0,
            "bets": [{
                "counterId": 320,
                "drawNo": "30",
                "betType": "万 | 一定位单/双",
                "selection": "双",
                "odds": 1.9500
            }]
        }, {
            "createTime": "2018-04-20T10:52:18+08:00",
            "wagerNo": "180420391381797131",
            "stake": 2.0000,
            "returnAmount": 0.0,
            "bets": [{
                "counterId": 320,
                "drawNo": "30",
                "betType": "万 | 一定位大/小",
                "selection": "小",
                "odds": 1.9500
            }]
        }]
    }
}
*/

type Wagers struct {
	WagerNo      int64        `gorm:"AUTO_INCREMENT" json:"wagerNo"`
	CounterID    int64        `gorm:"index" json:"counterId"`
	DrawNo       int64        `gorm:"index" json:"drawNo"`
	Selections   []Selections `json:"selections"`
	Stake        float64      `gorm:"type:numeric(18,4)" json:"stake"`
	EstWinning   float64      `json:"estWinning"`
	IsSystemPick bool         `json:"isSystemPick"`
	BetType      string       `gorm:"type:varchar(50)" json:"betType"`
	Selection    string       `gorm:"type:varchar(50)" json:"selection"`
	ReturnAmount float64      `json:"returnAmount"`
	CreateTime   time.Time    `json:"createTime"`
}

//类型
type Bets struct {
	Bets      int64   `gorm:"AUTO_INCREMENT" json:"Bets"`
	CounterID int64   `gorm:"index" json:"counterId"`
	DrawNo    string  `gorm:"varchar(50) json:"drawNo"`
	BetType   string  `gorm:"varchar(50) json:"betType"`
	Selection string  `gorm:"varchar(50) json:"selection"`
	Odds      float64 `json:"odds"`
}

//获取彩票列表
func GetCounter(Counterid int64) (*Counters, error) {
	info := &Counters{}
	err := db.Where("id=?", Counterid).Find(info).Error
	return info, err
}

//彩票列表
func GetCounters(desc string) ([]*Counters, error) {
	//list := &[]Counters{}
	var lists []*Counters
	err := db.Order(desc).Find(&lists).Error
	return lists, err
}

//投注列表
func GetSelections(Counterid int64) ([]*Selections, error) {
	var lists []*Selections
	err := db.Where("Counterid=?", Counterid).Find(&lists).Error
	return lists, err
}

//添加单注赔率
func NewSelection(sel *Selections) (int64, error) {
	if db.NewRecord(sel) {
		err := db.Create(sel).Error
		return sel.Id, err
	} else {
		return -1, nil
	}
}

//查找单注是否存在
func FindSelection(name string, counterID int64) (int64, error) {
	sel := &Selections{}
	err := db.Where("name=? and counterid=?", name, counterID).Find(sel).Error
	if err == nil {
		return sel.Id, nil
	} else {
		return 0, err
	}
}

//编辑
func EditSelection(id int64, sel *Selections) (int64, error) {

	//db.Model(&user).Update("name", "hello")
	//add := &Selections{Code: code, Descr: descr, Lang: lang}
	//has, err := DB.ID(id).Cols("odds", "mixBet", "maxBet").Update(&sel)
	return 1, nil
}

//获取期数
func GetDraw(nowTime time.Time, counterId int64) (*Draws, error) {
	info := &Draws{}
	err := db.Where("starttime<=? and endtime>=? and counterid=?", nowTime, nowTime, counterId).Find(info).Error
	return info, err
}

//期数列表
func GetDraws(nowTime, beginTime time.Time, counterId int64) ([]*Draws, error) {
	//list := &[]Counters{}
	var lists []*Draws
	err := db.Where("endtime<=? and endtime >=? and counterid=?", nowTime, beginTime, counterId).Order("Drawno").Find(&lists).Error
	return lists, err
}

func GetDrawno(drawno int64) (*Draws, error) {
	info := &Draws{}
	err := db.Where("Drawno=?", drawno).Find(info).Error
	return info, err
}
