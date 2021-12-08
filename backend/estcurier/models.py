from django.conf import settings
from django.db import models
from django.utils import timezone

class Article(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.TextField(default='')
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, null=True)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    draft = models.BooleanField(default=True)
    hideAuthor = models.BooleanField(default=True)
    disableComments = models.BooleanField(default=False)
    hideLikesCount = models.BooleanField(default=False)
    hideViewsCount = models.BooleanField(default=False)
    hideDate = models.BooleanField(default=False)
    moreArticles = models.TextField()
    tags = models.TextField()
    url = models.CharField(max_length=200, default=True)
    cover = models.TextField(default='')
    coverDescription = models.TextField(default='')
    views = models.PositiveIntegerField(default = 0)

    def __str__(self):
        return self.title + " #" + str(self.id)

class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.TextField()
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.user.username

class Survey(models.Model):
    article = models.TextField(default='')
    question = models.CharField(max_length=200)
    def __str__(self):
        return self.question

class Variant(models.Model):
    survey = models.TextField(default='')
    content = models.CharField(max_length=200)
    def __str__(self):
        return self.content

class Vote(models.Model):
    user = models.TextField(default='')
    variant = models.TextField(default='') 

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    date = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.file.name

class Comment(models.Model):
    author = models.TextField(null=True)
    text = models.TextField(null=True)
    photoURL = models.TextField(null=True)
    article = models.TextField(null=True)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text

class List(models.Model):
    name = models.CharField(max_length = 200, default = True)
    user = models.TextField(null = True)
    public = models.BooleanField(default = False)
    date = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.name

class ListItem(models.Model):
    List = models.TextField(null=True)
    article = models.TextField(null=True)
    date = models.DateTimeField(default=timezone.now)
    
class View(models.Model):
    article = models.TextField(null=True)
    user = models.TextField(null=True)
    date = models.DateTimeField(default=timezone.now)

class Like(models.Model):
    article = models.TextField(null=True)
    user = models.TextField(null=True)
    date = models.DateTimeField(default=timezone.now)

class Ad(models.Model):
    title = models.CharField(max_length=200)
    contacts = models.CharField(max_length=200)
    text = models.TextField()
    apparitions = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(blank=True, null=True, default=timezone.now)

class Widget(models.Model):
    text = models.CharField(max_length=200)
    link = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    activated = models.BooleanField(default = False)

class YoutubeVideo(models.Model):
    title = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    token = models.CharField(max_length=200)
    def __str__(self):
        return self.title