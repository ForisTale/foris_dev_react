import calculateDefaultLevel from "./calculateDefaultLevel";
import baseSkillsForRace from "../../../inventory/tec/baseSkillsForRace";

test("can estimate level", () => {
  const race = "Altmer";
  const baseSkills = baseSkillsForRace(race);
  baseSkills.Combat.marksman.default_value = 20;
  baseSkills.Stealth.sneak.default_value = 20;
  baseSkills.Stealth.alchemy.default_value = 20;

  expect(calculateDefaultLevel(race, baseSkills)).toBe(3);
});

test("return 1 when no changes in default", () => {
  const race = "Altmer";
  const baseSkills = baseSkillsForRace(race);

  expect(calculateDefaultLevel(race, baseSkills)).toBe(1);
});
