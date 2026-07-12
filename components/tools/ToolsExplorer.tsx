"use client";

import { useRef, useState } from "react";
import { TOOLS, type ToolId } from "@/data/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { DraftGenerator } from "@/components/tools/DraftGenerator";

export function ToolsExplorer() {
  const [selectedId, setSelectedId] = useState<ToolId>(TOOLS[0].id);
  const generatorRef = useRef<HTMLDivElement>(null);

  const selectedTool = TOOLS.find((t) => t.id === selectedId) ?? TOOLS[0];

  function handleSelect(id: ToolId) {
    setSelectedId(id);
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              active={tool.id === selectedId}
              onGenerate={() => handleSelect(tool.id)}
            />
          ))}
        </div>

        <div ref={generatorRef} className="mt-8 scroll-mt-24">
          <DraftGenerator key={selectedTool.id} tool={selectedTool} />
        </div>
      </div>
    </section>
  );
}
