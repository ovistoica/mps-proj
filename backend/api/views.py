from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import ContestSerializer, JurorSerializer, RoundSerializer, SeriesSerializer, ParticipantSerializer, GradeSerializer
from api.models import Contest, Juror, Round, Series, Participant, Grade


class ContestAPIView(APIView):

    def get(self, request, id, format=None):
        try:
            item = Contest.objects.get(pk=id)
            serializer = ContestSerializer(item)
            return Response(serializer.data)
        except Contest.DoesNotExist:
            return Response(status=404)

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
        items = Contest.objects.all()
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

    def get(self, request, id, format=None):
        try:
            item = Round.objects.get(pk=id)
            serializer = RoundSerializer(item)
            return Response(serializer.data)
        except Round.DoesNotExist:
            return Response(status=404)

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
        try:
            item = Series.objects.get(pk=id)
            serializer = SeriesSerializer(item)
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
        try:
            item = Participant.objects.get(pk=id)
            serializer = ParticipantSerializer(item)
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
