export const LOCALES = [
  {
    code: "en-NG-LAG",
    name: "Lagos English",
    hint: "City English — “Abeg, I dey come.”",
  },
  {
    code: "en-NG-ABV",
    name: "Abuja English",
    hint: "Capital English — clearer, still Nigerian.",
  },
  {
    code: "en-NG-PHC",
    name: "Port Harcourt English",
    hint: "South-south English.",
  },
  {
    code: "pcm-NG",
    name: "Nigerian Pidgin",
    hint: "“How you dey?” not BBC English.",
  },
  {
    code: "yo-NG",
    name: "Yoruba",
    hint: "Spoken Yoruba, tones kept.",
  },
  {
    code: "ig-NG",
    name: "Igbo",
    hint: "Spoken Igbo.",
  },
  {
    code: "ha-NG",
    name: "Hausa",
    hint: "Spoken Hausa.",
  },
];

export const EMOTIONS = [
  { id: "calm", label: "Calm", hint: "Even, unhurried" },
  { id: "warm", label: "Warm", hint: "Friendly, open" },
  { id: "urgent", label: "Urgent", hint: "Needs a decision now" },
  { id: "dry", label: "Dry", hint: "Flat, little smile" },
];

export const STOCK = [
  { id: "lagos-f", label: "Ada — Lagos woman", locale: "en-NG-LAG" },
  { id: "lagos-m", label: "Emeka — Lagos man", locale: "en-NG-LAG" },
  { id: "pcm-f", label: "Chioma — Pidgin woman", locale: "pcm-NG" },
  { id: "pcm-m", label: "Tunde — Pidgin man", locale: "pcm-NG" },
  { id: "yo-f", label: "Funmi — Yoruba woman", locale: "yo-NG" },
  { id: "ig-m", label: "Chidi — Igbo man", locale: "ig-NG" },
  { id: "ha-f", label: "Aisha — Hausa woman", locale: "ha-NG" },
];

export function localeName(code) {
  return LOCALES.find((l) => l.code === code)?.name || code;
}

export function localeHint(code) {
  return LOCALES.find((l) => l.code === code)?.hint || "";
}

export function emotionLabel(id) {
  return EMOTIONS.find((e) => e.id === id)?.label || id;
}
