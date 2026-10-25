import { interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../theme";
import { Accent, Card, FeatureScene, Pill, useEnter, useProgress } from "../ui";

const AREAS = [
  { label: "CGPA", points: 16 },
  { label: "English test", points: 18 },
  { label: "Research", points: 8 },
  { label: "Budget", points: 15 },
  { label: "Documents", points: 20 },
];

const TODOS = [
  { title: "Publish your thesis as a short paper", tag: "Do first", red: true },
  { title: "Book IELTS — aim for 7.0", tag: "Next", red: false },
  { title: "Shortlist 8 universities", tag: "Next", red: false },
];

function Ring() {
  const p = useProgress(18, 78);
  const score = Math.round(77 * p);
  const r = 118;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: 290, height: 290 }}>
      <svg viewBox="0 0 290 290" width={290} height={290} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={145} cy={145} r={r} fill="none" stroke={C.softer} strokeWidth={22} />
        <circle cx={145} cy={145} r={r} fill="none" stroke={C.blue} strokeWidth={22} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontFamily: F.display, fontSize: 104, lineHeight: 1, color: C.ink }}>{score}</div>
          <div style={{ fontFamily: F.body, fontSize: 18, color: C.sub, marginTop: 4 }}>out of 100</div>
        </div>
      </div>
    </div>
  );
}

function AreaBar({ label, points, i }: { label: string; points: number; i: number }) {
  const p = useProgress(30 + i * 7, 70 + i * 7);
  const pct = (points / 20) * 100 * p;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.body, fontSize: 20 }}>
        <span style={{ color: C.sub }}>{label}</span>
        <span style={{ color: C.ink, fontWeight: 600 }}>{Math.round(points * p)}/20</span>
      </div>
      <div style={{ marginTop: 8, height: 12, borderRadius: 99, background: C.softer, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: points < 10 ? C.red : C.ink }} />
      </div>
    </div>
  );
}

function Todo({ title, tag, red, i }: { title: string; tag: string; red: boolean; i: number }) {
  const frame = useCurrentFrame();
  const p = useEnter(84 + i * 10, 22);
  const tick = interpolate(frame, [120 + i * 14, 132 + i * 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 20px",
        borderRadius: 18,
        background: C.paper,
        opacity: p,
        transform: `translateX(${(1 - p) * 40}px)`,
      }}
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          border: `2.5px solid ${tick > 0.5 ? C.blue : C.line}`,
          background: tick > 0.5 ? C.blue : C.white,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <svg width={18} height={18} viewBox="0 0 24 24">
          <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="white" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={24} strokeDashoffset={24 * (1 - tick)} />
        </svg>
      </span>
      <span style={{ flex: 1, fontFamily: F.body, fontSize: 22, color: C.ink, textDecoration: tick > 0.9 ? "line-through" : undefined, textDecorationColor: C.sub }}>
        {title}
      </span>
      <Pill bg={red ? "rgba(255,59,71,0.1)" : C.soft} color={red ? C.red : C.ink} style={{ fontSize: 16, padding: "6px 12px" }}>
        {tag}
      </Pill>
    </div>
  );
}

export function Readiness() {
  const tier = useEnter(70, 24);
  return (
    <FeatureScene
      index={1}
      label="Study Abroad Readiness"
      title={
        <>
          Know if you&apos;re <Accent>ready.</Accent>
        </>
      }
      sub="Five quick questions. A clear score and a to-do list of what to work on next."
    >
      <Card style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 34px", background: C.ink, color: "rgba(255,255,255,0.8)", fontFamily: F.body, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span>Readiness pass</span>
          <span>Gate 5 of 5 ✓</span>
        </div>
        <div style={{ display: "flex", gap: 44, padding: "34px 40px 0" }}>
          <Ring />
          <div style={{ flex: 1, display: "grid", gap: 16, alignContent: "center" }}>
            <div style={{ opacity: tier, transform: `translateY(${(1 - tier) * 14}px)` }}>
              <div style={{ fontFamily: F.body, fontSize: 18, color: C.sub }}>Your status</div>
              <div style={{ fontFamily: F.display, fontSize: 46, color: C.ink, lineHeight: 1.1 }}>Almost boarding</div>
            </div>
            {AREAS.map((a, i) => (
              <AreaBar key={a.label} {...a} i={i} />
            ))}
          </div>
        </div>
        <div style={{ padding: "30px 40px", display: "grid", gap: 12 }}>
          {TODOS.map((t, i) => (
            <Todo key={t.title} {...t} i={i} />
          ))}
        </div>
      </Card>
    </FeatureScene>
  );
}
