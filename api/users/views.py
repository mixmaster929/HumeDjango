from django.contrib.auth import (authenticate, login, logout,
                                 update_session_auth_hash)
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import CustomUser as User
from .permissions import UserPermission
from .serializers import AuthSerializer, UserSerializer


class AuthViewSet(viewsets.ViewSet):
    serializer_class = AuthSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        serializer = AuthSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.id}, status=status.HTTP_200_OK)
        return Response({"detail": "An unknown Error occured"}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        Token.objects.get(user=request.user.id).delete()
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def home(self, request):
        return Response(data={"user": request.user.username}, status=status.HTTP_200_OK)
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, UserPermission]
    
    def get_permissions(self):
        if self.action in ["list", "create"]:
            return [IsAdminUser(), IsAuthenticated()]
        return [permission() for permission in self.permission_classes]
        
    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")
        if password == confirm_password:
            user = request.user
            try:
                validate_password(password)
                user.set_password(password)
                user.save()
                update_session_auth_hash(request, user)  # To keep the user logged in
                return Response({"detail": "Password updated!"}, status=status.HTTP_200_OK)
            except ValidationError as error:
                return Response({"detail": error}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)
