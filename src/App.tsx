import MusicPDFReader from "./components/MusicPDFReader"
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  
  return (
    <MusicPDFReader />
  )
}

export default App
