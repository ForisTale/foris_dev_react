const calculateExpFromSkills = (skillLevel: number, defaultLevel: number) => {
  let exp = 0;
  let checkedSkillLevel = skillLevel > 100 ? 100 : skillLevel;
  if (checkedSkillLevel > defaultLevel) {
    const skillLevels = Array.from(Array(checkedSkillLevel - defaultLevel).keys(),
      value => value + 1 + defaultLevel);

    for (const level of skillLevels) {
      exp += level;
    }
  }

  return exp;
};

export default calculateExpFromSkills;