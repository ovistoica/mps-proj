from rest_framework.serializers import ModelSerializer
from api.models import Contest, Juror, Round, Series, Participant, Grade


class ContestSerializer(ModelSerializer):

    class Meta:
        model = Contest
        fields = '__all__'


class JurorSerializer(ModelSerializer):

    class Meta:
        model = Juror
        fields = '__all__'


class RoundSerializer(ModelSerializer):

    class Meta:
        model = Round
        fields = '__all__'


class SeriesSerializer(ModelSerializer):

    class Meta:
        model = Series
        fields = '__all__'


class ParticipantSerializer(ModelSerializer):

    class Meta:
        model = Participant
        fields = '__all__'


class GradeSerializer(ModelSerializer):

    class Meta:
        model = Grade
        fields = '__all__'
