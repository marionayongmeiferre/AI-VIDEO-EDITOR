/**
 * A reel is described as data, not hand-assembled on a timeline: the same script that
 * lives in the planner app becomes a video without redoing the work.
 */

export interface Beat {
  /** Text on screen for this beat. Keep it short: it has to be read while it moves. */
  text: string;
  /** Video file in public/, e.g. "clips/proceso.mp4". Omit while the clip isn't filmed yet. */
  clip?: string;
  /** What to film, shown in the placeholder so the reel can be previewed before shooting. */
  shot?: string;
  /** How long this beat lasts, in seconds. */
  seconds: number;
  /** Where the clip should start playing, in seconds. */
  clipStart?: number;
}

export interface ReelScript {
  /** Internal name, used for the composition id and the output file. */
  id: string;
  /** The literal first three seconds. This is the part that decides the reach. */
  hook: string;
  /** How long the hook card stays up before the first beat. */
  hookSeconds: number;
  /** Optional clip playing behind the hook. */
  hookClip?: string;
  hookShot?: string;
  beats: Beat[];
  /** Closing line: what she wants the viewer to do. */
  cta: string;
  ctaSeconds: number;
}

export const FPS = 30;

export function toFrames(seconds: number): number {
  return Math.round(seconds * FPS);
}

export function totalFrames(script: ReelScript): number {
  return (
    toFrames(script.hookSeconds) +
    script.beats.reduce((sum, b) => sum + toFrames(b.seconds), 0) +
    toFrames(script.ctaSeconds)
  );
}
