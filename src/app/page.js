"use client";
import { useState, useEffect, useRef } from "react";


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
  copperMuted: "rgba(176,141,110,0.12)",
  white: "#FFFFFF",
};

const navItems = [
  { label: "Inicio", id: "hero" },
  { label: "Sobre Rafael", id: "about" },
  { label: "Advisory", id: "advisory" },
  { label: "Insights", id: "insights" },
  { label: "Speaking", id: "speaking" },
  { label: "Programas", id: "programs" },
  { label: "Contacto", id: "contact" },
];

const insights = [
  {
    category: "Law Firm Strategy",
    title: "[Título del artículo — Law Firm Strategy]",
    date: "[Fecha]",
    read: "[X] min",
  },
  {
    category: "AI & Legal Industry",
    title: "[Título del artículo — AI & Legal Industry]",
    date: "[Fecha]",
    read: "[X] min",
  },
  {
    category: "Legal Market LATAM",
    title: "[Título del artículo — Legal Market LATAM]",
    date: "[Fecha]",
    read: "[X] min",
  },
  {
    category: "Governance",
    title: "[Título del artículo — Governance]",
    date: "[Fecha]",
    read: "[X] min",
  },
];

const advisoryAreas = [
  {
    title: "Estrategia de Firma",
    desc: "Posicionamiento, modelo de negocio, diferenciación competitiva y decisiones de largo plazo para firmas que necesitan repensar su dirección.",
  },
  {
    title: "Governance, Liderazgo & Compensación",
    desc: "Diseño de estructuras de gobernanza, sucesión, comités estratégicos, modelos de compensación y toma de decisiones en organizaciones legales complejas.",
  },
  {
    title: "IA & Transformación",
    desc: "Evaluación estratégica del impacto de IA en el modelo de negocio legal. No implementación tecnológica: interpretación de lo que significa.",
  },
  {
    title: "Mercado Legal LATAM",
    desc: "Análisis estructural del mercado de servicios legales en América Latina. Tendencias, consolidación, oportunidades y riesgos emergentes.",
  },
  {
    title: "Integración & Fusiones de Firmas",
    desc: "Acompañamiento estratégico en procesos de fusión, integración o alianza entre firmas. Cultura, estructura, governance post-integración y alineamiento de socios.",
  },
  {
    title: "Universidades & Organismos Públicos en IA",
    desc: "Asesoría a instituciones académicas y organismos públicos en la incorporación estratégica de inteligencia artificial en la enseñanza, regulación y política legal.",
  },
];

const speakingTopics = [
  "El futuro de las firmas de abogados en América Latina",
  "IA y la economía de los servicios legales",
  "Por qué las firmas no cambian (y qué las obligará a hacerlo)",
  "Governance: el problema que nadie quiere resolver",
  "El mercado legal latinoamericano en 2030",
  "In-house counsel como comprador estratégico",
];

