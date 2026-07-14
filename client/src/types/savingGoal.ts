export type SavingFrequency = "daily" | "weekly" | "monthly";

export type SavingGoal = {
  purpose: string;
  targetAmount: number;
  savedAmount: number;
  targetDate: string;
  savingFrequency: SavingFrequency;
  savingAmount: number;
};

export type ApiSavingGoal = {
  id: number;
  purpose: string;
  target_amount: string;
  saved_amount: string;
  target_date: string;
  saving_frequency: SavingFrequency;
  saving_amount: string;
  status: "active" | "completed" | "paused";
};

export function mapApiSavingGoal(
  apiGoal: ApiSavingGoal
): SavingGoal {
  return {
    purpose: apiGoal.purpose,
    targetAmount: Number(apiGoal.target_amount),
    savedAmount: Number(apiGoal.saved_amount),
    targetDate: apiGoal.target_date,
    savingFrequency: apiGoal.saving_frequency,
    savingAmount: Number(apiGoal.saving_amount),
  };
}