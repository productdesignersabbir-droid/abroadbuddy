type IconProps = { color?: string };

export function IconCap({ color = "#5A6577" }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4L2 9l10 5 10-5-10-5z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCoins({ color = "#5A6577" }: IconProps) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="9" cy="7" rx="6" ry="3" stroke={color} strokeWidth="2" />
      <path
        d="M3 7v4c0 1.66 2.69 3 6 3s6-1.34 6-3V7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 11v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 9.5c3.4.3 6 1.6 6 3.2 0 1.66-2.69 3-6 3-.7 0-1.36-.06-1.97-.17M15 16.5c-.6.9-1.98 1.5-3.6 1.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChevronLeft({ color = "#0B1220" }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke={color}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronRight({ color = "#0B1220" }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
