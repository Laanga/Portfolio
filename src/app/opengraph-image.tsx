import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Álvaro Langa — Full Stack Developer en Madrid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Preview card shown when the site is shared (LinkedIn, WhatsApp, X, Slack...)
export default async function OpengraphImage() {
  const icarus = await readFile(join(process.cwd(), "public/images/myth/icarus.png"));
  const icarusSrc = `data:image/png;base64,${icarus.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0000f2",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, opacity: 0.8 }}>
            LAANGA.XYZ / PORTFOLIO
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.95, letterSpacing: -2 }}>ÁLVARO</div>
            <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.95, letterSpacing: -2 }}>LANGA</div>
            <div style={{ fontSize: 36, marginTop: 28, letterSpacing: 3 }}>FULL STACK DEVELOPER</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, opacity: 0.8 }}>
            React · Next.js · Node.js · AI agents — Madrid
          </div>
        </div>
        <img src={icarusSrc} width={440} height={443} alt="" style={{ alignSelf: "center" }} />
      </div>
    ),
    size,
  );
}
