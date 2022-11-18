import {isDesiredSkillValid} from "./DesireSkillInput";

describe("Testing desire skill validation", () => {

  test("return true when number is in skill range", () => {
    expect(isDesiredSkillValid("20", "15")).toBe(true);
    expect(isDesiredSkillValid("15", "15")).toBe(true);
    expect(isDesiredSkillValid("100", "15")).toBe(true);
  });

  test("return false when number is outside of skill range", () => {
    expect(isDesiredSkillValid("10", "15")).toBe(false);
    expect(isDesiredSkillValid("101", "15")).toBe(false);
    expect(isDesiredSkillValid("3", "20")).toBe(false);
  });

  test("return false when base skill is NaN", () => {
    expect(isDesiredSkillValid("a", "15")).toBe(false);
    expect(isDesiredSkillValid("", "15")).toBe(false);
  });
});