export default function SEOWavePage() {
  return (
    <div style={{ fontFamily: "var(--font-body, 'Poppins', sans-serif)", background: "#f0fdf4", minHeight: "100vh", color: "#1e293b" }}>

      {/* NAVBAR */}
      <nav style={{ background: "#ffffff", borderBottom: "1px solid #bbf7d0", position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#16a34a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 16 }}>〜</span>
            </div>
            <span style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontWeight: 700, fontSize: 22, color: "#16a34a", letterSpacing: 1 }}>SEOWave</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#fonctionnalites" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Fonctionnalités</a>
            <a href="#stats" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Résultats</a>
            <a href="#contact" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Contact</a>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" style={{ background: "#16a34a", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-display, 'Passion One', cursive)", letterSpacing: 0.5 }}>
                📅 Réserver un créneau →
              </a>
              <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20SEOWave%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" style={{ background: "#25d366", borderColor: "#25d366", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-display, 'Passion One', cursive)", letterSpacing: 0.5 }}>
                💬 WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#dcfce7", color: "#16a34a", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 20, letterSpacing: 0.5 }}>
              <span style={{ width: 8, height: 8, background: "#16a34a", borderRadius: "50%", display: "inline-block" }}></span>
              CONTENT FACTORY IA
            </div>
            <h1 style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 48, fontWeight: 700, lineHeight: 1.1, color: "#0f172a", margin: "0 0 20px", letterSpacing: 0.5 }}>
              100 articles SEO optimisés livrés chaque mois —{" "}
              <span style={{ color: "#16a34a" }}>automatiquement</span>
            </h1>
            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, margin: "0 0 36px" }}>
              Recherche de mots-clés, rédaction E-E-A-T, publication et monitoring — SEOWave fait tout tourner pendant que vous dormez. Trafic organique en pilote automatique.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" style={{ background: "#16a34a", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-display, 'Passion One', cursive)", letterSpacing: 0.5 }}>
                  📅 Réserver un créneau →
                </a>
                <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20SEOWave%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" style={{ background: "#25d366", borderColor: "#25d366", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-display, 'Passion One', cursive)", letterSpacing: 0.5 }}>
                  💬 WhatsApp →
                </a>
              </div>
              <a
                href="#fonctionnalites"
                style={{ background: "#fff", color: "#16a34a", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600, border: "2px solid #bbf7d0" }}
              >
                Voir un exemple
              </a>
            </div>
          </div>

          {/* HERO VISUAL — Content Calendar */}
          <div style={{ background: "#ffffff", borderRadius: 16, padding: 24, boxShadow: "0 24px 64px rgba(22,163,74,0.15)", border: "1px solid #bbf7d0" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: 0.5 }}>Calendrier éditorial — Mai 2025</span>
              <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>100 articles/mois</span>
            </div>

            {/* Article cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { title: "10 meilleurs CRM pour PME 2025", traffic: "+2 400 visites/mois", diff: "34", status: "Publié ✓", statusColor: "#16a34a", statusBg: "#dcfce7" },
                { title: "Comment automatiser sa prospection B2B", traffic: "+1 800 visites/mois", diff: "28", status: "Publié ✓", statusColor: "#16a34a", statusBg: "#dcfce7" },
                { title: "Guide complet LinkedIn Ads 2025", traffic: "+3 100 visites/mois", diff: "41", status: "En rédaction", statusColor: "#d97706", statusBg: "#fef3c7" },
                { title: "Meilleur logiciel de facturation freelance", traffic: "+900 visites/mois", diff: "22", status: "Planifié", statusColor: "#6366f1", statusBg: "#ede9fe" },
              ].map((card) => (
                <div key={card.title} style={{ background: "#f8fafc", borderRadius: 10, padding: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a", lineHeight: 1.4, marginBottom: 8 }}>{card.title}</div>
                  <div style={{ background: "#dcfce7", color: "#16a34a", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 8, display: "inline-block", marginBottom: 5 }}>
                    {card.traffic}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, color: "#94a3b8" }}>Difficulté: <span style={{ color: "#475569", fontWeight: 600 }}>{card.diff}</span></span>
                    <span style={{ background: card.statusBg, color: card.statusColor, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8 }}>{card.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trend chart */}
            <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "12px 14px", border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#16a34a", marginBottom: 10, letterSpacing: 0.5 }}>TRAFIC ORGANIQUE +340% EN 6 MOIS</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 44 }}>
                {[18, 24, 30, 38, 50, 65, 80, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: `rgba(22,163,74,${0.3 + i * 0.1})`, borderRadius: "3px 3px 0 0", height: `${h}%`, transition: "height 0.3s" }}></div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                {["Nov", "Déc", "Jan", "Fév", "Mar", "Avr", "Mai", "Jun"].map((m) => (
                  <span key={m} style={{ fontSize: 8, color: "#94a3b8", flex: 1, textAlign: "center" }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fonctionnalites" style={{ padding: "80px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 38, fontWeight: 700, color: "#0f172a", margin: "0 0 12px", letterSpacing: 0.5 }}>
              De la recherche à la publication —{" "}
              <span style={{ color: "#16a34a" }}>en pilote automatique</span>
            </h2>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 520, margin: "0 auto" }}>
              SEOWave couvre chaque étape du cycle de vie d'un article SEO haute performance.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
            {[
              {
                icon: "🔍",
                title: "Recherche de mots-clés IA",
                desc: "Gap analysis vs vos concurrents, opportunity scoring, clustering thématique. SEOWave trouve les mots-clés que vous raterez à la main.",
                tags: ["Gap analysis", "Opportunity score", "Clustering"],
              },
              {
                icon: "✍️",
                title: "Rédaction SEO automatique",
                desc: "Articles E-E-A-T compliant, NLP optimisé pour les moteurs. Schema markup JSON-LD inclus. Chaque article est unique, sourcé et vérifié.",
                tags: ["E-E-A-T", "NLP optimisé", "Schema markup"],
              },
              {
                icon: "📈",
                title: "Publication & monitoring",
                desc: "Sync WordPress/Webflow en un clic. Ranking tracker en temps réel. Mise à jour automatique quand l'algorithme change ou que le contenu vieillit.",
                tags: ["WordPress/Webflow", "Ranking tracker", "Auto-updates"],
              },
            ].map((f) => (
              <div key={f.title} style={{ background: "#f8fafc", borderRadius: 14, padding: 28, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 10px", letterSpacing: 0.3 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: "0 0 18px" }}>{f.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {f.tags.map((t) => (
                    <span key={t} style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" style={{ padding: "80px 24px", background: "#f0fdf4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 38, fontWeight: 700, color: "#0f172a", margin: "0 0 12px", letterSpacing: 0.5 }}>
              Des chiffres qui <span style={{ color: "#16a34a" }}>parlent d'eux-mêmes</span>
            </h2>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 460, margin: "0 auto" }}>
              Résultats observés chez nos clients actifs sur une période de 6 mois.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
            {[
              { value: "+340%", label: "de trafic organique", sub: "En 6 mois grâce au volume et à la pertinence des articles" },
              { value: "100", label: "articles/mois inclus", sub: "Recherche, rédaction, optimisation et publication comprises" },
              { value: "0", label: "rédacteur nécessaire", sub: "L'IA gère l'intégralité du pipeline éditorial" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#ffffff", borderRadius: 16, padding: "36px 28px", textAlign: "center", border: "2px solid #bbf7d0", boxShadow: "0 4px 24px rgba(22,163,74,0.08)" }}>
                <div style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 52, fontWeight: 700, color: "#16a34a", lineHeight: 1, marginBottom: 8, letterSpacing: 1 }}>{s.value}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 12px", letterSpacing: 0.5 }}>
              Actif en <span style={{ color: "#16a34a" }}>72 heures</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
            {[
              { step: "01", title: "Audit de votre niche", desc: "SEOWave analyse votre secteur et vos concurrents en moins d'une heure." },
              { step: "02", title: "Plan éditorial IA", desc: "100 sujets prioritaires classés par potentiel trafic et difficulté." },
              { step: "03", title: "Rédaction & publication", desc: "Les articles sont rédigés, optimisés et publiés automatiquement." },
              { step: "04", title: "Tracking & amélioration", desc: "Rankings monitorés, contenu mis à jour quand nécessaire." },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: "center" }}>
                <div style={{ width: 48, height: 48, background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "var(--font-display, 'Passion One', cursive)", fontWeight: 700, fontSize: 16, color: "#16a34a" }}>
                  {item.step}
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="contact" style={{ padding: "80px 24px", background: "#16a34a" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display, 'Passion One', cursive)", fontSize: 42, fontWeight: 700, color: "#ffffff", margin: "0 0 16px", lineHeight: 1.15, letterSpacing: 0.5 }}>
            Transformez votre blog en<br />machine à leads organique
          </h2>
          <p style={{ fontSize: 16, color: "#bbf7d0", margin: "0 0 36px", lineHeight: 1.7 }}>
            Rejoignez les équipes qui ont multiplié leur trafic par 4 sans recruter un seul rédacteur. Démo personnalisée sur votre secteur — sans engagement.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#ffffff", color: "#16a34a", padding: "16px 36px", borderRadius: 12, textDecoration: "none", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Passion One', cursive)", letterSpacing: 0.5 }}>
              📅 Réserver un créneau →
            </a>
            <a href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20SEOWave%20avec%20Wikolabs." target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#25d366", borderColor: "#25d366", color: "#fff", padding: "16px 36px", borderRadius: 12, textDecoration: "none", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display, 'Passion One', cursive)", letterSpacing: 0.5 }}>
              💬 WhatsApp →
            </a>
          </div>
          <div style={{ marginTop: 20, fontSize: 13, color: "#86efac" }}>
            Réponse sous 24h · Audit de niche offert · Aucun CB requis
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#052e16", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "#16a34a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14 }}>〜</span>
            </div>
            <span style={{ color: "#86efac", fontSize: 14, fontFamily: "var(--font-display, 'Passion One', cursive)", letterSpacing: 0.5 }}>SEOWave</span>
          </div>
          <div style={{ color: "#4ade80", fontSize: 13 }}>
            © 2025 SEOWave — Un produit{" "}
            <a href="https://wikolabs.com" style={{ color: "#86efac", textDecoration: "none" }}>Wikolabs</a>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="mailto:team@wikolabs.com" style={{ color: "#4ade80", fontSize: 13, textDecoration: "none" }}>team@wikolabs.com</a>
            <span style={{ color: "#4ade80" }}>·</span>
            <a href="tel:+261386626100" style={{ color: "#4ade80", fontSize: 13, textDecoration: "none" }}>+261 38 66 261 00</a>
            <span style={{ color: "#4ade80" }}>·</span>
            <a href="https://calendly.com/wikolabs" target="_blank" rel="noopener noreferrer" style={{ color: "#4ade80", fontSize: 13, textDecoration: "none" }}>Prendre RDV</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
