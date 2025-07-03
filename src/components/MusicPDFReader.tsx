import { useState, useEffect, useRef } from 'react';
import PDFViewer from './PDFViewer';
import Toolbar from './Toolbar';
import Header from './Header';
import ShortcutBar from './ShortcutBar';
import { pdfjs } from 'react-pdf';

// Tipi minimi per evitare any
interface PDFTextItem {
  str: string;
}
interface PDFTextContent {
  items: PDFTextItem[];
}
interface PDFPageProxy {
  getTextContent: () => Promise<PDFTextContent>;
}
interface PDFDocumentProxy {
  numPages: number;
  getPage: (pageNum: number) => Promise<PDFPageProxy>;
}

// Rimuovi la custom hook per gestire auto-hide

const MusicPDFReader = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1.0);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [shortcuts, setShortcuts] = useState<number[]>([]);
  const [pdfInstance, setPdfInstance] = useState<PDFDocumentProxy | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const filePath = "/06.18.pdf";

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setZoom(1.0);

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, numPages));

  // Nasconde la toolbar dopo un po' che il mouse esce
  useEffect(() => {
    if (!toolbarVisible) return;
    const timeout = setTimeout(() => setToolbarVisible(false), 2000);
    return () => clearTimeout(timeout);
  }, [toolbarVisible]);

  // Listener per uscire dal fullscreen su qualsiasi interazione
  useEffect(() => {
    if (!isFullScreen) return;
    const exitFullScreen = () => setIsFullScreen(false);
    window.addEventListener('mousemove', exitFullScreen);
    window.addEventListener('mousedown', exitFullScreen);
    window.addEventListener('touchstart', exitFullScreen);
    window.addEventListener('keydown', exitFullScreen);
    window.addEventListener('click', exitFullScreen);
    return () => {
      window.removeEventListener('mousemove', exitFullScreen);
      window.removeEventListener('mousedown', exitFullScreen);
      window.removeEventListener('touchstart', exitFullScreen);
      window.removeEventListener('keydown', exitFullScreen);
      window.removeEventListener('click', exitFullScreen);
    };
  }, [isFullScreen]);

  // Shortcut logic
  const toggleShortcut = (page: number) => {
    setShortcuts(prev =>
      prev.includes(page)
        ? prev.filter(p => p !== page)
        : [...prev, page].sort((a, b) => a - b)
    );
  };

  // Reset shortcut quando si esce dal reader
  useEffect(() => {
    return () => setShortcuts([]);
  }, []);

  // Carica l'istanza PDF per la ricerca
  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjs.getDocument(filePath);
      const pdf = await loadingTask.promise as PDFDocumentProxy;
      setPdfInstance(pdf);
    };
    loadPdf();
  }, [filePath]);

  // Funzione di ricerca nel PDF
  const handleSearch = async (query: string) => {
    if (!pdfInstance) return;
    for (let pageNum = 1; pageNum <= pdfInstance.numPages; pageNum++) {
      const page = await pdfInstance.getPage(pageNum);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item) => item.str).join(' ');
      if (text.toLowerCase().includes(query.toLowerCase())) {
        setCurrentPage(pageNum);
        return;
      }
    }
    // Se non trovato, nessuna azione (potresti mostrare un messaggio)
  };

  return (
    <div className={`fixed inset-0 flex flex-col ${isFullScreen ? 'bg-black' : 'bg-gray-50 text-gray-900'}`}>
      <Header
        filePath={filePath}
        onSearch={handleSearch}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
      <div className="flex-1 flex flex-col">
        {/* Area visualizzazione PDF */}
        <div
          ref={pdfContainerRef}
          className={`flex-1 overflow-hidden flex items-center justify-center relative transition-all duration-200 ${isFullScreen ? 'p-0 m-0 bg-black w-screen h-screen fixed top-0 left-0 z-50' : 'bg-gray-100 pt-[64px]'} `}
          style={isFullScreen ? { width: '100vw', height: '100vh', padding: 0, margin: 0 } : { height: '92vh' }}
        >
          <div className={`w-full h-full flex items-center justify-center ${isFullScreen ? 'p-0 m-0' : ''}`} style={isFullScreen ? { alignItems: 'center', justifyContent: 'center' } : {}}>
            <PDFViewer
              file={filePath}
              currentPage={currentPage}
              zoom={zoom}
              onLoadSuccess={onDocumentLoadSuccess}
              isFullScreen={isFullScreen}
            />
          </div>
          {/* ShortcutBar visibile solo se ci sono shortcut e non in fullscreen */}
          <ShortcutBar
            shortcuts={shortcuts}
            currentPage={currentPage}
            onShortcutClick={setCurrentPage}
            isFullScreen={isFullScreen}
          />
          <Toolbar
            isFullScreen={isFullScreen}
            currentPage={currentPage}
            numPages={numPages}
            setCurrentPage={setCurrentPage}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
            zoom={zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetZoom={resetZoom}
            onToggleShortcut={() => toggleShortcut(currentPage)}
            isCurrentShortcut={shortcuts.includes(currentPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPDFReader;