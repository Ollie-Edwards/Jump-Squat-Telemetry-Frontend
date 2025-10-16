import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import DataPage from "./pages/DataPage.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/data/:id" element={<DataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App