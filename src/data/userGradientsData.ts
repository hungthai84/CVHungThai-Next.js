export interface UserGradientItem {
  id: number;
  classId: string;
  name: string;
  nameVi: string;
  start: string;
  startText: string;
  end: string;
  endText: string;
  category: "green" | "blue" | "purple" | "pink" | "neutral";
  categoryVi: string;
  angle: number; // 33deg
  css: string;
}

export const USER_GRADIENTS: UserGradientItem[] = [
  {
    id: 0,
    classId: "gradient--0",
    name: "Fresh Lime Meadow",
    nameVi: "00 🌿 Xanh Chồi Non & Vàng Chanh",
    start: "#6DE195",
    startText: "#6DE195",
    end: "#C4E759",
    endText: "#C4E759",
    category: "green",
    categoryVi: "Xanh lá / Sinh thái",
    angle: 33,
    css: "linear-gradient(33deg, #6DE195, #C4E759)"
  },
  {
    id: 1,
    classId: "gradient--1",
    name: "Mint Emerald",
    nameVi: "01 🍃 Bạc Hà & Ngọc Lục Bảo",
    start: "#41C7AF",
    startText: "#41C7AF",
    end: "#54E38E",
    endText: "#54E38E",
    category: "green",
    categoryVi: "Xanh lá / Sinh thái",
    angle: 33,
    css: "linear-gradient(33deg, #41C7AF, #54E38E)"
  },
  {
    id: 2,
    classId: "gradient--2",
    name: "Pastel Pistachio",
    nameVi: "02 🍈 Hạt Dẻ Cười & Táo Xanh",
    start: "#99E5A2",
    startText: "#99E5A2",
    end: "#D4FC78",
    endText: "#D4FC78",
    category: "green",
    categoryVi: "Xanh lá / Sinh thái",
    angle: 33,
    css: "linear-gradient(33deg, #99E5A2, #D4FC78)"
  },
  {
    id: 3,
    classId: "gradient--3",
    name: "Baby Sky Blue",
    nameVi: "03 ☁️ Xanh Da Trời & Mây Sáng",
    start: "#ABC7FF",
    startText: "#ABC7FF",
    end: "#C1E3FF",
    endText: "#C1E3FF",
    category: "blue",
    categoryVi: "Xanh dương / Bầu trời",
    angle: 33,
    css: "linear-gradient(33deg, #ABC7FF, #C1E3FF)"
  },
  {
    id: 4,
    classId: "gradient--4",
    name: "Ocean Breeze",
    nameVi: "04 🌊 Gió Biển & Xanh Ngọc Bích",
    start: "#6CACFF",
    startText: "#6CACFF",
    end: "#8DEBFF",
    endText: "#8DEBFF",
    category: "blue",
    categoryVi: "Xanh dương / Bầu trời",
    angle: 33,
    css: "linear-gradient(33deg, #6CACFF, #8DEBFF)"
  },
  {
    id: 5,
    classId: "gradient--5",
    name: "Cobalt Cyan Electric",
    nameVi: "05 ⚡ Xanh Coban & Lam Ngọc Điện Tử",
    start: "#5583EE",
    startText: "#5583EE",
    end: "#41D8DD",
    endText: "#41D8DD",
    category: "blue",
    categoryVi: "Xanh dương / Bầu trời",
    angle: 33,
    css: "linear-gradient(33deg, #5583EE, #41D8DD)"
  },
  {
    id: 6,
    classId: "gradient--6",
    name: "Soft Lavender Orchid",
    nameVi: "06 🌸 Tím Oải Hương & Lan Hồ Điệp",
    start: "#A16BFE",
    startText: "#A16BFE",
    end: "#DEB0DF",
    endText: "#DEB0DF",
    category: "purple",
    categoryVi: "Tím / Huyền bí",
    angle: 33,
    css: "linear-gradient(33deg, #A16BFE, #DEB0DF)"
  },
  {
    id: 7,
    classId: "gradient--7",
    name: "Warm Sunset Peach",
    nameVi: "07 🍑 Hoàng Hôn Đào & Hồng Phấn",
    start: "#D279EE",
    startText: "#D279EE",
    end: "#F8C390",
    endText: "#F8C390",
    category: "pink",
    categoryVi: "Hồng / Cam đào",
    angle: 33,
    css: "linear-gradient(33deg, #D279EE, #F8C390)"
  },
  {
    id: 8,
    classId: "gradient--8",
    name: "Rose Coral Sun",
    nameVi: "08 🌅 San Hô Hồng & Ánh Dương Vàng",
    start: "#F78FAD",
    startText: "#F78FAD",
    end: "#FDEB82",
    endText: "#FDEB82",
    category: "pink",
    categoryVi: "Hồng / Cam đào",
    angle: 33,
    css: "linear-gradient(33deg, #F78FAD, #FDEB82)"
  },
  {
    id: 9,
    classId: "gradient--9",
    name: "Crimson Flame Purple",
    nameVi: "09 🔥 Lửa Đỏ Thẫm & Tím Hoàng Gia",
    start: "#BC3D2F",
    startText: "#BC3D2F",
    end: "#A16BFE",
    endText: "#A16BFE",
    category: "purple",
    categoryVi: "Tím / Huyền bí",
    angle: 33,
    css: "linear-gradient(33deg, #BC3D2F, #A16BFE)"
  },
  {
    id: 10,
    classId: "gradient--10",
    name: "Deep Berry Fuchsia",
    nameVi: "10 🍇 Dâu Rừng Đậm & Hồng Sen Sáng",
    start: "#A43AB2",
    startText: "#A43AB2",
    end: "#E13680",
    endText: "#E13680",
    category: "pink",
    categoryVi: "Hồng / Cam đào",
    angle: 33,
    css: "linear-gradient(33deg, #A43AB2, #E13680)"
  },
  {
    id: 11,
    classId: "gradient--11",
    name: "Plum Blush Rose",
    nameVi: "11 🍷 Mận Chín & Cánh Hồng E Ấp",
    start: "#9D2E7D",
    startText: "#9D2E7D",
    end: "#E16E93",
    endText: "#E16E93",
    category: "pink",
    categoryVi: "Hồng / Cam đào",
    angle: 33,
    css: "linear-gradient(33deg, #9D2E7D, #E16E93)"
  },
  {
    id: 12,
    classId: "gradient--12",
    name: "Lilac Pearl Mist",
    nameVi: "12 🪻 Sương Ngọc Trai & Tím Nhạt Tinh Khôi",
    start: "#F5CCF6",
    startText: "#F5CCF6",
    end: "#F1EEF9",
    endText: "#F1EEF9",
    category: "neutral",
    categoryVi: "Trung tính / Tối giản",
    angle: 33,
    css: "linear-gradient(33deg, #F5CCF6, #F1EEF9)"
  },
  {
    id: 13,
    classId: "gradient--13",
    name: "Clean Cloud Silk",
    nameVi: "13 🕊️ Lụa Trắng Mây & Tinh Khiết Tối Giản",
    start: "#F0EFF0",
    startText: "#F0EFF0",
    end: "#FAF8F9",
    endText: "#FAF8F9",
    category: "neutral",
    categoryVi: "Trung tính / Tối giản",
    angle: 33,
    css: "linear-gradient(33deg, #F0EFF0, #FAF8F9)"
  },
  {
    id: 14,
    classId: "gradient--14",
    name: "Midnight Charcoal Onyx",
    nameVi: "14 🌑 Than Đêm Huyền Bí & Đá Onyx Thẫm",
    start: "#121317",
    startText: "#121317",
    end: "#323B42",
    endText: "#323B42",
    category: "neutral",
    categoryVi: "Trung tính / Tối giản",
    angle: 33,
    css: "linear-gradient(33deg, #121317, #323B42)"
  }
];

export const WEBSITE_BASE_BACKGROUND = "#ECEFFC";
