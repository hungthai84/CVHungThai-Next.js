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
  setActiveSection?: (sectionId: string) => void;
  currentSection: SectionMeta;
  sections: SectionMeta[];
  getSectionTitle: (sectionId?: string) => string;
  getSectionSubtitle: (sectionId?: string) => string;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export interface SectionProviderProps {
  activeSection?: string;
  setActiveSection?: (sectionId: string) => void;
  sections: SectionMeta[];
  children: React.ReactNode;
}

export const SectionProvider: React.FC<SectionProviderProps> = ({
  activeSection: propActiveSection,
  setActiveSection: propSetActiveSection,
  sections,
  children,
}) => {
  const { t, lang } = useLanguage();

  const [internalActiveSection, setInternalActiveSection] = React.useState<string>(() => {
    if (propActiveSection) return propActiveSection;
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) return hash;
      const savedSession = sessionStorage.getItem("portfolio_active_section");
      if (savedSession) return savedSession;
      const savedLocal = localStorage.getItem("portfolio_active_section");
      if (savedLocal) return savedLocal;
    }
    return sections[0]?.id || "home";
  });

  const activeSection = propActiveSection !== undefined ? propActiveSection : internalActiveSection;
  const setActiveSection = propSetActiveSection || setInternalActiveSection;

  React.useEffect(() => {
    if (propActiveSection !== undefined && propActiveSection !== internalActiveSection) {
      setInternalActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && activeSection) {
      sessionStorage.setItem("portfolio_active_section", activeSection);
      localStorage.setItem("portfolio_active_section", activeSection);
      if (window.location.hash.replace(/^#/, "") !== activeSection) {
        window.location.hash = activeSection;
      }
    }
  }, [activeSection]);

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && hash !== activeSection) {
        setActiveSection(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeSection, setActiveSection]);

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
      setActiveSection,
      currentSection,
      sections,
      getSectionTitle,
      getSectionSubtitle,
    }),
    [activeSection, setActiveSection, currentSection, sections, getSectionTitle, getSectionSubtitle]
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
  setActiveSection: () => {},
  currentSection: fallbackCurrentSection,
  sections: [],
  getSectionTitle: (sectionId?: string) => sectionId || "Home",
  getSectionSubtitle: () => "",
};

export const useSection = (): SectionContextType => {
  const context = useContext(SectionContext);
  return context || fallbackSectionContext;
};
