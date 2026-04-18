"use client";

import { useState } from "react";
import MicRecorder from "./components/MicRecorder";
import TranscriptPanel from "./components/TranscriptPanel";
import SuggestionsPanel from "./components/SuggestionsPanel";
import ChatPanel from "./components/ChatPanel";
import SettingsPanel from "./components/SettingsPanel";
import ExportButton from "./components/ExportButton"; // ✅ NEW

export default function Home() {
  const [transcriptChunks, setTranscriptChunks] = useState<string[]>([]);
  const [suggestionBatches, setSuggestionBatches] = useState<any[][]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [apiKey, setApiKey] = useState("");

  return (
    <div>
      {/* 🔧 Settings Panel */}
      <SettingsPanel setApiKey={setApiKey} />

      {/* 🔥 Export Button (NEW) */}
      <ExportButton
        transcript={transcriptChunks}
        suggestions={suggestionBatches}
        chat={chatHistory}
      />

      {/* 🔧 Main Layout */}
      <div style={{ display: "flex", height: "90vh" }}>
        <TranscriptPanel transcript={transcriptChunks} />

        <SuggestionsPanel
          apiKey={apiKey}
          transcriptChunks={transcriptChunks}
          suggestionBatches={suggestionBatches}
          setSuggestionBatches={setSuggestionBatches}
          setChatHistory={setChatHistory}
        />

        <ChatPanel
          apiKey={apiKey}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          transcriptChunks={transcriptChunks}
        />

        <MicRecorder
          onTranscript={(text) =>
            setTranscriptChunks((prev) => [...prev, text])
          }
        />
      </div>
    </div>
  );
}