from django.db import models
from django.utils import timezone

class PageView(models.Model):
    count = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Page Views: {self.count}"

    @classmethod
    def get_count(cls) -> int:
        obj, created = cls.objects.get_or_create(pk=1)
        return obj.count

    @classmethod
    def increment_count(cls) -> int:
        obj, created = cls.objects.get_or_create(pk=1)
        obj.count += 1
        obj.save()
        return obj.count

    class Meta:
        verbose_name = "Page View"
        verbose_name_plural = "Page Views"
