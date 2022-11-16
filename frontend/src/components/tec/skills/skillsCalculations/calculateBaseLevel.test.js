import calculateBaseLevel from "./calculateBaseLevel";
import baseSkillsForRace from "../../../../inventory/tec/baseSkillsForRace";


describe("testing calculate base level", () => {

  test("can estimate level", () => {
    const race = "Altmer";
    const baseSkills = baseSkillsForRace(race);
    baseSkills.Combat.marksman.default_value = 20;
    baseSkills.Stealth.sneak.default_value = 20;
    baseSkills.Stealth.alchemy.default_value = 20;

    expect(calculateBaseLevel(race, baseSkills)).toBe(3);
  });

  test("return 1 when no changes in default", () => {
    const race = "Altmer";
    const baseSkills = baseSkillsForRace(race);

    expect(calculateBaseLevel(race, baseSkills)).toBe(1);
  });

  test("correctly calculate when some values are not a numbers", () => {
    const race = "Altmer";
    const baseSkills = baseSkillsForRace(race);
    baseSkills.Combat.block.default_value = "%%";
    baseSkills.Combat.marksman.default_value = "20";
    baseSkills.Stealth.sneak.default_value = "20";
    baseSkills.Stealth.alchemy.default_value = "20";

    expect(calculateBaseLevel(race, baseSkills)).toBe(3);
  });

  test("ignore base values when they are smaller than default", () => {
    const race = "Altmer";
    const baseSkills = baseSkillsForRace(race);
    baseSkills.Combat.marksman.default_value = "0";
    baseSkills.Combat.smithing.default_value = "100";
    baseSkills.Stealth.sneak.default_value = "0";
    baseSkills.Stealth.alchemy.default_value = "0";

    expect(calculateBaseLevel(race, baseSkills)).toBe(17);
  });

  test("round to 100 then value if bigger than 100", () => {
    const race = "Altmer";
    const baseSkills = baseSkillsForRace(race);
    baseSkills.Combat.smithing.default_value = "200";

    expect(calculateBaseLevel(race, baseSkills)).toBe(17);
  });

});

