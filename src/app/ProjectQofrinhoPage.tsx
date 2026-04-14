import { type CSSProperties } from "react";
import { Link } from "react-router";
import qofrinhoCover from "../assets/qofrinho-cover.png";
import { LanguageRail } from "./components/LanguageRail";
import { MetaballShaderBackground } from "./components/MetaballShaderBackground";
import { projectSiteUrls } from "./projectSiteUrls";
import { useLanguage } from "./language";
import { useColorMode } from "./useColorMode";

const SHELL_PAD = "clamp(10px, 3vmin, 30px)";
const framePad = "p-[clamp(10px,3vmin,30px)]";
const headingSize = "text-[clamp(1.25rem,4.2vmin,3.375rem)]";
const bodySize = "text-[clamp(1rem,2.05vmin,1.375rem)]";

export default function ProjectQofrinhoPage() {
  const { mode, setMode, isDark } = useColorMode("light");
  const { t } = useLanguage();

  const label = isDark ? "text-white" : "text-black";
  const boxOn = isDark ? "border-white bg-white" : "border-black bg-black";
  const boxOff = isDark ? "border-white bg-transparent" : "border-black bg-white";
  const font = "font-['Darker_Grotesque',sans-serif]";
  const optionGap = "gap-[clamp(10px,1.6vmin,14px)]";

  return (
    <div
      className={`relative box-border flex h-dvh max-h-dvh w-full max-w-[100vw] flex-col items-stretch overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
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
                name="color-mode-qofrinho"
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
                name="color-mode-qofrinho"
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

        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-black/10">
          <div
            className={`relative flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row items-stretch justify-between gap-[clamp(8px,2vmin,28px)] overflow-hidden border border-black/50 ${framePad}`}
          >
            <div className="flex min-w-0 shrink-0 flex-col items-start gap-[clamp(10px,2.4vmin,24px)] sm:flex-1 sm:min-h-0">
              <Link
                to="/projects"
                className={`shrink-0 font-['Darker_Grotesque',sans-serif] font-light leading-none text-black no-underline hover:opacity-70 ${headingSize}`}
              >
                {"< QOFRINHO"}
              </Link>

              <div className="flex w-full flex-1 items-center justify-center">
                <div className="group relative w-[min(100%,778px)] aspect-[778/539] overflow-hidden rounded-[40px]">
                  <img alt="Qofrinho project cover" className={`absolute inset-0 h-full w-full object-cover${isDark ? " invert" : ""}`} src={qofrinhoCover} />
                  <div className="pointer-events-none absolute inset-0 z-[1] rounded-[40px] bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <a
                    href={projectSiteUrls.qofrinho}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white px-[clamp(16px,1.6vmin,24px)] py-[clamp(7px,0.8vmin,11px)] font-['Darker_Grotesque',sans-serif] text-[clamp(1rem,1.6vmin,1.3rem)] font-bold uppercase tracking-wide text-white no-underline opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    QOFRINHO
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`hide-scrollbar flex min-h-0 w-full flex-1 flex-col items-start gap-[clamp(24px,3.2vmin,54px)] overflow-y-auto overscroll-contain font-['Darker_Grotesque',sans-serif] font-normal leading-normal text-black ${bodySize} sm:w-[min(374px,100%)] sm:max-w-[min(374px,42%)] sm:flex-none sm:shrink-0`}
            >
              <div className="w-full">
                <p className="font-bold">Banking app design</p>
              </div>

              <div className="w-full">
                <p className="mt-[0.7em] font-bold">Turning saving into a shared habit.</p>
                <p className="mt-[0.7em]">
                  Qofrinho e um aplicativo mobile que transforma o ato de guardar dinheiro em uma experiencia social e gamificada.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Contexto</p>
                <p className="mt-[0.7em]">
                  Diferente de produtos financeiros tradicionais, o Qofrinho nao lida diretamente com o dinheiro - ele atua como uma camada comportamental, incentivando consistencia atraves de desafios e interacao entre usuarios.
                </p>
                <p className="mt-[0.7em]">O foco do produto esta em engajamento, nao em gestao financeira.</p>
              </div>

              <div className="w-full">
                <p className="font-bold">Desafio</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Incentivar um habito financeiro sem controlar o dinheiro</li>
                  <li>Criar engajamento recorrente dentro do app</li>
                  <li>Tornar a experiencia leve, mesmo com um tema serio</li>
                  <li>Equilibrar gamificacao com clareza de uso</li>
                  <li>Construir senso de comunidade entre usuarios</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Abordagem</p>
                <p className="mt-[0.7em]">O projeto foi conduzido com foco em tres pilares:</p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Comportamento primeiro</span>
                  <br />
                  A experiencia foi desenhada para incentivar consistencia e repeticao.
                </p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Gamificacao leve</span>
                  <br />
                  Elementos de jogo aplicados sem comprometer clareza e usabilidade.
                </p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Social como motor</span>
                  <br />
                  Interacoes entre usuarios como principal fator de engajamento.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Solucao</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Fluxo de criacao de desafios entre amigos</li>
                  <li>Sistema de comprovacao de economia com evidencias</li>
                  <li>Interface leve, com foco em simplicidade e acao rapida</li>
                  <li>Elementos visuais que reforcam progresso e consistencia</li>
                  <li>Estrutura pensada para uso frequente e rapido</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Resultado</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Maior engajamento recorrente dos usuarios</li>
                  <li>Estimulo consistente ao habito de guardar dinheiro</li>
                  <li>Experiencia diferenciada dentro do contexto financeiro</li>
                  <li>Base solida para evolucao social e gamificada</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Meu papel</p>
                <p className="mt-[0.7em]">UX/UI Designer</p>
                <p className="mt-[0.7em]">
                  Atuei na concepcao do produto, definicao da experiencia e construcao da interface, focando em comportamento, engajamento e simplicidade.
                </p>
              </div>

              <Link to="/projects" className="w-full font-bold no-underline text-inherit hover:opacity-80">
                {"PROXIMO PROJETO>"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
