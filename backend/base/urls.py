from django.urls import path
from . import views
urlpatterns = [
    path('',views.getRoutes,name='routes'),
    path('todo',views.getTasks,name='tasks'),
    path('todo/create',views.createTask,name='createTasks'),
]