import type { CSSProperties, ReactNode } from "react";

// A departure gate: the student walks up, the door swings open onto a campus
// at sunrise, and the milestones of the journey fly out as tickets that get
// checked off. Then the student steps through and the gate closes. Pure HTML,
// SVG and CSS (see .hero-door in globals.css), sized in cqw so it scales as one.

const INK = "#0B1220";
const BLUE = "#1E4FFF";
const RED = "#FF3B47";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const CARDS: { label: string; title: string; tone: string; icon: ReactNode }[] = [
  {
    label: "Offer",
    title: "Admission offer",
    tone: BLUE,
    icon: (
      <Icon>
        <path d="M2 9l10-5 10 5-10 5z" />
        <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
      </Icon>
    ),
  },
  {
    label: "Funding",
    title: "Full scholarship",
    tone: RED,
    icon: (
      <Icon>
        <rect x="3" y="6" width="18" height="12" />
        <circle cx="12" cy="12" r="2.5" />
      </Icon>
    ),
  },
  {
    label: "Research",
    title: "Professor replied",
    tone: INK,
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" />
        <path d="M3 7l9 6 9-6" />
      </Icon>
    ),
  },
  {
    label: "Visa",
    title: "Visa approved",
    tone: BLUE,
    icon: (
      <Icon>
        <rect x="6" y="3" width="12" height="18" />
        <circle cx="12" cy="10" r="3" />
        <path d="M9 16h6" />
      </Icon>
    ),
  },
  {
    label: "Flight",
    title: "DAC → your city",
    tone: RED,
    icon: (
      <Icon>
        <path d="M2 13l20-7-6 14-4-5z" />
        <path d="M12 15l10-9" />
      </Icon>
    ),
  },
];

