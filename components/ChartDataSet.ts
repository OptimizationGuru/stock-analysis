// chartDatasets.js

import { StockDataPoint, StockState } from '@/utils/enums';

export const formatData = (arr: StockDataPoint[]) => {
  return arr?.map((el) => ({
    x: el.day,
    y: el.value,
  }));
};

export const createDatasets = (stockState: StockState) => {
  return [
    {
      label: stockState.stock,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    },
    {
      label: 'Open Price',
      data: formatData(stockState.openPrice),
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
      data: formatData(stockState.closingPrice),
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
      data: formatData(stockState.highestPrice),
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
      data: formatData(stockState.lowestPrice),
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
      data: formatData(stockState.volumeSold),
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
};
