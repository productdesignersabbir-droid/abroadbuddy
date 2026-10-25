import { Img, useCurrentFrame, interpolate } from "remotion";
import { C, F } from "../theme";
import { Accent, Card, Cursor, FeatureScene, Pill, useEnter, useProgress } from "../ui";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=400&q=75&auto=format&fit=crop`;

const FILTERS = [
  { label: "CGPA", value: "3.62" },
  { label: "Destination", value: "🇨🇦 Canada" },
  { label: "Major", value: "Computer Science" },
  { label: "Budget", value: "≤ $45k / yr" },
];

const RESULTS = [
  { name: "University of Toronto", city: "Toronto · Canada", fit: 92, label: "Strong fit", img: "1541339907198-e08756dedf3f", tuition: "$45k – $60k", ielts: "7.0+" },
  { name: "University of Waterloo", city: "Waterloo · Canada", fit: 89, label: "Strong fit", img: "1574958269340-fa927503f3dd", tuition: "$38k – $48k", ielts: "7.0+" },
  { name: "University of British Columbia", city: "Vancouver · Canada", fit: 84, label: "Good fit", img: "1562774053-701939374585", tuition: "$32k – $50k", ielts: "6.5+" },
];

function FilterChip({ label, value, i }: { label: string; value: string; i: number }) {
  const p = useEnter(10 + i * 7, 20);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 16}px)`, flex: 1 }}>
      <div style={{ fontFamily: F.body, fontSize: 15, color: C.sub, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ marginTop: 8, padding: "12px 16px", borderRadius: 14, border: `2px solid ${C.line}`, fontFamily: F.body, fontSize: 20, fontWeight: 500, color: C.ink, whiteSpace: "nowrap" }}>
        {value}
      </div>
    </div>
  );
}

function FitRing({ fit, start }: { fit: number; start: number }) {
  const p = useProgress(start, start + 30);
  const r = 34;
  const c = 2 * Math.PI * r;
  const v = Math.round(fit * p);
  return (
    <div style={{ position: "relative", width: 92, height: 92, flexShrink: 0 }}>
      <svg viewBox="0 0 92 92" width={92} height={92} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={46} cy={46} r={r} fill="none" stroke={C.softer} strokeWidth={8} />
        <circle cx={46} cy={46} r={r} fill="none" stroke={C.blue} strokeWidth={8} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: F.display, fontSize: 30, color: C.ink }}>
        {v}
        <span style={{ fontFamily: F.body, fontSize: 13, color: C.sub, position: "absolute", marginLeft: 46, marginTop: 6 }}>%</span>
      </div>
    </div>
  );
}

function ResultRow({ r, i }: { r: (typeof RESULTS)[number]; i: number }) {
  const start = 66 + i * 12;
  const p = useEnter(start, 26);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: 12,
        paddingRight: 26,
        borderRadius: 24,
        background: C.white,
        boxShadow: "0 22px 44px -30px rgba(11,18,32,0.35)",
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px)`,
      }}
    >
      <Img src={photo(r.img)} style={{ width: 150, height: 110, objectFit: "cover", borderRadius: 16 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: F.body, fontSize: 17, color: C.sub }}>{r.city}</div>
        <div style={{ fontFamily: F.display, fontSize: 34, color: C.ink, lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
        <div style={{ display: "flex", gap: 22, marginTop: 6, fontFamily: F.body, fontSize: 17, color: C.sub }}>
          <span>Tuition <b style={{ color: C.ink, fontWeight: 600 }}>{r.tuition}</b></span>
          <span>IELTS <b style={{ color: C.ink, fontWeight: 600 }}>{r.ielts}</b></span>
        </div>
      </div>
      <div style={{ textAlign: "right", fontFamily: F.body, fontSize: 16, color: C.sub, marginRight: 4 }}>
        Profile fit
        <div style={{ fontFamily: F.display, fontSize: 26, color: C.ink }}>{r.label}</div>
      </div>
      <FitRing fit={r.fit} start={start + 6} />
    </div>
  );
}

export function Universities() {
  const frame = useCurrentFrame();
  const btn = useEnter(36, 20);
  const pressed = frame >= 54 && frame < 62;
  const count = Math.round(interpolate(frame, [70, 110], [0, 84], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const countIn = useEnter(100, 22);
  return (
    <FeatureScene
      index={2}
      label="University Finder"
      title={
        <>
          Find universities that <Accent>fit you.</Accent>
        </>
      }
      sub="Match by CGPA, major and budget — 84 universities across 30 countries."
    >
      <Card style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "28px 30px" }}>
        <div style={{ display: "flex", gap: 14 }}>
          {FILTERS.map((f, i) => (
            <FilterChip key={f.label} {...f} i={i} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
          <span style={{ fontFamily: F.body, fontSize: 19, color: C.sub, opacity: countIn }}>
            <b style={{ color: C.ink }}>{count}</b> universities · 30 countries
          </span>
          <span
            style={{
              opacity: btn,
              transform: `scale(${pressed ? 0.95 : 1})`,
              padding: "14px 28px",
              borderRadius: 99,
              background: C.ink,
              color: C.white,
              fontFamily: F.body,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Find my matches
          </span>
        </div>
      </Card>
      <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "grid", gap: 16 }}>
        {RESULTS.map((r, i) => (
          <ResultRow key={r.name} r={r} i={i} />
        ))}
      </div>
      <div style={{ position: "absolute", right: 24, bottom: -6, opacity: useEnter(120, 20) }}>
        <Pill bg={C.ink} color={C.white} style={{ fontSize: 18 }}>
          + 81 more matches
        </Pill>
      </div>
      <Cursor
        keys={[
          { frame: 26, x: 560, y: 330 },
          { frame: 52, x: 830, y: 205 },
          { frame: 54, x: 830, y: 205, click: true },
          { frame: 90, x: 760, y: 470 },
          { frame: 140, x: 700, y: 520 },
        ]}
      />
    </FeatureScene>
  );
}
