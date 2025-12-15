import { useRef } from "react";

export function useAudio(onAudioFrame: (pcm: ArrayBuffer) => void) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const start = async () => {
    // MUST be created + resumed in user gesture
    const audioCtx = new AudioContext({ sampleRate: 44100 });
    await audioCtx.resume();
    audioCtxRef.current = audioCtx;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const source = audioCtx.createMediaStreamSource(stream);
    const processor = audioCtx.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const buffer = new ArrayBuffer(input.length * 2);
      const view = new DataView(buffer);

      let offset = 0;
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }

      onAudioFrame(buffer);
    };

    source.connect(processor);
    processor.connect(audioCtx.destination);
  };

  const stop = () => {
    processorRef.current?.disconnect();
    audioCtxRef.current?.close();
    streamRef.current?.getTracks().forEach(t => t.stop());

    processorRef.current = null;
    audioCtxRef.current = null;
    streamRef.current = null;
  };

  return { start, stop };
}
