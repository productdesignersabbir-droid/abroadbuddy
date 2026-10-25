import { C, F } from "../theme";
import { Accent, Card, FeatureScene, Pill, useEnter, useProgress } from "../ui";

const EVENTS = [
  { month: "Sep", name: "Computer & IT Research Conference", place: "🇧🇩 Dhaka", due: "Paper due in 14 days", local: true },
  { month: "Oct", name: "Student Research Fest", place: "🇧🇩 Online", due: "Abstracts open", local: true },
  { month: "Dec", name: "Machine Learning Summit", place: "🇨🇦 Vancouver", due: "Workshop papers open" },
  { month: "Feb", name: "Global Climate & Energy Forum", place: "🇸🇬 Singapore", due: "Posters due in 40 days" },
];

function Event({ e, i }: { e: (typeof EVENTS)[number]; i: number }) {
  const p = useEnter(26 + i * 12, 24);
  return (
    <div style={{ display: "flex", gap: 26, alignItems: "stretch", opacity: p, transform: `translateX(${(1 - p) * 60}px)` }}>
      <div style={{ width: 80, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? C.blue : C.white, border: `4px solid ${i === 0 ? C.blue : C.line}`, zIndex: 1 }} />
        <span style={{ marginTop: 10, fontFamily: F.body, fontSize: 18, fontWeight: 600, color: C.ink }}>{e.month}</span>
      </div>
      <Card style={{ flex: 1, padding: "22px 28px", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: F.display, fontSize: 32, color: C.ink, lineHeight: 1.1 }}>{e.name}</div>
          <div style={{ marginTop: 6, fontFamily: F.body, fontSize: 18, color: C.sub }}>{e.place}</div>
        </div>
        <Pill bg={i === 0 ? "rgba(255,59,71,0.1)" : C.soft} color={i === 0 ? C.red : C.ink} style={{ fontSize: 17 }}>
          {e.due}
        </Pill>
      </Card>
    </div>
  );
}

export function Conferences() {
  const line = useProgress(18, 80);
  const toggle = useEnter(10, 20);
  return (
    <FeatureScene
      index={5}
      label="Conference Calendar"
      title={
        <>
          Build your <Accent>research</Accent> profile.
        </>
      }
      sub="Local and global conferences, research fests and paper deadlines in one place."
    >
      <div style={{ position: "absolute", left: 0, top: 0, display: "flex", gap: 10, opacity: toggle }}>
        <Pill bg={C.ink} color={C.white}>All</Pill>
        <Pill>🇧🇩 Local</Pill>
        <Pill>🌍 Global</Pill>
        <Pill>Closing soon</Pill>
      </div>
      <div style={{ position: "absolute", left: 39, top: 112, width: 4, height: 560 * line, background: C.line, borderRadius: 2 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 90, display: "grid", gap: 24 }}>
        {EVENTS.map((e, i) => (
          <Event key={e.name} e={e} i={i} />
        ))}
      </div>
    </FeatureScene>
  );
}
