from django.urls import path, include
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("test/", views.test, name="test"),
    path("", views.home_page, name="home_page"),
    # path('api-auth/', include('rest_framework.urls'))
]