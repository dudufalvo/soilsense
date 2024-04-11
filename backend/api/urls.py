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
  
  path('central/', views.central_list),
  path('central/<str:pk>/', views.central_detail),
  path('node/', views.node_list),
  path('node/<str:pk>/', views.node_detail),
  path('soil_data/', views.soil_data_list),
  path('soil_data/<str:pk>/', views.soil_data_detail),
]
