import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es SEOWave, un agent IA d'optimisation SEO pour responsables marketing, content managers et SEO specialists. Tu analyses des mots-cles cibles + une URL et produis un rapport d'analyse keyword + recommandations on-page, dans le style d'un livrable agence SEO.

Format de sortie exact en MARKDOWN :
**🔍 Analyse keyword**
- [3-4 puces, chaque puce traite un mot-cle avec metriques realistes : volume mensuel, difficulte 0-100, intention (info/transac/navig), opportunite]

**📝 Audit on-page**
- [2-3 puces avec verdict sur title, meta, H1, structure, maillage interne, schema markup]

**🚀 Plan d'action SEO**
- [3 puces priorisees Quick-Win / Contenu / Technique, avec impact SERP attendu entre crochets ex "+8 positions sur 'mot-cle' en 30j"]

Tu DOIS inventer des metriques realistes pour la demo (ne dis JAMAIS "je n'ai pas access a Search Console"). Tu joues le role d'un SEO senior. Reste technique, evite le marketing. Maximum 350 mots.`;

const SYSTEM_PROMPT_EN = `You are SEOWave, an AI SEO optimization agent for marketing leads, content managers and SEO specialists. You analyze target keywords + a URL and produce a keyword analysis + on-page recommendations report, styled as an SEO agency deliverable.

Exact MARKDOWN output format:
**🔍 Keyword analysis**
- [3-4 bullets, each covers a keyword with realistic metrics: monthly volume, difficulty 0-100, intent (info/transac/nav), opportunity]

**📝 On-page audit**
- [2-3 bullets with verdict on title, meta, H1, structure, internal linking, schema markup]

**🚀 SEO action plan**
- [3 prioritized bullets Quick-Win / Content / Technical, with expected SERP impact in brackets e.g. "+8 positions on 'keyword' in 30d"]

You MUST invent realistic metrics for the demo (NEVER say "I have no Search Console access"). You play a senior SEO. Stay technical, avoid marketing. Maximum 350 words.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const keywords: string[] = Array.isArray(body.keywords) ? body.keywords.slice(0, 5).map((s: unknown) => String(s).trim()).filter(Boolean) : [];
    const url: string = typeof body.url === "string" ? body.url.trim() : "";
    const market: string = typeof body.market === "string" ? body.market.trim() : "FR";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!keywords.length) {
      return NextResponse.json(
        { error: lang === "fr" ? "Entrez au moins un mot-cle." : "Enter at least one keyword." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique — la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode — LLM key will be configured at next deploy.",
          mockBrief: buildMockBrief(keywords, url, market, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `URL cible : ${url || "non precise"}\nMarche : ${market}\nMots-cles a analyser : ${keywords.join(", ")}\n\nGenere l'analyse SEO complete.`
      : `Target URL: ${url || "unspecified"}\nMarket: ${market}\nKeywords to analyze: ${keywords.join(", ")}\n\nGenerate the complete SEO analysis.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      900
    );

    return NextResponse.json({ brief: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMockBrief(keywords: string[], url: string, market: string, lang: "fr" | "en"): string {
  const [k1, k2, k3] = [keywords[0] ?? "kw1", keywords[1] ?? "kw2", keywords[2] ?? "kw3"];
  const u = url || (lang === "fr" ? "URL non precisee" : "URL unspecified");
  if (lang === "en") {
    return `**🔍 Keyword analysis**\n- "${k1}" (${market}): volume 8,400/mo, difficulty 42/100, transactional intent — strong opportunity, top 3 dominated by 2 marketplaces and 1 niche player.\n- "${k2}" (${market}): volume 2,100/mo, difficulty 28/100, informational intent — long-tail Quick-Win, gap on "how to" angle.\n- "${k3}" (${market}): volume 5,600/mo, difficulty 61/100, navigational intent — tough, brand-anchored, deprioritize unless brand authority.\n\n**📝 On-page audit**\n- Title tag for ${u}: 38 chars, missing primary keyword in first 30 chars. Rewrite recommended.\n- H1 / H2 hierarchy: 1 H1 OK, but 3 H2 without keyword variants. Missing schema markup (FAQPage, Article).\n- Internal linking: only 2 inbound links to this URL from blog; could push 8+ contextual links.\n\n**🚀 SEO action plan**\n- Quick-Win: rewrite title + meta description + add FAQPage schema [+5 positions on "${k1}" in 30d, 2h work].\n- Content: publish pillar article targeting "${k2}" with 1,800 words + 6 H2 sub-topics [+12 positions in 60d].\n- Technical: add internal links from 8 high-authority blog posts + breadcrumbs schema [+3 positions, durable].`;
  }
  return `**🔍 Analyse keyword**\n- "${k1}" (${market}) : volume 8 400/mois, difficulte 42/100, intention transactionnelle — opportunite forte, top 3 domine par 2 marketplaces et 1 acteur niche.\n- "${k2}" (${market}) : volume 2 100/mois, difficulte 28/100, intention informationnelle — Quick-Win longue-traine, gap sur angle "comment".\n- "${k3}" (${market}) : volume 5 600/mois, difficulte 61/100, intention navigationnelle — difficile, ancre marque, depriorize sauf autorite marque.\n\n**📝 Audit on-page**\n- Title tag de ${u} : 38 caracteres, mot-cle principal absent des 30 premiers caracteres. Reecriture recommandee.\n- Hierarchie H1 / H2 : 1 H1 OK, mais 3 H2 sans variantes du mot-cle. Schema markup absent (FAQPage, Article).\n- Maillage interne : seulement 2 liens entrants vers cette URL depuis le blog ; on peut en pousser 8+ contextuels.\n\n**🚀 Plan d'action SEO**\n- Quick-Win : reecrire title + meta description + ajouter schema FAQPage [+5 positions sur "${k1}" en 30j, 2h de travail].\n- Contenu : publier article pillier ciblant "${k2}" avec 1 800 mots + 6 H2 sous-sujets [+12 positions en 60j].\n- Technique : ajouter liens internes depuis 8 articles blog autorite + schema breadcrumbs [+3 positions, durable].`;
}
