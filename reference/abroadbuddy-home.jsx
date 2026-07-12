import React, { useState, useEffect, useRef } from "react";

// ============================================================================
// AbroadBuddy — Homepage
// Design system: bold & energetic, light base. Vivid blue + red, high contrast.
// Display: Space Grotesk  |  Body: Inter  |  Mono/utility: JetBrains Mono
// Signature motif: the "boarding pass" — study-abroad journey framed as departure.
// ============================================================================

const C = {
  ink: "#0B1220",       // near-black text
  blue: "#1E4FFF",      // vivid electric blue (primary)
  blueDeep: "#0B2FE8",  // deeper blue for gradients
  red: "#FF3B47",       // vivid red (accent / departures)
  paper: "#FFFFFF",
  soft: "#F5F7FC",      // soft background
  softer: "#EEF2FB",
  line: "#E2E8F5",
  sub: "#5A6577",       // muted text
};

const FONT_LINK_ID = "abroadbuddy-fonts";

function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const l = document.createElement("link");
    l.id = FONT_LINK_ID;
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap";
    document.head.appendChild(l);
  }, []);
}

// Reveal-on-scroll hook
function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setSeen(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

const display = "'Space Grotesk', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

// ----------------------------------------------------------------------------
// NAV
// ----------------------------------------------------------------------------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Universities", "AI Tools", "Mentors", "Lab Kemon", "Stories"];

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        transition: "all .25s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="ab-desktop-nav">
          {links.map((l) => (
            <a key={l} href="#" style={navLink}>{l}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#" style={{ ...navLink, display: "none" }} className="ab-login">Log in</a>
          <a href="#" style={btnPrimary}>Get started</a>
        </div>
      </div>
    </header>
  );
}

const navLink = {
  fontFamily: body, fontSize: 15, fontWeight: 500, color: C.ink,
  textDecoration: "none", padding: "8px 14px", borderRadius: 10,
  transition: "background .15s ease",
};

function Logo() {
  return (
    <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, position: "relative",
        background: `linear-gradient(135deg, ${C.blue}, #4B78FF)`,
        display: "grid", placeItems: "center", boxShadow: "0 6px 16px rgba(30,79,255,.30)",
      }}>
        {/* little airplane / send mark */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" fill="#fff" />
          <circle cx="18.5" cy="6" r="2" fill={C.red} />
        </svg>
      </div>
      <span style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: C.ink, letterSpacing: "-0.02em" }}>
        Abroad<span style={{ color: C.blue }}>Buddy</span>
      </span>
    </a>
  );
}

const btnPrimary = {
  fontFamily: body, fontSize: 15, fontWeight: 600, color: "#fff",
  background: C.blue, textDecoration: "none", padding: "10px 18px",
  borderRadius: 11, boxShadow: "0 8px 20px rgba(30,79,255,.28)",
  transition: "transform .15s ease, box-shadow .15s ease",
  display: "inline-block",
};

// ----------------------------------------------------------------------------
// HERO — with signature "boarding pass" university-match widget
// ----------------------------------------------------------------------------
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: C.paper }}>
      {/* ambient gradient blobs */}
      <div aria-hidden style={{
        position: "absolute", top: -160, right: -120, width: 480, height: 480,
        background: `radial-gradient(circle, rgba(30,79,255,.14), transparent 60%)`, filter: "blur(10px)",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: -180, left: -140, width: 460, height: 460,
        background: `radial-gradient(circle, rgba(255,59,71,.10), transparent 60%)`, filter: "blur(10px)",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "72px 24px 84px",
        display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 56, alignItems: "center",
      }} className="ab-hero-grid">
        {/* LEFT */}
        <div>
          <div style={eyebrow}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: C.red, display: "inline-block" }} />
            Built for Bangladeshi students
          </div>
          <h1 style={{
            fontFamily: display, fontWeight: 700, color: C.ink,
            fontSize: "clamp(38px, 5.4vw, 62px)", lineHeight: 1.04, letterSpacing: "-0.03em", margin: "18px 0 0",
          }}>
            Your whole study-abroad journey,{" "}
            <span style={{ position: "relative", color: C.blue }}>
              one platform
              <Underline />
            </span>.
          </h1>
          <p style={{
            fontFamily: body, fontSize: 18, lineHeight: 1.6, color: C.sub,
            margin: "22px 0 0", maxWidth: 520,
          }}>
            Find universities that fit your profile, build a standout application,
            meet mentors who've done it, and know the lab culture before you commit.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <a href="#" style={{ ...btnPrimary, padding: "14px 24px", fontSize: 16 }}>Match my universities</a>
            <a href="#" style={btnGhost}>Explore features</a>
          </div>

          <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
            <Stat n="500+" l="Universities" />
            <Stat n="120+" l="Verified mentors" />
            <Stat n="4.9★" l="Student rating" />
          </div>
        </div>

        {/* RIGHT — boarding pass */}
        <BoardingPass />
      </div>
    </section>
  );
}

