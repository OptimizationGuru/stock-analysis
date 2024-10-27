

import React, { createContext, useContext, useState, ReactNode } from 'react';


export interface StockDataPoint {
  day: number;
  value: number;
}

export interface StockState {
  stock: string;
  openPrice: StockDataPoint[];
  highestPrice: StockDataPoint[];
  closingPrice: StockDataPoint[];
  lowestPrice: StockDataPoint[];
  volumeSold: StockDataPoint[];
}

export interface DailyStockData {
  day: number;
  openPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  volumeSold: number;
}

export interface StockData {
  stock: string;
  data: DailyStockData[];
}


export const generateStockData = (stockName: string, weekNumber: number): StockData => {
  const stockData: DailyStockData[] = [];
  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = startDay + 6;
  let previousClosingPrice = 1000 + Math.random() * 1000;

  for (let day = startDay; day <= endDay; day++) {
    const openPrice = previousClosingPrice;
    const highestPrice = openPrice + Math.random() * 2000;
    const lowestPrice = openPrice - Math.random() * 1000;
    const closingPrice = lowestPrice + Math.random() * (highestPrice - lowestPrice);
    const volumeSold = Math.floor(Math.random() * 3000) + 500;

    stockData.push({ day, openPrice, highestPrice, lowestPrice, closingPrice, volumeSold });
    previousClosingPrice = closingPrice;
  }

  return { stock: stockName, data: stockData };
};


export const transformStockData = (feed: StockData): StockState => ({
  stock: feed.stock,
  openPrice: feed.data.map(item => ({ day: item.day, value: item.openPrice })),
  highestPrice: feed.data.map(item => ({ day: item.day, value: item.highestPrice })),
  closingPrice: feed.data.map(item => ({ day: item.day, value: item.closingPrice })),
  lowestPrice: feed.data.map(item => ({ day: item.day, value: item.lowestPrice })),
  volumeSold: feed.data.map(item => ({ day: item.day, value: item.volumeSold })),
});


const StockDataContext = createContext<{
  stockState: StockState | undefined;
  updateStockData: (stockName: string, weekNumber: number) => void;
}>({ stockState: undefined, updateStockData: () => {} });


export const StockDataProvider = ({ children }: { children: ReactNode }) => {
  const [stockState, setStockState] = useState<StockState | undefined>(undefined);

  const updateStockData = (stockName: string, weekNumber: number) => {
    const generatedStockData = generateStockData(stockName, weekNumber);
    const transformedData = transformStockData(generatedStockData);
    setStockState(transformedData);
  };

  return (
    <StockDataContext.Provider value={{ stockState, updateStockData }}>
      {children}
    </StockDataContext.Provider>
  );
};









