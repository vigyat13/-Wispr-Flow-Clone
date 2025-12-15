import { writeText } from "@tauri-apps/plugin-clipboard-manager";

type Props = {
  text: string;
};

export function TranscriptBox({ text }: Props) {
  const insertText = async () => {
    if (!text) return;

    try {
      await writeText(text);
      alert("Text copied to clipboard.\n\nPaste it into Notepad or VS Code (Ctrl+V).");
    } catch (err) {
      console.error(err);
      alert("Failed to copy text to clipboard.");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <textarea
        value={text}
        readOnly
        placeholder="Speak to see transcription..."
        style={{
          width: "100%",
          height: 140,
          padding: 12,
          fontSize: 14,
          borderRadius: 6
        }}
      />

      <button
        onClick={insertText}
        disabled={!text}
        style={{
          marginTop: 12,
          padding: "10px 14px",
          fontSize: 14,
          background: "#111",
          color: "#fff",
          cursor: text ? "pointer" : "not-allowed",
          borderRadius: 6
        }}
      >
        ➜ Insert Text
      </button>
    </div>
  );
}
