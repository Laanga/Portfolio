# Auditoria de rendimiento (2026-02-15)

## Alcance y metodo
- Revision estatica del codigo en `/Users/langa/Projects/Portfolio/src`.
- Validacion tecnica con `npm run lint` (estado actual: limpio).
- No se pudo completar `next build` en este entorno por bloqueo de red hacia `fonts.googleapis.com`, asi que no hay metricas Lighthouse/Web Vitals de laboratorio en esta auditoria.

## Hallazgos clave

### 1) Carga inicial sobredimensionada por arquitectura client-only
- `/Users/langa/Projects/Portfolio/src/app/layout.tsx` y `/Users/langa/Projects/Portfolio/src/app/page.tsx` usan `"use client"`.
- Efecto: se hidrata una parte grande del arbol desde el inicio y se pierde oportunidad de trabajo en servidor para contenido estatico.

### 2) Demasiados efectos globales activos desde el primer render
- En `/Users/langa/Projects/Portfolio/src/app/layout.tsx` se montan siempre `LoadingScreen`, `SmoothScroll`, `SectionBackgrounds`, `PremiumBackground`, `CustomCursor` y `ScrollProgress`.
- Efecto: mayor coste de JS inicial y mas trabajo en main thread antes de interaccion.

### 3) Alta densidad de animaciones GSAP/ScrollTrigger
- Se detectan animaciones en casi todas las secciones (`Hero`, `About`, `Experience`, `Projects`, `Education`, `Footer`, etc.).
- Efecto: mas observers/timelines y potencial degradacion en dispositivos moviles o CPU limitada.

### 4) Cursor personalizado con RAF continuo en desktop
- `/Users/langa/Projects/Portfolio/src/components/CustomCursor.tsx` mantiene `requestAnimationFrame` activo y listeners sobre multiples elementos interactivos.
- Efecto: consumo constante de CPU incluso sin interaccion relevante.

### 5) Bloqueo de build por fuentes remotas
- `/Users/langa/Projects/Portfolio/src/app/layout.tsx` usa `next/font/google`.
- Efecto: dependencia de red en build para obtener fuentes; en entornos cerrados rompe compilacion.

## Mejoras ya aplicadas en esta iteracion
- Se eliminaron errores y warnings de lint (tipado y hooks).
- Se sustituyo `<img>` por `next/image` en `/Users/langa/Projects/Portfolio/src/components/ProjectsSection.tsx`.
- Se redujo trabajo por scroll en `/Users/langa/Projects/Portfolio/src/components/Navigation.tsx` (uso de `ref` para ultimo scroll + dependencias estables).
- Se acoto el cleanup de ScrollTrigger en `/Users/langa/Projects/Portfolio/src/components/SectionBackgrounds.tsx` para no matar triggers globales.
- Se eliminaron dependencias no usadas en `package.json` y lockfile.

## Plan de optimizacion (priorizado)

### P0 (alta prioridad, 1-2 dias)
1. Mover `layout` y `page` a Server Components donde sea posible.
2. Crear una capa cliente minima (por ejemplo `ClientShell`) que envuelva solo lo interactivo.
3. Mantener contenido estatico renderizado en servidor para reducir JS de hidratacion.

### P1 (media-alta, 2-4 dias)
1. Cargar de forma diferida efectos no criticos:
   - `CustomCursor`, `PremiumBackground`, `ScrollProgress`, `SectionBackgrounds`.
   - Usar `next/dynamic` con `ssr: false` para efectos puramente visuales.
2. Limitar animaciones GSAP en movil y `prefers-reduced-motion`:
   - Menos timelines simultaneas.
   - `once: true` o evitar `restart` en secciones ya vistas.
3. Revisar `LoadingScreen` para no bloquear 2.5s siempre:
   - Saltarlo en sesiones recurrentes.
   - Reducir duracion cuando el contenido principal ya este listo.

### P2 (media, 2-3 dias)
1. Optimizar cursor personalizado:
   - Pausar RAF con `visibilitychange`.
   - Delegar hover con menos listeners.
2. Centralizar el registro de `ScrollTrigger` en un unico modulo para evitar repeticion.
3. Medir y ajustar bundle por ruta tras P0/P1.

## KPI objetivo despues del plan
- Reducir JS inicial descargado e hidratado en la home.
- Mejorar LCP/INP en movil (objetivo: LCP < 2.5s, INP < 200ms en condiciones normales).
- Mantener FPS estable en scroll/animaciones en equipos de gama media.

## Proxima validacion recomendada
1. Ejecutar `npm run build` en entorno con red.
2. Pasar Lighthouse (mobile/desktop) antes y despues de P0 y P1.
3. Verificar Core Web Vitals reales con Vercel Analytics en produccion.
