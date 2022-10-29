from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.conf import settings
from utils.check_recaptcha import check_recaptcha


class FakeResponse:
    def __init__(self, content):
        self.content = content


class FakeRequest:
    def __init__(self, data):
        self.POST = data
        self.session = {}


def MessagesSystem():
    pass


class CheckRecaptchaTest(TestCase):

    @staticmethod
    @patch("utils.check_recaptcha.recaptcha_request")
    @patch("utils.check_recaptcha.HttpRequest")
    def make_request(content, http_request_patch, recaptcha_request_patch):
        recaptcha_request_patch.post.return_value = FakeResponse(content)
        http_request_patch.build_absolute_uri.return_value = "url"
        request_data = {"g-recaptcha-response": "response",
                        "secret": settings.RECAPTCHA_SECRET_KEY}

        func = MagicMock()
        request = FakeRequest(request_data)

        check_recaptcha("contact")(func)(request)

        return {"recaptcha_request_patch": recaptcha_request_patch, "function": func, "request": request}

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
        request = returns.get("request")

        message = MessagesSystem(request).pop_contact()
        self.assertEqual(message, ["It looks like you're a bot. If not, contact me the other way. url"])
