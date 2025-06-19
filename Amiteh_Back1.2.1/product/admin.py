from django.contrib import admin
from .models import Category, Product, Make, Area, Discount, StockStatus


# Register models with basic admin configuration
admin.site.register(Make)
admin.site.register(Area)
admin.site.register(StockStatus)
admin.site.register(Discount)
admin.site.register(Product)
admin.site.register(Category)
