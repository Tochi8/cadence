"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MobileDock from "../../components/MobileDock";
import { loadState, saveState, uid } from "../../../lib/local";

export default function NewProject() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  function go(e) {
    e.preventDefault();
    const state = loadState();
    const project = {
      id: uid("p"),
      title: title.trim() || "Untitled project",
      characters: [],
      lines: [],
      takes: [],
    };
    state.projects.unshift(project);
    saveState(state);
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
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn primary" type="submit">Cast speakers</button>
          <Link className="btn" href="/studio">Cancel</Link>
        </div>
      </form>
      <MobileDock />
    </main>
  );
}
