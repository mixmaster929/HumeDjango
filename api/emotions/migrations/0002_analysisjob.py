# Generated by Django 5.0 on 2024-01-17 21:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emotions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnalysisJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identifier', models.CharField(max_length=120)),
                ('media', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emotions.imagefile')),
            ],
        ),
    ]