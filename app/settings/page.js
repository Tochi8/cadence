"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MobileDock from "../components/MobileDock";
import { createClient, hasBrowserSupabase } from "../../lib/supabase/client";
import { loadState, saveState } from "../../lib/local";

export default function Settings() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      if (hasBrowserSupabase()) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email);
          setReady(true);
          return;
        }
      }
      const state = loadState();
      setEmail(state.user?.email || null);
      setReady(true);
    }
    load();
  }, []);

  if (!ready) return null;

  async function signOut() {
    if (hasBrowserSupabase()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    const next = loadState();
    next.user = null;
    saveState(next);
    router.push("/");
    router.refresh();
  }

  function wipe() {
    window.localStorage.removeItem("cadence.guest.v1");
    router.push("/");
  }

  return (
    <main className="wrap app-wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <Link className="desk-nav" href="/studio">Studio</Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Settings</h1>
      <p className="tiny" style={{ marginBottom: 16 }}>{email || "No account on this device"}</p>
      <div className="row">
        <button className="btn" type="button" onClick={signOut}>Sign out</button>
        <button className="btn" type="button" onClick={wipe}>Clear local projects</button>
      </div>
      <MobileDock />
    </main>
  );
}
