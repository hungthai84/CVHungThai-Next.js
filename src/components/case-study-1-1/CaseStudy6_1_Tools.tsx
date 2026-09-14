import React, { useState } from "react";
import { 
  Crown, 
  Gem, 
  Star, 
  PhoneCall, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  Calculator, 
  Check
} from "lucide-react";
import { playUiSound } from "../../lib/sound";

export function CaseStudy6_1_Tools() {
  const [activeTab, setActiveTab] = useState<"tiers" | "routing" | "roi">("tiers");

  // Tab 1: Tier Segmentation State
  const [selectedTier, setSelectedTier] = useState<"diamond" | "gold" | "silver">("diamond");

  // Tab 2: Priority Routing Simulation State
  const [simState, setSimState] = useState<"idle" | "incoming" | "connected" | "approved">("idle");

  // Tab 3: VIP ROI Calculator State
  const [vipCount, setVipCount] = useState(450);
  const [avgSpendPerVip, setAvgSpendPerVip] = useState(150); // 150 million VND / year
  const [retentionUplift, setRetentionUplift] = useState(4.5); // % retention improvement
  const [upsellGrowth, setUpsellGrowth] = useState(25); // % spend growth

  const tiersData = {
    diamond: {
      name: "VIP Kim Cương (Diamond)",
      icon: Gem,
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-600 dark:text-cyan-400",
      borderColor: "border-cyan-400 dark:border-cyan-600",
      bgSoft: "bg-cyan-50 dark:bg-cyan-950/40",
      spend: "Doanh số > 500 Triệu VNĐ/năm",
      sla: "Bắt máy tức thì < 10 giây • Xử lý < 1 giờ",
      accountManager: "1-on-1 Dedicated Account Manager (Chuyên trách riêng)",
      privileges: [
        "Hotline riêng không cần bấm phím số tự động định tuyến",
        "Quyền đặc cách ngoại lệ: Hoàn tiền / Bồi thường tức thì tới 50 triệu VNĐ",
        "Miễn 100% tất cả các loại phí giao dịch & chuyển tiền",
        "Bộ quà tặng sinh nhật cao cấp trị giá 5.000.000 VNĐ",
        "Vé mời sự kiện Year-end Gala & Hội nghị khách hàng cấp cao",
        "Kênh chat bảo mật riêng biệt qua Telegram VIP / Zalo OA riêng"
      ]
    },
    gold: {
      name: "VIP Vàng (Gold)",
      icon: Crown,
      color: "from-amber-500 to-yellow-600",
      textColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-400 dark:border-amber-600",
      bgSoft: "bg-amber-50 dark:bg-amber-950/40",
      spend: "Doanh số 200 - 500 Triệu VNĐ/năm",
      sla: "Bắt máy < 20 giây • Xử lý < 3 giờ",
      accountManager: "Đội ngũ VIP Desk ưu tiên tiếp nhận",
      privileges: [
        "Ưu tiên hàng đợi số 1 trên tổng đài thông minh",
        "Quyền đặc cách ngoại lệ: Hoàn tiền tức thì tới 15 triệu VNĐ",
        "Giảm 70% phí giao dịch quốc tế và dịch vụ tiện ích",
        "Quà tặng tri ân sinh nhật trị giá 2.000.000 VNĐ",
        "Thông báo và trải nghiệm tính năng sản phẩm mới trước 14 ngày"
      ]
    },
    silver: {
      name: "VIP Bạc (Silver)",
      icon: Star,
      color: "from-slate-400 to-slate-600",
      textColor: "text-slate-600 dark:text-slate-300",
      borderColor: "border-slate-300 dark:border-slate-600",
      bgSoft: "bg-slate-50 dark:bg-slate-800/40",
      spend: "Doanh số 80 - 200 Triệu VNĐ/năm",
      sla: "Bắt máy < 30 giây • Xử lý < 6 giờ",
      accountManager: "Chuyên viên CS Tuyến 2 hỗ trợ trực tiếp",
      privileges: [
        "Ưu tiên hàng đợi so với khách hàng tiêu chuẩn",
        "Giảm 30% phí giao dịch và các chương trình đối tác liên kết",
        "Thiệp và quà tặng voucher điện tử mừng sinh nhật",
        "Hỗ trợ qua kênh Ticket ưu tiên gắn nhãn Silver"
      ]
    }
  };

  const handleStartCallSim = () => {
    playUiSound("click");
    setSimState("incoming");
    setTimeout(() => {
      setSimState("connected");
      playUiSound("success");
    }, 2000);
  };

  const handleApproveException = () => {
    playUiSound("success");
    setSimState("approved");
  };

  // ROI Calculations
  const totalAnnualVipRevenue = (vipCount * avgSpendPerVip * 1000000); // VNĐ
  const protectedRevenueFromChurn = totalAnnualVipRevenue * (retentionUplift / 100);
  const additionalRevenueUpsell = totalAnnualVipRevenue * (upsellGrowth / 100);
  const totalBusinessImpact = protectedRevenueFromChurn + additionalRevenueUpsell;

  return (
    <div className="glass-base p-6 sm:p-8 rounded-3xl space-y-6 border border-amber-200/80 dark:border-amber-800/60 bg-white/90 dark:bg-slate-900/90 shadow-xl backdrop-blur-xl">
      {/* Tool Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Crown className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Bộ Công Cụ Thực Nghiệm VIP Desk
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Mô Phỏng Phân Hạng Đặc Quyền & Định Tuyến Cuộc Gọi Ưu Tiên
          </h3>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 self-stretch sm:self-auto">
          <button
            onClick={() => { setActiveTab("tiers"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "tiers"
                ? "bg-white dark:bg-amber-600 text-amber-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Gem className="w-3.5 h-3.5" /> Phân Hạng Đặc Quyền
          </button>
          <button
            onClick={() => { setActiveTab("routing"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "routing"
                ? "bg-white dark:bg-amber-600 text-amber-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Giả Lập Định Tuyến VIP
          </button>
          <button
            onClick={() => { setActiveTab("roi"); playUiSound("switch"); }}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "roi"
                ? "bg-white dark:bg-amber-600 text-amber-600 dark:text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> Giá Trị Giữ Chân & Doanh Thu
          </button>
        </div>
      </div>

      {/* TAB 1: VIP Tier Segmentation & Matrix */}
      {activeTab === "tiers" && (
        <div className="space-y-6">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {(["diamond", "gold", "silver"] as const).map((tierKey) => {
              const tier = tiersData[tierKey];
              const Icon = tier.icon;
              const isSelected = selectedTier === tierKey;
              return (
                <button
                  key={tierKey}
                  onClick={() => { setSelectedTier(tierKey); playUiSound("click"); }}
                  className={`flex-1 min-w-[200px] p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? `bg-white dark:bg-slate-800 ${tier.borderColor} ring-2 ring-amber-500/20 shadow-lg`
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${tier.color} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{tier.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{tier.spend}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Tier Detail Board */}
          {(() => {
            const curTier = tiersData[selectedTier];
            const CurIcon = curTier.icon;
            return (
              <div className={`p-6 rounded-2xl ${curTier.bgSoft} border ${curTier.borderColor} space-y-5 transition-all`}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${curTier.color} text-white shadow-md`}>
                      <CurIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-h6 text-slate-900 dark:text-white">{curTier.name}</h4>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{curTier.accountManager}</span>
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-black/5 shadow-sm">
                    SLA Cam Kết: <strong className={curTier.textColor}>{curTier.sla}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 block">
                    Danh Sách Đặc Quyền & Chính Sách Ưu Tiên:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {curTier.privileges.map((priv, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 flex items-start gap-2.5 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{priv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: VIP Routing & Dedicated AM Simulator */}
      {activeTab === "routing" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Simulation Trigger */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 shadow-md">
            <h4 className="text-h6 text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-600" /> Giả Lập Cuộc Gọi Đến Từ Khách Hàng VIP
            </h4>

            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Người gọi:</span>
                <strong className="text-slate-900 dark:text-white">Ông Trần Minh Tuấn</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">0908.888.xxx</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hạng mức:</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-600 text-white font-bold text-[10px] flex items-center gap-1">
                  <Gem className="w-2.5 h-2.5" /> VIP Kim Cương
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doanh số năm:</span>
                <strong className="text-amber-600">820.000.000 VNĐ</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Nhấn nút dưới đây để kiểm tra quy trình CTI tự động nhận diện VIP, bỏ qua toàn bộ hàng đợi IVR và đổ chuông trực tiếp cho Chuyên viên Account Manager riêng.
            </p>

            <button
              onClick={handleStartCallSim}
              disabled={simState === "incoming" || simState === "connected"}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" /> Kích Hoạt Cuộc Gọi VIP Đến Tổng Đài
            </button>
          </div>

          {/* Right: Agent Screen (VIP Desk CTI) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-950 text-white border border-amber-900/60 shadow-xl space-y-4 flex flex-col justify-between">
            {simState === "idle" && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
                <PhoneCall className="w-12 h-12 text-amber-500/40" />
                <p className="text-xs font-semibold">
                  Sẵn sàng trên bàn trực VIP Desk. Nhấn kích hoạt ở bên trái để theo dõi luồng định tuyến ưu tiên 1-on-1.
                </p>
              </div>
            )}

            {simState === "incoming" && (
              <div className="text-center py-8 space-y-3 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center">
                  <PhoneCall className="w-8 h-8 text-amber-400 animate-bounce" />
                </div>
                <div className="text-h6 text-amber-300">Đang nhận diện VIP & Định tuyến tức thì...</div>
                <div className="text-xs text-slate-400">Bỏ qua hàng đợi thông thường • Thời gian chờ: 0 giây</div>
              </div>
            )}

            {(simState === "connected" || simState === "approved") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-emerald-400 uppercase">Cuộc Gọi VIP Đang Kết Nối (00:42)</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 text-xs font-bold border border-cyan-500/40 flex items-center gap-1">
                    <Gem className="w-3 h-3" /> VIP Kim Cương
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Khách hàng: <strong>Trần Minh Tuấn (Chủ tịch VinTech)</strong></span>
                    <span className="text-slate-400">Account Manager: <strong>Lê Hoàng Nam</strong></span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-200">
                    <strong>Nội dung yêu cầu:</strong> Giao dịch chuyển tiền đối tác 20.000.000 VNĐ vừa bị gián đoạn do lỗi kết nối ngân hàng. Khách cần xác nhận hoàn trả ngay để thanh toán hợp đồng.
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    Quyền hạn đặc cách VIP: Có thể duyệt hoàn tiền &lt; 50 triệu VNĐ ngay lập tức.
                  </div>
                  {simState === "connected" ? (
                    <button
                      onClick={handleApproveException}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> 1-Click Duyệt Hoàn Tiền Tức Thì
                    </button>
                  ) : (
                    <span className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Đã Phê Duyệt Thành Công (SLA: 1 phút 15 giây)
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: VIP Retention & Revenue Calculator */}
      {activeTab === "roi" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-5">
            <h4 className="text-h6 text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-600" /> Tham Số Quy Mô Nhóm Khách Hàng VIP
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Tổng số lượng tài khoản VIP:</span>
                <span className="text-amber-600 font-bold">{vipCount.toLocaleString()} khách hàng</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={vipCount}
                onChange={(e) => setVipCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Chi tiêu bình quân / VIP / Năm:</span>
                <span className="text-amber-600 font-bold">{avgSpendPerVip.toLocaleString()} Triệu VNĐ</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={avgSpendPerVip}
                onChange={(e) => setAvgSpendPerVip(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Gia tăng tỷ lệ giữ chân VIP (Retention Uplift):</span>
                <span className="text-amber-600 font-bold">+{retentionUplift}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={retentionUplift}
                onChange={(e) => setRetentionUplift(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300">Tăng trưởng chi tiêu nhờ gắn kết (Upsell):</span>
                <span className="text-amber-600 font-bold">+{upsellGrowth}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={upsellGrowth}
                onChange={(e) => setUpsellGrowth(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-200 dark:border-amber-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doanh Thu Bảo Vệ Tránh Rời Bỏ</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                  {(protectedRevenueFromChurn / 1000000000).toFixed(2)} Tỷ VNĐ
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-amber-100 dark:border-amber-900/40">
                Giá trị doanh thu giữ lại được nhờ giảm thiểu tỷ lệ rời bỏ của các tài khoản lớn.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doanh Thu Tăng Trưởng (Upsell)</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {(additionalRevenueUpsell / 1000000000).toFixed(2)} Tỷ VNĐ
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-emerald-100 dark:border-emerald-900/40">
                Khách hàng VIP tin tưởng và mở rộng quy mô sử dụng dịch vụ thêm {upsellGrowth}%.
              </p>
            </div>

            <div className="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-200">
                  Tổng Giá Trị Kinh Doanh Tạo Ra / Năm
                </span>
                <div className="text-3xl sm:text-4xl font-black mt-1">
                  {(totalBusinessImpact / 1000000000).toFixed(2)} Tỷ VNĐ
                </div>
              </div>
              <div className="text-xs text-amber-100 max-w-xs text-center sm:text-right">
                Đầu tư vào đội ngũ VIP Desk mang lại tỷ suất sinh lời vượt trội (ROI &gt; 800%).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
