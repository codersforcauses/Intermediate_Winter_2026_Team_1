from django.contrib import admin
from .models import SavingGoal, DepositWithdrawal

# Register your models here.
admin.site.register(SavingGoal)
admin.site.register(DepositWithdrawal)