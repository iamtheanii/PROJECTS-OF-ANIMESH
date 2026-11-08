from django.urls import path
from .views import (
    SignupAPIView, VerifyOTPAPIView, GoogleAuthAPIView, GoogleCompleteSignupAPIView, LoginAPIView, LogoutAPIView,
    PostListCreateAPIView, PostDetailAPIView, StoryListCreateAPIView, StoryDetailAPIView, ToggleLikeAPIView, CommentCreateAPIView, 
    SuggestedUsersAPIView, UserSearchAPIView, ChatContactsAPIView, UserFollowersAPIView, UserFollowingAPIView, ToggleFollowAPIView, 
    NotificationListAPIView, UnreadNotificationCountAPIView, MarkNotificationsReadAPIView,
    MessageListCreateAPIView, MessageDeleteAPIView, UnreadMessageCountAPIView, UserProfileAPIView, feed_view
)

urlpatterns = [
    path('', feed_view, name='feed-home'),
    path('api/auth/signup/', SignupAPIView.as_view(), name='auth-signup'),
    path('api/auth/verify-otp/', VerifyOTPAPIView.as_view(), name='auth-verify-otp'),
    path('api/auth/google/', GoogleAuthAPIView.as_view(), name='auth-google'),
    path('api/auth/google-complete/', GoogleCompleteSignupAPIView.as_view(), name='auth-google-complete'),
    path('api/auth/login/', LoginAPIView.as_view(), name='auth-login'),
    path('api/auth/logout/', LogoutAPIView.as_view(), name='auth-logout'),

    path('api/posts/', PostListCreateAPIView.as_view(), name='post-list-create'),
    path('api/posts/<int:pk>/', PostDetailAPIView.as_view(), name='post-detail'),
    path('api/stories/', StoryListCreateAPIView.as_view(), name='story-list-create'),
    path('api/stories/<int:pk>/', StoryDetailAPIView.as_view(), name='story-detail'),
    path('api/posts/<int:pk>/like/', ToggleLikeAPIView.as_view(), name='post-like'),
    path('api/posts/<int:pk>/comment/', CommentCreateAPIView.as_view(), name='post-comment'),
    
    path('api/users/suggestions/', SuggestedUsersAPIView.as_view(), name='user-suggestions'),
    path('api/users/search/', UserSearchAPIView.as_view(), name='user-search'),
    path('api/users/chat-contacts/', ChatContactsAPIView.as_view(), name='user-chat-contacts'),
    path('api/users/<str:username>/followers/', UserFollowersAPIView.as_view(), name='user-followers'),
    path('api/users/<str:username>/following/', UserFollowingAPIView.as_view(), name='user-following'),
    path('api/users/<int:user_id>/follow/', ToggleFollowAPIView.as_view(), name='user-follow'),
    
    path('api/notifications/', NotificationListAPIView.as_view(), name='notifications-list'),
    path('api/notifications/unread-count/', UnreadNotificationCountAPIView.as_view(), name='notifications-unread'),
    path('api/notifications/mark-read/', MarkNotificationsReadAPIView.as_view(), name='notifications-mark-read'),
    
    path('api/messages/unread-count/', UnreadMessageCountAPIView.as_view(), name='messages-unread'),
    path('api/messages/<int:user_id>/', MessageListCreateAPIView.as_view(), name='messages-chat'),
    path('api/messages/delete/<int:pk>/', MessageDeleteAPIView.as_view(), name='message-delete'),
    
    path('api/profile/', UserProfileAPIView.as_view(), name='my-profile'),
    path('api/profile/<str:username>/', UserProfileAPIView.as_view(), name='user-profile'),
]