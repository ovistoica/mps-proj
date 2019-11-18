from rest_framework.serializers import ModelSerializer
from api.models import Contest, Juror, Round, Series, Participant, Grade, Note


class ContestSerializer(ModelSerializer):

    class Meta:
        model = Contest
        fields = ['id', 'name', 'type', 'password', 'start_time', 'end_time']


class JurorSerializer(ModelSerializer):

    class Meta:
        model = Juror
        fields = '__all__'


class RoundSerializer(ModelSerializer):

    class Meta:
        model = Round
        fields = ['id', 'round_no', 'start_time', 'end_time']

class ContestSerializerPost(ModelSerializer):

    class Meta:
        model = Contest
        fields = ['password']


class SeriesSerializer(ModelSerializer):

    class Meta:
        model = Series
        fields = ['id', 'jseries_no', 'start_time', 'end_time']


class ParticipantSerializer(ModelSerializer):

    class Meta:
        model = Participant
        fields = ['id', 'first_name', 'last_name', 'start_time', 'end_time', 'vote']

        

class ParticipantRezSerializer(ModelSerializer):

    class Meta:
        model = Participant
        fields = ['id', 'first_name', 'last_name', 'nota', 'status']

class GradeSerializer(ModelSerializer):

    class Meta:
        model = Grade
        fields = '__all__'

class NoteSerializer(ModelSerializer):

    class Meta:
        model = Note
        fields = ['contest_id', 'participant_id', 'ritm', 'coregrafie', 'corectitudine', 'componentaArtistica']
