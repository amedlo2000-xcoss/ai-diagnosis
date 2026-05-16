import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopPage from './pages/TopPage';
import DiagnosisPage from './pages/DiagnosisPage';
import ResultPage from './pages/ResultPage';
import ReportPage from './pages/ReportPage';
import DeepDiagnosisPage from './pages/DeepDiagnosisPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/deep-diagnosis" element={<DeepDiagnosisPage />} />
      </Routes>
    </BrowserRouter>
  );
}
