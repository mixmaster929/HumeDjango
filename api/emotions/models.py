import os

from django.core.exceptions import ValidationError
from django.db import models
from users.models import CustomUser


def validate_file_type(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.avi', '.mkv']

    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension. Supported extensions are: jpg, jpeg, png, gif, mp4, avi, mkv')
    
    
class ImageFile(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    file = models.FileField(upload_to='images/', validators=[validate_file_type])
    content_type = models.CharField(max_length=150, null=True)
    md5sum = models.CharField(max_length=32, null=True)


class AnalysisJob(models.Model):
    identifier = models.CharField(max_length=120)
    media = models.ForeignKey(ImageFile, on_delete=models.CASCADE)


