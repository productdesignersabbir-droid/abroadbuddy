import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/PageHeader";

/** For students already abroad on funding: guide the next one and get paid. */
export function BecomeMentor() {
  return (
    <section className="bg-paper pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 bg-blue p-8 text-white sm:p-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="font-body text-[14px] text-white/75">Already abroad on funding?</p>
            <h2 className="mt-3 font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] tracking-[-0.03em]">
              Earn while you study. <Accent>Become a mentor.</Accent>
            </h2>
            <p className="mt-4 max-w-xl font-body text-[17px] leading-relaxed text-white/85">
              Guide the next student from Bangladesh in your own field, on your own hours, and get paid for every
              session.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Button href="/mentoring#become-a-mentor" variant="white" className="px-6.5 py-3.5 text-[16px]">
              Apply to become a mentor
            </Button>
            <Link
              href="/mentoring"
              className="font-body text-[14px] text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              See how mentoring works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
