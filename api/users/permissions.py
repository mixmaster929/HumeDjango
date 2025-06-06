from rest_framework.permissions import BasePermission


class UserPermission(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff or request.user.is_superuser:
            return True
        return request.user == obj
    