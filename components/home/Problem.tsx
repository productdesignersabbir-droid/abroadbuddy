import { Button } from "@/components/ui/Button";
import { Kicker, Accent } from "@/components/PageHeader";
import { IconCal, IconDoc, IconLab, IconSearch, IconTest } from "@/components/home/icons";

type Pitfall = { label: string; fix: string; icon: typeof IconCal };

const LEFT: Pitfall[] = [
  { label: "Missed a scholarship deadline", fix: "Calendar", icon: IconCal },
  { label: "Applied to the wrong universities", fix: "Finder", icon: IconSearch },
  { label: "English score too low", fix: "Readiness", icon: IconTest },
];

const RIGHT: Pitfall[] = [
  { label: "No research experience", fix: "Professors", icon: IconLab },
  { label: "Cold emails left unanswered", fix: "Professors", icon: IconDoc },
  { label: "Missed a paper submission", fix: "Conferences", icon: IconCal },
];

function PitfallChip({ p, className = "" }: { p: Pitfall; className?: string }) {
  const Icon = p.icon;
  return (
    <li
      className={`flex items-center gap-3 rounded-[16px] bg-soft px-3.5 py-3 ${className}`}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-white">
        <Icon color="#0B1220" />
      </span>
      <span className="flex-1 font-body text-[15px] leading-snug text-ink">{p.label}</span>
      <span className="shrink-0 rounded-pill bg-blue/8 px-2.5 py-1 font-body text-[12px] text-blue">
        {p.fix}
      </span>
    </li>
  );
}

export function Problem() {
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-200 text-center">
          <Kicker>The problem we solve</Kicker>
          <h2 className="mt-5 font-display text-[clamp(38px,5.4vw,70px)] leading-[1.04] tracking-[-0.035em] text-ink">
            Without the right <Accent>guidance</Accent>, one missed step costs you a year.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <ul className="grid list-none gap-4 p-0">
            {LEFT.map((p, i) => (
              <PitfallChip key={p.label} p={p} className={i === 1 ? "lg:-ml-8 lg:mr-8" : ""} />
            ))}
          </ul>

          <div className="order-first mx-auto grid h-56 w-56 place-items-center rounded-full bg-softer lg:order-none">
            <div className="grid h-44 w-44 place-items-center rounded-full bg-ink text-center text-white">
              <div>
                <div className="font-display text-[56px] leading-none tracking-[-0.04em]">
                  5<span className="text-[28px] italic text-white/60">/tools</span>
                </div>
                <div className="mt-2 font-body text-[13px] leading-snug text-white/70">
                  One plan,
                  <br />
                  zero guesswork
                </div>
              </div>
            </div>
          </div>

          <ul className="grid list-none gap-4 p-0">
            {RIGHT.map((p, i) => (
              <PitfallChip key={p.label} p={p} className={i === 1 ? "lg:-mr-8 lg:ml-8" : ""} />
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 flex max-w-155 flex-col items-start gap-5 rounded-[30px] bg-white px-7 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[30px] leading-[1.1] tracking-[-0.02em] text-ink">
            Find the gaps
            <br />
            before you apply.
          </p>
          <Button href="/readiness" variant="dark" className="px-6 py-3">
            Start assessment
          </Button>
        </div>
      </div>
    </section>
  );
}
