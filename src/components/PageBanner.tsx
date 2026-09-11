import React from "react";
import SectionHeader, { SectionHeaderProps } from "./SectionHeader";

export type PageBannerProps = SectionHeaderProps;

/**
 * PageBanner component backed by SectionHeader for unified glassmorphism styling,
 * Sentence case typography, and shared element layoutId transitions across all 16 pages.
 */
export const PageBanner: React.FC<PageBannerProps> = React.memo((props) => {
  return <SectionHeader {...props} />;
});

PageBanner.displayName = "PageBanner";

export default PageBanner;
