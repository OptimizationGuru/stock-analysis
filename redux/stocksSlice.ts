import {
  generateMockStockData,
  stockDataArray,
  StockDataPoint,
  StockState,
  transformStockData,
} from '@/utils/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockCacheItem {
  stock: string;
  weekNumber: number;
  openPrice: StockDataPoint[];
  highestPrice: StockDataPoint[];
  closingPrice: StockDataPoint[];
  lowestPrice: StockDataPoint[];
  volumeSold: StockDataPoint[];
}

const initialState: StockState = {
  stock: stockDataArray.stock,
  openPrice: stockDataArray.openPrice,
  highestPrice: stockDataArray.highestPrice,
  closingPrice: stockDataArray.closingPrice,
  lowestPrice: stockDataArray.lowestPrice,
  volumeSold: stockDataArray.volumeSold,
  cache: [],
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    updateStockData: (
      state,
      action: PayloadAction<{ stockName: string; weekNumber: number }>
    ) => {
      const { stockName, weekNumber } = action.payload;

      if (stockName.trim().length <= 2) return;

      const existingCacheIndex = state.cache.findIndex(
        (item) => item.stock === stockName && item.weekNumber === weekNumber
      );

      if (existingCacheIndex !== -1) {
        const existingData = state.cache[existingCacheIndex];
        state.stock = existingData.stock;
        state.openPrice = existingData.openPrice;
        state.highestPrice = existingData.highestPrice;
        state.closingPrice = existingData.closingPrice;
        state.lowestPrice = existingData.lowestPrice;
        state.volumeSold = existingData.volumeSold;
        return;
      }

      const generatedStockData = generateMockStockData(stockName, weekNumber, 'IBM');
      const transformedData: StockState =
        transformStockData(generatedStockData);

      const newCacheItem: StockCacheItem = {
        stock: stockName,
        weekNumber,
        openPrice: transformedData.openPrice,
        highestPrice: transformedData.highestPrice,
        closingPrice: transformedData.closingPrice,
        lowestPrice: transformedData.lowestPrice,
        volumeSold: transformedData.volumeSold,
      };

      state.cache.push(newCacheItem);

      if (state.cache.length > 100) {
        state.cache.shift();
      }

      state.stock = transformedData.stock;
      state.openPrice = transformedData.openPrice;
      state.highestPrice = transformedData.highestPrice;
      state.closingPrice = transformedData.closingPrice;
      state.lowestPrice = transformedData.lowestPrice;
      state.volumeSold = transformedData.volumeSold;
    },
  },
});

export const { updateStockData } = stockSlice.actions;

export default stockSlice.reducer;
