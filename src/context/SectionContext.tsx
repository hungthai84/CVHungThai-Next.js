import React, { createContext, useContext, useMemo } from "react";
import { LucideIcon } from "lucide-react";
import { useLanguage } from "../i18n";

export interface SectionMeta {
  id: string;
  labelKey: string;
  Icon: LucideIcon;
  tag?: string;
  subtitleVi?: string;
  subtitleEn?: string;
  padding?: string;
  Component?: React.ComponentType<any>;
}

export interface SectionContextType {
  activeSection: string;
  currentSection: SectionMeta;
  sections: SectionMeta[];
  getSectionTitle: (sectionId?: string) => string;
  getSectionSubtitle: (sectionId?: string) => string;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export interface SectionProviderProps {
  activeSection: string;
  sections: SectionMeta[];
  children: React.ReactNode;
}

export const SectionProvider: React.FC<SectionProviderProps> = ({
  activeSection,
  sections,
  children,
}) => {
  const { t, lang } = useLanguage();

  const currentSection = useMemo(() => {
    return sections.find((s) => s.id === activeSection) || sections[0];
  }, [activeSection, sections]);

  const getSectionTitle = useMemo(() => {
    return (sectionId?: string) => {
      const target = sectionId ? sections.find((s) => s.id === sectionId) : currentSection;
      if (!target) return "";
      const rawTitle = t(target.labelKey) || target.id;
      // Sentence case formatting: First letter capitalized, rest lowercase
      const trimmed = rawTitle.trim();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    };
  }, [currentSection, sections, t]);

  const getSectionSubtitle = useMemo(() => {
    return (_sectionId?: string) => {
      // Đã xóa Sub tiêu đề theo yêu cầu áp dụng cho tất cả các trang
      return "";
    };
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      currentSection,
      sections,
      getSectionTitle,
      getSectionSubtitle,
    }),
    [activeSection, currentSection, sections, getSectionTitle, getSectionSubtitle]
  );

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
};

const fallbackCurrentSection: SectionMeta = {
  id: "home",
  labelKey: "nav.home",
  Icon: (() => null) as unknown as LucideIcon,
};

const fallbackSectionContext: SectionContextType = {
  activeSection: "home",
  currentSection: fallbackCurrentSection,
  sections: [],
  getSectionTitle: (sectionId?: string) => sectionId || "Home",
  getSectionSubtitle: () => "",
};

export const useSection = (): SectionContextType => {
  const context = useContext(SectionContext);
  return context || fallbackSectionContext;
};
