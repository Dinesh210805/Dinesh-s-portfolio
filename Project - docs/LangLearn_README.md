# Langlearn

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat&logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Python](https://img.shields.io/badge/Python_3.8+-3776AB?style=flat&logo=python&logoColor=fff)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-000?style=flat&logo=flask&logoColor=fff)](https://flask.palletsprojects.com)
[![Groq · Llama 3.3 70B](https://img.shields.io/badge/Groq_·_Llama_3.3_70B-F55036?style=flat)](https://groq.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)

Paste text, record your voice, or drop a YouTube URL — Langlearn gives you the translation **plus** the grammar breakdown, vocabulary, cultural context, and AI-generated exercises to actually retain it. Every translation becomes a lesson.

> Supports 40+ languages. Runs fully offline-capable with local fallbacks when no API key is set.

---

## ✦ Features

| | Feature | What you get |
|---|---|---|
| 📝 | **Text Translation** | Translation with grammar notes, literal meaning, vocabulary, pronunciation tips, and cultural context in one response |
| 🎙️ | **Voice Translation** | Speak → transcribed → translated → full learning breakdown. Native browser Speech API, no third-party dependency |
| 🤖 | **AI Tutor** | Conversational practice with contextual follow-up suggestions that adapt to what you just asked |
| 🏋️ | **Practice Centre** | On-demand exercises across 8 types — fill-blanks, vocab match, sentence-builder, conversation sim, and more — generated per language and CEFR level |
| 📺 | **YouTube Learning** | Paste a video ID → captions extracted, AI-summarised, and turned into vocabulary lists, grammar patterns, and practice materials |
| 📊 | **Progress** | Achievements and history across every learning activity |

---

## ⚙️ How it's built

The app is a React + TypeScript frontend talking to a Python / Flask REST API. Every AI call lives on the server — the browser never holds a key.

**AI responses are schema-enforced.** Prompts to Groq's Llama 3.3 70B use `response_format: json_object` and a strict field contract. The UI maps a known shape every time; it never parses freeform text.

**The YouTube pipeline has a fallback chain.** It tries the manual transcript first, then auto-generated captions, then requests a server-side translation of whatever is available. If all three fail, it tells the user cleanly rather than silently returning empty data.

**Fallback responses are built in.** Every service checks for a missing API key at the top of the call and returns a usable local response. The entire app stays demoable with no credentials.

**Voice input uses the browser's Speech API.** No Whisper, no assembly, no extra billing surface — just the Web Speech API, which keeps the voice flow self-contained and free.

---

## 🗂 Structure

```
app.py                      Flask entry point + all API routes
services/
  translator.py             Groq translation + context generation
  learning_service.py       Lesson generation
  practice_service.py       Exercise generation (8 types)
  chatbot_service.py        Conversational AI tutor
  speech_service.py         Voice transcription helpers
src/
  pages/                    One component per screen
  components/ui/            Shared primitives (Button, Card, etc.)
  types/                    TypeScript models shared across pages
  utils/                    Speech helpers, language utilities
scripts/                    Smoke tests (UI + API)
```

---

## 🚀 Getting started

**You need:** Node.js 16+, Python 3.8+, a [Groq API key](https://console.groq.com) (free tier works fine)

```bash
git clone <repo-url>
cd Langlearn-Language-Translation-and-Learning-Tool

# Python backend
python -m venv .venv
.\.venv\Scripts\activate       # Windows
# source .venv/bin/activate    # macOS / Linux
pip install -r requirements.txt

# Frontend
npm install
```

```env
# .env
GROQ_API_KEY=your_key_here
VITE_API_URL=http://127.0.0.1:5000
```

```bash
# Terminal 1
python app.py

# Terminal 2
npm run dev:frontend
```

Open the Vite localhost URL. The backend runs on `:5000`.

---

## ✅ Checks

```bash
npm run lint              # ESLint
npm run build             # TypeScript compile + Vite bundle
python -m compileall app.py services   # Python syntax check
npm run smoke             # API smoke tests
```
