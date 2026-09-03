import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap landing">
      <header className="top">
        <div className="brand">Cadence<span>.</span></div>
        <nav className="nav">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <Link href="/login">Log in</Link>
          <Link className="btn primary" href="/signup">Start free</Link>
        </nav>
      </header>

      <section className="hero">
        <p className="kicker">Voice director for AI video</p>
        <h1>Cast a person from a place. Keep them there.</h1>
        <p className="lede">
          Generic TTS turns a Lagos line into California by the third sentence.
          Cadence locks language, dialect, and character so the voice in clip 12
          is still the person you cast in clip 1. You leave with audio stems.
          Picture stays in your editor.
        </p>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start a project</Link>
          <a className="btn" href="#how">See the flow</a>
        </div>
      </section>

      <section className="section">
        <p className="kicker">The problem</p>
        <h2>Why most AI voices fail the video</h2>
        <div className="grid-2">
          <article className="card">
            <h3>Place disappears</h3>
            <p className="muted">
              “African accent” is one slider. Lagos English, Pidgin, Yoruba, and Hausa are not the same voice.
            </p>
          </article>
          <article className="card">
            <h3>The character drifts</h3>
            <p className="muted">
              New clip, new timbre. Episode 2 sounds like a different actor. Ads break.
            </p>
          </article>
          <article className="card">
            <h3>Dialogue is an afterthought</h3>
            <p className="muted">
              Most tools generate one narrator. Video is two people in a room.
            </p>
          </article>
          <article className="card">
            <h3>Tone flips mid-line</h3>
            <p className="muted">
              Free-text “be cinematic” makes the model shout, then go flat. Cadence uses a short tone list.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="how">
        <p className="kicker">How Cadence works</p>
        <h2>Cast. Write. Take. Export.</h2>
        <div className="steps four">
          <article>
            <h3><span className="n">1</span>Cast</h3>
            <p>Name the speaker. Pick how they speak — Lagos English, Pidgin, Yoruba, Igbo, Hausa. Lock them.</p>
          </article>
          <article>
            <h3><span className="n">2</span>Write</h3>
            <p>Add turns. Each line has one person and one tone: calm, warm, urgent, or dry.</p>
          </article>
          <article>
            <h3><span className="n">3</span>Take</h3>
            <p>Generate. Keep or throw away. The next line uses the same locked voice. Drift fails the take.</p>
          </article>
          <article>
            <h3><span className="n">4</span>Export</h3>
            <p>A.wav, B.wav, scene.wav, scene.srt. Drop them on the timeline. Cadence does not edit the picture.</p>
          </article>
        </div>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Walk this flow now</Link>
          <Link className="btn" href="/studio/demo">Open the sample scene</Link>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Who it is for</p>
        <h2>If the audience will hear “this person is not from here,” this is the desk.</h2>
        <div className="grid-3">
          <article className="card">
            <h3>Local creators</h3>
            <p className="muted">Ads, YouTube, Nollywood-style shorts, church explainers that elders will trust.</p>
          </article>
          <article className="card">
            <h3>Agencies</h3>
            <p className="muted">One campaign, many markets. Pay USD to localize into Lagos or Kano — not the other way around.</p>
          </article>
          <article className="card">
            <h3>Dialogue editors</h3>
            <p className="muted">Two locked people, not one model acting a play.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Locales at launch</p>
        <h2>You pick a place, not a code.</h2>
        <p className="muted" style={{ margin: "8px 0 16px", maxWidth: "46ch" }}>
          Free uses this pack. Creator unlocks every locale we ship after it. Codes stay in the engine.
        </p>
        <div className="grid-2">
          <article className="card"><h3>Lagos English</h3><p className="muted">City English. “Abeg, I dey come.”</p></article>
          <article className="card"><h3>Abuja English</h3><p className="muted">Capital English — still Nigerian.</p></article>
          <article className="card"><h3>Port Harcourt English</h3><p className="muted">South-south English.</p></article>
          <article className="card"><h3>Nigerian Pidgin</h3><p className="muted">“How you dey?” not BBC English.</p></article>
          <article className="card"><h3>Yoruba</h3><p className="muted">Spoken Yoruba. Tones kept.</p></article>
          <article className="card"><h3>Igbo + Hausa</h3><p className="muted">Spoken Igbo and Hausa on the same desk.</p></article>
        </div>
      </section>

      <section className="section" id="pricing">
        <p className="kicker">Pricing</p>
        <h2>Global product. USD. Minutes of rendered speech.</h2>
        <div className="plans">
          <article className="card">
            <h3>Free</h3>
            <p className="price">$0</p>
            <p className="muted">10 min / month · 2 characters · launch locales · 1 speaker · watermark</p>
            <Link className="btn" href="/signup" style={{ marginTop: 14 }}>Start free</Link>
          </article>
          <article className="card featured">
            <h3>Creator monthly</h3>
            <p className="price">$19</p>
            <p className="muted">90 min · 20 characters · scenes · 3 clones · no watermark</p>
            <Link className="btn primary" href="/billing" style={{ marginTop: 14 }}>See Creator</Link>
          </article>
          <article className="card">
            <h3>Creator yearly</h3>
            <p className="price">$190</p>
            <p className="muted">Same as monthly. Two months free.</p>
            <Link className="btn" href="/billing" style={{ marginTop: 14 }}>See yearly</Link>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>FAQ</h2>
        <article className="faq">
          <h3>Does Cadence make the video?</h3>
          <p className="muted">No. Audio only. Optional lip-sync is a later handoff to another tool.</p>
        </article>
        <article className="faq">
          <h3>Is this ElevenLabs with a skin?</h3>
          <p className="muted">No. ElevenLabs can be one backend. The product is the lock, the locale, and the scene.</p>
        </article>
        <article className="faq">
          <h3>Can I type any accent I want?</h3>
          <p className="muted">You pick from shipped locales. Free is the launch pack. Creator gets every live pack, not every language on Earth.</p>
        </article>
        <article className="faq">
          <h3>Why is there no sound yet?</h3>
          <p className="muted">The desk is live so you can learn the flow. Real takes need a TTS vendor key.</p>
        </article>
      </section>

      <section className="final-cta">
        <h2>Cast the first speaker in two minutes.</h2>
        <p className="muted">Guest mode. This browser. No card.</p>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start a project</Link>
          <Link className="btn" href="/studio/demo">Sample scene</Link>
        </div>
      </section>
      <footer className="foot">© 2026 Cadence. Voice director. Not a video editor.</footer>
    </main>
  );
}
