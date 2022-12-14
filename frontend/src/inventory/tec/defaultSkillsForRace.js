import defaultSkills from "./defaultSkills.json";
import racesExtraSkills from "./racesExtraSkills.json";

const defaultSkillsForRace = (race) => {
  const extraSkills = racesExtraSkills[race];
  if(typeof extraSkills === "undefined"){
    throw Error("Wrong race! Check if there is a typo in passed race or racesExtraSkills!");
  }
  const skills = JSON.parse(JSON.stringify(defaultSkills));

  for (const category in extraSkills) {
    for (const skill in extraSkills[category]) {
      const defaultValue = parseInt(skills[category][skill]["defaultSkillLevel"]);
      const extraValue = parseInt(extraSkills[category][skill])
      skills[category][skill]["defaultSkillLevel"] = (defaultValue + extraValue).toString();
    }
  }
  return skills;
};

export default defaultSkillsForRace;