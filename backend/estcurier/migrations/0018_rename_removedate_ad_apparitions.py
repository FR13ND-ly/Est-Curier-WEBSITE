# Generated by Django 3.2.3 on 2021-10-06 05:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('estcurier', '0017_ad'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ad',
            old_name='removeDate',
            new_name='apparitions',
        ),
    ]
