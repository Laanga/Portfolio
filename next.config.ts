import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Static CSP (no nonces): the page is prerendered, and Next's inline bootstrap
// scripts plus GSAP's inline styles need 'unsafe-inline'. Everything else,
// including Vercel Analytics (/_vercel/insights), is served from our own origin.
const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isDev ? "" : "upgrade-insecure-requests;"}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// Projects served from this domain under /proyectos/<name>, each deployed on its own:
// - Historia del Dakar: static site on Cloudflare Pages. Its HTML uses relative
//   paths, so it must load from /proyectos/dakar/ (src/proxy.ts adds the slash).
// - DeltaZero: Next.js app on Vercel with basePath "/proyectos/deltazero".
const DAKAR_ORIGIN = process.env.DAKAR_ORIGIN ?? "https://historiadeldakar.pages.dev";
const DELTAZERO_ORIGIN = process.env.DELTAZERO_ORIGIN ?? "https://delta-zero.vercel.app";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [{ source: "/proyectos", destination: "/#projects", permanent: false }];
  },
  async rewrites() {
    return [
      { source: "/proyectos/dakar/", destination: `${DAKAR_ORIGIN}/` },
      { source: "/proyectos/dakar/:path+", destination: `${DAKAR_ORIGIN}/:path+` },
      { source: "/proyectos/deltazero", destination: `${DELTAZERO_ORIGIN}/proyectos/deltazero` },
      { source: "/proyectos/deltazero/:path*", destination: `${DELTAZERO_ORIGIN}/proyectos/deltazero/:path*` },
    ];
  },
  async headers() {
    return [
      {
        // Every route except the proxied projects, which bring their own headers.
        source: "/((?!proyectos/(?:dakar|deltazero)(?:/|$)).*)",
        headers: securityHeaders,
      },
      // Keep the CVs (ES / EN) out of search engine indexes
      ...["/CV-Alvaro-Langa.pdf", "/CV-Alvaro-Langa-EN.pdf"].map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      })),
    ];
  },
};

export default nextConfig;
