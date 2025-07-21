import logging
from typing import Any, Dict, Optional

from django.conf import settings

import posthog

logger = logging.getLogger(__name__)


class PostHogService:
    def __init__(self):
        self.api_key = settings.POSTHOG_API_KEY
        self.host = settings.POSTHOG_HOST

        if self.api_key:
            posthog.api_key = self.api_key
            posthog.host = self.host
        else:
            logger.warning(
                "PostHog API key not configured. Analytics will only be stored locally."
            )

    def capture_page_view(
        self, user_id: Optional[str] = None, properties: Optional[Dict[str, Any]] = None
    ):
        """Capture a page view event"""
        try:
            if self.api_key:
                posthog.capture(
                    distinct_id=user_id or "anonymous",
                    event="page_viewed",
                    properties=properties or {},
                )
        except Exception as e:
            logger.error(f"Failed to capture page view in PostHog: {e}")

    def capture_section_time(
        self, section: str, time_spent: int, user_id: Optional[str] = None
    ):
        """Capture time spent in a section"""
        try:
            if self.api_key:
                posthog.capture(
                    distinct_id=user_id or "anonymous",
                    event="section_time_spent",
                    properties={"section": section, "time_spent_seconds": time_spent},
                )
        except Exception as e:
            logger.error(f"Failed to capture section time in PostHog: {e}")

    def capture_analytics_viewed(self, user_id: Optional[str] = None):
        """Capture when analytics dialog is viewed"""
        try:
            if self.api_key:
                posthog.capture(
                    distinct_id=user_id or "anonymous",
                    event="analytics_viewed",
                    properties={},
                )
        except Exception as e:
            logger.error(f"Failed to capture analytics viewed in PostHog: {e}")

    def capture_egg_clicked(self, user_id: Optional[str] = None):
        """Capture when easter egg is clicked"""
        try:
            if self.api_key:
                posthog.capture(
                    distinct_id=user_id or "anonymous",
                    event="easter_egg_clicked",
                    properties={},
                )
        except Exception as e:
            logger.error(f"Failed to capture egg clicked in PostHog: {e}")


# Global instance
posthog_service = PostHogService()
