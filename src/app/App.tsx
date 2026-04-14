import { useState, type CSSProperties, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { LanguageRail } from "./components/LanguageRail";
import { MetaballShaderBackground } from "./components/MetaballShaderBackground";
import { useLanguage, type MessageKey } from "./language";

const projectDefs: readonly { title: string; subKey: MessageKey; href?: string }[] = [
  { title: "GLOBALDEX", subKey: "projectCrypto", href: "/projects/globaldex" },
  { title: "GATES2B", subKey: "projectCrypto", href: "/projects/gates2b" },
  { title: "QUANTUM", subKey: "projectWeb", href: "/projects/quantum" },
  { title: "SALLES FERREIRA", subKey: "projectWeb", href: "/projects/salles-ferreira" },
  { title: "QOFRINHO", subKey: "projectBank", href: "/projects/qofrinho" },
  { title: "MESA", subKey: "projectLogo" },
  { title: "FOXPLAYER", subKey: "projectStreaming" },
  { title: "QUICKWAY", subKey: "projectGateway" },
];

/** Fluid sizing — Figma + vmin; shell pad drives symmetric rail (absolute, out of flow) */
const SHELL_PAD = "clamp(10px, 3vmin, 30px)";
const framePad = "p-[clamp(10px,3vmin,30px)]";
const nameSize = "text-[clamp(1.35rem,5.2vmin,3.375rem)]";
const roleSize = "text-[clamp(0.85rem,2.05vmin,1.375rem)]";
const navSize = "text-[clamp(0.9rem,1.72vmin,1.08rem)]";
const navGap = "gap-[clamp(6px,1.15vmin,11px)]";
const brandGap = "gap-[clamp(10px,2.2vmin,24px)]";
const projectTitle = "text-[clamp(1.65rem,8.5vmin,5.5rem)] leading-[1.02]";
const projectSub = "text-[clamp(0.9rem,3vmin,2rem)] leading-tight";
const projectStackGap = "gap-[clamp(32px,5vmin,96px)]";
const introSize = "text-[clamp(1rem,2.05vmin,1.375rem)]";
const projectNodeIds = ["10:106", "10:109", "10:112", "10:162", "10:158", "10:166"] as const;

type ColorMode = "light" | "dark";

function ThemeModeRail({
  mode,
  onMode,
  isDark,
}: {
  mode: ColorMode;
  onMode: (m: ColorMode) => void;
  isDark: boolean;
}) {
  const { t } = useLanguage();
  const label = isDark ? "text-white" : "text-black";
  const boxOn = isDark ? "border-white bg-white" : "border-black bg-black";
  const boxOff = isDark ? "border-white bg-transparent" : "border-black bg-white";
  const font = "font-['Darker_Grotesque',sans-serif]";

  const optionGap = "gap-[clamp(10px,1.6vmin,14px)]";

  return (
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
            name="color-mode"
            value="dark"
            checked={mode === "dark"}
            onChange={() => onMode("dark")}
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
            name="color-mode"
            value="light"
            checked={mode === "light"}
            onChange={() => onMode("light")}
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
  );
}

function HomeIntroColumn() {
  const { t } = useLanguage();
  const keys: MessageKey[] = ["home1", "home2", "home3"];
  return (
    <div
      className="hide-scrollbar flex min-h-0 w-full flex-1 flex-col items-end justify-end overflow-y-auto overscroll-contain text-black sm:max-w-[min(374px,100%)] sm:shrink-0"
      data-node-id="10:105"
    >
      <div
        className={`w-full text-right font-['Darker_Grotesque',sans-serif] font-normal leading-normal ${introSize}`}
        data-node-id="15:190"
      >
        {keys.map((key) => (
          <p key={key} className="mb-[0.85em] last:mb-0">
            {t(key)}
          </p>
        ))}
      </div>
      <Link
        to="/sobre-mim"
        className={`mt-[0.85em] font-['Darker_Grotesque',sans-serif] font-bold leading-normal no-underline hover:opacity-70 ${introSize}`}
        data-node-id="17:373"
      >
        {t("homeMore")}
      </Link>
    </div>
  );
}

function ProjectsColumn() {
  const { t } = useLanguage();
  return (
    <div
      className={`hide-scrollbar flex min-h-0 min-w-0 flex-1 flex-col items-end ${projectStackGap} overflow-y-auto overflow-x-hidden overscroll-y-contain text-right font-['Darker_Grotesque',sans-serif] font-normal leading-normal`}
      data-node-id="10:105"
      role="region"
      aria-label={t("ariaProjects")}
    >
      {projectDefs.map((p, i) => (
        <div
          key={`${p.title}-${i}`}
          className="flex w-full min-w-0 max-w-full shrink-0 flex-col items-end [&_p]:max-w-full [&_p]:break-words"
          data-node-id={projectNodeIds[i]}
        >
          {p.href ? (
            <Link to={p.href} className={`relative text-right no-underline text-inherit hover:opacity-80 ${projectTitle}`}>
              {p.title}
            </Link>
          ) : (
            <p className={`relative text-right ${projectTitle}`}>{p.title}</p>
          )}
          <p className={`relative mt-[0.12em] text-right ${projectSub}`}>{t(p.subKey)}</p>
        </div>
      ))}
    </div>
  );
}

const contactLinks: { labelKey: MessageKey; url: string; nodeTitle: string; nodeUrl: string }[] = [
  {
    labelKey: "contactBehance",
    url: "https://www.behance.net/luizeddossan4",
    nodeTitle: "16:241",
    nodeUrl: "16:242",
  },
  {
    labelKey: "contactLinkedin",
    url: "https://www.linkedin.com/in/luizeduardoeugenio/",
    nodeTitle: "16:244",
    nodeUrl: "16:245",
  },
  {
    labelKey: "contactWhatsapp",
    url: "https://wa.me/5541999890046",
    nodeTitle: "16:263",
    nodeUrl: "16:264",
  },
];

const contactBlockIds = ["16:240", "16:243", "16:262"] as const;

function ContactColumn() {
  const { t } = useLanguage();
  return (
    <div
      className={`flex h-full min-h-0 min-w-0 flex-1 flex-col items-end justify-end gap-[clamp(20px,3vmin,54px)] text-right font-['Darker_Grotesque',sans-serif] font-normal leading-normal text-black`}
      data-node-id="16:233"
      role="region"
      aria-label={t("ariaContact")}
    >
      {contactLinks.map((item, i) => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-full flex-col items-end no-underline text-inherit outline-offset-4 hover:opacity-90"
          data-node-id={contactBlockIds[i]}
        >
          <p className={`relative text-right ${projectTitle}`} data-node-id={item.nodeTitle}>
            {t(item.labelKey)}
          </p>
          <p
            className={`relative mt-[0.12em] max-w-full whitespace-nowrap text-right ${projectSub} hide-scrollbar overflow-x-auto`}
            data-node-id={item.nodeUrl}
          >
            {item.url}
          </p>
        </a>
      ))}
    </div>
  );
}