const eyebrow = {
  fontFamily: mono, fontSize: 12.5, fontWeight: 500, letterSpacing: "0.04em",
  textTransform: "uppercase", color: C.ink, display: "inline-flex", alignItems: "center", gap: 9,
  background: C.soft, border: `1px solid ${C.line}`, padding: "7px 13px", borderRadius: 99,
};

const btnGhost = {
  fontFamily: body, fontSize: 16, fontWeight: 600, color: C.ink,
  background: "#fff", border: `1.5px solid ${C.line}`, textDecoration: "none",
  padding: "12.5px 22px", borderRadius: 11, display: "inline-block",
  transition: "border-color .15s ease",
};

function Underline() {
  return (
    <svg aria-hidden width="100%" height="12" viewBox="0 0 200 12" preserveAspectRatio="none"
      style={{ position: "absolute", left: 0, bottom: -6, width: "100%" }}>
      <path d="M2 8 Q 60 2 100 6 T 198 5" stroke={C.red} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: 26, color: C.ink, letterSpacing: "-0.02em" }}>{n}</div>
      <div style={{ fontFamily: body, fontSize: 13.5, color: C.sub, marginTop: 2 }}>{l}</div>
    </div>
  );
}

// The signature element: an interactive boarding-pass style profile-match card
function BoardingPass() {
  const [cgpa, setCgpa] = useState(3.6);
  const [country, setCountry] = useState("USA");
  const countries = ["USA", "Canada", "UK", "Germany", "Australia"];

  // toy "match" that reacts to inputs so the hero feels alive
  const matches = Math.min(500, Math.round(40 + cgpa * 80 + country.length * 6));

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        background: "#fff", borderRadius: 22, border: `1px solid ${C.line}`,
        boxShadow: "0 30px 60px -20px rgba(11,18,32,.22)", overflow: "hidden",
      }}>
        {/* pass header */}
        <div style={{
          background: `linear-gradient(120deg, ${C.blue}, #3D66FF)`, color: "#fff",
          padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.12em", opacity: .9 }}>BOARDING&nbsp;PASS</div>
          <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.12em", opacity: .9 }}>ABROADBUDDY</div>
        </div>

        <div style={{ padding: "22px 22px 8px" }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.sub, letterSpacing: "0.1em" }}>PASSENGER</div>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 22, color: C.ink, marginTop: 3 }}>
            Future Grad Student
          </div>

          {/* CGPA control */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label style={fieldLabel}>Your CGPA</label>
              <span style={{ fontFamily: display, fontWeight: 700, color: C.blue, fontSize: 18 }}>{cgpa.toFixed(2)}</span>
            </div>
            <input
              type="range" min="2" max="4" step="0.05" value={cgpa}
              onChange={(e) => setCgpa(parseFloat(e.target.value))}
              style={{ width: "100%", marginTop: 8, accentColor: C.blue }}
            />
          </div>

          {/* country chips */}
          <div style={{ marginTop: 16 }}>
            <label style={fieldLabel}>Destination</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 9 }}>
              {countries.map((c) => {
                const active = c === country;
                return (
                  <button key={c} onClick={() => setCountry(c)} style={{
                    fontFamily: body, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
                    padding: "7px 13px", borderRadius: 99,
                    border: `1.5px solid ${active ? C.blue : C.line}`,
                    background: active ? C.blue : "#fff",
                    color: active ? "#fff" : C.ink, transition: "all .15s ease",
                  }}>{c}</button>
                );
              })}
            </div>
          </div>
        </div>

        {/* perforation */}
        <div style={{ position: "relative", margin: "18px 0 0" }}>
          <div style={{ borderTop: `2px dashed ${C.line}` }} />
          <span style={notch(-11, "left")} /><span style={notch(-11, "right")} />
        </div>

        {/* result stub */}
        <div style={{ padding: "16px 22px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.sub, letterSpacing: "0.1em" }}>MATCHED PROGRAMS</div>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 30, color: C.ink }}>
              {matches}<span style={{ color: C.red }}>+</span>
            </div>
          </div>
          <a href="#" style={{ ...btnPrimary, padding: "12px 18px" }}>See matches →</a>
        </div>
      </div>

      {/* floating "DEPARTURES" tag */}
      <div style={{
        position: "absolute", top: -14, left: -14, background: C.red, color: "#fff",
        fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
        padding: "7px 12px", borderRadius: 9, boxShadow: "0 8px 18px rgba(255,59,71,.35)",
        transform: "rotate(-4deg)",
      }}>DEPARTURES ✈</div>
    </div>
  );
}

