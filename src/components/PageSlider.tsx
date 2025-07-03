interface PageSliderProps {
  currentPage: number;
  numPages: number;
  setCurrentPage: (page: number) => void;
}

const PageSlider = ({ currentPage, numPages, setCurrentPage }: PageSliderProps) => (
  <div className="flex items-center w-full max-w-2xl mx-auto gap-6 py-4">
    <span className="text-base font-semibold text-gray-700 select-none min-w-[44px] text-right">
      {currentPage}
    </span>
    <input
      type="range"
      min={1}
      max={numPages || 1}
      value={currentPage}
      onChange={e => setCurrentPage(Number(e.target.value))}
      disabled={numPages === 0}
      className="w-full h-8 accent-blue-600 rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-transparent bg-gray-200 slider-modern"
    />
    <span className="text-base font-semibold text-gray-700 select-none min-w-[44px] text-left">
      / {numPages || '...'}
    </span>
  </div>
);

export default PageSlider;
