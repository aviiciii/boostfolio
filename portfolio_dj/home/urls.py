# urls for home
# Path: portfolio_dj/home/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('input/portfolio', views.portfolio_input, name='portfolio_input'),
    path('input/job', views.job_input, name='job_input'),
    path('output', views.output, name='output'),
]