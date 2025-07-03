import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { FilePathContext } from "../App";
import MonitoringStatusCard from "../components/MonitoringStatusCard";
import DeviceContext from "../contexts/DeviceContext";
import { useMutation } from "@tanstack/react-query";
import { disconnect } from "../api";

const MonitoringPage = () => {
  const { filePath } = useContext(FilePathContext);
  
  const { deviceId, setDeviceId } = useContext(DeviceContext);
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      if (id) {
        await disconnect(id);
      }
    },
    onSuccess: () => {
      console.log("Disconnected successfully");
    },
  });
  useEffect(() => {
    if (deviceId) {
      mutate(deviceId);
      setDeviceId(undefined); // Reset deviceId after disconnecting
    }
  }, [deviceId, mutate, setDeviceId]);

  return (
    <div className={"fixed inset-0 flex flex-col bg-gray-50 text-gray-900"}>
      <Header filePath={filePath} />
      <div className="flex-1 flex flex-col absolute top-16 py-10 px-8">
        <MonitoringStatusCard />
      </div>
    </div>
  );
};
export default MonitoringPage;
