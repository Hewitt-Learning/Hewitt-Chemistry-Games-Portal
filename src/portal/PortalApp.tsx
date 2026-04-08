/** @jsxImportSource react */
import React from "react";
import { GAMES } from "./games";
import { FilterPanel } from "./components/FilterPanel";
import { GameGrid } from "./components/GameGrid";
import { PortalHeader } from "./components/PortalHeader";
import { AGE_OPTIONS, SUBJECT_OPTIONS } from "./types";
import type { AgeTag, SubjectTag } from "./types";

// Tiny helper so we can toggle checkboxes with Set state in one place
function toggleSetItem<T>(set: Set<T>, value: T): Set<T> {
	const next = new Set(set);
	if (next.has(value)) {
        next.delete(value);
    }
	else {
        next.add(value);
    }
	return next;
}

// We track mobile layout with JS because some behavior (like sticky + layout) changes by breakpoint
function useIsMobile(breakpoint = 900): boolean {
	const getMatches = () => window.innerWidth <= breakpoint;
	const [isMobile, setIsMobile] = React.useState(getMatches);

	React.useEffect(() => {
		// Listen to viewport changes so the app can switch between mobile and desktop layout live
		const onResize = () => setIsMobile(getMatches());
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [breakpoint]);

	return isMobile;
}

export function PortalApp() {
	// Search text from the search input
	const [query, setQuery] = React.useState("");
	// Selected subject filters
	const [subjects, setSubjects] = React.useState<Set<SubjectTag>>(new Set());
	// Selected age filters
	const [ages, setAges] = React.useState<Set<AgeTag>>(new Set());
	const isMobile = useIsMobile();

	// Filter once per dependency change, so we do not recompute every render
	const filteredGames = React.useMemo(() => {
		const search = query.trim().toLowerCase();
		return GAMES.filter((game) => {
			// Name search is case-insensitive and ignores leading/trailing whitespace
			const bySearch = !search || game.name.toLowerCase().includes(search);
			// Empty filter set means "show all" for that category
			const bySubject = subjects.size === 0 || subjects.has(game.subject);
			const byAge = ages.size === 0 || ages.has(game.age);
			return bySearch && bySubject && byAge;
		});
	}, [query, subjects, ages]);

	return (
		<div
			style={{
				// On desktop we keep a fixed-height app wrapper
				// On mobile we let the page flow naturally so the header can scroll away
                // TODO: still gotta work on the sticky search panel on mobile
				height: isMobile ? "auto" : "100vh",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				background:
					"radial-gradient(circle at 12% 0%, #f6fbff 0%, #f5f6fb 42%, #f3f4f9 100%)",
				color: "#1f2a44",
				fontFamily:
					'"mozaic-geo-variable", "Mozaic GEO Variable Regular", "Manrope", "Avenir Next", "Segoe UI", sans-serif',
				overflowX: "hidden",
			}}
		>
			<PortalHeader isMobile={isMobile} />
			<main
				style={{
					// Make this take all remaining space under the header
					flex: 1,
					minHeight: 0,
					width: "100%",
					maxWidth: 1460,
					margin: "0 auto",
					padding: isMobile ? "10px 10px 22px" : "20px 18px 28px",
					boxSizing: "border-box",
					// Desktop uses two-column grid (filters + cards)
					display: isMobile ? "block" : "grid",
					gap: isMobile ? undefined : 20,
					gridTemplateColumns: isMobile ? "1fr" : "320px minmax(0, 1fr)",
					alignItems: "start",
					// Desktop scrolls inside this area; mobile scrolls the page
					overflowY: isMobile ? "visible" : "auto",
				}}
			>
				<FilterPanel
					isMobile={isMobile}
					query={query}
					subjects={subjects}
					ages={ages}
					onQueryChange={setQuery}
					onToggleSubject={(subject) => setSubjects((old) => toggleSetItem(old, subject))}
					onToggleAge={(age) => setAges((old) => toggleSetItem(old, age))}
					onReset={() => {
						// Reset everything back to no filters and no query
						setQuery("");
						setSubjects(new Set(SUBJECT_OPTIONS.slice(0, 0)));
						setAges(new Set(AGE_OPTIONS.slice(0, 0)));
					}}
				/>
				<GameGrid games={filteredGames} isMobile={isMobile} />
			</main>
		</div>
	);
}