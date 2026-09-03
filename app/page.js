import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <header className="top">
        <div className="brand">Cadence<span>.</span></div>
        <nav className="nav">
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </nav>
      </header>
      <section className="hero">
        <h1>Cast a person from a place. Keep them there.</h1>
        <p className="lede">
          Write a scene. Lock each speaker to a locale. Export stems.
          Walk the full desk in this browser — no database required.
        </p>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start a project</Link>
          <Link className="btn" href="/studio/demo">Open the sample scene</Link>
        </div>
      </section>
      <section className="steps">
        <article>
          <h3><span className="n">1</span>Cast</h3>
          <p>Two people. A place each. Lock.</p>
        </article>
        <article>
          <h3><span className="n">2</span>Write</h3>
          <p>Turns in the scene. Calm, warm, urgent, or dry.</p>
        </article>
        <article>
          <h3><span className="n">3</span>Take + export</h3>
          <p>Generate a take. Keep it. Export is listed even before audio exists.</p>
        </article>
      </section>
    </main>
  );
}
