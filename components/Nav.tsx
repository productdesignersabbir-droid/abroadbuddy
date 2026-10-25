"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ENTRIES, isNavGroup, type NavGroup } from "@/lib/routes";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isGroupActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => pathname === item.href);
}

function DesktopNavGroup({ group, active }: { group: NavGroup; active: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        className={`flex items-center gap-1 rounded-[10px] px-3 py-2 font-body text-sm font-medium transition-colors hover:bg-softer ${
          active ? "text-blue" : "text-ink"
        }`}
      >
        {group.label}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-64 pt-2">
          <div className="overflow-hidden rounded-card border border-line bg-white p-1.5 shadow-[0_18px_40px_-18px_rgba(11,18,32,0.28)]">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-[10px] px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors hover:bg-softer"
              >
                {item.navLabel}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavGroup({ group, active }: { group: NavGroup; active: boolean }) {
  const [open, setOpen] = useState(active);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 font-body text-[15px] font-medium hover:bg-softer ${
          active ? "text-blue" : "text-ink"
        }`}
      >
        {group.label}
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul className="ml-3 grid gap-1 border-l border-line pl-3">
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-[10px] px-3 py-2 font-body text-sm font-medium text-ink hover:bg-softer"
              >
                {item.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[18px] border border-line bg-soft/90 py-2.5 pl-4.5 pr-2.5 backdrop-blur-md">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV_ENTRIES.map((entry) =>
            isNavGroup(entry) ? (
              <DesktopNavGroup
                key={entry.label}
                group={entry}
                active={isGroupActive(entry, pathname ?? "")}
              />
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className={`rounded-pill px-3 py-2 font-body text-[14.5px] transition-colors hover:text-blue ${
                  pathname === entry.href ? "text-blue" : "text-ink"
                }`}
              >
                {entry.navLabel}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/readiness" variant="dark" className="py-2 text-sm">
              Start Abroad Readiness
            </Button>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9.5 w-9.5 place-items-center rounded-[10px] bg-blue text-white xl:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-w-7xl rounded-[18px] border border-line bg-soft px-4 py-4 xl:hidden">
          <ul className="grid gap-1">
            {NAV_ENTRIES.map((entry) =>
              isNavGroup(entry) ? (
                <MobileNavGroup
                  key={entry.label}
                  group={entry}
                  active={isGroupActive(entry, pathname ?? "")}
                />
              ) : (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className={`block rounded-[10px] px-3 py-2.5 font-body text-[15px] font-medium hover:bg-softer ${
                      pathname === entry.href ? "text-blue" : "text-ink"
                    }`}
                  >
                    {entry.navLabel}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="mt-4 sm:hidden">
            <Button href="/readiness" variant="dark" className="w-full">
              Start Abroad Readiness
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
