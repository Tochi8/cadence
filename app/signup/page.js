"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loadState, saveState } from "../../lib/local";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function submit(e) {
    e.preventDefault();
    const state = loadState();
    state.user = { email: email || "guest@cadence.local" };
    saveState(state);
    router.push("/studio");
  }

  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <Link className="tiny" href="/login">Log in</Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Create account</h1>
      <p className="tiny" style={{ marginBottom: 20 }}>
        Guest mode. Saved in this browser only. No email is sent.
      </p>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@studio.com" />
        </div>
        <button className="btn primary" type="submit">Enter studio</button>
      </form>
    </main>
  );
}
