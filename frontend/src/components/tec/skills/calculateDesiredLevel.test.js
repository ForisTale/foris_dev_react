import calculateDesiredLevel from "./calculateDesiredLevel";
import baseSkillsForRace from "../../../inventory/tec/baseSkillsForRace";

test("can estimate desired level", () => {
  const race = "Altmer";
  const skills = baseSkillsForRace(race);
  skills.Combat.marksman.desired_value = 20;
  skills.Stealth.sneak.desired_value = 20;
  skills.Stealth.alchemy.desired_value = 20;

  expect(calculateDesiredLevel(race, skills)).toBe(3);
});

test("return 1 when no changes in default", () => {
  const race = "Altmer";
  const baseSkills = baseSkillsForRace(race);

  expect(calculateDesiredLevel(race, baseSkills)).toBe(1);
});

test("take in account base skills when calculate desired level", () => {
  const race = "Altmer";
  const baseSkills = baseSkillsForRace(race);
  baseSkills.Combat.marksman.desired_value = 20;
  baseSkills.Stealth.sneak.desired_value = 20;
  baseSkills.Stealth.alchemy.desired_value = 20;
  baseSkills.Combat.block.default_value = 50;

  expect(calculateDesiredLevel(race, baseSkills)).toBe(8);
});