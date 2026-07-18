from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Pet, PetCosmetic, StoreItem
from .serializers import (
    PetCosmeticSerializer,
    PetSerializer,
    PetUpdateSerializer,
    StoreItemSerializer,
)


def get_user_pet(user):
    pet, _ = Pet.objects.get_or_create(owner=user)
    return pet


class PetDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        pet = get_user_pet(request.user)

        return Response(
            PetSerializer(pet).data,
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        pet = get_user_pet(request.user)

        serializer = PetUpdateSerializer(
            pet,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            PetSerializer(pet).data,
            status=status.HTTP_200_OK,
        )


class StoreItemListView(generics.ListAPIView):
    serializer_class = StoreItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StoreItem.objects.all().order_by(
            "category",
            "name",
        )


class OwnedItemListView(generics.ListAPIView):
    serializer_class = PetCosmeticSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pet = get_user_pet(self.request.user)

        return PetCosmetic.objects.filter(
            pet=pet,
        ).select_related("item")


class EquipItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, item_id):
        pet = get_user_pet(request.user)

        owned_item = get_object_or_404(
            PetCosmetic.objects.select_related("item"),
            pet=pet,
            item_id=item_id,
        )

        item = owned_item.item

        if item.category == "hat":
            pet.equipped_hat = item
            field_name = "equipped_hat"

        elif item.category == "outfit":
            pet.equipped_outfit = item
            field_name = "equipped_outfit"

        elif item.category == "acc":
            pet.equipped_acc = item
            field_name = "equipped_acc"

        else:
            return Response(
                {"detail": "Invalid item category."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        pet.save(update_fields=[field_name])

        return Response(
            {
                "detail": f"{item.name} equipped.",
                "pet": PetSerializer(pet).data,
            },
            status=status.HTTP_200_OK,
        )


class UnequipItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, category):
        pet = get_user_pet(request.user)

        if category == "hat":
            pet.equipped_hat = None
            field_name = "equipped_hat"

        elif category == "outfit":
            pet.equipped_outfit = None
            field_name = "equipped_outfit"

        elif category == "acc":
            pet.equipped_acc = None
            field_name = "equipped_acc"

        else:
            return Response(
                {
                    "detail": (
                        "Category must be hat, outfit, or acc."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        pet.save(update_fields=[field_name])

        return Response(
            {
                "detail": f"{category} unequipped.",
                "pet": PetSerializer(pet).data,
            },
            status=status.HTTP_200_OK,
        )