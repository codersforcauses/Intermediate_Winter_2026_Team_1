from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StoreItem, Pet, PetCosmetic
from .serializers import StoreItemSerializer, PetSerializer, PetCosmeticSerializer

# GET
# /api/gamification/store/ - returns all items in shop
@api_view(['GET'])
def store_items(request):
    items = StoreItem.objects.all()
    serializer = StoreItemSerializer(items, many=True)
    return Response(serializer.data)

# /api/gamification/store/<category>/ - returns filtered items by category
@api_view(['GET'])
def store_items_by_category(request, category):
    items = StoreItem.objects.filter(category=category)
    serializer = StoreItemSerializer(items, many=True)
    return Response(serializer.data)

# /api/gamification/pet/ - returns user's pet + wardrobe items (cosmetics)
@api_view(['GET'])
def my_pet(request):
    try:
        pet = Pet.objects.get(owner=request.user)
    except Pet.DoesNotExist:
        return Response({'error': 'No pet found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PetSerializer(pet)
    return Response(serializer.data)

# POST
# /api/gamification/store/<id>/buy/ - purchase item and add to pet cosmetic/wardrobe
@api_view(['POST'])
def buy_item(request, item_id):
    try:
        pet = Pet.objects.get(owner=request.user)
        item = StoreItem.objects.get(id=item_id)
    except (Pet.DoesNotExist, StoreItem.DoesNotExist):
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    # check already owned
    if PetCosmetic.objects.filter(pet=pet, item=item).exists():
        return Response({'error': 'Already owned'}, status=status.HTTP_400_BAD_REQUEST)

    PetCosmetic.objects.create(pet=pet, item=item)
    return Response({'message': f'{item.name} purchased!'}, status=status.HTTP_201_CREATED)

# /api/gamification/pet/equip/<id>/ - toggle equip/unequip for an owned item
@api_view(['POST'])
def equip_item(request, item_id):
    try:
        pet = Pet.objects.get(owner=request.user)
        cosmetic = PetCosmetic.objects.get(pet=pet, item_id=item_id)
    except (Pet.DoesNotExist, PetCosmetic.DoesNotExist):
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    # toggle is_equipped
    cosmetic.is_equipped = not cosmetic.is_equipped
    cosmetic.save()

    # update the slot on Pet model
    item = cosmetic.item
    if item.category == 'hat':
        pet.equipped_hat = cosmetic.item if cosmetic.is_equipped else None
    elif item.category == 'outfit':
        pet.equipped_outfit = cosmetic.item if cosmetic.is_equipped else None
    elif item.category == 'acc':
        pet.equipped_acc = cosmetic.item if cosmetic.is_equipped else None
    pet.save()

    return Response({'equipped': cosmetic.is_equipped})