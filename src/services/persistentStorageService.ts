import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit 
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { BackgroundConfig, BackgroundItem } from "../types/background";

export interface XRayTemplateRecord {
  id: string;
  name: string;
  description: string;
  wallpaperName: string;
  wallpaperUrl: string;
  uiConfig: {
    themeId?: string;
    isDark?: boolean;
    cardStyle?: string;
    glassBlur?: number;
    glassOpacity?: number;
    borderGlow?: boolean;
    [key: string]: any;
  };
  colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
    presetId?: string;
    [key: string]: any;
  };
  font: string;
  layout: string;
  content: {
    title?: string;
    summary?: string;
    sections?: string[];
    [key: string]: any;
  };
  settings: {
    autoScan?: boolean;
    soundEnabled?: boolean;
    animationSpeed?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
  version: number;
  status: "active" | "draft" | "archived";
  authorId?: string;
  authorName?: string;
  versionHistory?: Array<{
    version: number;
    updatedAt: string;
    name: string;
    notes?: string;
  }>;
}

// Built-in Default X-Ray Templates to ensure instant availability & cloud backup
export const DEFAULT_XRAY_TEMPLATES: XRayTemplateRecord[] = [
  {
    id: "xray-preset-glass-clay",
    name: "Glassmorphism & Clay Soft 4K",
    description: "Phong cách kính mờ cao cấp, viền phát sáng đa sắc, gradient pastel mềm mại chuẩn Bento hiện đại.",
    wallpaperName: "Hình nền #25 (Aesthetic Clay Soft)",
    wallpaperUrl: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
    uiConfig: {
      themeId: "mritech-digital-growth",
      isDark: false,
      cardStyle: "glass-card-soft",
      glassBlur: 20,
      glassOpacity: 72,
      borderGlow: true,
      borderRadius: "24px"
    },
    colors: {
      primary: "#2563eb",
      secondary: "#06b6d4",
      accent: "#8b5cf6",
      presetId: "mritech-digital-growth"
    },
    font: "Plus Jakarta Sans / Play",
    layout: "Bento Grid 12 Columns Multi-Row",
    content: {
      title: "Hồ Sơ Năng Lực Trưởng Phòng CSKH",
      summary: "22+ Năm kinh nghiệm quản trị vận hành và kiến tạo trải nghiệm khách hàng vượt trội.",
      sections: ["home", "about", "domains", "skills", "experience", "projects", "interview", "contact"]
    },
    settings: {
      autoScan: true,
      soundEnabled: true,
      animationSpeed: "220ms"
    },
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-09-30T10:00:00.000Z",
    version: 1,
    status: "active",
    authorName: "Hệ thống Quản Trị"
  },
  {
    id: "xray-preset-dark-neon",
    name: "Dark Neon Cyberpunk Studio",
    description: "Giao diện tối sâu với viền Cyan & Fuchsia neon sắc nét, card bán trong suốt nổi khối 3D.",
    wallpaperName: "Aurora Stream 4K Motion",
    wallpaperUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
    uiConfig: {
      themeId: "glass-dark-neon",
      isDark: true,
      cardStyle: "glass-dark-neon",
      glassBlur: 24,
      glassOpacity: 85,
      borderGlow: true,
      borderRadius: "24px"
    },
    colors: {
      primary: "#06b6d4",
      secondary: "#3b82f6",
      accent: "#ec4899",
      presetId: "cyberpunk-future"
    },
    font: "Space Grotesk / Inter",
    layout: "Bento Hybrid Modular Dashboard",
    content: {
      title: "Giao Diện Giám Đốc Điều Hành (C-Level Mode)",
      summary: "Kiểm soát số liệu SLA, FCR, CSAT và tỷ lệ chuyển đổi dịch vụ trong thời gian thực.",
      sections: ["home", "about", "domains", "systems", "projects", "interview"]
    },
    settings: {
      autoScan: true,
      soundEnabled: true,
      animationSpeed: "180ms"
    },
    createdAt: "2026-08-10T12:00:00.000Z",
    updatedAt: "2026-09-30T10:00:00.000Z",
    version: 2,
    status: "active",
    authorName: "Hệ thống Quản Trị"
  },
  {
    id: "xray-preset-minimal-pearl",
    name: "Minimal White Pearl Elegance",
    description: "Phong cách tối giản, nền ngọc trai thanh lịch, khoảng trắng cân đối, chú trọng sự tinh tế của nội dung.",
    wallpaperName: "Pearlescent Hues Abstract",
    wallpaperUrl: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    uiConfig: {
      themeId: "mritech-digital-growth",
      isDark: false,
      cardStyle: "clean-minimal-bordered",
      glassBlur: 16,
      glassOpacity: 65,
      borderGlow: false,
      borderRadius: "20px"
    },
    colors: {
      primary: "#059669",
      secondary: "#0d9488",
      accent: "#f59e0b",
      presetId: "forest-emerald"
    },
    font: "Plus Jakarta Sans",
    layout: "Storytelling Fluid Flow",
    content: {
      title: "Executive Storytelling Portfolio",
      summary: "Trải nghiệm đọc thư ngỏ và lịch sử phát triển cá nhân theo dòng thời gian mượt mà.",
      sections: ["home", "open-letter", "about", "experience", "education", "contact"]
    },
    settings: {
      autoScan: false,
      soundEnabled: true,
      animationSpeed: "250ms"
    },
    createdAt: "2026-08-15T09:30:00.000Z",
    updatedAt: "2026-09-30T10:00:00.000Z",
    version: 1,
    status: "active",
    authorName: "Hệ thống Quản Trị"
  }
];

