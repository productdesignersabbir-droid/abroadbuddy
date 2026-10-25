import Link from "next/link";
import { SectionHead } from "@/components/home/SectionHead";
import { Accent } from "@/components/PageHeader";
import { FallbackImage } from "@/components/ui/FallbackImage";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;

const FEATURES = [
  {
    title: "Study Abroad Readiness",
    desc: "Answer five questions and get a readiness score with a to-do list of what to work on next.",
    href: "/readiness",
    imageSrc: img("1544717305-2782549b5136"),
    imageAlt: "Smiling student holding an orange folder",
    span: "lg:col-span-3",
  },
  {
    title: "University Finder",
    desc: "A ranked shortlist based on your CGPA, major, target country and budget — not guesswork.",
    href: "/universities",
    imageSrc: img("1562774053-701939374585"),
    imageAlt: "University building with a wide green lawn",
    span: "lg:col-span-3",
  },
  {
    title: "Find your Professor",
    desc: "Read professor ratings, lab culture and funding reviews before you reach out.",
    href: "/lab-kemon",
    imageSrc: img("1522202176988-66273c2fd55f"),
    imageAlt: "Students discussing research around a laptop",
    span: "lg:col-span-2",
  },
  {
    title: "Scholarship Calendar",
    desc: "Every upcoming deadline in one calendar, with official links for each scholarship.",
    href: "/scholarships",
    imageSrc: img("1523580846011-d3a5bc25702b"),
    imageAlt: "Graduate in a cap looking out at a ceremony",
    span: "lg:col-span-2",
  },
  {
    title: "Conference Calendar",
    desc: "Local and global conferences, research fests and paper deadlines in one place.",
    href: "/conferences",
    imageSrc: img("1540575467063-178a50c2df87"),
    imageAlt: "Audience at a research conference",
    span: "lg:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-paper py-24">
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
          sub="From your first shortlist to your first conference paper — five free tools, built for Bangladeshi students."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`group flex flex-col rounded-[30px] bg-white p-2.5 no-underline ${f.span}`}
            >
              <div
                className={`relative overflow-hidden rounded-[22px] ${
                  f.span === "lg:col-span-3" ? "h-64 lg:h-80" : "h-60"
                }`}
              >
                <FallbackImage
                  src={f.imageSrc}
                  alt={f.imageAlt}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="px-3.5 pb-4 pt-5">
                <h3 className="font-display text-[30px] leading-tight tracking-[-0.02em] text-ink">
                  {f.title}
                </h3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-sub">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
