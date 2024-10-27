import { stockDataArray } from '@/utils/enums';

const Table = () => {
  const formatDate = (dateString: number) => {
    return `${dateString}/Oct/2024`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-200">
            <tr className="divide-x divide-gray-300">
              <th className="border border-gray-300 px-4 py-2 text-center">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Open Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Highest Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Closing Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Lowest Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Volume Sold
              </th>
            </tr>
          </thead>
          <tbody>
            {stockDataArray.openPrice?.map((dataPoint, index) => (
              <tr
                key={index}
                className="even:bg-blue-100 divide-x divide-gray-300"
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {formatDate(dataPoint.day)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {stockDataArray.openPrice[index]?.value.toFixed(2) || 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {stockDataArray.highestPrice[index]?.value.toFixed(2) ||
                    'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {stockDataArray.closingPrice[index]?.value.toFixed(2) ||
                    'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {stockDataArray.lowestPrice[index]?.value.toFixed(2) || 'N/A'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {stockDataArray.volumeSold[index]?.value || 'N/A'}
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
