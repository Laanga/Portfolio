import React from "react";
import { MotionH2, MotionLi } from "../lib/motion";

type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

const demoProjects: Project[] = [
  {
    title: "Dashboard de analítica",
    description: "Panel con gráficos interactivos y filtros, construido con Next.js y Tailwind.",
    link: "#",
    tags: ["Next.js", "React", "TailwindCSS"],
  },
  {
    title: "Landing minimalista",
    description: "Página de marketing enfocada en conversión, rendimiento y accesibilidad.",
    link: "#",
    tags: ["UI", "SEO", "A11y"],
  },
  {
    title: "Sistema de diseño",
    description: "Colección de componentes accesibles con tokens y temas escalables.",
    link: "#",
    tags: ["Design System", "Radix", "Shadcn"],
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="proyectos" className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <MotionH2
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-2xl sm:text-3xl font-semibold"
          >
            Proyectos seleccionados
          </MotionH2>
          <a
            href="#contacto"
            aria-label="Solicitar colaboración"
            tabIndex={0}
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            ¿Colaboramos?
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoProjects.map((project, index) => (
            <MotionLi
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group rounded-2xl border border-foreground/10 hover:border-foreground/20 transition-colors p-5 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              <div className="aspect-video rounded-md bg-foreground/5 mb-4 group-hover:bg-foreground/10 transition-colors" aria-hidden />
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs rounded-full border border-foreground/15 px-2 py-0.5 text-foreground/70">{tag}</span>
                ))}
              </div>
              <a
                href={project.link}
                aria-label={`Abrir proyecto ${project.title}`}
                tabIndex={0}
                className="mt-4 inline-flex text-sm text-foreground/80 hover:text-foreground"
              >
                Ver detalle →
              </a>
            </MotionLi>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;


