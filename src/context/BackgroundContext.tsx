import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BackgroundItem, BackgroundConfig, BackgroundType } from "../types/background";

// Initial wallpapers imported directly from user's JSON
export const INITIAL_WALLPAPERS_FROM_JSON: BackgroundItem[] = [
  {
    id: "css-bryce-4color-gradient",
    name: "Cực quang Bryce 4 Màu (CodePen Animated)",
    url: "css://bryce-4color-gradient",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "codepen", "bryce", "gradient", "animated", "4colors", "grayscale"],
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
}
@-webkit-keyframes gradient_transition_bryce {
  0% { top: 0; left: 0; }
  50% { top: -200%; left: -200%; }
  100% { top: 0; left: 0; }
}`
  },
  {
    id: "css-aurora-borealis",
    name: "Cực quang Aurora CSS (Animated Mesh)",
    url: "css://aurora-borealis",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "aurora", "gradient", "animated", "dynamic"],
    cssCode: `background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #064e3b 100%);
position: relative;
overflow: hidden;
box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);`
  },
  {
    id: "css-cyber-grid",
    name: "Lưới Neon Cyberpunk 3D (CSS Grid)",
    url: "css://cyber-grid",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "cyberpunk", "grid", "neon", "matrix"],
    cssCode: `background-color: #05050d;
background-image: 
  linear-gradient(rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.2) 0%, transparent 70%);
