import { useContext } from "react";
import Header from "../components/Header";
import { FilePathContext } from "../App";

const MonitoringPage = () => {
  const { filePath } = useContext(FilePathContext);

  return (
    <div className={"fixed inset-0 flex flex-col bg-gray-50 text-gray-900"}>
      <Header filePath={filePath} />
      <div>
        <h1>Monitoring Page</h1>
        <p>This page is under construction.</p>
      </div>
    </div>
  );
};
export default MonitoringPage;
