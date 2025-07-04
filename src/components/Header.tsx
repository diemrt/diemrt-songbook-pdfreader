import React, { useContext, useState } from 'react';
import SearchBar from './SearchBar';
import { Maximize, Minimize, Monitor, User } from 'lucide-react';
import { MonitoringContext } from './AppRouter';
import UserAgentContext from '../contexts/UserAgentContext';

interface HeaderProps {
  filePath: string;
  onSearch?: (query: string) => void;
  isFullScreen?: boolean;
  setIsFullScreen?: React.Dispatch<React.SetStateAction<boolean>>;
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
  const {isMonitoring, setIsMonitoring} = useContext(MonitoringContext);
  const {userAgent, setUserAgent} = useContext(UserAgentContext);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userAgent || '');

  const handleNameSubmit = () => {
    setUserAgent(tempName.trim() || undefined);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(userAgent || '');
    setIsEditingName(false);
  };

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
        {/* Campo per il nome utente */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSubmit();
                  if (e.key === 'Escape') handleNameCancel();
                }}
                placeholder="Inserisci il tuo nome"
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                ✓
              </button>
              <button
                onClick={handleNameCancel}
                className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              title="Clicca per modificare il nome"
            >
              <User size={16} />
              <span>{userAgent || 'Imposta nome'}</span>
            </button>
          )}
        </div>
        
        {onSearch && (
        <SearchBar onSearch={onSearch} />
        )}
        {setIsFullScreen && (
        <button
          className={`ml-2 p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center ${isFullScreen ? 'text-yellow-500' : 'text-gray-400'}`}
          onClick={e => { e.stopPropagation(); setIsFullScreen(v => !v); }}
          title={isFullScreen ? 'Esci da Fullscreen' : 'Fullscreen'}
          style={{ width: 40, height: 40 }}
        >
          {isFullScreen ? <Minimize size={20}  className='stroke-neutral-950 stroke-3'  /> : <Maximize size={20}  className='stroke-neutral-950 stroke-3'  />}
        </button>
        )}
        <button className='ml-2 p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center text-gray-400'
          onClick={e => { e.stopPropagation(); setIsMonitoring(v => !v); }}
          title={isMonitoring ? 'Disabilita Monitoraggio' : 'Abilita Monitoraggio'}>
          {isMonitoring ? <Monitor size={20} className='stroke-blue-500' /> : <Monitor size={20} className='stroke-neutral-950' />}
        </button>
      </div>
    </div>
  );
};

export default Header;
