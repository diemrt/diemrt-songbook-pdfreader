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

const MusicPDFReader = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1.0);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [shortcuts, setShortcuts] = useState<number[]>([]);
  const [pdfInstance, setPdfInstance] = useState<PDFDocumentProxy | null>(null);
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

  // Mostra la toolbar su hover o click
  const showToolbar = () => setToolbarVisible(true);
  const hideToolbar = () => setToolbarVisible(false);

  // Nasconde la toolbar dopo un po' che il mouse esce
  useEffect(() => {
    if (!toolbarVisible) return;
    const timeout = setTimeout(() => setToolbarVisible(false), 2000);
    return () => clearTimeout(timeout);
  }, [toolbarVisible]);

  // Header show/hide logic
  const showHeader = () => setHeaderVisible(true);
  const hideHeader = () => setHeaderVisible(false);

  // Nasconde l'header dopo un po' che il mouse esce
  useEffect(() => {
    if (!headerVisible) return;
    const timeout = setTimeout(() => setHeaderVisible(false), 2000);
    return () => clearTimeout(timeout);
  }, [headerVisible]);

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
    <div className="fixed inset-0 bg-gray-50 text-gray-900 flex flex-col">
      <Header
        filePath={filePath}
        onSearch={handleSearch}
        headerVisible={headerVisible}
        showHeader={showHeader}
        hideHeader={hideHeader}
      />
      <div className="flex-1 flex flex-col">
        {/* Area visualizzazione PDF */}
        <div
          ref={pdfContainerRef}
          className={`flex-1 overflow-hidden bg-gray-100 flex items-center justify-center relative transition-all duration-200 ${!headerVisible ? 'pt-0' : 'pt-[64px]'}`}
          style={{ height: headerVisible ? '92vh' : '100vh' }}
          onMouseEnter={() => { showToolbar(); showHeader(); }}
          onMouseMove={() => { showToolbar(); showHeader(); }}
          onClick={() => { showToolbar(); showHeader(); }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <PDFViewer
              file={filePath}
              currentPage={currentPage}
              zoom={zoom}
              onLoadSuccess={onDocumentLoadSuccess}
            />
          </div>
          <ShortcutBar
            shortcuts={shortcuts}
            currentPage={currentPage}
            onShortcutClick={setCurrentPage}
          />
          <Toolbar
            toolbarVisible={toolbarVisible}
            showToolbar={showToolbar}
            hideToolbar={hideToolbar}
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