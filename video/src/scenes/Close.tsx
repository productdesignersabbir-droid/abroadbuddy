import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../theme";
import { Backdrop, Cursor, PLANE_PATH, Rise, WordReveal, Wordmark, useEnter, useProgress } from "../ui";

const FIELDS = [
  { label: "Passenger", value: "You" },
  { label: "From", value: "Dhaka" },
  { label: "To", value: "Your dream university" },
  { label: "Boarding", value: "Now" },
];

/** The boarding pass that closes the film: ink stub on top, details below. */
function BoardingPass({ pressed }: { pressed: boolean }) {
  const frame = useCurrentFrame();
  const plane = useProgress(30, 76);
  return (
    <div style={{ width: 1120, borderRadius: 34, overflow: "hidden", background: C.white, boxShadow: "0 50px 100px -40px rgba(11,18,32,0.45)" }}>
      <div style={{ position: "relative", height: 210, background: C.ink, overflow: "hidden", padding: "40px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ position: "absolute", width: 600, height: 600, right: -160, top: -300, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,79,255,0.55), transparent 65%)" }} />
        <div style={{ position: "absolute", width: 500, height: 500, left: -200, bottom: -330, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,59,71,0.35), transparent 65%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: F.body, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Departure</div>
          <div style={{ fontFamily: F.display, fontSize: 96, color: C.white, lineHeight: 1 }}>DAC</div>
        </div>
        <div style={{ position: "relative", flex: 1, height: 40, margin: "40px 50px 0" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 19, borderTop: "2px dashed rgba(255,255,255,0.35)" }} />
          <svg viewBox="-20 -12 40 24" width={48} height={30} style={{ position: "absolute", top: 5, left: `calc(${plane * 100}% - 24px)`, transform: `translateY(${Math.sin(frame / 8) * 2}px)` }}>
            <path d={PLANE_PATH} fill={C.white} />
          </svg>
        </div>
        <div style={{ position: "relative", textAlign: "right" }}>
          <div style={{ fontFamily: F.body, fontSize: 18, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Arrival</div>
          <div style={{ fontFamily: F.display, fontSize: 96, color: C.white, lineHeight: 1, fontStyle: "italic" }}>Abroad</div>
        </div>
      </div>

      {/* perforation */}
      <div style={{ position: "relative", height: 0 }}>
        <div style={{ position: "absolute", left: 40, right: 40, top: -1, borderTop: `3px dotted ${C.line}` }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", padding: "40px 56px", gap: 40 }}>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "0.8fr 0.8fr 1.6fr 0.8fr", gap: 30 }}>
          {FIELDS.map((f) => (
            <div key={f.label}>
              <div style={{ fontFamily: F.body, fontSize: 16, letterSpacing: "0.12em", textTransform: "uppercase", color: C.sub }}>{f.label}</div>
              <div style={{ fontFamily: F.display, fontSize: 36, color: C.ink, marginTop: 6, whiteSpace: "nowrap" }}>{f.value}</div>
            </div>
          ))}
        </div>
        <span
          style={{
            padding: "20px 34px",
            borderRadius: 99,
            background: pressed ? C.blueDeep : C.blue,
            color: C.white,
            fontFamily: F.body,
            fontSize: 24,
            fontWeight: 600,
            whiteSpace: "nowrap",
            transform: `scale(${pressed ? 0.95 : 1})`,
            boxShadow: "0 18px 40px -14px rgba(30,79,255,0.7)",
          }}
        >
          Check my readiness →
        </span>
      </div>
    </div>
  );
}

export function Close() {
  const frame = useCurrentFrame();
  const pass = useEnter(18, 30);
  const pressed = frame >= 62 && frame < 70;

  // Act 1 (headline + pass) lifts away; act 2 (logo lockup) settles in.
  const out = useProgress(78, 98);
  const lockup = useEnter(86, 30);
  const flight = useProgress(90, 124);

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 70,
          opacity: 1 - out,
          transform: `translateY(${-out * 60}px) scale(${1 - out * 0.04})`,
          filter: `blur(${out * 10}px)`,
        }}
      >
        <h2 style={{ margin: 0, fontFamily: F.display, fontWeight: 500, fontSize: 120, letterSpacing: "-0.035em", color: C.ink, lineHeight: 1 }}>
          <WordReveal text="Stop guessing." delay={0} stagger={5} />
          <br />
          <WordReveal text="Start planning." delay={30} stagger={5} accent={["planning"]} accentColor={C.blue} />
        </h2>
        <div style={{ opacity: pass, transform: `translateY(${(1 - pass) * 140}px) rotate(${(1 - pass) * 3}deg)` }}>
          <BoardingPass pressed={pressed} />
        </div>
        <Cursor
          keys={[
            { frame: 34, x: 1180, y: 1000 },
            { frame: 58, x: 1340, y: 868 },
            { frame: 62, x: 1340, y: 868, click: true },
            { frame: 90, x: 1320, y: 900 },
          ]}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: lockup, transform: `scale(${0.94 + lockup * 0.06})` }}>
        <Wordmark height={190} flight={flight} />
        <Rise delay={108} style={{ marginTop: 46 }}>
          <div style={{ fontFamily: F.display, fontSize: 64, color: C.ink, letterSpacing: "-0.02em" }}>
            Study abroad, <em style={{ color: C.blue }}>made easy.</em>
          </div>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
