from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.db.models import Q
from datetime import timedelta, date, datetime
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ValidationError
import json, base64

from .models import Post, PostMedia, Comment, Story, Message, Notification
from .serializers import (
    PostSerializer, CommentSerializer, StorySerializer, 
    UserSuggestionSerializer, MessageSerializer, UserProfileSerializer,
    NotificationSerializer
)

User = get_user_model()

def feed_view(request):
    return render(request, 'posts/feed.html')

class SignupAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data
        username, email, dob_str, phone = data.get('username'), data.get('email'), data.get('dob'), data.get('phone')
        if not all([username, email, dob_str, data.get('password'), phone]): return Response({'error': 'All fields are required.'}, status=400)
        try:
            dob = datetime.strptime(dob_str, '%Y-%m-%d').date()
            if date.today().year - dob.year - ((date.today().month, date.today().day) < (dob.month, dob.day)) < 18:
                return Response({'error': 'You must be at least 18 years old.'}, status=400)
        except ValueError: return Response({'error': 'Invalid date format.'}, status=400)

        if User.objects.filter(username=username).exists(): return Response({'error': 'Username taken.'}, status=400)
        if User.objects.filter(email=email).exists(): return Response({'error': 'Email registered.'}, status=400)
        return Response({'message': 'OTP sent successfully!', 'temp_user_data': data})

class VerifyOTPAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        if request.data.get('otp') != '123456': return Response({'error': 'Invalid OTP.'}, status=400)
        data = request.data.get('user_data', {})
        user = User.objects.create_user(username=data.get('username'), email=data.get('email'), password=data.get('password'), first_name=data.get('name', ''))
        user.phone_number, user.date_of_birth = data.get('phone', ''), data.get('dob')
        user.save(); login(request, user)
        return Response({'message': 'Account created securely!'})

class GoogleAuthAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        token = request.data.get('credential')
        if not token: return Response({'error': 'No Google credential.'}, status=400)
        try:
            payload = token.split('.')[1]
            decoded = json.loads(base64.b64decode(payload + '=' * (4 - len(payload) % 4)))
            email, name = decoded.get('email'), decoded.get('name')
        except Exception: return Response({'error': 'Invalid Token.'}, status=400)
        user = User.objects.filter(email=email).first()
        if user:
            login(request, user); return Response({'message': 'Logged in!', 'action': 'login'})
        return Response({'action': 'signup', 'email': email, 'name': name})

class GoogleCompleteSignupAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email, name, username, password = request.data.get('email'), request.data.get('name'), request.data.get('username'), request.data.get('password')
        if not username or not password: return Response({'error': 'Username and Password required.'}, status=400)
        if User.objects.filter(username=username).exists(): return Response({'error': 'Username taken.'}, status=400)
        user = User.objects.create_user(username=username, email=email, password=password, first_name=name)
        user.is_google_auth = True; user.save(); login(request, user)
        return Response({'message': 'Google Account linked!'})

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        user = authenticate(request, username=request.data.get('username'), password=request.data.get('password'))
        if user: login(request, user); return Response({'message': 'Logged in!'})
        return Response({'error': 'Invalid credentials.'}, status=401)

class LogoutAPIView(APIView):
    def post(self, request):
        logout(request); return Response({'message': 'Logged out!'})

class FeedPagination(PageNumberPagination): page_size = 5

class PostListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    pagination_class = FeedPagination
    def get_queryset(self):
        following_users = self.request.user.following.all()
        qs = Post.objects.filter(Q(author=self.request.user) | Q(author__in=following_users)).order_by('-created_at')
        if self.request.query_params.get('type') == 'video': qs = qs.filter(Q(media_file__iendswith='.mp4') | Q(media_file__iendswith='.webm') | Q(media_file__iendswith='.mov'))
        return qs
    def perform_create(self, serializer):
        content = self.request.data.get('content', '').strip()
        media_files = self.request.FILES.getlist('media_files')
        legacy_single = self.request.FILES.get('media_file')
        
        if not content and not media_files and not legacy_single: 
            raise ValidationError({'error': 'Provide text or media.'})
            
        post = serializer.save(author=self.request.user)
        
        if legacy_single:
            post.media_file = legacy_single
            post.save()
            
        for file in media_files:
            PostMedia.objects.create(post=post, file=file)
            
        Notification.objects.bulk_create([Notification(recipient=f, sender=self.request.user, message="published a new post.", notification_type="post", post=post) for f in self.request.user.followers.all()])

class PostDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get(self, request, pk): return Response(PostSerializer(get_object_or_404(Post, pk=pk), context={'request': request}).data)
    def delete(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        if post.author != request.user: return Response(status=403)
        if post.media_file:
            try: post.media_file.delete(save=False)
            except OSError: pass
        post.delete(); return Response(status=204)

class StoryListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = StorySerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def get_queryset(self):
        cutoff = timezone.now() - timedelta(hours=24)
        expired = Story.objects.filter(created_at__lt=cutoff)
        for s in expired:
            if s.media_file:
                try: s.media_file.delete(save=False)
                except OSError: pass
        expired.delete()
        return Story.objects.filter(Q(author=self.request.user) | Q(author__in=self.request.user.following.all()), created_at__gte=cutoff).order_by('-created_at')
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        Notification.objects.bulk_create([Notification(recipient=f, sender=self.request.user, message="added a new story.", notification_type="story") for f in self.request.user.followers.all()])

class StoryDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def delete(self, request, pk):
        story = get_object_or_404(Story, pk=pk)
        if story.author != request.user: return Response(status=403)
        if story.media_file:
            try: story.media_file.delete(save=False)
            except OSError: pass
        story.delete(); return Response(status=204)

class ToggleLikeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        if post.likes.filter(id=request.user.id).exists():
            post.likes.remove(request.user)
            Notification.objects.filter(recipient=post.author, sender=request.user, notification_type='like', post=post).delete()
            return Response({'liked': False, 'likes_count': post.likes.count()})
        post.likes.add(request.user)
        if post.author != request.user:
            Notification.objects.create(recipient=post.author, sender=request.user, notification_type='like', message='liked your post.', post=post)
        return Response({'liked': True, 'likes_count': post.likes.count()})

class CommentCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user, post=post)
            if post.author != request.user:
                Notification.objects.create(recipient=post.author, sender=request.user, notification_type='comment', message='commented on your post.', post=post)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class SuggestedUsersAPIView(generics.ListAPIView):
    serializer_class = UserSuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return User.objects.exclude(id=self.request.user.id)[:15]

class UserSearchAPIView(generics.ListAPIView):
    serializer_class = UserSuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        query = self.request.query_params.get('q', '').strip()
        if query: return User.objects.filter(username__icontains=query).exclude(id=self.request.user.id)[:20]
        return User.objects.none()

class ChatContactsAPIView(generics.ListAPIView):
    serializer_class = UserSuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return User.objects.filter(Q(followers=self.request.user) | Q(following=self.request.user)).exclude(id=self.request.user.id).distinct()

class UserFollowersAPIView(generics.ListAPIView):
    serializer_class = UserSuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return get_object_or_404(User, username=self.kwargs['username']).followers.all()

class UserFollowingAPIView(generics.ListAPIView):
    serializer_class = UserSuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return get_object_or_404(User, username=self.kwargs['username']).following.all()

class ToggleFollowAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, user_id):
        target_user = get_object_or_404(User, id=user_id)
        if target_user == request.user: return Response({'error': 'Cannot follow yourself'}, status=400)
        if request.user.following.filter(id=target_user.id).exists():
            request.user.following.remove(target_user)
            following = False
            Notification.objects.filter(recipient=target_user, sender=request.user, notification_type='follow').delete()
        else:
            request.user.following.add(target_user)
            following = True
            notif, created = Notification.objects.get_or_create(recipient=target_user, sender=request.user, notification_type='follow', defaults={'message': 'started following you.', 'is_read': False})
            if not created: notif.created_at = timezone.now(); notif.is_read = False; notif.save()
        return Response({'following': following, 'followers_count': target_user.followers.count()})

class NotificationListAPIView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')

class UnreadNotificationCountAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request): return Response({'unread_count': Notification.objects.filter(recipient=request.user, is_read=False).count()})

class MarkNotificationsReadAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        Notification.objects.filter(recipient=request.user, is_read=False).update(is_read=True)
        return Response({'status': 'ok'})

class UnreadMessageCountAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request): return Response({'unread_count': Message.objects.filter(receiver=request.user, is_read=False).count()})

class MessageListCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, user_id):
        other_user = get_object_or_404(User, id=user_id)
        Message.objects.filter(sender=other_user, receiver=request.user, is_read=False).update(is_read=True)
        messages = Message.objects.filter((Q(sender=request.user) & Q(receiver=other_user)) | (Q(sender=other_user) & Q(receiver=request.user))).order_by('created_at')
        return Response(MessageSerializer(messages, many=True).data)

    def post(self, request, user_id):
        other_user = get_object_or_404(User, id=user_id)
        if not (request.user.following.filter(id=other_user.id).exists() or other_user.following.filter(id=request.user.id).exists()): return Response({'error': 'Must be connected.'}, status=403)
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=request.user, receiver=other_user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class MessageDeleteAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def delete(self, request, pk):
        msg = get_object_or_404(Message, pk=pk)
        if msg.sender != request.user: return Response(status=403)
        msg.delete()
        return Response(status=204)

class UserProfileAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def get(self, request, username=None):
        target_user = get_object_or_404(User, username=username) if username else request.user
        return Response(UserProfileSerializer(target_user, context={'request': request}).data)
    def patch(self, request):
        user = request.user
        if 'username' in request.data and request.data['username'] != user.username:
            if User.objects.filter(username=request.data['username']).exists(): return Response({'error': 'Username taken.'}, status=400)
            user.username = request.data['username']
        if 'name' in request.data: user.first_name = request.data['name']
        if 'bio' in request.data: user.bio = request.data['bio']
        if 'profile_picture' in request.FILES:
            if user.profile_picture:
                try: user.profile_picture.delete(save=False)
                except OSError: pass
            user.profile_picture = request.FILES['profile_picture']
        user.save()
        return Response(UserProfileSerializer(user, context={'request': request}).data)