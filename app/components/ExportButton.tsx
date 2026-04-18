"use client";

export default function ExportButton({
  transcript,
  suggestions,
  chat,
}: any) {

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),

      transcript: transcript.map((t: string, i: number) => ({
        id: i,
        text: t,
      })),

      suggestions: suggestions.map((batch: any[], i: number) => ({
        batch: i,
        items: batch,
      })),

      chat: chat.map((c: any, i: number) => ({
        id: i,
        role: c.role,
        content: c.content,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportData}
      style={{
        margin: 10,
        padding: "8px 12px",
        background: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      📤 Export Session
    </button>
  );
}