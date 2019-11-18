from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import ContestSerializer, JurorSerializer, RoundSerializer, SeriesSerializer, ParticipantSerializer, GradeSerializer, NoteSerializer, ContestSerializerPost, ParticipantRezSerializer
from api.models import Contest, Juror, Round, Series, Participant, Grade, Note
import json
import collections
import os

class ContestAPIListView(APIView):

    def get(self, request, format=None):
        numeJurat = request.user
        # filtrez in functie de ce concursuri apartin juratului
        items = Contest.objects.filter(juror__username=numeJurat)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(items, request)
        serializer = ContestSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class RoundAPIView(APIView):

    def post(self, request, id, format=None):
        numeJurat = request.user
        #doar daca apartine de acel concurs poate sa ii vada rundele
        try:
            contest = Contest.objects.get(pk=id, juror__username=numeJurat)
        except Contest.DoesNotExist:
            return Respons(status=401)
        # ce am primit de la post
        serializer = ContestSerializerPost(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            exist = Contest.objects.filter(pk=id, password=password).count()
            if exist == 0:
                # nu e parola corecta
                Juror.objects.filter(username=numeJurat).update(allow=0)
                return Response(status=401)
            else:
                # e parola corecta
                Juror.objects.filter(username=numeJurat).update(allow=1)
                runde = Round.objects.filter(contest_id=id)
                serializer2 = RoundSerializer(runde, many=True)
                return Response(serializer2.data)
        return Response(serializer.errors, status=404)


class SeriesAPIView(APIView):

    def get(self, request, id, format=None):
        numeJurat = request.user
        runda = Round.objects.get(pk=id)
        contestPK = runda.contest.id
        # trebuie sa verific ca juratul apartine concursului
        try:
            contest = Contest.objects.filter(pk=contestPK, juror__username=numeJurat)
        except Contest.DoesNotExist:
            return Response(status=401)
        # daca nu am introdus parola corecta
        jurat = Juror.objects.get(username=numeJurat)
        if jurat.allow == 0:
            return Response(status=401)
        # returnez seriile din runda id
        print(runda.allow)
        try:
            serie = Series.objects.filter(round_id=id)
            serializer = SeriesSerializer(serie, many=True)
            return Response(serializer.data)
        except Series.DoesNotExist:
            return Response(status=404)



class ParticipantAPIView(APIView):

    def get(self, request, id, format=None):
        numeJurat = request.user
        serie = Series.objects.get(pk=id)
        contestPK = serie.contest.id
        # trebuie sa verific ca juratul apartine concursului
        try:
            contest = Contest.objects.filter(pk=contestPK, juror__username=numeJurat)
        except Contest.DoesNotExist:
            return Response(status=401)
        # daca nu am introdus parola corecta
        jurat = Juror.objects.get(username=numeJurat)
        if jurat.allow == 0:
            return Response(status=401)
        # trimit lista cu participanti
        try:
            participanti = Participant.objects.filter(contests__id=contestPK,serie_id=id, status=1)
            serializer = ParticipantSerializer(participanti, many=True)
            return Response(serializer.data)
        except Participant.DoesNotExist:
            return Response(status=404)


class NoteAPIListView(APIView):

    def post(self, request, format=None):
        # trebuie sa verific ca e allow
        numeJurat = request.user
        nota = Note(jurat=numeJurat)
        serializer = NoteSerializer(nota, data=request.data)
        if serializer.is_valid():
            contestId = serializer.validated_data.get('contest_id')
            # verific daca apartine concursului si poate vota
            try:
                contest = Contest.objects.get(pk=contestId, juror__username=numeJurat)
            except Contest.DoesNotExist:
                return Response(status=401)
            pId = serializer.validated_data.get('participant_id')
            #verific daca participantul apartine concursului
            try:
                participant = Participant.objects.get(contests__id=contestId, pk=pId)
            except Participant.DoesNotExist:
                return Response(status=404)
            print(participant.round)
            #verific daca parola a fost corecta
            jurat = Juror.objects.get(username=numeJurat)
            if jurat.allow == 0:
                return Response(status=401)
            # luam notele
            ritm = serializer.validated_data.get('ritm')
            coregrafie = serializer.validated_data.get('coregrafie')
            corectitudine = serializer.validated_data.get('corectitudine')
            componentaArtistica = serializer.validated_data.get('componentaArtistica')
            # calculam notele
            procent = Grade.objects.get(contest_id_id=contestId)
            nota = procent.ritm * ritm
            nota = nota + procent.coregrafie * coregrafie
            nota = nota + procent.corectitudine * corectitudine
            nota = nota + procent.componentaArtistica * componentaArtistica
            nota = nota / 10
            print(nota)
            # facem update la nota veche
            notaVeche = participant.nota
            nota = nota + notaVeche
            # cati au votat participantul respectiv
            vote = participant.vote
            vote = vote + 1
            print(participant.vote)
            print(str(vote) + "dsadasd")
            # verific daca acel jurat a mai votat
            whoVoted = participant.whoVoted
            whoVotedPk = whoVoted.split()
            item = Juror.objects.get(contest__id=contestId, username=numeJurat)
            try:
                thing_index = whoVotedPk.index(str(item.id))
            except ValueError:
                thing_index = -1
            # daca nu a votat, il lasam sa voteze
            if thing_index == -1:
                Participant.objects.filter(contests__id=contestId, pk=pId).update(nota=nota)
                Participant.objects.filter(contests__id=contestId, pk=pId).update(vote=vote)
                whoVoted = whoVoted + " " + str(item.id)
                Participant.objects.filter(contests__id=contestId, pk=pId).update(whoVoted=whoVoted)
                return Response(serializer.data, status=201)
            return Response(status=401)  #nu are autorizatie sa mai voteze again
        return Response(serializer.errors, status=400)


class RezultatSerieAPIListView(APIView):
    def get(self, request, id, format=None):
        numeJurat = request.user
        serie = Series.objects.get(pk=id)
        contestId = serie.contest.id
        numeFisier = "serie"+str(id)
        # verific daca apartine concursului si poate vedea rezultatele
        try:
            contest = Contest.objects.get(pk=contestId, juror__username=numeJurat)
        except Contest.DoesNotExist:
            return Response(status=401)
        #verific daca parola a fost corecta
        jurat = Juror.objects.get(username=numeJurat)
        if jurat.allow == 0:
            return Response(status=401)
        # vedem cati jurati sunt la acel concurs
        jurors_no = Juror.objects.filter(contest__id=contestId).count()
        print(str(jurors_no) + "dada")
        # verific cati participanti au fost votati de toti juratii
        nrP = Participant.objects.filter(contests__id=contestId, vote=jurors_no, status=1, serie__id=id).count()
        # verific cati participanti sunt in runda aia
        nrPOn = Participant.objects.filter(contests__id=contestId, status=1, serie__id=id).count()
        print("votati de toti juratii pt serie:" + str(nrP))
        print("toti participant pt serie" + str(nrPOn))
        # daca au fost votati toti de toti juratii
        if nrP == nrPOn and nrP != 0:
            # problema ca trb ca juratul sa votezi pe toti
            # folosesc si current_round ca sa stiu cati elimin
            ordonatiDesc = Participant.objects.filter(contests__id=contestId, status=1, serie__id=id).order_by('-nota')
            numeFisier = "serie"+str(id)
            serializer = ParticipantRezSerializer(ordonatiDesc, many=True)
            print(ordonatiDesc)
            print(serializer.data)
            with open(numeFisier,'w') as json_file:
                json.dump(serializer.data, json_file)
            return Response(serializer.data)
        else:
            numeFisier = "serie"+str(id)
            nume = "./" + numeFisier
            print('wtfmerge')
            if os.path.isfile(nume) == True:
                with open(numeFisier) as json_file:
                    data = json.load(json_file)
                print(data)
                return Response(data)
            nimic = ""
            serializer = ParticipantRezSerializer(nimic, many=True)
            return Response(serializer.data)
        print(nrP)
        print(nrPOn)
        # cand nu sunt gata rezultate
        return Response(status=404)

class RezultatAPIListView(APIView):
    def get(self, request, id, format=None):
        numeJurat = request.user
        # verificare daca poate vedea rezultatele pentru concurs
        try:
            contest = Contest.objects.get(pk=id, juror__username=numeJurat)
        except Contest.DoesNotExist:
            return Response(status=401)
        # trebuie sa verific ca e pe allow
        runda = Round.objects.get(contest=id, round_no=contest.current_round)
        jurat = Juror.objects.get(username=numeJurat)
        if jurat.allow == 0:
            return Response(status=401)
        # aflu cati jurati sunt
        jurors_no = Juror.objects.filter(contest__id=id).count()
        # cati participanti au fost votati de toti juratii
        nrP = Participant.objects.filter(contests__id=id, vote=jurors_no, status=1).count()

        # cati participanti sunt in total
        P1 = Participant.objects.filter(contests__id=id)
        print(P1)
        nrPOn = Participant.objects.filter(contests__id=id, status=1).count()
        print("votati de toti juratii:" + str(nrP))
        print("toti participant" + str(nrPOn))
        if nrP == nrPOn and nrP != 0:
            elim_part = Participant.objects.filter(contests__id=id, status=1).order_by('nota')
            current_round = contest.current_round
            eliminate = runda.eliminate
            # le trec statusul pe 0 celor ce ii elimin
            sem = 0
            for e in elim_part:
                if sem < eliminate and e.status == 1:
                    e.status = 0
                    e.nota = 0
                    e.vote = 0
                    e.save()
                    print(str(e) + "      eliminat")
                    sem = sem + 1
                elif sem >= eliminate:
                    break
            ordonatiDesc = Participant.objects.filter(contests__id=id).order_by('-nota')
            # salvez in fisier
            numeFisier = "runda" + str(runda.round_no) + "concurs" + str(id)
            serializer = ParticipantRezSerializer(ordonatiDesc, many=True)
            with open(numeFisier,'w') as json_file:
                json.dump(serializer.data, json_file)
            # refac si trec mai departe
            current_round = current_round + 1
            if current_round > contest.round_nums:
                rundaNoua = runda
                current_round = current_round - 1
            else:
                rundaNoua = Round.objects.get(contest__id=id, round_no=current_round)
            Contest.objects.filter(pk=id).update(current_round=current_round)
            # Participant.objects.filter(contests__id=id).update(whoVoted='')
            # Participant.objects.filter(contests__id=id).update(vote=0)
            # Participant.objects.filter(contests__id=id).update(nota=0)
            # Participant.objects.filter(contests__id=id, round=runda, status=1).update(round=rundaNoua)
            updatePart = Participant.objects.filter(contests__id=id, round=runda, status=1)
            seriiNoi = rundaNoua.series_no
            sem = 1
            for part in updatePart:
                serieNoua = Series.objects.get(round=rundaNoua, jseries_no=sem)
                part.serie = serieNoua
                part.start_time = serieNoua.start_time
                part.end_time = serieNoua.end_time
                part.vote = 0
                part.whoVoted = ''
                part.nota = 0
                print(str(rundaNoua) + "    runda noua")
                print(str(serieNoua) + "    serie noua")
                part.round = rundaNoua
                part.save()
                print(str(part)+ "   participant")
                if sem % seriiNoi == 0:
                    sem = 1
                else:
                    sem = sem + 1
            return Response(serializer.data)
        else:
            print('wtfmergesiaici')
            rundaId = contest.current_round - 1
            numeFisier = "runda" + str(rundaId) + "concurs" + str(id)
            nume = "./" + numeFisier
            if os.path.isfile(nume) == True:
                with open(numeFisier) as json_file:
                    data = json.load(json_file)
                print(data)
                return Response(data)
            nimic = ""
            serializer = ParticipantRezSerializer(nimic, many=True)
            return Response(serializer.data)
        # cand nu sunt gata rezultate
        return Response(status=404)


# logica la allow, ar fi trb sa fie la jurat sau ceva de genul
