import type { ReactNode } from "react";
import { filledEntries, items, lines, type CvData, type CvEntry } from "@/data/cv";

// Five clean, corporate CV layouts. Each draws on an A4 page (794 × 1123 px
// at 96 dpi), the same size the PDF prints at, and skips empty sections.

export type CvLabels = {
  experience: string;
  projects: string;
  publications: string;
  awards: string;
  showPublications: boolean;
};

export type TemplateId = "classic" | "modern" | "sidebar" | "compact" | "executive";

type Props = { cv: CvData; labels: CvLabels };

const PAGE = "w-[794px] min-h-[1123px] bg-white text-[#0B1220] font-body";

function contactItems(cv: CvData) {
  return [cv.email, cv.phone, cv.location, ...items(cv.links)].map((s) => s.trim()).filter(Boolean);
}

function Bullets({ text, className = "" }: { text: string; className?: string }) {
  const list = lines(text);
  if (!list.length) return null;
  return (
    <ul className={`mt-1 list-none space-y-0.5 p-0 ${className}`}>
      {list.map((l) => (
        <li key={l} className="relative pl-3 before:absolute before:left-0 before:top-[0.6em] before:h-[3px] before:w-[3px] before:bg-current">
          {l}
        </li>
      ))}
    </ul>
  );
}

/** Title, organisation, place and dates for one education or work entry. */
function Entry({ e, accent = "" }: { e: CvEntry; accent?: string }) {
  const where = [e.org, e.place].filter((s) => s.trim()).join(", ");
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-semibold">{e.title || where}</p>
        {e.dates && <p className={`shrink-0 text-[11.5px] ${accent || "text-[#5A6577]"}`}>{e.dates}</p>}
      </div>
      {e.title && where && <p className="text-[#5A6577]">{where}</p>}
      <Bullets text={e.details} />
    </div>
  );
}

/** The sections every layout shares, in order, with its own heading style. */
function Sections({
  cv,
  labels,
  heading,
  accent,
  skip = [],
  gap = "gap-5",
  side = false,
}: Props & {
  heading: (title: string) => ReactNode;
  accent?: string;
  skip?: ("skills" | "languages" | "summary")[];
  gap?: string;
  /** Put each heading in a narrow left column beside its section. */
  side?: boolean;
}) {
  const education = filledEntries(cv.education);
  const experience = filledEntries(cv.experience);
  const projects = filledEntries(cv.projects);
  const blocks: [string, ReactNode][] = [];
  if (cv.summary.trim() && !skip.includes("summary")) blocks.push(["Profile", <p key="s">{cv.summary.trim()}</p>]);
  if (education.length)
    blocks.push(["Education", <div key="e" className="grid gap-3">{education.map((e) => <Entry key={e.id} e={e} accent={accent} />)}</div>]);
  if (experience.length)
    blocks.push([labels.experience, <div key="x" className="grid gap-3">{experience.map((e) => <Entry key={e.id} e={e} accent={accent} />)}</div>]);
  if (projects.length)
    blocks.push([labels.projects, <div key="p" className="grid gap-3">{projects.map((e) => <Entry key={e.id} e={e} accent={accent} />)}</div>]);
  if (labels.showPublications && lines(cv.publications).length)
    blocks.push([labels.publications, <Bullets key="pub" text={cv.publications} className="space-y-1" />]);
  if (lines(cv.awards).length) blocks.push([labels.awards, <Bullets key="a" text={cv.awards} />]);
  if (items(cv.skills).length && !skip.includes("skills")) blocks.push(["Skills", <p key="sk">{items(cv.skills).join(" · ")}</p>]);
  if (items(cv.languages).length && !skip.includes("languages"))
    blocks.push(["Languages", <p key="l">{items(cv.languages).join(" · ")}</p>]);

  return (
    <div className={`grid ${gap}`}>
      {blocks.map(([title, body]) => (
        <section key={title} className={`break-inside-avoid-page ${side ? "grid grid-cols-[130px_1fr]" : ""}`}>
          {heading(title)}
          <div>{body}</div>
        </section>
      ))}
    </div>
  );
}

const nameOf = (cv: CvData) => cv.name.trim() || "Your Name";

/** Centred serif name, thin rules: a timeless academic look. */
function Classic({ cv, labels }: Props) {
  return (
    <div className={`${PAGE} px-[64px] py-[56px] text-[12.5px] leading-[1.55]`}>
      <header className="border-b border-[#0B1220] pb-4 text-center">
        <h1 className="font-display text-[32px] leading-tight">{nameOf(cv)}</h1>
        {cv.headline && <p className="mt-1 text-[13px] text-[#5A6577]">{cv.headline}</p>}
        <p className="mt-2 text-[11.5px]">{contactItems(cv).join("  ·  ")}</p>
      </header>
      <div className="mt-5">
        <Sections
          cv={cv}
          labels={labels}
          heading={(t) => (
            <h2 className="mb-2 border-b border-[#E2E8F5] pb-1 font-display text-[15px] uppercase tracking-[0.08em]">{t}</h2>
          )}
        />
      </div>
    </div>
  );
}

