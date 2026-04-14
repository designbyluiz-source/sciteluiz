import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "pt-BR" | "en" | "es";

const STORAGE_KEY = "site-locale";
const ORDER: Locale[] = ["pt-BR", "en", "es"];

const MESSAGES = {
  "pt-BR": {
    navHome: "Início",
    navProjects: "Projetos",
    navContact: "Contato",
    role: "Designer UX|UI",
    home1:
      "Nascido em Curitiba, Brasil, atuo como designer UX/UI há mais de 6 anos. Acredito que o design pode ir além das interfaces, criando conexões significativas entre pessoas e produtos digitais.",
    home2:
      "Com foco em clareza, usabilidade e intenção, desenho experiências que simplificam a complexidade e dão vida a ideias de forma prática e envolvente.",
    home3:
      "Exploro constantemente novas abordagens para que produtos digitais pareçam mais intuitivos, humanos e impactantes.",
    ariaNav: "Navegação principal",
    ariaProjects: "Projetos",
    ariaContact: "Contato",
    themeDark: "Escuro",
    themeLight: "Claro",
    ariaTheme: "Tema de cor",
    langAria: "Alterar idioma do site",
    preloaderAria: "Carregando",
    contactBehance: "BEHANCE >",
    contactLinkedin: "LINKEDIN >",
    contactWhatsapp: "WHATSAPP >",
    projectCrypto: "Design de banco cripto",
    projectWeb: "Design de sites",
    projectBank: "Design de app bancário",
  },
  en: {
    navHome: "Home",
    navProjects: "Projects",
    navContact: "Contact",
    role: "Designer UX|UI",
    home1:
      "Born in Curitiba, Brazil, I've been working as a UX/UI designer for over 6 years. I believe design can go beyond interfaces, creating meaningful connections between people and digital products.",
    home2:
      "With a strong focus on clarity, usability, and intention, I design experiences that simplify complexity and bring ideas to life in a practical and engaging way.",
    home3:
      "I'm constantly exploring new approaches to make digital products feel more intuitive, human, and impactful.",
    ariaNav: "Primary navigation",
    ariaProjects: "Projects",
    ariaContact: "Contact",
    themeDark: "Dark",
    themeLight: "Light",
    ariaTheme: "Color theme",
    langAria: "Change site language",
    preloaderAria: "Loading",
    contactBehance: "BEHANCE >",
    contactLinkedin: "LINKEDIN >",
    contactWhatsapp: "WHATSAPP >",
    projectCrypto: "Crypto banking design",
    projectWeb: "Website design",
    projectBank: "Banking app design",
  },
  es: {
    navHome: "Inicio",
    navProjects: "Proyectos",
    navContact: "Contacto",
    role: "Diseñador UX|UI",
    home1:
      "Nacido en Curitiba, Brasil, llevo más de 6 años como diseñador UX/UI. Creo que el diseño puede ir más allá de las interfaces, creando vínculos significativos entre las personas y los productos digitales.",
    home2:
      "Con foco en claridad, usabilidad e intención, diseño experiencias que simplifican la complejidad y dan vida a las ideas de forma práctica y atractiva.",
    home3:
      "Exploro constantemente nuevos enfoques para que los productos digitales resulten más intuitivos, humanos e impactantes.",
    ariaNav: "Navegación principal",
    ariaProjects: "Proyectos",
    ariaContact: "Contacto",
    themeDark: "Oscuro",
    themeLight: "Claro",
    ariaTheme: "Tema de color",
    langAria: "Cambiar el idioma del sitio",
    preloaderAria: "Cargando",
    contactBehance: "BEHANCE >",
    contactLinkedin: "LINKEDIN >",
    contactWhatsapp: "WHATSAPP >",
    projectCrypto: "Diseño de banca cripto",
    projectWeb: "Diseño web",
    projectBank: "Diseño de app bancaria",
  },
} as const;

export type MessageKey = keyof (typeof MESSAGES)["en"];

function readStoredLocale(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "pt-BR" || v === "en" || v === "es") return v;
  } catch {
    /* ignore */
  }
  return "pt-BR";
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  cycleLocale: () => void;
  t: (key: MessageKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== "undefined" ? readStoredLocale() : "pt-BR",
  );

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const cycleLocale = useCallback(() => {
    const i = ORDER.indexOf(locale);
    setLocale(ORDER[(i + 1) % ORDER.length]);
  }, [locale, setLocale]);

  const t = useCallback(
    (key: MessageKey) => MESSAGES[locale][key] ?? MESSAGES.en[key] ?? String(key),
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale === "pt-BR" ? "pt-BR" : locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, cycleLocale, t }),
    [locale, setLocale, cycleLocale, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const v = useContext(LanguageContext);
  if (!v) throw new Error("useLanguage must be used within LanguageProvider");
  return v;
}
