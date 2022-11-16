import baseSkillsForRace from "../../../inventory/tec/baseSkillsForRace";

const calculateDesiredLevel = (race, baseSkills) => {
  const defaultSkills = baseSkillsForRace(race);
  let totalExp = 0;
  for (const [category, skills] of Object.entries(baseSkills)) {
    for (const [name, skill] of Object.entries(skills)) {
      let desired_value;
      if (skill.desired_value) {
        desired_value = parseInt(skill.desired_value);
      } else {
        desired_value = parseInt(skill.default_value);
      }
      const default_value = parseInt(defaultSkills[category][name]["default_value"]);
      if (desired_value > default_value) {
        const skillLevels = Array.from(Array(desired_value - default_value).keys(),
          value => value + 1 + default_value);
        for (const level of skillLevels) {
          totalExp += parseInt(level);
        }
      }
    }
  }
  const level = (-2.5 + Math.sqrt(8 * totalExp + 1225) / 10);
  return parseInt(level);
};

export default calculateDesiredLevel;