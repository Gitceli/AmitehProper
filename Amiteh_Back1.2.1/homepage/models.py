from django.db import models
from django.contrib.auth.models import User

class CarouselCard(models.Model):
    """Model for each card in the TripleCarousel."""
    title = models.CharField(max_length=100)
    auto_rotate_delay = models.IntegerField(default=5000, help_text="Auto rotate delay in milliseconds")
    order = models.IntegerField(default=0, help_text="Order of display")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    editor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order']

class CarouselSlide(models.Model):
    """Model for slides within each carousel card."""
    card = models.ForeignKey(CarouselCard, related_name='slides', on_delete=models.CASCADE)
    sub_title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='carousel_slides/', blank=True, null=True)
    order = models.IntegerField(default=0, help_text="Order of display within the card")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.card.title} - {self.sub_title}"
    
    class Meta:
        ordering = ['order']

class HeroSection(models.Model):
    """Model for the hero section of the homepage."""
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    text = models.TextField(blank=True)
    image = models.ImageField(upload_to='hero/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    editor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, 
                              help_text="Admin user who created/edited this section")
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Hero Sections"