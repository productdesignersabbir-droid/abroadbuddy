import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, F } from "./theme";

/* ───────────── motion helpers ───────────── */

/** A soft, overshoot-free spring that starts at `delay` frames. */
export function useEnter(delay = 0, durationInFrames = 26) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, durationInFrames, config: { damping: 200 } });
}

/** 0→1 over a frame range with a smooth ease. */
export function useProgress(from: number, to: number, ease = Easing.bezier(0.33, 0, 0.2, 1)) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

/** Fades, lifts and un-blurs its children in. */
export function Rise({
  delay = 0,
  y = 28,
  blur = 10,
  children,
  style,
}: {
  delay?: number;
  y?: number;
  blur?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const p = useEnter(delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * y}px)`,
        filter: blur ? `blur(${(1 - p) * blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Word-by-word reveal for big serif headlines. */
export function WordReveal({
  text,
  delay = 0,
  stagger = 4,
  accent = [],
  accentColor,
  style,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  accent?: string[];
  accentColor?: string;
  style?: CSSProperties;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((w, i) => (
        <Word key={i} word={w} delay={delay + i * stagger} italic={accent.includes(w.replace(/[.,?!]/g, ""))} color={accentColor} />
      ))}
    </span>
  );
}

function Word({ word, delay, italic, color }: { word: string; delay: number; italic: boolean; color?: string }) {
  const p = useEnter(delay, 22);
  return (
    <span
      style={{
        display: "inline-block",
        marginRight: "0.24em",
        opacity: p,
        transform: `translateY(${(1 - p) * 0.35}em)`,
        filter: `blur(${(1 - p) * 8}px)`,
        fontStyle: italic ? "italic" : undefined,
        color: italic && color ? color : undefined,
      }}
    >
      {word}
    </span>
  );
}

/* ───────────── brand ───────────── */

export const PLANE_PATH =
  "M10 0 L-2 -1.8 L-6.5 -9 L-9 -9 L-6 -1.6 L-11.5 -1.2 L-14 -4.5 L-16 -4.5 L-14.5 0 L-16 4.5 L-14 4.5 L-11.5 1.2 L-6 1.6 L-9 9 L-6.5 9 L-2 1.8 Z";

/** The site's "easiabroad" wordmark. `flight` (0–1) draws the flight path off the i. */
export function Wordmark({
  height = 66,
  light = false,
  flight = 1,
}: {
  height?: number;
  light?: boolean;
  flight?: number;
}) {
  const accent = light ? "#8FB0FF" : C.logoBlue;
  const base = light ? C.white : C.logoNavy;
  return (
    <svg viewBox="0 0 330 66" height={height} style={{ overflow: "visible" }}>
      <g style={{ fontFamily: F.logo, fontWeight: 500 }} fontSize="58">
        <text x="0" y="60" fill={accent} textLength="98" lengthAdjust="spacingAndGlyphs">
          eas
        </text>
        <text x="121" y="60" fill={base} textLength="207" lengthAdjust="spacingAndGlyphs">
          abroad
        </text>
      </g>
      <rect x="104" y="29" width="9" height="31" rx="1.5" fill={accent} />
      <g style={{ clipPath: `inset(0 ${(1 - flight) * 100}% 0 0)` }}>
        <path d="M104 31 Q 196 15 291 9.5 L291 13 Q 198 21 113 34 Z" fill={accent} />
      </g>
      <path
        d={PLANE_PATH}
        transform={`translate(${104 + flight * 200} ${33 - flight * 23}) rotate(-5) scale(0.95)`}
        fill={accent}
        opacity={flight > 0.02 ? 1 : 0}
      />
    </svg>
  );
}

export function Accent({ children, color }: { children: ReactNode; color?: string }) {
  return <em style={{ fontStyle: "italic", color }}>{children}</em>;
}

/* ───────────── surfaces ───────────── */

/** Warm paper backdrop with slow-drifting colour glows. */
export function Backdrop({ tint = 1 }: { tint?: number }) {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <AbsoluteFill style={{ background: C.paper, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          left: 980 + Math.sin(t * 0.35) * 60,
          top: -420 + Math.cos(t * 0.3) * 50,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,79,255,0.10), transparent 62%)",
          opacity: tint,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: -320 + Math.cos(t * 0.28) * 50,
          top: 420 + Math.sin(t * 0.33) * 40,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,59,71,0.07), transparent 62%)",
          opacity: tint,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${C.line} 1.4px, transparent 1.4px)`,
          backgroundSize: "36px 36px",
          opacity: 0.55,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </AbsoluteFill>
  );
}

export function Card({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: 28,
        boxShadow: "0 1px 0 rgba(11,18,32,0.04), 0 30px 60px -30px rgba(11,18,32,0.25)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  bg = C.soft,
  color = C.ink,
  style,
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 99,
        padding: "8px 16px",
        background: bg,
        color,
        fontFamily: F.body,
        fontSize: 20,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ───────────── cursor ───────────── */

export type CursorKey = { frame: number; x: number; y: number; click?: boolean };

/** A macOS-style pointer that glides between keyframes and pulses on clicks. */
export function Cursor({ keys }: { keys: CursorKey[] }) {
  const frame = useCurrentFrame();
  const frames = keys.map((k) => k.frame);
  const ease = Easing.bezier(0.45, 0, 0.2, 1);
  const x = interpolate(frame, frames, keys.map((k) => k.x), { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const y = interpolate(frame, frames, keys.map((k) => k.y), { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const appear = interpolate(frame, [keys[0].frame - 8, keys[0].frame], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const click = keys.find((k) => k.click && frame >= k.frame && frame < k.frame + 14);
  const pulse = click ? (frame - click.frame) / 14 : 0;
  const press = click ? 1 - Math.sin(Math.min(1, pulse * 2) * Math.PI) * 0.15 : 1;

  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: appear, zIndex: 50, pointerEvents: "none" }}>
      {click && (
        <div
          style={{
            position: "absolute",
            left: -26,
            top: -26,
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: `3px solid ${C.blue}`,
            opacity: 1 - pulse,
            transform: `scale(${0.4 + pulse})`,
          }}
        />
      )}
      <svg width="34" height="40" viewBox="0 0 24 28" style={{ transform: `scale(${press})`, transformOrigin: "0 0", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))" }}>
        <path d="M2 1.5 L2 22 L7.5 17 L11 25.5 L14.5 24 L11 15.8 L18.5 15.8 Z" fill={C.ink} stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ───────────── feature layout ───────────── */

/** Two-column layout used by every feature scene: copy on the left, product on the right. */
export function FeatureScene({
  index,
  label,
  title,
  sub,
  children,
}: {
  index: number;
  label: string;
  title: ReactNode;
  sub: string;
  children: ReactNode;
}) {
  const stage = useEnter(6, 34);
  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill style={{ padding: "0 120px", display: "flex", flexDirection: "row", alignItems: "center", gap: 90 }}>
        <div style={{ width: 640, flexShrink: 0 }}>
          <Rise delay={2}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: F.body, fontSize: 22, color: C.sub }}>
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: C.ink,
                  color: C.white,
                  fontWeight: 600,
                  fontSize: 19,
                }}
              >
                0{index}
              </span>
              {label}
            </div>
          </Rise>
          <Rise delay={8}>
            <h2
              style={{
                margin: "34px 0 0",
                fontFamily: F.display,
                fontWeight: 500,
                fontSize: 92,
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                color: C.ink,
              }}
            >
              {title}
            </h2>
          </Rise>
          <Rise delay={16}>
            <p style={{ margin: "30px 0 0", fontFamily: F.body, fontSize: 30, lineHeight: 1.45, color: C.sub, maxWidth: 560 }}>{sub}</p>
          </Rise>
        </div>
        <div
          style={{
            flex: 1,
            height: 760,
            position: "relative",
            opacity: stage,
            transform: `translateY(${(1 - stage) * 50}px) scale(${0.96 + stage * 0.04})`,
          }}
        >
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
