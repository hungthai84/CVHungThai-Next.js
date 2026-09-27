'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const App = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white select-none">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 animate-pulse opacity-80 blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center shadow-xl">
            <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              HT
            </span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-lg font-bold tracking-tight text-white mb-1">
          Nguyễn Hùng Thái Portfolio
        </h1>
        <p className="text-xs text-slate-400 font-medium tracking-wide flex items-center justify-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Đang khởi tạo không gian tương tác...
        </p>
      </div>
    </div>
  ),
});

export default function Page() {
  return <App />;
}

