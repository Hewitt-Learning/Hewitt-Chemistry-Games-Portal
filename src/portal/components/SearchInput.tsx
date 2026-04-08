/** @jsxImportSource react */

interface SearchInputProps {
	compact?: boolean; // For mobile screens there's a different styling
	value: string;
	onChange: (next: string) => void;
}

export function SearchInput({
	value,
	onChange,
	compact = false, // by default
}: SearchInputProps) {
	// Shared search input used by the filter panel
	return (
		<label
			// maybe add display style flex?
			style={{
				display: "flex",
				alignItems: "center",
				gap: 8,
				background: "#fff",
				border: "1px solid #cfe0e0",
				borderRadius: 999,
				padding: compact ? "7px 10px" : "10px 14px",
				marginBottom: compact ? 10 : 14,
				boxShadow: "inset 0 1px 1px rgba(20,30,60,0.06)",
			}}
		>
			<span style={{ fontSize: compact ? 15 : 18, color: "#4b5c87", lineHeight: 1 }}>
				🔎{/* I wanna find a better icon for this because I'm worried about this not displaying for some users */}
			</span>
			<input
				type="search"
				value={value}
				placeholder="Search games"
				// Keep this controlled so query state always matches UI
				onChange={(event) =>
					onChange(event.currentTarget.value)
				}
				style={{
					width: "100%",
					border: 0,
					outline: "none",
					fontSize: compact ? 15 : 20,
					fontFamily: "'Manrope', 'Segoe UI', sans-serif",
					fontWeight: 500,
					color: "#065759",
					textTransform: "none",
					letterSpacing: 0,
					background: "transparent",
				}}
			/>
		</label>
	);
}