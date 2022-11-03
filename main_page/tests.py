import random
import string
import os

from django.test import TestCase
from django.urls import reverse
from django.http import JsonResponse


class MainPageViewTest(TestCase):

    def test_different_urls_use_same_template(self):
        urls = ["/", reverse("main_page:about-me"), "/test/test"]
        for num in range(4):
            urls.append("/"+"".join(random.choices(string.ascii_letters + string.digits, k=6)))
        for url in urls:
            response = self.client.get(url)
            self.assertTemplateUsed(response, "index.html", msg_prefix=f"{url}")

    def test_normal_url_pass_context_when_testing(self):
        os.environ["functional_testing"] = "True"
        response = self.client.get("/")
        self.assertIsNotNone(response.context.get("functional_testing"))

    def test_normal_url_dont_pass_functional_testing_when_not_testing(self):
        response = self.client.get("/")
        self.assertIsNone(response.context.get("functional_testing"))

    def test_api_use_JsonResponse(self):
        url = reverse("api:get_urls")
        response = self.client.get(url)
        self.assertIsInstance(response, JsonResponse)