/** Left-aligned, blue name and labels: clean and current. */
function Modern({ cv, labels }: Props) {
  return (
    <div className={`${PAGE} px-[60px] py-[52px] text-[12.5px] leading-[1.55]`}>
      <header>
        <h1 className="text-[30px] font-bold leading-tight tracking-[-0.02em] text-[#1E4FFF]">{nameOf(cv)}</h1>
        {cv.headline && <p className="mt-0.5 text-[14px] font-medium">{cv.headline}</p>}
        <p className="mt-2 text-[11.5px] text-[#5A6577]">{contactItems(cv).join("   |   ")}</p>
      </header>
      <div className="mt-6 h-[3px] w-16 bg-[#1E4FFF]" />
      <div className="mt-6">
        <Sections
          cv={cv}
          labels={labels}
          accent="text-[#1E4FFF]"
          heading={(t) => <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E4FFF]">{t}</h2>}
        />
      </div>
    </div>
  );
}

/** Soft side column for contact, skills and languages. */
function Sidebar({ cv, labels }: Props) {
  const skills = items(cv.skills);
  const languages = items(cv.languages);
  const side = (t: string) => <h2 className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1E4FFF]">{t}</h2>;
  return (
    <div className={`${PAGE} grid grid-cols-[230px_1fr] text-[12.5px] leading-[1.55]`}>
      <aside className="bg-[#EEF2FB] px-7 py-[52px] [print-color-adjust:exact]">
        <h1 className="text-[24px] font-bold leading-tight">{nameOf(cv)}</h1>
        {cv.headline && <p className="mt-1 text-[12.5px] text-[#5A6577]">{cv.headline}</p>}
        <div className="mt-7 grid gap-6">
          {contactItems(cv).length > 0 && (
            <section>
              {side("Contact")}
              <ul className="list-none space-y-1 break-words p-0 text-[11.5px]">
                {contactItems(cv).map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}
          {skills.length > 0 && (
            <section>
              {side("Skills")}
              <ul className="list-none space-y-1 p-0 text-[11.5px]">
                {skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}
          {languages.length > 0 && (
            <section>
              {side("Languages")}
              <ul className="list-none space-y-1 p-0 text-[11.5px]">
                {languages.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </aside>
      <main className="px-9 py-[52px]">
        <Sections
          cv={cv}
          labels={labels}
          skip={["skills", "languages"]}
          heading={(t) => <h2 className="mb-2 border-b border-[#E2E8F5] pb-1 text-[14px] font-bold">{t}</h2>}
        />
      </main>
    </div>
  );
}

/** Labels in a narrow left column; fits more on one page. */
function Compact({ cv, labels }: Props) {
  return (
    <div className={`${PAGE} px-[56px] py-[48px] text-[12px] leading-[1.5]`}>
      <header className="flex items-end justify-between gap-6 border-b-2 border-[#0B1220] pb-3">
        <div>
          <h1 className="text-[26px] font-bold leading-tight">{nameOf(cv)}</h1>
          {cv.headline && <p className="text-[13px] text-[#5A6577]">{cv.headline}</p>}
        </div>
        <div className="text-right text-[11px] leading-[1.5]">
          {contactItems(cv).map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>
      </header>
      <div className="mt-5">
        <Sections
          cv={cv}
          labels={labels}
          gap="gap-4"
          side
          heading={(t) => (
            <h2 className="pr-4 pt-px text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#5A6577]">{t}</h2>
          )}
        />
      </div>
    </div>
  );
}

/** A dark header band with the name; confident and formal. */
function Executive({ cv, labels }: Props) {
  return (
    <div className={`${PAGE} text-[12.5px] leading-[1.55]`}>
      <header className="bg-[#0B1220] px-[60px] py-[40px] text-white [print-color-adjust:exact]">
        <h1 className="font-display text-[34px] leading-tight">{nameOf(cv)}</h1>
        {cv.headline && <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-white/70">{cv.headline}</p>}
        <p className="mt-3 text-[11.5px] text-white/85">{contactItems(cv).join("   ·   ")}</p>
      </header>
      <div className="px-[60px] py-[36px]">
        <Sections
          cv={cv}
          labels={labels}
          heading={(t) => (
            <h2 className="mb-2 flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.14em]">
              {t}
              <span className="h-px flex-1 bg-[#E2E8F5]" />
            </h2>
          )}
        />
      </div>
    </div>
  );
}

export const TEMPLATES: { id: TemplateId; label: string; render: (p: Props) => ReactNode }[] = [
  { id: "classic", label: "Classic", render: (p) => <Classic {...p} /> },
  { id: "modern", label: "Modern", render: (p) => <Modern {...p} /> },
  { id: "sidebar", label: "Sidebar", render: (p) => <Sidebar {...p} /> },
  { id: "compact", label: "Compact", render: (p) => <Compact {...p} /> },
  { id: "executive", label: "Executive", render: (p) => <Executive {...p} /> },
];
