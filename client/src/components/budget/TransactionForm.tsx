"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  createGoalTransaction,
  getApiErrorMessage,
} from "../../lib/api";
import type {
  TransactionType,
} from "../../types/savingGoal";

type TransactionFormProps = {
  goalId: number;
  savedAmount: number;
  onBalanceChange: (amount: number) => void;
};

export default function TransactionForm({
  goalId,
  savedAmount,
  onBalanceChange,
}: TransactionFormProps) {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("deposit");

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const numericAmount = Number(amount);

    if (numericAmount <= 0) {
      setError(
        "Amount must be greater than zero.",
      );
      return;
    }

    if (
      transactionType === "withdrawal" &&
      numericAmount > savedAmount
    ) {
      setError(
        "Withdrawal cannot exceed your saved amount.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createGoalTransaction(
        goalId,
        {
          amount: numericAmount,
          transaction_type: transactionType,
        },
      );

      onBalanceChange(
        Number(result.saved_amount),
      );

      setAmount("");

      setSuccess(
        transactionType === "deposit"
          ? "Deposit added successfully."
          : "Withdrawal recorded successfully.",
      );
    } catch (caughtError) {
      setError(
        getApiErrorMessage(caughtError),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName =
    "mt-2 w-full rounded-xl border border-ink/20 " +
    "bg-transparent px-4 py-3 font-body text-ink " +
    "outline-none transition-colors focus:border-berry";

  return (
    <article className="rounded-3xl border border-ink/15 p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-berry">
        Update balance
      </p>

      <h2 className="mt-3 font-display text-3xl text-ink">
        Deposit or withdraw
      </h2>

      <p className="mt-3 font-body text-sm text-ink/65">
        Current saved amount: ${savedAmount.toFixed(2)}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-7"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="transactionType"
              className="font-body text-sm font-semibold text-ink"
            >
              Transaction type
            </label>

            <select
              id="transactionType"
              value={transactionType}
              onChange={(event) =>
                setTransactionType(
                  event.target.value as TransactionType,
                )
              }
              className={inputClassName}
            >
              <option value="deposit">
                Deposit
              </option>

              <option value="withdrawal">
                Withdraw
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="transactionAmount"
              className="font-body text-sm font-semibold text-ink"
            >
              Amount
            </label>

            <input
              id="transactionAmount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              className={inputClassName}
              placeholder="100.00"
              required
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-2xl border border-berry/30 bg-berry/10 p-4 font-body text-sm text-berry"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="mt-5 rounded-2xl border border-ink/15 bg-ink/5 p-4 font-body text-sm text-ink"
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 rounded-full border border-berry bg-berry px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-berry-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : transactionType === "deposit"
              ? "Add deposit"
              : "Record withdrawal"}
        </button>
      </form>
    </article>
  );
}