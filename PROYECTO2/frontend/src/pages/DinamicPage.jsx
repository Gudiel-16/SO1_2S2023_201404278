import { useEffect, useState } from 'react';
import { GraphicBar } from '../components/GraphicBar';
import TableDinamic from '../components/TableDinamic';
import socket from '../socket/Socket';

const DinamicPage = () => {

  const [fooEvents, setFooEvents] = useState([]);
  const [amountData, setAmountData] = useState(0); // Cantidad de datos
  const [storedData, setStoredData] = useState([]); // Tabla
  const [amountCourseSemester, setAmountCourseSemester] = useState(0); // Cantidad notas por curso y semestre
  const [dataCourse, setDataCourse] = useState(['SO1','BD1','LFP','SA','AYD1']);
  const [dataSemester, setDataSemester] = useState(['1S','2S']);
  const [currentCourse, setCurrentCourse] = useState('SO1');
  const [currentSemester, setCurrentSemester] = useState('1S');
  const [dataGraphAxisX, setDataGraphAxisX] = useState([]); 
  const [dataGraphAxisY, setDataGraphAxisY] = useState([]); 

  useEffect(() => {
    
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {

    function onFooEvent(value) {
      // console.log(value);
      let curso_semestre = currentCourse + currentSemester;
      setFooEvents(value);
      setAmountData(value.data_total);
      setStoredData(value.data_stored);
      setAmountCourseSemester(value.cantidad_notas[curso_semestre] || 0);
      setDataGraphAxisX([currentCourse]);
      setDataGraphAxisY([value.cantidad_notas[curso_semestre] || 0]);
    }

    socket.on("datadinamic", onFooEvent);

    return () => {
      socket.off('datadinamic', onFooEvent);
    }
  }, [fooEvents]);

  const updateCurrentCourse = (e) => {
    setCurrentCourse(dataCourse[e.target.value-1]);
  }

  const updateCurrentSemester = (e) => {
    setCurrentSemester(dataSemester[e.target.value-1]);
  }

  return (
    <div className='container-fluid'>
      <div className="row mt-5">

        <div className="col-4">
          <h3 className='text-center'>CANTIDAD DE DATOS</h3>
        </div>

        {/* SELECT */}
        <div className="col-2">
          <select className="form-select" aria-label="Default select example" onChange={updateCurrentCourse}>
              { dataCourse.map( (course, i) => (
                  <option key={"cour"+i} value={i+1}>{course}</option>
                )) 
              }
          </select>
        </div>
        <div className="col-2">
          <select className="form-select" aria-label="Default select example" onChange={updateCurrentSemester}>
            { dataSemester.map( (semester, i) => (
                <option key={"sem1"+i} value={i+1}>{semester}</option>
              )) 
            }
          </select>
        </div>

        <div className="col-4">
          <h3 className='text-center'>CANTIDAD EN CURSO Y SEMESTRE</h3>
        </div>
      </div>

      <div className="row mt-5">

        <div className="col-4">
          <h1 className='text-center mt-5'>{amountData}</h1>
        </div>

        <div className="col-4">
          <GraphicBar mytitle = "Notas en curso y semestre especifico"
                      mylabel = 'CANTIDAD' 
                      dataAxisX = {dataGraphAxisX} 
                      dataAxisY = {dataGraphAxisY} />
        </div>

        <div className="col-4">
          <div className="row mt-5">
            <div className="col-4 offset-2">
              <h3 className='text-center'>{currentCourse} - {currentSemester}:</h3>
            </div>
            <div className="col-3">
              <h3 className='text-center'>{amountCourseSemester}</h3>
            </div>
          </div>
        </div>

        <TableDinamic students = {storedData} />

      </div>

    </div>    
  )
}

export default DinamicPage