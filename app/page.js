import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
  return (
    <main className="wrap landing">
      <SiteHeader />

      <section className="hero">
        <p className="kicker">Audio for AI videos</p>
        <h1>Make the voice sound like someone from here.</h1>
        <p className="lede">
          Other apps give you one American voice and call it African.
          In Cadence you pick Lagos English, Pidgin, Yoruba, Igbo, or Hausa.
          That person stays the same from the first line to the last.
          You download the sound. You edit the video somewhere else.
        </p>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start a project</Link>
          <a className="btn" href="#how">See how it works</a>
        </div>
      </section>

      <section className="section">
        <p className="kicker">What goes wrong today</p>
        <h2>The voice starts Nigerian and ends American.</h2>
        <div className="grid-2">
          <article className="card">
            <h3>One fake African voice</h3>
            <p className="muted">
              Lagos is not Accra. Pidgin is not Yoruba. A slider cannot fix that.
            </p>
          </article>
          <article className="card">
            <h3>The actor changes mid video</h3>
            <p className="muted">
              Clip one sounds like Ada. Clip two sounds like a different woman.
            </p>
          </article>
          <article className="card">
            <h3>Only one person talking</h3>
            <p className="muted">
              Most apps read the whole script as one narrator. A market scene needs two people.
            </p>
          </article>
          <article className="card">
            <h3>The mood jumps around</h3>
            <p className="muted">
              You pick calm, warm, urgent, or dry. Not a long note that confuses the voice.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="how">
        <p className="kicker">How it works</p>
        <h2>Four steps. Then you have files for your editor.</h2>
        <div className="steps four">
          <article>
            <h3><span className="n">1</span>Pick the speaker</h3>
            <p>Give them a name. Choose how they talk. Lock so they cannot change later.</p>
          </article>
          <article>
            <h3><span className="n">2</span>Write what they say</h3>
            <p>One line at a time. Say who is talking and if they sound calm, warm, urgent, or dry.</p>
          </article>
          <article>
            <h3><span className="n">3</span>Make a take</h3>
            <p>Press generate. Keep it or throw it away. The next line uses the same person.</p>
          </article>
          <article>
            <h3><span className="n">4</span>Download the sound</h3>
            <p>One file per person, one file for the whole scene, plus captions. No video editor inside Cadence.</p>
          </article>
        </div>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Try the four steps</Link>
          <Link className="btn" href="/studio/demo">Hear a sample scene setup</Link>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Who this is for</p>
        <h2>People who make videos for Nigerian ears.</h2>
        <div className="grid-3">
          <article className="card">
            <h3>YouTube and ads</h3>
            <p className="muted">Shorts and ads where granny in Ikeja should not hear a US newsreader.</p>
          </article>
          <article className="card">
            <h3>Agencies</h3>
            <p className="muted">One campaign that must speak Lagos, then Kano, then Pidgin. Paid in dollars.</p>
          </article>
          <article className="card">
            <h3>Editors</h3>
            <p className="muted">Two voices in one scene, already split into files you can drop on a timeline.</p>
          </article>
        </div>
      </section>

      <section className="section" id="voices">
        <p className="kicker">Voices you can pick now</p>
        <h2>Choose Lagos English. Not a secret label.</h2>
        <p className="muted" style={{ margin: "8px 0 16px", maxWidth: "46ch" }}>
          Free gets this list. Paid gets every new place we add later. The computer still uses a short code in the back. You never have to type it.
        </p>
        <div className="grid-2">
          <article className="card"><h3>Lagos English</h3><p className="muted">How people talk in the city. Example: Abeg, I dey come.</p></article>
          <article className="card"><h3>Abuja English</h3><p className="muted">Clearer Nigerian English from the capital.</p></article>
          <article className="card"><h3>Port Harcourt English</h3><p className="muted">English from the south south.</p></article>
          <article className="card"><h3>Nigerian Pidgin</h3><p className="muted">How you dey? Not school English.</p></article>
          <article className="card"><h3>Yoruba</h3><p className="muted">Spoken Yoruba, with the tones.</p></article>
          <article className="card"><h3>Igbo</h3><p className="muted">Spoken Igbo.</p></article>
          <article className="card"><h3>Hausa</h3><p className="muted">Spoken Hausa.</p></article>
        </div>
      </section>

      <section className="section" id="pricing">
        <p className="kicker">Price</p>
        <h2>Pay for minutes of finished speech.</h2>
        <div className="plans">
          <article className="card">
            <h3>Free</h3>
            <p className="price">$0</p>
            <p className="muted">10 minutes a month. 2 people. One speaker in a scene. A small mark on the file.</p>
            <Link className="btn" href="/signup" style={{ marginTop: 14 }}>Start free</Link>
          </article>
          <article className="card featured">
            <h3>Creator monthly</h3>
            <p className="price">$19</p>
            <p className="muted">90 minutes. 20 people. Two speakers. 3 voice copies you own. Clean files.</p>
            <Link className="btn primary" href="/billing" style={{ marginTop: 14 }}>See Creator</Link>
          </article>
          <article className="card">
            <h3>Creator yearly</h3>
            <p className="price">$190</p>
            <p className="muted">Same as monthly. You pay for 10 months, get 12.</p>
            <Link className="btn" href="/billing" style={{ marginTop: 14 }}>See yearly</Link>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Common questions</h2>
        <article className="faq">
          <h3>Does this make the video?</h3>
          <p className="muted">No. Only sound. You put the sound on the video in CapCut, Premiere, or Resolve.</p>
        </article>
        <article className="faq">
          <h3>Is this just ElevenLabs?</h3>
          <p className="muted">No. That tool can be one engine we call. Cadence is the desk that keeps the person and the place steady.</p>
        </article>
        <article className="faq">
          <h3>Can I invent any accent?</h3>
          <p className="muted">No. You pick from the list we have tested. Free is the list above. Paid gets new places when we add them.</p>
        </article>
        <article className="faq">
          <h3>Why is there no sound when I press generate?</h3>
          <p className="muted">The buttons work so you can learn the desk. Real sound needs a voice company key. That comes next.</p>
        </article>
      </section>

      <section className="final-cta">
        <h2>Make the first speaker in two minutes.</h2>
        <p className="muted">Saved on this phone. No card.</p>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start a project</Link>
          <Link className="btn" href="/studio/demo">Open the sample</Link>
        </div>
      </section>
      <footer className="foot">2026 Cadence. Sound for video. Not a video app.</footer>
    </main>
  );
}
