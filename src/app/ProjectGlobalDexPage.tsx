import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import globaldexScroll1 from "../assets/globaldex-scroll1.png";
import globaldexScroll2 from "../assets/globaldex-scroll2.png";
import globaldexScroll3 from "../assets/globaldex-scroll3.png";
import globaldexScroll4 from "../assets/globaldex-scroll4.png";
import globaldexScroll5 from "../assets/globaldex-scroll5.png";
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

const GLOBALDEX_SLIDE_SRC = [
  globaldexScroll1,
  globaldexScroll2,
  globaldexScroll3,
  globaldexScroll4,
  globaldexScroll5,
] as const;
const GLOBALDEX_SLIDE_COUNT = GLOBALDEX_SLIDE_SRC.length;

/** Ordered by filename prefix 1 … 5 — one slide per fifth of copy scroll. */
const globaldexSlideAriaLabels: Record<Locale, readonly string[]> = {
  "pt-BR": [
    "Mockup GlobalDex: composição com vários telemóveis e gráfico de Bitcoin",
    "Mockup GlobalDex: carteira, saldo e ativos",
    "Mockup GlobalDex: introdução à aba Carteira",
    "Mockup GlobalDex: exportar extrato — confirmação por e-mail",
    "Mockup GlobalDex: seleção de método de pagamento (PIX, USDT, SEPA)",
  ],
  en: [
    "GlobalDex mockup: multi-phone layout with Bitcoin price chart",
    "GlobalDex mockup: wallet tab, balance and assets",
    "GlobalDex mockup: onboarding tooltip for the Wallet tab",
    "GlobalDex mockup: export statement — email confirmation state",
    "GlobalDex mockup: payment method selection (PIX, USDT, SEPA)",
  ],
  es: [
    "Mockup GlobalDex: varios móviles y gráfico de Bitcoin",
    "Mockup GlobalDex: pestaña Cartera, saldo y activos",
    "Mockup GlobalDex: introducción a la pestaña Cartera",
    "Mockup GlobalDex: exportar extracto — confirmación por correo",
    "Mockup GlobalDex: selección de método de pago (PIX, USDT, SEPA)",
  ],
};

export default function ProjectGlobalDexPage() {
  const { mode, setMode, isDark } = useColorMode("light");
  const { t, locale } = useLanguage();
  const copy = projectCopy.globaldex[locale];
  const copyScrollRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const syncImageFromScroll = useCallback(() => {
    const el = copyScrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const progress = max <= 0 ? 0 : el.scrollTop / max;
    const idx = Math.min(GLOBALDEX_SLIDE_COUNT - 1, Math.floor(progress * GLOBALDEX_SLIDE_COUNT));
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
      data-name="Desktop - 8"
      data-node-id="30:65"
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
                name="color-mode-globaldex"
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
                name="color-mode-globaldex"
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

        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-black/10" data-node-id="30:66">
          <div
            className={`relative flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row items-stretch justify-between gap-[clamp(8px,2vmin,28px)] overflow-hidden border border-black/50 ${framePad}`}
            data-node-id="30:67"
          >
            <div
              className="flex min-w-0 shrink-0 flex-col items-start gap-[clamp(10px,2.4vmin,24px)] sm:flex-1 sm:min-h-0"
              data-node-id="30:68"
            >
              <Link
                to="/projects"
                className={`shrink-0 font-['Darker_Grotesque',sans-serif] font-light leading-none text-black no-underline hover:opacity-70 ${headingSize}`}
                data-node-id="30:70"
              >
                {"< GLOBALDEX"}
              </Link>

              <div className="flex w-full flex-1 items-center justify-center">
                <div
                  className="group relative w-[min(100%,720px)] aspect-[778/539] overflow-hidden rounded-[40px]"
                  data-node-id="30:86"
                  role="img"
                  aria-label={globaldexSlideAriaLabels[locale][slideIndex]}
                >
                  {GLOBALDEX_SLIDE_SRC.map((src, i) => (
                    <img
                      key={src}
                      alt=""
                      aria-hidden
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out${isDark ? " invert" : ""} ${slideIndex === i ? "opacity-100" : "opacity-0"}`}
                      src={src}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 z-[1] rounded-[40px] bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute left-1/2 top-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[clamp(10px,1.1vmin,14px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href={projectSiteUrls.globaldex}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white px-[clamp(16px,1.6vmin,24px)] py-[clamp(7px,0.8vmin,11px)] font-['Darker_Grotesque',sans-serif] text-[clamp(1rem,1.6vmin,1.3rem)] font-bold uppercase tracking-wide text-white no-underline"
                    >
                      SITE
                    </a>
                    <a
                      href={projectSiteUrls.globaldexBehance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white px-[clamp(16px,1.6vmin,24px)] py-[clamp(7px,0.8vmin,11px)] font-['Darker_Grotesque',sans-serif] text-[clamp(1rem,1.6vmin,1.3rem)] font-bold uppercase tracking-wide text-white no-underline"
                    >
                      BEHANCE
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={copyScrollRef}
              className={`hide-scrollbar flex min-h-0 w-full flex-1 flex-col items-start gap-[clamp(36px,4.2vmin,76px)] overflow-y-auto overscroll-contain font-['Darker_Grotesque',sans-serif] font-normal leading-normal text-black ${bodySize} sm:w-[min(374px,100%)] sm:max-w-[min(374px,42%)] sm:flex-none sm:shrink-0`}
              data-node-id="30:72"
            >
              <div className="w-full" data-node-id="30:73">
                <p className="font-bold">{copy.introTitle}</p>
                <p className="mt-[0.7em]">{copy.introBody}</p>
              </div>

              <div className="w-full" data-node-id="30:88">
                <p>{copy.overviewP1}</p>
                <p className="mt-[0.7em]">{copy.overviewP2}</p>
              </div>

              <div className="w-full" data-node-id="30:90">
                <p className="font-bold">{copy.challengeTitle}</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  {copy.challengeItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full" data-node-id="30:92">
                <p className="font-bold">{copy.approachTitle}</p>
                <p className="mt-[0.7em]">{copy.approachIntro}</p>
                {copy.approachPillars.map((pillar) => (
                  <p key={pillar.label} className="mt-[0.7em]">
                    <span className="font-bold">{pillar.label}</span> {pillar.body}
                  </p>
                ))}
              </div>

              <div className="w-full" data-node-id="30:94">
                <p className="font-bold">{copy.solutionTitle}</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  {copy.solutionItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full" data-node-id="30:96">
                <p className="font-bold">{copy.roleTitle}</p>
                <p className="mt-[0.7em]">{copy.roleName}</p>
                <p className="mt-[0.7em]">{copy.roleBody}</p>
              </div>

              <Link to="/projects/gates2b" className="w-full font-bold no-underline text-inherit hover:opacity-80" data-node-id="30:98">
                {copy.nextProject}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
