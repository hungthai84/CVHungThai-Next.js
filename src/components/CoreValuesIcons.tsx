import React from "react";

interface CoreValueIconProps {
  className?: string;
}

// 1. Icon Tận Tâm: Hai bàn tay nâng niu trái tim, màu xanh tím (Indigo / Royal Blue)
export const DedicatedHeartIcon: React.FC<CoreValueIconProps> = ({ className = "w-14 h-14" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none transition-transform duration-300 group-hover:scale-105`}
  >
    {/* Trái tim ở trên */}
    <path 
      d="M50 42 C47 33 37 24 27 30 C17 37 19 50 31 60 L50 75 L69 60 C81 50 83 37 73 30 C63 24 53 33 50 42 Z" 
      fill="#EEF2FF" 
      stroke="#4F46E5" 
      strokeWidth="5.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Bàn tay trái đỡ */}
    <path 
      d="M17 63 C22 60 28 61 36 66 L44 71 C41 75 34 77 28 75 L20 71 C16 69 15 65 17 63 Z" 
      fill="#4F46E5" 
    />
    <path 
      d="M15 67 C21 74 31 81 45 83 C47 83 49 81 48 79 C43 77 36 73 32 69" 
      stroke="#4F46E5" 
      strokeWidth="4.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />

    {/* Bàn tay phải đỡ */}
    <path 
      d="M83 63 C78 60 72 61 64 66 L56 71 C59 75 66 77 72 75 L80 71 C84 69 85 65 83 63 Z" 
      fill="#4F46E5" 
    />
    <path 
      d="M85 67 C79 74 69 81 55 83 C53 83 51 81 52 79 C57 77 64 73 68 69" 
      stroke="#4F46E5" 
      strokeWidth="4.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />

    {/* Đường vòng ôm phía dưới */}
    <path 
      d="M21 65 C27 77 39 86 50 86 C61 86 73 77 79 65" 
      stroke="#4F46E5" 
      strokeWidth="4" 
      strokeLinecap="round" 
      fill="none" 
    />
  </svg>
);

// 2. Icon Chuyên Nghiệp: Bia ngắm mục tiêu 3 vòng tròn với phi tiêu/mũi tên cắm vào tâm, màu tím
export const TargetProfessionalIcon: React.FC<CoreValueIconProps> = ({ className = "w-14 h-14" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none transition-transform duration-300 group-hover:scale-105`}
  >
    {/* Vòng tròn ngoài của bia ngắm */}
    <circle cx="45" cy="55" r="34" stroke="#8B5CF6" strokeWidth="5.5" fill="none" opacity="0.9" />
    
    {/* Vòng tròn giữa */}
    <circle cx="45" cy="55" r="23" stroke="#7C3AED" strokeWidth="5" fill="none" />
    
    {/* Vòng tròn tâm hồng tâm */}
    <circle cx="45" cy="55" r="11" fill="#6D28D9" stroke="#5B21B6" strokeWidth="2.5" />
    <circle cx="45" cy="55" r="4" fill="#FFFFFF" />

    {/* Thân mũi tên phi tiêu cắm từ góc trên bên phải */}
    <line x1="84" y1="16" x2="48" y2="52" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
    
    {/* Đầu mũi tên cắm vào tâm */}
    <path d="M47 53 L58 43 L44 45 Z" fill="#6D28D9" stroke="#6D28D9" strokeWidth="1.5" strokeLinejoin="round" />
    
    {/* Cánh lông đuôi phi tiêu */}
    <path d="M84 16 L72 16 L78 22 Z" fill="#8B5CF6" />
    <path d="M84 16 L84 28 L78 22 Z" fill="#6D28D9" />
    <path d="M88 12 L76 12 L82 18 Z" fill="#A78BFA" />
    <path d="M88 12 L88 24 L82 18 Z" fill="#7C3AED" />
  </svg>
);