/** No font-weight — selected row uses parent `ul` bold + disc; inactive adds `font-normal` */
const navLinkBase =
  "font-['Darker_Grotesque',sans-serif] text-inherit no-underline hover:opacity-80";
const navInactive = `${navLinkBase} font-normal`;

/** Selected nav — same markup/styles as Figma Home row (bold + disc + Darker Grotesque + nav size) */
function NavSelectedItem({ "data-node-id": dataNodeId, children }: { "data-node-id"?: string; children: ReactNode }) {
  return (
    <ul
      className={`block w-full font-['Darker_Grotesque',sans-serif] font-bold leading-none ${navSize}`}
      data-node-id={dataNodeId}
    >
      <li className="ms-6 list-disc">
        <span className="leading-normal" aria-current="page">
          {children}
        </span>
      </li>
    </ul>
  );
}

export default function App() {
  const [mode, setMode] = useState<ColorMode>("light");
  const isDark = mode === "dark";
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isProjects = pathname === "/projects";
  const isContact = pathname === "/contact";

  return (
    <div
      className={`relative box-border flex h-dvh max-h-dvh w-full max-w-[100vw] flex-col items-stretch overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
      data-name="Desktop - 4"
      data-node-id="10:92"
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
        <ThemeModeRail mode={mode} onMode={setMode} isDark={isDark} />
      </div>

      <div className={`relative z-10 flex min-h-0 min-w-0 flex-1 flex-col ${isDark ? "invert" : ""}`}>
          <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden>
            <MetaballShaderBackground className="object-cover" />
          </div>

          <div
            className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-black/10"
            data-node-id="10:93"
          >
            <div
              className={`relative flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row items-stretch justify-between gap-[clamp(8px,2vmin,28px)] overflow-hidden border border-black/50 text-black ${framePad}`}
              data-node-id="10:94"
            >
              <div
                className={`flex min-h-0 min-w-0 w-full sm:w-[min(100%,42vw)] sm:max-w-[min(434px,46%)] shrink-0 flex-col items-start ${brandGap} overflow-hidden`}
                data-node-id="10:95"
              >
                <div className="flex w-full min-w-0 flex-col items-start leading-normal" data-node-id="10:96">
                  <p
                    className={`w-full min-w-0 font-['Darker_Grotesque',sans-serif] font-light leading-none tracking-[-0.04em] ${nameSize}`}
                    data-node-id="10:97"
                  >
                    Luiz Eduardo
                  </p>
                  <p
                    className={`mt-[0.15em] w-full min-w-0 font-['Darker_Grotesque',sans-serif] font-normal leading-snug ${roleSize}`}
                    data-node-id="10:98"
                  >
                    {t("role")}
                  </p>
                </div>
                <nav
                  className={`flex w-max max-w-full min-w-0 flex-col items-stretch ${navGap} ${navSize} leading-normal text-black`}
                  data-node-id="10:99"
                  aria-label={t("ariaNav")}
                >
                  {isHome ? (
                    <NavSelectedItem data-node-id="10:100">{t("navHome")}</NavSelectedItem>
                  ) : (
                    <Link to="/" className={navInactive} data-node-id="10:100">
                      {t("navHome")}
                    </Link>
                  )}
                  {isProjects ? (
                    <NavSelectedItem data-node-id="10:101">{t("navProjects")}</NavSelectedItem>
                  ) : (
                    <p className="font-['Darker_Grotesque',sans-serif] font-normal" data-node-id="10:101">
                      <Link to="/projects" className={navInactive}>
                        {t("navProjects")}
                      </Link>
                    </p>
                  )}
                  {isContact ? (
                    <NavSelectedItem data-node-id="16:231">{t("navContact")}</NavSelectedItem>
                  ) : (
                    <p className="font-['Darker_Grotesque',sans-serif] font-normal" data-node-id="10:103">
                      <Link to="/contact" className={navInactive}>
                        {t("navContact")}
                      </Link>
                    </p>
                  )}
                </nav>
              </div>

              {isProjects ? <ProjectsColumn /> : isContact ? <ContactColumn /> : <HomeIntroColumn />}
            </div>
          </div>
        </div>
    </div>
  );
}
