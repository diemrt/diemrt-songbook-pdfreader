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
        <div className="flex flex-col gap-5">
          {data.map((activity, idx) => (
            <div
              key={activity.device?.deviceId || idx}
              className="border border-gray-200 rounded-xl shadow bg-white/90 hover:shadow-lg transition-all duration-200 p-5 group flex flex-col md:flex-row gap-5 items-center md:items-stretch"
            >
              {/* Mini PDF Viewer */}
              {activity.pdfFileName && (
                <div className="w-full md:w-32 flex-shrink-0 flex items-center justify-center relative">
                  <MiniPDFViewer
                    file={activity.pdfFileName}
                    currentPage={activity.pageNumber}
                    zoom={0.5}
                    style={{ pointerEvents: "auto" }}
                    onClick={() => setModal({ file: activity.pdfFileName, page: activity.pageNumber })}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 text-xs text-gray-500 px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Clicca per ingrandire</span>
                </div>
              )}
              {/* Info Card */}
              <div className="flex-1 flex flex-col justify-center gap-1">
                <div className="font-semibold text-gray-700 truncate text-base mb-1 flex items-center gap-2">
                  <User2Icon className="w-5 h-5 text-blue-500" />
                  User Agent: <span className="text-gray-900 font-mono">{activity.device?.userAgent || "-"}</span>
                </div>
                <div className="text-sm text-gray-600">Pagina: <span className="font-semibold text-gray-800">{activity.pageNumber}</span></div>
                <div className="text-sm text-gray-600">PDF: <span className="text-gray-900 font-mono">{activity.pdfFileName}</span></div>
                <div className="text-xs text-gray-400">Timestamp: {new Date(activity.timestamp).toLocaleString()}</div>
                {activity.device && (
                  <div className="mt-2 pl-3 border-l-2 border-blue-100 bg-blue-50/30 rounded flex flex-col gap-1 py-1">
                    <div className="font-medium text-blue-700 text-xs">Device ID: <span className="font-mono text-gray-700">{activity.device.deviceId}</span></div>
                    <div className="text-xs text-gray-500">User Agent: <span className="font-mono">{activity.device.userAgent}</span></div>
                    <div className="text-xs text-gray-500">IP: <span className="font-mono">{activity.device.ipAddress}</span></div>
                    <div className="text-xs text-gray-400">Prima connessione: {new Date(activity.device.firstConnection).toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Ultima connessione: {new Date(activity.device.lastConnection).toLocaleString()}</div>
                    <div className="text-xs mt-1">
                      Status: {" "}
                      <span className={activity.device.isConnected ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {activity.device.isConnected ? "Connected" : "Disconnected"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
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
