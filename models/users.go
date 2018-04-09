package models

//用户表
type Users struct {
	ID           int     `json:"id"`
	Username     string  `json:"username"`
	Password     string  `json:"password"`
	Agent        int     `json:"agent"`        //上级代理的ID
	CurrencyCode string  `json:"currencycode"` //货币类型 “RMB"
	Balance      float32 `json:"balance"`      //货币
}
