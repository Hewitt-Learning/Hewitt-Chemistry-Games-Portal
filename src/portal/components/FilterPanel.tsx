/** @jsxImportSource react */
import { AGE_LABELS, AGE_OPTIONS, SUBJECT_LABELS, SUBJECT_OPTIONS } from "../types";
import type { AgeTag, SubjectTag } from "../types";
import { PortalButton } from "./PortalButton";
import { SearchInput } from "./SearchInput";

interface FilterPanelProps {
	isMobile: boolean;
	query: string;
	subjects: Set<SubjectTag>;
	ages: Set<AgeTag>;
	onQueryChange: (next: string) => void;
	onToggleSubject: (value: SubjectTag) => void;
	onToggleAge: (value: AgeTag) => void;
	onReset: () => void;
}

export function FilterPanel({
	isMobile,
	query,
	subjects,
	ages,
	onQueryChange,
	onToggleSubject,
	onToggleAge,
	onReset,
}: FilterPanelProps) {
	// Reused style for each checkbox 
	const labelStyle = {
		display: "flex",
		alignItems: "center",
		gap: 8,
		marginBottom: 8,
		color: "#1f3f7f",
		fontWeight: 600,
		fontSize: isMobile ? 13 : 15,
	};

	// For collapsible mobile filter groups
	const dropdownWrapStyle = {
		background: "#ffffff",
		borderRadius: 12,
		border: "1px solid #d4dbea",
		marginBottom: 10,
		overflow: "hidden",
	};

	// Style for the clickable summary/header of each mobile dropdown
	const dropdownSummaryStyle = {
		listStyle: "none",
		cursor: "pointer",
		padding: "10px 12px",
		fontSize: 14,
		fontWeight: 700,
		color: "#1f3f7f",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	};

	return (
		<aside
			style={{
				// Cool glassy look + sticky behavior so it remains up top and doesn't scroll away
				background: "rgba(255, 255, 255, 0.84)",
				borderRadius: 18,
				border: "1px solid #e3e8f2",
				boxShadow: "0 8px 30px rgba(19, 37, 68, 0.14)",
				backdropFilter: "blur(8px)",
				padding: isMobile ? 10 : 14,
				alignSelf: "start",
				position: "sticky",
				top: isMobile ? 8 : 16,
				zIndex: 20,
				height: "fit-content",
				maxHeight: isMobile ? "none" : "calc(100% - 16px)",
				overflowY: "auto",
				marginBottom: isMobile ? 12 : 0,
			}}
		>
			{/* Search sits at the top so users can filter immediately */}
			<SearchInput value={query} onChange={onQueryChange} compact={isMobile} />

			{isMobile ? (
				<>
					{/* On mobile, subject filters are collapsed into a dropdown to save space */}
					<details style={dropdownWrapStyle}>
						<summary style={dropdownSummaryStyle}>
							<span>Subject Filters</span>
							<span>{subjects.size}</span>
						</summary>
						<div style={{ padding: "0 12px 10px" }}>
							{SUBJECT_OPTIONS.map((subject) => (
								<label key={subject} style={labelStyle}>
									<input
										type="checkbox"
										checked={subjects.has(subject)}
										onChange={() => onToggleSubject(subject)}
									/>
									<span>{SUBJECT_LABELS[subject]}</span>
								</label>
							))}
						</div>
					</details>

					{/* Age filters are also collapsible on mobile */}
					<details style={dropdownWrapStyle}>
						<summary style={dropdownSummaryStyle}>
							<span>Age Group Filters</span>
							<span>{ages.size}</span>
						</summary>
						<div style={{ padding: "0 12px 10px" }}>
							{AGE_OPTIONS.map((age) => (
								<label key={age} style={labelStyle}>
									<input
										type="checkbox"
										checked={ages.has(age)}
										onChange={() => onToggleAge(age)}
									/>
									<span>{AGE_LABELS[age]}</span>
								</label>
							))}
						</div>
					</details>
				</>
			) : (
				<>
					{/* Desktop version shows all checkboxes openly for faster multi-select */}
					<h2 style={{ textAlign: "center", margin: "8px 0 10px", color: "#1f3f7f", fontSize: 24 }}>
						Subjects
					</h2>
					{SUBJECT_OPTIONS.map((subject) => (
						<label key={subject} style={labelStyle}>
							<input
								type="checkbox"
								checked={subjects.has(subject)}
								onChange={() => onToggleSubject(subject)}
							/>
							<span>{SUBJECT_LABELS[subject]}</span>
						</label>
					))}

					<h2 style={{ textAlign: "center", margin: "14px 0 10px", color: "#1f3f7f", fontSize: 24 }}>
						Age group
					</h2>
					{AGE_OPTIONS.map((age) => (
						<label key={age} style={labelStyle}>
							<input type="checkbox" checked={ages.has(age)} onChange={() => onToggleAge(age)} />
							<span>{AGE_LABELS[age]}</span>
						</label>
					))}
				</>
			)}

			{/* One-click reset to clear all filters and search text */}
			<PortalButton label="Reset filters" onClick={onReset} compact={isMobile} />
		</aside>
	);
}