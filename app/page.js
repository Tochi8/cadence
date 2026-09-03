import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <header className="top">
        <div className="brand">Cadence<span>.</span></div>
        <nav className="nav">
          <Link href="/studio">Studio</Link>
        </nav>
      </header>
      <section className="hero">
        <h1>Cast a person from a place. Keep them there.</h1>
        <p className="lede">
          Cadence is a voice director for AI video. Locale, character, and scene stay locked.
          Audio only. Picture stays in your editor.
        </p>
        <div className="row">
          <Link className="btn primary" href="/studio/demo">Open the desk</Link>
          <Link className="btn" href="/studio">Projects</Link>
        </div>
      </section>
      <section className="facts">
        <article>
          <h3>Place</h3>
          <p>en-NG-LAG is not “African.” Pidgin is not broken English.</p>
        </article>
        <article>
          <h3>Lock</h3>
          <p>Same character on every take. Drift fails the take.</p>
        </article>
        <article>
          <h3>Scene</h3>
          <p>Two people, stems and SRT. Not one model doing a play.</p>
        </article>
      </section>
    </main>
  );
}
