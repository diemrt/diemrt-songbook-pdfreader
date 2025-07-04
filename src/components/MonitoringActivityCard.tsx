import { useQuery } from "@tanstack/react-query";
import { getActiveConnection } from "../api";

const MonitoringActivityCard = () => {
  const { data } = useQuery({
    queryKey: ["userActivity"],
    queryFn: async () => {
      return await getActiveConnection();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Online users</h2>
      {
        data && Array.isArray(data) && data.length > 0 ? (
          <ul>
            {data.map((activity, idx) => (
              <li key={activity.deviceId || idx} className="mb-2">
                <div className="font-medium">Device ID: {activity.deviceId}</div>
                <div>User Agent: {activity.userAgent}</div>
                <div>IP Address: {activity.ipAddress}</div>
                <div>Last Connection: {new Date(activity.lastConnection).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No activity found.</div>
        )
      }
    </div>
  );
};
export default MonitoringActivityCard;
