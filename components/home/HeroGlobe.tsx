"use client";

import { useEffect, useRef, useState } from "react";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

type Place = { code: string; city: string; country: string; flag: string; lon: number; lat: number };

const HOME: Place = { code: "DAC", city: "Dhaka", country: "Bangladesh", flag: "🇧🇩", lon: 90.41, lat: 23.81 };

const DESTINATIONS: Place[] = [
  { code: "BOS", city: "Boston", country: "United States", flag: "🇺🇸", lon: -71.06, lat: 42.36 },
  { code: "YYZ", city: "Toronto", country: "Canada", flag: "🇨🇦", lon: -79.38, lat: 43.65 },
  { code: "LHR", city: "London", country: "United Kingdom", flag: "🇬🇧", lon: -0.13, lat: 51.51 },
  { code: "MUC", city: "Munich", country: "Germany", flag: "🇩🇪", lon: 11.58, lat: 48.14 },
  { code: "ARN", city: "Stockholm", country: "Sweden", flag: "🇸🇪", lon: 18.07, lat: 59.33 },
  { code: "HND", city: "Tokyo", country: "Japan", flag: "🇯🇵", lon: 139.69, lat: 35.69 },
  { code: "ICN", city: "Seoul", country: "South Korea", flag: "🇰🇷", lon: 126.98, lat: 37.57 },
  { code: "SIN", city: "Singapore", country: "Singapore", flag: "🇸🇬", lon: 103.82, lat: 1.35 },
  { code: "MEL", city: "Melbourne", country: "Australia", flag: "🇦🇺", lon: 144.96, lat: -37.81 },
  { code: "AKL", city: "Auckland", country: "New Zealand", flag: "🇳🇿", lon: 174.76, lat: -36.85 },
];

const DOTS = 11000;
const SPIN_DEG_PER_SEC = 6;
const TILT_DEG = 16;
/** One flight: draw out, hold, fade. A new one leaves Dhaka every LAUNCH_MS. */
const FLY_MS = 2600;
const FADE_MS = 1400;
const LAUNCH_MS = 1300;

type Vec = [number, number, number];
type Flight = { to: number; start: number };

const RAD = Math.PI / 180;

const toVec = (lon: number, lat: number): Vec => [
  Math.cos(lat * RAD) * Math.sin(lon * RAD),
  Math.sin(lat * RAD),
  Math.cos(lat * RAD) * Math.cos(lon * RAD),
];

// Point on the great circle between two unit vectors.
const slerp = (a: Vec, b: Vec, t: number): Vec => {
  const dot = Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  const w = Math.acos(dot);
  if (w < 1e-6) return a;
  const s = Math.sin(w);
  const ka = Math.sin((1 - t) * w) / s;
  const kb = Math.sin(t * w) / s;
  return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb];
};

/**
 * A light, dotted globe that turns slowly while flights leave Dhaka for study
 * destinations, each landing on its country's flag. Drag to spin it.
 */
