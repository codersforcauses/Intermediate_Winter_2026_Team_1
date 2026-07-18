from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Pet, PetCosmetic, StoreItem


User = get_user_model()


class GamificationSessionTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="siyu",
            email="siyu@example.com",
            password="test-password-123",
        )

        self.other_user = User.objects.create_user(
            username="other",
            email="other@example.com",
            password="test-password-456",
        )

        self.pet, _ = Pet.objects.get_or_create(
            owner=self.user,
        )

        self.other_pet, _ = Pet.objects.get_or_create(
            owner=self.other_user,
        )

        self.hat = StoreItem.objects.create(
            name="Blue Hat",
            description="A blue hat",
            coin_cost=30,
            category="hat",
            img_url="/images/blue-hat.png",
        )

        self.outfit = StoreItem.objects.create(
            name="Winter Outfit",
            description="A warm outfit",
            coin_cost=50,
            category="outfit",
            img_url="/images/winter-outfit.png",
        )

        self.accessory = StoreItem.objects.create(
            name="Sunglasses",
            description="Cool sunglasses",
            coin_cost=20,
            category="acc",
            img_url="/images/sunglasses.png",
        )

    def login(self):
        logged_in = self.client.login(
            username="siyu",
            password="test-password-123",
        )
        self.assertTrue(logged_in)

    def test_anonymous_user_cannot_view_pet(self):
        response = self.client.get(
            reverse("gamification:pet-detail")
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

    def test_logged_in_user_can_view_own_pet(self):
        self.login()

        response = self.client.get(
            reverse("gamification:pet-detail")
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )
        self.assertEqual(
            response.data["name"],
            self.pet.name,
        )

    def test_user_can_equip_owned_item(self):
        PetCosmetic.objects.create(
            pet=self.pet,
            item=self.hat,
        )

        self.login()

        response = self.client.post(
            reverse(
                "gamification:equip-item",
                kwargs={"item_id": self.hat.id},
            )
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.pet.refresh_from_db()

        self.assertEqual(
            self.pet.equipped_hat,
            self.hat,
        )

    def test_user_cannot_equip_unowned_item(self):
        self.login()

        response = self.client.post(
            reverse(
                "gamification:equip-item",
                kwargs={"item_id": self.outfit.id},
            )
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        self.pet.refresh_from_db()

        self.assertIsNone(
            self.pet.equipped_outfit,
        )

    def test_pet_can_equip_hat_outfit_and_accessory_together(self):
        PetCosmetic.objects.create(
            pet=self.pet,
            item=self.hat,
        )
        PetCosmetic.objects.create(
            pet=self.pet,
            item=self.outfit,
        )
        PetCosmetic.objects.create(
            pet=self.pet,
            item=self.accessory,
        )

        self.login()

        for item in (
            self.hat,
            self.outfit,
            self.accessory,
        ):
            response = self.client.post(
                reverse(
                    "gamification:equip-item",
                    kwargs={"item_id": item.id},
                )
            )

            self.assertEqual(
                response.status_code,
                status.HTTP_200_OK,
            )

        self.pet.refresh_from_db()

        self.assertEqual(
            self.pet.equipped_hat,
            self.hat,
        )
        self.assertEqual(
            self.pet.equipped_outfit,
            self.outfit,
        )
        self.assertEqual(
            self.pet.equipped_acc,
            self.accessory,
        )