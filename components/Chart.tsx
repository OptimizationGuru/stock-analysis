'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

Chart.register(...registerables);

 const StockChart = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stockData = useSelector((state: RootState) => state.stocks);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Price',
              data: stockData.price.map((point) => ({ x: point.x, y: point.y })),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              type: 'scatter', // Keep as scatter for visualization
              pointStyle: 'rect', // Rectangle for price data
              radius: 10, // Increase size of rectangles
              showLine: true, // Optional: show line connecting points
            },
            {
              label: 'Volume',
              data: stockData.volume.map((point) => ({ x: point.x, y: point.y })),
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
              type: 'scatter', // Keep as scatter
              pointStyle: 'triangle', // Triangle for volume data
              radius: 10, // Increase size of triangles
            },
            {
              label: 'Volatility',
              data: stockData.volatility.map((point) => ({ x: point.x, y: point.y })),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              type: 'scatter', // Keep as scatter
              pointStyle: 'rectRot', // Rotated square for volatility data
              radius: 10, // Increase size of squares
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const { dataset, dataIndex } = context;
                  return `${dataset.label}: ${dataset.data[dataIndex].y}`;
                },
                afterBody: (context) => {
                  const values = context[0].dataset.data;
                  const avg = (values.reduce((acc, val) => acc + val.y, 0) / values.length).toFixed(2);
                  return `Avg: ${avg}`;
                },
              },
            },
          },
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
          },
        },
      });
      

      return () => chart.destroy();
    }
  }, [stockData]);

  return <canvas ref={canvasRef} width="400" height="200" />;
};

export default StockChart;
