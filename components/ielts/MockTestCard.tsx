import type { ReactElement } from "react";
import type { MockTestSection } from "@/data/ielts";
import { IconListening, IconReading, IconSpeaking, IconWriting } from "@/components/ielts/icons";

const SECTION_ICONS: Record<MockTestSection["id"], (props: { color: string }) => ReactElement> = {
  listening: IconListening,
  reading: IconReading,
  writing: IconWriting,
  speaking: IconSpeaking,
};

export function MockTestCard({
  section,
  onStart,
}: {
  section: MockTestSection;
  onStart: () => void;
}) {
  const Icon = SECTION_ICONS[section.id];

  return (
    <div className="flex flex-col rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)] sm:p-6">
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
        <span>{section.questionCount} questions</span>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="mt-5 w-full rounded-button bg-blue px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
      >
        Start test
      </button>
    </div>
  );
}
