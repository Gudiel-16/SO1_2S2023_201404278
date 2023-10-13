package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var rbd *redis.Client

type Data struct {
	Album  string
	Artist string
	Year   string
}

func redisConnect() {
	rbd = redis.NewClient(&redis.Options{
		Addr:     "172.17.0.2:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	pong, err := rbd.Ping(ctx).Result()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(pong)
}

func insertRedis(c *fiber.Ctx) error {

	var data map[string]string
	e := c.BodyParser(&data)

	if e != nil {
		return e
	}

	myuuid := uuid.Must(uuid.NewRandom()).String()

	album := Data{
		Album:  data["album"],
		Artist: data["artist"],
		Year:   data["year"],
	}

	albumJSON, errr := json.Marshal(album)
	if errr != nil {
		log.Fatal(errr)
	}

	//fmt.Println(myuuid)
	fmt.Print(string(albumJSON))

	// //array := rank.Artist + "-" + rank.Year + "-" + rank.Album
	// //rbd.HIncrBy(ctx, array, rank.Ranked, 1)
	err := rbd.Set(ctx, myuuid, string(albumJSON), 0).Err()

	if err != nil {
		log.Fatal("error al guardar: ", err)
	}

	return nil

}

func main() {
	app := fiber.New()

	redisConnect()

	app.Post("/api/data", insertRedis)

	err := app.Listen(":5000")

	if err != nil {
		return
	}
}
