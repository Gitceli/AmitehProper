# homepage/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'carousel-cards', views.CarouselCardViewSet)
router.register(r'hero', views.HeroSectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('all/', views.homepage_data, name='homepage-data'),
]