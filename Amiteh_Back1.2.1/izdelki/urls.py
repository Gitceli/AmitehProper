from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MakeViewSet, CategoryViewSet, AreaViewSet

router = DefaultRouter()
router.register(r"makes", MakeViewSet)
router.register(r"categories", CategoryViewSet)
router.register(r"areas", AreaViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
