from rest_framework import serializers
from .models import Property, Reservation
from useraccount.serializers import UserDetailSerializer


class PropertiesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'description',
            'price_per_night',

            'category',

            'image_url',

            # new adding
            'image1_url',
            'image2_url',
            'image3_url',
            'image4_url',

            'bedrooms',
            'bathrooms',
            'guests',
            'landlord',

            'city',
            'area',  # new added
        )


class PropertiesDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True, many=False)

    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'description',
            'price_per_night',

            'category',

            'image_url',
            'bedrooms',
            'bathrooms',
            'guests',
            'landlord',

            'city',
            'area',  # new added
        )


class ReservationsListSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer(read_only=True, many=False)
    
    class Meta:
        model = Reservation
        fields = (
            'id', 'start_date', 'end_date', 'number_of_nights', 'total_price', 'property', 
        )