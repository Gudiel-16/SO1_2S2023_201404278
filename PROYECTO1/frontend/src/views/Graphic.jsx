import React, { useEffect, useState } from 'react';
import { getDataMonitoring } from '../services/monotoring.service';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graphic = () => {

  const [ipGoAcutal, setIpGoAcutal] = useState(import.meta.env.VITE_IP_GO1);
  const [dataGraphicRam, setDataGraphicRam] = useState([]);
  const [dataGraphicCpu, setDataGraphicCpu] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  let optionsRAM = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rendimiento a lo largo del tiempo',
      },
    },
  };

  let optionsCPU = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rendimiento a lo largo del tiempo',
      },
    },
  };

  const labels = dataLabels;

  let dataRAM = {
    labels,
    datasets: [
      {
        label: 'RAM',
        data: dataGraphicRam,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  let dataCPU = {
    labels,
    datasets: [
      {
        label: 'CPU',
        data: dataGraphicCpu,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect( () => {
      getDataModuls();
      const myInterval = setInterval( async () => {

        getDataModuls();  

      }, 5000);

      return () => clearInterval(myInterval);
      
  }, [ipGoAcutal]);

  const getDataModuls = async () => {

    const res = await getDataMonitoring({ "ipGoAcutal": ipGoAcutal, "ipNode": import.meta.env.VITE_IP_NODE});
    setDataGraphicRam(res.data.data.RendimientoRam);
    setDataGraphicCpu(res.data.data.RendimientoCpu);
    setDataLabels(res.data.data.RendimientoLabel);   
    // console.log("grap");
  };

  const updateValueAcutal = (e) => {
    if(e.target.value == 1){
        setIpGoAcutal(import.meta.env.VITE_IP_GO1);
    }else if (e.target.value == 2){
        setIpGoAcutal(import.meta.env.VITE_IP_GO2);
    }
  };

  return (

    <div className='container-fluid'>

    <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
            <select className="form-select" aria-label="Default select example" onChange={updateValueAcutal}>
                <option value="1">{import.meta.env.VITE_IP_GO1}</option>
                <option value="2">{import.meta.env.VITE_IP_GO2}</option>
            </select>
        </div>
    </div>

      <div className="row mt-4">
        <div className="col-md-10 offset-md-1">
          <Line options={optionsRAM} data={dataRAM} />
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-md-10 offset-md-1">
          <Line options={optionsCPU} data={dataCPU} />
        </div>
      </div>
    </div>
  )
}

export default Graphic