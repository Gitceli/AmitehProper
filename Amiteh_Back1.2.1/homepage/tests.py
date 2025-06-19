# homepage/tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
import json

class HomepageAPITestCase(APITestCase):
    def test_carousel_cards_endpoint(self):
        url = reverse('carouselcard-list')  # DRF automatically creates this name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        print(f"Carousel cards data: {data}")

    def test_hero_section_endpoint(self):
        url = reverse('herosection-list')  # DRF automatically creates this name
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        print(f"Hero section data: {data}")

    def test_homepage_data_endpoint(self):
        url = reverse('homepage-data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        print(f"Homepage data: {data}")