import {
  generateMockStockData,
  stockDataArray,
  StockState,
  transformStockData,
} from '@/utils/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        return state.cache[existingCacheIndex];
      }

      const generatedStockData = generateMockStockData(stockName, weekNumber);
      const transformedData = transformStockData(generatedStockData);

      state.cache.unshift({ transformedData });
      if (state.cache.length > 100) {
        state.cache.pop();
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
