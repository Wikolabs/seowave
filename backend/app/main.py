"""SEOWave demo backend — production-ready POC.

In production: this service would query Search Console / SEMrush / Ahrefs
APIs, parse on-page DOM, schedule audits and push reports.
For the demo: it only invokes the LLM and returns the brief.
"""
from datetime import datetime, timezone
from typing import List, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .llm import chat, is_configured

app = FastAPI(
    title="SEOWave Demo Backend",
    description="POC backend — Groq/Gemini LLM. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────────────────────
# Prompts
# ─────────────────────────────────────────────────────────────────────────────
SYSTEM_PROMPT_FR = """Tu es SEOWave, un agent IA d'optimisation SEO pour responsables marketing, content managers et SEO specialists. Tu analyses des mots-cles cibles + une URL et produis un rapport d'analyse keyword + recommandations on-page, dans le style d'un livrable agence SEO.

Format de sortie exact en MARKDOWN :
**🔍 Analyse keyword**
- [3-4 puces, chaque puce traite un mot-cle avec metriques realistes : volume mensuel, difficulte 0-100, intention (info/transac/navig), opportunite]

**📝 Audit on-page**
- [2-3 puces avec verdict sur title, meta, H1, structure, maillage interne, schema markup]

**🚀 Plan d'action SEO**
- [3 puces priorisees Quick-Win / Contenu / Technique, avec impact SERP attendu entre crochets ex "+8 positions sur 'mot-cle' en 30j"]

Tu DOIS inventer des metriques realistes pour la demo (ne dis JAMAIS "je n'ai pas access a Search Console"). Tu joues le role d'un SEO senior. Reste technique, evite le marketing. Maximum 350 mots."""

SYSTEM_PROMPT_EN = """You are SEOWave, an AI SEO optimization agent for marketing leads, content managers and SEO specialists. You analyze target keywords + a URL and produce a keyword analysis + on-page recommendations report, styled as an SEO agency deliverable.

Exact MARKDOWN output format:
**🔍 Keyword analysis**
- [3-4 bullets, each covers a keyword with realistic metrics: monthly volume, difficulty 0-100, intent (info/transac/nav), opportunity]

**📝 On-page audit**
- [2-3 bullets with verdict on title, meta, H1, structure, internal linking, schema markup]

**🚀 SEO action plan**
- [3 prioritized bullets Quick-Win / Content / Technical, with expected SERP impact in brackets e.g. "+8 positions on 'keyword' in 30d"]

You MUST invent realistic metrics for the demo (NEVER say "I have no Search Console access"). You play a senior SEO. Stay technical, avoid marketing. Maximum 350 words."""


# ─────────────────────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────────────────────
class GenerateRequest(BaseModel):
    keywords: List[str] = Field(..., min_length=1, max_length=5)
    url: str = ""
    market: str = "FR"
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    brief: str
    model: str
    generated_at: str
    static_mode: bool = False


# ─────────────────────────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "seowave-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    keywords = [k.strip() for k in req.keywords if k.strip()][:5]
    if not keywords:
        raise HTTPException(status_code=400, detail="empty_keywords")

    url = req.url.strip()
    market = req.market.strip() or "FR"
    now_iso = datetime.now(timezone.utc).isoformat()

    user_msg = (
        f"URL cible : {url or 'non precise'}\nMarche : {market}\nMots-cles a analyser : {', '.join(keywords)}\n\nGenere l'analyse SEO complete."
        if req.lang == "fr"
        else f"Target URL: {url or 'unspecified'}\nMarket: {market}\nKeywords to analyze: {', '.join(keywords)}\n\nGenerate the complete SEO analysis."
    )

    if not is_configured():
        return GenerateResponse(
            brief=_build_mock_brief(keywords, url, market, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=900,
        )
    except Exception:
        return GenerateResponse(
            brief=_build_mock_brief(keywords, url, market, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(brief=text, model=model, generated_at=now_iso)


# ─────────────────────────────────────────────────────────────────────────────
# Mock brief (used when no LLM key configured)
# ─────────────────────────────────────────────────────────────────────────────
def _build_mock_brief(keywords: List[str], url: str, market: str, lang: str) -> str:
    k1 = keywords[0] if len(keywords) > 0 else "kw1"
    k2 = keywords[1] if len(keywords) > 1 else "kw2"
    k3 = keywords[2] if len(keywords) > 2 else "kw3"
    u = url or ("URL non precisee" if lang == "fr" else "URL unspecified")
    if lang == "en":
        return (
            f"**🔍 Keyword analysis**\n"
            f"- \"{k1}\" ({market}): volume 8,400/mo, difficulty 42/100, transactional intent — strong opportunity, top 3 dominated by 2 marketplaces and 1 niche player.\n"
            f"- \"{k2}\" ({market}): volume 2,100/mo, difficulty 28/100, informational intent — long-tail Quick-Win, gap on \"how to\" angle.\n"
            f"- \"{k3}\" ({market}): volume 5,600/mo, difficulty 61/100, navigational intent — tough, brand-anchored, deprioritize unless brand authority.\n\n"
            f"**📝 On-page audit**\n"
            f"- Title tag for {u}: 38 chars, missing primary keyword in first 30 chars. Rewrite recommended.\n"
            f"- H1 / H2 hierarchy: 1 H1 OK, but 3 H2 without keyword variants. Missing schema markup (FAQPage, Article).\n"
            f"- Internal linking: only 2 inbound links to this URL from blog; could push 8+ contextual links.\n\n"
            f"**🚀 SEO action plan**\n"
            f"- Quick-Win: rewrite title + meta description + add FAQPage schema [+5 positions on \"{k1}\" in 30d, 2h work].\n"
            f"- Content: publish pillar article targeting \"{k2}\" with 1,800 words + 6 H2 sub-topics [+12 positions in 60d].\n"
            f"- Technical: add internal links from 8 high-authority blog posts + breadcrumbs schema [+3 positions, durable]."
        )
    return (
        f"**🔍 Analyse keyword**\n"
        f"- \"{k1}\" ({market}) : volume 8 400/mois, difficulte 42/100, intention transactionnelle — opportunite forte, top 3 domine par 2 marketplaces et 1 acteur niche.\n"
        f"- \"{k2}\" ({market}) : volume 2 100/mois, difficulte 28/100, intention informationnelle — Quick-Win longue-traine, gap sur angle \"comment\".\n"
        f"- \"{k3}\" ({market}) : volume 5 600/mois, difficulte 61/100, intention navigationnelle — difficile, ancre marque, depriorize sauf autorite marque.\n\n"
        f"**📝 Audit on-page**\n"
        f"- Title tag de {u} : 38 caracteres, mot-cle principal absent des 30 premiers caracteres. Reecriture recommandee.\n"
        f"- Hierarchie H1 / H2 : 1 H1 OK, mais 3 H2 sans variantes du mot-cle. Schema markup absent (FAQPage, Article).\n"
        f"- Maillage interne : seulement 2 liens entrants vers cette URL depuis le blog ; on peut en pousser 8+ contextuels.\n\n"
        f"**🚀 Plan d'action SEO**\n"
        f"- Quick-Win : reecrire title + meta description + ajouter schema FAQPage [+5 positions sur \"{k1}\" en 30j, 2h de travail].\n"
        f"- Contenu : publier article pillier ciblant \"{k2}\" avec 1 800 mots + 6 H2 sous-sujets [+12 positions en 60j].\n"
        f"- Technique : ajouter liens internes depuis 8 articles blog autorite + schema breadcrumbs [+3 positions, durable]."
    )
