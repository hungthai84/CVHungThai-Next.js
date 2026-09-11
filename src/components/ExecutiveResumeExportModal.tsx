import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Download, Sparkles, CheckCircle, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, ShieldCheck } from "lucide-react";
import { useLanguage } from "../i18n";

interface ExecutiveResumeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExecutiveResumeExportModal({ isOpen, onClose }: ExecutiveResumeExportModalProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl text-white flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  {isVi ? "Xuất Hồ sơ Điều hành (Executive Resume)" : "Executive Resume Export"}
                </h3>
                <p className="text-xs text-slate-400">
                  {isVi ? "Bản tóm tắt năng lực dạng Bento Grid chuẩn hóa chuyên nghiệp" : "Professional executive Bento grid overview"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-black shadow-lg shadow-indigo-500/30 flex items-center gap-2 cursor-pointer transition"
              >
                <Printer className="w-4 h-4" />
                <span>{isVi ? "In / Tải PDF" : "Print / Export PDF"}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Canvas */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-slate-950">
            <div
              ref={printRef}
              id="printable-executive-resume"
              className="w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-xl space-y-6 font-sans print:shadow-none print:p-0"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    NGUYỄN THÁI HÙNG
                  </h1>
                  <p className="text-sm font-bold text-indigo-600 mt-1">
                    EXECUTIVE DIRECTOR / OPERATION & BPO HEAD / AI INTEGRATOR
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    20+ năm kinh nghiệm điều hành hệ thống CSKH, Contact Center & Chuyển đổi số
                  </p>
                </div>

                <div className="text-xs space-y-1 text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>hungthai84@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>0909097882</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>TP. Hồ Chí Minh, Việt Nam</span>
                  </div>
                </div>
              </div>

              {/* Core Strengths Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-1">Quy mô Quản trị</h4>
                  <p className="text-lg font-black text-slate-900">1,200+ Nhân sự</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Hệ thống Contact Center & BPO đa chi nhánh</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-1">Hiệu quả Tối ưu</h4>
                  <p className="text-lg font-black text-slate-900">CSAT 98%+</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Chuẩn hóa chất lượng dịch vụ & SLA</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-1">Công nghệ AI</h4>
                  <p className="text-lg font-black text-slate-900">Omni-Channel AI</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">Tích hợp CRM, BI Reports & Auto Chatbot</p>
                </div>
              </div>

              {/* Experience Milestones */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-indigo-800 border-b border-indigo-100 pb-2 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>Cột mốc Hành trình Sự nghiệp Key Milestones</span>
                </h3>

                <div className="space-y-3">
                  <div className="border-l-2 border-indigo-500 pl-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span>GIÁM ĐỐC ĐIỀU HÀNH VẬN HÀNH (COO / HEAD OF BPO)</span>
                      <span className="text-indigo-600 font-mono">2021 - 2024</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">BPO & CSKH Enterprise Solutions</p>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Lãnh đạo toàn bộ khối vận hành 1,000+ tổng đài viên, triển khai hệ thống AI Chatbot, CRM Omni-Channel và quy trình BCP ứng phó rủi ro vận hành.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-400 pl-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span>TRƯỞNG PHÒNG VẬN HÀNH & BCP RISK MANAGER</span>
                      <span className="text-indigo-600 font-mono">2013 - 2021</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">Prudential Việt Nam & Tập đoàn Tài chính</p>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Quản trị rủi ro vận hành, xây dựng kịch bản duy trì kinh doanh liên tục (BCP), tối ưu hóa chỉ số hài lòng khách hàng CSAT vượt kỳ vọng.
                    </p>
                  </div>

                  <div className="border-l-2 border-indigo-300 pl-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                      <span>QUẢN TRỊ HẠ TẦNG CNTT & CONTACT CENTER</span>
                      <span className="text-indigo-600 font-mono">2003 - 2013</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">STU, Nhất Nghệ & MobiFone</p>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      Hoàn thành Cử nhân CNTT STU, Chứng chỉ Cisco CCNA, Microsoft MCSA, làm nền tảng vững chắc cho hạ tầng kỹ thuật tổng đài.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education & Certificates */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-indigo-800 border-b border-indigo-100 pb-2 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Học vấn & Bằng cấp Chuyên môn</span>
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900">Cử nhân CNTT - STU (2007)</p>
                    <p className="text-[11px] text-slate-600">Lập trình Software & Hệ thống</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900">Quản lý Cấp cao Dale Carnegie (2015)</p>
                    <p className="text-[11px] text-slate-600">Lãnh đạo & Quản trị tổ chức</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900">Big Data & BI Reports (2019)</p>
                    <p className="text-[11px] text-slate-600">Phân tích dữ liệu báo cáo quản trị</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900">Cisco CCNA & Microsoft MCSA</p>
                    <p className="text-[11px] text-slate-600">Quản trị mạng & Máy chủ doanh nghiệp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
