"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

export type IllustrationKind =
  | "readiness"
  | "universities"
  | "professors"
  | "scholarships"
  | "conferences";

export const ILLUSTRATION_TINT: Record<IllustrationKind, string> = {
  readiness: "#EAF6EF",
  universities: "#EEF2FF",
  professors: "#EDF7F1",
  scholarships: "#FFF7E4",
  conferences: "#F4F0FF",
};

/** Moves a layer gently with the pointer; `depth` is how far it travels, in px. */
const layer = (depth: number): CSSProperties => ({
  transform: `translate(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px))`,
  transition: "transform 0.5s ease-out",
});

// Each illustration keeps to one soft main tone plus a single accent, and
// only one element moves on its own, so the grid reads as calm.

function Readiness() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(6)}>
        <path d="M100 148 A60 60 0 0 1 220 148" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M100 148 A60 60 0 0 1 220 148"
          fill="none"
          stroke="#7CCB9F"
          strokeWidth="14"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.88 1"
        />
        <g className="ill-sway" style={{ animationDuration: "4.5s" }}>
          <path d="M158 148 L160 104 L162 148 Z" fill="#2B4A3A" />
        </g>
        <circle cx="160" cy="148" r="6" fill="#2B4A3A" />
        <text x="160" y="178" textAnchor="middle" className="fill-[#2B4A3A] font-body text-[12px]">
          88 · Ready
        </text>
      </g>
      <g style={layer(10)}>
        <circle cx="236" cy="70" r="11" fill="#fff" />
        <path d="M231 70 l3.5 3.5 7-7" fill="none" stroke="#3DA36A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Universities() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(6)}>
        <rect x="108" y="160" width="104" height="8" rx="4" fill="#D9E1FF" />
        <path d="M106 96 L160 68 L214 96 Z" fill="#9DB1FF" />
        <rect x="114" y="96" width="92" height="6" rx="2" fill="#B7C6FF" />
        {[122, 142, 162, 182].map((x) => (
          <rect key={x} x={x} y="106" width="16" height="50" rx="4" fill="#fff" />
        ))}
        <path d="M160 68 V46" stroke="#5A6577" strokeWidth="1.5" />
        <path d="M161 47 h16 l-4 5 4 5 h-16z" fill="#FF9AA1" className="ill-wave" />
      </g>
      <g style={layer(12)}>
        <g className="ill-drift">
          <path d="M248 58 l-16 -5 4 5 -4 5z M232 58 h-10" fill="#7C93F5" stroke="#7C93F5" strokeWidth="1" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

function Professors() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(5)}>
        <rect x="70" y="50" width="180" height="104" rx="20" fill="#fff" />
        <circle cx="122" cy="102" r="28" fill="#D4EEDD" />
        <circle cx="122" cy="94" r="10" fill="#6FBF92" />
        <path d="M104 122 C 106 108, 138 108, 140 122 Z" fill="#6FBF92" />
        {[84, 100, 116].map((y, i) => (
          <rect key={y} x="166" y={y} width={i === 2 ? 36 : 56} height="6" rx="3" fill="#E2F2E8" />
        ))}
      </g>
      <g style={layer(10)}>
        <g className="ill-scan">
          <circle cx="140" cy="96" r="18" fill="#fff" fillOpacity="0.3" stroke="#2B4A3A" strokeWidth="3.5" />
          <path d="M153 109 L166 122" stroke="#2B4A3A" strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function Scholarships() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(6)}>
        <rect x="100" y="52" width="120" height="112" rx="16" fill="#fff" />
        <path d="M100 68 a16 16 0 0 1 16 -16 h88 a16 16 0 0 1 16 16 v8 h-120z" fill="#F6CE7A" />
        {[128, 192].map((x) => (
          <rect key={x} x={x - 2.5} y="44" width="5" height="16" rx="2.5" fill="#5A6577" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => {
          const cx = 120 + (i % 5) * 20;
          const cy = 98 + Math.floor(i / 5) * 22;
          return i === 7 ? (
            <circle key={i} cx={cx} cy={cy} r="7" fill="#FF9AA1" className="ill-pulse" />
          ) : (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#F3E1B5" />
          );
        })}
      </g>
    </svg>
  );
}

function Conferences() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(5)}>
        <path d="M160 24 L118 162 L202 162 Z" fill="#fff" opacity="0.65" />
        <rect x="84" y="162" width="152" height="6" rx="3" fill="#DED5FF" />
        <rect x="140" y="118" width="40" height="44" rx="7" fill="#B3A2F8" />
        <rect x="134" y="113" width="52" height="8" rx="4" fill="#C6B9FA" />
        <circle cx="160" cy="86" r="11" fill="#5B4F99" />
        <path d="M142 113 C 144 98, 176 98, 178 113 Z" fill="#5B4F99" />
      </g>
      <g style={layer(10)}>
        <g className="ill-bob">
          <rect x="196" y="58" width="64" height="24" rx="10" fill="#fff" />
          <rect x="207" y="67" width="30" height="3.5" rx="1.75" fill="#DED5FF" />
          <rect x="207" y="73" width="42" height="3.5" rx="1.75" fill="#DED5FF" />
        </g>
      </g>
    </svg>
  );
}

const ILLUSTRATIONS: Record<IllustrationKind, () => ReactNode> = {
  readiness: Readiness,
  universities: Universities,
  professors: Professors,
  scholarships: Scholarships,
  conferences: Conferences,
};

/** A light, tinted panel whose illustration leans toward the pointer. */
export function FeatureIllustration({
  kind,
  className = "",
}: {
  kind: IllustrationKind;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Illustration = ILLUSTRATIONS[kind];

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative overflow-hidden rounded-[22px] ${className}`}
      style={{ background: ILLUSTRATION_TINT[kind] }}
    >
      <Illustration />
    </div>
  );
}
