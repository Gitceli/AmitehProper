# Generated by Django 5.0.7 on 2025-05-05 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0002_carouselslide_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carouselslide',
            name='color',
            field=models.CharField(default='bg-blue-600', help_text='Background color class (e.g., bg-blue-600)', max_length=50),
        ),
    ]
