from django.shortcuts import render, HttpResponse, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import Projects, Jobs

import openai
import os

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

        company = request.POST['job_company']
        position = request.POST['job_position']
        description = request.POST['job_description']
        requirements = request.POST['job_requirements']

        new = Jobs.objects.create(company=company, position=position, username=user, description=description, requirements=requirements)
        new.save()

        print('Job item created')


        return redirect('job_input')


    return render(request, 'home/input_job.html', {})

def output(request):
    
    # get api key from env
    
    # openai.api_key = os.environ['OPENAI_API_KEY']


    # get the user's projects and jobs
    user = request.user
    projects = Projects.objects.filter(username=user)
    jobs = Jobs.objects.filter(username=user)



    user_desc = f'My name is Givani Georgo. I am a front-end developer based on MERN Stack. \n'
    

    
    project_desc = 'My projects are: \n'
    for project in projects:
        this_project = f'{project.id}. {project.name} - {project.description} \n'
        project_desc += this_project


    # create the prompt
    
    for job in jobs:
        job_desc = f'I am applying for {job.position} . \n'
        job_desc += f'The description for this job are: {job.description} . \n'
        job_desc += f'The requirements for this job are: {job.requirements} . \n'

    question = 'Help me select the best projects to feature for this job.'

    prompt = user_desc + project_desc + job_desc + question

    print('\n\n')

    print(prompt)

    print('\n\n')

    # response = openai.Completion.create(
    #     engine='text-davinci-003',  # Specify the model you want to use
    #     prompt='What is god?',  # Input prompt or message
    #     max_tokens=10  # Maximum length of the response
    # )

    # output = response.choices[0].text.strip()

    print(output)


    return render(request, 'home/output.html', {})


@csrf_exempt
def resume_api(request):
    if request.method == "POST":
        print(request.POST)

        

        print("Resume received")
        return HttpResponse('Resume received')

    return HttpResponse('Use post to send resume')