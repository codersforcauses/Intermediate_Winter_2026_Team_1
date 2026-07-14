from django.urls import path

from .views import (
    SavingGoalDetailView,
    SavingGoalListCreateView,
)


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
]