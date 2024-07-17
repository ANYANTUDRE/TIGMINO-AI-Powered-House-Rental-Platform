from rest_framework import serializers
from .models import User, Contact

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'name', 'avatar_url', 'email', 'date_joined', 'last_login',
            'username', 'city', 'phone',  # new fields
        )


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ( 'id', 'name', 'email', 'query_text' )
