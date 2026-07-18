from django.conf import settings
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    display_name = models.CharField(max_length=50, blank=True)
    coins_balance = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.display_name or self.user.username