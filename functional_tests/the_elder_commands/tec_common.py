from .tec_base import FunctionalTest
from selenium.webdriver.common.by import By


class DefaultLookTest(FunctionalTest):
    def setUp(self):
        super().setUp()
        self.driver.get(self.live_server_url)

    def test_base_looks(self):
        # And in title Foris sees website name.
        self.wait_for(lambda: self.assertEqual(self.driver.title, "The Elder Commands"))

        # Then he sees bar with categories,
        header = self.driver.find_element(By.TAG_NAME, "header")
        links = [link.text for link in header.find_elements(By.TAG_NAME, "a")]
        categories = ["Foris.dev", "Home", "Skills", "Items", "Spells", "Other", "Plugins", "Commands"]
        self.assertListEqual(links, categories)

