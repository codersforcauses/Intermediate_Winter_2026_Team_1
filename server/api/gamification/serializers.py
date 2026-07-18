from rest_framework import serializers

from .models import Pet, PetCosmetic, StoreItem


class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = (
            "id",
            "name",
            "description",
            "coin_cost",
            "category",
            "img_url",
        )


class PetSerializer(serializers.ModelSerializer):
    equipped_hat = StoreItemSerializer(read_only=True)
    equipped_outfit = StoreItemSerializer(read_only=True)
    equipped_acc = StoreItemSerializer(read_only=True)

    class Meta:
        model = Pet
        fields = (
            "id",
            "name",
            "equipped_hat",
            "equipped_outfit",
            "equipped_acc",
        )

class PetUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ("name",)


class PetCosmeticSerializer(serializers.ModelSerializer):
    item = StoreItemSerializer(read_only=True)

    class Meta:
        model = PetCosmetic
        fields = (
            "id",
            "item",
            "purchased_at",
        )
        read_only_fields = fields