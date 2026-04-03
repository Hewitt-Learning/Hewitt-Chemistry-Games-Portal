/** @jsxImportSource react */
import { useState } from "react";
import { SUBJECT_LABELS } from "../types";
import type { PortalGame } from "../types";
import { cardTitleStyle } from "./styles";

interface GameCardProps {
	game: PortalGame;
}

// for the age and subject tags
const tagStyle = {
	background: "rgba(245, 250, 255, 0.95)",
	borderRadius: 999,
	color: "#2b4f85",
	fontWeight: 600,
	fontSize: 12,
	padding: "6px 12px",
	lineHeight: 1,
	border: "1px solid rgba(187, 201, 232, 0.7)",
};

export function GameCard({ game }: GameCardProps) {
	// Hover for desktop reveal animation
	const [hovered, setHovered] = useState(false);
	// Manual info toggle for touch devices
	const [showInfo, setShowInfo] = useState(false);
	// Description panel opens if either hover or info-toggle is active
	const revealDescription = hovered || showInfo;

	return (
		<a
			href={game.href}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				// Base card wrapper
				textDecoration: "none",
				display: "block",
				position: "relative",
				minHeight: 360,
				height: "clamp(320px, 32vw, 380px)",
				borderRadius: 16,
				overflow: "hidden",
				background: "linear-gradient(160deg, #eef3fa 0%, #dce5f2 45%, #d6dee9 100%)",
				color: "inherit",
				boxShadow: hovered
					? "0 16px 32px rgba(24, 48, 93, 0.2)"
					: "0 12px 26px rgba(26, 48, 94, 0.14)",
				transition: "transform 180ms ease, box-shadow 220ms ease",
				transform: hovered ? "translateY(-3px)" : "translateY(0)",
			}}
		>
			<button
				type="button"
				aria-label={`Toggle description for ${game.name}`}
				onClick={(event) => {
					// Prevent link navigation when pressing info button
					event.preventDefault();
					event.stopPropagation();
					setShowInfo((previous) => !previous);
				}}
				style={{
					// info 'i' button at top-right of card
					position: "absolute",
					right: 10,
					top: 10,
					zIndex: 4,
					width: 28,
					height: 28,
					borderRadius: 999,
					border: showInfo
						? "1px solid rgba(54, 167, 154, 0.95)"
						: "1px solid rgba(194, 205, 226, 0.9)",
					background: showInfo
						? "linear-gradient(145deg, #37b8aa 0%, #2f998f 100%)"
						: "rgba(255,255,255,0.88)",
					color: showInfo ? "#f2fffd" : "#254584",
					fontWeight: 700,
					fontSize: 16,
					cursor: "pointer",
					lineHeight: 1,
					display: "grid",
					placeItems: "center",
				}}
			>
				i
			</button>

			<div
				style={{
					// Top row (age + subject tags)
					display: "flex",
					justifyContent: "space-between",
					gap: 8,
					padding: "10px 12px 8px",
				}}
			>
				<span style={tagStyle}>{game.age}</span>
				<span style={{ ...tagStyle, marginLeft: "auto", marginRight: 34 }}>
					{SUBJECT_LABELS[game.subject]}
				</span>
			</div>

			<div
				style={{
					// Image zone in upper-middle part of the card.
					minHeight: "clamp(120px, 22vw, 170px)",
					height: "42%",
					backgroundPosition: "center bottom",
					backgroundRepeat: "no-repeat",
					backgroundSize: "clamp(140px, 26vw, 220px)",
					backgroundImage: game.imageUrl ? `url(${game.imageUrl})` : undefined,
				}}
			/>

			<div
				style={{
					// Bottom dark section that holds the game title.
					background: "linear-gradient(175deg, #2a3b52 0%, #243247 100%)",
					minHeight: "clamp(160px, 24vw, 190px)",
					height: "58%",
					padding: "14px 14px 18px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
				}}
			>
				<div
					style={{
						// Dedicated title box, TODO: I also gotta test and make sure that longer names wrap cleanly
						width: "100%",
						minHeight: 118,
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "center",
						padding: "8px 16px 24px",
						boxSizing: "border-box",
					}}
				>
					<h3 style={cardTitleStyle}>{game.name}</h3>
				</div>
				<p
					style={{
						margin: "0",
						textAlign: "center",
						color: "rgba(208, 220, 239, 0.58)",
						fontSize: 14,
						fontWeight: 600,
					}}
				/>
			</div>

			<div
				style={{
					// Slide-up description, where the hover or i button can show the descruption with overlay
					position: "absolute",
					inset: 0,
					background: "rgba(31, 48, 72, 0.97)",
					color: "#dbe9ff",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					padding: "20px 18px",
					transition: "transform 260ms ease, opacity 260ms ease",
					transform: revealDescription ? "translateY(0%)" : "translateY(102%)",
					opacity: revealDescription ? 1 : 0,
					pointerEvents: revealDescription ? "auto" : "none",
					zIndex: 3,
				}}
			>
                
				<h4
					style={{
                        // for game names
						margin: 0,
						fontSize: "clamp(24px, 2.6vw, 34px)",
						color: "#e8f5ff",
						lineHeight: 1.02,
						maxWidth: "100%",
						overflowWrap: "anywhere",
					}}
				>
					{game.name}
				</h4>
				<p
					style={{
                        // for descriptions
						margin: "14px 0 0",
						fontSize: 17,
						lineHeight: 1.42,
						maxWidth: 360,
						color: "#e3ecff",
					}}
				>
					{game.description}
				</p>
			</div>
		</a>
	);
}