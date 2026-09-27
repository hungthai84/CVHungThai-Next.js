'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
        <h2 className="text-xl font-bold mb-2">Đã có lỗi xảy ra / Something went wrong</h2>
        <p className="text-sm text-slate-400 mb-4">{error?.message || 'Lỗi hệ thống'}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          Thử lại / Try again
        </button>
      </body>
    </html>
  );
}
