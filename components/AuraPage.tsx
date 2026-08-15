import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpLeft, ArrowUpRight, Download, Play } from 'lucide-react';
import ScrollReveal from './ui/scroll-reveal';
import ProjectCard from './ui/project-card';
import { getProject, PROJECTS } from '../constants/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/* ─────────────────────────────────────────────────────────────
 * AuraPage — the bespoke case study for AURA, replacing the
 * generic ProjectPage at #/work/aura. AURA has material the
 * two-column prose schema can't carry: a 58-tool action space,
 * the perceive→act→verify loop, the hard-block safety matrix,
 * and a live download.
 *
 * Colour: the page is monochrome like the rest of the site, plus
 * AURA's own brand red (#A31621) used SEMANTICALLY ONLY — the
 * download CTA, the live-release dot, and the hard-block markers.
 * Red is never decorative here, which is the app's own rule.
 * Note the hex is inline: the site's Tailwind config (inline in
 * index.html) has no token for it, so `bg-blood` would render
 * nothing at all.
 *
 * Every claim below is checked against aura-live-mcp/site/README.md
 * §"Accuracy rules" — same Wi-Fi only (TURN isn't configured, so
 * never "from anywhere"), perception is local but the BYOK model
 * still receives what it needs, "free" never "open source", and
 * "no AURA server in the path" never a bare "no backend". Version
 * and APK size are deliberately NOT hardcoded — they go stale;
 * the download site updates itself.
 * ───────────────────────────────────────────────────────────── */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const BLOOD = '#A31621';

const SITE = 'https://dinesh210805.github.io/aura-app/';
const INSTALL_GUIDE = 'https://dinesh210805.github.io/aura-app/download.html';
const MCP_DOCS = 'https://dinesh210805.github.io/aura-app/mcp.html';
const RELEASES = 'https://github.com/Dinesh210805/aura-releases/releases';

/* Demo footage is streamed from the AURA site rather than copied into
 * public/ — the four clips are ~60 MB, which has no business sitting in
 * this repo or in a Vercel deployment. GitHub Pages answers range
 * requests (verified 206), so seeking works.
 *
 * Nothing is autoplayed: three portrait clips firing on scroll would
 * pull ~55 MB unasked. Each card loads metadata only, and the `#t=0.1`
 * fragment makes the browser paint the first frame as a stand-in poster
 * (there are no real poster images to point at). */
const MEDIA = 'https://dinesh210805.github.io/aura-app/assets/media/';

interface Demo {
  file: string;
  kind: string;
  title: string;
  said: string;
  body: string;
  tools: string[];
  portrait: boolean;
}

