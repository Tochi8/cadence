import Link from "next/link";

export default function Login() {
  return (
    <main className="wrap">
      <header className="top">
        <Link className="brand" href="/">Cadence<span>.</span></Link>
      </header>
      <h1 style={{ fontSize: 22, fontWeight: 560, marginBottom: 8 }}>Log in</h1>
      <p className="tiny" style={{ marginBottom: 20 }}>
        Auth is not wired. Continue as guest to use the desk.
      </p>
      <Link className="btn primary" href="/studio">Continue as guest</Link>
    </main>
  );
}
