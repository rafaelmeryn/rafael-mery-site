"use client";

import { useParams, useRouter } from "next/navigation";
import { articles } from "../../articles-data";

const COLORS = {
  bg: "#FAF9F7",
  bgAlt: "#F3F1ED",
  black: "#1A1A1A",
  blackSoft: "#2C2C2C",
  gray: "#6B6560",
  grayLight: "#9B9590",
  grayMuted: "#D4CFC9",
  blueDark: "#1B2838",
  blueDeep: "#0F1923",
  copper: "#B08D6E",
  copperLight: "#C9A882",
  white: "#FFFFFF",
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: COLORS.black, background: COLORS.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 36, fontWeight: 300, marginBottom: 16 }}>Artículo no encontrado</h1>
          <button onClick={() => router.push("/")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 28px", border: `1px solid ${COLORS.blueDark}`, background: COLORS.blueDark, color: COLORS.bg, cursor: "pointer" }}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Find prev/next articles
  const currentIndex = articles.findIndex((a) => a.slug === params.slug);
  const prevArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  // Render content: split by paragraphs, handle bold markers
  const renderContent = (text) => {
    const paragraphs = text.split(/\n\n+/);
    return paragraphs.map((p, i) => {
      const trimmed = p.trim();
      if (!trimmed || trimmed === "​") return null;

      // Check if it's a bold heading/subheading
      const isBold = trimmed.startsWith("**") && trimmed.endsWith("**");
      if (isBold) {
        const headingText = trimmed.replace(/\*\*/g, "").trim();
        return (
          <h3 key={i} style={{ fontSize: 22, fontWeight: 500, color: COLORS.blueDark, marginTop: 40, marginBottom: 16, lineHeight: 1.35, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {headingText}
          </h3>
        );
      }

      // Regular paragraph - handle inline bold
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} style={{ marginBottom: 20, lineHeight: 1.85, fontSize: 17, color: COLORS.blackSoft }}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} style={{ fontWeight: 600 }}>{part.replace(/\*\*/g, "")}</strong>;
            }
            // Handle inline italics
            const italicParts = part.split(/(\*[^*]+\*)/g);
            return italicParts.map((ip, k) => {
              if (ip.startsWith("*") && ip.endsWith("*") && !ip.startsWith("**")) {
                return <em key={`${j}-${k}`}>{ip.replace(/\*/g, "")}</em>;
              }
              return <span key={`${j}-${k}`}>{ip}</span>;
            });
          })}
        </p>
      );
    });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.black, background: COLORS.bg, minHeight: "100vh" }}>
      {/* Top bar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(250,249,247,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.grayMuted}`, padding: "14px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span onClick={() => router.push("/")} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, letterSpacing: "0.04em", color: COLORS.blueDark, cursor: "pointer" }}>
            Rafael Mery
          </span>
          <span onClick={() => { router.push("/"); setTimeout(() => { const el = document.getElementById("insights"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 300); }} style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", color: COLORS.gray, cursor: "pointer", transition: "color 0.3s" }}>
            ← Insights
          </span>
        </div>
      </nav>

      {/* Article header */}
      <header style={{ paddingTop: 120, paddingBottom: 48, paddingLeft: 40, paddingRight: 40, borderBottom: `1px solid ${COLORS.grayMuted}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 20 }}>
            {article.category}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: COLORS.blueDeep, marginBottom: 24 }}>
            {article.title}
          </h1>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: COLORS.grayLight }}>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.read} lectura</span>
          </div>
        </div>
      </header>

      {/* Article body */}
      <article style={{ padding: "48px 40px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {renderContent(article.content)}
        </div>
      </article>

      {/* Author card */}
      <div style={{ padding: "0 40px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 36px", background: COLORS.bgAlt, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <img src="/rafael-mery.jpg" alt="Rafael Mery" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 500, color: COLORS.blueDark, marginBottom: 4 }}>Rafael Mery</div>
            <div style={{ fontSize: 13, color: COLORS.gray, lineHeight: 1.5 }}>Estratega del mercado legal. Socio de Mirada 360º. Director de IA & Derecho, UDP.</div>
          </div>
        </div>
      </div>

      {/* Prev/Next navigation */}
      <div style={{ padding: "0 40px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", borderTop: `1px solid ${COLORS.grayMuted}`, paddingTop: 40, display: "grid", gridTemplateColumns: prevArticle && nextArticle ? "1fr 1fr" : "1fr", gap: 32 }}>
          {prevArticle && (
            <div onClick={() => router.push(`/insights/${prevArticle.slug}`)} style={{ cursor: "pointer" }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.grayLight, marginBottom: 8 }}>← Anterior</div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 400, color: COLORS.blueDark, lineHeight: 1.35 }}>{prevArticle.title}</div>
            </div>
          )}
          {nextArticle && (
            <div onClick={() => router.push(`/insights/${nextArticle.slug}`)} style={{ cursor: "pointer", textAlign: prevArticle ? "right" : "left" }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.grayLight, marginBottom: 8 }}>Siguiente →</div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 400, color: COLORS.blueDark, lineHeight: 1.35 }}>{nextArticle.title}</div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "36px 40px", background: COLORS.blueDeep, color: "rgba(250,249,247,0.4)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: "rgba(250,249,247,0.6)" }}>Rafael Mery</div>
          <div style={{ fontSize: 11 }}>© 2026 Rafael Mery. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
