"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { StudioDegree } from "@/data/application-studio";
import { cvLabels, emptyCv, exampleCv, newEntry, type CvData, type CvEntry, type EntryList } from "@/data/cv";
import { TEMPLATES, type TemplateId } from "@/components/application-studio/cv/CvTemplates";
import { inputClass } from "@/components/ui/Chip";

const PAGE_WIDTH = 794;

const ENTRY_LABELS: Record<EntryList, { add: string; title: string; org: string; details: string }> = {
  education: {
    add: "Add education",
    title: "Degree or exam",
    org: "School or university",
    details: "Result, thesis or main subjects. One per line.",
  },
  experience: {
    add: "Add experience",
    title: "Role",
    org: "Organisation",
    details: "What you did and the result. One per line.",
  },
  projects: {
    add: "Add a project",
    title: "Project name",
    org: "Context, e.g. thesis or personal",
    details: "What you built and the result. One per line.",
  },
};

function Group({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <legend className="font-display text-[19px] text-ink">{title}</legend>
        {action}
      </div>
      <div className="grid gap-3">{children}</div>
    </fieldset>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-body text-[13px] font-medium text-ink">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </label>
  );
}

function EntryEditor({
  kind,
  entry,
  onChange,
  onRemove,
}: {
  kind: EntryList;
  entry: CvEntry;
  onChange: (e: CvEntry) => void;
  onRemove: () => void;
}) {
  const l = ENTRY_LABELS[kind];
  const set = (k: keyof CvEntry) => (v: string) => onChange({ ...entry, [k]: v });
  return (
    <div className="grid animate-appear gap-3 bg-soft p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
        <Input label={l.title} value={entry.title} onChange={set("title")} />
        <Input label={l.org} value={entry.org} onChange={set("org")} />
        <Input label="City" value={entry.place} onChange={set("place")} placeholder="e.g. Dhaka" />
        <Input label="Dates" value={entry.dates} onChange={set("dates")} placeholder="e.g. 2021 – 2025" />
      </div>
      <Input label="Details" value={entry.details} onChange={set("details")} placeholder={l.details} multiline />
      <button type="button" onClick={onRemove} className="justify-self-start font-body text-[13px] font-semibold text-red">
        Remove
      </button>
    </div>
  );
}

