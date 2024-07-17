# Generated by Django 5.0.6 on 2024-05-21 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0005_alter_property_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='image1',
            field=models.ImageField(blank=True, upload_to='uploads/properties'),
        ),
        migrations.AddField(
            model_name='property',
            name='image2',
            field=models.ImageField(blank=True, upload_to='uploads/properties'),
        ),
        migrations.AddField(
            model_name='property',
            name='image3',
            field=models.ImageField(blank=True, upload_to='uploads/properties'),
        ),
        migrations.AddField(
            model_name='property',
            name='image4',
            field=models.ImageField(blank=True, upload_to='uploads/properties'),
        ),
        migrations.AlterField(
            model_name='property',
            name='image',
            field=models.ImageField(blank=True, upload_to='uploads/properties'),
        ),
    ]