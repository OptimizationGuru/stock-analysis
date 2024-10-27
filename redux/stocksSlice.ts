import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockDataPoint {
  x: number; // Timestamp or any x-axis value
  y: number; // Price, volume, or volatility value
}

interface StockData {
  price: StockDataPoint[];
  volume: StockDataPoint[];
  volatility: StockDataPoint[];
}



const initialState: StockData = {
  price: [],
  volume: [],
  volatility: [],
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<StockData>) => {
      state.price = action.payload.price;
      state.volume = action.payload.volume;
      state.volatility = action.payload.volatility;
    },
    setMockData: (state) => {
      const dataPoints = 42; 
      const xInterval = 1; 
    
      state.price = Array.from({ length: dataPoints }, (_, i) => ({
        x: (i+1 )* xInterval, 
        y: Math.random() * 100,
      }));
      state.volume = Array.from({ length: dataPoints }, (_, i) => ({
        x: (i+1 )* xInterval,
        y: Math.random() * 200,
      }));
      state.volatility = Array.from({ length: dataPoints }, (_, i) => ({
        x: (i+1 )* xInterval,
        y: Math.random() * 50,
      }));
    },
    
  },
});

export const { updateData, setMockData } = stocksSlice.actions;
export default stocksSlice.reducer;