// 3. Icon Đổi Mới: Bóng đèn tròn phát sáng với các tia hào quang xung quanh, màu vàng cam
export const InnovationBulbIcon: React.FC<CoreValueIconProps> = ({ className = "w-14 h-14" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none transition-transform duration-300 group-hover:scale-105`}
  >
    {/* Thân bóng đèn phát sáng màu cam */}
    <path 
      d="M50 23 C37 23 27 33 27 46 C27 55 33 61 37 67 C39 70 40 73 40 76 L60 76 C60 73 61 70 63 67 C67 61 73 55 73 46 C73 33 63 23 50 23 Z" 
      fill="#F59E0B" 
      stroke="#D97706" 
      strokeWidth="3.5" 
    />
    
    {/* Sợi đốt bên trong nhẹ */}
    <path 
      d="M44 48 C44 42 47 38 50 38 C53 38 56 42 56 48 L44 48 Z" 
      fill="#FEF3C7" 
      opacity="0.8" 
    />
    
    {/* Đuôi vặn bóng đèn */}
    <rect x="42" y="78" width="16" height="4" rx="2" fill="#D97706" />
    <rect x="43" y="84" width="14" height="4" rx="2" fill="#B45309" />
    <path d="M46 90 C46 92 54 92 54 90 Z" fill="#78350F" />

    {/* Các tia sáng phát ra xung quanh */}
    <line x1="50" y1="8" x2="50" y2="15" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <line x1="25" y1="18" x2="31" y2="24" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <line x1="75" y1="18" x2="69" y2="24" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <line x1="13" y1="45" x2="20" y2="45" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <line x1="87" y1="45" x2="80" y2="45" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <line x1="20" y1="69" x2="26" y2="64" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <line x1="80" y1="69" x2="74" y2="64" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// 4. Icon Đồng Hành: Hai bàn tay siết chặt bắt tay nhau, màu xanh lá cây
export const PartnershipHandshakeIcon: React.FC<CoreValueIconProps> = ({ className = "w-14 h-14" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none transition-transform duration-300 group-hover:scale-105`}
  >
    {/* Bàn tay trái vươn xuống */}
    <path 
      d="M16 38 L32 26 C35 24 39 25 41 28 L47 36 L34 47 L23 44 L16 38 Z" 
      fill="#10B981" 
    />
    
    {/* Cổ tay áo bên trái */}
    <path 
      d="M12 36 L24 27 L20 22 L8 31 Z" 
      fill="#059669" 
    />

    {/* Bàn tay phải vươn lên */}
    <path 
      d="M84 62 L68 74 C65 76 61 75 59 72 L53 64 L66 53 L77 56 L84 62 Z" 
      fill="#10B981" 
    />
    
    {/* Cổ tay áo bên phải */}
    <path 
      d="M88 64 L76 73 L80 78 L92 69 Z" 
      fill="#059669" 
    />

    {/* Ngón cái và lòng bàn tay trái */}
    <path 
      d="M41 33 C45 36 50 43 53 48 L46 54 C42 49 37 43 35 38 Z" 
      fill="#34D399" 
    />
    
    {/* Các ngón tay bên phải khum lại */}
    <path 
      d="M47 38 C52 35 58 39 61 44 L49 56 C46 52 44 45 47 38 Z" 
      fill="#059669" 
    />
    
    {/* 4 ngón tay gập ôm nhau ở giữa */}
    <rect x="42" y="44" width="7" height="15" rx="3.5" transform="rotate(-35 42 44)" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
    <rect x="48" y="40" width="7" height="15" rx="3.5" transform="rotate(-35 48 40)" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
    <rect x="54" y="36" width="7" height="15" rx="3.5" transform="rotate(-35 54 36)" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
    <rect x="60" y="32" width="7" height="14" rx="3.5" transform="rotate(-35 60 32)" fill="#10B981" stroke="#047857" strokeWidth="1.5" />

    {/* Viền định hình ngoài */}
    <path 
      d="M32 26 L42 35 C48 40 55 46 62 52 L68 74" 
      stroke="#047857" 
      strokeWidth="3.2" 
      strokeLinecap="round" 
      fill="none" 
    />
    <path 
      d="M68 74 L58 65 C52 60 45 54 38 48 L32 26" 
      stroke="#047857" 
      strokeWidth="3.2" 
      strokeLinecap="round" 
      fill="none" 
    />
  </svg>
);

