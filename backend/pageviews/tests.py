from django.test import TestCase
from rest_framework.test import APIClient
from .models import PageAnalytics
from unittest.mock import patch

class PageAnalyticsModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.patcher = patch('pageviews.posthog_service.posthog_service', autospec=True)
        cls.mock_posthog = cls.patcher.start()

    @classmethod
    def tearDownClass(cls):
        cls.patcher.stop()
        super().tearDownClass()

    def setUp(self):
        PageAnalytics.objects.create(pk=1)

    def test_get_analytics(self):
        analytics = PageAnalytics.get_analytics()
        self.assertIn('page_views', analytics)
        self.assertIn('most_viewed_section', analytics)

    def test_increment_page_views(self):
        initial = PageAnalytics.objects.get(pk=1).page_views
        PageAnalytics.increment_page_views()
        updated = PageAnalytics.objects.get(pk=1).page_views
        self.assertEqual(updated, initial + 1)

    def test_update_section_time(self):
        PageAnalytics.update_section_time('home', 10)
        obj = PageAnalytics.objects.get(pk=1)
        self.assertEqual(obj.time_spent_home, 10)
        self.assertEqual(obj.most_viewed_section, 'home')

class PageAnalyticsAPITest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.patcher = patch('pageviews.posthog_service.posthog_service', autospec=True)
        cls.mock_posthog = cls.patcher.start()

    @classmethod
    def tearDownClass(cls):
        cls.patcher.stop()
        super().tearDownClass()

    def setUp(self):
        self.client = APIClient()
        PageAnalytics.objects.create(pk=1)

    def test_get_page_analytics(self):
        response = self.client.get('/api/page-views/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('page_views', response.data)

    def test_increment_page_views(self):
        response = self.client.post('/api/page-views/increment/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('page_views', response.data)

    def test_update_section_time(self):
        response = self.client.post('/api/page-views/update-time/', {'section': 'about', 'time_spent': 5}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data.get('success'))

    def test_update_section_time_missing_section(self):
        response = self.client.post('/api/page-views/update-time/', {'time_spent': 5}, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)

    def test_capture_egg_click(self):
        response = self.client.post('/api/page-views/egg-click/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data.get('success'))
