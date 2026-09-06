"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient, hasBrowserSupabase } from "../../lib/supabase/client";
import { loadState, saveState } from "../../lib/local";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);

    if (!hasBrowserSupabase()) {
      const state = loadState();
      state.user = { email: email || "guest@cadence.local" };
      saveState(state);
      router.push("/studio/demo");
      return;
    }

    if (password.length < 6) {
      setBusy(false);
      setError("Password must be at least 6 characters.");
      return;
    }

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    if (data.session) {
      router.push("/studio");
      router.refresh();
      return;
    }
    setInfo("Check your email to confirm, then log in. (Or disable confirm-email in Supabase Auth for local dev.)");
  }

  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <Link className="tiny" href="/login">Log in</Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Create account</h1>
      <p className="tiny" style={{ marginBottom: 20 }}>
        Free Supabase email signup. Profile row is created by the handle_new_user trigger.
        {!hasBrowserSupabase() && " Env missing — guest mode only."}
      </p>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required={hasBrowserSupabase()}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required={hasBrowserSupabase()}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
          />
        </div>
        {error && (
          <p className="tiny" style={{ color: "var(--bad, #c44)", marginBottom: 12 }}>{error}</p>
        )}
        {info && <p className="tiny" style={{ marginBottom: 12 }}>{info}</p>}
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? "Creating…" : "Enter studio"}
          </button>
          <Link className="btn" href="/studio/demo">Guest demo</Link>
        </div>
      </form>
    </main>
  );
}
