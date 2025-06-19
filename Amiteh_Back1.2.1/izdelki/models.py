from django.db import models

# Create your models here.
from django.core.files import File

from io import BytesIO
from PIL import Image


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ("name",)

    def __str__(self):
        return self.name


class Make(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name


class Area(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    class Meta:
        ordering = ("name",)
        verbose_name_plural = "Areas"

    def __str__(self):
        return self.name


class Izdelki(models.Model):
    category = models.ForeignKey(
        Category, related_name="izdelki", on_delete=models.CASCADE
    )
    make = models.ForeignKey(
        Make, related_name="Izdelki", on_delete=models.SET_NULL, null=True
    )
    area = models.ForeignKey(
        Area, related_name="Izdelki", on_delete=models.SET_NULL, null=True
    )

    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    thumbnail = models.ImageField(upload_to="uploads/", blank=True, null=True)

    # Additional fields for performance metrics
    v_max = models.FloatField(null=True, blank=True, verbose_name="V-Max")
    i_max = models.FloatField(null=True, blank=True, verbose_name="I-Max")
    f_max = models.FloatField(null=True, blank=True, verbose_name="F-Max")

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name

    def get_display_price(self):
        return f"${self.price / 100:.2f}"

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()

                return self.thumbnail.url
            else:
                return "https://via.placeholder.com/240x240x.jpg"

    def make_thumbnail(self, image, size=(300, 300)):
        img = Image.open(image)
        img.convert("RGB")
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, "JPEG", quality=85)

        thumbnail = File(thumb_io, name=image.name)

        return thumbnail


#   def get_rating(self):
#         reviews_total = 0

#         for review in self.reviews.all():
#             reviews_total += review.rating

#         if reviews_total > 0:
#             return reviews_total / self.reviews.count()

#         return 0
