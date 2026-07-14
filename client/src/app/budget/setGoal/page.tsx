"use client";

import { useState } from "react";
import type {
  SavingFrequency,
  SavingGoal,
} from "../../../types/savingGoal";

type SavingGoalFormData = Omit<SavingGoal, "savedAmount">;

export default function SetGoalPage() {
  const [goal, setGoal] = useState<SavingGoalFormData>({
    purpose: "",
    targetAmount: 0,
    targetDate: "",
    savingFrequency: "weekly",
    savingAmount: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function updateField<K extends keyof SavingGoalFormData>(
    field: K,
    value: SavingGoalFormData[K]
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
          setErrorMessage("");
          setSuccessMessage("");

          if (!goal.purpose.trim()) {
            setErrorMessage("Please enter a purpose for your goal.");
            return;
          }

          if (goal.targetAmount <= 0) {
            setErrorMessage(
              "Target amount must be greater than zero."
            );
            return;
          }

          if (!goal.targetDate) {
            setErrorMessage("Please select a target date.");
            return;
          }

          if (goal.savingAmount <= 0) {
            setErrorMessage(
              "Saving amount must be greater than zero."
            );
            return;
          }

          console.log("Goal submitted:", goal);

          // TODO: Submit to Django after account authentication is integrated.
          setSuccessMessage(
            "Goal details validated. Backend saving will be enabled after account integration."
          );
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
            <option value="daily">Daily</option>
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

        {errorMessage && (
          <p role="alert">{errorMessage}</p>
        )}

        {successMessage && (
          <p role="status">{successMessage}</p>
        )}

        <button type="submit">Save goal</button>
      </form>
    </main>
  );
}