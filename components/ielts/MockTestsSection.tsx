"use client";

import { useState } from "react";
import { MOCK_TEST_SECTIONS, type MockTestSection } from "@/data/ielts";
import { IconTest } from "@/components/home/icons";
import { MockTestCard } from "@/components/ielts/MockTestCard";
import { TestModal } from "@/components/ielts/TestModal";

export function MockTestsSection() {
  const [active, setActive] = useState<MockTestSection | null>(null);

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10">
          <IconTest color="#1E4FFF" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Free mock tests</h2>
          <p className="font-body text-[13px] text-sub">
            Practice each section for free. The Reading test is fully interactive.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_TEST_SECTIONS.map((section) => (
          <MockTestCard
            key={section.id}
            section={section}
            onStart={() => setActive(section)}
          />
        ))}
      </div>

      {active && <TestModal section={active} onClose={() => setActive(null)} />}
    </div>
  );
}
