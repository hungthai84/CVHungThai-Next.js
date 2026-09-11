import React, { useState, useEffect, useRef, useMemo, ReactNode } from "react";

interface MasonryProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
  gap?: number;
  columns?: Record<number, number>; // e.g. { 0: 1, 640: 2, 1024: 3, 1280: 4 }
}

export function Masonry<T>({ items, renderItem, keyExtractor, gap = 12, columns = { 0: 1, 640: 2, 1024: 3, 1280: 4 } }: MasonryProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [colCount, setColCount] = useState(1);
  
  // Update column count efficiently based on container width
  useEffect(() => {
    const updateCols = (width: number) => {
      let currentCols = 1;
      const breakpoints = Object.keys(columns).map(Number).sort((a, b) => a - b);
      for (const bp of breakpoints) {
        if (width >= bp) {
          currentCols = columns[bp];
        }
      }
      setColCount(prev => (prev !== currentCols ? currentCols : prev));
    };

    const container = containerRef.current;
    if (!container) return;

    updateCols(container.clientWidth || window.innerWidth);
    
    let rafId: number | null = null;
    const observer = new ResizeObserver((entries) => {
      if (!entries || !entries[0]) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateCols(entries[0].contentRect.width);
      });
    });
    
    observer.observe(container);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [columns]);

  // Distribute items into columns predictably and quickly without layout thrashing
  const columnData = useMemo(() => {
    const cols: T[][] = Array.from({ length: colCount }, () => []);
    items.forEach((item, index) => {
      cols[index % colCount].push(item);
    });
    return cols;
  }, [items, colCount]);

  return (
    <div ref={containerRef} className="w-full flex items-start" style={{ gap: `${gap}px` }}>
      {columnData.map((colItems, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col min-w-0" style={{ gap: `${gap}px` }}>
          {colItems.map((item, itemIdx) => {
            const key = keyExtractor(item);
            return (
              <div key={key} className="w-full min-w-0">
                {renderItem(item, itemIdx)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
