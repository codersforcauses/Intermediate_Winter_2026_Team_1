from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="saving_goals",
)

# Create your models here.
class SavingGoal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saving_goals')
    purpose = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    target_date = models.DateField()
    saving_frequency = models.CharField(max_length=20, choices=[('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')])
    created_at = models.DateTimeField(auto_now_add=True)
    saving_amount = models.DecimalField(max_digits=10,decimal_places=2,)
    #deposits_withdrawals = models.JSONField(default=list, blank=True)  # Store deposits and withdrawals as a list of dictionaries
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('completed', 'Completed'), ('paused', 'Paused')], default='active')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.purpose

class DepositWithdrawal(models.Model):
    saving_goal = models.ForeignKey(SavingGoal, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=[('deposit', 'Deposit'), ('withdrawal', 'Withdrawal')])
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type.capitalize()} of {self.amount} for {self.saving_goal.purpose}"
