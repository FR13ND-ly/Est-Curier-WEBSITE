# Generated by Django 3.2.3 on 2021-10-20 05:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('estcurier', '0021_auto_20211010_2142'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='neldenable',
            new_name='unlisted',
        ),
    ]
