import type { CSSProperties } from "react";

// Shared title style for card names
// Centralizing this makes future typography tweaks super easy
export const cardTitleStyle: CSSProperties = {
  margin: 0,
  textAlign: "center",
	fontFamily: "'Mozaic GEO Variable', 'Manrope', sans-serif",
	fontSize: "clamp(18px, 5vw, 30px)",
	letterSpacing: "0.03em",
	color: "#ecfdfd",
	lineHeight: 1.08,
	fontWeight: 700,
	textTransform: "uppercase",
  maxWidth: "100%",
  overflowWrap: "anywhere",
};
