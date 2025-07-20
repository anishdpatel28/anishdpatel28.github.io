from django.core.management.base import BaseCommand
from pageviews.models import PageAnalytics

class Command(BaseCommand):
    help = 'Reset all analytics data (page views, time spent, etc.) to zero.'

    def handle(self, *args, **options):
        obj, created = PageAnalytics.objects.get_or_create(pk=1)
        obj.page_views = 0
        obj.time_spent_home = 0
        obj.time_spent_about = 0
        obj.time_spent_skills = 0
        obj.time_spent_projects = 0
        obj.time_spent_resume = 0
        obj.time_spent_contact = 0
        obj.most_viewed_section = 'home'
        obj.average_session_duration = 0
        obj.save()
        self.stdout.write(self.style.SUCCESS('Analytics data has been reset.')) 