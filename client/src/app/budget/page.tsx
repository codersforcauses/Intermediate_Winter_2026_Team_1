import Link from "next/link";
import GoalSummary from "../../components/GoalSummary";
import {
  mapApiSavingGoal,
  type ApiSavingGoal,
  type SavingGoal,
} from "../../types/savingGoal";

// Temporary data until account authentication and API integration are ready.
const placeholderGoal: SavingGoal = {
  purpose: "Buy a new laptop",
  targetAmount: 2000,
  savedAmount: 650,
  targetDate: "2026-12-01",
  savingFrequency: "monthly",
  savingAmount: 225,
};

export default async function BudgetPage() {
  // Will be uncommented when the API is ready to be integrated. For now, using placeholder data.
  // const apiBaseUrl = process.env.API_BASE_URL;

  // if (!apiBaseUrl) {
  //   return (
  //     <main>
  //       <h1>My Saving Goal</h1>
  //       <p>The backend URL has not been configured.</p>
  //     </main>
  //   );
  // }

  // let response: Response;

  // try {
  //   response = await fetch(
  //     `${apiBaseUrl}/api/budgeting/goals/`,
  //     {
  //       cache: "no-store",
  //     }
  //   );
  // } catch (error) {
  //   console.error("Unable to connect to Django:", error);

  //   return (
  //     <main>
  //       <h1>My Saving Goal</h1>
  //       <p>
  //         Unable to connect to the budgeting server. Make sure
  //         Django is running.
  //       </p>
  //     </main>
  //   );
  // }

  // if (!response.ok) {
  //   return (
  //     <main>
  //       <h1>My Saving Goal</h1>
  //       <p>Unable to load your saving goal.</p>
  //     </main>
  //   );
  // }

  // const apiGoals: ApiSavingGoal[] = await response.json();

  // if (apiGoals.length === 0) {
  //   return (
  //     <main>
  //       <h1>My Saving Goal</h1>
  //       <p>You have not created a saving goal yet.</p>

  //       <Link href="/budget/setGoal">
  //         Create a goal
  //       </Link>
  //     </main>
  //   );
  // }

  // const goal = mapApiSavingGoal(apiGoals[0]);

  return (
    <main>
      <header>
        <h1>My Saving Goal</h1>
        <p>Track your progress toward your goal.</p>
      </header>

      {/* <GoalSummary goal={goal} /> */}
      <GoalSummary goal={placeholderGoal} /> 
      {/* Using placeholder data until API integration is ready */}

      <Link href="/budget/setGoal">Edit goal</Link>
    </main>
  );
}