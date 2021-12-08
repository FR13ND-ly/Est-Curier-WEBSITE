from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import datetime
from django.contrib.auth.models import User
from .models import Article, Profile, Survey, Variant, Vote, File, Comment, View, Like, List, ListItem, Ad, Widget, YoutubeVideo
import re
import requests
from django.utils import timezone
from datetime import timedelta
import fitz
from django.core.files.base import ContentFile

import locale
locale.setlocale(locale.LC_ALL, 'ro')

import pytz

utc=pytz.UTC

apiUrl = "http://127.0.0.1:8000/api"

def formatDate(date):
    new_date = date.strftime("%d %B %Y, %H:%M").split()
    new_date[1] = new_date[1].capitalize()
    new_date = " ".join(new_date)
    return new_date

@csrf_exempt
def login(request):
    data = JSONParser().parse(request)
    user, created = User.objects.get_or_create(username = data['username'], first_name = data['token'])
    if (created and not Profile.objects.filter(token = data['token'])):
        user.save()
        profile = Profile.objects.create(
            user = user,
            token = data['token']
        ).save()
        List.objects.create(
            name = "Citește mai târziu",
            user = data['token']
        ).save()
    return JsonResponse('Succes', safe=False)

def getUserAuthorization(request, token):
    if Profile.objects.filter(token = token):
        return JsonResponse(Profile.objects.get(token = token).user.is_staff, safe=False)
    else:
        return JsonResponse(False, safe=False)

def getFastInfo(request):
    response = {
        "drafts" : Article.objects.filter(draft=True).count()
    }
    return JsonResponse(response, safe=False)

