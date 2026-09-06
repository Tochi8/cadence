"use client";

import { useRef, useState } from "react";
import { playMockTake } from "../../lib/mockAudio";

export default function SamplePlayer({ label = "Play sample", caption }) {
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef(null);

  async function toggle() {
    if (playing) {
      stopRef.current?.();
      stopRef.current = null;
      setPlaying(false);
      return;
    }
    setPlaying(true);
    stopRef.current = await playMockTake(() => {
      setPlaying(false);
      stopRef.current = null;
    });
  }

  return (
    <div className="sample-player">
      <button type="button" className="btn primary" onClick={toggle}>
        {playing ? "Stop sample" : label}
      </button>
      {caption && <p className="tiny">{caption}</p>}
    </div>
  );
}
