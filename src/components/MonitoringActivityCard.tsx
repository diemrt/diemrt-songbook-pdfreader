import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getOnlineInteractions } from "../api";
import MiniPDFViewer from "./MiniPDFViewer";
import { Document, Page } from "react-pdf";
import { User2Icon } from "lucide-react";

const MonitoringActivityCard = () => {
  const { data } = useQuery({
    queryKey: ["userActivity"],
    queryFn: async () => {
      return await getOnlineInteractions();
    },
    refetchInterval: 5000,
  });

  const [modal, setModal] = useState<{
    file: string;
    page: number;
  } | null>(null);

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-2xl p-6 w-full max-h-[80vh] overflow-y-auto border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <User2Icon className="w-6 h-6 text-blue-600" />
        Attività Utenti Online
      </h2>
      {data && Array.isArray(data) && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((activity, idx) => (
            <div
              key={activity.device?.deviceId || idx}
              className="border border-gray-200 rounded-2xl shadow bg-white/90 hover:shadow-lg transition-all duration-200 p-4 group flex flex-col items-center relative w-80 min-h-[220px]"
            >
              {/* Mini PDF Viewer */}
              {activity.pdfFileName && (
                <div className="w-full flex items-center justify-center relative mb-3">
                  <MiniPDFViewer
                    file={activity.pdfFileName}
                    currentPage={activity.pageNumber}
                    zoom={0.7}
                    style={{ pointerEvents: "auto", borderRadius: 8, boxShadow: '0 2px 8px #0001' }}
                    onClick={() => setModal({ file: activity.pdfFileName, page: activity.pageNumber })}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 text-xs text-gray-500 px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Clicca per ingrandire</span>
                </div>
              )}
              {/* Info Card - Priorità alta */}
              <div className="w-full flex flex-col items-center gap-1 mb-2">
                <div className="font-semibold text-gray-800 text-base flex items-center gap-2 truncate w-full justify-center">
                  <User2Icon className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-900 font-mono truncate max-w-[120px]" title={activity.device?.userAgent || "-"}>{activity.device?.userAgent || "-"}</span>
                </div>
                <div className="text-sm text-blue-700 font-bold">Pagina: <span className="text-lg font-extrabold text-blue-900">{activity.pageNumber}</span></div>
                <div className="text-xs text-green-600 font-bold">Preferiti: <span className="text-md font-extrabold text-green-700">{activity.favorites || "-"}</span></div>
              </div>
              {/* Info secondarie - collapsible */}
              <details className="w-full mt-auto text-xs text-gray-600 bg-gray-50 rounded p-2 cursor-pointer select-none">
                <summary className="font-medium text-gray-500 mb-1 cursor-pointer">Dettagli</summary>
                <div className="flex flex-col gap-1">
                  <div>PDF: <span className="text-gray-900 font-mono">{activity.pdfFileName}</span></div>
                  <div>Timestamp: <span className="text-gray-500">{new Date(activity.timestamp).toLocaleString()}</span></div>
                  {activity.device && (
                    <div className="mt-1 border-t border-gray-200 pt-1 flex flex-col gap-1">
                      <div>Device ID: <span className="font-mono text-gray-700">{activity.device.deviceId}</span></div>
                      <div>User Agent: <span className="font-mono">{activity.device.userAgent}</span></div>
                      <div>IP: <span className="font-mono">{activity.device.ipAddress}</span></div>
                      <div>Prima connessione: <span className="text-gray-400">{new Date(activity.device.firstConnection).toLocaleString()}</span></div>
                      <div>Ultima connessione: <span className="text-gray-400">{new Date(activity.device.lastConnection).toLocaleString()}</span></div>
                      <div>Status: <span className={activity.device.isConnected ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{activity.device.isConnected ? "Connected" : "Disconnected"}</span></div>
                    </div>
                  )}
                </div>
              </details>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-10">Nessuna attività trovata.</div>
      )}

      {/* MODALE PDF GRANDE */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl shadow-2xl p-0 max-w-3xl w-full flex flex-col items-center overflow-hidden">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 bg-gray-100 rounded-full p-2 shadow z-10"
              onClick={() => setModal(null)}
              aria-label="Chiudi modale"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
            <div className="w-full flex flex-col items-center justify-center" style={{height: '80vh', maxHeight: '80vh', overflow: 'hidden'}}>
              <Document
                file={modal.file}
                loading={<div className="text-center text-xs py-4 text-gray-400">Caricamento PDF...</div>}
                error={<div className="text-center text-xs text-red-500 py-4">Errore PDF</div>}
              >
                <Page
                  pageNumber={modal.page}
                  scale={1}
                  width={undefined}
                  height={window.innerHeight * 0.75}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="w-auto h-full max-h-[75vh] object-contain bg-black mx-auto my-0 flex items-center justify-center rounded-lg"
                />
              </Document>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringActivityCard;