background-size: 40px 40px, 40px 40px, 100% 100%;
background-position: center center;`
  },
  {
    id: "css-sunset-mesh",
    name: "Hoàng hôn Sunset Flow (CSS Mesh)",
    url: "css://sunset-mesh",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "sunset", "mesh", "gradient", "warm"],
    cssCode: `background: radial-gradient(at 0% 0%, #ff5e62 0px, transparent 50%),
radial-gradient(at 100% 0%, #ff9966 0px, transparent 50%),
radial-gradient(at 100% 100%, #6b11ff 0px, transparent 50%),
radial-gradient(at 0% 100%, #3a1c71 0px, transparent 50%),
radial-gradient(at 50% 50%, #1e130c 0px, transparent 50%),
#0b0c10;`
  },
  {
    id: "css-deep-space",
    name: "Vũ trụ Sao Cosmic Starfield (CSS Space)",
    url: "css://deep-space",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "space", "stars", "nebula", "galaxy"],
    cssCode: `background-color: #030014;
background-image: 
  radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(1px 1px at 50px 160px, #a5b4fc, rgba(0,0,0,0)),
  radial-gradient(1.5px 1.5px at 90px 40px, #f472b6, rgba(0,0,0,0)),
  radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(1.5px 1.5px at 160px 120px, #38bdf8, rgba(0,0,0,0)),
  radial-gradient(ellipse at 70% 30%, rgba(99, 102, 241, 0.25) 0%, transparent 60%),
  radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 60%);
background-size: 200px 200px, 200px 200px, 200px 200px, 200px 200px, 200px 200px, 200px 200px, 100% 100%, 100% 100%;`
  },
  {
    id: "css-emerald-matrix",
    name: "Ma trận Lục bảo Isometric (CSS Emerald)",
    url: "css://emerald-matrix",
    type: "css",
    category: "css",
    isCustom: false,
    tags: ["css", "emerald", "matrix", "geometric"],
    cssCode: `background: #022c22;
background-image: 
  radial-gradient(circle at 100% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%, transparent),
  radial-gradient(circle at 0% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%, transparent),
  radial-gradient(circle at 50% 100%, #10b981 10%, #047857 11%, #047857 23%, #064e3b 24%, #064e3b 30%, #059669 31%, #059669 43%, #022c22 44%, #022c22 52%, transparent 53%, transparent);
background-size: 80px 40px;`
  },
  {
    id: "animated-gradient-codepen",
    name: "Cực quang Tam sắc (Animated Gradient)",
    url: "animated-gradient",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=200",
    type: "animated-gradient",
    category: "gradient",
    isCustom: false,
    tags: ["custom", "codepen", "gradient", "animated", "dynamic"]
  },
  {
    id: "beach-wave-codepen",
    name: "Sóng Biển (CodePen Interactive)",
    url: "beach",
    previewUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200",
    type: "beach",
    category: "custom",
    isCustom: true,
    tags: ["custom", "codepen", "wave", "beach", "dynamic"]
  },
  {
    id: "codepen-wp-metaballs",
    name: "CodePen WebGL Metaballs (Native)",
    url: "https://codepen.io/TC5550/pen/WNNWoaO",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "metaballs", "webgl", "animated", "fluid"]
  },
  {
    id: "codepen-wp-aurora",
    name: "CodePen Aurora Shader (Live)",
    url: "https://codepen.io/yuhomyan/pen/OJMejWJ",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=300",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "aurora", "shader", "animated"]
  },
  {
    id: "codepen-wp-plasma",
    name: "CodePen Plasma Fluid Flow",
    url: "https://codepen.io/RAFA-R3/pen/JjXbWwo",
    previewUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "plasma", "fluid", "animated"]
  },
  {
    id: "codepen-wp-neon-grid",
    name: "CodePen Synthwave Cyber Grid",
    url: "https://codepen.io/P1N34PPL3/pen/eYpYmOp",
    previewUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=300",
    type: "codepen",
    category: "codepen",
    isCustom: false,
    tags: ["codepen", "synthwave", "cyberpunk", "grid"]
  },
  // Custom Wallpapers from JSON
  {
    id: "custom-wp-1787476757058",
    name: "Hình nền #25",
    url: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
    previewUrl: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art", "aesthetic"]
  },
  {
    id: "custom-wp-1787474863337",
    name: "Hình nền #24",
    url: "https://i.pinimg.com/1200x/8b/1e/b9/8b1eb99060f70ca44abb1467991e0218.jpg",
    previewUrl: "https://i.pinimg.com/1200x/8b/1e/b9/8b1eb99060f70ca44abb1467991e0218.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "pastel", "soft"]
  },
  {
    id: "custom-wp-1787474467133",
    name: "Hình nền #23",
    url: "https://i.pinimg.com/1200x/df/a9/7d/dfa97d9d5fc6370a3291a60a7eaac630.jpg",
    previewUrl: "https://i.pinimg.com/1200x/df/a9/7d/dfa97d9d5fc6370a3291a60a7eaac630.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "abstract", "modern"]
  },
  {
    id: "custom-wp-1787411641956",
    name: "Hình nền Video #23",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
    previewUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live", "motion"]
  },
  {
    id: "custom-wp-1787411610689",
    name: "Hình nền Video #22",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4",
    previewUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live", "fluid"]
  },
  {
    id: "custom-wp-1787385268921",
    name: "Hình nền Video #20",
    url: "https://v1.pinimg.com/videos/mc/720p/24/04/f5/2404f5b12afbf179a6aa0be40c5468e4.mp4",
    previewUrl: "https://v1.pinimg.com/videos/mc/720p/24/04/f5/2404f5b12afbf179a6aa0be40c5468e4.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "dynamic"]
  },
  {
    id: "custom-wp-1787385177593",
    name: "Hình nền #19",
    url: "https://i.pinimg.com/1200x/6e/ce/8d/6ece8dd1d119c72abe2ec5975cba98a7.jpg",
    previewUrl: "https://i.pinimg.com/1200x/6e/ce/8d/6ece8dd1d119c72abe2ec5975cba98a7.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "aesthetic"]
  },
  {
    id: "custom-wp-1787385135012",
    name: "Hình nền #18",
    url: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    previewUrl: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art"]
  },
  {
    id: "custom-wp-1787385080160",
    name: "Hình nền #17",
    url: "https://i.pinimg.com/1200x/f7/ee/67/f7ee67286822641202752fdb2392af61.jpg",
    previewUrl: "https://i.pinimg.com/1200x/f7/ee/67/f7ee67286822641202752fdb2392af61.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "minimal"]
  },
  {
    id: "custom-wp-1787385043511",
    name: "Hình nền #16",
    url: "https://i.pinimg.com/1200x/bf/bd/f2/bfbdf26043b404d7a2ee18f176695c5f.jpg",
    previewUrl: "https://i.pinimg.com/1200x/bf/bd/f2/bfbdf26043b404d7a2ee18f176695c5f.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "nature"]
  },
  {
    id: "custom-wp-1787384730889",
    name: "Hình nền #15",
    url: "https://i.pinimg.com/1200x/23/2c/1d/232c1dfaaee23d7e6c07a2bf66380c40.jpg",
    previewUrl: "https://i.pinimg.com/1200x/23/2c/1d/232c1dfaaee23d7e6c07a2bf66380c40.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "clean"]
  },
  {
    id: "custom-wp-1787384608963",
    name: "Hình nền #14",
    url: "https://i.pinimg.com/1200x/a3/51/a6/a351a69c0a3ddd6dcc1f7d46e9d7fc2f.jpg",
    previewUrl: "https://i.pinimg.com/1200x/a3/51/a6/a351a69c0a3ddd6dcc1f7d46e9d7fc2f.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "scenery"]
  },
  {
    id: "custom-wp-1787384523506",
    name: "Hình nền #13",
    url: "https://i.pinimg.com/1200x/81/43/bd/8143bd40b96f7252f9f2964d0916dafe.jpg",
    previewUrl: "https://i.pinimg.com/1200x/81/43/bd/8143bd40b96f7252f9f2964d0916dafe.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "gradient"]
  },
  {
    id: "custom-wp-1787384473842",
    name: "Hình nền #12",
    url: "https://i.pinimg.com/1200x/8b/4c/38/8b4c383bf9cfe64ec3878f267769f5f3.jpg",
    previewUrl: "https://i.pinimg.com/1200x/8b/4c/38/8b4c383bf9cfe64ec3878f267769f5f3.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art"]
  },
  {
    id: "custom-wp-1787362727226",
    name: "Hình nền #12 (Mẫu B)",
    url: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "soft"]
  },
  {
    id: "custom-wp-1787362700397",
    name: "Hình nền #11",
    url: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "minimal"]
  },
  {
    id: "custom-wp-1787362669332",
    name: "Hình nền #10",
    url: "https://i.pinimg.com/1200x/95/3c/ae/953caedb2a4f25bd463c1b74a4329651.jpg",
    previewUrl: "https://i.pinimg.com/1200x/95/3c/ae/953caedb2a4f25bd463c1b74a4329651.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "design"]
  },
  {
    id: "custom-wp-1787362648848",
    name: "Hình nền Video #9",
    url: "https://v1.pinimg.com/videos/mc/720p/10/77/ab/1077abb576579eba02148d3a25d62246.mp4",
    previewUrl: "https://v1.pinimg.com/videos/mc/720p/10/77/ab/1077abb576579eba02148d3a25d62246.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live"]
  },
  {
    id: "custom-wp-1787362619870",
    name: "Hình nền #8",
    url: "https://i.pinimg.com/1200x/a7/64/67/a764671d012a974456bd70ea13f9e856.jpg",
    previewUrl: "https://i.pinimg.com/1200x/a7/64/67/a764671d012a974456bd70ea13f9e856.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "aesthetic"]
  },
  {
    id: "custom-wp-1787362606619",
    name: "Hình nền #7",
    url: "https://i.pinimg.com/1200x/f8/58/20/f858205b0f91ab2dd9036b3d01e8341a.jpg",
    previewUrl: "https://i.pinimg.com/1200x/f8/58/20/f858205b0f91ab2dd9036b3d01e8341a.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "creative"]
  },
  {
    id: "custom-wp-1787362519361",
    name: "Hình nền #6",
    url: "https://i.pinimg.com/1200x/ea/da/bf/eadabffb44fb936533d37219dd3f5fd5.jpg",
    previewUrl: "https://i.pinimg.com/1200x/ea/da/bf/eadabffb44fb936533d37219dd3f5fd5.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "aesthetic"]
  },
  {
    id: "custom-wp-1787362503783",
    name: "Hình nền #5",
    url: "https://i.pinimg.com/1200x/e5/41/2f/e5412f90727c824210b57af865d48a7e.jpg",
    previewUrl: "https://i.pinimg.com/1200x/e5/41/2f/e5412f90727c824210b57af865d48a7e.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art"]
  },
  {
    id: "custom-wp-1787362485474",
    name: "Hình nền Video #4",
    url: "https://v1.pinimg.com/videos/iht/hevcMp4V3/cd/8f/44/cd8f44dd4a75d66aeeb1c4343084966a_720w.mp4",
    previewUrl: "https://v1.pinimg.com/videos/iht/hevcMp4V3/cd/8f/44/cd8f44dd4a75d66aeeb1c4343084966a_720w.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live"]
  },
  {
    id: "custom-wp-1787362377113",
    name: "Hình nền #3",
    url: "https://i.pinimg.com/1200x/88/27/2f/88272fed43faf6368862ac2b6a763fdb.jpg",
    previewUrl: "https://i.pinimg.com/1200x/88/27/2f/88272fed43faf6368862ac2b6a763fdb.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "minimal"]
  },
  {
    id: "custom-wp-1787362244022",
    name: "Hình nền #2",
    url: "https://i.pinimg.com/1200x/4d/80/91/4d80911e8d5f12e891e9a1b78604fc15.jpg",
    previewUrl: "https://i.pinimg.com/1200x/4d/80/91/4d80911e8d5f12e891e9a1b78604fc15.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "soft"]
  },

  // Curated Preset Themes from JSON allLinks
  {
    id: "img-wp-1",
    name: "Minimalist White Bright Space",
    url: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    previewUrl: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "bright", "space", "4k"]
  },
  {
    id: "img-wp-2",
    name: "Geometric Mountain Calming Visuals",
    url: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    previewUrl: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "mountain", "geometric"]
  },
  {
    id: "img-wp-3",
    name: "Aesthetic Landscape 15",
    url: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "landscape", "calm"]
  },
  {
    id: "img-wp-4",
    name: "Aesthetic Landscape 14",
    url: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "landscape"]
  },
  {
    id: "img-wp-5",
    name: "Aesthetic Landscape 13",
    url: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "scenery"]
  },
  {
    id: "img-wp-6",
    name: "Aesthetic Landscape 12",
    url: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "horizon"]
  },
  {
    id: "img-wp-7",
    name: "Pearlescent Abstract Hues",
    url: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    previewUrl: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "pearlescent", "fluid"]
  },
  {
    id: "img-wp-8",
    name: "Best Premium Wallpaper",
    url: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    previewUrl: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "premium"]
  },
  {
    id: "img-wp-9",
    name: "Minimal Aesthetic Gradient 2",
    url: "https://i.ibb.co/rKL4ffH2/2.jpg",
    previewUrl: "https://i.ibb.co/rKL4ffH2/2.jpg",
    type: "image",
    category: "gradient",
    tags: ["gradient", "pastel", "aurora"]
  },
  {
    id: "img-wp-10",
    name: "Soft Pastel Atmosphere 12",
    url: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "atmosphere", "soft"]
  },
  {
    id: "img-wp-11",
    name: "Abstract Silvery Pearlescent Minimal",
    url: "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    previewUrl: "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "silvery", "texture"]
  },
  {
    id: "img-wp-12",
    name: "Clean Aesthetic Wallpaper",
    url: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    previewUrl: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "clean"]
  },
  {
    id: "img-wp-13",
    name: "Soft Atmosphere 15",
    url: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "soft"]
  },
  {
    id: "img-wp-14",
    name: "Pastel Minimal Clean Aesthetic",
    url: "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    previewUrl: "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "pastel", "mac"]
  },
  {
    id: "img-wp-15",
    name: "Soft Atmosphere 14",
    url: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "light"]
  },
  {
    id: "img-wp-16",
    name: "Soft Atmosphere 13",
    url: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "warm"]
  },
  {
    id: "img-wp-17",
    name: "Soft Atmosphere 16",
    url: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    previewUrl: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "sky"]
  },
  {
    id: "img-wp-18",
    name: "Abstract Vibrant Horizon 18",
    url: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    previewUrl: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "art"]
  },
  {
    id: "img-wp-19",
    name: "Mental Peace Rest Minimal",
    url: "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    previewUrl: "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "mindfulness", "peace"]
  }
];

