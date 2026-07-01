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
    tagline: 'A phone that an AI can actually operate.',
    summary:
      'An Android phone turned into a peer-to-peer MCP server — exposing 36 live-verified tools to any AI client over WebRTC, with no root, no ADB, and no cloud.',
    stack: ['Kotlin', 'MCP', 'WebRTC / DTLS', 'Koog', 'YOLOv8', 'ML Kit OCR', 'Groq / Gemini'],
    links: [{ label: 'GitHub', href: 'https://github.com/Dinesh210805/aura-live-mcp' }],
    sections: [
      {
        heading: 'The premise',
        body: [
          'Phones are the most capable computers most people own, yet agents still treat them as dumb screens to scrape. AURA started from the opposite idea: make the phone itself a first-class place an AI can think and act.',
        ],
      },
      {
        heading: 'Legacy — the LangChain control plane',
        body: [
          'The first version was a cloud-side brain. A voice-controlled, multi-agent system built on a LangGraph ReAct architecture (LLaMA via Groq, with Gemini and Google ADK), it could see the screen through a Set-of-Marks perception pipeline — YOLOv8 plus OCR — plan a route through the UI, and act, tap by tap.',
          'It was held together by OPA / Rego safety policies and a reflexion-retry reliability engine, with tri-provider model routing for cost and uptime. Powerful — but it leaned on the cloud and a fragile accessibility bridge.',
        ],
      },
      {
        heading: 'The pivot — an on-device MCP server',
        body: [
          'The current version flips the architecture. AURA runs an MCP server on the phone itself, written in Kotlin, and pairs peer-to-peer with any client over DTLS-encrypted WebRTC — no root, no ADB, no cloud relay.',
          'Any MCP-speaking client (Claude included) can now drive the device through 36 live-verified tools: perception, input, and app control. The intelligence moves to whatever model you point at it; the phone just exposes safe, real capabilities.',
        ],
      },
      {
        heading: 'Why it matters',
        body: [
          'On-device means private by default, low-latency, and resilient when the network is not. It reframes the phone from something agents poke at into something they can genuinely operate.',
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
      'A constraint-aware 3D container-loading optimizer that turns cargo data into safer, denser packing plans — with 3D and AR-ready output.',
    stack: ['Python', 'Flask', 'Genetic Algorithm', 'Plotly 3D', 'Unity AR', 'OSRM'],
    links: [{ label: 'GitHub', href: 'https://github.com/Dinesh210805/GravitycARgo' }],
    sections: [
      {
        heading: 'About',
        body: [
          'GravitycARgo turns CSV / Excel cargo data into a packing plan that is practical, not just mathematically dense. It accounts for weight limits, fragility, stackability, load-bearing capacity, and even route temperature.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'A random-key genetic algorithm reaches a 77.9% mean fill with zero hard violations. Plans export to 3D and Unity AR, so the handoff from planner to loader is something you can actually walk around.',
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
      'A travel assistant built on a single LangGraph ReAct agent routing 15 specialized tools across 450+ stays and 4,500+ reviews.',
    stack: ['FastAPI', 'LangGraph', 'Groq', 'Pinecone', 'SQLAlchemy', 'Next.js'],
    links: [{ label: 'GitHub', href: 'https://github.com/Dinesh210805/StayBot' }],
    sections: [
      {
        heading: 'About',
        body: [
          'StayBot runs on one LangGraph ReAct agent (LLaMA 3.3-70B via Groq) that routes across 15 specialized tools — Pinecone semantic search, SQLAlchemy filtering, a stateful booking engine, and persistent per-user memory — over 450+ listings and 4,500+ reviews.',
        ],
      },
      {
        heading: 'Built to stay up',
        body: [
          'Multi-key Groq rotation with cooldowns keeps it responsive under rate limits, and an admin layer gives observability over latency, token usage, and tool distribution.',
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
    tagline: 'Tell it, show it, or say it — one clean answer.',
    summary:
      'A multimodal waste-classification backend: a fine-tuned LLaMA 3 plus a 4-stage RAG pipeline returning structured disposal guidance.',
    stack: ['FastAPI', 'QLoRA', 'LLaMA 3', 'ChromaDB', 'Groq', 'Gemini API'],
    links: [{ label: 'GitHub', href: 'https://github.com/Dinesh210805/EcoBot' }],
    sections: [
      {
        heading: 'About',
        body: [
          'A user describes, photographs, or speaks about an item; EcoBot returns the bin colour, disposal steps, safety notes, an environmental fact, and nearby facilities — all in a single structured JSON response.',
        ],
      },
      {
        heading: 'The engine',
        body: [
          'A LLaMA 3 8B model fine-tuned with QLoRA (rank-16, on a single T4) drives classification, behind a 4-stage RAG pipeline — classify → ChromaDB → Exa fallback → response — across 550+ disposal guides, returning Pydantic-validated output over 7 waste categories.',
          'Image input runs through LLaMA 4 Scout; voice through Gemini 2.0 Flash.',
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
      'A 40+ language learning platform with schema-locked lesson generation and browser-native voice-to-voice translation.',
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
          'Lessons are generated with schema-enforced JSON for consistent output across 8 exercise types, and translation is voice-to-voice through the browser’s native Speech API — no third-party STT cost.',
        ],
      },
      {
        heading: 'Content pipeline',
        body: [
          'A YouTube caption pipeline turns real video into vocabulary lists and grammar exercises, so practice material stays current and contextual.',
        ],
      },
    ],
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);

export const getProject = (slug: string): ProjectData | undefined =>
  PROJECTS.find((p) => p.slug === slug);
