from django.shortcuts import render
from .utils import generate_breadcrumbs


def some_view(request):
    breadcrumbs = generate_breadcrumbs(request)
    context = {
        "breadcrumbs": breadcrumbs,
        # Add other context data here
    }
    return render(request, "breadcrumb.html", context)
