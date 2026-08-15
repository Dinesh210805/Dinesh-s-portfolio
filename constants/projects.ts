/* Single source of truth for project content.
 * Consumed by the featured grid (home), the all-work page, and the
 * per-project detail pages. Content is text-only for now (screenshots
 * added later). Drawn from the project docs. */

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectData {
  slug: string;
  index: string; // "01"
  title: string;
  category: string;
  year: string;
  featured: boolean;
  color?: string; // solid placeholder color for cards (fallback when no cover)
  cover?: string; // cover mockup image (root-relative path in /public)
  tagline: string; // one line for cards
  summary: string; // detail-page hero description
  stack: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
}

export const PROJECTS: ProjectData[] = [
  {
    slug: 'aura',
    index: '01',
    title: 'AURA',
    category: 'On-Device AI Agent',
    year: '2025',
    featured: true,
    color: '#4338CA',
    cover: '/auracoverimage.jpeg',
    tagline: 'Talk to your phone. It actually does it.',
    summary:
      'A shipped Android assistant that sees your screen and works your real apps — 58 on-device tools, no integrations, no account, and the same phone doubles as an MCP server for developers.',
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'MCP',
      'WebRTC / DTLS',
      'ONNX · YOLOv8',
      'ML Kit OCR',
      'Gemini Live',
    ],
    links: [
      { label: 'Website', href: 'https://dinesh210805.github.io/aura-app/' },
      { label: 'Download', href: 'https://dinesh210805.github.io/aura-app/download.html' },
      { label: 'Releases', href: 'https://github.com/Dinesh210805/aura-releases/releases' },
    ],
    sections: [
      {
        heading: 'The premise',
        body: [
          'Phones are the most capable computers most people carry around, yet most agents still treat them like a screen to scrape from a distance. AURA starts from a different assumption: give the AI a proper seat on the device itself, instead of poking at it from outside.',
        ],
      },
      {
        heading: 'Legacy — the LangChain control plane',
        body: [
          'The first version lived in the cloud — a voice-controlled, multi-agent system on a LangGraph ReAct architecture (LLaMA via Groq, with Gemini and Google ADK). It could see the screen through a Set-of-Marks pipeline (YOLOv8 plus OCR), plan a route through the UI, and act on it, tap by tap.',
          'OPA/Rego safety policies and a reflexion-retry loop held it together, with routing across three model providers for cost and uptime. It worked — but it depended on the cloud and a fairly fragile accessibility bridge.',
        ],
      },
      {
        heading: 'The pivot — everything on the phone',
        body: [
          'The current version flips that. AURA runs on the device in Kotlin: it reads the screen locally, drives real apps, and exposes 58 tools to the model you choose. You bring your own provider key — Groq, OpenRouter or Gemini — stored encrypted on the handset. There is no AURA account and no AURA server in the path.',
          'The same tool surface is also an MCP server. Pair a laptop once with a 6-digit PIN over the local network and Claude Code, Cursor or Copilot can drive a real handset directly, through the same safety gate.',
        ],
      },
      {
        heading: 'Why it matters',
        body: [
          "Perception runs on the phone, so it is fast and it works on apps nobody built an integration for. Every action is followed by a fresh look at the screen — if it didn't change the way it expected, that's a failure, not a success to report and move on from.",
        ],
      },
    ],
  },
  {
    slug: 'gravitycargo',
    index: '02',
    title: 'GravitycARgo',
    category: 'Logistics AI · AR',
    year: '2025',
    featured: true,
    color: '#C2410C',
    cover: '/GravitycARgocoverphoto.png',
    tagline: 'Packing plans that hold up in the real world.',
    summary:
      "A constraint-aware container-loading optimizer that turns raw cargo data into packing plans that are safer and denser — and hold up once they leave the spreadsheet.",
    stack: ['Python', 'Flask', 'Genetic Algorithm', 'Plotly 3D', 'Unity AR', 'OSRM'],
    links: [{ label: 'GitHub', href: 'https://github.com/Dinesh210805/GravitycARgo' }],
    sections: [
      {
        heading: 'About',
        body: [
          "Feed it a CSV or Excel sheet of cargo, and GravitycARgo works out a packing plan that's practical, not just mathematically tidy. It accounts for weight limits, fragility, stackability, load-bearing capacity, and even the temperature along the route.",
        ],
      },
      {
        heading: 'Results',
        body: [
          "A random-key genetic algorithm gets there — 77.9% mean fill, zero hard violations. Plans export to 3D and Unity AR, so the handoff from planner to the person actually loading the truck is something you can walk around, not just read.",
        ],
      },
    ],
  },
  {
    slug: 'staybot',
    index: '03',
    title: 'StayBot',
    category: 'AI Travel Assistant',
    year: '2024',
    featured: true,
    color: '#0F766E',
    cover: '/staybotcoverphoto.png',
    tagline: 'One agent, fifteen tools, real bookings.',
    summary:
      'A travel assistant built around one LangGraph ReAct agent, routing 15 specialized tools across 450+ stays and 4,500+ reviews to get from a question to a real booking.',
    stack: ['FastAPI', 'LangGraph', 'Groq', 'Pinecone', 'SQLAlchemy', 'Next.js'],
    links: [{ label: 'GitHub', href: 'https://github.com/Dinesh210805/StayBot' }],
    sections: [
      {
        heading: 'About',
        body: [
          'One LangGraph ReAct agent (LLaMA 3.3-70B via Groq) does the routing — across Pinecone semantic search, SQLAlchemy filtering, a stateful booking engine, and memory that persists per user — over 450+ listings and 4,500+ reviews.',
        ],
      },
      {
        heading: 'Built to stay up',
        body: [
          'Multi-key Groq rotation with cooldowns keeps it responsive when rate limits hit, and an admin layer gives visibility into latency, token usage, and which tools actually get used.',
        ],
      },
    ],
  },
  {
    slug: 'ecobot',
    index: '04',
    title: 'EcoBot',
    category: 'Multimodal Waste AI',
    year: '2024',
    featured: true,
    color: '#15803D',
    cover: '/ecobot.png',
    tagline: 'Tell it, show it, or say it — one clean answer.',
    summary:
      'A multimodal waste-classification backend — describe it, photograph it, or say it out loud, and a fine-tuned model plus a 4-stage RAG pipeline hands back one clean, structured answer.',
    stack: ['FastAPI', 'QLoRA', 'LLaMA 3', 'ChromaDB', 'Groq', 'Gemini API'],
    links: [{ label: 'GitHub', href: 'https://github.com/Dinesh210805/EcoBot' }],
    sections: [
      {
        heading: 'About',
        body: [
          'Describe an item, photograph it, or just say what it is — EcoBot answers with the bin colour, disposal steps, a safety note, an environmental fact, and nearby facilities, all in one structured response.',
        ],
      },
      {
        heading: 'The engine',
        body: [
          'Classification runs on a LLaMA 3 8B model fine-tuned with QLoRA (rank-16, on a single T4), behind a 4-stage pipeline — classify → ChromaDB → Exa fallback → response — across 550+ disposal guides, returning validated output over 7 waste categories.',
          'Photos go through LLaMA 4 Scout; voice goes through Gemini 2.0 Flash.',
        ],
      },
    ],
  },
  {
    slug: 'langlearn',
    index: '05',
    title: 'LangLearn',
    category: 'AI Language Platform',
    year: '2024',
    featured: false,
    color: '#6D28D9',
    cover: '/langlearncoverphoto.png',
    tagline: 'Forty languages, taught from real video.',
    summary:
      "A 40+ language learning platform that locks its lesson output to a schema and translates voice-to-voice, right in the browser.",
    stack: ['Flask', 'React', 'Groq', 'Web Speech API', 'YouTube Data API'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Dinesh210805/Langlearn-Language-Translation-and-Learning-Tool',
      },
    ],
    sections: [
      {
        heading: 'About',
        body: [
          "Lessons come out as schema-enforced JSON, so all eight exercise types stay consistent, and translation runs voice-to-voice through the browser's native Speech API — no third-party speech-to-text bill.",
        ],
      },
      {
        heading: 'Content pipeline',
        body: [
          'A YouTube caption pipeline turns real video into vocabulary lists and grammar exercises, so the practice material stays current instead of canned.',
        ],
      },
    ],
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);

export const getProject = (slug: string): ProjectData | undefined =>
  PROJECTS.find((p) => p.slug === slug);
