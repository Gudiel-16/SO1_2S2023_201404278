import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
  } from 'chart.js';
  
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const GraphicBar = (params) => {

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
            label: params.mylabel,
            data: params.dataAxisY,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ],
    };

    return (
        <Bar options={options} data={dataGraph} />
    )
}