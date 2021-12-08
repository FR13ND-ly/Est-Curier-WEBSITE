# Generated by Django 3.2.3 on 2021-09-18 11:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('estcurier', '0008_article_subtitle'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.TextField(null=True)),
                ('text', models.TextField(null=True)),
                ('article', models.TextField(null=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=True, max_length=200)),
                ('user', models.TextField(null=True)),
                ('public', models.BooleanField(default=False)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('removable', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='ListItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('List', models.TextField(null=True)),
                ('article', models.TextField(null=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
