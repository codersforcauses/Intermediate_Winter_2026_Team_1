"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/budget", label: "Budget" },
  { href: "/shop", label: "Shop" },
  { href: "/my-meow", label: "My Meow" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="z-50 bg-vault text-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <PawCoinMark />
          <span className="font-display text-2xl italic tracking-tight text-paper">
            Meowny
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-paper/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="font-body text-sm text-paper/80 transition-colors hover:text-gold"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-gold px-4 py-2 font-body text-sm font-semibold text-vault transition-colors hover:bg-gold-deep"
          >
            Get started
          </Link>
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-6 bg-paper transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-paper transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-paper/10 px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-paper/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3">
            <Link
              href="/login"
              className="font-body text-sm text-paper/80"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-gold px-4 py-2 text-center font-body text-sm font-semibold text-vault"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function PawCoinMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="13" stroke="#C9974B" strokeWidth="1.5" />
      <circle cx="14" cy="16.5" r="4.2" fill="#C9974B" />
      <circle cx="8.6" cy="11" r="2" fill="#C9974B" />
      <circle cx="12.2" cy="8.2" r="2" fill="#C9974B" />
      <circle cx="15.8" cy="8.2" r="2" fill="#C9974B" />
      <circle cx="19.4" cy="11" r="2" fill="#C9974B" />
    </svg>
  );
}