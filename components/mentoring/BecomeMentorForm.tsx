"use client";

import { useEffect, useRef, useState } from "react";
import { Accent } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";

const FIELD = "w-full border border-line bg-white px-3.5 py-3 font-body text-[15px] text-ink outline-none focus:border-ink";

/** Students already abroad on funding apply to mentor the next one. */
export function BecomeMentorForm() {
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Links like /mentoring#become-a-mentor land here once the page has laid out.
  useEffect(() => {
    if (window.location.hash !== "#become-a-mentor") return;
    const t = setTimeout(() => ref.current?.scrollIntoView({ block: "start", behavior: "instant" }), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} id="become-a-mentor" className="scroll-mt-24 bg-soft py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="font-body text-[14px] text-sub">Already abroad on funding?</p>
          <h2 className="mt-3 font-display text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.03em] text-ink">
            Help the next student. <Accent>Get paid for it.</Accent>
          </h2>
          <p className="mt-4 max-w-md font-body text-[16px] leading-relaxed text-sub">
            Mentors set their own hours and earn for every session. We check each mentor&apos;s admission and funding
            before their profile goes live.
          </p>
        </div>

        {sent ? (
          <div className="animate-appear bg-white p-7">
            <p className="font-display text-[26px] leading-tight text-ink">Thanks{name.trim() ? `, ${name.trim()}` : ""}.</p>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-sub">
              We&apos;ve got your application. We&apos;ll email you to confirm your admission and funding, then help you set up
              your profile.
            </p>
          </div>
        ) : (
          <form
            className="grid gap-4 bg-white p-6 sm:grid-cols-2 sm:p-7"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="grid gap-1.5 font-body text-[14px] text-ink">
              Full name
              <input required value={name} onChange={(e) => setName(e.target.value)} className={FIELD} autoComplete="name" />
            </label>
            <label className="grid gap-1.5 font-body text-[14px] text-ink">
              Email
              <input required type="email" className={FIELD} autoComplete="email" />
            </label>
            <label className="grid gap-1.5 font-body text-[14px] text-ink">
              University and country
              <input required className={FIELD} placeholder="e.g. TU Munich, Germany" />
            </label>
            <label className="grid gap-1.5 font-body text-[14px] text-ink">
              Your field
              <input required className={FIELD} placeholder="e.g. Civil engineering" />
            </label>
            <label className="grid gap-1.5 font-body text-[14px] text-ink sm:col-span-2">
              How you&apos;re funded
              <select required defaultValue="" className={FIELD}>
                <option value="" disabled>
                  Choose one
                </option>
                <option>Scholarship</option>
                <option>Teaching or research assistantship</option>
                <option>Salaried PhD position</option>
                <option>Other</option>
              </select>
            </label>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full px-6 py-3.5 text-[16px] sm:w-auto">
                Apply to become a mentor
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
