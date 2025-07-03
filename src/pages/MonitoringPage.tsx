import { useContext } from "react";
import Header from "../components/Header";
import { FilePathContext } from "../App";
import MonitoringStatusCard from "../components/MonitoringStatusCard";

const MonitoringPage = () => {
  const { filePath } = useContext(FilePathContext);

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