export interface PresetBackground {
  id: string;
  type: 'image' | 'video';
  url: string;
  previewUrl?: string;
  tag: string;
}

export const PRESET_BACKGROUNDS: PresetBackground[] = [
  {
    id: "preset-vid-1",
    type: "video",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
    tag: "Aurora Stream (Video 4K)"
  },
  {
    id: "preset-vid-2",
    type: "video",
    url: "https://v1.pinimg.com/videos/mc/720p/24/04/f5/2404f5b12afbf179a6aa0be40c5468e4.mp4",
    tag: "Abstract Motion (Video HD)"
  },
  {
    id: "preset-vid-3",
    type: "video",
    url: "https://v1.pinimg.com/videos/iht/hevcMp4V3/cd/8f/44/cd8f44dd4a75d66aeeb1c4343084966a_720w.mp4",
    tag: "Fluid Waves (Video HD)"
  },
  {
    id: "preset-img-1",
    type: "image",
    url: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
    tag: "Hình nền #25 (Aesthetic Clay)"
  },
  {
    id: "preset-img-2",
    type: "image",
    url: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    tag: "Minimalist White Space (4K)"
  },
  {
    id: "preset-img-3",
    type: "image",
    url: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    tag: "Pearlescent Hues (Abstract)"
  }
];

