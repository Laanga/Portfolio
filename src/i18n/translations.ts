// Spanish translations
export const es = {
  // Navigation
  navigation: {
    mainAriaLabel: "Navegación principal",
    about: "Sobre mí",
    experience: "Experiencia",
    education: "Formación",
    projects: "Proyectos",
    homeAriaLabel: "Inicio",
    menuAriaLabel: "Menú",
    languageLabel: "IDIOMA",
    switchLanguageLabel: "EN",
    switchLanguageAriaLabel: "Cambiar idioma a inglés"
  },

  // About section
  about: {
    title: "Sobre mí",
    statement: "Construyo productos web reales, con la IA trabajando a mi lado",
    description1: "Actualmente trabajo como Desarrollador de Software en Neural.ONE, desarrollando landing pages, aplicaciones web y formatos interactivos para clientes del sector publicitario.",
    description2: "Mi día a día es React, Next.js, Node.js y Python, con la IA integrada en todo el proceso: uso Claude Code y Codex para planificar, programar, revisar y refactorizar, y he creado skills propias que automatizan el trabajo repetitivo. La IA acelera; las decisiones técnicas y la calidad las sigo controlando yo.",
    professionalSkillsTitle: "Habilidades Profesionales",
    stackTitle: "Stack Tecnológico",
    stackDescription: "Tecnologías con las que diseño, construyo, automatizo y despliego productos digitales completos, con agentes de IA en todo el ciclo.",
    frontendStackTitle: "Frontend",
    backendStackTitle: "Backend",
    cloudStackTitle: "Cloud / DevOps & Tooling",
    aiStackTitle: "IA y agentes",
    professionalSkills: [
      "Interfaces con React y Next.js",
      "APIs y backend con Node.js",
      "Desarrollo con agentes de IA",
      "Automatización con Python",
      "Tracking y analítica digital",
      "Despliegue y CI/CD"
    ]
  },

  // Experience section
  experience: {
    title: "Experiencia",
    subtitle: "Experiencia profesional",
    watermark: "TRABAJO",
    experiences: [
      {
        title: "Desarrollador de Software",
        company: "Neural.ONE",
        period: "Marzo 2025 - Actualidad",
        achievements: [
          "Desarrollo de landing pages y aplicaciones web con React y Node.js, entregadas en ciclos de 1 a 2 semanas con revisión directa del cliente",
          "Estandarización de la estructura base de banners rich media, reduciendo aproximadamente un 60 % los errores de renderizado",
          "Automatización del trafficking de campañas con scripts de Python y skills propias de Claude Code (subida de creatividades a S3, montaje de VAST y validación de configuraciones), ahorrando aproximadamente 5 horas semanales de trabajo manual",
          "Implementación de tracking y analítica para medir conversión y rendimiento de campañas digitales"
        ]
      }
    ]
  },

  // Education section
  education: {
    title: "Formación",
    subtitle: "Formación académica",
    degree: {
      title: "Grado Superior en Desarrollo de Aplicaciones Web",
      institution: "I.E.S GASPAR MELCHOR DE JOVELLANOS",
      date: "Septiembre 2023 - Junio 2025",
      location: "Fuenlabrada, Madrid"
    },
    languagesLabel: "Idiomas",
    languages: "Español nativo · Inglés B2"
  },

  // Projects section
  projects: {
    title: "Proyectos",
    featuredLabel: "Proyectos destacados",
    selectedLine1: "TRABAJO",
    selectedLine2: "SELECCIONADO",
    introDescription: "Tres productos que muestran cómo resuelvo retos de interfaz, datos, APIs y arquitectura.",
    projectLabel: "PROYECTO",
    viewDemo: "Ver demo",
    viewCode: "Ver código",
    projectsList: [
      {
        title: "GridRush",
        description: "Plataforma web para gestionar competiciones de karting, desde la inscripción de pilotos y las carreras hasta las clasificaciones en tiempo real. Arquitectura cliente-servidor con React y una API REST en Node.js y Express."
      },
      {
        title: "DeltaZero",
        description: "Panel de análisis de Fórmula 1 con telemetría comparativa de hasta cinco pilotos, mapa de circuito sincronizado y análisis de degradación y estrategia. Arquitectura frontend estática sobre OpenF1 y Jolpica, con cola de peticiones, carga paralela tolerante a fallos y cálculos derivados en el cliente."
      },
      {
        title: "Kata (型)",
        description: "Plataforma Full Stack para organizar libros, videojuegos, películas y series con autenticación y datos persistidos en Supabase (PostgreSQL). Integra TMDB, IGDB y Google Books y ofrece búsqueda y filtrado inmediato desde el cliente."
      }
    ]
  },

  // Profile
  profile: {
    jobTitle: "Desarrollador de Software",
    location: "Madrid, España",
    downloadCV: "Descargar CV",
    email: "alvarolanga04@gmail.com"
  },

  // Hero section
  hero: {
    description: "Desarrollador Full Stack que trabaja con agentes de IA a diario. Construyo con React, Next.js y Node.js, y uso Claude Code y Codex para llevar ideas a producción más rápido, sin perder el control del código.",
    contact: "Contacto",
    availability: "Abierto a nuevas oportunidades",
    roleLine1: "DESARROLLADOR",
    roleLine2: "FULL STACK",
    terminal: "whoami"
  },

  // Footer
  footer: {
    title: "¿Hablamos?",
    description: "Abierto a nuevas oportunidades en equipos de producto y desarrollo.",
    email: "alvarolanga04@gmail.com",
    contactLabel: "Contacto",
    role: "Desarrollador de Software",
    locationLabel: "MADRID / ESPAÑA",
    remoteAvailability: "DISPONIBLE EN REMOTO",
    ctaLine1: "CONSTRUYAMOS",
    ctaLine2: "ALGO.",
    writeMe: "Escríbeme",
    copyEmail: "Copiar email",
    copied: "Copiado",
    terminalCommand: "mail --to",
    indexTitle: "Índice",
    contactTitle: "Contacto",
    statusTitle: "Estado",
    home: "Inicio",
    backToTop: "Volver arriba",
    epigraph: "Dédalo construyó unas alas para salir del laberinto. Yo construyo productos para salir de los tuyos.",
    madeIn: "Hecho en Madrid"
  },

  // Greek mythology illustrations
  myth: {
    chapter: "El oficio de Dédalo",
    art: {
      icarus: "Grabado de Ícaro cayendo del cielo, de Hendrick Goltzius (1588)",
      daedalus: "Grabado de Dédalo ajustando las alas a Ícaro antes de enseñarle a volar",
      forge: "Grabado de la fragua de Vulcano, con herreros golpeando el yunque, de Francesco Primaticcio",
      apollo: "Cabeza esculpida del Apolo de Belvedere"
    }
  }
} as const;

