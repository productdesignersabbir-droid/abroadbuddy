import { SectionHead } from "@/components/home/SectionHead";
import { IconMentor, IconCal, IconVideo } from "@/components/home/icons";

const STEPS = [
  {
    tag: "01",
    title: "Pick a mentor",
    desc: "Filter by destination, field and session type to find someone who's already walked your path.",
    icon: IconMentor,
  },
  {
    tag: "02",
    title: "Book a slot",
    desc: "Send a session request — your mentor confirms a time by email within 24 hours.",
    icon: IconCal,
  },
  {
    tag: "03",
    title: "Meet online",
    desc: "Hop on a video call for honest, first-hand advice on your applications and next steps.",
    icon: IconVideo,
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-line bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead kicker="How it works" title="Three steps to your first session" />
        <div className="mt-10 grid grid-cols-1 gap-4.5 sm:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.tag}
                className="rounded-card border border-line bg-soft p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-11.5 w-11.5 place-items-center rounded-[13px] bg-blue/10 text-blue">
                    <Icon color="#1E4FFF" />
                  </div>
                  <span className="font-label text-[13px] font-bold text-[#C3CCDE]">
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-4.5 font-display text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.25 font-body text-[14.5px] leading-relaxed text-sub">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
