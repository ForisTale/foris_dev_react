from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch
from smtplib import SMTPException
import json


class ApiViewTest(TestCase):
    base_url = "/api/"

    def test_api_provide_urls_endpoints(self):
        expected = {
            "contact": reverse("api:contact"),
        }
        response = self.client.get(self.base_url)
        self.assertEqual(
            json.loads(response.content.decode("utf-8")),
            expected
        )


class ApiContactTest(TestCase):
    base_url = "/api/contact"

    @patch("api.views.send_mail")
    def test_can_send_message(self, mock_send_email):
        post = {"subject": "Test", "email": "test@test.com", "message": "Message"}
        response = self.client.post(self.base_url, post)
        mock_send_email.assert_called_once()
        mock_send_email.assert_called_with(
            "Message from foris.dev",
            "Subject: Test\nEmail: test@test.com \nMessage: Message",
            "",
            ['foris.dev@gmail.com'],
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode("utf-8")), {"message": "Message was sent!"})

    @patch("api.views.send_mail")
    def test_can_handle_sending_error(self, mock_send_email):
        def raise_error(*args):
            raise SMTPException()

        mock_send_email.side_effect = raise_error
        post = {"subject": "Test", "email": "test@test.com", "message": "Message"}
        response = self.client.post(self.base_url, post)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode("utf-8")),
                         {"message": "Something went wrong! \nPlease try a different method of contact."})

    def test_get_request_return_code_405(self):
        response = self.client.get(self.base_url)
        self.assertEqual(response.status_code, 405)

