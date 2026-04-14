import { useLanguage } from "../language";

type LanguageRailProps = {
  isDark: boolean;
};

export function LanguageRail({ isDark }: LanguageRailProps) {
  const { locale, cycleLocale, t } = useLanguage();
  const label = isDark ? "text-white" : "text-black";
  const code = locale === "pt-BR" ? "PT" : locale === "en" ? "EN" : "ES";

  return (
    <button
      type="button"
      onClick={cycleLocale}
      className={`flex flex-col items-center gap-[clamp(8px,1.2vmin,12px)] border-0 bg-transparent p-0 ${label} cursor-pointer outline-offset-4 hover:opacity-90 active:scale-[0.98]`}
      aria-label={t("langAria")}
    >
      <svg
        className="size-[clamp(12px,1.8vmin,15px)] shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </svg>
      <span
        className={`origin-center rotate-[-90deg] select-none whitespace-nowrap text-[clamp(11px,1.5vmin,16px)] font-normal uppercase tracking-wide ${label}`}
      >
        {code}
      </span>
    </button>
  );
}
