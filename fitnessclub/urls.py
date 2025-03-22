from django.urls import path
from gym import views


urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('', views.hero_view, name='hero'),
    path('header/', views.header_view, name='header'),
    path('footer/', views.footer_view, name='footer'),
    path('about/', views.about, name='about'),
    path('blog/', views.blog, name='blog'),
    path('contact/', views.contact, name='contact'),
    path('flexibility-core/', views.flexibility_core, name='flexibility_core'),
    path('hilt-revolution/', views.hilt_revolution, name='hilt_revolution'),
    path('membership/', views.membership, name='membership'),
    path('purchase-achiever/', views.purchase_achiever, name='purchase_achiever'),
    path('purchase-basic/', views.purchase_basic, name='purchase_basic'),
    path('purchase-elite/', views.purchase_elite, name='purchase_elite'),
    path('purchase-transformer/', views.purchase_transformer, name='purchase_transformer'),
    path('services/', views.services, name='services'),
    path('shop/', views.shop, name='shop'),
    path('90days/', views.ninety_days, name='ninety_days'),
    path('flexibility/', views.flexibility, name='flexibility'),
    path('hiit-revolution/', views.hiit_revolution, name='hiit_revolution'),
    path('trainer-booking/', views.trainer_booking, name='trainer_booking'),
    path('dashboard/', views.user_dashboard, name='user_dashboard'),
    path('update-profile/', views.update_profile, name='update_profile'),
    path('upload-profile-image/', views.upload_profile_image, name='upload_profile_image'),# Ensure the name matches
]