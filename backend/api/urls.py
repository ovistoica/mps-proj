from django.conf.urls import include, url
from api import views


urlpatterns = [
	url(r'^contest/(?P<id>[0-9]+)$', views.ContestAPIView.as_view()),
	url(r'^contest/$', views.ContestAPIListView.as_view()),

	url(r'^juror/(?P<id>[0-9]+)$', views.JurorAPIView.as_view()),
	url(r'^juror/$', views.JurorAPIListView.as_view()),

	url(r'^round/(?P<id>[0-9]+)$', views.RoundAPIView.as_view()),
	url(r'^round/$', views.RoundAPIListView.as_view()),

	url(r'^series/(?P<id>[0-9]+)$', views.SeriesAPIView.as_view()),
	url(r'^series/$', views.SeriesAPIListView.as_view()),

	url(r'^participant/(?P<id>[0-9]+)$', views.ParticipantAPIView.as_view()),
	url(r'^participant/$', views.ParticipantAPIListView.as_view()),

	url(r'^grade/(?P<id>[0-9]+)$', views.GradeAPIView.as_view()),
	url(r'^grade/$', views.GradeAPIListView.as_view()),
]
