const KEY = "cadence.guest.v1";

function blank() {
  return {
    user: null,
    minutesUsed: 0,
    minutesCap: 10,
    projects: [],
  };
}

export function loadState() {
  if (typeof window === "undefined") return blank();
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...blank(), ...JSON.parse(raw) } : blank();
  } catch {
    return blank();
  }
}

export function saveState(next) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function demoProject() {
  const ada = {
    id: "ada",
    name: "Ada",
    locale: "en-NG-LAG",
    voice: "Stock · Lagos F",
    locked: true,
  };
  const tunde = {
    id: "tunde",
    name: "Tunde",
    locale: "pcm-NG",
    voice: "Stock · Pidgin M",
    locked: true,
  };
  return {
    id: "demo",
    title: "Market stall — 40s ad",
    characters: [ada, tunde],
    lines: [
      {
        id: "l1",
        characterId: "ada",
        text: "Abeg, the tomatoes fresh. I just bring them from Mile 12.",
        emotion: "warm",
      },
      {
        id: "l2",
        characterId: "tunde",
        text: "How much for the basket? Make we no waste time.",
        emotion: "dry",
      },
      {
        id: "l3",
        characterId: "ada",
        text: "Four thousand. I fit do three-eight if you carry two.",
        emotion: "calm",
      },
    ],
    takes: [
      { id: "t1", lineId: "l1", status: "kept", duration: "00:03.2", note: "lock hold" },
    ],
  };
}

export function ensureDemo() {
  const state = loadState();
  if (!state.projects.some((p) => p.id === "demo")) {
    state.projects.unshift(demoProject());
    saveState(state);
  }
  return state;
}

export function getProject(id) {
  const state = id === "demo" ? ensureDemo() : loadState();
  return state.projects.find((p) => p.id === id) || null;
}

export function patchProject(id, fn) {
  const state = loadState();
  if (id === "demo" && !state.projects.some((p) => p.id === "demo")) {
    state.projects.unshift(demoProject());
  }
  state.projects = state.projects.map((p) => (p.id === id ? fn(p) : p));
  return saveState(state);
}
