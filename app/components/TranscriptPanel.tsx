"use client";

import { useEffect, useRef } from "react";

export default function TranscriptPanel({
  transcript,
}: {
  transcript: string[];
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  return (
    <div style={{ width: "33%", overflow: "auto", padding: 10 }}>
      <h2>Transcript</h2>

      {transcript.map((t, i) => (
        <p key={i}>{t}</p>
      ))}

      {/* 👇 invisible anchor */}
      <div ref={bottomRef} />
    </div>
  );
}