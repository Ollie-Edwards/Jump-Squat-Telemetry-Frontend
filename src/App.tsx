import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import DataPage from "./pages/DataPage.tsx"
import { NavigationMenuDemo } from "./components/NavBar.tsx"

function App() {
  return (
    <>
      <NavigationMenuDemo />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data/:id" element={<DataPage />} />
          <Route path="/athletes" element={<h1>Athlete</h1>} />
          <Route path="/viewSingleData" element={<h1>Single Data</h1>} />
          <Route path="/compareAthletes" element={<h1>Compare Athletes</h1>} />
        </Routes>
      </BrowserRouter>
  </>
  ); 
}

export default App