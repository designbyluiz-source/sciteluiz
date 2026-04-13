import { useEffect, useRef, useState } from "react";

export type WorkProject = {
  slug: string;
  name: string;
  desc: string[];
  /** Screenshots cycled in the hover preview */
  images: string[];
  /** Ex.: `/projects/globaldex` — páginas dedicadas depois */
  viewHref: string;
};

type WorkProjectSectionProps = {
  projects: WorkProject[];
};

const IMAGE_INTERVAL_MS = 3200;
const LERP = 0.18;

function useFinePointerHover() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return ok;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export function WorkProjectSection({ projects }: WorkProjectSectionProps) {
  const canHoverPreview = useFinePointerHover();
  const reducedMotion = useReducedMotion();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const targetMouse = useRef({ x: 0, y: 0 });
  const floaterPos = useRef({ x: 0, y: 0 });
  const floaterRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const activeProject = hoveredSlug ? projects.find((p) => p.slug === hoveredSlug) : undefined;

  useEffect(() => {
    setImageIndex(0);
  }, [hoveredSlug]);

  useEffect(() => {
    if (!activeProject || !canHoverPreview || activeProject.images.length <= 1 || reducedMotion) return;
    const t = window.setInterval(() => {
      setImageIndex((i) => (i + 1) % activeProject.images.length);
    }, IMAGE_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [activeProject, canHoverPreview, reducedMotion]);

  useEffect(() => {
    if (!hoveredSlug || !canHoverPreview) return;

    const tick = () => {
      const pos = floaterPos.current;
      const tgt = targetMouse.current;
      if (reducedMotion) {
        pos.x = tgt.x;
        pos.y = tgt.y;
      } else {
        pos.x += (tgt.x - pos.x) * LERP;
        pos.y += (tgt.y - pos.y) * LERP;
      }
      const el = floaterRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const w = r.width || 300;
        const h = r.height || 220;
        const pad = 10;
        // Centro do cartão = posição suavizada do cursor (top-left = centro − metade do tamanho)
        let nx = pos.x - w / 2;
        let ny = pos.y - h / 2;
        if (w > 0 && h > 0) {
          nx = Math.min(Math.max(pad, nx), window.innerWidth - w - pad);
          ny = Math.min(Math.max(pad, ny), window.innerHeight - h - pad);
        }
        el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hoveredSlug, canHoverPreview, reducedMotion]);

  const handleRowEnter = (slug: string) => (e: React.MouseEvent) => {
    const p = { x: e.clientX, y: e.clientY };
    targetMouse.current = p;
    floaterPos.current = { ...p };
    setHoveredSlug(slug);
  };

  const handleRowMove = (e: React.MouseEvent) => {
    targetMouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <>
      {activeProject && canHoverPreview ? (
        <div
          ref={floaterRef}
          className="pointer-events-none fixed left-0 top-0 z-[100] w-[min(78vw,300px)] md:w-[320px]"
          style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
          aria-hidden
        >
          <div className="rounded-md bg-[#2b2b2b] p-3 shadow-[0_24px_48px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#1a1a1a]">
              <img
                key={`${activeProject.slug}-${imageIndex}`}
                alt=""
                src={activeProject.images[imageIndex % activeProject.images.length]}
                className="size-full object-cover transition-opacity duration-300"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex size-[52px] items-center justify-center rounded-full bg-[#2563eb] font-['Space_Grotesk',sans-serif] text-[13px] font-bold tracking-wide text-white shadow-[0_8px_24px_rgba(37,99,235,0.45)]">
                  View
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section id="work" className="relative w-full scroll-mt-6 bg-[#2e1f26]">
        {projects.map((project) => (
          <div key={project.slug}>
            <a
              href={project.viewHref}
              onMouseEnter={handleRowEnter(project.slug)}
              onMouseMove={handleRowMove}
              onMouseLeave={() => setHoveredSlug(null)}
              className="block translate-y-10 cursor-pointer px-8 py-12 no-underline opacity-0 md:px-20 md:py-20 lg:px-40"
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
                  { threshold: 0.15 },
                );
                observer.observe(el);
              }}
              aria-label={`${project.name} — ver projeto`}
            >
              <div
                className={`flex w-full items-center justify-between transition-opacity duration-200 ease-out ${
                  hoveredSlug === project.slug ? "opacity-[0.55]" : "opacity-100"
                }`}
              >
                <p className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#c77840] sm:text-6xl md:text-8xl lg:text-[88px]">
                  {project.name}
                </p>
                <p className="whitespace-nowrap text-center font-['Space_Grotesk',sans-serif] text-sm font-bold text-[#c77840]/80 md:text-xl lg:text-[28px]">
                  {project.desc.map((line, j) => (
                    <span key={j}>
                      {j > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </a>
            <div className="mx-8 h-px bg-[#c77840]/90 md:mx-20 lg:mx-40" />
          </div>
        ))}

        <div className="flex items-center justify-center py-20 md:py-32">
          <div className="cursor-pointer rounded-full border-2 border-[#c77840] px-10 py-5 transition-colors group hover:bg-[#c77840] hover:text-[#2e1f26]">
            <p className="whitespace-nowrap font-['Space_Grotesk',sans-serif] text-lg font-bold text-[#c77840] md:text-[19px] group-hover:text-[#2e1f26]">
              MORE WORK (11)
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
