import defaultSkillsForRace from "../../../../inventory/tec/defaultSkillsForRace";
import calculateExpFromSkills from "./calculateExpFromSkills";
import {SkillsType, RacesType} from "../../../../inventory/tec/defaultSkillsForRace";

const calculateDesiredLevel = (race: RacesType, baseSkills: SkillsType) => {
  const defaultSkills = defaultSkillsForRace(race);
  let totalExp = 0;

  for (const [category, skills] of Object.entries(baseSkills)) {
    for (const [name, skill] of Object.entries(skills)) {

      const desiredSkillLevel = parseInt(skill.desiredSkillLevel) || parseInt(skill.defaultSkillLevel);
      const defaultSkillLevel = parseInt(defaultSkills[category][name]["defaultSkillLevel"]);

      totalExp += calculateExpFromSkills(desiredSkillLevel, defaultSkillLevel);
    }
  }
  const level = (-2.5 + Math.sqrt(8 * totalExp + 1225) / 10);
  return Math.floor(level);
};

export default calculateDesiredLevel;