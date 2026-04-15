import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import gates2bScroll1 from "../assets/gates2b-scroll1.png";
import gates2bScroll2 from "../assets/gates2b-scroll2.png";
import gates2bScroll3 from "../assets/gates2b-scroll3.png";
import gates2bScroll4 from "../assets/gates2b-scroll4.png";
import { LanguageRail } from "./components/LanguageRail";
import { MetaballShaderBackground } from "./components/MetaballShaderBackground";
import { projectCopy } from "./projectCopy";
import { projectSiteUrls } from "./projectSiteUrls";
import { useLanguage, type Locale } from "./language";
import { useColorMode } from "./useColorMode";

const SHELL_PAD = "clamp(10px, 3vmin, 30px)";
const framePad = "p-[clamp(10px,3vmin,30px)]";
const headingSize = "text-[clamp(1.25rem,4.2vmin,3.375rem)]";
const bodySize = "text-[clamp(1rem,2.05vmin,1.375rem)]";

const GATES2B_SLIDE_SRC = [gates2bScroll1, gates2bScroll2, gates2bScroll3, gates2bScroll4] as const;
const GATES2B_SLIDE_COUNT = GATES2B_SLIDE_SRC.length;

/** Filename order 1 … 4 — one slide per quarter of copy scroll. */
const gates2bSlideAriaLabels: Record<Locale, readonly string[]> = {
  "pt-BR": [
    "Mockup Gates2B: transações e resumo financeiro",
    "Mockup Gates2B: criar cobrança — passo valor",
    "Mockup Gates2B: checkout e catálogo de produtos",
    "Mockup Gates2B: limites e tarifas da conta",
  ],
  en: [
    "Gates2B mockup: transactions and financial summary",
    "Gates2B mockup: create charge — amount step",
    "Gates2B mockup: checkout and product catalog",
    "Gates2B mockup: account limits and fees",
  ],
  es: [
    "Mockup Gates2B: transacciones y resumen financiero",
    "Mockup Gates2B: crear cobro — paso importe",
    "Mockup Gates2B: checkout y catálogo de productos",
    "Mockup Gates2B: límites y comisiones de la cuenta",
  ],
};

export default function ProjectGates2BPage() {
  const { mode, setMode, isDark } = useColorMode("light");
  const { t, locale } = useLanguage();
  const copy = projectCopy.gates2b[locale];
  const copyScrollRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const syncImageFromScroll = useCallback(() => {
    const el = copyScrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const progress = max <= 0 ? 0 : el.scrollTop / max;
    const idx = Math.min(GATES2B_SLIDE_COUNT - 1, Math.floor(progress * GATES2B_SLIDE_COUNT));
    setSlideIndex(idx);
  }, []);

  useEffect(() => {
    const el = copyScrollRef.current;
    if (!el) return;
    syncImageFromScroll();
    el.addEventListener("scroll", syncImageFromScroll, { passive: true });
    const ro = new ResizeObserver(syncImageFromScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncImageFromScroll);
      ro.disconnect();
    };
  }, [syncImageFromScroll, locale]);

  const label = isDark ? "text-white" : "text-black";
  const boxOn = isDark ? "border-white bg-white" : "border-black bg-black";
  const boxOff = isDark ? "border-white bg-transparent" : "border-black bg-white";
  const font = "font-['Darker_Grotesque',sans-serif]";
  const optionGap = "gap-[clamp(10px,1.6vmin,14px)]";

  return (
    <div
      className={`relative box-border flex h-dvh max-h-dvh w-full max-w-[100vw] flex-col items-stretch overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
      style={
        {
          padding: SHELL_PAD,
          ["--shell-pad" as string]: SHELL_PAD,
        } as CSSProperties
      }
    >
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
                name="color-mode-gates2b"
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
                name="color-mode-gates2b"
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

      <div className={`relative z-10 flex min-h-0 min-w-0 flex-1 flex-col ${isDark ? "invert" : ""}`}>
        <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden>
          <MetaballShaderBackground className="object-cover" />
        </div>

        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-black/10">
          <div
            className={`relative flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row items-stretch justify-between gap-[clamp(8px,2vmin,28px)] overflow-hidden border border-black/50 ${framePad}`}
          >
            <div className="flex min-w-0 shrink-0 flex-col items-start gap-[clamp(10px,2.4vmin,24px)] sm:flex-1 sm:min-h-0">
              <Link
                to="/projects"
                className={`shrink-0 font-['Darker_Grotesque',sans-serif] font-light leading-none text-black no-underline hover:opacity-70 ${headingSize}`}
              >
                {"< GATES2B"}
              </Link>

              <div className="flex w-full flex-1 items-center justify-center">
                <div
                  className="group relative w-[min(100%,720px)] aspect-[778/539] overflow-hidden rounded-[40px]"
                  role="img"
                  aria-label={gates2bSlideAriaLabels[locale][slideIndex]}
                >
                  {GATES2B_SLIDE_SRC.map((src, i) => (
                    <img
                      key={src}
                      alt=""
                      aria-hidden
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out${isDark ? " invert" : ""} ${slideIndex === i ? "opacity-100" : "opacity-0"}`}
                      src={src}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 z-[1] rounded-[40px] bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <a
                    href={projectSiteUrls.gates2b}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white px-[clamp(16px,1.6vmin,24px)] py-[clamp(7px,0.8vmin,11px)] font-['Darker_Grotesque',sans-serif] text-[clamp(1rem,1.6vmin,1.3rem)] font-bold uppercase tracking-wide text-white no-underline opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    GATES2B
                  </a>
                </div>
              </div>
            </div>

            <div
              ref={copyScrollRef}
              className={`hide-scrollbar flex min-h-0 w-full flex-1 flex-col items-start gap-[clamp(36px,4.2vmin,76px)] overflow-y-auto overscroll-contain font-['Darker_Grotesque',sans-serif] font-normal leading-normal text-black ${bodySize} sm:w-[min(374px,100%)] sm:max-w-[min(374px,42%)] sm:flex-none sm:shrink-0`}
            >
              <div className="w-full">
                <p className="font-bold">{copy.introTitle}</p>
                <p className="mt-[0.7em]">{copy.introBody}</p>
              </div>

              <div className="w-full">
                <p className="font-bold">{copy.contextTitle}</p>
                <p className="mt-[0.7em]">{copy.contextP1}</p>
                <p className="mt-[0.7em]">{copy.contextP2}</p>
              </div>

              <div className="w-full">
                <p className="font-bold">{copy.challengeTitle}</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  {copy.challengeItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">{copy.approachTitle}</p>
                <p className="mt-[0.7em]">{copy.approachIntro}</p>
                {copy.approachPillars.map((pillar) => (
                  <p key={pillar.label} className="mt-[0.7em]">
                    <span className="font-bold">{pillar.label}</span>
                    <br />
                    {pillar.body}
                  </p>
                ))}
              </div>

              <div className="w-full">
                <p className="font-bold">{copy.solutionTitle}</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  {copy.solutionItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">{copy.resultTitle}</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  {copy.resultItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">{copy.roleTitle}</p>
                <p className="mt-[0.7em]">{copy.roleName}</p>
                <p className="mt-[0.7em]">{copy.roleBody}</p>
              </div>

              <Link to="/projects/qofrinho" className="w-full font-bold no-underline text-inherit hover:opacity-80">
                {copy.nextProject}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
