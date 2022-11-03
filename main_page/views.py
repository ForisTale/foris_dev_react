from django.shortcuts import render
import os


def frontend(request):
    context = {}
    if os.getenv("functional_testing"):
        with open("functional_tests/hook_browser_console.js") as file:
            code = file.read()
        one_line_code = code.replace("\n", "")
        context["functional_testing"] = one_line_code

    return render(request, "index.html", context)
