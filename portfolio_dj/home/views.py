from django.shortcuts import render, HttpResponse, redirect

# Create your views here.

def home(request):
    return render(request, 'home/index.html', {})


def portfolio_input(request):
    return render(request, 'home/inputpage.html', {})

def job_input(request):
    return render(request, 'home/jobinput.html', {})

def output(request):
    return render(request, 'home/output.html', {})