export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const homeRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const home = toVec(HOME.lon, HOME.lat);
    const ends = DESTINATIONS.map((d) => toVec(d.lon, d.lat));

    let land: Vec[] = [];
    let size = 0;
    // Start with Dhaka a little right of centre so Europe and Asia both show.
    let spin = -HOME.lon + 35;
    let tilt = TILT_DEG;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let drag: { x: number; y: number; spin: number; tilt: number } | null = null;
    const flights: Flight[] = [];
    let nextLaunch = 0;
    let pick = 0;

    // Rotate a world vector into view space: spin about the pole, then tilt.
    const view = (v: Vec): Vec => {
      const s = Math.sin(spin * RAD);
      const c = Math.cos(spin * RAD);
      const x = v[0] * c + v[2] * s;
      const z0 = -v[0] * s + v[2] * c;
      const ts = Math.sin(tilt * RAD);
      const tc = Math.cos(tilt * RAD);
      return [x, v[1] * tc - z0 * ts, v[1] * ts + z0 * tc];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const place = (el: HTMLElement | null, p: Vec, r: number, c: number) => {
      if (!el) return;
      const front = Math.max(0, Math.min(1, (p[2] - 0.05) * 5));
      el.style.transform = `translate(${c + p[0] * r}px, ${c - p[1] * r}px) translate(-50%, -50%) scale(${0.7 + front * 0.3})`;
      el.style.opacity = String(front);
    };

    const draw = (now: number) => {
      const c = size / 2;
      const r = size / 2 - 34;
      ctx.clearRect(0, 0, size, size);
      if (r <= 0) return;

      // Soft sphere with light from the top left.
      const shade = ctx.createRadialGradient(c - r * 0.35, c - r * 0.4, r * 0.1, c, c, r);
      shade.addColorStop(0, "#FFFFFF");
      shade.addColorStop(0.7, "#F7F3EE");
      shade.addColorStop(1, "#ECE5DA");
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.fillStyle = shade;
      ctx.fill();
      ctx.strokeStyle = "rgba(27,37,89,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Land dots, shaded by how directly they face us.
      const dot = Math.max(0.9, size / 360);
      const buckets: number[][] = [[], [], [], []];
      for (const v of land) {
        const p = view(v);
        if (p[2] <= 0) continue;
        const b = Math.min(3, Math.floor(p[2] * 4));
        buckets[b].push(c + p[0] * r, c - p[1] * r);
      }
      buckets.forEach((pts, b) => {
        ctx.fillStyle = `rgba(27,37,89,${0.16 + b * 0.13})`;
        ctx.beginPath();
        for (let i = 0; i < pts.length; i += 2) {
          ctx.moveTo(pts[i] + dot, pts[i + 1]);
          ctx.arc(pts[i], pts[i + 1], dot, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      // Flights: arcs that lift off the surface, then fade out.
      const homeFront = view(home)[2] > 0.15;
      if (!still && now >= nextLaunch) {
        // Pick a flight you can see: one end, ideally both, on our side.
        let to = -1;
        for (let k = 0; k < DESTINATIONS.length; k++) {
          const cand = (pick + k) % DESTINATIONS.length;
          const seen = view(ends[cand])[2] > 0.1;
          if ((homeFront || seen) && (seen || k === DESTINATIONS.length - 1) && !flights.some((f) => f.to === cand)) {
            to = cand;
            break;
          }
        }
        if (to >= 0) {
          flights.push({ to, start: now });
          pick = to + 1;
          setCurrent(to);
        }
        nextLaunch = now + LAUNCH_MS;
      }
      for (let i = flights.length - 1; i >= 0; i--) {
        if (now - flights[i].start > FLY_MS + FADE_MS) flights.splice(i, 1);
      }

      const drawArc = (to: number, head: number, alpha: number) => {
        const a = home;
        const b = ends[to];
        const span = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
        const lift = 0.06 + span * 0.12;
        const steps = 64;
        const pts: [number, number, boolean][] = [];
        for (let k = 0; k <= steps * head; k++) {
          const t = Math.min(head, k / steps);
          const s = slerp(a, b, t);
          const h = 1 + lift * Math.sin(Math.PI * t);
          const p = view(s);
          const x = p[0] * h;
          const y = p[1] * h;
          // Hidden only when behind the globe and inside its outline.
          const shown = p[2] > 0 || x * x + y * y > 1;
          pts.push([c + x * r, c - y * r, shown]);
        }
        const grad = ctx.createLinearGradient(pts[0][0], pts[0][1], pts[pts.length - 1][0], pts[pts.length - 1][1]);
        grad.addColorStop(0, `rgba(255,59,71,${0.25 * alpha})`);
        grad.addColorStop(1, `rgba(255,59,71,${0.95 * alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1.4, size / 300);
        ctx.lineCap = "round";
        ctx.beginPath();
        let pen = false;
        for (const [x, y, shown] of pts) {
          if (!shown) {
            pen = false;
            continue;
          }
          if (pen) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          pen = true;
        }
        ctx.stroke();

        const tip = pts[pts.length - 1];
        if (head < 1 && tip[2]) {
          ctx.beginPath();
          ctx.arc(tip[0], tip[1], Math.max(3, size / 150), 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#FF3B47";
          ctx.stroke();
        }
      };

      if (still) {
        DESTINATIONS.forEach((_, i) => drawArc(i, 1, 0.7));
      } else {
        for (const f of flights) {
          const age = now - f.start;
          const ease = (x: number) => 1 - Math.pow(1 - x, 3);
          const head = ease(Math.min(1, age / FLY_MS));
          const alpha = age > FLY_MS ? 1 - (age - FLY_MS) / FADE_MS : 1;
          drawArc(f.to, head, alpha);
        }
      }

      // Dhaka pulse.
      const hp = view(home);
      if (hp[2] > 0) {
        const x = c + hp[0] * r;
        const y = c - hp[1] * r;
        const pulse = still ? 0.4 : (now % 1800) / 1800;
        ctx.beginPath();
        ctx.arc(x, y, 5 + pulse * 16, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,59,71,${0.3 * (1 - pulse)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FF3B47";
        ctx.fill();
      }

      place(homeRef.current, hp, r, c);
      ends.forEach((v, i) => place(pinRefs.current[i], view(v), r, c));
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!drag) spin += (SPIN_DEG_PER_SEC * dt) / 1000;
      draw(now);
      if (visible) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (still) draw(0);
      else raf = requestAnimationFrame(tick);
    };

    // Turn the land outline into evenly spaced dots: paint it onto a small
    // flat map, then keep the points of a Fibonacci sphere that land on ink.
    const buildDots = (shape: Feature) => {
      const w = 720;
      const h = 360;
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];
      const flat = geoEquirectangular().scale(w / (2 * Math.PI)).translate([w / 2, h / 2]);
      octx.beginPath();
      geoPath(flat, octx)(shape);
      octx.fill();
      const ink = octx.getImageData(0, 0, w, h).data;
      const out: Vec[] = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < DOTS; i++) {
        const y = 1 - (i / (DOTS - 1)) * 2;
        const lat = Math.asin(y) / RAD;
        const lon = ((((i * golden) / RAD) % 360) + 360) % 360 - 180;
        const px = Math.min(w - 1, Math.floor(((lon + 180) / 360) * w));
        const py = Math.min(h - 1, Math.floor(((90 - lat) / 180) * h));
        if (ink[(py * w + px) * 4 + 3] > 128) out.push(toVec(lon, lat));
      }
      return out;
    };

    resize();
    draw(0);
    import("world-atlas/land-110m.json").then((mod) => {
      const topo = (mod.default ?? mod) as unknown as Topology<{ land: GeometryCollection }>;
      land = buildDots(feature(topo, topo.objects.land) as unknown as Feature);
      start();
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, spin, tilt };
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      spin = drag.spin + (e.clientX - drag.x) * 0.35;
      tilt = Math.max(-50, Math.min(60, drag.tilt + (e.clientY - drag.y) * 0.35));
      if (still) draw(0);
    };
    const up = () => {
      drag = null;
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  const to = DESTINATIONS[current] ?? DESTINATIONS[0];

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Soft glow behind the globe. */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(31,79,216,0.16),transparent_68%)] blur-2xl"
      />

      <div className="relative aspect-square w-full">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="A turning globe with flights from Dhaka to study destinations around the world"
          className="absolute inset-0 h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
        />

        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div ref={homeRef} className="absolute left-0 top-0 opacity-0 will-change-transform">
            <span className="mt-9 flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-ink py-1 pl-1.5 pr-2.5 font-body text-[12px] font-medium text-white shadow-[0_8px_20px_-10px_rgba(11,18,32,0.6)]">
              <span className="text-[14px] leading-none">{HOME.flag}</span>
              Dhaka
            </span>
          </div>
          {DESTINATIONS.map((d, i) => (
            <div
              key={d.code}
              ref={(el) => {
                pinRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 opacity-0 will-change-transform"
            >
              <span
                className={`grid h-6.5 w-6.5 place-items-center overflow-hidden rounded-full bg-white text-[15px] leading-none shadow-[0_4px_12px_-4px_rgba(11,18,32,0.35)] ring-2 transition-[box-shadow] duration-300 ${
                  i === current ? "ring-red" : "ring-white"
                }`}
              >
                {d.flag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Departure strip: the flight that just left. */}
      <div className="relative -mt-4 flex justify-center">
        <div
          aria-live="polite"
          className="flex items-center gap-4 rounded-[16px] border border-line bg-white/90 px-5 py-3 shadow-[0_18px_40px_-24px_rgba(11,18,32,0.45)] backdrop-blur"
        >
          <div className="text-center">
            <div className="font-label text-[10px] uppercase tracking-[0.14em] text-sub">From</div>
            <div className="font-display text-[22px] leading-none text-ink">{HOME.code}</div>
          </div>
          <svg width="64" height="14" viewBox="0 0 64 14" aria-hidden className="text-red">
            <path d="M2 7h52" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
            <path d="M54 2l7 5-7 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-center">
            <div className="font-label text-[10px] uppercase tracking-[0.14em] text-sub">To</div>
            <div className="font-display text-[22px] leading-none text-ink">{to.code}</div>
          </div>
          <div className="ml-1 hidden border-l border-line pl-4 sm:block">
            <div className="flex items-center gap-1.5 font-body text-[14px] font-medium text-ink">
              <span className="text-[16px] leading-none">{to.flag}</span>
              {to.city}
            </div>
            <div className="font-body text-[12px] text-sub">{to.country}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
