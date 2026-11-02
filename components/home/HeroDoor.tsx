// A student walks up to a door and opens it; light spills out and the
// milestones of the journey step through, one after another. Pure SVG and
// CSS (see .hero-door in globals.css), so it costs nothing to run.

const DOOR = { x: 150, y: 112, w: 120, h: 288 };
const FLOOR = 400;

type Card = { x: number; y: number; label: string; title: string; bar: string };

const W = 140;
const H = 48;

const CARDS: Card[] = [
  { x: 300, y: 92, label: "Offer", title: "Admission offer", bar: "#1E4FFF" },
  { x: 452, y: 130, label: "Funding", title: "Scholarship awarded", bar: "#FF3B47" },
  { x: 300, y: 168, label: "Research", title: "Professor replied", bar: "#0B1220" },
  { x: 452, y: 206, label: "Visa", title: "Visa approved", bar: "#1E4FFF" },
  { x: 300, y: 244, label: "Housing", title: "Room near campus", bar: "#FF3B47" },
  { x: 452, y: 282, label: "Flight", title: "DAC → your city", bar: "#0B1220" },
];

// Where the cards come from: the middle of the open doorway.
const FROM = { x: DOOR.x + DOOR.w / 2, y: DOOR.y + DOOR.h / 2 };

export function HeroDoor() {
  return (
    <div className="hero-door relative mx-auto w-full max-w-[600px]">
      <svg
        viewBox="0 0 600 460"
        className="h-auto w-full"
        role="img"
        aria-label="A student opens a door to an admission offer, a scholarship, a professor's reply, a visa, a room and a flight"
      >
        <defs>
          <linearGradient id="hd-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFF8E8" />
            <stop offset="1" stopColor="#FFE6B0" />
          </linearGradient>
          <linearGradient id="hd-spill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE6B0" stopOpacity="0.85" />
            <stop offset="1" stopColor="#FFE6B0" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hd-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFE6B0" stopOpacity="0.7" />
            <stop offset="1" stopColor="#FFE6B0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Light: a glow behind the doorway and a pool on the floor. */}
        <g className="hd-light">
          <ellipse cx={FROM.x} cy={FROM.y} rx="190" ry="210" fill="url(#hd-glow)" />
          <polygon
            points={`${DOOR.x},${FLOOR} ${DOOR.x + DOOR.w},${FLOOR} ${DOOR.x + DOOR.w + 150},458 ${DOOR.x - 70},458`}
            fill="url(#hd-spill)"
          />
        </g>

        <line x1="20" y1={FLOOR} x2="580" y2={FLOOR} stroke="#E6E0D6" strokeWidth="2" />

        {/* The doorway: frame, the bright room beyond, then the door itself. */}
        <rect x={DOOR.x - 8} y={DOOR.y - 8} width={DOOR.w + 16} height={DOOR.h + 8} fill="#FAF7F3" stroke="#0B1220" strokeWidth="3" />
        <rect x={DOOR.x} y={DOOR.y} width={DOOR.w} height={DOOR.h} fill="#EBE6DE" />
        <rect className="hd-light" x={DOOR.x} y={DOOR.y} width={DOOR.w} height={DOOR.h} fill="url(#hd-light)" />

        <g className="hd-door">
          <rect x={DOOR.x} y={DOOR.y} width={DOOR.w} height={DOOR.h} fill="#1E4FFF" />
          <rect x={DOOR.x + 14} y={DOOR.y + 16} width={DOOR.w - 28} height="106" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2" />
          <rect x={DOOR.x + 14} y={DOOR.y + 140} width={DOOR.w - 28} height="130" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2" />
          <rect x={DOOR.x + 8} y="262" width="6" height="18" fill="#FAF7F3" />
        </g>

        {/* The milestones that come through the door. */}
        {CARDS.map((c, i) => (
          <g
            key={c.title}
            className="hd-card"
            style={
              {
                "--hd-dx": `${FROM.x - (c.x + W / 2)}px`,
                "--hd-dy": `${FROM.y - (c.y + H / 2)}px`,
                animationName: `hd-card-${i}`,
              } as React.CSSProperties
            }
          >
            <rect x={c.x} y={c.y} width={W} height={H} fill="#FFFFFF" stroke="#E6E0D6" />
            <rect x={c.x} y={c.y} width="4" height={H} fill={c.bar} />
            <text x={c.x + 16} y={c.y + 19} className="fill-sub font-body text-[9.5px] uppercase tracking-[0.14em]">
              {c.label}
            </text>
            <text x={c.x + 16} y={c.y + 36} className="fill-ink font-body text-[13px] font-semibold">
              {c.title}
            </text>
          </g>
        ))}

        {/* The student, drawn around x = 0 and walked into place. */}
        <g className="hd-walker">
          <ellipse cx="0" cy={FLOOR + 2} rx="26" ry="4" fill="#0B1220" fillOpacity="0.12" />
          <line className="hd-leg hd-leg-a" x1="-5" y1="336" x2="-9" y2="396" stroke="#0B1220" strokeWidth="9" strokeLinecap="round" />
          <line className="hd-leg hd-leg-b" x1="5" y1="336" x2="9" y2="396" stroke="#26314A" strokeWidth="9" strokeLinecap="round" />
          <rect x="-29" y="270" width="15" height="44" rx="3" fill="#FF3B47" />
          <rect x="-16" y="262" width="32" height="80" rx="9" fill="#0B1220" />
          <line className="hd-arm" x1="8" y1="276" x2="26" y2="304" stroke="#B9805C" strokeWidth="8" strokeLinecap="round" />
          <circle cx="0" cy="240" r="15" fill="#B9805C" />
          <path d="M-15 238 Q-14 220 0 220 Q15 220 15 236 Q8 228 -2 230 Q-10 231 -15 238 Z" fill="#0B1220" />
          <g className="hd-wow" stroke="#FF3B47" strokeWidth="2.5" strokeLinecap="round">
            <path d="M22 220 l7 -7" />
            <path d="M27 232 l9 -2" />
            <path d="M14 214 l1 -9" />
          </g>
        </g>
      </svg>
    </div>
  );
}
