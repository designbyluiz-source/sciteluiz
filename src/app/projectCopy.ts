import type { Locale } from "./language";

type GlobaldexCopy = {
  introTitle: string;
  introBody: string;
  overviewP1: string;
  overviewP2: string;
  challengeTitle: string;
  challengeItems: string[];
  approachTitle: string;
  approachIntro: string;
  approachPillars: { label: string; body: string }[];
  solutionTitle: string;
  solutionItems: string[];
  roleTitle: string;
  roleName: string;
  roleBody: string;
  nextProject: string;
};

type ProjectCopy = {
  introTitle: string;
  introBody: string;
  contextTitle: string;
  contextP1: string;
  contextP2: string;
  challengeTitle: string;
  challengeItems: string[];
  approachTitle: string;
  approachIntro: string;
  approachPillars: { label: string; body: string }[];
  solutionTitle: string;
  solutionItems: string[];
  resultTitle: string;
  resultItems: string[];
  roleTitle: string;
  roleName: string;
  roleBody: string;
  nextProject: string;
};

export const projectCopy: {
  globaldex: Record<Locale, GlobaldexCopy>;
  gates2b: Record<Locale, ProjectCopy>;
  qofrinho: Record<Locale, ProjectCopy>;
} = {
  globaldex: {
    "pt-BR": {
      introTitle: "Designing financial infrastructure for scale.",
      introBody:
        "GlobalDex e uma plataforma focada em operacoes financeiras digitais, onde a complexidade tecnica exige clareza extrema na experiencia.",
      overviewP1:
        'A GlobalDex nasce dentro de um cenario onde produtos financeiros deixam de ser apenas "apps" e passam a ser infraestrutura de operacao.',
      overviewP2:
        "O desafio nao era apenas desenhar telas - era estruturar uma experiencia capaz de lidar com multiplos fluxos financeiros, alta densidade de informacao e decisoes criticas em tempo real.",
      challengeTitle: "Desafio",
      challengeItems: [
        "Traduzir operacoes complexas em fluxos compreensiveis",
        "Reduzir carga cognitiva em um ambiente tecnico",
        "Criar consistencia entre diferentes tipos de transacoes",
        "Garantir confianca em cada interacao",
        "Manter performance e clareza mesmo com grande volume de dados",
      ],
      approachTitle: "Abordagem",
      approachIntro: "O projeto foi conduzido com foco em tres pilares:",
      approachPillars: [
        {
          label: "Clareza acima de tudo:",
          body: "Cada decisao de UI foi guiada pela reducao de ambiguidade.",
        },
        {
          label: "Sistema antes de tela:",
          body: "Construcao de um design system modular, permitindo escala e consistencia.",
        },
        {
          label: "Feedback constante:",
          body: "Estados, confirmacoes e retornos visuais pensados para dar seguranca ao usuario.",
        },
      ],
      solutionTitle: "Solucao",
      solutionItems: [
        "Estruturacao de fluxos financeiros complexos em etapas claras",
        "Padronizacao de componentes criticos (inputs, tabelas, status, alerts)",
        "Hierarquia visual forte para leitura rapida de dados",
        "Uso estrategico de contraste e espacamento",
        "Interface pensada para uso recorrente e intensivo",
      ],
      roleTitle: "Meu papel",
      roleName: "UX/UI Designer",
      roleBody:
        "Atuei na definicao da experiencia, arquitetura da informacao e construcao da interface, colaborando diretamente com produto e desenvolvimento para garantir viabilidade e consistencia.",
      nextProject: "PROXIMO PROJETO>",
    },
    en: {
      introTitle: "Designing financial infrastructure for scale.",
      introBody:
        "GlobalDex is a platform focused on digital financial operations, where technical complexity demands extreme clarity in the experience.",
      overviewP1:
        'GlobalDex was born in a context where financial products are no longer just "apps" and instead become operational infrastructure.',
      overviewP2:
        "The challenge was not only designing screens - it was structuring an experience capable of handling multiple financial flows, high information density, and critical real-time decisions.",
      challengeTitle: "Challenge",
      challengeItems: [
        "Translate complex operations into understandable flows",
        "Reduce cognitive load in a technical environment",
        "Create consistency across different transaction types",
        "Ensure trust in every interaction",
        "Maintain performance and clarity even with high data volume",
      ],
      approachTitle: "Approach",
      approachIntro: "The project was led with focus on three pillars:",
      approachPillars: [
        {
          label: "Clarity above all:",
          body: "Every UI decision was guided by reducing ambiguity.",
        },
        {
          label: "System before screen:",
          body: "Building a modular design system to enable scale and consistency.",
        },
        {
          label: "Constant feedback:",
          body: "States, confirmations, and visual responses designed to provide user confidence.",
        },
      ],
      solutionTitle: "Solution",
      solutionItems: [
        "Structuring complex financial flows into clear steps",
        "Standardizing critical components (inputs, tables, status, alerts)",
        "Strong visual hierarchy for fast data reading",
        "Strategic use of contrast and spacing",
        "Interface designed for recurrent and intensive usage",
      ],
      roleTitle: "My role",
      roleName: "UX/UI Designer",
      roleBody:
        "I worked on defining the experience, information architecture, and interface construction, collaborating directly with product and engineering to ensure feasibility and consistency.",
      nextProject: "NEXT PROJECT>",
    },
    es: {
      introTitle: "Diseñando infraestructura financiera para escalar.",
      introBody:
        "GlobalDex es una plataforma enfocada en operaciones financieras digitales, donde la complejidad técnica exige máxima claridad en la experiencia.",
      overviewP1:
        'GlobalDex nace en un escenario donde los productos financieros dejan de ser solo "apps" y pasan a ser infraestructura operativa.',
      overviewP2:
        "El desafío no era solo diseñar pantallas, sino estructurar una experiencia capaz de manejar múltiples flujos financieros, alta densidad de información y decisiones críticas en tiempo real.",
      challengeTitle: "Desafío",
      challengeItems: [
        "Traducir operaciones complejas en flujos comprensibles",
        "Reducir la carga cognitiva en un entorno técnico",
        "Crear consistencia entre diferentes tipos de transacciones",
        "Garantizar confianza en cada interacción",
        "Mantener rendimiento y claridad incluso con gran volumen de datos",
      ],
      approachTitle: "Enfoque",
      approachIntro: "El proyecto se condujo con foco en tres pilares:",
      approachPillars: [
        {
          label: "Claridad por encima de todo:",
          body: "Cada decisión de UI fue guiada por la reducción de ambigüedad.",
        },
        {
          label: "Sistema antes de pantalla:",
          body: "Construcción de un design system modular para permitir escala y consistencia.",
        },
        {
          label: "Feedback constante:",
          body: "Estados, confirmaciones y respuestas visuales pensadas para dar seguridad al usuario.",
        },
      ],
      solutionTitle: "Solución",
      solutionItems: [
        "Estructuración de flujos financieros complejos en pasos claros",
        "Estandarización de componentes críticos (inputs, tablas, estados, alertas)",
        "Fuerte jerarquía visual para lectura rápida de datos",
        "Uso estratégico de contraste y espaciado",
        "Interfaz pensada para uso recurrente e intensivo",
      ],
      roleTitle: "Mi rol",
      roleName: "UX/UI Designer",
      roleBody:
        "Actué en la definición de la experiencia, arquitectura de información y construcción de interfaz, colaborando directamente con producto y desarrollo para asegurar viabilidad y consistencia.",
      nextProject: "SIGUIENTE PROYECTO>",
    },
  },
  gates2b: {
    "pt-BR": {
      introTitle: "Powering multi-rail financial operations.",
      introBody:
        "Gates2B e uma infraestrutura de pagamentos que conecta diferentes meios em um unico fluxo, exigindo uma experiencia clara mesmo em cenarios altamente tecnicos.",
      contextTitle: "Contexto",
      contextP1:
        "O produto foi pensado para empresas que operam com multiplos meios de pagamento e precisam de centralizacao, previsibilidade e controle.",
      contextP2:
        "Diferente de um banco tradicional, o desafio aqui envolve orquestrar fluxos entre diferentes rails, moedas e regras operacionais.",
      challengeTitle: "Desafio",
      challengeItems: [
        "Organizar multiplos meios de pagamento em uma experiencia unificada",
        "Tornar visivel o fluxo de liquidacao e conversao",
        "Reduzir complexidade operacional para o usuario",
        "Garantir transparencia em regras, prazos e taxas",
        "Criar uma base escalavel para diferentes mercados",
      ],
      approachTitle: "Abordagem",
      approachIntro: "O projeto foi conduzido com foco em tres pilares:",
      approachPillars: [
        {
          label: "Orquestracao clara",
          body: "A experiencia foi desenhada para tornar visivel o que normalmente e invisivel: o caminho do dinheiro.",
        },
        {
          label: "Transparencia operacional",
          body: "Cada etapa do fluxo comunica estado, prazo e condicao.",
        },
        {
          label: "Escala como premissa",
          body: "Arquitetura de interface pensada para expansao de novos meios e regioes.",
        },
      ],
      solutionTitle: "Solucao",
      solutionItems: [
        "Visualizacao estruturada dos fluxos de pagamento",
        "Componentes modulares para diferentes tipos de transacao",
        "Interface orientada a status e estados claros",
        "Organizacao de dados com foco em leitura rapida",
        "Integracao entre cobranca, liquidacao e saque",
      ],
      resultTitle: "Resultado",
      resultItems: [
        "Maior clareza em operacoes multi-rail",
        "Reducao de erros operacionais",
        "Aumento de confianca no sistema",
        "Base pronta para expansao internacional",
      ],
      roleTitle: "Meu papel",
      roleName: "UX/UI Designer",
      roleBody:
        "Atuei na definicao da experiencia, arquitetura da informacao e construcao da interface, alinhando produto, tecnologia e necessidades de negocio.",
      nextProject: "PROXIMO PROJETO>",
    },
    en: {
      introTitle: "Powering multi-rail financial operations.",
      introBody:
        "Gates2B is a payment infrastructure that connects different rails into a single flow, requiring a clear experience even in highly technical scenarios.",
      contextTitle: "Context",
      contextP1:
        "The product was designed for companies operating across multiple payment methods that need centralization, predictability, and control.",
      contextP2:
        "Unlike a traditional bank, the challenge here involves orchestrating flows across different rails, currencies, and operational rules.",
      challengeTitle: "Challenge",
      challengeItems: [
        "Organize multiple payment methods into a unified experience",
        "Make settlement and conversion flow visible",
        "Reduce operational complexity for users",
        "Ensure transparency in rules, timelines, and fees",
        "Create a scalable foundation for different markets",
      ],
      approachTitle: "Approach",
      approachIntro: "The project was led with focus on three pillars:",
      approachPillars: [
        {
          label: "Clear orchestration",
          body: "The experience was designed to make visible what is usually invisible: the path of money.",
        },
        {
          label: "Operational transparency",
          body: "Each step in the flow communicates state, timeline, and condition.",
        },
        {
          label: "Scale by design",
          body: "Interface architecture designed to expand to new rails and regions.",
        },
      ],
      solutionTitle: "Solution",
      solutionItems: [
        "Structured visualization of payment flows",
        "Modular components for different transaction types",
        "Status-oriented interface with clear states",
        "Data organization focused on fast reading",
        "Integration across collection, settlement, and payout",
      ],
      resultTitle: "Result",
      resultItems: [
        "Greater clarity in multi-rail operations",
        "Reduced operational errors",
        "Increased trust in the system",
        "Ready foundation for international expansion",
      ],
      roleTitle: "My role",
      roleName: "UX/UI Designer",
      roleBody:
        "I worked on defining the experience, information architecture, and interface design, aligning product, technology, and business needs.",
      nextProject: "NEXT PROJECT>",
    },
    es: {
      introTitle: "Impulsando operaciones financieras multi-rail.",
      introBody:
        "Gates2B es una infraestructura de pagos que conecta diferentes medios en un único flujo, exigiendo una experiencia clara incluso en escenarios altamente técnicos.",
      contextTitle: "Contexto",
      contextP1:
        "El producto fue pensado para empresas que operan con múltiples medios de pago y necesitan centralización, previsibilidad y control.",
      contextP2:
        "A diferencia de un banco tradicional, el desafío aquí implica orquestar flujos entre diferentes rails, monedas y reglas operativas.",
      challengeTitle: "Desafío",
      challengeItems: [
        "Organizar múltiples medios de pago en una experiencia unificada",
        "Hacer visible el flujo de liquidación y conversión",
        "Reducir la complejidad operativa para el usuario",
        "Garantizar transparencia en reglas, plazos y tarifas",
        "Crear una base escalable para diferentes mercados",
      ],
      approachTitle: "Enfoque",
      approachIntro: "El proyecto se condujo con foco en tres pilares:",
      approachPillars: [
        {
          label: "Orquestación clara",
          body: "La experiencia fue diseñada para hacer visible lo que normalmente es invisible: el camino del dinero.",
        },
        {
          label: "Transparencia operativa",
          body: "Cada etapa del flujo comunica estado, plazo y condición.",
        },
        {
          label: "Escala como premisa",
          body: "Arquitectura de interfaz pensada para la expansión de nuevos medios y regiones.",
        },
      ],
      solutionTitle: "Solución",
      solutionItems: [
        "Visualización estructurada de los flujos de pago",
        "Componentes modulares para diferentes tipos de transacción",
        "Interfaz orientada a estados y claridad",
        "Organización de datos enfocada en lectura rápida",
        "Integración entre cobro, liquidación y retiro",
      ],
      resultTitle: "Resultado",
      resultItems: [
        "Mayor claridad en operaciones multi-rail",
        "Reducción de errores operativos",
        "Aumento de confianza en el sistema",
        "Base lista para expansión internacional",
      ],
      roleTitle: "Mi rol",
      roleName: "UX/UI Designer",
      roleBody:
        "Actué en la definición de la experiencia, arquitectura de información y construcción de interfaz, alineando producto, tecnología y necesidades de negocio.",
      nextProject: "SIGUIENTE PROYECTO>",
    },
  },
  qofrinho: {
    "pt-BR": {
      introTitle: "Banking app design",
      introBody: "Turning saving into a shared habit.",
      contextTitle: "Contexto",
      contextP1:
        "Qofrinho e um aplicativo mobile que transforma o ato de guardar dinheiro em uma experiencia social e gamificada.",
      contextP2:
        "Diferente de produtos financeiros tradicionais, o Qofrinho nao lida diretamente com o dinheiro - ele atua como uma camada comportamental, incentivando consistencia atraves de desafios e interacao entre usuarios.",
      challengeTitle: "Desafio",
      challengeItems: [
        "Incentivar um habito financeiro sem controlar o dinheiro",
        "Criar engajamento recorrente dentro do app",
        "Tornar a experiencia leve, mesmo com um tema serio",
        "Equilibrar gamificacao com clareza de uso",
        "Construir senso de comunidade entre usuarios",
      ],
      approachTitle: "Abordagem",
      approachIntro: "O projeto foi conduzido com foco em tres pilares:",
      approachPillars: [
        {
          label: "Comportamento primeiro",
          body: "A experiencia foi desenhada para incentivar consistencia e repeticao.",
        },
        {
          label: "Gamificacao leve",
          body: "Elementos de jogo aplicados sem comprometer clareza e usabilidade.",
        },
        {
          label: "Social como motor",
          body: "Interacoes entre usuarios como principal fator de engajamento.",
        },
      ],
      solutionTitle: "Solucao",
      solutionItems: [
        "Fluxo de criacao de desafios entre amigos",
        "Sistema de comprovacao de economia com evidencias",
        "Interface leve, com foco em simplicidade e acao rapida",
        "Elementos visuais que reforcam progresso e consistencia",
        "Estrutura pensada para uso frequente e rapido",
      ],
      resultTitle: "Resultado",
      resultItems: [
        "Maior engajamento recorrente dos usuarios",
        "Estimulo consistente ao habito de guardar dinheiro",
        "Experiencia diferenciada dentro do contexto financeiro",
        "Base solida para evolucao social e gamificada",
      ],
      roleTitle: "Meu papel",
      roleName: "UX/UI Designer",
      roleBody:
        "Atuei na concepcao do produto, definicao da experiencia e construcao da interface, focando em comportamento, engajamento e simplicidade.",
      nextProject: "PROXIMO PROJETO>",
    },
    en: {
      introTitle: "Banking app design",
      introBody: "Turning saving into a shared habit.",
      contextTitle: "Context",
      contextP1:
        "Qofrinho is a mobile app that turns saving money into a social and gamified experience.",
      contextP2:
        "Unlike traditional financial products, Qofrinho does not handle money directly - it acts as a behavioral layer, encouraging consistency through challenges and user interaction.",
      challengeTitle: "Challenge",
      challengeItems: [
        "Encourage a financial habit without controlling money",
        "Create recurring in-app engagement",
        "Keep the experience light despite a serious topic",
        "Balance gamification with clarity of use",
        "Build a sense of community among users",
      ],
      approachTitle: "Approach",
      approachIntro: "The project was led with focus on three pillars:",
      approachPillars: [
        {
          label: "Behavior first",
          body: "The experience was designed to drive consistency and repetition.",
        },
        {
          label: "Light gamification",
          body: "Game elements were applied without compromising clarity and usability.",
        },
        {
          label: "Social as engine",
          body: "User interactions are the main engagement driver.",
        },
      ],
      solutionTitle: "Solution",
      solutionItems: [
        "Challenge creation flow between friends",
        "Savings proof system with evidence",
        "Lightweight interface focused on simplicity and quick action",
        "Visual elements reinforcing progress and consistency",
        "Structure designed for frequent and fast usage",
      ],
      resultTitle: "Result",
      resultItems: [
        "Higher recurring user engagement",
        "Consistent stimulus to the saving habit",
        "Differentiated experience in the financial context",
        "Strong base for social and gamified evolution",
      ],
      roleTitle: "My role",
      roleName: "UX/UI Designer",
      roleBody:
        "I worked on product conception, experience definition, and interface construction, focusing on behavior, engagement, and simplicity.",
      nextProject: "NEXT PROJECT>",
    },
    es: {
      introTitle: "Diseño de app bancaria",
      introBody: "Convertir el ahorro en un hábito compartido.",
      contextTitle: "Contexto",
      contextP1:
        "Qofrinho es una app mobile que transforma el acto de ahorrar dinero en una experiencia social y gamificada.",
      contextP2:
        "A diferencia de productos financieros tradicionales, Qofrinho no maneja el dinero directamente: actúa como una capa de comportamiento, incentivando consistencia a través de desafíos e interacción entre usuarios.",
      challengeTitle: "Desafío",
      challengeItems: [
        "Incentivar un hábito financiero sin controlar el dinero",
        "Crear engagement recurrente dentro de la app",
        "Hacer la experiencia ligera, incluso con un tema serio",
        "Equilibrar gamificación con claridad de uso",
        "Construir sentido de comunidad entre usuarios",
      ],
      approachTitle: "Enfoque",
      approachIntro: "El proyecto se condujo con foco en tres pilares:",
      approachPillars: [
        {
          label: "Comportamiento primero",
          body: "La experiencia fue diseñada para incentivar consistencia y repetición.",
        },
        {
          label: "Gamificación ligera",
          body: "Elementos de juego aplicados sin comprometer claridad y usabilidad.",
        },
        {
          label: "Social como motor",
          body: "Las interacciones entre usuarios son el principal factor de engagement.",
        },
      ],
      solutionTitle: "Solución",
      solutionItems: [
        "Flujo de creación de desafíos entre amigos",
        "Sistema de comprobación de ahorro con evidencias",
        "Interfaz ligera con foco en simplicidad y acción rápida",
        "Elementos visuales que refuerzan progreso y consistencia",
        "Estructura pensada para uso frecuente y rápido",
      ],
      resultTitle: "Resultado",
      resultItems: [
        "Mayor engagement recurrente de los usuarios",
        "Estímulo consistente al hábito de ahorrar dinero",
        "Experiencia diferenciada dentro del contexto financiero",
        "Base sólida para evolución social y gamificada",
      ],
      roleTitle: "Mi rol",
      roleName: "UX/UI Designer",
      roleBody:
        "Actué en la concepción del producto, definición de la experiencia y construcción de la interfaz, con foco en comportamiento, engagement y simplicidad.",
      nextProject: "SIGUIENTE PROYECTO>",
    },
  },
};
