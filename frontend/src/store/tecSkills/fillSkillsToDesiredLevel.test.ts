import fillSkillsToDesiredLevel from "./fillSkillsToDesiredLevel";
import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";
import {TecStateType} from "./tecSkills-slice";
import {SkillsType} from "../../inventory/tec/defaultSkillsForRace";

describe("Testing filling skills to desired level", () => {
  let state: TecStateType;
  let skills: SkillsType;

  beforeEach(() => {
    state = {
      race: "Nord",
      skills: defaultSkillsForRace("Nord"),
      multiplier: "1",
      desiredLevel: "10",
      commands: [],
    }

    skills = defaultSkillsForRace("Nord");
    skills.Magic.alteration.desiredSkillLevel = "21";
    skills.Magic.conjuration.desiredSkillLevel = "21";
    skills.Magic.destruction.desiredSkillLevel = "21";
    skills.Magic.enchanting.desiredSkillLevel = "21";
    skills.Magic.illusion.desiredSkillLevel = "21";
    skills.Magic.restoration.desiredSkillLevel = "21";
    skills.Combat.marksman.desiredSkillLevel = "21";
    skills.Combat.block.desiredSkillLevel = "26";
    skills.Combat.heavyarmor.desiredSkillLevel = "21";
    skills.Combat.onehanded.desiredSkillLevel = "26";
    skills.Combat.smithing.desiredSkillLevel = "26";
    skills.Combat.twohanded.desiredSkillLevel = "31";
    skills.Stealth.alchemy.desiredSkillLevel = "21";
    skills.Stealth.lightarmor.desiredSkillLevel = "26";
    skills.Stealth.lockpicking.desiredSkillLevel = "21";
    skills.Stealth.pickpocket.desiredSkillLevel = "21";
    skills.Stealth.sneak.desiredSkillLevel = "21";
    skills.Stealth.speechcraft.desiredSkillLevel = "26";
  });

  test("can fill skill till level 10", () => {
    const expected = {
      race: "Nord",
      skills: skills,
      multiplier: "1",
      desiredLevel: "10",
      commands: [],
    }

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(expected);
  });

  test("calling fillSkills many times didn't change skills", () => {
    const expected = {
      race: "Nord",
      skills: skills,
      multiplier: "1",
      desiredLevel: "10",
      commands: [],
    }

    fillSkillsToDesiredLevel(state);
    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(expected);
  });

  test("having skill at 100 will keep it at 100", () => {
    state.desiredLevel = "20";
    state.skills.Combat.block.desiredSkillLevel = "100";

    fillSkillsToDesiredLevel(state);
    expect(state.skills.Combat.block.desiredSkillLevel).toEqual("100");
  });

  test("if skill is over 100 it will be roll down to 100", () => {
    state.desiredLevel = "20";
    state.skills.Combat.block.desiredSkillLevel = "101";

    fillSkillsToDesiredLevel(state);
    expect(state.skills.Combat.block.desiredSkillLevel).toEqual("100");
  });

  test("ignore NaN base skills values", () => {
    skills.Magic.alteration.defaultSkillLevel = "a";
    state.skills.Magic.alteration.defaultSkillLevel = "a";
    const expected = {
      race: "Nord",
      skills: skills,
      multiplier: "1",
      desiredLevel: "10",
      commands: [],
    }

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(expected);
  });

  test("fill skills only up to 100", () => {
    skills.Magic.alteration.desiredSkillLevel = "100";
    skills.Magic.conjuration.desiredSkillLevel = "100";
    skills.Magic.destruction.desiredSkillLevel = "100";
    skills.Magic.enchanting.desiredSkillLevel = "100";
    skills.Magic.illusion.desiredSkillLevel = "100";
    skills.Magic.restoration.desiredSkillLevel = "100";
    skills.Combat.marksman.desiredSkillLevel = "100";
    skills.Combat.block.desiredSkillLevel = "100";
    skills.Combat.heavyarmor.desiredSkillLevel = "100";
    skills.Combat.onehanded.desiredSkillLevel = "100";
    skills.Combat.smithing.desiredSkillLevel = "100";
    skills.Combat.twohanded.desiredSkillLevel = "100";
    skills.Stealth.alchemy.desiredSkillLevel = "100";
    skills.Stealth.lightarmor.desiredSkillLevel = "100";
    skills.Stealth.lockpicking.desiredSkillLevel = "100";
    skills.Stealth.pickpocket.desiredSkillLevel = "100";
    skills.Stealth.sneak.desiredSkillLevel = "100";
    skills.Stealth.speechcraft.desiredSkillLevel = "100";
    const expected = {
      race: "Nord",
      skills: skills,
      multiplier: "1",
      desiredLevel: "100",
      commands: [],
    }
    state.desiredLevel = "100";

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(expected);
  });

  test("when multiplier check, fills skill x time more often", () => {
    skills.Magic.alteration.desiredSkillLevel = "20";
    skills.Magic.conjuration.desiredSkillLevel = "20";
    skills.Magic.destruction.desiredSkillLevel = "20";
    skills.Magic.enchanting.desiredSkillLevel = "20";
    skills.Magic.illusion.desiredSkillLevel = "20";
    skills.Magic.restoration.desiredSkillLevel = "20";
    skills.Combat.marksman.desiredSkillLevel = "20";
    skills.Combat.block.desiredSkillLevel = "27";
    skills.Combat.heavyarmor.desiredSkillLevel = "20";
    skills.Combat.onehanded.desiredSkillLevel = "25";
    skills.Combat.smithing.desiredSkillLevel = "25";
    skills.Combat.twohanded.desiredSkillLevel = "30";
    skills.Stealth.alchemy.desiredSkillLevel = "20";
    skills.Stealth.lightarmor.desiredSkillLevel = "25";
    skills.Stealth.lockpicking.desiredSkillLevel = "20";
    skills.Stealth.pickpocket.desiredSkillLevel = "20";
    skills.Stealth.sneak.desiredSkillLevel = "20";
    skills.Stealth.speechcraft.desiredSkillLevel = "25";
    skills.Combat.block.multiplier = true;
    const expected = {
      race: "Nord",
      skills: skills,
      multiplier: "1.5",
      desiredLevel: "10",
      commands: [],
    }
    state.multiplier = "1.5";
    state.skills.Combat.block.multiplier = true;

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(expected);
  });

  test("edge case to probe potential infinity loop", () => {
    state.skills.Magic.alteration.defaultSkillLevel = "99";
    state.skills.Magic.conjuration.defaultSkillLevel = "99";
    state.skills.Magic.destruction.defaultSkillLevel = "99";
    state.skills.Magic.enchanting.defaultSkillLevel = "99";
    state.skills.Magic.illusion.defaultSkillLevel = "99";
    state.skills.Magic.restoration.defaultSkillLevel = "99";
    state.skills.Combat.marksman.defaultSkillLevel = "99";
    state.skills.Combat.block.defaultSkillLevel = "99";
    state.skills.Combat.heavyarmor.defaultSkillLevel = "99";
    state.skills.Combat.onehanded.defaultSkillLevel = "99";
    state.skills.Combat.smithing.defaultSkillLevel = "99";
    state.skills.Combat.twohanded.defaultSkillLevel = "99";
    state.skills.Stealth.alchemy.defaultSkillLevel = "99";
    state.skills.Stealth.lightarmor.defaultSkillLevel = "99";
    state.skills.Stealth.lockpicking.defaultSkillLevel = "99";
    state.skills.Stealth.pickpocket.defaultSkillLevel = "99";
    state.skills.Stealth.sneak.defaultSkillLevel = "99";
    state.skills.Stealth.speechcraft.defaultSkillLevel = "99";
    state.desiredLevel = "81";

    fillSkillsToDesiredLevel(state);
  });

});