import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { getCaseStudy } from "../data/case-studies";
import { Logo } from "../components/Logo";
import { NavButton } from "../components/NavButton";

function MetaBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#2e1f26]/12 pt-5 md:gap-4 md:pt-6">
      <p className="font-['Space_Grotesk',sans-serif] text-[10px] font-bold uppercase tracking-[0.22em] text-[#2e1f26]/45 md:text-[11px]">
        {label}
      </p>
      <div className="font-['Space_Grotesk',sans-serif] text-[15px] font-bold leading-snug text-[#2e1f26] md:text-[17px]">
        {children}
      </div>
    </div>
  );
}

function LocalTime() {
  const [s, setS] = useState("");
  useEffect(() => {
    const tick = () => {
      setS(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{s}</span>;
}

export default function ProjectCaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudy(slug);
  const next = study ? getCaseStudy(study.nextSlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f5f2ee] text-[#2e1f26]">
      <header className="sticky top-0 z-40 border-b border-[#2e1f26]/8 bg-[#f5f2ee]/90 px-6 py-5 backdrop-blur-md md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6">
          <Link to="/" aria-label="Início" className="no-underline">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-2 md:flex md:gap-3" aria-label="Principal">
            <span className="relative inline-flex">
              <NavButton label="WORK" to="/#work" />
              <span
                className="pointer-events-none absolute left-1/2 top-full mt-1 h-1 w-1 -translate-x-1/2 rounded-full bg-[#2e1f26]"
                aria-hidden
              />
            </span>
            <NavButton label="ABOUT" to="/#about" />
            <NavButton label="CONTACT" to="/#contact" />
          </nav>
          <div className="flex md:hidden">
            <NavButton label="HOME" to="/" className="!px-4 !py-2 [&_span]:text-xs" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 pb-24 pt-10 md:px-10 md:pt-14 lg:px-16">
        <h1 className="font-['Space_Grotesk',sans-serif] text-[13vw] font-bold leading-[0.92] tracking-tight text-[#2e1f26] sm:text-[11vw] md:text-[clamp(3.5rem,9vw,7.5rem)] lg:text-[clamp(4rem,7.5vw,8rem)]">
          {study.title}
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-12 lg:gap-16">
          <MetaBlock label="Role / services">{study.role}</MetaBlock>
          <MetaBlock label="Credits">{study.credits}</MetaBlock>
          <MetaBlock label="Location & year">
            {study.locationLine}
            <span className="text-[#2e1f26]/50"> · </span>
            {study.year}
          </MetaBlock>
        </div>

        <figure className="relative mx-auto mt-16 max-w-[1400px] md:mt-24">
          <div className="relative overflow-hidden rounded-sm bg-[#e8e4df] shadow-[0_24px_60px_rgba(46,31,38,0.08)]">
            <img
              src={study.heroImage}
              alt={study.heroAlt}
              className="aspect-[16/10] w-full object-cover md:aspect-[16/9] md:max-h-[min(88vh,920px)] md:min-h-[52vh]"
            />
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-4 top-4 flex size-[100px] flex-col items-center justify-center rounded-full bg-[#2563eb] px-2 text-center font-['Space_Grotesk',sans-serif] text-[11px] font-bold leading-tight text-white shadow-[0_12px_32px_rgba(37,99,235,0.4)] transition-transform duration-300 hover:scale-105 md:right-6 md:top-6 md:size-[118px] md:text-xs"
            >
              <span>
                Live site <span aria-hidden>↗</span>
              </span>
            </a>
          </div>
        </figure>

        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-16 lg:gap-24">
          {study.gallery.map((item, i) =>
            item.fullBleed ? (
              <div
                key={i}
                className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
              >
                <div className="overflow-hidden bg-[#2e1f26]/5">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`w-full object-cover ${
                      item.tall
                        ? "min-h-[65vh] md:min-h-[90vh]"
                        : "max-h-[80vh] min-h-[40vh] md:min-h-[55vh]"
                    }`}
                  />
                </div>
              </div>
            ) : (
              <figure
                key={i}
                className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-sm bg-[#e8e4df] shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover md:max-h-[720px]"
                />
              </figure>
            ),
          )}
        </div>
      </main>

      <footer className="bg-[#2e1f26] text-[#f5f2ee]">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28 lg:px-16">
          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex flex-col items-center text-center no-underline"
            >
              <p className="font-['Space_Grotesk',sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[#c77840]/90">
                Next case
              </p>
              <span className="mt-6 font-['Space_Grotesk',sans-serif] text-[clamp(2.5rem,12vw,6.5rem)] font-bold leading-none tracking-tight text-[#f5f2ee] transition-colors group-hover:text-[#c77840]">
                {next.title}
              </span>
              <div className="mt-10 w-full max-w-md overflow-hidden rounded-sm ring-1 ring-[#c77840]/25">
                <img
                  src={next.heroImage}
                  alt=""
                  className="aspect-video w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            </Link>
          ) : null}

          <div className="mx-auto mt-10 h-px w-full max-w-xs bg-[#c77840]/35" />

          <div className="mt-10 flex justify-center">
            <Link
              to="/#work"
              className="nav-btn-fill-host group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#f5f2ee]/35 bg-transparent px-10 py-4 no-underline transition-colors"
            >
              <span
                aria-hidden
                className="nav-btn-fill-layer pointer-events-none absolute inset-0 z-0 origin-left scale-x-0 rounded-full bg-[#f5f2ee] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-x-100"
              />
              <span className="relative z-10 font-['Space_Grotesk',sans-serif] text-base font-bold text-[#f5f2ee] transition-colors duration-500 group-hover:text-[#2e1f26]">
                All work
                <sup className="ml-0.5 text-[0.55em]">11</sup>
              </span>
            </Link>
          </div>
        </div>

        <div className="border-t border-[#c77840]/15">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
            <div>
              <p className="font-['Space_Grotesk',sans-serif] text-[9px] font-bold uppercase tracking-[0.2em] text-[#c77840]/55">
                Version
              </p>
              <p className="mt-1 font-['Space_Grotesk',sans-serif] text-sm font-bold text-[#f5f2ee]/90">
                2026 © Edition
              </p>
            </div>
            <div className="hidden md:block">
              <p className="font-['Space_Grotesk',sans-serif] text-[9px] font-bold uppercase tracking-[0.2em] text-[#c77840]/55">
                Local time
              </p>
              <p className="mt-1 font-['Space_Grotesk',sans-serif] text-sm font-bold text-[#f5f2ee]/90">
                <LocalTime />
              </p>
            </div>
            <div>
              <p className="mb-2 font-['Space_Grotesk',sans-serif] text-[9px] font-bold uppercase tracking-[0.2em] text-[#c77840]/55 md:text-right">
                Socials
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
                <a
                  href="https://www.behance.net/luizeddossan4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Space_Grotesk',sans-serif] text-sm font-bold text-[#f5f2ee]/85 no-underline transition-colors hover:text-[#c77840]"
                >
                  Behance
                </a>
                <a
                  href="https://www.linkedin.com/in/luizeduardoeugenio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Space_Grotesk',sans-serif] text-sm font-bold text-[#f5f2ee]/85 no-underline transition-colors hover:text-[#c77840]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
