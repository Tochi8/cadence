import Link from "next/link";
import { PROJECT } from "../../lib/store";

export default function Projects() {
  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <span className="tiny">Free · {PROJECT.minutesUsed} / {PROJECT.minutesCap} min</span>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 16 }}>Projects</h1>
      <div className="list">
        <Link className="card" href="/studio/demo">
          <b>{PROJECT.title}</b>
          <p className="tiny">2 characters · 3 lines · stub takes</p>
        </Link>
      </div>
    </main>
  );
}
