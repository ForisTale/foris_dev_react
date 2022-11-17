import defaultSkillsForRace from "../../../../inventory/tec/defaultSkillsForRace";
import calculateExpFromSkills from "./calculateExpFromSkills";

const calculateBaseLevel = (race, baseSkills) => {
  const defaultSkills = defaultSkillsForRace(race);
  let totalExp = 0;

  for (const [category, skills] of Object.entries(baseSkills)) {
    for (const [skillName, skill] of Object.entries(skills)) {

      const defaultSkillLevel = parseInt(defaultSkills[category][skillName]["defaultSkillLevel"]);
      const baseSkillLevel = parseInt(skill.defaultSkillLevel);

      totalExp += calculateExpFromSkills(baseSkillLevel, defaultSkillLevel);
    }
  }
  const level = (-2.5 + Math.sqrt(8 * totalExp + 1225) / 10);
  return parseInt(level);
};

export default calculateBaseLevel;