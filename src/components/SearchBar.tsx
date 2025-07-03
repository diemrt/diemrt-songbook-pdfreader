import { X } from 'lucide-react';
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFocusSearch?: () => void; // aggiunto
  onBlurSearch?: () => void;  // aggiunto
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFocusSearch, onBlurSearch }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-xs">
      <input
        type="text"
        className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full"
        placeholder="Cerca nel PDF..."
        value={value}
        onChange={e => setValue(e.target.value)}
        aria-label="Cerca nel PDF"
        onFocus={onFocusSearch} // aggiunto
        onBlur={onBlurSearch}   // aggiunto
      />
      <button
        type="submit"
        className="px-3 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Cerca
      </button>
      <button
        type="button"
          onClick={() => {
          setValue('');
          onSearch('');
        }}
          className="ml-2 p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center text-gray-400"
          aria-label="Chiudi reader"
          style={{ width: 40, height: 40 }}
        >
          <X size={20} className='stroke-neutral-950 stroke-3' />
        </button>
    </form>
  );
};

export default SearchBar;
