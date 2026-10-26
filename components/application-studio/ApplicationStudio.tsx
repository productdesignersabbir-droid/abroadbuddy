"use client";

import Link from "next/link";
import { useState } from "react";
import {
  STUDIO_DEGREES,
  buildDraft,
  docsFor,
  type DocId,
  type StudioDegree,
} from "@/data/application-studio";
import { Field, inputClass } from "@/components/ui/Chip";

export function ApplicationStudio({
  initialDoc = "cv",
  initialDegree = "masters",
}: {
  initialDoc?: DocId;
  initialDegree?: StudioDegree;
}) {
  const [degree, setDegree] = useState<StudioDegree>(initialDegree);
  const [docId, setDocId] = useState<DocId>(initialDoc);
  // One set of answers, so shared boxes like the program carry across documents.
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const docs = docsFor(degree);
  const doc = docs.find((d) => d.id === docId) ?? docs[0];
  const draft = buildDraft(doc.id, degree, values);
  const words = draft.split(/\s+/).filter((w) => w && !w.startsWith("[")).length;

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-body text-[13px] text-sub">I&apos;m applying for</span>
          <div role="group" aria-label="Degree level" className="flex gap-1 bg-white p-1">
            {STUDIO_DEGREES.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={degree === d.id}
                onClick={() => setDegree(d.id)}
                className={`px-4 py-2 font-body text-[14px] font-semibold transition-colors ${
                  degree === d.id ? "bg-blue text-white" : "text-sub hover:bg-soft hover:text-ink"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div role="tablist" aria-label="Document" className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
          {docs.map((d) => {
            const active = d.id === doc.id;
            return (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDocId(d.id)}
                className={`border-b-[3px] bg-white p-4 text-left transition-colors ${
                  active ? "border-blue" : "border-transparent hover:bg-white/70"
                }`}
              >
                <span className={`font-display text-[19px] ${active ? "text-blue" : "text-ink"}`}>{d.label}</span>
                <span className="mt-1 block font-body text-[13px] leading-snug text-sub">{d.blurb}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-5 bg-white p-6 sm:p-7">
            {doc.fields.map((f) => (
              <Field key={f.key} label={f.label}>
                {f.multiline ? (
                  <textarea
                    rows={3}
                    value={values[f.key] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className={`${inputClass} resize-y`}
                  />
                ) : (
                  <input
                    value={values[f.key] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className={inputClass}
                  />
                )}
              </Field>
            ))}
            <p className="font-body text-[12.5px] leading-relaxed text-sub">
              Your answers stay on this page and aren&apos;t sent anywhere. The university&apos;s own
              instructions always come first.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-label text-[11px] uppercase tracking-[0.08em] text-sub">
                  Your draft · {words} words
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="bg-blue px-4 py-2 font-body text-[13.5px] font-semibold text-white"
                >
                  {copied ? "Copied" : "Copy draft"}
                </button>
              </div>
              <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap px-6 py-5 font-body text-[14.5px] leading-relaxed text-ink">
                {draft}
              </pre>
            </div>
            <p className="font-body text-[12.5px] text-sub">
              Text in [brackets] is what you still need to write. Replace it before you send anything.
            </p>
            <div className="flex flex-col gap-3 bg-ink p-5.5 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-[21px]">Want a second pair of eyes?</p>
                <p className="mt-1 font-body text-[14px] text-white/75">
                  A mentor who got in can review your draft before you submit.
                </p>
              </div>
              <Link href="/mentoring" className="shrink-0 bg-blue px-4 py-2.5 font-body text-[14px] font-semibold">
                Book a document review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
