package models

import (
	"errors"
	"fmt"

	"github.com/go-xorm/xorm"
	_ "github.com/lib/pq"
)

const (
	DBTYPE = "PGSQL"
)

var (
	DB *xorm.Engine
)

func init() {
	DB, err := SetEngine()
	if err != nil {
		panic(err)
	}

	if err := CreatTables(DB); err != nil {
		panic(err)
	}

	initData()
}

func ConDb() (*xorm.Engine, error) {
	switch {
	case DBTYPE == "MYSQL":
		return xorm.NewEngine("mysql", "root:YouPass@/db?charset=utf8")
	case DBTYPE == "PGSQL":
		// "user=postgres password=jn!@#$%^&* dbname=yougam sslmode=disable maxcons=10 persist=true"
		//return xorm.NewEngine("postgres", "host=110.76.39.205 user=postgres password=jn!@#$%^&* dbname=yougam sslmode=disable")
		return xorm.NewEngine("postgres", fmt.Sprintf("postgres://%v:%v@localhost/%v?sslmode=disable", "root", "ishgishg", "bet18888"))
		//return xorm.NewEngine("postgres", "host=127.0.0.1 port=6432 user=postgres password=jn!@#$%^&* dbname=yougam sslmode=disable")
	}
	return nil, errors.New("尚未设定数据库连接")
}

func SetEngine() (*xorm.Engine, error) {
	err := errors.New("")
	if DB, err = ConDb(); err != nil {

		return nil, err
	} else {

		DB.ShowSQL(true)      //true则会在控制台打印出生成的SQL语句；
		DB.ShowExecTime(true) //true则会在控制台打印调试信息；

		/*
			cacher := xorm.NewLRUCacher(xorm.NewMemoryStore(), 10000)
			engine.SetDefaultCacher(cacher)

			if f, err := os.Create("./logs/xorm.log"); err != nil {
				println(err.Error())
				panic("OMG!")
			} else {
				engine.SetLogger(xorm.NewSimpleLogger(f))
			}
		*/

		return DB, err
	}
}

func CreatTables(engine *xorm.Engine) error {
	return engine.Sync2(&Users{}, &Selections{}, &Counters{}, &Draws{})
	//Engine.CreateTables(&User{}, &Category{}, &Node{}, &Topic{}, &Reply{})
}

func initData() {
	//用户等级划分：正数是普通用户，负数是管理员各种等级划分，为0则尚未注册
	// if usr, err := GetUserByRole(-1000); usr == nil && err == nil {
	// 	if row, err := AddUser("root@you.com", "root", "root", "root", helper.Encrypt_hash("rootpass", nil), 0, "", "", "", 1, -1000); err == nil && row > 0 {
	// 		fmt.Println("Default Email:root@you.com ,Username:root ,Password:rootpass")
	// 	} else {
	// 		fmt.Print("create root got errors:", err)
	// 	}
	// }
	counters := make([]Counters, 6)
	counters[0] = Counters{Id: 310, Name: "ShangHai", Official: "http://fucai.eastday.com/LotteryNew/app_SSSL.aspx", Status: 4, Seq: 0, Ballcount: 3, Resultopenintervalsecond: 0, Resultwaitingintervalsecond: 0}
	counters[1] = Counters{Id: 320, Name: "Chongqing", Official: "http://www.cqcp.net/game/ssc/", Status: 4, Seq: 2, Ballcount: 5, Resultopenintervalsecond: 0, Resultwaitingintervalsecond: 0}
	counters[2] = Counters{Id: 330, Name: "JiangXi", Official: "http://data.shishicai.cn/jxssc/haoma/", Status: 4, Seq: 3, Ballcount: 5, Resultopenintervalsecond: 0, Resultwaitingintervalsecond: 0}
	counters[3] = Counters{Id: 340, Name: "TianJing", Official: "http://www.tjflcpw.com/report/SSC_WinMessage.aspx", Status: 4, Seq: 4, Ballcount: 5, Resultopenintervalsecond: 0, Resultwaitingintervalsecond: 0}
	counters[4] = Counters{Id: 350, Name: "ChinaSwl3D", Official: "http://www.zhcw.com/3d/kaijiangshuju/index.shtml?type=0", Status: 4, Seq: 1, Ballcount: 3, Resultopenintervalsecond: 0, Resultwaitingintervalsecond: 0}
	counters[5] = Counters{Id: 360, Name: "XinJiang", Official: "http://www.xjflcp.com/game/sscIndex", Status: 2, Seq: 5, Ballcount: 5, Resultopenintervalsecond: 0, Resultwaitingintervalsecond: 0}
	affected, _ := DB.Insert(&counters)

	fmt.Println("##################  Service Start! #####################", affected)
}

// func init() {
// 	DB, err := gorm.Open("postgres", fmt.Sprintf("postgres://%v:%v@localhost/%v?sslmode=disable", "root", "ishgishg", "bet18888"))
// 	if err != nil {
// 		panic("##### failed to connect database #####")
// 	}

// 	// 创建数据库
// 	DB.AutoMigrate(&User{}, &Selections{})
// 	DB.Debug()
// 	//db.LogMode(true)

// 	//db.Create(&)
// 	defer DB.Close()
// }
