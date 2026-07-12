"use client";

import { useState, type FormEvent } from "react";
import type { WritingTool } from "@/data/tools";
import { generateDraft } from "@/lib/draft-generator";
import { IconSparkle, IconCopy, IconCheckSmall } from "@/components/tools/icons";

const fieldLabel = "font-label text-[11px] uppercase tracking-[0.08em] text-sub";
const inputClass =
  "mt-2 w-full rounded-button border-[1.5px] border-line bg-white px-3.5 py-2.5 font-body text-sm font-medium text-ink transition-colors focus-visible:border-blue";

// Note: this component is remounted (via a `key={tool.id}` in ToolsExplorer)
// whenever the selected tool changes, so state resets naturally without an effect.
export function DraftGenerator({ tool }: { tool: WritingTool }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function setValue(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  async function handleGenerate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setCopied(false);
    const result = await generateDraft(tool.id, values);
    setDraft(result);
    setLoading(false);
  }

  async function handleCopy() {
    if (!draft) return;
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-[0_2px_6px_rgba(11,18,32,0.04)]">
      <div className="flex items-center justify-between border-b border-line bg-soft px-6 py-4.5">
        <div>
          <div className="font-label text-[11px] tracking-[0.1em] text-sub">
            DEMO GENERATOR
          </div>
          <div className="mt-0.5 font-display text-lg font-bold text-ink">{tool.name}</div>
        </div>
        <span
          className={`rounded-pill px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] ${
            tool.tier === "Free" ? "bg-blue/10 text-blue" : "bg-red/10 text-red"
          }`}
        >
          {tool.tier.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <form
          onSubmit={handleGenerate}
          className="border-b border-line p-6 lg:border-b-0 lg:border-r"
        >
          {tool.fields.map((field) => (
            <div key={field.id} className="mt-4 first:mt-0">
              <label htmlFor={field.id} className={fieldLabel}>
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.id}
                  value={values[field.id] ?? ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  rows={3}
                  value={values[field.id] ?? ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className={`${inputClass} resize-none`}
                />
              ) : (
                <input
                  id={field.id}
                  type="text"
                  value={values[field.id] ?? ""}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-button bg-blue px-5 py-3 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
          >
            <IconSparkle />
            {loading ? "Generating..." : "Generate draft"}
          </button>
          <p className="mt-3 font-body text-[12.5px] leading-relaxed text-sub">
            This demo produces a templated sample draft. Connect a real AI backend to
            generate a personalized version.
          </p>
        </form>

        <div className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <span className={fieldLabel}>Draft output</span>
            {draft && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-button border border-line px-3 py-1.5 font-body text-[12.5px] font-semibold text-ink transition-colors hover:border-blue/50"
              >
                {copied ? <IconCheckSmall color="#1E4FFF" /> : <IconCopy />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>

          <div className="mt-3 max-h-100 flex-1 overflow-y-auto rounded-xl border border-dashed border-line bg-soft p-4.5">
            {loading ? (
              <div className="space-y-2.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 animate-pulse rounded-full bg-softer"
                    style={{ width: `${85 - i * 6}%` }}
                  />
                ))}
              </div>
            ) : draft ? (
              <pre className="whitespace-pre-wrap font-body text-[13.5px] leading-relaxed text-ink">
                {draft}
              </pre>
            ) : (
              <p className="font-body text-[13.5px] leading-relaxed text-sub">
                Fill in the form and click &quot;Generate draft&quot; to see a sample{" "}
                {tool.shortName.toLowerCase()} draft here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
