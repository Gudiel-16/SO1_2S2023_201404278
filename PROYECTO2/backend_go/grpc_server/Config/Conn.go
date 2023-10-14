package Config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Database *gorm.DB

func Connect() error {
	var err error

	errDot := godotenv.Load()

	if errDot != nil {
		log.Fatalln("Error loading .env file ", errDot)
	}

	var UserDB = os.Getenv("USER_DB")
	var PasswordDB = os.Getenv("PASSWORD_DB")
	var NameDB = os.Getenv("DATABASE_DB")
	var HostDB = os.Getenv("HOST_DB")
	// var UserDB = "root"
	// var PasswordDB = "secret"
	// var NameDB = "db_record_of_notes"
	// var HostDB = "172.17.0.2"

	var Uri = UserDB + ":" + PasswordDB + "@tcp(" + HostDB + ")/" + NameDB + "?charset=utf8&parseTime=True&loc=Local"
	fmt.Println(Uri)

	Database, err = gorm.Open(mysql.Open(Uri), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})

	if err != nil {
		panic(err)
	}

	// err = Database.AutoMigrate(&Entities.Nota{})

	// if err != nil {
	// 	return err
	// }

	return nil

}