const fieldLabel = { fontFamily: mono, fontSize: 11, color: C.sub, letterSpacing: "0.08em", textTransform: "uppercase" };
const notch = (top, side) => ({
  position: "absolute", top, [side]: -11, width: 22, height: 22, borderRadius: 99,
  background: C.soft, border: `1px solid ${C.line}`,
});

// ----------------------------------------------------------------------------
// TRUST BAR
// ----------------------------------------------------------------------------
function TrustBar() {
  const items = ["IELTS Prep", "GRE Coaching", "SOP & LOR", "Scholarships", "Visa Guidance", "Housing"];
  return (
    <div style={{ background: C.ink, overflow: "hidden", padding: "14px 0" }}>
      <div style={{
        display: "flex", gap: 44, whiteSpace: "nowrap",
        animation: "ab-marquee 22s linear infinite", width: "max-content",
      }}>
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.06em", color: "rgba(255,255,255,.72)", display: "inline-flex", alignItems: "center", gap: 44 }}>
            {t} <span style={{ color: C.red }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// FEATURES — the 8 pillars
// ----------------------------------------------------------------------------
const FEATURES = [
  { tag: "01", title: "University Match", desc: "Get a ranked shortlist based on your CGPA, major, target country and budget — not guesswork.", accent: C.blue, icon: IconSearch },
  { tag: "02", title: "AI CV · SOP · LOR", desc: "Generate strong drafts in minutes, or hire a vetted specialist to write them with you.", accent: C.red, icon: IconDoc },
  { tag: "03", title: "Find My Mentor", desc: "Book 1:1 or group sessions with students and alumni who've walked your exact path.", accent: C.blue, icon: IconMentor },
  { tag: "04", title: "Lab Kemon", desc: "Rate and read reviews on labs, professors and funding — know the culture before you apply.", accent: C.red, icon: IconLab },
  { tag: "05", title: "Journey Stories", desc: "Read real study-abroad journeys, filter by country or field, and share your own.", accent: C.blue, icon: IconStory },
  { tag: "06", title: "Conference Calendar", desc: "Track local and global conferences, research fests and paper deadlines in one place.", accent: C.red, icon: IconCal },
  { tag: "07", title: "Housing & Flights", desc: "Compare abroad housing, flight fares and living costs before you pack your bags.", accent: C.blue, icon: IconPlane },
  { tag: "08", title: "IELTS Mock Tests", desc: "Practice free mock tests, then hire expert coaches for IELTS, GRE and beyond.", accent: C.red, icon: IconTest },
];

function Features() {
  return (
    <section style={{ background: C.soft, padding: "88px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHead
          kicker="Everything, in one place"
          title="One platform for the entire journey"
          sub="From your first shortlist to your first day on campus — AbroadBuddy replaces a dozen scattered tabs, agents and group chats."
        />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginTop: 48,
        }} className="ab-feature-grid">
          {FEATURES.map((f, i) => <FeatureCard key={f.tag} f={f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ f, i }) {
  const [ref, seen] = useReveal();
  const [hover, setHover] = useState(false);
  const Icon = f.icon;
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff", borderRadius: 18, padding: "24px 22px 26px",
        border: `1px solid ${C.line}`,
        boxShadow: hover ? "0 18px 40px -18px rgba(11,18,32,.22)" : "0 2px 6px rgba(11,18,32,.04)",
        transform: seen ? (hover ? "translateY(-4px)" : "translateY(0)") : "translateY(16px)",
        opacity: seen ? 1 : 0,
        transition: `opacity .5s ease ${i * 60}ms, transform .3s ease, box-shadow .25s ease`,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13, display: "grid", placeItems: "center",
          background: hexToSoft(f.accent), color: f.accent,
        }}>
          <Icon color={f.accent} />
        </div>
        <span style={{ fontFamily: mono, fontSize: 13, color: C.line === f.accent ? C.sub : "#C3CCDE", fontWeight: 700 }}>{f.tag}</span>
      </div>
      <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 19, color: C.ink, margin: "18px 0 0", letterSpacing: "-0.01em" }}>{f.title}</h3>
      <p style={{ fontFamily: body, fontSize: 14.5, lineHeight: 1.55, color: C.sub, margin: "9px 0 0" }}>{f.desc}</p>
    </div>
  );
}

function hexToSoft(hex) {
  // produce a soft tinted background from an accent
  if (hex === C.blue) return "rgba(30,79,255,.10)";
  return "rgba(255,59,71,.10)";
}

// ----------------------------------------------------------------------------
// SPOTLIGHT — Lab Kemon (the differentiator) as a feature strip
// ----------------------------------------------------------------------------
function LabSpotlight() {
  const [ref, seen] = useReveal();
  return (
    <section style={{ background: C.paper, padding: "90px 0" }}>
      <div ref={ref} style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 54, alignItems: "center",
      }} className="ab-hero-grid">
        <div style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateX(-20px)", transition: "all .6s ease" }}>
          <div style={{ ...eyebrow, background: "rgba(255,59,71,.08)", borderColor: "rgba(255,59,71,.2)" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: C.red, display: "inline-block" }} />
            The AbroadBuddy difference
          </div>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(28px,3.4vw,42px)", color: C.ink, letterSpacing: "-0.025em", lineHeight: 1.1, margin: "18px 0 0" }}>
            Know the lab <span style={{ color: C.red }}>before</span> you commit.
          </h2>
          <p style={{ fontFamily: body, fontSize: 17, lineHeight: 1.6, color: C.sub, margin: "18px 0 0", maxWidth: 480 }}>
            <strong style={{ color: C.ink }}>Lab Kemon</strong> lets you see professor ratings, funding and stipend info,
            and honest reviews of lab culture — so you never walk into a supervisor
            mismatch after moving across the world.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "grid", gap: 12 }}>
            {["Professor behaviour & mentorship ratings", "Funding, stipend & assistantship insight", "Real reviews from current lab members"].map((t) => (
              <li key={t} style={{ fontFamily: body, fontSize: 15, color: C.ink, display: "flex", gap: 11, alignItems: "center" }}>
                <Check /> {t}
              </li>
            ))}
          </ul>
          <a href="#" style={{ ...btnPrimary, marginTop: 28, padding: "13px 22px" }}>Explore Lab Kemon</a>
        </div>

        {/* mock review card */}
        <div style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateX(20px)", transition: "all .6s ease .1s" }}>
          <LabReviewCard />
        </div>
      </div>
    </section>
  );
}

