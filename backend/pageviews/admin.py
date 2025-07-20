from django.contrib import admin

from .models import PageAnalytics

@admin.register(PageAnalytics)
class PageAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('page_views', 'most_viewed_section', 'average_session_duration', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Info', {
            'fields': ('page_views', 'most_viewed_section', 'average_session_duration')
        }),
        ('Time Spent by Section (seconds)', {
            'fields': ('time_spent_home', 'time_spent_about', 'time_spent_skills', 
                      'time_spent_projects', 'time_spent_resume', 'time_spent_contact')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
