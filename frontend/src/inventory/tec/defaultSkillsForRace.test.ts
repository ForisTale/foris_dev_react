import defaultSkillsForRace from "./defaultSkillsForRace";

describe("Return dict with altered values according to race bonuses", () => {
  test("alters matching records", () => {
    const result = defaultSkillsForRace("Nord");

    expect(result.Combat.twohanded.defaultSkillLevel).toBe("25");
    expect(result.Combat.block.defaultSkillLevel).toBe("20");
    expect(result.Magic.alteration.defaultSkillLevel).toBe("15");
    expect(result.Stealth.lightarmor.defaultSkillLevel).toBe("20");
  });

  test("throw error on wrong race", () => {
    // @ts-ignore
    expect(defaultSkillsForRace.bind(null, "wrong race")).toThrow(Error);
  });
});