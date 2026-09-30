/**
 * Data Synchronization Service (Background Task)
 * 
 * Tự động đồng bộ hóa dữ liệu từ localStorage lên Cloud Database (Firestore)
 * ngay khi người dùng đăng nhập, sau đó xóa dữ liệu cache tạm thời khỏi localStorage
 * để hoàn tất quá trình chuyển đổi kiến trúc lưu trữ sang Cloud Database.
 */

import { doc, setDoc, serverTimestamp, collection, getDocs, getDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { db, auth, handleFirestoreError, OperationType } from "../lib/firebase";
import { XRayTemplateRecord, DEFAULT_XRAY_TEMPLATES } from "./persistentStorageService";
import { PRODUCTION_DEFAULTS_STORAGE_KEY, SystemProductionConfig, FACTORY_DEFAULTS } from "./systemSettingsService";
import { BackgroundConfig } from "../types/background";

export interface SyncStats {
  syncedAt: string | null;
  userId: string | null;
  userEmail: string | null;
  xrayTemplatesCount: number;
  wallpapersConfigSynced: boolean;
  systemSettingsSynced: boolean;
  customFaqsCount: number;
  cleanedKeys: string[];
  status: "idle" | "in_progress" | "completed" | "failed";
  error?: string;
}

class DataSyncService {
  private isSyncing = false;
  private lastSyncedUserId: string | null = null;
  private syncStats: SyncStats = {
    syncedAt: null,
    userId: null,
    userEmail: null,
    xrayTemplatesCount: 0,
    wallpapersConfigSynced: false,
    systemSettingsSynced: false,
    customFaqsCount: 0,
    cleanedKeys: [],
    status: "idle",
  };

  constructor() {
    // Tự động lắng nghe thay đổi trạng thái Auth để kích hoạt Background Task
    if (typeof window !== "undefined") {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user && user.uid) {
            // Khởi chạy background task đồng bộ khi phát hiện người dùng đăng nhập
            this.syncLocalStorageToDatabase(user).catch((err) => {
              console.warn("[DataSyncService] Background sync encountered an error:", err);
            });
          } else {
            this.lastSyncedUserId = null;
          }
        });
      } catch (e) {
        console.warn("[DataSyncService] Auth listener init warning:", e);
      }
    }
  }

  /**
   * Lấy thống kê trạng thái đồng bộ hiện tại
   */
  public getSyncStats(): SyncStats {
    return { ...this.syncStats };
  }

  /**
   * Kiểm tra xem tiến trình đồng bộ có đang diễn ra trong background hay không
   */
  public getIsSyncing(): boolean {
    return this.isSyncing;
  }

  /**
   * Tiến trình chính: Đẩy toàn bộ dữ liệu từ localStorage lên Firestore Database
   * và dọn dẹp các key cache tạm thời
   */
  public async syncLocalStorageToDatabase(user: User): Promise<SyncStats> {
    if (!user || !user.uid) {
      return this.syncStats;
    }

    // Tránh đồng bộ lặp lại liên tục cho cùng một session đăng nhập nếu vừa mới hoàn tất
    if (this.isSyncing) {
      console.info("[DataSyncService] Sync is already running in background for user:", user.uid);
      return this.syncStats;
    }

    if (this.lastSyncedUserId === user.uid && this.syncStats.status === "completed") {
      console.info("[DataSyncService] Data has already been synced for user:", user.uid);
      return this.syncStats;
    }

    this.isSyncing = true;
    this.syncStats = {
      syncedAt: new Date().toISOString(),
      userId: user.uid,
      userEmail: user.email || null,
      xrayTemplatesCount: 0,
      wallpapersConfigSynced: false,
      systemSettingsSynced: false,
      customFaqsCount: 0,
      cleanedKeys: [],
      status: "in_progress",
    };

    console.info(`[DataSyncService] Starting background migration from localStorage to Firestore for user: ${user.uid}...`);

    try {
      // 1. Đồng bộ / Đăng ký hồ sơ người dùng trong collection 'users'
      await this.syncUserProfile(user);

      // 2. Đồng bộ X-Ray Templates từ localStorage lên Firestore
      const templatesCount = await this.syncXRayTemplates(user.uid);
      this.syncStats.xrayTemplatesCount = templatesCount;

      // 3. Đồng bộ Cấu hình Background / Wallpapers từ localStorage lên Firestore
      const wallpapersSynced = await this.syncWallpapersConfig(user.uid);
      this.syncStats.wallpapersConfigSynced = wallpapersSynced;

      // 4. Đồng bộ Cấu hình Hệ thống & Production Defaults từ localStorage lên Firestore
      const settingsSynced = await this.syncSystemSettings(user.uid);
      this.syncStats.systemSettingsSynced = settingsSynced;

      // 5. Đồng bộ Custom FAQs từ localStorage lên Firestore
      const faqsCount = await this.syncCustomFaqs(user.uid);
      this.syncStats.customFaqsCount = faqsCount;

      // 6. XÓA DỮ LIỆU CACHE TẠM THỜI KHỎI LOCALSTORAGE để hoàn tất chuyển đổi kiến trúc lưu trữ
      const cleanedKeys = this.clearTemporaryLocalStorageCache();
      this.syncStats.cleanedKeys = cleanedKeys;

      this.syncStats.status = "completed";
      this.syncStats.syncedAt = new Date().toISOString();
      this.lastSyncedUserId = user.uid;

      console.info("[DataSyncService] Cloud synchronization completed successfully:", this.syncStats);

      // Phát sự kiện broadcast cho các component UI cập nhật dữ liệu từ Cloud Database
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("thai_portfolio_cloud_sync_completed", {
            detail: this.syncStats,
          })
        );
      }

      return this.syncStats;
    } catch (error) {
      console.error("[DataSyncService] Migration error:", error);
      this.syncStats.status = "failed";
      this.syncStats.error = error instanceof Error ? error.message : String(error);
      return this.syncStats;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * 1. Đồng bộ User profile doc
   */
  private async syncUserProfile(user: User): Promise<void> {
    const userDocPath = `users/${user.uid}`;
    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email || "",
          createdAt: serverTimestamp(),
        });
        console.info(`[DataSyncService] Created user profile for ${user.uid}`);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, userDocPath);
    }
  }

  /**
   * 2. Quét và đồng bộ các mẫu X-Ray Templates từ localStorage lên Firestore
   */
  private async syncXRayTemplates(userId: string): Promise<number> {
    if (typeof window === "undefined") return 0;
    let syncedCount = 0;

    try {
      const cached = localStorage.getItem("portfolio_xray_templates_cache_v2") ||
                     localStorage.getItem("portfolio_xray_templates");

      if (cached) {
        let templates: XRayTemplateRecord[] = [];
        try {
          templates = JSON.parse(cached);
        } catch {
          templates = [];
        }

        if (Array.isArray(templates) && templates.length > 0) {
          for (const tmpl of templates) {
            if (!tmpl || !tmpl.id || !tmpl.name) continue;

            const userTemplatePath = `users/${userId}/xray_templates/${tmpl.id}`;
            const publicTemplatePath = `xray_templates/${tmpl.id}`;

            const recordToSave: XRayTemplateRecord = {
              ...tmpl,
              authorId: userId,
              authorName: tmpl.authorName || "Người dùng đã xác thực",
              updatedAt: new Date().toISOString(),
              status: tmpl.status || "active",
              version: tmpl.version || 1,
            };

            try {
              // Lưu vào subcollection riêng của user
              await setDoc(doc(db, "users", userId, "xray_templates", tmpl.id), recordToSave, { merge: true });
              // Lưu vào collection chung để truy cập lâu dài
              await setDoc(doc(db, "xray_templates", tmpl.id), recordToSave, { merge: true });
              syncedCount++;
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, userTemplatePath);
            }
          }
        }
      }
    } catch (e) {
      console.warn("[DataSyncService] Error syncing X-Ray templates:", e);
    }

    return syncedCount;
  }

  /**
   * 3. Đồng bộ Cấu hình Background / Wallpapers từ localStorage lên Firestore
   */
  private async syncWallpapersConfig(userId: string): Promise<boolean> {
    if (typeof window === "undefined") return false;
    const prefPath = `users/${userId}/preferences/background`;

    try {
      const rawCustom = localStorage.getItem("portfolio_custom_wallpapers") ||
                        localStorage.getItem("thai_portfolio_wallpapers_config");

      let configToSync: Partial<BackgroundConfig> | null = null;

      if (rawCustom) {
        try {
          const parsed = JSON.parse(rawCustom);
          configToSync = parsed;
        } catch {}
      }

      if (configToSync) {
        const prefDocRef = doc(db, "users", userId, "preferences", "background");
        await setDoc(
          prefDocRef,
          {
            updatedAt: new Date().toISOString(),
            config: configToSync,
            syncedFromLocalStorage: true,
          },
          { merge: true }
        );
        console.info(`[DataSyncService] Synced background wallpapers config to ${prefPath}`);
        return true;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, prefPath);
    }

    return false;
  }

  /**
   * 4. Đồng bộ Cấu hình Hệ thống & Production Defaults từ localStorage lên Firestore
   */
  private async syncSystemSettings(userId: string): Promise<boolean> {
    if (typeof window === "undefined") return false;
    const settingsPath = `users/${userId}/preferences/system_settings`;

    try {
      const rawDefaults = localStorage.getItem(PRODUCTION_DEFAULTS_STORAGE_KEY);
      let settingsPayload: Partial<SystemProductionConfig> = {};

      if (rawDefaults) {
        try {
          settingsPayload = JSON.parse(rawDefaults);
        } catch {}
      }

      // Đọc các giá trị phân tán trong localStorage nếu có
      const themeMode = localStorage.getItem("portfolio_theme_mode");
      const theme = localStorage.getItem("portfolio_theme") || localStorage.getItem("theme");
      const colorPreset = localStorage.getItem("portfolio_color_preset");
      const fontScale = localStorage.getItem("portfolio_font_scale");
      const borderRadius = localStorage.getItem("portfolio_border_radius");
      const borderRadiusCard = localStorage.getItem("portfolio_border_radius_card");
      const cursorConfig = localStorage.getItem("thai_portfolio_cursor_config");
      const soundConfig = localStorage.getItem("thai_portfolio_sound_config");
      const footerConfig = localStorage.getItem("thai_portfolio_footer_config");
      const headerConfig = localStorage.getItem("thai_portfolio_header_config");
      const lang = localStorage.getItem("portfolio_lang");

      const compiledSettings = {
        ...FACTORY_DEFAULTS,
        ...settingsPayload,
        ...(themeMode ? { themeMode } : {}),
        ...(theme ? { theme } : {}),
        ...(colorPreset ? { colorPreset } : {}),
        ...(fontScale ? { fontScale: parseFloat(fontScale) } : {}),
        ...(borderRadius ? { borderRadius: parseInt(borderRadius, 10) } : {}),
        ...(borderRadiusCard ? { borderRadiusCard: parseInt(borderRadiusCard, 10) } : {}),
        ...(cursorConfig ? { cursor: JSON.parse(cursorConfig) } : {}),
        ...(soundConfig ? { sound: JSON.parse(soundConfig) } : {}),
        ...(footerConfig ? { footer: JSON.parse(footerConfig) } : {}),
        ...(headerConfig ? { header: JSON.parse(headerConfig) } : {}),
        ...(lang ? { lang } : {}),
        savedAt: new Date().toISOString(),
        syncedToCloud: true,
      };

      const prefDocRef = doc(db, "users", userId, "preferences", "system_settings");
      await setDoc(prefDocRef, compiledSettings, { merge: true });
      console.info(`[DataSyncService] Synced system settings to ${settingsPath}`);
      return true;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, settingsPath);
    }

    return false;
  }

  /**
   * 5. Đồng bộ Custom FAQs từ localStorage lên Firestore
   */
  private async syncCustomFaqs(userId: string): Promise<number> {
    if (typeof window === "undefined") return 0;
    const faqsPath = `users/${userId}/preferences/faqs`;

    try {
      const rawFaqs = localStorage.getItem("ai_custom_faqs");
      if (rawFaqs) {
        const faqs = JSON.parse(rawFaqs);
        if (Array.isArray(faqs) && faqs.length > 0) {
          const prefDocRef = doc(db, "users", userId, "preferences", "faqs");
          await setDoc(
            prefDocRef,
            {
              faqs,
              updatedAt: new Date().toISOString(),
              totalCount: faqs.length,
            },
            { merge: true }
          );
          console.info(`[DataSyncService] Synced ${faqs.length} custom FAQs to ${faqsPath}`);
          return faqs.length;
        }
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, faqsPath);
    }

    return 0;
  }

  /**
   * 6. XÓA DỮ LIỆU CACHE TẠM THỜI KHỎI LOCALSTORAGE
   * Hoàn tất chuyển đổi kiến trúc lưu trữ từ client cache sang Cloud Database
   */
  public clearTemporaryLocalStorageCache(): string[] {
    if (typeof window === "undefined") return [];

    const keysToClean = [
      "portfolio_xray_templates_cache_v2",
      "portfolio_xray_templates",
      "portfolio_cloud_guest_uid",
      "ai_custom_faqs",
      "portfolio_custom_wallpapers_temp_cache",
      "thai_portfolio_has_custom_defaults",
    ];

    const actuallyCleaned: string[] = [];

    for (const key of keysToClean) {
      try {
        if (localStorage.getItem(key) !== null) {
          localStorage.removeItem(key);
          actuallyCleaned.push(key);
        }
      } catch (e) {
        console.warn(`[DataSyncService] Could not remove key ${key} from localStorage:`, e);
      }
    }

    console.info(`[DataSyncService] Cleaned up temporary localStorage cache keys:`, actuallyCleaned);
    return actuallyCleaned;
  }

  /**
   * Kích hoạt đồng bộ thủ công
   */
  public async triggerManualSync(): Promise<SyncStats> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("Người dùng chưa đăng nhập. Vui lòng đăng nhập Google để đồng bộ dữ liệu lên Cloud Database.");
    }
    return await this.syncLocalStorageToDatabase(currentUser);
  }
}

export const dataSyncService = new DataSyncService();
