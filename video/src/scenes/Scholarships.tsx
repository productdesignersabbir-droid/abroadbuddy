import { useCurrentFrame } from "remotion";
import { C, F } from "../theme";
import { Accent, Card, FeatureScene, useEnter } from "../ui";

/** Day of the month → deadline marker, named in the side list. */
const DEADLINES: Record<number, { flag: string; hot?: boolean }> = {
  11: { flag: "🇬🇧", hot: true },
  15: { flag: "🇩🇪" },
  22: { flag: "🇺🇸" },
  28: { flag: "🌍" },
  30: { flag: "🇯🇵" },
};

const UPCOMING = [
  { flag: "🇬🇧", name: "Chevening", days: 12, hot: true },
  { flag: "🇩🇪", name: "DAAD EPOS", days: 16 },
  { flag: "🇺🇸", name: "Fulbright", days: 23 },
  { flag: "🌍", name: "Erasmus+", days: 29 },
];

const FIRST_WEEKDAY = 6; // the 1st falls on a Sunday in a Monday-first grid

function Day({ day, i }: { day: number; i: number }) {
  const frame = useCurrentFrame();
  const cell = useEnter(6 + i * 0.7, 16);
  const d = DEADLINES[day];
  const pill = useEnter(40 + (d ? Object.keys(DEADLINES).indexOf(String(day)) * 9 : 0), 20);
  const hot = d?.hot;
  const pulse = hot && frame > 95 ? 0.5 + 0.5 * Math.sin((frame - 95) / 5) : 0;
  return (
    <div
      style={{
        height: 92,
        borderRadius: 14,
        padding: "8px 9px",
        background: hot && frame > 90 ? "rgba(255,59,71,0.07)" : C.paper,
        opacity: cell,
        position: "relative",
        boxShadow: hot && frame > 90 ? `0 0 0 ${2 + pulse * 3}px rgba(255,59,71,${0.35 + pulse * 0.25})` : undefined,
      }}
    >
      <div style={{ fontFamily: F.body, fontSize: 17, color: hot ? C.red : C.sub, fontWeight: hot ? 600 : 400 }}>{day}</div>
      {d && (
        <div
          style={{
            marginTop: 8,
            height: 30,
            display: "grid",
            placeItems: "center",
            borderRadius: 8,
            background: hot ? C.red : C.ink,
            color: C.white,
            fontFamily: F.body,
            fontSize: 18,
            opacity: pill,
            transform: `scale(${0.7 + pill * 0.3})`,
          }}
        >
          {d.flag}
        </div>
      )}
    </div>
  );
}

function Upcoming({ u, i }: { u: (typeof UPCOMING)[number]; i: number }) {
  const p = useEnter(70 + i * 8, 22);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 6px", opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
      <span style={{ width: 46, height: 46, borderRadius: "50%", background: C.soft, display: "grid", placeItems: "center", fontSize: 24 }}>{u.flag}</span>
      <span style={{ flex: 1, fontFamily: F.body, fontSize: 20, whiteSpace: "nowrap", color: C.ink, fontWeight: 500 }}>{u.name}</span>
      <span
        style={{
          padding: "6px 12px",
          borderRadius: 99,
          fontFamily: F.body,
          fontSize: 16,
          fontWeight: 600,
          whiteSpace: "nowrap",
          background: u.hot ? "rgba(255,59,71,0.1)" : C.soft,
          color: u.hot ? C.red : C.ink,
        }}
      >
        {u.days} days
      </span>
    </div>
  );
}

export function Scholarships() {
  const toast = useEnter(112, 24);
  return (
    <FeatureScene
      index={4}
      label="Scholarship Calendar"
      title={
        <>
          Never miss a <Accent>deadline.</Accent>
        </>
      }
      sub="Every scholarship in one calendar — with official links and days-left reminders."
    >
      <Card style={{ position: "absolute", left: 0, top: 0, width: 600, padding: "28px 26px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: F.display, fontSize: 40, color: C.ink }}>November</span>
          <span style={{ fontFamily: F.body, fontSize: 18, color: C.sub }}>5 deadlines</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8, marginTop: 18 }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} style={{ fontFamily: F.body, fontSize: 15, color: C.sub, textAlign: "center" }}>
              {d}
            </span>
          ))}
          {Array.from({ length: FIRST_WEEKDAY }, (_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: 30 }, (_, i) => (
            <Day key={i} day={i + 1} i={i} />
          ))}
        </div>
      </Card>

      <Card style={{ position: "absolute", right: 0, top: 40, width: 330, padding: "22px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.body, fontSize: 17, color: C.sub, padding: "0 6px" }}>
          <span>Next deadlines</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} /> Live
          </span>
        </div>
        <div style={{ marginTop: 6 }}>
          {UPCOMING.map((u, i) => (
            <Upcoming key={u.name} u={u} i={i} />
          ))}
        </div>
      </Card>

      {/* Reminder toast */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 410,
          width: 330,
          boxSizing: "border-box",
          display: "flex",
          gap: 16,
          alignItems: "center",
          padding: "20px 24px",
          borderRadius: 22,
          background: C.ink,
          color: C.white,
          opacity: toast,
          transform: `translateY(${(1 - toast) * 40}px) scale(${0.95 + toast * 0.05})`,
          boxShadow: "0 30px 60px -30px rgba(11,18,32,0.6)",
        }}
      >
        <span style={{ fontSize: 30 }}>🔔</span>
        <div>
          <div style={{ fontFamily: F.body, fontSize: 19, fontWeight: 600 }}>Chevening closes in 12 days</div>
          <div style={{ fontFamily: F.body, fontSize: 16, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>Reminder set · official site linked</div>
        </div>
      </div>
    </FeatureScene>
  );
}