function LabReviewCard() {
  return (
    <div style={{ background: C.soft, borderRadius: 22, border: `1px solid ${C.line}`, padding: 22, boxShadow: "0 24px 50px -24px rgba(11,18,32,.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: C.ink }}>Systems & AI Lab</div>
          <div style={{ fontFamily: body, fontSize: 13.5, color: C.sub, marginTop: 2 }}>Dr. A. Rahman · Purdue University</div>
        </div>
        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "8px 12px", textAlign: "center" }}>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: C.blue }}>4.6</div>
          <div style={{ fontFamily: mono, fontSize: 9.5, color: C.sub, letterSpacing: "0.06em" }}>OVERALL</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
        {[["Mentorship", 92, C.blue], ["Funding", 78, C.red], ["Work-life", 84, C.blue], ["Publishing", 88, C.red]].map(([k, v, col]) => (
          <div key={k} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 13px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: body, fontSize: 12.5, color: C.sub }}>
              <span>{k}</span><span style={{ fontWeight: 700, color: C.ink }}>{v}%</span>
            </div>
            <div style={{ height: 6, background: C.softer, borderRadius: 99, marginTop: 7, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${v}%`, background: col, borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "14px 15px", marginTop: 12 }}>
        <div style={{ fontFamily: body, fontSize: 13.5, lineHeight: 1.55, color: C.ink }}>
          "Supportive advisor, guaranteed funding for 5 years, and a collaborative
          group. Expect long weeks near deadlines."
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: C.sub, marginTop: 9, letterSpacing: "0.04em" }}>— PhD student, 2nd year</div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// CTA
// ----------------------------------------------------------------------------
function CTA() {
  return (
    <section style={{ background: C.soft, padding: "20px 24px 100px" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", borderRadius: 28, overflow: "hidden",
        background: `linear-gradient(120deg, ${C.blue}, #3358F5)`, position: "relative",
        padding: "62px 40px", textAlign: "center",
        boxShadow: "0 30px 70px -28px rgba(30,79,255,.5)",
      }}>
        <div aria-hidden style={{ position: "absolute", top: -60, right: -30, width: 240, height: 240, background: "radial-gradient(circle, rgba(255,59,71,.5), transparent 60%)", filter: "blur(6px)" }} />
        <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(28px,3.6vw,44px)", color: "#fff", letterSpacing: "-0.025em", margin: 0, position: "relative" }}>
          Ready to start your journey?
        </h2>
        <p style={{ fontFamily: body, fontSize: 17.5, color: "rgba(255,255,255,.9)", maxWidth: 520, margin: "16px auto 0", position: "relative" }}>
          Join thousands of Bangladeshi students turning "someday, abroad" into an offer letter.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 30, flexWrap: "wrap", position: "relative" }}>
          <a href="#" style={{ fontFamily: body, fontSize: 16, fontWeight: 600, color: C.blue, background: "#fff", padding: "14px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 10px 24px rgba(0,0,0,.16)" }}>Create free account</a>
          <a href="#" style={{ fontFamily: body, fontSize: 16, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,.14)", border: "1.5px solid rgba(255,255,255,.4)", padding: "13px 24px", borderRadius: 12, textDecoration: "none" }}>Talk to a mentor</a>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// FOOTER
// ----------------------------------------------------------------------------
function Footer() {
  const cols = [
    { h: "Platform", items: ["University Match", "AI Tools", "Mentors", "Lab Kemon", "Stories"] },
    { h: "Prepare", items: ["IELTS Mock Tests", "GRE Coaching", "SOP & LOR", "Conferences", "Housing"] },
    { h: "Company", items: ["About", "Careers", "Blog", "Contact", "Privacy"] },
  ];
  return (
    <footer style={{ background: C.ink, color: "#fff", padding: "60px 24px 34px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32 }} className="ab-footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${C.blue}, #4B78FF)`, display: "grid", placeItems: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" fill="#fff" /></svg>
            </div>
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: 19 }}>Abroad<span style={{ color: "#7D9BFF" }}>Buddy</span></span>
          </div>
          <p style={{ fontFamily: body, fontSize: 14, color: "rgba(255,255,255,.6)", marginTop: 14, maxWidth: 280, lineHeight: 1.6 }}>
            The one-stop platform helping Bangladeshi students study abroad — smarter, together.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{c.h}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 10 }}>
              {c.items.map((i) => (
                <li key={i}><a href="#" style={{ fontFamily: body, fontSize: 14, color: "rgba(255,255,255,.78)", textDecoration: "none" }}>{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "34px auto 0", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: body, fontSize: 13, color: "rgba(255,255,255,.5)" }}>© 2026 AbroadBuddy. Made in Bangladesh 🇧🇩</span>
        <span style={{ fontFamily: mono, fontSize: 12, color: "rgba(255,255,255,.4)", letterSpacing: "0.05em" }}>MVP · v0.1</span>
      </div>
    </footer>
  );
}

// ----------------------------------------------------------------------------
// Shared bits
// ----------------------------------------------------------------------------
function SectionHead({ kicker, title, sub }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ fontFamily: mono, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.blue }}>{kicker}</div>
      <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(28px,3.4vw,40px)", color: C.ink, letterSpacing: "-0.025em", lineHeight: 1.1, margin: "12px 0 0" }}>{title}</h2>
      {sub && <p style={{ fontFamily: body, fontSize: 17, lineHeight: 1.6, color: C.sub, margin: "16px 0 0" }}>{sub}</p>}
    </div>
  );
}

