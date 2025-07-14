from django.db import models
from django.utils import timezone


class PageView(models.Model):
    count = models.IntegerField(default=0)  # type: ignore
    created_at = models.DateTimeField(default=timezone.now)  # type: ignore
    updated_at = models.DateTimeField(auto_now=True)  # type: ignore

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
