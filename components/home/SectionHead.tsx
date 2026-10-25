import type { ReactNode } from "react";
import { Kicker } from "@/components/PageHeader";

export function SectionHead({
  kicker,
  title,
  sub,
  center = false,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  if (center) {
    return (
      <div className="mx-auto max-w-180 text-center">
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(38px,5vw,66px)] leading-[1.04] tracking-[-0.035em] text-ink">
          {title}
        </h2>
        {sub && (
          <p className="mx-auto mt-5 max-w-130 font-body text-[17px] leading-relaxed text-sub">
            {sub}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-5 font-display text-[clamp(38px,5vw,66px)] leading-[1.04] tracking-[-0.035em] text-ink">
          {title}
        </h2>
      </div>
      {sub && (
        <p className="max-w-110 font-body text-[17px] leading-relaxed text-sub lg:justify-self-end lg:pb-2">
          {sub}
        </p>
      )}
    </div>
  );
}
