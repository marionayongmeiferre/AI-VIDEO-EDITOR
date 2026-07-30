/**
 * A reel is described as data, not hand-assembled on a timeline: the same script that
 * lives in the planner app becomes a video without redoing the work.
 *
 * The structure is a flat list of sections rather than a fixed hook/beats/CTA shape,
 * because the order is hers to decide. In the 3D heart script, for instance, the call
 * to action sits in the middle and the reveal closes the reel.
 */

export interface Section {
  /** Name of the section in her script, e.g. "HOOK" or "REVEAL FINAL". */
  label: string;
  /** What she says out loud here, word for word. Omit for silent sections. */
  voiceover?: string;
  /** Text burnt into the picture. Reels are watched muted, so it usually mirrors the voiceover, shortened. */
  text?: string;
  /** Video file in public/, e.g. "clips/render.mp4". Omit while the clip isn't filmed yet. */
  clip?: string;
  /** What to film, drawn in the placeholder so the reel can be previewed before shooting. */
  shot?: string;
  /** Where the clip should start playing, in seconds. */
  clipStart?: number;
  seconds: number;
}

export interface ReelScript {
  /** Internal name, used for the composition id and the output file. */
  id: string;
  sections: Section[];
}

export const FPS = 30;

export function toFrames(seconds: number): number {
  return Math.round(seconds * FPS);
}

export function totalFrames(script: ReelScript): number {
  return script.sections.reduce((sum, s) => sum + toFrames(s.seconds), 0);
}

/**
 * Rough check that a line can actually be said in the time it is given. Spanish
 * narration runs at roughly 2.8 words per second when read at a natural pace.
 */
export const WORDS_PER_SECOND = 2.8;

export function speechSeconds(voiceover: string): number {
  const words = voiceover.trim().split(/\s+/).filter(Boolean).length;
  return words / WORDS_PER_SECOND;
}
