import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const GraphicPie = (params) => {

    let data = {
        labels: ['Uso', 'Libre'],
        datasets: [
            {
            label: 'Porcentaje',
            data: params.datagraph,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };
      

  return (
    <>
        <h3 className="d-flex justify-content-center">{params.nameGraph}</h3>
        <Pie data={data}></Pie>
    </>
  )
}
