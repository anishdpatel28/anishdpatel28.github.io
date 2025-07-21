from django.db import models
from django.utils import timezone


class PageAnalytics(models.Model):
    page_views: models.IntegerField = models.IntegerField(default=0)
    time_spent_home: models.IntegerField = models.IntegerField(default=0)  # seconds
    time_spent_about: models.IntegerField = models.IntegerField(default=0)
    time_spent_skills: models.IntegerField = models.IntegerField(default=0)
    time_spent_projects: models.IntegerField = models.IntegerField(default=0)
    time_spent_resume: models.IntegerField = models.IntegerField(default=0)
    time_spent_contact: models.IntegerField = models.IntegerField(default=0)
    most_viewed_section: models.CharField = models.CharField(
        max_length=20, default="home"
    )
    average_session_duration: models.IntegerField = models.IntegerField(
        default=0
    )  # seconds
    created_at: models.DateTimeField = models.DateTimeField(default=timezone.now)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Page Analytics: {self.page_views} views"

    @classmethod
    def get_analytics(cls) -> dict:
        obj, created = cls.objects.get_or_create(pk=1)
        return {
            "page_views": obj.page_views,
            "time_spent_home": obj.time_spent_home,
            "time_spent_about": obj.time_spent_about,
            "time_spent_skills": obj.time_spent_skills,
            "time_spent_projects": obj.time_spent_projects,
            "time_spent_resume": obj.time_spent_resume,
            "time_spent_contact": obj.time_spent_contact,
            "most_viewed_section": obj.most_viewed_section,
            "average_session_duration": obj.average_session_duration,
        }

    @classmethod
    def increment_page_views(cls) -> int:
        obj, created = cls.objects.get_or_create(pk=1)
        obj.page_views += 1
        obj.save()
        return obj.page_views

    @classmethod
    def update_section_time(cls, section: str, time_spent: int) -> None:
        obj, created = cls.objects.get_or_create(pk=1)
        if section == "home":
            obj.time_spent_home += time_spent
        elif section == "about":
            obj.time_spent_about += time_spent
        elif section == "skills":
            obj.time_spent_skills += time_spent
        elif section == "projects":
            obj.time_spent_projects += time_spent
        elif section == "resume":
            obj.time_spent_resume += time_spent
        elif section == "contact":
            obj.time_spent_contact += time_spent

        # update most viewed section
        times = {
            "home": obj.time_spent_home,
            "about": obj.time_spent_about,
            "skills": obj.time_spent_skills,
            "projects": obj.time_spent_projects,
            "resume": obj.time_spent_resume,
            "contact": obj.time_spent_contact,
        }
        obj.most_viewed_section = max(times.items(), key=lambda x: x[1])[0]

        # calculate average session duration
        total_time = sum(times.values())
        if obj.page_views > 0:
            obj.average_session_duration = total_time // obj.page_views
        else:
            obj.average_session_duration = 0

        obj.save()

    class Meta:
        verbose_name = "Page Analytics"
        verbose_name_plural = "Page Analytics"
        db_table = "page_analytics"
