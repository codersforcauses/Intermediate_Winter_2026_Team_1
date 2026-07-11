import Link from "next/link";
import GoalSummary from "../../components/GoalSummary";
import type { SavingGoal } from "../../types/savingGoal";

// Temporary placeholder data until the Django API is connected.
const goal: SavingGoal = {
  purpose: "Buy a new laptop",
  targetAmount: 2000,
  savedAmount: 650,
  targetDate: "2026-12-01",
  savingFrequency: "monthly",
  savingAmount: 225,
};

export default function BudgetPage() {
  return (
    <main>
      <header>
        <h1>My Saving Goal</h1>
        <p>Track your progress toward your goal.</p>
      </header>

      <GoalSummary goal={goal} />

      <Link href="/budget/setGoal">
        Edit goal
      </Link>
    </main>
  );
}