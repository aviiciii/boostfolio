from django.shortcuts import render, HttpResponse, redirect
from django.views.decorators.csrf import csrf_exempt



# Create your views here.

def home(request):
    return render(request, 'home/index.html', {})

@csrf_exempt
def portfolio_input(request):

    if request.method == 'POST':
        print(request.POST)
        return redirect('portfolio_input')


    return render(request, 'home/input_portfolio.html', {})

def job_input(request):
    return render(request, 'home/jobinput.html', {})

def output(request):
    return render(request, 'home/output.html', {})