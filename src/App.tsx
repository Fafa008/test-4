import { Route, Routes } from "react-router-dom";
import Client from "./components/pages/Client.tsx";
import LandinPage from "./LandinPage.tsx";
import Detection from "./components/pages/Detection.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/Client" element={<Client />} />
        <Route path="/Detection" element={<Detection />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
