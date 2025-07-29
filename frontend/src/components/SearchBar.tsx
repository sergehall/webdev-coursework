import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const SearchBar = ({ value, onChange, onSearch }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex w-full max-w-md items-center space-x-2">
      <input
        type="text"
        placeholder="Enter a name (e.g. Serge Hall)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      />
      <button
        onClick={onSearch}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
