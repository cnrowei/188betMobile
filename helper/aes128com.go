package helper

/*
import (
	"encoding/base64"
	"encoding/json"
	"errors"
)

func Aes128COMEncrypt(content string, constKey string) (string, error) {

	guidKey := GUID32BIT() //32位

	kakey := guidKey[:8]              //8位
	kbkey := guidKey[len(guidKey)-3:] //3位
	key := kakey + kbkey + constKey   //16位 , constKey = "23423" //5位

	if len(key) != 16 {
		return "", errors.New("Aes128 the key length must be 16 bytes.")
	}

	if crypted, err := AesCBCEncrypt([]byte(content), []byte(key)); err != nil {
		return "", err
	} else {
		return (kakey + base64.StdEncoding.EncodeToString(crypted) + kbkey), err

	}
}

func Aes128COMDecrypt(crypted string, constKey string) (string, error) {

	kakey := crypted[:8]              //8位
	kbkey := crypted[len(crypted)-3:] //3位
	key := kakey + kbkey + constKey   //16位 , constKey = "23423" //5位

	if len(key) != 16 {
		return "", errors.New("Aes128 the key length must be 16 bytes.")
	}

	b64 := crypted[8 : len(crypted)-3] //截取BASE64密文

	if crypteds, err := base64.StdEncoding.DecodeString(b64); err != nil || crypteds == nil {
		return "", err
	} else {

		// 对AES密文进行解密
		if decrypts, err := AesCBCDecrypt(crypteds, []byte(key)); err == nil {
			return string(decrypts), err
		} else {
			return "", err
		}
	}
}

func SetJsonCOMEncrypt(status int64, msg string, data interface{}) (string, error) {
	//{"status":1, //状态。（1成功， 0失败）"msg":"success", //描述"data":""}
	m := map[string]interface{}{}

	if status != 1 {
		status = 0
	}

	if msg == "" {
		if status == 1 {
			msg = "success"
		} else {
			msg = "failure"
		}
	}

	m["data"] = data
	m["msg"] = msg
	m["status"] = status
	if content, err := json.Marshal(m); err != nil {
		return "", err
	} else {
		if crypted, err := Aes128COMEncrypt(string(content), ConstKey); err != nil {
			return "", err
		} else {
			return crypted, err
		}

	}

	return "", errors.New("执行SetJsonCOMCrypt发生错误!")

}
*/
