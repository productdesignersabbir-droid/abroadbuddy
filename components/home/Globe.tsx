"use client";

import { useEffect, useRef } from "react";
import { geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

type City = { name: string; lon: number; lat: number };

const DHAKA: City = { name: "Dhaka", lon: 90.41, lat: 23.81 };

const DESTINATIONS: City[] = [
  { name: "London", lon: -0.13, lat: 51.51 },
  { name: "Munich", lon: 11.58, lat: 48.14 },
  { name: "Toronto", lon: -79.38, lat: 43.65 },
  { name: "Boston", lon: -71.06, lat: 42.36 },
  { name: "Tokyo", lon: 139.69, lat: 35.69 },
  { name: "Melbourne", lon: 144.96, lat: -37.81 },
  { name: "Stockholm", lon: 18.07, lat: 59.33 },
  { name: "Kuala Lumpur", lon: 101.69, lat: 3.14 },
];

const SPIN_DEG_PER_SEC = 7;
const TILT = -18;
/** How long one route takes to draw, and how they overlap. */
const ARC_MS = 2200;
const ARC_GAP_MS = 700;

/** A slowly turning dark globe with routes flying out of Dhaka. Drag to spin it. */
export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const projection = geoOrthographic().clipAngle(90).precision(0.6);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();
    const routes = DESTINATIONS.map((d) => ({
      city: d,
      at: geoInterpolate([DHAKA.lon, DHAKA.lat], [d.lon, d.lat]),
    }));

    let land: FeatureCollection | null = null;
    let size = 0;
    let lon = -DHAKA.lon + 40;
    let lat = TILT;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let drag: { x: number; y: number; lon: number; lat: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection.translate([size / 2, size / 2]).scale(size / 2 - 6);
    };

    // Is a point on the side of the globe facing us?
    const facing = (c: City) => {
      const [rl, rp] = projection.rotate();
      const toRad = Math.PI / 180;
      const l = (c.lon + rl) * toRad;
      const p = c.lat * toRad;
      const p0 = -rp * toRad;
      return Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l) > 0.05;
    };

    const draw = (now: number) => {
      const r = size / 2 - 6;
      projection.rotate([lon, lat]);
      ctx.clearRect(0, 0, size, size);

      // Sphere with soft light from the top left.
      const shade = ctx.createRadialGradient(size * 0.36, size * 0.32, r * 0.1, size / 2, size / 2, r);
      shade.addColorStop(0, "#3A3D44");
      shade.addColorStop(0.6, "#22242A");
      shade.addColorStop(1, "#141519");
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = shade;
      ctx.fill();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      if (land) {
        ctx.beginPath();
        path(land);
        ctx.fillStyle = "#4A4E57";
        ctx.fill();
        ctx.strokeStyle = "rgba(20,21,25,0.9)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Rim light.
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Routes draw one after another, then fade.
      const cycle = routes.length * ARC_GAP_MS + ARC_MS;
      routes.forEach((route, i) => {
        const t = still ? 1 : ((now - i * ARC_GAP_MS) % cycle) / ARC_MS;
        if (t < 0 || t > 1.6) return;
        const head = Math.min(1, t);
        const fade = t > 1 ? 1 - (t - 1) / 0.6 : 1;
        const steps = 48;
        const coords = Array.from({ length: Math.ceil(steps * head) + 1 }, (_, k) =>
          route.at(Math.min(head, k / steps))
        );
        ctx.beginPath();
        path({ type: "LineString", coordinates: coords });
        ctx.strokeStyle = `rgba(255,107,90,${0.85 * fade})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        if (head < 1 && fade === 1) {
          const tip = projection(route.at(head));
          if (tip && facing({ name: "", lon: route.at(head)[0], lat: route.at(head)[1] })) {
            ctx.beginPath();
            ctx.arc(tip[0], tip[1], 2.6, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
          }
        }
      });

      // City markers and labels on the visible side.
      const pulse = still ? 0 : (now % 2000) / 2000;
      ctx.font = `500 ${Math.max(10, size / 42)}px system-ui, sans-serif`;
      for (const c of [DHAKA, ...DESTINATIONS]) {
        if (!facing(c)) continue;
        const pt = projection([c.lon, c.lat]);
        if (!pt) continue;
        const home = c === DHAKA;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], (home ? 6 : 4) + pulse * 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,59,71,${0.35 * (1 - pulse)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], home ? 4.2 : 3, 0, Math.PI * 2);
        ctx.fillStyle = home ? "#FF3B47" : "#FF7A6B";
        ctx.fill();
        ctx.fillStyle = home ? "#fff" : "rgba(255,255,255,0.78)";
        // Labels on the right edge flip left so they never get cut off.
        const flip = pt[0] > size * 0.72;
        ctx.textAlign = flip ? "right" : "left";
        ctx.fillText(c.name, pt[0] + (flip ? -8 : 8), pt[1] + 3.5);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!drag) lon += (SPIN_DEG_PER_SEC * dt) / 1000;
      draw(now);
      if (visible) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (still) draw(0);
      else raf = requestAnimationFrame(tick);
    };

    resize();
    draw(0);
    import("world-atlas/countries-110m.json").then((mod) => {
      const topo = (mod.default ?? mod) as unknown as Topology<{ countries: GeometryCollection }>;
      land = feature(topo, topo.objects.countries) as FeatureCollection;
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
      drag = { x: e.clientX, y: e.clientY, lon, lat };
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      lon = drag.lon + (e.clientX - drag.x) * 0.35;
      lat = Math.max(-60, Math.min(60, drag.lat - (e.clientY - drag.y) * 0.35));
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

  return (
    <canvas
      ref={canvasRef}
      aria-label="Globe showing routes from Dhaka to study destinations"
      role="img"
      className={`aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing ${className}`}
    />
  );
}
