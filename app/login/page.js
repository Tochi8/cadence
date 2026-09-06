"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient, hasBrowserSupabase } from "../../lib/supabase/client";
import { loadState, saveState } from "../../lib/local";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/studio";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    if (!hasBrowserSupabase()) {
      const state = loadState();
      state.user = { email: email || "guest@cadence.local" };
      saveState(state);
      router.push(next === "/studio" ? "/studio/demo" : next);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.push(next.startsWith("/") ? next : "/studio");
    router.refresh();
  }

  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <Link className="tiny" href="/signup">Sign up</Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Log in</h1>
      <p className="tiny" style={{ marginBottom: 20 }}>
        Email and password via Supabase Auth.
        {!hasBrowserSupabase() && " Env missing — guest mode on this device."}
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
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <p className="tiny" style={{ color: "var(--bad, #c44)", marginBottom: 12 }}>{error}</p>
        )}
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Continue"}
          </button>
          <Link className="btn" href="/studio/demo">Skip — guest demo</Link>
        </div>
      </form>
    </main>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<main className="wrap">Loading…</main>}>
      <LoginForm />
    </Suspense>
  );
}
