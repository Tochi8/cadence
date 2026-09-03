export const PROJECT = {
  id: "demo",
  title: "Market stall — 40s ad",
  minutesUsed: 2.4,
  minutesCap: 10,
};

export const CHARACTERS = [
  {
    id: "ada",
    name: "Ada",
    locale: "en-NG-LAG",
    locked: true,
    voice: "Stock · Lagos F",
  },
  {
    id: "tunde",
    name: "Tunde",
    locale: "pcm-NG",
    locked: true,
    voice: "Stock · Pidgin M",
  },
];

export const LINES = [
  {
    id: "l1",
    characterId: "ada",
    text: "Abeg, the tomatoes fresh. I just bring them from Mile 12.",
    emotion: "warm",
    pauseMsAfter: 320,
  },
  {
    id: "l2",
    characterId: "tunde",
    text: "How much for the basket? Make we no waste time.",
    emotion: "dry",
    pauseMsAfter: 240,
  },
  {
    id: "l3",
    characterId: "ada",
    text: "Four thousand. I fit do three-eight if you carry two.",
    emotion: "calm",
    pauseMsAfter: 0,
  },
];

export const TAKES = [
  { id: "t1", lineId: "l1", status: "kept", duration: "00:03.2", note: "lock hold" },
  { id: "t2", lineId: "l1", status: "drift", duration: "00:03.4", note: "US r on fresh" },
];
