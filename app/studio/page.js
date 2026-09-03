"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ensureDemo, loadState } from "../../lib/local";

export default function Projects() {
  const [state, setState] = useState(null);

  useEffect(() => {
    ensureDemo();
    setState(loadState());
  }, []);

  if (!state) return <main className="wrap">Loading…</main>;

  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <nav className="nav">
          <Link href="/billing">Billing</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </header>
      <div className="row" style={{ marginTop: 0, marginBottom: 16, justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 22, fontWeight: 560 }}>Projects</h1>
        <Link className="btn primary" href="/studio/new">New project</Link>
      </div>
      <p className="hint">
        <b>{state.user?.email || "Guest"}</b> · {state.minutesUsed} / {state.minutesCap} min this month.
        Work stays in this browser until Supabase is connected.
      </p>
      <div className="list">
        {state.projects.map((p) => (
          <Link className="card" key={p.id} href={`/studio/${p.id}`}>
            <b>{p.title}</b>
            <p className="tiny">
              {p.characters?.length || 0} characters · {p.lines?.length || 0} lines ·{" "}
              {p.takes?.length || 0} takes
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
