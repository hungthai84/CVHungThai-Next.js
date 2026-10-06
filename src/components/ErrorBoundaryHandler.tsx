import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundaryHandler extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // If ChunkLoadError (stale dev server chunk or network glitch), reload page once to fetch new chunk manifest
    const isChunkError = 
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Failed to load chunk") ||
      error?.message?.includes("Loading chunk");

    if (isChunkError) {
      const storageKey = "chunk_load_error_reload";
      const lastReload = typeof window !== "undefined" ? sessionStorage.getItem(storageKey) : null;
      if (!lastReload) {
        sessionStorage.setItem(storageKey, Date.now().toString());
        window.location.reload();
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkError = 
        this.state.error?.name === "ChunkLoadError" ||
        this.state.error?.message?.includes("Failed to load chunk");

      return (
        <div className="w-full min-h-[300px] flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-slate-900/80 border border-slate-700 text-white backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {isChunkError ? "Đang làm mới dữ liệu..." : "Đã xảy ra sự cố hiển thị"}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mb-4">
            {isChunkError 
              ? "Trình duyệt đang tải lại module mới nhất từ máy chủ."
              : "Ứng dụng đã tự động khoanh vùng sự cố để không làm gián đoạn trải nghiệm."}
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryHandler;
