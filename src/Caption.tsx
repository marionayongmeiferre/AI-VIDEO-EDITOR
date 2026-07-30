import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme, SAFE } from "./theme";

/**
 * On-screen text. It rises and fades in over ~8 frames with an ease-out curve: enough
 * to feel deliberate, short enough that it is fully readable almost immediately, which
 * matters when the first seconds decide whether anyone stays.
 */
export const Caption: React.FC<{
  text: string;
  size?: number;
  align?: "center" | "bottom";
  emphasis?: boolean;
}> = ({ text, size = 72, align = "bottom", emphasis = false }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lift = interpolate(frame, [0, 12], [28, 0], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: align === "center" ? "center" : "flex-end",
        alignItems: "center",
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side,
        paddingBottom: align === "center" ? 0 : SAFE.bottom,
        paddingTop: align === "center" ? 0 : SAFE.top,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${lift}px)`,
          fontFamily: theme.font,
          fontSize: size,
          lineHeight: 1.15,
          textAlign: "center",
          color: emphasis ? theme.accent : theme.paper,
          textShadow: "0 4px 24px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.9)",
          textWrap: "balance",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
