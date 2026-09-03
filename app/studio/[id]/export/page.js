import Link from "next/link";

export default function ExportPage() {
  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <Link className="tiny" href="/studio/demo">Back to desk</Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Export</h1>
      <p className="hint">
        <b>Step 4 — later.</b> This page will give you A.wav, B.wav, scene.wav, and scene.srt.
        Nothing to download until a TTS vendor is connected.
      </p>
      <div className="card">
        <p>scene.wav — combined</p>
        <p className="tiny">Not rendered</p>
      </div>
    </main>
  );
}
