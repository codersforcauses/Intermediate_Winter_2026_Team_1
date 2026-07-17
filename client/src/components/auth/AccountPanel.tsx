"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  getApiErrorMessage,
  getCurrentUser,
  logoutUser,
} from "../../lib/api";
import type { User } from "../../types/user";
import Avatar from "../Avatar";

export default function AccountPanel() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch (caughtError) {
        if (
          caughtError instanceof ApiError &&
          (caughtError.status === 401 || caughtError.status === 403)
        ) {
          router.replace("/login");
          return;
        }

        if (!cancelled) {
          setError(getApiErrorMessage(caughtError));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleLogout() {
    setError("");
    setIsLoggingOut(true);

    try {
      await logoutUser();
      router.push("/");
      router.refresh();
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
      setIsLoggingOut(false);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-ink/65">
          Loading your account...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl">
        <p role="alert" className="font-body text-berry">
          {error || "Unable to load your account."}
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
            Your dashboard
          </p>

          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Welcome back, {user.username}
          </h1>

          <p className="mt-3 font-body text-ink/65">
            Manage your Meow and keep track of your saving goals.
          </p>
        </div>

        <button
          type="button"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="rounded-full border border-ink/20 px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </header>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-berry/30 bg-berry/10 p-4 font-body text-sm text-berry"
        >
          {error}
        </p>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-ink/15 p-8">
          <div className="grid gap-8 sm:grid-cols-[180px_1fr] sm:items-center">
            <div className="flex aspect-square items-center justify-center rounded-full border border-ink/15 bg-ink/5 text-7xl">
              <Avatar />
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
                Your Meow
              </p>

              <h2 className="mt-3 font-display text-3xl text-ink">
                Dress up your cat
              </h2>

              <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
                View your cat, equip owned accessories and unlock new
                items as you reach saving milestones.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/my-meow"
                  className="rounded-full border border-berry bg-berry/10 px-5 py-2.5 font-body text-sm font-semibold text-berry transition-colors hover:bg-berry hover:text-paper"
                >
                  View your Meow
                </Link>

                <Link
                  href="/shop"
                  className="rounded-full border border-ink/20 px-5 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
                >
                  Visit shop
                </Link>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-ink/15 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
            Saving goals
          </p>

          <h2 className="mt-3 font-display text-3xl text-ink">
            Keep your goal on track
          </h2>

          <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink/65">
            Review your current progress, update your saving plan or
            create a new goal.
          </p>

          <div className="mt-8 rounded-2xl border border-ink/10 bg-ink/5 p-5">
            <p className="font-body text-sm font-semibold text-ink">
              Your saving goal
            </p>

            <p className="mt-2 font-body text-sm text-ink/60">
              Goal information will appear here after the budgeting API
              is connected.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/budget"
              className="rounded-full border border-berry bg-berry/10 px-5 py-2.5 font-body text-sm font-semibold text-berry transition-colors hover:bg-berry hover:text-paper"
            >
              View goals
            </Link>

            <Link
              href="/budget/setGoal"
              className="rounded-full border border-ink/20 px-5 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
            >
              Create or edit goal
            </Link>
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-3xl border border-ink/15 p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
              Account
            </p>

            <h2 className="mt-3 font-display text-2xl text-ink">
              {user.username}
            </h2>

            <p className="mt-2 font-body text-sm text-ink/65">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            className="rounded-full border border-ink/20 px-5 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
          >
            Edit profile
          </Link>
        </div>
      </article>
    </section>
  );
}