import { AbsoluteFill, Sequence } from "remotion";
import { Caption } from "./Caption";
import { Clip } from "./Clip";
import { theme } from "./theme";
import { toFrames, type ReelScript } from "./types";

/**
 * Assembles a reel from its script: hook, beats, closing call to action.
 *
 * The hook gets its own section on purpose. Her own numbers say the opening is what
 * decides the reach, so it is the one part that is always deliberate and always first.
 */
export const Reel: React.FC<{ script: ReelScript }> = ({ script }) => {
  let cursor = 0;

  const hookFrames = toFrames(script.hookSeconds);
  const hookStart = cursor;
  cursor += hookFrames;

  const beats = script.beats.map((beat) => {
    const frames = toFrames(beat.seconds);
    const start = cursor;
    cursor += frames;
    return { beat, start, frames };
  });

  const ctaStart = cursor;
  const ctaFrames = toFrames(script.ctaSeconds);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      <Sequence from={hookStart} durationInFrames={hookFrames}>
        <Clip src={script.hookClip} shot={script.hookShot} />
        {/* Scrim: keeps the hook readable over any footage. */}
        <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
        <Caption text={script.hook} size={96} align="center" />
      </Sequence>

      {beats.map(({ beat, start, frames }, i) => (
        <Sequence key={i} from={start} durationInFrames={frames}>
          <Clip src={beat.clip} shot={beat.shot} startFrom={toFrames(beat.clipStart ?? 0)} />
          {beat.text && <Caption text={beat.text} size={64} />}
        </Sequence>
      ))}

      <Sequence from={ctaStart} durationInFrames={ctaFrames}>
        <AbsoluteFill style={{ backgroundColor: theme.ink }} />
        <Caption text={script.cta} size={80} align="center" emphasis />
      </Sequence>
    </AbsoluteFill>
  );
};
