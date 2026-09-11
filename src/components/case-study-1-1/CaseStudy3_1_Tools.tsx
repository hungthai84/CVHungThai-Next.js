import React, { useState } from "react";
import { 
  Database, 
  Layers, 
  Settings, 
  PhoneCall, 
  Globe, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Users, 
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Tag,
  Check,
  Building2,
  Calendar
} from "lucide-react";

export function CaseStudy3_1_Tools() {
  const [activeTab, setActiveTab] = useState<"crm360" | "workflow" | "migration">("crm360");

  // Tab 1: Customer 360 Viewer State
  const [selectedCustomerId, setSelectedCustomerId] = useState("CUS-8821");

  const customers = [
    {
      id: "CUS-8821",
      name: "Nguyễn Thu Hà",
      tier: "Diamond VIP",
      phone: "+84 908 *** 892",
      email: "ha.nguyen@enterprise.vn",
      company: "Apex Global Logistics",
      clv: "245,000,000 đ",
      csatScore: 5.0,
      openTickets: 0,
      totalOrders: 42,
      lastTouchpoint: "Hotline CTI (Hôm nay, 14:15)",
      tags: ["High Value", "Contract Renewer", "Priority Route"],
      timeline: [
        { time: "14:15 Hôm nay", channel: "Call Center (CTI)", title: "Cuộc gọi tư vấn gia hạn SLA Gold", agent: "Trần Minh Tâm (Senior)", status: "Completed" },
        { time: "10:30 Hôm qua", channel: "Zalo OA", title: "Xác nhận nhận hóa đơn GTGT điện tử", agent: "Auto-Bot", status: "Resolved" },
        { time: "3 ngày trước", channel: "Web Portal", title: "Nâng cấp gói API Enterprise tích hợp ERP", agent: "Hệ thống", status: "Success" }
      ]
    },
    {
      id: "CUS-7419",
      name: "Trần Đức Hoàng",
      tier: "Gold Member",
      phone: "+84 912 *** 345",
      email: "hoang.tran@techvn.io",
      company: "TechVN Solutions",
      clv: "86,500,000 đ",
      csatScore: 4.2,
      openTickets: 1,
      totalOrders: 18,
      lastTouchpoint: "Email (Hôm qua, 16:40)",
      tags: ["Tech Savvy", "Monthly Invoicing"],
      timeline: [
        { time: "16:40 Hôm qua", channel: "Email Helpdesk", title: "Yêu cầu cấp thêm 5 tài khoản phụ", agent: "Lê Hoàng Nam", status: "Pending Customer" },
        { time: "1 tuần trước", channel: "Call Center", title: "Hướng dẫn cài đặt webhook thông báo giao dịch", agent: "Phạm Thu Thảo", status: "Resolved" }
      ]
    },
    {
      id: "CUS-5502",
      name: "Công Ty CP Đầu Tư Sao Mai",
      tier: "Platinum Corporate",
      phone: "+84 28 3822 ****",
      email: "procurement@saomai.com.vn",
      company: "Tập Đoàn Sao Mai",
      clv: "620,000,000 đ",
      csatScore: 4.8,
      openTickets: 0,
      totalOrders: 156,
      lastTouchpoint: "Web API Sync (2 giờ trước)",
      tags: ["B2B Key Account", "Dedicated Account Manager"],
      timeline: [
        { time: "12:00 Hôm nay", channel: "ERP / Billing Sync", title: "Đối soát công nợ tự động kỳ Tháng 8", agent: "System Integrator", status: "Verified" },
        { time: "2 ngày trước", channel: "In-person Meeting", title: "Review định kỳ chất lượng dịch vụ Q3", agent: "Nguyễn Khánh Linh (CS Director)", status: "Excellent" }
      ]
    }
  ];

  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  // Tab 2: Workflow Trigger Simulator
  const [triggerCondition, setTriggerCondition] = useState("vip_call");
  const [executionLog, setExecutionLog] = useState<string[]>([
    "✓ Hệ thống CRM sẵn sàng tiếp nhận sự kiện.",
    "✓ Webhook CTI Tổng đài hoạt động bình thường (Latency: 12ms)."
  ]);

  const runSimulation = () => {
    if (triggerCondition === "vip_call") {
      setExecutionLog([
        "⚡ [14:37:02] Phát hiện cuộc gọi đến từ +84 908 *** 892",
        "🔍 [14:37:02] Tra cứu nhanh dữ liệu: Nhận diện khách hàng Nguyễn Thu Hà (Tier: Diamond VIP)",
        "🚀 [14:37:03] Bắn sự kiện CTI Screen Pop-up lên màn hình Agent Trần Minh Tâm (Senior Queue)",
        "📋 [14:37:03] Tự động load 360° Timeline và Gợi ý kịch bản: Chào đúng tên & tư vấn gia hạn SLA",
        "🏷️ [14:37:04] Gán Tag #VIP_Inbound và kích hoạt SLA tiếp nhận < 5 giây."
      ]);
    } else if (triggerCondition === "negative_csat") {
      setExecutionLog([
        "⚠️ [14:37:02] Khách hàng đánh giá CSAT 1 Sao (Ticket #TK-9921)",
        "🚨 [14:37:02] Kích hoạt Quy tắc Escalation: Gán nhãn #RedFlag_Detractor",
        "📨 [14:37:03] Tự động tạo Ticket Khiếu nại Cấp tốc gửi trực tiếp đến Team Lead Ca trực",
        "🔔 [14:37:03] Bắn cảnh báo Slack / SMS cho Trưởng phòng CSKH",
        "⏱️ [14:37:04] Đặt đồng hồ đếm ngược SLA can thiệp xử lý trong vòng 30 phút."
      ]);
    } else {
      setExecutionLog([
        "💳 [14:37:02] Giao dịch nạp tiền 50,000,000 đ ghi nhận thành công từ cổng Payment",
        "📈 [14:37:02] CRM tự động nâng Tier từ Gold Member lên Platinum Corporate",
        "🎁 [14:37:03] Kích hoạt luồng Automation: Gửi tin nhắn Zalo ZNS Chúc mừng & Thẻ đặc quyền VIP",
        "👤 [14:37:04] Tự động phân công Chuyên viên Quản lý Khách hàng Doanh nghiệp (Key Account Manager)."
      ]);
    }
  };

  // Tab 3: Migration Calculator
  const [totalRecords, setTotalRecords] = useState(150000);
  const [cleanlinessRate, setCleanlinessRate] = useState(85);
  const [dataSources, setDataSources] = useState(4);

  const estimatedDeduplication = Math.round(totalRecords * (1 - cleanlinessRate / 100) * 0.6);
  const finalCleanRecords = totalRecords - estimatedDeduplication;
  const estimatedTimeHours = Math.round((totalRecords / 25000) * (dataSources * 0.8));

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
        <button
          onClick={() => setActiveTab("crm360")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "crm360"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          1. Khám Phá Customer 360° Profile
        </button>

        <button
          onClick={() => setActiveTab("workflow")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "workflow"
              ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          2. Mô Phỏng Tự Động Hóa CRM (Workflow Engine)
        </button>

        <button
          onClick={() => setActiveTab("migration")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "migration"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200/50 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          3. Công Cụ Dự Toán Làm Sạch &amp; Di Chuyển Dữ Liệu
        </button>
      </div>

      {/* Tab 1: Customer 360 Explorer */}
      {activeTab === "crm360" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Customer list selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Danh Sách Mẫu Hồ Sơ</span>
              <span className="text-[11px] text-blue-600 font-semibold">{customers.length} Hồ Sơ 360°</span>
            </div>

            {customers.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCustomerId(c.id)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  selectedCustomerId === c.id
                    ? "bg-blue-50/90 dark:bg-blue-950/50 border-blue-400 dark:border-blue-600 shadow-md"
                    : "bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{c.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.tier.includes("Diamond") ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300" :
                    c.tier.includes("Platinum") ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-300" :
                    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                  }`}>
                    {c.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{c.company}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                  <span>CLV: <strong className="text-blue-600 dark:text-blue-400">{c.clv}</strong></span>
                  <span>Đơn hàng: <strong>{c.totalOrders}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* 360 Customer Detail View */}
          <div className="lg:col-span-8 space-y-4 bg-white/90 dark:bg-slate-900/90 p-5 rounded-3xl border border-blue-200/80 dark:border-blue-800/60 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{currentCustomer.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {currentCustomer.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" /> {currentCustomer.company} • {currentCustomer.phone} • {currentCustomer.email}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Dữ liệu đã đồng bộ 360°
                </span>
              </div>
            </div>

            {/* Quick KPI cards for customer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Giá trị vòng đời (CLV)</span>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{currentCustomer.clv}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Điểm hài lòng TB</span>
                <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">⭐ {currentCustomer.csatScore} / 5.0</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Ticket đang mở</span>
                <span className={`text-sm font-extrabold ${currentCustomer.openTickets > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                  {currentCustomer.openTickets} ticket
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Lần chạm gần nhất</span>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate block">
                  {currentCustomer.lastTouchpoint}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {currentCustomer.tags.map((tag, idx) => (
                <span key={idx} className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-800">
                  {tag}
                </span>
              ))}
            </div>

            {/* 360 Interaction Timeline */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-500" /> Dòng Thời Gian Tương Tác Hợp Nhất (Omnichannel Timeline)
              </h4>

              <div className="space-y-3">
                {currentCustomer.timeline.map((item, index) => (
                  <div key={index} className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      {item.channel.includes("Call") ? <PhoneCall className="w-4 h-4" /> :
                       item.channel.includes("Zalo") ? <MessageSquare className="w-4 h-4" /> :
                       item.channel.includes("Email") ? <Mail className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</span>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">{item.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <span>Kênh: <strong className="text-slate-700 dark:text-slate-300">{item.channel}</strong> • Phụ trách: <strong>{item.agent}</strong></span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Workflow Simulator */}
      {activeTab === "workflow" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/90 dark:bg-slate-900/90 p-6 rounded-3xl border border-purple-200/80 dark:border-purple-800/60 shadow-xl">
          <div className="lg:col-span-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Kích Hoạt Sự Kiện Tự Động (Trigger Simulation)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Chọn sự kiện đầu vào để kiểm tra cơ chế định tuyến, leo thang và pop-up màn hình của CRM.
              </p>
            </div>

            <div className="space-y-2.5">
              <label 
                onClick={() => setTriggerCondition("vip_call")}
                className={`p-3.5 rounded-2xl border cursor-pointer block transition-all ${
                  triggerCondition === "vip_call"
                    ? "bg-purple-50 dark:bg-purple-950/50 border-purple-400 dark:border-purple-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-purple-600" /> 1. Khách hàng VIP gọi vào Hotline
                  </span>
                  <input type="radio" checked={triggerCondition === "vip_call"} onChange={() => {}} className="accent-purple-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Định tuyến hàng đợi ưu tiên &amp; CTI Screen Pop-up thông tin 360° tức thì.
                </p>
              </label>

              <label 
                onClick={() => setTriggerCondition("negative_csat")}
                className={`p-3.5 rounded-2xl border cursor-pointer block transition-all ${
                  triggerCondition === "negative_csat"
                    ? "bg-purple-50 dark:bg-purple-950/50 border-purple-400 dark:border-purple-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" /> 2. Đánh giá CSAT 1-2 Sao (Khiếu nại)
                  </span>
                  <input type="radio" checked={triggerCondition === "negative_csat"} onChange={() => {}} className="accent-purple-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Tự động leo thang cấp tốc lên Team Lead &amp; Bật đồng hồ SLA cứu vãn 30 phút.
                </p>
              </label>

              <label 
                onClick={() => setTriggerCondition("tier_upgrade")}
                className={`p-3.5 rounded-2xl border cursor-pointer block transition-all ${
                  triggerCondition === "tier_upgrade"
                    ? "bg-purple-50 dark:bg-purple-950/50 border-purple-400 dark:border-purple-600 shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> 3. Nâng hạng Hội viên Platinum
                  </span>
                  <input type="radio" checked={triggerCondition === "tier_upgrade"} onChange={() => {}} className="accent-purple-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Gửi Zalo ZNS chúc mừng và phân bổ Account Manager chuyên trách.
                </p>
              </label>
            </div>

            <button
              onClick={runSimulation}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4" /> Kích Hoạt Luồng Tự Động Hóa Ngay
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl text-slate-100 font-mono text-xs space-y-3 flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-purple-400 font-bold flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 animate-spin" /> CRM Real-time Execution Console
                </span>
                <span className="text-[10px] text-slate-500">Log Buffer: Active</span>
              </div>

              <div className="space-y-2">
                {executionLog.map((log, index) => (
                  <div key={index} className="p-2 rounded bg-slate-900/80 border border-slate-800/80 text-[11px] leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>Trạng thái: <strong>SLA Trigger Verified</strong></span>
              <span>Thời gian phản hồi: <strong>0.14s</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Migration Calculator */}
      {activeTab === "migration" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/90 dark:bg-slate-900/90 p-6 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-xl">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Tham Số Dữ Liệu Cũ Cần Chuyển Đổi (Migration Sizing)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Điều chỉnh quy mô dữ liệu thô từ Excel/Hệ thống cũ để dự toán tỷ lệ làm sạch và tài nguyên cần thiết.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Tổng số bản ghi khách hàng (Records):</span>
                  <span className="text-emerald-600 font-bold">{totalRecords.toLocaleString()} bản ghi</span>
                </div>
                <input 
                  type="range" 
                  min={10000} 
                  max={1000000} 
                  step={10000}
                  value={totalRecords} 
                  onChange={(e) => setTotalRecords(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Mức độ hoàn thiện/chuẩn hóa dữ liệu nguồn:</span>
                  <span className="text-emerald-600 font-bold">{cleanlinessRate}%</span>
                </div>
                <input 
                  type="range" 
                  min={50} 
                  max={98} 
                  step={1}
                  value={cleanlinessRate} 
                  onChange={(e) => setCleanlinessRate(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Số lượng nguồn dữ liệu phân mảnh (Data Silos):</span>
                  <span className="text-emerald-600 font-bold">{dataSources} nguồn</span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={10} 
                  step={1}
                  value={dataSources} 
                  onChange={(e) => setDataSources(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-emerald-50/60 dark:bg-emerald-950/30 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kết Quả Ước Tính Làm Sạch &amp; Sẵn Sàng Go-Live
              </h4>

              <div className="grid grid-cols-2 gap-3 text-center mb-4">
                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40">
                  <span className="text-[11px] text-slate-500 block">Bản ghi trùng/lỗi lọc bỏ</span>
                  <strong className="text-rose-600 text-sm">{estimatedDeduplication.toLocaleString()}</strong>
                </div>

                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40">
                  <span className="text-[11px] text-slate-500 block">Bản ghi sạch nạp lên CRM</span>
                  <strong className="text-emerald-600 text-sm">{finalCleanRecords.toLocaleString()}</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-emerald-200/60 dark:border-emerald-900/60">
                  <span>Thời gian ETL &amp; Migration dự kiến:</span>
                  <strong>{estimatedTimeHours} giờ làm việc</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-emerald-200/60 dark:border-emerald-900/60">
                  <span>Chỉ số toàn vẹn dữ liệu (Integrity):</span>
                  <strong className="text-emerald-600 font-bold">99.98%</strong>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Tài liệu đào tạo &amp; Checklist bàn giao:</span>
                  <strong className="text-blue-600 font-semibold">100% Tiêu Chuẩn ISO</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-xl bg-emerald-600 text-white text-center text-xs font-bold shadow-md">
              ✓ Đạt chuẩn Go-Live CRM Toàn Doanh Nghiệp
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
