from django.db import models


class Task(models.Model):
    max_length = 255
    title = models.CharField(max_length=max_length)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
