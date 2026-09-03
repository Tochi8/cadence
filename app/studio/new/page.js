"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProject() {
  const router = useRouter();
  const [title, setTitle] = useState("Market stall — 40s ad");

  function go(e) {
    e.preventDefault();
    router.push("/studio/demo");
  }

  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <span className="tiny">Step 1 of 3 · Name the video</span>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>New project</h1>
      <p className="tiny" style={{ marginBottom: 20 }}>
        You are naming the video this audio belongs to. Casting happens on the next screen.
      </p>
      <form onSubmit={go}>
        <div className="field">
          <label htmlFor="title">Project title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn primary" type="submit">Open the desk</button>
          <Link className="btn" href="/studio">Cancel</Link>
        </div>
      </form>
    </main>
  );
}
