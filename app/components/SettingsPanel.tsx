"use client";

import { useState, useEffect } from "react";

export default function SettingsPanel({ setApiKey }: any) {
  const [key, setKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("groq_api_key");
    if (savedKey) {
      setKey(savedKey);
      setApiKey(savedKey);
    }
  }, []);

  const saveKey = () => {
    localStorage.setItem("groq_api_key", key);
    setApiKey(key);
    alert("API Key Saved");
  };

  return (
    <div style={{ padding: 10, borderBottom: "1px solid gray" }}>
      <h3>Settings</h3>

      <input
        type="text"
        placeholder="Paste Groq API Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ width: "70%" }}
      />

      <button onClick={saveKey}>Save</button>
    </div>
  );
}