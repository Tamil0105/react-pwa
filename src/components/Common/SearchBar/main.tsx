import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { cn } from '../../../utils/constants/cn';

interface Props {
  onSearch: (query: any) => void;
  width?:string
}

const SearchBar: React.FC<Props> = ({ onSearch ,width}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApply = () => {
    onSearch(searchTerm);
    console.log('Searching for:', searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={cn("p-1 border border-gray-300 rounded-lg bg-white shadow-sm w-full max-w-2xl transition-all duration-100  mx-auto",width)}>
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full sm:flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
          <button
            onClick={handleApply}
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <FaTimes className="mr-2" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