interface BackgroundContextType {
  config: BackgroundConfig;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  addBackgroundLink: (url: string, explicitType?: BackgroundType, name?: string, category?: string) => boolean;
  addCssBackground: (name: string, cssCode: string, category?: string) => boolean;
  removeBackground: (id: string) => void;
  setActiveBackground: (id: string, type: BackgroundType, url: string, cssCode?: string) => void;
  setOverlayOpacity: (opacity: number) => void;
  setBlurAmount: (blur: number) => void;
  resetToDefaultGradient: () => void;
  exportConfigToJson: () => string;
  importConfigFromJson: (jsonString: string) => { success: boolean; message: string };
  downloadJsonFile: () => void;
  resetToDefaultJsonLibrary: () => void;
}

const STORAGE_KEY = "portfolio_persistent_background_config_v2";

// Default configuration with selected wallpaper #25 from the user's JSON
const DEFAULT_CONFIG: BackgroundConfig = {
  version: 1,
  savedAt: "2026-08-23T09:19:59.655Z",
  selectedWallpaperId: "custom-wp-1787476757058",
  isWallpaperHidden: false,
  activeId: "custom-wp-1787476757058",
  activeType: "image",
  activeUrl: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
  overlayOpacity: 25, // 25% overlay dim for elegant contrast
  blurAmount: 0,
  items: INITIAL_WALLPAPERS_FROM_JSON
};

