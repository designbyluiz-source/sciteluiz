import { type CSSProperties } from "react";
import { Link } from "react-router";
import sallesFerreiraCover from "../assets/salles-ferreira-cover.png";
import { LanguageRail } from "./components/LanguageRail";
import { MetaballShaderBackground } from "./components/MetaballShaderBackground";
import { projectSiteUrls } from "./projectSiteUrls";
import { useLanguage } from "./language";
import { useColorMode } from "./useColorMode";

const SHELL_PAD = "clamp(10px, 3vmin, 30px)";
const framePad = "p-[clamp(10px,3vmin,30px)]";
const headingSize = "text-[clamp(1.25rem,4.2vmin,3.375rem)]";
const bodySize = "text-[clamp(1rem,2.05vmin,1.375rem)]";

export default function ProjectSallesFerreiraPage() {
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
                name="color-mode-salles-ferreira"
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
                name="color-mode-salles-ferreira"
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
                {"< SALLES FERREIRA"}
              </Link>

              <div className="flex w-full flex-1 items-center justify-center">
                <div className="group relative w-[min(100%,720px)] aspect-[778/539] overflow-hidden rounded-[40px]">
                  <img alt="Salles Ferreira project cover" className={`absolute inset-0 h-full w-full object-cover${isDark ? " invert" : ""}`} src={sallesFerreiraCover} />
                  <div className="pointer-events-none absolute inset-0 z-[1] rounded-[40px] bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <a
                    href={projectSiteUrls.sallesFerreira}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white px-[clamp(16px,1.6vmin,24px)] py-[clamp(7px,0.8vmin,11px)] font-['Darker_Grotesque',sans-serif] text-[clamp(1rem,1.6vmin,1.3rem)] font-bold uppercase tracking-wide text-white no-underline opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    SALLES FERREIRA
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`hide-scrollbar flex min-h-0 w-full flex-1 flex-col items-start gap-[clamp(24px,3.2vmin,54px)] overflow-y-auto overscroll-contain font-['Darker_Grotesque',sans-serif] font-normal leading-normal text-black ${bodySize} sm:w-[min(374px,100%)] sm:max-w-[min(374px,42%)] sm:flex-none sm:shrink-0`}
            >
              <div className="w-full">
                <p className="font-bold">Website design</p>
              </div>

              <div className="w-full">
                <p className="mt-[0.7em] font-bold">Advogando com clareza e seriedade.</p>
                <p className="mt-[0.7em]">
                  Salles Ferreira e um escritorio juridico com foco em atuacao estrategica, combinando tradicao, precisao tecnica e visao contemporanea.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Contexto</p>
                <p className="mt-[0.7em]">
                  O projeto tinha como objetivo posicionar o escritorio como uma referencia em areas como tributario, societario e imobiliario, com destaque para atuacao em cenarios complexos como reforma tributaria.
                </p>
                <p className="mt-[0.7em]">
                  Mais do que apresentar servicos, o site precisava transmitir autoridade, confianca e sofisticacao desde o primeiro contato.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Desafio</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Traduzir credibilidade juridica em experiencia digital</li>
                  <li>Evitar estetica generica de sites institucionais</li>
                  <li>Organizar conteudo denso de forma clara</li>
                  <li>Equilibrar tradicao com modernidade</li>
                  <li>Valorizar os socios como ativos centrais da marca</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Abordagem</p>
                <p className="mt-[0.7em]">O projeto foi conduzido com foco em tres pilares:</p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Autoridade visual</span>
                  <br />
                  Uso de tipografia, cores e composicao para reforcar confianca e solidez.
                </p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Clareza editorial</span>
                  <br />
                  Estrutura de conteudo pensada para leitura fluida e direta.
                </p>
                <p className="mt-[0.7em]">
                  <span className="font-bold">Presenca institucional</span>
                  <br />
                  Construcao de uma narrativa que posiciona o escritorio como referencia.
                </p>
              </div>

              <div className="w-full">
                <p className="font-bold">Solucao</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Hero com composicao sobria e impacto institucional</li>
                  <li>Uso estrategico de cores para reforco de marca</li>
                  <li>Secao de numeros-chave para evidenciar escala</li>
                  <li>Estrutura clara para areas de atuacao</li>
                  <li>Destaque para socios com abordagem mais autoral</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Resultado</p>
                <ul className="mt-[0.7em] list-disc ps-[1.25em]">
                  <li>Percepcao mais forte de autoridade e confianca</li>
                  <li>Comunicacao mais clara das areas de atuacao</li>
                  <li>Melhor apresentacao institucional do escritorio</li>
                  <li>Base solida para presenca digital consistente</li>
                </ul>
              </div>

              <div className="w-full">
                <p className="font-bold">Meu papel</p>
                <p className="mt-[0.7em]">UX/UI Designer</p>
                <p className="mt-[0.7em]">
                  Atuei na definicao da direcao visual, estrutura do site e construcao da interface, garantindo alinhamento entre posicionamento, conteudo e experiencia.
                </p>
              </div>

              <Link to="/projects/qofrinho" className="w-full font-bold no-underline text-inherit hover:opacity-80">
                {"PROXIMO PROJETO>"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
