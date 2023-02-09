import {isBaseSkillValid} from "./BaseSkillInput";

describe("Testing base skill validation", () => {

  test("return true when number is in skill range", () => {
    expect(isBaseSkillValid("20", "15")).toBe(true);
    expect(isBaseSkillValid("15", "15")).toBe(true);
    expect(isBaseSkillValid("100", "15")).toBe(true);
  });

  test("return false when number is outside of skill range", () => {
    expect(isBaseSkillValid("10", "15")).toBe(false);
    expect(isBaseSkillValid("101", "15")).toBe(false);
    expect(isBaseSkillValid("3", "20")).toBe(false);
  });

  test("return false when base skill is NaN", () => {
    expect(isBaseSkillValid("a", "15")).toBe(false);
    expect(isBaseSkillValid("", "15")).toBe(false);
    expect(isBaseSkillValid("100a", "15")).toBe(false);
  });

});