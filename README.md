# SEOWave — Monitoring et optimisation SEO continue par IA

> Vos positions surveillées en temps réel. Les opportunités identifiées avant vos concurrents.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat&logo=redis)](https://redis.io)

---

## Vue d'ensemble

SEOWave est une plateforme de monitoring SEO et d'optimisation de contenu pilotée par IA. Elle surveille les positions Google quotidiennement, analyse les SERPs, détecte les opportunités de mots-clés, audite techniquement les pages, et génère des recommandations de contenu optimisées via LLM. Le tout centralisé en un tableau de bord orienté résultats business.

**Domaine :** SEO / Content Marketing / Growth  
**Port VM :** 3027 | **Sous-domaine :** seowave.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts | Dashboard positions, opportunités, audits |
| Backend | FastAPI (Python 3.11), Uvicorn | API ranking, crawl, analyse, recommendations |
| SERP Data | SerpAPI / DataForSEO | Positions Google, featured snippets, PAA |
| Crawler | Playwright (headless) | Audit technique pages (Core Web Vitals) |
| NLP/LLM | Groq (llama-3.1-70b) | Génération contenu SEO optimisé |
| Scheduling | APScheduler | Crawl positions quotidien |
| Base de données | PostgreSQL 16 | Historique positions, pages, mots-clés |
| Cache | Redis 7 | SERP cache, rate limiting |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3027) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
groq==0.9.0
playwright==1.44.0
apscheduler==3.10.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
redis==5.0.4
pydantic==2.7.1
httpx==0.27.0
beautifulsoup4==4.12.3
pandas==2.2.2
```

---

## Architecture mono-repo

```
seowave/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx              # Dashboard positions + visibilité
│   │   ├── keywords/             # Suivi mots-clés + opportunités
│   │   ├── pages/                # Audit technique par page
│   │   ├── content/              # Recommandations contenu LLM
│   │   └── competitors/          # Analyse concurrents SERP
│   └── src/components/
│       ├── RankingChart.tsx      # Évolution positions Recharts
│       ├── KeywordTable.tsx      # Tableau mots-clés + metrics
│       ├── OpportunityCard.tsx   # Opportunité volume/difficulté
│       ├── TechnicalAudit.tsx    # Core Web Vitals + audit
│       └── ContentBrief.tsx      # Brief optimisation LLM
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── rankings.py       # Positions + historique
│   │   │   ├── keywords.py       # Research + opportunités
│   │   │   ├── audit.py          # Audit technique Playwright
│   │   │   └── content.py        # LLM content recommendations
│   │   ├── services/
│   │   │   ├── serp_tracker.py   # SerpAPI / DataForSEO
│   │   │   ├── crawler.py        # Playwright technical audit
│   │   │   ├── opportunity.py    # Volume × difficulté scoring
│   │   │   └── content_gen.py    # Groq briefs optimisation
│   │   └── models/
│   │       └── keyword.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0f4c81', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1565c0', 'lineColor': '#374151', 'secondaryColor': '#e3f2fd'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3027)"]
        NEXT["Next.js 14\nSEO Dashboard"]
        API["FastAPI"]

        subgraph SEO["🔍 SEO Engine"]
            SERP["SERP Tracker\nPositions quotidiennes"]
            CRAWLER["Playwright\nTechnical audit"]
            OPP["Opportunity Finder\nVolume × difficulté"]
            LLM["Groq LLM\nContent briefs"]
        end

        PG[("PostgreSQL\nKeywords + Rankings")]
        REDIS[("Redis\nSERP cache")]
    end

    SERPAPI["SerpAPI\nGoogle positions"] --> SERP
    SCHED["APScheduler\nDaily crawl"] --> SERP
    SCHED --> CRAWLER
