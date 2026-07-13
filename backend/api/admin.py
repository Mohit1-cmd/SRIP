from django.contrib import admin
from .models import Position, Application

@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ['title', 'duration', 'is_active', 'deadline']
    list_editable = ['is_active']
    search_fields = ['title', 'eligibility']

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'institute', 'position', 'status', 'anumati_invited', 'created_at']
    list_filter = ['status', 'anumati_invited', 'programme']
    search_fields = ['full_name', 'email', 'institute']
    readonly_fields = ['created_at']

