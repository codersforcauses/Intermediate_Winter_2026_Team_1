from decimal import Decimal

from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db.models import Sum

class SavingGoal(models.Model):
    class SavingFrequency(models.TextChoices):
        DAILY = "daily", "Daily"
        WEEKLY = "weekly", "Weekly"
        MONTHLY = "monthly", "Monthly"

    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        COMPLETED = "completed", "Completed"
        PAUSED = "paused", "Paused"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saving_goals")
    purpose = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    target_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.01"))])
    target_date = models.DateField()
    
    saving_frequency = models.CharField(max_length=20, choices=SavingFrequency.choices, default=SavingFrequency.MONTHLY)
    saving_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.01"))])#Amount planned to save each period
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def saved_amount(self):
        deposits = (
            self.transactions.filter(
                transaction_type="deposit",
            ).aggregate(total=Sum("amount"))["total"]
            or Decimal("0.00")
        )

        withdrawals = (
            self.transactions.filter(
                transaction_type="withdrawal",
            ).aggregate(total=Sum("amount"))["total"]
            or Decimal("0.00")
        )

        return deposits - withdrawals

    def __str__(self):
        return self.purpose

class DepositWithdrawal(models.Model):
    class TransactionType(models.TextChoices):
        DEPOSIT = "deposit", "Deposit"
        WITHDRAWAL = "withdrawal", "Withdrawal"
    saving_goal = models.ForeignKey(SavingGoal, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.01"))],)
    transaction_type = models.CharField(max_length=10, choices=TransactionType.choices)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_transaction_type_display()} of {self.amount} for {self.saving_goal.purpose}"