```

### Séquence — Suivi de position et recommandation contenu

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0f4c81', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant SCHED as APScheduler
    participant API as FastAPI
    participant SERP as SerpAPI
    participant CRAWLER as Playwright
    participant GROQ as Groq LLM
    participant SEO as SEO Manager

    SCHED->>API: daily_ranking_check()
    API->>SERP: get_positions(keywords=["logiciel CRM", "CRM PME"], location="France")
    SERP-->>API: [{keyword: "logiciel CRM", position: 12, prev: 18, featured: false}, ...]

    API->>CRAWLER: audit_page(url="/blog/meilleur-crm", check=[LCP, FID, CLS])
    CRAWLER-->>API: {LCP: 4.2s, FID: 180ms, CLS: 0.18, status: "needs_improvement"}

    Note over API: Position remontée +6 → opportunité détectée
    API->>GROQ: generate_content_brief(keyword="logiciel CRM", position=12, top_competitors_content)
    GROQ-->>API: {title: "Meilleur logiciel CRM...", sections: ["Comparatif 2024", "Prix", "Avis"], word_target: 2400, internal_links: [...]}

    API->>API: compute_opportunity_score(volume=8100, difficulty=42, position=12)
    Note over API: Score = 74/100 (volume élevé, difficulté modérée, position page 2)

    API-->>SEO: alert {keyword, opportunity_score: 74, content_brief, technical_issues: ["LCP trop lent"]}
    SEO-->>API: schedule_optimization(page_id, brief_id)
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0f4c81', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    KEYWORD {
        uuid id PK
        string term
        string language
        string location
        int search_volume
        float difficulty_score
        string intent
        timestamp created_at
    }
    RANKING {
        uuid id PK
        uuid keyword_id FK
        uuid page_id FK
        int position
        boolean featured_snippet
        boolean people_also_ask
        timestamp checked_at
    }
    PAGE {
        uuid id PK
        string url
        string title
        float lcp_seconds
        float cls_score
        int fid_ms
        string audit_status
        timestamp last_crawled
    }
    CONTENT_BRIEF {
        uuid id PK
        uuid keyword_id FK
        uuid page_id FK
        text title_suggestion
        jsonb sections
        int word_target
        string priority
        boolean is_applied
        timestamp generated_at
    }
    OPPORTUNITY {
        uuid id PK
        uuid keyword_id FK
        float score
        string type
        string status
        timestamp detected_at
    }

    KEYWORD ||--o{ RANKING : "tracked_as"
    KEYWORD ||--o{ OPPORTUNITY : "generates"
    KEYWORD ||--o{ CONTENT_BRIEF : "needs"
    PAGE ||--o{ RANKING : "ranks_for"
    PAGE ||--o{ CONTENT_BRIEF : "optimized_by"
```

---

## PRD

### Problème
Le SEO reste une boîte noire pour la plupart des équipes marketing. Les positions fluctuent sans qu'on comprenne pourquoi. Les opportunités de mots-clés sont identifiées avec des semaines de retard. L'audit technique est fait une fois par an. Les recommandations de contenu sont génériques et non actionnables.

### Solution
SEOWave automatise la veille quotidienne des positions, alerte sur les variations significatives (hausse et baisse), identifie les mots-clés avec le meilleur ratio volume/difficulté/position actuelle, et génère des briefs de contenu précis et actionnables via IA.

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| SEO Manager | Suivi quotidien positions, alertes, reporting automatique |
| Content Writer | Briefs optimisés avec structure et cibles de mots |
| Growth/CMO | Vue global visibilité SEO + impact business |

### OKRs
- Détection variation de position : < 24h
- Précision positions vs Google Search Console : ±1 position
- Taux d'implémentation des briefs : 70% dans les 30 jours

---

## User Stories

