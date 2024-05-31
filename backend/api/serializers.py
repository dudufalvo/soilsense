#create user serializer
from rest_framework import serializers
from .models import CustomUser, Central, Node, SoilData
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)

    token['username'] = user.username
    token['email'] = user.email

    return token


class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=CustomUser.objects.all())]
  )

  class Meta:
    model = CustomUser
    fields = ('username', 'email', 'password', 'password2')

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({"password": "Password fields didn't match."})

    return attrs

  def create(self, validated_data):
    user = CustomUser.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
    )

    user.set_password(validated_data['password'])
    user.save()

    return user

class CentralSerializer(serializers.ModelSerializer):
  class Meta:
    model = Central
    fields = '__all__'

class NodeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Node
    fields = '__all__'

class SoilDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = SoilData
    fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
  #central = CentralSerializer(many=True, read_only=True)
  
  class Meta:
    model = CustomUser
    fields = '__all__ '

class ListUsersSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = '__all__'