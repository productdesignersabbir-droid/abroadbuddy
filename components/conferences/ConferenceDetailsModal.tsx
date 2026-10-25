"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Conference } from "@/data/conferences";
import {
  daysUntil,
  formatDate,
  formatDaysLeftLabel,
  formatEventRange,
  isClosingSoon,
} from "@/lib/conference-match";
import { IconExternalLink } from "@/components/conferences/icons";

const TYPE_TONE: Record<Conference["type"], { tint: string; deep: string }> = {
  Conference: { tint: "#EAF0FF", deep: "#1E4FFF" },
  "Research Fest": { tint: "#FFE8E6", deep: "#C2343E" },
  "Paper Deadline": { tint: "#F0EBFF", deep: "#5A3FD6" },
};

// What a student usually has to send, by kind of event.
const PREPARE: Record<Conference["type"], string[]> = {
  Conference: [
    "A full paper in the conference template (often IEEE or ACM)",
    "An abstract of 150–250 words",
    "Author names and affiliations, unless review is double-blind",
    "A supervisor or co-author who has read the final draft",
  ],
  "Research Fest": [
    "A one-page abstract of your project",
    "A poster or a short slide deck",
    "Student ID and a letter from your department, if asked",
    "A 3–5 minute talk you have practised out loud",
  ],
  "Paper Deadline": [
    "A manuscript formatted to the journal's author guidelines",
    "A cover letter to the editor",
    "Names of 2–3 possible reviewers, if the journal asks",
    "Figures and data in the required file formats",
  ],
};

