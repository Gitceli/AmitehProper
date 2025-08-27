# product/admin.py
from django.contrib import admin
from django import forms
from django.urls import path
from django.http import JsonResponse
from .models import Product, Category, Make, Area, Discount, StockStatus, SeoMeta, RobotsRule

PARAM_KEYS = [f"parameter{i}" for i in range(1, 8)]

def admin_category_labels(request, pk):
    """
    Return a labels map for the selected category.
    If you support inheritance, resolve parent → child here.
    Output: {"labels": {"1": "Bandwidth", "2": "Sample rate", ...}}
    """
    cat = Category.objects.filter(pk=pk).first()
    labels = {}
    if cat:
        # If your Category stores labels like cat.parameter1_label, etc.
        for i in range(1, 9):
            label = getattr(cat, f'parameter{i}_label', None) or ""
            # Inherit from parent if empty (optional)
            if not label and getattr(cat, 'parent', None):
                parent = cat.parent
                label = getattr(parent, f'parameter{i}_label', None) or ""
            if label:
                labels[str(i)] = label

    return JsonResponse({'labels': labels})

def category_labels(cat: Category):
    if not cat:
        return []
    return [
        cat.parameter1, cat.parameter2, cat.parameter3,
        cat.parameter4, cat.parameter5, cat.parameter6, cat.parameter7,
    ]

class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        cat = None
        # determine category from bound data or instance
        if self.data and self.data.get("category"):
            try:
                cat = Category.objects.get(pk=self.data.get("category"))
            except Category.DoesNotExist:
                cat = None
        elif self.instance and self.instance.pk:
            cat = self.instance.category

        labels = category_labels(cat) if cat else []

        # First hide all legacy parameter fields
        for key in PARAM_KEYS:
            if key in self.fields:
                self.fields[key].widget = forms.HiddenInput()

        # Then expose only slots that have labels, with those labels applied
        for idx, lbl in enumerate(labels, start=1):
            if not lbl:
                continue
            key = f"parameter{idx}"
            if key in self.fields:
                self.fields[key].widget = forms.NumberInput(attrs={"step": "any"})
                self.fields[key].required = False
                self.fields[key].label = lbl
                self.fields[key].widget.attrs.pop("hidden", None)  # ensure visible

        # Optional: surface a read-only preview of specs
        self.fields["specs"].widget = forms.Textarea(attrs={"rows": 4})
        self.fields["specs"].help_text = "Auto-filled from labeled parameters on save. You can leave this empty."

    def clean(self):
        cleaned = super().clean()
        # Build specs dict from visible parameter fields
        cat_id = cleaned.get("category").id if cleaned.get("category") else None
        if cat_id:
            try:
                cat = Category.objects.get(pk=cat_id)
            except Category.DoesNotExist:
                cat = None
        else:
            cat = None

        if cat:
            labels = category_labels(cat)
            combined = {}
            for idx, lbl in enumerate(labels, start=1):
                if not lbl:
                    continue
                key = f"parameter{idx}"
                val = cleaned.get(key)
                if val is not None and val != "":
                    combined[lbl] = str(val)
            # Put it into cleaned specs (will write in save_model)
            if combined:
                cleaned["specs"] = combined
        return cleaned

class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ("name", "category", "make", "price", "in_stock_flag")
    list_filter = ("category", "make", "stock_status")
    search_fields = ("name", "slug", "description")
    readonly_fields = ("created_at",)

    fieldsets = (
        (None, {
            "fields": ("name", "slug", "category", "make", "area", "image", "thumbnail", "description", "posebnosti")
        }),
        ("Pricing & Stock", {
            "fields": ("price", "discount", "stock_status")
        }),
        ("Parameters (auto-labeled by Category)", {
            "fields": tuple(PARAM_KEYS),
            "description": "Only labeled parameters are shown; unlabeled ones are hidden."
        }),
        ("Specs (auto-generated)", {
            "fields": ("specs",),
        }),
        ("Meta", {
            "fields": (),
            "description": "You can later add meta fields here if needed."
        }),
        ("Timestamps", {
            "fields": ("created_at",),
        }),
    )

    def in_stock_flag(self, obj):
        return obj.in_stock
    in_stock_flag.boolean = True
    in_stock_flag.short_description = "In Stock"

    # Add a small endpoint to fetch labels on-the-fly when Category changes
    def get_urls(self):
        urls = super().get_urls()
        custom = [
            path('category-labels/<int:pk>/', admin.site.admin_view(admin_category_labels),
                 name='product_category_labels'),
        ]
        return custom + urls

    def category_labels_view(self, request, pk: int):
        try:
            cat = Category.objects.get(pk=pk)
            labels = category_labels(cat)
            # Return {index: label} only for non-empty labels
            data = {i+1: lbl for i, lbl in enumerate(labels) if lbl}
            return JsonResponse({"labels": data})
        except Category.DoesNotExist:
            return JsonResponse({"labels": {}}, status=404)

    class Media:
        js = ("admin/product_dynamic_params.js",)  # Served from STATICFILES

admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(Make)
admin.site.register(Area)
admin.site.register(Discount)
admin.site.register(StockStatus)
admin.site.register(SeoMeta)
admin.site.register(RobotsRule)