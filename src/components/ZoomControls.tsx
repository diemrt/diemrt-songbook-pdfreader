import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const ZoomControls = ({ zoom, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) => (
  <div className="flex items-center justify-center gap-2 flex-1">
    <button
      onClick={onZoomOut}
      className="p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center"
      aria-label="Zoom out"
    >
      <ZoomOut className="w-6 h-6" />
    </button>
    <span className="text-base font-semibold select-none w-14 text-center">{Math.round(zoom * 100)}%</span>
    <button
      onClick={onZoomIn}
      className="p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center"
      aria-label="Zoom in"
    >
      <ZoomIn className="w-6 h-6" />
    </button>
    <button
      onClick={onReset}
      className="p-3 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center"
      aria-label="Reset zoom"
    >
      <RotateCcw className="w-6 h-6" />
    </button>
  </div>
);

export default ZoomControls;
