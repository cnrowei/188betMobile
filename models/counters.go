package models

import "time"

// type Counters struct {
// 	ID                          int           `json:"id"`
// 	Name                        string        `json:"name"`
// 	Official                    string        `json:"official"`
// 	Status                      int           `json:"status"`
// 	Draw                        []interface{} `json:"draw"`
// 	Selections                  Selections    `json:"selections"`
// 	GameResult                  []interface{} `json:"gameResult"`
// 	Seq                         int           `json:"seq"`
// 	BallCount                   int           `json:"ballCount"`
// 	ResultOpenIntervalSecond    int           `json:"resultOpenIntervalSecond"`
// 	ResultWaitingIntervalSecond int           `json:"resultWaitingIntervalSecond"`
// }

//彩票列表
type Counters struct {
	ID                          int    `json:"id"`
	Name                        string `json:"name"`
	Official                    string `json:"official"`
	Status                      int    `json:"status"`
	Seq                         int    `json:"seq"`
	BallCount                   int    `json:"ballCount"`
	ResultOpenIntervalSecond    int    `json:"resultOpenIntervalSecond"`
	ResultWaitingIntervalSecond int    `json:"resultWaitingIntervalSecond"`
}

//期数
type Draw struct {
	CounterID       int       `json:"counterId"`
	DrawNo          int       `json:"drawNo"`
	DrawStatus      int       `json:"drawStatus"` //开奖的状态
	StartTime       time.Time `json:"startTime"`  //开奖的时间
	EndTime         time.Time `json:"endTime"`    //结束的时间
	BetClosedMMSS   string    `json:"betClosedMMSS"`
	IsCloseManually bool      `json:"isCloseManually"`
	VoidReason      int       `json:"voidReason"`
	ResultBalls     []int     `json:"resultBalls"` //开奖的数字
}

//投注的列表
type Selections struct {
	ID        int     `json:"id"`
	CounterID int     `json:"counterId"`
	Odds      float64 `json:"odds"`   //赔率
	MinBet    float64 `json:"minBet"` //最小押注
	MaxBet    float64 `json:"maxBet"` //最大押注
	Name      string  `json:"name"`   //标识词
}

/*
type GameResult struct {
	CounterID   int       `json:"counterId"`
	DrawNo      int       `json:"drawNo"`
	DrawTime    time.Time `json:"drawTime"`
	DrawStatus  int       `json:"drawStatus"`
	VoidReason  int       `json:"voidReason"`
	ResultBalls []int     `json:"resultBalls"`
}
*/
