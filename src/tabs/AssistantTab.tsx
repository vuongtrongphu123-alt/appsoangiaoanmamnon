import React, { useState, useRef, useEffect } from 'react';
import { MessagesSquare, Send, Bot, Sparkles, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendChatMessageAI } from '../services/geminiService';

export const AssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Xin chào cô giáo! Mình là Bích Ngọc - Chuyên gia Sư phạm Mầm non. Cô đang gặp khó khăn khi chọn câu hỏi đàm thoại gợi mở, chưa biết xử lý tình huống trẻ chưa chú ý, hay cần gợi ý trò chơi mới cho tiết dự giờ sắp tới? Hãy nhắn cho Ngọc nhé!',
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const reply = await sendChatMessageAI(text);
      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: 'ai-err-' + Date.now(),
        sender: 'assistant',
        text: 'Ngọc đang kiểm tra lại tài liệu chuyên môn. Cô giáo hãy kiên nhẫn và thử lại sau một chút nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-teal-400 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base">
              Cô Giáo Bích Ngọc
            </h3>
            <p className="text-xs text-slate-500">
              Chuyên gia tư vấn chuyên môn, gợi ý câu hỏi đàm thoại, xử lý tình huống lớp học mầm non.
            </p>
          </div>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold hidden sm:inline">
          Năm học 2026–2027
        </span>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs h-[520px] flex flex-col overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-xs ${
                  msg.sender === 'user' ? 'bg-amber-500' : 'bg-sky-500'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : 'BN'}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-lg leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-sky-50 text-slate-800 rounded-tl-none border border-sky-100'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <div
                  className={`text-[10px] mt-1.5 ${
                    msg.sender === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                BN
              </div>
              <div className="bg-slate-100 p-3.5 rounded-2xl rounded-tl-none text-slate-400 flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="p-2.5 border-t border-slate-100 bg-slate-50 flex items-center gap-2 overflow-x-auto text-[11px]">
          <button
            type="button"
            onClick={() => handleSend('Làm sao để đặt câu hỏi mở thay vì câu hỏi đóng cho trẻ 4 tuổi?')}
            className="whitespace-nowrap px-3 py-1 bg-white hover:bg-sky-50 border border-slate-200 rounded-xl text-slate-700 transition cursor-pointer font-medium shadow-xs"
          >
            ❓ Cách đặt câu hỏi mở
          </button>
          <button
            type="button"
            onClick={() => handleSend('Gợi ý trò chơi vận động chống buồn ngủ cho trẻ giờ chiều')}
            className="whitespace-nowrap px-3 py-1 bg-white hover:bg-sky-50 border border-slate-200 rounded-xl text-slate-700 transition cursor-pointer font-medium shadow-xs"
          >
            🏃 Trò chơi xua tan uể oải
          </button>
          <button
            type="button"
            onClick={() => handleSend('Tiết học 5-6 tuổi làm sao đưa yếu tố STEAM đơn giản không tốn kém?')}
            className="whitespace-nowrap px-3 py-1 bg-white hover:bg-sky-50 border border-slate-200 rounded-xl text-slate-700 transition cursor-pointer font-medium shadow-xs"
          >
            🔬 Đưa STEAM vào bài học
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Hỏi cô Bích Ngọc bất kỳ điều gì về chuyên môn, giáo án, tâm sinh lý trẻ..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            className="w-10 h-10 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center transition shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
