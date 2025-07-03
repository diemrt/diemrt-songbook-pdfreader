import { createContext, useState, useEffect, useRef } from "react";
import MonitoringPage from "../pages/MonitoringPage";
import ReaderOnlyPage from "../pages/ReaderOnlyPage";
import { useConnection } from "../hooks/useConnectionHook";

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
    const { disconnectDevice, connectDevice } = useConnection();
    const wasMonitoring = useRef(false);

    useEffect(() => {
        // Quando entri in monitoring, disconnetti
        if (isMonitoring) {
            disconnectDevice();
            wasMonitoring.current = true;
        } else if (wasMonitoring.current) {
            // Quando esci da monitoring, riconnetti
            connectDevice();
            wasMonitoring.current = false;
        }
        // eslint-disable-next-line
    }, [isMonitoring]);

    return (
        <MonitoringContext.Provider value={{ isMonitoring, setIsMonitoring }}>
            {isMonitoring ? (
                <MonitoringPage />
            ) : (
                <ReaderOnlyPage />
            )}
        </MonitoringContext.Provider>
    );
}

export default AppRouter;