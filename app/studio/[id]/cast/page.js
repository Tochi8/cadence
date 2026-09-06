"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALES, STOCK, localeHint, localeName } from "../../../../lib/locales";
import { createClient, hasBrowserSupabase } from "../../../../lib/supabase/client";
import { getProject, patchProject, uid } from "../../../../lib/local";

export default function CastPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [locale, setLocale] = useState("en-NG-LAG");
  const [voice, setVoice] = useState("Ada — Lagos woman");
  const [mode, setMode] = useState("local");

  async function load() {
    if (id === "demo" || !hasBrowserSupabase()) {
      setMode("local");
      setProject(getProject(id));
      return;
    }
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMode("local");
      setProject(getProject(id));
      return;
    }
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) {
      setMode("local");
      setProject(getProject(id));
      return;
    }
    const json = await res.json();
    setMode("api");
    setProject({
      id: json.project.id,
      title: json.project.title,
      characters: json.characters || [],
      lines: json.lines || [],
      takes: json.takes || [],
    });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function add(e) {
    e.preventDefault();
    if (!name.trim()) return;

    if (mode === "api") {
      const res = await fetch(`/api/projects/${id}/characters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), locale, voice, locked: true }),
      });
      if (!res.ok) return;
      setName("");
      await load();
      return;
    }

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
        <span className="tiny desk-nav">Step 2 · Cast</span>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>{project.title}</h1>
      <p className="tiny" style={{ marginBottom: 20 }}>
        Add at least one speaker. Pick the way they speak, not a code. Two people make a scene.
      </p>
      <form onSubmit={add}>
        <div className="field">
          <label htmlFor="name">Character name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" />
        </div>
        <div className="field">
          <label htmlFor="locale">How they speak</label>
          <select
            id="locale"
            value={locale}
            onChange={(e) => {
              const next = e.target.value;
              setLocale(next);
              const first = STOCK.find((s) => s.locale === next);
              if (first) setVoice(first.label);
            }}
          >
            {LOCALES.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          <p className="tiny">{localeHint(locale)}</p>
        </div>
        <div className="field">
          <label htmlFor="voice">Stock voice</label>
          <select id="voice" value={voice} onChange={(e) => setVoice(e.target.value)}>
            {(voices.length ? voices : STOCK).map((s) => (
              <option key={s.label} value={s.label}>{s.label}</option>
            ))}
          </select>
        </div>
        <button className="btn" type="submit">Add character</button>
      </form>
      <div className="list" style={{ marginTop: 20 }}>
        {project.characters.map((c) => (
          <div className="card" key={c.id}>
            <b>{c.name}</b>
            <p className="tiny">{localeName(c.locale)} · {c.voice} · locked</p>
          </div>
        ))}
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <button className="btn primary" type="button" onClick={() => router.push(`/studio/${id}`)}>
          Write the scene
        </button>
      </div>
    </main>
  );
}
