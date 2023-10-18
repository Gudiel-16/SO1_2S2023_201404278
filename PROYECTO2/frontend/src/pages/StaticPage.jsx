import React, {useState, useEffect } from 'react';
import { GraphicBar } from '../components/GraphicBar';
import { GraphicLine } from '../components/GraphicLine';
import { GraphicPie } from '../components/GraphicPie';
import TableData from '../components/TableData';
import { getDataAlmacenados, getDataAlumnosAprobadosReprobados, getDataEstudiantesPorSemestre, getDataMejorPromedio } from '../services/static.service';


const StaticPage = () => {

  const [dataCourse, setDataCourse] = useState(['SO1','BD1','LFP','SA','AYD1']);
  const [dataSemester, setDataSemester] = useState(['1S','2S']);
  const [dataGraph1, setDataGraph1] = useState([40,60]); // Grafica pie (aprobados, reprovados)
  const [storedDada, setStoredDada] = useState([]); // Tabla
  const [dataGraph2AxisX, setDataGraph2AxisX] = useState([]); // Grafica de barras (curso mas estudiantes), eje X
  const [dataGraph2AxisY, setDataGraph2AxisY] = useState([]); // Grafica de barras (curso mas estudiantes), eje Y
  const [dataGraph3AxisX, setDataGraph3AxisX] = useState([]); // Grafica de barras (mejor promedio), eje X
  const [dataGraph3AxisY, setDataGraph3AxisY] = useState([]); // Grafica de barras (mejor promedios), eje Y
  const [currentCourse, setCurrentCourse] = useState('SO1');
  const [currentSemesterGraph1, setCurrentSemesterGraph1] = useState('1S'); // Grafica pie (aprobados, reprovados)
  const [currentSemesterGraph2, setCurrentSemesterGraph2] = useState('1S'); // Grafica 
  const [currentSemesterGraph3, setCurrentSemesterGraph3] = useState('1S'); // Grafica 

  useEffect( () => {
      updateAllData();      
  }, []);

  const updateCurrentCourse = (e) => {
    setCurrentCourse(dataCourse[e.target.value-1]);
  }

  const updateCurrentSemesterGraph1 = (e) => {
    setCurrentSemesterGraph1(dataSemester[e.target.value-1]);
  }

  const updateCurrentSemesterGraph2 = (e) => {
    setCurrentSemesterGraph2(dataSemester[e.target.value-1]);
  }

  const updateCurrentSemesterGraph3 = (e) => {
    setCurrentSemesterGraph3(dataSemester[e.target.value-1]);
  }

  const updateAllData = async () => {

    try {
      // TABLE
      const resDataAlmacenados = await getDataAlmacenados({"ip_node": import.meta.env.VITE_IP_NODE});
      setStoredDada(resDataAlmacenados.data.data);

      // GRAPH PIE
      const resDataGraph1 = await getDataAlumnosAprobadosReprobados({"ip_node": import.meta.env.VITE_IP_NODE, "curso": currentCourse, "semestre": currentSemesterGraph1});
      let approved = resDataGraph1.data.data[0].aprob_reprob;
      let reprobate = resDataGraph1.data.data[1].aprob_reprob;
      let total = approved + reprobate;
      let porcApproved = parseInt((approved / total) * 100);
      setDataGraph1([100-porcApproved,porcApproved]);

      // GRAPH BAR, Cursos mayor numero de alumnos
      const resDataGraph2 = await getDataEstudiantesPorSemestre({"ip_node": import.meta.env.VITE_IP_NODE, "semestre": currentSemesterGraph2});
      let axisX_g2 = await resDataGraph2.data.data.map( (value) => value.nombre_curso_abreviado );
      let axisY_g2 = await resDataGraph2.data.data.map( (value) => value.cantidad );
      setDataGraph2AxisX(axisX_g2);
      setDataGraph2AxisY(axisY_g2);

      // GRAPH BAR, Mejor promedio
      const resDataGraph3 = await getDataMejorPromedio({"ip_node": import.meta.env.VITE_IP_NODE, "semestre": currentSemesterGraph3});
      let axisX_g3 = await resDataGraph3.data.data.map( (value) => value.nombre );
      let axisY_g3 = await resDataGraph3.data.data.map( (value) => value.promedio );
      setDataGraph3AxisX(axisX_g3);
      setDataGraph3AxisY(axisY_g3);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='container-fluid'>

      {/* BOTON UPDATE */}
      <div className='row mt-4'>
        <div className='col-md-4 offset-md-4'>
          <div className="d-grid gap-2">
            <button className='btn btn-outline-primary' onClick={updateAllData}>
                <i className="fa-solid fa-rotate-right p-2"></i>
                Update...
            </button>
          </div>
        </div>
      </div>

      {/* -----SELECTS----- */}
      <div className="row mt-5">
        {/* SELECT GRAFICA 1 */}
        <div className="col-2">
          <select className="form-select" aria-label="Default select example" onChange={updateCurrentCourse}>
              { dataCourse.map( (course, i) => (
                  <option key={"cour"+i} value={i+1}>{course}</option>
                )) 
              }
          </select>
        </div>
        <div className="col-2">
          <select className="form-select" aria-label="Default select example" onChange={updateCurrentSemesterGraph1}>
            { dataSemester.map( (semester, i) => (
                <option key={"sem1"+i} value={i+1}>{semester}</option>
              )) 
            }
          </select>
        </div>

        {/* SELECT GRAFICA 2 */}
        <div className="col-4">
          <select className="form-select" aria-label="Default select example" onChange={updateCurrentSemesterGraph2}>
            { dataSemester.map( (semester, i) => (
                <option key={"sem2"+i} value={i+1}>{semester}</option>
              )) 
            }
          </select>
        </div>

        {/* SELECT GRAFICA 3 */}
        <div className="col-4">
          <select className="form-select" aria-label="Default select example" onChange={updateCurrentSemesterGraph3}>
              { dataSemester.map( (semester, i) => (
                  <option key={"sem3"+i} value={i+1}>{semester}</option>
                )) 
              }
          </select>
        </div>
      </div>

      {/* -----GRAFICAS----- */}
      <div className="row mt-5">
        <div className="col-4">
          <GraphicPie datagraph = {dataGraph1} nameGraph = "Porcentaje de aprobacion" />
        </div>
        <div className="col-4">
          <GraphicBar mytitle = "Cusos con mayor numero de estudiantes"
                      mylabel = 'CANTIDAD' 
                      dataAxisX = {dataGraph2AxisX} 
                      dataAxisY = {dataGraph2AxisY} />

          <GraphicLine className="mt-4" 
                      mytitle = "Cusos con mayor numero de estudiantes" 
                      mylabel = 'CANTIDAD'
                      myfiller = {true}
                      dataAxisX = {dataGraph2AxisX} 
                      dataAxisY = {dataGraph2AxisY} />
        </div>
        <div className="col-4">
          <GraphicBar mytitle = "Alumnos con mejor promedio"
                      mylabel = 'PROMEDIO' 
                      dataAxisX = {dataGraph3AxisX} 
                      dataAxisY = {dataGraph3AxisY} />

          <GraphicLine mytitle = "Alumnos con mejor promedio"
                      mylabel = 'PROMEDIO'
                      myfiller = {true} 
                      dataAxisX = {dataGraph3AxisX} 
                      dataAxisY = {dataGraph3AxisY} />
        </div>
      </div>

      {/* TABLA */}
      <TableData students = {storedDada} />

    </div>
  )
}

export default StaticPage