/** @jsxImportSource react */
import React, { useState } from "react";
import type { PortalGame } from "../types";
import { GameCard } from "./GameCard";

interface GameGridProps {
    isMobile: boolean;
    games: PortalGame[];
}

export function GameGrid({ games, isMobile }: GameGridProps) {
    // Mobile: render one visible card at a time but keep all mounted so state is preserved
    if (isMobile) {
        const [index, setIndex] = useState(0);
        const prev = () => setIndex((i) => Math.max(0, i - 1));
        const next = () => setIndex((i) => Math.min(games.length - 1, i + 1));

        if (games.length === 0) {
            return (
                <p style={{ color: "#1f3f7f", fontWeight: 700, fontSize: 18 }}>
                    No games match these filters.
                </p>
            );
        }

        const BUTTON_SIZE = 36;
        const btnBase: React.CSSProperties = {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            borderRadius: 8,
            border: "none",
            color: "#fff",
            fontWeight: 700,
            fontFamily: "'Manrope', 'Segoe UI', sans-serif",
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(31,63,127,0.12)",
            padding: 0,
        };

        const btnPrimary: React.CSSProperties = {
            ...btnBase,
            background: "linear-gradient(180deg,#2ec3a6 0%, #065759 100%)",
        };

        const btnSecondary: React.CSSProperties = {
            ...btnBase,
            background: "linear-gradient(180deg,#ffffff 0%, #f6fbff 100%)",
            color: "#1f3f7f",
            border: "1px solid #d4dbea",
            boxShadow: "none",
        };

        const btnDisabled: React.CSSProperties = { opacity: 0.5, cursor: "default" };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* All GameCard instances are mounted; only the active one is visible */}
                <div>
                    {games.map((game, i) => (
                        <div key={game.id} style={{ display: i === index ? "block" : "none" }}>
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>

                {/* Bottom controls */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        marginTop: 6,
                    }}
                >
                    {/* Prev */}
                    {index > 0 ? (
                        <button
                            onClick={prev}
                            disabled={index === 0}
                            style={index === 0 ? { ...btnSecondary, ...btnDisabled } : btnSecondary}
                            aria-label="Previous game"
                        >
                            ←
                        </button>
                    ) : (
                        <div style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }} />
                    )}

                    {/* Counter */}
                    <div style={{ textAlign: "center", color: "#1f3f7f", fontWeight: 700 }}>
                        {index + 1} / {games.length}
                    </div>

                    {/* Next (UPDATED) */}
                    {index < games.length - 1 ? (
                        <button
                            onClick={next}
                            disabled={index === games.length - 1}
                            style={index === games.length - 1 ? { ...btnPrimary, ...btnDisabled } : btnPrimary}
                            aria-label="Next game"
                        >
                            →
                        </button>
                    ) : (
                        <div style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }} />
                    )}
                </div>
            </div>
        );
    }

    // Desktop: original grid
    return (
        <section
            style={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 18,
                alignItems: "start",
                height: "100%",
            }}
        >
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}

            {games.length === 0 ? (
                <p style={{ color: "#1f3f7f", fontWeight: 700, fontSize: 18 }}>
                    No games match these filters.
                </p>
            ) : null}
        </section>
    );
}