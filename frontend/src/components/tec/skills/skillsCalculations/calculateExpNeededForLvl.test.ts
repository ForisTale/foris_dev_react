import calculateExpNeededForLvl from "./calculateExpNeededForLvl";

describe("Calculate exp needed for level up to desired level", () =>{
  test("calculate lvl up by one lvl", () => {
    expect(calculateExpNeededForLvl(1, 2)).toBe(100);
    expect(calculateExpNeededForLvl(2, 3)).toBe(125);
  });

  test("calculate lvl up from lvl 1 to lvl 5", () => {
    expect(calculateExpNeededForLvl(1, 5)).toBe(550);
  });
});