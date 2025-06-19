from django.urls import reverse


def generate_breadcrumbs(view_name):
    breadcrumbs = [{"name": "Home", "url": "/frontpage"}]
    url = reverse(view_name)
    if url == "/":
        return breadcrumbs
    path_parts = url.strip("/").split("/")
    current_path = ""

    for part in path_parts:
        current_path += f"/{part}"
        breadcrumbs.append({"name": part.capitalize(), "url": current_path})

    return breadcrumbs
