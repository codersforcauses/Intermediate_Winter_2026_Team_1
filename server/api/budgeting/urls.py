from django.urls import path

from .views import (
    SavingGoalDetailView,
    SavingGoalListCreateView,
    SavingGoalTransactionListCreateView,
)


app_name = "budgeting"

urlpatterns = [
    path(
        "goals/",
        SavingGoalListCreateView.as_view(),
        name="saving-goal-list-create",
    ),
    path(
        "goals/<int:pk>/",
        SavingGoalDetailView.as_view(),
        name="saving-goal-detail",
    ),
    path(
        "goals/<int:goal_id>/transactions/",
        SavingGoalTransactionListCreateView.as_view(),
        name="saving-goal-transactions",
    ),
]