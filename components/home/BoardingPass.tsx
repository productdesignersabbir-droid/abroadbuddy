"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { COUNTRIES, MAJORS, type Major } from "@/data/universities";

const selectClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-[13.5px] font-medium text-ink transition-colors focus-visible:border-blue";

export function BoardingPass() {
  const [cgpa, setCgpa] = useState(3.6);
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>("USA");
  const [major, setMajor] = useState<Major>(MAJORS[0]);

  const matches = Math.min(
    500,
    Math.round(40 + cgpa * 80 + country.length * 6 + major.length * 3)
  );

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_30px_60px_-20px_rgba(11,18,32,0.22)]">
        <div className="flex items-center justify-between bg-linear-to-r from-blue to-[#3D66FF] px-5.5 py-4.5 text-white">
          <span className="font-label text-[11.5px] tracking-[0.12em] opacity-90">
            BOARDING&nbsp;PASS
          </span>
          <span className="font-label text-[11.5px] tracking-[0.12em] opacity-90">
            EASIABROAD
          </span>
        </div>

        <div className="px-5.5 pb-2 pt-5.5">
          <div className="font-label text-[11px] tracking-[0.1em] text-sub">
            PASSENGER
          </div>
          <div className="mt-1 font-display text-[22px] font-bold text-ink">
            Future Grad Student
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <label className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                Your CGPA
              </label>
              <span className="font-display text-lg font-bold text-blue">
                {cgpa.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={4}
              step={0.05}
              value={cgpa}
              onChange={(e) => setCgpa(parseFloat(e.target.value))}
              className="mt-2 w-full accent-blue"
              aria-label="Your CGPA"
            />
          </div>

          <div className="mt-4">
            <label className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
              Destination
            </label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {COUNTRIES.map((c) => {
                const active = c === country;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCountry(c)}
                    className={`rounded-pill border-[1.5px] px-3.5 py-1.5 font-body text-[13.5px] font-semibold transition-all duration-150 ${
                      active
                        ? "border-blue bg-blue text-white"
                        : "border-line bg-white text-ink"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <label className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
              Major
            </label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value as Major)}
              className={selectClass}
              aria-label="Major"
            >
              {MAJORS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative mt-4.5">
          <div className="border-t-2 border-dashed border-line" />
          <span className="absolute -left-2.75 -top-2.75 h-5.5 w-5.5 rounded-full border border-line bg-soft" />
          <span className="absolute -right-2.75 -top-2.75 h-5.5 w-5.5 rounded-full border border-line bg-soft" />
        </div>

        <div className="flex items-center justify-between px-5.5 pb-5.5 pt-4">
          <div>
            <div className="font-label text-[11px] tracking-[0.1em] text-sub">
              MATCHED PROGRAMS
            </div>
            <div className="font-display text-[30px] font-bold text-ink">
              {matches}
              <span className="text-red">+</span>
            </div>
          </div>
          <Button href="/universities" variant="primary" className="px-4.5 py-3">
            See matches →
          </Button>
        </div>
      </div>

      <div className="absolute -left-3.5 -top-3.5 -rotate-4 rounded-[9px] bg-red px-3 py-1.75 font-label text-[11px] font-bold tracking-[0.1em] text-white shadow-[0_8px_18px_rgba(255,59,71,0.35)]">
        DEPARTURES ✈
      </div>
    </div>
  );
}
