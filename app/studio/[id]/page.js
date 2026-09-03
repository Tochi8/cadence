"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CHARACTERS, LINES, PROJECT, TAKES } from "../../../lib/store";

export default function Desk() {
  const [selected, setSelected] = useState(LINES[0].id);
  const [takes, setTakes] = useState(TAKES);
  const [busy, setBusy] = useState(false);
  const line = useMemo(
    () => LINES.find((item) => item.id === selected) || LINES[0],
    [selected]
  );
  const character = CHARACTERS.find((item) => item.id === line.characterId);

  async function generate() {
    setBusy(true);
    try {
      const res = await fetch("/api/takes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId: line.id }),
      });
      const data = await res.json();
      const take = data.take || {};
      setTakes((prev) => [
        {
          id: take.id || `t${Date.now()}`,
          lineId: take.line_id || take.lineId || line.id,
          status: take.status || "stub",
          duration: take.duration || "00:03.0",
          note: take.note || "stub",
        },
        ...prev,
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="studio">
      <header className="bar">
        <Link href="/studio">{PROJECT.title}</Link>
        <span className="tiny">{PROJECT.minutesUsed} / {PROJECT.minutesCap} min</span>
      </header>
      <aside className="side">
        <p className="label">Characters</p>
        {CHARACTERS.map((item) => (
          <div className="char" key={item.id}>
            <b>{item.name}</b>
            <p className="tiny">{item.locale} · {item.voice}</p>
            <p className="tiny">{item.locked ? "Locked" : "Unlocked"}</p>
          </div>
        ))}
      </aside>
      <section className="desk">
        <p className="label">Scene</p>
        {LINES.map((item) => {
          const who = CHARACTERS.find((c) => c.id === item.characterId);
          return (
            <article
              key={item.id}
              className={item.id === selected ? "line on" : "line"}
              onClick={() => setSelected(item.id)}
            >
              <div className="who">{who?.name}<br />{item.emotion}</div>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>
      <aside className="inspector">
        <p className="label">Line</p>
        <p><b>{character?.name}</b>
        </p>
        <p className="tiny">{character?.locale} · {line.emotion}</p>
        <button className="btn primary" style={{ margin: "14px 0" }} onClick={generate} disabled={busy}>
          {busy ? "Rendering…" : "Generate take"}
        </button>
        <p className="tiny">API take. Audio file waits on a TTS key.</p>
        <p className="label" style={{ marginTop: 18 }}>Takes</p>
        {takes.filter((t) => t.lineId === line.id || t.status === "stub").map((t) => (
          <div className="take" key={t.id}>
            <span>{t.duration} · {t.note}</span>
            <span className={t.status === "drift" ? "bad" : "ok"}>{t.status}</span>
          </div>
        ))}
      </aside>
      <footer className="transport">
        <button className="btn">Play scene</button>
        <div className="wave" />
        <span className="tiny">00:00.0</span>
      </footer>
    </div>
  );
}
