from django.shortcuts import render, HttpResponse, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import Projects, Jobs

# Create your views here.

def home(request):

    return render(request, 'home/index.html', {})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        print(request.POST)

        username = request.POST['username']
        password = request.POST['password']

        # authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # login the user
            login(request, user)
            print('User logged in')

            return redirect('home')
        
        else:
            print('User not logged in')

        return redirect('home')

    return render(request, 'home/login.html', {})

def logout_view(request):
    # logout the user
    user = request.user

    if user.is_authenticated:
        logout(request)
        print('User logged out')
    else:
        print('User not logged in')

    return redirect('home')


@csrf_exempt
def portfolio_input(request):

    if request.method == 'POST':
        print(request.POST)
        user = request.user

        name = request.POST['project_name']
        description = request.POST['project_description']
        url = request.POST['project_link']
        image = request.POST['project_image']
        date = request.POST['project_date']

        new = Projects.objects.create(name=name, username=user, description=description, url=url, image=image, date=date)
        new.save()

        print('Portfolio item created')

        return redirect('portfolio_input')


    return render(request, 'home/input_portfolio.html', {})

@csrf_exempt
def job_input(request):
    if request.method == 'POST':
        print(request.POST)
        user = request.user

        name = request.POST['job_name']
        position = request.POST['job_position']
        description = request.POST['job_description']
        requirements = request.POST['job_requirements']

        new = Jobs.objects.create(name=name, position=position, username=user, description=description, requirements=requirements)
        new.save()

        print('Job item created')


        return redirect('job_input')


    return render(request, 'home/input_job.html', {})

def output(request):
    return render(request, 'home/output.html', {})