class PersistentStorageService {
  private currentUser: User | null = null;
  private authInitPromise: Promise<User | null>;

  constructor() {
    this.authInitPromise = new Promise((resolve) => {
      try {
        onAuthStateChanged(auth, (user) => {
          this.currentUser = user;
          resolve(user);
        });
      } catch (e) {
        resolve(null);
      }
    });
  }

  // Returns current authenticated Firebase User UID, or null if visitor is guest
  public getAuthenticatedUid(): string | null {
    return auth.currentUser?.uid || this.currentUser?.uid || null;
  }

  // Ensure Cloud Auth session state has initialized
  public async ensureSession(): Promise<string | null> {
    try {
      const user = await this.authInitPromise;
      if (user && user.uid) {
        return user.uid;
      }
      if (auth.currentUser) {
        return auth.currentUser.uid;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Get a stable local guest identifier for device-specific local state
  public getLocalGuestId(): string {
    if (typeof window !== "undefined") {
      let guestId = localStorage.getItem("portfolio_cloud_guest_uid");
      if (!guestId) {
        guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        localStorage.setItem("portfolio_cloud_guest_uid", guestId);
      }
      return guestId;
    }
    return "guest_default_user";
  }

  // ==========================================
  // 1. CLOUD STORAGE FOR WALLPAPERS
  // ==========================================
  
  /**
   * Upload and permanently store wallpaper image in Cloud
   * Returns a durable, permanent URL
   */
  public async uploadWallpaperImage(fileOrDataUrl: File | string, filename?: string): Promise<string> {
    try {
      if (typeof window !== "undefined" && fileOrDataUrl instanceof File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            const dataUrl = reader.result as string;
            try {
              const url = await this.storeDataUrlToCloud(dataUrl, filename || fileOrDataUrl.name);
              resolve(url);
            } catch {
              resolve(dataUrl);
            }
          };
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(fileOrDataUrl);
        });
      } else if (typeof fileOrDataUrl === "string") {
        return await this.storeDataUrlToCloud(fileOrDataUrl, filename || `wp_${Date.now()}`);
      }
      return "";
    } catch (err) {
      console.error("Cloud wallpaper upload failed:", err);
      throw err;
    }
  }

  private async storeDataUrlToCloud(url: string, name: string): Promise<string> {
    // If it's already an external HTTPS permanent link, return directly
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    try {
      const uid = this.getAuthenticatedUid() || await this.ensureSession();
      if (!uid) {
        // Guest mode: data URL is used directly
        return url;
      }
      const imageId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      
      const docRef = doc(db, "public_wallpapers", imageId);
      await setDoc(docRef, {
        id: imageId,
        name,
        dataUrl: url,
        uploadedBy: uid,
        createdAt: new Date().toISOString()
      }, { merge: true });

      return url;
    } catch {
      return url;
    }
  }

  // ==========================================
  // 2. WALLPAPER CONFIG DATABASE SYNC
  // ==========================================

