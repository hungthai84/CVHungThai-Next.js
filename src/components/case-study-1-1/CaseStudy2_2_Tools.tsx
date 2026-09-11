import React, { useState } from "react";
import { 
  Calculator, 
  Network, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Share2, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Smartphone,
  Layers,
  ArrowRight
} from "lucide-react";
import { playUiSound } from "../../lib/sound";

export function CaseStudy2_2_Tools() {
  const [activeTab, setActiveTab] = useState<"profile360" | "channelShift" | "slaCompare">("profile360");

  // Tab 1: Customer 360 Selector
  const [selectedCustomer, setSelectedCustomer] = useState<"vip" | "standard" | "new">("vip");

  // Tab 2: Channel Shift ROI State
  const [totalInteractions, setTotalInteractions] = useState<number>(30000);
  const [callPercent, setCallPercent] = useState<number>(55); // 55% currently on expensive call
  const [targetCallPercent, setTargetCallPercent] = useState<number>(25); // Target reduction to 25%
  
  const callCost = 28000; // 28,000 VND / call
  const chatCost = 9000;  // 9,000 VND / chat session
  const zaloEmailCost = 6000; // 6,000 VND / message

  // Cost calculation
  const currentCallCount = (totalInteractions * callPercent) / 100;
  const currentDigitalCount = totalInteractions - currentCallCount;
  const currentMonthlyCost = (currentCallCount * callCost) + (currentDigitalCount * chatCost);

  const targetCallCount = (totalInteractions * targetCallPercent) / 100;
  const targetDigitalCount = totalInteractions - targetCallCount;
  const targetMonthlyCost = (targetCallCount * callCost) + (targetDigitalCount * ((chatCost + zaloEmailCost) / 2));

  const monthlySavings = currentMonthlyCost - targetMonthlyCost;
  const yearlySavings = monthlySavings * 12;

  const customersData = {
    vip: {
      name: "Nguyễn Anh Thư",
      id: "CUS-10086",
      tier: "Diamond VIP",
      phone: "0901 888 999",
      email: "thu.nguyen@enterprise.vn",
      ltv: "85.000.000 VNĐ",
      sentiment: "Tích cực (NPS 10/10)",
      timeline: [
        { time: "10:32 AM hôm nay", channel: "Live Chat", icon: MessageSquare, action: "Hỏi tiến độ kích hoạt dịch vụ gói doanh nghiệp", status: "Đã giải quyết" },
        { time: "10:27 AM hôm nay", channel: "Hotline", icon: PhoneCall, action: "Đàm thoại 5p12s tư vấn nâng cấp tính năng", status: "Hoàn tất" },
        { time: "Hôm qua", channel: "Facebook Messenger", icon: Share2, action: "Nhắn tin gửi giấy phép kinh doanh bổ sung", status: "Đã lưu hồ sơ" },
        { time: "2 ngày trước", channel: "Email", icon: Mail, action: "Gửi hợp đồng ký số điện tử", status: "Đã đối soát" }
      ]
    },
    standard: {
      name: "Trần Minh Quang",
      id: "CUS-07421",
      tier: "Standard Member",
      phone: "0912 345 678",
      email: "quang.tm@gmail.com",
      ltv: "12.500.000 VNĐ",
      sentiment: "Trung lập (NPS 7/10)",
      timeline: [
        { time: "14:15 PM hôm nay", channel: "Zalo OA", icon: Smartphone, action: "Hỏi mã khuyến mãi mùa lễ hội", status: "Tự động gửi voucher" },
        { time: "3 ngày trước", channel: "Hotline", icon: PhoneCall, action: "Hỏi hướng dẫn đổi mật khẩu tài khoản", status: "Đã gửi link reset" }
      ]
    },
    new: {
      name: "Lê Hoàng Yến",
      id: "CUS-19032",
      tier: "Khách hàng mới (Trial)",
      phone: "0988 776 655",
      email: "hoangyen.le@outlook.com",
      ltv: "2.100.000 VNĐ",
      sentiment: "Hài lòng (CSAT 5/5)",
      timeline: [
        { time: "09:00 AM hôm nay", channel: "Live Chat", icon: MessageSquare, action: "Tạo tài khoản dùng thử và nhờ hỗ trợ setup", status: "Đang Onboarding" }
      ]
    }
  };

  return (
    <div className="glass-inner p-6 sm:p-8 rounded-3xl space-y-6 border border-indigo-300/60 dark:border-indigo-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-100 dark:border-indigo-900/50 pb-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Bộ Công Cụ Tối Ưu Hóa Kênh Hỗ Trợ
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Trình Giả Lập Customer 360 &amp; Máy Tính Dịch Chuyển Kênh
          </h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-indigo-100/70 dark:bg-slate-800/80 rounded-2xl border border-indigo-200/60 dark:border-indigo-700/60 text-xs font-bold">
          <button
            onClick={() => { playUiSound("click"); setActiveTab("profile360"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "profile360" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-indigo-600"}`}
          >
            1. Trực Quan Customer 360°
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("channelShift"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "channelShift" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-indigo-600"}`}
          >
            2. ROI Dịch Chuyển Kênh Số
          </button>
          <button
            onClick={() => { playUiSound("click"); setActiveTab("slaCompare"); }}
            className={`px-3 py-1.5 rounded-xl transition-all ${activeTab === "slaCompare" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 dark:text-slate-300 hover:text-indigo-600"}`}
          >
            3. So Sánh Đa Kênh vs Hợp Nhất
          </button>
        </div>
      </div>

      {/* TAB 1: CUSTOMER 360 PROFILE */}
      {activeTab === "profile360" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Chọn mẫu hồ sơ khách hàng:</span>
            {[
              { id: "vip", label: "Khách hàng Doanh Nghiệp (Diamond VIP)" },
              { id: "standard", label: "Khách hàng Tiêu Chuẩn (Standard)" },
              { id: "new", label: "Khách hàng Mới (Trial User)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { playUiSound("click"); setSelectedCustomer(tab.id as any); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCustomer === tab.id 
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20 scale-[1.02]" 
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-indigo-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Info Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-sky-500/10 border border-indigo-200 dark:border-indigo-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/30">
                  {customersData[selectedCustomer].name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {customersData[selectedCustomer].name}
                  </h4>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {customersData[selectedCustomer].id}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-indigo-100 dark:border-indigo-900/50 pt-3 text-slate-700 dark:text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Hạng Thành Viên:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-300">{customersData[selectedCustomer].tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Số Điện Thoại:</span>
                  <span className="font-semibold">{customersData[selectedCustomer].phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-semibold">{customersData[selectedCustomer].email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Giá Trị Trọn Đời (LTV):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{customersData[selectedCustomer].ltv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Chỉ Số Hài Lòng:</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">{customersData[selectedCustomer].sentiment}</span>
                </div>
              </div>
            </div>

            {/* Timeline Multi-channel */}
            <div className="lg:col-span-2 p-5 rounded-3xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  Dòng Thời Gian Tương Tác Hợp Nhất (Omni-Channel Timeline)
                </h4>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                  Dữ liệu thời gian thực
                </span>
              </div>

              <div className="space-y-3">
                {customersData[selectedCustomer].timeline.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-start justify-between gap-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white">{item.channel}</span>
                            <span className="text-[10px] text-slate-400">• {item.time}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 mt-0.5">{item.action}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-100/70 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] shrink-0">
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHANNEL SHIFT ROI */}
      {activeTab === "channelShift" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tổng lượng tương tác hỗ trợ / tháng:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{totalInteractions.toLocaleString()} lượt</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={2000}
                  value={totalInteractions}
                  onChange={(e) => setTotalInteractions(Number(e.target.value))}
                  className="w-full h-2 bg-indigo-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tỷ lệ gọi điện thoại Hotline hiện tại:</span>
                  <span className="text-rose-600 font-extrabold">{callPercent}% ({Math.round(currentCallCount).toLocaleString()} cuộc)</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={80}
                  step={5}
                  value={callPercent}
                  onChange={(e) => setCallPercent(Number(e.target.value))}
                  className="w-full h-2 bg-rose-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Mục tiêu dịch chuyển sang Kênh Số (Chat / Zalo OA / In-app):</span>
                  <span className="text-emerald-600 font-extrabold">Hotline còn {targetCallPercent}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={callPercent - 5}
                  step={5}
                  value={targetCallPercent}
                  onChange={(e) => setTargetCallPercent(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* Calculated Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/15 via-emerald-500/10 to-sky-500/15 border border-indigo-300/70 dark:border-indigo-700/60 space-y-4">
              <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                Bảng Ước Tính Tiết Kiệm Chi Phí Cước &amp; Nhân Lực
              </span>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800">
                  <span className="text-[10px] text-slate-500 block">Chi phí vận hành trước đây / tháng</span>
                  <span className="text-lg font-black text-rose-600">
                    {Math.round(currentMonthlyCost / 1000000).toLocaleString()} Tr VNĐ
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800">
                  <span className="text-[10px] text-slate-500 block">Chi phí sau khi dịch chuyển kênh / tháng</span>
                  <span className="text-lg font-black text-emerald-600">
                    {Math.round(targetMonthlyCost / 1000000).toLocaleString()} Tr VNĐ
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-700 col-span-2">
                  <span className="text-[10px] text-slate-500 block">Ngân sách tiết kiệm được / năm</span>
                  <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {Math.round(yearlySavings / 1000000).toLocaleString()} Triệu VNĐ
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tiết kiệm ~{Math.round((monthlySavings / currentMonthlyCost) * 100)}% tổng chi phí viễn thông &amp; vận hành kênh.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SLA & CHANNEL COMPARISON */}
      {activeTab === "slaCompare" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
              <h4 className="font-extrabold text-rose-700 dark:text-rose-300 uppercase flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Mô Hình Đa Kênh Phân Mảnh (Multi-Channel Cũ)
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <li>• <strong>Phần mềm riêng rẽ:</strong> Agent mở tổng đài riêng, email riêng, chat riêng.</li>
                <li>• <strong>Khách hàng lặp lại:</strong> Gọi lên hotline phải kể lại toàn bộ nội dung đã chat hôm qua.</li>
                <li>• <strong>Sót lọt tin nhắn:</strong> 8-12% tin nhắn fanpage bị trôi trong giờ cao điểm.</li>
                <li>• <strong>Báo cáo rời rạc:</strong> Mất 2-3 ngày tổng hợp số liệu Excel từ từng kênh.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h4 className="font-extrabold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Mô Hình Hợp Nhất Đa Kênh (True Omni-Channel Mới)
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                <li>• <strong>Single Workspace:</strong> 100% kênh đổ về 1 giao diện duy nhất, tự động cân bằng tải.</li>
                <li>• <strong>Nhận diện 360°:</strong> Agent biết ngay lịch sử giao dịch và vấn đề chưa giải quyết của khách.</li>
                <li>• <strong>Không sót lọt:</strong> Hệ thống gắn ticket và tính SLA tự động cho mọi tương tác.</li>
                <li>• <strong>Real-time Dashboard:</strong> Báo cáo hiệu suất theo thời gian thực trên 1 bảng điều khiển.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
