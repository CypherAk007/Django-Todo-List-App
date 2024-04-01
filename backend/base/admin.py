from django.contrib import admin

# Register your models here.
from .models import *
class TodoListAdmin(admin.ModelAdmin):
    list_display = ('task','status','updated_at')
    search_fields = ('task',)

admin.site.register(TodoList,TodoListAdmin)
