package models

type Hijoscpu struct {
	Pid_nombre     string
	Pid            string
	Nombre         string
	Usuario        string
	Porcentaje_ram string
	Estado         string
}

type Cpu_model struct {
	Pid_nombre     string
	Pid            string
	Nombre         string
	Usuario        string
	Porcentaje_ram string
	Estado         string
	Hijos          []Hijoscpu
}
