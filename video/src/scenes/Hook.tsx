import { getLength, getPointAtLength, getTangentAtLength } from "@remotion/paths";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../theme";
import { Backdrop, PLANE_PATH, Rise, WordReveal, useEnter, useProgress } from "../ui";

const FLIGHT = "M -80 900 C 420 980, 640 560, 1000 600 S 1640 300, 2020 140";
const FLIGHT_LENGTH = getLength(FLIGHT);

function Flight() {
  const p = useProgress(38, 140);
  const len = FLIGHT_LENGTH * p;
  const point = getPointAtLength(FLIGHT, Math.max(1, len)) ?? { x: 0, y: 0 };
  const tangent = getTangentAtLength(FLIGHT, Math.max(1, len)) ?? { x: 1, y: 0 };
  const angle = (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI;

  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <mask id="flight-reveal">
          <path
            d={FLIGHT}
            fill="none"
            stroke="white"
            strokeWidth={14}
            strokeDasharray={FLIGHT_LENGTH}
            strokeDashoffset={FLIGHT_LENGTH - len}
          />
        </mask>
      </defs>
      <path
        d={FLIGHT}
        fill="none"
        stroke={C.blue}
        strokeOpacity={0.45}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="0.1 18"
        mask="url(#flight-reveal)"
      />
      {p > 0 && p < 1 && (
        <path
          d={PLANE_PATH}
          fill={C.blue}
          transform={`translate(${point.x} ${point.y}) rotate(${angle}) scale(3.2)`}
        />
      )}
    </svg>
  );
}

function StudentChip() {
  const p = useEnter(70, 30);
  const frame = useCurrentFrame();
  const float = Math.sin(frame / 18) * 6;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 250,
        transform: `translate(-50%, ${(1 - p) * 30 + float}px)`,
        opacity: p,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "14px 26px 14px 14px",
        borderRadius: 99,
        background: C.white,
        boxShadow: "0 24px 50px -28px rgba(11,18,32,0.35)",
        fontFamily: F.body,
      }}
    >
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#efe6da",
          display: "grid",
          placeItems: "center",
          fontFamily: F.display,
          fontSize: 26,
          color: C.ink,
        }}
      >
        R
      </span>
      <span style={{ fontSize: 23, color: C.ink, fontWeight: 600 }}>Rafi</span>
      <span style={{ fontSize: 21, color: C.sub }}>Final-year CSE · Dhaka</span>
      <span style={{ fontSize: 21, color: C.ink, background: C.soft, borderRadius: 99, padding: "6px 14px" }}>CGPA 3.62</span>
    </div>
  );
}

export function Hook() {
  const frame = useCurrentFrame();
  // Slow push-in for the whole scene.
  const zoom = interpolate(frame, [0, 166], [1, 1.04]);
  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Flight />
        <StudentChip />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 70 }}>
          <div
            style={{
              fontFamily: F.display,
              fontWeight: 500,
              fontSize: 148,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: C.ink,
              textAlign: "center",
            }}
          >
            <div>
              <WordReveal text="You've got the grades." delay={6} stagger={5} />
            </div>
            <div>
              <WordReveal text="You've got the dream." delay={46} stagger={5} accent={["dream"]} accentColor={C.blue} />
            </div>
          </div>
          <Rise delay={82}>
            <p style={{ marginTop: 40, fontFamily: F.body, fontSize: 30, color: C.sub }}>of studying abroad.</p>
          </Rise>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
