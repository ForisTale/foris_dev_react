import baseSkillsForRace from "../../../../inventory/tec/baseSkillsForRace";
import calculateSkillExp from "./calculateSkillExp";

const calculateBaseLevel = (race, baseSkills) => {
  const defaultSkills = baseSkillsForRace(race);
  let totalExp = 0;

  for (const [category, skills] of Object.entries(baseSkills)) {
    for (const [name, skill] of Object.entries(skills)) {

      const defaultSkillLevel = parseInt(defaultSkills[category][name]["default_value"]);
      const baseSkillLevel = parseInt(skill.default_value);

      totalExp += calculateSkillExp(baseSkillLevel, defaultSkillLevel);
    }
  }
  const level = (-2.5 + Math.sqrt(8 * totalExp + 1225) / 10);
  return parseInt(level);
};

export default calculateBaseLevel;