from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import ContestSerializer, JurorSerializer, RoundSerializer, SeriesSerializer, ParticipantSerializer, GradeSerializer, NoteSerializer, ContestSerializerPost, ParticipantRezSerializer
from api.models import Contest, Juror, Round, Series, Participant, Grade, Note


class ContestAPIView(APIView):

    def get(self, request, id, format=None):
        try:
            print("Request from user: ", request.user)
            name = request.user
            cont = Contest.objects.filter(juror__username = name)
            contId = cont.get(pk=id)
        except Contest.DoesNotExist:
            return Response(status=401)
        item = Participant.objects.filter(contests__id = id, status = 1)
        serializer = ParticipantSerializer(item, many=True)
        return Response(serializer.data)

    def put(self, request, id, format=None):
        try:
            item = Contest.objects.get(pk=id)
        except Contest.DoesNotExist:
            return Response(status=404)
        serializer = ContestSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id, format=None):
        try:
            item = Contest.objects.get(pk=id)
        except Contest.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class ContestAPIListView(APIView):

    def get(self, request, format=None):
        print("Request from user: ", request.user)
        name = request.user
        items = Contest.objects.filter(juror__username = name)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(items, request)
        serializer = ContestSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = ContestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class JurorAPIView(APIView):

    def get(self, request, id, format=None):
        try:
            item = Juror.objects.get(pk=id)
            serializer = JurorSerializer(item)
            return Response(serializer.data)
        except Juror.DoesNotExist:
            return Response(status=404)

    def put(self, request, id, format=None):
        try:
            item = Juror.objects.get(pk=id)
        except Juror.DoesNotExist:
            return Response(status=404)
        serializer = JurorSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id, format=None):
        try:
            item = Juror.objects.get(pk=id)
        except Juror.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class JurorAPIListView(APIView):

    def get(self, request, format=None):
        items = Juror.objects.all()
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(items, request)
        serializer = JurorSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = JurorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class RoundAPIView(APIView):

    # def get(self, request, id, format=None):
    #     try:
    #         print("Request from user: ", request.user)
    #         name = request.user
    #         cont = Contest.objects.filter(juror__username = name)
    #         contId = cont.get(pk=id)
    #     except Contest.DoesNotExist:
    #         return Response(status=401)
    #
    #     try:
    #         item2 = Round.objects.filter(contest_id=id).count()
    #         item = Round.objects.filter(contest_id=id)
    #         round_no = Contest.objects.get(pk=id)
    #         print(round_no)
    #         print(item2)
    #         serializer = RoundSerializer(item, many=True)
    #         if item2 == round_no.round_nums:
    #             return Response(serializer.data)
    #         else:
    #             return Response(status=404)
    #     except Round.DoesNotExist:
    #         return Response(status=404)

    def put(self, request, id, format=None):
        try:
            item = Round.objects.get(pk=id)
        except Round.DoesNotExist:
            return Response(status=404)
        serializer = RoundSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id, format=None):
        try:
            item = Round.objects.get(pk=id)
        except Round.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)

    def post(self, request, id, format=None):
        try:
            print("Request from user: ", request.user)
            name = request.user
            cont = Contest.objects.filter(juror__username = name)
            contId = cont.get(pk=id)
        except Contest.DoesNotExist:
            return Response(status=401)
        serializer = ContestSerializerPost(data=request.data)
        if serializer.is_valid():
            contest_id = id
            password = serializer.validated_data.get('password')
            item = Contest.objects.filter(pk=contest_id, password=password).count()
            print(item)
            if item == 0:
                Round.objects.filter(contest_id=contest_id).update(allow=0)
                return Response(status=401)
            else:
                Round.objects.filter(contest_id=contest_id).update(allow=1)
                item2 = Round.objects.filter(contest_id=id, allow=1)
                serializer2 = RoundSerializer(item2, many=True)
                return Response(serializer2.data)
        return Response(serializer.errors, status=400)


