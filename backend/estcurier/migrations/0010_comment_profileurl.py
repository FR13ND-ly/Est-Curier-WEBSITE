# Generated by Django 3.2.3 on 2021-09-18 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estcurier', '0009_comment_list_listitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='profileUrl',
            field=models.TextField(null=True),
        ),
    ]
