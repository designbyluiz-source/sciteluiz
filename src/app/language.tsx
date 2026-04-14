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
    homeMore: "MAIS >",
    aboutBack: "< SOBRE MIM",
    aboutP1:
      "Sou um Designer UX/UI Sênior baseado em Curitiba, Brasil, com mais de 6 anos de experiência no design de produtos digitais que equilibram estética, usabilidade e impacto para o negócio. Ao longo da minha carreira, trabalhei em diferentes setores, ajudando empresas a transformar ideias complexas em experiências intuitivas e escaláveis.",
    aboutP2:
      "Minha abordagem ao design vai além do visual. Foco em entender o comportamento real do usuário, identificar pontos de atrito e criar soluções que pareçam naturais e sem esforço. Seja estruturando um produto do zero ou refinando uma experiência existente, busco clareza, consistência e propósito em cada decisão.",
    aboutP3:
      "Tenho sólida expertise em Figma e sistemas de design, e estou profundamente envolvido em todo o ciclo do produto — desde pesquisa e ideação até prototipagem, validação e handoff. Colaboro de perto com desenvolvedores, stakeholders e equipes de negócio para garantir que o design seja não apenas visualmente atraente, mas também viável e alinhado com os objetivos estratégicos.",
    aboutP4:
      "Ao longo dos anos, também contribuí para processos de pré-venda, ajudando a traduzir necessidades de negócio em visões de produto e construindo confiança por meio do design. Essa experiência fortaleceu minha capacidade de comunicar ideias com clareza e conectar decisões de design a resultados reais.",
    aboutP5:
      "O que me motiva é a constante evolução das experiências digitais. Estou sempre explorando novas ferramentas, referências e formas de impulsionar o design — não pela tendência, mas para criar produtos mais humanos, eficientes e significativos.",
    aboutProjects: "MEUS PROJETOS >",
    projectCrypto: "Design de banco cripto",
    projectWeb: "Design de sites",
    projectBank: "Design de app bancário",
    projectLogo: "Design de logo cripto",
    projectStreaming: "Design de streaming",
    projectGateway: "Gateway de pagamento white label",
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
    homeMore: "MORE >",
    aboutBack: "< ABOUT ME",
    aboutP1:
      "I'm a Senior UX/UI Designer based in Curitiba, Brazil, with over 6 years of experience designing digital products that balance aesthetics, usability, and business impact. Throughout my career, I've worked across different industries, helping companies transform complex ideas into intuitive and scalable experiences.",
    aboutP2:
      "My approach to design goes beyond visuals. I focus on understanding real user behavior, identifying friction points, and creating solutions that feel natural and effortless. Whether it's structuring a product from scratch or refining an existing experience, I'm driven by clarity, consistency, and purpose in every decision.",
    aboutP3:
      "I have strong expertise in Figma and design systems, and I'm deeply involved in the full product cycle — from research and ideation to prototyping, validation, and handoff. I collaborate closely with developers, stakeholders, and business teams to ensure that design is not just visually compelling, but also feasible and aligned with strategic goals.",
    aboutP4:
      "Over the years, I've also contributed to pre-sales processes, helping translate business needs into product visions and building confidence through design. This experience strengthened my ability to communicate ideas clearly and connect design decisions to real outcomes.",
    aboutP5:
      "What motivates me is the constant evolution of digital experiences. I'm always exploring new tools, references, and ways to push design forward — not for the sake of trends, but to create products that are more human, efficient, and meaningful.",
    aboutProjects: "MY PROJECTS >",
    projectCrypto: "Crypto banking design",
    projectWeb: "Website design",
    projectBank: "Banking app design",
    projectLogo: "Crypto logo design",
    projectStreaming: "Streaming design",
    projectGateway: "Payment gateway white label",
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
    homeMore: "MÁS >",
    aboutBack: "< SOBRE MÍ",
    aboutP1:
      "Soy un Diseñador UX/UI Senior con base en Curitiba, Brasil, con más de 6 años de experiencia diseñando productos digitales que equilibran estética, usabilidad e impacto empresarial. A lo largo de mi carrera, he trabajado en diferentes industrias, ayudando a empresas a transformar ideas complejas en experiencias intuitivas y escalables.",
    aboutP2:
      "Mi enfoque del diseño va más allá de lo visual. Me concentro en comprender el comportamiento real del usuario, identificar puntos de fricción y crear soluciones que se sientan naturales y sin esfuerzo. Ya sea estructurando un producto desde cero o refinando una experiencia existente, me impulsan la claridad, la coherencia y el propósito en cada decisión.",
    aboutP3:
      "Tengo una sólida experiencia en Figma y sistemas de diseño, y estoy profundamente involucrado en todo el ciclo del producto — desde la investigación y la ideación hasta la prototipación, la validación y el handoff. Colaboro estrechamente con desarrolladores, stakeholders y equipos de negocio para garantizar que el diseño no solo sea visualmente atractivo, sino también viable y alineado con los objetivos estratégicos.",
    aboutP4:
      "A lo largo de los años, también he contribuido a procesos de preventa, ayudando a traducir necesidades empresariales en visiones de producto y generando confianza a través del diseño. Esta experiencia fortaleció mi capacidad para comunicar ideas con claridad y conectar decisiones de diseño con resultados reales.",
    aboutP5:
      "Lo que me motiva es la constante evolución de las experiencias digitales. Siempre estoy explorando nuevas herramientas, referencias y formas de impulsar el diseño — no por las tendencias, sino para crear productos más humanos, eficientes y significativos.",
    aboutProjects: "MIS PROYECTOS >",
    projectCrypto: "Diseño de banca cripto",
    projectWeb: "Diseño web",
    projectBank: "Diseño de app bancaria",
    projectLogo: "Diseño de logo cripto",
    projectStreaming: "Diseño de streaming",
    projectGateway: "Gateway de pago white label",
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
