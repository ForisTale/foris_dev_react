from django.http import JsonResponse, HttpResponse, FileResponse
from django.urls import reverse
from django.core.mail import send_mail
from django.utils import html
from smtplib import SMTPException
from utils.check_recaptcha import check_recaptcha
import json
from io import BytesIO


def get_urls(request):
    return JsonResponse({"contact": reverse("api:contact")})


@check_recaptcha()
def contact(request):
    if request.method == "POST":
        try:
            body_unicode = request.body.decode('utf-8')
            received_json = json.loads(body_unicode)
            subject = html.escape(received_json.get("subject"))
            email = html.escape(received_json.get("email"))
            message = html.escape(received_json.get("message"))
            email_message = f"Subject: {subject}\nEmail: {email}\nMessage: {message}"
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


def commands_download(request):
    if request.method == "POST":
        commands_stringify = request.POST.get("commands")
        commands = json.loads(commands_stringify)
        content = "\n".join(commands)
        encoded = content.encode("utf-8")
        file = BytesIO(encoded)
        return FileResponse(file, as_attachment=True, filename="TEC_Commands.txt")
    return HttpResponse(status=405)
