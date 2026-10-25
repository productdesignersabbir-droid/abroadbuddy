import Link from "next/link";

// Brand colours from the EasiAbroad logo.
const BLUE = "#1F4FD8";
const NAVY = "#1B2559";

/** Plane silhouette pointing right, centred on 0,0. */
export const PLANE_PATH =
  "M10 0 L-2 -1.8 L-6.5 -9 L-9 -9 L-6 -1.6 L-11.5 -1.2 L-14 -4.5 L-16 -4.5 L-14.5 0 L-16 4.5 L-14 4.5 L-11.5 1.2 L-6 1.6 L-9 9 L-6.5 9 L-2 1.8 Z";

/** The "easiabroad" wordmark: blue "easi", navy "abroad", and a flight path off the i. */
export function Wordmark({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const accent = light ? "#8FB0FF" : BLUE;
  const base = light ? "#FFFFFF" : NAVY;
  return (
    <svg viewBox="0 0 330 66" className={className} role="img" aria-label="EasiAbroad">
      <g style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif", fontWeight: 500 }} fontSize="58">
        <text x="0" y="60" fill={accent} textLength="98" lengthAdjust="spacingAndGlyphs">
          eas
        </text>
        <text x="121" y="60" fill={base} textLength="207" lengthAdjust="spacingAndGlyphs">
          abroad
        </text>
      </g>
      {/* The i: a stem whose "dot" takes off as a flight path. */}
      <rect x="104" y="29" width="9" height="31" rx="1.5" fill={accent} />
      <path d="M104 31 Q 196 15 291 9.5 L291 13 Q 198 21 113 34 Z" fill={accent} />
      <path d={PLANE_PATH} transform="translate(304 10) rotate(-5) scale(0.95)" fill={accent} />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center no-underline" aria-label="EasiAbroad home">
      <Wordmark light={light} className="h-8 w-auto sm:h-9" />
    </Link>
  );
}
