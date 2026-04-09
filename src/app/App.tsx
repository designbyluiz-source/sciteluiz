import svgPaths from "../imports/svg-crr9i1ce9w";
import svgFooter from "../imports/svg-q9rxfrhwj9";
import imgFrame5 from "../assets/24ed2fdde7b0356be69eb847960e469f7c342c23.png";
import imgFrame6 from "../assets/dea83ccece2367a9ef6dbad9c1009b587db11e08.png";
import imgHeroMobile from "../assets/hero-portrait-mobile.png";
import imgGallery1 from "../assets/0a066664ae5eea137b87861cac14ac3c376dcb90.png";
import imgGallery2 from "../assets/cfd07b2dc7954a1147ec72a2578d26cca32a12cf.png";
import imgGallery3 from "../assets/8021915750859e35d2c2e8edfb22f9cf611b7783.png";
import imgGallery4 from "../assets/1d4962aca37671503ec872bfef5995beac3b04ed.png";
import imgGallery5 from "../assets/527c891f9ca86d362ad4ae91971a26d1d3858c5c.png";
import imgGallery6 from "../assets/836c9c8d27c743f084e07231013f92330fbbee73.png";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LoadingScreen } from "./components/loading-screen";

const galleryImages = [imgGallery1, imgGallery2, imgGallery3, imgGallery4, imgGallery5, imgGallery6];

function Logo() {
  return (
    <div className="relative shrink-0 size-[41px] md:size-[36px]">
      <svg className="block size-full" fill="none" viewBox="0 0 41 41">
        <g clipPath="url(#clip0)">
          <path d={svgPaths.p2d46400} fill="#2E1F26" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect fill="white" height="41" width="41" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  className = "",
  variant = "hero",
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  /** hero: pills on claro (topo). dark: pills como secções escuras do site */
  variant?: "hero" | "dark";
}) {
  const shell =
    variant === "dark"
      ? "border-2 border-[#c77840] hover:bg-[#c77840] hover:border-[#c77840]"
      : "border-2 border-[#2e1f26] hover:bg-[#2e1f26]";
  const text =
    variant === "dark"
      ? "text-[#c77840] group-hover:text-[#2e1f26]"
      : "text-[#2e1f26] group-hover:text-white";
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`flex items-center justify-center px-6 md:px-10 py-2 md:py-2.5 rounded-full cursor-pointer transition-colors group ${shell} ${className}`}
    >
      <p className={`font-['Space_Grotesk',sans-serif] font-bold text-sm md:text-[19px] whitespace-nowrap ${text}`}>
        {label}
      </p>
    </div>
  );
}