// Helper to extract CodePen thumbnail shots
export const extractCodePenThumbnail = (url: string): string => {
  if (!url) return '';
  const match = url.match(/codepen\.io\/([^/]+)\/(?:pen|full|debug|details)\/([^/?#]+)/i);
  if (match && match[1] && match[2]) {
    const user = match[1];
    const pen = match[2];
    return `https://shots.codepen.io/${user}/pen/${pen}-800.jpg`;
  }
  return '';
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BackgroundConfig>(() => {
    let initialConfig = DEFAULT_CONFIG;
    try {
      if (typeof window !== "undefined") {
        // Look for the absolute permanent default wallpaper first
        const permanentDefault = localStorage.getItem("portfolio_permanent_default_wallpaper_v2");
        if (permanentDefault) {
          const parsedDefault = JSON.parse(permanentDefault);
          if (parsedDefault && parsedDefault.activeId) {
            initialConfig = {
              ...DEFAULT_CONFIG,
              activeId: parsedDefault.activeId,
              activeType: parsedDefault.activeType,
              activeUrl: parsedDefault.activeUrl,
              selectedWallpaperId: parsedDefault.activeId,
              overlayOpacity: typeof parsedDefault.overlayOpacity === 'number' ? parsedDefault.overlayOpacity : DEFAULT_CONFIG.overlayOpacity,
              blurAmount: typeof parsedDefault.blurAmount === 'number' ? parsedDefault.blurAmount : DEFAULT_CONFIG.blurAmount
            };
          }
        }

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
            return {
              ...initialConfig,
              ...parsed,
              // enforce the absolute permanent choice
              ...(permanentDefault ? JSON.parse(permanentDefault) : {})
            };
          }
        }
      }
    } catch (e) {
      console.error("Failed to load background config from localStorage", e);
    }
    return initialConfig;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync to localStorage on every change so it is permanently saved in the website
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Failed to save background config to localStorage", e);
    }
  }, [config]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Auto-detect whether a link is a codepen, pencode, video, or image
  const detectType = (url: string): BackgroundType => {
    const cleanUrl = url.toLowerCase().trim();
    if (cleanUrl.includes('codepen') || cleanUrl.includes('cdpn') || cleanUrl.includes('pencode')) {
      return 'codepen';
    }
    if (
      cleanUrl.includes('.mp4') || 
      cleanUrl.includes('.webm') || 
      cleanUrl.includes('.ogg') || 
      cleanUrl.includes('.mov') ||
      cleanUrl.includes('mixkit.co/videos') ||
      cleanUrl.includes('youtube.com') ||
      cleanUrl.includes('youtu.be') ||
      cleanUrl.includes('vimeo.com')
    ) {
      return 'video';
    }
    return 'image';
  };

  // Add a new background by link ONLY
  const addBackgroundLink = (url: string, explicitType?: BackgroundType, name?: string, category?: string): boolean => {
    const trimmed = url.trim();
    if (!trimmed) return false;

    const type = explicitType || detectType(trimmed);
    const newId = `custom-wp-${Date.now()}`;
    const codePenThumb = type === 'codepen' ? (extractCodePenThumbnail(trimmed) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300') : '';

    const newItem: BackgroundItem = {
      id: newId,
      name: name || (type === 'codepen' ? `CodePen #${config.items.filter(it => it.type === 'codepen').length + 1}` : `Hình nền #${config.items.length + 1}`),
      type,
      url: trimmed,
      previewUrl: type === 'codepen' ? (codePenThumb || trimmed) : trimmed,
      category: category || (type === 'codepen' ? 'codepen' : type === 'video' ? 'video' : 'custom'),
      isCustom: true,
      tags: ["custom", type],
      addedAt: Date.now()
    };

    setConfig((prev) => {
      const nextConfig = {
        ...prev,
        items: [newItem, ...prev.items],
        activeId: newId,
        activeType: type,
        activeUrl: trimmed,
        selectedWallpaperId: newId
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: newId,
          activeType: type,
          activeUrl: trimmed,
          overlayOpacity: prev.overlayOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });

    return true;
  };

  const addCssBackground = (name: string, cssCode: string, category: string = "css") => {
    const trimmedCode = cssCode.trim();
    if (!trimmedCode) return false;

    const newId = `custom-css-${Date.now()}`;
    const newItem: BackgroundItem = {
      id: newId,
      name: name.trim() || `Hình nền CSS #${config.items.filter(it => it.type === 'css').length + 1}`,
      type: 'css',
      url: `css://${newId}`,
      cssCode: trimmedCode,
      category: category,
      isCustom: true,
      tags: ["css", "code", "custom", "dynamic"],
      addedAt: Date.now()
    };

    setConfig((prev) => {
      const nextConfig = {
        ...prev,
        items: [newItem, ...prev.items],
        activeId: newId,
        activeType: 'css' as BackgroundType,
        activeUrl: newItem.url,
        activeCssCode: trimmedCode,
        selectedWallpaperId: newId
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: newId,
          activeType: 'css',
          activeUrl: newItem.url,
          activeCssCode: trimmedCode,
          overlayOpacity: prev.overlayOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });

    return true;
  };

  const removeBackground = (id: string) => {
    setConfig((prev) => {
      const remaining = prev.items.filter((item) => item.id !== id);
      const wasActive = prev.activeId === id;
      const nextConfig: BackgroundConfig = {
        ...prev,
        items: remaining,
        ...(wasActive
          ? {
              activeId: "default-gradient",
              activeType: "gradient" as BackgroundType,
              activeUrl: "",
              selectedWallpaperId: "default-gradient"
            }
          : {})
      };

      if (wasActive) {
        try {
          localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
            activeId: "default-gradient",
            activeType: "gradient",
            activeUrl: "",
            overlayOpacity: prev.overlayOpacity,
            blurAmount: prev.blurAmount
          }));
        } catch (e) {}
      }
      return nextConfig;
    });
  };

  const setActiveBackground = (id: string, type: BackgroundType, url: string, cssCode?: string) => {
    setConfig((prev) => {
      const item = prev.items.find(it => it.id === id);
      const resolvedCss = cssCode || item?.cssCode || prev.activeCssCode || "";
      const nextConfig = {
        ...prev,
        activeId: id,
        activeType: type,
        activeUrl: url,
        activeCssCode: resolvedCss,
        selectedWallpaperId: id,
        isWallpaperHidden: id === "none"
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: id,
          activeType: type,
          activeUrl: url,
          activeCssCode: resolvedCss,
          overlayOpacity: prev.overlayOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const setOverlayOpacity = (opacity: number) => {
    setConfig((prev) => {
      const nextOpacity = Math.max(0, Math.min(90, opacity));
      const nextConfig = {
        ...prev,
        overlayOpacity: nextOpacity
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: prev.activeId,
          activeType: prev.activeType,
          activeUrl: prev.activeUrl,
          overlayOpacity: nextOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const setBlurAmount = (blur: number) => {
    setConfig((prev) => {
      const nextBlur = Math.max(0, Math.min(25, blur));
      const nextConfig = {
        ...prev,
        blurAmount: nextBlur
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: prev.activeId,
          activeType: prev.activeType,
          activeUrl: prev.activeUrl,
          overlayOpacity: prev.overlayOpacity,
          blurAmount: nextBlur
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const resetToDefaultGradient = () => {
    setConfig((prev) => {
      const nextConfig: BackgroundConfig = {
        ...prev,
        activeId: "default-gradient",
        activeType: "gradient" as BackgroundType,
        activeUrl: "",
        selectedWallpaperId: "default-gradient",
        isWallpaperHidden: false
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: "default-gradient",
          activeType: "gradient",
          activeUrl: "",
          overlayOpacity: prev.overlayOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const resetToDefaultJsonLibrary = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem("portfolio_permanent_default_wallpaper_v2");
    } catch (e) {}
  };

  const exportConfigToJson = (): string => {
    const exportObject = {
      version: 1,
      savedAt: new Date().toISOString(),
      selectedWallpaperId: config.activeId,
      isWallpaperHidden: config.isWallpaperHidden || false,
      overlayOpacity: config.overlayOpacity,
      blurAmount: config.blurAmount,
      activeType: config.activeType,
      activeUrl: config.activeUrl,
      activeCssCode: config.activeCssCode,
      customWallpapers: config.items.filter(it => it.isCustom || it.category === 'custom'),
      allLinks: config.items
    };
    return JSON.stringify(exportObject, null, 2);
  };

  const downloadJsonFile = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportConfigToJson());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `wallpapers-library-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigFromJson = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || (typeof parsed !== 'object' && !Array.isArray(parsed))) {
        return { success: false, message: "Định dạng file JSON không hợp lệ." };
      }

      const rawCandidateList: any[] = [];

      // Collect from all possible arrays inside parsed JSON
      if (Array.isArray(parsed)) {
        rawCandidateList.push(...parsed);
      }
      if (Array.isArray(parsed.allLinks)) {
        rawCandidateList.push(...parsed.allLinks);
      }
      if (Array.isArray(parsed.customWallpapers)) {
        rawCandidateList.push(...parsed.customWallpapers);
      }
      if (Array.isArray(parsed.items)) {
        rawCandidateList.push(...parsed.items);
      }
      if (Array.isArray(parsed.wallpapers)) {
        rawCandidateList.push(...parsed.wallpapers);
      }

      // If parsed is an object with single wallpaper
      if (rawCandidateList.length === 0 && (parsed.url || parsed.cssCode)) {
        rawCandidateList.push(parsed);
      }

      // Convert and deduplicate against existing items first
      const seenKeys = new Set<string>();
      
      // Populate seenKeys with existing wallpaper items to avoid adding duplicates of existing ones
      if (config && Array.isArray(config.items)) {
        for (const item of config.items) {
          if (!item) continue;
          const isCss = item.type === 'css';
          const cssCode = item.cssCode || "";
          const url = item.url || "";
          const dedupKey = isCss 
            ? `css:${cssCode.replace(/\s+/g, ' ').slice(0, 100)}` 
            : `url:${url.toLowerCase().split('?')[0]}`;
          seenKeys.add(dedupKey);
        }
      }

      const processedItems: BackgroundItem[] = [];

      for (const it of rawCandidateList) {
        if (!it || typeof it !== 'object') continue;

        const url = (it.url || it.previewUrl || "").toString().trim();
        const cssCode = (it.cssCode || it.code || "").toString().trim();
        
        if (!url && !cssCode) continue;

        const isCss = it.type === 'css' || (!!cssCode && !url.startsWith('http'));
        const isCodePen = it.type === 'codepen' || url.toLowerCase().includes('codepen.io') || url.toLowerCase().includes('cdpn.io');
        const isVideo = it.type === 'video' || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm');

        const resolvedType: BackgroundType = isCss ? 'css' : isCodePen ? 'codepen' : isVideo ? 'video' : 'image';

        // Unique deduplication key: url (case-insensitive) or normalized css code
        const dedupKey = isCss 
          ? `css:${cssCode.replace(/\s+/g, ' ').slice(0, 100)}` 
          : `url:${url.toLowerCase().split('?')[0]}`;

        if (seenKeys.has(dedupKey)) {
          continue; // Loại trùng lặp
        }
        seenKeys.add(dedupKey);

        // Extract thumbnail for CodePen
        let preview = (it.previewUrl || it.thumbnail || it.thumb || "").toString().trim();
        if (isCodePen && (!preview || !preview.startsWith('http') || preview === url)) {
          preview = extractCodePenThumbnail(url) || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300`;
        } else if (!preview) {
          preview = url;
        }

        const id = it.id || `custom-wp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const name = it.name || (isCss ? `Hình nền CSS #${processedItems.length + 1}` : isCodePen ? `CodePen #${processedItems.length + 1}` : `Hình nền #${processedItems.length + 1}`);

        processedItems.push({
          id,
          name,
          type: resolvedType,
          url: isCss ? (url.startsWith('css://') ? url : `css://${id}`) : url,
          previewUrl: preview,
          cssCode: isCss ? cssCode : undefined,
          category: it.category || (isCss ? 'css' : isCodePen ? 'codepen' : isVideo ? 'video' : 'custom'),
          isCustom: it.isCustom ?? true,
          tags: Array.isArray(it.tags) ? it.tags : [resolvedType, 'custom']
        });
      }

      if (processedItems.length === 0) {
        return { success: false, message: "Không tìm thấy hình nền mới hoặc toàn bộ hình nền nhập vào đã tồn tại (lọc trùng)." };
      }

      const finalItems = [
        ...(config?.items || []),
        ...processedItems
      ];

      const activeId = config?.activeId || processedItems[0]?.id || "custom-wp-1787476757058";
      const targetItem = finalItems.find(it => it.id === activeId) || finalItems[0];

      const newConfig: BackgroundConfig = {
        version: 1,
        savedAt: new Date().toISOString(),
        selectedWallpaperId: targetItem.id,
        isWallpaperHidden: !!config?.isWallpaperHidden,
        activeId: targetItem.id,
        activeType: targetItem.type,
        activeUrl: targetItem.url,
        activeCssCode: targetItem?.cssCode || config?.activeCssCode || "",
        overlayOpacity: typeof config?.overlayOpacity === 'number' ? config.overlayOpacity : 25,
        blurAmount: typeof config?.blurAmount === 'number' ? config.blurAmount : 0,
        items: finalItems
      };

      setConfig(newConfig);

      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: newConfig.activeId,
          activeType: newConfig.activeType,
          activeUrl: newConfig.activeUrl,
          activeCssCode: newConfig.activeCssCode,
          overlayOpacity: newConfig.overlayOpacity,
          blurAmount: newConfig.blurAmount
        }));
      } catch (e) {}

      return { success: true, message: `Đã nhập thêm và lọc trùng thành công ${processedItems.length} hình nền từ JSON!` };
    } catch (e: any) {
      return { success: false, message: `Lỗi đọc JSON: ${e.message}` };
    }
  };

  return (
    <BackgroundContext.Provider
      value={{
        config,
        isModalOpen,
        openModal,
        closeModal,
        addBackgroundLink,
        addCssBackground,
        removeBackground,
        setActiveBackground,
        setOverlayOpacity,
        setBlurAmount,
        resetToDefaultGradient,
        exportConfigToJson,
        importConfigFromJson,
        downloadJsonFile,
        resetToDefaultJsonLibrary
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

const fallbackBackgroundContext: BackgroundContextType = {
  config: DEFAULT_CONFIG,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  addBackgroundLink: () => false,
  addCssBackground: () => false,
  removeBackground: () => {},
  setActiveBackground: () => {},
  setOverlayOpacity: () => {},
  setBlurAmount: () => {},
  resetToDefaultGradient: () => {},
  exportConfigToJson: () => "",
  importConfigFromJson: () => ({ success: false, message: "" }),
  downloadJsonFile: () => {},
  resetToDefaultJsonLibrary: () => {},
};

export const useBackground = (): BackgroundContextType => {
  const context = useContext(BackgroundContext);
  return context || fallbackBackgroundContext;
};
