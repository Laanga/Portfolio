import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The Dakar documentary uses relative asset paths, so it must load from
// /proyectos/dakar/ (with the slash). A config redirect can't tell it apart from
// /proyectos/dakar, so the slash is added here; the proxying itself is a rewrite
// in next.config.ts.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/proyectos/dakar") {
    return NextResponse.redirect(new URL(`/proyectos/dakar/${request.nextUrl.search}`, request.url), 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/proyectos/dakar" };
