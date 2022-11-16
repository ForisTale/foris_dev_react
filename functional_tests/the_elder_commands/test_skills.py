from .tec_base import FunctionalTest
from selenium.webdriver.common.by import By
import json
from pathlib import Path


class SkillsTest(FunctionalTest):
    def setUp(self):
        super().setUp()

        path_for_default_skills = Path.cwd() / "frontend" / "src" / "inventory" / "tec" / "defaultSkills.json"
        with open(path_for_default_skills, "r", encoding="utf-8") as file:
            self.default_skills = json.load(file)

        # Foris open The Elder Commands skills webpage
        self.driver.get(self.live_server_url + "/skills")

    def test_looks_and_values(self):
        # On the page he sees race button
        reset_button = self.wait_for(lambda: self.driver.find_element(By.ID, "reset_race"))
        self.assertEqual(reset_button.text, "Reset & Change Race")

        # with selected race
        race = self.driver.find_element(By.ID, "selected_race")
        self.assertEqual(race.text, "Selected race: Nord")

        # There is also skills list category,
        for skill_category, skills_group in self.default_skills.items():
            categories_in_table = self.driver.find_elements(By.TAG_NAME, "th")
            categories_in_table = [data.text for data in categories_in_table]

            self.assertIn(skill_category, categories_in_table)

            # with skills,
            skills_in_tables = self.driver.find_elements(By.TAG_NAME, "td")
            skills_in_tables = [data.text for data in skills_in_tables]

            for skill, details in skills_group.items():
                self.assertIn(details.get("name"), skills_in_tables)

                # that every one have some values.
                skill_value = 15
                if skill == "twohanded":
                    skill_value += 10
                elif skill in ["block", "lightarmor", "onehanded", "smithing", "speechcraft"]:
                    skill_value += 5
                base_value = self.driver.find_element(By.ID, f"{skill}_base")
                self.assertEqual(base_value.get_property("value"), str(skill_value))

                # There are empty checkboxes next to values
                self.assertEqual(
                    self.driver.find_element(By.ID, f"{skill}_multiplier").get_property("checked"),
                    False
                )

                # and place for skill new value.
                self.assertEqual(
                    self.driver.find_element(By.ID, f"{skill}_desired").get_property("value"),
                    ""
                )

        # Below is adjustment multiplier
        self.assertEqual(
            self.driver.find_element(By.ID, "multiplier").get_property("value"),
            "1"
        )

        # next to it are two boxes, one with calculated lvl and estimated desired level
        self.assertEqual(
            self.driver.find_element(By.ID, "base_level").text,
            "Base level: 1"
        )
        self.assertEqual(
            self.driver.find_element(By.ID, "estimated_desired_level").text,
            "Estimated desired level: 1"
        )

        # and other with desired lvl.
        self.assertEqual(
            self.driver.find_element(By.ID, "desired_level").get_property("value"),
            ""
        )

        # Next to desired lvl is button to fill skills
        self.assertEqual(
            self.driver.find_element(By.ID, "fill_skills").text,
            "Fill skills to desired level"
        )

        # On the bottom is button to generate commands.
        self.assertEqual(
            self.driver.find_element(By.ID, "generate_commands").text,
            "Generate Commands"
        )
