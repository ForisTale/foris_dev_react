import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import defaultSkillsForRace from "../../inventory/tec/defaultSkillsForRace";
import fillSkillsToDesiredLevel from "./fillSkillsToDesiredLevel";
import generateCommands from "./generateCommands";
import {RacesType, SkillCategories, Skill} from "../../inventory/tec/defaultSkillsForRace";

export type TecStateType = {
  race: RacesType,
  skills: SkillCategories,
  multiplier: string,
  desiredLevel: string,
  commands: string[],
};

type PayloadSkills = {
  [K in keyof SkillCategories] : {
    category: K,
    skillName: keyof SkillCategories[K],
    value?: string,
  };
}[keyof SkillCategories];


const initialState: TecStateType = {
    race: "Nord",
    skills: defaultSkillsForRace("Nord"),
    multiplier: "1",
    desiredLevel: "",
    commands: [],
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
      const category = action.payload.category;
      const skillName = action.payload.skillName;
      const stateSkillCategory = state.skills[category];
      const skill: Skill = stateSkillCategory[skillName as keyof typeof stateSkillCategory];

      skill.multiplier = !skill.multiplier;

    },
    setSkillDefaultValue: (state, action: PayloadAction<PayloadSkills>) => {
      const category = action.payload.category;
      const skillName = action.payload.skillName;
      const stateSkillCategory = state.skills[category];
      const skill: Skill = stateSkillCategory[skillName as keyof typeof stateSkillCategory];
      if (action.payload.value) {
        skill.defaultSkillLevel = action.payload.value;
      }
    },
    setSkillDesiredValue: (state, action: PayloadAction<PayloadSkills>) => {
      const category = action.payload.category;
      const skillName = action.payload.skillName;
      const stateSkillCategory = state.skills[category];
      const skill: Skill = stateSkillCategory[skillName as keyof typeof stateSkillCategory];

      if (action.payload.value) {
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
