import { Composition } from "remotion";
import { Reel } from "./Reel";
import { corazon3d } from "./scripts/corazon3d";
import { FPS, totalFrames, type ReelScript } from "./types";

/** Every script here becomes its own composition in the studio and its own render target. */
const SCRIPTS: ReelScript[] = [corazon3d];

export const RemotionRoot: React.FC = () => (
  <>
    {SCRIPTS.map((script) => (
      <Composition
        key={script.id}
        id={script.id}
        component={Reel}
        // 1080x1920 at 30fps: the format Instagram and TikTok both take without re-encoding.
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={totalFrames(script)}
        defaultProps={{ script }}
      />
    ))}
  </>
);
