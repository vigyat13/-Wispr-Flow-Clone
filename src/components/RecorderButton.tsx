import { useState } from "react";

type Props = {
  onStart: () => void;
  onStop: () => void;
};

export function RecorderButton({ onStart, onStop }: Props) {
  const [recording, setRecording] = useState(false);

  const toggle = () => {
    if (!recording) {
      onStart();
      setRecording(true);
    } else {
      onStop();
      setRecording(false);
    }
  };

  return (
    <button
      onClick={toggle}
      style={{
        padding: "12px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        background: recording ? "#b91c1c" : "#111",
        color: "#fff",
        cursor: "pointer"
      }}
    >
      {recording ? "⏹ Stop Recording" : "🎙 Start Recording"}
    </button>
  );
}
