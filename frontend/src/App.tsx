import { Navigate, Route, Routes } from 'react-router-dom';

import { AppShell } from '@/components/AppShell';
import { ChatPage } from '@/pages/ChatPage';
import { EvaluationPage } from '@/pages/EvaluationPage';
import { IngestionPage } from '@/pages/IngestionPage';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/ingestion" element={<IngestionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
