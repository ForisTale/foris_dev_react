import defaultSkills from "./defaultSkills.json";
import racesExtraSkills from "./racesExtraSkills.json";

export type SkillsType = {
    [key: string]: {
        [key: string]: {
            "name": string,
            "console_name": string,
            "defaultSkillLevel": string,
            "desiredSkillLevel": string,
            "multiplier": boolean,
            "sim": number,
            "sio": number,
            "sum": number,
        }
    }
};

export type RacesType = keyof typeof racesExtraSkills;

const defaultSkillsForRace = (race: keyof typeof racesExtraSkills) => {
    const extraSkills = JSON.parse(JSON.stringify(racesExtraSkills[race]));
    if (typeof extraSkills === "undefined") {
        throw Error("Wrong race! Check if there is a typo in passed race or racesExtraSkills!");
    }
    const skills:SkillsType = JSON.parse(JSON.stringify(defaultSkills));

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