"use client";

import { useState } from "react";
import { SPECIALISTS, type Specialist } from "@/data/specialists";
import { SpecialistCard } from "@/components/tools/SpecialistCard";
import { HireSpecialistModal } from "@/components/tools/HireSpecialistModal";

export function SpecialistsSection() {
  const [hiring, setHiring] = useState<Specialist | null>(null);

  return (
    <section className="bg-paper py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-140">
          <div className="inline-flex items-center gap-2.25 rounded-pill border border-red/20 bg-red/8 px-3.25 py-1.75 font-label text-[12.5px] font-medium uppercase tracking-[0.04em] text-ink">
            <span className="inline-block h-1.75 w-1.75 rounded-full bg-red" />
            Hire a specialist
          </div>
          <h2 className="mt-4.5 font-display text-[clamp(26px,3.2vw,36px)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
            Want a human touch? Work 1:1 with a vetted writer.
          </h2>
          <p className="mt-3.5 font-body text-[15.5px] leading-relaxed text-sub">
            Specialists review your background, ask the right questions, and write or
            polish your document with you — ideal for competitive programs.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALISTS.map((specialist) => (
            <SpecialistCard
              key={specialist.id}
              specialist={specialist}
              onHire={() => setHiring(specialist)}
            />
          ))}
        </div>
      </div>

      {hiring && (
        <HireSpecialistModal specialist={hiring} onClose={() => setHiring(null)} />
      )}
    </section>
  );
}
