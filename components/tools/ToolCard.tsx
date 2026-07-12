import type { WritingTool } from "@/data/tools";
import { IconResume, IconSop, IconLor } from "@/components/tools/icons";

const TOOL_ICON: Record<WritingTool["id"], typeof IconResume> = {
  cv: IconResume,
  sop: IconSop,
  lor: IconLor,
};

export function ToolCard({
  tool,
  active,
  onGenerate,
}: {
  tool: WritingTool;
  active: boolean;
  onGenerate: () => void;
}) {
  const Icon = TOOL_ICON[tool.id];

  return (
    <div
      className={`flex flex-col rounded-card border bg-white p-6 shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)] ${
        active ? "border-blue" : "border-line"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10">
          <Icon />
        </span>
        <span
          className={`rounded-pill px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] ${
            tool.tier === "Free" ? "bg-blue/10 text-blue" : "bg-red/10 text-red"
          }`}
        >
          {tool.tier.toUpperCase()}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-ink">{tool.name}</h3>
      <p className="mt-2 flex-1 font-body text-[13.5px] leading-relaxed text-sub">
        {tool.description}
      </p>

      <button
        type="button"
        onClick={onGenerate}
        className="mt-5 rounded-button bg-blue px-4 py-2.5 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
      >
        Generate {tool.shortName} →
      </button>
    </div>
  );
}
