'use client';

import { updateStockData } from '@/redux/stocksSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [searchStock, setSearchStock] = useState('IBM');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const dispatch = useDispatch();

  const handleFilterChange = (searchStock: string, week: number) => {
    dispatch(updateStockData({ stockName: searchStock, weekNumber: week }));
  };

  useEffect(() => {
    handleFilterChange(searchStock, selectedWeek);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStock, selectedWeek]);

  return (
    <div className="flex items-center justify-center p-4 bg-gray-200 border-b border-gray-300 rounded-md shadow-sm mb-1">
      <input
        type="text"
        name="search"
        placeholder="Search stock..."
        value={searchStock}
        onChange={(e) => {
          setSearchStock(e.target.value);
        }}
        className="border border-gray-300 rounded-md px-4 py-2 "
      />
      <input
        type="text"
        disabled
        name="October"
        placeholder="Search stock..."
        value={'October'}
        className="border border-white text-black rounded-md px-4 py-2 w-1/4 ml-4"
      />
      <select
        name="week"
        value={selectedWeek}
        onChange={(e) => {
          setSelectedWeek(Number(e.target.value));
        }}
        className="border border-gray-300 rounded-md px-4 py-2 ml-4 w-1/4"
      >
        <option value={1}>Week 1</option>
        <option value={2}>Week 2</option>
        <option value={3}>Week 3</option>
        <option value={4}>Week 4</option>
      </select>
    </div>
  );
};

export default Navbar;