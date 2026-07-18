import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-vault text-paper/70">
      <div className="perf-divider text-paper/20" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl italic text-paper">Meowny</p>
          <p className="mt-1 max-w-sm font-body text-sm text-paper/60">
            Budgeting your cat will actually like.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <Link href="/budget" className="hover:text-gold">
            Budget
          </Link>
          <Link href="/shop" className="hover:text-gold">
            Shop
          </Link>
          <Link href="/my-meow" className="hover:text-gold">
            My Meow
          </Link>
          <Link href="/login" className="hover:text-gold">
            Log in
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-6 font-mono text-xs text-paper/40">
        © {new Date().getFullYear()} Meowny Dev Team 
      </div>
    </footer>
  );
}
