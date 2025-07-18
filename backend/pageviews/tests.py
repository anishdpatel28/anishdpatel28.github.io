from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from .models import PageView

class PageViewModelTest(TestCase):
    def test_get_count_creates_instance(self):
        count = PageView.get_count()
        self.assertEqual(count, 0)
        self.assertEqual(PageView.objects.count(), 1)

    def test_increment_count(self):
        initial_count = PageView.get_count()
        new_count = PageView.increment_count()
        self.assertEqual(new_count, initial_count + 1)

    def test_string_representation(self):
        pageview = PageView(count=42)
        self.assertEqual(str(pageview), "Page Views: 42")

class PageViewAPITest(APITestCase):
    def test_get_page_views(self):
        url = reverse("get_page_views")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("count", response.data)
        self.assertEqual(response.data["count"], 0)

    def test_increment_page_views(self):
        url = reverse("increment_page_views")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("count", response.data)
        self.assertEqual(response.data["count"], 1)

    def test_multiple_increments(self):
        increment_url = reverse("increment_page_views")
        get_url = reverse("get_page_views")
        self.client.post(increment_url)
        self.client.post(increment_url)
        response = self.client.get(get_url)
        self.assertEqual(response.data["count"], 2)
