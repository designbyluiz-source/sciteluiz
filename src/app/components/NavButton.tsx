import { Link } from "react-router";

/** Preenchimento em “wipe” da esquerda (hover) — respeita prefers-reduced-motion via CSS global */
export function NavButton({
  label,
  onClick,
  href,
  to,
  className = "",
  variant = "hero",
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  /** Navegação client-side (React Router) */
  to?: string;
  className?: string;
  variant?: "hero" | "dark";
}) {
  const border =
    variant === "dark"
      ? "border-2 border-[#c77840] bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c77840]"
      : "border-2 border-[#2e1f26] bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e1f26]";
  const fillBg = variant === "dark" ? "bg-[#c77840]" : "bg-[#2e1f26]";
  const text =
    variant === "dark"
      ? "text-[#c77840] transition-colors duration-500 ease-out group-hover:text-[#2e1f26]"
      : "text-[#2e1f26] transition-colors duration-500 ease-out group-hover:text-white";
  const baseClass = `nav-btn-fill-host group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 py-2 md:px-10 md:py-2.5 ${border} ${className}`;

  const labelEl = (
    <span
      className={`relative z-10 font-['Space_Grotesk',sans-serif] text-sm font-bold whitespace-nowrap md:text-[19px] ${text}`}
    >
      {label}
    </span>
  );

  const fillEl = (
    <span
      aria-hidden
      className={`nav-btn-fill-layer pointer-events-none absolute inset-0 z-0 rounded-full ${fillBg} origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-x-100`}
    />
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={`${baseClass} no-underline`}>
        {fillEl}
        {labelEl}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`${baseClass} no-underline`}>
        {fillEl}
        {labelEl}
      </a>
    );
  }

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
      className={baseClass}
    >
      {fillEl}
      {labelEl}
    </div>
  );
}
