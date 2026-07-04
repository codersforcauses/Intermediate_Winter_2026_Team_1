from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Pet(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, default="Meowny")

    equipped_hat = models.ForeignKey(
        'StoreItem', null=True, blank=True,
        on_delete=models.SET_NULL, related_name='+'
    )
    equipped_outfit = models.ForeignKey(
        'StoreItem', null=True, blank=True,
        on_delete=models.SET_NULL, related_name='+'
    )
    equipped_acc = models.ForeignKey(
        'StoreItem', null=True, blank=True,
        on_delete=models.SET_NULL, related_name='+'
    )
    def __str__(self):
        return f"{self.owner.username}'s pet" 
    
class StoreItem(models.Model):
    CATEGORY_CHOICES = [
        ('hat', 'Hat'),
        ('outfit', 'Outfit'),
        ('acc','Accessory'),
    ]
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    coin_cost = models.IntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    img_url = models.URLField(blank=True)

    def __str__(self):
        return self.name
    
class PetCosmetic(models.Model):
    """track which items user has purchased"""
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='cosmetics')
    item = models.ForeignKey(StoreItem, on_delete=models.CASCADE)
    purchased_at = models.DateTimeField(auto_now_add=True)
    is_equipped = models.BooleanField(default=False)

    class Meta: # pet can own only one of item
        unique_together = ('pet', 'item')

    def __str__(self):
        return f"{self.pet} owns {self.item}"