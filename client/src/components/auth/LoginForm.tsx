"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getApiErrorMessage,
  loginUser,
} from "../../lib/api";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await loginUser({
        username,
        password,
      });

      router.push("/account");
      router.refresh();
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl border border-ink/15 p-8"
    >
      <h1 className="font-display text-3xl text-ink">
        Log in
      </h1>

      <p className="mt-2 font-body text-sm text-ink/65">
        Welcome back to Meowny.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-berry/30 bg-berry/10 p-3 font-body text-sm text-berry"
        >
          {error}
        </p>
      )}

      <div className="mt-6">
        <label
          htmlFor="username"
          className="font-body text-sm font-semibold text-ink"
        >
          Username
        </label>

        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-2 w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 font-body text-ink"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="password"
          className="font-body text-sm font-semibold text-ink"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 font-body text-ink"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-full border border-berry bg-berry px-6 py-3 font-body text-sm font-semibold text-paper transition-colors hover:bg-berry-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>

      <p className="mt-5 text-center font-body text-sm text-ink/65">
        New to Meowny?{" "}
        <Link
          href="/register"
          className="font-semibold text-berry"
        >
          Create your Meow
        </Link>
      </p>
    </form>
  );
}