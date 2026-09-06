"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileDock from "../components/MobileDock";
import { loadState } from "../../lib/local";

export default function Billing() {
  const [state, setState] = useState(null);
  useEffect(() => setState(loadState()), []);
  if (!state) return null;
  return (
    <main className="wrap app-wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <Link className="desk-nav" href="/studio">Studio</Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Billing</h1>
      <p className="hint">Guest plan. Stripe is not connected. Minutes are displayed only.</p>
      <div className="card">
        <b>Free</b>
        <p className="tiny">{state.minutesUsed} / {state.minutesCap} min used</p>
      </div>
      <div className="list" style={{ marginTop: 12 }}>
        <div className="card"><b>Creator monthly</b><p className="tiny">$19 · 90 min · not for sale yet</p></div>
        <div className="card"><b>Creator yearly</b><p className="tiny">$190 · 90 min / mo · not for sale yet</p></div>
      </div>
      <MobileDock />
    </main>
  );
}
