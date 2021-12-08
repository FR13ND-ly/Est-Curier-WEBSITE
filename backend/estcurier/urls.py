from django.urls import path
from django.conf.urls import url
from . import views
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static

urlpatterns = [
    #authentification
    path('login/', views.login),
    path('getUserAuthorization/<str:token>', views.getUserAuthorization),
    #articles
    path('createArticle/', views.createArticle),
    path('getArticle/<str:url>', views.getArticle),
    path('editArticle/', views.editArticle),
    path('deleteArticle/<str:id>/', views.deleteArticle),
    path('getArticleToEdit/<str:url>/', views.getArticleToEdit),
    path('addView/', views.addView),
    path('addLike/', views.addLike),
    path('getLikes/', views.getLikes),
    path('getArticleList/<int:index>/', views.getArticleList),
    path('getTopArticles/', views.getTopArticles),
    path('getCategoryArticles/<str:tag>/', views.getCategoryArticles),
    path('getDrafts/', views.getDrafts),
    #ads
    path('getAdons/', views.getAds),
    path('addAdon/', views.addAd),
    path('editAdon/', views.editAd),
    path('removeAdon/<str:id>/', views.removeAd),
    #widgets
    path('getWidgets/', views.getWidgets),
    path('getWidget/<str:id>/', views.getWidget),
    path('editWidget/', views.editWidget),
    #comments
    path('getComments/<str:id>', views.getComments),
    path('removeComment/<str:pk>/', views.removeComment),
    path('addComment/', views.addComment),
    #list
    path('getLightList/', views.getLightLists),
    path('addToList/', views.addToList),
    path('getFullLists/<str:pk>', views.getFullLists),
    path('getListInfo/', views.getListInfo),
    path('getListArticles/', views.getListArticles),
    path('addList/', views.addList),
    path('removeList/<str:id>', views.removeList),
    path('changePublicList/', views.changePublicList),
    path('changeTitleList/', views.changeTitleList),
    path('search/', views.search),
    path("getFastInfo/", views.getFastInfo),
    #surveys
    path('getSurvey/', views.getSurvey),
    path('vote/', views.vote),
    #media
    path('statisticsByDay/', views.statistics),
    path('getYTvideos/', views.getYTvideos),
    path('updateYTvideos/', views.updateYTvideos),
    path('getFiles/<int:index>/', views.getFiles),
    path('uploadPdf/', views.uploadPdf),
    path('removeFile/<str:id>/', views.removeFile),
    path('uploadFile/', views.uploadFile),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
]