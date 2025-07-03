import { useQuery } from "@tanstack/react-query";
import { getStatus } from "../api";

const MonitoringStatusCard = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["monitoringStatus"],
        queryFn: getStatus,
        refetchInterval: 120000, // Refetch every 5 seconds
    });

    return (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Monitoring Status</h2>
            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
            ) : error ? (
                <div className="text-red-500">Errore nel caricamento dello stato.</div>
            ) : (
                <div className="space-y-3">
                    <div className="flex gap-3 items-center justify-between">
                        <span className="font-medium text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded text-sm font-semibold uppercase ${data.status === "ok" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {data.status}
                        </span>
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <span className="font-medium text-gray-600">Database:</span>
                        <span className={`px-2 py-1 rounded text-sm font-semibold ${data.database.connected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {data.database.connected ? "Connesso" : "Disconnesso"}
                        </span>
                    </div>
                    {data.database.error && (
                        <div className="flex gap-3 items-center justify-between">
                            <span className="font-medium text-gray-600">Errore DB:</span>
                            <span className="px-2 py-1 rounded text-sm font-semibold bg-red-100 text-red-700">
                                {data.database.error}
                            </span>
                        </div>
                    )}
                    <div className="flex gap-3 items-center justify-between">
                        <span className="font-medium text-gray-600">Server Time:</span>
                        <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                            {new Date(data.serverTime).toLocaleString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
export default MonitoringStatusCard;