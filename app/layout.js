import "./globals.css";

export const metadata = {
  title: "Cadence",
  description: "Voice director for AI video. Place stays in place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
