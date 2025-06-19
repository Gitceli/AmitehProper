from django.shortcuts import render, get_object_or_404

from .models import Izdelki


def izdelki(request, slug):
    product = get_object_or_404(Izdelki, slug=slug)

    return render(request, "izdelki/izdelek.html", {"izdelek": product})
