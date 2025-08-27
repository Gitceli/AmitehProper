from decimal import Decimal
from io import BytesIO

from django.core.files import File
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import JSONField
from django.utils.text import slugify
from PIL import Image

class SeoHead(models.Model):
    meta_title = models.CharField(max_length=255, blank=True, default="")
    meta_description = models.CharField(max_length=320, blank=True, default="")
    og_image = models.ImageField(upload_to="uploads/og/", blank=True, null=True)
    canonical_url = models.URLField(blank=True, null=True)
    noindex = models.BooleanField(default=False)

    class Meta:
        abstract = True


class ImageAsset(models.Model):
    file = models.ImageField(upload_to="uploads/gallery/")
    alt = models.CharField(max_length=255, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name if self.file else "Unassigned image"


class Make(SeoHead, models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)

    # SEO SeoHead
    naslov = models.CharField(max_length=255, blank=True, default="")
    podnaslov = models.CharField(max_length=255, blank=True, default="")
    description = models.TextField(blank=True, default="")
    description2 = models.TextField(blank=True, default="")
    meta_title = models.CharField(max_length=255, blank=True, default="")
    meta_description = models.CharField(max_length=320, blank=True, default="")
    og_image = models.ImageField(upload_to="uploads/og/", blank=True, null=True)
    canonical_url = models.URLField(blank=True, null=True)
    noindex = models.BooleanField(default=False)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)[:50]
        super().save(*args, **kwargs)


class Area(SeoHead, models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    description = models.TextField(blank=True, default="")
    meta_title = models.CharField(max_length=255, blank=True, default="")
    meta_description = models.CharField(max_length=320, blank=True, default="")

    # SEO SeoHead
    class Meta:
        ordering = ("name",)
        verbose_name_plural = "Areas"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)[:50]
        super().save(*args, **kwargs)


class Discount(models.Model):
    Ime_akcije = models.CharField(max_length=255, blank=True, default="")
    velja_do = models.DateTimeField(blank=True, null=True)
    discount = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True,
        validators=[MinValueValidator(Decimal("0")), MaxValueValidator(Decimal("100"))],
        help_text="Percentage (0–100).",
    )

    class Meta:
        ordering = ["velja_do"]

    def __str__(self):
        return f"{self.discount or Decimal('0'):%}"


class StockStatus(models.Model):
    in_stock = models.BooleanField(default=False)  # no null booleans

    def __str__(self):
        return "Na zalogi" if self.in_stock else "Ni na zalogi"


class Category(SeoHead, models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    description = models.TextField(blank=True, default="")

    # Generic Parameter Labels
    parameter1 = models.CharField(max_length=255, blank=True, default="")
    parameter2 = models.CharField(max_length=255, blank=True, default="")
    parameter3 = models.CharField(max_length=255, blank=True, default="")
    parameter4 = models.CharField(max_length=255, blank=True, default="")
    parameter5 = models.CharField(max_length=255, blank=True, default="")
    parameter6 = models.CharField(max_length=255, blank=True, default="")
    parameter7 = models.CharField(max_length=255, blank=True, default="")

    # SEO SeoHead
   

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ("name",)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)[:50]
        super().save(*args, **kwargs)


class Product(SeoHead,  models.Model):
    name = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)

    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE
    )
    area = models.ForeignKey(
        Area, related_name="products", on_delete=models.SET_NULL, blank=True, null=True
    )
    make = models.ForeignKey(
        Make, related_name="products", on_delete=models.SET_NULL, blank=True, null=True
    )

    image = models.ImageField(upload_to="uploads/", blank=True, null=True)
    thumbnail = models.ImageField(upload_to="uploads/thumbs/", blank=True, null=True)

    description = models.TextField()  # HTML (SL)
    posebnosti = models.TextField(blank=True, default="")

    discount = models.ForeignKey(
        Discount, on_delete=models.SET_NULL, null=True, blank=True
    )
    stock_status = models.ForeignKey(
        StockStatus, on_delete=models.SET_NULL, null=True, blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # Prefer Decimal for price
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # Legacy numeric params
    parameter1 = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)
    parameter2 = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)
    parameter3 = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)
    parameter4 = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)
    parameter5 = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)
    parameter6 = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)
    parameter7 = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)

    # SSR-friendly structured specs (use empty dict not null)
    specs = JSONField(blank=True, null=True, default=dict)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name

    @property
    def in_stock(self) -> bool:
        return bool(self.stock_status and self.stock_status.in_stock)

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        if self.image:
            self.thumbnail = self.make_thumbnail(self.image)
            # Update only the thumbnail to avoid re-cleaning everything
            self.save(update_fields=["thumbnail"])
            return self.thumbnail.url
        return "https://via.placeholder.com/240x240.jpg"

    def make_thumbnail(self, image, size=(300, 300)):
        img = Image.open(image)
        img = img.convert("RGB")
        img.thumbnail(size)
        thumb_io = BytesIO()
        img.save(thumb_io, "JPEG", quality=85)

        base_name = image.name.rsplit("/", 1)[-1]
        thumb_name = f"thumb_{base_name}"
        return File(thumb_io, name=thumb_name)

    def save(self, *args, **kwargs):
        # Auto-slug if missing
        if not self.slug:
            self.slug = slugify(self.name)[:60]

        # Sync specs from legacy numeric params + category labels
        if self.category:
            labels = [
                self.category.parameter1, self.category.parameter2, self.category.parameter3,
                self.category.parameter4, self.category.parameter5, self.category.parameter6,
                self.category.parameter7,
            ]
            values = [
                self.parameter1, self.parameter2, self.parameter3,
                self.parameter4, self.parameter5, self.parameter6,
                self.parameter7,
            ]
            combined = {}
            for lbl, val in zip(labels, values):
                if lbl and val is not None:
                    combined[lbl] = str(val)  # format units upstream if needed
            if combined:
                self.specs = combined

        super().save(*args, **kwargs)


# --- SEO: two small models for SSR/lazy-load meta & robots ---

class SeoMeta(models.Model):
    """
    Per-path meta config to render in SSR or lazy-injected on the frontend.
    extra meta tags via JSON.
    """
    path = models.CharField(
        max_length=512,
        unique=True,
        help_text="URL path like '/', '/kategorije/osciloskopi/', '/proizvajalci/rigol/'.",
    )
    meta_title = models.CharField(max_length=255, blank=True, default="")
    meta_description = models.CharField(max_length=320, blank=True, default="")
    og_image = models.ImageField(upload_to="uploads/og/", blank=True, null=True)
    canonical_url = models.URLField(blank=True, null=True)
    noindex = models.BooleanField(default=False)
    extra = JSONField(blank=True, default=dict, help_text="Any extra meta tags, e.g. {'og:type':'website','twitter:card':'summary_large_image'}")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("path",)

    def __str__(self):
        return self.path


class RobotsRule(models.Model):
    """
    Represents a block in robots.txt (you can render robots.txt from these).
    Keep it simple: multiple active rules get concatenated by order.
    """
    user_agent = models.CharField(max_length=64, default="*")
    disallow = models.TextField(blank=True, default="", help_text="One path per line.")
    allow = models.TextField(blank=True, default="", help_text="One path per line.")
    sitemap_url = models.URLField(blank=True, null=True)
    crawl_delay = models.PositiveIntegerField(blank=True, null=True, help_text="Seconds.")
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("order", "user_agent")

    def __str__(self):
        return f"{self.user_agent} (order {self.order})"
