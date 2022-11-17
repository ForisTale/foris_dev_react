import baseSkillsForRace from "./baseSkillsForRace";

describe("Return dict with altered values according to race bonuses", () => {
  test("alters matching records", () => {
    const result = baseSkillsForRace("Nord");

    expect(result.Combat.twohanded.defaultSkillLevel).toBe("25");
    expect(result.Combat.block.defaultSkillLevel).toBe("20");
    expect(result.Magic.alteration.defaultSkillLevel).toBe("15");
    expect(result.Stealth.lightarmor.defaultSkillLevel).toBe("20");
  });

  test("throw error on wrong race", () => {
    expect(baseSkillsForRace.bind(null, "wrong race")).toThrow(Error);
  });
});