import calculateExpFromSkills from "./calculateExpFromSkills";


describe("Testing calculate skill exp", () => {

  test("when skill is bigger than default", () => {

    expect(calculateExpFromSkills(10, 5)).toBe(40);
  });

  test("when skill is smaller than default", () => {

    expect(calculateExpFromSkills(10, 15)).toBe(0);
  });

  test("return 0 for equal skills level", () => {
    expect(calculateExpFromSkills(15, 15)).toBe(0);
  });

  test("round skill to 100 when is bigger than 100", () => {
    expect(calculateExpFromSkills(200, 15)).toBe(4930);
    expect(calculateExpFromSkills(200, 20)).toBe(4840);
  });

});
