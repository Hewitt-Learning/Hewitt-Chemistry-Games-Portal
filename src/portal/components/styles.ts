import type { CSSProperties } from "react";

// Shared title style for card names
// Centralizing this makes future typography tweaks super easy
export const cardTitleStyle: CSSProperties = {
  margin: 0,
  textAlign: "center",
  fontSize: "clamp(16px, 6vw, 28px)",
  letterSpacing: 0,
  color: "#ecf3ff",
  lineHeight: 1.12,
  fontWeight: 700,
  maxWidth: "100%",
  overflowWrap: "anywhere",
};
