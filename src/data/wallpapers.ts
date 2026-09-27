import { BackgroundItem } from "../types/background";

export interface WallpaperCategory {
  id: string;
  labelVi: string;
  labelEn: string;
}

export const WALLPAPER_CATEGORIES: WallpaperCategory[] = [
  { id: "all", labelVi: "Tất cả hình nền", labelEn: "All Wallpapers" },
  { id: "css", labelVi: "Mã CSS Shader", labelEn: "CSS & Shaders" },
  { id: "codepen", labelVi: "CodePen Live", labelEn: "CodePen Interactive" },
  { id: "video", labelVi: "Video Chuyển động", labelEn: "Live Motion Videos" },
  { id: "image", labelVi: "Bộ sưu tập Ảnh 4K", labelEn: "4K Photo Gallery" },
];

export const CSS_PRESET_TEMPLATES = [
  {
    name: "Cực quang Bryce 4 Màu (CodePen)",
    category: "css",
    code: `background-color: #0b0f19;
position: absolute;
inset: 0;
width: 100%;
height: 100%;
overflow: hidden;

&::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000");
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  z-index: 1;
}

&::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 400%;
  opacity: 0.82;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  -webkit-animation: gradient_transition_bryce 15s ease infinite;
  animation: gradient_transition_bryce 15s ease infinite;
  mix-blend-mode: hard-light;
  z-index: 2;
}

@keyframes gradient_transition_bryce {
  0% { top: 0; left: 0; }
  50% { top: -200%; left: -200%; }
  100% { top: 0; left: 0; }
}
@-webkit-keyframes gradient_transition_bryce {
  0% { top: 0; left: 0; }
  50% { top: -200%; left: -200%; }
  100% { top: 0; left: 0; }
}`
  },
  {
    name: "Cực quang Aurora Mesh",
    category: "css",
    code: `background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #064e3b 100%);
position: relative;
box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);`
  },
  {
    name: "Lưới Neon Cyberpunk 3D",
    category: "css",
    code: `background-color: #05050d;
background-image: 
  linear-gradient(rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.25) 0%, transparent 70%);
background-size: 40px 40px, 40px 40px, 100% 100%;`
  },
  {
    name: "Hoàng hôn Sunset Mesh Flow",
    category: "css",
    code: `background: radial-gradient(at 0% 0%, #ff5e62 0px, transparent 50%),
radial-gradient(at 100% 0%, #ff9966 0px, transparent 50%),
radial-gradient(at 100% 100%, #6b11ff 0px, transparent 50%),
radial-gradient(at 0% 100%, #3a1c71 0px, transparent 50%),
#0b0c10;`
  },
  {
    name: "Vũ trụ Sao Cosmic Starfield",
    category: "css",
    code: `background-color: #030014;
background-image: 
  radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(1.5px 1.5px at 40px 70px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(2px 2px at 90px 40px, #f472b6, rgba(0,0,0,0)),
  radial-gradient(ellipse at 70% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 60%),
  radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 60%);
background-size: 150px 150px, 150px 150px, 150px 150px, 100% 100%, 100% 100%;`
  },
  {
    name: "Ma trận Lục bảo Emerald Matrix",
    category: "css",
    code: `background: #022c22;
background-image: 
  radial-gradient(circle at 100% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%),
  radial-gradient(circle at 0% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%),
  radial-gradient(circle at 50% 100%, #10b981 10%, #047857 11%, #047857 23%, #064e3b 24%, #059669 31%, #022c22 44%, transparent 53%);
background-size: 80px 40px;`
  },
  {
    name: "Lăng kính Tối giản Dark Prism",
    category: "css",
    code: `background: radial-gradient(circle at 30% 30%, #312e81 0%, transparent 45%),
radial-gradient(circle at 70% 70%, #4c1d95 0%, transparent 50%),
radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%);`
  }
];

