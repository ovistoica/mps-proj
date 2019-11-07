from django.db import models
from django.contrib.auth.hashers import make_password

class Contest(models.Model):
    name = models.CharField(max_length=32)
    type = models.CharField(max_length=32)
    password = models.CharField(max_length=32)

    def __str__(self):
        return "Contest({})".format(self.name)


class Juror(models.Model):
    contest = models.ManyToManyField(Contest)

class Round(models.Model):
	contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
	round_no = models.IntegerField()
	start_time = models.DateTimeField()
	end_time = models.DateTimeField()

class Series(models.Model):
    class Meta:
        verbose_name_plural = "Series"

    round = models.ForeignKey(Round, on_delete=models.CASCADE)
    jseries_no = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class Participant(models.Model):
	first_name = models.CharField(max_length=32)
	last_name = models.CharField(max_length=32)
	round = models.ManyToManyField(Round)
	start_time = models.DateTimeField()
	end_time = models.DateTimeField()

	def name(self):
		return "{} {}".format(first_name, last_name)

class Grade(models.Model):
	series = models.ForeignKey(Series, on_delete=models.CASCADE)
	juror = models.ForeignKey(Juror, on_delete=models.CASCADE)
	participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
	category = models.CharField(max_length=32)
