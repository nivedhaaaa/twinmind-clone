import axios from "axios";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return Response.json({ suggestions: [] });
    }

    const prompt = `
You are a real-time AI meeting assistant.

Generate exactly 3 suggestions:
1. A smart question
2. A useful insight
3. A clarification

Rules:
- Keep each under 20 words
- Must be specific to the transcript
- Avoid generic suggestions

Return JSON:
[
  { "preview": "..." },
  { "preview": "..." },
  { "preview": "..." }
]

Transcript:
${transcript}
`;

    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = res.data.choices?.[0]?.message?.content;

    let suggestions;
    try {
      suggestions = JSON.parse(raw);
    } catch {
      suggestions = [
        { preview: "Ask a deeper follow-up question." },
        { preview: "Summarize the key takeaway." },
        { preview: "Clarify assumptions being made." },
      ];
    }

    return Response.json({ suggestions });

  } catch (err: any) {
    console.error("Suggest API error:", err.response?.data || err);

    return Response.json({
      suggestions: [
        { preview: "Try again later." },
        { preview: "Check your API key." },
        { preview: "No suggestions available." },
      ],
    });
  }
}