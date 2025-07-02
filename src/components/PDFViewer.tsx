import { Document, Page } from 'react-pdf';

interface PDFViewerProps {
  file: string;
  currentPage: number;
  zoom: number;
  onLoadSuccess: ({ numPages }: { numPages: number }) => void;
  isFullScreen?: boolean;
}

const PDFViewer = ({ file, currentPage, zoom, onLoadSuccess, isFullScreen }: PDFViewerProps) => (
  <Document
    file={file}
    onLoadSuccess={onLoadSuccess}
    loading={<div className="text-center">Caricamento PDF...</div>}
    error={<div className="text-center text-red-500">Errore nel caricamento del PDF</div>}
  >
    <Page
      pageNumber={currentPage}
      scale={zoom}
      renderAnnotationLayer={false}
      renderTextLayer={false}
      width={isFullScreen ? window.innerWidth : undefined}
      height={isFullScreen ? window.innerHeight : window.innerHeight * 0.92}
      className={isFullScreen ? 'w-full h-full object-contain bg-black' : 'max-w-full object-contain'}
    />
  </Document>
);

export default PDFViewer;
