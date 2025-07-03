import { createContext, useState } from "react";
import MonitoringPage from "../pages/MonitoringPage";
import ReaderOnlyPage from "../pages/ReaderOnlyPage";

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