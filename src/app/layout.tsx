import type { Metadata } from "next";
import { Passion_One, Poppins } from "next/font/google";
import "./globals.css";

const passionOne = Passion_One({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-display", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "SEOWave — 100 articles SEO optimisés livrés chaque mois",
  description: "Machine à contenu SEO automatisée. Recherche de mots-clés IA, rédaction E-E-A-T, publication WordPress/Webflow. +340% de trafic en 6 mois.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${passionOne.variable} ${poppins.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#f0fdf4" }}>{children}</body>
    </html>
  );
}
