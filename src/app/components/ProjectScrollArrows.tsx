import { type RefObject } from "react";
import { useLanguage } from "../language";

type Props = {
  scrollTargetRef: RefObject<HTMLElement | null>;
  className?: string;
};

/** Stacked chevrons from `aroooww.svg`; hints that the project copy scrolls. */
export function ProjectScrollArrows({ scrollTargetRef, className = "" }: Props) {
  const { t } = useLanguage();

  const scrollCopy = () => {
    const el = scrollTargetRef.current;
    if (!el) return;
    const delta = Math.min(200, Math.max(96, el.clientHeight * 0.32));
    el.scrollBy({ top: delta, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollCopy}
      className={`pointer-events-auto flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 text-black outline-offset-4 hover:opacity-90 active:opacity-80 ${className}`}
      aria-label={t("ariaProjectScrollHint")}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="project-scroll-hint-arrow block leading-none first:mt-0 [&:not(:first-child)]:-mt-[0.18em]"
          style={{ animationDelay: `${i * 0.14}s` }}
          aria-hidden
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[clamp(13px,2vmin,20px)] w-[clamp(13px,2vmin,20px)] shrink-0"
          >
            <path d="M20.6621 9L12.5 17.5508L4.33789 9H20.6621ZM23 8H2L12.5 19L23 8Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </button>
  );
}