class RoundAPIListView(APIView):

    def get(self, request, format=None):
        items = Round.objects.all()
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(items, request)
        serializer = RoundSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = RoundSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class SeriesAPIView(APIView):

    def get(self, request, id, format=None):
        # trebuie sa verific ca e allow
        try:
            print("Request from user: ", request.user)
            name = request.user
            cont = Contest.objects.filter(juror__username = name)
            contId = Round.objects.get(pk=id)
            nr = contId.contest.id
            contE = cont.get(pk=nr)
        except Contest.DoesNotExist:
            return Response(status=401)
        try:
            item = Series.objects.filter(round_id=id)
            serializer = SeriesSerializer(item, many=True)
            return Response(serializer.data)
        except Series.DoesNotExist:
            return Response(status=404)

    def put(self, request, id, format=None):
        try:
            item = Series.objects.get(pk=id)
        except Series.DoesNotExist:
            return Response(status=404)
        serializer = SeriesSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id, format=None):
        try:
            item = Series.objects.get(pk=id)
        except Series.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class SeriesAPIListView(APIView):

    def get(self, request, format=None):
        items = Series.objects.all()
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(items, request)
        serializer = SeriesSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = SeriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ParticipantAPIView(APIView):

    def get(self, request, id, format=None):
        # trebuie sa verific ca e pe allow
        try:
            contests = Series.objects.get(pk=id)
            item = Participant.objects.filter(serie_id=id, status=1)
            print(contests.contest_id)
            Participant.objects.filter(serie_id=id, status=1).update(vote=contests.contest_id)
            serializer = ParticipantSerializer(item, many=True)
            return Response(serializer.data)
        except Participant.DoesNotExist:
            return Response(status=404)

    def put(self, request, id, format=None):
        try:
            item = Participant.objects.get(pk=id)
        except Participant.DoesNotExist:
            return Response(status=404)
        serializer = ParticipantSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id, format=None):
        try:
            item = Participant.objects.get(pk=id)
        except Participant.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class ParticipantAPIListView(APIView):

    def get(self, request, format=None):
        items = Participant.objects.all()
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(items, request)
        serializer = ParticipantSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = ParticipantSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class GradeAPIView(APIView):

    def get(self, request, id, format=None):
        try:
            item = Grade.objects.get(pk=id)
            serializer = GradeSerializer(item)
            return Response(serializer.data)
        except Grade.DoesNotExist:
            return Response(status=404)

    def put(self, request, id, format=None):
        try:
            item = Grade.objects.get(pk=id)
        except Grade.DoesNotExist:
            return Response(status=404)
        serializer = GradeSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id, format=None):
        try:
            item = Grade.objects.get(pk=id)
        except Grade.DoesNotExist:
            return Response(status=404)
        item.delete()
        return Response(status=204)


class GradeAPIListView(APIView):

    def get(self, request, format=None):
        items = Grade.objects.all()
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(items, request)
        serializer = GradeSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class NoteAPIListView(APIView):

    def post(self, request, format=None):
        # trebuie sa verific ca e allow
        jurat = request.user
        print(jurat)
        nota = Note(jurat=jurat)
        serializer = NoteSerializer(nota, data=request.data)
        if serializer.is_valid():
            contest_id = serializer.validated_data.get('contest_id')
            # verific daca apartine concursului si poate vota
            try:
                item = Juror.objects.get(contest__id=contest_id, username=jurat)
            except Juror.DoesNotExist:
                return Response(status=404)
            p_id = serializer.validated_data.get('participant_id')
            #verific daca participantul apartine concursului
            try:
                participant = Participant.objects.get(contests__id=contest_id, pk=p_id)
            except Participant.DoesNotExist:
                return Response(status=404)

            ritm = serializer.validated_data.get('ritm')
            coregrafie = serializer.validated_data.get('coregrafie')
            corectitudine = serializer.validated_data.get('corectitudine')
            componentaArtistica = serializer.validated_data.get('componentaArtistica')
            procent = Grade.objects.get(contest_id_id=contest_id)
            nota = procent.ritm * ritm + procent.coregrafie * coregrafie
            nota = nota + procent.corectitudine * corectitudine
            nota = nota + procent.componentaArtistica * componentaArtistica
            nota = nota / 10
            print(nota)

            nota_veche = participant.nota
            print(nota_veche)
            nota = nota + nota_veche
            vote = participant.vote
            vote = vote + 1
            print(str(vote) + "   ceve ")

            whoVoted = participant.whoVoted
            whoVotedPk = whoVoted.split()
            try:
                thing_index = whoVotedPk.index(str(item.pk))
            except ValueError:
                thing_index = -1

            voteJuror = item.vote + 1
            print(thing_index)

            if thing_index == -1:
                Participant.objects.filter(contests__id=contest_id, pk=p_id).update(nota=nota)
                Participant.objects.filter(contests__id=contest_id, pk=p_id).update(vote=vote)
                whoVoted = whoVoted + " " + str(item.pk)
                Participant.objects.filter(contests__id=contest_id, pk=p_id).update(whoVoted=whoVoted)
                Juror.objects.filter(contest__id=contest_id, username=jurat).update(vote=voteJuror)
                return Response(serializer.data, status=201)
            # sa poata vota o singura data un jurat trb sa faca aia cu vote
            # nu merge asa, fac un string cu pk
            # ii fac split si apoi verific daca e in vector
            # daca e nu poate sa voteze
            return Response(status=401)  #nu are autorizatie sa mai voteze again
        return Response(serializer.errors, status=400)

