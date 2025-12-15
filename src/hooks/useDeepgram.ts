import { useState } from "react";
import { transcribeAudio } from "../services/deepgram";

export function useDeepgram() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const transcribe = async (blob: Blob) => {
    setLoading(true);
    const result = await transcribeAudio(blob);
    setText(result);
    setLoading(false);
  };

  return { text, transcribe, loading };
}
