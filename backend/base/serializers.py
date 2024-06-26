from rest_framework import serializers
from .models import TodoList


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = '__all__'

class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ['id','task','description','status']
        # fields = '__all__'

class UpdateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ['id','task','description','status']
        # fields = '__all__'