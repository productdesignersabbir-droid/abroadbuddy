import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../theme";
import { Backdrop, Rise, Wordmark, useEnter, useProgress } from "../ui";
import { FEATURE_ICONS } from "../icons";

const ORBIT = [
  { label: "Readiness", icon: "readiness" },
  { label: "Universities", icon: "universities" },
  { label: "Professors", icon: "professor" },
  { label: "Scholarships", icon: "scholarships" },
  { label: "Conferences", icon: "conferences" },
] as const;

function OrbitChip({ i, label, icon }: { i: number; label: string; icon: keyof typeof FEATURE_ICONS }) {
  const frame = useCurrentFrame();
  const p = useEnter(44 + i * 6, 26);
  const angle = -90 + i * 72 + frame * 0.18;
  const rad = (angle * Math.PI) / 180;
  const rx = 640 * (0.7 + p * 0.3);
  const ry = 330 * (0.7 + p * 0.3);
  const Icon = FEATURE_ICONS[icon];
  return (
    <div
      style={{
        position: "absolute",
        left: 960 + Math.cos(rad) * rx,
        top: 540 + Math.sin(rad) * ry,
        transform: `translate(-50%, -50%) scale(${0.7 + p * 0.3})`,
        opacity: p,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 22px 12px 12px",
        borderRadius: 99,
        background: C.white,
        boxShadow: "0 24px 44px -26px rgba(11,18,32,0.35)",
        fontFamily: F.body,
        fontSize: 22,
        fontWeight: 500,
        color: C.ink,
      }}
    >
      <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: "50%", background: C.soft }}>
        <Icon size={24} />
      </span>
      {label}
    </div>
  );
}

export function Reveal() {
  const frame = useCurrentFrame();
  const dot = useEnter(0, 18);
  const burst = useProgress(4, 30);
  const mark = useEnter(8, 30);
  const flight = useProgress(18, 50);
  const ring = useProgress(30, 70);

  return (
    <AbsoluteFill>
      <Backdrop />
      {/* The point all the clutter collapsed into, bursting open. */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 540,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          background: C.blue,
          transform: `scale(${dot * (1 - burst)})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 540,
          width: 900,
          height: 900,
          marginLeft: -450,
          marginTop: -450,
          borderRadius: "50%",
          border: `2px solid ${C.blue}`,
          opacity: (1 - burst) * 0.5,
          transform: `scale(${burst})`,
        }}
      />
      {/* Dotted orbit */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: ring * 0.9 }}>
        <ellipse cx={960} cy={540} rx={640} ry={330} fill="none" stroke={C.line} strokeWidth={2.5} strokeDasharray="2 12" strokeLinecap="round" />
      </svg>
      {ORBIT.map((o, i) => (
        <OrbitChip key={o.label} i={i} label={o.label} icon={o.icon} />
      ))}

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            transform: `translateY(${(1 - mark) * 30 - 30}px) scale(${0.9 + mark * 0.1})`,
            opacity: mark,
            filter: `blur(${(1 - mark) * 10}px)`,
          }}
        >
          <Wordmark height={150} flight={flight} />
        </div>
        <Rise delay={34}>
          <p
            style={{
              margin: "36px 0 0",
              fontFamily: F.display,
              fontSize: 54,
              letterSpacing: "-0.02em",
              color: C.ink,
              textAlign: "center",
              transform: `translateY(-30px)`,
            }}
          >
            Your whole study-abroad journey, <em>one platform.</em>
          </p>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
