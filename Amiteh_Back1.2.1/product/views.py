from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.pagination import PageNumberPagination

from rest_framework import viewsets

from .models import Category, Make, Area, Product, Review, Discount, StockStatus
from .serializers import (
    CategorySerializer,
    MakeSerializer,
    AreaSerializer,
    ProductSerializer,
    ReviewSerializer,
    DiscountSerializer,
    StockStatusSerializer,
)


from django.http import JsonResponse


def similar_products_api(request, slug):
    # Get the product based on the slug
    product = get_object_or_404(Product, slug=slug)

    # Filter similar products based on category, make, and area
    similar_by_category = Product.objects.filter(category=product.category).exclude(
        id=product.id
    )
    similar_by_make = (
        Product.objects.filter(make=product.make).exclude(id=product.id)
        if product.make
        else Product.objects.none()
    )
    similar_by_area = (
        Product.objects.filter(area=product.area).exclude(id=product.id)
        if product.area
        else Product.objects.none()
    )

    # Serialize the product data
    similar_data = {
        "category": list(
            similar_by_category.values("id", "name", "price", "image", "slug")
        ),
        "make": list(similar_by_make.values("id", "name", "price", "image", "slug")),
        "area": list(similar_by_area.values("id", "name", "price", "image", "slug")),
    }

    # Return as JSON
    return JsonResponse(similar_data)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class StockStatusViewSet(viewsets.ModelViewSet):
    queryset = StockStatus.objects.all()
    serializer_class = StockStatusSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class MakeViewSet(viewsets.ModelViewSet):
    queryset = Make.objects.all()
    serializer_class = MakeSerializer


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer


class ProductPagination(PageNumberPagination):
    page_size = 50  # Override default pagination, loading 50 products per page
    page_size_query_param = "page_size"
    max_page_size = 100


# ViewSets for different models
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


def product(request, slug):
    # Get the product based on the slug
    product = get_object_or_404(Product, slug=slug)

    # Handle POST request for reviews
    if request.method == "POST":
        rating = request.POST.get("rating", 3)
        content = request.POST.get("content", "")

        # Check if the user has already reviewed this product
        if content:
            reviews = Review.objects.filter(created_by=request.user, product=product)
            if reviews.exists():
                # Update the existing review
                review = reviews.first()
                review.rating = rating
                review.content = content
                review.save()
            else:
                # Create a new review
                Review.objects.create(
                    product=product,
                    rating=rating,
                    content=content,
                    created_by=request.user,
                )
            return redirect("product", slug=slug)

    # Similar products filtering based on category, make, and area
    similar_products = Product.objects.filter(category=product.category).exclude(
        id=product.id
    )

    # Handle additional filtering if filters are applied
    selected_category = request.GET.get("category")
    selected_make = request.GET.get("make")
    selected_area = request.GET.get("area")

    if selected_category:
        similar_products = similar_products.filter(category__id=selected_category)
    if selected_make:
        similar_products = similar_products.filter(make__id=selected_make)
    if selected_area:
        similar_products = similar_products.filter(area__id=selected_area)

    # Fetch all categories, makes, and areas to show in filters
    categories = Category.objects.all()
    makes = Make.objects.all()
    areas = Area.objects.all()

    # Prepare context for template
    context = {
        "product": product,
        "similar_products": similar_products[:6],  # Limit to 6 similar products
        "categories": categories,
        "makes": makes,
        "areas": areas,
        "selected_category": selected_category,
        "selected_make": selected_make,
        "selected_area": selected_area,
    }

    return render(request, "product/product.html", context)
