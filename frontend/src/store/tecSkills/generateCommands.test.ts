import generateCommands from "./generateCommands";
import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";
import {TecStateType} from "./tecSkills-slice";

describe("Generate commands from desired skills", () => {
  let state: TecStateType;
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
    state.skills.Combat.twohanded.desiredSkillLevel = "20";
    state.skills.Stealth.lightarmor.desiredSkillLevel = "20";
    state.skills.Stealth.speechcraft.desiredSkillLevel = "20";
    const expected = [
      "player.advskill twohanded 424",
      "player.advskill lightarmor 631",
      "player.advskill speechcraft 7012"
    ];

    const commands = generateCommands(state.race, state.skills);
    expect(commands).toEqual(expected);
  });

  test("can generate when value is NaN", () => {
    state.skills.Combat.twohanded.desiredSkillLevel = "20";
    state.skills.Stealth.lightarmor.defaultSkillLevel = "d";
    state.skills.Stealth.speechcraft.desiredSkillLevel = "s";
    const expected = [
      "player.advskill twohanded 424",
    ];

    const commands = generateCommands(state.race, state.skills);
    expect(commands).toEqual(expected);
  });
});