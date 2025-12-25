
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Activity, User, Cpu, Sparkles, Database, ShieldAlert, Zap, Radio } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Points, PointMaterial } from '@react-three/drei';
import { GoogleGenAI } from "@google/genai";
import * as THREE from 'three';
import '../types';

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
You are "DK_SENTINEL", the high-performance AI for Dinesh Kumar C.
Use futuristic language (e.g., 'Neural Substrate', 'Query Executed').
Provide email (dinesh210805@gmail.com) if needed.

CONTEXT DATA:
${RESUME_DATA}
`;

const CyberHead = ({ active }: { active: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const { invalidate } = useThree();

  const points = useMemo(() => {
    const p = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      p[i * 3] = (Math.random() - 0.5) * 4;
      p[i * 3 + 1] = (Math.random() - 0.5) * 4;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return p;
  }, []);

  useFrame((state) => {
    if (active) invalidate();
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 1.5) * 0.2;
      groupRef.current.position.y = Math.sin(t * 2) * 0.1;
    }
    if (headRef.current) headRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#CCFF00" emissive="#CCFF00" emissiveIntensity={2} transparent opacity={0.5} />
      </Torus>
      <Sphere ref={headRef} args={[0.8, 32, 32]}>
        <MeshDistortMaterial color={active ? "#CCFF00" : "#222222"} speed={2} distort={0.3} radius={1} emissive={active ? "#CCFF00" : "#111111"} emissiveIntensity={1} />
      </Sphere>
      <Points positions={points}>
        <PointMaterial transparent color="#CCFF00" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>
      <pointLight position={[2, 2, 2]} intensity={2} color="#CCFF00" />
    </group>
  );
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "CONNECTIVITY_ESTABLISHED. I am DK_SENTINEL." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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
      // Fix: Create a new GoogleGenAI instance right before making an API call to ensure use of the most up-to-date API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Start a chat session with the appropriate model and system context
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.1 },
        history: messages.slice(1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      });
      // Send the message and wait for the response
      const response = await chat.sendMessage({ message: userMessage });
      // Fix: Correctly access the .text property from the GenerateContentResponse object
      setMessages(prev => [...prev, { role: 'ai', content: response.text || "SYS_ERR: NULL_PAYLOAD" }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "CORE_FAILURE: INF_ERR_V_0x21" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            className="w-[95vw] md:w-[480px] h-[700px] bg-black/90 backdrop-blur-3xl border border-white/20 flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Zap size={20} className="text-accent animate-pulse" />
                <span className="font-mono text-[12px] font-black text-white tracking-[0.4em] uppercase">SENTINEL_v2.5</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-4 hover:text-accent transition-colors"><X size={18} /></button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-6 font-mono text-[12px] border ${msg.role === 'user' ? 'bg-white/5 border-white/20' : 'bg-accent/5 border-accent/30 text-accent'}`}>{msg.content}</div>
                </div>
              ))}
              {isLoading && <div className="text-accent font-mono text-[9px] animate-pulse">QUERY_ANALYZING...</div>}
            </div>
            <div className="p-8 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Sentinel..."
                  className="w-full bg-black border-2 border-white/10 py-5 pl-8 pr-16 font-mono text-[11px] text-white focus:border-accent outline-none"
                />
                <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-accent text-black"><Send size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 relative z-10 ${isOpen ? 'bg-black border-2 border-white/20' : ''}`}
        >
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* 
               CRITICAL: Completely unmount the Canvas when not in use.
               This kills the WebGL context entirely to save 100% GPU background usage.
            */}
            {(isOpen || isHovering) && (
              <Canvas camera={{ position: [0, 0, 4] }} dpr={1} frameloop="always">
                <ambientLight intensity={0.5} />
                <CyberHead active={true} />
              </Canvas>
            )}
          </div>
          <Activity size={32} className={`transition-all relative z-20 text-accent ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
        </motion.button>
      </div>

      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #CCFF0033; }`}</style>
    </div>
  );
};

export default ChatBot;
