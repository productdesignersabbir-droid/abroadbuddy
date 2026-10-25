import { C } from "./theme";

type IconProps = { size?: number; color?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

function Readiness({ size = 24, color = C.ink }: IconProps) {
  return (
    <svg {...base(size)} stroke={color}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.3l2.4 2.4 4.8-5" />
    </svg>
  );
}

function Universities({ size = 24, color = C.ink }: IconProps) {
  return (
    <svg {...base(size)} stroke={color}>
      <path d="M3 9l9-4.5L21 9l-9 4.5z" />
      <path d="M7 11v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V11" />
      <path d="M21 9v5" />
    </svg>
  );
}

function Professor({ size = 24, color = C.ink }: IconProps) {
  return (
    <svg {...base(size)} stroke={color}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" />
    </svg>
  );
}

function Scholarships({ size = 24, color = C.ink }: IconProps) {
  return (
    <svg {...base(size)} stroke={color}>
      <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </svg>
  );
}

function Conferences({ size = 24, color = C.ink }: IconProps) {
  return (
    <svg {...base(size)} stroke={color}>
      <rect x="3.5" y="5" width="17" height="11" rx="2" />
      <path d="M12 16v3.5M8.5 19.5h7M7.5 12.5l3-3 2.5 2 3.5-3.5" />
    </svg>
  );
}

export const FEATURE_ICONS = {
  readiness: Readiness,
  universities: Universities,
  professor: Professor,
  scholarships: Scholarships,
  conferences: Conferences,
};