const DEMOS: Demo[] = [
  {
    file: 'amazon-flipkart.mp4',
    kind: 'Price comparison',
    title: 'Find the better deal',
    said: 'Compare the MX Master 3S on Amazon and Flipkart — without buying it.',
    body:
      'It opens both in its own browser, reads the final price, delivery date, seller rating, warranty and return policy off each page, and says which one wins. Nothing goes in a cart.',
    tools: ['browser_open', 'browser_tabs', 'browser_read', 'browser_act'],
    portrait: true,
  },
  {
    file: 'lecafe.mp4',
    kind: 'Local discovery',
    title: 'Find a café, get directions',
    said: 'Find a highly rated café near Rock Beach and take me there.',
    body:
      "Search, then read today's opening hours off the page, then hand the address to Maps through a deep link rather than tapping through the app.",
    tools: ['web_search', 'browser_read', 'resolve_deeplink', 'open_deeplink'],
    portrait: true,
  },
  {
    file: 'swiggy.mp4',
    kind: 'Everyday research',
    title: 'Search without ordering',
    said: 'Open Swiggy and search for coffee.',
    body:
      'A plain-language request that stops exactly where it was told to — on the results. No comparison, no cart, no order.',
    tools: ['browser_open', 'browser_act', 'browser_find', 'verify_action'],
    portrait: true,
  },
  {
    file: 'mcp.mp4',
    kind: 'For developers',
    title: 'A laptop driving a real phone',
    said: 'Pair once, then let an MCP client see and drive the handset.',
    body:
      'Claude Code, Cursor or Copilot reaching a physical Android device over the encrypted local link — the same 58 tools, through the same safety gate.',
    tools: ['connect_device', 'perceive_screen', 'tap', 'type_text'],
    portrait: false,
  },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* The real MCP surface, in the app's own order. 58 tools — this is
 * the count the app, the site and the store listing all quote. */
const TOOLS = [
  'perceive_screen', 'get_ui_tree', 'get_screenshot', 'watch_device_events',
  'request_screen_capture_permission', 'tap', 'tap_text', 'double_tap', 'long_press',
  'swipe', 'scroll_up', 'scroll_down', 'scroll_left', 'scroll_right', 'scroll_to',
  'scroll_to_element', 'type_text', 'press_enter', 'press_home', 'press_back',
  'open_recent_apps', 'launch_app', 'lookup_app', 'list_app_deeplinks', 'resolve_deeplink',
  'open_deeplink', 'system_intent', 'resolve_contact', 'find_files', 'open_file',
  'browser_open', 'browser_read', 'browser_act', 'browser_find', 'browser_extract',
  'browser_tabs', 'browser_wait', 'browser_screenshot', 'browser_upload', 'browser_handoff',
  'browser_close', 'web_search', 'read_notifications', 'notification_action',
  'dismiss_notification', 'get_media_sessions', 'media_control', 'volume_up', 'volume_down',
  'mute', 'get_device_status', 'connect_device', 'validate_action', 'verify_action',
  'wait_for', 'get_usage_guide', 'end_session', 'echo',
];

const FACTS: { k: string; v: string }[] = [
  { k: 'Action space', v: '58 tools' },
  { k: 'Perception', v: 'On device' },
  { k: 'Price', v: 'Free · no account' },
  { k: 'Requires', v: 'Android 8.0+' },
];

const CAPABILITIES: { title: string; body: string; tags: string[] }[] = [
  {
    title: 'It sees the whole screen',
    body:
      "Maps, games, web views, custom-drawn buttons — if it's visible, AURA can find it and act on it. Detection and text recognition run locally, so no app has to build support in for it to work.",
    tags: ['perceive_screen', 'get_ui_tree', 'tap_text'],
  },
  {
    title: 'It types where automation normally dies',
    body:
      'Rapido, Swiggy and Uber are React Native or Flutter — no standard Android text field, so ordinary automation types into nothing and silently fails. AURA ships its own invisible keyboard, switches to it only to enter your text, then switches straight back.',
    tags: ['type_text', 'press_enter', 'scroll_to_element'],
  },
  {
    title: 'One call, not ten taps',
    body:
      'Alarms, timers, calls, texts, calendar events, directions and sharing go straight through Android instead of opening an app and hunting for buttons. Where a deep link exists, it beats four taps.',
    tags: ['system_intent', 'resolve_deeplink', 'open_deeplink'],
  },
  {
    title: 'Bring your own brain',
    body:
      'Pick Groq, OpenRouter or Google Gemini and paste your own key — stored encrypted on the phone, sent only to the provider you chose. No AURA account, no subscription, no AURA server in the path.',
    tags: ['Groq', 'OpenRouter', 'Gemini'],
  },
  {
    title: 'It answers without opening anything',
    body:
      '"What did Ravi say?" — it reads the notification shade and can reply, dismiss, or pause your music from there. Banking and security notifications are filtered out before it ever looks.',
    tags: ['read_notifications', 'notification_action', 'media_control'],
  },
  {
    title: 'It gets better at your apps',
    body:
      'When AURA finds the route to something, it keeps the route — not the contents. A privacy filter strips personal details before anything is written down, and everything it remembers is encrypted on the device. You can read it, and wipe it.',
    tags: ['Memory', 'Skills', 'On-device'],
  },
];

const LOOP: { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'Perceive',
    body:
      'Capture the screen, find every element that can be touched, and give each one a number. Nothing is estimated from pixels — the model picks a number, never a coordinate.',
  },
  {
    n: '02',
    title: 'Act',
    body:
      'Choose a number and a verb — tap 5, type into 4, scroll down. Where a direct route exists, take it instead.',
  },
  {
    n: '03',
    title: 'Verify',
    body:
      "Look again and confirm the screen actually changed. If it didn't, that's a failure — not a success to report and move on from.",
  },
];

