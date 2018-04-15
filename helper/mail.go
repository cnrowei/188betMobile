package helper

import (
	"net/smtp"
	"strings"
)

const (
	HOST     = "smtp.163.com"
	PORT     = "25"
	USER     = "yougamcom@163.com" //发送邮件的邮箱
	PASSWORD = "you88gam87pass"    //发送邮件邮箱的密码
)

/**
* user : example@example.com login smtp server user
* password: xxxxx login smtp server password
* host: smtp.example.com:port   smtp.163.com:25
* to: example@example.com;example1@163.com;example2@sina.com.cn;...
* subject:The subject of mail
* body: The content of mail
* mailtype: mail type html or text
 */
func SendMail(user, password, host, to, subject, body, mailtype string) error {
	hp := strings.Split(host, ":")
	auth := smtp.PlainAuth("", user, password, hp[0])
	var content_type string

	if mailtype == "html" {
		content_type = "Content-Type: text/" + mailtype + "; charset=UTF-8"
	} else if mailtype == "text" {
		content_type = "Content-Type: text/plain" + "; charset=UTF-8"
	} else {
		content_type = "Content-Type: " + mailtype + "; charset=UTF-8"
	}

	msg := []byte("To: " + to + "\r\nFrom: " + user + "<" + user + ">\r\nSubject: " + subject + "\r\n" + content_type + "\r\n\r\n" + body)
	send_to := strings.Split(to, ";")
	err := smtp.SendMail(host, auth, user, send_to, msg)
	return err
}

func SendEmail(to, subject, body, mailtype string) error {
	return SendMail(USER, PASSWORD, (HOST + ":" + PORT), to, subject, body, mailtype)
}