def getArticle(request, url):
    if (not Article.objects.filter(url = url).count()):
        return JsonResponse("Nu am găsit acest articol", safe=False)
    article = Article.objects.get(url = url)
    moreArticles = []
    for urlRaw in article.moreArticles.split(','):
        url = urlRaw.replace('http://localhost:4200/articol/' , '').replace('/', '')
        if (url.replace('[', '').replace(']', '')):
            if (Article.objects.filter(url = url).count()):
                mArticle = Article.objects.get(url = url)
                moreArticles.append({
                    "id" : mArticle.id,
                    "title" : mArticle.title,
                    "cover" : apiUrl + File.objects.get(id = mArticle.cover).file.url,
                    "url" : mArticle.url
                })
    response = {
        "id" : article.id,
        "title" : article.title,
        "author" : Profile.objects.get(token = article.author).user.username,
        "text" : article.text,
        "subtitle" : article.subtitle,
        "date" : formatDate(article.date),
        "hideAuthor" : article.hideAuthor,
        "disableComments" : article.disableComments,
        "hideLikesCount" : article.hideLikesCount,
        "hideViewsCount" : article.hideViewsCount,
        "hideDate" : article.hideDate,
        "tags" : article.tags.strip().split(','),
        "views" : View.objects.filter(article = article.id).count(),
        "moreArticles" : moreArticles,
        "coverDescription" : article.coverDescription,
        "cover" : apiUrl + File.objects.get(id = article.cover).file.url if isinstance(article.cover, str) else ''
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
def getSurvey(request):
    data = JSONParser().parse(request)
    surveys_raw = Survey.objects.filter(article = data['id'])
    surveys = []
    for survey in surveys_raw:
        survey_raw = ({
            "id" : survey.id,
            "question" : survey.question,
            "variants" : [],
            "votes" : 0
        })
        variants = Variant.objects.filter(survey = survey.id)
        for variant in variants:
            survey_raw['votes'] += Vote.objects.filter(variant = variant.id).count()
            variant = {
                "id" : variant.id,
                "content" : variant.content,
                "voted" : True if Vote.objects.filter(user = data['token'], variant = variant.id).count() else False,
                "votes" : Vote.objects.filter(variant = variant.id).count()
            }
            survey_raw['variants'].append(variant)
        surveys.append(survey_raw)
    return JsonResponse(surveys, safe=False)

@csrf_exempt
def vote(request):
    data = JSONParser().parse(request)
    vote, created = Vote.objects.get_or_create(variant = data['id'], user = data['token'])
    if (created):
        vote.save()
    else:
        vote.delete()
    return JsonResponse("ok", safe=False)

def getYTvideos(request):
    response = []
    YoutubeVideoRaw = YoutubeVideo.objects.all()
    for video in YoutubeVideoRaw:
        response.append({
            "token" : video.token,
            "title" : video.title,
            "image" : video.image
        })
    return JsonResponse(response, safe=False)

def updateYTvideos(request):
    YoutubeVideos = YoutubeVideo.objects.all()
    for YTvideo in YoutubeVideos:
        YTvideo.delete()
    url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBILtyOoT329bVrYAZqUysxzk0UO8_bhIs&channelId=UCflgGBMYMLcveK-xoX_RipA&part=snippet,id&order=date&maxResults=20"
    data = requests.get(url).json()
    for video in data['items']:
        ytVideo = YoutubeVideo.objects.create(
            token = video['id']['videoId'],
            title = video['snippet']['title'],
            image = video['snippet']['thumbnails']['high']['url']
        )
        ytVideo.save()
    return JsonResponse("Video-urile au fost actualizate", safe=False)

def getArticleToEdit(request, url):
    article = Article.objects.get(url=url)
    moreArticles = []
    for url in article.moreArticles.split(','):
        if ('localhost' in url and url):
            moreArticles.append(url)
    response = {
        "id" : article.id,
        "title" : article.title,
        "author" : Profile.objects.get(token = article.author).user.username,
        "text" : article.text,
        "draft" : article.draft,
        "subtitle" : article.subtitle,
        "hideAuthor" : article.hideAuthor,
        "disableComments" : article.disableComments,
        "hideLikesCount" : article.hideLikesCount,
        "hideViewsCount" : article.hideViewsCount,
        "hideDate" : article.hideDate,
        "moreArticles" : moreArticles,
        "tags" : article.tags.strip().split(','),
        "cover" : article.cover,
        "coverImg" : apiUrl + File.objects.get(id = article.cover).file.url,
        "coverDescription" : article.coverDescription,
        "surveys" : []
    }
    for survey in Survey.objects.filter(article = article.id):
        variants = []
        for variant in Variant.objects.filter(survey = survey.id):
            variants.append([variant.content])
        response['surveys'].append({
            "question" : survey.question,
            "answers" : variants
        })
    return JsonResponse(response, safe=False)

@csrf_exempt
def editArticle(request):
    data = JSONParser().parse(request)
    article = Article.objects.get(id = data['id'])
    article.url = createUrl(data['title'].replace(' ', '-'), article.id)
    article.title = data['title']
    article.subtitle = data['subtitle']
    article.text = data['text']
    article.draft = data['draft']
    article.disableComments = data['disableComments']
    article.hideLikesCount = data['hideLikesCount']
    article.hideViewsCount = data['hideViewsCount']
    article.hideAuthor = data['hideAuthor']
    article.hideDate = data['hideDate']
    article.tags = data['tags'].replace('#', '').lower()
    article.moreArticles = ','.join(addMoreArticles(data['moreArticles'], article.id))
    article.cover = data['cover']
    article.coverDescription = data["coverDescription"]
    article.save()
    for survey in Survey.objects.filter(article = article.id):
        for variant in Variant.objects.filter(survey = survey.id):
            variant.delete()
        survey.delete()
    for survey in data['surveys']:
        newSurvey = Survey.objects.create(article = article.id, question = survey['question'])
        newSurvey.save()
        for variant in survey['answers']:
            Variant.objects.create(survey = newSurvey.id, content = variant).save()
    return JsonResponse("ok", safe=False)

def createUrl(title, id = -1):
    articles = Article.objects.filter(url = title)
    if (len(articles)):
        for article in articles:
            if (article.id != id):
                title += '1'
                return createUrl(title)
    return title

def addMoreArticles(moreArticles, id):
    mainArticle = Article.objects.get(id = id)
    tag = mainArticle.tags.split(",")[0]
    articles = Article.objects.filter(tags__contains = tag).filter(draft = False).order_by("-date")
    for article in articles:
        if (len(moreArticles) > 2):
            break
        if article.id != id:
            moreArticles.append("http://localhost:4200/articol/" + article.url)
    return moreArticles

@csrf_exempt
def createArticle(request):
    data = JSONParser().parse(request)
    moreArticles = ''
    article = Article.objects.create(
        url = createUrl(data['title'].replace(' ', '-')),
        author = data['author'],
        title = data['title'],
        subtitle = data['subtitle'],
        text = data['text'],
        draft= data['draft'],
        disableComments = data['disableComments'],
        hideLikesCount = data['hideLikesCount'],
        hideViewsCount = data['hideViewsCount'],
        hideAuthor = data['hideAuthor'],
        hideDate = data['hideDate'],
        tags = data['tags'].replace('#', '').lower(),
        cover = data['cover'],
        coverDescription = data["coverDescription"]
    )
    article.moreArticles = ','.join(addMoreArticles(data['moreArticles'], article.id))
    article.delete()
    article.save() 
    return JsonResponse({"id" :article.id , "url" : article.url}, safe=False)

@csrf_exempt
def getArticleList(request, index):
    articles = []
    articles_total_raw = Article.objects.all().filter(draft=False).order_by("-date")
    articles_raw = articles_total_raw[7 * (index - 1) : 7 * index]
    for article in articles_raw:
        articles.append({
            "url" : article.url,
            "author" : Profile.objects.get(token = article.author).user.username,
            "title" : article.title,
            "date" : formatDate(article.date),
            "text" : article.text,
            "hideViewsCount" : article.hideViewsCount,
            "hideAuthor" : article.hideAuthor,
            "hideDate" : article.hideDate,
            "views" : View.objects.filter(article=article.id).count(),
            "cover" : apiUrl + File.objects.get(id = article.cover).file.url,
        })
    response = {
        "articles" : articles,
        "noMoreArticles" : (len(articles_total_raw) - 7 * (index - 1)) < 7
    }
    return JsonResponse(response, safe=False)

def getDrafts(request):
    articles = []
    articles_raw = Article.objects.filter(draft = True)
    for article in articles_raw:
        articles.append({
            "url" : article.url,
            "author" : Profile.objects.get(token = article.author).user.username,
            "title" : article.title,
            "date" : formatDate(article.date),
            "text" : article.text,
            "hideViewsCount" : article.hideViewsCount,
            "hideAuthor" : article.hideAuthor,
            "hideDate" : article.hideDate,
            "views" : View.objects.filter(article=article.id).count(),
            "cover" : (apiUrl + File.objects.get(id = article.cover).file.url) if article.cover != "{}" else '',
        })
    return JsonResponse(articles, safe=False)

def getTopArticles(request):
    response = {
        "primary" : [],
        "secondary" : []
    }
    articles = Article.objects.filter(draft = False).order_by("-date")[ : 9]
    for article in articles[ : 5]:
        response['primary'].append({
            "url" : article.url,
            "title" : article.title,
            "cover" : apiUrl + File.objects.get(id = article.cover).file.url
        })
    for article in articles[6 : 8]:
        response['secondary'].append({
            "url" : article.url,
            "title" : article.title,
            "cover" : apiUrl + File.objects.get(id = article.cover).file.url
        })
    return JsonResponse(response, safe=False)

def getCategoryArticles(request, tag):
    articles = Article.objects.filter(tags__contains = tag).filter(draft = False).order_by("-date")[: 4]
    response = []
    for article in articles:
        response.append({
            "url" : article.url,
            "title" : article.title,
            "cover" : apiUrl + File.objects.get(id = article.cover).file.url
        })
    return JsonResponse(response, safe = False)

def deleteArticle(request, id):
    article = Article.objects.get(id = id)
    for listItem in ListItem.objects.filter(article = id):
        listItem.delete()
    for view in View.objects.filter(article = id):
        view.delete()
    for like in Like.objects.filter(article = id):
        like.delete()
    article.delete()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def addView(request):
    data = JSONParser().parse(request)
    View.objects.create(article = data['id'], user = data['token']).save()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def getLikes(request):
    data = JSONParser().parse(request)
    response = {
        "count" : Like.objects.filter(article = data['id']).count(),
        "liked" : "favorite" if Like.objects.filter(article = data['id'], user = data['token']) else "favorite_border"
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
def addLike(request):
    data = JSONParser().parse(request)
    like, created = Like.objects.get_or_create(article = data['id'], user = data['token'])
    if (created):
        like.save()
    else:
        like.delete()
    return JsonResponse("ok", safe=False)

def getComments(request, id):
    comments = []
    for comment in Comment.objects.filter(article = id).order_by("-date"):
        if (Profile.objects.filter(token = comment.author).count()):
            author = Profile.objects.get(token = comment.author).user
            comments.append({
                "id" : comment.pk,
                "text" : comment.text,
                "username" : author.username,
                "byStaff": author.is_staff,
                "photoURL" : comment.photoURL,
                "date": formatDate(comment.date)
            })
        else:
            comment.delete()
    return JsonResponse(comments, safe=False)

@csrf_exempt
def addComment(request):
    data = JSONParser().parse(request)
    Comment.objects.create(
        author = data['author'],
        text = data['text'],
        article = data['id'],
        photoURL = data['photoURL']
    ).save()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def removeComment(request, pk):
    Comment.objects.get(pk = pk).delete()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def getLightLists(request):
    data = JSONParser().parse(request)
    response = []
    for ulist in List.objects.filter(user = data['token']):
        response.append({
            "pk" : ulist.pk,
            "name" : ulist.name,
            "public" : ulist.public,
            "added" : bool(ListItem.objects.filter(article = data['id'], List = ulist.pk))
        })
    return JsonResponse(response, safe=False)

@csrf_exempt
def addToList(request):
    data = JSONParser().parse(request)
    nlist, created = ListItem.objects.get_or_create(
        List = data['pk'],
        article = data['id']
    )
    if (created):
        nlist.save()
    else:
        nlist.delete()
    return JsonResponse("ok", safe=False)
    
@csrf_exempt
def getFullLists(request, pk):
    response = []
    historic_raw = View.objects.filter(user = pk).order_by('-date')
    history = {
        "id" : 'istoric',
        "name" : "Istoric",
        "lastPreview" : "",
        "preview" : [],
        "length" : historic_raw.count()
    }
    if len(historic_raw):
        for historic in historic_raw[0 : 3]:
            if (not len(Article.objects.filter(id = historic.article))):
                Article.objects.filter(id = historic.article).delete()
            article = Article.objects.filter(id = historic.article)[0]
            history['preview'].append({
                "title" : article.title,
                "url" : article.url,
                "cover" : apiUrl + File.objects.get(id = article.cover).file.url
            })
            history['lastPreview'] = apiUrl + File.objects.get(id = article.cover).file.url
    response.append(history)
    likes_raw = Like.objects.filter(user = pk).order_by('-date')
    likes = {
        "id" : 'aprecieri',
        "name" : "Apreciate",
        "lastPreview" : "",
        "preview" : [],
        "length" : likes_raw.count()
    }
    if len(likes_raw):
        for like in likes_raw[0 : 3]:
            article = Article.objects.filter(id = like.article)[0]
            likes['preview'].append({
                "title" : article.title,
                "url" : article.url,
                "cover" : apiUrl + File.objects.get(id = article.cover).file.url
            })
            likes['lastPreview'] = apiUrl + File.objects.get(id = article.cover).file.url
    response.append(likes)
    for tlist in List.objects.filter(user = pk).order_by('date'):
        rlist_raw = ListItem.objects.filter(List = tlist.id)
        rlist = {
            "id" : tlist.id,
            "name" : tlist.name,
            "lastPreview" : "",
            "preview" : [],
            "length" : rlist_raw.count()
        }
        if len(rlist_raw):
            for listItem in rlist_raw[0 : 3]:
                article = Article.objects.get(id = listItem.article)
                rlist['preview'].append({
                    "title" : article.title,
                    "url" : article.url,
                    "cover" : apiUrl + File.objects.get(id = article.cover).file.url
                })
                rlist['lastPreview'] = apiUrl + File.objects.get(id = article.cover).file.url
        response.append(rlist)
    return JsonResponse(response, safe=False)

@csrf_exempt
def getListInfo(request):
    data = JSONParser().parse(request)
    if (not List.objects.filter(id = data['id']).count() and data['id'] != -1 and data['id'] != -2):
        return JsonResponse("Nu am găsit această listă", safe=False)
    user = Profile.objects.get(token = data['token'])
    response = {
        "name" : '',
        "author" : user.user.username,
        "public" : False,
        "own" : True,
        "size" : 0
    }
    articles_raw = []
    if data['id'] == -1:
        response['size'] = len(View.objects.filter(user = data['token']))
        response['name'] = "Istoric"
    elif data['id'] == -2:
        response['size'] = len(Like.objects.filter(user = data['token']))
        response['name'] = "Aprecieri"
    else:
        nList = List.objects.get(id = data['id'])
        response['size'] = len(ListItem.objects.filter(List = data['id']))
        response['name'] = nList.name
        response['public'] = not nList.public
        response['own'] = nList.user == user.token
        if (not response['own']):
            response['author'] = Profile.objects.get(token = nList.user).user.username
    return JsonResponse(response, safe=False)

@csrf_exempt
def getListArticles(request):
    data = JSONParser().parse(request)
    response = {
        "articles" : [],
        "noMoreArticles" : True,
    }
    articles_raw = []
    if data['id'] == -1:
        articles_raw = View.objects.filter(user = data['token'])
    elif data['id'] == -2:
        articles_raw = Like.objects.filter(user = data['token'])
    else:
        articles_raw = ListItem.objects.filter(List = data['id'])
    response["noMoreArticles"] = (len(articles_raw) - 30 * (data["index"] - 1)) < 30
    for article_raw in articles_raw[30 * (data["index"] - 1) : 30 * data["index"]]:
        if (int(data['id']) > 0):
            if (not Article.objects.filter(id = article_raw.id)):
                article_raw.delete()
                continue
            article = Article.objects.get(id = article_raw.id)
        else:
            if (not Article.objects.filter(id = article_raw.article)):
                article_raw.delete()
                continue
            article = Article.objects.get(id = article_raw.article)
        response['articles'].append({
            "url" : article.url,
            "title" : article.title,
            "text" : article.text,
            "date" : formatDate(article.date),
            "cover" : apiUrl + File.objects.get(id = article.cover).file.url
        })
    return JsonResponse(response, safe=False)

@csrf_exempt
def addList(request):
    data = JSONParser().parse(request)
    List.objects.create(
        name = data['name'],
        user = data['user'],
        public = data['access']
    )
    return JsonResponse("ok", safe=False)

@csrf_exempt
def removeList(request, id):
    List.objects.get(id = id).delete()
    for listItem in ListItem.objects.filter(List=id):
        listItem.delete()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def changePublicList(request):
    data = JSONParser().parse(request)
    nList = List.objects.get(id = data['id'])
    nList.public = data['publicity']
    nList.save()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def changeTitleList(request):
    data = JSONParser().parse(request)
    nList = List.objects.get(id = data['id'])
    nList.name = data['name']
    nList.save()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def search(request):
    def prepare(word):
        return word.lower().replace('ț', 't').replace('ș', 's').replace('î', 'i').replace('â', 'a').replace('ă', 'a')

    def prepareWordList(wordList):
        for i in ["și", "sau", "de", "care", "la", "a", "fi", "eu", "ea", "el", "dar", "tu"]:
            if i in wordList:
                wordList.remove(i)
        return wordList
    searchText = JSONParser().parse(request)['searchText']
    wordsList = prepareWordList(searchText.strip().split(' '))
    response = []
    articles = Article.objects.filter(draft = False).order_by("-date")
    if searchText[0] == "#":
        tag = searchText.replace('#', '')
        for article in articles:
            if tag in article.tags.split(","):
                response.append({
                    "url" : article.url,
                    "author" : article.author,
                    "title" : article.title,
                    "text" : article.text,
                    "cover" : apiUrl + File.objects.get(id = article.cover).file.url
                })
        return JsonResponse(response, safe=False)
    for article in articles:
        articleToAppend = {
            "url" : article.url,
            "title" : article.title,
            "text" : article.text,
            "cover" : apiUrl + File.objects.get(id = article.cover).file.url
        }
        for word in wordsList:
            for wordOfTitle in prepareWordList(article.title.split(" ")):
                if prepare(word) in prepare(wordOfTitle) and articleToAppend not in response:
                    response.append(articleToAppend)
            for wordOfText in prepareWordList(article.text.split(' ')):
                if prepare(word) in prepare(wordOfText) and articleToAppend not in response:
                    response.append(articleToAppend)
    return JsonResponse(response, safe=False)

def getAds(request):
    response = []
    ads_raw = Ad.objects.order_by("-date")
    for ad in ads_raw:
        dayEnd = ad.date + datetime.timedelta(weeks=ad.apparitions)
        if (utc.localize(datetime.datetime.now()) > dayEnd):
            ad.delete()
            pass
        response.append({
            "id" : ad.id,
            "title" : ad.title,
            "contacts" : ad.contacts,
            "text" : ad.text,
            "apparitions" : ad.apparitions
        })
    return JsonResponse(response, safe=False)

@csrf_exempt
def addAd(request):
    data = JSONParser().parse(request)
    ad = Ad.objects.create(
        title = data['title'],
        contacts = data['contacts'],
        text = data['text'],
        apparitions = data['apparitions']
    )
    ad.save()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def editAd(request):
    data = JSONParser().parse(request)
    ad = Ad.objects.get(id = data['id'])
    ad.title = data['title']
    ad.contacts = data['contacts']
    ad.text = data['text']
    ad.apparitions = data['apparitions']
    ad.save()
    return JsonResponse("ok", safe=False)

def removeAd(request, id):
    Ad.objects.get(id = id).delete()
    return JsonResponse("ok", safe=False)

def getWidgets(request):
    response = []
    for id in range(1, 6):
        widget = Widget.objects.get_or_create(id = id)[0]
        response.append({
            "id" : widget.id,
            "text" : widget.text,
            "link" : widget.link,
            "image" : widget.image,
            "actualImage" : apiUrl + File.objects.get(id = widget.image).file.url if widget.image else "assets/images/advertorial.jpg",
            "author" : widget.author,
            "activated" : widget.activated
        })
    return JsonResponse(response, safe=False)

def getWidget(request, id):
    widget = Widget.objects.get_or_create(id = id)[0]
    response = {
        "text" : widget.text,
        "link" : widget.link,
        "image" : "http://127.0.0.1:8000/api" + File.objects.get(id = widget.image).file.url if widget.image else "assets/images/advertorial.jpg",
        "author" : widget.author,
        "activated" : widget.activated
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
def editWidget(request):
    data = JSONParser().parse(request)
    widget = Widget.objects.get_or_create(id = data['id'])[0]
    widget.text = data['text']
    widget.link = data['link']
    widget.image = data['image']
    widget.author = data['author']
    widget.activated = data['activated']
    widget.save()
    return JsonResponse("ok", safe=False)

def getFiles(request, index):
    files = File.objects.all().order_by('-date')
    response = {
        "files" : [],
        "noMoreFiles" : (len(files) - 16 * (index - 1)) < 16
    }
    for file in files[16 * (index - 1) : 16 * index]:
        response["files"].append({
            "id" : file.id,
            "name" : file.file.name,
            "location" : apiUrl + file.file.url
        })
    return JsonResponse(response, safe=False)

def removeFile(request, id):
    file = File.objects.get(id = id)
    if os.path.exists(os.getcwd().replace("\\", "/") + "/media/" + str(file.file)):
        os.remove(os.getcwd().replace("\\", "/") + "/media/" + str(file.file))
    file.delete()
    return JsonResponse("ok", safe=False)

@csrf_exempt
def uploadPdf(request):
    file = request.FILES['file']
    path = default_storage.save(file.name, ContentFile(file.read()))
    doc = fitz.open(os.path.join(settings.MEDIA_ROOT, path))
    i = 0
    pages = []
    for page in doc.pages():
        pix = page.getPixmap()
        pix.writePNG(settings.MEDIA_ROOT + "/" + file.name + str(i + 1) + ".png")
        pages.append(apiUrl + "/media/" + file.name + str(i + 1) + ".png")
        i += 1
    return JsonResponse(pages, safe=False)

@csrf_exempt
def uploadFile(request):
    file = File.objects.create(file = request.FILES['file'])
    file.save()
    response = {
        "location" : apiUrl + file.file.url
    }
    return JsonResponse(file.id, safe=False)

def statistics(request):
    dates = []
    views = []
    likes = []
    comments = []
    for i in range(int(timezone.now().strftime("%d")), - 1, - 1):
        dates.append(i)
        views.append(View.objects.filter(date__date=timezone.now() - timedelta(days = int(timezone.now().strftime("%d")) - i)).reverse().count()) 
        likes.append(Like.objects.filter(date__date=timezone.now() - timedelta(days = int(timezone.now().strftime("%d")) - i)).reverse().count()) 
        comments.append(Comment.objects.filter(date__date=timezone.now() - timedelta(days = int(timezone.now().strftime("%d")) - i)).reverse().count())
    response = {
        "dates" : dates,
        "views" : views,
        "likes" : likes,
        "comments" : comments
    }
    return JsonResponse(response, safe=False)