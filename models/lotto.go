package models

import (
	"time"
)

//彩票列表
type Counters struct {
	Id                          int64  `json:"id"`
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
	Id              int64     `json:"id"`
	Counterid       int64     `xorm:"index" json:"counterId"`
	Drawno          int64     `json:"drawNo"`
	Drawtime        time.Time `json:"drawTime"`
	Drawstatus      int       `json:"drawStatus"` //开奖的状态
	Starttime       time.Time `json:"startTime"`  //开奖的时间
	Endtime         time.Time `json:"endTime"`    //结束的时间
	Betclosedmmss   string    `json:"betClosedMMSS"`
	Isclosemanually bool      `json:"isCloseManually"`
	Voidreason      int       `json:"voidReason"`
	Resultballs     []int     `json:"resultBalls"` //开奖的数字
}

//投注的列表
type Selections struct {
	Id        int64   `json:"id"`
	Counterid int64   `xorm:"index" json:"counterId"`
	Name      string  `xorm:"varchar(50)" json:"name"` //标识词
	Odds      float64 `json:"odds"`                    //赔率
	Minbet    float64 `json:"minBet"`                  //最小押注
	Maxbet    float64 `json:"maxBet"`                  //最大押注

}

//彩票列表
func GetCounters(desc string) (list []*Counters, err error) {
	//list := &[]Counters{}
	err = DB.Asc(desc).Find(&list)
	return list, err
}

//投注列表
func GetSelections(Counterid int64) (list []*Selections, err error) {
	//list := &[]Counters{}
	err = DB.Where("Counterid=?", Counterid).Find(&list)
	return list, err
}

//添加单注赔率
func NewSelection(sel *Selections) (int64, error) {
	if has, err := DB.Insert(sel); err == nil {
		return has, err
	} else {
		return -1, err
	}
}

//查找单注是否存在
func FindSelection(name string, counterID int64) (int64, error) {
	sel := &Selections{}
	if has, err := DB.Where("name=? and counterid=?", name, counterID).Get(sel); has {
		return sel.Id, err
	} else {
		return 0, err
	}
}

//编辑
func EditSelection(id int64, sel *Selections) (int64, error) {
	//add := &Selections{Code: code, Descr: descr, Lang: lang}
	has, err := DB.ID(id).Cols("odds", "mixBet", "maxBet").Update(&sel)
	return has, err
}

//获取期数
func GetDraw(nowTime time.Time, Counterid int64) (*Draws, error) {
	info := &Draws{}
	if has, err := DB.Where("starttime<=? and endtime>=? and counterid=?", nowTime, nowTime, Counterid).Get(info); has {
		return info, err
	} else {
		return nil, err
	}

}
