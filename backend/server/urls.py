from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.VoteList.as_view(), name='list'),
    url(r'^new/$', views.VoteCreate.as_view(), name='create'),
    url(r'^(?P<pk>\d+)/$', views.VoteDetail.as_view(), name='detail'),
    url(r'^(?P<pk>\d+)/update/$', views.VoteUpdate.as_view(), name='update'),
    url(r'^(?P<pk>\d+)/delete/$', views.VoteDelete.as_view(), name='delete'),
]
