type IconProps = { color?: string };

export function IconPin({ color = "#5A6577" }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function IconClock({ color = "#FF3B47" }: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path
        d="M12 7v5l3.5 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconExternalLink({ color = "currentColor" }: IconProps) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7H9M17 7v8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
