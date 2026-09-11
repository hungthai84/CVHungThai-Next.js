import { ProjectCard } from "./projectsData";
import { ProjectPostcardData, ProjectAudioMetadata } from "../types/projectPostcard";

/**
 * Creates a slugified filename for audio files:
 * e.g., "1.1" + "Xây dựng và vận hành..." -> "project-01-1-xay-dung-va-van-hanh-phong-dich-vu-khach-hang.mp3"
 */
export function getProjectAudioSlug(project: ProjectCard): string {
  const codeSlug = project.phaseCode.replace(/\./g, "-");
  const titleClean = project.branchTitle
    .replace(/^[\d.]+\s*·\s*/, "") // remove "1.1 · "
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `project-${codeSlug.padStart(4, "0")}-${titleClean}.mp3`;
}

/**
 * Extract quantitative metrics from project actions and results
 */
function extractMetrics(project: ProjectCard): { label: string; value: string; desc?: string }[] {
  const metrics: { label: string; value: string; desc?: string }[] = [];
  
  if (project.caseStudy?.results) {
    project.caseStudy.results.forEach((res) => {
      // Find percentages or time numbers
      const percentMatch = res.match(/([\d.]+%)/);
      const speedMatch = res.match(/(giảm\s*[\d.]+\s*(?:phút|giờ|h|%))/i) || res.match(/(tăng\s*[\d.]+\s*%(?:\s*lên\s*[\d.]+%|))/i);
      const timeMatch = res.match(/([\d.]+\s*(?:phút|ngày|tuần|giờ|s))/i);

      if (percentMatch) {
        metrics.push({
          label: "Chỉ số Hiệu suất",
          value: percentMatch[1],
          desc: res.replace(/^[-•\s]+/, "").slice(0, 70)
        });
      } else if (speedMatch) {
        metrics.push({
          label: "Tốc độ / Tối ưu",
          value: speedMatch[1],
          desc: res.slice(0, 70)
        });
      } else if (timeMatch) {
        metrics.push({
          label: "Thời gian xử lý",
          value: timeMatch[1],
          desc: res.slice(0, 70)
        });
      }
    });
  }

  // If no metric regex matched, extract from actions values
  if (metrics.length === 0 && project.caseStudy?.actions) {
    project.caseStudy.actions.forEach((act) => {
      const match = act.value.match(/([\d.]+%|[\d.]+\s*(?:phút|ngày|giờ|giây|lượt|người|vị trí))/i);
      if (match) {
        metrics.push({
          label: act.title.replace(/^[\d.]+\s*·\s*/, ""),
          value: match[1],
          desc: act.value
        });
      }
    });
  }

  return metrics.slice(0, 4); // Max 4 top metrics for Postcard layout
}

/**
 * Categorize project actions into People, Process, Technology, Customer pillars
 */
function categorizeSolutions(project: ProjectCard) {
  const people: string[] = [];
  const process: string[] = [];
  const technology: string[] = [];
  const customer: string[] = [];

  if (project.caseStudy?.actions) {
    project.caseStudy.actions.forEach((act) => {
      const fullText = (act.title + " " + act.desc + " " + act.value).toLowerCase();
      if (fullText.includes("tuyển dụng") || fullText.includes("nhân sự") || fullText.includes("đào tạo") || fullText.includes("văn hóa") || fullText.includes("năng lực") || fullText.includes("leader")) {
        people.push(`${act.title}: ${act.desc}`);
      }
      if (fullText.includes("sop") || fullText.includes("quy trình") || fullText.includes("chuẩn hóa") || fullText.includes("sla") || fullText.includes("ma trận")) {
        process.length < 3 && process.push(`${act.title}: ${act.desc}`);
      }
      if (fullText.includes("ai") || fullText.includes("crm") || fullText.includes("hệ thống") || fullText.includes("tự động") || fullText.includes("dashboard") || fullText.includes("rpa") || fullText.includes("bot")) {
        technology.length < 3 && technology.push(`${act.title}: ${act.desc}`);
      }
      if (fullText.includes("khách hàng") || fullText.includes("trải nghiệm") || fullText.includes("cx") || fullText.includes("csat") || fullText.includes("nps") || fullText.includes("cjm")) {
        customer.length < 3 && customer.push(`${act.title}: ${act.desc}`);
      }
    });
  }

  return {
    summary: project.caseStudy?.solutionSummary || project.description,
    people: people.length > 0 ? people : undefined,
    process: process.length > 0 ? process : undefined,
    technology: technology.length > 0 ? technology : undefined,
    customer: customer.length > 0 ? customer : undefined,
  };
}

