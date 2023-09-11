import { useEffect, useState } from 'react'

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

  let options = {
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  let data = {
    labels,
    datasets: [
      {
        label: 'RAM',
        data: [10,18,15,32,58,79,20,23,56,98],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'CPU',
        data: [15,70,35,32,24,60,84,20,18,14],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



  return (

    <div className='container-fluid'>
      <div className="row mt-4">
        <div className="col-md-10 offset-md-1">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Graphic