from functional_tests.base import FunctionalTest
from selenium.webdriver.common.by import By
from unittest.mock import patch


class MainPageBasicTest(FunctionalTest):
    def setUp(self):
        super().setUp()
        # Foris visit his new website.
        self.driver.get(self.live_server_url)

    def check_link_send_to_correct_url(self, link_text, url_ending):
        self.driver.find_element(By.LINK_TEXT, link_text).click()
        current_url = self.driver.current_url
        desired_url = self.live_server_url + url_ending
        self.assertEqual(current_url, desired_url)

    def test_has_basic_functionality(self):
        # On page title is its website name
        self.assertEqual(self.driver.title, "Foris.dev")

        # In navigation bar there is link to main site and about me page
        links = self.driver.find_elements(By.TAG_NAME, "a")
        links = [link.text for link in links]
        self.assertIn("Foris.dev", links)
        self.assertIn("About Me", links)

        # He clicked on about me
        self.check_link_send_to_correct_url("About Me", "/about-me")

        # There is basic description about him
        # And sees links to his GitHub, and other sites
        all_links = self.driver.find_elements(By.TAG_NAME, "li")
        all_links = [link.text for link in all_links]
        self.assertIn("GitHub", all_links)

        # Satisfied he clicked on main site link and is back to main site.
        self.driver.find_element(By.LINK_TEXT, "Foris.dev").click()
        self.assertEqual(self.driver.current_url, self.live_server_url + "/")

    def test_can_go_to_the_elder_commands_and_back(self):

        # He spotted new link to TEC, decided to visit it.
        self.check_link_send_to_correct_url("The Elder Commands", "/tec")

        # Everything looks ok, so he come back to main site by link.
        self.check_link_send_to_correct_url("Foris.dev", "/")

    @patch("api.views.send_mail")
    def test_contact_allow_to_send_email_to_administrator(self, mock_send_email):
        # Foris want sent message to page admin,
        # so he clicked contact
        self.wait_for(lambda: self.driver.find_element(By.LINK_TEXT, "Contact").click())
        self.wait_for(lambda: self.assertEqual(self.driver.current_url, self.live_server_url + "/contact"))

        # there he sees contact form so he filled it
        self.wait_for(lambda: self.driver.find_element(By.ID, "formEmail").send_keys("test@test.com"))
        self.driver.find_element(By.ID, "formSubject").send_keys("Subject")
        self.driver.find_element(By.ID, "formMessage").send_keys("Message")

        # then send it
        self.driver.find_element(By.CLASS_NAME, "btn").click()

        self.wait_for(lambda: mock_send_email.assert_called_once())

        # now he sees message that massage was send
        message = self.wait_for(lambda: self.driver.find_element(By.CLASS_NAME, "messages").text)
        self.assertIn("Message was sent!", message)
