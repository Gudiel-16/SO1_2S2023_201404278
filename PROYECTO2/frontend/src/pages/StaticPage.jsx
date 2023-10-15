import React, {useState, useEffect } from 'react';
import { GraphicPie } from '../components/GraphicPie';
import { getDataAlmacenados, getDataAlumnosAprobadosReprobados, getDataMejorPromedio } from '../services/static.service';

const StaticPage = () => {

  const [dataCourse, setDataCourse] = useState(['SO1','BD1','LFP','SA','AYD1']);
  const [dataSemester, setDataSemester] = useState(['1S','2S']);
  const [dataGraph1, setDataGraph1] = useState([40,60]);
  const [currentCourse, setCurrentCourse] = useState('SO1');
  const [currentSemesterGraph1, setCurrentSemesterGraph1] = useState('1S');
  
  const updateCurrentCourse = (e) => {
    setCurrentCourse(dataCourse[e.target.value-1]);
  }

  const updateCurrentSemesterGraph1 = (e) => {
    setCurrentSemesterGraph1(dataSemester[e.target.value-1]);
  }

  const updateAllData = async () => {

    try {
      const resDataAlmacenados = await getDataAlmacenados({"ip_node": import.meta.env.VITE_IP_NODE});
      console.log(resDataAlmacenados.data);

      const resDataGraph1 = await getDataAlumnosAprobadosReprobados({"ip_node": import.meta.env.VITE_IP_NODE, "curso": currentCourse, "semestre": currentSemesterGraph1});
      let approved = resDataGraph1.data.data[0].aprob_reprob;
      let reprobate = resDataGraph1.data.data[1].aprob_reprob;
      let total = approved + reprobate;
      let porcApproved = parseInt((approved / total) * 100);
      setDataGraph1([100-porcApproved,porcApproved]);

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
          aa
        </div>

        {/* SELECT GRAFICA 3 */}
        <div className="col-4">
          aa
        </div>
      </div>

      {/* -----GRAFICAS----- */}
      <div className="row mt-5">
        <div className="col-4">
          <GraphicPie datagraph = {dataGraph1} nameGraph = "Porcentaje de aprobacion" />
        </div>
        <div className="col-4">
              Graphic2
        </div>
        <div className="col-4">
              Graphic3
        </div>
      </div>

    </div>
  )
}

export default StaticPage