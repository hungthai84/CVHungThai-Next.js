# Nguyễn Hùng Thái — Interactive Portfolio

Portfolio tương tác xây dựng với Next.js, React, TypeScript, Tailwind CSS và Motion.
Website tập trung vào hành trình nghề nghiệp, năng lực Customer Experience / Contact Center,
các dự án chuyển đổi số và định hướng Head of CS / CS Director 2026+.

## Run Locally

**Prerequisites:**  Node.js


1. Cài dependencies: `npm install`
2. (Tuỳ chọn) Sao chép `.env.example` thành `.env.local` và thêm `GEMINI_API_KEY` để bật các tính năng AI.
3. Chạy môi trường phát triển: `npm run dev`
4. Kiểm tra TypeScript: `npm run lint`
5. Build production: `npm run build`

Ứng dụng dùng một route Next.js chính (`/`) với điều hướng section bằng hash như
`#experience`, `#projects` và `#contact`. Danh sách route được khai báo tại
`public/manus-routes.json`.
