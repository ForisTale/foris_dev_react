import calculateExpNeededForLvl from "../../components/tec/skills/skillsCalculations/calculateExpNeededForLvl";
import calculateBaseLevel from "../../components/tec/skills/skillsCalculations/calculateBaseLevel";
import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";
import calculateDesiredLevel from "../../components/tec/skills/skillsCalculations/calculateDesiredLevel";

const fillSkillsToDesiredLevel = (state) => {
  const baseLevel = Math.max(
    calculateBaseLevel(state.race, state.skills),
    calculateDesiredLevel(state.race, state.skills)
  );
  let neededExp = calculateExpNeededForLvl(baseLevel, state.desiredLevel);
  const defaultSkills = defaultSkillsForRace(state.race);
  const skillsFilled = [];
  const multiplierValues = {};

  while (neededExp > 0) {

    for (const [category, skills] of Object.entries(state.skills)) {
      for (const [skillName, skillDetails] of Object.entries(skills)) {
        let desiredSkillLevel = parseInt(skillDetails.desiredSkillLevel)
          || parseInt(skillDetails.defaultSkillLevel)
          || parseInt(defaultSkills[category][skillName].defaultSkillLevel);

        if (desiredSkillLevel >= 100) {
          if (desiredSkillLevel > 100) skillDetails.desiredSkillLevel = 100;
          if (!skillsFilled.includes(skillName)) {
            skillsFilled.push(skillName);
          }
          continue;
        }


        let value = multiplierValues[skillName] || 1;
        while (value >= 1) {
          desiredSkillLevel += 1;
          skillDetails.desiredSkillLevel = desiredSkillLevel;
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