import { useRef } from "react";

export function useRecorder(onStop: (blob: Blob) => void) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const isRecordingRef = useRef(false);

  const start = async () => {
    if (isRecordingRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    isRecordingRef.current = true;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      isRecordingRef.current = false;
      const blob = new Blob(chunksRef.current, {
        type: recorder.mimeType
      });

      console.log("Recorded:", blob.type, blob.size);
      onStop(blob);
    };

    recorder.start(500); // chunks every 500ms
    recorderRef.current = recorder;
  };

  const stop = () => {
    if (!isRecordingRef.current) return;
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
  };

  return { start, stop };
}
