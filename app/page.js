import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <header className="top">
        <div className="brand">Cadence<span>.</span></div>
        <nav className="nav">
          <Link href="/login">Log in</Link>
          <Link href="/studio">Studio</Link>
        </nav>
      </header>
      <section className="hero">
        <h1>Cast a person from a place. Keep them there.</h1>
        <p className="lede">
          You write the scene. Cadence keeps each speaker locked to a locale.
          You leave with audio stems. Video stays in your editor.
        </p>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start a project</Link>
          <Link className="btn" href="/studio/demo">See a finished scene</Link>
        </div>
      </section>
      <section className="steps">
        <article>
          <h3><span className="n">1</span>Cast</h3>
          <p>Name two people. Pick a place (Lagos English, Pidgin, Yoruba…). Lock them.</p>
        </article>
        <article>
          <h3><span className="n">2</span>Write</h3>
          <p>One line each. Emotion is a short list: calm, warm, urgent, dry.</p>
        </article>
        <article>
          <h3><span className="n">3</span>Take</h3>
          <p>Generate. Keep or throw away. Same voice on the next line.</p>
        </article>
      </section>
    </main>
  );
}
