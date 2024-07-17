from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer
import logging

logger = logging.getLogger(__name__)

class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        logger.debug("Request data: %s", request.data)
        return super().create(request, *args, **kwargs)
