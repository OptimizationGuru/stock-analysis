import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateStockData } from '@/redux/stocksSlice';
import StockSearchBar from './Searchbar';

const Navbar: React.FC = () => {
  const [searchStock, setSearchStock] = useState('IBM');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  const handleFilterChange = (searchStock: string, week: number) => {
    dispatch(updateStockData({ stockName: searchStock, weekNumber: week }));
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      handleFilterChange(searchStock, selectedWeek);
    }, 500);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchStock, selectedWeek]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-400 border-b border-gray-300 rounded-md shadow-sm mb-4 min-w-40 w-full gap-6">
      <StockSearchBar
        searchStock={searchStock}
        setSearchStock={setSearchStock}
        onStockSelect={(selectedStock: string) => {
          setSearchStock(selectedStock);
        }}
      />
      <input
        type="text"
        disabled
        name="October"
        placeholder="Month"
        value={'October'}
        className="border border-white text-black rounded-md px-4 py-2 w-full md:w-1/4 mb-2 md:mb-0 min-w-24 flex-grow"
      />
      <select
        name="week"
        value={selectedWeek}
        onChange={(e) => {
          setSelectedWeek(Number(e.target.value));
        }}
        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/4 min-w-24 flex-grow"
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
