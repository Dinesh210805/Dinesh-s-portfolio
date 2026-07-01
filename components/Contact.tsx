import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, ArrowRight, Github, Linkedin } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import SectionHeading from './ui/section-heading';
import Magnetic from './Magnetic';

/* ─────────────────────────────────────────────────────────────
 * Contact — clean editorial close. Left: a short invitation with
 * the real ways to reach out. Right: a minimal underline form
 * (Web3Forms). Monochrome, full-bleed, heading aligned to the "D".
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('SENDING');

    try {
      const formData = new FormData(formRef.current!);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
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
      className="relative w-full overflow-hidden border-t border-black/10 py-20 text-black transition-colors duration-500 dark:border-white/5 dark:text-white md:py-28"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeading eyebrow="Get in touch">Connect.</SectionHeading>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left — invitation + reach */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-5">
            <ScrollReveal>
              <p className="max-w-md text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-xl">
                Open to internships, collaborations, and building AI products that actually ship.
                The fastest way to reach me is email.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-8">
                <a
                  href="mailto:dinesh210805@gmail.com"
                  className="group inline-flex w-fit items-center gap-3 font-display text-2xl font-bold tracking-tight transition-colors md:text-3xl"
                >
                  dinesh210805@gmail.com
                  <ArrowUpRight
                    size={22}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>

                <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-400 dark:text-neutral-600">
                      Based in
                    </span>
                    <span className="font-mono text-sm uppercase tracking-widest">Puducherry, IN</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-400 dark:text-neutral-600">
                      Status
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest">
                      <span className="h-1.5 w-1.5 rounded-full bg-black motion-safe:animate-pulse dark:bg-white" />
                      Available
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {[
                    { icon: <Github size={18} />, href: 'https://github.com/Dinesh210805', label: 'GitHub' },
                    {
                      icon: <Linkedin size={18} />,
                      href: 'https://linkedin.com/in/dinesh-kumar-c-93a38129b',
                      label: 'LinkedIn',
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-black/15 transition-colors duration-300 hover:bg-black hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — the form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {formState === 'SUCCESS' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[420px] flex-col items-start justify-center gap-6 border-t border-black/10 pt-10 dark:border-white/10"
                >
                  <CheckCircle2 size={48} strokeWidth={1.4} />
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                      Message sent.
                    </h3>
                    <p className="max-w-sm text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
                      Thanks for reaching out — I’ll get back to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState('IDLE')}
                    className="font-mono text-[11px] uppercase tracking-[0.3em] text-black underline-offset-4 hover:underline dark:text-white"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-10"
                >
                  {/* Web3Forms */}
                  <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
                  <input type="hidden" name="subject" value="New contact from portfolio" />
                  <input type="hidden" name="from_name" value="Portfolio Contact Form" />

                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <Field label="Name" name="name" type="text" placeholder="Your name" required />
                    <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <Field label="Subject" name="subject" type="text" placeholder="Company / project" />

                  <div className="flex flex-col gap-3">
                    <label className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell me a little about it…"
                      rows={4}
                      required
                      className="w-full resize-none border-b border-black/15 bg-transparent pb-3 text-lg font-light text-black transition-colors duration-300 placeholder:text-black/30 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white"
                    />
                  </div>

                  <Magnetic strength={30}>
                    <button
                      type="submit"
                      disabled={formState === 'SENDING'}
                      className="group inline-flex w-fit cursor-none items-center gap-4 rounded-full bg-black py-4 pl-8 pr-4 text-white transition-colors duration-300 hover:bg-neutral-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                    >
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">
                        {formState === 'SENDING' ? 'Sending…' : 'Send message'}
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition-transform group-hover:translate-x-0.5 dark:bg-black dark:text-white">
                        <ArrowRight size={16} />
                      </span>
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, name, type, placeholder, required }) => (
  <div className="flex flex-col gap-3">
    <label className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
      {label}
    </label>
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full border-b border-black/15 bg-transparent pb-3 text-lg font-light text-black transition-colors duration-300 placeholder:text-black/30 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white"
    />
  </div>
);

export default Contact;
