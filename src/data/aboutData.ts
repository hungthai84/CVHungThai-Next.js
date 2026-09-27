export interface ProfileStatBadge {
  id: string;
  metric: string;
  unitVi: string;
  unitEn: string;
  labelVi: string;
  labelEn: string;
  color: string;
  iconName: "BarChart3" | "Building2" | "Bot" | "TrendingUp";
  positionClass: string;
  animationDelay: number;
}

export interface PersonalInfoItem {
  id: string;
  labelVi: string;
  labelEn: string;
  valueVi: string;
  valueEn: string;
  iconName: "User" | "Users" | "Heart" | "Calendar" | "MapPin" | "Home" | "Mail" | "Phone" | "Globe" | "Linkedin";
  type: "text" | "map" | "email" | "phone" | "link";
  href?: string;
  mapQuery?: string;
  mapTitle?: string;
  colorTheme: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    labelColor: string;
    valueColor: string;
    arrowColor: string;
  };
}

export interface ServicePhilosophyValue {
  id: string;
  number: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  titleColor: string;
  borderClass: string;
}

export const ABOUT_PROFILE_STATS: ProfileStatBadge[] = [
  {
    id: "experience",
    metric: "22+",
    unitVi: "Năm",
    unitEn: "Yrs",
    labelVi: "Kinh nghiệm",
    labelEn: "CX & CS Exp",
    color: "#2563eb",
    iconName: "BarChart3",
    positionClass: "top-3 left-3 sm:top-5 sm:left-5 lg:top-6 lg:left-6",
    animationDelay: 0
  },
  {
    id: "environments",
    metric: "8+",
    unitVi: "M.Trường",
    unitEn: "Env.",
    labelVi: "Quy mô",
    labelEn: "Large Scale",
    color: "#9333ea",
    iconName: "Building2",
    positionClass: "top-3 right-3 sm:top-5 sm:right-5 lg:top-6 lg:right-6",
    animationDelay: 0.5
  },
  {
    id: "automation",
    metric: "24/7",
    unitVi: "CRM",
    unitEn: "CRM",
    labelVi: "Tự động",
    labelEn: "Automation",
    color: "#e11d48",
    iconName: "Bot",
    positionClass: "top-1/2 -translate-y-1/2 right-3 sm:right-5 lg:right-6",
    animationDelay: 1.0
  },
  {
    id: "csat",
    metric: "99%",
    unitVi: "CSAT",
    unitEn: "CSAT",
    labelVi: "Hài lòng KH",
    labelEn: "CSAT",
    color: "#059669",
    iconName: "TrendingUp",
    positionClass: "bottom-3 right-3 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6",
    animationDelay: 1.5
  }
];

