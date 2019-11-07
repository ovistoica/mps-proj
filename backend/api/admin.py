from django.contrib import admin

from api.models import *

# Register your models here.
admin.site.register(Contest)
admin.site.register(Juror)
admin.site.register(Round)
admin.site.register(Series)
admin.site.register(Participant)
admin.site.register(Grade)
