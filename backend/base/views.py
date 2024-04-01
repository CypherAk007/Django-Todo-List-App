from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .todo import tasks

from .models import TodoList
from .serializers import ListSerializer,CreateTaskSerializer

from rest_framework import generics,status


# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/todo',
        '/api/todo/edit_task/<id>',
        '/api/todo/create',
    ]
    return Response(routes)

@api_view(['GET'])
def getTasks(request):
    list = TodoList.objects.all()
    serializer = ListSerializer(list,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createTask(request):
    data = request.data
    try:
        task = TodoList.objects.create(
            task = data['task'],
            description = data['description'],
            status = data['status']
        )
        serializer = CreateTaskSerializer(task,many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'task not posted'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

