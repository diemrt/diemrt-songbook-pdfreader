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
        className="px-3 py-2 rounded-full bg-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-400 transition-colors"
        onClick={() => {
          setValue('');
          onSearch('');
        }}
        aria-label="Svuota ricerca"
      >
        ✕
      </button>
    </form>
  );
};

export default SearchBar;
