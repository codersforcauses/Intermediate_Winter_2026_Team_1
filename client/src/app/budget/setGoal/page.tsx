"use client";

import { useState } from "react";
import type {
  SavingFrequency,
  SavingGoal,
} from "../../../types/savingGoal";

export default function SetGoalPage() {
  const [goal, setGoal] = useState<SavingGoal>({
    purpose: "",
    targetAmount: 0,
    savedAmount: 0,
    targetDate: "",
    savingFrequency: "weekly",
    savingAmount: 0,
  });

  function updateField<K extends keyof SavingGoal>(
    field: K,
    value: SavingGoal[K]
  ) {
    setGoal((currentGoal) => ({
      ...currentGoal,
      [field]: value,
    }));
  }

  return (
    <main>
      <h1>Set Your Saving Goal</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (!goal.purpose.trim()) {
            alert("Please enter a purpose for your goal.");
            return;
          }

          if (goal.targetAmount <= 0) {
            alert("Target amount must be greater than zero.");
            return;
          }

          if (goal.savingAmount <= 0) {
            alert("Saving amount must be greater than zero.");
            return;
          }

          console.log("Goal submitted:", goal);

          // Later, send this goal to the Django API.
        }}
      >
        <div>
          <label htmlFor="purpose">Purpose</label>
          <input
            id="purpose"
            type="text"
            value={goal.purpose}
            onChange={(event) =>
              updateField("purpose", event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="targetAmount">Target amount</label>
          <input
            id="targetAmount"
            type="number"
            min="0.01"
            step="0.01"
            value={goal.targetAmount}
            onChange={(event) =>
              updateField(
                "targetAmount",
                Number(event.target.value)
              )
            }
            required
          />
        </div>

        <div>
          <label htmlFor="savedAmount">Already saved</label>
          <input
            id="savedAmount"
            type="number"
            min="0"
            step="0.01"
            value={goal.savedAmount}
            onChange={(event) =>
              updateField(
                "savedAmount",
                Number(event.target.value)
              )
            }
          />
        </div>

        <div>
          <label htmlFor="targetDate">Target date</label>
          <input
            id="targetDate"
            type="date"
            value={goal.targetDate}
            onChange={(event) =>
              updateField("targetDate", event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="savingFrequency">
            Saving frequency
          </label>

          <select
            id="savingFrequency"
            value={goal.savingFrequency}
            onChange={(event) =>
              updateField(
                "savingFrequency",
                event.target.value as SavingFrequency
              )
            }
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label htmlFor="savingAmount">
            Amount to save each period
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
                Number(event.target.value)
              )
            }
            required
          />
        </div>

        <button type="submit">Save goal</button>
      </form>
    </main>
  );
}