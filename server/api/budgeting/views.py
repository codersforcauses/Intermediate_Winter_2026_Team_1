from decimal import Decimal

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import DepositWithdrawal, SavingGoal
from .serializers import (
    DepositWithdrawalSerializer,
    SavingGoalSerializer,
)


class SavingGoalListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = SavingGoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            SavingGoal.objects
            .filter(user=self.request.user)
            .prefetch_related("transactions")
            .order_by("-created_at")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SavingGoalDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = SavingGoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            SavingGoal.objects
            .filter(user=self.request.user)
            .prefetch_related("transactions")
        )


class SavingGoalTransactionListCreateView(
    generics.ListCreateAPIView
):
    serializer_class = DepositWithdrawalSerializer
    permission_classes = [IsAuthenticated]

    def get_goal(self):
        return get_object_or_404(
            SavingGoal,
            pk=self.kwargs["goal_id"],
            user=self.request.user,
        )

    def get_queryset(self):
        return (
            self.get_goal()
            .transactions
            .all()
            .order_by("-date")
        )

    def create(self, request, *args, **kwargs):
        goal = self.get_goal()

        serializer = self.get_serializer(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        amount = serializer.validated_data["amount"]
        transaction_type = serializer.validated_data[
            "transaction_type"
        ]

        current_saved_amount = Decimal(
            SavingGoalSerializer(goal).data[
                "saved_amount"
            ]
        )

        if (
            transaction_type
            == DepositWithdrawal.TransactionType.WITHDRAWAL
            and amount > current_saved_amount
        ):
            return Response(
                {
                    "detail": (
                        "Withdrawal cannot exceed the "
                        "current saved amount."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save(saving_goal=goal)

        updated_saved_amount = (
            SavingGoalSerializer(goal).data[
                "saved_amount"
            ]
        )

        return Response(
            {
                "transaction": serializer.data,
                "saved_amount": updated_saved_amount,
            },
            status=status.HTTP_201_CREATED,
        )