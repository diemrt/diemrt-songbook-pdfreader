import { pdfjs } from "react-pdf";
import AppRouter from "./components/AppRouter";
import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectionProvider } from "./hooks/useConnection";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const FilePathContext = createContext<{
  filePath: string;
}>({
  filePath: "/06.18.pdf",
});
export { FilePathContext };

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider>
        <FilePathContext.Provider value={{ filePath: "/06.18.pdf" }}>
          <AppRouter />
        </FilePathContext.Provider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
}

export default App;
