from django.urls import path, include
from . import views

urlpatterns = [
    path("posts/", views.PostList.as_view()),
    path("posts/<int:pk>/", views.PostDetail.as_view()),
    path("test/", views.test, name="test"),
    # path("api-auth/", include("rest_framework.urls")),
]