import React from 'react';
import SearchBar from './SearchBar';
import { Maximize, Minimize } from 'lucide-react';

interface HeaderProps {
  filePath: string;
  onSearch: (query: string) => void;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  // Aggiungo una prop opzionale per la gestione dell'elimina
  onDelete?: () => void;
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
      <div className='flex flex-col gap-1'>
        <h1 className="text-xl font-bold mr-2">Reader PDF Musicale</h1>
        <span className="text-xs text-gray-400">{fileName}</span>
      </div>
      <div className="flex-1 flex justify-end items-center gap-2">
        <SearchBar onSearch={onSearch} />
        {/* Bottone fullscreen compatto con icona */}
        <button
          className={`ml-2 p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center ${isFullScreen ? 'text-yellow-500' : 'text-gray-400'}`}
          onClick={e => { e.stopPropagation(); setIsFullScreen(v => !v); }}
          title={isFullScreen ? 'Esci da Fullscreen' : 'Fullscreen'}
          style={{ width: 40, height: 40 }}
        >
          {isFullScreen ? <Minimize size={20}  className='stroke-neutral-950 stroke-3'  /> : <Maximize size={20}  className='stroke-neutral-950 stroke-3'  />}
        </button>
      </div>
    </div>
  );
};

export default Header;
