"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COUNTRY_INFO, type University } from "@/data/universities";
import {
  fitReasons,
  formatBdt,
  formatCount,
  formatTuition,
  formatUsd,
  matchLabel,
  yearlyCost,
  type UniversityFilters,
} from "@/lib/university-match";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { MatchRing } from "@/components/universities/UniversityCard";

const TABS = ["Overview", "Admissions", "Costs", "Scholarships", "Life & visa"] as const;
type Tab = (typeof TABS)[number];

const DOCUMENTS = [
  "Academic transcripts and degree certificate",
  "Statement of purpose (SOP)",
  "2–3 letters of recommendation",
  "CV or résumé",
  "English test score (IELTS / TOEFL / Duolingo where accepted)",
  "Passport copy",
  "Financial documents (bank statement or sponsor letter)",
];

const kicker = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";

function Fact({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-[16px] bg-soft px-4 py-3.5">
      <div className="font-body text-[12px] text-sub">{label}</div>
      <div className="mt-1 font-body text-[15px] font-semibold text-ink">{value}</div>
      {sub && <div className="mt-0.5 font-body text-[12px] text-sub">{sub}</div>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-line py-3 last:border-b-0">
      <span className="font-body text-[14px] text-sub">{label}</span>
      <span className="text-right font-body text-[14px] font-semibold text-ink">{value}</span>
    </div>
  );
}

function Check({ ok = true }: { ok?: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
        ok ? "bg-blue/10 text-blue" : "bg-red/10 text-red"
      }`}
    >
      {ok ? "✓" : "!"}
    </span>
  );
}

export function UniversityDetailsModal({
  uni,
  match,
  filters,
  onClose,
}: {
  uni: University;
  match: number;
  filters: UniversityFilters;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("Overview");
  const info = COUNTRY_INFO[uni.country];
  const [totalMin, totalMax] = yearlyCost(uni);

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="university-modal-title"
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,0.4)] sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto">
          {/* Header */}
          <div className="relative h-56 w-full sm:h-72">
            <FallbackImage
              src={uni.imageSrc}
              alt={uni.imageAlt}
              className="object-cover"
              sizes="(min-width: 896px) 896px, 100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7.5">
              <div className="flex items-center gap-1.5 font-body text-[13.5px] text-white/85">
                <span aria-hidden>{info.flag}</span>
                {uni.city} · {uni.country}
              </div>
              <h2
                id="university-modal-title"
                className="mt-1 font-display text-[clamp(28px,4vw,40px)] leading-[1.05] tracking-[-0.02em]"
              >
                {uni.name}
              </h2>
            </div>
          </div>

          {/* Fit summary */}
          <div className="grid gap-4 border-b border-line p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-7.5">
            <div className="flex items-center gap-3.5">
              <MatchRing match={match} size={84} />
              <div>
                <div className="font-body text-[12px] text-sub">Profile fit</div>
                <div className="font-display text-[24px] leading-tight text-ink">{matchLabel(match)}</div>
              </div>
            </div>
            <ul className="grid list-none gap-2 p-0 sm:justify-self-end">
              {fitReasons(uni, filters).map((r) => (
                <li key={r.label} className="flex items-center gap-2 font-body text-[14px] text-ink">
                  <Check ok={r.ok} />
                  {r.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="University details"
            className="sticky top-0 z-10 flex gap-1 overflow-x-auto border-b border-line bg-white/95 px-4 py-3 backdrop-blur sm:px-6.5"
          >
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                id={`tab-${t}`}
                aria-selected={tab === t}
                aria-controls="uni-tabpanel"
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-pill px-4 py-2 font-body text-[14px] font-medium transition-colors ${
                  tab === t ? "bg-[#EAF0FF] text-blue" : "text-sub hover:bg-soft hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div id="uni-tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="p-6 sm:p-7.5">
            {tab === "Overview" && (
              <div className="grid gap-7">
                <p className="font-body text-[15.5px] leading-relaxed text-ink">{uni.description}</p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Fact label="World ranking" value={`#${uni.worldRanking}`} sub="QS, approx." />
                  <Fact label="Type" value={uni.type} sub={`Founded ${uni.founded}`} />
                  <Fact label="Students" value={formatCount(uni.students)} sub={`${uni.intlPct}% international`} />
                  <Fact label="Acceptance" value={`~${uni.acceptanceRate}%`} sub={uni.difficulty} />
                </div>

                <div>
                  <div className={kicker}>Why students pick it</div>
                  <ul className="mt-3 grid list-none gap-2.5 p-0">
                    {uni.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.75 font-body text-[14.5px] leading-relaxed text-ink">
                        <Check />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className={kicker}>Majors offered ({uni.majors.length})</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {uni.majors.map((m) => (
                      <span
                        key={m}
                        className={`rounded-pill px-3 py-1.5 font-body text-[13px] font-medium ${
                          m === filters.major ? "bg-[#EAF0FF] text-blue" : "bg-soft text-ink"
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "Admissions" && (
              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <div className={kicker}>Entry requirements</div>
                  <div className="mt-2">
                    <Row label="Typical CGPA" value={`${uni.minCgpa.toFixed(2)} / 4.00 or higher`} />
                    <Row label="IELTS" value={`${uni.ielts.toFixed(1)} overall`} />
                    <Row label="TOEFL iBT" value={`${uni.toefl}+`} />
                    <Row label="GRE / GMAT" value={uni.gre} />
                    <Row label="Competition" value={uni.difficulty} />
                  </div>
                </div>
                <div>
                  <div className={kicker}>Key dates</div>
                  <div className="mt-2">
                    <Row label="Intakes" value={uni.intakes.join(", ")} />
                    <Row label="Main deadline" value={uni.deadline} />
                    <Row
                      label="Application fee"
                      value={uni.applicationFee === 0 ? "Free" : formatUsd(uni.applicationFee)}
                    />
                  </div>
                  <p className="mt-3 rounded-[14px] bg-[#fff6dc] px-4 py-3 font-body text-[13px] leading-relaxed text-ink">
                    Deadlines differ by program. Start 9–12 months early so you have time for tests,
                    SOP drafts and recommendation letters.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className={kicker}>Documents you will need</div>
                  <ul className="mt-3 grid list-none gap-2.5 p-0 sm:grid-cols-2">
                    {DOCUMENTS.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 font-body text-[14px] text-ink">
                        <Check />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === "Costs" && (
              <div className="grid gap-7">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Fact label="Tuition" value={formatTuition(uni.tuitionMin, uni.tuitionMax)} />
                  <Fact
                    label={`Living in ${uni.country}`}
                    value={`${formatUsd(info.livingCost[0])} – ${formatUsd(info.livingCost[1])}`}
                    sub="Rent, food, transport per year"
                  />
                  <div className="rounded-[16px] bg-ink px-4 py-3.5 text-white">
                    <div className="font-body text-[12px] text-white/70">Total per year</div>
                    <div className="mt-1 font-body text-[15px] font-semibold">
                      {formatUsd(totalMin)} – {formatUsd(totalMax)}
                    </div>
                    <div className="mt-0.5 font-body text-[12px] text-white/70">
                      ≈ {formatBdt(totalMin)} – {formatBdt(totalMax)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={kicker}>Other costs to plan for</div>
                  <div className="mt-2">
                    <Row label="Application fee" value={uni.applicationFee === 0 ? "Free" : formatUsd(uni.applicationFee)} />
                    <Row label="Visa" value={info.visa} />
                    <Row label="Health insurance" value="Usually required — $500–$2,500 a year" />
                    <Row label="Flights from Dhaka" value="About $600–$1,400 one way" />
                    <Row label="Local currency" value={info.currency} />
                  </div>
                </div>
                <p className="font-body text-[12.5px] text-sub">
                  Taka figures use about ৳122 per US dollar and are only a guide.
                </p>
              </div>
            )}

            {tab === "Scholarships" && (
              <div className="grid gap-6">
                <ul className="grid list-none gap-3 p-0">
                  {uni.scholarships.map((s) => (
                    <li
                      key={s.name}
                      className="flex flex-col gap-1 rounded-[16px] border border-line px-4.5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="font-body text-[15px] font-semibold text-ink">{s.name}</span>
                      <span className="font-body text-[14px] text-sub">{s.amount}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-[16px] bg-soft px-4.5 py-4">
                  <div className={kicker}>Also open to students in {uni.country}</div>
                  <p className="mt-1.5 font-body text-[14.5px] text-ink">{info.scholarships}</p>
                </div>
                <Link
                  href="/scholarships"
                  className="font-body text-[14px] font-semibold text-ink underline underline-offset-4"
                >
                  See deadlines on the Scholarship Calendar →
                </Link>
              </div>
            )}

            {tab === "Life & visa" && (
              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <div className={kicker}>Visa and work</div>
                  <div className="mt-2">
                    <Row label="Student visa" value={info.visa} />
                    <Row label="Work while studying" value={info.workWhileStudying} />
                    <Row label="After graduating" value={info.postStudyWork} />
                  </div>
                </div>
                <div>
                  <div className={kicker}>Living there</div>
                  <div className="mt-2">
                    <Row label="Teaching language" value={info.language} />
                    <Row label="Bangladeshi community" value={info.bdCommunity} />
                    <Row label="Region" value={info.region} />
                    <Row label="Intakes" value={info.intakes.join(", ")} />
                  </div>
                </div>
                <p className="font-body text-[12.5px] text-sub md:col-span-2">
                  Visa and work rules change often. Always confirm on the official government website.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-line bg-paper px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7.5">
          <p className="font-body text-[12.5px] text-sub">
            Figures are approximate. Check the official website before you apply.
          </p>
          <div className="flex gap-2">
            <Link
              href="/lab-kemon"
              className="rounded-button border-[1.5px] border-line bg-white px-4 py-2.25 font-body text-sm font-semibold text-ink no-underline hover:border-ink/40"
            >
              Find professors
            </Link>
            <a
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-button bg-ink px-4.5 py-2.5 font-body text-sm font-semibold text-white no-underline"
            >
              Official website ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

