'use client';
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { stockDataArray } from '@/utils/enums';

Chart.register(...registerables);

const StockChartWithShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const formatData = (arr) => {
      return arr.map((el) => ({
        x: el.day,
        y: el.value,
      }));
    };

    const datasets = [
      {
        label: 'Open Price',
        data: formatData(stockDataArray.openPrice),
        type: 'line',
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        pointStyle: 'circle',
        radius: 10,
        fill: false,
        tension: 0,
      },
      {
        label: 'Closing Price',
        data: formatData(stockDataArray.closingPrice),
        type: 'scatter',
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        pointStyle: 'rect',
        radius: 10,
        hoverRadius: 12,
        borderWidth: 2,
      },
      {
        label: 'Highest Price',
        data: formatData(stockDataArray.highestPrice),
        type: 'scatter',
        borderColor: '#FFCE56',
        backgroundColor: '#FFCE56',
        pointStyle: 'triangle',
        radius: 10,
        hoverRadius: 12,
        borderWidth: 2,
      },
      {
        label: 'Lowest Price',
        data: formatData(stockDataArray.lowestPrice),
        type: 'scatter',
        borderColor: '#4BC0C0',
        backgroundColor: '#4BC0C0',
        pointStyle: 'circle',
        radius: 10,
        hoverRadius: 12,
        borderWidth: 2,
      },
      {
        label: 'Volume',
        data: formatData(stockDataArray.volumeSold),
        type: 'scatter',
        borderColor: '#9966FF',
        backgroundColor: '#9966FF',
        pointStyle: 'star',
        borderWidth: 2,
        radius: 10,
        hoverRadius: 12,
        tension: 0.3,
      },
    ];

    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.raw.y.toFixed(2);
                return `${label}: ${label.includes('Volume') ? value + ' Units' : '$' + value}`;
              },
            },
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        layout: {
          padding: { left: 20, right: 20 },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days',
            },
            beginAtZero: false,
            ticks: {
              callback: (value) => `Day ${value}`,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Prices (in $) / Volume (in Thousands)',
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className=" border border-black z-50">
      <canvas ref={canvasRef} width="1200" height="600" />
    </div>
  );
};

export default StockChartWithShapes;
