import React from 'react';
import SearchBar from './SearchBar';

interface HeaderProps {
  filePath: string;
  onSearch: (query: string) => void;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Estrae il nome file dal path (es: "/foo/bar/06.18.pdf" => "06.18.pdf")
function extractFileName(filePath: string): string {
  const match = filePath.match(/(\d{2}\.\d{2})/);
  return match ? `Versione file: ${match[1]}` : '';
}

const Header: React.FC<HeaderProps> = ({ filePath, onSearch, isFullScreen, setIsFullScreen }) => {
  const fileName = extractFileName(filePath);

  return (
    <div
      className={`border-b border-gray-200 bg-white px-6 py-4 flex items-center gap-4 fixed top-0 left-0 w-full z-50 transition-opacity duration-200 ${isFullScreen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      style={{ minHeight: 64 }}
    >
      <h1 className="text-2xl font-bold mr-2">Reader PDF Musicale</h1>
      <span className="ml-3 text-xs text-gray-400">{fileName}</span>
      <div className="flex-1 flex justify-end items-center gap-2">
        <SearchBar onSearch={onSearch} />
        <button
          className={`ml-4 px-3 py-1 rounded ${isFullScreen ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} transition`}
          onClick={e => { e.stopPropagation(); setIsFullScreen(v => !v); }}
          title={isFullScreen ? 'Esci da Fullscreen' : 'Fullscreen'}
        >
          {isFullScreen ? 'Esci Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
};

export default Header;
