from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.conf import settings
from utils.check_recaptcha import check_recaptcha
import json


class FakeResponse:
    def __init__(self, content):
        self.content = content


class FakeRequest:
    def __init__(self, data):
        self.body = json.dumps(data).encode("utf-8")


class CheckRecaptchaTest(TestCase):

    @staticmethod
    @patch("utils.check_recaptcha.recaptcha_request")
    def make_request(content, recaptcha_request_patch):
        recaptcha_request_patch.post.return_value = FakeResponse(content)
        request_data = {"recaptcha": "response",
                        "secret": settings.RECAPTCHA_SECRET_KEY}

        func = MagicMock()
        request = FakeRequest(request_data)

        response = check_recaptcha()(func)(request)

        return {"recaptcha_request_patch": recaptcha_request_patch, "function": func, "response": response}

    def test_recaptcha_request_validation(self):
        returns = self.make_request(b'{"success": true, "score": 0.4}')
        recaptcha_request_patch = returns.get("recaptcha_request_patch")
        func = returns.get("function")

        func.assert_called_once()
        recaptcha_request_patch.post.assert_called_once()

        expected_data = {"response": "response",
                         "secret": settings.RECAPTCHA_SECRET_KEY}
        recaptcha_request_patch.post.assert_called_with("https://www.google.com/recaptcha/api/siteverify",
                                                        expected_data)

    def test_recaptcha_run_function_not_called_on_low_score(self):
        returns = self.make_request(b'{"success": true, "score": 0.3}')
        recaptcha_request_patch = returns.get("recaptcha_request_patch")
        func = returns.get("function")

        recaptcha_request_patch.post.assert_called_once()
        func.assert_not_called()

    def test_recaptcha_will_give_message_to_site_on_failure(self):
        returns = self.make_request(b'{"success": true, "score": 0.3}')
        response = returns.get("response")

        self.assertEqual(
            json.loads(response.content),
            {"message": "It looks like you're a bot. If not, contact me the other way."})