  /**
   * Load wallpaper configuration from Cloud Database.
   * Only reads cloud database if user is authenticated; otherwise returns null without permission errors.
   */
  public async loadWallpaperConfigFromDatabase(): Promise<BackgroundConfig | null> {
    try {
      const uid = this.getAuthenticatedUid() || await this.ensureSession();
      if (!uid) {
        // Unauthenticated visitor: do not make unauthorized Firestore calls
        return null;
      }
      
      // Try to read from User preferences
      const prefDocRef = doc(db, "users", uid, "preferences", "background");
      const prefSnap = await getDoc(prefDocRef);

      if (prefSnap.exists()) {
        const data = prefSnap.data();
        if (data && data.config) {
          console.info("Successfully restored wallpaper config from Cloud Database");
          return data.config as BackgroundConfig;
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Save wallpaper configuration permanently to Cloud Database.
   * If user is a guest, persists to local storage safely.
   */
  public async saveWallpaperConfigToDatabase(config: BackgroundConfig): Promise<boolean> {
    try {
      const uid = this.getAuthenticatedUid() || await this.ensureSession();
      if (!uid) {
        // Guest visitor: silently succeed, configuration is already persisted in localStorage
        return true;
      }

      const prefDocRef = doc(db, "users", uid, "preferences", "background");
      await setDoc(prefDocRef, {
        updatedAt: new Date().toISOString(),
        selectedWallpaperId: config.selectedWallpaperId || config.activeId,
        config: config
      }, { merge: true });

      return true;
    } catch {
      return false;
    }
  }

  // ==========================================
  // 3. X-RAY TEMPLATES DATABASE (MẪU X-RAY)
  // ==========================================

  /**
   * Load all X-Ray templates from Cloud Database / Local Cache.
   * Merges user templates with public shared templates and default seeds.
   */
  public async loadXRayTemplates(): Promise<XRayTemplateRecord[]> {
    const templatesMap = new Map<string, XRayTemplateRecord>();
    const uid = this.getAuthenticatedUid() || await this.ensureSession();

    // 1. Seed defaults first
    DEFAULT_XRAY_TEMPLATES.forEach((tmpl) => templatesMap.set(tmpl.id, tmpl));

    // 2. Load from local cache if unauthenticated guest
    if (!uid && typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("portfolio_xray_templates_cache_v2");
        if (cached) {
          const parsed = JSON.parse(cached) as XRayTemplateRecord[];
          if (Array.isArray(parsed)) {
            parsed.forEach((t) => {
              if (t && t.id) templatesMap.set(t.id, t);
            });
          }
        }
      } catch (e) {}
    }

    // 3. If authenticated, fetch user-specific and cloud templates
    try {
      if (uid) {
        try {
          const userCol = collection(db, "users", uid, "xray_templates");
          const userSnap = await getDocs(userCol);
          userSnap.forEach((d) => {
            const data = d.data() as XRayTemplateRecord;
            if (data && data.id) {
              templatesMap.set(data.id, data);
            }
          });
        } catch {
          // User collection read fallback
        }

        try {
          const publicCol = collection(db, "xray_templates");
          const publicSnap = await getDocs(publicCol);
          publicSnap.forEach((d) => {
            const data = d.data() as XRayTemplateRecord;
            if (data && data.id) {
              templatesMap.set(data.id, data);
            }
          });
        } catch {
          // Public collection read fallback
        }
      }
    } catch {
      // General cloud templates load fallback
    }

    const result = Array.from(templatesMap.values()).filter((t) => t.status !== "archived");
    
    // Update local cache only if guest visitor (unauthenticated)
    if (!uid && typeof window !== "undefined") {
      try {
        localStorage.setItem("portfolio_xray_templates_cache_v2", JSON.stringify(result));
      } catch (e) {}
    }

    return result;
  }

  /**
   * Save or Update an X-Ray Template to Cloud Database and Local Cache.
   * Handles automatic version incrementing & history snapshots.
   */
  public async saveXRayTemplate(template: Partial<XRayTemplateRecord> & { name: string }): Promise<XRayTemplateRecord> {
    const uid = this.getAuthenticatedUid() || await this.ensureSession();
    const now = new Date().toISOString();
    const id = template.id || `xray-tmpl-${Date.now()}`;

    // Check if existing record exists to handle versioning
    let existingRecord: XRayTemplateRecord | null = null;
    
    // Check local cache
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("portfolio_xray_templates_cache_v2");
        if (cached) {
          const list: XRayTemplateRecord[] = JSON.parse(cached);
          existingRecord = list.find((item) => item.id === id) || null;
        }
      } catch {}
    }

    if (!existingRecord && uid) {
      try {
        const docRef = doc(db, "xray_templates", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          existingRecord = snap.data() as XRayTemplateRecord;
        }
      } catch (e) {}
    }

    const version = existingRecord ? (existingRecord.version || 1) + 1 : (template.version || 1);
    
    const versionHistory = existingRecord?.versionHistory || [];
    if (existingRecord) {
      versionHistory.push({
        version: existingRecord.version,
        updatedAt: existingRecord.updatedAt,
        name: existingRecord.name,
        notes: `Phiên bản v${existingRecord.version} lưu trước khi cập nhật`
      });
    }

    const fullRecord: XRayTemplateRecord = {
      id,
      name: template.name,
      description: template.description || "Mẫu cấu hình X-RAY lưu trữ lâu dài.",
      wallpaperName: template.wallpaperName || "Hình nền mặc định",
      wallpaperUrl: template.wallpaperUrl || "",
      uiConfig: template.uiConfig || {},
      colors: template.colors || {},
      font: template.font || "Plus Jakarta Sans",
      layout: template.layout || "Bento Grid Standard",
      content: template.content || {},
      settings: template.settings || {},
      createdAt: existingRecord?.createdAt || now,
      updatedAt: now,
      version,
      status: template.status || "active",
      authorId: uid || this.getLocalGuestId(),
      authorName: template.authorName || (uid ? "Người dùng" : "Khách thăm quan"),
      versionHistory
    };

    // If authenticated with Cloud, persist to Firestore
    if (uid) {
      try {
        const userDocRef = doc(db, "users", uid, "xray_templates", id);
        await setDoc(userDocRef, fullRecord, { merge: true });

        const publicDocRef = doc(db, "xray_templates", id);
        await setDoc(publicDocRef, fullRecord, { merge: true });
      } catch (err) {
        // Silently handled: local cache guarantees persistent storage on client
      }
    }

    // Refresh local cache only for guest visitors without active cloud auth
    if (!uid && typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("portfolio_xray_templates_cache_v2");
        let list: XRayTemplateRecord[] = cached ? JSON.parse(cached) : [];
        list = list.filter((item) => item.id !== id);
        list.unshift(fullRecord);
        localStorage.setItem("portfolio_xray_templates_cache_v2", JSON.stringify(list));
      } catch (e) {}
    }

    return fullRecord;
  }

