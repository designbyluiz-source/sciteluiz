import { StrictMode, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import App from "./app/App.tsx";
import AboutPage from "./app/AboutPage.tsx";
// import { DesktopCameraNavigation } from "./app/components/DesktopCameraNavigation.tsx";
import ProjectGlobalDexPage from "./app/ProjectGlobalDexPage.tsx";
import ProjectGates2BPage from "./app/ProjectGates2BPage.tsx";
import ProjectQofrinhoPage from "./app/ProjectQofrinhoPage.tsx";
import { WelcomePreloader } from "./app/components/WelcomePreloader.tsx";
import { LanguageProvider } from "./app/language.tsx";
import "./styles/index.css";

/** After the welcome screen, always land on home (first visit or refresh). */
function RoutesWithPreloader() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const navigate = useNavigate();

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/sobre-mim" element={<AboutPage />} />
        <Route path="/projects/globaldex" element={<ProjectGlobalDexPage />} />
        <Route path="/projects/gates2b" element={<ProjectGates2BPage />} />
        <Route path="/projects/qofrinho" element={<ProjectQofrinhoPage />} />
        <Route path="/projects" element={<App />} />
        <Route path="/contact" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
      {/* Camera / hand-tracking navigation — hidden for now */}
      {/* <DesktopCameraNavigation /> */}
      {!preloaderDone ? <WelcomePreloader onComplete={handlePreloaderComplete} /> : null}
    </>
  );
}

function Root() {
  return (
    <StrictMode>
      <LanguageProvider>
        <BrowserRouter>
          <RoutesWithPreloader />
        </BrowserRouter>
      </LanguageProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
