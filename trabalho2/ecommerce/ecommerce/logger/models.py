from django.db import models
from project.models import Usuario
from django.utils.translation import gettext_lazy as _U

class LogEvents(models.IntegerChoices):
    USER_LOGGED_IN = 1, _U('Usuário fez login')
    USER_LOGGED_OUT = 2, _U('Usuário fez logout')  # TODO not logged anywhere yet
    USER_CHANGED_PASSWORD = 3, _U('Usuário mudou a senha')
    USER_CREATED = 4, _U('Usuário criado')
    USER_FAILED_LOGIN = 5, _U('Usuário falhou no login')
    USER_ASKED_FOR_PASSWORD_RESET = 6, _U('Usuário pediu redefinição de senha')  # TODO not logged anywhere yet
    USER_RESET_PASSWORD = 7, _U('Usuário redefiniu senha')  # TODO not logged anywhere yet

class Log(models.Model):
    id = models.AutoField(primary_key=True)
    ip = models.GenericIPAddressField()
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
    time = models.DateTimeField(auto_now_add=True)
    event = models.IntegerField(choices=LogEvents.choices)
    description = models.CharField(max_length=300, null=True)

# Inserir antes de usar TODO
# INSERT INTO email_types VALUES(1, 'Novo usuário aguardando ativação', 'email_new_user')
# INSERT INTO email_types VALUES(2, 'Sua conta foi ativada', 'email_account_activated')
# INSERT INTO email_types VALUES(3, 'Sua senha foi alterada', 'email_password_changed')


class EmailTypes(models.Model):
    email_type = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=150)
    template_name = models.CharField(max_length=150)

    class Meta:
        managed = True
        db_table = 'email_types'