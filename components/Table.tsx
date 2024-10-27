
"use client"
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setMockData } from '@/redux/stocksSlice';
const DataTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMockData()); 
      }, [dispatch]);
   
  const stockData = useSelector((state: RootState) => state.stocks);

  console.log(stockData, 'data');
  

  return (
    <table className="table-auto w-full border border-gray-200">
      <thead>
        <tr>
          <th className="border px-4 py-2">Time</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Volume</th>
          <th className="border px-4 py-2">Volatility</th>
        </tr>
      </thead>
      <tbody>
        {stockData.price.map((point, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{point.x}</td>
            <td className="border px-4 py-2">{point.y.toFixed(2)}</td>
            <td className="border px-4 py-2">{stockData.volume[index]?.y.toFixed(2)}</td>
            <td className="border px-4 py-2">{stockData.volatility[index]?.y.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
