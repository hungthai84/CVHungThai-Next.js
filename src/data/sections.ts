import React, { memo } from "react";
import Hero from "../components/Hero";
import Letter from "../components/Letter";
import About from "../components/About";
import Domains from "../components/Domains";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Interview from "../components/Interview";
import TuVi from "../components/TuVi";
import Memories from "../components/Memories";
import Systems from "../components/Systems";
import Contact from "../components/Contact";
import Wallpapers from "../components/Wallpapers";
import TabErrorsPage from "../components/TabErrorsPage";
import { 
  Monitor, 
  MailOpen, 
  User, 
  GraduationCap, 
  Compass, 
  Briefcase, 
  Brain, 
  ClipboardList, 
  Video,
  Sparkles, 
  Images, 
  MessagesSquare, 
  Film, 
  Server, 
  Sliders, 
  ShieldAlert,
  LucideIcon
} from "lucide-react";

export interface SectionItem {
  id: string;
  labelKey: string;
  labelVi: string;
  labelEn: string;
  Icon: LucideIcon;
  Component: React.ComponentType<any>;
  padding: string;
}

const MemoHero = memo(Hero);

export const SECTIONS: SectionItem[] = [
  { 
    id: "home", 
    labelKey: "nav.home", 
    labelVi: "Trang Chủ", 
    labelEn: "Home", 
    Icon: Monitor, 
    Component: MemoHero, 
    padding: "p-0 overflow-hidden" 
  },
  { 
    id: "letter", 
    labelKey: "nav.letter", 
    labelVi: "Thư Ngỏ", 
    labelEn: "Letter", 
    Icon: MailOpen, 
    Component: Letter, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "about", 
    labelKey: "nav.about", 
    labelVi: "Giới Thiệu", 
    labelEn: "About", 
    Icon: User, 
    Component: About, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "education", 
    labelKey: "nav.education", 
    labelVi: "Học Vấn", 
    labelEn: "Education", 
    Icon: GraduationCap, 
    Component: Education, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "domains", 
    labelKey: "nav.domains", 
    labelVi: "Lĩnh Vực", 
    labelEn: "Domains", 
    Icon: Compass, 
    Component: Domains, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "experience", 
    labelKey: "nav.experience", 
    labelVi: "Kinh Nghiệm", 
    labelEn: "Experience", 
    Icon: Briefcase, 
    Component: Experience, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "skills", 
    labelKey: "nav.skills", 
    labelVi: "Kỹ Năng", 
    labelEn: "Skills", 
    Icon: Brain, 
    Component: Skills, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "projects", 
    labelKey: "nav.projects", 
    labelVi: "Dự Án", 
    labelEn: "Projects", 
    Icon: ClipboardList, 
    Component: Projects, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "systems", 
    labelKey: "nav.systems", 
    labelVi: "Hệ Thống", 
    labelEn: "Systems", 
    Icon: Server, 
    Component: Systems, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "interview", 
    labelKey: "nav.interview", 
    labelVi: "Phỏng Vấn", 
    labelEn: "Interview", 
    Icon: Video, 
    Component: Interview, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "tuvi", 
    labelKey: "nav.tuvi", 
    labelVi: "Tử Vi", 
    labelEn: "Horoscope", 
    Icon: Sparkles, 
    Component: TuVi, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "memories", 
    labelKey: "nav.memories", 
    labelVi: "Kỷ Niệm", 
    labelEn: "Memories", 
    Icon: Images, 
    Component: Memories, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "contact", 
    labelKey: "nav.contact", 
    labelVi: "Liên Hệ", 
    labelEn: "Contact", 
    Icon: MessagesSquare, 
    Component: Contact, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "wallpapers", 
    labelKey: "nav.wallpapers", 
    labelVi: "Hình Nền", 
    labelEn: "Wallpapers", 
    Icon: Film, 
    Component: Wallpapers, 
    padding: "p-0 overflow-y-auto" 
  },
  { 
    id: "errors", 
    labelKey: "nav.errors", 
    labelVi: "Sự Cố", 
    labelEn: "Issues", 
    Icon: ShieldAlert, 
    Component: TabErrorsPage, 
    padding: "p-0 overflow-y-auto" 
  },
];
