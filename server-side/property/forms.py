from django.forms import ModelForm
from .models import Property


class PropertyForm(ModelForm):
    class Meta:
        model = Property
        fields = (
            'title',
            'description',
            'price_per_night',
            'bedrooms',
            'bathrooms',
            'guests',
            'image',

            #new adding
            'image1',
            'image2',
            'image3',
            'image4',

            'city',
            'area',

            'category',
        )