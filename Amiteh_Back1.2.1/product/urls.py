# product/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    MakeViewSet,
    AreaViewSet,
    ProductViewSet,
    DiscountViewSet,
    StockStatusViewSet,
    similar_products_api,
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'makes', MakeViewSet, basename='make')
router.register(r'areas', AreaViewSet, basename='area')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'discounts', DiscountViewSet, basename='discount')
router.register(r'stockstatuses', StockStatusViewSet, basename='stockstatus')

urlpatterns = [
    path('', include(router.urls)),
    path('similar/<slug:slug>/', similar_products_api, name='similar-products'),
]
