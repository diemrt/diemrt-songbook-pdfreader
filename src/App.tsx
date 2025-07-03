import { pdfjs } from 'react-pdf';
import AppRouter from './components/AppRouter';
import { createContext } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const FilePathContext = createContext<{
    filePath: string;
}>({
    filePath: '/06.18.pdf',
});
export { FilePathContext };

function App() {
  
  return (
    <FilePathContext.Provider value={{ filePath: '/06.18.pdf' }}>
      <AppRouter />
    </FilePathContext.Provider>
  )
}

export default App
