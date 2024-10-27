// apiConstants.ts
// const api_key = process.env.NODE_ENV !== 'production'
// export const ALPHA_VANTAGE_API_URL = ``;

// export const getAlphaVantageUrl = (symbol: string): string => {
//     return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${api_key}&symbol=${symbol}`;
//   };

const stockData = [
  {
    day: 21,
    openPrice: 1032.8,
    highestPrice: 2440.0,
    lowestPrice: 400.0,
    closingPrice: 1456.5,
    volumeSold: 1098,
  },
  {
    day: 22,
    openPrice: 1456.5,
    highestPrice: 3470.0,
    lowestPrice: 430.0,
    closingPrice: 2469.0,
    volumeSold: 1221,
  },
  {
    day: 23,
    openPrice: 2469.0,
    highestPrice: 4480.0,
    lowestPrice: 1450.0,
    closingPrice: 3455.0,
    volumeSold: 6137,
  },
  {
    day: 24,
    openPrice: 3455.0,
    highestPrice: 5960.0,
    lowestPrice: 1440.0,
    closingPrice: 5450.0,
    volumeSold: 1568,
  },
  {
    day: 25,
    openPrice: 5450.0,
    highestPrice: 5450.0,
    lowestPrice: 5430.0,
    closingPrice: 5444.0,
    volumeSold: 1240,
  },
  {
    day: 26,
    openPrice: 5444.0,
    highestPrice: 5450.0,
    lowestPrice: 420.0,
    closingPrice: 430.0,
    volumeSold: 1819,
  },
  {
    day: 27,
    openPrice: 430.0,
    highestPrice: 2450.0,
    lowestPrice: 410.0,
    closingPrice: 2425.0,
    volumeSold: 2204,
  },
];

console.log(stockData);

interface StockDataPoint {
  day: number;
  value: number;
}

interface StockState {
  openPrice: StockDataPoint[];
  highestPrice: StockDataPoint[];
  closingPrice: StockDataPoint[];
  lowestPrice: StockDataPoint[];
  volumeSold: StockDataPoint[];
}

const transformStockData = (data: typeof stockData): StockState => {
  return {
    openPrice: data.map((item) => ({ day: item.day, value: item.openPrice })),
    highestPrice: data.map((item) => ({
      day: item.day,
      value: item.highestPrice,
    })),
    closingPrice: data.map((item) => ({
      day: item.day,
      value: item.closingPrice,
    })),
    lowestPrice: data.map((item) => ({
      day: item.day,
      value: item.lowestPrice,
    })),
    volumeSold: data.map((item) => ({ day: item.day, value: item.volumeSold })),
  };
};

export const stockDataArray = transformStockData(stockData);
