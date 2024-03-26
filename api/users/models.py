import os

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import signals
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from rest_framework.authtoken.models import Token


class CustomUser(AbstractUser):
    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="users/avatar", null=True)
    
    class Meta:
        db_table = "User"
        verbose_name_plural = "Users"


@receiver(signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)