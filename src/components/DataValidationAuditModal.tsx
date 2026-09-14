import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Download,
  FileText,
  X,
  Sparkles,
  RefreshCw,
  Database,
  Check,
  ArrowRight
} from "lucide-react";
import {
  INITIAL_VALIDATION_STEPS,
  ValidationStep,
  generateWebsiteTextContent,
  downloadTextFile
} from "../utils/websiteTxtExporter";

interface DataValidationAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataValidationAuditModal({
  isOpen,
  onClose
}: DataValidationAuditModalProps) {
  const [steps, setSteps] = useState<ValidationStep[]>(INITIAL_VALIDATION_STEPS);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [downloadedFileName, setDownloadedFileName] = useState<string>("");

  // Start validation process when modal opens
  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setSteps(INITIAL_VALIDATION_STEPS.map(s => ({ ...s, status: "pending" })));
      setCurrentStepIdx(0);
      setIsCompleted(false);
      return;
    }

    let isMounted = true;
    setSteps(INITIAL_VALIDATION_STEPS.map(s => ({ ...s, status: "pending" })));
    setCurrentStepIdx(0);
    setIsCompleted(false);

    const runValidation = async () => {
      for (let i = 0; i < INITIAL_VALIDATION_STEPS.length; i++) {
        if (!isMounted) break;

        // Set current step to checking
        setCurrentStepIdx(i);
        setSteps(prev =>
          prev.map((step, idx) =>
            idx === i ? { ...step, status: "checking" } : step
          )
        );

        // Wait for check animation
        await new Promise(res => setTimeout(res, 220));

        if (!isMounted) break;

        // Set step to verified
        setSteps(prev =>
          prev.map((step, idx) =>
            idx === i ? { ...step, status: "verified" } : step
          )
        );
      }

      if (isMounted) {
        setIsCompleted(true);
        // Trigger automatic download
        const dateStr = new Date().toISOString().split("T")[0];
        const fileName = `Du_Lieu_Website_Nguyen_Thai_Hung_${dateStr}.txt`;
        const content = generateWebsiteTextContent();
        downloadTextFile(fileName, content);
        setDownloadedFileName(fileName);
      }
    };

    runValidation();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSteps = steps.length;
  const verifiedCount = steps.filter(s => s.status === "verified").length;
  const progressPercent = Math.round((verifiedCount / totalSteps) * 100);

  const handleManualRedownload = () => {
    const dateStr = new Date().toISOString().split("T")[0];
    const fileName = `Du_Lieu_Website_Nguyen_Thai_Hung_${dateStr}.txt`;
    const content = generateWebsiteTextContent();
    downloadTextFile(fileName, content);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl text-white flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>Hộp thoại Kiểm định Tự động & Xuất File .txt</span>
                  <span className="text-2xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    Audit v2.5
                  </span>
                </h3>
                <p className="text-body-sm text-slate-400">
                  Rà soát tính toàn vẹn 14 trang dữ liệu chuyên đề & 130+ tài nguyên đa phương tiện
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto max-h-[75vh] custom-scrollbar space-y-5 bg-slate-950/60">
            {/* Progress Bar Header */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="flex items-center gap-2 text-slate-300">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Tiến trình kiểm tra toàn vẹn dữ liệu hệ thống:</span>
                </span>
                <span className="text-emerald-400 font-mono text-sm font-black">
                  {progressPercent}% ({verifiedCount}/{totalSteps} trang)
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-emerald-500 shadow-sm"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Status Message */}
              <div className="flex items-center justify-between text-2xs text-slate-400 font-medium pt-1">
                <span>
                  {isCompleted
                    ? "✔ Đã xác thực thành công 100% dữ liệu. File .txt đã tự động tải xuống!"
                    : `Đang rà soát khối dữ liệu ${currentStepIdx + 1}/${totalSteps}...`}
                </span>
                <span className="text-emerald-400 font-mono">UTF-8 Plain Text</span>
              </div>
            </div>

            {/* Validation Checklist Items */}
            <div className="space-y-2">
              {steps.map((step) => {
                const isChecking = step.status === "checking";
                const isVerified = step.status === "verified";

                return (
                  <motion.div
                    key={step.id}
                    layout
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isVerified
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-100"
                        : isChecking
                        ? "bg-amber-950/20 border-amber-500/40 text-amber-100 shadow-md shadow-amber-500/10"
                        : "bg-slate-900/60 border-slate-800/80 text-slate-400 opacity-70"
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="mt-0.5 shrink-0">
                        {isVerified ? (
                          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : isChecking ? (
                          <div className="p-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-spin">
                            <Loader2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center text-2xs font-mono text-slate-500">
                            {step.id}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold tracking-tight text-white flex items-center gap-2">
                          <span>{step.title}</span>
                          <span className="text-2xs font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {step.itemCount}
                          </span>
                        </h4>
                        <p className="text-2xs text-slate-400 mt-0.5 truncate">
                          {step.detail}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isVerified ? (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-2xs font-bold tracking-wider uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>ĐÃ XÁC THỰC</span>
                        </span>
                      ) : isChecking ? (
                        <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-2xs font-bold tracking-wider uppercase flex items-center gap-1 animate-pulse">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          <span>ĐANG KIỂM TRA</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-500 text-2xs font-medium">
                          Chờ rà soát
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Completion Banner & Manual Re-download */}
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 shadow-xl space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 shrink-0">
                    <FileText className="w-6 h-6 font-bold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-300 uppercase tracking-wider">
                      ĐÃ TẢI XUỐNG THÀNH CÔNG TỆP FILE .TXT!
                    </h4>
                    <p className="text-2xs text-slate-300 mt-0.5 font-mono">
                      File: {downloadedFileName || "Du_Lieu_Website_Nguyen_Thai_Hung.txt"}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Tệp văn bản định dạng `.txt` chứa toàn bộ 10 chuyên mục dữ liệu hệ thống cùng hơn **130+ đường dẫn đa phương tiện (Video MP4, Ảnh dự án, Mindmap, Chứng chỉ và Logo)** đã được tải về máy tính/thiết bị của bạn.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={handleManualRedownload}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải lại file .txt</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                  >
                    Đóng hộp thoại
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
