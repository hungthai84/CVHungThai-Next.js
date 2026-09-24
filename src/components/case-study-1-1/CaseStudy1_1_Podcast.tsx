import React from "react";
import { CaseStudy1_1_AudioOverview } from "./CaseStudy1_1_AudioOverview";

interface CaseStudy1_1_PodcastProps {
  project?: {
    id?: string;
    phase?: string;
    title?: string;
    [key: string]: any;
  };
  onShowToast?: (msg: string) => void;
}

export function CaseStudy1_1_Podcast({ project, onShowToast }: CaseStudy1_1_PodcastProps) {
  const projectTitle = project?.title || "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng";
  const projectPhase = project?.phase || "1.1";

  return (
    <section id="sec-podcast" className="w-full">
      <CaseStudy1_1_AudioOverview
        projectTitle={projectTitle}
        projectPhase={projectPhase}
        onShowToast={onShowToast}
      />
    </section>
  );
}

export default CaseStudy1_1_Podcast;