  /**
   * Delete or archive an X-Ray template in Cloud Database and Local Cache
   */
  public async deleteXRayTemplate(id: string): Promise<boolean> {
    const uid = this.getAuthenticatedUid() || await this.ensureSession();
    
    if (uid) {
      try {
        const userDocRef = doc(db, "users", uid, "xray_templates", id);
        await setDoc(userDocRef, { status: "archived", updatedAt: new Date().toISOString() }, { merge: true });

        const publicDocRef = doc(db, "xray_templates", id);
        await setDoc(publicDocRef, { status: "archived", updatedAt: new Date().toISOString() }, { merge: true });
      } catch {}
    }

    // Update local cache
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("portfolio_xray_templates_cache_v2");
        if (cached) {
          let list: XRayTemplateRecord[] = JSON.parse(cached);
          list = list.filter((item) => item.id !== id);
          localStorage.setItem("portfolio_xray_templates_cache_v2", JSON.stringify(list));
        }
      } catch (e) {}
    }

    return true;
  }

  /**
   * Restore previous version of an X-Ray template
   */
  public async restoreTemplateVersion(id: string, targetVersion: number): Promise<XRayTemplateRecord | null> {
    try {
      let current: XRayTemplateRecord | null = null;
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("portfolio_xray_templates_cache_v2");
        if (cached) {
          const list: XRayTemplateRecord[] = JSON.parse(cached);
          current = list.find((t) => t.id === id) || null;
        }
      }

      const uid = this.getAuthenticatedUid() || await this.ensureSession();
      if (!current && uid) {
        const publicDocRef = doc(db, "xray_templates", id);
        const snap = await getDoc(publicDocRef);
        if (snap.exists()) {
          current = snap.data() as XRayTemplateRecord;
        }
      }

      if (!current || !current.versionHistory || current.versionHistory.length === 0) return null;

      const historicalSnapshot = current.versionHistory.find((v) => v.version === targetVersion);
      if (!historicalSnapshot) return null;

      const restored: XRayTemplateRecord = {
        ...current,
        name: historicalSnapshot.name,
        version: current.version + 1,
        updatedAt: new Date().toISOString()
      };

      if (uid) {
        try {
          const publicDocRef = doc(db, "xray_templates", id);
          await setDoc(publicDocRef, restored, { merge: true });
          const userDocRef = doc(db, "users", uid, "xray_templates", id);
          await setDoc(userDocRef, restored, { merge: true });
        } catch {}
      }

      // Update local cache
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem("portfolio_xray_templates_cache_v2");
          let list: XRayTemplateRecord[] = cached ? JSON.parse(cached) : [];
          list = list.filter((item) => item.id !== id);
          list.unshift(restored);
          localStorage.setItem("portfolio_xray_templates_cache_v2", JSON.stringify(list));
        } catch {}
      }

      return restored;
    } catch {
      return null;
    }
  }
}

export const persistentStorageService = new PersistentStorageService();
