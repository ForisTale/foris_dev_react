import baseSkillsForRace from "../../../../inventory/tec/baseSkillsForRace";
import calculateSkillExp from "./calculateSkillExp";

const calculateDesiredLevel = (race, baseSkills) => {
  const defaultSkills = baseSkillsForRace(race);
  let totalExp = 0;

  for (const [category, skills] of Object.entries(baseSkills)) {
    for (const [name, skill] of Object.entries(skills)) {

      const desiredSkillLevel = parseInt(skill.desired_value) || parseInt(skill.default_value);
      const defaultSkillLevel = parseInt(defaultSkills[category][name]["default_value"]);

      totalExp += calculateSkillExp(desiredSkillLevel, defaultSkillLevel);
    }
  }
  const level = (-2.5 + Math.sqrt(8 * totalExp + 1225) / 10);
  return parseInt(level);
};

export default calculateDesiredLevel;