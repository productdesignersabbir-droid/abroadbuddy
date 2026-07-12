type IconProps = { color?: string };

export function IconResume({ color = "#1E4FFF" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="8.5" r="2" stroke={color} strokeWidth="1.6" />
      <path
        d="M8.5 13.5c0-1.4 1.6-2 3.5-2s3.5.6 3.5 2M8 17.5h8"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSop({ color = "#1E4FFF" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20l1.2-4.2L16.6 4.4a1.5 1.5 0 012.1 0l1 1a1.5 1.5 0 010 2.1L8.3 18.8 4 20z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14.5 6.5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconLor({ color = "#1E4FFF" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke={color} strokeWidth="2" />
      <path
        d="M4 7l8 6 8-6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSparkle({ color = "#FFFFFF" }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" fill={color} />
    </svg>
  );
}

export function IconCopy({ color = "currentColor" }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="8" y="8" width="12" height="12" rx="2" stroke={color} strokeWidth="2" />
      <path
        d="M16 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h3"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconCheckSmall({ color = "currentColor" }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12l4 4 10-10"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
