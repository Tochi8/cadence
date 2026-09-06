import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import VoiceHero from "./components/VoiceHero";

export default function Home() {
  return (
    <main className="wrap landing">
      <SiteHeader />

      <section className="hero hero-split">
        <div>
          <p className="kicker">Audio for AI videos</p>
          <h1>Cadence makes spoken audio that sounds Nigerian, and stays that way.</h1>
          <p className="lede">
            You choose a speaker and how they talk: Lagos English, Pidgin, Yoruba, Igbo, or Hausa.
            You write the lines. Cadence keeps that same person on every line.
            You download the sound files and put them on your video in another app.
          </p>
          <div className="row">
            <Link className="btn primary" href="/studio/new">Start a project</Link>
            <a className="btn" href="#how">See how it works</a>
          </div>
        </div>
        <VoiceHero />
      </section>

      <section className="section">
        <p className="kicker">The problem</p>
        <h2>Other voice apps start in Nigerian English and finish like an American newsreader.</h2>
        <div className="grid-2">
          <article className="card">
            <h3>They mix all African voices into one</h3>
            <p className="muted">
              Lagos English, Pidgin, Yoruba, and Hausa are different. Cadence treats them as different choices.
            </p>
          </article>
          <article className="card">
            <h3>The same character sounds new in the next clip</h3>
            <p className="muted">
              If Ada speaks in clip one, she should still be Ada in clip two. Cadence locks her voice.
            </p>
          </article>
          <article className="card">
            <h3>They only give you one speaker</h3>
            <p className="muted">
              A market ad often needs two people. You assign each line to a person.
            </p>
          </article>
          <article className="card">
            <h3>The mood is hard to control</h3>
            <p className="muted">
              Each line is calm, warm, urgent, or dry. That is the full list on purpose.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="how">
        <p className="kicker">How it works</p>
        <h2>You cast speakers, write lines, save takes, then download sound files.</h2>
        <div className="steps four">
          <article>
            <h3><span className="n">1</span>Cast</h3>
            <p>Name the person. Choose Lagos English, Pidgin, Yoruba, Igbo, or Hausa. Lock so the voice cannot switch.</p>
          </article>
          <article>
            <h3><span className="n">2</span>Write</h3>
            <p>Add each line. Say who is talking and pick calm, warm, urgent, or dry.</p>
          </article>
          <article>
            <h3><span className="n">3</span>Take</h3>
            <p>Press generate. Keep the take or drop it. The next line still uses the locked person.</p>
          </article>
          <article>
            <h3><span className="n">4</span>Export</h3>
            <p>Download one file per speaker, one file for the whole scene, and captions. Edit picture in CapCut or Premiere.</p>
          </article>
        </div>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start those four steps</Link>
          <Link className="btn" href="/studio/demo">Open a sample scene</Link>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Who it is for</p>
        <h2>Cadence is for people who make videos Nigerians will watch and listen to.</h2>
        <div className="grid-3">
          <article className="card">
            <h3>Creators</h3>
            <p className="muted">YouTube, ads, short films, and church or school videos that should sound local.</p>
          </article>
          <article className="card">
            <h3>Agencies</h3>
            <p className="muted">One campaign that needs a Lagos version and a Hausa version. Billing is in US dollars.</p>
          </article>
          <article className="card">
            <h3>Editors</h3>
            <p className="muted">You get separate sound files for each speaker, ready to drop on a timeline.</p>
          </article>
        </div>
      </section>

      <section className="section" id="voices">
        <p className="kicker">Voices</p>
        <h2>On the first version you can choose these ways of speaking.</h2>
        <p className="muted" style={{ margin: "8px 0 16px", maxWidth: "46ch" }}>
          Free accounts use this list. Paid accounts get new places when we add them.
        </p>
        <div className="grid-2">
          <article className="card"><h3>Lagos English</h3><p className="muted">English as people speak it in Lagos. Example: Abeg, I dey come.</p></article>
          <article className="card"><h3>Abuja English</h3><p className="muted">Nigerian English as people speak it in Abuja.</p></article>
          <article className="card"><h3>Port Harcourt English</h3><p className="muted">Nigerian English as people speak it in Port Harcourt.</p></article>
          <article className="card"><h3>Nigerian Pidgin</h3><p className="muted">Pidgin. Example: How you dey?</p></article>
          <article className="card"><h3>Yoruba</h3><p className="muted">Spoken Yoruba, including the tones.</p></article>
          <article className="card"><h3>Igbo</h3><p className="muted">Spoken Igbo.</p></article>
          <article className="card"><h3>Hausa</h3><p className="muted">Spoken Hausa.</p></article>
        </div>
      </section>

      <section className="section" id="pricing">
        <p className="kicker">Price</p>
        <h2>You pay for minutes of finished speech.</h2>
        <div className="plans">
          <article className="card">
            <h3>Free</h3>
            <p className="price">$0</p>
            <p className="muted">10 minutes each month. 2 characters. One speaker in a scene. A mark on the file.</p>
            <Link className="btn" href="/signup" style={{ marginTop: 14 }}>Start free</Link>
          </article>
          <article className="card featured">
            <h3>Creator monthly</h3>
            <p className="price">$19</p>
            <p className="muted">90 minutes. 20 characters. Two speakers. 3 voice copies. Clean files.</p>
            <Link className="btn primary" href="/billing" style={{ marginTop: 14 }}>See Creator</Link>
          </article>
          <article className="card">
            <h3>Creator yearly</h3>
            <p className="price">$190</p>
            <p className="muted">Same limits as monthly. Pay for 10 months and get 12.</p>
            <Link className="btn" href="/billing" style={{ marginTop: 14 }}>See yearly</Link>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Questions</h2>
        <article className="faq">
          <h3>Does Cadence make the video?</h3>
          <p className="muted">No. It only makes sound. You add that sound to the video in CapCut, Premiere, or Resolve.</p>
        </article>
        <article className="faq">
          <h3>Is Cadence the same as ElevenLabs?</h3>
          <p className="muted">No. ElevenLabs can be one engine we call later. Cadence is the desk where you pick the person, the place, and the lines.</p>
        </article>
        <article className="faq">
          <h3>Can I type any accent I want?</h3>
          <p className="muted">No. You pick from the list above. We only add a new place after we have tested it.</p>
        </article>
        <article className="faq">
          <h3>Why is there no real speech when I press play in the studio?</h3>
          <p className="muted">Play sample is a mock take so you can test the flow after you write a line. Real Nigerian speech needs a voice company key next.</p>
        </article>
      </section>

      <section className="final-cta">
        <h2>Create your first speaker, then write the first line.</h2>
        <p className="muted">Saved on this phone. You do not need a card.</p>
        <div className="row">
          <Link className="btn primary" href="/studio/new">Start a project</Link>
          <Link className="btn" href="/studio/demo">Open the sample</Link>
        </div>
      </section>
      <footer className="foot">2026 Cadence. Sound files for video. Not a video editor.</footer>
    </main>
  );
}
