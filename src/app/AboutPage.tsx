import { useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { LanguageRail } from "./components/LanguageRail";
import { MetaballShaderBackground } from "./components/MetaballShaderBackground";
import { useLanguage, type MessageKey } from "./language";
import portrait from "../assets/about-portrait.png";

const SHELL_PAD = "clamp(10px, 3vmin, 30px)";
const framePad = "p-[clamp(10px,3vmin,30px)]";
const introSize = "text-[clamp(0.85rem,2.05vmin,1.375rem)]";
const backSize = "text-[clamp(1.75rem,4.2vmin,3.375rem)]";

type ColorMode = "light" | "dark";

const bioParagraphs: MessageKey[] = ["aboutP1", "aboutP2", "aboutP3", "aboutP4", "aboutP5"];

export default function AboutPage() {
  const [mode, setMode] = useState<ColorMode>("light");
  const isDark = mode === "dark";
  const { t } = useLanguage();

  const label = isDark ? "text-white" : "text-black";
  const boxOn = isDark ? "border-white bg-white" : "border-black bg-black";
  const boxOff = isDark ? "border-white bg-transparent" : "border-black bg-white";
  const font = "font-['Darker_Grotesque',sans-serif]";
  const optionGap = "gap-[clamp(10px,1.6vmin,14px)]";

  return (
    <div
      className={`relative box-border flex h-dvh max-h-dvh w-full max-w-[100vw] flex-col items-stretch overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
      data-name="Desktop - 6"
      data-node-id="17:279"
      style={
        {
          padding: SHELL_PAD,
          ["--shell-pad" as string]: SHELL_PAD,
        } as CSSProperties
      }
    >
      {/* Left absolute rail: language + theme */}
      <div
        className="pointer-events-auto absolute z-30 flex flex-col items-center justify-between"
        style={{
          left: "calc(var(--shell-pad) * 0.5)",
          top: "var(--shell-pad)",
          bottom: "var(--shell-pad)",
          width: "clamp(28px, 3.2vmin, 40px)",
          transform: "translateX(-50%)",
        }}
      >
        <div className="pointer-events-auto flex shrink-0 flex-col items-center pt-[2px]">
          <LanguageRail isDark={isDark} />
        </div>

        {/* Theme toggle */}
        <aside
          className={`pointer-events-auto flex h-full min-h-0 w-full flex-col items-center justify-end bg-transparent pb-[clamp(6px,1.2vmin,14px)] ${font}`}
          aria-label={t("ariaTheme")}
        >
          <div
            role="radiogroup"
            aria-orientation="vertical"
            className="flex flex-col items-center gap-[clamp(1.35rem,3.2vmin,2.25rem)]"
          >
            <label className={`flex cursor-pointer flex-col items-center ${optionGap} ${label}`}>
              <input
                type="radio"
                name="color-mode-about"
                value="dark"
                checked={mode === "dark"}
                onChange={() => setMode("dark")}
                className="sr-only"
              />
              <span className={`size-3 shrink-0 border ${mode === "dark" ? boxOn : boxOff}`} aria-hidden />
              <span
                className={`origin-center rotate-[-90deg] select-none whitespace-nowrap text-[clamp(11px,1.5vmin,16px)] font-normal uppercase tracking-wide ${label}`}
              >
                {t("themeDark")}
              </span>
            </label>
            <label className={`flex cursor-pointer flex-col items-center ${optionGap} ${label}`}>
              <input
                type="radio"
                name="color-mode-about"
                value="light"
                checked={mode === "light"}
                onChange={() => setMode("light")}
                className="sr-only"
              />
              <span className={`size-3 shrink-0 border ${mode === "light" ? boxOn : boxOff}`} aria-hidden />
              <span
                className={`origin-center rotate-[-90deg] select-none whitespace-nowrap text-[clamp(11px,1.5vmin,16px)] font-normal uppercase tracking-wide ${label}`}
              >
                {t("themeLight")}
              </span>
            </label>
          </div>
        </aside>
      </div>

      {/* Background shader */}
      <div className={`relative z-10 flex min-h-0 min-w-0 flex-1 flex-col ${isDark ? "invert" : ""}`}>
        <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden>
          <MetaballShaderBackground className="object-cover" />
        </div>

        {/* Outer border */}
        <div
          className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-black/10"
          data-node-id="17:280"
        >
          {/* Inner border + content */}
          <div
            className={`relative flex min-h-0 min-w-0 flex-1 flex-row items-stretch justify-between gap-[clamp(8px,2vmin,28px)] overflow-hidden border border-black/50 ${framePad}`}
            data-node-id="17:281"
          >
            {/* LEFT: back link + portrait */}
            <div
              className="flex min-h-0 min-w-0 flex-1 flex-col items-start gap-[clamp(10px,2.4vmin,24px)]"
              data-node-id="17:282"
            >
              <Link
                to="/"
                className={`shrink-0 font-['Darker_Grotesque',sans-serif] font-light leading-none no-underline hover:opacity-70 ${backSize} ${isDark ? "text-white" : "text-black"}`}
                data-node-id="17:284"
              >
                {t("aboutBack")}
              </Link>

              {/* Portrait container — bleed to bottom border via negative margin */}
              <div
                className="relative min-h-0 w-full flex-1 overflow-hidden mb-[calc(-1*clamp(10px,3vmin,30px))]"
                data-node-id="17:346"
              >
                <img
                  alt="Luiz Eduardo"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ width: "88%", height: "auto" }}
                  src={portrait}
                />
              </div>
            </div>

            {/* RIGHT: bio text + projects link */}
            <div
              className="hide-scrollbar flex min-h-0 w-[min(374px,100%)] max-w-[min(374px,42%)] shrink-0 flex-col items-end justify-start overflow-y-auto overscroll-contain"
              data-node-id="17:388"
            >
              <div
                className={`w-full text-right font-['Darker_Grotesque',sans-serif] font-normal leading-normal ${introSize} ${isDark ? "text-white" : "text-black"}`}
                data-node-id="17:389"
              >
                {bioParagraphs.map((key) => (
                  <p key={key} className="mb-[0.85em] last:mb-0">
                    {t(key)}
                  </p>
                ))}
              </div>
              <Link
                to="/projects"
                className={`mt-[0.85em] font-['Darker_Grotesque',sans-serif] font-bold leading-normal no-underline hover:opacity-70 ${introSize} ${isDark ? "text-white" : "text-black"}`}
              >
                {t("aboutProjects")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
