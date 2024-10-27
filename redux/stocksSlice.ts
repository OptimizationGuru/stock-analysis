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

      const generatedStockData = generateMockStockData(stockName, weekNumber);
      const transformedData = transformStockData(generatedStockData);

      return {
        ...state,
        stock: transformedData.stock,
        openPrice: transformedData.openPrice,
        highestPrice: transformedData.highestPrice,
        closingPrice: transformedData.closingPrice,
        lowestPrice: transformedData.lowestPrice,
        volumeSold: transformedData.volumeSold,
      };
    },
  },
});

export const { updateStockData } = stockSlice.actions;

export default stockSlice.reducer;
