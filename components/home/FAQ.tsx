"use client";

import { useState } from "react";
import { Accent, Kicker } from "@/components/PageHeader";

const QUESTIONS = [
  {
    q: "Is EasiAbroad free?",
    a: "Yes. All five tools are free while we're in beta, and you don't need an account to start.",
  },
  {
    q: "What does my readiness score mean?",
    a: "It shows how prepared your profile is across CGPA, English, research, budget and documents. It's guidance on what to work on — not a prediction of whether you'll be admitted.",
  },
  {
    q: "Where does the scholarship information come from?",
    a: "Each scholarship links to its official website. Dates and funding can change every year, so always confirm the details there before you apply.",
  },
  {
    q: "I'm still in my second or third year. Is it too early?",
    a: "Not at all. The earlier you start, the more time you have to build research experience, improve your English score and prepare documents.",
  },
  {
    q: "Is it only for Bangladeshi students?",
    a: "It's built around Bangladeshi students — our CGPA scale, common tests and popular destinations — but anyone can use it.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
        open ? "bg-ink text-white" : "bg-white text-ink"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={open ? "rotate-45" : ""}>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-200 px-6">
        <div className="text-center">
          <Kicker>FAQ</Kicker>
          <h2 className="mt-5 font-display text-[clamp(38px,5vw,66px)] leading-[1.04] tracking-[-0.035em] text-ink">
            Things you might
            <br />
            <Accent>be wondering.</Accent>
          </h2>
        </div>

        <ul className="mt-12 grid list-none gap-3 p-0">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`rounded-[18px] ${isOpen ? "bg-white" : "bg-soft"}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5.5 py-4.5 text-left font-body text-[16.5px] text-ink"
                  >
                    {item.q}
                    <PlusIcon open={isOpen} />
                  </button>
                </h3>
                {isOpen && (
                  <p className="px-5.5 pb-5 font-body text-[15px] leading-relaxed text-sub">{item.a}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
