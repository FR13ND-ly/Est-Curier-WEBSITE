# Generated by Django 3.2.3 on 2021-10-20 05:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('estcurier', '0022_rename_neldenable_article_unlisted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='unlisted',
        ),
    ]