```
US-01 [SEO] En tant que SEO Manager,
      je veux recevoir chaque matin un rapport des 10 plus grandes
      variations de position (hausse et baisse)
      afin de prioriser mes actions du jour.

US-02 [SEO] En tant que SEO Manager,
      je veux voir un score d'opportunité pour chaque mot-clé
      calculé sur volume × (1-difficulté) × (position_boost_potentiel)
      afin de savoir sur quoi concentrer mes efforts d'optimisation.

US-03 [Content] En tant que Content Writer,
      je veux recevoir un brief de contenu complet pour un mot-clé cible
      incluant structure, nombre de mots, maillage interne suggéré, et exemples
      afin d'optimiser ma page sans être un expert SEO.

US-04 [SEO] En tant que SEO Manager,
      je veux voir les Core Web Vitals de chaque page
      avec les problèmes identifiés et leur impact estimé sur le ranking
      afin de prioriser les optimisations techniques.

US-05 [CMO] En tant que CMO,
      je veux voir l'évolution de la visibilité globale du domaine
      (somme positions pondérée par volume) sur 12 mois
      afin de mesurer le ROI de la stratégie SEO.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | Position tracking | Check quotidien 6h du matin (hors week-end) | ✅ Schedule badge |
| R2 | Alert seuil | Variation ≥ 5 positions → alerte email | ✅ Alert threshold |
| R3 | Top 3 / page 1 / page 2 | Segmentation positions : 1-3, 4-10, 11-20 | ✅ Position band |
| R4 | Opportunity score | Volume (40%) × Difficulté inverse (30%) × CTR potentiel (30%) | ✅ Score breakdown |
| R5 | Core Web Vitals | LCP < 2.5s = good, FID < 100ms = good, CLS < 0.1 = good | ✅ CWV gauge |
| R6 | Cannibalisation | ≥ 2 pages sur le même mot-clé → alerte | ✅ Cannibal flag |
| R7 | Featured Snippet | Tracking position 0 séparément | ✅ FS badge |
| R8 | Compétiteurs | Top 5 domaines concurrents dans les SERPs | ✅ Competitor rank |
| R9 | Content brief | Brief = titre + plan + nb mots + LSI keywords + internal links | ✅ Brief viewer |
| R10 | Historique | 12 mois de données positions conservées | ✅ History chart |

---

## Spécification API

**Base URL :** `http://seowave.wikolabs.com/api/v1`

### GET /rankings/summary
```json
// Response: {"domain": "wikolabs.com", "keywords_tracked": 247, "avg_position": 18.4, "top10_count": 43, "visibility_score": 2840, "week_change": +12}
```

### GET /keywords/opportunities
```json
// Response: {"opportunities": [{"term": "logiciel CRM PME", "volume": 2400, "difficulty": 38, "current_position": 14, "opportunity_score": 74, "recommended_action": "optimize_existing_page"}]}
```

### POST /content/brief
```json
{"keyword_id": "k_xyz", "page_id": "p_abc"}
// Response (SSE): stream → {"title": "...", "sections": [...], "word_target": 2400, "lsi_keywords": [...]}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Ranking Chart** | Évolution positions sur 90 jours par mot-clé (Recharts LineChart) |
| **Opportunity Table** | Tableau trié par score d'opportunité avec filtres |
| **Technical Audit** | Score CWV par page avec gauge vert/orange/rouge |
| **Content Brief** | Affichage brief LLM : titre, plan, mots cibles, suggestions |
| **Competitor Grid** | Top 5 concurrents avec leurs positions sur vos mots-clés cibles |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: seowave, POSTGRES_USER: sw_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  redis:
    image: redis:7-alpine
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://sw_user:${POSTGRES_PASSWORD}@postgres/seowave
      GROQ_API_KEY: "${GROQ_API_KEY}"
      SERPAPI_KEY: "${SERPAPI_KEY}"
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]
    expose: ["8000"]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3027:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Position tracking quotidien
- [ ] Dashboard positions + historique
- [ ] Alertes variations

### Phase 2 — Intelligence
- [ ] Opportunity scoring
- [ ] Content brief LLM
- [ ] Audit technique CWV

### Phase 3 — Compétitivité
- [ ] Analyse concurrents SERPs
- [ ] Cannibalisation detection
- [ ] Intégration Google Search Console

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*
