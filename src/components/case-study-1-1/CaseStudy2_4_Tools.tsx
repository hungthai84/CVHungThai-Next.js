import React, { useState } from "react";
import { 
  Calculator, 
  PhoneCall, 
  PhoneForwarded, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Sliders, 
  Users, 
  ShieldCheck, 
  Zap, 
  Target,
  ArrowRight,
  Headphones
} from "lucide-react";
import { playUiSound } from "../../lib/sound";

export function CaseStudy2_4_Tools() {
  const [activeTab, setActiveTab] = useState<"script" | "dialer" | "roi">("script");

  // Tab 1: Script & Objection State
  const [campaignType, setCampaignType] = useState<"renewal" | "winback" | "survey">("renewal");
  const [selectedObjection, setSelectedObjection] = useState<string>("busy");

  // Tab 2: Dialer Comparison State
  const [dialerMode, setDialerMode] = useState<"manual" | "progressive" | "predictive">("predictive");

  // Tab 3: Outbound ROI Calculator State
  const [leadCount, setLeadCount] = useState<number>(8000);
  const [reachRate, setReachRate] = useState<number>(72); // 72%
  const [conversionRate, setConversionRate] = useState<number>(18); // 18%
  const [averageValue, setAverageValue] = useState<number>(1200000); // 1,200,000 VND per order/renewal
  const [campaignCost, setCampaignCost] = useState<number>(45000000); // 45,000,000 VND

  // Calculations for Tab 3
  const connectedCalls = (leadCount * reachRate) / 100;
  const successfulConversions = (connectedCalls * conversionRate) / 100;
  const totalRevenue = successfulConversions * averageValue;
  const netProfit = totalRevenue - campaignCost;
  const roi = campaignCost > 0 ? Math.round((netProfit / campaignCost) * 100) : 0;

  const scriptData = {
    renewal: {
      title: "Chiến Dịch Tái Ký & Chăm Sóc Khách VIP",
      hook: `"Dạ em chào anh/chị Nam, em là Hoàng từ Ban Chăm sóc Khách hàng Doanh nghiệp của Công ty ABC. Em gọi để gửi lời tri ân vì anh đã đồng hành cùng bên em tròn 1 năm qua và thông báo về gói nâng cấp đặc quyền dành riêng cho anh trong tháng này ạ!"`,
      discovery: `"Dạ không biết trong 1 năm qua, hiệu quả vận hành của phần mềm bên em đã đáp ứng tốt các mục tiêu kinh doanh của công ty mình chưa anh?"`,
      objections: {
        busy: {
          label: "Khách bận: 'Anh đang bận họp, gọi lại sau nhé'",
          response: `"Dạ em hoàn toàn hiểu ạ! Em chỉ xin phép gọi lại đúng 3 phút vào 16h30 chiều nay hoặc gửi bảng so sánh ưu đãi đặc quyền qua Zalo cho anh trước nhé?"`
        },
        expensive: {
          label: "Khách chê đắt: 'Phí gia hạn đợt này cao hơn năm ngoái'",
          response: `"Dạ em hiểu ngân sách là yếu tố rất quan trọng. Tuy nhiên gói năm nay đã tích hợp sẵn tính năng Tự động hóa AI trị giá 15 triệu hoàn toàn miễn phí. Nếu tính trên hiệu suất tiết kiệm 2 nhân sự thì chi phí thực tế lại giảm 30% so với trước anh ạ!"`
        }
      }
    },
    winback: {
      title: "Chiến Dịch Kích Hoạt Lại Khách Hàng Ngủ Quên (Win-back)",
      hook: `"Dạ chào chị Thảo, em là Minh từ thương hiệu XYZ. Em thấy tài khoản của chị đã tạm dừng sử dụng hơn 3 tháng nay, nên hôm nay em gọi để lắng nghe xem bên em có điểm nào chưa hoàn thiện khiến chị chưa hài lòng ạ?"`,
      discovery: `"Dạ không biết thời gian qua chị chuyển sang giải pháp khác hay có vướng mắc gì về tính năng bên em cần hỗ trợ không chị?"`,
      objections: {
        busy: {
          label: "Khách từ chối: 'Dạo này chị không có nhu cầu nữa'",
          response: `"Dạ em cảm ơn chị đã chia sẻ. Bên em vừa ra mắt phiên bản Lite tinh gọn hoàn toàn mới. Em xin phép kích hoạt gói trải nghiệm miễn phí 30 ngày kèm voucher 30% để khi nào phát sinh nhu cầu chị có thể dùng ngay nhé!"`
        },
        expensive: {
          label: "Khách phàn nàn: 'Lần trước dịch vụ giao hàng chậm quá'",
          response: `"Dạ em vô cùng xin lỗi chị vì trải nghiệm chưa tốt lần trước. Hiện bên em đã đổi sang đối tác vận chuyển hỏa tốc cam kết giao trong 2h. Em xin gửi tặng chị mã miễn phí vận chuyển trọn đời cho 3 đơn tới ạ!"`
        }
      }
    },
    survey: {
      title: "Chiến Dịch Khảo Sát CSAT/NPS & Lắng Nghe Khách Hàng",
      hook: `"Dạ em chào anh Hùng, em là Trang từ Bộ phận Đảm bảo Chất lượng Dịch vụ. Em thấy đơn hàng #ORD-9921 của anh vừa được giao thành công sáng nay. Em xin phép gọi 1 phút để lắng nghe đánh giá của anh về chất lượng sản phẩm và thái độ phục vụ của bạn shipper ạ!"`,
      discovery: `"Dạ trên thang điểm từ 1 đến 10, anh chấm mức độ hài lòng với lần mua hàng này là mấy điểm ạ?"`,
      objections: {
        busy: {
          label: "Khách vội: 'Anh đang lái xe, không tiện nói chuyện'",
          response: `"Dạ em xin lỗi đã làm phiền anh lúc lái xe ạ! Em xin phép gửi đường link khảo sát 1 chạm 5 giây qua tin nhắn Zalo, khi nào thuận tiện anh bấm chọn giúp em nhé. Chúc anh lái xe an toàn ạ!"`
        },
        expensive: {
          label: "Khách góp ý: 'Sản phẩm tốt nhưng bao bì đóng gói hơi sơ sài'",
          response: `"Dạ em cảm ơn góp ý vô cùng quý báu của anh! Em đã ghi nhận ngay vào biên bản cải tiến gửi sang xưởng đóng gói và xin phép gửi tặng anh voucher 50.000đ cho đơn hàng sau ạ!"`
        }
      }
    }
  };

  return (
    <div className="glass-inner p-6 sm:p-8 rounded-3xl space-y-6 border border-amber-300/60 dark:border-amber-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 dark:border-amber-900/50 pb-4">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Bộ Công Cụ Chiến Dịch Outbound
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Trình Giả Lập Kịch Bản Đàm Thoại &amp; Máy Tính Doanh Thu Outbound
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-amber-100/70 dark:bg-slate-800/80 rounded-2xl border border-amber-200/60 dark:border-amber-700/60 text-xs font-bold">
          <button
            onClick={() => { playUiSound("click"); setActiveTab("script"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "script" ? "bg-amber-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-amber-600"}`}
          >
            1. Kịch Bản &amp; Xử Lý Từ Chối
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("dialer"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "dialer" ? "bg-amber-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-amber-600"}`}
          >
            2. So Sánh Auto-Dialer
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("roi"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "roi" ? "bg-amber-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-amber-600"}`}
          >
            3. Tính ROI Chiến Dịch
          </button>
        </div>
      </div>

      {/* TAB 1: SCRIPT & OBJECTION HANDLING */}
      {activeTab === "script" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Chọn loại chiến dịch:</span>
            {[
              { id: "renewal", label: "Tái Ký & Chăm Sóc VIP" },
              { id: "winback", label: "Win-Back Khách Cũ" },
              { id: "survey", label: "Khảo Sát Hài Lòng CSAT" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { playUiSound("click"); setCampaignType(tab.id as any); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  campaignType === tab.id 
                    ? "bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-500/20 scale-[1.02]" 
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Script Flow */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-800 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/50 pb-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Hook 15 Giây Mở Đầu Cuộc Gọi
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                    Tỷ lệ giữ chân 82%
                  </span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-serif italic bg-amber-50/50 dark:bg-slate-900/50 p-3 rounded-xl border border-amber-100 dark:border-amber-900">
                  {scriptData[campaignType].hook}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-indigo-500" /> Câu Hỏi Thăm Dò Nhu Cầu (Discovery)
                </h4>
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-serif italic bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  {scriptData[campaignType].discovery}
                </p>
              </div>
            </div>

            {/* Objection Matrix */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-amber-200 dark:border-amber-800 space-y-4">
              <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">
                Xử Lý Tình Huống Từ Chối (Objections)
              </span>

              <div className="space-y-2">
                <button
                  onClick={() => { playUiSound("click"); setSelectedObjection("busy"); }}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
                    selectedObjection === "busy" 
                      ? "bg-amber-600 text-white border-amber-500 shadow-sm" 
                      : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {scriptData[campaignType].objections.busy.label}
                </button>

                <button
                  onClick={() => { playUiSound("click"); setSelectedObjection("expensive"); }}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
                    selectedObjection === "expensive" 
                      ? "bg-amber-600 text-white border-amber-500 shadow-sm" 
                      : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {scriptData[campaignType].objections.expensive.label}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-amber-300 dark:border-amber-700 text-xs space-y-1.5">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Phản hồi gợi ý cho Agent:
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-serif italic leading-relaxed">
                  {scriptData[campaignType].objections[selectedObjection as "busy" | "expensive"].response}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTO-DIALER COMPARISON */}
      {activeTab === "dialer" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "manual", title: "Quay Số Thủ Công (Quay tay)", desc: "Agent tự nhìn SĐT và bấm phím", talkTime: "18 phút / giờ", calls: "45 cuộc / ngày" },
              { id: "progressive", title: "Progressive Dialer", desc: "Hệ thống tự bấm gọi từng số khi Agent rảnh", talkTime: "32 phút / giờ", calls: "90 cuộc / ngày" },
              { id: "predictive", title: "Predictive Auto-Dialer", desc: "Thuật toán quay số trước, chỉ nối khi bắt máy", talkTime: "48 phút / giờ", calls: "150 cuộc / ngày" }
            ].map(item => (
              <div
                key={item.id}
                onClick={() => { playUiSound("click"); setDialerMode(item.id as any); }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  dialerMode === item.id 
                    ? "bg-amber-500/15 border-amber-500 shadow-md ring-2 ring-amber-500/30" 
                    : "bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-amber-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{item.title}</h4>
                  {dialerMode === item.id && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </div>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Thời lượng nói:</span>
                    <span className="font-bold text-amber-600">{item.talkTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Năng suất Agent:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.calls}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-200 font-medium">
            💡 <strong>Hiệu quả vượt trội của Predictive Dialer:</strong> Tiết kiệm tới <strong>65% thời gian chết</strong> của nhân viên (thời gian nghe chuông tút tút, máy bận, sai số), giúp tỷ lệ thời gian trò chuyện hữu ích (Talk-time ratio) tăng từ 30% lên 80% trong mỗi ca trực.
          </div>
        </div>
      )}

      {/* TAB 3: OUTBOUND ROI & REVENUE CALCULATOR */}
      {activeTab === "roi" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Quy mô tệp khách hàng mục tiêu:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">{leadCount.toLocaleString()} liên hệ</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={1000}
                  value={leadCount}
                  onChange={(e) => setLeadCount(Number(e.target.value))}
                  className="w-full h-2 bg-amber-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tỷ lệ kết nối thành công (Reach Rate):</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">{reachRate}% ({Math.round(connectedCalls).toLocaleString()} cuộc nối máy)</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={90}
                  step={2}
                  value={reachRate}
                  onChange={(e) => setReachRate(Number(e.target.value))}
                  className="w-full h-2 bg-amber-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tỷ lệ chuyển đổi thành công (Conversion Rate):</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{conversionRate}% ({Math.round(successfulConversions).toLocaleString()} đơn chốt)</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Giá trị trung bình mỗi đơn / hợp đồng tái ký:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{averageValue.toLocaleString()} VNĐ</span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={5000000}
                  step={100000}
                  value={averageValue}
                  onChange={(e) => setAverageValue(Number(e.target.value))}
                  className="w-full h-2 bg-indigo-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Calculated Results */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-emerald-500/15 border border-amber-300/70 dark:border-amber-700/60 space-y-4">
              <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">
                Hiệu Quả Doanh Thu &amp; Lợi Nhuận Chiến Dịch
              </span>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] text-slate-500 block">Tổng doanh thu tạo ra</span>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-300">
                    {Math.round(totalRevenue / 1000000).toLocaleString()} Tr VNĐ
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] text-slate-500 block">Tỷ suất sinh lời ROI</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    +{roi}%
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-700 col-span-2">
                  <span className="text-[10px] text-slate-500 block">Lợi nhuận ròng sau khi trừ chi phí vận hành</span>
                  <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {Math.round(netProfit / 1000000).toLocaleString()} Triệu VNĐ
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tạo ra trung bình {Math.round(totalRevenue / connectedCalls).toLocaleString()} VNĐ trên mỗi cuộc gọi kết nối thành công.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