const SAFETY: { tag: string; title: string; body: string; hard: boolean }[] = [
  {
    tag: 'Hard block',
    hard: true,
    title: 'Banking apps stay shut',
    body:
      'Banking, payment and authenticator apps are on a blocklist. AURA refuses to open them or follow a link into them, and says why — out loud.',
  },
  {
    tag: 'Hard block',
    hard: true,
    title: "It won't type your secrets",
    body:
      'Card numbers, CVVs, national ID numbers and anything shaped like "my password is…" are rejected before a single keystroke is sent.',
  },
  {
    tag: 'Every tool',
    hard: false,
    title: 'One gate, no side doors',
    body:
      'All 58 tools pass the same checkpoint — permission, policy, audit log. There is no path that skips it, including for the AI’s own calls.',
  },
  {
    tag: 'Human in the loop',
    hard: false,
    title: 'It asks instead of guessing',
    body:
      'When a choice is genuinely yours — which address, which of three results — AURA stops and asks rather than picking one and hoping.',
  },
  {
    tag: 'On device',
    hard: false,
    title: 'Perception never leaves the phone',
    body:
      'Reading the screen, detecting elements and recognising text all run locally. Your chosen AI model receives only what it needs to decide the next step.',
  },
  {
    tag: 'Receipts',
    hard: false,
    title: 'You can read the whole log',
    body:
      'Every tool call is recorded on the device and readable in the app — what it did, when, and whether it worked.',
  },
];

/* Small shared label — the mono, wide-tracked section marker used
 * throughout the site. */
const Label: React.FC<{ n: string; children: React.ReactNode }> = ({ n, children }) => (
  <div className="mb-8 flex items-baseline gap-4 md:mb-12">
    <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-600">{n}</span>
    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
      {children}
    </span>
  </div>
);

/* One demo: real footage, the sentence that started it, and the tools the
 * run actually used. Click-to-play — the overlay is our own because a
 * paused <video> with no poster reads as a broken frame. */
