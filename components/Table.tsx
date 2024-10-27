'use client';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Table = () => {
  const stocksData = useSelector((store: RootState) => store.stocks);

  const formatDate = (day: number) => `${day}/10/2024`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-200">
            <tr className="divide-x divide-gray-300">
              {[
                'Date',
                'Open Price',
                'Highest Price',
                'Closing Price',
                'Lowest Price',
                'Volume Sold',
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-300 px-4 py-2 text-center text-sm md:text-base"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocksData.openPrice?.map((dataPoint, index) => (
              <tr
                key={index}
                className="even:bg-blue-100 divide-x divide-gray-300"
              >
                <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                  {formatDate(dataPoint.day)}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                  {stocksData.openPrice[index]?.value.toFixed(2) || 'N/A'}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                  {stocksData.highestPrice[index]?.value.toFixed(2) || 'N/A'}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                  {stocksData.closingPrice[index]?.value.toFixed(2) || 'N/A'}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                  {stocksData.lowestPrice[index]?.value.toFixed(2) || 'N/A'}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center text-xs md:text-sm lg:text-base">
                  {stocksData.volumeSold[index]?.value || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
