import Link from "next/link";
import Avatar from "../components/Avatar"

const features = [
  {
    title: "Set a goal",
    body: "Tell Meowny what you're saving for: rent, a trip, a new guitar. Track it in real numbers, not vibes.",
  },
  {
    title: "Log your spending",
    body: "Every deposit and dodged purchase adds coins to your stash. Budgeting becomes something you can watch happen.",
  },
  {
    title: "Dress up your cat",
    body: "Hit milestones and unlock accessories for your Meow. Discipline looks good on both of you.",
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
              Gamified budgeting
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-ink md:text-6xl">
              Budgeting your cat will actually{" "}
              <em className="italic text-berry">be proud of.</em>
            </h1>
            <p className="mt-6 max-w-md font-body text-lg text-ink/70">
              Turns your saving goals into a game with Meowny.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-full bg-berry px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-berry-deep"
              >
                Create your Meow
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-ink/20 px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
              >
                Log in
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* insert slideshow of cats with various accessories */}

      <div className="perf-divider" />

      <section id="features" className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-ink">How it works</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="border-t border-ink/15 pt-6">
                <h3 className="font-display text-xl text-ink">{feature.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="perf-divider" />

    </>
  );
}
