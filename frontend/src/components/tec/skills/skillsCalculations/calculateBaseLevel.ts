import defaultSkillsForRace from "../../../../inventory/tec/defaultSkillsForRace";
import calculateExpFromSkills from "./calculateExpFromSkills";
import {SkillsType, RacesType} from "../../../../inventory/tec/defaultSkillsForRace";
import {SkillCategories, MagicSkills, CombatSkills, StealthSkills} from "../../../../inventory/tec/defaultSkillsForRace";
import {getStateSkill} from "../../../../store/tecSkills/tecSkills-slice";

const calculateBaseLevel = (race: RacesType, baseSkills: SkillsType) => {
  const defaultSkills = defaultSkillsForRace(race);
  let totalExp = 0;

  for (const [category, skills] of Object.entries(baseSkills)) {
    for (const [skillName, skill] of Object.entries(skills)) {
      const baseSkill = getStateSkill(defaultSkills, category as keyof SkillCategories,
        skillName as keyof MagicSkills | keyof CombatSkills | keyof StealthSkills);

      const defaultSkillLevel = parseInt(baseSkill.defaultSkillLevel);
      const baseSkillLevel = parseInt(skill.defaultSkillLevel);

      totalExp += calculateExpFromSkills(baseSkillLevel, defaultSkillLevel);
    }
  }
  const level = (-2.5 + Math.sqrt(8 * totalExp + 1225) / 10);
  return Math.floor(level);
};

export default calculateBaseLevel;