ceva = ""
cevaSerie = [None] * 1000

class RezultatSerieAPIListView(APIView):
    def get(self, request, id, format=None):
        global cevaSerie
        # trebuie sa verific ca e pe allow
        # id serie!!!!
        serie = Series.objects.get(pk=id)
        contest = serie.contest.id
        jurors_no = Juror.objects.filter(contest__id=contest).count()
        print(jurors_no)
        print(contest)
        # dinamic sa vada cati jurati sunt
        nrP = Participant.objects.filter(contests__id=contest, vote=jurors_no, status=1, serie__id=id).count()
        nrPOn = Participant.objects.filter(contests__id=contest, status=1, serie__id=id).count()
        print("votati de toti juratii pt serie:" + str(nrP))
        print("toti participant pt serie" + str(nrPOn))
        if nrP == nrPOn:
            # problema ca trb ca juratul sa votezi pe toti
            # folosesc si current_round ca sa stiu cati elimin
            item = Participant.objects.filter(contests__id=contest, status=1, serie__id=id).order_by('-nota')
            cevaSerie[int(id)] = item
            print(item)
            serializer = ParticipantRezSerializer(cevaSerie[int(id)], many=True)
            # trebuie sa elimin??
            return Response(serializer.data)
        else:
            print(cevaSerie[int(id)])
            serializer = ParticipantRezSerializer(cevaSerie[int(id)], many=True)
            return Response(serializer.data)

        # cand nu sunt gata rezultate
        return Response(status=404)

class RezultatAPIListView(APIView):
    def get(self, request, id, format=None):
        global ceva
        # trebuie sa verific ca e pe allow
        contest = Contest.objects.get(pk=id)
        # dinamic sa vada cati jurati sunt
        nrP = Participant.objects.filter(contests__id=id, vote=contest.jurors_no, status=1).count()
        nrPOn = Participant.objects.filter(contests__id=id, status=1).count()
        print("votati de toti juratii:" + str(nrP))
        print("toti participant" + str(nrPOn))
        if nrP == nrPOn:
            # problema ca trb ca juratul sa votezi pe toti
            # folosesc si current_round ca sa stiu cati elimin
            elim = Participant.objects.filter(contests__id=id, status = 1).order_by('nota')
            current_round = contest.current_round
            round = Round.objects.get(contest__id=id, round_no=current_round)
            nrE = round.eliminate
            sem = 0
            for e in elim:
                if sem < nrE:
                    e.status = 0
                    e.save()
                    sem = sem + 1
                else:
                    break

            item = Participant.objects.filter(contests__id=id).order_by('-nota')
            ceva = item

            current_round = current_round + 1
            serializer = ParticipantRezSerializer(ceva, many=True)
            round = Round.objects.filter(contest_id=id, round_no=contest.current_round)
            print(contest.current_round)
            Contest.objects.filter(pk=id).update(current_round=current_round)
            Participant.objects.filter(contests__id=id).update(whoVoted="")
            Juror.objects.filter(contest__id=id).update(vote=0)
            Participant.objects.filter(contests__id=id).update(vote=0)
            Participant.objects.filter(contests__id=id).update(nota=0)
            # trebuie sa elimin??
            return Response(serializer.data)
        else:
            serializer = ParticipantRezSerializer(ceva, many=True)
            return Response(serializer.data)

        # cand nu sunt gata rezultate
        return Response(status=404)
