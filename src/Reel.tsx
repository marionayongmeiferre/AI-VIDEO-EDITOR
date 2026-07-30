import { AbsoluteFill, Sequence } from "remotion";
import { Caption } from "./Caption";
import { Clip } from "./Clip";
import { theme } from "./theme";
import { toFrames, type ReelScript } from "./types";

/** Assembles a reel by laying its sections end to end, in the order she wrote them. */
export const Reel: React.FC<{ script: ReelScript }> = ({ script }) => {
  let cursor = 0;

  const placed = script.sections.map((section) => {
    const frames = toFrames(section.seconds);
    const start = cursor;
    cursor += frames;
    return { section, start, frames };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.ink }}>
      {placed.map(({ section, start, frames }, i) => {
        const isOpening = i === 0;
        return (
          <Sequence key={i} from={start} durationInFrames={frames} name={section.label}>
            <Clip
              src={section.clip}
              shot={section.shot}
              startFrom={toFrames(section.clipStart ?? 0)}
              label={section.label}
              voiceover={section.voiceover}
            />
            {section.text && (
              <>
                {/* Scrim only where text sits, so footage stays as bright as possible. */}
                <AbsoluteFill
                  style={{
                    background: isOpening
                      ? "rgba(0,0,0,0.38)"
                      : "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 34%, rgba(0,0,0,0) 62%)",
                  }}
                />
                <Caption
                  text={section.text}
                  size={isOpening ? 96 : 64}
                  align={isOpening ? "center" : "bottom"}
                />
              </>
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
