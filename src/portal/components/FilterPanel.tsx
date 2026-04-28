/** @jsxImportSource react */
import React from "react";
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
  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    color: "#1f3f7f",
    fontWeight: 600,
    fontFamily: "'Manrope', 'Segoe UI', sans-serif",
    fontSize: isMobile ? 13 : 15,
    letterSpacing: "0.01em",
  };

  const dropdownWrapStyle = {
    background: "#ffffff",
    borderRadius: 12,
    border: "1px solid #d4dbea",
    marginBottom: 10,
    overflow: "hidden",
  };

  const dropdownSummaryStyle = {
    listStyle: "none",
    cursor: "pointer",
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#1f3f7f",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  // Mobile: only show the inline search (no fixed behaviour, no filters)
  if (isMobile) {
    return (
      <aside
        style={{
          background: "rgba(255, 255, 255, 0.84)",
          borderRadius: 12,
          border: "1px solid #e3e8f2",
          padding: 10,
          marginBottom: 12,
          position: "static",
          zIndex: 20,
          overflow: "visible",
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <SearchInput value={query} onChange={onQueryChange} compact={true} />
        </div>

        {/* optional: keep reset button on mobile */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <PortalButton label="Reset" onClick={onReset} compact={true} />
        </div>
      </aside>
    );
  }

  // Desktop: original full filter panel
  return (
    <aside
      style={{
        background: "rgba(255, 255, 255, 0.84)",
        borderRadius: 18,
        border: "1px solid #e3e8f2",
        boxShadow: "0 8px 30px rgba(19, 37, 68, 0.14)",
        backdropFilter: "blur(8px)",
        padding: 14,
        alignSelf: "start",
        position: "sticky",
        top: 16,
        zIndex: 20,
        height: "fit-content",
        maxHeight: "calc(100% - 16px)",
        overflowY: "auto",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <SearchInput value={query} onChange={onQueryChange} compact={false} />
      </div>

      <h2 style={{ textAlign: "center", margin: "8px 0 10px", color: "#1f3f7f", fontSize: 24 }}>
        Subjects
      </h2>
      {SUBJECT_OPTIONS.map((subject) => (
        <label key={subject} style={labelStyle}>
          <input type="checkbox" checked={subjects.has(subject)} onChange={() => onToggleSubject(subject)} />
          <span>{SUBJECT_LABELS[subject]}</span>
        </label>
      ))}

      <h2 style={{ textAlign: "center", margin: "14px 0 10px", color: "#1f3f7f", fontSize: 24 }}>Age group</h2>
      {AGE_OPTIONS.map((age) => (
        <label key={age} style={labelStyle}>
          <input type="checkbox" checked={ages.has(age)} onChange={() => onToggleAge(age)} />
          <span>{AGE_LABELS[age]}</span>
        </label>
      ))}

      <div style={{ marginTop: 12 }}>
        <PortalButton label="Reset filters" onClick={onReset} compact={false} />
      </div>
    </aside>
  );
}