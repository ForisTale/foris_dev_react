from django.urls import path
from api import views

app_name = "api"

urlpatterns = [
    path("", views.get_urls, name="get_urls"),
    path("contact", views.contact, name="contact"),
    path("commands-download", views.commands_download, name="commands_download"),
]
