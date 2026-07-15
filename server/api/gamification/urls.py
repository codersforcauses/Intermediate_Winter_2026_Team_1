from django.urls import path
from . import views

urlpatterns = [
    path('store/', views.store_items),
    path('store/<str:category>/', views.store_items_by_category),
    path('store/<int:item_id>/buy/', views.buy_item),
    path('pet/', views.my_pet),
    path('pet/equip/<int:item_id>/', views.equip_item),
]