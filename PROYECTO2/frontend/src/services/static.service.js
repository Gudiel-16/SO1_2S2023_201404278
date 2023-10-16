import axios from 'axios';

export const getDataAlmacenados = async (data) =>
    await axios.get("http://" + data.ip_node + ":5003/api/datosalmacenados");

export const getDataAlumnosAprobadosReprobados = async (data) =>
    await axios.post("http://" + data.ip_node + ":5003/api/notacursoporsemestre", { "curso": data.curso, "semestre": data.semestre });

export const getDataMejorPromedio = async (data) =>
    await axios.post("http://" + data.ip_node + ":5003/api/mejorpromedio", { "semestre": data.semestre });

export const getDataEstudiantesPorSemestre = async (data) =>
    await axios.post("http://" + data.ip_node + ":5003/api/estudiantesporsemestre", { "semestre": data.semestre });