// English translations
export const en = {
  // Navigation
  navigation: {
    mainAriaLabel: "Main navigation",
    about: "About",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    homeAriaLabel: "Home",
    menuAriaLabel: "Menu",
    languageLabel: "LANGUAGE",
    switchLanguageLabel: "ES",
    switchLanguageAriaLabel: "Switch language to Spanish"
  },

  // About section
  about: {
    title: "About Me",
    statement: "I build real web products, with AI working alongside me",
    description1: "I currently work as a Software Developer at Neural.ONE, building landing pages, web applications and interactive formats for clients in the advertising industry.",
    description2: "My day-to-day is React, Next.js, Node.js and Python, with AI built into the whole process: I use Claude Code and Codex to plan, write, review and refactor code, and I have built my own skills that automate repetitive work. AI speeds things up; technical decisions and quality stay with me.",
    professionalSkillsTitle: "Professional Skills",
    stackTitle: "Tech Stack",
    stackDescription: "Technologies I use to design, build, automate and deploy complete digital products, with AI agents across the whole cycle.",
    frontendStackTitle: "Frontend",
    backendStackTitle: "Backend",
    cloudStackTitle: "Cloud / DevOps & Tooling",
    aiStackTitle: "AI & Agents",
    professionalSkills: [
      "React & Next.js Interfaces",
      "APIs & Backend with Node.js",
      "AI Agent-Driven Development",
      "Python Automation",
      "Tracking & Digital Analytics",
      "Deployment & CI/CD"
    ]
  },

  // Experience section
  experience: {
    title: "Experience",
    subtitle: "Professional experience",
    watermark: "WORK",
    experiences: [
      {
        title: "Software Developer",
        company: "Neural.ONE",
        period: "March 2025 - Present",
        achievements: [
          "Built landing pages and web applications with React and Node.js, delivering in 1 to 2-week cycles with direct client reviews",
          "Standardized the base structure for rich media banners, reducing rendering issues by approximately 60%",
          "Automated campaign trafficking with Python scripts and custom Claude Code skills (uploading creatives to S3, building VAST tags and validating configurations), saving approximately 5 hours of manual work per week",
          "Implemented tracking and analytics to measure conversion and digital campaign performance"
        ]
      }
    ]
  },

  // Education section
  education: {
    title: "Education",
    subtitle: "Academic background",
    degree: {
      title: "Higher Degree in Web Application Development",
      institution: "I.E.S GASPAR MELCHOR DE JOVELLANOS",
      date: "September 2023 - June 2025",
      location: "Fuenlabrada, Madrid"
    },
    languagesLabel: "Languages",
    languages: "Native Spanish · English B2"
  },

  // Projects section
  projects: {
    title: "Projects",
    featuredLabel: "Featured work",
    selectedLine1: "SELECTED",
    selectedLine2: "WORK",
    introDescription: "Three products that show how I solve challenges across interfaces, data, APIs and architecture.",
    projectLabel: "PROJECT",
    viewDemo: "View demo",
    viewCode: "View code",
    projectsList: [
      {
        title: "GridRush",
        description: "Web platform for managing karting competitions, from driver registration and race operations to real-time standings. Client-server architecture with React and a REST API built with Node.js and Express."
      },
      {
        title: "DeltaZero",
        description: "Formula 1 analysis dashboard with comparative telemetry for up to five drivers, a synchronized circuit map, and tyre degradation and strategy analysis. Static frontend architecture over OpenF1 and Jolpica, with request queuing, fault-tolerant parallel loading and client-side derived calculations."
      },
      {
        title: "Kata (型)",
        description: "Full Stack platform for organizing books, video games, movies and series, with authentication and data persisted in Supabase (PostgreSQL). It integrates TMDB, IGDB and Google Books and provides instant client-side search and filtering."
      }
    ]
  },

  // Profile
  profile: {
    jobTitle: "Software Developer",
    location: "Madrid, Spain",
    downloadCV: "Download CV",
    email: "alvarolanga04@gmail.com"
  },

  // Hero section
  hero: {
    description: "Full Stack Developer who works with AI agents every day. I build with React, Next.js and Node.js, and use Claude Code and Codex to take ideas to production faster without losing control of the code.",
    contact: "Contact",
    availability: "Open to new opportunities",
    roleLine1: "FULL STACK",
    roleLine2: "DEVELOPER",
    terminal: "whoami"
  },

  // Footer
  footer: {
    title: "Let's talk?",
    description: "Open to new opportunities in product and engineering teams.",
    email: "alvarolanga04@gmail.com",
    contactLabel: "Contact",
    role: "Software Developer",
    locationLabel: "MADRID / SPAIN",
    remoteAvailability: "AVAILABLE REMOTELY",
    ctaLine1: "LET’S BUILD",
    ctaLine2: "SOMETHING.",
    writeMe: "Write to me",
    copyEmail: "Copy email",
    copied: "Copied",
    terminalCommand: "mail --to",
    indexTitle: "Index",
    contactTitle: "Contact",
    statusTitle: "Status",
    home: "Home",
    backToTop: "Back to top",
    epigraph: "Daedalus built wings to escape the labyrinth. I build products to get you out of yours.",
    madeIn: "Made in Madrid"
  },

  // Greek mythology illustrations
  myth: {
    chapter: "The craft of Daedalus",
    art: {
      icarus: "Engraving of Icarus falling from the sky, by Hendrick Goltzius (1588)",
      daedalus: "Engraving of Daedalus fitting wings to Icarus before teaching him to fly",
      forge: "Engraving of Vulcan's forge, with smiths striking the anvil, by Francesco Primaticcio",
      apollo: "Sculpted head of the Apollo Belvedere"
    }
  }
} as const;

export type TranslationKeys = typeof es;
export type Language = 'es' | 'en';
