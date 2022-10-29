from django.urls import path
from main_page.views import frontend


app_name = "main_page"

urlpatterns = [
    path("about-me", frontend, name="about-me"),
]