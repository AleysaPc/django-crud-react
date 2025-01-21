from rest_framework import viewsets
from tasks.serializer import TaskSerializer
from .models import Task


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

#Esta parte del codigo podria ser el crud