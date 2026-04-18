"use client";

import { useEffect, useRef } from "react";

export default function SuggestionsPanel({
  apiKey,
  transcriptChunks,
  suggestionBatches,
  setSuggestionBatches,
  setChatHistory,
}: any) {

  // ✅ Store latest transcript
  const transcriptRef = useRef<string[]>([]);

  // ✅ Store latest API key (CRITICAL FIX)
  const apiKeyRef = useRef<string>("");

  useEffect(() => {
    transcriptRef.current = transcriptChunks;
  }, [transcriptChunks]);

  useEffect(() => {
    apiKeyRef.current = apiKey;
  }, [apiKey]);

  // ✅ AUTO FETCH (uses latest refs)
  const fetchSuggestionsFromRef = async () => {
    if (!transcriptRef.current.length) return;
    if (!apiKeyRef.current) return; // prevent empty key calls

    const context = transcriptRef.current.slice(-2).join(" ");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKeyRef.current,
        },
        body: JSON.stringify({ transcript: context }),
      });

      const data = await res.json();

      setSuggestionBatches((prev: any) => [data.suggestions, ...prev]);
    } catch (err) {
      console.error("Suggestion error:", err);
    }
  };

  // ✅ MANUAL REFRESH (uses latest props)
  const fetchSuggestions = async () => {
    if (!transcriptChunks.length) return;
    if (!apiKey) return;

    const context = transcriptChunks.slice(-2).join(" ");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ transcript: context }),
      });

      const data = await res.json();

      setSuggestionBatches((prev: any) => [data.suggestions, ...prev]);
    } catch (err) {
      console.error("Suggestion error:", err);
    }
  };

  // ✅ INTERVAL (runs once, uses refs internally)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSuggestionsFromRef();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "33%", padding: 10 }}>
      <h2>Suggestions</h2>
      <button onClick={fetchSuggestions}>Refresh</button>

      {suggestionBatches.map((batch: any[], i: number) => (
        <div key={i}>
          {batch.map((s, j) => (
            <div
              key={j}
              style={{
                border: "1px solid gray",
                margin: 5,
                padding: 5,
                cursor: "pointer",
              }}
              onClick={async () => {
                const msg = s.preview;

                // ✅ Add user message
                setChatHistory((prev: any) => [
                  ...prev,
                  { role: "user", content: msg },
                ]);

                try {
                  const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-api-key": apiKeyRef.current, // ✅ use ref here too
                    },
                    body: JSON.stringify({
                      transcript: transcriptRef.current.join(" "),
                      question: msg,
                    }),
                  });

                  const data = await res.json();

                  // ✅ Add AI response
                  setChatHistory((prev: any) => [
                    ...prev,
                    { role: "assistant", content: data.answer },
                  ]);
                } catch (err) {
                  console.error("Suggestion click chat error:", err);
                }
              }}
            >
              <p>{s.preview}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}