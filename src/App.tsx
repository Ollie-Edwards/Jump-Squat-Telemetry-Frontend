import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import DataPage from "./pages/DataPage.tsx"
import ManageAthletes from "./pages/ManageAthletes.tsx"
import { NavMenu } from "./components/NavBar.tsx"

function App() {
  return (
    <>
      <NavMenu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data/:id" element={<DataPage />} />
          <Route path="/athletes" element={<ManageAthletes />} />
          <Route path="/viewSingleData" element={<h1>Single Data</h1>} />
          <Route path="/compareAthletes" element={<h1>Compare Athletes</h1>} />
        </Routes>
      </BrowserRouter>
  </>
  ); 
}

export default App