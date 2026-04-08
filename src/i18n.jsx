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
    greeting: "Hello, I'm Brayan Ulises",
    title: "Full Stack Developer | React, Node.js & SQL",
    bio: "Computer Systems Engineer with 3+ years across the full software lifecycle using JavaScript and .NET. Focused on scalable interfaces, performance optimization, and SQL data architecture. Currently pursuing an M.S. in Statistical and Computational Analysis (Data Science) at CIMAT. Based in Aguascalientes, Mexico.",
    cardCaption:
      "Full stack delivery, UI architecture, performance tuning, and SQL data design.",
    photoAlt: "Portrait of Brayan Ulises",
    viewProjects: "View projects",
    directContact: "Direct contact",
    nebulaMode: "Signal mode active",
    openCollab: "Open to full stack roles and collaborations",
    skills: [
      "Full stack React + Node",
      "SQL Server & data design",
      "GraphQL APIs",
      "AI-assisted development",
    ],
    highlights: [
      {
        title: "INEGI design system",
        description:
          "React + Storybook library that unified UI across multiple internal apps.",
      },
      {
        title: "Ptracking performance",
        description:
          "90% faster load times with server-side filtering and pagination.",
      },
      {
        title: "SNI data platform",
        description:
          "Normalized SQL schema to improve data integrity and reporting.",
      },
    ],
    stats: {
      experience: "Years experience",
      clients: "Organizations",
      projects: "Key projects",
      awards: "Degrees",
    },
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected engineering work",
    subtitle:
      "Public-sector and private solutions focused on performance, automation, and data clarity.",
    items: [
      {
        title: "INEGI Design System",
        type: "Design System",
        description:
          "Co-created a React component library with Storybook and Styled Components to standardize UI across internal systems.",
      },
      {
        title: "BPMN Flow Engine",
        type: "Automation",
        description:
          "Built a dynamic diagram renderer with BPMN.io + React that generates workflows from JSON.",
      },
      {
        title: "Ptracking Performance",
        type: "GovTech",
        description:
          "Cut load time by 90% using server-side filtering and optimized pagination for evidence management.",
      },
      {
        title: "Comunidad Informatica",
        type: "Portal",
        description:
          "Delivered a data visualization portal with Apache ECharts and secure NAS file previews.",
      },
      {
        title: "SNI Research Registry",
        type: "Data Platform",
        description:
          "Designed and normalized the SQL schema for the state researcher registry, improving reporting integrity.",
      },
      {
        title: "QR Ticketing System",
        type: "Event Tech",
        description:
          "Developed a digital ticketing system with Angular and Node.js using dynamic QR codes.",
      },
    ],
  },
  tech: {
    eyebrow: "Technologies",
    title: "Full stack toolkit",
    subtitle:
      "Modern web, data, and automation stack with AI-assisted workflows.",
    cards: [
      {
        title: "Frontend systems",
        description:
          "React, Angular, Storybook, and Styled Components for scalable UI architecture.",
      },
      {
        title: "Backend & data",
        description:
          ".NET Core, Node.js, SQL Server, and GraphQL for robust APIs and data integrity.",
      },
      {
        title: "Delivery & DevOps",
        description:
          "Azure DevOps, Docker, Git, and Scrum to ship with quality and speed.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Ready for the next release",
    subtitle: "Open to full stack roles and collaborative projects.",
    heading: "Let's build reliable web platforms.",
    body: "Available for product teams and data-driven web projects. Fast response, clear scope, and measurable results.",
    sendEmail: "Send email",
    openWhatsApp: "Open WhatsApp",
    open: "Open",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    whatsApp: "WhatsApp",
    directChat: "Direct chat",
  },
  secret: {
    hint: "Secret active. Type the word orbit.",
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
    greeting: "Hola, soy Brayan Ulises",
    title: "Full Stack Developer | React, Node.js y SQL",
    bio: "Ingeniero en Sistemas Computacionales con mas de 3 anos de experiencia en el ciclo completo de desarrollo con JavaScript y .NET. Enfocado en interfaces escalables, optimizacion de rendimiento y arquitectura de datos SQL. Actualmente curso la Maestria en Analisis Estadistico y Computacional (Ciencia de Datos) en CIMAT. Basado en Aguascalientes, Mexico.",
    cardCaption:
      "Full stack, arquitectura UI, optimizacion de rendimiento y diseno de datos SQL.",
    photoAlt: "Retrato de Brayan Ulises",
    viewProjects: "Ver proyectos",
    directContact: "Contacto directo",
    nebulaMode: "Modo signal activo",
    openCollab: "Disponible para roles full stack y colaboraciones",
    skills: [
      "Full stack React + Node",
      "SQL Server y diseno de datos",
      "APIs con GraphQL",
      "Desarrollo con IA y agentes",
    ],
    highlights: [
      {
        title: "Design system INEGI",
        description:
          "Libreria en React + Storybook que unifico UI en apps internas.",
      },
      {
        title: "Ptracking performance",
        description:
          "90% menos tiempo de carga con filtrado y paginacion optimizada.",
      },
      {
        title: "Plataforma SNI",
        description:
          "Esquema SQL normalizado para mejorar integridad y reportes.",
      },
    ],
    stats: {
      experience: "Anos experiencia",
      clients: "Organizaciones",
      projects: "Proyectos clave",
      awards: "Grados",
    },
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Trabajo destacado en ingenieria",
    subtitle:
      "Soluciones para sector publico y privado con foco en rendimiento, automatizacion y datos claros.",
    items: [
      {
        title: "Design System INEGI",
        type: "Design System",
        description:
          "Co-cree la libreria de componentes en React con Storybook y Styled Components para estandarizar UI en sistemas internos.",
      },
      {
        title: "Motor BPMN",
        type: "Automatizacion",
        description:
          "Construccion de un render de diagramas con BPMN.io + React desde definiciones JSON.",
      },
      {
        title: "Ptracking Performance",
        type: "GovTech",
        description:
          "Reduje el tiempo de carga 90% con filtrado del lado del servidor y paginacion optimizada.",
      },
      {
        title: "Comunidad Informatica",
        type: "Portal",
        description:
          "Portal con visualizacion de datos en Apache ECharts y gestion segura de archivos NAS.",
      },
      {
        title: "Padron de Investigadores SNI",
        type: "Datos",
        description:
          "Diseno y normalizacion del esquema SQL para mejorar integridad y reportes.",
      },
      {
        title: "Ticketing QR",
        type: "Eventos",
        description:
          "Sistema de tickets digitales con Angular y Node.js y QR dinamicos.",
      },
    ],
  },
  tech: {
    eyebrow: "Tecnologias",
    title: "Stack tecnico full stack",
    subtitle:
      "Herramientas modernas para web, datos, automatizacion e IA.",
    cards: [
      {
        title: "Frontend y UI",
        description:
          "React, Angular, Storybook y Styled Components para arquitectura UI escalable.",
      },
      {
        title: "Backend y datos",
        description:
          ".NET Core, Node.js, SQL Server y GraphQL para APIs y datos confiables.",
      },
      {
        title: "Entrega y DevOps",
        description:
          "Azure DevOps, Docker, Git y Scrum para calidad y velocidad de entrega.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Listo para el siguiente release",
    subtitle: "Abierto a roles full stack y proyectos colaborativos.",
    heading: "Construyamos plataformas web solidas.",
    body: "Disponible para equipos de producto y proyectos data-driven. Respuesta rapida, alcance claro y resultados medibles.",
    sendEmail: "Enviar correo",
    openWhatsApp: "Abrir WhatsApp",
    open: "Abrir",
    email: "Correo",
    phone: "Telefono",
    linkedin: "LinkedIn",
    whatsApp: "WhatsApp",
    directChat: "Chat directo",
  },
  secret: {
    hint: "Secreto activo. Escribe la palabra orbit.",
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
