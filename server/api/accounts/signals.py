from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from api.gamification.models import Pet

from .models import Profile


User = get_user_model()


@receiver(post_save, sender=User)
def create_user_related_models(
    sender,
    instance,
    created,
    **kwargs,
):
    if created:
        Profile.objects.get_or_create(user=instance)
        Pet.objects.get_or_create(owner=instance)