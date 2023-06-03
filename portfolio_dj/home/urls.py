# urls for home
# Path: portfolio_dj/home/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
]