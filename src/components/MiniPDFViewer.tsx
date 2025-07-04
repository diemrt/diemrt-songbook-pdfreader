import { Document, Page } from 'react-pdf';

interface MiniPDFViewerProps {
  file: string;
  currentPage: number;
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Mini viewer senza controlli, solo visualizzazione di una pagina specifica
const MiniPDFViewer = ({ file, currentPage, zoom = 0.5, className = '', style = {} }: MiniPDFViewerProps) => (
  <div className={`rounded-md overflow-hidden border bg-white ${className}`} style={{ ...style, minHeight: 120, minWidth: 80 }}>
    <Document
      file={file}
      loading={<div className="text-center text-xs py-4">Caricamento PDF...</div>}
      error={<div className="text-center text-xs text-red-500 py-4">Errore PDF</div>}
    >
      <Page
        pageNumber={currentPage}
        scale={zoom}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        width={100}
        className="object-contain mx-auto"
      />
    </Document>
  </div>
);

export default MiniPDFViewer;
