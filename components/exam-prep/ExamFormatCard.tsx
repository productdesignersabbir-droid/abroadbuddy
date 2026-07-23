import type { ReactElement } from "react";
import type { ExamFormatSection } from "@/data/ielts";
import { IconReading, IconWriting } from "@/components/ielts/icons";
import { IconTest } from "@/components/home/icons";

const SECTION_ICONS: Record<string, (props: { color: string }) => ReactElement> = {
  "gre-verbal": IconReading,
  "gre-quant": IconTest,
  "gre-awa": IconWriting,
  "gmat-verbal": IconReading,
  "gmat-quant": IconTest,
  "gmat-data-insights": IconTest,
};

export function ExamFormatCard({ section }: { section: ExamFormatSection }) {
  const Icon = SECTION_ICONS[section.id] ?? IconTest;

  return (
    <div className="flex flex-col rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] sm:p-6">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-blue/10">
        <Icon color="#1E4FFF" />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-ink">{section.title}</h3>
      <p className="mt-1.5 flex-1 font-body text-[13.5px] leading-relaxed text-sub">
        {section.description}
      </p>
      <div className="mt-4 flex items-center gap-2.5 font-label text-[10.5px] font-semibold uppercase tracking-[0.05em] text-sub">
        <span>{section.durationMinutes} min</span>
        <span className="h-1 w-1 rounded-full bg-line" />
        <span>
          {section.questionCount} {section.questionCount === 1 ? "question" : "questions"}
        </span>
      </div>
    </div>
  );
}
