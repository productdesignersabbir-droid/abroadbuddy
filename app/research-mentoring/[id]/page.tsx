import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { StarRating } from "@/components/mentors/StarRating";
import { CheckIcon } from "@/components/home/icons";
import { BookConsultationButton } from "@/components/research-mentoring/BookConsultationButton";
import { RESEARCH_MENTORS, type MentoringStep } from "@/data/research-mentors";
import { findResearchMentor, formatPrice } from "@/lib/research-mentor-match";

export function generateStaticParams() {
  return RESEARCH_MENTORS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const mentor = findResearchMentor(id);
  if (!mentor) return { title: "Mentor not found — EasiAbroad" };
  return {
    title: `${mentor.name} — 1:1 Research Mentoring — EasiAbroad`,
    description: mentor.tagline,
  };
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6.5">
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      <div className="mt-3.5">{children}</div>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
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

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-pill border border-line bg-soft px-3 py-1.5 font-body text-[13px] font-medium text-ink"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ExpertiseGrid({ groups }: { groups: { title: string; items: string[] }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="rounded-xl border border-line bg-soft px-4 py-3.5">
          <div className="font-body text-sm font-semibold text-ink">{group.title}</div>
          <ul className="mt-2 grid list-none gap-1.5 p-0">
            {group.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-body text-[13px] leading-relaxed text-sub"
              >
                <span className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function StepGrid({ steps }: { steps: MentoringStep[] }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {steps.map((s) => (
        <div
          key={s.step}
          className="flex items-start gap-3 rounded-xl border border-line bg-soft px-4 py-3.5"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue/10 font-label text-[11px] font-bold text-blue">
            {s.step}
          </span>
          <div>
            <div className="font-body text-sm font-semibold text-ink">{s.title}</div>
            <p className="mt-0.5 font-body text-[12.5px] leading-relaxed text-sub">
              {s.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ResearchMentorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mentor = findResearchMentor(id);
  if (!mentor) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-30 -top-40 h-120 w-120 rounded-full blur-[10px]"
          style={{
            background: "radial-gradient(circle, rgba(30,79,255,0.14), transparent 60%)",
          }}
        />

        <div className="mx-auto max-w-4xl px-6 pb-14 pt-16">
          <Link
            href="/research-mentoring"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-blue no-underline"
          >
            ‹ Back to Research Mentoring
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-line shadow-[0_18px_40px_-18px_rgba(11,18,32,0.28)]">
              <FallbackImage
                src={mentor.photoSrc}
                alt={mentor.photoAlt}
                className="object-cover"
                sizes="112px"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2.25 rounded-pill border border-line bg-soft px-3.25 py-1.75 font-label text-[12px] font-medium uppercase tracking-[0.04em] text-ink">
                <span className="inline-block h-1.75 w-1.75 rounded-full bg-red" />
                {mentor.category}
              </div>
              <h1 className="mt-3 font-display text-[clamp(26px,3.6vw,36px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
                {mentor.name}
              </h1>
              <p className="mt-1 font-body text-[15px] font-medium text-ink">{mentor.title}</p>
              <p className="mt-1 font-body text-sm italic text-sub">{mentor.tagline}</p>
              <p className="mt-1.5 font-body text-[13px] text-sub">{mentor.location}</p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl font-body text-[15px] leading-relaxed text-sub">
            {mentor.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-line bg-soft px-4 py-3">
              <div className="font-label text-[10.5px] uppercase tracking-[0.06em] text-sub">
                Experience
              </div>
              <div className="mt-1 font-body text-sm font-semibold text-ink">
                {mentor.yearsExperience}+ years
              </div>
            </div>
            <div className="rounded-xl border border-line bg-soft px-4 py-3">
              <div className="font-label text-[10.5px] uppercase tracking-[0.06em] text-sub">
                Rating
              </div>
              <div className="mt-1.5">
                <StarRating rating={mentor.rating} reviewCount={mentor.reviewCount} />
              </div>
            </div>
            <div className="rounded-xl border border-blue/25 bg-blue/8 px-4 py-3">
              <div className="font-label text-[10.5px] uppercase tracking-[0.06em] text-blue">
                Session
              </div>
              <div className="mt-1 font-display text-sm font-bold text-ink">
                {formatPrice(mentor.price)} · {mentor.sessionDurationMinutes} min
              </div>
            </div>
          </div>

          <div className="mt-6">
            <BookConsultationButton
              mentor={mentor}
              className="inline-flex items-center justify-center gap-2 rounded-button bg-blue px-5.5 py-3.25 font-body text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
            />
          </div>
        </div>
      </section>

      <section className="bg-soft py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-5">
            <InfoCard title="Areas of expertise">
              <ExpertiseGrid groups={mentor.expertiseAreas} />
            </InfoCard>

            <InfoCard title="How mentoring works">
              <StepGrid steps={mentor.mentoringSupport} />
            </InfoCard>

            <InfoCard title="Achievements">
              <CheckList items={mentor.achievements} />
            </InfoCard>

            <InfoCard title="Research interests">
              <PillList items={mentor.researchInterests} />
            </InfoCard>

            <InfoCard title="Tools & software">
              <PillList items={mentor.toolsSoftware} />
            </InfoCard>

            <InfoCard title="Who can work with me">
              <CheckList items={mentor.whoCanWorkWith} />
            </InfoCard>

            <InfoCard title="What you'll learn">
              <CheckList items={mentor.youWillLearn} />
            </InfoCard>

            <InfoCard title="Mentoring style">
              <PillList items={mentor.mentoringStyle} />
            </InfoCard>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 rounded-card border border-line bg-white px-6 py-8 text-center">
            <p className="font-display text-lg font-bold text-ink">
              Ready to start your research journey?
            </p>
            <p className="max-w-100 font-body text-sm text-sub">
              Book a paid 1:1 session with {mentor.name} and get step-by-step guidance toward
              publication.
            </p>
            <BookConsultationButton
              mentor={mentor}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-button bg-blue px-5.5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
            />
          </div>
        </div>
      </section>
    </>
  );
}
