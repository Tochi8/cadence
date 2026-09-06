"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileDock from "../components/MobileDock";
import { createClient, hasBrowserSupabase } from "../../lib/supabase/client";
import { ensureDemo, loadState } from "../../lib/local";

export default function Projects() {
  const [state, setState] = useState(null);
  const [remote, setRemote] = useState(null);
  const [email, setEmail] = useState(null);
  const [source, setSource] = useState("local");

  useEffect(() => {
    async function boot() {
      ensureDemo();
      const local = loadState();
      setState(local);

      if (!hasBrowserSupabase()) {
        setEmail(local.user?.email || null);
        setSource("local");
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setEmail(local.user?.email || null);
        setSource("local");
        return;
      }

      setEmail(user.email);
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (res.ok) {
          setRemote(json.projects || []);
          setSource(json.source || "supabase");
        }
      } catch {
        setSource("local");
      }
    }
    boot();
  }, []);

  if (!state) return <main className="wrap">Loading…</main>;

  const projects =
    source !== "local" && remote
      ? remote.map((p) => ({
          id: p.id,
          title: p.title,
          characters: [],
          lines: [],
          takes: [],
        }))
      : state.projects;

  return (
    <main className="wrap app-wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <nav className="nav desk-nav">
          <Link href="/billing">Billing</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </header>
      <div className="row" style={{ marginTop: 0, marginBottom: 16, justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 22, fontWeight: 560 }}>Projects</h1>
        <Link className="btn primary" href="/studio/new">New project</Link>
      </div>
      <p className="hint">
        <b>{email || "Guest"}</b> · {state.minutesUsed} / {state.minutesCap} min this month.
        {source === "local"
          ? " Work stays in this browser until you sign in."
          : ` Synced via ${source}.`}
        {" "}
        <Link href="/studio/demo">Open guest demo</Link>
      </p>
      <div className="list">
        {projects.map((p) => (
          <Link className="card" key={p.id} href={`/studio/${p.id}`}>
            <b>{p.title}</b>
            <p className="tiny">
              {p.characters?.length || 0} characters · {p.lines?.length || 0} lines ·{" "}
              {p.takes?.length || 0} takes
            </p>
          </Link>
        ))}
        {!projects.length && (
          <p className="tiny">No projects yet. Create one or open the guest demo.</p>
        )}
      </div>
      <MobileDock />
    </main>
  );
}
