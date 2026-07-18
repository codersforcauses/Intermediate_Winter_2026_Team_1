"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getApiErrorMessage,
  registerUser,
} from "../../lib/api";

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        username,
        email,
        password,
        password_confirm: passwordConfirm,
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
      className="w-full max-w-md rounded-3xl border border-ink/20 p-8"
    >
      <h1 className="font-display text-3xl text-ink">
        Create your Meow
      </h1>

      <p className="mt-2 font-body text-sm text-ink/65">
        Create an account and start working toward your saving goals.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-berry/30 bg-berry/10 p-3 text-sm text-berry"
        >
          {error}
        </p>
      )}

      <div className="mt-6">
        <label
          htmlFor="register-username"
          className="font-body text-sm font-semibold text-ink"
        >
          Username
        </label>

        <input
          id="register-username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-2 w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="register-email"
          className="font-body text-sm font-semibold text-ink"
        >
          Email
        </label>

        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="register-password"
          className="font-body text-sm font-semibold text-ink"
        >
          Password
        </label>

        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="register-password-confirm"
          className="font-body text-sm font-semibold text-ink"
        >
          Confirm password
        </label>

        <input
          id="register-password-confirm"
          type="password"
          autoComplete="new-password"
          required
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          className="mt-2 w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-full border border-berry bg-berry/10 px-6 py-3 font-semibold text-berry transition-colors hover:bg-berry hover:text-paper disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="mt-5 text-center text-sm text-ink/65">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-berry">
          Log in
        </Link>
      </p>
    </form>
  );
}