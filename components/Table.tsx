'use client';
import { stockDataArray, StockState } from '../redux/stocksSlice';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Table = () => {
  const [stockState, setStockState] = useState<StockState>({
    stock: stockDataArray.stock,
    openPrice: stockDataArray.openPrice,
    highestPrice: stockDataArray.highestPrice,
    closingPrice: stockDataArray.closingPrice,
    lowestPrice: stockDataArray.lowestPrice,
    volumeSold: stockDataArray.volumeSold,
    cache: [],
  });
  const currentstockState = useSelector((store: RootState) => store.stocks);
  const formatDate = (day: number) => `${day}/10/2024`;
  const newHeaders = [
    { id: 1, label: 'Date' },
    { id: 2, label: 'Open Price' },
    { id: 3, label: 'Highest Price' },
    { id: 4, label: 'Closing Price' },
    { id: 5, label: 'Lowest Price' },
    { id: 6, label: 'Volume Sold' },
  ];

  useEffect(() => {
    if (currentstockState?.stock) {
      setStockState((prevState: StockState) => ({
        ...prevState,
        stock: currentstockState.stock,
        openPrice: currentstockState.openPrice,
        highestPrice: currentstockState.highestPrice,
        closingPrice: currentstockState.closingPrice,
        lowestPrice: currentstockState.lowestPrice,
        volumeSold: currentstockState.volumeSold,
      }));
    }
  }, [currentstockState]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-200">
            <tr className="divide-x divide-gray-300">
              {newHeaders.map((header: { id: number; label: string }) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2 text-center text-sm md:text-base"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stockState.openPrice && stockState.openPrice.length > 0 ? (
              stockState.openPrice.map((dataPoint, index) => (
                <tr
                  key={dataPoint.day}
                  className="even:bg-blue-100 divide-x divide-gray-300"
                >
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                    {formatDate(dataPoint.day)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                    {stockState.openPrice[index]?.value?.toFixed(2) || 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                    {stockState.highestPrice[index]?.value?.toFixed(2) || 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                    {stockState.closingPrice[index]?.value?.toFixed(2) || 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                    {stockState.lowestPrice[index]?.value?.toFixed(2) || 'N/A'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                    {stockState.volumeSold[index]?.value || 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="border border-gray-300 text-center py-2"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
