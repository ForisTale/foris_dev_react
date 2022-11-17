import generateCommands from "./generateCommands";
import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";

describe("Generate commands from desired skills", () => {
  let state;
  const race = "Altmer";

  beforeEach(() => {
    state = {
      race: race,
      skills: defaultSkillsForRace(race),
      multiplier: "1",
      desiredLevel: "10",
      commands: [],
    }
  });

  test("can generate commands", () => {
    state.skills.Combat.twohanded.desiredSkillLevel = 20;
    state.skills.Stealth.lightarmor.desiredSkillLevel = 20;
    state.skills.Stealth.speechcraft.desiredSkillLevel = 20;
    const expected = [
      "player.advskill twohanded 473",
      "player.advskill lightarmor 705",
      "player.advskill speechcraft 7833"
    ];

    generateCommands(state);
    expect(state.commands).toEqual(expected);
  });

  test("can generate when value is NaN", () => {
    state.skills.Combat.twohanded.desiredSkillLevel = 20;
    state.skills.Stealth.lightarmor.defaultSkillLevel = "d";
    state.skills.Stealth.speechcraft.desiredSkillLevel = "s";
    const expected = [
      "player.advskill twohanded 473",
    ];

    generateCommands(state);
    expect(state.commands).toEqual(expected);
  });

  test("generate commands twice give same result", () => {
    state.skills.Combat.twohanded.desiredSkillLevel = 20;
    const expected = [
      "player.advskill twohanded 473",
    ];

    generateCommands(state);
    generateCommands(state);
    expect(state.commands).toEqual(expected);

  });
});