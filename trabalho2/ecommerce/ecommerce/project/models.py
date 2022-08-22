from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Usuario(AbstractUser):
    username = None
    admin = models.ForeignKey('Usuario', null=True, blank=True, on_delete=models.CASCADE, db_column='fk_admin_id')
    email = models.EmailField('email_address', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
