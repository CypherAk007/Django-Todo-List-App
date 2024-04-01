from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class TodoList(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    task = models.CharField(max_length=200,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    status = models.BooleanField(default=False)
    id =  models.AutoField(primary_key=True,editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.task
    