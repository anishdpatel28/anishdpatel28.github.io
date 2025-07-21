import uuid

from django.http import HttpRequest

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import PageAnalytics
from .posthog_service import posthog_service


def get_user_id(request: HttpRequest) -> str:
    """Get or create a user ID for analytics"""
    if not request.session.get("analytics_user_id"):
        request.session["analytics_user_id"] = str(uuid.uuid4())
    return request.session["analytics_user_id"]


@api_view(["GET"])
def get_page_analytics(request):
    try:
        analytics = PageAnalytics.get_analytics()

        # Capture analytics viewed event
        user_id = get_user_id(request)
        posthog_service.capture_analytics_viewed(user_id)

        return Response(analytics, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def increment_page_views(request):
    try:
        page_views = PageAnalytics.increment_page_views()

        # Capture page view event in PostHog
        user_id = get_user_id(request)
        posthog_service.capture_page_view(
            user_id,
            {
                "total_page_views": page_views,
                "user_agent": request.META.get("HTTP_USER_AGENT", ""),
                "referrer": request.META.get("HTTP_REFERER", ""),
            },
        )

        return Response({"page_views": page_views}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def update_section_time(request):
    try:
        section = request.data.get("section")
        time_spent = request.data.get("time_spent", 0)

        if not section:
            return Response(
                {"error": "Section is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        PageAnalytics.update_section_time(section, time_spent)

        # Capture section time event in PostHog
        user_id = get_user_id(request)
        posthog_service.capture_section_time(section, time_spent, user_id)

        return Response({"success": True}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def capture_egg_click(request):
    """Capture easter egg click event"""
    try:
        user_id = get_user_id(request)
        posthog_service.capture_egg_clicked(user_id)

        return Response({"success": True}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