/** A full-size page shrunk to fit its box; the PDF prints the full size. */
function Scaled({ children, maxWidth }: { children: ReactNode; maxWidth?: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 0, height: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return;
      const scale = Math.min(outer.current.clientWidth, maxWidth ?? Infinity) / PAGE_WIDTH;
      setBox({ scale, height: inner.current.offsetHeight * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outer.current) ro.observe(outer.current);
    if (inner.current) ro.observe(inner.current);
    return () => ro.disconnect();
  }, [maxWidth]);

  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height: box.height || undefined }}>
      <div
        ref={inner}
        style={{ width: PAGE_WIDTH, transform: `scale(${box.scale})`, transformOrigin: "top left", visibility: box.scale ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

export function CvBuilder({ degree }: { degree: StudioDegree }) {
  const [cv, setCv] = useState<CvData>(emptyCv);
  const [template, setTemplate] = useState<TemplateId>("modern");
  const [printing, setPrinting] = useState(false);
  const labels = cvLabels(degree);
  const active = TEMPLATES.find((t) => t.id === template)!;
  const blank = !cv.name.trim() && !cv.summary.trim();

  const set = (k: keyof CvData) => (v: string) => setCv((c) => ({ ...c, [k]: v }));
  const setEntry = (list: EntryList, i: number, e: CvEntry) =>
    setCv((c) => ({ ...c, [list]: c[list].map((x, j) => (j === i ? e : x)) }));
  const addEntry = (list: EntryList) => setCv((c) => ({ ...c, [list]: [...c[list], newEntry()] }));
  const removeEntry = (list: EntryList, i: number) =>
    setCv((c) => ({ ...c, [list]: c[list].filter((_, j) => j !== i) }));

  // The browser's own "Save as PDF" keeps text sharp and selectable.
  function download() {
    setPrinting(true);
  }
  useEffect(() => {
    if (!printing) return;
    const title = document.title;
    document.title = `${cv.name.trim() || "My"} CV`;
    const done = () => {
      document.title = title;
      setPrinting(false);
    };
    window.addEventListener("afterprint", done, { once: true });
    const id = requestAnimationFrame(() => window.print());
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("afterprint", done);
    };
  }, [printing, cv.name]);

  const entries = (list: EntryList, title: string) => (
    <Group
      title={title}
      action={
        <button type="button" onClick={() => addEntry(list)} className="font-body text-[13px] font-semibold text-blue">
          + {ENTRY_LABELS[list].add}
        </button>
      }
    >
      {cv[list].length === 0 && <p className="font-body text-[13px] text-sub">Nothing added yet.</p>}
      {cv[list].map((e, i) => (
        <EntryEditor
          key={e.id}
          kind={list}
          entry={e}
          onChange={(next) => setEntry(list, i, next)}
          onRemove={() => removeEntry(list, i)}
        />
      ))}
    </Group>
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex flex-col gap-5 bg-white p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-body text-[14px] text-sub">Fill in what you have. Empty sections are left out.</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => setCv(exampleCv(degree))} className="font-body text-[13px] font-semibold text-blue">
              Fill with an example
            </button>
            {!blank && (
              <button type="button" onClick={() => setCv(emptyCv())} className="font-body text-[13px] font-semibold text-sub">
                Clear
              </button>
            )}
          </div>
        </div>

        <Group title="About you">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            <Input label="Full name" value={cv.name} onChange={set("name")} placeholder="e.g. Nusrat Jahan" />
            <Input
              label="Headline"
              value={cv.headline}
              onChange={set("headline")}
              placeholder={degree === "bachelors" ? "e.g. Applicant, BSc Computer Science" : "e.g. MSc applicant, Data Science"}
            />
            <Input label="Email" value={cv.email} onChange={set("email")} placeholder="name@email.com" />
            <Input label="Phone" value={cv.phone} onChange={set("phone")} placeholder="+880 …" />
            <Input label="Location" value={cv.location} onChange={set("location")} placeholder="e.g. Dhaka, Bangladesh" />
            <Input label="Links" value={cv.links} onChange={set("links")} placeholder="LinkedIn, GitHub or portfolio" />
          </div>
          <Input
            label="Profile"
            value={cv.summary}
            onChange={set("summary")}
            placeholder="Two or three lines: who you are, what you're good at, and what you want to study."
            multiline
          />
        </Group>

        {entries("education", "Education")}
        {entries("experience", labels.experience)}
        {entries("projects", labels.projects)}

        <Group title="More">
          {labels.showPublications && (
            <Input
              label="Publications"
              value={cv.publications}
              onChange={set("publications")}
              placeholder="One per line, in the citation style of your field"
              multiline
            />
          )}
          <Input label={labels.awards} value={cv.awards} onChange={set("awards")} placeholder="One per line, with the year" multiline />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            <Input label="Skills" value={cv.skills} onChange={set("skills")} placeholder="Separate with commas" />
            <Input label="Languages" value={cv.languages} onChange={set("languages")} placeholder="e.g. Bangla (native), English (IELTS 7.5)" />
          </div>
        </Group>
        <p className="font-body text-[12.5px] leading-relaxed text-sub">
          Your details stay in this browser tab and aren&apos;t sent anywhere.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className="bg-white p-4">
          <p className="mb-3 font-label text-[11px] uppercase tracking-[0.08em] text-sub">Choose a template</p>
          <div role="radiogroup" aria-label="CV template" className="grid grid-cols-5 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={template === t.id}
                onClick={() => setTemplate(t.id)}
                className="group text-left"
              >
                <div
                  className={`pointer-events-none overflow-hidden border-2 transition-colors ${
                    template === t.id ? "border-blue" : "border-line group-hover:border-ink/30"
                  }`}
                >
                  <div className="aspect-[210/297] overflow-hidden">
                    <Scaled>{t.render({ cv: blank ? exampleCv(degree) : cv, labels })}</Scaled>
                  </div>
                </div>
                <span className={`mt-1.5 block font-body text-[12.5px] ${template === t.id ? "font-semibold text-blue" : "text-ink"}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <span className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">{active.label} · A4 preview</span>
            <button
              type="button"
              onClick={download}
              disabled={blank}
              className="bg-blue px-4 py-2 font-body text-[13.5px] font-semibold text-white disabled:opacity-40"
            >
              Download PDF
            </button>
          </div>
          <div className="max-h-[720px] overflow-auto bg-soft p-4">
            <div className="shadow-[0_10px_30px_-12px_rgba(11,18,32,0.25)]">
              <Scaled>{active.render({ cv: blank ? exampleCv(degree) : cv, labels })}</Scaled>
            </div>
          </div>
          <p className="px-4 py-3 font-body text-[12.5px] text-sub">
            {blank
              ? "Showing an example. Add your name to see your own CV."
              : "In the print window, choose “Save as PDF” as the destination."}
          </p>
        </div>

        <div className="flex flex-col gap-3 bg-ink p-5.5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-[21px]">Want a second pair of eyes?</p>
            <p className="mt-1 font-body text-[14px] text-white/75">A mentor who got in can review your CV before you submit.</p>
          </div>
          <Link href="/mentoring" className="shrink-0 bg-blue px-4 py-2.5 font-body text-[14px] font-semibold">
            Book a CV review
          </Link>
        </div>
      </div>

      {printing &&
        createPortal(<div className="cv-print-root">{active.render({ cv, labels })}</div>, document.body)}
    </div>
  );
}
