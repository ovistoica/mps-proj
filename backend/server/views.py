from django.core.urlresolvers import reverse_lazy
from vanilla import ListView, CreateView, DetailView, UpdateView, DeleteView
from .forms import VoteForm
from .models import Vote


class VoteList(ListView):
    model = Vote
    paginate_by = 20


class VoteCreate(CreateView):
    model = Vote
    form_class = VoteForm
    success_url = reverse_lazy('server:list')


class VoteDetail(DetailView):
    model = Vote


class VoteUpdate(UpdateView):
    model = Vote
    form_class = VoteForm
    success_url = reverse_lazy('server:list')


class VoteDelete(DeleteView):
    model = Vote
    success_url = reverse_lazy('server:list')
