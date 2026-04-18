"use client";

import { useRef, useState } from "react";

export default function MicRecorder({
  onTranscript,
}: {
  onTranscript: (text: string) => void;
}) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (intervalRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      let chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        if (!chunks.length) return;

        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = [];

        const formData = new FormData();
        formData.append("file", blob, "audio.webm");

        try {
          const apiKey = localStorage.getItem("groq_api_key") || "";

          const res = await fetch("/api/transcribe", {
            method: "POST",
            headers: {
              "x-api-key": apiKey,
            },
            body: formData,
          });

          let data;
          try {
            data = await res.json();
          } catch {
            console.error("Invalid JSON from transcription");
            return;
          }

          if (data?.text && data.text !== "⚠️ Transcription failed") {
            onTranscript(data.text);
          }
        } catch (err) {
          console.error("Transcription error:", err);
        }
      };

      recorder.start();
      setIsRecording(true);

      intervalRef.current = setInterval(() => {
        if (recorderRef.current) {
          recorderRef.current.stop();
          recorderRef.current.start();
        }
      }, 30000);
    } catch (err) {
      console.error("Mic access error:", err);
    }
  };

  const stopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (recorderRef.current) {
      recorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
  };

  return (
    <div style={{ position: "fixed", right: 20, bottom: 20 }}>
      {!isRecording ? (
        <button onClick={startRecording}>🎤 Start Mic</button>
      ) : (
        <button onClick={stopRecording}>⛔ Stop Mic</button>
      )}
    </div>
  );
}