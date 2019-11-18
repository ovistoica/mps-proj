from django.conf.urls import include, url
from api import views


urlpatterns = [
	url(r'^contest/$', views.ContestAPIListView.as_view()),

	url(r'^round/(?P<id>[0-9]+)$', views.RoundAPIView.as_view()),

	url(r'^series/(?P<id>[0-9]+)$', views.SeriesAPIView.as_view()),

	url(r'^participant/(?P<id>[0-9]+)$', views.ParticipantAPIView.as_view()),

	url(r'^note/$', views.NoteAPIListView.as_view()),

	url(r'^rezultat/(?P<id>[0-9]+)$', views.RezultatAPIListView.as_view()),
	url(r'^rezultatserie/(?P<id>[0-9]+)$', views.RezultatSerieAPIListView.as_view()),

    url(r'^auth/', include('oauth2_provider.urls', namespace='oauth2_provider')),

]
