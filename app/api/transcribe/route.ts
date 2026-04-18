import axios from "axios";

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return Response.json({ text: "Missing API key" });
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    const newForm = new FormData();
    newForm.append("file", file, "audio.webm");
    newForm.append("model", "whisper-large-v3");

    const res = await axios.post(
      "https://api.groq.com/openai/v1/audio/transcriptions",
      newForm,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return Response.json({ text: res.data.text });

  } catch (err: any) {
    console.error("Transcription API error:", err.response?.data || err);

    return Response.json({
      text: " Transcription failed",
    });
  }
}