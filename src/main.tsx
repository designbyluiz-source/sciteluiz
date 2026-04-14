import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/projects" element={<App />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
