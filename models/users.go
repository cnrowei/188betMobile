package models

import "time"

type Users struct {
	Id          int64     `json:"id"`
	Username    string    `xorm:"varchar(50) notnull" json:"username"`
	Password    string    `xorm:"varchar(50) notnull" json:"password"`
	Nickname    string    `xorm:"varchar(50) " json:"nickname"`      //昵称
	Agent       int       `xorm:"default 0" json:"agent"`            //上级代理的ID，0为普通代理
	Role        int       `xorm:"default 0" json:"role"`             //用户角色系统管理3、总代理2、代理1、会员0
	Currency    string    `json:"currency"`                          //货币类型 “RMB"
	Balance     float64   `xorm:"default 0" json:"balance"`          //财务额度
	Credit      float64   `xorm:"default 0" json:"credit"`           //信用额度
	Nowbalance  float64   `xorm:"default 0" json:"nowbalance"`       //当前信用额度
	Btccoin     float64   `xorm:"default 0" json:"btccoin"`          //btc
	Ethcoin     float64   `xorm:"default 0" json:"btccoin"`          //eth
	Ltbcoin     float64   `xorm:"default 0" json:"btccoin"`          //ltb
	Online      bool      `xorm:"default(false)" json:"online"`      //是否在线
	Loginstatus bool      `xorm:"default(false)" json:"loginstatus"` //账号状态
	Odds        string    `json:"odds"`                              //赔率盘口
	Status      bool      `xorm:"default(false)" json:"status"`      //是否收单
	Created     time.Time `xorm:"created" json:"created"`            //添加时间
	Updated     time.Time `xorm:"updated" json:"updated"`            //更新时间
}
