from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_page_views, name='get_page_views'),
    path('increment/', views.increment_page_views, name='increment_page_views'),
] 