from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .serializers import RegisterSerializer, UserSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def csrf_view(request):
    """
    Create a CSRF cookie and return the matching token to the frontend.
    """
    return Response({"csrfToken": get_token(request)})


@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    # Automatically log in after successful registration.
    django_login(request, user)

    return Response(
        UserSerializer(user).data,
        status=status.HTTP_201_CREATED,
    )


@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = str(request.data.get("username", "")).strip()
    password = str(request.data.get("password", ""))

    if not username or not password:
        return Response(
            {"detail": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(
        request,
        username=username,
        password=password,
    )

    if user is None:
        return Response(
            {"detail": "Invalid username or password."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    django_login(request, user)

    return Response(UserSerializer(user).data)


@csrf_protect
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    django_logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    return Response(UserSerializer(request.user).data)