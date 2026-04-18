#  TwinMind Clone – AI Meeting Assistant

A real-time AI meeting assistant that captures live speech, generates transcripts, suggests smart follow-ups, and enables contextual chat — all powered by Groq APIs.

##  Features

###  Live Transcription
- Records audio from microphone
- Converts speech to text using Groq Whisper API
- Updates transcript in near real-time (~30 second chunks)

###  Smart Suggestions
- Generates contextual suggestions based on recent transcript
- Includes:
  - Questions
  - Insights
  - Clarifications
- Auto-refreshes every 30 seconds
- Manual refresh supported

###  Context-Aware Chat
- Ask questions based on meeting context
- Uses transcript as input
- Powered by Groq LLaMA 3

###  API Key Management
- User inputs Groq API key via UI
- Stored in browser (localStorage)
- Passed securely to backend APIs

###  UI Layout
- 3-panel interface:
  - Transcript (left)
  - Suggestions (center)
  - Chat (right)

## Tech Stack

- Frontend: Next.js (App Router), React, TypeScript  
- Backend: Next.js API Routes  
- AI APIs: Groq (Whisper + LLaMA 3)  
- Styling: CSS  
- Deployment: Vercel  

### Stack Choices (Why these technologies?)

- **Next.js** → Enables full-stack development with API routes, reducing need for separate backend  
- **React + TypeScript** → Improves maintainability and type safety  
- **Groq APIs** → Fast inference for both transcription and LLM responses  
- **Vercel** → Seamless deployment for Next.js apps with minimal configuration  

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/nivedhaaaa/twinmind-clone.git  
cd twinmind-clone  

### 2. Install dependencies
npm install  

### 3. Run locally
npm run dev  

Open: http://localhost:3000  

---

##  Groq API Key Setup

1. Go to https://console.groq.com  
2. Generate an API key  
3. Paste it into the Settings panel in the app  
4. Click Save  

## How It Works

1. Start microphone recording  
2. Speech is transcribed using Whisper  
3. Transcript is used for:
   - Suggestions generation  
   - Chat context  
4. Suggestions auto-refresh every 30 seconds  
5. Clicking a suggestion sends it to chat  

---

## Prompt Strategy

### Suggestions Generation
- The prompt is structured to generate **exactly 3 outputs**:
  1. A question  
  2. An insight  
  3. A clarification  
- Output is enforced in **JSON format** for consistent parsing
- Instructions ensure responses are:
  - Short
  - Context-aware
  - Actionable

### Chat Interaction
- Combines:
  - Full transcript context  
  - User’s question  
- This enables:
  - Context-aware answers  
  - More relevant responses  
  - Better continuity in conversation  

### Transcription Strategy
- Audio is processed in **fixed intervals (~30 seconds)**
- Each chunk is sent to Whisper API
- Results are appended to transcript incrementally
- This balances:
  - Performance
  - Latency
  - API usage limits  

---

## Tradeoffs

### Pros
- Simple architecture (no separate backend needed)
- Fast development using Next.js API routes
- Works entirely in browser with user-provided API key
- Modular and easy-to-understand components

### Limitations
- Not true real-time streaming (uses chunked transcription)
- Suggestions rely only on recent transcript context
- Requires manual API key input by user
- No persistent storage (session-based only)

### Design Decisions
- Chose chunk-based transcription instead of streaming to reduce complexity  
- Limited suggestions to 3 for clarity and usability  
- Used localStorage for API key to avoid backend storage/security concerns  

---

##  Deployment

Deployed using Vercel:

npm install -g vercel  
vercel  