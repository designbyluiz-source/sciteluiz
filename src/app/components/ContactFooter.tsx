import { useLayoutEffect, useRef } from "react";
import svgFooter from "../../imports/svg-q9rxfrhwj9";

export function ContactFooter() {
  const footerCircleParallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const applyParallax = () => {
      const footerWrap = footerCircleParallaxRef.current;
      if (footerWrap) {
        footerWrap.style.transform = `translate3d(0, ${window.scrollY * 0.05}px, 0)`;
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
  }, []);

  return (
    <footer id="contact" className="w-full overflow-x-hidden scroll-mt-6 bg-[#c77840] pb-8 pt-14 sm:pt-20 md:pb-10 md:pt-[105px]">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-20 lg:px-40">
        <h2 className="font-['Space_Grotesk',sans-serif] text-[clamp(2.25rem,10vw,3.5rem)] font-bold leading-[1.02] tracking-tight text-[#2e1f26] sm:text-7xl md:text-[88px] md:leading-[1.05]">
          Lets Work<br />
          Together
        </h2>

        <div
          ref={footerCircleParallaxRef}
          className="relative z-10 mt-[-12px] flex min-w-0 items-center gap-1 will-change-transform [transform:translate3d(0,0,0)] sm:mt-[-16px] md:mt-[-30px] md:gap-0"
        >
          <div className="h-[2px] min-w-[12px] flex-1 self-center bg-[#2e1f26]" />
          <div className="shrink-0 self-center px-0.5 sm:px-1">
            <div
              className="flex size-[100px] cursor-pointer items-center justify-center rounded-full bg-[#2e1f26] transition-transform duration-300 hover:scale-110 min-[400px]:size-[110px] sm:size-[150px] md:size-[230px] [transform:translate3d(0,0,0)]"
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
              <p className="px-1.5 text-center font-['Space_Grotesk',sans-serif] text-[11px] font-bold leading-tight text-[#c77840] min-[400px]:text-xs sm:text-sm md:px-0 md:text-[26px] md:leading-none md:whitespace-nowrap">
                <span className="block md:hidden">
                  Get in
                  <br />
                  Touch
                </span>
                <span className="hidden md:inline">Get in Touch</span>
              </p>
            </div>
          </div>
          <div className="h-[2px] w-10 shrink-0 self-center bg-[#2e1f26] min-[400px]:w-12 sm:w-[60px] md:w-[80px]" />
        </div>

        <div className="mt-12 flex w-full min-w-0 flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap md:mt-[-30px]">
          <a
            href="mailto:designby.luiz@outlook.com"
            className="group flex w-full min-w-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#2e1f26] px-4 py-3.5 no-underline transition-colors hover:bg-[#2e1f26] hover:text-[#c77840] sm:w-auto sm:px-6 sm:py-4 md:px-10 md:py-5"
            aria-label="Enviar email para designby.luiz@outlook.com"
          >
            <p className="w-full min-w-0 text-center font-['Space_Grotesk',sans-serif] text-[13px] font-bold leading-snug text-[#2e1f26] [overflow-wrap:anywhere] group-hover:text-[#c77840] sm:w-auto sm:text-base sm:leading-normal md:text-[19px] md:whitespace-nowrap">
              @designby.luiz@outlook.com
            </p>
          </a>
          <a
            href="https://wa.me/5541999890036"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full min-w-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#2e1f26] px-4 py-3.5 no-underline transition-colors hover:bg-[#2e1f26] hover:text-[#c77840] sm:w-auto sm:px-6 sm:py-4 md:px-10 md:py-5"
            aria-label="Conversar no WhatsApp"
          >
            <p className="text-center font-['Space_Grotesk',sans-serif] text-sm font-bold text-[#2e1f26] group-hover:text-[#c77840] sm:text-base md:text-[19px] md:whitespace-nowrap">
              +55 41 9 9989-0036
            </p>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1600px] items-center justify-between gap-4 px-5 sm:mt-20 sm:px-8 md:mt-[110px] md:px-20 lg:px-40">
        <p className="shrink-0 font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#2e1f26] sm:text-3xl md:text-[39px]">
          2026
        </p>
        <div className="flex shrink-0 items-center gap-4 sm:gap-7">
          <a
            href="https://www.behance.net/luizeddossan4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-[52px] cursor-pointer items-center justify-center rounded-full bg-[#2e1f26] transition-opacity hover:opacity-80 sm:size-auto sm:p-5"
            aria-label="Behance — Luiz Eduardo Dos Santos"
          >
            <svg className="block size-8 sm:size-10" fill="none" viewBox="0 0 40 40" aria-hidden>
              <path d={svgFooter.p2c927580} fill="#C77840" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/luizeduardoeugenio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-[52px] cursor-pointer items-center justify-center rounded-full bg-[#2e1f26] transition-opacity hover:opacity-80 sm:size-auto sm:p-5"
            aria-label="LinkedIn — Luiz Eduardo Eugenio"
          >
            <svg className="block size-8 sm:size-10" fill="none" viewBox="0 0 40 40" aria-hidden>
              <path d={svgFooter.p1e28a80} fill="#C77840" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
