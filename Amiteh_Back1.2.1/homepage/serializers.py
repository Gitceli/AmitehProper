from rest_framework import serializers
from .models import CarouselCard, CarouselSlide, HeroSection

class CarouselSlideSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = CarouselSlide
        fields = ['id', 'sub_title', 'description', 'image_url', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class CarouselCardSerializer(serializers.ModelSerializer):
    slides = CarouselSlideSerializer(many=True, read_only=True)
    editor_name = serializers.SerializerMethodField()
    
    class Meta:
        model = CarouselCard
        fields = ['id', 'title', 'auto_rotate_delay', 'slides', 'editor_name', 'created_at', 'updated_at']
    
    def get_editor_name(self, obj):
        if obj.editor:
            return obj.editor.username
        return None

class HeroSectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    editor_name = serializers.SerializerMethodField()
    
    class Meta:
        model = HeroSection
        fields = ['id', 'title', 'subtitle', 'text', 'image_url', 'is_active', 
                  'created_at', 'updated_at', 'editor_name']
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
    
    def get_editor_name(self, obj):
        if obj.editor:
            return obj.editor.username
        return None