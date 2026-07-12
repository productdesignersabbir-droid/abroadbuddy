type IconProps = { color: string };

export function IconSearch({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M20 20l-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconDoc({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 3h8l4 4v14H6z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconMentor({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.4" stroke={color} strokeWidth="2" />
      <path
        d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconLab({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3v6l-4.5 8A2 2 0 006.3 20h11.4a2 2 0 001.8-3L15 9V3"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 3h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconStory({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5h16v11H8l-4 4z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCal({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="16" rx="2" stroke={color} strokeWidth="2" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlane({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 11.5L21 3l-6.5 18-3.2-7.3L3 11.5z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTest({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 4h14v16H5z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M8 9l2 2 3-3M8 15h8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconVideo({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" stroke={color} strokeWidth="2" />
      <path
        d="M16 10.5l5-3v9l-5-3"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <span className="grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full bg-blue/10">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12l4 4 10-10"
          stroke="#1E4FFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
