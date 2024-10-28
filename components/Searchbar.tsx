import React, { useState } from 'react';

interface Stock {
  id: number;
  name: string;
}

interface StockSearchBarProps {
  searchStock: string;
  setSearchStock: React.Dispatch<React.SetStateAction<string>>;
  onStockSelect: (selectedStock: string) => void;
}

const StockSearchBar: React.FC<StockSearchBarProps> = ({
  searchStock,
  setSearchStock,
  onStockSelect,
}) => {
  const [suggestions, setSuggestions] = useState<Stock[]>([]);

  const [stockData, setStockData] = useState<Stock[]>([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Microsoft' },
    { id: 3, name: 'Google' },
    { id: 4, name: 'Amazon' },
    { id: 5, name: 'Tesla' },
    { id: 6, name: 'Facebook' },
    { id: 7, name: 'Netflix' },
    { id: 8, name: 'NVIDIA' },
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchStock(value);

    if (value.trim()) {
      const filteredSuggestions = stockData.filter((stock) =>
        stock.name.toLowerCase().includes(value.toLowerCase())
      );

      if (
        !filteredSuggestions.some(
          (stock) => stock.name.toLowerCase() === value.toLowerCase()
        )
      ) {
        filteredSuggestions.push({ id: stockData.length + 1, name: value });
      }

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Stock) => {
    setSearchStock(suggestion.name);
    setSuggestions([]);
    onStockSelect(suggestion.name);

    if (
      !stockData.some(
        (stock) => stock.name.toLowerCase() === suggestion.name.toLowerCase()
      )
    ) {
      setStockData([
        ...stockData,
        { id: stockData.length + 1, name: suggestion.name },
      ]);
    }
  };

  return (
    <div className="relative flex-grow w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border border-white text-black rounded-md mb-2 md:mb-0 min-w-24 flex"
      >
        <div className="flex items-center gap-4 w-full">
          <label
            htmlFor="search"
            className="w-[25%] pl-2 text-center md:text-left"
          >
            Stock
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search stock..."
            value={searchStock}
            onChange={handleSearchChange}
            className="border border-white text-black rounded-md px-4 py-2 w-full md:w-[70%] flex-grow"
          />
        </div>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-20 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockSearchBar;
