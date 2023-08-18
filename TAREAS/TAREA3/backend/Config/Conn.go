package Config

import (
	"log"
	"os"

	"github.com/Gudiel-16/backend/Entities"
	"github.com/joho/godotenv"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Database *gorm.DB

func Connect() error {
	var err error

	errDot := godotenv.Load()

	if err != nil {
		log.Fatalln("Error loading .env file ", errDot)
	}

	var UserDB = os.Getenv("USER_DB")
	var PasswordDB = os.Getenv("PASSWORD_DB")
	var NameDB = os.Getenv("DATABASE_DB")
	var HostDB = os.Getenv("HOST_DB")
	var Uri = UserDB + ":" + PasswordDB + "@tcp(" + HostDB + ")/" + NameDB + "?charset=utf8&parseTime=True&loc=Local"

	Database, err = gorm.Open(mysql.Open(Uri), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})

	if err != nil {
		panic(err)
	}

	err = Database.AutoMigrate(&Entities.Biblioteca{})

	if err != nil {
		return err
	}

	return nil

}
