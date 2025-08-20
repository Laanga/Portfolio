import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="border-t border-foreground/10 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-medium">¿Hablamos?</h3>
            <p className="text-sm text-foreground/70 mt-1">
              Abierto a colaboraciones y proyectos freelance.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="mailto:contacto@miportafolio.dev"
              aria-label="Enviar email"
              tabIndex={0}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-foreground/20 hover:border-foreground/40 transition-colors"
            >
              contacto@miportafolio.dev
            </a>
            <a
              href="https://www.linkedin.com/"
              aria-label="Abrir LinkedIn"
              tabIndex={0}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <p className="text-xs text-foreground/50 mt-8">© {new Date().getFullYear()} Mi Portafolio</p>
      </div>
    </footer>
  );
};

export default Footer;


