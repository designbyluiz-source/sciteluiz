import { useState, type CSSProperties } from "react";
import { Link } from "react-router";
import globaldexCover from "../assets/globaldex-cover.png";
import { LanguageRail } from "./components/LanguageRail";
import { MetaballShaderBackground } from "./components/MetaballShaderBackground";
import { useLanguage } from "./language";

const SHELL_PAD = "clamp(10px, 3vmin, 30px)";
const framePad = "p-[clamp(10px,3vmin,30px)]";
const headingSize = "text-[clamp(1.25rem,4.2vmin,3.375rem)]";
const bodySize = "text-[clamp(1rem,2.05vmin,1.375rem)]";

type ColorMode = "light" | "dark";

export default function ProjectQuantumPage() {
  const [mode, setMode] = useState<ColorMode>("light");
  const isDark = mode === "dark";
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
                name="color-mode-quantum"
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
                name="color-mode-quantum"
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
                {"< QUANTUM"}
              </Link>

              <div className="flex w-full flex-1 items-center justify-center">
                <div className="relative w-[min(100%,778px)] aspect-[778/539] overflow-hidden rounded-[40px]">
                  <img alt="Quantum project cover" className={`absolute inset-0 h-full w-full object-cover${isDark ? " invert" : ""}`} src={globaldexCover} />
                </div>
              </div>
            </div>

            <div
              className={`hide-scrollbar flex min-h-0 w-full flex-1 flex-col items-start gap-[clamp(24px,3.2vmin,54px)] overflow-y-auto overscroll-contain font-['Darker_Grotesque',sans-serif] font-normal leading-normal text-black ${bodySize} sm:w-[min(374px,100%)] sm:max-w-[min(374px,42%)] sm:flex-none sm:shrink-0`}
            >
              <div className="w-full">
                <p className="font-bold">Connecting technology, capital and innovation.</p>
                <p className="mt-[0.7em]">
                  Quantum e um ecossistema financeiro global que conecta diferentes produtos e mercados em uma unica estrutura integrada.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Contexto</p>
                <p className="mt-[0.7em]">
                  A Quantum nao e um produto unico - e um grupo com multiplas solucoes interligadas, cobrindo desde banking ate infraestrutura e liquidez.
                </p>
                <p className="mt-[0.7em]">
                  O site precisava comunicar isso de forma clara: nao apenas apresentar produtos, mas traduzir um ecossistema complexo em algo compreensivel e estrategico.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Desafio</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Representar multiplos produtos em uma narrativa unica</li>
                  <li>Comunicar valor institucional com clareza e autoridade</li>
                  <li>Organizar grande volume de informacao sem sobrecarregar</li>
                  <li>Equilibrar conteudo tecnico com acessibilidade</li>
                  <li>Criar uma experiencia alinhada ao posicionamento global</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Abordagem</p>
                <p className="mt-[0.7em]">O projeto foi conduzido com foco em tres pilares:</p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Narrativa de ecossistema</span>
                  <br />
                  A estrutura do site foi pensada para mostrar como cada produto se conecta dentro do todo.
                </p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Clareza institucional</span>
                  <br />
                  Conteudo organizado para transmitir confianca, escala e solidez.
                </p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Hierarquia editorial</span>
                  <br />
                  Uso de tipografia, espacamento e blocos para guiar leitura e absorcao de informacao.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Solucao</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Estrutura modular para apresentacao dos produtos do grupo</li>
                  <li>Secoes bem definidas para ecossistema, historia e operacao global</li>
                  <li>Destaque para dados estrategicos e presenca internacional</li>
                  <li>Interface limpa com foco em leitura e escaneabilidade</li>
                  <li>Construcao de narrativa progressiva ao longo da pagina</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Resultado</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Comunicacao mais clara do posicionamento da empresa</li>
                  <li>Melhor entendimento do ecossistema por parte do usuario</li>
                  <li>Fortalecimento da percepcao de autoridade e escala</li>
                  <li>Base consistente para expansao institucional</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Meu papel</p>
                <p className="mt-[0.7em]">UX/UI Designer</p>
                <p className="mt-[0.7em]">
                  Atuei na definicao da estrutura do site, organizacao da informacao e construcao da interface, alinhando narrativa, design e posicionamento estrategico.
                </p>
              </div>

              <Link to="/projects/salles-ferreira" className="w-full font-bold no-underline text-inherit hover:opacity-80">
                {"PROXIMO PROJETO>"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
