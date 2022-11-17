import fillSkillsToDesiredLevel from "./fillSkillsToDesiredLevel";
import baseSkillsForRace from "../inventory/tec/baseSkillsForRace";

describe("Testing filling skills to desired level", () => {
  let state;
  let skills;

  beforeEach(() => {
    state = {
      race: "Nord",
      skills: baseSkillsForRace("Nord"),
      multiplier: "1",
      desiredLevel: "10",
    }

    skills = baseSkillsForRace("Nord");
    skills.Magic.alteration.desired_level = 21;
    skills.Magic.conjuration.desired_level = 21;
    skills.Magic.destruction.desired_level = 21;
    skills.Magic.enchanting.desired_level = 21;
    skills.Magic.illusion.desired_level = 21;
    skills.Magic.restoration.desired_level = 21;
    skills.Combat.marksman.desired_level = 21;
    skills.Combat.block.desired_level = 26;
    skills.Combat.heavyarmor.desired_level = 21;
    skills.Combat.onehanded.desired_level = 26;
    skills.Combat.smithing.desired_level = 26;
    skills.Combat.twohanded.desired_level = 31;
    skills.Stealth.alchemy.desired_level = 21;
    skills.Stealth.lightarmor.desired_level = 26;
    skills.Stealth.lockpicking.desired_level = 21;
    skills.Stealth.pickpocket.desired_level = 21;
    skills.Stealth.sneak.desired_level = 21;
    skills.Stealth.speechcraft.desired_level = 26;
  });

  test("can fill skill till level 10", () => {
    const result = {
      race: "Nord",
      skills: skills,
      multiplier: "1",
      desiredLevel: "10",
    }

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(result);
  });

  test("ignore NaN base skills values", () => {
    skills.Magic.alteration.default_value = "";
    state.skills.Magic.alteration.default_value = "";
    const result = {
      race: "Nord",
      skills: skills,
      multiplier: "1",
      desiredLevel: "10",
    }

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(result);
  });

  test("fill skills only up to 100", () => {
    skills.Magic.alteration.desired_level = 100;
    skills.Magic.conjuration.desired_level = 100;
    skills.Magic.destruction.desired_level = 100;
    skills.Magic.enchanting.desired_level = 100;
    skills.Magic.illusion.desired_level = 100;
    skills.Magic.restoration.desired_level = 100;
    skills.Combat.marksman.desired_level = 100;
    skills.Combat.block.desired_level = 100;
    skills.Combat.heavyarmor.desired_level = 100;
    skills.Combat.onehanded.desired_level = 100;
    skills.Combat.smithing.desired_level = 100;
    skills.Combat.twohanded.desired_level = 100;
    skills.Stealth.alchemy.desired_level = 100;
    skills.Stealth.lightarmor.desired_level = 100;
    skills.Stealth.lockpicking.desired_level = 100;
    skills.Stealth.pickpocket.desired_level = 100;
    skills.Stealth.sneak.desired_level = 100;
    skills.Stealth.speechcraft.desired_level = 100;
    const result = {
      race: "Nord",
      skills: skills,
      multiplier: "1",
      desiredLevel: "100",
    }
    state.desiredLevel = "100";

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(result);
  });

  test("when multiplier check, fills skill x time more often", () => {
    skills.Magic.alteration.desired_level = 20;
    skills.Magic.conjuration.desired_level = 20;
    skills.Magic.destruction.desired_level = 20;
    skills.Magic.enchanting.desired_level = 20;
    skills.Magic.illusion.desired_level = 20;
    skills.Magic.restoration.desired_level = 20;
    skills.Combat.marksman.desired_level = 20;
    skills.Combat.block.desired_level = 27;
    skills.Combat.heavyarmor.desired_level = 20;
    skills.Combat.onehanded.desired_level = 25;
    skills.Combat.smithing.desired_level = 25;
    skills.Combat.twohanded.desired_level = 30;
    skills.Stealth.alchemy.desired_level = 20;
    skills.Stealth.lightarmor.desired_level = 25;
    skills.Stealth.lockpicking.desired_level = 20;
    skills.Stealth.pickpocket.desired_level = 20;
    skills.Stealth.sneak.desired_level = 20;
    skills.Stealth.speechcraft.desired_level = 25;
    skills.Combat.block.multiplier = true;
    const result = {
      race: "Nord",
      skills: skills,
      multiplier: "1.5",
      desiredLevel: "10",
    }
    state.multiplier = "1.5";
    state.skills.Combat.block.multiplier = true;

    fillSkillsToDesiredLevel(state);
    expect(state).toEqual(result);
  });

  test("edge case to probe potential infinity loop", () => {
    state.skills.Magic.alteration.default_level = 99;
    state.skills.Magic.conjuration.default_level = 99;
    state.skills.Magic.destruction.default_level = 99;
    state.skills.Magic.enchanting.default_level = 99;
    state.skills.Magic.illusion.default_level = 99;
    state.skills.Magic.restoration.default_level = 99;
    state.skills.Combat.marksman.default_level = 99;
    state.skills.Combat.block.default_level = 99;
    state.skills.Combat.heavyarmor.default_level = 99;
    state.skills.Combat.onehanded.default_level = 99;
    state.skills.Combat.smithing.default_level = 99;
    state.skills.Combat.twohanded.default_level = 99;
    state.skills.Stealth.alchemy.default_level = 99;
    state.skills.Stealth.lightarmor.default_level = 99;
    state.skills.Stealth.lockpicking.default_level = 99;
    state.skills.Stealth.pickpocket.default_level = 99;
    state.skills.Stealth.sneak.default_level = 99;
    state.skills.Stealth.speechcraft.default_level = 99;
    state.desiredLevel = "81";

    fillSkillsToDesiredLevel(state);
  });

});