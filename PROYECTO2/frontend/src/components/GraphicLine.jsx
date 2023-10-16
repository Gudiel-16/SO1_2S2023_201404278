import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
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
    Filler,
    Legend
  );

export const GraphicLine = (params) => {

    let options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: params.mytitle,
          },
        },
    };

    const labels = params.dataAxisX;

    let dataGraph = {
        labels,
        datasets: [
          {
            fill: params.myfiller,
            label: params.mylabel,
            data: params.dataAxisY,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
          }
        ],
    };

    return (
        <Line options={options} data={dataGraph} />
    )
}