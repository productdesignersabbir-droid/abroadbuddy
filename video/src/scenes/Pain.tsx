import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../theme";
import { Backdrop, useEnter } from "../ui";

/** The student's questions, each owning a slice of the scene (frames). */
const QUESTIONS: { from: number; to: number; text: string; accent: string }[] = [
  { from: 0, to: 62, text: "Where do I even start?", accent: "start?" },
  { from: 62, to: 134, text: "Which universities fit my CGPA?", accent: "CGPA?" },
  { from: 134, to: 198, text: "Which professors are taking students?", accent: "taking" },
  { from: 198, to: 248, text: "When do scholarships close?", accent: "close?" },
  { from: 248, to: 312, text: "Am I even ready?", accent: "ready?" },
];

/** Frame at which everything gets pulled into the centre. */
const COLLAPSE = 294;

function Question({ from, to, text, accent }: (typeof QUESTIONS)[number]) {
  const frame = useCurrentFrame();
  if (frame < from - 2 || frame > to + 14) return null;
  const inP = interpolate(frame, [from, from + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0.7, 0.2, 1) });
  const outP = interpolate(frame, [to - 4, to + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.75, 0) });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        opacity: inP * (1 - outP),
        transform: `translateY(${(1 - inP) * 40 - outP * 40}px)`,
        filter: `blur(${(1 - inP) * 10 + outP * 10}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          textAlign: "center",
          fontFamily: F.display,
          fontWeight: 500,
          fontSize: 116,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          color: C.ink,
        }}
      >
        {text.split(" ").map((w, i) => (
          <span key={i} style={{ fontStyle: w === accent ? "italic" : undefined, color: w === accent ? C.red : undefined }}>
            {w}{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A piece of clutter that pops in, floats, then gets pulled to the centre. */
function Clutter({
  at,
  x,
  y,
  rotate,
  children,
}: {
  at: number;
  x: number;
  y: number;
  rotate: number;
  children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const p = useEnter(at, 22);
  const pull = interpolate(frame, [COLLAPSE + (at % 7), COLLAPSE + 22 + (at % 7)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.6, 0, 0.8, 0.2),
  });
  const floatX = Math.sin((frame + at * 3) / 22) * 6;
  const floatY = Math.cos((frame + at * 5) / 26) * 8;
  const cx = 960;
  const cy = 540;
  const px = x + (cx - x) * pull;
  const py = y + (cy - y) * pull;
  return (
    <div
      style={{
        position: "absolute",
        left: px,
        top: py,
        transform: `translate(-50%, -50%) translate(${floatX}px, ${floatY}px) rotate(${rotate * (1 - pull)}deg) scale(${(0.85 + p * 0.15) * (1 - pull * 0.85)})`,
        opacity: p * (1 - pull),
        filter: `blur(${pull * 6}px)`,
      }}
    >
      {children}
    </div>
  );
}

const panel: CSSProperties = {
  background: C.white,
  borderRadius: 22,
  boxShadow: "0 1px 0 rgba(11,18,32,0.04), 0 26px 50px -28px rgba(11,18,32,0.35)",
  fontFamily: F.body,
  color: C.ink,
};

function BrowserTabs() {
  const tabs = ["QS Rankings 2026", "prof_list_FINAL_v3.xlsx", "Is IELTS 6.5 enough?", "Visa forum", "+14"];
  return (
    <div style={{ ...panel, width: 620, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 6, padding: "14px 14px 0", background: C.soft }}>
        <span style={{ display: "flex", gap: 7, padding: "10px 8px 0 4px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
          ))}
        </span>
        {tabs.map((t, i) => (
          <span
            key={t}
            style={{
              padding: "9px 14px",
              borderRadius: "12px 12px 0 0",
              background: i === 1 ? C.white : "transparent",
              fontSize: 15,
              color: i === 1 ? C.ink : C.sub,
              whiteSpace: "nowrap",
              maxWidth: 140,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div style={{ padding: 22, display: "grid", gap: 12 }}>
        {[88, 64, 76, 40].map((w, i) => (
          <span key={i} style={{ height: 14, width: `${w}%`, borderRadius: 7, background: C.softer }} />
        ))}
      </div>
    </div>
  );
}

function Spreadsheet() {
  const rows = [
    ["University", "CGPA", "Deadline"],
    ["Toronto", "3.6?", "???"],
    ["TU Munich", "—", "Jan?"],
    ["Melbourne", "3.5", ""],
    ["Waterloo", "?", "missed"],
  ];
  return (
    <div style={{ ...panel, width: 430, padding: 18 }}>
      <div style={{ fontSize: 16, color: C.sub, marginBottom: 12 }}>📄 universities_shortlist.xlsx</div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.8fr 1fr", border: `1px solid ${C.line}`, borderRadius: 10, overflow: "hidden" }}>
        {rows.flatMap((r, ri) =>
          r.map((cell, ci) => (
            <span
              key={`${ri}-${ci}`}
              style={{
                padding: "9px 10px",
                fontSize: 16,
                fontWeight: ri === 0 ? 600 : 400,
                borderTop: ri ? `1px solid ${C.line}` : undefined,
                borderLeft: ci ? `1px solid ${C.line}` : undefined,
                background: cell === "missed" ? "rgba(255,59,71,0.1)" : ri === 0 ? C.soft : C.white,
                color: cell === "missed" ? C.red : C.ink,
              }}
            >
              {cell}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function Sticky({ text, color = "#fff1b8" }: { text: string; color?: string }) {
  return (
    <div
      style={{
        width: 230,
        padding: "26px 22px",
        background: color,
        borderRadius: 6,
        boxShadow: "0 22px 34px -22px rgba(11,18,32,0.45)",
        fontFamily: "'Comic Sans MS', 'Marker Felt', cursive",
        fontSize: 27,
        lineHeight: 1.25,
        color: "#3b3320",
      }}
    >
      {text}
    </div>
  );
}

function CalendarMess() {
  const circled = [6, 13, 19, 27];
  return (
    <div style={{ ...panel, width: 380, padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 600 }}>
        <span>January</span>
        <span style={{ color: C.red, fontWeight: 500 }}>4 deadlines?</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginTop: 14 }}>
        {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
          <span
            key={d}
            style={{
              height: 38,
              display: "grid",
              placeItems: "center",
              fontSize: 15,
              borderRadius: "50%",
              border: circled.includes(d) ? `2.5px solid ${C.red}` : "2.5px solid transparent",
              color: circled.includes(d) ? C.red : C.sub,
            }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function EmailNoReply() {
  return (
    <div style={{ ...panel, width: 420, padding: "18px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: C.sub }}>
        <span>Sent · 3 weeks ago</span>
        <span>0 replies</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 20, fontWeight: 600 }}>Prospective PhD student — research interest</div>
      <div style={{ marginTop: 6, fontSize: 16, color: C.sub }}>Dear Professor, I hope this email finds you well…</div>
    </div>
  );
}

function Toast() {
  return (
    <div style={{ ...panel, display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", borderRadius: 99 }}>
      <span style={{ width: 12, height: 12, borderRadius: "50%", background: C.red }} />
      <span style={{ fontSize: 19, fontWeight: 500 }}>Application closed 2 days ago</span>
    </div>
  );
}

function QuestionMark({ size }: { size: number }) {
  return <span style={{ fontFamily: F.display, fontStyle: "italic", fontSize: size, color: C.blue, opacity: 0.25 }}>?</span>;
}

export function Pain() {
  return (
    <AbsoluteFill>
      <Backdrop />
      <Clutter at={6} x={430} y={190} rotate={-4}><BrowserTabs /></Clutter>
      <Clutter at={34} x={1560} y={210} rotate={5}><Sticky text="email 20 profs??" /></Clutter>
      <Clutter at={46} x={1720} y={380} rotate={-6}><Sticky text="SOP draft… again" color="#ffd9d2" /></Clutter>
      <Clutter at={72} x={330} y={830} rotate={3}><Spreadsheet /></Clutter>
      <Clutter at={100} x={1500} y={850} rotate={-3}><EmailNoReply /></Clutter>
      <Clutter at={136} x={1680} y={620} rotate={4}><CalendarMess /></Clutter>
      <Clutter at={150} x={250} y={520} rotate={-2}><Sticky text="budget?? ৳৳৳" color="#d9e6ff" /></Clutter>
      <Clutter at={196} x={960} y={930} rotate={0}><Toast /></Clutter>
      <Clutter at={220} x={760} y={150} rotate={-10}><QuestionMark size={120} /></Clutter>
      <Clutter at={236} x={1220} y={140} rotate={12}><QuestionMark size={90} /></Clutter>
      <Clutter at={250} x={1150} y={960} rotate={-8}><QuestionMark size={110} /></Clutter>
      {QUESTIONS.map((q) => (
        <Question key={q.text} {...q} />
      ))}
    </AbsoluteFill>
  );
}
