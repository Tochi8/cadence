"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALES, STOCK } from "../../../../lib/locales";
import { getProject, patchProject, uid } from "../../../../lib/local";

export default function CastPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [locale, setLocale] = useState("en-NG-LAG");
  const [voice, setVoice] = useState("Stock · Lagos F");

  useEffect(() => {
    setProject(getProject(id));
  }, [id]);

  function add(e) {
    e.preventDefault();
    if (!name.trim()) return;
    patchProject(id, (p) => ({
      ...p,
      characters: [
        ...p.characters,
        { id: uid("c"), name: name.trim(), locale, voice, locked: true },
      ],
    }));
    setName("");
    setProject(getProject(id));
  }

  if (!project) {
    return (
      <main className="wrap">
        <p>Project missing. <Link href="/studio/new">Start one</Link></p>
      </main>
    );
  }

  const voices = STOCK.filter((s) => s.locale === locale);

  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
        <span className="tiny">Step 2 · Cast</span>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>{project.title}</h1>
      <p className="hint">
        <b>Add at least one speaker.</b> Two is a scene. Lock is on by default so they stay the same person.
      </p>
      <form onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" />
        </div>
        <div className="field">
          <label>Locale</label>
          <select
            value={locale}
            onChange={(e) => {
              const next = e.target.value;
              setLocale(next);
              const first = STOCK.find((s) => s.locale === next);
              if (first) setVoice(first.label);
            }}
          >
            {LOCALES.map((l) => (
              <option key={l.code} value={l.code}>{l.name} · {l.code}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Stock voice</label>
          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {(voices.length ? voices : STOCK).map((s) => (
              <option key={s.id} value={s.label}>{s.label}</option>
            ))}
          </select>
        </div>
        <button className="btn" type="submit">Add character</button>
      </form>
      <div className="list" style={{ marginTop: 20 }}>
        {project.characters.map((c) => (
          <div className="card" key={c.id}>
            <b>{c.name}</b>
            <p className="tiny">{c.locale} · {c.voice} · locked</p>
          </div>
        ))}
      </div>
      <div className="row">
        <button
          className="btn primary"
          type="button"
          disabled={!project.characters.length}
          onClick={() => router.push(`/studio/${id}`)}
        >
          Write the scene
        </button>
      </div>
    </main>
  );
}
