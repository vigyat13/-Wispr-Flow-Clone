export async function transcribeAudio(blob: Blob): Promise<string> {
  const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;

  const response = await fetch(
    "https://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&language=en",
    {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiKey}`,
        "Content-Type": blob.type // audio/webm;codecs=opus
      },
      body: blob
    }
  );

  const raw = await response.text();

  if (!response.ok) {
    console.error("Deepgram error:", raw);
    throw new Error("Deepgram transcription failed");
  }

  const data = JSON.parse(raw);

  return (
    data?.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? ""
  );
}
