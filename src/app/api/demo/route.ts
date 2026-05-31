import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In docker-compose: BACKEND_URL=http://seowave-backend:8000
// In local dev (next dev outside compose): falls back to localhost
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  let body: { keywords?: string[]; url?: string; market?: string; lang?: "fr" | "en" } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const keywords = Array.isArray(body.keywords)
    ? body.keywords.slice(0, 5).map((s) => String(s).trim()).filter(Boolean)
    : [];
  const url = typeof body.url === "string" ? body.url.trim() : "";
  const market = typeof body.market === "string" ? body.market.trim() : "FR";
  const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

  if (!keywords.length) {
    return NextResponse.json(
      { error: lang === "fr" ? "Entrez au moins un mot-cle." : "Enter at least one keyword." },
      { status: 400 }
    );
  }

  try {
    const r = await fetch(`${BACKEND_URL}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords, url, market, lang }),
      cache: "no-store",
    });
    const j = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: j.detail || "backend_error" }, { status: r.status });
    }
    return NextResponse.json({
      brief: j.brief,
      model: j.model,
      generatedAt: j.generated_at,
      staticMode: Boolean(j.static_mode),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown_error";
    return NextResponse.json({ error: `backend_unreachable: ${msg}` }, { status: 502 });
  }
}
