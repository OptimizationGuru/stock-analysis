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

export const defaultStockName = 'IBM';
export const defaultWeek = 1;

export const generateMockStockData = (
  stockName: string,
  weekNumber: number
): StockData => {
  const stockData: DailyStockData[] = [];

  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = startDay + 6;

  let previousClosingPrice = 1000 + Math.random() * 1000;
  let volumeSold = Math.floor(Math.random() * 3000) + 500;

  for (let day = startDay; day <= endDay; day++) {
    const openPrice = previousClosingPrice;
    const highestPrice = openPrice + Math.random() * 2000;
    const lowestPrice = openPrice - Math.random() * 1000;
    const closingPrice =
      lowestPrice + Math.random() * (highestPrice - lowestPrice);
    volumeSold = Math.floor(Math.random() * 3000) + 500;

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

export const generatedStockData = generateMockStockData(
  defaultStockName,
  defaultWeek
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
  };
};

const currentStockData = generateMockStockData(defaultStockName, defaultWeek);
export const stockDataArray = transformStockData(currentStockData);
