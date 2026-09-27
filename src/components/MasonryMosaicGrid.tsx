import React, { ReactNode } from "react";
import { motion, Variants } from "motion/react";
import { cn } from "../lib/utils";

export interface MasonryMosaicItem {
  id: string;
  span?: "featured" | "wide" | "tall" | "normal";
  [key: string]: any;
}

export const masonryMosaicContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (stagger: number = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.04,
    },
  }),
};

export const masonryMosaicItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export interface MasonryMosaicGridProps<T extends MasonryMosaicItem = MasonryMosaicItem> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T) => string;
  getSpanClass?: (item: T, index: number) => string;
  className?: string;
  itemClassName?: string;
  stagger?: number;
  viewportMargin?: string;
  once?: boolean;
  enableShimmer?: boolean;
}

interface MasonryMosaicCardItemProps<T extends MasonryMosaicItem> {
  item: T;
  index: number;
  spanClass: string;
  itemClassName?: string;
  enableShimmer?: boolean;
  renderItem: (item: T, index: number) => ReactNode;
}

function MasonryMosaicCardItem<T extends MasonryMosaicItem>({
  item,
  index,
  spanClass,
  itemClassName,
  enableShimmer = true,
  renderItem,
}: MasonryMosaicCardItemProps<T>) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableShimmer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
    e.currentTarget.style.setProperty("--shimmer-opacity", "1");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableShimmer) return;
    e.currentTarget.style.setProperty("--shimmer-opacity", "0");
  };

  return (
    <motion.div
      variants={masonryMosaicItemVariants}
      className={cn("item-card group/mosaic-card", spanClass, itemClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {renderItem(item, index)}
      {enableShimmer && (
        <>
          <div className="card-shimmer-highlight" aria-hidden="true" />
          <div className="card-shimmer-lens" aria-hidden="true" />
          <div className="card-shimmer-border" aria-hidden="true" />
        </>
      )}
    </motion.div>
  );
}

export function MasonryMosaicGrid<T extends MasonryMosaicItem = MasonryMosaicItem>({
  items,
  renderItem,
  keyExtractor = (item) => item.id,
  getSpanClass,
  className,
  itemClassName,
  stagger = 0.08,
  viewportMargin = "-40px",
  once = true,
  enableShimmer = true,
}: MasonryMosaicGridProps<T>) {
  // Determine mosaic spanning class based on item property or rhythm
  const resolveSpanClass = (item: T, index: number): string => {
    if (getSpanClass) return getSpanClass(item, index);
    if (item.span === "featured") return "mosaic-span-featured";
    if (item.span === "wide") return "mosaic-span-wide";
    if (item.span === "tall") return "mosaic-span-tall";
    if (item.span === "normal") return "mosaic-span-normal";

    // Natural rhythmic mosaic pattern for visual balance
    // Item 0: Featured (2x2)
    // Item 3: Tall (1x2)
    // Item 6: Wide (2x1)
    if (index === 0) return "mosaic-span-featured";
    if (index === 3 || index === 7) return "mosaic-span-tall";
    if (index === 5) return "mosaic-span-wide";
    return "mosaic-span-normal";
  };

  return (
    <motion.div
      className={cn("masonry-mosaic-grid", className)}
      variants={masonryMosaicContainerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
    >
      {items.map((item, index) => {
        const key = keyExtractor(item);
        const spanClass = resolveSpanClass(item, index);

        return (
          <MasonryMosaicCardItem
            key={key}
            item={item}
            index={index}
            spanClass={spanClass}
            itemClassName={itemClassName}
            enableShimmer={enableShimmer}
            renderItem={renderItem}
          />
        );
      })}
    </motion.div>
  );
}

export default MasonryMosaicGrid;
