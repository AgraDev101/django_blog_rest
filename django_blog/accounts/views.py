from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user = user)
        return Response({ "token": token.key, "user": serializer.data })
    print(serializer.errors)
    return Response({"data": "error"})

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username = request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"error": "password not valid"})
    token, create = Token.objects.get_or_create(user = user)
    serializer = UserSerializer(user)
    return Response({"token": token.key, "user": serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
    except (AttributeError):
        pass
    return Response({"data": "logged out succesfully"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test(req):
    return Response({"data": "data"})

def home_page(request):
    return HttpResponse("<h1>Hello world</h1>")