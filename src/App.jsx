import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./modules/Login";
import Register from "./modules/Register";
import Dashboard from "./modules/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
