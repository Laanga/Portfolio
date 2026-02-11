// Spanish translations
export const es = {
  // Navigation
  navigation: {
    about: "Sobre mí",
    experience: "Experiencia", 
    education: "Formación",
    projects: "Proyectos"
  },

  // About section
  about: {
    title: "Sobre mí",
    description1: "Desarrollador Web Full Stack con experiencia en entornos profesionales de publicidad digital y desarrollo de producto. Especializado en React, Next.js y Node.js, con enfoque en crear aplicaciones web de alto rendimiento y experiencias interactivas.",
    description2: "Mi enfoque se centra en escribir código limpio y entregar soluciones eficientes. Busco seguir creciendo en equipos técnicos donde pueda aportar desde el primer día.",
    professionalSkillsTitle: "Habilidades Profesionales",
    stackTitle: "Stack Tecnológico",
    professionalSkills: [
      "Desarrollo Frontend",
      "Desarrollo Backend", 
      "Bases de datos",
      "APIs e integraciones",
      "Control de versiones",
      "Automatización",
      "Despliegue y CI/CD"
    ]
  },

  // Experience section
  experience: {
    title: "Experiencia",
    experiences: [
      {
        title: "Desarrollador de Software",
        company: "Neural.ONE",
        period: "Marzo 2025 - Presente",
        achievements: [
          "Desarrollo de landing pages y aplicaciones web para clientes del sector publicitario utilizando React y Node.js, entregando proyectos dentro de plazos ajustados",
          "Programación de anuncios interactivos y banners rich media con HTML, CSS y JavaScript, mejorando la experiencia de las campañas digitales",
          "Implementación de scripts de automatización en Python para optimizar flujos de trabajo en herramientas de trafficking, reduciendo tareas manuales repetitivas",
          "Gestión de códigos de seguimiento y tracking para la medición precisa de campañas publicitarias y recolección de datos de rendimiento"
        ]
      }
    ]
  },

  // Education section
  education: {
    title: "Formación",
    degree: {
      title: "Grado Superior Desarrollo de Aplicaciones Web",
      institution: "I.E.S GASPAR MELCHOR DE JOVELLANOS",
      date: "2023 - 2025"
    }
  },

  // Projects section
  projects: {
    title: "Proyectos",
    projectsList: [
      {
        title: "GridRush",
        description: "Plataforma web para la gestión integral de competiciones de karting: inscripción de pilotos, gestión de carreras y clasificaciones en tiempo real. Frontend con React y API REST con Node.js y Express."
      },
      {
        title: "F1 Data Explorer",
        description: "Herramienta interactiva de exploración y visualización de datos de la temporada de Fórmula 1. Análisis de estadísticas de pilotos y equipos con gráficos animados mediante GSAP, interfaz responsive con Tailwind y datos en tiempo real desde OpenF1 y Ergast."
      },
      {
        title: "Kata (型)",
        description: "Plataforma Full Stack que permite organizar libros, videojuegos, películas y series en un único espacio. Integra datos en tiempo real de APIs externas (TMDB, IGDB, Google Books) con autenticación de usuarios, dashboard de estadísticas y una interfaz dark mode con animaciones en GSAP y Tailwind CSS."
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
    description: "Desarrollador Full Stack especializado en React, Next.js y Node.js. Creo aplicaciones web de alto rendimiento con interfaces limpias y experiencias interactivas.",
    contact: "Contacto"
  },

  // Footer
  footer: {
    title: "¿Hablamos?",
    description: "Abierto a colaboraciones y proyectos freelance.",
    email: "alvarolanga04@gmail.com"
  }
} as const;

// English translations
export const en = {
  // Navigation
  navigation: {
    about: "About",
    experience: "Experience",
    education: "Education", 
    projects: "Projects"
  },

  // About section
  about: {
    title: "About Me",
    description1: "Full Stack Web Developer with professional experience in digital advertising and product development. Specialized in React, Next.js and Node.js, focused on building high-performance web applications and interactive experiences.",
    description2: "My approach focuses on writing clean code and delivering efficient solutions. I'm looking to keep growing in technical teams where I can contribute from day one.",
    professionalSkillsTitle: "Professional Skills",
    stackTitle: "Tech Stack",
    professionalSkills: [
      "Frontend Development",
      "Backend Development",
      "Databases", 
      "APIs & Integrations",
      "Version Control",
      "Automation",
      "Deployment & CI/CD"
    ]
  },

  // Experience section
  experience: {
    title: "Experience",
    experiences: [
      {
        title: "Software Developer",
        company: "Neural.ONE",
        period: "March 2025 - Present",
        achievements: [
          "Development of landing pages and web applications for advertising clients using React and Node.js, delivering projects within tight deadlines",
          "Programming of interactive ads and rich media banners with HTML, CSS and JavaScript, enhancing digital campaign experiences",
          "Implementation of Python automation scripts to optimize trafficking tool workflows, reducing repetitive manual tasks",
          "Management of tracking codes for precise measurement of advertising campaigns and performance data collection"
        ]
      }
    ]
  },

  // Education section
  education: {
    title: "Education",
    degree: {
      title: "Higher Degree in Web Application Development",
      institution: "I.E.S GASPAR MELCHOR DE JOVELLANOS", 
      date: "2023 - 2025"
    }
  },

  // Projects section
  projects: {
    title: "Projects",
    projectsList: [
      {
        title: "GridRush",
        description: "Web platform for comprehensive karting competition management: driver registration, race management and real-time standings. React frontend with Node.js and Express REST API."
      },
      {
        title: "F1 Data Explorer",
        description: "Interactive tool for exploring and visualizing Formula 1 season data. Driver and team statistics analysis with GSAP-animated charts, responsive Tailwind interface and real-time data from OpenF1 and Ergast."
      },
      {
        title: "Kata (型)",
        description: "Full Stack platform to organize books, video games, movies and series in a single space. Integrates real-time data from external APIs (TMDB, IGDB, Google Books) with user authentication, statistics dashboard and a dark mode interface with GSAP and Tailwind CSS animations."
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
    description: "Full Stack Developer specialized in React, Next.js and Node.js. I build high-performance web applications with clean interfaces and interactive experiences.",
    contact: "Contact"
  },

  // Footer
  footer: {
    title: "Let's talk?",
    description: "Open to collaborations and freelance projects.",
    email: "alvarolanga04@gmail.com"
  }
} as const;

export type TranslationKeys = typeof es;
export type Language = 'es' | 'en';
