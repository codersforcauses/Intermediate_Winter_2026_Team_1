import Link from "next/link";
import GoalSummary from "../../components/GoalSummary";
import {
  SavingGoal,
  mapApiSavingGoal,
  type ApiSavingGoal,
} from "../../types/savingGoal";

// Temporary placeholder data until the Django API is connected.
// const goal: SavingGoal = {
//   purpose: "Buy a new laptop",
//   targetAmount: 2000,
//   savedAmount: 650,
//   targetDate: "2026-12-01",
//   savingFrequency: "monthly",
//   savingAmount: 225,
// };

export default async function BudgetPage() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/budgeting/goals/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <main>
        <h1>My Saving Goal</h1>
        <p>Unable to load your saving goal.</p>
      </main>
    );
  }

  const apiGoals: ApiSavingGoal[] = await response.json();

  if (apiGoals.length === 0) {
    return (
      <main>
        <h1>My Saving Goal</h1>
        <p>You have not created a saving goal yet.</p>

        <Link href="/budget/setGoal">
          Create a goal
        </Link>
      </main>
    );
  }

  const goal = mapApiSavingGoal(apiGoals[0]);

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