// Permanent default wallpapers data list
// All links checked & updated with durable high-res CDN images and HTML5 MP4 videos
export const PERMANENT_WALLPAPERS_DATA: BackgroundItem[] = [
  {
    id: "css-bryce-4color-gradient",
    name: "Cực quang Bryce 4 Màu (CodePen Animated)",
    url: "css://bryce-4color-gradient",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "codepen", "bryce", "gradient", "animated"],
    cssCode: `background-color: #0b0f19;
position: absolute;
inset: 0;
width: 100%;
height: 100%;
overflow: hidden;

&::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000");
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  z-index: 1;
}

&::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 400%;
  opacity: 0.82;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  -webkit-animation: gradient_transition_bryce 15s ease infinite;
  animation: gradient_transition_bryce 15s ease infinite;
  mix-blend-mode: hard-light;
  z-index: 2;
}

@keyframes gradient_transition_bryce {
  0% { top: 0; left: 0; }
  50% { top: -200%; left: -200%; }
  100% { top: 0; left: 0; }
}`
  },
  {
    id: "css-aurora-borealis",
    name: "Cực quang Aurora CSS (Animated Mesh)",
    url: "css://aurora-borealis",
    previewUrl: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=400",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "aurora", "gradient", "animated"],
    cssCode: `background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #064e3b 100%);
position: relative;
overflow: hidden;
box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);`
  },
  {
    id: "css-cyber-grid",
    name: "Lưới Neon Cyberpunk 3D (CSS Grid)",
    url: "css://cyber-grid",
    previewUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=400",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "cyberpunk", "grid", "neon"],
    cssCode: `background-color: #05050d;
background-image: 
  linear-gradient(rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.2) 0%, transparent 70%);
background-size: 40px 40px, 40px 40px, 100% 100%;`
  },
  {
    id: "css-sunset-mesh",
    name: "Hoàng hôn Sunset Flow (CSS Mesh)",
    url: "css://sunset-mesh",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "sunset", "mesh", "gradient"],
    cssCode: `background: radial-gradient(at 0% 0%, #ff5e62 0px, transparent 50%),
radial-gradient(at 100% 0%, #ff9966 0px, transparent 50%),
radial-gradient(at 100% 100%, #6b11ff 0px, transparent 50%),
radial-gradient(at 0% 100%, #3a1c71 0px, transparent 50%),
#0b0c10;`
  },
  {
    id: "css-deep-space",
    name: "Vũ trụ Sao Cosmic Starfield (CSS Space)",
    url: "css://deep-space",
    previewUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=400",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "space", "stars", "nebula"],
    cssCode: `background-color: #030014;
background-image: 
  radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(1.5px 1.5px at 90px 40px, #f472b6, rgba(0,0,0,0)),
  radial-gradient(ellipse at 70% 30%, rgba(99, 102, 241, 0.25) 0%, transparent 60%),
  radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 60%);
background-size: 150px 150px, 150px 150px, 100% 100%, 100% 100%;`
  },
  {
    id: "css-emerald-matrix",
    name: "Ma trận Lục bảo Isometric (CSS Emerald)",
    url: "css://emerald-matrix",
    previewUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "emerald", "matrix"],
    cssCode: `background: #022c22;
background-image: 
  radial-gradient(circle at 100% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%),
  radial-gradient(circle at 0% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%),
  radial-gradient(circle at 50% 100%, #10b981 10%, #047857 11%, #047857 23%, #064e3b 24%, #059669 31%, #022c22 44%, transparent 53%);
background-size: 80px 40px;`
  },
  {
    id: "codepen-wp-metaballs",
    name: "CodePen WebGL Metaballs (Native)",
    url: "https://codepen.io/TC5550/pen/WNNWoaO",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "metaballs", "webgl", "animated"]
  },
  {
    id: "codepen-wp-aurora",
    name: "CodePen Aurora Shader (Live)",
    url: "https://codepen.io/yuhomyan/pen/OJMejWJ",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "aurora", "shader"]
  },
  {
    id: "codepen-wp-plasma",
    name: "CodePen Plasma Fluid Flow",
    url: "https://codepen.io/RAFA-R3/pen/JjXbWwo",
    previewUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "plasma", "fluid"]
  },
  {
    id: "codepen-wp-neon-grid",
    name: "CodePen Synthwave Cyber Grid",
    url: "https://codepen.io/P1N34PPL3/pen/eYpYmOp",
    previewUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=400",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "synthwave", "cyberpunk"]
  },
  {
    id: "video-wp-aurora-stream",
    name: "Cực quang Chuyển động Aurora Stream 4K",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    previewUrl: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=400",
    type: "video",
    category: "video",
    isCustom: false,
    tags: ["video", "aurora", "motion", "4k"]
  },
  {
    id: "video-wp-cosmic-flow",
    name: "Dải Ngân hà Cosmic Flow Motion HD",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    previewUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=400",
    type: "video",
    category: "video",
    isCustom: false,
    tags: ["video", "cosmic", "space"]
  },
  {
    id: "img-wp-clay-art",
    name: "Hình nền Claymorphism Soft Art",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
    type: "image",
    category: "image",
    isCustom: false,
    tags: ["image", "clay", "art", "4k"]
  },
  {
    id: "img-wp-minimal-white",
    name: "Không gian Trắng Tối giản Minimalist",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920",
    previewUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400",
    type: "image",
    category: "image",
    isCustom: false,
    tags: ["image", "minimal", "white", "4k"]
  },
  {
    id: "img-wp-pearlescent",
    name: "Hoàng hôn Ánh sáng Pearlescent Hues",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1920",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400",
    type: "image",
    category: "image",
    isCustom: false,
    tags: ["image", "sunset", "abstract", "4k"]
  },
  {
    id: "img-wp-geometric-mountain",
    name: "Dãy núi Hình học Geometric Mountain",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920",
    previewUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400",
    type: "image",
    category: "image",
    isCustom: false,
    tags: ["image", "mountain", "nature", "4k"]
  },
  {
    id: "img-wp-cyber-city",
    name: "Thành phố Đêm Neon Cyberpunk",
    url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1920",
    previewUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=400",
    type: "image",
    category: "image",
    isCustom: false,
    tags: ["image", "cyberpunk", "neon", "city", "4k"]
  },
  {
    id: "img-wp-calm-lake",
    name: "Hồ nước Tĩnh lặng Calm Reflection",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920",
    previewUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
    type: "image",
    category: "image",
    isCustom: false,
    tags: ["image", "nature", "water", "calm", "4k"]
  }
];
