from rest_framework import serializers

from .models import PageView


class PageViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageView
        fields = ["count", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]
