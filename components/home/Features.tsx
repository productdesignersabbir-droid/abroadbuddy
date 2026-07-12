"use client";

import Link from "next/link";
import { useReveal } from "@/lib/use-reveal";
import { SectionHead } from "@/components/home/SectionHead";
import {
  IconSearch,
  IconDoc,
  IconMentor,
  IconLab,
  IconStory,
  IconCal,
  IconPlane,
  IconTest,
} from "@/components/home/icons";

const FEATURES = [
  {
    tag: "01",
    title: "University Match",
    desc: "Get a ranked shortlist based on your CGPA, major, target country and budget — not guesswork.",
    accent: "blue" as const,
    icon: IconSearch,
    href: "/universities",
  },
  {
    tag: "02",
    title: "AI CV · SOP · LOR",
    desc: "Generate strong drafts in minutes, or hire a vetted specialist to write them with you.",
    accent: "red" as const,
    icon: IconDoc,
    href: "/tools",
  },
  {
    tag: "03",
    title: "Find My Mentor",
    desc: "Book 1:1 or group sessions with students and alumni who've walked your exact path.",
    accent: "blue" as const,
    icon: IconMentor,
    href: "/mentors",
  },
  {
    tag: "04",
    title: "Lab Kemon",
    desc: "Rate and read reviews on labs, professors and funding — know the culture before you apply.",
    accent: "red" as const,
    icon: IconLab,
    href: "/lab-kemon",
  },
  {
    tag: "05",
    title: "Journey Stories",
    desc: "Read real study-abroad journeys, filter by country or field, and share your own.",
    accent: "blue" as const,
    icon: IconStory,
    href: "/stories",
  },
  {
    tag: "06",
    title: "Conference Calendar",
    desc: "Track local and global conferences, research fests and paper deadlines in one place.",
    accent: "red" as const,
    icon: IconCal,
    href: "/conferences",
  },
  {
    tag: "07",
    title: "Housing & Flights",
    desc: "Compare abroad housing, flight fares and living costs before you pack your bags.",
    accent: "blue" as const,
    icon: IconPlane,
    href: "/resources",
  },
  {
    tag: "08",
    title: "IELTS Mock Tests",
    desc: "Practice free mock tests, then hire expert coaches for IELTS, GRE and beyond.",
    accent: "red" as const,
    icon: IconTest,
    href: "/ielts",
  },
];

const ACCENT_HEX: Record<"blue" | "red", string> = {
  blue: "#1E4FFF",
  red: "#FF3B47",
};

const ACCENT_SOFT: Record<"blue" | "red", string> = {
  blue: "rgba(30,79,255,.10)",
  red: "rgba(255,59,71,.10)",
};

function FeatureCard({ f, i }: { f: (typeof FEATURES)[number]; i: number }) {
  const [ref, seen] = useReveal<HTMLAnchorElement>();
  const Icon = f.icon;
  return (
    <Link
      ref={ref}
      href={f.href}
      style={{
        transitionDelay: `${i * 60}ms`,
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(16px)",
      }}
      className="group block rounded-card border border-line bg-white px-5.5 py-6 pb-6.5 no-underline shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-[opacity,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)]"
    >
      <div className="flex items-start justify-between">
        <div
          className="grid h-11.5 w-11.5 place-items-center rounded-[13px]"
          style={{ background: ACCENT_SOFT[f.accent], color: ACCENT_HEX[f.accent] }}
        >
          <Icon color={ACCENT_HEX[f.accent]} />
        </div>
        <span className="font-label text-[13px] font-bold text-[#C3CCDE]">
          {f.tag}
        </span>
      </div>
      <h3 className="mt-4.5 font-display text-[19px] font-semibold tracking-[-0.01em] text-ink">
        {f.title}
      </h3>
      <p className="mt-2.25 font-body text-[14.5px] leading-relaxed text-sub">
        {f.desc}
      </p>
    </Link>
  );
}

export function Features() {
  return (
    <section className="bg-soft py-22">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="Everything, in one place"
          title="One platform for the entire journey"
          sub="From your first shortlist to your first day on campus — AbroadBuddy replaces a dozen scattered tabs, agents and group chats."
        />
        <div className="mt-12 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.tag} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
