from django.contrib.auth import views
from django.urls import reverse
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.db.models import Q
from project.models import Usuario
from ecommerce.auth.forms import registerForm, CreateStudentForm
from ecommerce.mailer import alert_staff, send_email
from logger.functions import log_event
from logger.models import LogEvents
from django.contrib.auth.models import Group

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

user = get_user_model()

class PasswordChangeView(views.PasswordChangeView):
    def post(self, request):
        response = super().post(request)

        if response.status_code == 302:
            send_email(request.user.email, 2, {
                'user': request.user
            })

        log_event(request, LogEvents.USER_CHANGED_PASSWORD)

        return response


class UserLoginView(views.LoginView):
    def post(self, request):
        response = super().post(request)

        # username = request.POST['username'].strip() utilizar com log
        if response.status_code == 302:
            pass
            # log_event(request, LogEvents.USER_LOGGED_IN, description=username)
        else:
            # user = None utilizar com log
            try:
                pass
                # user = User.objects.get(email=username)  utilizar com o log
            except User.DoesNotExist:
                pass

            # log_event(request, LogEvents.USER_FAILED_LOGIN, user=user, description=username)

        return response

    def get_success_url(self):
        return reverse('home')


def createUserView(request):

    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('home'))

    form = registerForm()

    if request.method == "POST":
        form = registerForm(request.POST)
        if form.is_valid():

            user = form.save(commit=False)
            user.is_active = False

            user.save()
            alert_staff(1, {'first_name': form.cleaned_data['first_name'],
                            'last_name': form.cleaned_data['last_name'],
                            'email': form.cleaned_data['email'],
                            'link': request.META['HTTP_HOST'] + '/admin/auth/user/'})

            return HttpResponseRedirect(reverse('user_created'))

    context = {'form': form}

    return render(request, 'registration/create_user.html', context)


def userCreatedView(request):
    return render(request, 'registration/user_created.html')