const credentials = [
  { number: "20+", label: "años de experiencia en estrategia legal" },
  { number: "80+", label: "firmas asesoradas en LATAM y España" },
  { number: "40+", label: "conferencias internacionales" },
  { number: "15", label: "países donde he trabajado" },
  { number: "20+", label: "años como profesor universitario" },
  { number: "30+", label: "publicaciones académicas" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Divider({ color = COLORS.grayMuted, style = {} }) {
  return <div style={{ height: 1, background: color, width: "100%", ...style }} />;
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif", color: COLORS.black, background: COLORS.bg, minHeight: "100vh", overflowX: "hidden" }}>


      {/* ─── NAVIGATION ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(250,249,247,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.grayMuted}` : "1px solid transparent",
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        padding: scrolled ? "14px 40px" : "22px 40px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
            <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "0.04em", color: COLORS.blueDark }}>
              Rafael Mery
            </span>
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navItems.slice(1).map((item) => (
              <span key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", color: COLORS.gray }}>
                {item.label}
              </span>
            ))}
          </div>
          <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 8 }}>
            <div style={{ width: 22, height: 1.5, background: COLORS.black, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <div style={{ width: 22, height: 1.5, background: COLORS.black, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 1.5, background: COLORS.black, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(250,249,247,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {navItems.map((item) => (
            <span key={item.id} onClick={() => scrollTo(item.id)}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: COLORS.blueDark, cursor: "pointer", letterSpacing: "0.02em" }}>
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Subtle geometric accent */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 500, height: 500, border: `1px solid ${COLORS.grayMuted}`, borderRadius: "50%", opacity: 0.3 }} />
        <div style={{ position: "absolute", bottom: "15%", right: "2%", width: 280, height: 280, border: `1px solid ${COLORS.copperMuted}`, borderRadius: "50%", opacity: 0.25 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 40px 80px", width: "100%", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 32 }}>
              Estrategia · Mercado Legal · Futuro
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 300, lineHeight: 1.1, color: COLORS.blueDeep, maxWidth: 900, letterSpacing: "-0.01em" }}>
              El mercado legal está cambiando más rápido de lo que la mayoría de sus líderes está dispuesto a admitir.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: COLORS.gray, maxWidth: 720, marginTop: 28, lineHeight: 1.5 }}>
              Trabajo con firmas y líderes legales que necesitan entender el mercado de mañana.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div style={{ display: "flex", gap: 16, marginTop: 52, flexWrap: "wrap" }}>
              <button className="cta-btn" onClick={() => scrollTo("advisory")}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 36px" }}>
                Advisory
              </button>
              <button className="cta-outline" onClick={() => scrollTo("insights")}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 36px" }}>
                Insights
              </button>
            </div>
          </FadeIn>

          {/* Credentials bar */}
          <FadeIn delay={0.6}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, marginTop: 80, paddingTop: 40, borderTop: `1px solid ${COLORS.grayMuted}` }}>
              {credentials.map((c, i) => (
                <div key={i}>
                  <div style={{ fontSize: 36, fontWeight: 300, color: COLORS.blueDark, lineHeight: 1 }}>{c.number}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.grayLight, marginTop: 8, lineHeight: 1.5, letterSpacing: "0.02em" }}>{c.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ background: COLORS.blueDeep, color: COLORS.bg, padding: "100px 40px", position: "relative" }}>
        <div className="grid-2col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 20 }}>
                Sobre Rafael
              </div>
              {/* Portrait placeholder */}
              <div style={{
                width: "100%", aspectRatio: "3/4", background: `linear-gradient(165deg, ${COLORS.blueDark}, #2a3a50)`,
                display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", position: "relative",
              }}>
                <img src="/rafael-mery.jpg" alt="Rafael Mery" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, border: `1px solid rgba(176,141,110,0.15)` }} />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ paddingTop: 40 }}>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 36 }}>
                Estratega del mercado legal.<br />
                <span style={{ color: COLORS.copperLight }}>Observador incómodo.</span>
              </h2>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.85, color: "rgba(250,249,247,0.7)", maxWidth: 560 }}>
                <p style={{ marginBottom: 20 }}>
                  Rafael Mery ha dedicado casi dos décadas a estudiar, asesorar y cuestionar cómo operan las firmas de abogados y los mercados legales en América Latina. No desde la academia pura, sino desde la intersección entre estrategia, economía de firmas y las fuerzas que están rediseñando la profesión.
                </p>
                <p style={{ marginBottom: 20 }}>
                  Ha trabajado con más de 80 firmas en 15 países, ha sido conferencista en foros internacionales y es autor de análisis que circulan entre managing partners, gerentes legales y líderes de la industria en toda la región.
                </p>
                <p>
                  Hoy su trabajo se concentra en tres áreas: la transformación estratégica de firmas, el impacto de la inteligencia artificial en el negocio legal, y la construcción de governance que permita a las organizaciones legales tomar decisiones que su estructura actual les impide tomar.
                </p>
              </div>
              {/* Credentials */}
              <div style={{ marginTop: 32, paddingTop: 28, borderTop: "1px solid rgba(250,249,247,0.1)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.copperLight, marginBottom: 16 }}>
                  Trayectoria
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(250,249,247,0.55)", lineHeight: 2.2 }}>
                  Abogado<br />
                  MA Políticas Públicas<br />
                  MA Economía Aplicada<br />
                  Visiting Scholar, UC Berkeley<br />
                  Program on Negotiation, Harvard University<br />
                  Socio, Mirada 360º<br />
                  Director de IA & Derecho, Universidad Diego Portales<br />
                  Profesor de Derecho y Economía
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
                <button className="cta-outline" onClick={() => scrollTo("advisory")}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 28px", borderColor: COLORS.copperLight, color: COLORS.copperLight }}>
                  Áreas de Advisory
                </button>
                <button className="cta-outline" onClick={() => scrollTo("speaking")}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 28px", borderColor: "rgba(250,249,247,0.3)", color: "rgba(250,249,247,0.6)" }}>
                  Speaking
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Responsive override */}

      </section>

      {/* ─── ADVISORY ─── */}
      <section id="advisory" style={{ padding: "100px 40px", background: COLORS.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 16 }}>
              Strategic Advisory
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.15, color: COLORS.blueDeep, maxWidth: 700, marginBottom: 16 }}>
              No es consultoría. Es claridad estratégica.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.gray, maxWidth: 600, lineHeight: 1.7, marginBottom: 56 }}>
              Trabajo con un número reducido de firmas y líderes legales. No ofrezco implementación operativa ni soluciones empaquetadas. Ofrezco pensamiento estratégico sostenido, interpretación de cambios estructurales y acompañamiento en decisiones complejas.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {advisoryAreas.map((area, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="advisory-card" style={{
                  padding: 36, border: `1px solid ${COLORS.grayMuted}`, background: "transparent", height: "100%",
                }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 16 }}>
                    0{i + 1}
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 400, color: COLORS.blueDark, marginBottom: 14, lineHeight: 1.3 }}>
                    {area.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.gray, lineHeight: 1.7 }}>
                    {area.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 56, padding: "36px 40px", background: COLORS.copperMuted, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.blackSoft, lineHeight: 1.6 }}>
                  El advisory es por invitación o solicitud directa. Capacidad limitada a proyectos simultáneos.
                </p>
              </div>
              <button className="cta-btn" onClick={() => scrollTo("contact")}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 28px", whiteSpace: "nowrap" }}>
                Iniciar conversación
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── INSIGHTS ─── */}
      <section id="insights" style={{ padding: "100px 40px", background: COLORS.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 16 }}>
                  Insights & Análisis
                </div>
                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.15, color: COLORS.blueDeep }}>
                  Pensamiento publicado
                </h2>
              </div>
              <span className="nav-link" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.copper, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>
                Ver todos los artículos →
              </span>
            </div>
          </FadeIn>

          {/* Category pills */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
              {["Todos", "Law Firm Strategy", "AI & Legal Industry", "Legal Market LATAM", "Governance", "Future of Legal Services", "Legal Education"].map((cat, i) => (
                <span key={cat} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: "8px 18px", letterSpacing: "0.04em",
                  border: `1px solid ${i === 0 ? COLORS.blueDark : COLORS.grayMuted}`,
                  background: i === 0 ? COLORS.blueDark : "transparent",
                  color: i === 0 ? COLORS.bg : COLORS.gray,
                  cursor: "pointer", transition: "all 0.3s",
                }}>
                  {cat}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Article cards */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {insights.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="insight-card" style={{ padding: "32px 0", borderBottom: `1px solid ${COLORS.grayMuted}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 10 }}>
                        {item.category}
                      </div>
                      <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, lineHeight: 1.35, color: COLORS.blueDark, maxWidth: 700 }}>
                        {item.title}
                      </h3>
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.grayLight, textAlign: "right", whiteSpace: "nowrap", paddingTop: 4 }}>
                      <div>{item.date}</div>
                      <div style={{ marginTop: 4 }}>{item.read} lectura</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPEAKING ─── */}
      <section id="speaking" style={{ padding: "100px 40px", background: COLORS.bg }}>
        <div className="grid-2col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 16 }}>
                Speaking & Conferences
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 300, lineHeight: 1.2, color: COLORS.blueDeep, marginBottom: 24 }}>
                Conferencias que incomodan productivamente.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.gray, lineHeight: 1.75, marginBottom: 32 }}>
                No hago charlas motivacionales ni presentaciones genéricas sobre "el futuro de la profesión". Mis intervenciones están diseñadas para abrir conversaciones que las firmas y la industria evitan tener. Con datos, con análisis, con perspectiva.
              </p>
              <button className="cta-outline" onClick={() => scrollTo("contact")}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 28px" }}>
                Solicitar speaker
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.grayLight, marginBottom: 20 }}>
                Temas frecuentes
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {speakingTopics.map((topic) => (
                  <span key={topic} className="topic-tag" style={{ fontFamily: "'DM Sans', sans-serif", color: COLORS.blackSoft }}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>


      </section>

      {/* ─── PROGRAMS ─── */}
      <section id="programs" style={{ padding: "100px 40px", background: COLORS.blueDeep, color: COLORS.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 16 }}>
              Executive Programs
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 300, lineHeight: 1.15, marginBottom: 24 }}>
              Programas para quienes lideran el cambio.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(250,249,247,0.6)", maxWidth: 640, lineHeight: 1.75, marginBottom: 56 }}>
              Formatos diseñados para managing partners, comités estratégicos, gerentes legales y líderes de la industria que necesitan marcos de decisión, no más información.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {[
              { title: "Acompañamiento Estratégico de Firmas", format: "Programa continuo · Presencial o virtual", desc: "Trabajo sostenido con el liderazgo de la firma sobre posicionamiento, modelo de negocio, governance y decisiones críticas. No es una consultoría puntual: es pensamiento estratégico aplicado en el tiempo real de la organización." },
              { title: "Mentoring para Socios & Asociados", format: "Sesiones individuales o grupales · Formato flexible", desc: "Acompañamiento en desarrollo de carrera para socios en transición y asociados con proyección de liderazgo. Estrategia profesional, construcción de práctica, posicionamiento y decisiones de trayectoria en firmas." },
            ].map((prog, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: 36, border: "1px solid rgba(176,141,110,0.2)", background: "rgba(255,255,255,0.03)", height: "100%" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.copperLight, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                    {prog.format}
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 14, lineHeight: 1.3 }}>{prog.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(250,249,247,0.55)", lineHeight: 1.7 }}>{prog.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section style={{ padding: "80px 40px", background: COLORS.bgAlt }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 16 }}>
              Newsletter
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 300, lineHeight: 1.25, color: COLORS.blueDeep, marginBottom: 16 }}>
              Análisis que no encontrarás en otro lugar.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.gray, lineHeight: 1.7, marginBottom: 36 }}>
              Un envío quincenal con perspectiva estratégica sobre el mercado legal, tendencias, IA y lo que significa para quienes toman decisiones en la industria.
            </p>
            <div style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email" placeholder="tu@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "14px 20px", flex: 1, minWidth: 220,
                  border: `1px solid ${COLORS.grayMuted}`, background: COLORS.white, color: COLORS.black,
                  transition: "border-color 0.3s",
                }}
              />
              <button className="cta-btn"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", whiteSpace: "nowrap" }}>
                Suscribirse
              </button>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.grayLight, marginTop: 16 }}>
              Sin spam. Sin ruido. Pensamiento estratégico directo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ padding: "100px 40px", background: COLORS.bg }}>
        <div className="grid-2col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.copper, marginBottom: 16 }}>
                Contacto
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 300, lineHeight: 1.2, color: COLORS.blueDeep, marginBottom: 24 }}>
                La mejor conversación empieza con una pregunta incómoda.
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.gray, lineHeight: 1.75, marginBottom: 32 }}>
                Si estás liderando una firma, un departamento legal o un proyecto que necesita pensamiento estratégico serio, escríbeme. No trabajo con todos, pero siempre respondo.
              </p>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.blackSoft }}>
                <p style={{ marginBottom: 8 }}>
                  <span style={{ color: COLORS.grayLight, marginRight: 12 }}>Email</span>
                  rafael@rafaelmery.com
                </p>
                <p style={{ marginBottom: 8 }}>
                  <span style={{ color: COLORS.grayLight, marginRight: 12 }}>LinkedIn</span>
                  linkedin.com/in/rafaelmery
                </p>
                <p>
                  <span style={{ color: COLORS.grayLight, marginRight: 12 }}>Base</span>
                  Santiago, Chile · LATAM
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <input placeholder="Nombre" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "14px 20px",
                border: `1px solid ${COLORS.grayMuted}`, background: "transparent", color: COLORS.black,
                transition: "border-color 0.3s",
              }} />
              <input placeholder="Email" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "14px 20px",
                border: `1px solid ${COLORS.grayMuted}`, background: "transparent", color: COLORS.black,
                transition: "border-color 0.3s",
              }} />
              <input placeholder="Organización" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "14px 20px",
                border: `1px solid ${COLORS.grayMuted}`, background: "transparent", color: COLORS.black,
                transition: "border-color 0.3s",
              }} />
              <textarea placeholder="¿En qué estás pensando?" rows={5} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "14px 20px",
                border: `1px solid ${COLORS.grayMuted}`, background: "transparent", color: COLORS.black,
                resize: "vertical", transition: "border-color 0.3s",
              }} />
              <button className="cta-btn"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", alignSelf: "flex-start" }}>
                Enviar mensaje
              </button>
            </div>
          </FadeIn>
        </div>


      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: "48px 40px 36px", background: COLORS.blueDeep, color: "rgba(250,249,247,0.4)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Divider color="rgba(250,249,247,0.08)" style={{ marginBottom: 36 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 400, color: "rgba(250,249,247,0.6)", marginBottom: 8 }}>Rafael Mery</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.04em" }}>
                Estrategia · Mercado Legal · Advisory
              </div>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.04em" }}>
              © 2026 Rafael Mery. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
