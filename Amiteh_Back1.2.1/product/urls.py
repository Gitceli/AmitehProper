from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ReviewViewSet,
    DiscountViewSet,
    StockStatusViewSet,
    MakeViewSet,
    CategoryViewSet,
    AreaViewSet,
    ProductViewSet,
    product,
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"makes", MakeViewSet)
router.register(r"areas", AreaViewSet)
router.register(r"products", ProductViewSet)
router.register(r"reviews", ReviewViewSet)
router.register(r"discounts", DiscountViewSet)
router.register(r"stockstatuses", StockStatusViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("<slug:slug>/", product, name="product"),
]
