"use client";

import { useState } from "react";
import { Accent, Kicker } from "@/components/PageHeader";

const QUESTIONS = [
  {
    q: "Is EasiAbroad free?",
    a: "Yes. Every tool is free to use, and you don't need an account to start. Mentoring is the only paid service, and you choose it only if you want it.",
  },
  {
    q: "What does \u201cfunded\u201d mean?",
    a: "The university or a scholarship pays your tuition and a monthly stipend for living costs. It usually comes as a scholarship, a teaching or research assistantship, or a salaried PhD position.",
  },
  {
    q: "What is a teaching or research assistantship?",
    a: "A paid part-time job in your department, often around 20 hours a week, that usually comes with a tuition waiver. It's one of the most common ways PhD students in the US and Canada are funded.",
  },
  {
    q: "Can I get funding for a master's?",
    a: "Yes, though it's less common than for a PhD. Look at government scholarships such as Chevening, DAAD, MEXT, Erasmus Mundus and the Swedish Institute, and ask departments about assistantships.",
  },
  {
    q: "Do I need an agent?",
    a: "No. Universities and scholarships take applications on their own websites. Our tools and mentors help you apply yourself. We'll never ask for your passport or promise you an admission.",
  },
  {
    q: "I'm still in my second or third year. Is it too early?",
    a: "No, it's the best time to start. You still have time to raise your CGPA, join a thesis or lab project, present at a conference and plan your English test.",
  },
  {
    q: "When should I start applying?",
    a: "About 12 to 15 months before you want to begin. Take your English test first, then build your shortlist and email professors, then prepare your documents and references.",
  },
  {
    q: "Should I email professors before applying?",
    a: "For research degrees, usually yes. A short, specific email about their recent work can lead to a call and sometimes a funded place. Professor Finder helps you choose who to write to.",
  },
  {
    q: "Do I need the GRE?",
    a: "Many programs have made it optional. Check each program's page before you spend months on a test nobody asked for.",
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
    q: "Is it only for Bangladeshi students?",
    a: "It's built around Bangladeshi students — our CGPA scale, common tests and popular destinations — but anyone can use it.",
  },
];

/** How many questions show before "Show all". */
const FIRST = 6;

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
  const [all, setAll] = useState(false);

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
          {(all ? QUESTIONS : QUESTIONS.slice(0, FIRST)).map((item, i) => {
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

        {!all && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setAll(true)}
              className="bg-softer px-5 py-2.5 font-body text-[15px] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Show all {QUESTIONS.length} questions
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
