"use client";

import { useState } from "react";
import { ShareStoryModal } from "@/components/stories/ShareStoryModal";

export function ShareStoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex items-center gap-2 rounded-button bg-blue px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 5h16v11H8l-4 4z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        Share your story
      </button>

      {open && <ShareStoryModal onClose={() => setOpen(false)} />}
    </>
  );
}
