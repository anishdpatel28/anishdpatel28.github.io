from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_page_analytics, name="get_page_analytics"),
    path("increment/", views.increment_page_views, name="increment_page_views"),
    path("update-time/", views.update_section_time, name="update_section_time"),
    path("egg-click/", views.capture_egg_click, name="capture_egg_click"),
]
