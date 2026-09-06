"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MobileDock from "../components/MobileDock";
import { loadState, saveState } from "../../lib/local";

export default function Settings() {
  const router = useRouter();
  const [state, setState] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return null;

  function signOut() {
    const next = loadState();
    next.user = null;
    saveState(next);
    router.push("/");
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
      <p className="tiny" style={{ marginBottom: 16 }}>{state.user?.email || "No account on this device"}</p>
      <div className="row">
        <button className="btn" type="button" onClick={signOut}>Sign out</button>
        <button className="btn" type="button" onClick={wipe}>Clear local projects</button>
      </div>
      <MobileDock />
    </main>
  );
}