const DemoCard: React.FC<{ d: Demo }> = ({ d }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    void v.play();
  };

  return (
    <div className="group">
      {/* True source ratios — the phone captures are 1080×2414 and the
          developer clip is 1920×1080. Anything rounder (9/16, 16/10) would
          make object-cover crop real content out of the frame. */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-black ${
          d.portrait ? 'aspect-[1080/2414]' : 'aspect-[16/9]'
        }`}
      >
        <video
          ref={ref}
          src={`${MEDIA}${d.file}#t=0.1`}
          preload="metadata"
          playsInline
          loop
          muted
          controls={started}
          onPlay={() => setStarted(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label={`Play the ${d.title} demo`}
            data-cursor-text="Play"
            data-cursor-variant="bubble"
            className="absolute inset-0 grid cursor-none place-items-center bg-black/25 transition-colors hover:bg-black/10"
          >
            <span
              className="grid h-16 w-16 place-items-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: BLOOD }}
            >
              <Play size={20} fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      <div className="mt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600">
          {d.kind}
        </span>
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight md:text-2xl">
          {d.title}
        </h3>
        <p className="mt-3 border-l-2 border-black/15 pl-4 font-display text-[15px] italic leading-snug text-neutral-700 dark:border-white/20 dark:text-neutral-300">
          “{d.said}”
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {d.body}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.tools.map((t) => (
            <span
              key={t}
              className="rounded-md border border-black/10 px-2 py-1 font-mono text-[10px] text-neutral-500 dark:border-white/10 dark:text-neutral-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded-full border border-black/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-neutral-500 dark:border-white/15 dark:text-neutral-400">
    {children}
  </span>
);

const AuraPage: React.FC = () => {
  const p = getProject('aura')!;
  const reduce = useReducedMotion();
  const others = PROJECTS.filter((x) => x.slug !== 'aura').slice(0, 3);

  useDocumentMeta(
    'AURA — On-Device AI Agent | Dinesh Kumar C',
    'AURA is a shipped Android assistant that sees your screen and works your real apps — 58 on-device tools, your own AI key, banking apps blocked by default.'
  );

  return (
    <main className="relative z-20 w-full overflow-hidden bg-bone pb-28 pt-32 text-black transition-colors duration-500 dark:bg-background dark:text-white md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* ── Back ─────────────────────────────────────────── */}
        <ScrollReveal blur={false}>
          <a
            href="#/work"
            data-cursor-variant="bubble"
            className="group inline-flex cursor-none items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
          >
            <ArrowUpLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
            />
            All work
          </a>
        </ScrollReveal>

        {/* ── Hero ─────────────────────────────────────────── */}
        <ScrollReveal delay={0.1} blur={false}>
          <div className="mt-10 md:mt-14">
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: BLOOD }}
                aria-hidden
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
                Shipped · live on Android
              </span>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-3 font-mono text-sm text-neutral-400 dark:text-neutral-600">
                {p.index}
              </span>
              <h1 className="font-display text-[16vw] font-bold uppercase leading-[0.9] tracking-tighter sm:leading-[0.85] md:text-[8rem] md:leading-[0.85]">
                AURA
              </h1>
            </div>

            <p className="mt-6 max-w-3xl font-display text-2xl font-medium leading-tight tracking-tight md:text-4xl">
              Talk to your phone.
              <br />
              It <span className="italic">actually</span> does it.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Cover ────────────────────────────────────────── */}
        <ScrollReveal delay={0.12} blur={false}>
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl md:mt-14">
            <img
              src={p.cover}
              alt="AURA — on-device Android AI agent"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
              style={{ backgroundImage: GRAIN }}
            />
          </div>
        </ScrollReveal>

        {/* ── Download CTA + facts ─────────────────────────── */}
        <ScrollReveal delay={0.15}>
          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-black/10 pt-10 dark:border-white/10 md:grid-cols-12">
            <div className="md:col-span-5">
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="Get it"
                data-cursor-variant="bubble"
                className="group inline-flex cursor-none items-center gap-3 rounded-full px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: BLOOD }}
              >
                <Download size={15} />
                Get AURA
              </a>

              <p className="mt-5 font-mono text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                Free · no account · Android 8.0+
                <br />
                Direct install — not on the Play Store yet.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px]">
                <a
                  href={INSTALL_GUIDE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-none items-center gap-1 underline-offset-4 hover:underline"
                >
                  Install guide <ArrowUpRight size={12} />
                </a>
                <a
                  href={MCP_DOCS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-none items-center gap-1 underline-offset-4 hover:underline"
                >
                  Developer docs <ArrowUpRight size={12} />
                </a>
                <a
                  href={RELEASES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-none items-center gap-1 underline-offset-4 hover:underline"
                >
                  Releases <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <div className="md:col-span-7">
              <p className="font-display text-xl font-medium leading-relaxed tracking-tight md:text-2xl">
                Most AI assistants talk. AURA acts. It sees your screen, understands the
                interface, and completes tasks by tapping the same buttons you would — in
                apps that never built an integration for it.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {FACTS.map((f) => (
                  <div key={f.k}>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600">
                      {f.k}
                    </p>
                    <p className="font-display text-base font-bold tracking-tight md:text-lg">
                      {f.v}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 01 What it does ──────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="01">What it does</Label>
            <h2 className="max-w-4xl font-display text-3xl font-bold tracking-tighter md:text-5xl">
              No integrations. It just uses the app.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Assistants fail because they need every app to build them a door. AURA
              doesn&apos;t ask for a door — it reads the screen and uses the app the way a
              person does.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <ScrollReveal key={c.title} delay={0.05}>
                <div className="border-t border-black/10 pt-6 dark:border-white/10">
                  <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {c.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── 02 Demo reel ─────────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="02">Demo reel</Label>
            <h2 className="max-w-4xl font-display text-3xl font-bold tracking-tighter md:text-5xl">
              Now watch it do the work.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Real runs, captured on a real phone — not mockups and not a sped-up
              storyboard. Each clip is one plain-language sentence going in, and the
              finished task coming out.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {DEMOS.filter((d) => d.portrait).map((d) => (
              <ScrollReveal key={d.file} delay={0.05}>
                <DemoCard d={d} />
              </ScrollReveal>
            ))}
          </div>

          {/* The developer clip is landscape, so it gets its own wider row. */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-12">
            {DEMOS.filter((d) => !d.portrait).map((d) => (
              <ScrollReveal key={d.file} delay={0.05} className="md:col-span-8">
                <DemoCard d={d} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── 03 The loop ──────────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="03">How it works</Label>
            <h2 className="max-w-4xl font-display text-3xl font-bold tracking-tighter md:text-5xl">
              Look. Act. Look again.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              The reason most phone automation breaks is that it assumes the tap worked.
              AURA checks. Every action is followed by a fresh look at the screen, and if
              the screen didn&apos;t change the way it expected, it tries something else.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
            {LOOP.map((s) => (
              <ScrollReveal key={s.n} delay={0.05}>
                <div className="border-t border-black/20 pt-6 dark:border-white/20">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-neutral-400 dark:text-neutral-600">
                    STEP {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {s.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600">
              ↻ Back to step 01, until the goal is met — or AURA says it couldn&apos;t
            </p>
          </ScrollReveal>
        </section>

        {/* ── 03 Action space ──────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="04">Action space</Label>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <h2 className="font-display text-[22vw] font-bold leading-[0.8] tracking-tighter md:text-[12rem]">
                  58
                </h2>
                <p className="mt-4 font-display text-xl font-medium tracking-tight md:text-2xl">
                  things it can actually do.
                </p>
              </div>
              <div className="md:col-span-7">
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
                  Not 58 phrases it recognises — 58 tools it can call, in any order,
                  checking the screen between each one. This is the full surface, and it is
                  the same surface a developer gets over MCP.
                </p>
                <div className="mt-8 flex flex-wrap gap-1.5">
                  {TOOLS.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-black/10 px-2 py-1 font-mono text-[10px] text-neutral-500 dark:border-white/10 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── 04 The browser ───────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="05">The browser</Label>
            <h2 className="max-w-4xl font-display text-3xl font-bold tracking-tighter md:text-5xl">
              It brought a browser. You watch it work.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Half the things you&apos;d want done are on the web, not in an app. So AURA
              carries a real browser — tabs, an address bar, back and home — and opens it in
              front of you instead of somewhere you can&apos;t see.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {[
              {
                t: 'Its tabs are your tabs',
                b: 'Up to eight, with a strip you can scroll and a bar you can type into. Take the address bar off it mid-task and you’re just browsing — nothing about it is a special agent mode.',
              },
              {
                t: 'Tools written as intentions',
                b: 'browser_find asks for a thing by name; browser_extract takes a whole table at once, instead of twenty blind scrolls. Fewer round trips to the model is why a price comparison finishes in a minute rather than ten.',
              },
              {
                t: 'A window, not a takeover',
                b: 'Shrink it to a floating ball and get your phone back, or read along. When something needs a human — a login, a captcha, a final confirm — it stops and hands you the page rather than guessing its way through.',
              },
            ].map((x) => (
              <ScrollReveal key={x.t} delay={0.05}>
                <div className="border-t border-black/10 pt-6 dark:border-white/10">
                  <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {x.t}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {x.b}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── 05 Safety ────────────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="06">Safety</Label>
            <h2 className="max-w-4xl font-display text-3xl font-bold tracking-tighter md:text-5xl">
              You&apos;re handing it your phone. Here&apos;s what it can&apos;t do.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              An assistant that can tap anything is only trustworthy if some things are
              permanently off the table. These limits are enforced in code, before any action
              runs — the AI cannot talk its way past them.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {SAFETY.map((s) => (
              <ScrollReveal key={s.title} delay={0.05}>
                {/* A hard block gets a blood-red rule and label; everything
                    else stays hairline monochrome. Red only ever means
                    "this one is enforced in code". */}
                <div
                  className={`border-t pt-6 ${s.hard ? '' : 'border-black/10 dark:border-white/10'}`}
                  style={s.hard ? { borderTopColor: BLOOD } : undefined}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                      s.hard ? '' : 'text-neutral-400 dark:text-neutral-600'
                    }`}
                    style={s.hard ? { color: BLOOD } : undefined}
                  >
                    {s.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {s.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <p className="mt-12 max-w-3xl border-l-2 pl-5 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400"
               style={{ borderColor: BLOOD }}>
              <strong className="font-semibold text-black dark:text-white">Honest limits.</strong>{' '}
              AURA needs Android&apos;s accessibility service to see and touch the screen — the
              same permission a screen reader uses — and it reads screen content only while
              running a task you asked for. AI can still misread a screen, so anything that
              spends money or can&apos;t be undone deserves your eyes.
            </p>
          </ScrollReveal>
        </section>

        {/* ── 06 For developers ────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="07">For developers</Label>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-6">
                <h2 className="font-display text-3xl font-bold tracking-tighter md:text-5xl">
                  Your phone is also an MCP server.
                </h2>
              </div>
              <div className="md:col-span-6">
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
                  Pair once with a 6-digit PIN and Claude Code, Claude Desktop, Cursor or
                  Copilot can drive the handset directly over an encrypted peer-to-peer link
                  on your local network — no root and no ADB required for core control. Same
                  58 tools, same safety gate. The intelligence lives wherever you point it;
                  the phone just exposes real capabilities to use.
                </p>
                <a
                  href={MCP_DOCS}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-variant="bubble"
                  className="group mt-8 inline-flex cursor-none items-center gap-2 border-b border-black/30 pb-1 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-black dark:border-white/30 dark:hover:border-white"
                >
                  Explore the MCP setup
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── 07 The build ─────────────────────────────────── */}
        <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <ScrollReveal>
            <Label n="08">The build</Label>
          </ScrollReveal>
          {p.sections.map((s, i) => (
            <ScrollReveal key={i} delay={0.05}>
              <div className="grid grid-cols-1 gap-5 border-t border-black/10 py-10 dark:border-white/10 md:grid-cols-12 md:gap-10 md:py-12">
                <h3 className="font-display text-2xl font-bold tracking-tight md:col-span-4 md:text-3xl">
                  {s.heading}
                </h3>
                <div className="max-w-2xl space-y-5 md:col-span-8">
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        {/* ── Closing CTA ──────────────────────────────────── */}
        <ScrollReveal>
          <section className="mt-24 border-t border-black/10 pt-16 dark:border-white/10 md:mt-32">
            <h2 className="max-w-4xl font-display text-4xl font-bold tracking-tighter md:text-6xl">
              Give it something to do.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Free, no account, about five minutes to set up — including the permission
              screens Android makes you find yourself.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="Get it"
                data-cursor-variant="bubble"
                className="inline-flex cursor-none items-center gap-3 rounded-full px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: BLOOD }}
              >
                <Download size={15} />
                Visit the AURA site
              </a>
              <a
                href={INSTALL_GUIDE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-none items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 underline-offset-4 hover:underline dark:text-neutral-400"
              >
                Install guide <ArrowUpRight size={13} />
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* ── More projects ────────────────────────────────── */}
        <div className="mt-24 border-t border-black/10 pt-12 dark:border-white/10 md:mt-32">
          <h2 className="mb-8 font-display text-3xl font-bold tracking-tighter md:text-4xl">
            More projects
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-14"
          >
            {others.map((o) => (
              <ProjectCard key={o.slug} p={o} reduce={reduce} />
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default AuraPage;
