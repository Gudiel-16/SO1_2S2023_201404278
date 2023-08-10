package routes

import (
	"encoding/json"
	"net/http"

	"github.com/Gudiel-16/so1-tarea2/models"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hola Mundo"))
}

func GetData(w http.ResponseWriter, r *http.Request) {
	data := models.User{Carnet: "201404278", Nombre: "Christopher Alexander Acajabon GUdiel"}
	json.NewEncoder(w).Encode(&data)
}