export const PERSONAL_DEMOGRAPHICS: PersonalInfoItem[] = [
  {
    id: "gender",
    labelVi: "Giới tính",
    labelEn: "Gender",
    valueVi: "Nam giới",
    valueEn: "Male",
    iconName: "User",
    type: "text",
    colorTheme: {
      bg: "bg-blue-50/40 dark:bg-blue-950/20",
      border: "border-blue-100/80 dark:border-blue-900/45 hover:border-blue-300",
      iconBg: "bg-blue-500/15 border-blue-400/30",
      iconColor: "text-blue-600 dark:text-cyan-400",
      labelColor: "text-blue-500",
      valueColor: "text-blue-900 dark:text-cyan-300",
      arrowColor: "text-blue-400"
    }
  },
  {
    id: "ethnicity",
    labelVi: "Dân tộc",
    labelEn: "Ethnicity",
    valueVi: "Kinh",
    valueEn: "Kinh",
    iconName: "Users",
    type: "text",
    colorTheme: {
      bg: "bg-indigo-50/40 dark:bg-indigo-950/20",
      border: "border-indigo-100/80 dark:border-indigo-900/45 hover:border-indigo-300",
      iconBg: "bg-indigo-500/15 border-indigo-400/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      labelColor: "text-indigo-500",
      valueColor: "text-indigo-900 dark:text-indigo-300",
      arrowColor: "text-indigo-400"
    }
  },
  {
    id: "marital_status",
    labelVi: "Tình trạng",
    labelEn: "Status",
    valueVi: "Độc thân",
    valueEn: "Single",
    iconName: "Heart",
    type: "text",
    colorTheme: {
      bg: "bg-rose-50/40 dark:bg-rose-950/20",
      border: "border-rose-100/80 dark:border-rose-900/45 hover:border-rose-300",
      iconBg: "bg-rose-500/15 border-rose-400/30",
      iconColor: "text-rose-600 dark:text-rose-400",
      labelColor: "text-rose-500",
      valueColor: "text-rose-900 dark:text-rose-300",
      arrowColor: "text-rose-400"
    }
  },
  {
    id: "dob",
    labelVi: "Sinh nhật",
    labelEn: "Date of birth",
    valueVi: "22/06/1984",
    valueEn: "22/06/1984",
    iconName: "Calendar",
    type: "text",
    colorTheme: {
      bg: "bg-amber-50/40 dark:bg-amber-950/20",
      border: "border-amber-100/80 dark:border-amber-900/45 hover:border-amber-300",
      iconBg: "bg-amber-500/15 border-amber-400/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      labelColor: "text-amber-500",
      valueColor: "text-amber-900 dark:text-amber-300",
      arrowColor: "text-amber-400"
    }
  },
  {
    id: "temp_address",
    labelVi: "Tạm trú",
    labelEn: "Residence",
    valueVi: "Q7, Hồ Chí Minh",
    valueEn: "District 7, HCMC",
    iconName: "MapPin",
    type: "map",
    mapTitle: "Địa Chỉ Tạm Trú",
    mapQuery: "Chung Cư Tân Mỹ, Quận 7, TP Hồ Chí Minh",
    href: "Chung Cư Tân Mỹ, Q7, TP. Hồ Chí Minh",
    colorTheme: {
      bg: "bg-purple-50/40 dark:bg-purple-950/20",
      border: "border-purple-100/80 dark:border-purple-900/45 hover:border-purple-400",
      iconBg: "bg-purple-500/15 border-purple-400/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      labelColor: "text-purple-500",
      valueColor: "text-purple-900 dark:text-purple-300",
      arrowColor: "text-purple-400"
    }
  },
  {
    id: "perm_address",
    labelVi: "Cư trú",
    labelEn: "Hometown",
    valueVi: "Mỹ Tho, Tiền Giang",
    valueEn: "My Tho, Tien Giang",
    iconName: "Home",
    type: "map",
    mapTitle: "Địa Chỉ Cư Trú",
    mapQuery: "7D7 Hoàng Hoa Thám, Phường Mỹ Tho, Tỉnh Đồng Tháp",
    href: "7D7 Hoàng Hoa Thám, Phường Mỹ Tho, Tỉnh Đồng Tháp",
    colorTheme: {
      bg: "bg-emerald-50/40 dark:bg-emerald-950/20",
      border: "border-emerald-100/80 dark:border-emerald-900/45 hover:border-emerald-400",
      iconBg: "bg-emerald-500/15 border-emerald-400/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      labelColor: "text-emerald-500",
      valueColor: "text-emerald-900 dark:text-emerald-300",
      arrowColor: "text-emerald-400"
    }
  },
  {
    id: "email",
    labelVi: "Email",
    labelEn: "Email",
    valueVi: "hungthai84@gmail.com",
    valueEn: "hungthai84@gmail.com",
    iconName: "Mail",
    type: "email",
    href: "mailto:hungthai84@gmail.com",
    colorTheme: {
      bg: "bg-sky-50/40 dark:bg-sky-950/20",
      border: "border-sky-100/80 dark:border-sky-900/45 hover:border-sky-300",
      iconBg: "bg-sky-500/15 border-sky-400/30",
      iconColor: "text-sky-600 dark:text-cyan-400",
      labelColor: "text-sky-500",
      valueColor: "text-sky-900 dark:text-cyan-300",
      arrowColor: "text-sky-400"
    }
  },
  {
    id: "phone",
    labelVi: "Điện thoại / Zalo",
    labelEn: "Phone / Zalo",
    valueVi: "0909097882",
    valueEn: "0909097882",
    iconName: "Phone",
    type: "phone",
    href: "tel:0909097882",
    colorTheme: {
      bg: "bg-emerald-50/40 dark:bg-emerald-950/20",
      border: "border-emerald-100/80 dark:border-emerald-900/45 hover:border-emerald-300",
      iconBg: "bg-emerald-500/15 border-emerald-400/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      labelColor: "text-emerald-500",
      valueColor: "text-emerald-900 dark:text-emerald-300",
      arrowColor: "text-emerald-400"
    }
  },
  {
    id: "website",
    labelVi: "Website",
    labelEn: "Website",
    valueVi: "nguyenhungthai.powerservice.one",
    valueEn: "nguyenhungthai.powerservice.one",
    iconName: "Globe",
    type: "link",
    href: "https://nguyenhungthai.powerservice.one/",
    colorTheme: {
      bg: "bg-indigo-50/40 dark:bg-indigo-950/20",
      border: "border-indigo-100/80 dark:border-indigo-900/45 hover:border-indigo-300",
      iconBg: "bg-indigo-500/15 border-indigo-400/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      labelColor: "text-indigo-500",
      valueColor: "text-indigo-900 dark:text-indigo-300",
      arrowColor: "text-indigo-400"
    }
  },
  {
    id: "linkedin",
    labelVi: "LinkedIn",
    labelEn: "LinkedIn",
    valueVi: "linkedin.com/in/hungthai84",
    valueEn: "linkedin.com/in/hungthai84",
    iconName: "Linkedin",
    type: "link",
    href: "https://www.linkedin.com/in/hungthai84/",
    colorTheme: {
      bg: "bg-blue-50/40 dark:bg-blue-950/20",
      border: "border-blue-100/80 dark:border-blue-900/45 hover:border-blue-300",
      iconBg: "bg-blue-500/15 border-blue-400/30",
      iconColor: "text-blue-600 dark:text-cyan-400",
      labelColor: "text-blue-500",
      valueColor: "text-blue-900 dark:text-cyan-300",
      arrowColor: "text-blue-400"
    }
  }
];

