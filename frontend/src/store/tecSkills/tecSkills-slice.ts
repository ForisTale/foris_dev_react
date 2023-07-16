import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";
import fillSkillsToDesiredLevel from "./fillSkillsToDesiredLevel";
import generateCommands from "./generateCommands";
import {
  RacesType, SkillCategories, MagicSkills, CombatSkills, StealthSkills,
  magicSkillsKeys, stealthSkillsKeys, combatSkillsKeys
} from "../../inventory/tec/defaultSkillsForRace";

export type TecStateType = {
  race: RacesType,
  skills: SkillCategories,
  multiplier: string,
  desiredLevel: string,
  commands: string[],
};

type PayloadSkills = {
  category: keyof SkillCategories,
  skillName: keyof MagicSkills | keyof CombatSkills | keyof StealthSkills,
  value?: string,
};


const initialState: TecStateType = {
  race: "Nord",
  skills: defaultSkillsForRace("Nord"),
  multiplier: "1",
  desiredLevel: "",
  commands: [],
};

export const getStateSkill = (stateSkills: SkillCategories, category: keyof SkillCategories,
                       skillName: keyof MagicSkills | keyof CombatSkills | keyof StealthSkills) => {
  switch (category) {
    case "Stealth":
      if (stealthSkillsKeys.includes(skillName as keyof StealthSkills)) {
        return stateSkills[category][skillName as keyof StealthSkills];
      } else {
        throw Error(`Skill name for ${category} is wrong.`)
      }
    case "Combat":
      if (combatSkillsKeys.includes(skillName as keyof CombatSkills)) {
        return stateSkills[category][skillName as keyof CombatSkills];
      } else {
        throw Error(`Skill name for ${category} is wrong.`)
      }
    case "Magic":
      if (magicSkillsKeys.includes(skillName as keyof MagicSkills)) {
        return stateSkills[category][skillName as keyof MagicSkills];
      } else {
        throw Error(`Skill name for ${category} is wrong.`)
      }
    default:
      throw Error("Skill category is wrong.");
  }
};

const tecSkillsSlice = createSlice({
  name: "tecSkills",
  initialState,
  reducers: {
    setRace: (state, action) => {
      state.race = action.payload;
      state.skills = defaultSkillsForRace(action.payload);
      state.commands = [];
    },
    setIsMultiplierActive: (state, action: PayloadAction<PayloadSkills>) => {
      const skill = getStateSkill(state.skills, action.payload.category, action.payload.skillName);

      skill.multiplier = !skill.multiplier;
    },
    setSkillDefaultValue: (state, action: PayloadAction<PayloadSkills>) => {
      const skill = getStateSkill(state.skills, action.payload.category, action.payload.skillName);

      if (action.payload.value !== undefined) {
        skill.defaultSkillLevel = action.payload.value;
      }
    },
    setSkillDesiredValue: (state, action: PayloadAction<PayloadSkills>) => {
      const skill = getStateSkill(state.skills, action.payload.category, action.payload.skillName);

      if (action.payload.value !== undefined) {
        skill.desiredSkillLevel = action.payload.value;
      }
    },
    setMultiplierValue: (state, action) => {
      state.multiplier = action.payload;
    },
    setDesiredLevel: (state, action) => {
      state.desiredLevel = action.payload;
    },
    fillSkillsToDesiredLevel,
    generateCommands: (state) => {
      state.commands = generateCommands(state.race, state.skills);
    },
    resetSkills: state => {
      state.skills = defaultSkillsForRace("Nord");
      state.commands = [];
    },
  },
});

export const tecSkillsActions = tecSkillsSlice.actions;

export default tecSkillsSlice;
