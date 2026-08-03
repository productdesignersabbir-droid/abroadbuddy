"use client";

import { useState } from "react";
import type { ResearchMentor } from "@/data/research-mentors";
import { BookConsultationModal } from "@/components/research-mentoring/BookConsultationModal";

export function BookConsultationButton({
  mentor,
  className,
}: {
  mentor: ResearchMentor;
  className: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Book a paid consultation
      </button>
      {open && <BookConsultationModal mentor={mentor} onClose={() => setOpen(false)} />}
    </>
  );
}
