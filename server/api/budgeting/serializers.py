from rest_framework import serializers
from .models import DepositWithdrawal, SavingGoal
from decimal import Decimal

class SavingGoalSerializer(serializers.ModelSerializer):
    saved_amount = serializers.SerializerMethodField()

    class Meta:
        model = SavingGoal

        fields = [
            "id",
            "user",
            "purpose",
            "description",
            "target_amount",
            "saved_amount",
            "target_date",
            "saving_frequency",
            "saving_amount",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "user",
            "saved_amount",
            "created_at",
            "updated_at",
        ]
    
    def get_saved_amount(self, obj):
        total = Decimal("0.00")

        for transaction in obj.transactions.all():
            if transaction.transaction_type == DepositWithdrawal.TransactionType.DEPOSIT:
                total += transaction.amount
            else:
                total -= transaction.amount

        return str(total)