function Check() {
  return (
    <span style={{ width: 22, height: 22, borderRadius: 99, background: "rgba(30,79,255,.1)", display: "grid", placeItems: "center", flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke={C.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

// Icons (simple, consistent stroke set)
function IconSearch({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" /><path d="M20 20l-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>); }
function IconDoc({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6z" stroke={color} strokeWidth="2" strokeLinejoin="round" /><path d="M9 12h6M9 16h6" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>); }
function IconMentor({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke={color} strokeWidth="2" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>); }
function IconLab({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 3v6l-4.5 8A2 2 0 006.3 20h11.4a2 2 0 001.8-3L15 9V3" stroke={color} strokeWidth="2" strokeLinejoin="round" /><path d="M9 3h6" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>); }
function IconStory({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H8l-4 4z" stroke={color} strokeWidth="2" strokeLinejoin="round" /></svg>); }
function IconCal({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="16" rx="2" stroke={color} strokeWidth="2" /><path d="M4 9h16M8 3v4M16 3v4" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>); }
function IconPlane({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z" stroke={color} strokeWidth="2" strokeLinejoin="round" /></svg>); }
function IconTest({ color }) { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 4h14v16H5z" stroke={color} strokeWidth="2" strokeLinejoin="round" /><path d="M8 9l2 2 3-3M8 15h8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>); }

// ----------------------------------------------------------------------------
// ROOT
// ----------------------------------------------------------------------------
export default function App() {
  useFonts();
  return (
    <div style={{ background: C.paper, minHeight: "100vh", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${C.red}; outline-offset: 2px; }
        @keyframes ab-marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        @media (max-width: 900px) {
          .ab-hero-grid { grid-template-columns: 1fr !important; }
          .ab-feature-grid { grid-template-columns: 1fr 1fr !important; }
          .ab-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .ab-desktop-nav { display: none !important; }
        }
        @media (max-width: 560px) {
          .ab-feature-grid { grid-template-columns: 1fr !important; }
          .ab-footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-marquee, [style*="ab-marquee"] { animation: none !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <TrustBar />
      <Features />
      <LabSpotlight />
      <CTA />
      <Footer />
    </div>
  );
}
