import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BackgroundItem, BackgroundConfig, BackgroundType } from "../types/background";
import { PERMANENT_WALLPAPERS_DATA } from "../data/wallpapers";
import { persistentStorageService } from "../services/persistentStorageService";

// Initial wallpapers imported directly from dedicated data file
export const INITIAL_WALLPAPERS_FROM_JSON: BackgroundItem[] = PERMANENT_WALLPAPERS_DATA;

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
  importConfigFromJson: (jsonString: string, overwriteMode?: boolean) => { success: boolean; message: string };
  downloadJsonFile: () => void;
  resetToDefaultJsonLibrary: () => void;
  uploadWallpaperFile?: (file: File) => Promise<string>;
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

  // 1. CLOUD SYNC ON MOUNT: Load saved wallpaper config from Cloud Database if localStorage was wiped or user is on another device
  useEffect(() => {
    let isMounted = true;
    persistentStorageService.loadWallpaperConfigFromDatabase()
      .then((cloudConfig) => {
        if (isMounted && cloudConfig) {
          console.info("Restoring wallpaper configuration from Cloud Database...");
          setConfig((prev) => ({
            ...prev,
            ...cloudConfig,
            items: cloudConfig.items && cloudConfig.items.length > 0 ? cloudConfig.items : prev.items
          }));
        }
      })
      .catch((err) => {
        console.warn("Background cloud database sync catch:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Sync to localStorage (Cache) and Cloud Database (Source of Truth)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Failed to save background config to localStorage", e);
    }

    // Debounce save to Cloud Database for persistent storage
    const timer = setTimeout(() => {
      persistentStorageService.saveWallpaperConfigToDatabase(config).catch(() => {});
    }, 1200);

    return () => clearTimeout(timer);
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

  const importConfigFromJson = (jsonString: string, overwriteMode: boolean = false): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || (typeof parsed !== 'object' && !Array.isArray(parsed))) {
        return { success: false, message: "Định dạng tệp JSON không hợp lệ." };
      }

      const rawCandidateList: any[] = [];

      // Collect from all possible arrays inside parsed JSON
      if (Array.isArray(parsed)) {
        rawCandidateList.push(...parsed);
      } else {
        if (Array.isArray(parsed.allLinks)) {
          rawCandidateList.push(...parsed.allLinks);
        } else if (Array.isArray(parsed.items)) {
          rawCandidateList.push(...parsed.items);
        } else if (Array.isArray(parsed.wallpapers)) {
          rawCandidateList.push(...parsed.wallpapers);
        } else if (Array.isArray(parsed.customWallpapers)) {
          rawCandidateList.push(...parsed.customWallpapers);
        }
      }

      // If parsed is an object with single wallpaper
      if (rawCandidateList.length === 0 && (parsed.url || parsed.cssCode)) {
        rawCandidateList.push(parsed);
      }

      if (rawCandidateList.length === 0) {
        return { success: false, message: "Không tìm thấy dữ liệu hình nền hợp lệ trong JSON." };
      }

      const parsedItems: BackgroundItem[] = [];
      const seenKeysInInput = new Set<string>();

      for (const it of rawCandidateList) {
        if (!it || typeof it !== 'object') continue;

        const url = (it.url || it.previewUrl || "").toString().trim();
        const cssCode = (it.cssCode || it.code || "").toString().trim();
        
        if (!url && !cssCode) continue;

        const isCss = it.type === 'css' || (!!cssCode && !url.startsWith('http'));
        const isCodePen = it.type === 'codepen' || url.toLowerCase().includes('codepen.io') || url.toLowerCase().includes('cdpn.io');
        const isVideo = it.type === 'video' || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm');

        const resolvedType: BackgroundType = isCss ? 'css' : isCodePen ? 'codepen' : isVideo ? 'video' : (it.type || 'image');

        const dedupKey = isCss 
          ? `css:${cssCode.replace(/\s+/g, ' ').slice(0, 100)}` 
          : `url:${url.toLowerCase().split('?')[0]}`;

        if (seenKeysInInput.has(dedupKey)) continue;
        seenKeysInInput.add(dedupKey);

        // Extract thumbnail for CodePen
        let preview = (it.previewUrl || it.thumbnail || it.thumb || "").toString().trim();
        if (isCodePen && (!preview || !preview.startsWith('http') || preview === url)) {
          preview = extractCodePenThumbnail(url) || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300`;
        } else if (!preview) {
          preview = url;
        }

        const id = it.id || `custom-wp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const name = it.name || (isCss ? `Hình nền CSS #${parsedItems.length + 1}` : isCodePen ? `CodePen #${parsedItems.length + 1}` : `Hình nền #${parsedItems.length + 1}`);

        parsedItems.push({
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

      if (parsedItems.length === 0) {
        return { success: false, message: "Không xử lý được hình nền nào từ cấu trúc JSON." };
      }

      let updatedList: BackgroundItem[] = [];
      let addedCount = 0;
      let updatedCount = 0;

      if (overwriteMode) {
        updatedList = parsedItems;
        addedCount = parsedItems.length;
      } else {
        const currentItems = [...(config?.items || [])];
        updatedList = [...currentItems];

        for (const newItem of parsedItems) {
          const key = newItem.type === 'css'
            ? `css:${(newItem.cssCode || "").replace(/\s+/g, ' ').slice(0, 100)}`
            : `url:${(newItem.url || "").toLowerCase().split('?')[0]}`;

          const existingByIdIndex = updatedList.findIndex(x => x.id === newItem.id);
          const existingByKeyIndex = key ? updatedList.findIndex(x => {
            const xKey = x.type === 'css'
              ? `css:${(x.cssCode || "").replace(/\s+/g, ' ').slice(0, 100)}`
              : `url:${(x.url || "").toLowerCase().split('?')[0]}`;
            return xKey === key;
          }) : -1;

          if (existingByIdIndex >= 0) {
            updatedList[existingByIdIndex] = { ...updatedList[existingByIdIndex], ...newItem };
            updatedCount++;
          } else if (existingByKeyIndex >= 0) {
            updatedList[existingByKeyIndex] = { ...updatedList[existingByKeyIndex], ...newItem };
            updatedCount++;
          } else {
            updatedList.push(newItem);
            addedCount++;
          }
        }
      }

      let targetActiveId = parsed.selectedWallpaperId || parsed.activeId || config?.activeId;
      if (!targetActiveId || !updatedList.some(x => x.id === targetActiveId)) {
        targetActiveId = updatedList[0]?.id || "custom-wp-1787476757058";
      }

      const targetItem = updatedList.find(it => it.id === targetActiveId) || updatedList[0];

      const overlayOpacity = typeof parsed.overlayOpacity === 'number' 
        ? parsed.overlayOpacity 
        : (typeof config?.overlayOpacity === 'number' ? config.overlayOpacity : 25);

      const blurAmount = typeof parsed.blurAmount === 'number'
        ? parsed.blurAmount
        : (typeof config?.blurAmount === 'number' ? config.blurAmount : 0);

      const isWallpaperHidden = typeof parsed.isWallpaperHidden === 'boolean'
        ? parsed.isWallpaperHidden
        : !!config?.isWallpaperHidden;

      const newConfig: BackgroundConfig = {
        version: 1,
        savedAt: new Date().toISOString(),
        selectedWallpaperId: targetItem.id,
        isWallpaperHidden,
        activeId: targetItem.id,
        activeType: targetItem.type,
        activeUrl: targetItem.url,
        activeCssCode: targetItem?.cssCode || "",
        overlayOpacity,
        blurAmount,
        items: updatedList
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

      const msg = overwriteMode
        ? `✓ Đã ghi đè toàn bộ danh sách hình nền thành công (${parsedItems.length} hình nền)!`
        : updatedCount > 0 && addedCount > 0
          ? `✓ Đã cập nhật ${updatedCount} hình nền và thêm mới ${addedCount} hình nền thành công!`
          : updatedCount > 0
            ? `✓ Đã cập nhật thành công ${updatedCount} hình nền hiện có!`
            : `✓ Đã thêm mới ${addedCount} hình nền từ JSON!`;

      return { success: true, message: msg };
    } catch (e: any) {
      return { success: false, message: `Lỗi đọc dữ liệu JSON: ${e.message}` };
    }
  };

  const uploadWallpaperFile = async (file: File): Promise<string> => {
    try {
      const url = await persistentStorageService.uploadWallpaperImage(file);
      if (url) {
        addBackgroundLink(url, "image", file.name.replace(/\.[^/.]+$/, ""), "upload");
      }
      return url;
    } catch (e) {
      console.error("Upload error:", e);
      return "";
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
        resetToDefaultJsonLibrary,
        uploadWallpaperFile
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
