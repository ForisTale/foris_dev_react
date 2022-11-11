from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from django.core.mail import send_mail
from smtplib import SMTPException
from utils.check_recaptcha import check_recaptcha
import json


def get_urls(request):
    return JsonResponse({"contact": reverse("api:contact")})


@check_recaptcha()
def contact(request):
    if request.method == "POST":
        try:
            body_unicode = request.body.decode('utf-8')
            received_json = json.loads(body_unicode)
            email_message = f"Subject: {received_json.get('subject')}\nEmail: {received_json.get('email')} " \
                            f"\nMessage: {received_json.get('message')}"
            send_mail("Message from foris.dev", email_message, "",
                      ["foris.dev@gmail.com"])
            return JsonResponse({"message": "Message was sent!"})
        except SMTPException:
            return JsonResponse(
                {"message": ["Service is unavailable at the moment.", "Please try a different method of contact."]},
                status=503,
            )
    else:
        return HttpResponse(status=405)
