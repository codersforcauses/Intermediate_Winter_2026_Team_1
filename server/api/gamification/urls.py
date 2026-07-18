from django.urls import path

from .views import (
    EquipItemView,
    OwnedItemListView,
    PetDetailView,
    StoreItemListView,
    UnequipItemView,
)


app_name = "gamification"

urlpatterns = [
    path(
        "pet/",
        PetDetailView.as_view(),
        name="pet-detail",
    ),
    path(
        "shop/",
        StoreItemListView.as_view(),
        name="shop-list",
    ),
    path(
        "owned/",
        OwnedItemListView.as_view(),
        name="owned-items",
    ),
    path(
        "owned/<int:item_id>/equip/",
        EquipItemView.as_view(),
        name="equip-item",
    ),
    path(
        "pet/unequip/<str:category>/",
        UnequipItemView.as_view(),
        name="unequip-item",
    ),
]