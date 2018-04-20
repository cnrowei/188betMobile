package helper

/*
s := strconv.Itoa(i)
s := strconv.FormatInt(int64(i), 10)

int64转string
i := int64(123)
s := strconv.FormatInt(i, 10)

string转int
i, err := strconv.Atoi(s)
string转int64
i, err := strconv.ParseInt(s, 10, 64)

s := "3.1415926535"
v1, err := strconv.ParseFloat(v, 32)
v2, err := strconv.ParseFloat(v, 64)


//string到int
int,err:=strconv.Atoi(string)
//string到int64
int64, err := strconv.ParseInt(string, 10, 64)
//int到string
string:=strconv.Itoa(int)
//int64到string
string:=strconv.FormatInt(int64,10)
//string到float32(float64)
float,err := strconv.ParseFloat(string,32/64)
//float到string
string := strconv.FormatFloat(float32, 'E', -1, 32)
string := strconv.FormatFloat(float64, 'E', -1, 64)
// 'b' (-ddddp±ddd，二进制指数)
// 'e' (-d.dddde±dd，十进制指数)
// 'E' (-d.ddddE±dd，十进制指数)
// 'f' (-ddd.dddd，没有指数)
// 'g' ('e':大指数，'f':其它情况)
// 'G' ('E':大指数，'f':其它情况)

//获取本地location
toBeCharge := "2015-01-01 00:00:00"                             //待转化为时间戳的字符串 注意 这里的小时和分钟还要秒必须写 因为是跟着模板走的 修改模板的话也可以不写
timeLayout := "2006-01-02 15:04:05"                             //转化所需模板
loc, _ := time.LoadLocation("Local")                            //重要：获取时区
theTime, _ := time.ParseInLocation(timeLayout, toBeCharge, loc) //使用模板在对应时区转化为time.time类型
sr := theTime.Unix()                                            //转化为时间戳 类型是int64
fmt.Println(theTime)                                            //打印输出theTime 2015-01-01 15:15:00 +0800 CST
fmt.Println(sr)



*/
