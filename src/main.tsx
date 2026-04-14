import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app/App.tsx";
import { WelcomePreloader } from "./app/components/WelcomePreloader.tsx";
import { LanguageProvider } from "./app/language.tsx";
import "./styles/index.css";

function Root() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <StrictMode>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<App />} />
            <Route path="/contact" element={<App />} />
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
        {!preloaderDone ? <WelcomePreloader onComplete={() => setPreloaderDone(true)} /> : null}
      </LanguageProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
