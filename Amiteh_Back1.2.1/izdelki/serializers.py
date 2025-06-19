from rest_framework import serializers
from .models import Make, Category, Area


class MakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = "__all__"
