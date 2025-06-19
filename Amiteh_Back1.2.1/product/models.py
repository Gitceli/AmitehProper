from django.contrib.auth.models import User
from django.db import models
from django.core.files import File

from io import BytesIO
from PIL import Image


class Make(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    naslov = models.CharField(max_length=255, blank=True, null=True)
    podnaslov = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    description2 = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name


class Area(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ("name",)
        verbose_name_plural = "Areas"

    def __str__(self):
        return self.name


class Discount(models.Model):
    Ime_akcije = models.CharField(max_length=255, blank=True, null=True)
    velja_do = models.DateTimeField(blank=True, null=True)
    discount = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )

    class Meta:
        ordering = ["velja_do"]

    def __str__(self):
        return f"{self.discount}%"


class StockStatus(models.Model):
    in_stock = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return "Na zalogi" if self.in_stock else "Ni na zalogi"


# Updated Category model
class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    # Generic Parameters (Labels)
    parameter1 = models.CharField(max_length=255, blank=True, null=True)
    parameter2 = models.CharField(max_length=255, blank=True, null=True)
    parameter3 = models.CharField(max_length=255, blank=True, null=True)
    parameter4 = models.CharField(max_length=255, blank=True, null=True)
    parameter5 = models.CharField(max_length=255, blank=True, null=True)
    parameter6 = models.CharField(max_length=255, blank=True, null=True)
    parameter7 = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ("name",)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE
    )
    area = models.ForeignKey(
        Area, related_name="products", on_delete=models.CASCADE, blank=True, null=True
    )
    make = models.ForeignKey(
        Make, related_name="products", on_delete=models.CASCADE, blank=True, null=True
    )
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    thumbnail = models.ImageField(upload_to="uploads/thumb", blank=True, null=True)
    description = models.TextField()
    posebnosti = models.TextField(blank=True, null=True)
    discount = models.ForeignKey(
        Discount, on_delete=models.SET_NULL, null=True, blank=True
    )
    stock_status = models.ForeignKey(
        StockStatus, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField(blank=True, null=True)

    # Parameters that will use category labels dynamically
    parameter1 = models.DecimalField(
        max_digits=10, decimal_places=5, blank=True, null=True
    )
    parameter2 = models.DecimalField(
        max_digits=10, decimal_places=5, blank=True, null=True
    )
    parameter3 = models.DecimalField(
        max_digits=10, decimal_places=5, blank=True, null=True
    )
    parameter4 = models.DecimalField(
        max_digits=10, decimal_places=5, blank=True, null=True
    )
    parameter5 = models.DecimalField(
        max_digits=10, decimal_places=5, blank=True, null=True
    )
    parameter6 = models.DecimalField(
        max_digits=10, decimal_places=5, blank=True, null=True
    )
    parameter7 = models.DecimalField(
        max_digits=10, decimal_places=5, blank=True, null=True
    )

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        elif self.image:
            self.thumbnail = self.make_thumbnail(self.image)
            self.save()
            return self.thumbnail.url
        return "https://via.placeholder.com/240x240x.jpg"

    def make_thumbnail(self, image, size=(300, 300)):
        img = Image.open(image)
        img.convert("RGB")
        img.thumbnail(size)
        thumb_io = BytesIO()
        img.save(thumb_io, "JPEG", quality=85)
        return File(thumb_io, name=image.name)

    def get_rating(self):
        reviews_total = sum(review.rating for review in self.reviews.all())
        return reviews_total / self.reviews.count() if self.reviews.exists() else 0


class Review(models.Model):
    product = models.ForeignKey(
        Product, related_name="reviews", on_delete=models.CASCADE
    )
    rating = models.IntegerField(default=3)
    content = models.TextField()
    created_by = models.ForeignKey(
        User, related_name="reviews", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
