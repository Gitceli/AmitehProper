from rest_framework import serializers
from .models import Category, Make, Area, Product, Review, Discount, StockStatus


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
        ]


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ["id", "name", "slug", "image", "description"]


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ["id", "discount"]


class StockStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockStatus
        fields = ["id", "in_stock"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # Nested serializer for category details
    parameter1_value = serializers.SerializerMethodField()
    parameter2_value = serializers.SerializerMethodField()
    parameter3_value = serializers.SerializerMethodField()
    parameter4_value = serializers.SerializerMethodField()
    parameter5_value = serializers.SerializerMethodField()
    parameter6_value = serializers.SerializerMethodField()
    parameter7_value = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "category",  # Includes all category data
            "make",
            "area",
            "name",
            "slug",
            "description",
            "price",
            "created_at",
            "image",
            "thumbnail",
            "posebnosti",
            "parameter1_value",
            "parameter2_value",
            "parameter3_value",
            "parameter4_value",
            "parameter5_value",
            "parameter6_value",
            "parameter7_value",
            "discount",
            "stock_status",
        ]

    def get_parameter1_value(self, obj):
        return obj.parameter1

    def get_parameter2_value(self, obj):
        return obj.parameter2

    def get_parameter3_value(self, obj):
        return obj.parameter3

    def get_parameter4_value(self, obj):
        return obj.parameter4

    def get_parameter5_value(self, obj):
        return obj.parameter5

    def get_parameter6_value(self, obj):
        return obj.parameter6

    def get_parameter7_value(self, obj):
        return obj.parameter7


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "product", "rating", "content", "created_by", "created_at"]
