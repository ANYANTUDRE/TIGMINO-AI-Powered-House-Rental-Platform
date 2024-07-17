from typing import Iterable
import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
from django.core.mail import send_mail
import logging
logger = logging.getLogger(__name__)


class CustomUserManager(UserManager):
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not specified a valid e-mail address")
    
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.ImageField(upload_to='uploads/avatars')
    
    username = models.CharField(max_length=255, unique=True, blank=True, null=True)  # new field
    city = models.CharField(max_length=255, blank=True, null=True)  # new field
    phone = models.CharField(max_length=20, blank=True, null=True)  # new field

    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username', 'city', 'phone']  # updated this line

    def avatar_url(self):
        if self.avatar:
            return f'{settings.WEBSITE_URL}{self.avatar.url}'
        else:
            return ''


class Contact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True, null=True)  # new field
    email = models.EmailField()
    query_text = models.TextField()  # new field
    add_time = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        
        send_mail(
            "Contact Query",
            "Here is the message.",
            "nyantudrealban@gmail.com",
            [self.email],
            fail_silently=False,
            html_message=f'''<html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Test Email</title>
                            </head>
                            <body>
                            <div class="main-container">
                                <div class="container">
                                    <div class="header">
                                        
                                    </div>
                                    <div class="content">
                                        Thank you {self.name} for your message : {self.query_text}.
                                        A member of the team will contact you as soon as possible.
                                    </div>
                                    <div class="footer">
                                        <p>TIGMINO team.</p>
                                    </div>
                                </div>
                            </div>
                            </body>
                            </html>
                            '''
        )
        return super().save(*args, **kwargs)


    def __str__(self) -> str:
        return self.query_text
