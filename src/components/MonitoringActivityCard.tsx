import { useQuery } from "@tanstack/react-query";
import { getOnlineInteractions } from "../api";

const MonitoringActivityCard = () => {
  const { data } = useQuery({
    queryKey: ["userActivity"],
    queryFn: async () => {
      return await getOnlineInteractions();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Online users</h2>
      {data && Array.isArray(data) && data.length > 0 ? (
      <ul>
        {data.map((activity, idx) => (
        <li key={activity.device?.deviceId || idx} className="mb-4 border-b pb-2">
          <div className="font-medium">PDF: {activity.pdfFileName}</div>
          <div>Page: {activity.pageNumber}</div>
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
        </li>
        ))}
      </ul>
      ) : (
      <div>No activity found.</div>
      )}
    </div>
  );
};
export default MonitoringActivityCard;
