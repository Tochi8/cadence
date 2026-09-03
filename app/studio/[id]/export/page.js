"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProject } from "../../../../lib/local";

export default function ExportPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => setProject(getProject(id)), [id]);
  if (!project) return <main className="wrap">Missing project</main>;

  const files = [
    { name: "scene.wav", detail: "Combined scene — not rendered" },
    ...project.characters.map((c) => ({
      name: `${c.name.toLowerCase()}.wav`,
      detail: `${c.locale} stem — not rendered`,
    })),
    { name: "scene.srt", detail: "Captions — not rendered" },
  ];

  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <Link className="tiny" href={`/studio/${id}`}>Back to desk</Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Export</h1>
      <p className="hint">
        <b>Step 4.</b> This is the handoff list. Files appear when a TTS vendor is connected.
        You can still see what you would take into Premiere or CapCut.
      </p>
      <div className="list">
        {files.map((f) => (
          <div className="card" key={f.name}>
            <b>{f.name}</b>
            <p className="tiny">{f.detail}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
