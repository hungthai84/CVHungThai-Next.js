import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Settings, X, Minus, Maximize2, Minimize2, Volume2, BookOpen, GripHorizontal, Plus } from 'lucide-react';
import { AIMessage as AIMessageType, AISettingsConfig } from '../../types/ai';
import { AIMessage } from './AIMessage';
import { AISampleQuestionsModal } from './AISampleQuestionsModal';
import { AIMultiLevelDropdown } from './AIMultiLevelDropdown';
import { safeStorage } from '../../lib/utils';

const AI_AVATAR_URL = 'https://i.ibb.co/S4Ddv53M/Avata-Chu-t-Tr-Nh-n.gif';

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: AIMessageType[];
  onSendMessage: (text: string) => void;
  onQuickQuestionSelect: (question: string) => void;
  config: AISettingsConfig;
  onOpenSettings: () => void;
  isSpeaking: boolean;
  speakingMessageId: string | null;
  onSpeakText: (text: string, msgId: string) => void;
  onStopSpeak: () => void;
  onActionClick: (actionType: string, target?: string) => void;
  isLoading: boolean;
  onNewChat?: () => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onQuickQuestionSelect,
  config: _config,
  onOpenSettings,
  isSpeaking,
  speakingMessageId,
  onSpeakText,
  onStopSpeak,
  onActionClick,
  isLoading,
  onNewChat
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Draggable popup state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if running in DEV mode
  const isDevMode = Boolean(
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) ||
    process.env.NODE_ENV !== 'production' ||
    (typeof window !== 'undefined' && (window.location.search.includes('dev=true') || safeStorage.getItem('dev_mode') === 'true'))
  );

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, isMinimized]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  // Reset position if maximized/minimized toggled or reset on re-open if needed
  useEffect(() => {
    if (!isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  // Drag listeners
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if ((e.target as HTMLElement).closest('button, input, textarea, a')) return;

    isDraggingRef.current = true;
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized) return;
    if ((e.target as HTMLElement).closest('button, input, textarea, a')) return;

    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      const rect = panelRef.current?.getBoundingClientRect();
      if (rect) {
        dragOffsetRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const panelWidth = panelRef.current?.offsetWidth || 420;
      const maxX = Math.max(0, window.innerWidth - panelWidth - 10);
      const maxY = Math.max(0, window.innerHeight - 120);

      const newX = Math.min(Math.max(10, e.clientX - dragOffsetRef.current.x), maxX);
      const newY = Math.min(Math.max(10, e.clientY - dragOffsetRef.current.y), maxY);

      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const panelWidth = panelRef.current?.offsetWidth || 420;
      const maxX = Math.max(0, window.innerWidth - panelWidth - 10);
      const maxY = Math.max(0, window.innerHeight - 120);

      const newX = Math.min(Math.max(10, e.touches[0].clientX - dragOffsetRef.current.x), maxX);
      const newY = Math.min(Math.max(10, e.touches[0].clientY - dragOffsetRef.current.y), maxY);

      setPosition({ x: newX, y: newY });
    };

    const handleEndDrag = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEndDrag);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleEndDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, []);

  if (!isOpen) return null;

  const handleSelectSampleQuestion = (q: string) => {
    if (!q || !q.trim() || isLoading) return;
    setIsNestedDropdownOpen(false);
    setIsSampleModalOpen(false);
    setInputText('');
    onSendMessage(q.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  // Web Speech API Voice Recognition (SpeechToText)
  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech API.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          onSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Minimized View (Floating compact bar/pill)
  if (isMinimized) {
    return (
      <div
        id="ai-assistant-panel-minimized"
        style={position ? { left: `${position.x}px`, top: `${position.y}px` } : undefined}
        className={`fixed z-[9998] ${!position ? 'bottom-20 right-4' : ''} bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl px-3 py-2 rounded-2xl shadow-2xl border border-indigo-400/40 dark:border-indigo-600/40 flex items-center gap-2.5 animate-slide-up cursor-pointer hover:scale-105 transition-all`}
        onClick={() => {
          setIsMinimized(false);
        }}
      >
        <img
          src={AI_AVATAR_URL}
          alt="AI Avatar"
          referrerPolicy="no-referrer"
          className="w-7 h-7 rounded-full object-cover border border-indigo-400 shadow-xs animate-pulse"
        />
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            Trí Nhân AI (Đang thu nhỏ)
          </span>
          <span className="text-[9.5px] text-indigo-600 dark:text-indigo-400">Click để mở rộng chat</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(false);
          }}
          className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 text-indigo-700 dark:text-indigo-300 ml-1 cursor-pointer"
          title="Mở lại khung chat"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-500 cursor-pointer"
          title="Đóng"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // Dynamic panel sizing based on isMaximized
  const panelSizeClasses = isMaximized
    ? 'fixed z-[9998] inset-2 sm:inset-6 max-w-5xl mx-auto h-[calc(100vh-24px)] sm:h-[calc(100vh-48px)]'
    : 'fixed z-[9998] w-[calc(100vw-16px)] sm:w-[460px] h-[calc(100vh-100px)] max-h-[640px]';

  const positionStyles = isMaximized
    ? undefined
    : position
    ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' }
    : undefined;

  return (
    <>
      {/* Mobile Backdrop Overlay (Tap outside to close on mobile if not dragged) */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9995] bg-black/20 dark:bg-black/40 backdrop-blur-xs sm:hidden animate-fade-in"
      />

      <div
        ref={panelRef}
        id="ai-assistant-panel"
        style={positionStyles}
        className={`${panelSizeClasses} ${!position && !isMaximized ? 'bottom-18 sm:bottom-22 right-2 sm:right-6' : ''} bg-white/60 dark:bg-slate-900/65 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 dark:border-white/20 flex flex-col overflow-hidden animate-slide-up transition-all duration-150`}
      >
        {/* HEADER BAR: NỀN TRONG SUỐT, ẨN TIÊU ĐỀ TRÍ NHÂN AI, CÓ THỂ RÊ POPUP, NÚT PHÓNG TO/THU NHỎ GẦN NÚT ĐÓNG */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="flex items-center justify-between px-3.5 py-2 bg-transparent select-none cursor-move shrink-0 border-b border-white/10 dark:border-white/5 active:cursor-grabbing"
          title="Nhấn giữ và rê để di chuyển popup"
        >
          {/* Left subtle handle indicator (Tiêu đề 'Trí Nhân AI' đã được ẩn) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-500/10 dark:bg-white/10 backdrop-blur-xs border border-white/20 text-slate-500 dark:text-slate-400 text-[10px] font-medium">
              <GripHorizontal className="w-3.5 h-3.5 opacity-60" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Right Action Buttons: Tạo chat mới (+), Thu nhỏ (-), Phóng to/Khôi phục, Tắt (X) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Nút Tạo chat mới */}
            {onNewChat && (
              <button
                type="button"
                onClick={onNewChat}
                className="p-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors cursor-pointer border border-indigo-400/20 flex items-center gap-1 text-[11px] font-semibold"
                title="Tạo cuộc trò chuyện mới"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Chat mới</span>
              </button>
            )}

            {/* Nút Thu nhỏ */}
            <button
              type="button"
              onClick={() => {
                setIsMinimized(true);
              }}
              className="p-1.5 rounded-xl bg-slate-200/50 hover:bg-slate-300/70 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Thu nhỏ thành thanh nổi"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Nút Phóng to / Thu nhỏ kích thước */}
            <button
              type="button"
              onClick={() => {
                setIsMaximized(!isMaximized);
              }}
              className="p-1.5 rounded-xl bg-slate-200/50 hover:bg-slate-300/70 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title={isMaximized ? "Thu nhỏ về kích thước chuẩn" : "Phóng to toàn màn hình"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Nút Đóng */}
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 hover:text-red-700 transition-colors cursor-pointer border border-red-400/20"
              title="Đóng popup Trợ lý AI"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* VOICE SPEAKING BAR STATUS */}
        {isSpeaking && (
          <div className="bg-emerald-500/15 dark:bg-emerald-950/40 border-b border-emerald-500/30 px-3.5 py-1.5 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200 shrink-0 animate-fade-in backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="font-semibold text-[11px]">Đang phát âm thanh câu trả lời...</span>
            </div>
            <button
              onClick={onStopSpeak}
              className="px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer"
            >
              Dừng đọc
            </button>
          </div>
        )}

        {/* CHAT MESSAGES AREA (XÓA GỢI Ý CÂU HỎI TIẾP THEO THEO YÊU CẦU) */}
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 relative">
          {/* Rendered Messages */}
          {messages.map(msg => (
            <AIMessage
              key={msg.id}
              message={msg}
              onSpeak={text => onSpeakText(text, msg.id)}
              onStopSpeak={onStopSpeak}
              isSpeakingThis={isSpeaking && speakingMessageId === msg.id}
              onActionClick={onActionClick}
              onSuggestionClick={onQuickQuestionSelect}
            />
          ))}

          {/* Loading / Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-indigo-200/60 dark:border-indigo-800/60 text-slate-600 dark:text-slate-300 text-xs w-max animate-pulse shadow-sm">
              <img
                src={AI_AVATAR_URL}
                alt="AI Avatar"
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover shrink-0"
              />
              <span>Trí Nhân AI đang suy nghĩ & tra cứu...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT CONTAINER: NHÓM MIC, CÂU HỎI MẪU VÀ NÚT GỬI VÀO TRONG KHUNG NHẬP TEXT */}
        <div className="p-2 sm:p-2.5 bg-transparent border-t border-white/20 dark:border-white/10 shrink-0 relative space-y-1.5">
          {/* QUICK QUESTION PILLS (CÁC NÚT BẤM CÂU HỎI GỢI Ý NHANH NGAY TRÊN/CẠNH KHUNG NHẬP) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
            {[
              "Tóm tắt kinh nghiệm 22 năm",
              "Kỹ năng Call Center & CX",
              "Dự án & Thành tựu",
              "Thông tin liên hệ"
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSampleQuestion(q)}
                className="px-2.5 py-1 rounded-full text-[10.5px] font-medium whitespace-nowrap bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 transition-all hover:scale-103 active:scale-95 cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* MULTI-LEVEL NESTED DROPDOWN (2 CỘT CHỦ ĐỀ) HIỂN THỊ NỔI PHÍA TRÊN KHUNG NHẬP */}
          <AIMultiLevelDropdown
            isOpen={isNestedDropdownOpen}
            onClose={() => setIsNestedDropdownOpen(false)}
            onSelectQuestion={handleSelectSampleQuestion}
          />

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-1.5 p-1.5 pl-2 rounded-2xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-slate-300/70 dark:border-slate-700/70 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500/80 transition-all"
          >
            {/* NÚT CÂU HỎI MẪU (GẦN ICON MICRO) */}
            <button
              type="button"
              onClick={() => {
                setIsNestedDropdownOpen(!isNestedDropdownOpen);
              }}
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                isNestedDropdownOpen
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-400/30'
              }`}
              title="Mở danh sách câu hỏi mẫu"
            >
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>

            {/* NÚT MICRO (VOICE INPUT) */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-600 dark:text-indigo-300 border border-indigo-400/30'
              }`}
              title={isListening ? 'Đang lắng nghe...' : 'Nói câu hỏi qua Micro (Voice)'}
            >
              {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Ô NHẬP TEXT */}
            <input
              ref={inputRef}
              type="text"
              placeholder={isListening ? 'Đang lắng nghe bạn nói...' : 'Nhập câu hỏi về Nguyễn Hùng Thái...'}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-transparent border-none text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none px-1.5"
            />

            {/* NÚT CÀI ĐẶT (CHỈ HIỂN THỊ Ở DẠNG DEV THEO YÊU CẦU) */}
            {isDevMode && (
              <button
                type="button"
                onClick={() => {
                  onOpenSettings();
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                title="Cài đặt cấu hình AI (Chỉ hiển thị ở Dev Mode)"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            {/* NÚT GỬI CÂU HỎI */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-35 text-white shadow-md transition-all active:scale-95 flex items-center justify-center shrink-0 cursor-pointer"
              title="Gửi câu hỏi"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* SAMPLE QUESTIONS LIST MODAL (FALLBACK MODAL) */}
        <AISampleQuestionsModal
          isOpen={isSampleModalOpen}
          onClose={() => setIsSampleModalOpen(false)}
          onSelectQuestion={handleSelectSampleQuestion}
        />
      </div>
    </>
  );
};

