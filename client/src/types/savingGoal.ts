export type SavingFrequency = "weekly" | "monthly";

export type SavingGoal = {
  purpose: string;
  targetAmount: number;
  savedAmount: number;
  targetDate: string;
  savingFrequency: SavingFrequency;
  savingAmount: number;
};