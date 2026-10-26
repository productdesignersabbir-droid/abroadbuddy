import type { ReactNode } from "react";
import { FallbackImage } from "@/components/ui/FallbackImage";

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[8px] bg-softer px-2.5 py-1 font-body text-[13px] text-ink">
      {children}
    </span>
  );
}

/** Wrap a word of a serif heading in this for the italic accent. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="italic">{children}</em>;
}

export function PageHeader({
  kicker,
  title,
  description,
  imageSrc,
  imageAlt,
  media,
  compactOnPhone = false,
  children,
}: {
  kicker: string;
  title: ReactNode;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Replaces the photo with custom content (e.g. a carousel) in the same frame. */
  media?: ReactNode;
  /** On phones, show only the kicker and title so the page's tool comes first. */
  compactOnPhone?: boolean;
  children?: ReactNode;
}) {
  const hasMedia = Boolean(media || imageSrc);
  return (
    <section className="bg-paper">
      <div className={`mx-auto max-w-7xl px-6 sm:pb-14 sm:pt-18 ${compactOnPhone ? "pt-6" : "pt-14"} ${compactOnPhone ? "pb-2" : "pb-14"}`}>
        <div
          className={`grid grid-cols-1 items-center gap-10 ${
            hasMedia ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-14" : ""
          }`}
        >
          <div>
            <Kicker>{kicker}</Kicker>
            <h1 className="mt-5 font-display text-[clamp(40px,5.6vw,72px)] leading-[1.02] tracking-[-0.04em] text-ink">
              {title}
            </h1>
            <p
              className={`mt-5 max-w-140 font-body text-[18px] leading-relaxed text-sub ${compactOnPhone ? "hidden sm:block" : ""}`}
            >
              {description}
            </p>
            {children}
          </div>

          {hasMedia && (
            <div
              className={`relative h-64 overflow-hidden rounded-[30px] lg:h-96 ${compactOnPhone ? "hidden sm:block" : ""}`}
            >
              {media ?? (
                <FallbackImage
                  src={imageSrc!}
                  alt={imageAlt ?? ""}
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
