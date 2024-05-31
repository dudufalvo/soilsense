from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
  path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('register/', views.RegisterView.as_view(), name='auth_register'),

  path('profile/', views.get_profile, name='profile'),
  path('profile/update/', views.update_profile, name='update-profile'),

  path('users/', views.list_users, name='users'),
  path('users/<str:pk>/', views.delete_user, name='delete-user'),
  
  path('central/', views.central_list, name='central-list'),
  path('central/create/', views.create_central, name='central-create'),
  path('users/central/', views.users_central_list, name='users-central-list'),
  path('central/<str:pk>/', views.central_detail),

  path('node/', views.node_list, name='node-list'),
  path('node/create/', views.create_node, name='node-create'),
  path('node/central/<str:pk>/', views.central_node_list),
  path('node/<str:pk>/', views.node_detail),

  path('soil-data/', views.soil_data_list),
  path('soil-data/<str:pk>/', views.soil_data_detail),
]
