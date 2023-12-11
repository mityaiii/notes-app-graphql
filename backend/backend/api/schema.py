import graphene
from graphene import relay
from graphene_django.types import DjangoObjectType, ObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import Task

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        filter_fields = ['completed', 'title', 'id']
        interfaces = (relay.Node,)


class Query(ObjectType):
    tasks = DjangoFilterConnectionField(TaskType)
    task_by_id = graphene.Field(TaskType, id=graphene.Int(required=True))

    def resolve_task_by_id(self, info, id):
        return Task.objects.get(pk=id)


class CreateTask(graphene.Mutation):
    class Arguments:
        title = graphene.String()

    task = graphene.Field(TaskType)

    def mutate(self, info, title):
        task = Task(title=title)
        task.save()
        return CreateTask(task=task)


class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        completed = graphene.Boolean()

    task = graphene.Field(TaskType)

    def mutate(self, info, id, title=None, completed=None):
        task = Task.objects.get(pk=id)
        if title:
            task.title = title
        if completed:
            task.completed = completed
        task.save()
        return UpdateTask(task=task)


class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    task = graphene.Field(TaskType)

    def mutate(self, info, id):
        task = Task.objects.get(pk=id)
        task.delete()
        return DeleteTask(task=None)


class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
