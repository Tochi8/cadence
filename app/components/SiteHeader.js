"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="top site-head">
      <Link className="brand" href="/">Cadence<span>.</span></Link>
      <nav className="nav site-nav">
        <a href="#how">How it works</a>
        <a href="#voices">Voices</a>
        <a href="#pricing">Pricing</a>
        <Link href="/login">Log in</Link>
        <Link className="btn primary" href="/signup">Start free</Link>
      </nav>
    </header>
  );
}
