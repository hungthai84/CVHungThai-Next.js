'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error in page:', error);
    if (error?.message?.includes('ChunkLoadError') || error?.message?.includes('Failed to load chunk')) {
      const hasReloaded = sessionStorage.getItem('chunk_error_reloaded');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk_error_reloaded', 'true');
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">
        Đang tải lại giao diện / Loading Interface
      </h2>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        Hệ thống đang đồng bộ dữ liệu giao diện. Vui lòng bấm thử lại để tải lại phiên làm việc.
      </p>
      <button
        onClick={() => {
          sessionStorage.removeItem('chunk_error_reloaded');
          window.location.reload();
        }}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer"
      >
        Tải lại giao diện (Try Again)
      </button>
    </div>
  );
}