/**
 * Generate Postcard Data dynamically from project card content with enhanced executive details
 */
export function getProjectPostcard(project: ProjectCard): ProjectPostcardData {
  const solutionSummary = project.caseStudy?.solutionSummary || project.description;
  const contextText = project.caseStudy?.context || project.description;

  // Extract crisp challenges as structured bullet points
  const rawChallenges = contextText.split(/(?<=[.?!])\s+/).filter(Boolean);
  const challenges = rawChallenges.length > 0 ? rawChallenges : [contextText];

  // Extract implementation steps
  const implementation = (project.caseStudy?.actions || []).map((act, idx) => ({
    step: String(idx + 1).padStart(2, "0"),
    title: act.title,
    desc: act.desc,
    value: act.value
  }));

  // Extract scale indicators from actions or results
  const scaleIndicators: { label: string; value: string }[] = [];
  const fullContent = JSON.stringify(project);
  
  if (fullContent.includes("nhân sự")) {
    const match = fullContent.match(/(\d+\+?\s*nhân sự)/i);
    if (match) scaleIndicators.push({ label: "Quy mô đội ngũ", value: match[1] });
  }
  if (fullContent.includes("SOP") || fullContent.includes("quy trình")) {
    const match = fullContent.match(/(\d+\+?\s*(?:SOP|quy trình))/i);
    if (match) scaleIndicators.push({ label: "Chuẩn hóa", value: match[1] });
  }
  if (fullContent.includes("khách hàng") || fullContent.includes("tài khoản")) {
    const match = fullContent.match(/(\d+\+?\s*(?:triệu|ngàn|k)?\s*(?:khách hàng|tài khoản|lượt))/i);
    if (match) scaleIndicators.push({ label: "Khách hàng phục vụ", value: match[1] });
  }

  return {
    projectId: project.id,
    phaseCode: project.phaseCode,
    headline: `${project.branchTitle}: ${project.description}`,
    summary: solutionSummary,
    role: project.role,
    timeframe: project.timeframe,
    context: contextText,
    challenges,
    objectives: [
      `Tối ưu hóa vận hành, chuẩn hóa quy trình và nâng cao trải nghiệm khách hàng tại ${project.branchTitle}`,
      `Thiết lập khung đo lường hiệu suất minh bạch và đạt các chỉ số cam kết chất lượng trong khung thời gian ${project.timeframe}`,
      `Xây dựng văn hóa lấy khách hàng làm trung tâm, gắn kết nội bộ và tối ưu hóa chi phí vận hành bền vững`
    ],
    solutions: categorizeSolutions(project),
    implementation,
    scale: scaleIndicators.length > 0 ? scaleIndicators : undefined,
    systems: project.tags.map(t => t.replace(/^#/, '')),
    metrics: extractMetrics(project),
    results: project.caseStudy?.results || [],
    keyMessage: `Dự án ${project.branchTitle} minh chứng tư duy quản trị thực chiến: Biến dịch vụ chăm sóc khách hàng từ trung tâm chi phí thành động lực tăng trưởng và giá trị bền vững.`
  };
}

/**
 * Generate Audio Metadata for project
 */
export function getProjectAudioMetadata(project: ProjectCard): ProjectAudioMetadata {
  const fileName = getProjectAudioSlug(project);
  return {
    enabled: true,
    src: `/audio/projects/${fileName}`,
    voice: "Nam Puck",
    model: "gemini-2.5-pro-preview-tts",
    duration: "1:15",
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Generate Audio Script for Nam Puck narration voice (60-90 seconds)
 * Strictly based on authentic project data without fabricated metrics or fake claims.
 */
export function getProjectAudioScript(project: ProjectCard): string {
  const code = project.phaseCode;
  const title = project.branchTitle.replace(/^[\d.]+\s*·\s*/, "");
  const role = project.role;
  const context = project.caseStudy?.context || project.description;
  const solution = project.caseStudy?.solutionSummary || project.description;
  const actions = (project.caseStudy?.actions || [])
    .map(a => a.title.replace(/^[\d.]+\s*·\s*/, ""))
    .join(", ");
  const results = (project.caseStudy?.results || []).join(". ");

  return `Dự án ${code}: ${title}. 

Với vai trò ${role}, tôi đã trực tiếp chủ trì triển khai dự án này. 

Về bối cảnh: ${context}

Giải pháp chiến lược: ${solution}

Các trụ cột triển khai chính bao gồm: ${actions}.

Về kết quả thực tế đạt được: ${results}

Dự án không chỉ tối ưu hiệu suất vận hành mà còn khẳng định cam kết lấy trải nghiệm khách hàng làm trung tâm chiến lược bền vững.`;
}
