import Link from "next/link";
import { SectionHead } from "@/components/home/SectionHead";
import { Accent } from "@/components/PageHeader";
import { FeatureIllustration, type IllustrationKind } from "@/components/home/FeatureIllustrations";

const FEATURES: {
  title: string;
  desc: string;
  href: string;
  kind: IllustrationKind;
  span: string;
}[] = [
  {
    title: "Study Abroad Readiness",
    desc: "Answer nine quick questions and get a readiness score, a timeline and a to-do list for your plan.",
    href: "/readiness",
    kind: "readiness",
    span: "lg:col-span-3",
  },
  {
    title: "University Finder",
    desc: "A ranked shortlist based on your CGPA, major, target country and budget — not guesswork.",
    href: "/universities",
    kind: "universities",
    span: "lg:col-span-3",
  },
  {
    title: "Find your Professor",
    desc: "Read professor ratings, lab culture and funding reviews before you reach out.",
    href: "/lab-kemon",
    kind: "professors",
    span: "lg:col-span-2",
  },
  {
    title: "Scholarship Calendar",
    desc: "Every upcoming deadline in one calendar, with official links for each scholarship.",
    href: "/scholarships",
    kind: "scholarships",
    span: "lg:col-span-2",
  },
  {
    title: "Conference Calendar",
    desc: "Local and global conferences, research fests and paper deadlines in one place.",
    href: "/conferences",
    kind: "conferences",
    span: "lg:col-span-2",
  },
  {
    title: "Find my research direction",
    desc: "Turn your subject and interests into three research directions you can start this month.",
    href: "/research-direction",
    kind: "research",
    span: "lg:col-span-2",
  },
  {
    title: "Application Studio",
    desc: "Build your CV in five clean templates, and draft your statement, proposal and reference request.",
    href: "/application-studio",
    kind: "studio",
    span: "lg:col-span-2",
  },
  {
    title: "Mentoring",
    desc: "Book a session with students, alumni and researchers who have already made the move.",
    href: "/mentoring",
    kind: "mentoring",
    span: "lg:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-paper pb-24 pt-12 sm:pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          kicker="What we cover"
          title={
            <>
              Every <Accent>step</Accent>,
              <br />
              covered.
            </>
          }
          sub="From your first shortlist to your first conference paper — eight tools, built for Bangladeshi students."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`group flex flex-col rounded-[30px] bg-white p-2.5 no-underline ${f.span}`}
            >
              <FeatureIllustration
                kind={f.kind}
                className={f.span === "lg:col-span-3" ? "aspect-[16/9]" : "aspect-[16/10]"}
              />
              <div className="flex flex-1 flex-col items-start px-3.5 pb-4 pt-5">
                <h3 className="font-display text-[30px] leading-tight tracking-[-0.02em] text-ink">
                  {f.title}
                </h3>
                <p className="mb-5 mt-2 font-body text-[15px] leading-relaxed text-sub">{f.desc}</p>
                {/* The whole card is the link, so this is styled as a button rather than nested. */}
                <span className="mt-auto inline-flex items-center gap-2 rounded-pill bg-softer px-4.5 py-2.5 font-body text-[14.5px] text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-white">
                  Explore
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
