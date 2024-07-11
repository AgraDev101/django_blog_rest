from rest_framework import serializers

from blog.models import Post

class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source = 'owner.username')

    class Meta:
        model = Post
        fields = ['id', 'title', 'body', 'owner']
