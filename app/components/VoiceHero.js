export default function VoiceHero() {
  return (
    <div className="voice-hero">
      <div className="voice-stage" aria-hidden="true">
        <span className="ring ring-a" />
        <span className="ring ring-b" />
        <span className="ring ring-c" />
        <span className="mic">
          <svg viewBox="0 0 48 48" width="56" height="56">
            <rect x="18" y="8" width="12" height="20" rx="6" fill="none" stroke="#fff" strokeWidth="2.2" />
            <path d="M14 24a10 10 0 0 0 20 0" fill="none" stroke="#fff" strokeWidth="2.2" />
            <path d="M24 34v6M18 40h12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
