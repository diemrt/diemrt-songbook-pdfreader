import { useQuery } from "@tanstack/react-query";
import { getOnlineInteractions } from "../api";
import MiniPDFViewer from "./MiniPDFViewer";

const MonitoringActivityCard = () => {
  const { data } = useQuery({
    queryKey: ["userActivity"],
    queryFn: async () => {
      return await getOnlineInteractions();
    },
    refetchInterval: 5000,
  });

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Online users</h2>
      {data && Array.isArray(data) && data.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data.map((activity, idx) => (
            <div
              key={activity.device?.deviceId || idx}
              className="border rounded-lg shadow-sm p-4 bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Mini PDF Viewer */}
                {activity.pdfFileName && (
                  <div className="w-full md:w-32 flex-shrink-0 flex items-center justify-center">
                    <MiniPDFViewer
                      file={activity.pdfFileName}
                      currentPage={activity.pageNumber}
                      zoom={0.5}
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
                )}
                {/* Info Card */}
                <div className="flex-1">
                  <div className="font-medium truncate">PDF: {activity.pdfFileName}</div>
                  <div>Pagina: {activity.pageNumber}</div>
                  <div>Timestamp: {new Date(activity.timestamp).toLocaleString()}</div>
                  {activity.device && (
                    <div className="mt-2 pl-2 border-l">
                      <div className="font-medium">Device ID: {activity.device.deviceId}</div>
                      <div>User Agent: {activity.device.userAgent}</div>
                      <div>IP Address: {activity.device.ipAddress}</div>
                      <div>First Connection: {new Date(activity.device.firstConnection).toLocaleString()}</div>
                      <div>Last Connection: {new Date(activity.device.lastConnection).toLocaleString()}</div>
                      <div>
                        Status:{" "}
                        <span className={activity.device.isConnected ? "text-green-600" : "text-red-600"}>
                          {activity.device.isConnected ? "Connected" : "Disconnected"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Nessuna attività trovata.</div>
      )}
    </div>
  );
};

export default MonitoringActivityCard;
