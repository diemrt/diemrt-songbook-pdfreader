interface PageSliderProps {
  currentPage: number;
  numPages: number;
  setCurrentPage: (page: number) => void;
}

const PageSlider = ({ currentPage, numPages, setCurrentPage }: PageSliderProps) => (
  <div className="flex items-center w-full max-w-2xl mx-auto gap-4">
    <span className="text-sm font-semibold text-gray-700 select-none min-w-[38px] text-right">
      {currentPage}
    </span>
    <input
      type="range"
      min={1}
      max={numPages || 1}
      value={currentPage}
      onChange={e => setCurrentPage(Number(e.target.value))}
      disabled={numPages === 0}
      className="w-full h-4 accent-blue-600 rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200 slider-modern"
      style={{
        touchAction: 'none',
        background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
        boxShadow: '0 2px 8px 0 rgba(37,99,235,0.10)'
      }}
    />
    <span className="text-sm font-semibold text-gray-700 select-none min-w-[38px] text-left">
      / {numPages || '...'}
    </span>
  </div>
);

export default PageSlider;
