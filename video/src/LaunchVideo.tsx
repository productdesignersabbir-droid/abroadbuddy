import type { ComponentType } from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { FEATURE_ICONS } from "./icons";
import { C, F } from "./theme";
import { FPS, SCENE_ORDER, SCENE_STARTS, TRANSITION, VOICE, sceneEnd, sceneFrames, type SceneKey } from "./timeline";
import { Close } from "./scenes/Close";
import { Conferences } from "./scenes/Conferences";
import { Hook } from "./scenes/Hook";
import { Pain } from "./scenes/Pain";
import { Professor } from "./scenes/Professor";
import { Readiness } from "./scenes/Readiness";
import { Reveal } from "./scenes/Reveal";
import { Scholarships } from "./scenes/Scholarships";
import { Universities } from "./scenes/Universities";

const SCENES: Record<SceneKey, ComponentType> = {
  hook: Hook,
  pain: Pain,
  reveal: Reveal,
  readiness: Readiness,
  universities: Universities,
  professor: Professor,
  scholarships: Scholarships,
  conferences: Conferences,
  close: Close,
};

const FEATURES: { key: keyof typeof FEATURE_ICONS; label: string }[] = [
  { key: "readiness", label: "Readiness" },
  { key: "universities", label: "Universities" },
  { key: "professor", label: "Professors" },
  { key: "scholarships", label: "Scholarships" },
  { key: "conferences", label: "Conferences" },
];

const timing = linearTiming({ durationInFrames: TRANSITION, easing: Easing.bezier(0.65, 0, 0.35, 1) });

/** Feature scenes slide in from the right; everything else crossfades. */
function transitionInto(next: SceneKey) {
  const isFeature = FEATURES.some((f) => f.key === next) && next !== "readiness";
  return isFeature ? slide({ direction: "from-right" }) : fade();
}

/** A quiet progress rail that tracks which feature is on screen. */
function FeatureRail() {
  const frame = useCurrentFrame();
  const start = SCENE_STARTS.readiness;
  const end = SCENE_STARTS.close;
  const show = interpolate(frame, [start, start + 18, end - 6, end + 10], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (show === 0) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 46, pointerEvents: "none" }}>
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: 6,
          borderRadius: 99,
          background: "rgba(255,255,255,0.82)",
          boxShadow: "0 18px 40px -24px rgba(11,18,32,0.35)",
          opacity: show,
          transform: `translateY(${(1 - show) * 30}px)`,
        }}
      >
        {FEATURES.map((f, i) => {
          const from = SCENE_STARTS[f.key];
          const next = sceneEnd(f.key);
          const active = frame >= from && frame < next;
          const fill = interpolate(frame, [from, next], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const Icon = FEATURE_ICONS[f.key];
          return (
            <div
              key={f.key}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 99,
                background: active ? C.ink : "transparent",
                color: active ? C.white : C.sub,
                fontFamily: F.body,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              <Icon size={20} color={active ? C.white : C.sub} />
              <span>
                0{i + 1} {f.label}
              </span>
              {active && <span style={{ position: "absolute", left: 0, bottom: 0, height: 3, width: `${fill * 100}%`, background: C.blue }} />}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/** Each scene's line of the voiceover, cut from the one audio file. */
function Voiceover() {
  return (
    <>
      {SCENE_ORDER.map((key) => {
        const v = VOICE[key];
        return (
          <Sequence key={key} from={SCENE_STARTS[key] + Math.round(v.lead * FPS)} durationInFrames={Math.round((v.to - v.from) * FPS)}>
            <Audio src={staticFile("voiceover.mp3")} startFrom={Math.round(v.from * FPS)} />
          </Sequence>
        );
      })}
    </>
  );
}

export function LaunchVideo() {
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <TransitionSeries>
        {SCENE_ORDER.flatMap((key, i) => {
          const Scene = SCENES[key];
          const seq = (
            <TransitionSeries.Sequence key={key} durationInFrames={sceneFrames(key)}>
              <Scene />
            </TransitionSeries.Sequence>
          );
          const next = SCENE_ORDER[i + 1];
          if (!next) return [seq];
          return [seq, <TransitionSeries.Transition key={`${key}-t`} presentation={transitionInto(next)} timing={timing} />];
        })}
      </TransitionSeries>
      <FeatureRail />
      <Voiceover />
    </AbsoluteFill>
  );
}
