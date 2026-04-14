import { useEffect, useState } from "react";

export type ColorMode = "light" | "dark";

const STORAGE_KEY = "site-color-mode";

function readStoredMode(): ColorMode {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark") return value;
  } catch {
    /* ignore */
  }
  return "light";
}

export function useColorMode(defaultMode: ColorMode = "light") {
  const [mode, setMode] = useState<ColorMode>(() =>
    typeof window !== "undefined" ? readStoredMode() : defaultMode,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  return { mode, setMode, isDark: mode === "dark" } as const;
}
