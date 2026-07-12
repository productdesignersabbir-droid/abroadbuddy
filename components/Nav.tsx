"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/routes";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "border-line bg-white/85 backdrop-blur-md"
          : "border-transparent bg-white/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex">
          {ROUTES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-[10px] px-3 py-2 font-body text-sm font-medium text-ink transition-colors hover:bg-soft"
            >
              {r.navLabel}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href="/" variant="primary">
              Get started
            </Button>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-[10px] border border-line xl:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="#0B1220"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="#0B1220"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-6 py-4 xl:hidden">
          <ul className="grid gap-1">
            {ROUTES.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="block rounded-[10px] px-3 py-2.5 font-body text-[15px] font-medium text-ink hover:bg-soft"
                >
                  {r.navLabel}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 sm:hidden">
            <Button href="/" variant="primary" className="w-full">
              Get started
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
