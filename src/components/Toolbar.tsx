import PageSlider from './PageSlider';
import PageControls from './PageControls';
import ZoomControls from './ZoomControls';
import { Star, StarOff } from 'lucide-react';

interface ToolbarProps {
  toolbarVisible: boolean;
  showToolbar: () => void;
  hideToolbar: () => void;
  currentPage: number;
  numPages: number;
  setCurrentPage: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleShortcut: () => void;
  isCurrentShortcut: boolean;
}

const Toolbar = ({
  toolbarVisible,
  showToolbar,
  hideToolbar,
  currentPage,
  numPages,
  setCurrentPage,
  onPrev,
  onNext,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleShortcut,
  isCurrentShortcut
}: ToolbarProps) => (
  <div
    className={`fixed left-0 bottom-0 w-full z-50 transition-opacity duration-200 ${toolbarVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-white/80 backdrop-blur border-t border-gray-200`}
    onMouseEnter={showToolbar}
    onMouseLeave={hideToolbar}
    onClick={showToolbar}
    style={{ padding: 'env(safe-area-inset-bottom, 0) 0 0 0', minHeight: 96 }}
  >
    <div className="flex flex-col items-center justify-center px-4 pt-3 pb-2 md:pt-4 md:pb-3 md:px-8">
      <PageSlider currentPage={currentPage} numPages={numPages} setCurrentPage={setCurrentPage} />
    </div>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between px-2 py-2 md:px-6 md:py-3 gap-2 md:gap-4">
      <PageControls currentPage={currentPage} numPages={numPages} onPrev={onPrev} onNext={onNext} />
      <ZoomControls zoom={zoom} onZoomIn={onZoomIn} onZoomOut={onZoomOut} onReset={onResetZoom} />
      {/* Shortcut button */}
      <button
        onClick={onToggleShortcut}
        className={`ml-2 p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center ${isCurrentShortcut ? 'text-yellow-500' : 'text-gray-400'}`}
        aria-label={isCurrentShortcut ? "Rimuovi shortcut" : "Aggiungi shortcut"}
      >
        {isCurrentShortcut ? <Star /> : <StarOff />}
      </button>
    </div>
  </div>
);

export default Toolbar;
