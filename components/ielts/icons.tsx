type IconProps = { color: string };

export function IconListening({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-1v-6h3M4 17v-4h3v6H6a2 2 0 01-2-2z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconReading({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 6c-1.6-1.2-3.6-1.8-6-1.8v13c2.4 0 4.4.6 6 1.8m0-13c1.6-1.2 3.6-1.8 6-1.8v13c-2.4 0-4.4.6-6 1.8m0-13v13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconWriting({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20l1-4.2L15.8 5a1.8 1.8 0 012.6 0l.6.6a1.8 1.8 0 010 2.6L8.2 19 4 20z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 6.5l3.5 3.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSpeaking({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" stroke={color} strokeWidth="2" />
      <path
        d="M5 11a7 7 0 0014 0M12 18v3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
