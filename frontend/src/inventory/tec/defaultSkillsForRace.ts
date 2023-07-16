import defaultSkills from "./defaultSkills.json";
import racesExtraSkills from "./racesExtraSkills.json";

export type Skill = {
  name: string;
  defaultSkillLevel: string;
  console_name: string;
  desiredSkillLevel: string;
  multiplier: boolean;
  sim: number;
  sio: number;
  sum: number;
};

export type MagicSkills = {
  alteration: Skill;
  conjuration: Skill;
  destruction: Skill;
  enchanting: Skill;
  illusion: Skill;
  restoration: Skill;
};

export type CombatSkills = {
  marksman: Skill;
  block: Skill;
  heavyarmor: Skill;
  onehanded: Skill;
  smithing: Skill;
  twohanded: Skill;
};

export type StealthSkills = {
  alchemy: Skill;
  lightarmor: Skill;
  lockpicking: Skill;
  pickpocket: Skill;
  sneak: Skill;
  speechcraft: Skill;
};

export type SkillCategories = {
  Magic: MagicSkills;
  Combat: CombatSkills;
  Stealth: StealthSkills;
};

export const magicSkillsKeys: (keyof MagicSkills)[] = ['alteration', 'conjuration', 'destruction', 'enchanting',
  'illusion', 'restoration'];
export const combatSkillsKeys: (keyof CombatSkills)[] = ['marksman', 'block', 'heavyarmor', 'onehanded', 'smithing',
  'twohanded'];
export const stealthSkillsKeys: (keyof StealthSkills)[] = ['alchemy', 'lightarmor', 'lockpicking', 'pickpocket', 'sneak',
  'speechcraft'];


export type SkillLevels = {
  illusion?: number;
  alteration?: number;
  conjuration?: number;
  destruction?: number;
  enchanting?: number;
  restoration?: number;
  marksman?: number;
  block?: number;
  heavyarmor?: number;
  onehanded?: number;
  smithing?: number;
  twohanded?: number;
  alchemy?: number;
  lightarmor?: number;
  lockpicking?: number;
  pickpocket?: number;
  sneak?: number;
  speechcraft?: number;
};

type ExtraSkillsCategories = {
  Magic?: SkillLevels;
  Combat?: SkillLevels;
  Stealth?: SkillLevels;
};

export type Races = {
  Altmer: ExtraSkillsCategories;
  Argonian: ExtraSkillsCategories;
  Bosmer: ExtraSkillsCategories;
  Breton: ExtraSkillsCategories;
  Dunmer: ExtraSkillsCategories;
  Imperial: ExtraSkillsCategories;
  Khajiit: ExtraSkillsCategories;
  Nord: ExtraSkillsCategories;
  Ork: ExtraSkillsCategories;
  Redguard: ExtraSkillsCategories;
};


export const skillsCategories = ["Magic", "Combat", "Stealth"] as const;

type SkillsCategoriesType = typeof skillsCategories[number];

export type SkillsType = {
  [key in SkillsCategoriesType]: {
    [key: string]: {
      "name": string;
      "console_name": string;
      "defaultSkillLevel": string;
      "desiredSkillLevel": string;
      "multiplier": boolean;
      "sim": number;
      "sio": number;
      "sum": number;
    };
  };
};


export type RacesType = keyof Races;


const defaultSkillsForRace = (race: RacesType) => {
  const extraSkills: ExtraSkillsCategories = racesExtraSkills[race];
  if (typeof extraSkills === "undefined") {
    throw Error("Wrong race! Check if there is a typo in passed race or racesExtraSkills!");
  }
  const skills: SkillCategories = JSON.parse(JSON.stringify(defaultSkills));

  for (const category in extraSkills) {
    const skillCategory = skills[category as keyof SkillCategories];
    const extraSkillsCategory = extraSkills[category as keyof ExtraSkillsCategories];

    for (const skillName in extraSkillsCategory) {

      const skillDetails: Skill = skillCategory[skillName as keyof typeof skillCategory];
      const defaultValue = parseInt(skillDetails.defaultSkillLevel);
      const extraSkill = extraSkills[category as keyof ExtraSkillsCategories];

      if (extraSkill) {
        const extraValue = extraSkill[skillName as keyof typeof extraSkillsCategory];
        if (extraValue) {
          skillDetails.defaultSkillLevel =
            (defaultValue + extraValue).toString();
        }
      }
    }
  }

  return skills
};

export default defaultSkillsForRace;