import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";

const generateCommands = (state) => {
  state.commands = [];
  const defaultSkills = defaultSkillsForRace(state.race);
  for (const [category, skills] of Object.entries(state.skills)) {
    for (const [skillName, skillDetails] of Object.entries(skills)) {

      const defaultSkillLevel = parseInt(skillDetails.defaultSkillLevel);
      const desiredSkillLevel = parseInt(skillDetails.desiredSkillLevel)
        || defaultSkillLevel
        || defaultSkills[category][skillName].defaultSkillLevel;

      let exp = 0;
      if (desiredSkillLevel > defaultSkillLevel) {
        const skillLevels = Array.from(Array(desiredSkillLevel - defaultSkillLevel).keys(),
          value => value + 1 + defaultSkillLevel);

        for (const level of skillLevels) {
          const skillExp = skillDetails.sim * (level ** 1.95) + skillDetails.sio;
          exp += skillExp;
        }

        const skillCommandValue = parseInt(exp / skillDetails.sum);
        state.commands.push(`player.advskill ${skillName} ${skillCommandValue}`);
      }
    }
  }
};

export default generateCommands;