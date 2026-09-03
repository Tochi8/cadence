import Link from "next/link";
import { PROJECT } from "../../lib/store";

export default function Projects() {
  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <span className="tiny">Guest · {PROJECT.minutesUsed} / {PROJECT.minutesCap} min</span>
      </header>
      <div className="row" style={{ marginTop: 0, marginBottom: 20, justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 22, fontWeight: 560 }}>Projects</h1>
        <Link className="btn primary" href="/studio/new">New project</Link>
      </div>
      <p className="hint">
        <b>What this list is.</b> Each project is one video’s audio. Open the sample, or start empty and cast two speakers.
      </p>
      <div className="list">
        <Link className="card" href="/studio/demo">
          <b>{PROJECT.title}</b>
          <p className="tiny">Sample · 2 speakers · 3 lines · next: generate a take</p>
        </Link>
      </div>
    </main>
  );
}
