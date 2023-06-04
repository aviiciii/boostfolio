from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Projects(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField(blank=True)
    image = models.URLField(blank=True)
    date = models.DateField()
    
    

    def __str__(self):
        return self.name
    

class Jobs(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    company= models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.TextField()

    def __str__(self):
        return self.company
    

class Resume(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    summary = models.TextField()

    def __str__(self):
        return f'{self.id}'