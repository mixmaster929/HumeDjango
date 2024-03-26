import dataclasses

from requests import exceptions
from rest_framework import status, viewsets
from rest_framework.response import Response
from users.permissions import UserPermission

from .hume_ai import HumeAPI
from .models import ImageFile
from .permissions import MediaPermission
from .serializers import ImageFileSerializer

API_KEY = "9qrnabcLfniBOgBF8iyhu21pcAwCXv4sTIB7ose7V7ShJuFn"

class MediaViewSet(viewsets.ModelViewSet):
    queryset = ImageFile.objects.all()
    serializer_class = ImageFileSerializer
    permission_classes = [UserPermission, MediaPermission]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        api = HumeAPI(API_KEY)
        try:
            job_id, predictions = api.parse_image(serializer.instance.file.name)
            predicted_image = predictions.draw_rectangles()
            return Response({"job_id": job_id, "predictions": dataclasses.asdict(predictions), "image": predicted_image}, status=status.HTTP_200_OK)
        except (exceptions.ReadTimeout, exceptions.ConnectionError):
            return Response({"error": "Request Time Out! Try Again Later"}, status=status.HTTP_400_BAD_REQUEST)
        