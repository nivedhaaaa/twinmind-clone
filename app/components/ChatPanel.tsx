"use client";

import { useState } from "react";

export default function ChatPanel({
  apiKey,
  chatHistory,
  setChatHistory,
  transcriptChunks,
}: any) {
  const [input, setInput] = useState("");

  const sendMessage = async (msg: string) => {
    if (!msg) return;

    setChatHistory((prev: any) => [
      ...prev,
      { role: "user", content: msg },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "x-api-key": apiKey,
},
        body: JSON.stringify({
          transcript: transcriptChunks.join(" "),
          question: msg,
        }),
      });

      const data = await res.json();

      setChatHistory((prev: any) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  return (
    <div style={{ width: "33%", padding: 10 }}>
      <h2>Chat</h2>

      {chatHistory.map((c: any, i: number) => (
        <p key={i}>{c.content}</p>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={() => sendMessage(input)}>Send</button>
    </div>
  );
}