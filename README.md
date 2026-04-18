#  TwinMind Clone – AI Meeting Assistant

A real-time AI meeting assistant that captures live speech, generates transcripts, suggests smart follow-ups, and enables contextual chat — all powered by Groq APIs.

## Public link
(Add your deployed Vercel link here)

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

## Project Structure

app/
 ├── api/
 │    ├── chat/route.ts
 │    ├── suggest/route.ts
 │    └── transcribe/route.ts
 │
 ├── components/
 │    ├── ChatPanel.tsx
 │    ├── MicRecorder.tsx
 │    ├── SuggestionsPanel.tsx
 │    ├── TranscriptPanel.tsx
 │    ├── SettingsPanel.tsx
 │    └── ExportButton.tsx
 │
 ├── layout.tsx
 └── page.tsx

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

##  Deployment

Deployed using Vercel:

npm install -g vercel  
vercel  

