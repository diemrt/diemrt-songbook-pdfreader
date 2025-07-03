import { pdfjs } from 'react-pdf';
import AppRouter from './components/AppRouter';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  
  return (
    <AppRouter />
  )
}

export default App
