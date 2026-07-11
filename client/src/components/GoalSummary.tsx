import type { SavingGoal } from "../types/savingGoal";

type GoalSummaryProps = {
  goal: SavingGoal;
};

export default function GoalSummary({
  goal,
}: GoalSummaryProps) {
  const progressPercentage =
    goal.targetAmount > 0
      ? Math.min(
          (goal.savedAmount / goal.targetAmount) * 100,
          100
        )
      : 0;

  const remainingAmount = Math.max(
    goal.targetAmount - goal.savedAmount,
    0
  );

  return (
    <section>
      <h2>{goal.purpose}</h2>

      <p>
        Saved ${goal.savedAmount.toFixed(2)} of $
        {goal.targetAmount.toFixed(2)}
      </p>

      <progress
        value={Math.min(goal.savedAmount, goal.targetAmount)}
        max={goal.targetAmount}
      >
        {progressPercentage.toFixed(0)}%
      </progress>

      <p>{progressPercentage.toFixed(0)}% completed</p>
      <p>${remainingAmount.toFixed(2)} remaining</p>

      <h3>Goal Details</h3>

      <p>
        <strong>Target date:</strong>{" "}
        {new Date(goal.targetDate).toLocaleDateString()}
      </p>

      <p>
        <strong>Saving plan:</strong> Save $
        {goal.savingAmount.toFixed(2)} {goal.savingFrequency}
      </p>
    </section>
  );
}