/** @jsxImportSource react */
import React from "react";

interface PortalHeaderProps {
	isMobile?: boolean; // idk I realized my naming nomenclature isnt standardized across components
	// TODO: standardize naming
}

export function PortalHeader({ isMobile = false }: PortalHeaderProps) {
	// Top branding/header area
	// We intentionally scale this down on mobile so it does not eat the viewport/take up the whole screen
	return (
		<header
			style={{
				borderBottom: "1px solid #d7dfeb",
				padding: isMobile ? "8px 12px 8px" : "14px 22px 12px", // TODO: learn better how to make it mobile friendly WITHOUT hardcoding pixel sizes
				background: "rgba(255,255,255,0.9)",
				backdropFilter: "blur(6px)",
			}}
		>
			<a
				href="#"
				onClick={(event) => event.preventDefault()}
				style={{
					// This is currently a placeholder back link to go back to the hewitt learning website
					color: "#2d4674",
					textDecoration: "none",
					fontWeight: 600,
					display: "inline-flex",
					alignItems: "center",
					gap: 8,
					marginBottom: isMobile ? 4 : 6,
					fontSize: isMobile ? 14 : 16,
				}}
			>
				Back to Main Page
			</a>
			<div
				style={{
					// Centers logo + title and lets them wrap if needed
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: isMobile ? 14 : 44,
					flexWrap: "wrap",
				}}
			>
				<img
					src="/images/Hewitt_Logo.png"
					alt="Hewitt Learning"
					// Smaller logo on mobile to preserve vertical space
					style={{ height: isMobile ? 56 : 120, objectFit: "contain" }}
				/>
				<h1
					style={{
						margin: 0,
						fontSize: isMobile ? "clamp(28px, 10vw, 42px)" : "clamp(44px, 7vw, 82px)",
						color: "#325385",
						letterSpacing: isMobile ? 0.3 : 0.8,
						lineHeight: 1,
						fontWeight: 800,
						textShadow: "0 4px 14px rgba(33, 64, 110, 0.14)",
					}}
				>
					Games
				</h1>
			</div>
		</header>
	);
}