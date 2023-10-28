"""
Tests for User APIs.
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core import mail

from rest_framework.test import APIClient
from rest_framework import status


urls = {
    "CREATE_USER_URL": '127.0.0.1:8000/auth/users/',
    "MAIL_ACTIVATION_URL": '127.0.0.1:8000/auth/users/activation/',
    "LOGIN_URL": '127.0.0.1:8000/auth/jwt/create/',
    "TOKEN_REFRESH_URL": '127.0.0.1:8000/auth/jwt/refresh/',
    "RESET_PASSWORD_URL": '127.0.0.1:8000/auth/users/reset_password/',
    "RESET_PASSWORD_CONFIRM_URL": '127.0.0.1:8000/auth/users/reset_password_confirm/',

}




class PublicUserAPITests(TestCase):
    """Tests class for public user api."""

    def setUp(self):
        self.client = APIClient()

    def test_create_new_user(self):
        """Test for creating a new user."""
        payload = {
            'email': 'example@example.com',
            'name': 'New Name',
            'password': 'TestingPassword',
            're_password': 'TestingPassword'
        }

        response = self.client.post(urls["CREATE_USER_URL"], payload)

        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=payload['email'])
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', response.data)