/** Mesma linguagem do hamburger fixo (#502506 + traços brancos) */
function HamburgerIcon({ open }: { open: boolean }) {
  const line = "block h-[2px] w-[22px] rounded-full bg-white transition-transform duration-300 ease-out";
  return (
    <span className="relative flex h-[18px] w-[22px] flex-col justify-center gap-[5px]" aria-hidden>
      <span className={`${line} origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`} />
      <span className={`${line} ${open ? "scale-x-0 opacity-0" : ""}`} />
      <span className={`${line} origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
    </span>
  );
}

function MobileMenuHamburgerButton({
  open,
  onClick,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: {
  open: boolean;
  onClick: () => void;
  "aria-label": string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}) {
  return (
    <button
      type="button"
      className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#502506] text-white shadow-sm transition-transform duration-200 active:scale-[0.97] md:hidden"
      style={{ boxShadow: "0 2px 12px rgba(80, 37, 6, 0.35)" }}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <HamburgerIcon open={open} />
    </button>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroParallaxBgRef = useRef<HTMLDivElement>(null);
  const heroParallaxPersonMobileRef = useRef<HTMLImageElement>(null);
  const heroParallaxPersonDesktopRef = useRef<HTMLImageElement>(null);
  const heroParallaxNavRef = useRef<HTMLElement>(null);
  const heroParallaxTitleRef = useRef<HTMLDivElement>(null);
  const heroParallaxMarqueeRef = useRef<HTMLDivElement>(null);
  const footerCircleParallaxRef = useRef<HTMLDivElement>(null);
  const [heroFullyCovered, setHeroFullyCovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    // Mark page as ready once all images/resources loaded
    if (document.readyState === "complete") {
      setPageReady(true);
    } else {
      const handler = () => setPageReady(true);
      window.addEventListener("load", handler);
      return () => window.removeEventListener("load", handler);
    }
  }, []);

  /** Parallax via rAF + DOM (sem setState no scroll) = fluido em produção */
  useLayoutEffect(() => {
    if (loading) return;

    const applyParallax = () => {
      const y = window.scrollY;
      const bg = heroParallaxBgRef.current;
      if (bg) bg.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;

      const pm = heroParallaxPersonMobileRef.current;
      if (pm) pm.style.transform = `translate3d(-50%, ${y * 0.15}px, 0)`;

      const pd = heroParallaxPersonDesktopRef.current;
      if (pd) pd.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;

      const nav = heroParallaxNavRef.current;
      if (nav) {
        nav.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
        nav.style.opacity = String(Math.max(0, 1 - y / 400));
      }

      const title = heroParallaxTitleRef.current;
      if (title) {
        title.style.transform = `translate3d(0, ${y * 0.6}px, 0)`;
        title.style.opacity = String(Math.max(0, 1 - y / 500));
      }

      const mq = heroParallaxMarqueeRef.current;
      if (mq) mq.style.transform = `translate3d(0, ${y * 0.8}px, 0)`;

      const footerWrap = footerCircleParallaxRef.current;
      if (footerWrap) {
        footerWrap.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          applyParallax();
          ticking = false;
        });
      }
    };

    applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  useLayoutEffect(() => {
    if (loading) return;
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setHeroFullyCovered(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, [loading]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  if (loading) {
    return <LoadingScreen pageReady={pageReady} onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="w-full">
      {/* Fixed Hamburger icon */}
      <div
        className={`fixed right-8 md:right-20 lg:right-40 top-10 z-50 size-[86px] md:size-[75px] cursor-pointer transition-all duration-300 ${
          heroFullyCovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 86 86">
          <rect fill="#502506" height="86" rx="43" width="86" />
          <line stroke="white" strokeWidth="3" x1="16.28" x2="69.72" y1="34.5" y2="34.5" />
          <line stroke="white" strokeWidth="3" x1="16.28" x2="69.72" y1="48.5" y2="48.5" />
        </svg>
      </div>

      {mobileMenuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[55] bg-[#2e1f26]/55 backdrop-blur-sm md:hidden"
            aria-label="Fechar menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="hero-mobile-nav"
            className="fixed left-0 right-0 top-0 z-[60] max-h-[min(100dvh,100%)] overflow-y-auto md:hidden rounded-b-[28px] border-b-2 border-[#c77840] bg-[#2e1f26] px-6 pb-10 pt-[max(1rem,env(safe-area-inset-top,0px)+0.5rem)] shadow-[0_24px_48px_rgba(46,31,38,0.45)]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="mx-auto mb-8 flex w-full max-w-sm items-center justify-between gap-4">
              <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#c77840] text-lg tracking-wide">
                MENU
              </p>
              <MobileMenuHamburgerButton
                open
                aria-label="Fechar menu"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
            <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
              <NavButton
                variant="dark"
                label="WORK"
                className="w-full py-4 [&_p]:text-[18px] [&_p]:md:text-[19px]"
                onClick={() => setMobileMenuOpen(false)}
              />
              <NavButton
                variant="dark"
                label="ABOUT"
                className="w-full py-4 [&_p]:text-[18px] [&_p]:md:text-[19px]"
                onClick={() => setMobileMenuOpen(false)}
              />
              <NavButton
                variant="dark"
                label="CONTACT"
                className="w-full py-4 [&_p]:text-[18px] [&_p]:md:text-[19px]"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        </>
      ) : null}

      {/* Hero Section */}
      <div ref={heroRef} className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-between overflow-hidden">
        {/* Background layers */}
        <div
          ref={heroParallaxBgRef}
          className="absolute inset-0 pointer-events-none will-change-transform [transform:translate3d(0,0,0)]"
        >
          <img alt="" className="absolute object-cover size-full" src={imgFrame5} />
          <div className="absolute bg-[rgba(199,120,64,0.5)] inset-0" />
          <div className="absolute inset-0 overflow-hidden">
            {/* Mobile: retrato com espaço em cima; desktop: arte original */}
            <img
              ref={heroParallaxPersonMobileRef}
              alt=""
              className="absolute bottom-0 left-1/2 h-[min(76vh,620px)] w-auto max-w-[96%] object-contain object-bottom will-change-transform [transform:translate3d(-50%,0,0)] md:hidden"
              src={imgHeroMobile}
            />
            <img
              ref={heroParallaxPersonDesktopRef}
              alt=""
              className="absolute top-[16%] left-[10.6%] hidden h-[84%] max-w-none w-[78.8%] object-contain will-change-transform [transform:translate3d(0,0,0)] md:block"
              src={imgFrame6}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[65%] to-[#2e1f26]" />
        </div>

        {/* Nav */}
        <nav
          ref={heroParallaxNavRef}
          className="relative z-20 w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-10 will-change-transform"
        >
          <Logo />
          <div className="hidden md:flex gap-3 items-center">
            <NavButton label="WORK" />
            <NavButton label="ABOUT" />
            <NavButton label="CONTACT" />
          </div>
          <MobileMenuHamburgerButton
            open={mobileMenuOpen}
            aria-expanded={mobileMenuOpen}
            aria-controls="hero-mobile-nav"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileMenuOpen((o) => !o)}
          />
        </nav>

        {/* Title */}
        <div
          ref={heroParallaxTitleRef}
          className="relative z-10 w-full flex justify-end px-10 md:px-40 will-change-transform"
        >
          <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#2e1f26] text-3xl md:text-[46px] md:leading-tight text-left">
            FREELANCE
            <br />
            DESIGNER UX|UI
          </p>
        </div>

        {/* Bottom marquee: 2 cópias idênticas + translate3d(-50%) = loop contínuo sem reset visível */}
        <div
          ref={heroParallaxMarqueeRef}
          className="relative z-10 w-full overflow-hidden pb-12 md:pb-20 will-change-transform"
        >
          <div className="hero-marquee-track font-['Space_Grotesk',sans-serif] font-bold text-[#2e1f26] text-6xl sm:text-8xl md:text-[131px] lg:text-[175px]">
            <span className="flex shrink-0 gap-20 md:gap-44 pr-20 md:pr-44">
              <span>USER EXPERIENCE</span>
              <span>USER INTERFACE</span>
            </span>
            <span className="flex shrink-0 gap-20 md:gap-44 pr-20 md:pr-44" aria-hidden="true">
              <span>USER EXPERIENCE</span>
              <span>USER INTERFACE</span>
            </span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-[#2e1f26] relative w-full px-8 md:px-20 lg:px-40 pt-32 md:pt-48 pb-10">
        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24 md:mb-40">
          <div className="lg:w-[55%]">
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#c77840] text-xl sm:text-2xl md:text-[29px] md:leading-snug">
              Helping brands turn complexity into clarity through design.
              <br />
              Together we build products that scale, convert and feel effortless.
              <br />
              No noise, just thoughtful UX and sharp UI.
            </p>
          </div>
          <div className="lg:w-[45%] flex items-center">
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#c77840] text-base md:text-[17px] md:leading-snug max-w-[386px] md:max-w-[338px]">
              I'm a UX/UI Designer focused on creating intuitive, high-impact digital experiences.
              <br />
              Blending strategy, design systems and product thinking to deliver real results.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <p className="font-['Space_Grotesk',sans-serif] text-[#c77840] text-base md:text-lg">
            RECENT WORK
          </p>
          <div
            className="bg-[#c77840] flex items-center justify-center px-10 py-16 md:py-20 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
              e.currentTarget.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
            }}
          >
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#2e1f26] text-xl md:text-2xl whitespace-nowrap">
              About Me
            </p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="bg-[#2e1f26] w-full">
        {[
          { name: "GLOBALDEX", desc: ["REBRAND", "UX|UI"] },
          { name: "GATES2B", desc: ["REBRAND", "UX|UI"] },
          { name: "QOFRINHO", desc: ["DESIGN", "&", "DEVELOPMENT"] },
        ].map((project, i) => (
          <div key={project.name}>
            <div
              className="flex items-center justify-between px-8 md:px-20 lg:px-40 py-12 md:py-20 cursor-pointer hover:scale-[1.02] transition-all duration-500 ease-out opacity-0 translate-y-10"
              ref={(el) => {
                if (!el || el.dataset.observed) return;
                el.dataset.observed = "true";
                const observer = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) {
                      el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
                      el.style.opacity = "1";
                      el.style.transform = "translateY(0)";
                      observer.disconnect();
                    }
                  },
                  { threshold: 0.15 }
                );
                observer.observe(el);
              }}
            >
              <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#c77840] text-4xl sm:text-6xl md:text-8xl lg:text-[88px]">
                {project.name}
              </p>
              <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#c77840] text-sm md:text-xl lg:text-[28px] text-center whitespace-nowrap">
                {project.desc.map((line, j) => (
                  <span key={j}>
                    {j > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className="mx-8 md:mx-20 lg:mx-40 h-px bg-[#c77840]" />
          </div>
        ))}

        <div className="flex items-center justify-center py-20 md:py-32">
          <div className="border-2 border-[#c77840] rounded-full px-10 py-5 cursor-pointer hover:bg-[#c77840] hover:text-[#2e1f26] transition-colors group">
            <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#c77840] text-lg md:text-[19px] whitespace-nowrap group-hover:text-[#2e1f26]">
              MORE WORK (11)
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Carousel Section */}
      <section className="bg-[#2e1f26] w-full py-16 md:py-24 flex flex-col gap-[62px] md:gap-[54px] overflow-hidden">
        {/* Top row - left to right */}
        <div className="group overflow-hidden">
          <div className="flex gap-[87px] md:gap-[76px] animate-carousel-ltr hover:[animation-play-state:paused]">
            {[...Array(4)].flatMap((_, setIdx) =>
              galleryImages.map((src, i) => (
                <div
                  key={`top-${setIdx}-${i}`}
                  className="h-[200px] md:h-[313px] w-[300px] md:w-[463px] shrink-0 overflow-hidden rounded-sm"
                >
                  <img
                    alt=""
                    className="object-cover size-full transition-transform duration-500 hover:scale-110 cursor-pointer"
                    src={src}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom row - right to left */}
        <div className="group overflow-hidden">
          <div className="flex gap-[87px] md:gap-[76px] animate-carousel-rtl hover:[animation-play-state:paused]">
            {[...Array(4)].flatMap((_, setIdx) =>
              galleryImages.map((src, i) => (
                <div
                  key={`bottom-${setIdx}-${i}`}
                  className="h-[200px] md:h-[313px] w-[300px] md:w-[463px] shrink-0 overflow-hidden rounded-sm"
                >
                  <img
                    alt=""
                    className="object-cover size-full transition-transform duration-500 hover:scale-110 cursor-pointer"
                    src={src}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#c77840] w-full pt-20 md:pt-[105px] pb-8 md:pb-10">
        <div className="px-8 md:px-20 lg:px-40">
          {/* Lets Work Together */}
          <h2 className="font-['Space_Grotesk',sans-serif] font-bold text-[#2e1f26] text-5xl sm:text-7xl md:text-[88px] md:leading-[1.05]">
            Lets Work<br />Together
          </h2>

          {/* Line + Get in Touch */}
          <div className="flex items-center mt-[-20px] md:mt-[-30px] relative z-10">
            <div className="flex-1 h-[2px] bg-[#2e1f26]" />
            <div
              ref={footerCircleParallaxRef}
              className="shrink-0 will-change-transform [transform:translate3d(0,0,0)]"
            >
              <div
                className="bg-[#2e1f26] flex items-center justify-center rounded-full size-[118px] sm:size-[150px] md:size-[230px] cursor-pointer hover:scale-110 transition-transform duration-300 [transform:translate3d(0,0,0)]"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
                  const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
                  e.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate3d(0, 0, 0)";
                }}
              >
                <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#c77840] text-center text-xs leading-tight px-2 sm:text-sm md:text-[26px] md:leading-none md:px-0 md:whitespace-nowrap">
                  <span className="block md:hidden">
                    Get in
                    <br />
                    Touch
                  </span>
                  <span className="hidden md:inline">Get in Touch</span>
                </p>
              </div>
            </div>
            <div className="w-[60px] md:w-[80px] h-[2px] bg-[#2e1f26] shrink-0" />
          </div>

          {/* Contact pills — no mobile, margem positiva para não ficar por baixo do círculo */}
          <div className="flex flex-wrap gap-3 mt-10 md:mt-[-30px]">
            <a
              href="mailto:designby.luiz@outlook.com"
              className="flex items-center justify-center px-6 md:px-10 py-4 md:py-5 rounded-full border-2 border-[#2e1f26] cursor-pointer hover:bg-[#2e1f26] hover:text-[#c77840] transition-colors group no-underline"
              aria-label="Enviar email para designby.luiz@outlook.com"
            >
              <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#2e1f26] text-base md:text-[19px] whitespace-nowrap group-hover:text-[#c77840]">
                @designby.luiz@outlook.com
              </p>
            </a>
            <a
              href="https://wa.me/5541999890036"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 md:px-10 py-4 md:py-5 rounded-full border-2 border-[#2e1f26] cursor-pointer hover:bg-[#2e1f26] hover:text-[#c77840] transition-colors group no-underline"
              aria-label="Conversar no WhatsApp"
            >
              <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#2e1f26] text-base md:text-[19px] whitespace-nowrap group-hover:text-[#c77840]">
                +55 41 9 9989-0036
              </p>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-8 md:px-10 mt-20 md:mt-[110px]">
          <p className="font-['Space_Grotesk',sans-serif] font-bold text-[#2e1f26] text-3xl md:text-[39px]">
            2026
          </p>
          <div className="flex gap-7 items-center">
            <a
              href="https://www.behance.net/luizeddossan4"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2e1f26] flex items-center justify-center p-5 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Behance — Luiz Eduardo Dos Santos"
            >
              <svg className="block size-10" fill="none" viewBox="0 0 40 40" aria-hidden>
                <path d={svgFooter.p2c927580} fill="#C77840" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/luizeduardoeugenio/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2e1f26] flex items-center justify-center p-5 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="LinkedIn — Luiz Eduardo Eugenio"
            >
              <svg className="block size-10" fill="none" viewBox="0 0 40 40" aria-hidden>
                <path d={svgFooter.p1e28a80} fill="#C77840" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}