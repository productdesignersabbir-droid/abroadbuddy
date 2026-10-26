"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

export type IllustrationKind =
  | "readiness"
  | "universities"
  | "professors"
  | "scholarships"
  | "conferences"
  | "research"
  | "studio"
  | "mentoring";

export const ILLUSTRATION_TINT: Record<IllustrationKind, string> = {
  readiness: "#EAF6EF",
  universities: "#EEF2FF",
  professors: "#EDF7F1",
  scholarships: "#FFF7E4",
  conferences: "#F4F0FF",
  research: "#E8F6F8",
  studio: "#FFF0F1",
  mentoring: "#EEF2FF",
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

function Research() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(5)}>
        {/* one start splitting into three directions */}
        <path d="M110 150 C 150 150, 150 70, 206 70 M110 150 C 160 150, 170 118, 206 118 M110 150 H206" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="110" cy="150" r="9" fill="#2E6F7A" />
        {[70, 118, 150].map((y) => (
          <rect key={y} x="206" y={y - 9} width="34" height="18" rx="9" fill="#9ED3DB" />
        ))}
      </g>
      <g style={layer(10)}>
        <g className="ill-bob">
          <circle cx="104" cy="74" r="20" fill="#fff" />
          <path d="M98 70 a6 6 0 1 1 9 5 c-2 1 -3 2 -3 5 M104 86 v0.5" fill="none" stroke="#2E6F7A" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function Studio() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(5)}>
        <rect x="104" y="36" width="104" height="136" rx="10" fill="#fff" />
        <rect x="120" y="54" width="48" height="8" rx="4" fill="#FF9AA1" />
        {[76, 88, 100, 120, 132, 144].map((y, i) => (
          <rect key={y} x="120" y={y} width={i % 3 === 2 ? 44 : 72} height="5" rx="2.5" fill="#FBDDE0" />
        ))}
      </g>
      <g style={layer(11)}>
        <g className="ill-sway" style={{ transformOrigin: "232px 150px", animationDuration: "4s" }}>
          <path d="M226 88 l12 0 l0 52 l-6 12 l-6 -12z" fill="#FF6B74" />
          <rect x="226" y="80" width="12" height="10" rx="3" fill="#0B1220" />
        </g>
      </g>
    </svg>
  );
}

function Mentoring() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <g style={layer(5)}>
        <circle cx="122" cy="100" r="16" fill="#7C93F5" />
        <path d="M94 160 C 96 128, 148 128, 150 160 Z" fill="#7C93F5" />
        <circle cx="198" cy="104" r="14" fill="#B7C6FF" />
        <path d="M174 160 C 176 132, 220 132, 222 160 Z" fill="#B7C6FF" />
        <rect x="84" y="160" width="152" height="6" rx="3" fill="#D9E1FF" />
      </g>
      <g style={layer(11)}>
        <g className="ill-bob">
          <rect x="140" y="46" width="62" height="28" rx="12" fill="#fff" />
          <path d="M156 74 l-4 9 12 -9z" fill="#fff" />
          {[158, 171, 184].map((x) => (
            <circle key={x} cx={x} cy="60" r="3" fill="#1E4FFF" />
          ))}
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
  research: Research,
  studio: Studio,
  mentoring: Mentoring,
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
