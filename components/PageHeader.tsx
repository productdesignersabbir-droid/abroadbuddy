import type { ReactNode } from "react";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function PageHeader({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-30 -top-40 h-120 w-120 rounded-full blur-[10px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,79,255,0.14), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pb-14 pt-16">
        <div
          className={`grid grid-cols-1 items-center gap-12 ${
            imageSrc ? "lg:grid-cols-[1.1fr_0.9fr]" : ""
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2.25 rounded-pill border border-line bg-soft px-3.25 py-1.75 font-label text-[12.5px] font-medium uppercase tracking-[0.04em] text-ink">
              <span className="inline-block h-1.75 w-1.75 rounded-full bg-red" />
              {kicker}
            </div>
            <h1 className="mt-4.5 font-display text-[clamp(32px,4.6vw,50px)] font-bold leading-[1.06] tracking-[-0.025em] text-ink">
              {title}
            </h1>
            <p className="mt-4.5 max-w-140 font-body text-lg leading-relaxed text-sub">
              {description}
            </p>
            {children}
          </div>

          {imageSrc && (
            <div className="relative h-64 overflow-hidden rounded-card border border-line shadow-[0_30px_60px_-20px_rgba(11,18,32,0.22)] lg:h-80">
              <FallbackImage
                src={imageSrc}
                alt={imageAlt ?? ""}
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