function Fact({ label, value, sub, urgent }: { label: string; value: string; sub?: string; urgent?: boolean }) {
  return (
    <div className="rounded-[16px] bg-soft px-4 py-3.5">
      <div className="font-body text-[12px] text-sub">{label}</div>
      <div className="mt-1 font-body text-[15px] font-medium leading-snug text-ink">{value}</div>
      {sub && <div className={`mt-0.5 font-body text-[13px] ${urgent ? "text-red" : "text-sub"}`}>{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-display text-[22px] leading-tight tracking-[-0.01em] text-ink">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Downloads an .ics file with the paper deadline and the event itself. */
function downloadCalendar(c: Conference) {
  const day = (iso: string, plus = 0) => {
    const d = new Date(iso);
    d.setDate(d.getDate() + plus);
    return d.toISOString().slice(0, 10).replace(/-/g, "");
  };
  const event = (uid: string, title: string, start: string, end?: string) =>
    [
      "BEGIN:VEVENT",
      `UID:${uid}@easiabroad`,
      `DTSTART;VALUE=DATE:${day(start)}`,
      `DTEND;VALUE=DATE:${day(end ?? start, 1)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${c.host}. Details: ${c.url}`,
      "END:VEVENT",
    ].join("\r\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EasiAbroad//Conference Calendar//EN",
    event(`${c.id}-deadline`, `Deadline: ${c.name}`, c.deadline),
    event(`${c.id}-event`, c.name, c.eventDate, c.eventEndDate),
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${c.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function ConferenceDetailsModal({
  conference: c,
  related,
  onSelect,
  onClose,
}: {
  conference: Conference;
  related: Conference[];
  onSelect: (c: Conference) => void;
  onClose: () => void;
}) {
  const tone = TYPE_TONE[c.type];
  const passed = daysUntil(c.deadline) < 0;
  const urgent = isClosingSoon(c.deadline);
  const eventDays = daysUntil(c.eventDate);
  const abroad = c.locationType === "International" && c.format !== "Virtual";
  const isPaper = c.type === "Paper Deadline";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const timeline = [
    { label: "Today", date: "", done: true },
    {
      label: isPaper ? "Submission deadline" : "Paper deadline",
      date: formatDate(c.deadline),
      done: passed,
    },
    {
      label: isPaper ? "Results / publication" : "Event",
      date: formatEventRange(c.eventDate, c.eventEndDate),
      done: eventDays < 0,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="conference-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div key={c.id} className="ill-up overflow-y-auto">
          {/* Header */}
          <div className="relative px-6 pb-6 pt-6 sm:px-8 sm:pt-7" style={{ background: tone.tint }}>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex flex-wrap gap-2 pr-10">
              <span className="rounded-pill bg-white px-2.5 py-1 font-body text-[12.5px]" style={{ color: tone.deep }}>
                {c.type}
              </span>
              <span className="rounded-pill bg-white/70 px-2.5 py-1 font-body text-[12.5px] text-ink">
                {c.locationType} · {c.format}
              </span>
            </div>
            <h2
              id="conference-modal-title"
              className="mt-3 font-display text-[clamp(26px,3.6vw,36px)] leading-[1.08] tracking-[-0.02em] text-ink"
            >
              {c.name}
            </h2>
            <p className="mt-1.5 font-body text-[14.5px] text-ink/70">{c.host}</p>
          </div>

          <div className="grid gap-8 p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <Fact
                label={isPaper ? "Submission deadline" : "Paper deadline"}
                value={formatDate(c.deadline)}
                sub={formatDaysLeftLabel(c.deadline)}
                urgent={urgent}
              />
              <Fact label={isPaper ? "Results" : "Event dates"} value={formatEventRange(c.eventDate, c.eventEndDate)} />
              <Fact label="Where" value={c.city} />
              <Fact label="Format" value={c.format} />
            </div>

            <Section title="About this event">
              <p className="font-body text-[15.5px] leading-relaxed text-ink/80">{c.description}</p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {c.fields.map((f) => (
                  <span key={f} className="rounded-pill bg-soft px-3 py-1.5 font-body text-[13px] text-ink">
                    {f}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Your timeline">
              <ol className="grid list-none gap-0 p-0 sm:grid-cols-3">
                {timeline.map((step, i) => (
                  <li key={step.label} className="relative flex gap-3 pb-4 sm:block sm:pb-0 sm:pr-4">
                    <div className="flex flex-col items-center sm:flex-row">
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full font-body text-[12px] text-white"
                        style={{ background: step.done ? tone.deep : "#C9C3B9" }}
                      >
                        {i + 1}
                      </span>
                      {i < timeline.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-line sm:ml-2 sm:mt-0 sm:h-px sm:w-auto sm:flex-1" />
                      )}
                    </div>
                    <div className="sm:mt-2.5">
                      <div className="font-body text-[14.5px] font-medium text-ink">{step.label}</div>
                      {step.date && <div className="font-body text-[13px] text-sub">{step.date}</div>}
                    </div>
                  </li>
                ))}
              </ol>
              {passed && (
                <p className="mt-3 rounded-[14px] bg-[#FFF3D6] px-4 py-3 font-body text-[14px] leading-relaxed text-[#7A5600]">
                  This year&apos;s deadline has passed. Many events run every year, so save it and check the
                  official site for the next call for papers.
                </p>
              )}
            </Section>

            <Section title="What to prepare">
              <ul className="grid list-none gap-2 p-0">
                {PREPARE[c.type].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-body text-[14.5px] leading-snug text-ink/80">
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px]"
                      style={{ background: tone.tint, color: tone.deep }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-body text-[13px] text-sub">
                Exact rules differ by event. Read the call for papers on the official site before you submit.
              </p>
            </Section>

            <Section title={abroad ? "Travelling from Bangladesh" : "Taking part"}>
              <ul className="grid list-none gap-2 p-0 font-body text-[14.5px] leading-snug text-ink/80">
                {abroad ? (
                  <>
                    <li>• Start your visa early. Most embassies want an invitation letter from the organisers.</li>
                    <li>• Ask about student registration rates and travel grants for authors.</li>
                    <li>• Budget for registration, flights and a few nights&apos; stay.</li>
                    {c.format === "Hybrid" && <li>• If travel isn&apos;t possible, ask whether you can present online.</li>}
                  </>
                ) : c.format === "Virtual" ? (
                  <>
                    <li>• You can present from home. Test your camera, mic and slides a day before.</li>
                    <li>• Check the time zone of your session.</li>
                  </>
                ) : (
                  <>
                    <li>• No visa needed. Check registration fees and student discounts.</li>
                    <li>• Bring printed copies of your poster or slides as a backup.</li>
                  </>
                )}
              </ul>
            </Section>

            {related.length > 0 && (
              <Section title="Similar events">
                <ul className="grid list-none gap-2 p-0">
                  {related.map((r) => (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(r)}
                        className="flex w-full items-center justify-between gap-3 rounded-[14px] border border-line px-4 py-3 text-left transition-colors hover:bg-soft"
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-body text-[14.5px] font-medium text-ink">{r.name}</span>
                          <span className="block font-body text-[12.5px] text-sub">
                            Deadline {formatDate(r.deadline)} · {formatDaysLeftLabel(r.deadline)}
                          </span>
                        </span>
                        <span aria-hidden className="text-sub">→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/lab-kemon"
                className="rounded-pill bg-soft px-4 py-2 font-body text-[13.5px] text-ink no-underline hover:bg-softer"
              >
                Find professors in {c.fields[0]} →
              </Link>
              <Link
                href="/scholarships"
                className="rounded-pill bg-soft px-4 py-2 font-body text-[13.5px] text-ink no-underline hover:bg-softer"
              >
                Look for travel funding →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer: the only way off-site is a clear, deliberate click. */}
        <div className="flex flex-col gap-3 border-t border-line bg-paper px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-body text-[12.5px] text-sub">Dates can change. Confirm on the official site before you submit.</p>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => downloadCalendar(c)}
              className="rounded-pill border border-line bg-white px-4.5 py-2.5 font-body text-[14px] font-medium text-ink hover:bg-soft"
            >
              Add to calendar
            </button>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-pill bg-blue px-4.5 py-2.5 font-body text-[14px] font-medium text-white no-underline"
            >
              {passed ? "Official site" : "Apply on official site"}
              <IconExternalLink color="#FFFFFF" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
