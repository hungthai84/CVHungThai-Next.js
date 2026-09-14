export const dynamic = 'force-dynamic';
import React from 'react'

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>404 - Không tìm thấy trang</h2>
      <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <a href="/" style={{ color: '#0066ff', textDecoration: 'underline' }}>Quay lại trang chủ</a>
    </div>
  )
}
