import calculateBaseLevel from "./calculateBaseLevel";
import defaultSkillsForRace from "../../../../inventory/tec/defaultSkillsForRace";


describe("testing calculate base level", () => {

  test("can estimate level", () => {
    const race = "Altmer";
    const baseSkills = defaultSkillsForRace(race);
    baseSkills.Combat.marksman.defaultSkillLevel = 20;
    baseSkills.Stealth.sneak.defaultSkillLevel = 20;
    baseSkills.Stealth.alchemy.defaultSkillLevel = 20;

    expect(calculateBaseLevel(race, baseSkills)).toBe(3);
  });

  test("return 1 when no changes in default", () => {
    const race = "Altmer";
    const baseSkills = defaultSkillsForRace(race);

    expect(calculateBaseLevel(race, baseSkills)).toBe(1);
  });

  test("correctly calculate when some values are not a numbers", () => {
    const race = "Altmer";
    const baseSkills = defaultSkillsForRace(race);
    baseSkills.Combat.block.defaultSkillLevel = "%%";
    baseSkills.Combat.marksman.defaultSkillLevel = "20";
    baseSkills.Stealth.sneak.defaultSkillLevel = "20";
    baseSkills.Stealth.alchemy.defaultSkillLevel = "20";

    expect(calculateBaseLevel(race, baseSkills)).toBe(3);
  });

  test("ignore base values when they are smaller than default", () => {
    const race = "Altmer";
    const baseSkills = defaultSkillsForRace(race);
    baseSkills.Combat.marksman.defaultSkillLevel = "0";
    baseSkills.Combat.smithing.defaultSkillLevel = "100";
    baseSkills.Stealth.sneak.defaultSkillLevel = "0";
    baseSkills.Stealth.alchemy.defaultSkillLevel = "0";

    expect(calculateBaseLevel(race, baseSkills)).toBe(17);
  });

  test("round to 100 then value if bigger than 100", () => {
    const race = "Altmer";
    const baseSkills = defaultSkillsForRace(race);
    baseSkills.Combat.smithing.defaultSkillLevel = "200";

    expect(calculateBaseLevel(race, baseSkills)).toBe(17);
  });

});

