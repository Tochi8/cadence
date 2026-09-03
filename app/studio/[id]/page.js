"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EMOTIONS, emotionLabel, localeName } from "../../../lib/locales";
import { getProject, patchProject, uid } from "../../../lib/local";

export default function Desk() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [emotion, setEmotion] = useState("calm");
  const [busy, setBusy] = useState(false);

  function refresh() {
    const p = getProject(id);
    setProject(p);
    if (p && !selected && p.lines[0]) setSelected(p.lines[0].id);
    if (p && !characterId && p.characters[0]) setCharacterId(p.characters[0].id);
  }

  useEffect(() => {
    refresh();
  }, [id]);

  const line = useMemo(
    () => project?.lines.find((l) => l.id === selected) || project?.lines[0],
    [project, selected]
  );
  const character = project?.characters.find((c) => c.id === line?.characterId);
  const lineTakes = project?.takes.filter((t) => t.lineId === line?.id) || [];

  function addLine(e) {
    e.preventDefault();
    if (!text.trim() || !characterId) return;
    const newId = uid("l");
    patchProject(id, (p) => ({
      ...p,
      lines: [...p.lines, { id: newId, characterId, text: text.trim(), emotion }],
    }));
    setText("");
    setSelected(newId);
    refresh();
  }

  function generate() {
    if (!line) return;
    setBusy(true);
    window.setTimeout(() => {
      patchProject(id, (p) => ({
        ...p,
        takes: [
          {
            id: uid("t"),
            lineId: line.id,
            status: "stub",
            duration: "00:03.0",
            note: "No TTS — take recorded",
          },
          ...p.takes,
        ],
      }));
      setBusy(false);
      refresh();
    }, 400);
  }

  if (!project) {
    return (
      <main className="wrap">
        <p>No project. <Link href="/studio/new">Create one</Link></p>
      </main>
    );
  }

  const step = !project.characters.length
    ? "cast"
    : !project.lines.length
      ? "write"
      : project.takes.length
        ? "export"
        : "take";

  return (
    <div className="studio">
      <header className="bar">
        <Link href="/studio">{project.title}</Link>
        <nav className="nav">
          <Link href={`/studio/${id}/cast`}>Cast</Link>
          <Link href={`/studio/${id}/export`}>Export</Link>
        </nav>
      </header>
      <div className="rail">
        <span>Cast</span><span> → </span>
        <span>Write</span><span> → </span>
        <span>Take</span><span> → </span>
        <span>Export</span>
      </div>
      <aside className="side">
        <p className="label">1 · Characters</p>
        {!project.characters.length && (
          <p className="tiny">None yet. <Link href={`/studio/${id}/cast`}>Cast speakers</Link></p>
        )}
        {project.characters.map((item) => (
          <div className="char" key={item.id}>
            <b>{item.name}</b>
            <p className="tiny">{localeName(item.locale)} · {item.voice}</p>
            <p className="tiny">{item.locked ? "Locked" : "Unlocked"}</p>
          </div>
        ))}
      </aside>
      <section className="desk">
        <p className="hint">
          {step === "cast" && (<><b>Next:</b> cast at least one speaker.</>)}
          {step === "write" && (<><b>Next:</b> add a line below, then select it.</>)}
          {step === "take" && (<><b>Next:</b> Generate take on the right.</>)}
          {step === "export" && (<><b>Next:</b> open Export when you have heard enough takes.</>)}
        </p>
        <p className="label">2 · Scene</p>
        {!project.lines.length && <p className="tiny">Empty scene. Add the first line.</p>}
        {project.lines.map((item) => {
          const who = project.characters.find((c) => c.id === item.characterId);
          return (
            <article
              key={item.id}
              className={item.id === (line && line.id) ? "line on" : "line"}
              onClick={() => setSelected(item.id)}
            >
              <div className="who">{who?.name || "?"}<br />{emotionLabel(item.emotion)}</div>
              <p>{item.text}</p>
            </article>
          );
        })}
        {project.characters.length > 0 && (
          <form onSubmit={addLine} style={{ marginTop: 18 }}>
            <p className="label">Add line</p>
            <div className="field">
              <select value={characterId} onChange={(e) => setCharacterId(e.target.value)}>
                {project.characters.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} — {localeName(c.locale)}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
                {EMOTIONS.map((em) => (
                  <option key={em.id} value={em.id}>{em.label} — {em.hint}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="What they say" />
            </div>
            <button className="btn" type="submit">Add to scene</button>
          </form>
        )}
      </section>
      <aside className="inspector">
        <p className="label">3 · This line</p>
        {!line && <p className="tiny">Select or add a line.</p>}
        {line && (
          <>
            <p><b>{character?.name}</b></p>
            <p className="tiny">{character ? localeName(character.locale) : ""} · {emotionLabel(line.emotion)}</p>
            <button className="btn primary" style={{ margin: "14px 0" }} onClick={generate} disabled={busy}>
              {busy ? "Rendering…" : "Generate take"}
            </button>
            <p className="tiny">Records a take in this browser. No sound file yet.</p>
            <p className="label" style={{ marginTop: 18 }}>Takes</p>
            {!lineTakes.length && <p className="tiny">None yet.</p>}
            {lineTakes.map((t) => (
              <div className="take" key={t.id}>
                <span>{t.duration} · {t.note}</span>
                <span className={t.status === "drift" ? "bad" : "ok"}>{t.status}</span>
              </div>
            ))}
          </>
        )}
      </aside>
      <footer className="transport">
        <button className="btn" type="button" disabled>Play scene</button>
        <div className="wave" />
        <span className="tiny">No audio file</span>
      </footer>
    </div>
  );
}
