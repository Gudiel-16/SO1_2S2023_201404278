package Entities

import "gorm.io/gorm"

type Biblioteca struct {
	gorm.Model
	Title  string
	Artist string
	Year   string
	Genre  string
}
