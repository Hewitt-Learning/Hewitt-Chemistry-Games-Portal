import React, { useState } from "react";

interface MobilePagerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  initialIndex?: number;
  className?: string;
}

export default function MobilePager<T>({
  items,
  renderItem,
  initialIndex = 0,
  className,
}: MobilePagerProps<T>) {
  const safeInitial = Math.max(0, Math.min(initialIndex, (items || []).length - 1));
  const [index, setIndex] = useState<number>(safeInitial);

  if (!items || items.length === 0) return null;

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setIndex((i) => Math.min(items.length - 1, i + 1));
  }

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={prev} disabled={index === 0} aria-label="Previous" style={{ padding: "6px 10px" }}>
          ← Prev
        </button>
        <div style={{ fontSize: 13, color: "#345" }}>{index + 1} / {items.length}</div>
        <button onClick={next} disabled={index === items.length - 1} aria-label="Next" style={{ padding: "6px 10px" }}>
          Next →
        </button>
      </div>

      <div>
        {renderItem(items[index], index)}
      </div>
    </div>
  );
}