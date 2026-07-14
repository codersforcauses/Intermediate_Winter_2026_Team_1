from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import SavingGoal
from .serializers import SavingGoalSerializer


class SavingGoalListCreateView(generics.ListCreateAPIView):
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