/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar as CalendarIcon, Clock, Video, Coffee, PhoneCall, 
  CheckCircle2, Download, ExternalLink, Sparkles, Send, X, User, Building, Mail
} from "lucide-react";
import { playUiSound } from "../lib/sound";
import { useLanguage } from "../i18n";

interface QuickCalendarBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = ["09:00", "10:30", "13:30", "15:00", "16:30", "18:00"];

const MEETING_TYPES = [
  { id: "gmeet", labelVi: "Google Meet (Online)", labelEn: "Google Meet (Online)", Icon: Video },
  { id: "office", labelVi: "Gặp Trực tiếp Office / Coffee", labelEn: "In-Person Office / Coffee", Icon: Coffee },
  { id: "phone", labelVi: "Cuộc gọi Điện thoại", labelEn: "Phone Call", Icon: PhoneCall }
];

export default function QuickCalendarBooking({ isOpen, onClose }: QuickCalendarBookingProps) {
  const { lang } = useLanguage();

  // Selected date defaults to tomorrow
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });

  const [selectedTime, setSelectedTime] = useState<string>("10:30");
  const [meetingType, setMeetingType] = useState<string>("gmeet");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateIcsFile = () => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const [hour, min] = selectedTime.split(":").map(Number);

    const start = new Date(Date.UTC(year, month - 1, day, hour, min));
    const end = new Date(Date.UTC(year, month - 1, day, hour + 1, min));

    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, "");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Nguyen Hung Thai Portfolio//Calendar Booking//VN
BEGIN:VEVENT
SUMMARY:Lịch hẹn Phỏng vấn - Nguyễn Hùng Thái & ${formData.name || "Nhà tuyển dụng"}
DESCRIPTION:Lịch hẹn trao đổi phỏng vấn vị trí Quản lý. Người đặt: ${formData.name} (${formData.company}). Ghi chú: ${formData.notes}
LOCATION:${meetingType === "gmeet" ? "Google Meet" : meetingType === "office" ? "Thành phố Hồ Chí Minh" : "Điện thoại"}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Interview_Appointment_Hung_Thai_${selectedDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoogleCalendarUrl = () => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const [hour, min] = selectedTime.split(":").map(Number);

    const start = new Date(Date.UTC(year, month - 1, day, hour, min));
    const end = new Date(Date.UTC(year, month - 1, day, hour + 1, min));

    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, "");

    const title = encodeURIComponent(`Lịch hẹn Phỏng vấn - Nguyễn Hùng Thái & ${formData.name || "Nhà tuyển dụng"}`);
    const details = encodeURIComponent(`Lịch hẹn trao đổi cơ hội nghề nghiệp. Người đặt: ${formData.name} (${formData.company}). Email: ${formData.email}. Note: ${formData.notes}`);
    const location = encodeURIComponent(meetingType === "gmeet" ? "Google Meet" : "TP. Hồ Chí Minh");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(start)}/${formatDate(end)}&details=${details}&location=${location}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUiSound("success");
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg rounded-3xl bg-slate-900/95 text-white border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,240,255,0.25)] p-5 sm:p-6 overflow-hidden relative max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {lang === "vi" ? "Đặt Lịch Hẹn Phỏng Vấn Trực Tiếp" : "Schedule Direct Interview"}
                </h3>
                <span className="text-3xs text-cyan-300 font-medium">
                  {lang === "vi" ? "Chọn thời gian phù hợp để trao đổi cơ hội hợp tác" : "Pick a suitable slot for executive discussion"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playUiSound("pop");
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-lg font-black text-white">
                {lang === "vi" ? "Đặt Lịch Phỏng Vấn Thành Công!" : "Interview Booking Confirmed!"}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                {lang === "vi" 
                  ? `Cảm ơn ${formData.name || "Nhà tuyển dụng"}. Lịch hẹn đã được lưu cho ngày ${selectedDate} lúc ${selectedTime}.` 
                  : `Thank you ${formData.name || "Recruiter"}. Appointment confirmed for ${selectedDate} at ${selectedTime}.`}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiSound("click")}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === "vi" ? "Thêm vào Google Calendar" : "Add to Google Calendar"}</span>
                </a>

                <button
                  type="button"
                  onClick={generateIcsFile}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === "vi" ? "Tải File iCal / Outlook" : "Download .ICS File"}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Meeting Format */}
              <div>
                <label className="text-3xs uppercase font-extrabold text-cyan-300 block mb-1.5">
                  {lang === "vi" ? "1. Hình thức phỏng vấn" : "1. Meeting Format"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MEETING_TYPES.map(({ id, labelVi, labelEn, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        playUiSound("haptic");
                        setMeetingType(id);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-1 ${
                        meetingType === id
                          ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                          : "bg-slate-950/60 border-white/5 hover:bg-slate-800/60 text-slate-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-3xs font-bold leading-tight">{lang === "vi" ? labelVi : labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-3xs uppercase font-extrabold text-cyan-300 block mb-1">
                    {lang === "vi" ? "2. Chọn ngày" : "2. Select Date"}
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs font-bold p-2.5 rounded-2xl border border-white/10 outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-3xs uppercase font-extrabold text-cyan-300 block mb-1">
                    {lang === "vi" ? "3. Khung giờ khả dụng" : "3. Time Slot"}
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs font-bold p-2.5 rounded-2xl border border-white/10 outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recruiter Details */}
              <div className="space-y-2">
                <label className="text-3xs uppercase font-extrabold text-cyan-300 block">
                  {lang === "vi" ? "4. Thông tin liên hệ" : "4. Contact Details"}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder={lang === "vi" ? "Họ & Tên của bạn" : "Your Name"}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 text-xs text-white p-2.5 pl-9 rounded-2xl border border-white/10 outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      name="company"
                      placeholder={lang === "vi" ? "Tên Công ty / Tập đoàn" : "Company Name"}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 text-xs text-white p-2.5 pl-9 rounded-2xl border border-white/10 outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder={lang === "vi" ? "Email nhận lịch hẹn" : "Recipient Email"}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 text-xs text-white p-2.5 pl-9 rounded-2xl border border-white/10 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>{lang === "vi" ? "Xác Nhận Đặt Lịch Hẹn" : "Confirm Booking"}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