export function HeroDoor() {
  return (
    <div
      className="hero-door relative mx-auto w-full max-w-[600px]"
      role="img"
      aria-label="A student walks through a departure gate. An admission offer, a scholarship, a professor's reply, a visa and a flight come through and get checked off."
    >
      <div className="hd-stage">
        {/* Back: warm light on the wall and the floor line. */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 84" preserveAspectRatio="none">
          <defs>
            <radialGradient id="hd-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#FFD58F" stopOpacity="0.55" />
              <stop offset="1" stopColor="#FFD58F" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hd-floor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#E6E0D6" stopOpacity="0" />
              <stop offset="0.2" stopColor="#E6E0D6" />
              <stop offset="0.8" stopColor="#E6E0D6" />
              <stop offset="1" stopColor="#E6E0D6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse className="hd-glow" cx="25" cy="44" rx="34" ry="40" fill="url(#hd-glow)" />
          <rect x="0" y="69.8" width="52" height="0.4" fill="url(#hd-floor)" />
        </svg>

        <div className="hd-sign">
          <span>Gate 01</span>
          <span className="flex items-center">
            <i />
            Boarding
          </span>
        </div>

        <div className="hd-frame" />
        <div className="hd-opening">
          <World />
          <div className="hd-flood" />
          <div className="hd-leaf">
            <div className="hd-handle" />
            <div className="hd-shade" />
          </div>
        </div>
        <div className="hd-crack" />

        {/* Front: the light that pours out across the floor. */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 84" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hd-spill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFE2A8" stopOpacity="0.8" />
              <stop offset="1" stopColor="#FFE2A8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon className="hd-spill" points="12,70 38,70 50,84 0,84" fill="url(#hd-spill)" />
        </svg>

        <div className="hd-walker">
          <Student />
        </div>

        {CARDS.map((c, i) => (
          <div
            key={c.title}
            className="hd-card"
            style={{ "--ct": `${9 + i * 11.6}cqw`, animationName: `hd-card-${i}` } as CSSProperties}
          >
            <span className="hd-ico" style={{ background: c.tone }}>
              {c.icon}
            </span>
            <span className="hd-txt">
              <span className="hd-lbl">{c.label}</span>
              <span className="hd-ttl">{c.title}</span>
            </span>
            <span className="hd-stub">
              <span className="hd-tick" style={{ animationName: `hd-tick-${i}` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** What waits beyond the gate: a campus at sunrise, and a plane taking off. */
function World() {
  return (
    <svg className="hd-world" viewBox="0 0 260 560" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="hd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B2FE8" />
          <stop offset="0.45" stopColor="#1E4FFF" />
          <stop offset="0.7" stopColor="#8FA8FF" />
          <stop offset="0.84" stopColor="#FFD6A0" />
          <stop offset="1" stopColor="#FFE9C4" />
        </linearGradient>
        <radialGradient id="hd-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF4DC" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFF4DC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="260" height="560" fill="url(#hd-sky)" />

      <g className="hd-stars" fill="#FFFFFF">
        <circle cx="40" cy="60" r="1.6" />
        <circle cx="200" cy="40" r="1.2" />
        <circle cx="150" cy="110" r="1.4" />
        <circle cx="70" cy="170" r="1" />
        <circle cx="225" cy="150" r="1.6" />
        <circle cx="110" cy="30" r="1" />
      </g>

      <circle cx="150" cy="440" r="120" fill="url(#hd-sun)" />
      <circle cx="150" cy="440" r="44" fill="#FFF4DC" />

      <g className="hd-cloud" fill="#FFFFFF" fillOpacity="0.55">
        <ellipse cx="60" cy="330" rx="38" ry="7" />
        <ellipse cx="200" cy="370" rx="30" ry="5" />
      </g>

      <g className="hd-plane">
        <line x1="40" y1="181" x2="106" y2="180" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="5 5" />
        <g fill="#FFFFFF">
          <path d="M110 180q4-5 12-5h24q8 0 11 5q-3 4-11 4h-32q-3 0-4-4z" />
          <path d="M110 180l-4-12h6l8 10z" />
          <path d="M128 182l-7 10h6l13-10z" />
        </g>
      </g>

      {/* Campus skyline against the sunrise. */}
      <g fill="#0A1B7A">
        <rect x="0" y="430" width="50" height="130" />
        <rect x="60" y="372" width="26" height="188" />
        <polygon points="58,372 73,338 88,372" />
        <polygon points="92,560 92,432 130,404 168,432 168,560" />
        <rect x="175" y="442" width="56" height="118" />
        <path d="M175 442a28 28 0 0 1 56 0z" />
        <rect x="201.5" y="400" width="3" height="16" />
        <rect x="232" y="458" width="40" height="102" />
      </g>
      <circle cx="73" cy="394" r="6" fill="#FFE9C4" fillOpacity="0.85" />
      <g fill="#FFD9A0" fillOpacity="0.85">
        <rect x="10" y="446" width="8" height="10" />
        <rect x="28" y="446" width="8" height="10" />
        <rect x="10" y="470" width="8" height="10" />
        <rect x="106" y="450" width="10" height="14" />
        <rect x="125" y="450" width="10" height="14" />
        <rect x="144" y="450" width="10" height="14" />
        <rect x="186" y="462" width="8" height="12" />
        <rect x="212" y="462" width="8" height="12" />
        <rect x="244" y="474" width="8" height="10" />
      </g>
      <rect x="0" y="508" width="260" height="52" fill="#081766" />
    </svg>
  );
}

/** The student, seen from behind, with a red backpack. Feet sit at y = 100. */
function Student() {
  return (
    <svg viewBox="0 0 40 130">
      <defs>
        <linearGradient id="hd-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INK} stopOpacity="0.28" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon className="hd-long-shadow" points="13,100 27,100 38,130 2,130" fill="url(#hd-shadow)" />
      <ellipse cx="20" cy="100.5" rx="10" ry="1.6" fill={INK} fillOpacity="0.2" />
      <g className="hd-body">
        <g className="hd-leg-a" fill={INK}>
          <rect x="13.5" y="64" width="6" height="34" />
          <rect x="12.5" y="96" width="7.5" height="4" />
        </g>
        <g className="hd-leg-b" fill="#26314A">
          <rect x="20.5" y="64" width="6" height="34" />
          <rect x="20" y="96" width="7.5" height="4" />
        </g>
        <rect x="7" y="38" width="4.5" height="27" fill={INK} />
        <rect x="10.5" y="34" width="19" height="34" fill={INK} />
        <rect className="hd-arm" x="28.5" y="38" width="4.5" height="27" fill={INK} />
        <rect x="12.5" y="38" width="15" height="21" fill={RED} />
        <rect x="12.5" y="38" width="15" height="5" fill="#D92A36" />
        <rect x="18" y="29" width="4" height="6" fill="#B9805C" />
        <circle cx="12" cy="24" r="1.5" fill="#B9805C" />
        <circle cx="28" cy="24" r="1.5" fill="#B9805C" />
        <circle cx="20" cy="23" r="8" fill={INK} />
      </g>
    </svg>
  );
}
