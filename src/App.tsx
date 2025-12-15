import { useRecorder } from "./hooks/useRecorder";
import { useDeepgram } from "./hooks/useDeepgram";
import { RecorderButton } from "./components/RecorderButton";

import { TranscriptBox } from "./components/TranscriptBox";

function App() {
  const deepgram = useDeepgram();
  const recorder = useRecorder(deepgram.transcribe);

  return (
    <div style={{ padding: 24 }}>
      <h1>Wispr Flow Clone</h1>

      <RecorderButton
        onStart={recorder.start}
        onStop={recorder.stop}
      />

      {deepgram.loading && <p>Transcribing...</p>}

      <TranscriptBox text={deepgram.text} />
    </div>
  );
}

export default App;