// 5. Đồ họa 3D Biểu đồ bậc thang & Mũi tên tăng trưởng hồng tím
export const GrowthChart3DIcon: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <svg 
    viewBox="0 0 280 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none`}
  >
    <defs>
      {/* Gradients cho các cột 3D */}
      <linearGradient id="gCol1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
      <linearGradient id="gCol2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A5B4FC" />
        <stop offset="100%" stopColor="#818CF8" />
      </linearGradient>
      <linearGradient id="gCol3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <linearGradient id="gCol4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E879F9" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>
      <linearGradient id="gCol5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>

      {/* Gradients cho Mũi tên 3D */}
      <linearGradient id="gArrowFront" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>
      <linearGradient id="gArrowSide" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#DB2777" />
        <stop offset="100%" stopColor="#9333EA" />
      </linearGradient>
      
      <filter id="softArrowGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#EC4899" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* Bóng mờ đáy */}
    <ellipse cx="140" cy="182" rx="118" ry="12" fill="#000000" opacity="0.06" />

    {/* CỘT 1 (Bậc thấp nhất) */}
    <g transform="translate(30, 130)">
      <rect x="0" y="0" width="22" height="42" rx="2" fill="url(#gCol1)" />
      <polygon points="0,0 8,-8 30,-8 22,0" fill="#DBEAFE" />
      <polygon points="22,0 30,-8 30,34 22,42" fill="#3B82F6" opacity="0.85" />
    </g>

    {/* CỘT 2 */}
    <g transform="translate(68, 110)">
      <rect x="0" y="0" width="22" height="62" rx="2" fill="url(#gCol2)" />
      <polygon points="0,0 8,-8 30,-8 22,0" fill="#E0E7FF" />
      <polygon points="22,0 30,-8 30,54 22,62" fill="#6366F1" opacity="0.85" />
    </g>

    {/* CỘT 3 */}
    <g transform="translate(106, 88)">
      <rect x="0" y="0" width="22" height="84" rx="2" fill="url(#gCol3)" />
      <polygon points="0,0 8,-8 30,-8 22,0" fill="#EDE9FE" />
      <polygon points="22,0 30,-8 30,76 22,84" fill="#8B5CF6" opacity="0.85" />
    </g>

    {/* CỘT 4 */}
    <g transform="translate(144, 64)">
      <rect x="0" y="0" width="22" height="108" rx="2" fill="url(#gCol4)" />
      <polygon points="0,0 8,-8 30,-8 22,0" fill="#FCE7F3" />
      <polygon points="22,0 30,-8 30,100 22,108" fill="#D946EF" opacity="0.85" />
    </g>

    {/* CỘT 5 (Bậc cao nhất) */}
    <g transform="translate(182, 38)">
      <rect x="0" y="0" width="24" height="134" rx="2" fill="url(#gCol5)" />
      <polygon points="0,0 8,-8 32,-8 24,0" fill="#FDF2F8" />
      <polygon points="24,0 32,-8 32,126 24,134" fill="#A21CAF" opacity="0.9" />
    </g>

    {/* MŨI TÊN 3D UỐN CONG VÚT LÊN */}
    <g filter="url(#softArrowGlow)">
      {/* Mặt bên 3D của thân mũi tên */}
      <path 
        d="M 22 152 Q 95 130 160 76 L 208 42 L 206 50 L 158 84 Q 93 138 22 160 Z" 
        fill="url(#gArrowSide)" 
      />

      {/* Mặt trên chính của thân mũi tên */}
      <path 
        d="M 22 146 Q 95 124 160 70 L 208 36 L 208 42 L 160 76 Q 95 130 22 152 Z" 
        fill="url(#gArrowFront)" 
      />

      {/* Đầu mũi tên 3D to bản */}
      <polygon points="208,42 258,22 252,66 234,44 208,60" fill="url(#gArrowSide)" />
      <polygon points="208,36 258,16 252,60 234,38 208,54" fill="url(#gArrowFront)" />
      <polygon points="208,36 258,16 258,22 208,42" fill="#FDF2F8" opacity="0.8" />
    </g>
  </svg>
);
