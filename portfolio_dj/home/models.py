from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Projects(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField(blank=True)
    image = models.ImageField(upload_to='portfolio/images/')
    date = models.DateField()
    
    

    def __str__(self):
        return self.name