export const SERVICE_PHILOSOPHY_VALUES: ServicePhilosophyValue[] = [
  {
    id: "efficiency",
    number: "01",
    titleVi: "Hiệu quả",
    titleEn: "Efficiency",
    descVi: "Tối ưu hóa quy trình & chi phí vận hành",
    descEn: "Optimizing process & operational costs",
    bgGradient: "bg-blue-50/50 dark:bg-slate-950",
    badgeBg: "bg-blue-500 text-white",
    badgeText: "text-blue-500",
    titleColor: "text-blue-700 dark:text-cyan-300",
    borderClass: "border-blue-100/50 dark:border-blue-900/40"
  },
  {
    id: "humanity",
    number: "02",
    titleVi: "Nhân văn",
    titleEn: "Humanity",
    descVi: "Thấu cảm sâu sắc, đặt con người làm trọng tâm",
    descEn: "Deep empathy, keeping people at center",
    bgGradient: "bg-purple-50/50 dark:bg-slate-950",
    badgeBg: "bg-purple-500 text-white",
    badgeText: "text-purple-500",
    titleColor: "text-purple-700 dark:text-purple-300",
    borderClass: "border-purple-100/50 dark:border-purple-900/40"
  },
  {
    id: "sustainability",
    number: "03",
    titleVi: "Bền vững",
    titleEn: "Sustainability",
    descVi: "Đồng hành lâu dài, tạo giá trị thực chất",
    descEn: "Long-term partnership, creating real value",
    bgGradient: "bg-emerald-50/50 dark:bg-slate-950",
    badgeBg: "bg-emerald-500 text-white",
    badgeText: "text-emerald-500",
    titleColor: "text-emerald-700 dark:text-emerald-300",
    borderClass: "border-emerald-100/50 dark:border-emerald-900/40"
  }
];
