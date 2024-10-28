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
  cache: StockCacheItem[];
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

export interface StockCacheItem {
  stock: string;
  weekNumber: number;
  openPrice: StockDataPoint[];
  highestPrice: StockDataPoint[];
  closingPrice: StockDataPoint[];
  lowestPrice: StockDataPoint[];
  volumeSold: StockDataPoint[];
}

const seedRandom = (seed: string) => {
  let m = 0x80000000,
    a = 1103515245,
    c = 12345;
  let state = 0;

  const random = () => {
    state = (state * a + c) % m;
    return state / (m - 1);
  };

  return { random };
};

export const generateMockStockData = (
  stockName: string,
  weekNumber: number,
  seed: string
): StockData => {
  const stockData: DailyStockData[] = [];
  const { random } = seedRandom(seed);

  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = startDay + 6;

  let previousClosingPrice = 1000 + random() * 1000;
  let volumeSold = Math.floor(random() * 3000) + 500;

  for (let day = startDay; day <= endDay; day++) {
    const openPrice = previousClosingPrice;
    const highestPrice = openPrice + random() * 2000;
    const lowestPrice = openPrice - random() * 1000;
    const closingPrice = lowestPrice + random() * (highestPrice - lowestPrice);
    volumeSold = Math.floor(random() * 3000) + 500;

    const dailyData: DailyStockData = {
      day,
      openPrice: parseFloat(openPrice.toFixed(2)),
      highestPrice: parseFloat(highestPrice.toFixed(2)),
      lowestPrice: parseFloat(lowestPrice.toFixed(2)),
      closingPrice: parseFloat(closingPrice.toFixed(2)),
      volumeSold,
    };

    stockData.push(dailyData);
    previousClosingPrice = dailyData.closingPrice;
  }

  return {
    stock: stockName,
    data: stockData,
  };
};

export const defaultStockName = 'IBM';
export const defaultWeek = 1;

export const generatedStockData = generateMockStockData(
  defaultStockName,
  defaultWeek,
  'Amex'
);

export const transformStockData = (
  feed: typeof generatedStockData
): StockState => {
  return {
    stock: feed.stock,
    openPrice: feed.data.map((item) => ({
      day: item.day,
      value: item.openPrice,
    })),
    highestPrice: feed.data.map((item) => ({
      day: item.day,
      value: item.highestPrice,
    })),
    closingPrice: feed.data.map((item) => ({
      day: item.day,
      value: item.closingPrice,
    })),
    lowestPrice: feed.data.map((item) => ({
      day: item.day,
      value: item.lowestPrice,
    })),
    volumeSold: feed.data.map((item) => ({
      day: item.day,
      value: item.volumeSold,
    })),
    cache: [],
  };
};

const currentStockData = generatedStockData;
export const stockDataArray = transformStockData(currentStockData);
