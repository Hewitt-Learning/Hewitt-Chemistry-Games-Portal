/** @jsxImportSource react */
import React from "react";

interface PortalButtonProps {
	compact?: boolean;
	label: string;
	onClick: () => void;
}

export function PortalButton({
	label,
	onClick,
	compact = false,
}: PortalButtonProps) {
	// Button for the filter panel
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				width: "100%",
				border: "1px solid #274c94",
				background: "linear-gradient(135deg, #2b56a6 0%, #1f4386 100%)",
				color: "#f4f7ff",
				padding: compact ? "8px 8px" : "10px 8px",
				marginTop: 10,
				letterSpacing: 0.3,
				fontSize: compact ? 16 : 18,
				fontWeight: 700,
				cursor: "pointer",
				borderRadius: 10,
				boxShadow: "0 6px 14px rgba(28, 54, 106, 0.28)",
			}}
		>
			{label}
		</button>
	);
}