'use client';

import React, { useState, useEffect } from 'react';
import App from '../src/App';
import ErrorBoundaryHandler from '../src/components/ErrorBoundaryHandler';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F7FB] text-slate-900 select-none">
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00B8D9] via-[#3B82F6] to-[#8B5CF6] animate-pulse opacity-80 blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-white/80 border border-white/80 flex items-center justify-center shadow-xl backdrop-blur-md">
              <span className="text-xl font-black bg-gradient-to-r from-[#00B8D9] to-[#8B5CF6] bg-clip-text text-transparent">
                HT
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight text-[#172033] mb-1">
            Nguyễn Hùng Thái Portfolio
          </h1>
          <p className="text-xs text-slate-500 font-medium tracking-wide flex items-center justify-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
            Đang tải không gian tương tác...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundaryHandler>
      <App />
    </ErrorBoundaryHandler>
  );
}




