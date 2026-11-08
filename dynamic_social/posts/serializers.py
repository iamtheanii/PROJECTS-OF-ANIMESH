from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from .models import Post, PostMedia, Comment, Story, Message, Notification

User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    author_profile_picture = serializers.ImageField(source='author.profile_picture', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author_username', 'author_profile_picture', 'text', 'created_at']

class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ['id', 'file']

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    author_name = serializers.ReadOnlyField(source='author.first_name')
    author_profile_picture = serializers.ImageField(source='author.profile_picture', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    media_files = PostMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'author_username', 'author_name', 'author_profile_picture', 'content', 'media_file', 
            'media_files', 'likes_count', 'is_liked', 'is_owner', 'comments', 'created_at'
        ]

    def get_is_liked(self, obj):
        request = self.context.get('request')
        return bool(request and request.user.is_authenticated and obj.likes.filter(id=request.user.id).exists())

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return bool(request and request.user.is_authenticated and obj.author == request.user)

class StorySerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    author_profile_picture = serializers.ImageField(source='author.profile_picture', read_only=True)
    is_owner = serializers.SerializerMethodField()
    expires_in_hours = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = ['id', 'author_username', 'author_profile_picture', 'media_file', 'created_at', 'is_owner', 'expires_in_hours']

    def get_is_owner(self, obj):
        request = self.context.get('request')
        return bool(request and request.user.is_authenticated and obj.author == request.user)

    def get_expires_in_hours(self, obj):
        hours = max(0, int((obj.created_at + timedelta(hours=24) - timezone.now()).total_seconds() // 3600))
        return hours

class UserSuggestionSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)
    name = serializers.CharField(source='first_name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'profile_picture', 'bio', 'is_following', 'followers_count']

    def get_is_following(self, obj):
        request = self.context.get('request')
        return bool(request and request.user.is_authenticated and request.user.following.filter(id=obj.id).exists())

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    receiver_username = serializers.ReadOnlyField(source='receiver.username')
    sender_profile_picture = serializers.ImageField(source='sender.profile_picture', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_username', 'sender_profile_picture', 'receiver', 'receiver_username', 'text', 'created_at']
        read_only_fields = ['sender', 'receiver']

class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name', read_only=True)
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)
    following_count = serializers.IntegerField(source='following.count', read_only=True)
    posts = PostSerializer(many=True, read_only=True)
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'bio', 'profile_picture', 'followers_count', 'following_count', 'posts', 'is_following']

    def get_is_following(self, obj):
        request = self.context.get('request')
        return bool(request and request.user.is_authenticated and request.user.following.filter(id=obj.id).exists())

class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    sender_profile_picture = serializers.ImageField(source='sender.profile_picture', read_only=True)
    is_following_back = serializers.SerializerMethodField()
    post_id = serializers.SerializerMethodField()
    post_media = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'sender', 'sender_username', 'sender_profile_picture', 'message', 'notification_type', 'is_read', 'created_at', 'is_following_back', 'post_id', 'post_media']

    def get_is_following_back(self, obj):
        request = self.context.get('request')
        return bool(request and request.user.is_authenticated and request.user.following.filter(id=obj.sender.id).exists())
        
    def get_post_id(self, obj):
        if hasattr(obj, 'post') and obj.post:
            return obj.post.id
        return None

    def get_post_media(self, obj):
        if hasattr(obj, 'post') and obj.post:
            if obj.post.media_file:
                return obj.post.media_file.url
            elif hasattr(obj.post, 'media_files') and obj.post.media_files.exists():
                return obj.post.media_files.first().file.url
        return None