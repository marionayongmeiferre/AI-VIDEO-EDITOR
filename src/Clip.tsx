import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { theme } from "./theme";

/**
 * Plays a clip if it exists, and otherwise draws the shot description. That placeholder
 * is the point: the whole reel can be previewed, timed and adjusted before anything is
 * filmed, and each card says exactly what still needs shooting.
 */
export const Clip: React.FC<{ src?: string; shot?: string; startFrom?: number }> = ({
  src,
  shot,
  startFrom,
}) => {
  if (src) {
    return (
      <AbsoluteFill style={{ backgroundColor: theme.ink }}>
        <OffthreadVideo
          src={staticFile(src)}
          startFrom={startFrom}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.ink,
        alignItems: "center",
        justifyContent: "center",
        padding: 120,
      }}
    >
      <div
        style={{
          border: `4px dashed ${theme.accent}`,
          borderRadius: 24,
          padding: "64px 48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: theme.bodyFont,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: theme.accent,
            marginBottom: 24,
          }}
        >
          Falta grabar
        </div>
        <div
          style={{
            fontFamily: theme.bodyFont,
            fontSize: 46,
            lineHeight: 1.35,
            color: theme.paper,
          }}
        >
          {shot ?? "Plano por definir"}
        </div>
      </div>
    </AbsoluteFill>
  );
};
