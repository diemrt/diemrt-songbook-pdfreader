import { createContext, useState } from "react";
import MonitoringPage from "../pages/MonitoringPage";
import ReaderOnlyPage from "../pages/ReaderOnlyPage";
import DeviceContext from "../contexts/DeviceContext";

const MonitoringContext = createContext<{
  isMonitoring: boolean;
  setIsMonitoring: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isMonitoring: false,
  setIsMonitoring: () => {},
});
export { MonitoringContext };

const AppRouter = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  return (
    <MonitoringContext.Provider value={{ isMonitoring, setIsMonitoring }}>
      <DeviceContext.Provider value={{ deviceId, setDeviceId }}>
        {isMonitoring ? <MonitoringPage /> : <ReaderOnlyPage />}
      </DeviceContext.Provider>
    </MonitoringContext.Provider>
  );
};

export default AppRouter;
