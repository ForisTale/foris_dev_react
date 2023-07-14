import defaultSkillsForRace, {Races, SkillCategories, Skill} from "../../inventory/tec/defaultSkillsForRace";

const generateCommands = (race: keyof Races, allSkills: SkillCategories) => {
  const commands: string[] = [];
  const defaultSkills = defaultSkillsForRace(race);

  for (const [category, skills] of Object.entries(allSkills)) {
    for (const [skillName, skillDetails] of Object.entries(skills)) {

      const skillCategory = defaultSkills[category as keyof SkillCategories];
      const skill: Skill = skillCategory[skillName as keyof typeof skillCategory];

      const defaultSkillLevel = parseInt(skillDetails.defaultSkillLevel);
      const desiredSkillLevel = parseInt(skillDetails.desiredSkillLevel)
        || defaultSkillLevel
        || parseInt(skill.defaultSkillLevel);

      let exp = 0;
      if (desiredSkillLevel > defaultSkillLevel) {
        const skillLevels = Array.from(Array(desiredSkillLevel - defaultSkillLevel).keys(),
          value => value + 1 + defaultSkillLevel);

        for (const level of skillLevels) {
          const skillExp = skillDetails.sim * ((level - 1) ** 1.95) + skillDetails.sio;
          exp += skillExp;
        }

        const skillCommandValue = Math.floor(exp / skillDetails.sum);
        commands.push(`player.advskill ${skillName} ${skillCommandValue}`);
      }
    }
  }
  return commands;
};

export default generateCommands;