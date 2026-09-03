"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="top site-head">
      <Link className="brand" href="/">Cadence<span>.</span></Link>
      <button
        className="burger"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav className={open ? "nav site-nav open" : "nav site-nav"}>
        <a href="#how" onClick={() => setOpen(false)}>How it works</a>
        <a href="#voices" onClick={() => setOpen(false)}>Voices</a>
        <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
        <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
        <Link className="btn primary" href="/signup" onClick={() => setOpen(false)}>Start free</Link>
      </nav>
    </header>
  );
}
