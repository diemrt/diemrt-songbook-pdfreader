import { Document, Page } from 'react-pdf';
interface MiniPDFViewerProps {
  file: string;
  currentPage: number;
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Mini viewer senza controlli, solo visualizzazione di una pagina specifica
const MiniPDFViewer = ({ file, currentPage, zoom = 0.5, className = '', style = {}, onClick }: MiniPDFViewerProps) => (
  <div
    className={`rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer ${className}`}
    style={{ ...style, minHeight: 120, minWidth: 80, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
    onClick={onClick}
    tabIndex={0}
    role={onClick ? 'button' : undefined}
    aria-label="Apri PDF in grande"
  >
    <Document
      file={file}
      loading={<div className="text-center text-xs py-4 text-gray-400">Caricamento PDF...</div>}
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
    <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 8V6a2 2 0 0 1 2-2h2m8 0h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2m-8 0H6a2 2 0 0 1-2-2v-2"/></svg>
    </div>
  </div>
);

export default MiniPDFViewer;
