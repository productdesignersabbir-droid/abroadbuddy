type IconProps = { color?: string };

export function IconHome({ color = "#5A6577" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 11l8-7 8 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 20v-5h4v5" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWallet({ color = "#5A6577" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2" stroke={color} strokeWidth="2" />
      <path d="M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 14h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconRoute({ color = "#5A6577" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="5" cy="6" r="2" stroke={color} strokeWidth="2" />
      <circle cx="19" cy="18" r="2" stroke={color} strokeWidth="2" />
      <path
        d="M5 8v3a4 4 0 004 4h6a4 4 0 014 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
}
