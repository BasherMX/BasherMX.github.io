import { createContext, useCallback, useContext, useState } from "react";

const en = {
  nav: {
    profile: "Profile",
    projects: "Projects",
    tech: "Technologies",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    greeting: "Hello, I'm Basher",
    title: "UX/UI Designer & Frontend Engineer",
    bio: "I design and build digital products with a clear system, strong visual identity and clean code. The goal is simple: interfaces that feel premium and respond fast.",
    cardCaption:
      "UX, UI, strategy and code with a focus on clarity, performance and product value.",
    viewProjects: "View projects",
    directContact: "Direct contact",
    nebulaMode: "Nebula mode active",
    openCollab: "Open to new collaborations",
    skills: [
      "Product strategy",
      "Design systems",
      "React engineering",
      "Motion design",
    ],
    stats: {
      experience: "Years experience",
      clients: "Clients",
      projects: "Projects",
      awards: "Awards",
    },
  },
  projects: {
    eyebrow: "Projects",
    title: "Featured work gallery",
    subtitle:
      "A curated selection of digital products, dashboards and visual systems focused on impact and clarity.",
    items: [
      {
        title: "Orion Commerce Suite",
        type: "E-commerce",
        description:
          "Premium platform with fast checkout, operations panel and real-time analytics.",
      },
      {
        title: "Nebula Analytics",
        type: "Data",
        description:
          "Strategic dashboard with modular visualization, live alerts and insight layers.",
      },
      {
        title: "Astra Fitness",
        type: "Mobile",
        description:
          "Habit app with personalized coaching, micro animations and onboarding flow.",
      },
      {
        title: "Atlas Travel",
        type: "Web",
        description:
          "Platform redesign for bookings with emphasis on speed and conversion.",
      },
      {
        title: "Studio Brand Core",
        type: "Brand",
        description:
          "Visual system with usage guides, components and assets for product teams.",
      },
      {
        title: "Lumen Dashboard",
        type: "SaaS",
        description:
          "Operational panel with secure flows, empty states and fast analysis modes.",
      },
    ],
  },
  tech: {
    eyebrow: "Technologies",
    title: "Creative & technical stack",
    subtitle:
      "I use modern tools to build fluid, scalable experiences with their own identity.",
    cards: [
      {
        title: "Process",
        description:
          "Discovery, prototypes and early validation for data-driven decisions.",
      },
      {
        title: "Systems",
        description:
          "Design tokens, libraries and documentation ready for distributed teams.",
      },
      {
        title: "Delivery",
        description:
          "Clean components optimized for performance and clear handoff.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Ready for a new launch",
    subtitle: "Let's talk about product, design or frontend development.",
    heading: "Let's turn ideas into solid experiences.",
    body: "I'm available for freelance projects, product teams and UX/UI consulting. I respond quickly with clear proposals.",
    sendEmail: "Send email",
    openWhatsApp: "Open WhatsApp",
    open: "Open",
    email: "Email",
    whatsApp: "WhatsApp",
    directChat: "Direct chat",
  },
  secret: {
    hint: "Secret active. Tap the profile core.",
  },
};

const es = {
  nav: {
    profile: "Perfil",
    projects: "Proyectos",
    tech: "Tecnologias",
    contact: "Contacto",
    menu: "Menu",
    close: "Cerrar",
  },
  hero: {
    greeting: "Hola, soy Basher",
    title: "UX/UI Designer y Frontend Engineer",
    bio: "Diseno y construyo productos digitales con un sistema claro, identidad visual fuerte y codigo limpio. El objetivo es simple: interfaces que se sienten premium y responden rapido.",
    cardCaption:
      "UX, UI, estrategia y codigo con foco en claridad, rendimiento y valor de producto.",
    viewProjects: "Ver proyectos",
    directContact: "Contacto directo",
    nebulaMode: "Nebula mode active",
    openCollab: "Abierto a nuevas colaboraciones",
    skills: [
      "Product strategy",
      "Design systems",
      "React engineering",
      "Motion design",
    ],
    stats: {
      experience: "Experiencia",
      clients: "Clientes",
      projects: "Proyectos",
      awards: "Premios",
    },
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Galeria de trabajos destacados",
    subtitle:
      "Una seleccion curada de productos digitales, dashboards y sistemas visuales con foco en impacto y claridad.",
    items: [
      {
        title: "Orion Commerce Suite",
        type: "E-commerce",
        description:
          "Plataforma premium con checkout rapido, panel de operaciones y analitica en tiempo real.",
      },
      {
        title: "Nebula Analytics",
        type: "Data",
        description:
          "Dashboard estrategico con visualizacion modular, alertas en vivo y capas de insight.",
      },
      {
        title: "Astra Fitness",
        type: "Mobile",
        description:
          "App de habitos con coaching personalizado, micro animaciones y flujo de onboarding.",
      },
      {
        title: "Atlas Travel",
        type: "Web",
        description:
          "Redisenio de plataforma para reservas con enfasis en velocidad y conversion.",
      },
      {
        title: "Studio Brand Core",
        type: "Brand",
        description:
          "Sistema visual con guias de uso, componentes y activos para equipos de producto.",
      },
      {
        title: "Lumen Dashboard",
        type: "SaaS",
        description:
          "Panel operativo con flujos seguros, estados vacios y modos de analisis rapido.",
      },
    ],
  },
  tech: {
    eyebrow: "Tecnologias",
    title: "Stack creativo y tecnico",
    subtitle:
      "Uso herramientas modernas para construir experiencias fluidas, escalables y con identidad propia.",
    cards: [
      {
        title: "Proceso",
        description:
          "Discovery, prototipos y validacion temprana para tomar decisiones con datos.",
      },
      {
        title: "Sistemas",
        description:
          "Design tokens, librerias y documentacion lista para equipos distribuidos.",
      },
      {
        title: "Entrega",
        description:
          "Componentes limpios, optimizados para rendimiento y handoff claro.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Listo para un nuevo lanzamiento",
    subtitle: "Conversemos sobre producto, diseno o desarrollo frontend.",
    heading: "Transformemos ideas en experiencias solidas.",
    body: "Estoy disponible para proyectos freelance, equipos de producto y consultoria UX/UI. Respondo rapido y con propuestas claras.",
    sendEmail: "Enviar correo",
    openWhatsApp: "Abrir WhatsApp",
    open: "Abrir",
    email: "Correo",
    whatsApp: "WhatsApp",
    directChat: "Chat directo",
  },
  secret: {
    hint: "Secreto activo. Toca el nucleo del perfil.",
  },
};

const locales = { en, es };

const I18nContext = createContext(null);

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const t = useCallback(
    (path) => {
      const keys = path.split(".");
      let node = locales[lang];
      for (const key of keys) {
        if (node === undefined) return path;
        node = node[key];
      }
      return node ?? path;
    },
    [lang],
  );

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t, toggle }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
