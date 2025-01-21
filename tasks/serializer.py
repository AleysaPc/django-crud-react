from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    #fields = ('id','title','description','done')
    class Meta:
        model = Task
        fields = '__all__'
