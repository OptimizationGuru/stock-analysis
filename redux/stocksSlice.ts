import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StockDataPoint {
  day: number;
  value: number;
}

export interface StockCacheItem {
  stock: string;
  weekNumber: number;
  openPrice: StockDataPoint[];
  highestPrice: StockDataPoint[];
  closingPrice: StockDataPoint[];
  lowestPrice: StockDataPoint[];
  volumeSold: StockDataPoint[];
}

export interface StockState {
  stock: string;
  openPrice: StockDataPoint[];
  highestPrice: StockDataPoint[];
  closingPrice: StockDataPoint[];
  lowestPrice: StockDataPoint[];
  volumeSold: StockDataPoint[];
  cache: StockCacheItem[];
}

export interface StockData {
  stock: string;
  data: StockCacheItem;
}
export const seedRandomXORShift = (seed: number) => {
  let state = seed;

  const random = () => {
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    return state / 0xffffffff + 0.5;
  };

  return { random };
};

const generateMockStockData = (
  stockName: string,
  weekNumber: number,
  seed: number = Date.now(),
  initialPrice: number = 1000,
  priceRange: { min: number; max: number } = { min: 500, max: 1500 }
): StockCacheItem => {
  const { random } = seedRandomXORShift(seed);

  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = startDay + 6;
  let previousClosingPrice =
    initialPrice + random() * (priceRange.max - priceRange.min);

  const openPrice: StockDataPoint[] = [];
  const highestPrice: StockDataPoint[] = [];
  const lowestPrice: StockDataPoint[] = [];
  const closingPrice: StockDataPoint[] = [];
  const volumeSold: StockDataPoint[] = [];

  for (let day = startDay; day <= endDay; day++) {
    const dayOpenPrice = previousClosingPrice;

    const dayHighestPrice =
      dayOpenPrice + random() * (priceRange.max - priceRange.min);

    const dayLowestPrice = Math.max(
      0,
      dayOpenPrice - random() * (priceRange.max - priceRange.min)
    );

    const dayClosingPrice =
      dayLowestPrice + random() * (dayHighestPrice - dayLowestPrice);

    const dayVolumeSold = Math.floor(random() * 3000) + 500;

    openPrice.push({ day, value: parseFloat(dayOpenPrice.toFixed(2)) });
    highestPrice.push({ day, value: parseFloat(dayHighestPrice.toFixed(2)) });
    lowestPrice.push({ day, value: parseFloat(dayLowestPrice.toFixed(2)) });
    closingPrice.push({ day, value: parseFloat(dayClosingPrice.toFixed(2)) });
    volumeSold.push({ day, value: dayVolumeSold });

    previousClosingPrice = dayClosingPrice;
  }

  return {
    stock: stockName,
    weekNumber,
    openPrice,
    highestPrice,
    closingPrice,
    lowestPrice,
    volumeSold,
  };
};

export const stockDataArray = generateMockStockData('stockName', 3);

const initialState: StockState = {
  stock: '',
  openPrice: [],
  highestPrice: [],
  closingPrice: [],
  lowestPrice: [],
  volumeSold: [],
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
        ({ stock: cacheStock, weekNumber: cacheWeekNumber }) =>
          cacheStock === stockName && cacheWeekNumber === weekNumber
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

      const generatedStockData = generateMockStockData(stockName, weekNumber);
      const newCacheItem: StockCacheItem = {
        stock: stockName,
        weekNumber,
        openPrice: generatedStockData.openPrice.map((item) => ({
          day: item.day,
          value: item.value,
        })),
        highestPrice: generatedStockData.highestPrice.map((item) => ({
          day: item.day,
          value: item.value,
        })),
        closingPrice: generatedStockData.closingPrice.map((item) => ({
          day: item.day,
          value: item.value,
        })),
        lowestPrice: generatedStockData.lowestPrice.map((item) => ({
          day: item.day,
          value: item.value,
        })),
        volumeSold: generatedStockData.volumeSold.map((item) => ({
          day: item.day,
          value: item.value,
        })),
      };

      state.cache.push(newCacheItem);
      if (state.cache.length > 100) {
        state.cache.shift();
      }

      state.stock = generatedStockData.stock;
      state.openPrice = newCacheItem.openPrice;
      state.highestPrice = newCacheItem.highestPrice;
      state.closingPrice = newCacheItem.closingPrice;
      state.lowestPrice = newCacheItem.lowestPrice;
      state.volumeSold = newCacheItem.volumeSold;
    },
  },
});

export const { updateStockData } = stockSlice.actions;
export default stockSlice.reducer;
