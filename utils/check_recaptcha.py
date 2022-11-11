import requests as recaptcha_request
from django.http import JsonResponse
from django.conf import settings
import json


def check_recaptcha():
    def decorator(func):
        def wrapper(request):
            body_unicode = request.body.decode('utf-8')
            received_json = json.loads(body_unicode)

            recaptcha_data = {"response": received_json.get("recaptcha"),
                              "secret": settings.RECAPTCHA_SECRET_KEY}
            recaptcha_response = recaptcha_request.post("https://www.google.com/recaptcha/api/siteverify",
                                                        recaptcha_data)
            result = json.loads(recaptcha_response.content)
            if result.get("success") and result.get("score") >= 0.4:
                return func(request)
            else:
                return JsonResponse({"message": "It looks like you're a bot. If not, contact me the other way."})
        return wrapper
    return decorator
