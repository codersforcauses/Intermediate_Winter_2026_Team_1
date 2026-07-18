"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GoalSummary from "../../components/GoalSummary";
import {
  ApiError,
  getApiErrorMessage,
  getSavingGoals,
} from "../../lib/api";
import {
  mapApiSavingGoal,
  type ApiSavingGoal,
} from "../../types/savingGoal";

import TransactionForm from "../../components/budget/TransactionForm";

export default function BudgetPage() {
  const router = useRouter();

  const [apiGoal, setApiGoal] =
    useState<ApiSavingGoal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadGoal() {
      try {
        const goals = await getSavingGoals();

        if (!cancelled) {
          setApiGoal(goals[0] ?? null);
        }
      } catch (caughtError) {
        if (
          caughtError instanceof ApiError &&
          (caughtError.status === 401 ||
            caughtError.status === 403)
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

    loadGoal();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl">
        <p className="font-body text-ink/65">
          Loading your saving goal...
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
            Budgeting
          </p>

          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            My Saving Goal
          </h1>

          <p className="mt-3 font-body text-ink/65">
            Track your progress and keep your saving plan on target.
          </p>
        </div>

        {apiGoal && (
          <Link
            href="/budget/setGoal"
            className="rounded-full border border-berry bg-berry px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-berry-deep"
          >
            Edit goal
          </Link>
        )}
      </header>

      {error && (
        <p
          role="alert"
          className="mt-8 rounded-2xl border border-berry/30 bg-berry/10 p-4 font-body text-sm text-berry"
        >
          {error}
        </p>
      )}

      {!error && !apiGoal && (
        <article className="mt-10 rounded-3xl border border-ink/15 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
            Start saving
          </p>

          <h2 className="mt-3 font-display text-3xl text-ink">
            You do not have a saving goal yet
          </h2>

          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink/65">
            Create a goal, choose a target date and decide how
            much you would like to save each period.
          </p>

          <Link
            href="/budget/setGoal"
            className="mt-7 inline-flex rounded-full border border-berry bg-berry px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-berry-deep"
          >
            Create a goal
          </Link>
        </article>
      )}

      {apiGoal && (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-ink/15 p-8">
            <GoalSummary goal={mapApiSavingGoal(apiGoal)} />
          </article>

          <TransactionForm
            goalId={apiGoal.id}
            savedAmount={Number(apiGoal.saved_amount)}
            onBalanceChange={(newBalance) => {
              setApiGoal((currentGoal) => {
                if (!currentGoal) {
                  return null;
                }

                return {
                  ...currentGoal,
                  saved_amount: String(newBalance),
                };
              });
            }}
          />
        </div>
      )}
    </section>
  );
}