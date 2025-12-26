
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Activity, Shield, Hash, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('SENDING');
    
    try {
      const formData = new FormData(formRef.current!);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setFormState('SUCCESS');
        formRef.current?.reset();
      } else {
        console.error('Form submission failed:', data);
        setFormState('IDLE');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState('IDLE');
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-32 bg-background overflow-hidden border-t border-white/5"
    >
      {/* Interactive Mouse Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204, 255, 0, 0.04), transparent 80%)`,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#CCFF00_1px,transparent_1px),linear-gradient(to_bottom,#CCFF00_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Context & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-16">
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-accent" />
                <span className="font-mono text-accent text-[10px] tracking-[0.5em] uppercase font-bold">Comms_Protocol_v3</span>
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-tight uppercase">
                  INITIATE <br /> 
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px #CCFF00' }}>CHANNEL.</span>
                </h2>
                <p className="text-secondary text-lg max-w-sm leading-relaxed font-light">
                  Available for strategic collaborations, industrial-grade engineering, and high-performance system design.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {/* HUD Stats Component */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[8px] text-white/40 uppercase tracking-widest">
                    <Shield size={10} className="text-accent" />
                    <span>Secure_Link</span>
                  </div>
                  <p className="font-mono text-[10px] text-white/60 tracking-wider">AES-256_ENCRYPTED</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[8px] text-white/40 uppercase tracking-widest">
                    <Activity size={10} className="text-accent" />
                    <span>Latency</span>
                  </div>
                  <p className="font-mono text-[10px] text-white/60 tracking-wider">22MS_STABLE</p>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-[0.4em]">Local_Time</span>
                  <span className="font-mono text-xs text-white uppercase tracking-widest font-medium">PUDUCHERRY, IN</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-[0.4em]">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-xs text-accent uppercase tracking-widest font-black">LIVE_SESSION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              {formState === 'SUCCESS' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 border border-accent/20 bg-accent/[0.02] backdrop-blur-3xl text-center space-y-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  >
                    <CheckCircle2 size={80} className="text-accent" />
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tighter">Transmission Received</h3>
                    <p className="text-secondary font-mono text-[10px] uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                      Packet delivered successfully. <br/> Routing to developer core for processing.
                    </p>
                  </div>
                  <button 
                    onClick={() => setFormState('IDLE')}
                    className="font-mono text-[10px] text-accent border border-accent/40 px-8 py-4 hover:bg-accent hover:text-black transition-all uppercase tracking-[0.3em] font-bold"
                  >
                    Send_New_Packet
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12 bg-white/[0.01] border border-white/5 p-8 md:p-12 backdrop-blur-sm"
                >
                  {/* Web3Forms Access Key */}
                  <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
                  <input type="hidden" name="subject" value="New Contact from Portfolio" />
                  <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <InputField 
                      label="Identity_Source" 
                      name="name"
                      placeholder="Your Name" 
                      type="text" 
                      required 
                    />
                    <InputField 
                      label="Return_Path" 
                      name="email"
                      placeholder="email@example.com" 
                      type="email" 
                      required 
                    />
                  </div>
                  
                  <InputField 
                    label="Project_Scope" 
                    name="subject"
                    placeholder="Subject / Company" 
                    type="text" 
                  />

                  <div className="relative space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-[9px] text-accent tracking-[0.4em] uppercase font-bold">Message_Payload</label>
                      <span className="font-mono text-[7px] text-white/40 uppercase">Size_Limit: 4.2kb</span>
                    </div>
                    <textarea 
                      name="message"
                      placeholder="Brief your requirements..."
                      rows={5}
                      required
                      className="w-full bg-white/[0.02] border-b border-white/10 p-6 text-white text-lg focus:outline-none focus:border-accent transition-all duration-500 placeholder:text-white/30 resize-none font-light"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-4">
                    <div className="flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-1 bg-white/40" />)}
                        </div>
                        <span className="font-mono text-[7px] text-white uppercase tracking-widest font-bold">Integrity_Check: VALID</span>
                      </div>
                    </div>

                    <Magnetic strength={40}>
                      <button 
                        type="submit"
                        disabled={formState === 'SENDING'}
                        className="group relative flex items-center gap-8 py-5 pl-12 pr-6 bg-accent border border-accent hover:shadow-[0_0_40px_rgba(204,255,0,0.25)] transition-all duration-500 overflow-hidden cursor-none"
                      >
                        <span className="font-mono text-[11px] font-black text-black uppercase tracking-[0.4em] relative z-10">
                          {formState === 'SENDING' ? 'Processing...' : 'Execute_Transmit'}
                        </span>
                        <div className="w-10 h-10 bg-black text-accent flex items-center justify-center relative z-10 transition-transform group-hover:translate-x-1">
                          <ArrowRight size={18} />
                        </div>
                        
                        {/* Scanning effect */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-shimmer pointer-events-none" />
                      </button>
                    </Magnetic>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const InputField: React.FC<{ label: string; name: string; placeholder: string; type: string; required?: boolean }> = ({ label, name, placeholder, type, required }) => {
  return (
    <div className="relative space-y-3 group">
      <div className="flex items-center gap-2">
        <Hash size={10} className="text-accent/30 group-focus-within:text-accent transition-colors" />
        <label className="font-mono text-[9px] text-white/60 tracking-[0.4em] uppercase font-bold group-focus-within:text-accent transition-colors">
          {label}
        </label>
      </div>
      <input 
        name={name}
        type={type} 
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-white/10 pb-4 text-white text-base md:text-lg focus:outline-none focus:border-accent transition-all duration-500 placeholder:text-white/30 font-light"
      />
      <div className="absolute bottom-0 left-0 h-[1.5px] bg-accent w-0 group-focus-within:w-full transition-all duration-700 ease-out" />
    </div>
  );
};

export default Contact;
