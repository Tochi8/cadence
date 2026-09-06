"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MobileDock from "../../components/MobileDock";
import { createClient, hasBrowserSupabase } from "../../../lib/supabase/client";
import { loadState, saveState, uid } from "../../../lib/local";

export default function NewProject() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function go(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const name = title.trim() || "Untitled project";

    if (hasBrowserSupabase()) {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: name }),
        });
        const json = await res.json();
        setBusy(false);
        if (!res.ok) {
          setError(json.error || "Could not create project");
          return;
        }
        router.push(`/studio/${json.project.id}/cast`);
        return;
      }
    }

    const state = loadState();
    const project = {
      id: uid("p"),
      title: name,
      characters: [],
      lines: [],
      takes: [],
    };
    state.projects.unshift(project);
    saveState(state);
    setBusy(false);
    router.push(`/studio/${project.id}/cast`);
  }

  return (
    <main className="wrap app-wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <span className="tiny desk-nav">Step 1 · Name the video</span>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>New project</h1>
      <p className="tiny" style={{ marginBottom: 20 }}>
        This name is for you. Next you cast the people who speak.
      </p>
      <form onSubmit={go}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Church explainer — Hausa" />
        </div>
        {error && <p className="tiny" style={{ color: "var(--bad, #c44)" }}>{error}</p>}
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? "Creating…" : "Cast speakers"}
          </button>
          <Link className="btn" href="/studio">Cancel</Link>
        </div>
      </form>
      <MobileDock />
    </main>
  );
}
