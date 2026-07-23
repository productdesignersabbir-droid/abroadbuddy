import type { ExamFormatSection as ExamFormatSectionType } from "@/data/ielts";
import { IconTest } from "@/components/home/icons";
import { ExamFormatCard } from "@/components/exam-prep/ExamFormatCard";

export function ExamFormatSection({
  sections,
  totalDurationLabel,
}: {
  sections: ExamFormatSectionType[];
  totalDurationLabel: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10">
          <IconTest color="#1E4FFF" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Exam format</h2>
          <p className="font-body text-[13px] text-sub">{totalDurationLabel}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <ExamFormatCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
