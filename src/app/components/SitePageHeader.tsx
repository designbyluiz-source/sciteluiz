import { Link } from "react-router";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";

export type SitePageHeaderActive = "work" | "about" | null;

type SitePageHeaderProps = {
  /** Item com ponto indicador (páginas internas) */
  active?: SitePageHeaderActive;
};

function NavDot() {
  return (
    <span
      className="pointer-events-none absolute left-1/2 top-full mt-1 h-1 w-1 -translate-x-1/2 rounded-full bg-[#2e1f26]"
      aria-hidden
    />
  );
}

export function SitePageHeader({ active = null }: SitePageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#2e1f26]/8 bg-[#f5f2ee]/90 px-6 py-5 backdrop-blur-md md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6">
        <Link to="/" aria-label="Início" className="no-underline">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-2 md:flex md:gap-3" aria-label="Principal">
          <span className="relative inline-flex">
            <NavButton label="WORK" to="/#work" />
            {active === "work" ? <NavDot /> : null}
          </span>
          <span className="relative inline-flex">
            <NavButton label="ABOUT" to="/about" />
            {active === "about" ? <NavDot /> : null}
          </span>
          <NavButton label="CONTACT" to="/#contact" />
        </nav>
        <div className="flex md:hidden">
          <NavButton label="HOME" to="/" className="!px-4 !py-2 [&_span]:text-xs" />
        </div>
      </div>
    </header>
  );
}
