export async function playMockTake(onEnded) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") await ctx.resume();

  const duration = 3.1;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    let f0 = 175 + 35 * Math.sin(2 * Math.PI * 1.15 * t);
    if (t > 1.1 && t < 1.9) f0 += 28;
    let s = 0.32 * Math.sin(2 * Math.PI * f0 * t);
    s += 0.16 * Math.sin(2 * Math.PI * f0 * 2 * t);
    s += 0.07 * Math.sin(2 * Math.PI * (640 + 35 * Math.sin(t * 7)) * t);
    let g = 1;
    if ((t > 0.95 && t < 1.12) || (t > 2.05 && t < 2.18)) g = 0.12;
    const attack = Math.min(1, t / 0.04);
    const release = t > duration - 0.14 ? Math.max(0, (duration - t) / 0.14) : 1;
    data[i] = s * g * attack * release * 0.55;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2400;
  src.connect(filter);
  filter.connect(ctx.destination);
  src.onended = () => {
    ctx.close();
    onEnded?.();
  };
  src.start();

  return () => {
    try {
      src.stop();
    } catch {}
    ctx.close();
    onEnded?.();
  };
}
