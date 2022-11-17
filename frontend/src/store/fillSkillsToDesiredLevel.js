import calculateExpNeededForLvl from "../components/tec/skills/skillsCalculations/calculateExpNeededForLvl";
import calculateBaseLevel from "../components/tec/skills/skillsCalculations/calculateBaseLevel";
import baseSkillsForRace from "../inventory/tec/baseSkillsForRace";

const fillSkillsToDesiredLevel = (state) => {
  let neededExp = calculateExpNeededForLvl(calculateBaseLevel(state.race, state.skills), state.desiredLevel);
  const defaultSkills = baseSkillsForRace(state.race);
  const skillsFilled = [];
  const multiplierValues = {};

  while (neededExp > 0) {

    for (const [category, skills] of Object.entries(state.skills)) {
      for (const [skillName, skillDetails] of Object.entries(skills)) {
        let desiredSkillLevel = parseInt(skillDetails.desired_level)
          || parseInt(skillDetails.default_value
            || parseInt(defaultSkills[category][skillName].default_value));
        let value = multiplierValues[skillName] || 1;

        while (value >= 1) {
          if (skillsFilled.includes(skillName)) break;

          desiredSkillLevel += 1;
          skillDetails.desired_level = desiredSkillLevel;
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