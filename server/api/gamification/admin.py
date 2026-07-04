from django.contrib import admin
from .models import Pet, StoreItem, PetCosmetic

# Register your models here.
admin.site.register(Pet)
admin.site.register(StoreItem)
admin.site.register(PetCosmetic)