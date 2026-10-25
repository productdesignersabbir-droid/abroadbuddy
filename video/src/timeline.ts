export const FPS = 30;

/** Length of every crossfade/slide between scenes, in frames. */
export const TRANSITION = 16;

/**
 * Each scene plays one cut of public/voiceover.mp3. `from`/`to` are the cut's
 * seconds in the audio file (split at the pauses between lines); `lead` is the
 * silence before the voice starts in the scene and `tail` the hold after it.
 */
export const VOICE = {
  hook: { from: 0, to: 3.6, lead: 0.5, tail: 0.4 },
  pain: { from: 3.6, to: 13.5, lead: 0.2, tail: 0.8 },
  reveal: { from: 13.5, to: 18.0, lead: 0.1, tail: 0.3 },
  readiness: { from: 18.0, to: 22.65, lead: 0.3, tail: 0.6 },
  universities: { from: 22.65, to: 28.1, lead: 0.3, tail: 0.5 },
  professor: { from: 28.1, to: 32.4, lead: 0.3, tail: 0.6 },
  scholarships: { from: 32.4, to: 36.0, lead: 0.3, tail: 0.6 },
  conferences: { from: 36.0, to: 39.2, lead: 0.3, tail: 0.5 },
  close: { from: 39.2, to: 44.67, lead: 0.3, tail: 2.0 },
} as const;

export type SceneKey = keyof typeof VOICE;

export const SCENE_ORDER: SceneKey[] = [
  "hook",
  "pain",
  "reveal",
  "readiness",
  "universities",
  "professor",
  "scholarships",
  "conferences",
  "close",
];

function sceneLength(key: SceneKey) {
  const v = VOICE[key];
  return Math.round((v.lead + v.to - v.from + v.tail) * FPS);
}

/** Frame where each scene starts. */
export const SCENE_STARTS = SCENE_ORDER.reduce(
  (acc, key, i) => {
    const prev = SCENE_ORDER[i - 1];
    acc[key] = prev ? acc[prev] + sceneLength(prev) : 0;
    return acc;
  },
  {} as Record<SceneKey, number>
);

/** Frame where a scene ends (the next scene's start). */
export function sceneEnd(key: SceneKey) {
  return SCENE_STARTS[key] + sceneLength(key);
}

export const TOTAL_FRAMES = sceneEnd("close");

/** Sequence length so each scene starts on its frame even with overlapping transitions. */
export function sceneFrames(key: SceneKey) {
  const last = key === SCENE_ORDER[SCENE_ORDER.length - 1];
  return last ? sceneLength(key) : sceneLength(key) + TRANSITION;
}
