# Generated by Django 3.2.3 on 2021-09-18 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estcurier', '0006_auto_20210917_2213'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(upload_to=''),
        ),
    ]
