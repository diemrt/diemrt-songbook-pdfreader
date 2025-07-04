import React, { useContext, useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { Maximize, Minimize, Monitor, User, X } from 'lucide-react';
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
  const [tempName, setTempName] = useState('');

  // Carica il nome dal localStorage al primo render
  useEffect(() => {
    const savedName = localStorage.getItem('userAgent');
    if (savedName) {
      setUserAgent(savedName);
    }
  }, [setUserAgent]);

  // Aggiorna tempName quando userAgent cambia
  useEffect(() => {
    setTempName(userAgent || '');
  }, [userAgent]);

  // Chiude l'editing quando si entra in modalità monitoring
  useEffect(() => {
    if (isMonitoring && isEditingName) {
      setIsEditingName(false);
    }
  }, [isMonitoring, isEditingName]);

  const handleNameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedName = tempName.trim();
    if (trimmedName) {
      setUserAgent(trimmedName);
      localStorage.setItem('userAgent', trimmedName);
    } else {
      setUserAgent(undefined);
      localStorage.removeItem('userAgent');
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setTempName(userAgent || '');
    setIsEditingName(false);
  };

  const handleClearName = () => {
    setTempName('');
    setUserAgent(undefined);
    localStorage.removeItem('userAgent');
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
        {/* Campo per il nome utente - nascosto durante il monitoring */}
        {!isMonitoring && (
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') handleNameCancel();
                  }}
                  placeholder="Inserisci il tuo nome"
                  className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  autoFocus
                  aria-label="Nome utente"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Salva
                </button>
                <button
                  type="button"
                  onClick={handleClearName}
                  className="p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center text-gray-400"
                  aria-label="Cancella nome"
                  style={{ width: 40, height: 40 }}
                >
                  <X size={20} className='stroke-neutral-950 stroke-3' />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors"
                title="Clicca per modificare il nome"
              >
                <User size={16} />
                <span>{userAgent || 'Imposta nome'}</span>
              </button>
            )}
          </div>
        )}
        
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
