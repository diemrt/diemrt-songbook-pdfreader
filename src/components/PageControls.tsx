import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageControlsProps {
  currentPage: number;
  numPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const PageControls = ({ currentPage, numPages, onPrev, onNext }: PageControlsProps) => (
  <div className="flex items-center justify-center gap-2 flex-1">
    <button
      onClick={onPrev}
      disabled={currentPage <= 1}
      className="p-3 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-40 flex items-center justify-center"
      aria-label="Pagina precedente"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <span className="text-base font-semibold select-none min-w-[60px] text-center">
      {currentPage} / {numPages || '...'}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage >= numPages}
      className="p-3 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-40 flex items-center justify-center"
      aria-label="Pagina successiva"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </div>
);

export default PageControls;
