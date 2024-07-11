from django.db import models

# Create your models here.
class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200, blank=False, default="")
    body = models.TextField(blank=False, default="")
    owner = models.ForeignKey("auth.User", related_name="posts", on_delete=models.CASCADE)

    class Meta:
        ordering = ["created"]