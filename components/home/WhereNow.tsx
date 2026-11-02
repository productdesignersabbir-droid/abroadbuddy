import Link from "next/link";
import { SectionHead } from "@/components/home/SectionHead";
import { Accent } from "@/components/PageHeader";

// Pick the sentence that sounds like you; each one opens the tool that helps.
const SITUATIONS: { says: string; tool: string; href: string }[] = [
  { says: "I don't know where to start", tool: "Readiness", href: "/readiness" },
  { says: "I know my subject, not my research topic", tool: "Find my research direction", href: "/research-direction" },
  { says: "I want universities that fit my grades and budget", tool: "University Finder", href: "/universities" },
  { says: "I need professors to email", tool: "Professor Finder", href: "/lab-kemon" },
  { says: "I need a scholarship", tool: "Scholarship Calendar", href: "/scholarships" },
  { says: "I want to present my research", tool: "Conference Calendar", href: "/conferences" },
  { says: "I'm writing my CV or statement", tool: "Application Studio", href: "/application-studio" },
  { says: "I want someone who has done it to guide me", tool: "Mentoring", href: "/mentoring" },
];

export function WhereNow() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="Start here"
          title={
            <>
              Where are you <Accent>right now?</Accent>
            </>
          }
          sub="Pick the sentence that sounds like you. We'll take you to the tool that helps with exactly that."
        />

        <ul className="mt-12 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {SITUATIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex h-full flex-col justify-between gap-6 border border-line bg-white p-5 no-underline transition-colors duration-200 hover:border-ink hover:bg-ink"
              >
                <span className="font-display text-[22px] leading-snug tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-white">
                  “{s.says}”
                </span>
                <span className="flex items-center justify-between gap-3 font-body text-[14px] text-blue transition-colors duration-200 group-hover:text-white">
                  {s.tool}
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
