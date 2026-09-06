"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/studio", label: "Projects", icon: "home" },
  { href: "/billing", label: "Plan", icon: "how" },
  { href: "/studio/new", label: "Create", icon: "plus", primary: true },
  { href: "/settings", label: "Settings", icon: "voice" },
  { href: "/", label: "Account", icon: "user" },
];

function Icon({ name }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
      </svg>
    );
  }
  if (name === "how") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }
  if (name === "plus") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 6v12M6 12h12" />
      </svg>
    );
  }
  if (name === "voice") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M5 12h2M17 12h2M12 5v2M12 17v2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
  );
}

export default function MobileDock() {
  const pathname = usePathname();

  return (
    <nav className="dock" aria-label="App">
      {ITEMS.map((item) => {
        const active =
          item.href === "/studio"
            ? pathname === "/studio" || pathname.startsWith("/studio/")
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={item.primary ? "dock-item dock-plus" : active ? "dock-item on" : "dock-item"}
          >
            <span className={item.primary ? "dock-fab" : undefined}>
              <Icon name={item.icon} />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
