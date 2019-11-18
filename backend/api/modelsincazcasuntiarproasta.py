from django.db import models
from django.contrib.auth.hashers import make_password

class Contest(models.Model):
    name = models.CharField(max_length=32)
    type = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    current_round = models.IntegerField(null=True)
    round_nums = models.IntegerField(null=True)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    jurors_no = models.IntegerField(null=True)

    def __str__(self):
        return "Contest({})".format(self.name)


class Juror(models.Model):
    contest = models.ManyToManyField(Contest)
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    status = models.IntegerField(null=True)
    contest = models.ManyToManyField(Contest)
    vote = models.IntegerField(null=True)

class Round(models.Model):
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    round_no = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    series_no = models.IntegerField(null=True)
    allow = models.IntegerField(null=True, default='0')
    eliminate = models.IntegerField(null=True, default='0')


class Series(models.Model):
    class Meta:
        verbose_name_plural = "Series"

    round = models.ForeignKey(Round, on_delete=models.CASCADE)
    jseries_no = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE, null=True)

class Participant(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    serie = models.ForeignKey(Series, on_delete=models.CASCADE, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    contests = models.ManyToManyField(Contest)
    status = models.IntegerField(null=True)
    round = models.ManyToManyField(Round)
    nota = models.IntegerField(null=True)
    vote = models.IntegerField(null=True)
    whoVoted = models.CharField(max_length=255, null=True)

    def name(self):
        return "{} {}".format(first_name, last_name)

class Note(models.Model):
    contest_id = models.IntegerField(null=True)
    jurat = models.CharField(max_length=32)
    participant_id = models.IntegerField(null=True)
    ritm = models.IntegerField(null=True)
    coregrafie = models.IntegerField(null=True)
    corectitudine = models.IntegerField(null=True)
    componentaArtistica = models.IntegerField(null=True)

class Grade(models.Model):
    contest_id = models.ForeignKey(Contest, on_delete=models.CASCADE, null=True)
    ritm = models.IntegerField(null=True);
    coregrafie = models.IntegerField(null=True)
    corectitudine = models.IntegerField(null=True)
    componentaArtistica = models.IntegerField(null=True)
