from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .todo import tasks
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/todo',
        '/api/todo/edit_task/<id>'
    ]
    return Response(routes)

@api_view(['GET'])
def getTasks(request):
    return Response(tasks)