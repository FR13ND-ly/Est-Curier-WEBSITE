# Generated by Django 3.2.3 on 2021-09-18 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estcurier', '0011_rename_profileurl_comment_photourl'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='activateArticlesWithSameTopic',
            field=models.BooleanField(default=True),
        ),
    ]
