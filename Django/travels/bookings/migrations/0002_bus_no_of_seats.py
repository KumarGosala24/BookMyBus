# Generated by Django 5.2.1 on 2025-05-28 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bus',
            name='no_of_seats',
            field=models.PositiveIntegerField(default=50),
            preserve_default=False,
        ),
    ]
