import { useEffect, useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addFavoritePages } from '../api';
import DeviceContext from '../contexts/DeviceContext';

interface ShortcutBarProps {
  shortcuts: number[];
  currentPage: number;
  onShortcutClick: (page: number) => void;
  isFullScreen: boolean;
}


const ShortcutBar = ({ shortcuts, currentPage, onShortcutClick, isFullScreen }: ShortcutBarProps) => {
  const { deviceId } = useContext(DeviceContext);
  const [orderedShortcuts, setOrderedShortcuts] = useState<number[]>(shortcuts);

  // Aggiorna l'ordine se la lista di shortcut cambia (aggiunte/rimosse)
  useEffect(() => {
    setOrderedShortcuts(prev => {
      const newShortcuts = shortcuts.filter(s => !prev.includes(s));
      const removedShortcuts = prev.filter(s => shortcuts.includes(s));
      return [...removedShortcuts, ...newShortcuts];
    });
  }, [shortcuts]);

  // Persisti le shortcut lato API quando cambiano
  const { mutate: saveFavorites } = useMutation({
    mutationFn: (pages: number[]) => {
      if (!deviceId) return Promise.resolve();
      return addFavoritePages({ deviceId, pages: pages.join(',') });
    },
  });

  useEffect(() => {
    if (deviceId && orderedShortcuts.length > 0) {
      saveFavorites(orderedShortcuts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderedShortcuts, deviceId]);

  const handleShortcutClick = (page: number) => {
    onShortcutClick(page);
  };

  if (orderedShortcuts.length === 0 || isFullScreen) return null;

  return (
    <div
      className="fixed z-50 left-1/2 top-20 transform -translate-x-1/2 opacity-100 pointer-events-auto"
      style={{
        maxWidth: '95vw',
        borderRadius: 32,
        background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
        padding: '6px 10px',
        minHeight: 56,
      }}
    >
      <div className="flex flex-row gap-2 overflow-x-auto scrollbar-hide px-1 py-1">
        {orderedShortcuts.map(page => (
          <button
            key={page}
            onClick={() => handleShortcutClick(page)}
            className={`min-w-[44px] px-4 py-2 rounded-full text-base font-bold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            style={{ touchAction: 'manipulation' }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShortcutBar;
