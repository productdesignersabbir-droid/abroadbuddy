import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { CheckIcon } from "@/components/home/icons";
import { IconCap, IconCoins } from "@/components/scholarships/icons";
import { SCHOLARSHIPS, type Scholarship } from "@/data/scholarships";
import { findScholarship, formatDate, formatDaysLeftLabel, isClosingSoon } from "@/lib/scholarship-match";

export function generateStaticParams() {
  return SCHOLARSHIPS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const scholarship = findScholarship(id);
  if (!scholarship) return { title: "Scholarship not found — EasiAbroad" };
  return {
    title: `${scholarship.name} — EasiAbroad`,
    description: scholarship.summary,
  };
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      <div className="mt-3.5">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid list-none gap-2.5 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.75 font-body text-[14.5px] leading-relaxed text-ink"
        >
          <span className="mt-0.5">
            <CheckIcon />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="grid list-none gap-3 p-0">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-3.5">
          <span className="grid h-6.5 w-6.5 shrink-0 place-items-center rounded-full bg-blue/10 font-label text-[12px] font-bold text-blue">
            {i + 1}
          </span>
          <span className="mt-0.5 font-body text-[14.5px] leading-relaxed text-ink">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default async function ScholarshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scholarship: Scholarship | undefined = findScholarship(id);
  if (!scholarship) notFound();

  const urgent = isClosingSoon(scholarship.deadline);

  return (
    <>
      <PageHeader
        kicker={scholarship.provider}
        title={scholarship.name}
        description={scholarship.summary}
        imageSrc={scholarship.imageSrc}
        imageAlt={scholarship.imageAlt}
      >
        <div className="mt-5.5 flex flex-wrap items-center gap-2">
          <span className="rounded-pill border border-line bg-soft px-2.75 py-1.25 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink">
            {scholarship.country}
          </span>
          {scholarship.degreeLevels.map((level) => (
            <span
              key={level}
              className="rounded-pill border border-line bg-soft px-2.75 py-1.25 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink"
            >
              {level}
            </span>
          ))}
          <span className="rounded-pill border border-blue/25 bg-blue/8 px-2.75 py-1.25 font-label text-[10.5px] font-semibold tracking-[0.04em] text-blue">
            {scholarship.fundingType}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div
            className={`rounded-xl border px-4 py-3 ${
              urgent ? "border-red/25 bg-red/8" : "border-line bg-soft"
            }`}
          >
            <div className="font-label text-[10.5px] uppercase tracking-[0.06em] text-sub">
              Application deadline
            </div>
            <div className="mt-1 font-body text-sm font-semibold text-ink">
              {formatDate(scholarship.deadline)}
            </div>
            <div
              className={`mt-1 font-display text-sm font-bold ${urgent ? "text-red" : "text-ink"}`}
            >
              {formatDaysLeftLabel(scholarship.deadline)}
            </div>
          </div>

          <a
            href={scholarship.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-button bg-blue px-5.5 py-3.25 font-body text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Apply on official site
          </a>
        </div>
      </PageHeader>

      <section className="bg-soft py-14">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/scholarships"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-blue no-underline"
          >
            ‹ Back to Scholarship Calendar
          </Link>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-white px-4 py-3.5">
              <div className="flex items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.08em] text-sub">
                <IconCap /> Min. CGPA
              </div>
              <div className="mt-1.5 font-display text-lg font-bold text-ink">
                {scholarship.minCgpa.toFixed(2)}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white px-4 py-3.5">
              <div className="flex items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.08em] text-sub">
                <IconCoins /> Funding
              </div>
              <div className="mt-1.5 font-display text-sm font-bold leading-snug text-ink">
                {scholarship.amount}
              </div>
            </div>
          </div>

          {scholarship.fields.length > 0 && (
            <div className="mt-6">
              <div className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                Eligible fields
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {scholarship.fields.map((f) => (
                  <span
                    key={f}
                    className="rounded-pill border border-line bg-white px-3 py-1.25 font-body text-[13px] font-medium text-ink"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-5">
            <InfoCard title="About this scholarship">
              <p className="font-body text-[14.5px] leading-relaxed text-sub">
                {scholarship.description}
              </p>
            </InfoCard>

            <InfoCard title="Eligibility">
              <BulletList items={scholarship.eligibility} />
            </InfoCard>

            <InfoCard title="What it covers">
              <BulletList items={scholarship.benefits} />
            </InfoCard>

            <InfoCard title="How to apply">
              <StepList steps={scholarship.howToApply} />
            </InfoCard>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 rounded-card border border-line bg-white px-6 py-8 text-center">
            <p className="font-display text-lg font-bold text-ink">
              Ready to start your application?
            </p>
            <p className="max-w-100 font-body text-sm text-sub">
              Visit the official {scholarship.provider} page for the full application form and
              latest requirements.
            </p>
            <a
              href={scholarship.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-button bg-blue px-5.5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
            >
              Apply on official site
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
