from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.firefox.options import Options
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from invoke import Context

from .remote_tools import reset_database

import os
import time

MAX_WAIT = 2
SCREEN_DUMP_LOCATION = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "screendumps"
)


def wait(fn):
    def modified_fn(*args, **kwargs):
        start_time = time.time()
        while True:
            try:
                return fn(*args, **kwargs)
            except (AssertionError, WebDriverException, IndexError) as e:
                if time.time() - start_time > MAX_WAIT:
                    raise e
                else:
                    time.sleep(0.1)
    return modified_fn


class FunctionalTest(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        context = Context()
        with context.cd(".\\frontend"):
            context.run("npm run build")

    def setUp(self):
        options = Options()
        options.headless = True
        options.binary_location = "C:\\Program Files\\Firefox Developer Edition\\firefox.exe"
        self.driver = webdriver.Firefox(options=options)
        self.staging_server = os.environ.get("STAGING_SERVER")
        if self.staging_server:
            self.live_server_url = "http://" + self.staging_server
            reset_database(self.staging_server)
            time.sleep(1)

    def tearDown(self):
        if self._test_has_failed():
            if not os.path.exists(SCREEN_DUMP_LOCATION):
                os.makedirs(SCREEN_DUMP_LOCATION)
            for ix, handle in enumerate(self.driver.window_handles):
                self._windowid = ix
                self.driver.switch_to.window(handle)
                self.take_screenshot()
                self.dump_html()
        self.driver.quit()
        super().tearDown()

    def _test_has_failed(self):
        return any(error for (method, error) in self._outcome.errors)

    def take_screenshot(self):
        filename = self._get_filename() + ".png"
        print("screenshotting to", filename)
        self.driver.get_screenshot_as_file(filename)

    def dump_html(self):
        filename = self._get_filename() + ".html"
        print("dumping page HTML to", filename)
        with open(filename, "w") as f:
            f.write(self.driver.page_source)

    def _get_filename(self):
        return "{folder}/{classname}.{method}-window-{windowid}".format(
            folder=SCREEN_DUMP_LOCATION,
            classname=self.__class__.__name__,
            method=self._testMethodName,
            windowid=self._windowid,
        )

    @wait
    def wait_for(self, fn):
        return fn()

    @staticmethod
    def extra_time_to_load_js(seconds):
        time.sleep(seconds)
