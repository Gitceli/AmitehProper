from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CarouselCard, HeroSection

from .serializers import (
    CarouselCardSerializer,
    HeroSectionSerializer,
)

class CarouselCardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CarouselCard.objects.all().order_by('order')
    serializer_class = CarouselCardSerializer
    pagination_class = None  # Disable pagination for this viewset

class HeroSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSection.objects.filter(is_active=True)
    serializer_class = HeroSectionSerializer
    pagination_class = None  # Disable pagination for this viewset

@api_view(['GET'])
def homepage_data(request):
    """
    Get all data needed for the homepage in a single request
    """
    carousel_cards = CarouselCard.objects.all().order_by('order')
    hero = HeroSection.objects.filter(is_active=True).first()
    
    data = {
        'triple_carousel': CarouselCardSerializer(carousel_cards, many=True, context={'request': request}).data,
        'hero': HeroSectionSerializer(hero, context={'request': request}).data if hero else None,
    }
    
    return Response(data)