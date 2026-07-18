import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Set a goal",
    body: "Tell Meowny what you're saving for: rent, a trip, a new guitar. Track it in real numbers, not vibes.",
  },
  {
    title: "Log your progress",
    body: "Every deposit moves you closer to your target. Watch your saving progress grow over time.",
  },
  {
    title: "Dress up your cat",
    body: "Hit milestones and unlock accessories for your Meow. Discipline looks good on both of you.",
  },
];

export default function LandingPage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        {/* Hero text */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
            Gamified budgeting
          </p>

          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-ink md:text-6xl">
            Budgeting your cat will actually{" "}
            <em className="italic text-berry">
              be proud of.
            </em>
          </h1>

          <p className="mt-6 max-w-md font-body text-lg text-ink/70">
            Turn your saving goals into a game with Meowny.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-full border border-berry bg-berry/10 px-6 py-3 font-body text-sm font-semibold text-berry transition-colors hover:bg-berry hover:text-paper"
            >
              Create your Meow
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-ink/20 px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Cat group */}
        <div className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[480px] lg:h-[560px]">
          <Image
            src="/images/1.png"
            alt="Meowny cat one"
            width={500}
            height={500}
            priority
            className="absolute left-1/2 top-0 z-10 h-auto w-[46%] -translate-x-1/2 object-contain drop-shadow-xl"
          />

          <Image
            src="/images/2.png"
            alt="Meowny cat two"
            width={500}
            height={500}
            className="absolute left-[2%] top-[25%] z-20 h-auto w-[46%] -rotate-3 object-contain drop-shadow-xl"
          />

          <Image
            src="/images/3.png"
            alt="Meowny cat three"
            width={500}
            height={500}
            className="absolute right-[2%] top-[25%] z-30 h-auto w-[46%] rotate-3 object-contain drop-shadow-xl"
          />

          <Image
            src="/images/4.png"
            alt="Meowny cat four"
            width={500}
            height={500}
            className="absolute bottom-[2%] left-1/2 z-40 h-auto w-[46%] -translate-x-1/2 object-contain drop-shadow-xl"
          />
        </div>
      </section>

      <div className="perf-divider" />

      <section id="features" className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-ink">
            How it works
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="border-t border-ink/15 pt-6"
              >
                <h3 className="font-display text-xl text-ink">
                  {feature.title}
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="perf-divider" />
    </main>
  );
}