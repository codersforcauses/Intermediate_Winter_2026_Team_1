from rest_framework import serializers
from .models import StoreItem, Pet, PetCosmetic

class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = ['id', 'name', 'description', 'coin_cost', 'category', 'img_url']

class PetCosmeticSerializer(serializers.ModelSerializer):
    item = StoreItemSerializer()

    class Meta:
        model = PetCosmetic
        fields = ['id', 'item', 'is_equipped', 'purchased_at']

class PetSerializer(serializers.ModelSerializer):
    cosmetics = PetCosmeticSerializer(many=True, read_only=True)

    class Meta:
        model = Pet
        fields = ['id', 'name', 'equipped_hat', 'equipped_outfit', 'equipped_acc', 'cosmetics']