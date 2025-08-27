from rest_framework import serializers
from .models import (
    Category,
    Make,
    Area,
    Product,
    Discount,
    StockStatus,
    SeoMeta,
    RobotsRule,
)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "image",
            "description",
            "parameter1",
            "parameter2",
            "parameter3",
            "parameter4",
            "parameter5",
            "parameter6",
            "parameter7",
            "meta_title",
            "meta_description",
            "og_image",
            "canonical_url",
            "noindex",
        ]


class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = [
            "id",
            "name",
            "slug",
            "image",
            "naslov",
            "description",
            "podnaslov",
            "description2",
            "meta_title",
            "meta_description",
            "og_image",
            "canonical_url",
            "noindex",
        ]


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ["id", "name", "slug", "image", "description", "meta_title", "meta_description"]


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ["id", "discount"]


class StockStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockStatus
        fields = ["id", "in_stock"]


class MakeLiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = ["id", "name", "slug"]


class CategoryLiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "parameter1",
            "parameter2",
            "parameter3",
            "parameter4",
            "parameter5",
            "parameter6",
            "parameter7",
        ]


class ProductSerializer(serializers.ModelSerializer):
    make = MakeLiteSerializer()
    category = CategoryLiteSerializer()
    in_stock = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_in_stock(self, obj):
        return obj.in_stock

    def get_discount_percent(self, obj):
        return float(obj.discount.discount) if obj.discount and obj.discount.discount is not None else None


# --- SEO serializers ---

class SeoMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeoMeta
        fields = [
            "id",
            "path",
            "meta_title",
            "meta_description",
            "og_image",
            "canonical_url",
            "noindex",
            "extra",
            "updated_at",
        ]


class RobotsRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RobotsRule
        fields = [
            "id",
            "user_agent",
            "disallow",
            "allow",
            "sitemap_url",
            "crawl_delay",
            "is_active",
            "order",
        ]
