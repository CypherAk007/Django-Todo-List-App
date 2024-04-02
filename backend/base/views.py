from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .todo import tasks

from .models import TodoList
from .serializers import ListSerializer,CreateTaskSerializer,UpdateTaskSerializer

from rest_framework import generics,status

import sys

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/todo',
        '/api/todo/edit_task/<id>',
        '/api/todo/create',
        '/api/todo/update/<int:pk>',

    ]
    print("Goodbye cruel world!", file=sys.stderr)
    return Response(routes)

@api_view(['GET'])
def getTasks(request):
    list = TodoList.objects.all()
    serializer = ListSerializer(list,many=True)
    return Response(serializer.data)

# @api_view(['POST'])
# def createTask(request):
#     data = request.data
#     print(f"data:{data}",file=sys.stderr)
    
    
#     try:
#         task = TodoList.objects.create(
#             task = data['task'],
#             description = data['description'],
#             status = data['status']
#         )
#         serializer = CreateTaskSerializer(task,many=False)
#         return Response(serializer.data)
#     except:
#         message = {'detail':'task not posted'}
#         return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def createTask(request):
    serializer =  CreateTaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        message = {'detail':'task not posted'}
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PATCH','PUT','DELETE'])
def todo_detail(request,pk):
    todo = get_object_or_404(TodoList,id=pk)

    # GET specific object 
    if request.method=='GET':
        serializer = UpdateTaskSerializer(todo)
        return Response(serializer.data)


    # PUT => replaces entire object, PATCH => updates specific field in object 
    elif request.method=='PUT':
        serializer = UpdateTaskSerializer(todo,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

    elif request.method=='DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)