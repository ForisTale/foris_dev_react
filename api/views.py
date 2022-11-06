from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from django.core.mail import send_mail
from smtplib import SMTPException


def get_urls(request):
    return JsonResponse({"contact": reverse("api:contact")})


def contact(request):
    if request.method == "POST":
        try:
            email_message = f"Subject: {request.POST.get('subject')}\nEmail: {request.POST.get('email')} " \
                            f"\nMessage: {request.POST.get('message')}"
            send_mail("Message from foris.dev", email_message, "",
                      ["foris.dev@gmail.com"])
            return JsonResponse({"message": "Message was sent!"})
        except SMTPException:
            return JsonResponse(
                {"message": "Service is unavailable at the moment. <br/>Please try a different method of contact."},
                status=503,
            )
    else:
        return HttpResponse(status=405)
