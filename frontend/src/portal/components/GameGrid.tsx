/** @jsxImportSource react */
import type { PortalGame } from "../types";
import { GameCard } from "./GameCard";

interface GameGridProps {
	isMobile: boolean;
	games: PortalGame[];
}

export function GameGrid({ games, isMobile }: GameGridProps) {
	// Responsive card grid with tighter cards on mobile, wider cards on desktop
	return (
		<section
			style={{
				display: "grid",
				width: "100%",
				gridTemplateColumns: isMobile
					? "repeat(auto-fill, minmax(min(220px, 100%), 1fr))"
					: "repeat(auto-fill, minmax(250px, 1fr))",
				gap: isMobile ? 12 : 18,
				alignItems: "start",
				height: "100%",
			}}
		>
			{/* Render one card per game. */}
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}

			{/* Empty state when no results match active filters */}
			{games.length === 0 ? (
				<p style={{ color: "#1f3f7f", fontWeight: 700, fontSize: 18 }}>
					No games match these filters.
				</p>
			) : null}
		</section>
	);
}