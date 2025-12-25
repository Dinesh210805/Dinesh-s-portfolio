
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Activity, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const RESUME_DATA = `
IDENTITY: Dinesh Kumar C
CORE STACK: Generative AI, Machine Learning, Full-Stack Development.
WEB SPECIALIZATION: Python (Flask), React.js, HTML/CSS. 
CRITICAL NOTE: Dinesh does NOT use Java for web development.
EDUCATION: B.Tech IT at SMV Engineering College (CGPA: 8.91).
PROJECTS: GravitycARgo, EcoBot, The Light, Langlearn.
`;

const SYSTEM_INSTRUCTION = `
You are a professional assistant for Dinesh Kumar C's portfolio.
Be helpful, concise, and professional. 
Refer to Dinesh in the third person or as "the developer".
Contact: dinesh210805@gmail.com

CONTEXT:
${RESUME_DATA}
`;

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello. I'm Dinesh's assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.1 },
        history: messages.slice(1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      });
      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'ai', content: response.text || "I'm sorry, I couldn't process that request." }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[300] flex flex-col items-end gap-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-[90vw] md:w-[380px] h-[500px] bg-[#0c0c0c] border border-white/10 flex flex-col overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] rounded-lg"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-display text-[11px] font-bold text-white tracking-widest uppercase">Portfolio AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 text-white/40 hover:text-accent transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-black/40 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-3.5 text-[12px] leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-white/5 border border-white/10 text-white rounded-bl-xl rounded-tl-xl rounded-tr-xl' 
                      : 'bg-accent/5 border border-accent/20 text-accent/90 rounded-br-xl rounded-tr-xl rounded-tl-xl'}
                  `}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-accent/40 font-mono text-[8px] animate-pulse">
                  <Activity size={10} />
                  PROCESSING...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my projects..."
                  className="w-full bg-black/50 border border-white/10 py-3.5 pl-5 pr-12 text-[12px] text-white focus:border-accent outline-none transition-all placeholder:text-white/20 rounded-md"
                />
                <button 
                  onClick={handleSend} 
                  disabled={isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-accent hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between opacity-30">
                <div className="flex items-center gap-2">
                  <Info size={8} className="text-white" />
                  <span className="text-[7px] text-white uppercase tracking-widest font-mono">Gemini_Powered</span>
                </div>
                <span className="text-[7px] text-white uppercase tracking-widest font-mono">v2.1</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplified Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative border
          ${isOpen ? 'bg-white text-black border-white' : 'bg-accent text-black border-accent'}
        `}
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        {!isOpen && (
          <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20 pointer-events-none" />
        )}
      </button>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(204, 255, 0, 0.1); }
      `}</style>
    </div>
  );
};

export default ChatBot;
