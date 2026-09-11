import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X, HelpCircle } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "info" | "warning";
  onConfirm: () => void;
  onCancel?: () => void;
}

interface NotificationContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  showConfirm: (options: ConfirmOptions) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmModal, setConfirmModal] = useState<ConfirmOptions | null>(null);

  const showToast = (message: string, type: ToastType = "info", duration: number = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showConfirm = (options: ConfirmOptions) => {
    setConfirmModal(options);
  };

  const handleConfirm = () => {
    if (confirmModal) {
      confirmModal.onConfirm();
    }
    setConfirmModal(null);
  };

  const handleCancel = () => {
    if (confirmModal && confirmModal.onCancel) {
      confirmModal.onCancel();
    }
    setConfirmModal(null);
  };

  return (
    <NotificationContext.Provider value={{ showToast, showConfirm }}>
      {children}

      {/* Modern Flat UI Toast Notification Container */}
      <div className="fixed top-5 right-5 z-[10000] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === "success";
            const isError = toast.type === "error";
            const isWarning = toast.type === "warning";

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border-2 text-sm font-bold shadow-none backdrop-blur-none ${
                  isSuccess
                    ? "bg-[#1abc9c] text-slate-950 border-[#16a085]"
                    : isError
                    ? "bg-[#e74c3c] text-white border-[#c0392b]"
                    : isWarning
                    ? "bg-[#f1c40f] text-slate-950 border-[#d4ac0d]"
                    : "bg-[#3498db] text-white border-[#2980b9]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isSuccess && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                  {isError && <XCircle className="w-5 h-5 shrink-0" />}
                  {isWarning && <AlertTriangle className="w-5 h-5 shrink-0" />}
                  {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 shrink-0" />}
                  <span className="leading-snug">{toast.message}</span>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 rounded-md hover:bg-black/10 active:translate-y-[2px] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modern Flat UI Confirmation Modal */}
      <AnimatePresence>
        {confirmModal && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            {/* Flat Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="fixed inset-0 bg-slate-950/70"
            />

            {/* Flat Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 p-6 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-none z-10 flex flex-col gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 ${
                    confirmModal.type === "danger"
                      ? "bg-[#f5b7b1] dark:bg-[#4c0519] border-[#e74c3c] text-[#e74c3c] dark:text-[#fb7185]"
                      : confirmModal.type === "warning"
                      ? "bg-[#f9e79f] dark:bg-[#452a08] border-[#f1c40f] text-[#b7950b] dark:text-[#fde047]"
                      : "bg-[#aed6f1] dark:bg-[#0f2744] border-[#3498db] text-[#2980b9] dark:text-[#38bdf8]"
                  }`}
                >
                  {confirmModal.type === "danger" ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <HelpCircle className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {confirmModal.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                    {confirmModal.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons with 2D Tactile Active Press */}
              <div className="flex items-center justify-end gap-2.5 mt-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-xs font-bold rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:translate-y-[2px] transition-all"
                >
                  {confirmModal.cancelText || "Hủy bỏ"}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 text-xs font-bold rounded-xl text-white active:translate-y-[2px] transition-all border-2 ${
                    confirmModal.type === "danger"
                      ? "bg-[#e74c3c] border-[#c0392b] hover:bg-[#c0392b]"
                      : "bg-[#1abc9c] border-[#16a085] hover:bg-[#16a085] text-slate-950"
                  }`}
                >
                  {confirmModal.confirmText || "Xác nhận"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
      showToast: (msg: string) => console.log(msg),
      showConfirm: (opt: ConfirmOptions) => opt.onConfirm(),
    };
  }
  return context;
};
