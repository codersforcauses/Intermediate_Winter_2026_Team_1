"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  createSavingGoal,
  getApiErrorMessage,
  getSavingGoals,
  updateSavingGoal,
} from "../../../lib/api";
import {
  mapApiSavingGoal,
  type SavingFrequency,
} from "../../../types/savingGoal";

type GoalFormState = {
  purpose: string;
  targetAmount: string;
  targetDate: string;
  savingFrequency: SavingFrequency;
  savingAmount: string;
};

const emptyGoal: GoalFormState = {
  purpose: "",
  targetAmount: "",
  targetDate: "",
  savingFrequency: "weekly",
  savingAmount: "",
};

export default function SetGoalPage() {
  const router = useRouter();

  const [goalId, setGoalId] = useState<number | null>(null);
  const [goal, setGoal] =
    useState<GoalFormState>(emptyGoal);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadExistingGoal() {
      try {
        const goals = await getSavingGoals();
        const existingApiGoal = goals[0];

        if (!existingApiGoal || cancelled) {
          return;
        }

        const existingGoal =
          mapApiSavingGoal(existingApiGoal);

        setGoalId(existingApiGoal.id);
        setGoal({
          purpose: existingGoal.purpose,
          targetAmount: String(existingGoal.targetAmount),
          targetDate: existingGoal.targetDate,
          savingFrequency:
            existingGoal.savingFrequency,
          savingAmount: String(existingGoal.savingAmount),
        });
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

    loadExistingGoal();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateField<K extends keyof GoalFormState>(
    field: K,
    value: GoalFormState[K],
  ) {
    setGoal((currentGoal) => ({
      ...currentGoal,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const targetAmount = Number(goal.targetAmount);
    const savingAmount = Number(goal.savingAmount);

    if (!goal.purpose.trim()) {
      setError("Please enter a purpose for your goal.");
      return;
    }

    if (targetAmount <= 0) {
      setError(
        "Target amount must be greater than zero.",
      );
      return;
    }

    if (!goal.targetDate) {
      setError("Please select a target date.");
      return;
    }

    if (savingAmount <= 0) {
      setError(
        "Saving amount must be greater than zero.",
      );
      return;
    }

    setIsSubmitting(true);

    const payload = {
      purpose: goal.purpose.trim(),
      target_amount: targetAmount,
      target_date: goal.targetDate,
      saving_frequency: goal.savingFrequency,
      saving_amount: savingAmount,
    };

    try {
      if (goalId === null) {
        await createSavingGoal(payload);
      } else {
        await updateSavingGoal(goalId, payload);
      }

      router.push("/budget");
      router.refresh();
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl">
        <p className="font-body text-ink/65">
          Loading your saving goal...
        </p>
      </section>
    );
  }

  const inputClassName =
    "mt-2 w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 font-body text-ink outline-none transition-colors focus:border-berry";

  return (
    <section className="mx-auto max-w-3xl">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
          Budgeting
        </p>

        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          {goalId === null
            ? "Set Your Saving Goal"
            : "Edit Your Saving Goal"}
        </h1>

        <p className="mt-3 font-body text-ink/65">
          Choose your target and build a saving plan that
          works for you.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-3xl border border-ink/15 p-8"
      >
        <div>
          <label
            htmlFor="purpose"
            className="font-body text-sm font-semibold text-ink"
          >
            Purpose
          </label>

          <input
            id="purpose"
            type="text"
            value={goal.purpose}
            onChange={(event) =>
              updateField("purpose", event.target.value)
            }
            className={inputClassName}
            placeholder="For example, buy a new laptop"
            required
          />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="targetAmount"
              className="font-body text-sm font-semibold text-ink"
            >
              Target amount
            </label>

            <input
              id="targetAmount"
              type="number"
              min="0.01"
              step="0.01"
              value={goal.targetAmount}
              onChange={(event) =>
                updateField(
                  "targetAmount",
                  event.target.value,
                )
              }
              className={inputClassName}
              placeholder="2000"
              required
            />
          </div>

          <div>
            <label
              htmlFor="targetDate"
              className="font-body text-sm font-semibold text-ink"
            >
              Target date
            </label>

            <input
              id="targetDate"
              type="date"
              value={goal.targetDate}
              onChange={(event) =>
                updateField(
                  "targetDate",
                  event.target.value,
                )
              }
              className={inputClassName}
              required
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="savingFrequency"
              className="font-body text-sm font-semibold text-ink"
            >
              Saving frequency
            </label>

            <select
              id="savingFrequency"
              value={goal.savingFrequency}
              onChange={(event) =>
                updateField(
                  "savingFrequency",
                  event.target.value as SavingFrequency,
                )
              }
              className={inputClassName}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="savingAmount"
              className="font-body text-sm font-semibold text-ink"
            >
              Amount each period
            </label>

            <input
              id="savingAmount"
              type="number"
              min="0.01"
              step="0.01"
              value={goal.savingAmount}
              onChange={(event) =>
                updateField(
                  "savingAmount",
                  event.target.value,
                )
              }
              className={inputClassName}
              placeholder="100"
              required
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-2xl border border-berry/30 bg-berry/10 p-4 font-body text-sm text-berry"
          >
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full border border-berry bg-berry px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-berry-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving..."
              : goalId === null
                ? "Create goal"
                : "Save changes"}
          </button>

          <Link
            href="/budget"
            className="rounded-full border border-ink/20 px-6 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}