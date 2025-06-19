from django.contrib import admin
from .models import CarouselCard, CarouselSlide, HeroSection

class CarouselSlideInline(admin.TabularInline):
    model = CarouselSlide
    extra = 1

@admin.register(CarouselCard)
class CarouselCardAdmin(admin.ModelAdmin):
    list_display = ('title', 'auto_rotate_delay', 'order', 'editor', 'created_at')
    search_fields = ('title',)
    list_filter = ('created_at',)
    inlines = [CarouselSlideInline]
    
    def save_model(self, request, obj, form, change):
        if not obj.editor:
            obj.editor = request.user
        super().save_model(request, obj, form, change)

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'editor', 'created_at')
    search_fields = ('title', 'subtitle', 'text')
    list_filter = ('is_active', 'created_at')
    
    def save_model(self, request, obj, form, change):
        if not obj.editor:
            obj.editor = request.user
        super().save_model(request, obj, form, change)