from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_active', 'is_staff')

# Register the CustomUser model with the custom admin class
admin.site.register(CustomUser, CustomUserAdmin)
