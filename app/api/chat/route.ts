export async function POST(req: Request) {
  try {
    const { transcript, question } = await req.json();

    
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return Response.json({ answer: "Missing API key" });
    }

    const prompt = `
You are helping in a live meeting.

Transcript:
${transcript}

User:
${question}
`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();

    console.log("Groq response:", data);

    if (!data.choices || !data.choices.length) {
      return Response.json({
        answer: " AI could not generate a response.",
      });
    }

    return Response.json({
      answer: data.choices[0].message.content,
    });

  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json({
      answer: " Something went wrong.",
    });
  }
}