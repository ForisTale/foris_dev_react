import calculateExpNeededForLvl from "../../components/tec/skills/skillsCalculations/calculateExpNeededForLvl";
import calculateBaseLevel from "../../components/tec/skills/skillsCalculations/calculateBaseLevel";
import defaultSkillsForRace, {
  CombatSkills,
  MagicSkills,
  SkillCategories, StealthSkills
} from "../../inventory/tec/defaultSkillsForRace";
import calculateDesiredLevel from "../../components/tec/skills/skillsCalculations/calculateDesiredLevel";
import {getStateSkill, TecStateType} from "./tecSkills-slice";

const fillSkillsToDesiredLevel = (state: TecStateType) => {
  const baseLevel = Math.max(
    calculateBaseLevel(state.race, state.skills),
    calculateDesiredLevel(state.race, state.skills)
  );
  const desiredLevel = parseInt(state.desiredLevel);
  let neededExp = calculateExpNeededForLvl(baseLevel, desiredLevel);
  const defaultSkills = defaultSkillsForRace(state.race);
  const skillsFilled: string[] = [];
  const multiplierValues: { [key: string]: number } = {};

  while (neededExp > 0) {

    for (const [category, skills] of Object.entries(state.skills)) {
      for (const [skillName, skillDetails] of Object.entries(skills)) {
        const baseSkill = getStateSkill(defaultSkills, category as keyof SkillCategories,
          skillName as keyof MagicSkills | keyof CombatSkills | keyof StealthSkills);

        let desiredSkillLevel = parseInt(skillDetails.desiredSkillLevel)
          || parseInt(skillDetails.defaultSkillLevel)
          || parseInt(baseSkill.defaultSkillLevel);

        if (desiredSkillLevel >= 100) {
          if (desiredSkillLevel > 100) skillDetails.desiredSkillLevel = "100";
          if (!skillsFilled.includes(skillName)) {
            skillsFilled.push(skillName);
          }
          continue;
        }


        let value = multiplierValues[skillName] || 1;
        while (value >= 1) {
          desiredSkillLevel += 1;
          skillDetails.desiredSkillLevel = desiredSkillLevel.toString();
          neededExp -= desiredSkillLevel;
          value -= 1;
          if (desiredSkillLevel === 100) skillsFilled.push(skillName);
        }

        let multiplierValue = 1;
        if (skillDetails.multiplier) {
          if (!isNaN(parseFloat(state.multiplier))) {
            multiplierValue = parseFloat(state.multiplier);
          }
        }

        multiplierValues[skillName] = value + multiplierValue;

      }
    }
    if (skillsFilled.length === 18) break;
  }
};

export default fillSkillsToDesiredLevel;