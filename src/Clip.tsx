import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { theme } from "./theme";

/**
 * Plays a clip if it exists, and otherwise draws the shot description plus the line to
 * say. That placeholder is the point: the whole reel can be previewed, timed and
 * adjusted before anything is filmed, and each card doubles as the shooting brief.
 */
export const Clip: React.FC<{
  src?: string;
  shot?: string;
  startFrom?: number;
  label?: string;
  voiceover?: string;
}> = ({ src, shot, startFrom, label, voiceover }) => {
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
        padding: 90,
      }}
    >
      <div
        style={{
          border: `4px dashed ${theme.accent}`,
          borderRadius: 24,
          padding: "56px 44px",
          width: "100%",
        }}
      >
        {label && (
          <div
            style={{
              fontFamily: theme.bodyFont,
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: theme.accent,
              marginBottom: 28,
              textAlign: "center",
            }}
          >
            {label}
          </div>
        )}

        <div
          style={{
            fontFamily: theme.bodyFont,
            fontSize: 44,
            lineHeight: 1.35,
            color: theme.paper,
            textAlign: "center",
          }}
        >
          {shot ?? "Plano por definir"}
        </div>

        {voiceover && (
          <div
            style={{
              marginTop: 40,
              paddingTop: 32,
              borderTop: `2px solid rgba(246,241,233,0.25)`,
            }}
          >
            <div
              style={{
                fontFamily: theme.bodyFont,
                fontSize: 24,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(246,241,233,0.5)",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Dices
            </div>
            <div
              style={{
                fontFamily: theme.bodyFont,
                fontSize: 34,
                lineHeight: 1.4,
                color: theme.paper,
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              &ldquo;{voiceover}&rdquo;
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
