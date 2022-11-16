import calculateSkillExp from "./calculateSkillExp";


describe("Testing calculate skill exp", () => {

  test("when skill is bigger than default", () => {

    expect(calculateSkillExp(10, 5)).toBe(40);
  });

  test("when skill is smaller than default", () => {

    expect(calculateSkillExp(10, 15)).toBe(0);
  });

  test("return 0 for equal skills level", () => {
    expect(calculateSkillExp(15, 15)).toBe(0);
  });

  test("round skill to 100 when is bigger than 100", () => {
    expect(calculateSkillExp(200, 15)).toBe(4930);
    expect(calculateSkillExp(200, 20)).toBe(4840);
  });

});
