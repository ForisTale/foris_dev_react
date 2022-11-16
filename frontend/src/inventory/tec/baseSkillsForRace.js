import defaultSkills from "./defaultSkills.json";
import racesExtraSkills from "./racesExtraSkills.json";

const baseSkillsForRace = (race) => {
  const extraSkills = racesExtraSkills[race];
  if(typeof extraSkills === "undefined"){
    throw Error("Wrong race! Check if there is a typo in passed race or racesExtraSkills!");
  }
  const skills = JSON.parse(JSON.stringify(defaultSkills));

  for (const category in extraSkills) {
    for (const skill in extraSkills[category]) {
      const defaultValue = parseInt(skills[category][skill]["default_value"]);
      const extraValue = parseInt(extraSkills[category][skill])
      skills[category][skill]["default_value"] = (defaultValue + extraValue).toString();
    }
  }
  return skills;
};

export default baseSkillsForRace;