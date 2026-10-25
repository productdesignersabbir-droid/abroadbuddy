import { useCurrentFrame } from "remotion";
import { C, F } from "../theme";
import { Accent, Card, Cursor, FeatureScene, Pill, useEnter, useProgress } from "../ui";

const SCORES = [
  { short: "Mentoring", v: 4.8 },
  { short: "Funding", v: 4.4 },
  { short: "Balance", v: 4.3 },
  { short: "Publishing", v: 4.1 },
];

const TAGS = ["Usable security", "Privacy", "Mobile app security"];

function Score({ short, v, i }: { short: string; v: number; i: number }) {
  const p = useProgress(52 + i * 5, 82 + i * 5);
  const show = useEnter(46 + i * 5, 16);
  return (
    <div style={{ textAlign: "center", opacity: show }}>
      <div style={{ fontFamily: F.display, fontSize: 44, color: C.ink, lineHeight: 1 }}>{(v * p).toFixed(1)}</div>
      <div style={{ fontFamily: F.body, fontSize: 16, color: C.sub, marginTop: 6 }}>{short}</div>
    </div>
  );
}

function Tag({ text, i }: { text: string; i: number }) {
  const p = useEnter(40 + i * 5, 18);
  return (
    <span style={{ opacity: p, transform: `scale(${0.8 + p * 0.2})`, display: "inline-block" }}>
      <Pill style={{ fontSize: 18 }}>{text}</Pill>
    </span>
  );
}

/** Ghost cards behind the main profile suggest a deck of many labs. */
function GhostCard({ offset, delay }: { offset: number; delay: number }) {
  const p = useEnter(delay, 26);
  return (
    <Card
      style={{
        position: "absolute",
        left: 60 + offset,
        right: 60 - offset,
        top: 30 - offset * 0.6,
        height: 560,
        opacity: p * 0.9,
        transform: `rotate(${offset * 0.08}deg) translateY(${(1 - p) * 40}px)`,
        background: offset > 50 ? "#f4f0ea" : "#f9f6f1",
      }}
    />
  );
}

export function Professor() {
  const frame = useCurrentFrame();
  const head = useEnter(14, 26);
  const status = useEnter(28, 22);
  const review = useEnter(96, 28);
  const pulse = 0.5 + 0.5 * Math.sin(frame / 6);
  const btnPressed = frame >= 128 && frame < 136;
  return (
    <FeatureScene
      index={3}
      label="Find your Professor"
      title={
        <>
          Meet professors <Accent>before</Accent> you apply.
        </>
      }
      sub="See who's taking students, what funding looks like, and what their students say."
    >
      <GhostCard offset={70} delay={0} />
      <GhostCard offset={35} delay={4} />
      <Card style={{ position: "absolute", left: 40, right: 40, top: 70, padding: "38px 42px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: head, transform: `translateY(${(1 - head) * 20}px)` }}>
          <span style={{ width: 96, height: 96, borderRadius: "50%", background: "#e4ebe4", display: "grid", placeItems: "center", fontFamily: F.display, fontSize: 40, color: C.ink }}>
            FR
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.display, fontSize: 50, color: C.ink, lineHeight: 1.05 }}>Prof. Farhana Rahman</div>
            <div style={{ fontFamily: F.body, fontSize: 20, color: C.sub, marginTop: 6 }}>Assistant Professor · Secure Systems Lab</div>
            <div style={{ fontFamily: F.body, fontSize: 21, color: C.ink, marginTop: 8, fontWeight: 500 }}>🇺🇸 Carnegie Mellon University</div>
          </div>
          <Pill style={{ fontSize: 22, alignSelf: "flex-start" }}>
            <span style={{ color: C.amber }}>★</span> 4.4
          </Pill>
        </div>

        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, opacity: status, fontFamily: F.body, fontSize: 21 }}>
          <span style={{ position: "relative", width: 14, height: 14 }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.green }} />
            <span style={{ position: "absolute", inset: -6, borderRadius: "50%", background: C.green, opacity: 0.25 * pulse }} />
          </span>
          <b style={{ color: "#1f7a52", fontWeight: 600 }}>Accepting students</b>
          <span style={{ color: C.sub }}>· 2 PhD places for Fall 2027</span>
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {TAGS.map((t, i) => (
            <Tag key={t} text={t} i={i} />
          ))}
        </div>

        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "22px 10px", borderRadius: 22, background: C.paper }}>
          {SCORES.map((s, i) => (
            <Score key={s.short} {...s} i={i} />
          ))}
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: F.body, fontSize: 19, color: C.sub }}>Funding: $42k/yr stipend + full tuition</span>
          <span
            style={{
              padding: "13px 26px",
              borderRadius: 99,
              border: `2px solid ${C.ink}`,
              background: btnPressed ? C.ink : C.white,
              color: btnPressed ? C.white : C.ink,
              fontFamily: F.body,
              fontSize: 19,
              fontWeight: 600,
            }}
          >
            View profile
          </span>
        </div>
      </Card>

      {/* A student review slides up over the card. */}
      <div
        style={{
          position: "absolute",
          left: -70,
          bottom: 4,
          width: 560,
          padding: "22px 26px",
          borderRadius: 24,
          background: C.ink,
          color: C.white,
          opacity: review,
          transform: `translateY(${(1 - review) * 50}px) rotate(${(1 - review) * -3}deg)`,
          boxShadow: "0 30px 60px -30px rgba(11,18,32,0.6)",
        }}
      >
        <div style={{ fontFamily: F.body, fontSize: 16, color: "rgba(255,255,255,0.65)" }}>PhD student, 2nd year</div>
        <div style={{ fontFamily: F.display, fontSize: 30, lineHeight: 1.2, marginTop: 6 }}>
          “Very supportive — weekly meetings and quick feedback on every draft.”
        </div>
      </div>

      <Cursor
        keys={[
          { frame: 70, x: 420, y: 380 },
          { frame: 120, x: 795, y: 650 },
          { frame: 128, x: 795, y: 650, click: true },
          { frame: 170, x: 760, y: 700 },
        ]}
      />
    </FeatureScene>
  );
}
