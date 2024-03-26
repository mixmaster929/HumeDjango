from rest_framework import serializers, status

from .models import CustomUser as User


class AuthSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
        
    def validate_username(self, username: str):
        user = User.objects.filter(username=username).first()
        if not user:
            raise serializers.ValidationError(f"User with username {username} does not exist", code=status.HTTP_404_NOT_FOUND)
        return username
    
    def validate_password(self, password: str):
        user = User.objects.filter(username=self.initial_data.get("username")).first()
        if user and not user.check_password(password):
            raise serializers.ValidationError("Invalid Password", code=status.HTTP_400_BAD_REQUEST)
        return password
    

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150, required=True)
    first_name = serializers.CharField(max_length=150, allow_null=False, required=True)
    last_name = serializers.CharField(max_length=150, allow_null=False, required=True)
    email = serializers.EmailField(allow_null=False, required=True)
    avatar = serializers.ImageField()

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'avatar']


    
        